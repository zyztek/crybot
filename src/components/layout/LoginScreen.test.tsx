import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginScreen from './LoginScreen'
import { mockTranslations } from '@/test/fixtures'

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('LoginScreen', () => {
  it('renders the login form with title', () => {
    const onLogin = vi.fn()
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />)
    
    expect(screen.getByText('CryptoFaucet Hub')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('renders email and password input fields', () => {
    const onLogin = vi.fn()
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />)
    
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('calls onLogin when login button is clicked', () => {
    const onLogin = vi.fn()
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />)
    
    const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i })
    fireEvent.click(loginButton)
    
    expect(onLogin).toHaveBeenCalledTimes(1)
  })

  it('renders register button', () => {
    const onLogin = vi.fn()
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />)
    
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument()
  })

  it('renders social login buttons', () => {
    const onLogin = vi.fn()
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />)
    
    expect(screen.getByText('Google')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('MetaMask')).toBeInTheDocument()
  })
})