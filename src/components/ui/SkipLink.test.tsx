import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipLink from './SkipLink';

describe('SkipLink', () => {
  it('renders link with correct href', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders children content', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    expect(screen.getAllByText('Skip to main content')[0]).toBeInTheDocument();
  });

  it('applies sr-only class by default for accessibility', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('sr-only');
  });

  it('applies focus styles when focused', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('focus:not-sr-only');
    expect(link.className).toContain('focus:absolute');
    expect(link.className).toContain('focus:top-4');
    expect(link.className).toContain('focus:left-4');
  });

  it('applies focus ring styles', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('focus:ring-2');
    expect(link.className).toContain('focus:ring-purple-400');
  });

  it('applies background and text colors on focus', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('focus:bg-purple-600');
    expect(link.className).toContain('focus:text-white');
  });

  it('applies rounded and font styles on focus', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('focus:rounded-lg');
    expect(link.className).toContain('focus:font-medium');
  });

  it('applies z-index on focus', () => {
    render(<SkipLink targetId="main-content">Skip to main content</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link.className).toContain('focus:z-50');
  });

  it('works with different targetId', () => {
    render(<SkipLink targetId="sidebar">Skip to sidebar</SkipLink>);
    const links = screen.getAllByRole('link');
    const link = links[links.length - 1];
    expect(link).toHaveAttribute('href', '#sidebar');
  });
});
