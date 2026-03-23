import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import CryptoConverter from './CryptoConverter'

describe('CryptoConverter', () => {
  it('renders title', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Conversor de Criptomonedas')
  })

  it('renders from/to section', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('De')
    expect(container.textContent).toContain('A')
  })

  it('renders language toggle button', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('EN')
  })

  it('renders crypto/fiat toggle buttons', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Cripto')
    expect(container.textContent).toContain('Fiat')
  })

  it('renders currency dropdowns', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('BTC')
    expect(container.textContent).toContain('ETH')
    expect(container.textContent).toContain('USD')
  })

  it('renders convert section', () => {
    const { container } = render(<CryptoConverter />)
    // Convert section has calculate functionality
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('renders exchange rate display', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Tasa de cambio')
  })

  it('renders result section', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Resultado')
  })

  it('renders live exchange rates section', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Tasas de cambio en vivo')
  })

  it('renders conversion history section', () => {
    const { container } = render(<CryptoConverter />)
    expect(container.textContent).toContain('Historial de conversiones')
  })
})