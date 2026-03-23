import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authApi, userApi, faucetApi, walletApi } from './api'

// Mock fetch globally
global.fetch = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

// Mock window.location.reload
const locationReloadMock = vi.fn()
vi.stubGlobal('location', { reload: locationReloadMock })

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockReset()
    localStorageMock.removeItem.mockReset()
  })

  describe('authApi', () => {
    it('should register a new user and store tokens', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: '1', email: 'test@test.com', username: 'test', referralCode: 'abc123', level: 1, totalEarned: '0', createdAt: '2024-01-01' },
          wallets: [],
          accessToken: 'access-token',
          refreshToken: 'refresh-token'
        }
      }
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await authApi.register({
        email: 'test@test.com',
        password: 'password123',
        username: 'test'
      })

      expect(result.user.email).toBe('test@test.com')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('accessToken', 'access-token')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('refreshToken', 'refresh-token')
    })

    it('should login with credentials and store tokens', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: '1', email: 'test@test.com', username: 'test', referralCode: 'abc123', level: 1, totalEarned: '0', createdAt: '2024-01-01' },
          wallets: [],
          accessToken: 'access-token',
          refreshToken: 'refresh-token'
        }
      }
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await authApi.login({
        email: 'test@test.com',
        password: 'password123'
      })

      expect(result.user.email).toBe('test@test.com')
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should throw error on failed login', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' })
      })

      await expect(authApi.login({
        email: 'test@test.com',
        password: 'wrong-password'
      })).rejects.toThrow('Invalid credentials')
    })

    it('should logout and clear tokens', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })

      await authApi.logout()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken')
    })

    it('should get current user data', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        username: 'test',
        referralCode: 'abc123',
        level: 1,
        totalEarned: '0',
        createdAt: '2024-01-01',
        wallets: [],
        achievements: []
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUser)
      })

      localStorageMock.getItem.mockReturnValue('some-token')

      const result = await authApi.getMe()

      expect(result.email).toBe('test@test.com')
    })
  })

  describe('userApi', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('test-token')
    })

    it('should get user profile', async () => {
      const mockProfile = {
        id: '1',
        email: 'test@test.com',
        username: 'test',
        walletAddress: null,
        referralCode: 'abc123',
        referrerEarnings: '0',
        referralCount: 0,
        level: 1,
        totalEarned: '0',
        createdAt: '2024-01-01',
        wallets: []
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProfile)
      })

      const result = await userApi.getProfile()

      expect(result.email).toBe('test@test.com')
      expect(result.username).toBe('test')
    })

    it('should update user profile', async () => {
      const mockUpdatedProfile = {
        id: '1',
        email: 'test@test.com',
        username: 'newusername',
        walletAddress: null,
        referralCode: 'abc123',
        referrerEarnings: '0',
        referralCount: 0,
        level: 1,
        totalEarned: '0',
        createdAt: '2024-01-01',
        wallets: []
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUpdatedProfile)
      })

      const result = await userApi.updateProfile({ username: 'newusername' })

      expect(result.username).toBe('newusername')
    })

    it('should get user referrals', async () => {
      const mockReferrals = {
        referrals: [],
        totalReferrals: 0,
        totalEarnings: '0'
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockReferrals)
      })

      const result = await userApi.getReferrals()

      expect(result.totalReferrals).toBe(0)
    })
  })

  describe('walletApi', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('test-token')
    })

    it('should get all wallets', async () => {
      const mockWallets = [
        { id: '1', userId: '1', coin: 'BTC', address: null, balance: '1000000', isCustodial: true },
        { id: '2', userId: '1', coin: 'ETH', address: null, balance: '500000000000000000', isCustodial: true }
      ]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockWallets)
      })

      const result = await walletApi.getAll()

      expect(result).toHaveLength(2)
      expect(result[0].coin).toBe('BTC')
    })

    it('should generate deposit address', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ coin: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' })
      })

      const result = await walletApi.generateDepositAddress('BTC')

      expect(result.coin).toBe('BTC')
      expect(result.address).toMatch(/^bc1/)
    })
  })

  describe('faucetApi', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('test-token')
    })

    it('should get all faucets', async () => {
      const mockFaucets = [
        { id: '1', name: 'Bitcoin Faucet', coin: 'BTC', network: 'testnet', amountMin: '100', amountMax: '1000', intervalHours: 24, isActive: true },
        { id: '2', name: 'Ethereum Faucet', coin: 'ETH', network: 'sepolia', amountMin: '1000000000000000', amountMax: '10000000000000000', intervalHours: 24, isActive: true }
      ]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFaucets)
      })

      const result = await faucetApi.getAll()

      expect(result).toHaveLength(2)
      expect(result[0].coin).toBe('BTC')
    })

    it('should claim faucet', async () => {
      const mockClaim = {
        id: '1',
        coin: 'BTC',
        amount: '500',
        status: 'confirmed',
        txHash: 'abc123',
        claimedAt: '2024-01-01T00:00:00Z'
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockClaim)
      })

      const result = await faucetApi.claim('BTC')

      expect(result.coin).toBe('BTC')
      expect(result.amount).toBe('500')
    })
  })

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network request failed'))

      await expect(authApi.login({ email: 'test@test.com', password: 'password' }))
        .rejects.toThrow()
    })

    it('should handle 401 and try token refresh', async () => {
      // First call returns 401
      // Second call to refresh returns success
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          status: 401,
          ok: false,
          json: () => Promise.resolve({ error: 'Unauthorized' })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ 
            data: { 
              accessToken: 'new-access-token', 
              refreshToken: 'new-refresh-token' 
            } 
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ user: {} })
        })

      localStorageMock.getItem.mockReturnValueOnce('expired-token').mockReturnValueOnce('refresh-token')

      const result = await authApi.getMe()
      // After refresh, the third call should succeed
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it('should clear tokens on refresh failure', async () => {
      // First call returns 401
      // Refresh also returns 401
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          status: 401,
          ok: false,
          json: () => Promise.resolve({ error: 'Unauthorized' })
        })
        .mockResolvedValueOnce({
          ok: false,
          json: () => Promise.resolve({ error: 'Invalid refresh token' })
        })

      localStorageMock.getItem
        .mockReturnValueOnce('expired-token')
        .mockReturnValueOnce('invalid-refresh-token')

      await expect(authApi.getMe()).rejects.toThrow('Session expired')
      
      // Tokens should be cleared
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken')
    })
  })
})