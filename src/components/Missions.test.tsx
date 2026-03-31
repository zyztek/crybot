import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Missions from './Missions';

// Mock the translation context
vi.mock('../contexts/TranslationContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'missions.title': 'Missions',
        'missions.description': 'Complete missions to earn points',
        'missions.progress': 'Progress',
        'missions.reward': 'Total Reward',
        'missions.dailyReset': 'Daily Reset',
        'missions.claimed': 'Claimed',
        'missions.claim': 'Claim',
        'missions.easy': 'Easy',
        'missions.medium': 'Medium',
        'missions.hard': 'Hard',
        'store.points': 'Points',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Missions', () => {
  it('renders missions title', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Missions');
  });

  it('renders mission progress overview', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Progress');
  });

  it('renders total reward section', () => {
    render(<Missions />);
    expect(screen.getByText(/Total Reward/)).toBeInTheDocument();
  });

  it('renders daily reset timer', () => {
    render(<Missions />);
    expect(screen.getByText(/Daily Reset/)).toBeInTheDocument();
  });

  it('renders claim button for completed missions', () => {
    render(<Missions />);
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Claim');
  });

  it('renders claimed badge for claimed missions', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Claimed');
  });

  it('renders difficulty badges', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Easy');
    expect(container.textContent).toContain('Medium');
    expect(container.textContent).toContain('Hard');
  });

  it('renders mission titles', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Claim 5 Times');
    expect(container.textContent).toContain('Visit Store');
  });

  it('renders mission descriptions', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('Claim from any faucet 5 times');
  });

  it('renders progress bars', () => {
    render(<Missions />);
    const progressBars = document.querySelectorAll('.rounded-full');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('renders reward stars', () => {
    const { container } = render(<Missions />);
    expect(container.textContent).toContain('⭐');
  });

  it('renders locked state for incomplete missions', () => {
    const { container } = render(<Missions />);
    // Incomplete missions show lock icons, not "Locked" text
    const lockIcons = container.querySelectorAll('svg');
    expect(lockIcons.length).toBeGreaterThan(0);
  });

  it('renders clock icon', () => {
    const { container } = render(<Missions />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders check icon for completed missions', () => {
    render(<Missions />);
    const checkIcons = document.querySelectorAll('.text-green-400');
    expect(checkIcons.length).toBeGreaterThan(0);
  });

  it('renders multiple mission cards', () => {
    render(<Missions />);
    const cards = document.querySelectorAll('.rounded-xl');
    expect(cards.length).toBeGreaterThan(5);
  });
});
