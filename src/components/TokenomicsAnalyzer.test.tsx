import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TokenomicsAnalyzer from './TokenomicsAnalyzer';

describe('TokenomicsAnalyzer', () => {
  it('renders title in Spanish', () => {
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
});
