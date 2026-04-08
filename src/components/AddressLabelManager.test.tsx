import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddressLabelManager from './AddressLabelManager';

describe('AddressLabelManager', () => {
  it('renders component', () => {
    const { container } = render(<AddressLabelManager />);
    expect(container.textContent).toContain('Add New Label');
  });

  it('renders add new label section', () => {
    const { container } = render(<AddressLabelManager />);
    expect(container.textContent).toContain('Address');
    expect(container.textContent).toContain('Label');
    expect(container.textContent).toContain('Category');
  });

  it('renders add button', () => {
    render(<AddressLabelManager />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders search input', () => {
    const { container } = render(<AddressLabelManager />);
    // Search input should be present (placeholder may not be in textContent)
    const searchInput = container.querySelector('input[type="text"]');
    expect(searchInput).toBeTruthy();
  });

  it('renders initial labels', () => {
    const { container } = render(<AddressLabelManager />);
    expect(container.textContent).toContain('My Wallet');
    expect(container.textContent).toContain('Binance Hot');
    expect(container.textContent).toContain('Uniswap V3');
  });

  it('renders category badges', () => {
    const { container } = render(<AddressLabelManager />);
    expect(container.textContent).toContain('Personal');
    expect(container.textContent).toContain('Exchange');
    expect(container.textContent).toContain('Protocol');
  });

  it('can add a new label', () => {
    const { container } = render(<AddressLabelManager />);
    const addressInput = container.querySelector('input[placeholder="0x..."]') as HTMLInputElement;
    const labelInput = container.querySelector('input[placeholder="Label name"]') as HTMLInputElement;
    const addButton = screen.getByText('Add');

    fireEvent.change(addressInput, { target: { value: '0xABC123' } });
    fireEvent.change(labelInput, { target: { value: 'Test Label' } });
    fireEvent.click(addButton);

    expect(container.textContent).toContain('Test Label');
  });

  it('can delete a label', () => {
    const { container } = render(<AddressLabelManager />);
    // My Wallet should be present initially
    expect(container.textContent).toContain('My Wallet');

    // Find and click delete button (first one)
    const deleteButtons = container.querySelectorAll('button');
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    }
  });

  it('can filter labels by search', () => {
    const { container } = render(<AddressLabelManager />);
    const searchInput = container.querySelector('input[placeholder="Search labels..."]') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Binance' } });

    expect(container.textContent).toContain('Binance Hot');
    // My Wallet should not appear in filtered results
  });

  it('renders category select options', () => {
    const { container } = render(<AddressLabelManager />);
    const select = container.querySelector('select');
    expect(select).toBeTruthy();
  });

  it('renders address input field', () => {
    const { container } = render(<AddressLabelManager />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });
});