import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import type { TabType } from '@/types'

export interface UIState {
  activeTab: TabType
  language: 'es' | 'en'
  theme: 'dark' | 'light'
  showWalletAddress: boolean
  setActiveTab: (tab: TabType) => void
  toggleLanguage: () => void
  toggleTheme: () => void
  toggleWalletAddress: () => void
}

export const createUIStore: StateCreator<UIState> = (set) => ({
  activeTab: 'faucets',
  language: 'es',
  theme: 'dark',
  showWalletAddress: false,
  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'es' ? 'en' : 'es' 
  })),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),
  toggleWalletAddress: () => set((state) => ({ 
    showWalletAddress: !state.showWalletAddress 
  })),
})