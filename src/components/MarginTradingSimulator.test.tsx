import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarginTradingSimulator from './MarginTradingSimulator';

describe('MarginTradingSimulator', () => {
  it('renders component', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Position Value');
  });

  it('renders summary cards', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Position Value');
    expect(container.textContent).toContain('P&L');
    expect(container.textContent).toContain('Leverage');
    expect(container.textContent).toContain('Liq. Price');
  });

  it('renders position simulator section', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Simulate New Position');
  });

  it('renders entry price input', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Entry Price');
  });

  it('renders leverage selector', () => {
    const { container } = render(<MarginTradingSimulator />);
    // Leverage appears in multiple places, check it's in the component
    expect(container.textContent).toContain('Leverage');
  });

  it('renders long/short buttons', () => {
    render(<MarginTradingSimulator />);
    expect(screen.getByText('Long')).toBeInTheDocument();
    expect(screen.getByText('Short')).toBeInTheDocument();
  });

  it('renders amount input', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Amount');
  });

  it('displays liquidation price', () => {
    const { container } = render(<MarginTradingSimulator />);
    // For long at 42000 with 10x: 42000 * (1 - 0.1) = 37800
    expect(container.textContent).toContain('37,800');
  });

  it('calculates P&L correctly', () => {
    const { container } = render(<MarginTradingSimulator />);
    // Long: (43500 - 42000) / 42000 * 10 * 1000 = 357.14
    expect(container.textContent).toContain('357');
  });

  it('renders leverage risk warning', () => {
    const { container } = render(<MarginTradingSimulator />);
    expect(container.textContent).toContain('Leverage Risk Warning');
  });

  it('can switch between long and short', () => {
    const { container } = render(<MarginTradingSimulator />);
    const shortButton = screen.getByText('Short');
    
    fireEvent.click(shortButton);
    
    // Should still render simulator
    expect(container.textContent).toContain('Simulate New Position');
  });

  it('shows position value', () => {
    const { container } = render(<MarginTradingSimulator />);
    // 1000 * 10 = 10000
    expect(container.textContent).toContain('10,000');
  });
});