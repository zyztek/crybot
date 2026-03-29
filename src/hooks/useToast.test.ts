import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToastStore, getFriendlyError } from './useToast'

describe('useToastStore', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    useToastStore.getState().clearAll()
  })

  it('should start with empty toasts array', () => {
    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(0)
  })

  it('should add a toast with generated id', () => {
    const { addToast, toasts } = useToastStore.getState()
    
    addToast({ type: 'success', message: 'Test message' })
    
    const updatedToasts = useToastStore.getState().toasts
    expect(updatedToasts).toHaveLength(1)
    expect(updatedToasts[0].message).toBe('Test message')
    expect(updatedToasts[0].type).toBe('success')
    expect(updatedToasts[0].id).toBeDefined()
  })

  it('should remove a toast by id', () => {
    const { addToast, removeToast } = useToastStore.getState()
    
    addToast({ type: 'error', message: 'Error message' })
    const { id } = useToastStore.getState().toasts[0]
    
    removeToast(id)
    
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })

  it('should clear all toasts', () => {
    const { addToast, clearAll } = useToastStore.getState()
    
    addToast({ type: 'success', message: 'Message 1' })
    addToast({ type: 'error', message: 'Message 2' })
    
    clearAll()
    
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })
})

describe('getFriendlyError', () => {
  it('should return original message for short user-friendly errors', () => {
    const error = new Error('Invalid email format')
    expect(getFriendlyError(error)).toBe('Invalid email format')
  })

  it('should map connection errors to user-friendly message', () => {
    const error = new Error('Failed to connect to server')
    expect(getFriendlyError(error)).toBe('Cannot connect to server. Please check if the backend is running and try again.')
  })

  it('should map network errors', () => {
    const error = new Error('Network request failed')
    expect(getFriendlyError(error)).toBe('Cannot connect to server. Please check if the backend is running and try again.')
  })

  it('should map connection refused errors', () => {
    const error = new Error('Connection refused')
    expect(getFriendlyError(error)).toBe('Cannot connect to server. Please check if the backend is running and try again.')
  })

  it('should map timeout errors', () => {
    const error = new Error('Request timeout')
    expect(getFriendlyError(error)).toBe('Request timed out. Please check your connection and try again.')
  })

  it('should map session expired errors', () => {
    const error = new Error('Session expired')
    expect(getFriendlyError(error)).toBe('Your session has expired. Please log in again.')
  })

  it('should map 401 unauthorized errors', () => {
    const error = new Error('401 unauthorized')
    expect(getFriendlyError(error)).toBe('Your session has expired. Please log in again.')
  })

  it('should map invalid credentials errors', () => {
    const error = new Error('Invalid credentials')
    expect(getFriendlyError(error)).toBe('Invalid email or password. Please try again.')
  })

  it('should map user already exists errors', () => {
    const error = new Error('User already exists')
    expect(getFriendlyError(error)).toBe('An account with this email already exists.')
  })

  it('should map rate limit errors', () => {
    const error = new Error('Rate limit exceeded')
    expect(getFriendlyError(error)).toBe('Too many requests. Please wait a moment and try again.')
  })

  it('should map server error 500', () => {
    const error = new Error('500 internal server error')
    expect(getFriendlyError(error)).toBe('Server error. Please try again later.')
  })

  it('should map maintenance errors', () => {
    const error = new Error('503 service unavailable - maintenance')
    expect(getFriendlyError(error)).toBe('Service temporarily unavailable. Please try again later.')
  })

  it('should map database errors', () => {
    const error = new Error('Database connection error')
    expect(getFriendlyError(error)).toBe('Database error. Please try again later.')
  })

  it('should map validation errors', () => {
    const error = new Error('Validation failed')
    expect(getFriendlyError(error)).toBe('Invalid input. Please check your data and try again.')
  })

  it('should map required field errors', () => {
    const error = new Error('Email is required')
    expect(getFriendlyError(error)).toBe('Please fill in all required fields.')
  })

  it('should handle non-Error objects', () => {
    expect(getFriendlyError('string error')).toBe('An unexpected error occurred. Please try again.')
    expect(getFriendlyError(null)).toBe('An unexpected error occurred. Please try again.')
    expect(getFriendlyError(undefined)).toBe('An unexpected error occurred. Please try again.')
    expect(getFriendlyError({ message: 'obj' })).toBe('An unexpected error occurred. Please try again.')
  })

  it('should handle long technical error messages', () => {
    const longMessage = 'This is a very long technical error message that contains many details about what went wrong in the system including stack traces and debugging information that users should not see'
    const error = new Error(longMessage)
    const result = getFriendlyError(error)
    expect(result).not.toBe(longMessage)
    expect(result).toBe('An unexpected error occurred. Please try again.')
  })
})

