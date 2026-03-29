/**
 * API Service - Connects frontend to backend
 * 
 * Handles all HTTP requests to the backend API
 */

import { API_CONFIG } from '@/config/appConfig';

const API_BASE_URL = API_CONFIG.baseUrl;

// Helper to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

// Helper to set tokens
const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Helper to clear tokens
const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Generic fetch wrapper
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Try to refresh token
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Retry the original request
      const newToken = getAuthToken();
      const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
      
      if (!retryResponse.ok) {
        const error = await retryResponse.json();
        throw new Error(error.error || 'API request failed');
      }
      
      return retryResponse.json();
    }
    
    // Refresh failed, clear tokens
    clearTokens();
    window.location.reload();
    throw new Error('Session expired');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'API request failed');
  }

  return response.json();
};

// Try to refresh the access token
const tryRefreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    setTokens(data.data.accessToken, data.data.refreshToken);
    return true;
  } catch {
    return false;
  }
};

// ============== AUTH API ==============

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    referralCode: string;
    level: number;
    totalEarned: string;
    createdAt: string;
  };
  wallets: Array<{ coin: string; balance: string }>;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetchApi<{ success: boolean; data: AuthResponse }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const { data: authData } = response;
    setTokens(authData.accessToken, authData.refreshToken);
    return authData;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetchApi<{ success: boolean; data: AuthResponse }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const { data: authData } = response;
    setTokens(authData.accessToken, authData.refreshToken);
    return authData;
  },

  logout: async (): Promise<void> => {
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } finally {
      clearTokens();
    }
  },

  getMe: async (): Promise<AuthResponse['user'] & { wallets: AuthResponse['wallets']; achievements: Array<{ id: string; name: string; description: string; icon: string; progress: number; completed: boolean; completedAt: string | null }> }> => {
    return fetchApi('/auth/me');
  },

  refreshToken: async (): Promise<boolean> => {
    return tryRefreshToken();
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    return fetchApi('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    return fetchApi('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password: newPassword }),
    });
  },
};

// ============== USER API ==============

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  walletAddress: string | null;
  referralCode: string;
  referrerEarnings: string;
  referralCount: number;
  level: number;
  totalEarned: string;
  createdAt: string;
  wallets: Array<{ coin: string; balance: string; address: string | null }>;
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    return fetchApi('/user/profile');
  },

  updateProfile: async (data: { username?: string; walletAddress?: string }): Promise<UserProfile> => {
    return fetchApi('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getReferrals: async (): Promise<{
    referrals: Array<{ id: string; username: string; createdAt: string }>;
    totalReferrals: number;
    totalEarnings: string;
  }> => {
    return fetchApi('/user/referrals');
  },

  claimReferral: async (): Promise<{ amount: string; newBalance: string }> => {
    return fetchApi('/user/claim-referral', { method: 'POST' });
  },
};

// ============== WALLET API ==============

export interface Wallet {
  id: string;
  userId: string;
  coin: string;
  address: string | null;
  balance: string;
  isCustodial: boolean;
}

export const walletApi = {
  getAll: async (): Promise<Wallet[]> => {
    return fetchApi('/wallet');
  },

  getByCoin: async (coin: string): Promise<Wallet> => {
    return fetchApi(`/wallet/${coin}`);
  },

  generateDepositAddress: async (coin: string): Promise<{ coin: string; address: string }> => {
    return fetchApi('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify({ coin }),
    });
  },

  withdraw: async (coin: string, amount: string, toAddress: string): Promise<{ id: string; coin: string; amount: string; status: string }> => {
    return fetchApi('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ coin, amount, toAddress }),
    });
  },
};

// ============== FAUCET API ==============

export interface Faucet {
  id: string;
  name: string;
  coin: string;
  network: string;
  amountMin: string;
  amountMax: string;
  intervalHours: number;
  isActive: boolean;
}

export interface FaucetClaim {
  id: string;
  coin: string;
  amount: string;
  status: string;
  txHash: string;
  claimedAt: string;
}

export interface FaucetStatus {
  canClaim: boolean;
  nextClaimAt: string | null;
  intervalHours: number;
  lastClaimAmount: string | null;
  lastClaimAt: string | null;
}

