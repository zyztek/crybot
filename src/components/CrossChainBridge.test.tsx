import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import CrossChainBridge from './CrossChainBridge'

describe('CrossChainBridge', () => {
  it('renders title', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Bridge Multi-Cadena')
  })

  it('renders subtitle', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Transfiere activos entre blockchains de forma segura')
  })

  it('renders language toggle button', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('EN')
  })

  it('renders chain selection dropdowns', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Desde')
    expect(container.textContent).toContain('Hasta')
  })

  it('renders token selection', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('USDC')
    expect(container.textContent).toContain('USDT')
  })

  it('renders amount input', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Ingresar cantidad')
  })

  it('renders available routes section', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Rutas disponibles')
  })

  it('renders stats section', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Stats')
    expect(container.textContent).toContain('Tu balance')
  })

  it('renders recent transactions section', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Transacciones recientes')
  })

  it('renders bridge button', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Enviar Bridge')
  })

  it('renders chain options', () => {
    const { container } = render(<CrossChainBridge />)
    expect(container.textContent).toContain('Ethereum')
    expect(container.textContent).toContain('BNB Chain')
  })
})