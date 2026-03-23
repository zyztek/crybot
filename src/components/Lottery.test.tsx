import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Lottery from './Lottery'

describe('Lottery', () => {
  it('renders lottery title', () => {
    render(<Lottery />)
    expect(screen.getByText('Crypto Lottery')).toBeInTheDocument()
  })

  it('renders jackpot display', () => {
    render(<Lottery />)
    expect(screen.getByText(/ JACKPOT/)).toBeInTheDocument()
  })

  it('renders pick your numbers section', () => {
    render(<Lottery />)
    expect(screen.getByText('Pick Your Numbers')).toBeInTheDocument()
  })

  it('renders selected count indicator', () => {
    render(<Lottery />)
    expect(screen.getByText(/selected/)).toBeInTheDocument()
  })

  it('renders buy ticket button', () => {
    render(<Lottery />)
    expect(screen.getByText(/Buy Ticket/)).toBeInTheDocument()
  })

  it('renders random button', () => {
    render(<Lottery />)
    expect(screen.getByText('Random')).toBeInTheDocument()
  })

  it('renders prize tiers section', () => {
    render(<Lottery />)
    expect(screen.getByText('Prize Tiers')).toBeInTheDocument()
  })

  it('renders jackpot amount', () => {
    const { container } = render(<Lottery />)
    expect(container.textContent).toContain('$50,000')
  })

  it('renders recent winners section', () => {
    render(<Lottery />)
    expect(screen.getByText('Recent Winners')).toBeInTheDocument()
  })

  it('renders next draw info', () => {
    render(<Lottery />)
    expect(screen.getByText(/Next Draw/)).toBeInTheDocument()
  })

  it('renders participants count', () => {
    render(<Lottery />)
    expect(screen.getByText(/Participants/)).toBeInTheDocument()
  })

  it('renders number grid', () => {
    render(<Lottery />)
    // Should have 49 numbers (1-49)
    expect(screen.getAllByText('1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('49').length).toBeGreaterThan(0)
  })
})