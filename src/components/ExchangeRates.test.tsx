import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ExchangeRates from './ExchangeRates'

describe('ExchangeRates', () => {
  it('renders title', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Crypto Exchange Rates')
  })

  it('renders stats cards', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Market Cap Total')
    expect(container.textContent).toContain('Volumen 24h')
    expect(container.textContent).toContain('Gainers 24h')
    expect(container.textContent).toContain('Losers 24h')
  })

  it('renders search input', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('renders sort dropdown', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Sort: Market Cap')
  })

  it('renders coin table', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Bitcoin')
    expect(container.textContent).toContain('Ethereum')
    expect(container.textContent).toContain('Solana')
  })

  it('renders price values', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('$')
  })

  it('renders change percentages', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('%')
  })

  it('renders top gainers section', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Top Gainers')
  })

  it('renders top losers section', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Top Losers')
  })

  it('renders refresh button', () => {
    const { container } = render(<ExchangeRates />)
    expect(container.textContent).toContain('Refresh')
  })
})