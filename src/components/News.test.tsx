import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import News from './News';

describe('News', () => {
  it('renders title in English', () => {
    render(<News language="en" />);
    expect(screen.getByText('Crypto News')).toBeInTheDocument();
  });

  it('renders title in Chinese', () => {
    render(<News language="zh" />);
    expect(screen.getByText('加密新闻')).toBeInTheDocument();
  });

  it('renders market stats section', () => {
    const { container } = render(<News language="en" />);
    expect(container.textContent).toContain('Market Cap');
  });

  it('renders trending section', () => {
    render(<News language="en" />);
    expect(screen.getAllByText('Trending').length).toBeGreaterThan(0);
  });

  it('renders latest section', () => {
    render(<News language="en" />);
    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('renders Bitcoin news in trending', () => {
    const { container } = render(<News language="en" />);
    expect(container.textContent).toContain('Bitcoin Reaches New All-Time High');
  });

  it('renders Ethereum news in trending', () => {
    const { container } = render(<News language="en" />);
    expect(container.textContent).toContain('New Ethereum Upgrade Announced');
  });

  it('renders market cap stat', () => {
    render(<News language="en" />);
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
  });

  it('renders 24h volume stat', () => {
    render(<News language="en" />);
    expect(screen.getByText('24h Volume')).toBeInTheDocument();
  });

  it('renders enable notifications button', () => {
    render(<News language="en" />);
    expect(screen.getByText('Enable Notifications')).toBeInTheDocument();
  });

  it('renders read more text', () => {
    const { container } = render(<News language="en" />);
    expect(container.textContent).toContain('Read More');
  });

  it('renders all news button', () => {
    render(<News language="en" />);
    expect(screen.getByText('All News')).toBeInTheDocument();
  });

  it('renders Chinese market stats', () => {
    render(<News language="zh" />);
    expect(screen.getByText('市值')).toBeInTheDocument();
  });

  it('renders multiple trending articles', () => {
    render(<News language="en" />);
    const content = document.body.textContent || '';
    expect(content).toContain('Bitcoin');
    expect(content).toContain('Ethereum');
    expect(content).toContain('Solana');
  });
});
