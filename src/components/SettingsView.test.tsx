import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsView from './SettingsView'
import { INITIAL_USER } from '../test/fixtures'

describe('SettingsView', () => {
  const mockProps = {
    user: {
      username: INITIAL_USER.username,
      email: INITIAL_USER.email,
      memberSince: 'January 2024',
      avatar: '👤',
    },
    t: {
      security: 'Security',
      notifications: 'Notifications',
      preferences: 'Preferences',
      logout: 'Logout',
    },
    lang: 'es' as const,
    theme: 'dark' as const,
    onToggleTheme: vi.fn(),
    onLogout: vi.fn(),
  }

  it('renders profile section title', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders user username', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText(INITIAL_USER.username)).toBeInTheDocument()
  })

  it('renders user email', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText(INITIAL_USER.email)).toBeInTheDocument()
  })

  it('renders member since text', () => {
    const { container } = render(<SettingsView {...mockProps} />)
    expect(container.textContent).toContain('Member since')
  })

  it('renders avatar', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('👤')).toBeInTheDocument()
  })

  it('renders edit profile button', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
  })

  it('renders security section', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders 2FA option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('2FA Authentication')).toBeInTheDocument()
  })

  it('renders 2FA enabled status', () => {
    const { container } = render(<SettingsView {...mockProps} />)
    expect(container.textContent).toContain('Enabled')
  })

  it('renders change password option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Change Password')).toBeInTheDocument()
  })

  it('renders change password last changed text', () => {
    const { container } = render(<SettingsView {...mockProps} />)
    expect(container.textContent).toContain('Last changed')
  })

  it('renders notifications section', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders email notifications option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
  })

  it('renders push notifications option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Push Notifications')).toBeInTheDocument()
  })

  it('renders claim reminders option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Claim Reminders')).toBeInTheDocument()
  })

  it('renders referral updates option', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Referral Updates')).toBeInTheDocument()
  })

  it('renders preferences section', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Preferences')).toBeInTheDocument()
  })

  it('renders language preference', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('renders currency preference', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('BTC')).toBeInTheDocument()
  })

  it('renders theme preference', () => {
    render(<SettingsView {...mockProps} />)
    // Theme is rendered as a toggle button, check that it's present
    const themeToggle = document.querySelector('.rounded-full.w-14')
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders logout button', () => {
    render(<SettingsView {...mockProps} />)
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls onLogout when logout button clicked', () => {
    render(<SettingsView {...mockProps} />)
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    expect(mockProps.onLogout).toHaveBeenCalled()
  })

  it('renders notification toggles', () => {
    render(<SettingsView {...mockProps} />)
    const toggles = document.querySelectorAll('.rounded-full')
    expect(toggles.length).toBeGreaterThan(0)
  })

  it('renders security icons', () => {
    const { container } = render(<SettingsView {...mockProps} />)
    expect(container.querySelector('.text-green-400')).toBeInTheDocument()
  })
})