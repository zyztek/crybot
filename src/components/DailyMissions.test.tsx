import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DailyMissions from './DailyMissions';

describe('DailyMissions', () => {
  it('renders title in English', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText('Daily Missions')).toBeInTheDocument();
  });

  it('renders title in Chinese', () => {
    render(<DailyMissions language="zh" />);
    expect(screen.getByText('每日任务')).toBeInTheDocument();
  });

  it('renders subtitle in English', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText(/Complete tasks to earn FaucetBits/i)).toBeInTheDocument();
  });

  it('renders subtitle in Chinese', () => {
    render(<DailyMissions language="zh" />);
    expect(screen.getByText(/完成任务赚取 FaucetBits/i)).toBeInTheDocument();
  });

  it('renders progress section', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText("Today's Progress")).toBeInTheDocument();
  });

  it('renders mission count', () => {
    render(<DailyMissions language="en" />);
    // Renders "1 / 6 Completed" since only 1 mission is completed
    expect(screen.getAllByText(/1 \/ 6/i).length).toBeGreaterThan(0);
  });

  it('renders reset timer section', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText('Resets in')).toBeInTheDocument();
  });

  it('renders completed mission name', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText('Login 3 Days in a Row')).toBeInTheDocument();
  });

  it('renders in-progress mission', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText('Complete 5 Faucet Claims')).toBeInTheDocument();
  });

  it('renders mission rewards', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getAllByText(/50 FaucetBits/).length).toBeGreaterThan(0);
  });

  it('renders claimed badge for completed mission', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText('Claimed')).toBeInTheDocument();
  });

  it('renders start mission button for incomplete missions', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getAllByText('Start Mission').length).toBeGreaterThan(0);
  });

  it('renders total earned section', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getByText(/Total Earned/)).toBeInTheDocument();
  });

  it('renders in-progress missions', () => {
    render(<DailyMissions language="en" />);
    expect(screen.getAllByText('In Progress').length).toBeGreaterThan(1);
  });

  it('renders Chinese mission names', () => {
    render(<DailyMissions language="zh" />);
    expect(screen.getByText('完成5次水龙头领取')).toBeInTheDocument();
  });
});
