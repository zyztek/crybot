import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Staking from './Staking';

describe('Staking', () => {
  it('renders title in English', () => {
    render(<Staking language="en" />);
    expect(screen.getByText('Staking Center')).toBeInTheDocument();
  });

  it('renders title in Chinese', () => {
    render(<Staking language="zh" />);
    expect(screen.getByText('质押中心')).toBeInTheDocument();
  });

  it('renders subtitle in English', () => {
    render(<Staking language="en" />);
    expect(screen.getByText(/Make your crypto work for you/i)).toBeInTheDocument();
  });

  it('renders balance section', () => {
    render(<Staking language="en" />);
    expect(screen.getByText('Available Balance')).toBeInTheDocument();
  });

  it('renders staking plans section', () => {
    render(<Staking language="en" />);
    expect(screen.getByText('Staking Plans')).toBeInTheDocument();
  });

  it('renders Micro Staking plan', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText('Micro Staking').length).toBeGreaterThan(0);
  });

  it('renders Growth Pool plan', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText('Growth Pool').length).toBeGreaterThan(0);
  });

  it('renders Power Vault plan', () => {
    render(<Staking language="en" />);
    expect(screen.getByText('Power Vault')).toBeInTheDocument();
  });

  it('renders Mega Yield plan', () => {
    render(<Staking language="en" />);
    expect(screen.getByText('Mega Yield')).toBeInTheDocument();
  });

  it('renders APY percentages', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0);
  });

  it('renders lock period label in English', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText(/Lock Period/).length).toBeGreaterThan(0);
  });

  it('renders compound interest label', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText(/Compound Interest/).length).toBeGreaterThan(0);
  });

  it('renders start staking button', () => {
    render(<Staking language="en" />);
    expect(screen.getAllByText('Start Staking').length).toBeGreaterThan(0);
  });

  it('renders Chinese staking plans', () => {
    render(<Staking language="zh" />);
    expect(screen.getByText('质押方案')).toBeInTheDocument();
  });

  it('renders Chinese lock period', () => {
    render(<Staking language="zh" />);
    expect(screen.getAllByText(/锁仓期限/).length).toBeGreaterThan(0);
  });
});
