import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TradingJournal from './TradingJournal';

describe('TradingJournal', () => {
  it('renders component', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('Total P&L');
  });

  it('renders summary cards', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('Total P&L');
    expect(container.textContent).toContain('Win Rate');
    expect(container.textContent).toContain('Risk:Reward');
    expect(container.textContent).toContain('Total Trades');
  });

  it('renders trades table', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('Date');
    expect(container.textContent).toContain('Pair');
    expect(container.textContent).toContain('Side');
    expect(container.textContent).toContain('Entry');
    expect(container.textContent).toContain('Exit');
    expect(container.textContent).toContain('Strategy');
  });

  it('displays BTC/USDT trades', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('BTC/USDT');
  });

  it('displays ETH/USDT trades', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('ETH/USDT');
  });

  it('displays SOL/USDT trades', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('SOL/USDT');
  });

  it('renders buy and sell indicators', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('BUY');
    expect(container.textContent).toContain('SELL');
  });

  it('displays P&L values', () => {
    const { container } = render(<TradingJournal />);
    // Should show positive and negative P&L
    expect(container.textContent).toMatch(/\$/);
  });

  it('renders strategy names', () => {
    const { container } = render(<TradingJournal />);
    expect(container.textContent).toContain('Breakout');
    expect(container.textContent).toContain('Mean Reversion');
    expect(container.textContent).toContain('DCA');
    expect(container.textContent).toContain('Swing');
  });

  it('shows total trade count', () => {
    const { container } = render(<TradingJournal />);
    // 4 trades in mock data
    expect(container.textContent).toContain('4');
  });

  it('calculates win rate', () => {
    const { container } = render(<TradingJournal />);
    // 2 winning trades out of 4 = 50%
    expect(container.textContent).toContain('50');
  });
});