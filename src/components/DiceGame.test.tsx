import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DiceGame from './DiceGame';
import { gameMockProps } from '../test/fixtures';

describe('DiceGame', () => {
  const mockProps = gameMockProps;

  it('renders game title', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText('Roll the Dice')).toBeInTheDocument();
  });

  it('renders bet amount display', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getAllByText(/Bet Amount/).length).toBeGreaterThan(0);
  });

  it('renders win chance display', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText(/Win Chance/)).toBeInTheDocument();
  });

  it('renders payout display', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText(/Payout/)).toBeInTheDocument();
  });

  it('renders potential win display', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText(/Potential Win/)).toBeInTheDocument();
  });

  it('renders side selection buttons', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('4').length).toBeGreaterThan(0);
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('6').length).toBeGreaterThan(0);
  });

  it('renders bet amount buttons', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    expect(screen.getAllByText('50').length).toBeGreaterThan(0);
    expect(screen.getAllByText('100').length).toBeGreaterThan(0);
  });

  it('renders roll dice button', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText(/Roll Dice/)).toBeInTheDocument();
  });

  it('renders roll history section', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText('Roll History')).toBeInTheDocument();
  });

  it('renders select target side label', () => {
    render(<DiceGame {...mockProps} />);
    expect(screen.getByText(/Select Target/)).toBeInTheDocument();
  });

  it('displays initial sum value', () => {
    render(<DiceGame {...mockProps} />);
    const { container } = render(<DiceGame {...mockProps} />);
    expect(container.textContent).toContain('Sum:');
  });
});
