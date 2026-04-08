import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TradingSignals from './TradingSignals';

describe('TradingSignals', () => {
  it('renders component', () => {
    const { container } = render(<TradingSignals />);
    // Component should render with crypto trading content
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it('renders stats cards', () => {
    const { container } = render(<TradingSignals />);
    // Stats cards show trading metrics
    expect(container.textContent).toMatch(/\d+/);
  });

  it('renders filter buttons', () => {
    const { container } = render(<TradingSignals />);
    // Filters for trading pairs
    expect(container.textContent).toContain('All Pairs');
    expect(container.textContent).toContain('BTC/USDT');
  });

  it('renders signal items', () => {
    const { container } = render(<TradingSignals />);
    // Trading pairs in signals
    expect(container.textContent).toContain('BTC/USDT');
    expect(container.textContent).toContain('ETH/USDT');
    expect(container.textContent).toContain('SOL/USDT');
  });

  it('renders signal type labels', () => {
    const { container } = render(<TradingSignals />);
    // Signal types are buy/sell displayed as BUY/SELL
    expect(container.textContent).toContain('BUY');
    expect(container.textContent).toContain('SELL');
  });

  it('renders signal info', () => {
    const { container } = render(<TradingSignals />);
    // Shows trader info and stats
    expect(container.textContent).toContain('CryptoMaster');
    expect(container.textContent).toContain('win rate');
    expect(container.textContent).toContain('followers');
  });

  it('renders price information', () => {
    const { container } = render(<TradingSignals />);
    // Entry price displayed
    expect(container.textContent).toContain('Entry');
  });

  it('renders PnL values', () => {
    const { container } = render(<TradingSignals />);
    // Profit/Loss percentages shown
    expect(container.textContent).toMatch(/[+-]?\d+\.?\d*%/);
  });

  it('renders copy trade button', () => {
    const { container } = render(<TradingSignals />);
    // Copy trade action button
    expect(container.textContent).toContain('Copy Trade');
  });

  it('renders timeframe information', () => {
    const { container } = render(<TradingSignals />);
    // Timestamp displayed
    expect(container.textContent).toMatch(/\d+h ago/);
  });
});
