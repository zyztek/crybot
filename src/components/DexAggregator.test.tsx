import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import DexAggregator from './DexAggregator'

describe('DexAggregator', () => {
  it('renders title', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('DEX Aggregator')
  })

  it('renders tabs', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Swap')
    expect(container.textContent).toContain('Limit Order')
    expect(container.textContent).toContain('Cross-Chain')
    expect(container.textContent).toContain('Flash Loan')
  })

  it('renders swap panel with token selectors', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Sell')
    expect(container.textContent).toContain('Buy')
  })

  it('renders token options', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('ETH')
    expect(container.textContent).toContain('BTC')
    expect(container.textContent).toContain('USDC')
    expect(container.textContent).toContain('USDT')
  })

  it('renders quote summary', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Best Price')
    expect(container.textContent).toContain('Expected Output')
    expect(container.textContent).toContain('Gas (est.)')
    expect(container.textContent).toContain('Price Impact')
  })

  it('renders swap button', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Swap Now')
  })

  it('renders quotes table with DEX names', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Uniswap V3')
    expect(container.textContent).toContain('1inch')
    expect(container.textContent).toContain('Curve')
    expect(container.textContent).toContain('Balancer')
    expect(container.textContent).toContain('Paraswap')
  })

  it('renders stats cards', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('Supported DEXs')
    expect(container.textContent).toContain('Chains')
    expect(container.textContent).toContain('Avg Savings')
    expect(container.textContent).toContain('Users')
  })

  it('renders volume indicator', () => {
    const { container } = render(<DexAggregator />)
    expect(container.textContent).toContain('24h Volume')
  })

  it('renders icons', () => {
    const { container } = render(<DexAggregator />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('renders trade buttons', () => {
    const { container } = render(<DexAggregator />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})