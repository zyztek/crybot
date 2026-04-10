import type { BaseTabType, WalletBalance } from '@/types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { create } from 'zustand';

// Import store slice creators
import { createAuthStore, createFaucetStore, createUIStore, createWalletStore } from './index';

// Mock navigator.clipboard
beforeEach(() => {
  vi.stubGlobal('navigator', {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Store Slices Integration Tests', () => {
  describe('Auth Slice', () => {
    it('initializes with isLoggedIn false', () => {
      const store = create(createAuthStore);
      expect(store.getState().isLoggedIn).toBe(false);
    });

    it('login sets isLoggedIn to true', () => {
      const store = create(createAuthStore);
      store.getState().login();
      expect(store.getState().isLoggedIn).toBe(true);
    });

    it('logout sets isLoggedIn to false', () => {
      const store = create(createAuthStore);
      store.getState().login();
      store.getState().logout();
      expect(store.getState().isLoggedIn).toBe(false);
    });

    it('login and logout work correctly in sequence', () => {
      const store = create(createAuthStore);

      expect(store.getState().isLoggedIn).toBe(false);

      store.getState().login();
      expect(store.getState().isLoggedIn).toBe(true);

      store.getState().logout();
      expect(store.getState().isLoggedIn).toBe(false);

      store.getState().login();
      expect(store.getState().isLoggedIn).toBe(true);
    });
  });

  describe('UI Slice', () => {
    it('initializes with correct default values', () => {
      const store = create(createUIStore);
      const state = store.getState();

      expect(state.activeTab).toBe('faucets');
      expect(state.language).toBe('es');
      expect(state.theme).toBe('dark');
      expect(state.showWalletAddress).toBe(false);
    });

    it('setActiveTab updates the active tab', () => {
      const store = create(createUIStore);

      store.getState().setActiveTab('dashboard');
      expect(store.getState().activeTab).toBe('dashboard');

      store.getState().setActiveTab('wallet');
      expect(store.getState().activeTab).toBe('wallet');

      store.getState().setActiveTab('leaderboard');
      expect(store.getState().activeTab).toBe('leaderboard');
    });

    it('toggleLanguage switches between es and en', () => {
      const store = create(createUIStore);

      expect(store.getState().language).toBe('es');

      store.getState().toggleLanguage();
      expect(store.getState().language).toBe('en');

      store.getState().toggleLanguage();
      expect(store.getState().language).toBe('es');
    });

    it('toggleTheme switches between dark and light', () => {
      const store = create(createUIStore);

      expect(store.getState().theme).toBe('dark');

      store.getState().toggleTheme();
      expect(store.getState().theme).toBe('light');

      store.getState().toggleTheme();
      expect(store.getState().theme).toBe('dark');
    });

    it('toggleWalletAddress toggles boolean value', () => {
      const store = create(createUIStore);

      expect(store.getState().showWalletAddress).toBe(false);

      store.getState().toggleWalletAddress();
      expect(store.getState().showWalletAddress).toBe(true);

      store.getState().toggleWalletAddress();
      expect(store.getState().showWalletAddress).toBe(false);
    });

    it('multiple UI actions work together', () => {
      const store = create(createUIStore);

      // Make multiple changes
      store.getState().setActiveTab('achievements');
      store.getState().toggleLanguage();
      store.getState().toggleTheme();
      store.getState().toggleWalletAddress();

      const state = store.getState();
      expect(state.activeTab).toBe('achievements');
      expect(state.language).toBe('en');
      expect(state.theme).toBe('light');
      expect(state.showWalletAddress).toBe(true);
    });
  });

  describe('Wallet Slice', () => {
    it('initializes with default wallet balance', () => {
      const store = create(createWalletStore);
      const balance = store.getState().walletBalance;

      expect(balance.btc).toBeDefined();
      expect(balance.eth).toBeDefined();
      expect(balance.doge).toBeDefined();
      expect(balance.sol).toBeDefined();
      expect(balance.ltc).toBeDefined();
      expect(balance.bnb).toBeDefined();
    });

    it('updateBalance correctly updates BTC balance', () => {
      const store = create(createWalletStore);
      const initialBalance = store.getState().walletBalance.btc;

      store.getState().updateBalance('btc', 0.001);

      const newBalance = store.getState().walletBalance.btc;
      expect(parseFloat(newBalance)).toBeGreaterThan(parseFloat(initialBalance));
    });

    it('updateBalance correctly updates ETH balance', () => {
      const store = create(createWalletStore);
      const initialBalance = parseFloat(store.getState().walletBalance.eth);

      store.getState().updateBalance('eth', 0.1);

      const newBalance = parseFloat(store.getState().walletBalance.eth);
      expect(newBalance).toBeCloseTo(initialBalance + 0.1, 8);
    });

    it('updateBalance works for all supported coins', () => {
      const store = create(createWalletStore);

      const coins: (keyof WalletBalance)[] = ['btc', 'eth', 'doge', 'sol', 'ltc', 'bnb'];

      coins.forEach(coin => {
        const initial = store.getState().walletBalance[coin];
        store.getState().updateBalance(coin, 1);
        const updated = store.getState().walletBalance[coin];
        expect(parseFloat(updated)).toBe(parseFloat(initial) + 1);
      });
    });

    it('accumulate multiple balance updates', () => {
      const store = create(createWalletStore);
      const initial = store.getState().walletBalance.btc;

      store.getState().updateBalance('btc', 0.1);
      store.getState().updateBalance('btc', 0.2);
      store.getState().updateBalance('btc', 0.3);

      const final = store.getState().walletBalance.btc;
      expect(parseFloat(final)).toBe(parseFloat(initial) + 0.6);
    });
  });

  describe('Faucet Slice', () => {
    it('initializes with faucets and history', () => {
      const store = create(createFaucetStore);
      const state = store.getState();

      expect(state.faucets).toBeDefined();
      expect(Array.isArray(state.faucets)).toBe(true);
      expect(state.history).toBeDefined();
      expect(Array.isArray(state.history)).toBe(true);
    });

    it('initial faucets have required properties', () => {
      const store = create(createFaucetStore);
      const faucets = store.getState().faucets;

      if (faucets.length > 0) {
        const faucet = faucets[0];
        expect(faucet).toHaveProperty('id');
        expect(faucet).toHaveProperty('name');
        expect(faucet).toHaveProperty('coin');
        expect(faucet).toHaveProperty('status');
      }
    });
  });

  describe('Cross-Slice Integration', () => {
    it('combined store works with auth and UI slices', () => {
      const authStore = createAuthStore;
      const uiStore = createUIStore;

      const combined = create((set: any, get: any, api: any) => ({
        ...authStore(set, get, api),
        ...uiStore(set, get, api),
      }));

      // Auth should work
      combined.getState().login();
      expect(combined.getState().isLoggedIn).toBe(true);

      // UI should work
      combined.getState().setActiveTab('dashboard');
      expect(combined.getState().activeTab).toBe('dashboard');

      combined.getState().toggleLanguage();
      expect(combined.getState().language).toBe('en');
    });

    it('combined store works with wallet and UI slices', () => {
      const walletStore = createWalletStore;
      const uiStore = createUIStore;

      const combined = create((set: any, get: any, api: any) => ({
        ...walletStore(set, get, api),
        ...uiStore(set, get, api),
      }));

      // Wallet should work
      const initialBtc = combined.getState().walletBalance.btc;
      combined.getState().updateBalance('btc', 0.5);
      expect(combined.getState().walletBalance.btc).not.toBe(initialBtc);

      // UI should work
      combined.getState().setActiveTab('wallet');
      expect(combined.getState().activeTab).toBe('wallet');
    });

    it('full combined store with auth, UI, and wallet', () => {
      const authStore = createAuthStore;
      const uiStore = createUIStore;
      const walletStore = createWalletStore;

      const combined = create((set: any, get: any, api: any) => ({
        ...authStore(set, get, api),
        ...uiStore(set, get, api),
        ...walletStore(set, get, api),
      }));

      // Test all three slices
      combined.getState().login();
      expect(combined.getState().isLoggedIn).toBe(true);

      combined.getState().setActiveTab('referral');
      expect(combined.getState().activeTab).toBe('referral');

      combined.getState().toggleLanguage();
      expect(combined.getState().language).toBe('en');

      const initialBtc = combined.getState().walletBalance.btc;
      combined.getState().updateBalance('btc', 0.001);
      expect(combined.getState().walletBalance.btc).not.toBe(initialBtc);
    });

    it('state changes are independent across slices', () => {
      const authStore = createAuthStore;
      const uiStore = createUIStore;
      const walletStore = createWalletStore;

      const combined = create((set: any, get: any, api: any) => ({
        ...authStore(set, get, api),
        ...uiStore(set, get, api),
        ...walletStore(set, get, api),
      }));

      // Change UI state - should not affect auth
      combined.getState().setActiveTab('dashboard');
      combined.getState().toggleLanguage();
      expect(combined.getState().isLoggedIn).toBe(false); // Auth unchanged

      // Change wallet state - should not affect UI
      combined.getState().updateBalance('eth', 1);
      expect(combined.getState().activeTab).toBe('dashboard'); // UI unchanged
      expect(combined.getState().language).toBe('en'); // UI unchanged
    });
  });

  describe('State Reset', () => {
    it('can manually reset state using setState', () => {
      const authStore = createAuthStore;
      const uiStore = createUIStore;

      const combined = create((set: any, get: any, api: any) => ({
        ...authStore(set, get, api),
        ...uiStore(set, get, api),
      }));

      // Make changes
      combined.getState().login();
      combined.getState().setActiveTab('settings');
      combined.getState().toggleLanguage();

      // Verify changes
      expect(combined.getState().isLoggedIn).toBe(true);
      expect(combined.getState().activeTab).toBe('settings');
      expect(combined.getState().language).toBe('en');

      // Reset
      combined.setState({
        isLoggedIn: false,
        activeTab: 'faucets' as BaseTabType,
        language: 'es' as const,
        theme: 'dark' as const,
        showWalletAddress: false,
      });

      // Verify reset
      expect(combined.getState().isLoggedIn).toBe(false);
      expect(combined.getState().activeTab).toBe('faucets');
      expect(combined.getState().language).toBe('es');
    });
  });

  describe('TypeScript Type Safety', () => {
    it('TabType accepts valid tab values', () => {
      const store = create(createUIStore);
      const validTabs: BaseTabType[] = [
        'faucets',
        'dashboard',
        'wallet',
        'referral',
        'leaderboard',
        'achievements',
        'settings',
      ];

      validTabs.forEach(tab => {
        store.getState().setActiveTab(tab);
        expect(store.getState().activeTab).toBe(tab);
      });
    });

    it('WalletBalance accepts valid coin keys', () => {
      const store = create(createWalletStore);
      const validCoins: (keyof WalletBalance)[] = ['btc', 'eth', 'doge', 'sol', 'ltc', 'bnb'];

      validCoins.forEach(coin => {
        store.getState().updateBalance(coin, 0.001);
        expect(store.getState().walletBalance[coin]).toBeDefined();
      });
    });

    it('language accepts only es or en', () => {
      const store = create(createUIStore);

      // Default is es
      expect(store.getState().language).toBe('es');

      // Toggle to en
      store.getState().toggleLanguage();
      expect(store.getState().language).toBe('en');

      // Toggle back to es
      store.getState().toggleLanguage();
      expect(store.getState().language).toBe('es');
    });
  });
});
