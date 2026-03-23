import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import WhaleAlerts from './WhaleAlerts'

describe('WhaleAlerts', () => {
  it('renders stats cards', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain("Today's Alerts")
    expect(container.textContent).toContain('Total Volume')
    expect(container.textContent).toContain('Buy Volume')
    expect(container.textContent).toContain('Sell Volume')
  })

  it('renders filter buttons', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('All')
    expect(container.textContent).toContain('Buys')
    expect(container.textContent).toContain('Sells')
    expect(container.textContent).toContain('Transfers')
    expect(container.textContent).toContain('Exchanges')
  })

  it('renders alert type labels', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('Whale Buy')
    expect(container.textContent).toContain('Whale Sell')
    expect(container.textContent).toContain('Large Transfer')
  })

  it('renders alert items with coin info', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('BTC')
    expect(container.textContent).toContain('ETH')
    expect(container.textContent).toContain('SOL')
  })

  it('renders impact badges', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('HIGH')
    expect(container.textContent).toContain('MEDIUM')
  })

  it('renders USD value', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('USD Value')
    expect(container.textContent).toContain('$')
  })

  it('renders min threshold slider', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('Min')
  })

  it('renders info box', () => {
    const { container } = render(<WhaleAlerts />)
    expect(container.textContent).toContain('What are Whale Alerts?')
  })
})