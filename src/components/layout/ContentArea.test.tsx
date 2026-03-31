import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentArea from './ContentArea';
import {
  mockFaucets,
  mockWalletBalance,
  mockUser,
  mockTranslations,
  mockHistory,
} from '@/test/fixtures';
import { INITIAL_ACHIEVEMENTS, LEADERBOARD } from '@/test/fixtures';

const mockWithdrawalHistory = [
  {
    id: 1,
    coin: 'BTC',
    amount: '0.0001',
    address: 'bc1q...',
    status: 'completed' as const,
    date: '2024-01-10',
  },
];

const renderComponent = (props: Partial<Parameters<typeof ContentArea>[0]> = {}) => {
  return render(
    <ContentArea
      activeTab={props.activeTab || 'faucets'}
      faucets={props.faucets || mockFaucets}
      walletBalance={props.walletBalance || mockWalletBalance}
      history={props.history || mockHistory}
      achievements={props.achievements || INITIAL_ACHIEVEMENTS}
      leaderboard={props.leaderboard || LEADERBOARD}
      withdrawalHistory={props.withdrawalHistory || mockWithdrawalHistory}
      user={props.user || mockUser}
      showWalletAddress={props.showWalletAddress || false}
      language={props.language || 'es'}
      theme={props.theme || 'dark'}
      t={props.t || mockTranslations}
      onClaimFaucet={props.onClaimFaucet || vi.fn()}
      onToggleWalletAddress={props.onToggleWalletAddress || vi.fn()}
      onToggleTheme={props.onToggleTheme || vi.fn()}
      onCopyReferralCode={props.onCopyReferralCode || vi.fn()}
      onLogout={props.onLogout || vi.fn()}
    />
  );
};

describe('ContentArea', () => {
  it('renders FaucetsView when activeTab is faucets', () => {
    renderComponent({ activeTab: 'faucets' });
    // FaucetsView renders FaucetCards with faucet names
    expect(screen.getAllByText('FreeBitco.in').length).toBeGreaterThan(0);
  });

  it('renders DashboardView when activeTab is dashboard', () => {
    renderComponent({ activeTab: 'dashboard' });
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });

  it('renders WalletView when activeTab is wallet', () => {
    renderComponent({ activeTab: 'wallet' });
    // WalletView shows balance using translations
    expect(screen.getByText(/balance/i)).toBeInTheDocument();
  });

  it('renders ReferralView when activeTab is referral', () => {
    renderComponent({ activeTab: 'referral' });
    expect(screen.getByText('Programa de Referidos')).toBeInTheDocument();
  });

  it('renders LeaderboardView when activeTab is leaderboard', () => {
    renderComponent({ activeTab: 'leaderboard' });
    expect(screen.getByText('Ranking Global')).toBeInTheDocument();
  });

  it('renders AchievementsView when activeTab is achievements', () => {
    renderComponent({ activeTab: 'achievements' });
    // AchievementsView shows achievements by their title
    expect(screen.getByText('First Claim')).toBeInTheDocument();
  });

  it('renders SettingsView when activeTab is settings', () => {
    renderComponent({ activeTab: 'settings' });
    // SettingsView shows Profile section
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders loading fallback for lazy-loaded tabs', () => {
    renderComponent({ activeTab: 'analytics' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading fallback for games tab', () => {
    renderComponent({ activeTab: 'games' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading fallback for portfolio tab', () => {
    renderComponent({ activeTab: 'portfolio' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading fallback for lottery tab', () => {
    renderComponent({ activeTab: 'lottery' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading fallback for yield tab', () => {
    renderComponent({ activeTab: 'yield' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading fallback for defi tab', () => {
    renderComponent({ activeTab: 'defi' });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('falls back to FaucetsView for unknown tab', () => {
    renderComponent({ activeTab: 'unknown-tab' as any });
    // Falls back to FaucetsView which renders faucet cards
    expect(screen.getAllByText('FreeBitco.in').length).toBeGreaterThan(0);
  });

  it('renders with English language', () => {
    const tEn = { ...mockTranslations, history: 'History', achievementsTitle: 'Your Achievements' };
    renderComponent({ activeTab: 'dashboard', language: 'en', t: tEn });
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders with Spanish language', () => {
    renderComponent({ activeTab: 'dashboard', language: 'es' });
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });
});
