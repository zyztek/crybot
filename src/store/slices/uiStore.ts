import type { BaseTabType } from '@/types/tabs';
import type { StateCreator } from 'zustand';

export interface UIState {
  activeTab: BaseTabType;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  showWalletAddress: boolean;
  setActiveTab: (tab: BaseTabType) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  toggleWalletAddress: () => void;
}

export const createUIStore: StateCreator<UIState> = (set: any, get: any, api: any) => ({
  activeTab: 'faucets',
  language: 'es',
  theme: 'dark',
  showWalletAddress: false,
  setActiveTab: (tab: BaseTabType) => set({ activeTab: tab }),
  toggleLanguage: () =>
    set((state: UIState) => ({
      language: state.language === 'es' ? 'en' : 'es',
    })),
  toggleTheme: () =>
    set((state: UIState) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  toggleWalletAddress: () =>
    set((state: UIState) => ({
      showWalletAddress: !state.showWalletAddress,
    })),
});
