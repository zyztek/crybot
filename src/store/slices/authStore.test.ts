import { describe, it, expect } from 'vitest'
import { create } from 'zustand'
import { createAuthStore, type AuthState } from './authStore'

describe('Auth Store Slice', () => {
  it('initializes with isLoggedIn as false', () => {
    const store = create<AuthState>()(createAuthStore)
    expect(store.getState().isLoggedIn).toBe(false)
  })

  it('login sets isLoggedIn to true', () => {
    const store = create<AuthState>()(createAuthStore)
    store.getState().login()
    expect(store.getState().isLoggedIn).toBe(true)
  })

  it('logout sets isLoggedIn to false', () => {
    const store = create<AuthState>()(createAuthStore)
    store.getState().login()
    store.getState().logout()
    expect(store.getState().isLoggedIn).toBe(false)
  })

  it('login and logout are functions', () => {
    const store = create<AuthState>()(createAuthStore)
    expect(typeof store.getState().login).toBe('function')
    expect(typeof store.getState().logout).toBe('function')
  })

  it('multiple login calls keep isLoggedIn true', () => {
    const store = create<AuthState>()(createAuthStore)
    store.getState().login()
    store.getState().login()
    store.getState().login()
    expect(store.getState().isLoggedIn).toBe(true)
  })

  it('logout from already logged out state stays false', () => {
    const store = create<AuthState>()(createAuthStore)
    store.getState().logout()
    expect(store.getState().isLoggedIn).toBe(false)
  })

  it('login then logout then login toggles correctly', () => {
    const store = create<AuthState>()(createAuthStore)
    store.getState().login()
    expect(store.getState().isLoggedIn).toBe(true)
    store.getState().logout()
    expect(store.getState().isLoggedIn).toBe(false)
    store.getState().login()
    expect(store.getState().isLoggedIn).toBe(true)
  })
})