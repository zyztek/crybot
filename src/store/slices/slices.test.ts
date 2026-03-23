import { describe, it, expect, beforeEach, vi } from 'vitest'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'

// Import store slices
import {
  createAuthStore,
  createUIStore,
  createUserStore,
  createWalletStore,
  createFaucetStore,
  createAchievementsStore,
  INITIAL_WALLET_BALANCE,
  INITIAL_FAUCETS,
  INITIAL_HISTORY,
  INITIAL_ACHIEVEMENTS,
  INITIAL_USER,
  LEADERBOARD,
} from './index'

import type { TabType, Faucet, ClaimHistory } from '@/types'

// Helper to create combined store for integration testing
const createTestStore = () => {
  return create<any>()((...args) => ({
    ...createAuthStore(...args),
    ...createUIStore(...args),
    ...createUserStore(...args),
    ...createWalletStore(...args),
    ...createFaucetStore(...args),
    ...createAchievementsStore(...args),
  }))
}

describe('Store Slices - Integration Tests', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  describe('Auth Slice Integration', () => {
    it('auth slice works in combined store', () => {
      expect(store.getState().isLoggedIn).toBe(false)
      
      store.getState().login()
      expect(store.getState().isLoggedIn).toBe(true)
      
      store.getState().logout()
      expect(store.getState().isLoggedIn).toBe(false)
    })

    it('login and logout work with other slices', () => {
      // Login and change tab
      store.getState().login()
      store.getState().setActiveTab('dashboard')
      
      expect(store.getState().isLoggedIn).toBe(true)
      expect(store.getState().activeTab).toBe('dashboard')
    })
  })

  describe('UI Slice Integration', () => {
    it('UI slice works in combined store', () => {
      expect(store.getState().activeTab).toBe('faucets')
      expect(store.getState().language).toBe('es')
      expect(store.getState().showWalletAddress).toBe(false)
    })

    it('setActiveTab works with other slices', () => {
      store.getState().setActiveTab('wallet')
      store.getState().setActiveTab('leaderboard')
      store.getState().setActiveTab('achievements')
      
      expect(store.getState().activeTab).toBe('achievements')
    })

    it('toggleLanguage works with other slices', () => {
      store.getState().toggleLanguage()
      expect(store.getState().language).toBe('en')
      
      store.getState().toggleLanguage()
      expect(store.getState().language).toBe('es')
    })

    it('toggleWalletAddress works with other slices', () => {
      store.getState().toggleWalletAddress()
      expect(store.getState().showWalletAddress).toBe(true)
      
      store.getState().toggleWalletAddress()
      expect(store.getState().showWalletAddress).toBe(false)
    })
  })

  describe('User Slice Integration', () => {
    it('user slice works in combined store', () => {
      expect(store.getState().user).toEqual(INITIAL_USER)
      expect(store.getState().notifications).toBe(3)
    })

    it('copyReferralCode increments notifications', () => {
      const initialNotifications = store.getState().notifications
      
      vi.stubGlobal('navigator', {
        clipboard: {
          writeText: vi.fn(),
        },
      })
      
      store.getState().copyReferralCode()
      expect(store.getState().notifications).toBe(initialNotifications + 1)
      
      vi.unstubAllGlobals()
    })
  })

  describe('Wallet Slice Integration', () => {
    it('wallet slice works in combined store', () => {
      expect(store.getState().walletBalance).toEqual(INITIAL_WALLET_BALANCE)
    })

    it('updateBalance works with other slices', () => {
      store.getState().updateBalance('btc', 0.001)
      
      const newBalance = parseFloat(store.getState().walletBalance.btc)
      const expected = parseFloat(INITIAL_WALLET_BALANCE.btc) + 0.001
      expect(newBalance).toBeCloseTo(expected, 8)
    })

    it('updateBalance for different coins', () => {
      store.getState().updateBalance('eth', 0.1)
      expect(parseFloat(store.getState().walletBalance.eth)).toBeGreaterThan(
        parseFloat(INITIAL_WALLET_BALANCE.eth)
      )
      
      store.getState().updateBalance('doge', 10)
      expect(parseFloat(store.getState().walletBalance.doge)).toBeGreaterThan(
        parseFloat(INITIAL_WALLET_BALANCE.doge)
      )
    })
  })

  describe('Faucet Slice Integration', () => {
    it('faucet slice works in combined store', () => {
      expect(store.getState().faucets).toEqual(INITIAL_FAUCETS)
      expect(store.getState().history).toEqual(INITIAL_HISTORY)
    })

    it('claimFaucet updates state correctly', () => {
      const faucet = store.getState().faucets[0]
      const initialHistoryLength = store.getState().history.length
      
      store.getState().claimFaucet(faucet)
      
      // History should be updated
      expect(store.getState().history.length).toBe(initialHistoryLength + 1)
      
      // Faucet status should be 'wait'
      const updatedFaucet = store.getState().faucets.find(f => f.id === faucet.id)
      expect(updatedFaucet?.status).toBe('wait')
    })
  })

  describe('Achievements Slice Integration', () => {
    it('achievements slice works in combined store', () => {
      expect(store.getState().achievements).toEqual(INITIAL_ACHIEVEMENTS)
      expect(store.getState().leaderboard).toEqual(LEADERBOARD)
    })

    it('updateAchievementProgress works', () => {
      store.getState().updateAchievementProgress(2, 50)
      
      const achievement = store.getState().achievements.find(a => a.id === 2)
      expect(achievement?.progress).toBe(50)
    })

    it('unlockAchievement works', () => {
      store.getState().unlockAchievement(2)
      
      const achievement = store.getState().achievements.find(a => a.id === 2)
      expect(achievement?.unlocked).toBe(true)
    })

    it('progress is capped at total', () => {
      store.getState().updateAchievementProgress(2, 150)
      
      const achievement = store.getState().achievements.find(a => a.id === 2)
      expect(achievement?.progress).toBe(100)
    })
  })

  describe('Cross-Slice Integration', () => {
    it('multiple slices work together', () => {
      // Auth
      store.getState().login()
      
      // UI
      store.getState().setActiveTab('dashboard')
      store.getState().toggleLanguage()
      store.getState().toggleWalletAddress()
      
      // Wallet
      store.getState().updateBalance('btc', 0.01)
      
      // User
      vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn() } })
      store.getState().copyReferralCode()
      vi.unstubAllGlobals()
      
      // Verify all slices are in correct state
      expect(store.getState().isLoggedIn).toBe(true)
      expect(store.getState().activeTab).toBe('dashboard')
      expect(store.getState().language).toBe('en')
      expect(store.getState().showWalletAddress).toBe(true)
      expect(store.getState().notifications).toBe(4)
    })

    it('claimFaucet affects multiple slices', () => {
      const faucet = store.getState().faucets[0]
      const initialBalance = store.getState().walletBalance.btc
      const initialAchievementProgress = store.getState().achievements[1].progress
      
      store.getState().claimFaucet(faucet)
      
      // Faucet state updated
      expect(store.getState().faucets.find(f => f.id === faucet.id)?.status).toBe('wait')
      
      // History updated
      expect(store.getState().history.length).toBeGreaterThan(INITIAL_HISTORY.length)
      
      // Wallet balance updated
      expect(store.getState().walletBalance.btc).not.toBe(initialBalance)
      
      // Achievement progress updated
      expect(store.getState().achievements[1].progress).toBe(initialAchievementProgress + 1)
    })
  })

  describe('Slice State Reset', () => {
    it('can reset individual slice state', () => {
      // Make some changes
      store.getState().login()
      store.getState().toggleLanguage()
      store.getState().updateBalance('btc', 0.1)
      
      // Reset to initial values
      store.setState({
        isLoggedIn: false,
        language: 'es',
        walletBalance: INITIAL_WALLET_BALANCE,
        faucets: INITIAL_FAUCETS,
        history: INITIAL_HISTORY,
        achievements: INITIAL_ACHIEVEMENTS,
      })
      
      // Verify reset
      expect(store.getState().isLoggedIn).toBe(false)
      expect(store.getState().language).toBe('es')
      expect(store.getState().walletBalance).toEqual(INITIAL_WALLET_BALANCE)
    })
  })

  describe('Slice Type Definitions', () => {
    it('auth slice has correct types', () => {
      const authSlice = createAuthStore(set => set({ isLoggedIn: false, login: () => {}, logout: () => {} }))
      expect(typeof authSlice.login).toBe('function')
      expect(typeof authSlice.logout).toBe('function')
      expect(typeof authSlice.isLoggedIn).toBe('boolean')
    })

    it('ui slice has correct types', () => {
      const uiSlice = createUIStore(set => ({
        activeTab: 'faucets' as TabType,
        language: 'es' as const,
        showWalletAddress: false,
        setActiveTab: (tab: TabType) => {},
        toggleLanguage: () => {},
        toggleWalletAddress: () => {},
      }))
      expect(typeof uiSlice.setActiveTab).toBe('function')
      expect(uiSlice.language).toBe('es')
    })

    it('wallet slice has correct types', () => {
      const walletSlice = createWalletStore(set => ({
        walletBalance: INITIAL_WALLET_BALANCE,
        updateBalance: (coin: keyof typeof INITIAL_WALLET_BALANCE, amount: number) => {},
      }))
      expect(typeof walletSlice.updateBalance).toBe('function')
    })

    it('achievements slice has correct types', () => {
      const achievementsSlice = createAchievementsStore(set => ({
        achievements: INITIAL_ACHIEVEMENTS,
        leaderboard: LEADERBOARD,
        updateAchievementProgress: (id: number, progress: number) => {},
        unlockAchievement: (id: number) => {},
      }))
      expect(typeof achievementsSlice.updateAchievementProgress).toBe('function')
      expect(typeof achievementsSlice.unlockAchievement).toBe('function')
    })
  })
})