import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CryptoChart from './CryptoChart';

describe('CryptoChart', () => {
  it('renders without crashing', () => {
    const { container } = render(<CryptoChart symbol="BTC" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('accepts symbol prop', () => {
    const { container } = render(<CryptoChart symbol="ETH" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('accepts custom height prop', () => {
    const { container } = render(<CryptoChart symbol="BTC" height={400} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders with different symbols', () => {
    const { container } = render(<CryptoChart symbol="DOGE" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
