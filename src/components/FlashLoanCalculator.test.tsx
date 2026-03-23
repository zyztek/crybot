import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FlashLoanCalculator from './FlashLoanCalculator'

describe('FlashLoanCalculator', () => {
  it('renders title', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Flash Loan Calculator')
  })

  it('renders protocol selection', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Select Protocol')
  })

  it('renders protocols', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Aave')
    expect(container.textContent).toContain('dYdX')
  })

  it('renders loan amount input', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Loan Amount')
  })

  it('renders fee calculation section', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Protocol Fee')
    expect(container.textContent).toContain('Fee Amount')
  })

  it('renders profit summary', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Net Profit')
  })

  it('renders simulation flow', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Flash Loan Flow Simulation')
  })

  it('renders strategy tips', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Flash Loan Strategies')
  })

  it('renders max loan info', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('Max Loan')
  })

  it('renders tokens', () => {
    const { container } = render(<FlashLoanCalculator />)
    expect(container.textContent).toContain('ETH')
    expect(container.textContent).toContain('USDC')
  })
})