import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GasTracker from './GasTracker';

describe('GasTracker', () => {
  it('renders title in Spanish', () => {
    render(<GasTracker />);
    expect(screen.getByText('Gas Tracker')).toBeInTheDocument();
  });

  it('renders subtitle in Spanish', () => {
    render(<GasTracker />);
    expect(screen.getByText(/Monitorea las tarifas de gas/)).toBeInTheDocument();
  });

  it('renders current gas section', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Gas');
  });

  it('renders network section', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Red');
  });

  it('renders Ethereum network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Ethereum').length).toBeGreaterThan(0);
  });

  it('renders Bitcoin network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Bitcoin').length).toBeGreaterThan(0);
  });

  it('renders Solana network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Solana').length).toBeGreaterThan(0);
  });

  it('renders refresh button', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Actualizar');
  });

  it('renders gas price label', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Precio del Gas');
  });

  it('renders TPS label', () => {
    render(<GasTracker />);
    expect(screen.getByText('TPS')).toBeInTheDocument();
  });

  it('renders quick tips section', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Tips');
  });

  it('renders gas alerts section', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Alertas');
  });

  it('renders transaction types', () => {
    render(<GasTracker />);
    const content = document.body.textContent || '';
    expect(content).toContain('Transfer');
    expect(content).toContain('Swap');
  });

  it('renders Binance Smart Chain', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Binance Smart Chain').length).toBeGreaterThan(0);
  });

  it('renders Polygon network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Polygon').length).toBeGreaterThan(0);
  });
});
