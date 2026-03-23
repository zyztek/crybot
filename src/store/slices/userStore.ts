import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import type { User } from '@/types'
import { texts } from '@/i18n/translations'

export const INITIAL_USER: User = {
  username: 'CryptoUser123',
  email: 'user@email.com',
  level: 12,
  xp: 2450,
  maxXp: 5000,
  memberSince: '2024-01-15',
  avatar: '🦊',
  twoFactorEnabled: true,
  referralCode: 'CRYPTO2024',
  totalReferrals: 24,
  referralEarnings: '0.00450 BTC'
}

export interface UserState {
  user: User
  notifications: number
  copyReferralCode: () => void
}

export const createUserStore: StateCreator<UserState> = (set, get) => ({
  user: INITIAL_USER,
  notifications: 3,
  copyReferralCode: () => {
    const state = get()
    navigator.clipboard.writeText(state.user.referralCode)
    set({ notifications: state.notifications + 1 })
  },
})

// Re-export texts for convenience
export { texts }