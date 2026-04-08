import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaxLossHarvesting from './TaxLossHarvesting';

describe('TaxLossHarvesting', () => {
  it('renders component', () => {
    const { container } = render(<TaxLossHarvesting />);
    expect(container.textContent).toContain('Unrealized Gains');
  });

  it('renders summary cards', () => {
    const { container } = render(<TaxLossHarvesting />);
    expect(container.textContent).toContain('Unrealized Gains');
    expect(container.textContent).toContain('Unrealized Losses');
    expect(container.textContent).toContain('Net Position');
    expect(container.textContent).toContain('Potential Tax Savings');
  });

  it('renders holdings table', () => {
    const { container } = render(<TaxLossHarvesting />);
    expect(container.textContent).toContain('Token');
    expect(container.textContent).toContain('Purchase');
    expect(container.textContent).toContain('Current');
    expect(container.textContent).toContain('Qty');
    expect(container.textContent).toContain('Gain/Loss');
    expect(container.textContent).toContain('Harvest');
  });

  it('displays token holdings', () => {
    const { container } = render(<TaxLossHarvesting />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('SOL');
  });

  it('renders harvest buttons for losing positions', () => {
    render(<TaxLossHarvesting />);
    // Should have harvest buttons for losing positions
    const buttons = screen.getAllByText('Harvest');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('displays gain/loss values', () => {
    const { container } = render(<TaxLossHarvesting />);
    // Should show positive and negative values
    expect(container.textContent).toMatch(/\$/);
  });

  it('renders tax info section', () => {
    const { container } = render(<TaxLossHarvesting />);
    expect(container.textContent).toContain('Tax Loss Harvesting Info');
  });

  it('calculates total gains correctly', () => {
    const { container } = render(<TaxLossHarvesting />);
    // ETH: +500, BNB: +160 = 660
    expect(container.textContent).toContain('660');
  });

  it('calculates total losses correctly', () => {
    const { container } = render(<TaxLossHarvesting />);
    // BTC: 1250, SOL: 220, XRP: 650 = 2120
    expect(container.textContent).toContain('2120');
  });
});