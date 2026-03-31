import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestnetView from './TestnetView';

// Mock translation object - cast to any to bypass strict type checking
// The component doesn't actually use these translations (uses hardcoded text instead)
const mockTranslations = {
  title: 'Testnets',
  faucet: 'Faucet',
} as any;

describe('TestnetView', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders the header title in English', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    expect(screen.getByText('Available Testnets')).toBeInTheDocument();
  });

  it('renders the header title in Spanish', () => {
    render(<TestnetView language="es" t={mockTranslations} />);
    expect(screen.getByText('Testnets Disponibles')).toBeInTheDocument();
  });

  it('renders all testnet cards', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    expect(screen.getByText('Polygon Mumbai')).toBeInTheDocument();
    expect(screen.getByText('Arbitrum Sepolia')).toBeInTheDocument();
    expect(screen.getByText('Optimism Sepolia')).toBeInTheDocument();
    expect(screen.getByText('Avalanche Fuji')).toBeInTheDocument();
    expect(screen.getByText('BNB Chain Testnet')).toBeInTheDocument();
  });

  it('renders testnet cards in Spanish', () => {
    render(<TestnetView language="es" t={mockTranslations} />);
    expect(screen.getByText('Polygon Mumbai')).toBeInTheDocument();
    expect(screen.getByText('Arbitrum Sepolia')).toBeInTheDocument();
  });

  it('renders RPC labels for each testnet', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Each card should have an RPC section
    const rpcLabels = screen.getAllByText('RPC');
    expect(rpcLabels.length).toBeGreaterThan(0);
  });

  it('renders faucet buttons for each testnet', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Each card should have a faucet button
    const faucetButtons = screen.getAllByText('Faucet');
    expect(faucetButtons.length).toBe(5);
  });

  it('renders quick setup guide in English', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    expect(screen.getByText('Quick Setup Guide')).toBeInTheDocument();
  });

  it('renders quick setup guide in Spanish', () => {
    render(<TestnetView language="es" t={mockTranslations} />);
    expect(screen.getByText('Guía de Configuración Rápida')).toBeInTheDocument();
  });

  it('renders all setup guide steps', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    expect(screen.getByText('Add Network to MetaMask')).toBeInTheDocument();
    expect(screen.getByText('Get Test Tokens')).toBeInTheDocument();
    expect(screen.getByText('Connect to DApp')).toBeInTheDocument();
  });

  it('renders copy buttons for RPC URLs', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Should have copy buttons (copy icon)
    const copyButtons = document.querySelectorAll('button[aria-label*="Copy"]');
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('renders explorer links', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Should have external link buttons
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  it('renders Network icon', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    const networkIcon = document.querySelector('svg');
    expect(networkIcon).toBeInTheDocument();
  });

  it('displays chain symbols correctly', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Each testnet should show its chain symbol - use getAllByText for multiple matches
    expect(screen.getAllByText('MATIC').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ETH').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AVAX').length).toBeGreaterThan(0);
    expect(screen.getAllByText('BNB').length).toBeGreaterThan(0);
  });

  it('renders the header section', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    // Verify the header section exists
    expect(screen.getByText('Available Testnets')).toBeInTheDocument();
    // Verify the header has a description
    expect(screen.getByText(/test networks for development/i)).toBeInTheDocument();
  });

  it('renders testnet descriptions in English', () => {
    render(<TestnetView language="en" t={mockTranslations} />);
    expect(screen.getByText('Polygon testnet for development')).toBeInTheDocument();
    expect(screen.getByText('Arbitrum L2 testnet')).toBeInTheDocument();
  });

  it('renders testnet descriptions in Spanish', () => {
    render(<TestnetView language="es" t={mockTranslations} />);
    expect(screen.getByText('Testnet de Polygon para desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Testnet L2 de Arbitrum')).toBeInTheDocument();
  });
});
