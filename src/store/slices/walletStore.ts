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
};

export interface WalletState {
  walletBalance: WalletBalance;
  updateBalance: (coin: keyof WalletBalance, amount: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
