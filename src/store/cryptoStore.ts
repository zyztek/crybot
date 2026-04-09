import { texts } from '@/i18n/translations';
import type {
  Achievement,
  BaseTabType,
  ClaimHistory,
  Faucet,
  LeaderboardEntry,
  User,
  WalletBalance,
} from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Import store slices
import {
  createAchievementsStore,
  createAuthStore,
  createFaucetStore,
  createUIStore,
  createUserStore,
  createWalletStore,
} from './slices';

// Re-export initial data for testing
export { INITIAL_ACHIEVEMENTS, LEADERBOARD } from './slices/achievementsStore';
export { INITIAL_FAUCETS, INITIAL_HISTORY } from './slices/faucetStore';
export { INITIAL_USER } from './slices/userStore';
export { INITIAL_WALLET_BALANCE } from './slices/walletStore';

// Combined store type
interface CryptoStore {
  // Auth state
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // UI state
  activeTab: BaseTabType;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  notifications: number;
  showWalletAddress: boolean;
  setActiveTab: (tab: BaseTabType) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  toggleWalletAddress: () => void;

  // User state
  user: User;
  copyReferralCode: () => void;

  // Wallet state
  walletBalance: WalletBalance;
  updateBalance: (coin: keyof WalletBalance, amount: number) => void;

  // Faucet state
  faucets: Faucet[];
  history: ClaimHistory[];
  withdrawalHistory: ClaimHistory[];
  claimFaucet: (
    faucet: Faucet,
    onCountdownEnd?: () => void,
    actions?: {
      updateBalance?: (
        coin: 'btc' | 'eth' | 'doge' | 'sol' | 'ltc' | 'bnb',
        amount: number
      ) => void;
      updateAchievementProgress?: (id: number, progress: number) => void;
    }
  ) => void;

  // Achievements state
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  updateAchievementProgress: (id: number, progress: number) => void;
  unlockAchievement: (id: number) => void;
}

// Create storage interface that handles missing localStorage gracefully
const createStorage = () => {
  if (typeof window === 'undefined') {
    return {
      getItem: (_name: string) => null,
      setItem: (_name: string, _value: string) => {},
      removeItem: (_name: string) => {},
    };
  }

  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);

    return {
      getItem: (name: string) => {
        try {
          return localStorage.getItem(name);
        } catch {
          return null;
        }
      },
      setItem: (name: string, value: string) => {
        try {
          localStorage.setItem(name, value);
        } catch {
          // Silently fail on write errors - state still works in memory
        }
      },
      removeItem: (name: string) => {
        try {
          localStorage.removeItem(name);
        } catch {
          // Silently fail on remove errors
        }
      },
    };
  } catch {
    return {
      getItem: (_name: string) => null,
      setItem: (_name: string, _value: string) => {},
      removeItem: (_name: string) => {},
    };
  }
};

// Create combined store using slice pattern - pass set/get/api to slice creators
export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get, api) => {
      const auth = createAuthStore(set, get, api);
      const ui = createUIStore(set, get, api);
      const user = createUserStore(set, get, api);
      const wallet = createWalletStore(set, get, api);
      const faucet = createFaucetStore(set, get, api);
      const achievements = createAchievementsStore(set, get, api);
      return {
        ...auth,
        ...ui,
        ...user,
        ...wallet,
        ...faucet,
        ...achievements,
        withdrawalHistory: [],
      } as CryptoStore;
    },
    {
      name: 'crypto-faucet-storage',
      storage: createJSONStorage(createStorage),
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        language: state.language,
        theme: state.theme,
        notifications: state.notifications,
        showWalletAddress: state.showWalletAddress,
        user: state.user,
        walletBalance: state.walletBalance,
        history: state.history,
        achievements: state.achievements,
      }),
    }
  )
);

// Export texts for direct access in components
export { texts };
