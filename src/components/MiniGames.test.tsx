import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MiniGames from './MiniGames';

describe('MiniGames', () => {
  it('renders title', () => {
    const { container } = render(<MiniGames />);
    expect(container.textContent).toContain('Mini-Juegos de Crypto');
  });

  it('renders game tabs', () => {
    const { container } = render(<MiniGames />);
    expect(container.textContent).toContain('Ruleta');
    expect(container.textContent).toContain('Dados');
    expect(container.textContent).toContain('Crash');
    expect(container.textContent).toContain('Minas');
  });

  it('renders stats cards', () => {
    const { container } = render(<MiniGames />);
    expect(container.textContent).toContain('Ganadas');
    expect(container.textContent).toContain('Última Ganancia');
    expect(container.textContent).toContain('Perdidas');
    expect(container.textContent).toContain('Balance Total');
  });

  it('renders spin wheel button', () => {
    const { container } = render(<MiniGames />);
    expect(container.textContent).toContain('Girar');
  });

  it('renders dice game elements', () => {
    const { container } = render(<MiniGames />);
    // Dice numbers 1-6
    expect(container.textContent).toContain('1');
    expect(container.textContent).toContain('2');
    expect(container.textContent).toContain('3');
  });

  it('renders game tabs with labels', () => {
    const { container } = render(<MiniGames />);
    // Game tabs are available but content depends on selected game
    expect(container.textContent).toContain('Ruleta');
    expect(container.textContent).toContain('Dados');
    expect(container.textContent).toContain('Crash');
    expect(container.textContent).toContain('Minas');
  });

  it('renders game balance displays', () => {
    const { container } = render(<MiniGames />);
    const btcTexts = container.textContent?.match(/BTC/g) || [];
    expect(btcTexts.length).toBeGreaterThan(0);
  });

  it('renders icons', () => {
    const { container } = render(<MiniGames />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders default spin wheel game', () => {
    const { container } = render(<MiniGames />);
    // Spin wheel is the default game - shows spin button
    expect(container.textContent).toContain('Girar');
  });
});
