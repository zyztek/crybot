import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }]
    }))
    
    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration || 5000
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, duration)
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
  },
  clearAll: () => set({ toasts: [] })
}))

// Helper to show error toasts with user-friendly messages
export const useToast = () => {
  const { addToast, removeToast } = useToastStore()
  
  const success = (message: string, duration?: number) => {
    addToast({ type: 'success', message, duration })
  }
  
  const error = (message: string, duration?: number) => {
    addToast({ type: 'error', message, duration: duration || 6000 })
  }
  
  const warning = (message: string, duration?: number) => {
    addToast({ type: 'warning', message, duration })
  }
  
  const info = (message: string, duration?: number) => {
    addToast({ type: 'info', message, duration })
  }
  
  return { success, error, warning, info, removeToast }
}

// Convert API error to user-friendly message
export function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    
    // Network errors (check these first as they're most specific)
    if (message.includes('connection refused') || message.includes('failed to connect') || message.includes('unable to connect')) {
      return 'Cannot connect to server. Please check if the backend is running and try again.'
    }
    
    if (message.includes('timeout')) {
      return 'Request timed out. Please check your connection and try again.'
    }
    
    if (message.includes('fetch') || message.includes('network')) {
      return 'Cannot connect to server. Please check if the backend is running and try again.'
    }
    
    // Authentication errors - check before generic validation
    if (message.includes('session expired') || message.includes('unauthorized') || message.includes('401')) {
      return 'Your session has expired. Please log in again.'
    }
    
    if (message.includes('invalid credentials') || message.includes('incorrect password') || message.includes('invalid password') || message.includes('wrong password')) {
      return 'Invalid email or password. Please try again.'
    }
    
    if (message.includes('user already exists') || message.includes('email already')) {
      return 'An account with this email already exists.'
    }
    
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    
    // Server errors
    if (message.includes('500') || message.includes('server error') || message.includes('internal error')) {
      return 'Server error. Please try again later.'
    }
    
    if (message.includes('503') || message.includes('maintenance')) {
      return 'Service temporarily unavailable. Please try again later.'
    }
    
    // Database errors
    if (message.includes('prisma') || message.includes('database')) {
      return 'Database error. Please try again later.'
    }
    
    // Validation errors - check specific ones before generic
    if (message.includes('required') || message.includes('missing')) {
      return 'Please fill in all required fields.'
    }
    
    if (message.includes('validation') || message.includes('invalid input')) {
      return 'Invalid input. Please check your data and try again.'
    }
    
    // Return the original message if it's short enough (user-friendly already)
    if (message.length < 100) {
      return error.message
    }
  }
  
  // Fallback for unknown errors
  return 'An unexpected error occurred. Please try again.'
}

export default useToastStore