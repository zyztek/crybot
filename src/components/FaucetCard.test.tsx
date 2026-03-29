import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FaucetCard from './FaucetCard'
import type { Faucet } from '@/types'

const mockFaucet: Faucet = {
  id: 1,
  name: 'FreeBitco.in',
  coin: 'BTC',
  icon: '₿',
  reward: '0.00001',
  timer: 60,
  status: 'available',
  category: 'hot',
  difficulty: 'easy',
  translations: {
    es: 'FreeBitco.in',
    en: 'FreeBitco.in',
  },
}

const mockFaucetWait: Faucet = {
  ...mockFaucet,
  status: 'wait',
  timer: 30,
}

describe('FaucetCard', () => {
  it('renders faucet name', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('FreeBitco.in')).toBeInTheDocument()
  })

  it('renders reward amount', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('0.00001')).toBeInTheDocument()
  })

  it('renders coin symbol', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('BTC')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('HOT')).toBeInTheDocument()
  })

  it('renders difficulty level', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('easy')).toBeInTheDocument()
  })

  it('renders claim button when faucet is available', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText(/Reclamar|Claim/)).toBeInTheDocument()
  })

  it('renders timer when faucet is not available', () => {
    render(<FaucetCard faucet={mockFaucetWait} onClaim={vi.fn()} language="es" />)
    // Timer appears in multiple elements - verify at least one exists
    expect(screen.getAllByText(/30s/).length).toBeGreaterThan(0)
  })

  it('renders wait message when status is wait', () => {
    render(<FaucetCard faucet={mockFaucetWait} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText(/restantes/)).toBeInTheDocument()
  })

  it('calls onClaim when claim button is clicked', () => {
    const onClaim = vi.fn()
    render(<FaucetCard faucet={mockFaucet} onClaim={onClaim} language="es" />)
    
    const button = screen.getByText(/Reclamar/)
    fireEvent.click(button)
    
    expect(onClaim).toHaveBeenCalledWith(mockFaucet)
  })

  it('renders featured class when featured prop is true', () => {
    const { container } = render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} featured={true} language="es" />)
    const article = container.querySelector('article')
    expect(article?.className).toContain('from-slate-800/80')
  })

  it('renders crown icon when featured', () => {
    const { container } = render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} featured={true} language="es" />)
    const crown = container.querySelector('svg')
    // Featured should show crown icon
    expect(crown).toBeInTheDocument()
  })

  it('renders claim button in English', () => {
    render(<FaucetCard faucet={mockFaucet} onClaim={vi.fn()} language="en" />)
    expect(screen.getByText('Claim')).toBeInTheDocument()
  })

  it('renders timer in English when not available', () => {
    render(<FaucetCard faucet={mockFaucetWait} onClaim={vi.fn()} language="en" />)
    expect(screen.getByText(/remaining/)).toBeInTheDocument()
  })

  it('renders different difficulty levels', () => {
    const mediumFaucet: Faucet = { ...mockFaucet, difficulty: 'medium' }
    render(<FaucetCard faucet={mediumFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('medium')).toBeInTheDocument()
  })

  it('renders hard difficulty', () => {
    const hardFaucet: Faucet = { ...mockFaucet, difficulty: 'hard' }
    render(<FaucetCard faucet={hardFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('hard')).toBeInTheDocument()
  })

  it('renders different categories', () => {
    const stableFaucet: Faucet = { ...mockFaucet, category: 'stable' }
    render(<FaucetCard faucet={stableFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('STABLE')).toBeInTheDocument()
  })

  it('renders new category', () => {
    const newFaucet: Faucet = { ...mockFaucet, category: 'new' }
    render(<FaucetCard faucet={newFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('renders premium category', () => {
    const premiumFaucet: Faucet = { ...mockFaucet, category: 'premium' }
    render(<FaucetCard faucet={premiumFaucet} onClaim={vi.fn()} language="es" />)
    expect(screen.getByText('PREMIUM')).toBeInTheDocument()
  })
})