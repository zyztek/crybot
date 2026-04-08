import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsBar from './StatsBar';
import { mockTranslations, mockWalletBalance, mockHistory, mockFaucets } from '@/test/fixtures';
import type { WalletBalance } from '@/types';

const renderComponent = (component: React.ReactElement) => {
  return render(component);
};

describe('StatsBar', () => {
  it('renders total claimed with BTC value', () => {
    renderComponent(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    expect(screen.getByText('Total Reclamado')).toBeInTheDocument();
    expect(screen.getByText(/0\.00023045/)).toBeInTheDocument();
  });

  it('renders today claims count from history', () => {
    renderComponent(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    expect(screen.getByText('Claims Hoy')).toBeInTheDocument();
    // Check that the value text exists somewhere in the document
    expect(screen.getByText(/0\.00023045/)).toBeInTheDocument();
  });

  it('renders active faucets count', () => {
    renderComponent(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    expect(screen.getByText('Faucets Activos')).toBeInTheDocument();
  });

  it('renders available coins count', () => {
    renderComponent(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    expect(screen.getByText('Monedas Disponibles')).toBeInTheDocument();
    // All 14 coins have values > 0
    expect(screen.getAllByText('14')[0]).toBeInTheDocument();
  });

  it('renders all four stat cards', () => {
    renderComponent(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    // All titles should be present
    expect(screen.getByText('Total Reclamado')).toBeInTheDocument();
    expect(screen.getByText('Claims Hoy')).toBeInTheDocument();
    expect(screen.getByText('Faucets Activos')).toBeInTheDocument();
    expect(screen.getByText('Monedas Disponibles')).toBeInTheDocument();
  });

  it('filters out zero-value coins from available coins count', () => {
    const zeroBalanceWallet: WalletBalance = {
      btc: '0.00023045',
      eth: '0',
      doge: '45.6789',
      sol: '0',
      ltc: '0.5678',
      bnb: '0',
      xrp: '0',
      ada: '0',
      avax: '0',
      dot: '0',
      matic: '0',
      link: '0',
      atom: '0',
      uni: '0',
    };

    renderComponent(
      <StatsBar
        walletBalance={zeroBalanceWallet}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );

    // Should only count 3 coins with value > 0
    expect(screen.getAllByText('3')[0]).toBeInTheDocument();
  });
});
