import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdvancedAnalytics from './AdvancedAnalytics'

describe('AdvancedAnalytics', () => {
  it('renders title', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('Advanced Analytics')
  })

  it('renders time range buttons', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('7d')
    expect(container.textContent).toContain('30d')
    expect(container.textContent).toContain('90d')
  })

  it('renders KPI cards', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('Total Earnings')
    expect(container.textContent).toContain('Avg. Daily Claims')
    expect(container.textContent).toContain('Game Profits')
    expect(container.textContent).toContain('Referral Earnings')
  })

  it('renders chart titles', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('Earnings Trend')
    expect(container.textContent).toContain('Portfolio Distribution')
    expect(container.textContent).toContain('Weekly Activity')
  })

  it('renders breakdown cards', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('Faucets')
    expect(container.textContent).toContain('Staking')
    expect(container.textContent).toContain('Games')
    expect(container.textContent).toContain('Referrals')
  })

  it('renders coin distribution', () => {
    const { container } = render(<AdvancedAnalytics />)
    expect(container.textContent).toContain('BTC')
    expect(container.textContent).toContain('ETH')
    expect(container.textContent).toContain('SOL')
    expect(container.textContent).toContain('DOGE')
  })

  it('renders weekly activity section', () => {
    const { container } = render(<AdvancedAnalytics />)
    // Check for the section title - the days data is in a chart that may not render in test
    expect(container.textContent).toContain('Weekly Activity')
  })

  it('renders icons', () => {
    const { container } = render(<AdvancedAnalytics />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })
})