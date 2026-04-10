// Base tab categories
export type BaseTabType =
  | 'faucets'
  | 'dashboard'
  | 'wallet'
  | 'referral'
  | 'leaderboard'
  | 'achievements'
  | 'settings';

// AI & Machine Learning tabs
export type AITabType =
  | 'price-predictor'
  | 'smart-faucet'
  | 'risk-assessment'
  | 'portfolio-optimizer'
  | 'sentiment-analysis';

// Trading tabs
export type TradingTabType =
  | 'analytics'
  | 'signals'
  | 'whale alerts'
  | 'price alerts'
  | 'portfolio'
  | 'calculator';

// DeFi tabs
export type DeFiTabType =
  | 'staking'
  | 'defi-dashboard'
  | 'yield'
  | 'yield-aggregator'
  | 'community-pools'
  | 'cross-chain-bridge';

// Gamification tabs
export type GamificationTabType =
  | 'achievements-2'
  | 'streak-system'
  | 'global-leaderboard'
  | 'quest-system'
  | 'tournament-mode';

// Analytics & Data tabs
export type AnalyticsTabType =
  | 'real-time-analytics'
  | 'custom-charts'
  | 'api-analytics'
  | 'portfolio-analytics'
  | 'market-scanner';

// Performance & UX tabs
export type PerformanceTabType =
  | 'pwa-implementation'
  | 'progressive-loading'
  | 'smart-caching'
  | 'real-time-updates'
  | 'mobile-first';

// Security & Trust tabs
export type SecurityTabType =
  | 'multi-factor-auth'
  | 'hardware-wallet'
  | 'social-recovery'
  | 'audit-trail'
  | 'zero-knowledge';

// Globalization tabs
export type GlobalizationTabType =
  | 'multi-language'
  | 'regional-regulations'
  | 'local-currencies'
  | 'cultural-adaptation'
  | 'timezone-intelligence';

// Personalization tabs
export type PersonalizationTabType =
  | 'theme-engine'
  | 'custom-dashboards'
  | 'widget-system'
  | 'layout-templates'
  | 'color-schemes';

// Automation tabs
export type AutomationTabType =
  | 'smart-alerts'
  | 'auto-rebalancing'
  | 'dca-bots'
  | 'limit-order-automation'
  | 'tax-optimization';

// Mobile & Apps tabs
export type MobileTabType =
  | 'react-native-app'
  | 'apple-watch-app'
  | 'browser-extension'
  | 'desktop-app'
  | 'telegram-bot';

// Education tabs
export type EducationTabType =
  | 'crypto-academy'
  | 'trading-simulator'
  | 'interactive-tutorials'
  | 'knowledge-base'
  | 'certification-program';

// Monetization tabs
export type MonetizationTabType =
  | 'premium-features'
  | 'api-service'
  | 'white-label'
  | 'marketplace'
  | 'data-products';

// Web3 Integration tabs
export type Web3TabType =
  | 'wallet-connect'
  | 'dapp-browser'
  | 'nft-gallery'
  | 'dao-tools'
  | 'metaverse-integration';

// Gaming tabs (legacy)
export type GamingTabType = 'games' | 'lottery' | 'missions';

// Community tabs
export type CommunityTabType = 'shop' | 'vip' | 'news' | 'chat' | 'support';

// Utility tabs
export type UtilityTabType = 'scam' | 'scanner';

// Combined tab type with all categories
export type TabType =
  | BaseTabType
  | AITabType
  | TradingTabType
  | DeFiTabType
  | GamificationTabType
  | AnalyticsTabType
  | PerformanceTabType
  | SecurityTabType
  | GlobalizationTabType
  | PersonalizationTabType
  | AutomationTabType
  | MobileTabType
  | EducationTabType
  | MonetizationTabType
  | Web3TabType
  | GamingTabType
  | CommunityTabType
  | UtilityTabType;

