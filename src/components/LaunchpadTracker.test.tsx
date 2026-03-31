import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LaunchpadTracker } from './LaunchpadTracker';

describe('LaunchpadTracker', () => {
  it('renders title', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Launchpad Tracker');
  });

  it('renders stats cards', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Total Raiseado');
    expect(container.textContent).toContain('Cap Total');
    expect(container.textContent).toContain('En Vivo');
    expect(container.textContent).toContain('Próximos');
  });

  it('renders filter buttons', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Todos');
    expect(container.textContent).toContain('En Vivo');
    expect(container.textContent).toContain('Staking');
    expect(container.textContent).toContain('Próximos');
    expect(container.textContent).toContain('Finalizados');
  });

  it('renders category filter', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Todas las Categorías');
  });

  it('renders project items', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('DeFi Protocol X');
    expect(container.textContent).toContain('Metaverse Game');
  });

  it('renders progress bars', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Progress');
    expect(container.textContent).toContain('Raised');
  });

  it('renders token price and allocation', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Token Price');
    expect(container.textContent).toContain('Allocation');
  });

  it('renders KYC and audit badges', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('KYC');
    expect(container.textContent).toContain('Auditado');
  });

  it('renders participate button', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Participar Ahora');
  });

  it('renders risk disclaimer', () => {
    const { container } = render(<LaunchpadTracker />);
    expect(container.textContent).toContain('Aviso de Riesgo');
  });
});
