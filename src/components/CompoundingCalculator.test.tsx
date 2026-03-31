import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CompoundingCalculator from './CompoundingCalculator';

describe('CompoundingCalculator', () => {
  it('renders title', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Compounding Calculator');
  });

  it('renders input parameters section', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Input Parameters');
  });

  it('renders initial amount input', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Initial Amount');
  });

  it('renders APY input', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Annual APY');
  });

  it('renders investment period input', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Investment Period');
  });

  it('renders compounding frequency buttons', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('daily');
    expect(container.textContent).toContain('weekly');
    expect(container.textContent).toContain('monthly');
  });

  it('renders additional contributions input', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Additional Contributions');
  });

  it('renders projection summary', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Projection Summary');
  });

  it('renders final value', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Final Value');
  });

  it('renders yearly breakdown', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('Yearly Breakdown');
  });

  it('renders ROI display', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('ROI');
  });

  it('renders tip section', () => {
    const { container } = render(<CompoundingCalculator />);
    expect(container.textContent).toContain('The Power of Compounding');
  });
});
