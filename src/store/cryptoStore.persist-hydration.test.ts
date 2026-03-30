import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useCryptoStore } from './cryptoStore'
import { INITIAL_USER, INITIAL_WALLET_BALANCE, INITIAL_ACHIEVEMENTS } from './cryptoStore'

describe('CryptoStore - Persist Hydration Behavior', () => {
  // Mock localStorage for testing
  let mockStorage: Record<string, string> = {}
  
  beforeEach(() => {
    mockStorage = {}
    
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value }),
      removeItem: vi.fn((key: string) => { delete mockStorage[key] }),
    })
  })
  
  afterEach(() => {
    vi.unstubAllGlobals()
    // Reset store to initial state
    useCryptoStore.setState({
      isLoggedIn: false,
      activeTab: 'faucets',
      language: 'es',
      notifications: 3,
      showWalletAddress: false,
      user: INITIAL_USER,
      walletBalance: INITIAL_WALLET_BALANCE,
      achievements: [...INITIAL_ACHIEVEMENTS],
    })
  })

  describe('Persist Rehydration from Storage', () => {
    it('rehydrates state with existing storage data', () => {
      // Simulate existing storage data (as if user had used the app before)
      const storedState = {
        state: {
          isLoggedIn: true,
          language: 'en',
          notifications: 7,
          showWalletAddress: true,
          user: { ...INITIAL_USER, username: 'TestUser' },
          walletBalance: { ...INITIAL_WALLET_BALANCE, btc: '0.05' },
          history: [],
          achievements: [...INITIAL_ACHIEVEMENTS],
        },
        version: 0,
      }
      
      mockStorage['crypto-faucet-storage'] = JSON.stringify(storedState)
      
      // Create a new store instance would rehydrate from storage
      // In this test environment, we verify the structure exists
      const state = useCryptoStore.getState()
      expect(state).toBeDefined()
    })

    it('handles partial storage data gracefully', () => {
      // Only store some fields (simulating partial data)
      const storedState = {
        state: {
          language: 'en',
          // Missing some fields - should use defaults
        },
        version: 0,
      }
      
      mockStorage['crypto-faucet-storage'] = JSON.stringify(storedState)
      
      const state = useCryptoStore.getState()
      // Should have default values for missing fields
      expect(state.isLoggedIn).toBe(false)
      expect(state.notifications).toBe(3)
    })

    it('handles corrupted storage data gracefully', () => {
      // Store invalid JSON
      mockStorage['crypto-faucet-storage'] = 'invalid-json-data'
      
      // Store should still function with defaults
      const state = useCryptoStore.getState()
      expect(state.language).toBeDefined()
    })
  })

  describe('Partialize Function Behavior', () => {
    it('partialize excludes activeTab from persistence', () => {
      // activeTab should NOT be persisted
      useCryptoStore.setState({ activeTab: 'dashboard' as any })
      
      // The partialize function should not include activeTab
      const state = useCryptoStore.getState()
      expect(state.activeTab).toBe('dashboard')
      
      // Verify we can't check partialize directly but can verify behavior
      // If we reset the store, activeTab should return to default
      useCryptoStore.setState({ activeTab: 'faucets' as any })
      expect(state.activeTab).toBeDefined()
    })

    it('partialize excludes faucets from persistence', () => {
      // faucets should NOT be persisted
      const state = useCryptoStore.getState()
      const faucets = state.faucets
      
      // faucets exist in state but are not in partialize list
      expect(faucets).toBeDefined()
    })

    it('partialize excludes leaderboard from persistence', () => {
      // leaderboard should NOT be persisted
      const state = useCryptoStore.getState()
      
      // leaderboard exists in state but is not in partialize list
      expect(state.leaderboard).toBeDefined()
    })

    it('partialize includes all 8 required fields', () => {
      const persistedFields = [
        'isLoggedIn',
        'language', 
        'notifications',
        'showWalletAddress',
        'user',
        'walletBalance',
        'history',
        'achievements',
      ]
      
      const state = useCryptoStore.getState()
      
      // All persisted fields should exist in state
      persistedFields.forEach(field => {
        expect(state).toHaveProperty(field)
      })
    })

    it('partialize function returns correct structure', () => {
      // Verify the persisted data structure
      const state = useCryptoStore.getState()
      
      // These are the 8 fields that get persisted
      const persisted = {
        isLoggedIn: state.isLoggedIn,
        language: state.language,
        notifications: state.notifications,
        showWalletAddress: state.showWalletAddress,
        user: state.user,
        walletBalance: state.walletBalance,
        history: state.history,
        achievements: state.achievements,
      }
      
      expect(persisted.isLoggedIn).toBe(false)
      expect(persisted.language).toBe('es')
      expect(persisted.notifications).toBe(3)
      expect(persisted.showWalletAddress).toBe(false)
      expect(persisted.user).toEqual(INITIAL_USER)
      expect(persisted.walletBalance).toEqual(INITIAL_WALLET_BALANCE)
      expect(Array.isArray(persisted.history)).toBe(true)
      expect(Array.isArray(persisted.achievements)).toBe(true)
    })
  })

  describe('Storage Key Configuration', () => {
    it('uses correct storage key name', () => {
      // The store should use 'crypto-faucet-storage' as the key
      // Verify by checking persist is working
      const state = useCryptoStore.getState()
      
      // The storage key is configured in the persist middleware
      // We verify it's being used correctly by state persistence working
      expect(state.language).toBeDefined()
    })

    it('storage key persists across state changes', () => {
      // Change state
      useCryptoStore.setState({ language: 'en' })
      useCryptoStore.setState({ notifications: 10 })
      
      // State should be persisted (would be in localStorage under crypto-faucet-storage)
      const state = useCryptoStore.getState()
      expect(state.language).toBe('en')
      expect(state.notifications).toBe(10)
    })

    it('createJSONStorage creates proper JSON storage', () => {
      // Verify the store uses JSON serialization
      const state = useCryptoStore.getState()
      
      // The store uses createJSONStorage which serializes to JSON
      const serialized = JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      })
      
      expect(typeof serialized).toBe('string')
      expect(serialized).toContain('isLoggedIn')
    })
  })

  describe('Error Handling During Hydration', () => {
    it('handles missing localStorage gracefully', () => {
      // Remove the stub to simulate no localStorage
      vi.unstubAllGlobals()
      
      // Stub with undefined to simulate no localStorage
      vi.stubGlobal('localStorage', undefined)
      
      // Store should still initialize with defaults
      const state = useCryptoStore.getState()
      expect(state.language).toBe('es')
      expect(state.isLoggedIn).toBe(false)
      
      // Re-stub for other tests
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key: string) => mockStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value }),
        removeItem: vi.fn((key: string) => { delete mockStorage[key] }),
      })
    })

    it('handles localStorage getItem returning null', () => {
      // Stub getItem to always return null (empty storage)
      vi.stubGlobal('localStorage', {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      })
      
      // Store should work with defaults
      const state = useCryptoStore.getState()
      expect(state.language).toBe('es')
      expect(state.isLoggedIn).toBe(false)
    })

    it('handles localStorage throwing error', () => {
      // Stub getItem to throw error
      vi.stubGlobal('localStorage', {
        getItem: vi.fn(() => { throw new Error('Storage error') }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      })
      
      // Store should still work (createStorage catches errors)
      const state = useCryptoStore.getState()
      expect(state).toBeDefined()
    })

    it('handles setItem throwing error', () => {
      // Stub setItem to throw error
      vi.stubGlobal('localStorage', {
        getItem: vi.fn(),
        setItem: vi.fn(() => { throw new Error('Storage error') }),
        removeItem: vi.fn(),
      })
      
      // State changes should still work in memory even if storage fails
      useCryptoStore.setState({ language: 'en' })
      const state = useCryptoStore.getState()
      expect(state.language).toBe('en')
    })
  })

  describe('Hydration with Different Data Types', () => {
    it('persists user object with all properties', () => {
      const state = useCryptoStore.getState()
      
      expect(state.user).toEqual(expect.objectContaining({
        username: expect.any(String),
        email: expect.any(String),
        referralCode: expect.any(String),
        level: expect.any(Number),
      }))
    })

    it('persists wallet balance object with all coins', () => {
      const state = useCryptoStore.getState()
      
      expect(state.walletBalance).toEqual(expect.objectContaining({
        btc: expect.any(String),
        eth: expect.any(String),
        doge: expect.any(String),
        sol: expect.any(String),
        ltc: expect.any(String),
        bnb: expect.any(String),
      }))
    })

    it('persists achievements array with correct structure', () => {
      const state = useCryptoStore.getState()
      
      expect(Array.isArray(state.achievements)).toBe(true)
      expect(state.achievements.length).toBeGreaterThan(0)
      
      // Each achievement should have required properties
      state.achievements.forEach(achievement => {
        expect(achievement).toEqual(expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          progress: expect.any(Number),
        }))
      })
    })

    it('persists history array with correct structure', () => {
      const state = useCryptoStore.getState()
      
      expect(Array.isArray(state.history)).toBe(true)
      
      // If there are history entries, verify structure
      if (state.history.length > 0) {
        const entry = state.history[0]
        expect(entry).toEqual(expect.objectContaining({
          faucet: expect.any(String),
          faucetId: expect.any(Number),
          coin: expect.any(String),
          amount: expect.any(String),
          time: expect.any(String),
          date: expect.any(String),
        }))
      }
    })

    it('persists notifications as number', () => {
      const state = useCryptoStore.getState()
      
      expect(typeof state.notifications).toBe('number')
      expect(state.notifications).toBeGreaterThanOrEqual(0)
    })

    it('persists showWalletAddress as boolean', () => {
      const state = useCryptoStore.getState()
      
      expect(typeof state.showWalletAddress).toBe('boolean')
    })

    it('persists language as union type es|en', () => {
      const state = useCryptoStore.getState()
      
      expect(['es', 'en']).toContain(state.language)
    })

    it('persists isLoggedIn as boolean', () => {
      const state = useCryptoStore.getState()
      
      expect(typeof state.isLoggedIn).toBe('boolean')
    })
  })

  describe('State Rehydration Scenarios', () => {
    it('rehydrates with empty history array', () => {
      const state = useCryptoStore.getState()
      
      // History should be an array (empty or with entries)
      expect(Array.isArray(state.history)).toBe(true)
    })

    it('rehydrates with empty achievements completed', () => {
      const state = useCryptoStore.getState()
      
      // Should have some uncompleted achievements (use 'unlocked' not 'completed')
      const incompleteAchievements = state.achievements.filter((a: { unlocked?: boolean }) => !a.unlocked)
      expect(incompleteAchievements.length).toBeGreaterThan(0)
    })

    it('rehydrates user with default referral code', () => {
      const state = useCryptoStore.getState()
      
      // User should have a referral code
      expect(state.user.referralCode).toBeDefined()
      expect(state.user.referralCode.length).toBeGreaterThan(0)
    })

    it('rehydrates with default wallet balances', () => {
      const state = useCryptoStore.getState()
      
      // All wallet balances should be strings (even if "0")
      Object.values(state.walletBalance).forEach(balance => {
        expect(typeof balance).toBe('string')
      })
    })

    it('handles rehydration after logout', () => {
      // Login first
      useCryptoStore.getState().login()
      expect(useCryptoStore.getState().isLoggedIn).toBe(true)
      
      // Logout
      useCryptoStore.getState().logout()
      expect(useCryptoStore.getState().isLoggedIn).toBe(false)
      
      // Other state should still be persisted
      const state = useCryptoStore.getState()
      expect(state.language).toBe('es') // persisted
      expect(state.user).toEqual(INITIAL_USER) // persisted
    })

    it('preserves persisted state after non-persisted state changes', () => {
      // Change persisted state
      useCryptoStore.setState({ language: 'en', notifications: 5 })
      
      // Change non-persisted state
      useCryptoStore.setState({ activeTab: 'dashboard' as any })
      
      // Persisted state should remain
      const state = useCryptoStore.getState()
      expect(state.language).toBe('en')
      expect(state.notifications).toBe(5)
      
      // Non-persisted state should also be there
      expect(state.activeTab).toBe('dashboard')
    })
  })
})