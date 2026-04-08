import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortfolioMarginCalculator from './PortfolioMarginCalculator';

describe('PortfolioMarginCalculator', () => {
  it('renders title', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Total Margin');
  });

  it('renders summary cards', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Total Notional');
    expect(container.textContent).toContain('Avg Leverage');
    expect(container.textContent).toContain('Positions');
  });

  it('renders add position section', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Add Position');
  });

  it('renders symbol selector', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('SOL');
  });

  it('renders side selector', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Long');
    expect(container.textContent).toContain('Short');
  });

  it('renders positions table', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Symbol');
    expect(container.textContent).toContain('Side');
    expect(container.textContent).toContain('Size');
    expect(container.textContent).toContain('Entry');
    expect(container.textContent).toContain('Leverage');
  });

  it('displays initial positions', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('SOL');
  });

  it('renders add position button', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    expect(container.textContent).toContain('Add Position');
  });

  it('calculates total margin correctly', () => {
    const { container } = render(<PortfolioMarginCalculator />);
    // Initial positions: BTC margin 2100 + ETH margin 900 + SOL margin 593.75 = 3593.75
    expect(container.textContent).toContain('3,593');
  });
});