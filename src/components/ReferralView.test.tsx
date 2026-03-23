import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ReferralView from './ReferralView'
import { INITIAL_USER } from '../test/fixtures'

describe('ReferralView', () => {
  const mockProps = {
    user: INITIAL_USER,
    onCopy: vi.fn(),
    t: {
      referralTitle: 'Referral Program',
      referralDesc: 'Invite friends and earn rewards',
      yourCode: 'Your Code',
      copyCode: 'Copy',
      shareLink: 'Share Link',
      totalEarnings: 'Total Earnings',
    },
  }

  it('renders referral title', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Referral Program')).toBeInTheDocument()
  })

  it('renders referral description', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Invite friends and earn rewards')).toBeInTheDocument()
  })

  it('renders referral code', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText(INITIAL_USER.referralCode)).toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('renders share link button', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Share Link')).toBeInTheDocument()
  })

  it('renders total earnings section', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Total Earnings')).toBeInTheDocument()
  })

  it('renders referral count', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText(String(INITIAL_USER.totalReferrals))).toBeInTheDocument()
  })

  it('renders referral earnings', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText(INITIAL_USER.referralEarnings)).toBeInTheDocument()
  })

  it('renders your code label', () => {
    render(<ReferralView {...mockProps} />)
    expect(screen.getByText('Your Code')).toBeInTheDocument()
  })
})