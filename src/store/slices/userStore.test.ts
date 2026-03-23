import { describe, it, expect, vi } from 'vitest'
import { create } from 'zustand'
import { createUserStore, INITIAL_USER, type UserState } from './userStore'

describe('User Store Slice', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(),
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('initializes with correct user', () => {
    const store = create<UserState>()(createUserStore)
    expect(store.getState().user).toEqual(INITIAL_USER)
  })

  it('initializes with 3 notifications', () => {
    const store = create<UserState>()(createUserStore)
    expect(store.getState().notifications).toBe(3)
  })

  it('copyReferralCode increments notifications', () => {
    const store = create<UserState>()(createUserStore)
    store.getState().copyReferralCode()
    expect(store.getState().notifications).toBe(4)
  })

  it('copyReferralCode writes to clipboard', () => {
    const store = create<UserState>()(createUserStore)
    store.getState().copyReferralCode()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(INITIAL_USER.referralCode)
  })

  it('copyReferralCode can be called multiple times', () => {
    const store = create<UserState>()(createUserStore)
    store.getState().copyReferralCode()
    store.getState().copyReferralCode()
    store.getState().copyReferralCode()
    expect(store.getState().notifications).toBe(6)
  })

  it('copyReferralCode is a function', () => {
    const store = create<UserState>()(createUserStore)
    expect(typeof store.getState().copyReferralCode).toBe('function')
  })
})