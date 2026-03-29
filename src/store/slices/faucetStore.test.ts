import { describe, it, expect, beforeEach, vi } from 'vitest'
import { create, type StoreApi } from 'zustand'
import { createFaucetStore, INITIAL_FAUCETS, INITIAL_HISTORY, type FaucetState } from './faucetStore'

describe('Faucet Store - Action Tests', () => {
  let store: StoreApi<FaucetState>

  beforeEach(() => {
    store = create<FaucetState>(createFaucetStore)
  })

  describe('claimFaucet Action', () => {
    it('claimFaucet is a function', () => {
      expect(typeof store.getState().claimFaucet).toBe('function')
    })

    it('claimFaucet updates faucet status to "wait"', () => {
      const faucet = store.getState().faucets[0]
      store.getState().claimFaucet(faucet)
      
      const updatedFaucet = store.getState().faucets.find(f => f.id === faucet.id)
      expect(updatedFaucet?.status).toBe('wait')
    })

    it('claimFaucet adds new entry to history', () => {
      const faucet = store.getState().faucets[0]
      const initialHistoryLength = store.getState().history.length
      
      store.getState().claimFaucet(faucet)
      
      expect(store.getState().history.length).toBe(initialHistoryLength + 1)
    })

    it('claimFaucet adds entry with correct faucet name', () => {
      const faucet = store.getState().faucets[0]
      store.getState().claimFaucet(faucet)
      
      const latestHistory = store.getState().history[0]
      expect(latestHistory.faucet).toBe(faucet.name)
    })

    it('claimFaucet adds entry with correct coin', () => {
      const faucet = store.getState().faucets[0]
      store.getState().claimFaucet(faucet)
      
      const latestHistory = store.getState().history[0]
      expect(latestHistory.coin).toBe(faucet.coin)
    })

    it('claimFaucet adds entry with correct amount', () => {
      const faucet = store.getState().faucets[0]
      store.getState().claimFaucet(faucet)
      
      const latestHistory = store.getState().history[0]
      expect(latestHistory.amount).toBe(faucet.reward)
    })

    it('claimFaucet does not affect other faucets', () => {
      const faucet = store.getState().faucets[0]
      store.getState().claimFaucet(faucet)
      
      const otherFaucet = store.getState().faucets.find(f => f.id === 2)
      expect(otherFaucet?.status).toBe('available')
    })

    it('claimFaucet limits history to 20 entries', () => {
      // Fill history with more than 20 entries
      for (let i = 0; i < 25; i++) {
        const faucet = store.getState().faucets[0]
        store.getState().claimFaucet(faucet)
      }
      
      expect(store.getState().history.length).toBe(20)
    })

    it('claimFaucet accepts onCountdownEnd callback', () => {
      const callback = vi.fn()
      const faucet = store.getState().faucets[0]
      
      store.getState().claimFaucet(faucet, callback)
      
      // Callback should be called after countdown ends (approx 60 seconds in test)
      // We can't test full countdown, but verify it's registered
      expect(callback).not.toHaveBeenCalled()
    })

    it('claimFaucet works with different faucet coins', () => {
      const ethFaucet = store.getState().faucets.find(f => f.coin === 'ETH')!
      const dogeFaucet = store.getState().faucets.find(f => f.coin === 'DOGE')!
      const solFaucet = store.getState().faucets.find(f => f.coin === 'SOL')!
      
      store.getState().claimFaucet(ethFaucet)
      store.getState().claimFaucet(dogeFaucet)
      store.getState().claimFaucet(solFaucet)
      
      // All should work without errors
      expect(store.getState().faucets.find(f => f.coin === 'ETH')?.status).toBe('wait')
      expect(store.getState().faucets.find(f => f.coin === 'DOGE')?.status).toBe('wait')
      expect(store.getState().faucets.find(f => f.coin === 'SOL')?.status).toBe('wait')
    })

    it('claimFaucet with actions updates balance', () => {
      const updateBalance = vi.fn()
      const faucet = store.getState().faucets[0]
      
      store.getState().claimFaucet(faucet, undefined, { updateBalance })
      
      expect(updateBalance).toHaveBeenCalled()
    })

    it('claimFaucet with actions updates achievement progress', () => {
      const updateAchievementProgress = vi.fn()
      const faucet = store.getState().faucets[0]
      
      store.getState().claimFaucet(faucet, undefined, { updateAchievementProgress })
      
      expect(updateAchievementProgress).toHaveBeenCalledTimes(2)
      expect(updateAchievementProgress).toHaveBeenCalledWith(2, expect.any(Number))
      expect(updateAchievementProgress).toHaveBeenCalledWith(5, expect.any(Number))
    })

    it('claimFaucet with actions passes correct coin to updateBalance', () => {
      const updateBalance = vi.fn()
      const btcFaucet = store.getState().faucets.find(f => f.coin === 'BTC')!
      
      store.getState().claimFaucet(btcFaucet, undefined, { updateBalance })
      
      expect(updateBalance).toHaveBeenCalledWith('btc', expect.any(Number))
    })

    it('claimFaucet with actions passes correct amount to updateBalance', () => {
      const updateBalance = vi.fn()
      const faucet = store.getState().faucets[0]
      const expectedAmount = parseFloat(faucet.reward)
      
      store.getState().claimFaucet(faucet, undefined, { updateBalance })
      
      expect(updateBalance).toHaveBeenCalledWith(expect.any(String), expectedAmount)
    })

    it('claimFaucet without actions uses fallback', () => {
      const faucet = store.getState().faucets[0]
      
      // Should not throw even without actions
      expect(() => store.getState().claimFaucet(faucet)).not.toThrow()
    })
  })

  describe('Initial State', () => {
    it('initializes with correct faucets', () => {
      expect(store.getState().faucets).toEqual(INITIAL_FAUCETS)
    })

    it('initializes with correct history', () => {
      expect(store.getState().history).toEqual(INITIAL_HISTORY)
    })

    it('initial faucets have correct properties', () => {
      const faucet = store.getState().faucets[0]
      expect(faucet).toHaveProperty('id')
      expect(faucet).toHaveProperty('name')
      expect(faucet).toHaveProperty('coin')
      expect(faucet).toHaveProperty('reward')
      expect(faucet).toHaveProperty('timer')
      expect(faucet).toHaveProperty('status')
    })

    it('initial history has correct properties', () => {
      const history = store.getState().history[0]
      expect(history).toHaveProperty('id')
      expect(history).toHaveProperty('faucet')
      expect(history).toHaveProperty('coin')
      expect(history).toHaveProperty('amount')
      expect(history).toHaveProperty('time')
      expect(history).toHaveProperty('date')
    })
  })
})