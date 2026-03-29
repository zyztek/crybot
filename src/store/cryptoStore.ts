import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TabType, User, WalletBalance, Faucet, ClaimHistory, Achievement, LeaderboardEntry } from '@/types'
import { texts } from '@/i18n/translations'

// Import store slices
import {
  createAuthStore,
  createUIStore,
  createUserStore,
  createWalletStore,
  createFaucetStore,
  createAchievementsStore,
} from './slices'

// Re-export initial data for testing
export { INITIAL_USER } from './slices/userStore'
export { INITIAL_WALLET_BALANCE } from './slices/walletStore'
export { INITIAL_FAUCETS, INITIAL_HISTORY } from './slices/faucetStore'
export { INITIAL_ACHIEVEMENTS } from './slices/achievementsStore'
export { LEADERBOARD } from './slices/achievementsStore'

// Combined store type
interface CryptoStore {
  // Auth state
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  
  // UI state
  activeTab: TabType
  language: 'es' | 'en'
  theme: 'dark' | 'light'
  notifications: number
  showWalletAddress: boolean
  setActiveTab: (tab: TabType) => void
  toggleLanguage: () => void
  toggleTheme: () => void
  toggleWalletAddress: () => void
  
  // User state
  user: User
  copyReferralCode: () => void
  
  // Wallet state
  walletBalance: WalletBalance
  
  // Faucet state
  faucets: Faucet[]
  history: ClaimHistory[]
  withdrawalHistory: ClaimHistory[]
  claimFaucet: (
    faucet: Faucet,
    onCountdownEnd?: () => void,
    actions?: {
      updateBalance?: (coin: 'btc' | 'eth' | 'doge' | 'sol' | 'ltc' | 'bnb', amount: number) => void
      updateAchievementProgress?: (id: number, progress: number) => void
    }
  ) => void
  
  // Achievements state
  achievements: Achievement[]
  leaderboard: LeaderboardEntry[]
}

// Create storage interface that handles missing localStorage gracefully
const createStorage = () => {
  if (typeof window === 'undefined') {
    return {
      getItem: (_name: string) => null,
      setItem: (_name: string, _value: string) => {},
      removeItem: (_name: string) => {},
    }
  }
  
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    
    return {
      getItem: (name: string) => localStorage.getItem(name),
      setItem: (name: string, value: string) => localStorage.setItem(name, value),
      removeItem: (name: string) => localStorage.removeItem(name),
    }
  } catch {
    return {
      getItem: (_name: string) => null,
      setItem: (_name: string, _value: string) => {},
      removeItem: (_name: string) => {},
    }
  }
}

// Create combined store using slice pattern
export const useCryptoStore = create<CryptoStore>()(
  persist(
    () => {
      const auth = createAuthStore()
      const ui = createUIStore()
      const user = createUserStore()
      const wallet = createWalletStore()
      const faucet = createFaucetStore()
      const achievements = createAchievementsStore()
      return {
        ...auth,
        ...ui,
        ...user,
        ...wallet,
        ...faucet,
        ...achievements,
        withdrawalHistory: [],
      } as CryptoStore
    },
    {
      name: 'crypto-faucet-storage',
      storage: createJSONStorage(createStorage),
      partialize: (state) => ({
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
)

// Export texts for direct access in components
export { texts }