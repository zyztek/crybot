import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import EventCalendar from './EventCalendar';

describe('EventCalendar', () => {
  it('renders title', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Crypto Event Calendar');
  });

  it('renders stats cards', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Total Eventos');
    expect(container.textContent).toContain('Próximos');
    expect(container.textContent).toContain('En Vivo');
    expect(container.textContent).toContain('Alto Impacto');
  });

  it('renders filter section', () => {
    const { container } = render(<EventCalendar />);
    // Filter section exists - verify it's present
    const selects = container.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(2);
  });

  it('renders type filter dropdown', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Todos los Tipos');
  });

  it('renders status filter dropdown', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Todos los Estados');
  });

  it('renders event items', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Ethereum Cancun Upgrade');
    expect(container.textContent).toContain('Bitcoin Halving');
  });

  it('renders event type labels', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Conferencia');
    expect(container.textContent).toContain('Airdrop');
    expect(container.textContent).toContain('Token Burn');
  });

  it('renders status labels', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Próximo');
    expect(container.textContent).toContain('En vivo');
  });

  it('renders impact labels', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Impacto');
  });

  it('renders icons', () => {
    const { container } = render(<EventCalendar />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders external link buttons', () => {
    const { container } = render(<EventCalendar />);
    expect(container.textContent).toContain('Ver más');
  });
});
