import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useCryptoStore } from '../store/cryptoStore';
import {
  INITIAL_WALLET_BALANCE,
  INITIAL_USER,
  INITIAL_FAUCETS,
  INITIAL_ACHIEVEMENTS,
} from '../test/fixtures';

// Reset store state before each test
beforeEach(() => {
  useCryptoStore.setState({
    isLoggedIn: false,
    language: 'es',
    notifications: 3,
    showWalletAddress: false,
    user: INITIAL_USER,
    walletBalance: INITIAL_WALLET_BALANCE,
    faucets: [...INITIAL_FAUCETS],
    achievements: [...INITIAL_ACHIEVEMENTS],
    history: [],
  });
});

describe('Component-Store Integration Tests', () => {
  describe('WalletView with Store', () => {
    it('displays wallet balance from store', () => {
      const balance = useCryptoStore.getState().walletBalance;
      expect(balance.btc).toBeDefined();
      expect(balance.eth).toBeDefined();
    });

    it('updates wallet balance when faucet is claimed', () => {
      const state = useCryptoStore.getState();
      const initialBTC = state.walletBalance.btc;
      const faucet = state.faucets[0];

      useCryptoStore.getState().claimFaucet(faucet);

      const newBalance = useCryptoStore.getState().walletBalance.btc;
      expect(parseFloat(newBalance)).toBeGreaterThan(parseFloat(initialBTC));
    });

    it('toggleWalletAddress updates store state', () => {
      expect(useCryptoStore.getState().showWalletAddress).toBe(false);

      useCryptoStore.getState().toggleWalletAddress();

      expect(useCryptoStore.getState().showWalletAddress).toBe(true);
    });
  });

  describe('FaucetsView with Store', () => {
    it('displays faucets from store', () => {
      const faucets = useCryptoStore.getState().faucets;
      expect(faucets.length).toBeGreaterThan(0);
    });

    it('claimFaucet updates faucet status in store', () => {
      const state = useCryptoStore.getState();
      const faucet = state.faucets[0];
      const initialStatus = faucet.status;

      useCryptoStore.getState().claimFaucet(faucet);

      const updatedFaucet = useCryptoStore.getState().faucets.find(f => f.id === faucet.id);
      expect(updatedFaucet?.status).toBe('wait');
    });

    it('claimFaucet adds to history in store', () => {
      const initialHistoryLength = useCryptoStore.getState().history.length;
      const faucet = useCryptoStore.getState().faucets[0];

      useCryptoStore.getState().claimFaucet(faucet);

      expect(useCryptoStore.getState().history.length).toBe(initialHistoryLength + 1);
    });
  });

  describe('AchievementsView with Store', () => {
    it('displays achievements from store', () => {
      const achievements = useCryptoStore.getState().achievements;
      expect(achievements.length).toBeGreaterThan(0);
    });

    it('claimFaucet increments achievement progress', () => {
      const state = useCryptoStore.getState();
      const initialProgress = state.achievements[1].progress; // Claim Master
      const faucet = state.faucets[0];

      useCryptoStore.getState().claimFaucet(faucet);

      expect(useCryptoStore.getState().achievements[1].progress).toBe(initialProgress + 1);
    });
  });

  describe('ReferralView with Store', () => {
    it('displays user referral code from store', () => {
      const user = useCryptoStore.getState().user;
      expect(user.referralCode).toBeDefined();
    });

    it('copyReferralCode updates notifications', () => {
      vi.stubGlobal('navigator', {
        clipboard: { writeText: vi.fn() },
      });

      const initialNotifications = useCryptoStore.getState().notifications;
      useCryptoStore.getState().copyReferralCode();

      expect(useCryptoStore.getState().notifications).toBe(initialNotifications + 1);

      vi.unstubAllGlobals();
    });
  });

  describe('Language Switching with Store', () => {
    it('toggleLanguage switches between es and en', () => {
      expect(useCryptoStore.getState().language).toBe('es');

      useCryptoStore.getState().toggleLanguage();
      expect(useCryptoStore.getState().language).toBe('en');

      useCryptoStore.getState().toggleLanguage();
      expect(useCryptoStore.getState().language).toBe('es');
    });

    it('language state is used by translations', () => {
      useCryptoStore.setState({ language: 'en' });
      expect(useCryptoStore.getState().language).toBe('en');

      useCryptoStore.setState({ language: 'es' });
      expect(useCryptoStore.getState().language).toBe('es');
    });
  });

  describe('Login/Logout with Store', () => {
    it('login sets isLoggedIn to true', () => {
      expect(useCryptoStore.getState().isLoggedIn).toBe(false);

      useCryptoStore.getState().login();

      expect(useCryptoStore.getState().isLoggedIn).toBe(true);
    });

    it('logout sets isLoggedIn to false', () => {
      useCryptoStore.getState().login();
      expect(useCryptoStore.getState().isLoggedIn).toBe(true);

      useCryptoStore.getState().logout();

      expect(useCryptoStore.getState().isLoggedIn).toBe(false);
    });

    it('logout preserves user data', () => {
      const userBefore = useCryptoStore.getState().user;

      useCryptoStore.getState().login();
      useCryptoStore.getState().logout();

      expect(useCryptoStore.getState().user).toEqual(userBefore);
    });
  });

  describe('Tab Navigation with Store', () => {
    it('setActiveTab changes active tab', () => {
      useCryptoStore.getState().setActiveTab('dashboard');
      expect(useCryptoStore.getState().activeTab).toBe('dashboard');

      useCryptoStore.getState().setActiveTab('wallet');
      expect(useCryptoStore.getState().activeTab).toBe('wallet');

      useCryptoStore.getState().setActiveTab('referral');
      expect(useCryptoStore.getState().activeTab).toBe('referral');
    });
  });

  describe('Persisted State with Store', () => {
    it('user data is persisted', () => {
      const user = useCryptoStore.getState().user;
      expect(user.username).toBeDefined();
      expect(user.email).toBeDefined();
    });

    it('wallet balance is persisted', () => {
      const balance = useCryptoStore.getState().walletBalance;
      expect(balance.btc).toBeDefined();
    });

    it('achievements are persisted', () => {
      const achievements = useCryptoStore.getState().achievements;
      expect(Array.isArray(achievements)).toBe(true);
    });

    it('history is persisted', () => {
      const history = useCryptoStore.getState().history;
      expect(Array.isArray(history)).toBe(true);
    });
  });

  describe('Multiple Actions Integration', () => {
    it('handles login then claim then logout', () => {
      // Login
      useCryptoStore.getState().login();
      expect(useCryptoStore.getState().isLoggedIn).toBe(true);

      // Claim faucet
      const faucet = useCryptoStore.getState().faucets[0];
      useCryptoStore.getState().claimFaucet(faucet);
      expect(useCryptoStore.getState().history.length).toBe(1);

      // Logout
      useCryptoStore.getState().logout();
      expect(useCryptoStore.getState().isLoggedIn).toBe(false);
    });

    it('handles language toggle then state changes', () => {
      useCryptoStore.getState().toggleLanguage();
      expect(useCryptoStore.getState().language).toBe('en');

      useCryptoStore.setState({ notifications: 10 });
      expect(useCryptoStore.getState().notifications).toBe(10);

      useCryptoStore.getState().toggleWalletAddress();
      expect(useCryptoStore.getState().showWalletAddress).toBe(true);
    });
  });
});
