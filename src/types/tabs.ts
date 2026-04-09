// Base tab categories
export type BaseTabType = 'faucets' | 'dashboard' | 'wallet' | 'referral' | 'leaderboard' | 'achievements' | 'settings';

// Trading tabs
export type TradingTabType = 'analytics' | 'signals' | 'whale alerts' | 'price alerts' | 'portfolio' | 'calculator';

// DeFi tabs  
export type DeFiTabType = 'staking' | 'defi-dashboard' | 'yield';

// Gaming tabs
export type GamingTabType = 'games' | 'lottery' | 'missions';

// Community tabs
export type CommunityTabType = 'shop' | 'vip' | 'news' | 'chat' | 'support';

// Utility tabs
export type UtilityTabType = 'scam' | 'scanner';

// Combined tab type with all categories
export type TabType = BaseTabType | TradingTabType | DeFiTabType | GamingTabType | CommunityTabType | UtilityTabType;

// Tab category mappings for organization
export const TAB_CATEGORIES = {
  base: ['faucets', 'dashboard', 'wallet', 'referral', 'leaderboard', 'achievements', 'settings'] as BaseTabType[],
  trading: ['analytics', 'signals', 'whale alerts', 'price alerts', 'portfolio', 'calculator'] as TradingTabType[],
  defi: ['staking', 'defi-dashboard', 'yield'] as DeFiTabType[],
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
