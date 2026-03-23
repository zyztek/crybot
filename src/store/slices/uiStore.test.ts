import { describe, it, expect } from 'vitest'
import { create } from 'zustand'
import { createUIStore, type UIState } from './uiStore'
import type { TabType } from '@/types'

describe('UI Store Slice', () => {
  it('initializes with correct default values', () => {
    const store = create<UIState>()(createUIStore)
    expect(store.getState().activeTab).toBe('faucets')
    expect(store.getState().language).toBe('es')
    expect(store.getState().showWalletAddress).toBe(false)
  })

  it('setActiveTab changes active tab', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().setActiveTab('wallet')
    expect(store.getState().activeTab).toBe('wallet')
  })

  it('setActiveTab accepts different tab types', () => {
    const store = create<UIState>()(createUIStore)
    const tabs: TabType[] = ['dashboard', 'wallet', 'leaderboard', 'achievements', 'games', 'news']
    
    tabs.forEach(tab => {
      store.getState().setActiveTab(tab)
      expect(store.getState().activeTab).toBe(tab)
    })
  })

  it('toggleLanguage switches from es to en', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().toggleLanguage()
    expect(store.getState().language).toBe('en')
  })

  it('toggleLanguage switches from en to es', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().toggleLanguage()
    store.getState().toggleLanguage()
    expect(store.getState().language).toBe('es')
  })

  it('toggleLanguage toggles correctly multiple times', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().toggleLanguage()
    expect(store.getState().language).toBe('en')
    store.getState().toggleLanguage()
    expect(store.getState().language).toBe('es')
    store.getState().toggleLanguage()
    expect(store.getState().language).toBe('en')
  })

  it('toggleWalletAddress switches from false to true', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().toggleWalletAddress()
    expect(store.getState().showWalletAddress).toBe(true)
  })

  it('toggleWalletAddress switches from true to false', () => {
    const store = create<UIState>()(createUIStore)
    store.getState().toggleWalletAddress()
    store.getState().toggleWalletAddress()
    expect(store.getState().showWalletAddress).toBe(false)
  })

  it('setActiveTab, toggleLanguage, toggleWalletAddress are functions', () => {
    const store = create<UIState>()(createUIStore)
    expect(typeof store.getState().setActiveTab).toBe('function')
    expect(typeof store.getState().toggleLanguage).toBe('function')
    expect(typeof store.getState().toggleWalletAddress).toBe('function')
  })
})