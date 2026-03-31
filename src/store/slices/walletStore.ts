import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { WalletBalance } from '@/types';

export const INITIAL_WALLET_BALANCE: WalletBalance = {
  btc: '0.00023045',
  eth: '0.012340',
  doge: '45.6789',
  sol: '2.4567',
  ltc: '0.5678',
  bnb: '0.1234',
  xrp: '125.50',
  ada: '85.20',
  avax: '5.75',
};

export interface WalletState {
  walletBalance: WalletBalance;
  updateBalance: (coin: keyof WalletBalance, amount: number) => void;
}

export const createWalletStore: StateCreator<WalletState> = (set: any, get: any, api: any) => ({
  walletBalance: INITIAL_WALLET_BALANCE,
  updateBalance: (coin, amount) =>
    set((state: WalletState) => ({
      walletBalance: {
        ...state.walletBalance,
        [coin]: (parseFloat(state.walletBalance[coin]) + amount).toFixed(8),
      },
    })),
});
