import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FaucetCard from '@/components/FaucetCard'
import type { Faucet } from '@/types'

const mockFaucet: Faucet = {
  id: 1,
  name: 'FreeBitco.in',
  coin: 'BTC',
  icon: '₿',
  reward: '0.00001000',
  timer: 60,
  status: 'available',
  category: 'premium',
  difficulty: 'easy',
  translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' }
}

const mockFaucetWait: Faucet = {
  ...mockFaucet,
  id: 2,
  name: 'FireFaucet',
  status: 'wait',
  timer: 45
}

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('FaucetCard', () => {
  it('renders faucet name correctly', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('FreeBitco.in')).toBeInTheDocument()
  })

  it('renders reward amount and coin', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    // Reward is rendered as two elements: amount and coin in a span
    expect(screen.getByText('0.00001000')).toBeInTheDocument()
    expect(screen.getByText('BTC')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('PREMIUM')).toBeInTheDocument()
  })

  it('renders difficulty level', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('easy')).toBeInTheDocument()
  })

  it('renders timer duration', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('60s')).toBeInTheDocument()
  })

  it('shows claim button when status is available (Spanish)', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('Reclamar')).toBeInTheDocument()
  })

  it('shows claim button when status is available (English)', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="en"
      />
    )

    expect(screen.getByText('Claim')).toBeInTheDocument()
  })

  it('shows timer button when status is wait (Spanish)', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucetWait}
        onClaim={handleClaim}
        language="es"
      />
    )

    expect(screen.getByText('45s restantes')).toBeInTheDocument()
  })

  it('shows timer button when status is wait (English)', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucetWait}
        onClaim={handleClaim}
        language="en"
      />
    )

    expect(screen.getByText('45s remaining')).toBeInTheDocument()
  })

  it('calls onClaim when claim button is clicked', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    fireEvent.click(screen.getByText('Reclamar'))
    expect(handleClaim).toHaveBeenCalledWith(mockFaucet)
  })

  it('does not call onClaim when status is wait', () => {
    const handleClaim = vi.fn()
    renderComponent(
      <FaucetCard
        faucet={mockFaucetWait}
        onClaim={handleClaim}
        language="es"
      />
    )

    // Try clicking - should not trigger onClaim
    const timerButton = screen.getByText(/45s restantes/)
    fireEvent.click(timerButton)
    expect(handleClaim).not.toHaveBeenCalled()
  })

  it('renders featured variant with crown icon', () => {
    const handleClaim = vi.fn()
    const { container } = renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        featured={true}
        language="es"
      />
    )

    // Featured should have different styling classes
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-slate-800')
    expect(card.className).toContain('border-purple-500/30')
  })

  it('renders different coin colors for BTC', () => {
    const handleClaim = vi.fn()
    const { container } = renderComponent(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    const iconContainer = container.querySelector('.bg-gradient-to-r')
    expect(iconContainer?.className).toContain('from-yellow-400')
    expect(iconContainer?.className).toContain('to-orange-500')
  })

  it('renders different coin colors for ETH', () => {
    const handleClaim = vi.fn()
    const ethFaucet = { ...mockFaucet, coin: 'ETH', icon: 'Ξ' }
    const { container } = renderComponent(
      <FaucetCard
        faucet={ethFaucet}
        onClaim={handleClaim}
        language="es"
      />
    )

    const iconContainer = container.querySelector('.bg-gradient-to-r')
    expect(iconContainer?.className).toContain('from-blue-400')
    expect(iconContainer?.className).toContain('to-purple-500')
  })
})