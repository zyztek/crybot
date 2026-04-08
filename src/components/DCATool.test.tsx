import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DCATool from './DCATool';

describe('DCATool', () => {
  it('renders component', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('Total Invested');
  });

  it('renders summary cards', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('Total Invested');
    expect(container.textContent).toContain('Active Plans');
    expect(container.textContent).toContain('Next Purchase');
  });

  it('renders plans table', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('Token');
    expect(container.textContent).toContain('Amount');
    expect(container.textContent).toContain('Frequency');
    expect(container.textContent).toContain('Invested');
  });

  it('renders BTC plan', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('BTC');
  });

  it('renders ETH plan', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('ETH');
  });

  it('renders SOL plan', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('SOL');
  });

  it('displays total invested amount', () => {
    const { container } = render(<DCATool />);
    // Sum of all plans: 2400 + 3600 + 1450 = 7450
    expect(container.textContent).toContain('$7,450');
  });

  it('shows active plan count', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('2');
  });

  it('renders frequency labels', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('weekly');
    expect(container.textContent).toContain('daily');
  });

  it('renders status badges', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('active');
    expect(container.textContent).toContain('paused');
  });

  it('displays average prices', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('$42,857');
    expect(container.textContent).toContain('$2,278');
  });

  it('renders table headers', () => {
    const { container } = render(<DCATool />);
    expect(container.textContent).toContain('Bought');
    expect(container.textContent).toContain('Avg Price');
    expect(container.textContent).toContain('Status');
  });
});