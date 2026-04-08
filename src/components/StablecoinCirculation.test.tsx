import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StablecoinCirculation from './StablecoinCirculation';

describe('StablecoinCirculation', () => {
  it('renders component', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('Total Supply');
  });

  it('renders summary cards', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('Total Supply');
    expect(container.textContent).toContain('24h Volume');
    expect(container.textContent).toContain('Dominance');
  });

  it('renders stablecoin table', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('Stablecoin');
    expect(container.textContent).toContain('Supply');
    expect(container.textContent).toContain('24h Change');
    expect(container.textContent).toContain('Market Cap');
    expect(container.textContent).toContain('24h Volume');
  });

  it('displays USDT', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('USDT');
    expect(container.textContent).toContain('Tether');
  });

  it('displays USDC', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('USDC');
    expect(container.textContent).toContain('USD Coin');
  });

  it('displays DAI', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('DAI');
    expect(container.textContent).toContain('Dai');
  });

  it('shows market cap values', () => {
    const { container } = render(<StablecoinCirculation />);
    expect(container.textContent).toContain('$95.2B');
  });

  it('renders change percentages', () => {
    const { container } = render(<StablecoinCirculation />);
    // Should show positive and negative changes
    expect(container.textContent).toMatch(/[\+\-]\d/);
  });

  it('calculates total supply', () => {
    const { container } = render(<StablecoinCirculation />);
    // Sum: 95.2 + 42.8 + 7.2 + 5.1 + 3.2 = 153.5B
    expect(container.textContent).toContain('153.5');
  });
});