import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CrashGame from './CrashGame'
import { gameMockProps } from '../test/fixtures'

describe('CrashGame', () => {
  const mockProps = gameMockProps

  it('renders game title', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText(/Your Bet/)).toBeInTheDocument()
  })

  it('renders multiplier display', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText(/Multiplier/)).toBeInTheDocument()
  })

  it('renders potential win display', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText(/Potential Win/)).toBeInTheDocument()
  })

  it('renders auto cashout display', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getAllByText(/Auto Cashout/).length).toBeGreaterThan(0)
  })

  it('renders bet settings section', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText('Bet Settings')).toBeInTheDocument()
  })

  it('renders bet amount buttons', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getAllByText('10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('50').length).toBeGreaterThan(0)
    expect(screen.getAllByText('100').length).toBeGreaterThan(0)
  })

  it('renders auto cashout buttons', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getAllByText('1.5x').length).toBeGreaterThan(0)
    expect(screen.getAllByText('2x').length).toBeGreaterThan(0)
    expect(screen.getAllByText('3x').length).toBeGreaterThan(0)
  })

  it('renders recent crashes section', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText('Recent Crashes')).toBeInTheDocument()
  })

  it('renders place bet button when idle', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText(/Place Bet/)).toBeInTheDocument()
  })

  it('renders game info section', () => {
    render(<CrashGame {...mockProps} />)
    expect(screen.getByText('Game Info')).toBeInTheDocument()
  })

  it('renders crash history with multipliers', () => {
    render(<CrashGame {...mockProps} />)
    const historyText = document.body.textContent || ''
    expect(historyText).toContain('x')
  })

  it('displays initial multiplier value', () => {
    render(<CrashGame {...mockProps} />)
    const { container } = render(<CrashGame {...mockProps} />)
    expect(container.textContent).toContain('1.00')
  })
})