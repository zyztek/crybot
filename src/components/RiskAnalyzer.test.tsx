import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RiskAnalyzer from './RiskAnalyzer';

describe('RiskAnalyzer', () => {
  it('renders title', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('Analizador de Riesgo');
  });

  it('renders overall risk score section', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('Puntaje de Riesgo General');
    expect(container.textContent).toContain('Nivel de Riesgo');
  });

  it('renders risk score value', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('/100');
  });

  it('renders risk categories', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('Categorías de Riesgo');
    expect(container.textContent).toContain('Market Risk');
    expect(container.textContent).toContain('Liquidity Risk');
    expect(container.textContent).toContain('Smart Contract Risk');
  });

  it('renders severity labels', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('LOW');
    expect(container.textContent).toContain('MEDIUM');
  });

  it('renders recommendations section', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('Recomendaciones');
  });

  it('renders language toggle button', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('EN');
  });
});
