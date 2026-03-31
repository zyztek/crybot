import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import GovernanceVoting from './GovernanceVoting';

describe('GovernanceVoting', () => {
  it('renders title', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Governance Voting');
  });

  it('renders user stats', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Your Votes');
    expect(container.textContent).toContain('Active Proposals');
    expect(container.textContent).toContain('Passed Proposals');
    expect(container.textContent).toContain('Total Participation');
  });

  it('renders create proposal button', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Create Proposal');
  });

  it('renders proposals section', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Governance Proposals');
  });

  it('renders proposal titles', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Increase DAO Treasury Yield Strategy');
    expect(container.textContent).toContain('Grant for Community Development');
  });

  it('renders proposal status labels', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Active');
    expect(container.textContent).toContain('Passed');
    expect(container.textContent).toContain('Rejected');
    expect(container.textContent).toContain('Pending');
  });

  it('renders proposal categories', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Treasury');
    expect(container.textContent).toContain('Protocol');
    expect(container.textContent).toContain('Community');
  });

  it('renders vote counts', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('For');
    expect(container.textContent).toContain('Against');
  });

  it('renders proposer addresses', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Proposer');
  });

  it('renders icons', () => {
    const { container } = render(<GovernanceVoting />);
    expect(container.textContent).toContain('Voters');
    expect(container.textContent).toContain('Proposals');
  });
});
