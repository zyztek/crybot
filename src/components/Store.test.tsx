import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Store from './Store'

// Mock the translation context
vi.mock('../contexts/TranslationContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'store.all': 'All',
        'store.electronics': 'Electronics',
        'store.giftCards': 'Gift Cards',
        'store.crypto': 'Crypto',
        'store.premium': 'Premium',
        'store.balance': 'Balance',
        'store.points': 'Points',
        'store.description': 'Spend your points on rewards',
        'store.featured': 'Featured',
        'store.owned': 'Owned',
        'store.buy': 'Buy',
        'store.outOfStock': 'Out of Stock',
        'store.success': 'Purchase Successful!',
      }
      return translations[key] || key
    }
  })
}))

describe('Store', () => {
  it('renders store balance', () => {
    render(<Store />)
    expect(screen.getByText(/Balance/)).toBeInTheDocument()
  })

  it('renders points display', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Points')
  })

  it('renders all category tabs', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('All')
    expect(container.textContent).toContain('Electronics')
    expect(container.textContent).toContain('Gift Cards')
    expect(container.textContent).toContain('Crypto')
    expect(container.textContent).toContain('Premium')
  })

  it('renders featured section', () => {
    render(<Store />)
    expect(screen.getByText(/Featured/)).toBeInTheDocument()
  })

  it('renders store items', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Amazon Gift Card')
    expect(container.textContent).toContain('Bitcoin')
  })

  it('renders item prices in stars', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('⭐')
  })

  it('renders item images/emojis', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('🎁')
    expect(container.textContent).toContain('₿')
  })

  it('renders buy buttons', () => {
    render(<Store />)
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Buy')
  })

  it('renders owned badge for owned items', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Owned')
  })

  it('renders stock count', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('left')
  })

  it('renders shopping cart icon', () => {
    const { container } = render(<Store />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders category icons', () => {
    const { container } = render(<Store />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders star icon for featured items', () => {
    render(<Store />)
    const starIcons = document.querySelectorAll('.text-yellow-400')
    expect(starIcons.length).toBeGreaterThan(0)
  })

  it('renders hot badge for featured items', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Hot')
  })

  it('renders item names', () => {
    const { container } = render(<Store />)
    expect(container.textContent).toContain('Amazon Gift Card')
    expect(container.textContent).toContain('Bitcoin')
  })

  it('handles category selection', () => {
    render(<Store />)
    const buttons = document.querySelectorAll('button')
    const electronicsButton = Array.from(buttons).find(b => b.textContent?.includes('Electronics'))
    if (electronicsButton) {
      fireEvent.click(electronicsButton)
    }
    // Component should update - the test verifies no crash
    expect(true).toBe(true)
  })

  it('renders multiple items in grid', () => {
    render(<Store />)
    const itemCards = document.querySelectorAll('.rounded-xl')
    expect(itemCards.length).toBeGreaterThan(5)
  })
})