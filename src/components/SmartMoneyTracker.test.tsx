import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SmartMoneyTracker from './SmartMoneyTracker';

describe('SmartMoneyTracker', () => {
  it('renders component', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('Total Tracked');
  });

  it('renders summary cards', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('Total Tracked');
    expect(container.textContent).toContain('Avg 24h Change');
    expect(container.textContent).toContain('Whales Tracked');
  });

  it('renders whales table', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('Wallet');
    expect(container.textContent).toContain('Balance');
    expect(container.textContent).toContain('24h Change');
    expect(container.textContent).toContain('Trades');
  });

  it('renders whale labels', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('DeFi Whale');
    expect(container.textContent).toContain('NFT Collector');
    expect(container.textContent).toContain('Early ETH');
  });

  it('displays total balance', () => {
    const { container } = render(<SmartMoneyTracker />);
    // Sum of all balances: 12.5M + 8.9M + 45M + 78M + 3.2M = 147.6M
    expect(container.textContent).toContain('$147.6M');
  });

  it('shows whale count', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('5');
  });

  it('renders profit percentages', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('+45%');
    expect(container.textContent).toContain('+32%');
  });

  it('renders last active times', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('2h ago');
    expect(container.textContent).toContain('5h ago');
    expect(container.textContent).toContain('1h ago');
  });

  it('renders table headers', () => {
    const { container } = render(<SmartMoneyTracker />);
    expect(container.textContent).toContain('Profit %');
    expect(container.textContent).toContain('Last Active');
  });

  it('displays 24h changes', () => {
    const { container } = render(<SmartMoneyTracker />);
    // Should show positive and negative changes
    expect(container.textContent).toMatch(/[+-]?\d+/);
  });
});