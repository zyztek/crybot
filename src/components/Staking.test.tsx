import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Staking from './Staking';

describe('Staking', () => {
  it('renders staking component', () => {
    const { container } = render(<Staking language="en" />);
    expect(container.textContent).toContain('Staking');
  });

  it('renders APY percentages', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0);
  });

  it('renders stake button', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText('Stake').length).toBeGreaterThan(0);
  });
});