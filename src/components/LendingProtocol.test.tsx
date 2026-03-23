import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LendingProtocol from './LendingProtocol'

describe('LendingProtocol', () => {
  it('renders title', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Lending Protocol')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<LendingProtocol />)
    expect(screen.getByText(/Lend and borrow assets securely/i)).toBeInTheDocument()
  })

  it('renders TVL badge', () => {
    render(<LendingProtocol />)
    expect(screen.getByText(/TVL:/)).toBeInTheDocument()
  })

  it('renders Dashboard tab', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders Supply tab', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Supply')).toBeInTheDocument()
  })

  it('renders Borrow tab', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Borrow')).toBeInTheDocument()
  })

  it('renders Repay tab', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Repay')).toBeInTheDocument()
  })

  it('renders Markets tab', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Markets')).toBeInTheDocument()
  })

  it('renders Total Supplied label', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Total Supplied')).toBeInTheDocument()
  })

  it('renders Total Borrowed label', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Total Borrowed')).toBeInTheDocument()
  })

  it('renders Available to Borrow label', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Available to Borrow')).toBeInTheDocument()
  })

  it('renders Health Factor label', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Health Factor')).toBeInTheDocument()
  })

  it('renders Supply Positions section', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Supply Positions')).toBeInTheDocument()
  })

  it('renders Borrow Positions section', () => {
    render(<LendingProtocol />)
    expect(screen.getByText('Borrow Positions')).toBeInTheDocument()
  })

  it('renders USDC in markets', () => {
    // Click Markets tab to see market data
    render(<LendingProtocol />)
    const usdcElements = document.body.textContent || ''
    expect(usdcElements).toContain('USDC')
  })

  it('renders ETH in markets', () => {
    render(<LendingProtocol />)
    const ethElements = document.body.textContent || ''
    expect(ethElements).toContain('ETH')
  })
})