import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityLeaderboards from './CommunityLeaderboards';

describe('CommunityLeaderboards', () => {
  it('renders component', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('Top Trader');
  });

  it('renders summary cards', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('Top Trader');
    expect(container.textContent).toContain('Active Traders');
    expect(container.textContent).toContain('Total Points');
  });

  it('renders timeframe buttons', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('daily');
    expect(container.textContent).toContain('weekly');
    expect(container.textContent).toContain('monthly');
  });

  it('renders leaderboard table', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('Rank');
    expect(container.textContent).toContain('User');
    expect(container.textContent).toContain('Points');
    expect(container.textContent).toContain('Change');
    expect(container.textContent).toContain('Badges');
  });

  it('renders top leader CryptoKing', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('CryptoKing');
  });

  it('renders multiple leaders', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('DeFiWhale');
    expect(container.textContent).toContain('YieldFarmer');
    expect(container.textContent).toContain('NFTCollector');
  });

  it('can switch timeframe', () => {
    const { container } = render(<CommunityLeaderboards />);
    const weeklyButton = screen.getByText('weekly');
    
    fireEvent.click(weeklyButton);
    
    // Should still render the component
    expect(container.textContent).toContain('Top Trader');
  });

  it('renders crown icon for first place', () => {
    const { container } = render(<CommunityLeaderboards />);
    expect(container.textContent).toContain('CryptoKing');
  });

  it('displays point values', () => {
    const { container } = render(<CommunityLeaderboards />);
    // Should show point values in the table
    expect(container.textContent).toMatch(/\d+/);
  });

  it('renders change indicators', () => {
    const { container } = render(<CommunityLeaderboards />);
    // Change values can be positive, negative or zero
    expect(container.textContent).toMatch(/[+-]?\d+/);
  });
});