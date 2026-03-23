import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import BlockchainExplorer from './BlockchainExplorer'

describe('BlockchainExplorer', () => {
  it('renders title', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Explorador Blockchain')
  })

  it('renders stats cards', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Último bloque')
    expect(container.textContent).toContain('Tx Count')
    expect(container.textContent).toContain('Gas Promedio')
    expect(container.textContent).toContain('TPS')
  })

  it('renders language toggle button', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('EN')
  })

  it('renders refresh button', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Actualizar')
  })

  it('renders search section', () => {
    const { container } = render(<BlockchainExplorer />)
    // Search section is rendered
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('renders view mode toggle', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Bloques')
    expect(container.textContent).toContain('Transacciones')
  })

  it('renders block info', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('# Bloque')
  })

  it('renders miner info', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Miner')
  })

  it('renders gas used info', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Gas Usado')
  })

  it('renders view block button', () => {
    const { container } = render(<BlockchainExplorer />)
    expect(container.textContent).toContain('Ver bloque')
  })
})