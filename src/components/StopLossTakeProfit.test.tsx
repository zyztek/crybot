import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StopLossTakeProfit from './StopLossTakeProfit';

describe('StopLossTakeProfit', () => {
  it('renders component', () => {
    const { container } = render(<StopLossTakeProfit />);
    expect(container.textContent).toContain('Total Risk');
  });

  it('renders summary cards', () => {
    const { container } = render(<StopLossTakeProfit />);
    expect(container.textContent).toContain('Total Risk');
    expect(container.textContent).toContain('Profit Potential');
    expect(container.textContent).toContain('Active Orders');
  });

  it('renders create order section', () => {
    const { container } = render(<StopLossTakeProfit />);
    expect(container.textContent).toContain('Create New Order');
  });

  it('renders order type selector', () => {
    const { container } = render(<StopLossTakeProfit />);
    // Check for Stop-Loss text in the component (in select or order list)
    expect(container.textContent).toContain('Stop-Loss');
  });

  it('renders side selector', () => {
    render(<StopLossTakeProfit />);
    expect(screen.getByText('Sell')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
  });

  it('renders add order button', () => {
    render(<StopLossTakeProfit />);
    expect(screen.getByText('Add Order')).toBeInTheDocument();
  });

  it('renders active orders section', () => {
    const { container } = render(<StopLossTakeProfit />);
    expect(container.textContent).toContain('Active Orders');
  });

  it('displays default orders', () => {
    const { container } = render(<StopLossTakeProfit />);
    // Should show 2 default orders
    expect(container.textContent).toContain('2');
  });

  it('can add new order', () => {
    const { container } = render(<StopLossTakeProfit />);
    const addButton = screen.getByText('Add Order');
    
    fireEvent.click(addButton);
    
    // Order count should increase
    expect(container.textContent).toMatch(/3/);
  });

  it('renders current price', () => {
    const { container } = render(<StopLossTakeProfit currentPrice={42500} />);
    expect(container.textContent).toContain('42,500');
  });

  it('renders order price values', () => {
    const { container } = render(<StopLossTakeProfit />);
    // Default orders at 40000 and 45000
    expect(container.textContent).toContain('40,000');
    expect(container.textContent).toContain('45,000');
  });

  it('renders with custom symbol', () => {
    const { container } = render(<StopLossTakeProfit symbol="ETH/USDT" />);
    expect(container.textContent).toContain('ETH/USDT');
  });
});