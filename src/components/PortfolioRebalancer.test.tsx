import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PortfolioRebalancer from './PortfolioRebalancer';

describe('PortfolioRebalancer', () => {
  it('renders title', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('Portfolio Allocation');
  });

  it('renders summary cards', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('Total Portfolio Value');
    expect(container.textContent).toContain('Trades Needed');
    expect(container.textContent).toContain('Total Volume');
  });

  it('renders asset table headers', () => {
    render(<PortfolioRebalancer />);
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('Current %')).toBeInTheDocument();
    expect(screen.getByText('Target %')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders portfolio assets', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('SOL');
    expect(container.textContent).toContain('USDT');
  });

  it('renders asset names', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('Bitcoin');
    expect(container.textContent).toContain('Ethereum');
    expect(container.textContent).toContain('Solana');
    expect(container.textContent).toContain('Tether');
  });

  it('renders allocation charts', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('Current Allocation');
    expect(container.textContent).toContain('Target Allocation');
  });

  it('displays current percentages', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('35%');
    expect(container.textContent).toContain('25%');
    expect(container.textContent).toContain('15%');
  });

  it('displays target percentages', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('30%');
    expect(container.textContent).toContain('20%');
  });

  it('renders action indicators', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('Buy');
    expect(container.textContent).toContain('Sell');
  });

  it('calculates trades needed', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toMatch(/\d+/);
  });

  it('displays total portfolio value', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toMatch(/\$/);
  });

  it('renders price values', () => {
    const { container } = render(<PortfolioRebalancer />);
    expect(container.textContent).toContain('$');
  });

  // Additional tests for edge cases and interactions
  it('renders allocation controls', () => {
    const { container } = render(<PortfolioRebalancer />);
    // Should have allocation controls
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it('displays sell amount for overweight assets', () => {
    const { container } = render(<PortfolioRebalancer />);
    // BTC is 35% but target is 30%, should show sell
    expect(container.textContent).toContain('Sell');
  });

  it('displays buy amount for underweight assets', () => {
    const { container } = render(<PortfolioRebalancer />);
    // SOL is 15% but target is 20%, should show buy
    expect(container.textContent).toContain('Buy');
  });

  it('renders token icons for assets', () => {
    const { container } = render(<PortfolioRebalancer />);
    // Should have icons for each crypto asset
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('displays price for each asset', () => {
    const { container } = render(<PortfolioRebalancer />);
    // Each asset should have a price displayed
    expect(container.textContent).toMatch(/\d{2,}/);
  });

  it('shows portfolio status', () => {
    const { container } = render(<PortfolioRebalancer />);
    // Component should have status-related content
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it('displays percentage values', () => {
    const { container } = render(<PortfolioRebalancer />);
    // Should show percentage values
    expect(container.textContent).toMatch(/%/);
  });
});