import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FaucetScanner from './FaucetScanner'

describe('FaucetScanner', () => {
  it('renders title', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Faucet Scanner')
  })

  it('renders subtitle', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Real-time faucet status monitoring')
  })

  it('renders stats cards', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Paying')
    expect(container.textContent).toContain('Problems')
    expect(container.textContent).toContain('Daily Claims')
  })

  it('renders search input', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('renders filter dropdowns', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('All Status')
    expect(container.textContent).toContain('All Coins')
    expect(container.textContent).toContain('Sort by')
  })

  it('renders faucet table', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Reward')
    expect(container.textContent).toContain('Timer')
    expect(container.textContent).toContain('Rating')
    expect(container.textContent).toContain('Status')
  })

  it('renders faucet names', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('BigBTC Faucet')
    expect(container.textContent).toContain('ETH Rain')
  })

  it('renders coin options', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Bitcoin')
    expect(container.textContent).toContain('Ethereum')
  })

  it('renders refresh button', () => {
    const { container } = render(<FaucetScanner />)
    expect(container.textContent).toContain('Refresh')
  })
})