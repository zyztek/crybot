import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { Faucet, ClaimHistory } from '@/types';

export const INITIAL_FAUCETS: Faucet[] = [
  {
    id: 1,
    name: 'FreeBitco.in',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00001000',
    timer: 60,
    status: 'available',
    category: 'premium',
    difficulty: 'easy',
    translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
  },
  {
    id: 2,
    name: 'FireFaucet',
    coin: 'ETH',
    icon: 'Ξ',
    reward: '0.0005',
    timer: 30,
    status: 'available',
    category: 'hot',
    difficulty: 'medium',
    translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
  },
  {
    id: 3,
    name: 'Cointiply',
    coin: 'DOGE',
    icon: 'Ð',
    reward: '5.50',
    timer: 45,
    status: 'available',
    category: 'stable',
    difficulty: 'easy',
    translations: { es: 'Moneda Gratis', en: 'Free Coins' },
  },
  {
    id: 4,
    name: 'FaucetCrypto',
    coin: 'SOL',
    icon: '◎',
    reward: '0.01',
    timer: 20,
    status: 'available',
    category: 'hot',
    difficulty: 'medium',
    translations: { es: 'Crypto Faucet', en: 'Crypto Faucet' },
  },
  {
    id: 5,
    name: 'BonusBitcoin',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00000500',
    timer: 15,
    status: 'available',
    category: 'stable',
    difficulty: 'easy',
    translations: { es: 'Bonus Bitcoin', en: 'Bonus Bitcoin' },
  },
  {
    id: 6,
    name: 'ADBTC',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00000300',
    timer: 10,
    status: 'available',
    category: 'stable',
    difficulty: 'hard',
    translations: { es: 'Bitcoin Ads', en: 'Bitcoin Ads' },
  },
  {
    id: 7,
    name: 'GetFreeBTC',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00000200',
    timer: 5,
    status: 'available',
    category: 'new',
    difficulty: 'easy',
    translations: { es: 'BTC Gratis', en: 'Get Free BTC' },
  },
  {
    id: 8,
    name: 'EthFaucet',
    coin: 'ETH',
    icon: 'Ξ',
    reward: '0.0001',
    timer: 40,
    status: 'available',
    category: 'hot',
    difficulty: 'easy',
    translations: { es: 'Faucet ETH', en: 'ETH Faucet' },
  },
  {
    id: 9,
    name: 'LTCFaucet',
    coin: 'LTC',
    icon: 'Ł',
    reward: '0.001',
    timer: 25,
    status: 'available',
    category: 'new',
    difficulty: 'medium',
    translations: { es: 'Faucet LTC', en: 'LTC Faucet' },
  },
  {
    id: 10,
    name: 'DogeClaim',
    coin: 'DOGE',
    icon: 'Ð',
    reward: '8.00',
    timer: 35,
    status: 'available',
    category: 'stable',
    difficulty: 'easy',
    translations: { es: 'Claim Doge', en: 'Doge Claim' },
  },
  {
    id: 11,
    name: 'SolanaDrop',
    coin: 'SOL',
    icon: '◎',
    reward: '0.015',
    timer: 50,
    status: 'available',
    category: 'premium',
    difficulty: 'medium',
    translations: { es: 'Solana Drop', en: 'Solana Drop' },
  },
  {
    id: 12,
    name: 'BNBFaucet',
    coin: 'BNB',
    icon: '⬡',
    reward: '0.002',
    timer: 60,
    status: 'available',
    category: 'hot',
    difficulty: 'hard',
    translations: { es: 'Faucet BNB', en: 'BNB Faucet' },
  },
];

export const INITIAL_HISTORY: ClaimHistory[] = [
  {
    id: 1,
    faucet: 'FreeBitco.in',
    faucetId: 1,
    coin: 'BTC',
    amount: '0.00001000',
    time: '14:32',
    date: 'Hoy',
  },
  {
    id: 2,
    faucet: 'FireFaucet',
    faucetId: 2,
    coin: 'ETH',
    amount: '0.0005',
    time: '14:25',
    date: 'Hoy',
  },
  {
    id: 3,
    faucet: 'Cointiply',
    faucetId: 3,
    coin: 'DOGE',
    amount: '5.50',
    time: '13:50',
    date: 'Hoy',
  },
];

