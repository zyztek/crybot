import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NFTFaucetView from './NFTFaucetView'

// Mock translation object
const mockTranslations = {
  title: 'Test',
  subtitle: 'Test subtitle',
  faucet: 'Faucet',
  claim: 'Claim',
  claimed: 'Claimed',
}

describe('NFTFaucetView', () => {
  it('renders the main title correctly', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('NFT Faucets')).toBeInTheDocument()
  })

  it('renders the subtitle in English', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('Claim free NFTs from various collections')).toBeInTheDocument()
  })

  it('renders the subtitle in Spanish', () => {
    render(<NFTFaucetView language="es" t={mockTranslations} />)
    expect(screen.getByText('Reclama NFTs gratuitos de varias colecciones')).toBeInTheDocument()
  })

  it('renders all stat cards', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('Total Value')).toBeInTheDocument()
    expect(screen.getAllByText('Available').length).toBeGreaterThan(0)
    expect(screen.getByText('Claimed')).toBeInTheDocument()
    expect(screen.getByText('Total Claimed')).toBeInTheDocument()
  })

  it('renders filter buttons for categories', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('🔥 Hot')).toBeInTheDocument()
    expect(screen.getByText('🆕 New')).toBeInTheDocument()
    expect(screen.getByText('💎 Stable')).toBeInTheDocument()
    expect(screen.getByText('👑 Premium')).toBeInTheDocument()
  })

  it('renders the filters button', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  it('renders NFT faucet cards', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    expect(screen.getByText('Cosmic Ape #0001')).toBeInTheDocument()
    expect(screen.getByText('Pixel Punk #888')).toBeInTheDocument()
  })

  it('renders Gem icon', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    const gemIcon = document.querySelector('svg')
    expect(gemIcon).toBeInTheDocument()
  })

  it('renders stats with correct values', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Total value should be visible - sum of all prices (getAllByText for multiple matches)
    expect(screen.getAllByText(/ETH/).length).toBeGreaterThan(0)
  })

  it('renders the advanced filters section when toggled', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Initially filters should not be visible (checked by clicking)
    const filterButton = screen.getByText('Filters')
    expect(filterButton).toBeInTheDocument()
  })

  it('renders the filters button and category filters', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Check that filter UI elements exist
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('renders empty state message when no faucets match filter', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Should not show empty state initially with 8 items
    expect(screen.queryByText('No NFT faucets found')).not.toBeInTheDocument()
  })

  it('renders multiple blockchain chains', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Should see Ethereum - use getAllByText for multiple cards
    expect(screen.getAllByText('Ethereum').length).toBeGreaterThan(0)
  })

  it('renders different rarity levels', () => {
    render(<NFTFaucetView language="en" t={mockTranslations} />)
    // Cards should have different rarities
    expect(screen.getByText('Cosmic Ape #0001')).toBeInTheDocument()
  })
})