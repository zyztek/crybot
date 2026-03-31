import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import YieldFarming from './YieldFarming';

describe('YieldFarming', () => {
  it('renders title', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Yield Farming');
  });

  it('renders stats cards', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Total Staked');
    expect(container.textContent).toContain('Total Earned');
    expect(container.textContent).toContain('Avg APY');
    expect(container.textContent).toContain('Active Pools');
  });

  it('renders available pools section', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Available Pools');
  });

  it('renders pool names', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('BTC-USDT LP');
    expect(container.textContent).toContain('ETH-BNB LP');
  });

  it('renders pool pairs', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('BTC/USDT');
    expect(container.textContent).toContain('ETH/BNB');
    expect(container.textContent).toContain('SOL/USDC');
  });

  it('renders pool APY values', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('45.5%');
    expect(container.textContent).toContain('62.3%');
  });

  it('renders pool TVL values', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('TVL');
    expect(container.textContent).toContain('M');
  });

  it('renders stake buttons', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Stake Now');
  });

  it('renders pool status badges', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('ACTIVE');
    expect(container.textContent).toContain('FILLED');
  });

  it('renders farming tips info box', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Farming Tips');
  });

  it('renders lock period info', () => {
    const { container } = render(<YieldFarming />);
    expect(container.textContent).toContain('Lock Period');
  });
});
