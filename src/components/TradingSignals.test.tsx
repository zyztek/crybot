import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TradingSignals from './TradingSignals'

describe('TradingSignals', () => {
  it('renders title', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('Trading Signals')
  })

  it('renders stats cards', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('Active Signals')
    expect(container.textContent).toContain('Win Rate')
    expect(container.textContent).toContain('Avg. Profit')
    expect(container.textContent).toContain('This Month')
  })

  it('renders filter buttons', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('All')
    expect(container.textContent).toContain('Long')
    expect(container.textContent).toContain('Short')
    expect(container.textContent).toContain('Active')
  })

  it('renders signal items', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('BTC/USDT')
    expect(container.textContent).toContain('ETH/USDT')
    expect(container.textContent).toContain('SOL/USDT')
  })

  it('renders signal type labels', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('LONG')
    expect(container.textContent).toContain('SHORT')
  })

  it('renders signal status labels', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('ACTIVE')
    expect(container.textContent).toContain('HIT')
    expect(container.textContent).toContain('PENDING')
  })

  it('renders price information', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('Entry')
    expect(container.textContent).toContain('Target')
    expect(container.textContent).toContain('Stop Loss')
  })

  it('renders confidence percentage', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('Confidence')
  })

  it('renders premium upgrade section', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('Unlock Premium Signals')
    expect(container.textContent).toContain('Upgrade to Premium')
  })

  it('renders timeframe information', () => {
    const { container } = render(<TradingSignals />)
    expect(container.textContent).toContain('4H')
    expect(container.textContent).toContain('1D')
    expect(container.textContent).toContain('1H')
  })
})