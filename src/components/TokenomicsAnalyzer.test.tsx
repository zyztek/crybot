import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TokenomicsAnalyzer from './TokenomicsAnalyzer';

describe('TokenomicsAnalyzer', () => {
  it('renders component', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Analizador de Tokenomics')).toBeInTheDocument();
  });

  it('renders subtitle in Spanish', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText(/Analiza la distribución/i)).toBeInTheDocument();
  });

  it('renders token name', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });

  it('renders token symbol', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getAllByText('BTC').length).toBeGreaterThan(0);
  });

  it('renders overview section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Resumen General')).toBeInTheDocument();
  });

  it('renders distribution section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Distribución de Tokens')).toBeInTheDocument();
  });

  it('renders inflation metrics section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Métricas de Inflación')).toBeInTheDocument();
  });

  it('renders market cap label', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Capitalización')).toBeInTheDocument();
  });

  it('renders circulating supply label', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Suministro Circulante')).toBeInTheDocument();
  });

  it('renders max supply label', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Suministro Máximo')).toBeInTheDocument();
  });

  it('renders volume label', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Volumen 24h')).toBeInTheDocument();
  });

  it('renders distribution categories', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('renders community distribution', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Community')).toBeInTheDocument();
  });

  it('renders DAO section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('DAO')).toBeInTheDocument();
  });

  it('renders holder statistics section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Holder Statistics')).toBeInTheDocument();
  });

  it('renders token status section', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('Token Status')).toBeInTheDocument();
  });

  it('renders language toggle button', () => {
    render(<TokenomicsAnalyzer />);
    expect(screen.getByText('🇺🇸 EN')).toBeInTheDocument();
  });

  it('renders supply breakdown section', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('Supply Breakdown');
  });

  it('toggles language when button clicked', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    // Initially in Spanish
    expect(container.textContent).toContain('Analizador de Tokenomics');
    
    // Click language toggle
    const langButton = screen.getByText('🇺🇸 EN');
    fireEvent.click(langButton);
    
    // Should switch to English
    expect(container.textContent).toContain('Tokenomics Analyzer');
  });

  it('displays price value', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('$67,500');
  });

  it('renders distribution percentage bars', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    // Should show percentages for distribution
    expect(container.textContent).toContain('35%');
    expect(container.textContent).toContain('20%');
  });

  it('renders inflation metrics values', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('1.5%');
    expect(container.textContent).toContain('328,500 BTC');
    expect(container.textContent).toContain('April 2028');
  });

  it('renders holder statistics', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('125,847');
    expect(container.textContent).toContain('Whales');
  });

  it('renders token status indicators', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('Trading Active');
    expect(container.textContent).toContain('Staking Available');
  });

  it('renders supply breakdown values', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    // Circulating percentage
    expect(container.textContent).toContain('% Circulante');
  });

  it('switches back to Spanish when toggle clicked again', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    
    // Click to English
    fireEvent.click(screen.getByText('🇺🇸 EN'));
    expect(container.textContent).toContain('Tokenomics Analyzer');
    
    // Click back to Spanish
    fireEvent.click(screen.getByText('🇪🇸 ES'));
    expect(container.textContent).toContain('Analizador de Tokenomics');
  });

  it('renders multiple distribution categories', () => {
    const { container } = render(<TokenomicsAnalyzer />);
    expect(container.textContent).toContain('Investors');
    expect(container.textContent).toContain('Ecosystem');
  });
});
