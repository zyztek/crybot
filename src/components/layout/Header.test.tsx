import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { mockUser } from '@/test/fixtures'

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('Header', () => {
  it('renders logo and title', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={3} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('CryptoFaucet Hub')).toBeInTheDocument()
  })

  it('renders user info with username and level', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={3} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('CryptoUser123')).toBeInTheDocument()
    expect(screen.getByText('Nivel 12')).toBeInTheDocument()
  })

  it('renders user avatar', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={3} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('🦊')).toBeInTheDocument()
  })

  it('renders notification badge when notifications > 0', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={3} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not render notification badge when notifications = 0', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('renders language toggle button with correct language', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('calls onToggleLanguage when language button is clicked', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    const langButton = screen.getByText('ES')
    fireEvent.click(langButton)
    
    expect(onToggleLanguage).toHaveBeenCalledTimes(1)
  })

  it('renders XP progress bar', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('2450/5000 XP')).toBeInTheDocument()
  })

  it('renders referrals count', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByText('24 referidos')).toBeInTheDocument()
  })

  it('renders search input placeholder in Spanish', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="es" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByPlaceholderText('Buscar faucets...')).toBeInTheDocument()
  })

  it('renders search input placeholder in English', () => {
    const onToggleLanguage = vi.fn()
    renderComponent(
      <Header 
        user={mockUser} 
        language="en" 
        notifications={0} 
        onToggleLanguage={onToggleLanguage} 
      />
    )
    
    expect(screen.getByPlaceholderText('Search faucets...')).toBeInTheDocument()
  })
})