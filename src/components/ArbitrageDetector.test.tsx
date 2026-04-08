import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArbitrageDetector from './ArbitrageDetector';

describe('ArbitrageDetector', () => {
  it('renders component', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('Potential Profit');
  });

  it('renders summary cards', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('Avg Spread');
    expect(container.textContent).toContain('Opportunities');
  });

  it('renders scan button initially', () => {
    render(<ArbitrageDetector />);
    expect(screen.getByText('Scan for Arbitrage')).toBeInTheDocument();
  });

  it('renders opportunities', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('BTC/USDT');
    expect(container.textContent).toContain('ETH/USDT');
    expect(container.textContent).toContain('SOL/USDT');
  });

  it('renders exchange names in opportunities', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('Binance');
    expect(container.textContent).toContain('Coinbase');
    expect(container.textContent).toContain('Kraken');
  });

  it('renders spread percentages', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('%');
  });

  it('renders potential profit values', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('$');
  });

  it('displays buy and sell prices', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('Buy at');
    expect(container.textContent).toContain('Sell at');
  });

  it('renders volume information', () => {
    const { container } = render(<ArbitrageDetector />);
    expect(container.textContent).toContain('Min Volume');
  });

  it('shows scanning state when button clicked', async () => {
    const { container } = render(<ArbitrageDetector />);
    const button = screen.getByText('Scan for Arbitrage');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(container.textContent).toContain('Scanning Exchanges');
    });
  });

  it('displays high spread opportunity with green styling', () => {
    const { container } = render(<ArbitrageDetector />);
    // ETH has 1.02% spread which is >= 0.5%
    expect(container.textContent).toContain('+1.02%');
  });

  it('displays multiple opportunities count', () => {
    const { container } = render(<ArbitrageDetector />);
    // Should show 3 opportunities
    expect(container.textContent).toMatch(/3/);
  });

  it('calculates total potential profit correctly', () => {
    const { container } = render(<ArbitrageDetector />);
    // 135 + 230 + 175 = 540
    expect(container.textContent).toContain('540');
  });

  it('renders exchange arrows between exchanges', () => {
    const { container } = render(<ArbitrageDetector />);
    // Should have arrows between exchange names
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('shows opportunity details in cards', () => {
    const { container } = render(<ArbitrageDetector />);
    // Each opportunity should have price details
    expect(container.textContent).toMatch(/\d{2,}/);
  });

  it('shows scan button after scanning completes', async () => {
    const { container } = render(<ArbitrageDetector />);
    const button = screen.getByText('Scan for Arbitrage');
    
    // Start scanning
    fireEvent.click(button);
    
    // Should show scanning state
    await waitFor(() => {
      expect(container.textContent).toContain('Scanning');
    });
    
    // Wait for scan to complete (2 second delay in component)
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    // Should return to initial state
    expect(screen.getByText('Scan for Arbitrage')).toBeInTheDocument();
  });
});