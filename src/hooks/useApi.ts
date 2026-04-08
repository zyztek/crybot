/**
 * useApi Hook - Connects API to Zustand Store
 *
 * Provides real data from backend while maintaining store compatibility
 */

import { useCallback, useState } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import api, {
  authApi,
  walletApi,
  achievementApi,
  leaderboardApi,
  analyticsApi,
} from '@/services/api';
import { getFriendlyError, useToast } from './useToast';
import type { WalletBalance } from '@/types';

// Convert backend wallet format to frontend format
const convertWallets = (wallets: Array<{ coin: string; balance: string }>): WalletBalance => {
  const balance: WalletBalance = {
    btc: '0',
    eth: '0',
    doge: '0',
    sol: '0',
    ltc: '0',
    bnb: '0',
    xrp: '0',
    ada: '0',
    avax: '0',
    dot: '0',
    matic: '0',
    link: '0',
    atom: '0',
    uni: '0',
  };

  wallets.forEach(w => {
    const key = w.coin.toLowerCase() as keyof typeof balance;
    if (key in balance) {
      balance[key] = w.balance;
    }
  });

  return balance;
};

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const store = useCryptoStore();

  // Sync auth state from backend
  const syncAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      setIsLoading(true);
      const userData = await authApi.getMe();

      // Update store with real data
      store.login();
      store.user = {
        ...store.user,
        username: userData.username || 'User',
        email: userData.email,
        referralCode: userData.referralCode,
        level: userData.level,
        totalReferrals: 0, // Will be updated from profile
      };
      store.walletBalance = convertWallets(userData.wallets);

      return true;
    } catch (err) {
      console.error('Failed to sync auth:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [store]);

  // Login with real API
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.login({ email, password });

        // Update store with API response
        store.login();
        store.user = {
          ...store.user,
          username: response.user.username || 'User',
          email: response.user.email,
          referralCode: response.user.referralCode,
          level: response.user.level,
        };
        store.walletBalance = convertWallets(response.wallets);

        // Show success toast
        toast.success(`Welcome back, ${response.user.username}!`);

        return true;
      } catch (err) {
        const message = getFriendlyError(err);
        setError(message);
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [store, toast]
  );

  // Register with real API
  const register = useCallback(
    async (email: string, password: string, username?: string, referralCode?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.register({ email, password, username, referralCode });

        // Update store with API response
        store.login();
        store.user = {
          ...store.user,
          username: response.user.username || 'User',
          email: response.user.email,
          referralCode: response.user.referralCode,
          level: response.user.level,
        };
        store.walletBalance = convertWallets(response.wallets);

        // Show success toast
        toast.success('Account created successfully! Welcome to CryptoFaucet Hub.');

        return true;
      } catch (err) {
        const message = getFriendlyError(err);
        setError(message);
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [store, toast]
  );

  // Logout with real API
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await authApi.logout();
    } catch {
      // Ignore API errors during logout
    } finally {
      store.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);

      // Show success toast
      toast.success('You have been logged out successfully. See you next time!');
    }
  }, [store, toast]);

  // Forgot password - request reset email
  const forgotPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.forgotPassword(email);
        toast.success('Password reset email sent. Check your inbox.');
        return response.success;
      } catch (err) {
        const message = getFriendlyError(err);
        setError(message);
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Reset password with token
  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.resetPassword(token, newPassword);
        toast.success('Password reset successfully!');
        return response.success;
      } catch (err) {
        const message = getFriendlyError(err);
        setError(message);
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Fetch faucets from API and update store
  const fetchFaucets = useCallback(async () => {
    try {
      const faucets = await api.faucet.getAll();

      // Convert to frontend format and update store
      const convertedFaucets = faucets.map((f, i) => ({
        id: i + 1,
        name: f.name,
        coin: f.coin,
        icon: getCoinIcon(f.coin),
        reward: f.amountMax,
        timer: 0,
        status: 'available' as const,
        category: 'hot' as const,
        difficulty: 'easy' as const,
        translations: { es: f.name, en: f.name },
      }));
      store.faucets = convertedFaucets;
      return convertedFaucets;
    } catch {
      return null;
    }
  }, [store]);

  // Claim faucet via API
  const claimFaucet = useCallback(
    async (coin: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const claim = (await api.faucet.claim(coin)) as { coin?: string; amount?: string };

        // Add to history
        const claimCoin = claim.coin || coin;
        const claimAmount = claim.amount || '0';
        const historyEntry = {
          id: Date.now(),
          faucet: `Faucet ${coin}`,
          faucetId: 0,
          coin: claimCoin,
          amount: claimAmount,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        };

        // Update wallet balance
        const key = coin.toLowerCase() as keyof typeof store.walletBalance;
        if (key in store.walletBalance) {
          store.walletBalance = {
            ...store.walletBalance,
            [key]: (BigInt(store.walletBalance[key]) + BigInt(claimAmount)).toString(),
          };
        }

        // Show success toast
        toast.success(`Claimed ${claimAmount} ${claimCoin} successfully!`);

        return { success: true, claim, historyEntry };
      } catch (err) {
        const message = getFriendlyError(err);
        setError(message);
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [store, toast]
  );

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      const profile = await api.user.getProfile();

      store.user = {
        ...store.user,
        username: profile.username || 'User',
        email: profile.email,
        referralCode: profile.referralCode,
        level: profile.level,
        totalReferrals: profile.referralCount,
        referralEarnings: profile.referrerEarnings,
      };

      store.walletBalance = convertWallets(
        profile.wallets.map(w => ({ coin: w.coin, balance: w.balance }))
      );

      return profile;
    } catch {
      return null;
    }
  }, [store]);

  // Fetch referrals list
  const fetchReferrals = useCallback(async () => {
    try {
      const data = await api.user.getReferrals();
      return data;
    } catch (err) {
      console.error('Failed to fetch referrals:', err);
      return null;
    }
  }, []);

  // Fetch wallets from API
  const fetchWallets = useCallback(async () => {
    try {
      const wallets = await walletApi.getAll();
      const balance = convertWallets(wallets.map(w => ({ coin: w.coin, balance: w.balance })));
      store.walletBalance = balance;
      return wallets;
    } catch (err) {
      console.error('Failed to fetch wallets:', err);
      return null;
    }
  }, [store]);

  // Fetch achievements from API and update store
  const fetchAchievements = useCallback(async () => {
    try {
      const data = await achievementApi.getUserAchievements();
      // Convert API format to frontend format and update store
      const convertedAchievements = (
        data.achievements as Array<{
          id: string;
          name: string;
          description: string;
          icon: string;
          coin: string;
          target: number;
          reward: string;
          type: string;
          progress: number;
          completed: boolean;
          completedAt?: string;
          claimedAt?: string;
        }>
      ).map(a => ({
        id: parseInt(a.id) || 0,
        title: a.name, // Map 'name' to 'title' for Achievement type
        description: a.description,
        icon: a.icon,
        coin: a.coin,
        target: a.target,
        reward: a.reward,
        type: a.type,
        progress: a.progress,
        total: a.target, // Map 'target' to 'total' for Achievement type
        unlocked: a.completed, // Map 'completed' to 'unlocked' for Achievement type
        completed: a.completed,
        completedAt: a.completedAt,
        claimedAt: a.claimedAt,
      }));
      store.achievements = convertedAchievements as any;
      return convertedAchievements;
    } catch (err) {
      console.error('Failed to fetch achievements:', err);
      return null;
    }
  }, [store]);

  // Claim achievement reward
  const claimAchievement = useCallback(
    async (id: string) => {
      try {
        const result = (await achievementApi.claimReward(id)) as { amount: string; coin?: string };

        // Update wallet balance with reward (fallback to BTC if coin not provided)
        const coin = result.coin || 'BTC';
        const key = coin.toLowerCase() as keyof typeof store.walletBalance;
        if (key in store.walletBalance) {
          store.walletBalance = {
            ...store.walletBalance,
            [key]: (BigInt(store.walletBalance[key]) + BigInt(result.amount)).toString(),
          };
        }

        // Show success toast
        toast.success(`Achievement claimed! +${result.amount} ${result.coin}`);

        return { success: true, amount: result.amount };
      } catch (err) {
        const message = getFriendlyError(err);
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [toast]
  );

  // Fetch leaderboard from API and update store
  const fetchLeaderboard = useCallback(
    async (period = 'all_time') => {
      try {
        const data = await leaderboardApi.getLeaderboard(period);
        // Convert API format to frontend format and update store
        const convertedLeaderboard = (
          data.entries as Array<{
            id: string;
            rank: number;
            username: string;
            score: string;
          }>
        ).map((entry, index) => ({
          id: parseInt(entry.id) || index + 1,
          rank: entry.rank,
          username: entry.username,
          totalClaimed: entry.score, // Map 'score' to 'totalClaimed' for LeaderboardEntry type
          claims: parseInt(entry.score) || 0, // Map 'score' to 'claims' for LeaderboardEntry type
          avatar: '', // Add required 'avatar' field
          faucetClaims: parseInt(entry.score) || 0,
        }));
        store.leaderboard = convertedLeaderboard as any;
        return convertedLeaderboard;
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        return null;
      }
    },
    [store]
  );

  // Fetch user stats from API and update store
  const fetchUserStats = useCallback(async () => {
    try {
      const stats = await analyticsApi.getUserStats();
      // Update user stats in store
      store.user = {
        ...store.user,
        totalEarned: stats.totalEarned,
        totalClaims: stats.totalClaims,
      };
      return stats;
    } catch (err) {
      console.error('Failed to fetch user stats:', err);
      return null;
    }
  }, [store]);

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    syncAuth,
    fetchFaucets,
    claimFaucet,
    fetchProfile,
    fetchReferrals,
    fetchWallets,
    fetchAchievements,
    claimAchievement,
    fetchLeaderboard,
    fetchUserStats,
    forgotPassword,
    resetPassword,
  };
};

// Helper to get coin icon
const getCoinIcon = (coin: string): string => {
  const icons: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    DOGE: 'Ð',
    SOL: '◎',
    LTC: 'Ł',
    BNB: '⬡',
  };
  return icons[coin] || '●';
};

export default useApi;
