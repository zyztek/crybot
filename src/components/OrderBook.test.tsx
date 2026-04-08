import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderBook from './OrderBook';

describe('OrderBook', () => {
  it('renders component', () => {
    const { container } = render(<OrderBook />);
    expect(container.textContent).toContain('Order Book');
  });

  it('renders precision buttons', () => {
    render(<OrderBook />);
    expect(screen.getByText('0.01')).toBeInTheDocument();
    expect(screen.getByText('0.0001')).toBeInTheDocument();
  });

  it('renders order book headers', () => {
    const { container } = render(<OrderBook />);
    expect(container.textContent).toContain('Price');
    expect(container.textContent).toContain('Amount');
    expect(container.textContent).toContain('Total');
  });

  it('renders bid orders', () => {
    const { container } = render(<OrderBook />);
    // Bids should have green colors - check for positive numbers in bid area
    expect(container.textContent).toMatch(/\d+\.\d+/);
  });

  it('renders ask orders', () => {
    const { container } = render(<OrderBook />);
    // Asks should be present
    expect(container.textContent).toMatch(/\d+\.\d+/);
  });

  it('renders spread information', () => {
    const { container } = render(<OrderBook />);
    expect(container.textContent).toContain('Spread');
  });

  it('renders volume information', () => {
    const { container } = render(<OrderBook />);
    expect(container.textContent).toContain('24h Volume');
    expect(container.textContent).toContain('BTC');
  });

  it('renders market status', () => {
    const { container } = render(<OrderBook />);
    expect(container.textContent).toContain('Market');
    expect(container.textContent).toContain('Active');
  });

  it('can switch precision', () => {
    const { container } = render(<OrderBook />);
    const precisionButton = screen.getByText('0.0001');
    
    fireEvent.click(precisionButton);
    
    // Should still render order book after clicking
    expect(container.textContent).toContain('Order Book');
  });

  it('renders with custom token pair', () => {
    const { container } = render(<OrderBook baseToken="ETH" quoteToken="USDT" />);
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('USDT');
  });
});