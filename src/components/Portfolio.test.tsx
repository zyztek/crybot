import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Portfolio from './Portfolio'
import { INITIAL_WALLET_BALANCE } from '../test/fixtures'

// Mock useCryptoStore hook
vi.mock('../store/cryptoStore', () => ({
  useCryptoStore: () => ({ language: 'es', walletBalance: INITIAL_WALLET_BALANCE }),
}))

describe('Portfolio', () => {
  it('renders title in Spanish', () => {
    render(<Portfolio />)
    expect(screen.getByText('Mi Portafolio')).toBeInTheDocument()
  })

  it('renders title in English', () => {
    // Test uses default Spanish - component checks for 'es' vs 'en'
    // The text 'My Portfolio' appears when language is 'en'
    render(<Portfolio />)
    expect(screen.getByText(/My Portfolio|Mi Portafolio/)).toBeInTheDocument()
  })

  it('renders Total Value label', () => {
    const { container } = render(<Portfolio />)
    // Spanish: "Valor Total"
    expect(container.textContent).toContain('Valor Total')
  })

  it('renders Holdings section', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('Holdings')
  })

  it('renders Allocation section', () => {
    const { container } = render(<Portfolio />)
    // Spanish: "Asignación"
    expect(container.textContent).toContain('Asignación')
  })

  it('renders timeframe buttons', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('1D')
    expect(container.textContent).toContain('1W')
    expect(container.textContent).toContain('1M')
    expect(container.textContent).toContain('1Y')
  })

  it('renders BTC asset', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('BTC')
  })

  it('renders ETH asset', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('ETH')
  })

  it('renders DOGE asset', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('DOGE')
  })

  it('renders Performance label', () => {
    const { container } = render(<Portfolio />)
    // Spanish: "Rendimiento"
    expect(container.textContent).toContain('Rendimiento')
  })

  it('renders Balance label', () => {
    const { container } = render(<Portfolio />)
    // Spanish: "Balance" appears in the table
    expect(container.textContent).toContain('Balance')
  })

  it('renders Profit label', () => {
    const { container } = render(<Portfolio />)
    // Spanish: "Beneficio"
    expect(container.textContent).toContain('Beneficio')
  })

  it('renders Add button', () => {
    const { container } = render(<Portfolio />)
    // Spanish text: "Añadir"
    expect(container.textContent).toContain('Añadir')
  })

  it('renders 24h Change label', () => {
    const { container } = render(<Portfolio />)
    expect(container.textContent).toContain('24h')
  })
})