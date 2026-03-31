import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

const renderComponent = (component: React.ReactElement) => {
  return render(component);
};

describe('Footer', () => {
  it('renders the app name', () => {
    renderComponent(<Footer />);
    expect(screen.getByText('CryptoFaucet Hub')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    renderComponent(<Footer />);
    expect(screen.getByText('© 2026 CryptoFaucet Hub. All rights reserved.')).toBeInTheDocument();
  });

  it('renders Terms link', () => {
    renderComponent(<Footer />);
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders Privacy link', () => {
    renderComponent(<Footer />);
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('renders Contact link', () => {
    renderComponent(<Footer />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