export const faucetApi = {
  getAll: async (): Promise<Faucet[]> => {
    return fetchApi('/faucet');
  },

  getByCoin: async (coin: string, network?: string): Promise<Faucet> => {
    const query = network ? `?network=${network}` : '';
    return fetchApi(`/faucet/${coin}${query}`);
  },

  claim: async (coin: string, network?: string): Promise<FaucetClaim> => {
    return fetchApi('/faucet/claim', {
      method: 'POST',
      body: JSON.stringify({ coin, network }),
    });
  },

  getHistory: async (page = 1, limit = 20): Promise<{ claims: FaucetClaim[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> => {
    return fetchApi(`/faucet/history?page=${page}&limit=${limit}`);
  },

  getStatus: async (coin: string): Promise<FaucetStatus> => {
    return fetchApi(`/faucet/status/${coin}`);
  },
};

// ============== TRANSACTION API ==============

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  coin: string;
  amount: string;
  fee: string;
  txHash: string | null;
  fromAddress: string | null;
  toAddress: string | null;
  status: string;
  createdAt: string;
}

export const transactionApi = {
  getAll: async (page = 1, limit = 20, type?: string, coin?: string): Promise<{ transactions: Transaction[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> => {
    let query = `?page=${page}&limit=${limit}`;
    if (type) query += `&type=${type}`;
    if (coin) query += `&coin=${coin}`;
    return fetchApi(`/transaction${query}`);
  },

  getById: async (id: string): Promise<Transaction> => {
    return fetchApi(`/transaction/${id}`);
  },

  getStats: async (): Promise<{
    claims: { count: number; total: string };
    deposits: { count: number; total: string };
    withdrawals: { count: number; total: string };
    referrals: { count: number; total: string };
  }> => {
    return fetchApi('/transaction/stats');
  },
};

// ============== ACHIEVEMENT API ==============

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  coin: string | null;
  target: number;
  reward: string;
  type: string;
  progress: number;
  completed: boolean;
  completedAt: string | null;
  claimedAt: string | null;
}

export const achievementApi = {
  getAll: async (): Promise<Achievement[]> => {
    return fetchApi('/achievement');
  },

  getUserAchievements: async (): Promise<{ achievements: Achievement[]; stats: { total: number; completed: number; inProgress: number } }> => {
    return fetchApi('/achievement/user');
  },

  claimReward: async (id: string): Promise<{ amount: string }> => {
    return fetchApi(`/achievement/${id}/claim`, { method: 'POST' });
  },
};

// ============== ANALYTICS API ==============

export const analyticsApi = {
  getOverview: async (): Promise<{
    totalUsers: number;
    activeUsersLast30Days: number;
    activeUsersLast7Days: number;
    totalClaims: number;
    totalVolume: string;
  }> => {
    return fetchApi('/analytics/overview');
  },

  getDaily: async (days = 7): Promise<Array<{
    date: string;
    totalClaims: number;
    totalVolume: string;
    newUsers: number;
    activeUsers: number;
    feesEarned: string;
  }>> => {
    return fetchApi(`/analytics/daily?days=${days}`);
  },

  getUserStats: async (): Promise<{
    totalClaims: number;
    totalEarned: string;
    byCoin: Array<{ coin: string; count: number; total: string }>;
    achievements: { completed: number; total: number; inProgress: number };
  }> => {
    return fetchApi('/analytics/user');
  },
};

// ============== LEADERBOARD API ==============

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  score: string;
  rank: number;
  period: string;
}

export const leaderboardApi = {
  getLeaderboard: async (period = 'all_time', limit = 50): Promise<{ entries: LeaderboardEntry[]; userRank: LeaderboardEntry | null }> => {
    return fetchApi(`/leaderboard?period=${period}&limit=${limit}`);
  },

  getUserRanks: async (): Promise<Array<{ period: string; rank: number | null; score: string }>> => {
    return fetchApi('/leaderboard/me');
  },
};

// ============== EXPORTS ==============

export default {
  auth: authApi,
  user: userApi,
  wallet: walletApi,
  faucet: faucetApi,
  transaction: transactionApi,
  achievement: achievementApi,
  analytics: analyticsApi,
  leaderboard: leaderboardApi,
};