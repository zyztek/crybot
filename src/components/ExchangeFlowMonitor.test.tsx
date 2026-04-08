import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExchangeFlowMonitor from './ExchangeFlowMonitor';

describe('ExchangeFlowMonitor', () => {
  it('renders component', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('Total Inflow');
  });

  it('renders summary cards', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('Total Inflow');
    expect(container.textContent).toContain('Total Outflow');
    expect(container.textContent).toContain('Net Flow');
  });

  it('renders timeframe buttons', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('1h');
    expect(container.textContent).toContain('24h');
    expect(container.textContent).toContain('7d');
  });

  it('renders exchange flows', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('Binance');
    expect(container.textContent).toContain('Coinbase');
    expect(container.textContent).toContain('Kraken');
  });

  it('displays flow amounts', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('SOL');
  });

  it('renders flow timestamps', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('5m ago');
    expect(container.textContent).toContain('15m ago');
  });

  it('can switch timeframe', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    const button7d = screen.getByText('7d');
    
    fireEvent.click(button7d);
    
    // Should still render the component
    expect(container.textContent).toContain('Total Inflow');
  });

  it('renders flow directions', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    // Should show arrows between exchanges
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('displays USDT flows', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('USDT');
  });

  it('renders exchange names in list', () => {
    const { container } = render(<ExchangeFlowMonitor />);
    expect(container.textContent).toContain('Gemini');
    expect(container.textContent).toContain('KuCoin');
  });
});