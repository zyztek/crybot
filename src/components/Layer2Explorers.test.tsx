import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Layer2Explorers from './Layer2Explorers'

describe('Layer2Explorers', () => {
  it('renders title', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('Exploradores Layer 2')
  })

  it('renders stats cards', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('Total Solutions')
    expect(container.textContent).toContain('Active Solutions')
    expect(container.textContent).toContain('Avg TPS')
  })

  it('renders L2 solutions', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('Arbitrum')
    expect(container.textContent).toContain('Optimism')
    expect(container.textContent).toContain('zkSync')
  })

  it('renders solution types', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('Rollup')
  })

  it('renders language toggle', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('EN')
  })

  it('renders status badges', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('Active')
    expect(container.textContent).toContain('Beta')
  })

  it('renders solution details', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('TVL')
    expect(container.textContent).toContain('Fee')
    expect(container.textContent).toContain('Finalidad')
  })

  it('renders features', () => {
    const { container } = render(<Layer2Explorers />)
    expect(container.textContent).toContain('EVM')
  })
})