export interface FaucetState {
  faucets: Faucet[];
  history: ClaimHistory[];
  claimFaucet: (
    faucet: Faucet,
    onCountdownEnd?: () => void,
    actions?: {
      updateBalance?: (
        coin: 'btc' | 'eth' | 'doge' | 'sol' | 'ltc' | 'bnb',
        amount: number
      ) => void;
      updateAchievementProgress?: (id: number, progress: number) => void;
    }
  ) => void;
}

export const createFaucetStore: StateCreator<FaucetState> = (set: any, get: any, api: any) => ({
  faucets: INITIAL_FAUCETS,
  history: INITIAL_HISTORY,
  claimFaucet: (faucet, onCountdownEnd, actions) => {
    const state = get();

    // Update faucet status
    const updatedFaucets = state.faucets.map((f: Faucet) =>
      f.id === faucet.id ? { ...f, status: 'wait' as const } : f
    );

    // Add to history
    const newHistory: ClaimHistory = {
      id: Date.now(),
      faucet: faucet.name,
      faucetId: faucet.id,
      coin: faucet.coin,
      amount: faucet.reward,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      date: 'Hoy',
    };

    // Update faucet state only (wallet/achievements handled by separate actions)
    set({
      faucets: updatedFaucets,
      history: [newHistory, ...state.history].slice(0, 20),
    });

    // Call wallet update via provided action (separates concerns)
    // Falls back to direct store access if actions not provided (backwards compatibility)
    const coinKey = faucet.coin.toLowerCase() as 'btc' | 'eth' | 'doge' | 'sol' | 'ltc' | 'bnb';
    const amount = parseFloat(faucet.reward);

    if (actions?.updateBalance) {
      actions.updateBalance(coinKey, amount);
    } else {
      // Fallback: try to call from combined store directly
      const store = get() as unknown as {
        updateBalance?: (
          coin: 'btc' | 'eth' | 'doge' | 'sol' | 'ltc' | 'bnb',
          amount: number
        ) => void;
      };
      store.updateBalance?.(coinKey, amount);
    }

    // Update achievements via provided action (Claim Master id=2 and Week Streak id=5)
    // Falls back to direct store access if actions not provided (backwards compatibility)
    if (actions?.updateAchievementProgress) {
      const fullState = get() as unknown as { achievements?: { id: number; progress: number }[] };
      const currentClaimMaster = fullState.achievements?.find(a => a.id === 2);
      const currentWeekStreak = fullState.achievements?.find(a => a.id === 5);
      actions.updateAchievementProgress(2, (currentClaimMaster?.progress || 0) + 1);
      actions.updateAchievementProgress(5, (currentWeekStreak?.progress || 0) + 1);
    } else {
      const store = get() as unknown as {
        updateAchievementProgress?: (id: number, progress: number) => void;
      };
      const currentAchievements = (
        get() as unknown as { achievements?: { id: number; progress: number }[] }
      )?.achievements;
      const currentClaimMaster = currentAchievements?.find(a => a.id === 2);
      const currentWeekStreak = currentAchievements?.find(a => a.id === 5);
      store.updateAchievementProgress?.(2, (currentClaimMaster?.progress || 0) + 1);
      store.updateAchievementProgress?.(5, (currentWeekStreak?.progress || 0) + 1);
    }

    // Handle countdown timer
    let countdown = faucet.timer;
    const interval = setInterval(() => {
      countdown--;
      const currentFaucets = get().faucets;
      set({
        faucets: currentFaucets.map((f: Faucet) =>
          f.id === faucet.id ? { ...f, timer: countdown } : f
        ),
      });

      if (countdown <= 0) {
        clearInterval(interval);
        const finalFaucets = get().faucets;
        set({
          faucets: finalFaucets.map((f: Faucet) =>
            f.id === faucet.id ? { ...f, status: 'available' as const, timer: faucet.timer } : f
          ),
        });
        onCountdownEnd?.();
      }
    }, 1000);
  },
});
