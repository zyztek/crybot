import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CryptoTaxCalculator } from './CryptoTaxCalculator';

describe('CryptoTaxCalculator', () => {
  it('renders title', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Crypto Tax Calculator');
  });

  it('renders tax summary cards', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Ganancias Realizadas');
    expect(container.textContent).toContain('Pérdidas Realizadas');
    expect(container.textContent).toContain('Pasivo Fiscal');
    expect(container.textContent).toContain('Ganancia Neta');
  });

  it('renders tax settings section', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Configuración Fiscal');
    expect(container.textContent).toContain('Tasa de Impuesto');
  });

  it('renders add transaction form', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Agregar Transacción');
  });

  it('renders transaction types', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Compra');
    expect(container.textContent).toContain('Venta');
  });

  it('renders transactions table', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Historial de Transacciones');
  });

  it('renders report buttons', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Generar Reporte');
    expect(container.textContent).toContain('Exportar CSV');
  });

  it('renders disclaimer', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Aviso Importante');
  });

  it('renders volume and fees', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('Volumen Total');
    expect(container.textContent).toContain('Total de Fees');
  });

  it('renders currency options', () => {
    const { container } = render(<CryptoTaxCalculator />);
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
  });
});
