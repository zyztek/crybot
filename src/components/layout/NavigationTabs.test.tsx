import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NavigationTabs from './NavigationTabs'
import { mockTranslations, mockFaucets, mockAchievements } from '@/test/fixtures'

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('NavigationTabs', () => {
  it('renders all main navigation tabs with translations', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    expect(screen.getByText('Faucets')).toBeInTheDocument()
    expect(screen.getByText('Panel')).toBeInTheDocument()
    expect(screen.getByText('Billetera')).toBeInTheDocument()
    expect(screen.getByText('Referidos')).toBeInTheDocument()
    expect(screen.getByText('Ranking')).toBeInTheDocument()
    expect(screen.getByText('Logros')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('renders faucet count badge', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="dashboard"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Should show 12 available faucets (all in INITIAL_FAUCETS have status: 'available')
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('renders achievements count badge', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="settings"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Should show unlocked achievements count (3: ids 1, 4, 6 are unlocked)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders non-translated tabs', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Signals')).toBeInTheDocument()
    expect(screen.getByText('Whale Alerts')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders Games tab with Spanish translation', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    expect(screen.getByText('Juegos')).toBeInTheDocument()
  })

  it('renders Games tab with English translation', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="en"
        t={mockTranslations}
      />
    )

    expect(screen.getByText('Games')).toBeInTheDocument()
  })

  it('calls onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    const dashboardTab = screen.getByText('Panel')
    fireEvent.click(dashboardTab)

    expect(onTabChange).toHaveBeenCalledWith('dashboard')
  })

  it('renders DAO and other DeFi tabs', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    expect(screen.getByText('DAO')).toBeInTheDocument()
    expect(screen.getByText('DEX')).toBeInTheDocument()
    expect(screen.getByText('Lending')).toBeInTheDocument()
    expect(screen.getByText('Token Sale')).toBeInTheDocument()
  })

  it('applies active styling to faucets tab when activeTab is faucets', () => {
    const onTabChange = vi.fn()
    const { container } = renderComponent(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    const faucetsTab = container.querySelector('button:first-child')
    expect(faucetsTab?.className).toContain('bg-purple-500')
    expect(faucetsTab?.className).toContain('text-white')
    expect(faucetsTab?.className).toContain('shadow-lg')
  })

  it('applies inactive styling to non-active tabs', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="dashboard"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Faucets tab should be inactive - has text-purple-300 (not text-white)
    const faucetsTab = screen.getByText('Faucets').closest('button')
    expect(faucetsTab?.className).toContain('text-purple-300')
    expect(faucetsTab?.className).not.toContain('text-white')
    
    // Dashboard tab should be active
    const dashboardTab = screen.getByText('Panel').closest('button')
    expect(dashboardTab?.className).toContain('bg-purple-500')
    expect(dashboardTab?.className).toContain('text-white')
  })

  it('applies active styling to wallet tab when activeTab is wallet', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="wallet"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Find the wallet tab by its text content
    const walletTab = screen.getByText('Billetera').closest('button')
    expect(walletTab?.className).toContain('bg-purple-500')
    expect(walletTab?.className).toContain('text-white')
  })

  it('applies active styling to achievements tab when activeTab is achievements', () => {
    const onTabChange = vi.fn()
    renderComponent(
      <NavigationTabs
        activeTab="achievements"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Find the achievements tab by its text content
    const achievementsTab = screen.getByText('Logros').closest('button')
    expect(achievementsTab?.className).toContain('bg-purple-500')
    expect(achievementsTab?.className).toContain('text-white')
  })

  it('switches active styling when activeTab changes', () => {
    const onTabChange = vi.fn()
    
    // First render with dashboard active
    const { rerender } = renderComponent(
      <NavigationTabs
        activeTab="dashboard"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Dashboard tab should be active
    const dashboardTab = screen.getByText('Panel').closest('button')
    expect(dashboardTab?.className).toContain('bg-purple-500')
    
    // Faucets tab should be inactive - use text-white check instead of bg check
    const faucetsTab = screen.getByText('Faucets').closest('button')
    expect(faucetsTab?.className).not.toContain('text-white')

    // Rerender with faucets active
    rerender(
      <NavigationTabs
        activeTab="faucets"
        onTabChange={onTabChange}
        faucets={mockFaucets}
        achievements={mockAchievements}
        language="es"
        t={mockTranslations}
      />
    )

    // Now faucets should be active
    const faucetsTabNowActive = screen.getByText('Faucets').closest('button')
    expect(faucetsTabNowActive?.className).toContain('text-white')
    
    // And dashboard should be inactive
    const dashboardTabNowInactive = screen.getByText('Panel').closest('button')
    expect(dashboardTabNowInactive?.className).not.toContain('text-white')
  })
})