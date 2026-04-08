import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TokenAuditChecker from './TokenAuditChecker';

describe('TokenAuditChecker', () => {
  it('renders component', () => {
    const { container } = render(<TokenAuditChecker />);
    expect(container.textContent).toContain('Enter a token');
  });

  it('renders check button', () => {
    render(<TokenAuditChecker />);
    expect(screen.getByText('Check')).toBeInTheDocument();
  });

  it('can enter token name', () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    expect(input.value).toBe('Bitcoin');
  });

  it('can check token', async () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    const checkButton = screen.getByText('Check');
    fireEvent.click(checkButton);
    
    // Should show checking state
    expect(container.textContent).toContain('Checking');
  });

  it('displays audit result', async () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    const checkButton = screen.getByText('Check');
    fireEvent.click(checkButton);
    
    // Wait for check to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show security score
    expect(container.textContent).toContain('Security Score');
  });

  it('shows verification status', async () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    const checkButton = screen.getByText('Check');
    fireEvent.click(checkButton);
    
    // Wait for check to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show verified status
    expect(container.textContent).toContain('Verified');
  });

  it('displays audit reports', async () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    const checkButton = screen.getByText('Check');
    fireEvent.click(checkButton);
    
    // Wait for check to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show audit reports section
    expect(container.textContent).toContain('Audit Reports');
  });

  it('shows last audit date', async () => {
    const { container } = render(<TokenAuditChecker />);
    const input = container.querySelector('input[placeholder="Enter token name or contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    
    const checkButton = screen.getByText('Check');
    fireEvent.click(checkButton);
    
    // Wait for check to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show last audit date
    expect(container.textContent).toContain('Last Audit');
  });
});