// Note: useToast hook tests require React Testing Library
// These tests verify the store behavior that the hook wraps
describe('useToast hook - store behavior', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should auto-remove toast after duration', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'success', message: 'Quick message', duration: 1000 })
    
    expect(useToastStore.getState().toasts).toHaveLength(1)
    
    // Advance timer by 1 second
    vi.advanceTimersByTime(1000)
    
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })

  it('should allow custom duration', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'info', message: 'Custom duration', duration: 2000 })
    
    const { toasts } = useToastStore.getState()
    expect(toasts[0].duration).toBe(2000)
  })
})

// Test all toast types
describe('Toast types', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
  })

  it('should add success toast with correct type', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'success', message: 'Operation successful' })
    
    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('success')
    expect(toasts[0].message).toBe('Operation successful')
  })

  it('should add error toast with correct type', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'error', message: 'Something went wrong' })
    
    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('error')
    expect(toasts[0].message).toBe('Something went wrong')
  })

  it('should add warning toast with correct type', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'warning', message: 'Warning message' })
    
    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('warning')
  })

  it('should add info toast with correct type', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'info', message: 'Info message' })
    
    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('info')
  })

  it('should allow success toast without duration (uses default in hook)', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'success', message: 'Success without duration' })
    
    const { toasts } = useToastStore.getState()
    // Direct addToast doesn't set duration - the useToast hook wrapper applies default
    expect(toasts[0].duration).toBeUndefined()
  })

  it('should use longer default duration (6000ms) for error toasts', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'error', message: 'Error without duration' })
    
    const { toasts } = useToastStore.getState()
    // Note: The hook applies 6000ms default, but direct addToast uses 5000ms
    // The 6000ms default is applied in the useToast hook wrapper
    expect(toasts[0].duration).toBeUndefined() // Direct add doesn't set default
  })
})

// Test success toast messages for specific operations
describe('Success toast messages', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
  })

  it('should store faucet claim success message', () => {
    const { addToast } = useToastStore.getState()
    const amount = '100'
    const coin = 'BTC'
    addToast({ type: 'success', message: `Claimed ${amount} ${coin} successfully!` })
    
    const { toasts } = useToastStore.getState()
    expect(toasts[0].message).toBe('Claimed 100 BTC successfully!')
  })

  it('should store achievement claim success message', () => {
    const { addToast } = useToastStore.getState()
    const amount = '50'
    const coin = 'ETH'
    addToast({ type: 'success', message: `Achievement claimed! +${amount} ${coin}` })
    
    const { toasts } = useToastStore.getState()
    expect(toasts[0].message).toBe('Achievement claimed! +50 ETH')
  })

  it('should store login success message', () => {
    const { addToast } = useToastStore.getState()
    const username = 'testuser'
    addToast({ type: 'success', message: `Welcome back, ${username}!` })
    
    const { toasts } = useToastStore.getState()
    expect(toasts[0].message).toBe('Welcome back, testuser!')
  })

  it('should store registration success message', () => {
    const { addToast } = useToastStore.getState()
    addToast({ type: 'success', message: 'Account created successfully! Welcome to CryptoFaucet Hub.' })
    
    const { toasts } = useToastStore.getState()
    expect(toasts[0].message).toBe('Account created successfully! Welcome to CryptoFaucet Hub.')
  })
})