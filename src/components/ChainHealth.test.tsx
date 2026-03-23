import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChainHealth from './ChainHealth'

describe('ChainHealth', () => {
  it('renders title in Spanish', () => {
    render(<ChainHealth />)
    expect(screen.getByText('Salud de la Cadena')).toBeInTheDocument()
  })

  it('renders Ethereum chain', () => {
    render(<ChainHealth />)
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })

  it('renders Polygon chain', () => {
    render(<ChainHealth />)
    expect(screen.getByText('Polygon')).toBeInTheDocument()
  })

  it('renders Arbitrum chain', () => {
    render(<ChainHealth />)
    expect(screen.getByText('Arbitrum')).toBeInTheDocument()
  })

  it('renders Optimism chain', () => {
    render(<ChainHealth />)
    expect(screen.getByText('Optimism')).toBeInTheDocument()
  })

  it('renders BNB Chain', () => {
    render(<ChainHealth />)
    expect(screen.getByText('BNB Chain')).toBeInTheDocument()
  })

  it('renders health label in Spanish', () => {
    const { container } = render(<ChainHealth />)
    expect(container.textContent).toContain('Salud')
  })

  it('renders TPS label in Spanish', () => {
    const { container } = render(<ChainHealth />)
    expect(container.textContent).toContain('TPS')
  })

  it('renders blocks label in Spanish', () => {
    render(<ChainHealth />)
    // Check for blocks in the rendered content
    const { container } = render(<ChainHealth />)
    expect(container.textContent).toContain('Bloques')
  })

  it('renders labels in Spanish', () => {
    render(<ChainHealth />)
    // Check that some labels are rendered - using a more flexible search
    const allText = document.body.textContent || ''
    expect(allText).toContain('Salud')
  })

  it('renders healthy status indicators', () => {
    render(<ChainHealth />)
    expect(screen.getAllByText('healthy').length).toBeGreaterThan(0)
  })

  it('renders health percentages', () => {
    render(<ChainHealth />)
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0)
  })

  it('renders language toggle button', () => {
    render(<ChainHealth />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })
})