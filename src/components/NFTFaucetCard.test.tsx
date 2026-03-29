import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NFTFaucetCard from './NFTFaucetCard'

describe('NFTFaucetCard', () => {
  const defaultProps = {
    id: '1',
    name: 'Cosmic Ape #0001',
    collection: 'Cosmic Apes',
    image: '🦍',
    description: 'A rare cosmic ape from the galaxy far, far away.',
    rarity: 'legendary' as const,
    chain: 'Ethereum',
    price: 2.5,
    currency: 'ETH',
    nextClaim: '2h 30m',
    difficulty: 'hard',
    status: 'available' as const,
    claimed: false,
    totalClaimed: 1245,
    language: 'en' as const,
  }

  it('renders NFT name and collection correctly', () => {
    render(<NFTFaucetCard {...defaultProps} />)
    expect(screen.getByText('Cosmic Ape #0001')).toBeInTheDocument()
    expect(screen.getByText('Cosmic Apes')).toBeInTheDocument()
  })

  it('displays correct rarity badge', () => {
    render(<NFTFaucetCard {...defaultProps} />)
    expect(screen.getByText(/LEGENDARY/i)).toBeInTheDocument()
  })

  it('shows available status when status is available', () => {
    render(<NFTFaucetCard {...defaultProps} status="available" />)
    expect(screen.getByText(/Available/i)).toBeInTheDocument()
  })

  it('shows cooldown status when status is cooldown', () => {
    render(<NFTFaucetCard {...defaultProps} status="cooldown" />)
    expect(screen.getByText(/Cooldown:/i)).toBeInTheDocument()
  })

  it('shows locked status when status is locked', () => {
    render(<NFTFaucetCard {...defaultProps} status="locked" />)
    // Use getAllByText and check first match for status badge
    const lockedElements = screen.getAllByText(/Locked/i)
    expect(lockedElements.length).toBeGreaterThan(0)
    // The status badge should be the first element with locked text
    expect(lockedElements[0]).toBeInTheDocument()
  })

  it('displays chain and price correctly', () => {
    render(<NFTFaucetCard {...defaultProps} />)
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('2.5 ETH')).toBeInTheDocument()
  })

  it('displays total claimed count', () => {
    render(<NFTFaucetCard {...defaultProps} />)
    expect(screen.getByText(/1,245/i)).toBeInTheDocument()
  })

  it('claim button is enabled when status is available', () => {
    render(<NFTFaucetCard {...defaultProps} />)
    const button = screen.getByRole('button', { name: /claim nft/i })
    expect(button).not.toBeDisabled()
  })

  it('claim button is disabled when status is cooldown', () => {
    render(<NFTFaucetCard {...defaultProps} status="cooldown" />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('claim button is disabled when status is locked', () => {
    render(<NFTFaucetCard {...defaultProps} status="locked" />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows claimed badge when NFT is already claimed', () => {
    render(<NFTFaucetCard {...defaultProps} claimed={true} />)
    expect(screen.getByText(/Claimed!/i)).toBeInTheDocument()
  })

  it('renders in Spanish when language is es', () => {
    render(<NFTFaucetCard {...defaultProps} language="es" />)
    expect(screen.getByText(/Reclamar NFT/i)).toBeInTheDocument()
  })
})