import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RugPullDetector from './RugPullDetector';

describe('RugPullDetector', () => {
  it('renders component', () => {
    const { container } = render(<RugPullDetector />);
    expect(container.textContent).toContain('Enter a token');
  });

  it('renders analyze button', () => {
    render(<RugPullDetector />);
    expect(screen.getByText('Analyze')).toBeInTheDocument();
  });

  it('can enter token address', () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    expect(input.value).toBe('0x1234567890abcdef');
  });

  it('can analyze token', async () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    const analyzeButton = screen.getByText('Analyze');
    fireEvent.click(analyzeButton);
    
    // Should show analyzing state
    expect(container.textContent).toContain('Analyzing');
  });

  it('displays analysis result', async () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    const analyzeButton = screen.getByText('Analyze');
    fireEvent.click(analyzeButton);
    
    // Wait for analysis to complete
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    // Should show trust score
    expect(container.textContent).toContain('Trust Score');
  });

  it('shows risk level', async () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    const analyzeButton = screen.getByText('Analyze');
    fireEvent.click(analyzeButton);
    
    // Wait for analysis to complete
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    // Should show risk level
    expect(container.textContent).toContain('Risk Level');
  });

  it('displays holder count', async () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    const analyzeButton = screen.getByText('Analyze');
    fireEvent.click(analyzeButton);
    
    // Wait for analysis to complete
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    // Should show holders
    expect(container.textContent).toContain('Holders');
  });

  it('shows token information', async () => {
    const { container } = render(<RugPullDetector />);
    const input = container.querySelector('input[placeholder="Enter token contract address..."]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '0x1234567890abcdef' } });
    
    const analyzeButton = screen.getByText('Analyze');
    fireEvent.click(analyzeButton);
    
    // Wait for analysis to complete
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    // Should show token info
    expect(container.textContent).toContain('Token Information');
  });

  it('disables button when input is empty', () => {
    render(<RugPullDetector />);
    const analyzeButton = screen.getByText('Analyze') as HTMLButtonElement;
    
    expect(analyzeButton.disabled).toBe(true);
  });
});