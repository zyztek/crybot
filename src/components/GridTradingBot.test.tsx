import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GridTradingBot from './GridTradingBot';

describe('GridTradingBot', () => {
  it('renders title', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Grid Configuration');
  });

  it('renders summary cards', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Total Profit');
    expect(container.textContent).toContain('Grid Levels');
    expect(container.textContent).toContain('Price Range');
    expect(container.textContent).toContain('Status');
  });

  it('renders configuration section', () => {
    render(<GridTradingBot />);
    expect(screen.getByText('Grid Configuration')).toBeInTheDocument();
  });

  it('renders symbol selector', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('BTC/USDT');
    expect(container.textContent).toContain('ETH/USDT');
    expect(container.textContent).toContain('SOL/USDT');
  });

  it('renders grid count input', () => {
    render(<GridTradingBot />);
    expect(screen.getByText('Grid Count')).toBeInTheDocument();
  });

  it('renders range input', () => {
    render(<GridTradingBot />);
    expect(screen.getByText('Range (%)')).toBeInTheDocument();
  });

  it('renders order size input', () => {
    render(<GridTradingBot />);
    expect(screen.getByText('Order Size ($)')).toBeInTheDocument();
  });

  it('renders grid levels section', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Grid Levels');
  });

  it('renders grid levels', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toMatch(/\$/);
  });

  it('renders start button initially', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Start');
  });

  it('toggles to stop button when active', async () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Start');
    
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      await waitFor(() => {
        expect(container.textContent).toContain('Stop');
      });
    }
  });

  it('displays profit values', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toMatch(/\+\$/);
  });

  it('renders order counts', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('orders');
  });

  it('displays price range percentage', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('±5%');
  });

  it('renders symbol field', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toContain('Symbol');
  });

  it('displays price for grid levels', () => {
    const { container } = render(<GridTradingBot />);
    const prices = container.textContent.match(/\$[\d,]+/);
    expect(prices?.length).toBeGreaterThan(0);
  });

  it('shows profit per grid level', () => {
    const { container } = render(<GridTradingBot />);
    expect(container.textContent).toMatch(/\+\$\d+/);
  });

  it('renders control buttons', () => {
    const { container } = render(<GridTradingBot />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});