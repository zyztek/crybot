import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DeFiExplorer from './DeFiExplorer';

describe('DeFiExplorer', () => {
  it('renders title', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Explorador DeFi');
  });

  it('renders stats cards', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('TVL Total');
    expect(container.textContent).toContain('Usuarios Totales');
    expect(container.textContent).toContain('APY Promedio');
    expect(container.textContent).toContain('Pools Activos');
  });

  it('renders language toggle button', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('EN');
  });

  it('renders view mode toggle', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Protocolos');
    expect(container.textContent).toContain('Pools');
  });

  it('renders chain filter dropdown', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Ethereum');
    expect(container.textContent).toContain('Solana');
  });

  it('renders category filter dropdown', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Lending');
    expect(container.textContent).toContain('DEX');
  });

  it('renders protocol items', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Aave');
    expect(container.textContent).toContain('Uniswap');
    expect(container.textContent).toContain('Curve');
  });

  it('renders protocol TVL and APY', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('TVL');
    expect(container.textContent).toContain('APY');
  });

  it('renders explore button', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Explorar');
  });

  it('renders status label for pools', () => {
    const { container } = render(<DeFiExplorer />);
    expect(container.textContent).toContain('Activo');
  });
});
