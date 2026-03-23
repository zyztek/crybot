import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import type { TabType } from '@/types'

export interface UIState {
  activeTab: TabType
  language: 'es' | 'en'
  showWalletAddress: boolean
  setActiveTab: (tab: TabType) => void
  toggleLanguage: () => void
  toggleWalletAddress: () => void
}

export const createUIStore: StateCreator<UIState> = (set) => ({
  activeTab: 'faucets',
  language: 'es',
  showWalletAddress: false,
  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'es' ? 'en' : 'es' 
  })),
  toggleWalletAddress: () => set((state) => ({ 
    showWalletAddress: !state.showWalletAddress 
  })),
})