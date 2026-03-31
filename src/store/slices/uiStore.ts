import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { TabType } from '@/types';

export interface UIState {
  activeTab: TabType;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  showWalletAddress: boolean;
  setActiveTab: (tab: TabType) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  toggleWalletAddress: () => void;
}

export const createUIStore: StateCreator<UIState> = (set: any, get: any, api: any) => ({
  activeTab: 'faucets',
  language: 'es',
  theme: 'dark',
  showWalletAddress: false,
  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
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
