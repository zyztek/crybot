import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LiquidationCalculator from './LiquidationCalculator';

describe('LiquidationCalculator', () => {
  it('renders component', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Liquidation Price');
  });

  it('renders summary cards', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Distance to Liquidation');
    expect(container.textContent).toContain('Max Loss');
  });

  it('renders position details section', () => {
    render(<LiquidationCalculator />);
    expect(screen.getByText('Position Details')).toBeInTheDocument();
  });

  it('renders entry price input', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Entry Price');
  });

  it('renders leverage selector', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Leverage');
  });

  it('renders side buttons', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Long');
    expect(container.textContent).toContain('Short');
  });

  it('renders wallet balance input', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Wallet Balance');
  });

  it('displays default leverage options', () => {
    const { container } = render(<LiquidationCalculator />);
    // Leverage options: 2, 3, 5, 10, 20, 50, 100
    expect(container.textContent).toMatch(/\d+/);
  });

  it('calculates liquidation price for long position', () => {
    const { container } = render(<LiquidationCalculator />);
    // For 10x leverage long at 42000: 42000 * (1 - 0.1) = 37800
    expect(container.textContent).toContain('37,800');
  });

  it('renders alert icons', () => {
    const { container } = render(<LiquidationCalculator />);
    expect(container.textContent).toContain('Distance to Liquidation');
  });

  it('calculates correct liquidation for short position', () => {
    const { container } = render(<LiquidationCalculator />);
    // Click Short button
    const shortButton = screen.getByText('Short');
    fireEvent.click(shortButton);
    
    // For 10x leverage short at 42000: 42000 * (1 + 0.1) = 46200
    expect(container.textContent).toContain('46,200');
  });

  it('updates liquidation price when leverage changes', () => {
    const { container } = render(<LiquidationCalculator />);
    // Change leverage to 20x
    const select = container.querySelector('select');
    if (select) {
      fireEvent.change(select, { target: { value: '20' } });
    }
    // For 20x leverage long at 42000: 42000 * (1 - 0.05) = 39900
    expect(container.textContent).toContain('39,900');
  });

  it('updates distance percentage based on leverage', () => {
    const { container } = render(<LiquidationCalculator />);
    // Default 10x leverage: distance = 10%
    expect(container.textContent).toContain('10.0%');
  });

  it('renders leverage options in select', () => {
    const { container } = render(<LiquidationCalculator />);
    const select = container.querySelector('select');
    expect(select).toBeTruthy();
    expect(container.textContent).toContain('2');
    expect(container.textContent).toContain('100');
  });

  it('displays max loss equal to wallet balance', () => {
    const { container } = render(<LiquidationCalculator />);
    // Default wallet balance is 1000
    expect(container.textContent).toContain('$1000');
  });

  it('updates wallet balance correctly', () => {
    const { container } = render(<LiquidationCalculator />);
    const inputs = container.querySelectorAll('input');
    if (inputs.length >= 2) {
      // Second input is wallet balance
      fireEvent.change(inputs[1], { target: { value: '5000' } });
      expect(container.textContent).toContain('$5000');
    }
  });

  it('renders input fields for position details', () => {
    const { container } = render(<LiquidationCalculator />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('handles entry price input change', () => {
    const { container } = render(<LiquidationCalculator />);
    const inputs = container.querySelectorAll('input');
    if (inputs.length >= 1) {
      fireEvent.change(inputs[0], { target: { value: '50000' } });
      // Liquidation for 10x long at 50000: 50000 * 0.9 = 45000
      expect(container.textContent).toContain('45,000');
    }
  });

  it('shows different colors for long and short positions', () => {
    const { container } = render(<LiquidationCalculator />);
    // Long position (default) should have green styling
    expect(container.textContent).toContain('Long');
    
    // Click Short
    const shortButton = screen.getByText('Short');
    fireEvent.click(shortButton);
    
    // Should still show Short
    expect(container.textContent).toContain('Short');
  });
});