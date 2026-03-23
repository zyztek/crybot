import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Wallet } from 'lucide-react'
import StatCard from './StatCard'

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    renderComponent(
      <StatCard
        icon={<Wallet />}
        title="Total Balance"
        value="1.5 BTC"
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
    )

    expect(screen.getByText('Total Balance')).toBeInTheDocument()
    expect(screen.getByText('1.5 BTC')).toBeInTheDocument()
  })

  it('renders the icon element', () => {
    renderComponent(
      <StatCard
        icon={<Wallet data-testid="wallet-icon" />}
        title="Balance"
        value="100"
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
    )

    expect(screen.getByTestId('wallet-icon')).toBeInTheDocument()
  })

  it('applies correct color classes', () => {
    const { container } = renderComponent(
      <StatCard
        icon={<Wallet />}
        title="Test"
        value="0"
        color="from-green-500/20 to-emerald-500/20"
        borderColor="border-green-500/30"
        iconColor="text-green-400"
        iconBg="bg-green-500/20"
      />
    )

    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-green-500/20')
    expect(card.className).toContain('to-emerald-500/20')
    expect(card.className).toContain('border-green-500/30')
  })

  it('renders different values correctly', () => {
    renderComponent(
      <StatCard
        icon={<Wallet />}
        title="Claimed"
        value="0.00023045 BTC"
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
    )

    expect(screen.getByText('0.00023045 BTC')).toBeInTheDocument()
  })

  it('renders title even when value is empty', () => {
    renderComponent(
      <StatCard
        icon={<Wallet />}
        title="Empty Value"
        value=""
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
    )

    expect(screen.getByText('Empty Value')).toBeInTheDocument()
  })
})