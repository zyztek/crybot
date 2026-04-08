import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RiskAnalyzer from './RiskAnalyzer';

describe('RiskAnalyzer', () => {
  it('renders component', () => {
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

  it('toggles language when button clicked', () => {
    const { container } = render(<RiskAnalyzer />);
    // Initially in Spanish
    expect(container.textContent).toContain('Analizador de Riesgo');
    
    // Click language toggle
    const langButton = screen.getByText('EN');
    fireEvent.click(langButton);
    
    // Should switch to English
    expect(container.textContent).toContain('Risk Analyzer');
  });

  it('displays risk score of 42', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('42/100');
  });

  it('renders multiple risk categories', () => {
    const { container } = render(<RiskAnalyzer />);
    // 5 risk categories
    expect(container.textContent).toContain('Market Risk');
    expect(container.textContent).toContain('Counterparty Risk');
    expect(container.textContent).toContain('Regulatory Risk');
  });

  it('renders category score bars', () => {
    const { container } = render(<RiskAnalyzer />);
    // Each category has a score
    expect(container.textContent).toMatch(/\d+\/100/);
  });

  it('displays recommendation items', () => {
    const { container } = render(<RiskAnalyzer />);
    // 4 recommendations
    expect(container.textContent).toContain('Diversify');
    expect(container.textContent).toContain('Limit exposure');
  });

  it('renders risk level indicator', () => {
    const { container } = render(<RiskAnalyzer />);
    expect(container.textContent).toContain('Medium');
  });

  it('renders Shield icon in header', () => {
    const { container } = render(<RiskAnalyzer />);
    // SVG icons are rendered
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('renders different severity icons', () => {
    const { container } = render(<RiskAnalyzer />);
    // Should have various severity indicators
    expect(container.textContent).toContain('LOW');
    expect(container.textContent).toContain('MEDIUM');
  });

  it('switches back to Spanish when toggle clicked again', () => {
    const { container } = render(<RiskAnalyzer />);
    
    // Click to English
    fireEvent.click(screen.getByText('EN'));
    expect(container.textContent).toContain('Risk Analyzer');
    
    // Click back to Spanish
    fireEvent.click(screen.getByText('ES'));
    expect(container.textContent).toContain('Analizador de Riesgo');
  });
});
