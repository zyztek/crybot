import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GasTracker from './GasTracker';

describe('GasTracker', () => {
  it('renders gas tracker', () => {
    const { container } = render(<GasTracker />);
    expect(container.textContent).toContain('Gas');
  });

  it('renders Ethereum network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Ethereum').length).toBeGreaterThan(0);
  });

  it('renders Solana network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Solana').length).toBeGreaterThan(0);
  });

  it('renders Polygon network', () => {
    render(<GasTracker />);
    expect(screen.getAllByText('Polygon').length).toBeGreaterThan(0);
  });
});