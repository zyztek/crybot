import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AirdropHunter } from './AirdropHunter';

describe('AirdropHunter', () => {
  it('renders title', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Airdrop Hunter');
  });

  it('renders stats cards', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Activos');
    expect(container.textContent).toContain('Próximos');
    expect(container.textContent).toContain('Verificados');
    expect(container.textContent).toContain('Finalizados');
  });

  it('renders filter section', () => {
    const { container } = render(<AirdropHunter />);
    // Filter section with dropdowns
    const selects = container.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(2);
  });

  it('renders status filter dropdown', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Todos los estados');
    expect(container.textContent).toContain('Activos');
    expect(container.textContent).toContain('Próximos');
    expect(container.textContent).toContain('Finalizados');
  });

  it('renders difficulty filter dropdown', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Todas las dificultades');
    expect(container.textContent).toContain('Fácil');
    expect(container.textContent).toContain('Media');
    expect(container.textContent).toContain('Difícil');
  });

  it('renders airdrop items', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('LayerZero Airdrop');
    expect(container.textContent).toContain('Arbitrum Odyssey');
  });

  it('renders airdrop rewards', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Recompensa');
    expect(container.textContent).toContain('Valor estimado');
  });

  it('renders deadline information', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Deadline');
  });

  it('renders status labels', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Activo');
    expect(container.textContent).toContain('Próximo');
  });

  it('renders details button', () => {
    const { container } = render(<AirdropHunter />);
    expect(container.textContent).toContain('Ver Detalles');
  });
});
