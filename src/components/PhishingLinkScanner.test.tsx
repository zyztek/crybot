import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PhishingLinkScanner from './PhishingLinkScanner';

describe('PhishingLinkScanner', () => {
  it('renders component', () => {
    const { container } = render(<PhishingLinkScanner />);
    // Check for scan button and shield icon area
    expect(container.textContent).toContain('Scan');
  });

  it('renders scan button', () => {
    render(<PhishingLinkScanner />);
    expect(screen.getByText('Scan')).toBeInTheDocument();
  });

  it('can enter URL to scan', () => {
    const { container } = render(<PhishingLinkScanner />);
    const input = container.querySelector('input[placeholder="Enter URL to scan..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    expect(input.value).toBe('https://example.com');
  });

  it('can scan URL', async () => {
    const { container } = render(<PhishingLinkScanner />);
    const input = container.querySelector('input[placeholder="Enter URL to scan..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    const scanButton = screen.getByText('Scan');
    fireEvent.click(scanButton);
    
    // Should show scanning state
    expect(container.textContent).toContain('Scanning');
  });

  it('displays scan result', async () => {
    const { container } = render(<PhishingLinkScanner />);
    const input = container.querySelector('input[placeholder="Enter URL to scan..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    const scanButton = screen.getByText('Scan');
    fireEvent.click(scanButton);
    
    // Wait for scan to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show result
    expect(container.textContent).toContain('SAFE');
  });

  it('shows reputation score', async () => {
    const { container } = render(<PhishingLinkScanner />);
    const input = container.querySelector('input[placeholder="Enter URL to scan..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    const scanButton = screen.getByText('Scan');
    fireEvent.click(scanButton);
    
    // Wait for scan to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show reputation score
    expect(container.textContent).toContain('Reputation Score');
  });

  it('shows domain age', async () => {
    const { container } = render(<PhishingLinkScanner />);
    const input = container.querySelector('input[placeholder="Enter URL to scan..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    const scanButton = screen.getByText('Scan');
    fireEvent.click(scanButton);
    
    // Wait for scan to complete
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Should show domain age
    expect(container.textContent).toContain('Domain Age');
  });

  it('disables button when input is empty', () => {
    const { container } = render(<PhishingLinkScanner />);
    const scanButton = screen.getByText('Scan') as HTMLButtonElement;
    
    expect(scanButton.disabled).toBe(true);
  });
});