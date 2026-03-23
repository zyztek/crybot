import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCryptoStore } from '../store/cryptoStore'
import { texts } from '../i18n/translations'

// Reset store state before each test
beforeEach(() => {
  useCryptoStore.setState({
    isLoggedIn: false,
    language: 'en',
    notifications: 3,
    showWalletAddress: false,
  })
})

describe('Store-Component Integration Tests', () => {
  describe('Store State Access', () => {
    it('language state is accessible', () => {
      useCryptoStore.setState({ language: 'es' })
      expect(useCryptoStore.getState().language).toBe('es')
    })

    it('notifications count is accessible', () => {
      const notifications = useCryptoStore.getState().notifications
      expect(notifications).toBe(3)
    })

    it('wallet balance is accessible', () => {
      const balance = useCryptoStore.getState().walletBalance
      expect(balance.btc).toBeDefined()
      expect(balance.eth).toBeDefined()
    })

    it('user data is accessible', () => {
      const user = useCryptoStore.getState().user
      expect(user.username).toBeDefined()
      expect(user.referralCode).toBeDefined()
    })
  })

  describe('Store Actions Integration', () => {
    it('toggleLanguage updates state', () => {
      const { toggleLanguage } = useCryptoStore.getState()
      
      expect(useCryptoStore.getState().language).toBe('en')
      toggleLanguage()
      expect(useCryptoStore.getState().language).toBe('es')
    })

    it('toggleWalletAddress changes visibility', () => {
      const { toggleWalletAddress } = useCryptoStore.getState()
      
      expect(useCryptoStore.getState().showWalletAddress).toBe(false)
      toggleWalletAddress()
      expect(useCryptoStore.getState().showWalletAddress).toBe(true)
    })

    it('setActiveTab changes active tab', () => {
      const { setActiveTab } = useCryptoStore.getState()
      
      setActiveTab('dashboard')
      expect(useCryptoStore.getState().activeTab).toBe('dashboard')
      
      setActiveTab('wallet')
      expect(useCryptoStore.getState().activeTab).toBe('wallet')
    })
  })

  describe('Store with Translations', () => {
    it('translations accessible with store language', () => {
      useCryptoStore.setState({ language: 'en' })
      const t = texts[useCryptoStore.getState().language]
      expect(t.referralTitle).toBeDefined()
      
      useCryptoStore.setState({ language: 'es' })
      const tEs = texts[useCryptoStore.getState().language]
      expect(tEs.referralTitle).toBeDefined()
    })

    it('translations differ between languages', () => {
      const tEn = texts['en']
      const tEs = texts['es']
      
      expect(tEn.referralTitle).not.toBe(tEs.referralTitle)
    })
  })

  describe('Store State Consistency', () => {
    it('wallet balance has all required coins', () => {
      const balance = useCryptoStore.getState().walletBalance
      
      expect(balance.btc).toBeDefined()
      expect(balance.eth).toBeDefined()
      expect(balance.doge).toBeDefined()
      expect(balance.sol).toBeDefined()
      expect(balance.ltc).toBeDefined()
      expect(balance.bnb).toBeDefined()
    })

    it('user has all required fields', () => {
      const user = useCryptoStore.getState().user
      
      expect(user.username).toBeDefined()
      expect(user.email).toBeDefined()
      expect(user.referralCode).toBeDefined()
      expect(user.totalReferrals).toBeDefined()
    })

    it('faucets have correct initial state', () => {
      const faucets = useCryptoStore.getState().faucets
      
      expect(faucets.length).toBeGreaterThan(0)
      expect(faucets[0].id).toBeDefined()
      expect(faucets[0].name).toBeDefined()
      expect(faucets[0].coin).toBeDefined()
    })

    it('achievements have correct initial state', () => {
      const achievements = useCryptoStore.getState().achievements
      
      expect(achievements.length).toBeGreaterThan(0)
      expect(achievements[0].id).toBeDefined()
      expect(achievements[0].title).toBeDefined()
      expect(achievements[0].progress).toBeDefined()
    })
  })

  describe('Store User Actions', () => {
    it('copyReferralCode increments notifications', () => {
      vi.stubGlobal('navigator', {
        clipboard: { writeText: vi.fn() }
      })
      
      const { copyReferralCode } = useCryptoStore.getState()
      const initial = useCryptoStore.getState().notifications
      
      copyReferralCode()
      
      expect(useCryptoStore.getState().notifications).toBe(initial + 1)
      
      vi.unstubAllGlobals()
    })
  })

  describe('Store State Updates', () => {
    it('can update multiple state properties', () => {
      useCryptoStore.setState({
        language: 'es',
        notifications: 10,
        showWalletAddress: true,
      })
      
      const state = useCryptoStore.getState()
      expect(state.language).toBe('es')
      expect(state.notifications).toBe(10)
      expect(state.showWalletAddress).toBe(true)
    })

    it('partial state update preserves other state', () => {
      const initialState = useCryptoStore.getState()
      
      useCryptoStore.setState({ language: 'es' })
      
      const newState = useCryptoStore.getState()
      expect(newState.language).toBe('es')
      expect(newState.notifications).toBe(initialState.notifications)
      expect(newState.walletBalance).toEqual(initialState.walletBalance)
    })
  })

  describe('Store-Component Data Flow', () => {
    it('component would receive correct data from store', () => {
      // Simulate what a component would do
      const state = useCryptoStore.getState()
      
      // Language for component rendering
      const currentLanguage = state.language
      expect(['en', 'es']).toContain(currentLanguage)
      
      // Wallet for display
      const walletDisplay = `${state.walletBalance.btc} BTC`
      expect(walletDisplay).toContain('BTC')
      
      // User for profile
      const userDisplay = state.user.username
      expect(userDisplay).toBeDefined()
      
      // Notifications for badge
      const notificationCount = state.notifications
      expect(typeof notificationCount).toBe('number')
    })
  })
})