// Tab category mappings for organization
export const TAB_CATEGORIES = {
  base: [
    'faucets',
    'dashboard',
    'wallet',
    'referral',
    'leaderboard',
    'achievements',
    'settings',
  ] as BaseTabType[],
  ai: [
    'price-predictor',
    'smart-faucet',
    'risk-assessment',
    'portfolio-optimizer',
    'sentiment-analysis',
  ] as AITabType[],
  trading: [
    'analytics',
    'signals',
    'whale alerts',
    'price alerts',
    'portfolio',
    'calculator',
  ] as TradingTabType[],
  defi: [
    'staking',
    'defi-dashboard',
    'yield',
    'yield-aggregator',
    'community-pools',
    'cross-chain-bridge',
  ] as DeFiTabType[],
  gamification: [
    'achievements-2',
    'streak-system',
    'global-leaderboard',
    'quest-system',
    'tournament-mode',
  ] as GamificationTabType[],
  analytics: [
    'real-time-analytics',
    'custom-charts',
    'api-analytics',
    'portfolio-analytics',
    'market-scanner',
  ] as AnalyticsTabType[],
  performance: [
    'pwa-implementation',
    'progressive-loading',
    'smart-caching',
    'real-time-updates',
    'mobile-first',
  ] as PerformanceTabType[],
  security: [
    'multi-factor-auth',
    'hardware-wallet',
    'social-recovery',
    'audit-trail',
    'zero-knowledge',
  ] as SecurityTabType[],
  globalization: [
    'multi-language',
    'regional-regulations',
    'local-currencies',
    'cultural-adaptation',
    'timezone-intelligence',
  ] as GlobalizationTabType[],
  personalization: [
    'theme-engine',
    'custom-dashboards',
    'widget-system',
    'layout-templates',
    'color-schemes',
  ] as PersonalizationTabType[],
  automation: [
    'smart-alerts',
    'auto-rebalancing',
    'dca-bots',
    'limit-order-automation',
    'tax-optimization',
  ] as AutomationTabType[],
  mobile: [
    'react-native-app',
    'apple-watch-app',
    'browser-extension',
    'desktop-app',
    'telegram-bot',
  ] as MobileTabType[],
  education: [
    'crypto-academy',
    'trading-simulator',
    'interactive-tutorials',
    'knowledge-base',
    'certification-program',
  ] as EducationTabType[],
  monetization: [
    'premium-features',
    'api-service',
    'white-label',
    'marketplace',
    'data-products',
  ] as MonetizationTabType[],
  web3: [
    'wallet-connect',
    'dapp-browser',
    'nft-gallery',
    'dao-tools',
    'metaverse-integration',
  ] as Web3TabType[],
  gaming: ['games', 'lottery', 'missions'] as GamingTabType[],
  community: ['shop', 'vip', 'news', 'chat', 'support'] as CommunityTabType[],
  utility: ['scam', 'scanner'] as UtilityTabType[],
} as const;

// Helper functions
export function isBaseTab(tab: TabType): tab is BaseTabType {
  return TAB_CATEGORIES.base.includes(tab as BaseTabType);
}

export function isTradingTab(tab: TabType): tab is TradingTabType {
  return TAB_CATEGORIES.trading.includes(tab as TradingTabType);
}

export function isDeFiTab(tab: TabType): tab is DeFiTabType {
  return TAB_CATEGORIES.defi.includes(tab as DeFiTabType);
}

export function isGamingTab(tab: TabType): tab is GamingTabType {
  return TAB_CATEGORIES.gaming.includes(tab as GamingTabType);
}

export function isCommunityTab(tab: TabType): tab is CommunityTabType {
  return TAB_CATEGORIES.community.includes(tab as CommunityTabType);
}

export function isUtilityTab(tab: TabType): tab is UtilityTabType {
  return TAB_CATEGORIES.utility.includes(tab as UtilityTabType);
}
