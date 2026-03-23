import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import GasProfiler from './GasProfiler'

describe('GasProfiler', () => {
  it('renders title', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('Analizador de Gas')
  })

  it('renders gas stat cards', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('Gas Actual')
    expect(container.textContent).toContain('Bajo')
    expect(container.textContent).toContain('Promedio')
    expect(container.textContent).toContain('Alto')
  })

  it('renders gwei values', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('Gwei')
  })

  it('renders history section', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('Historial')
    expect(container.textContent).toContain('Últimos 30 min')
  })

  it('renders recommendations section', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('Recomendaciones')
  })

  it('renders language toggle button', () => {
    const { container } = render(<GasProfiler />)
    expect(container.textContent).toContain('EN')
  })
})