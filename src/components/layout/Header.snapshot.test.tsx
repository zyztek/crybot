import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Header from './Header'
import type { User } from '@/types'

const mockUser: User = {
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

describe('Header Snapshot Tests', () => {
  it('matches snapshot with user and Spanish language', () => {
    const { container } = render(
      <Header
        user={mockUser}
        language="es"
        notifications={3}
        onToggleLanguage={() => {}}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot with user and English language', () => {
    const { container } = render(
      <Header
        user={mockUser}
        language="en"
        notifications={0}
        onToggleLanguage={() => {}}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot with no notifications', () => {
    const { container } = render(
      <Header
        user={mockUser}
        language="es"
        notifications={0}
        onToggleLanguage={() => {}}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})