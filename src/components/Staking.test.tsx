import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Staking from './Staking';

describe('Staking', () => {
  it('renders staking component', () => {
    const { container } = render(<Staking />);
    expect(container.textContent).toContain('Staking');
  });

  it('renders APY percentages', () => {
    render(<Staking />);
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0);
  });

  it('renders stake button', () => {
    render(<Staking />);
    expect(screen.getAllByText('Stake').length).toBeGreaterThan(0);
  });
});
