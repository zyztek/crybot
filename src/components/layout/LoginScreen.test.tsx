import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import { mockTranslations } from '@/test/fixtures';

// Mock the useApi hook
vi.mock('@/hooks/useApi', () => ({
  useApi: () => ({
    login: vi.fn().mockResolvedValue(true),
    register: vi.fn().mockResolvedValue(true),
    forgotPassword: vi.fn().mockResolvedValue(true),
    resetPassword: vi.fn().mockResolvedValue(true),
    isLoading: false,
  }),
}));

const renderComponent = (component: React.ReactElement) => {
  return render(component);
};

describe('LoginScreen', () => {
  it('renders the login form with title', () => {
    const onLogin = vi.fn();
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />);

    expect(screen.getByText('CryptoFaucet Hub')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    const onLogin = vi.fn();
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />);

    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('calls onLogin when login button is clicked', async () => {
    const onLogin = vi.fn();
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />);

    // Fill in the form fields
    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    fireEvent.click(loginButton);

    // Wait for the async login to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it('renders register button', () => {
    const onLogin = vi.fn();
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />);

    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    const onLogin = vi.fn();
    renderComponent(<LoginScreen t={mockTranslations} onLogin={onLogin} />);

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
  });
});
