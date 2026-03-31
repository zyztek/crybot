import { describe, it, expect } from 'vitest';
import { create } from 'zustand';
import { createWalletStore, INITIAL_WALLET_BALANCE, type WalletState } from './walletStore';

describe('Wallet Store Slice', () => {
  it('initializes with correct wallet balance', () => {
    const store = create<WalletState>()(createWalletStore);
    expect(store.getState().walletBalance).toEqual(INITIAL_WALLET_BALANCE);
  });

  it('updateBalance adds amount to BTC', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('btc', 0.001);
    const newBalance = parseFloat(store.getState().walletBalance.btc);
    expect(newBalance).toBeCloseTo(0.00123045, 8);
  });

  it('updateBalance adds amount to ETH', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('eth', 0.5);
    const newBalance = parseFloat(store.getState().walletBalance.eth);
    expect(newBalance).toBeCloseTo(0.51234, 5);
  });

  it('updateBalance adds amount to DOGE', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('doge', 100);
    const newBalance = parseFloat(store.getState().walletBalance.doge);
    expect(newBalance).toBe(145.6789);
  });

  it('updateBalance preserves other coin balances', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('btc', 0.001);
    expect(store.getState().walletBalance.eth).toBe(INITIAL_WALLET_BALANCE.eth);
    expect(store.getState().walletBalance.doge).toBe(INITIAL_WALLET_BALANCE.doge);
  });

  it('updateBalance is a function', () => {
    const store = create<WalletState>()(createWalletStore);
    expect(typeof store.getState().updateBalance).toBe('function');
  });

  it('multiple updates accumulate correctly', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('btc', 0.001);
    store.getState().updateBalance('btc', 0.002);
    const newBalance = parseFloat(store.getState().walletBalance.btc);
    expect(newBalance).toBeCloseTo(0.00323045, 8);
  });

  it('updateBalance handles SOL', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('sol', 1.5);
    const newBalance = parseFloat(store.getState().walletBalance.sol);
    expect(newBalance).toBeCloseTo(3.9567, 4);
  });

  it('updateBalance handles LTC', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('ltc', 0.5);
    const newBalance = parseFloat(store.getState().walletBalance.ltc);
    expect(newBalance).toBeCloseTo(1.0678, 4);
  });

  it('updateBalance handles BNB', () => {
    const store = create<WalletState>()(createWalletStore);
    store.getState().updateBalance('bnb', 0.25);
    const newBalance = parseFloat(store.getState().walletBalance.bnb);
    expect(newBalance).toBeCloseTo(0.3734, 4);
  });
});
