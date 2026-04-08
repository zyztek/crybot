/**
 * Represents a cryptocurrency faucet
 * @interface Faucet
 */
export interface Faucet {
  id: number;
  name: string;
  coin: string;
  icon: string;
  reward: string;
  timer: number;
  status: 'available' | 'claimed' | 'wait';
  category: 'hot' | 'stable' | 'new' | 'premium';
  difficulty: 'easy' | 'medium' | 'hard';
  translations: {
    es: string;
    en: string;
  };
}

/**
 * Represents a claim history entry
 * @interface ClaimHistory
 */
export interface ClaimHistory {
  id: number;
  faucet: string;
  faucetId: number;
  coin: string;
  amount: string;
  time: string;
  date: string;
}

/**
 * Represents wallet balance across multiple cryptocurrencies
 * @interface WalletBalance
 */
export interface WalletBalance {
  btc: string;
  eth: string;
  doge: string;
  sol: string;
  ltc: string;
  bnb: string;
  xrp: string;
  ada: string;
  avax: string;
  dot: string;
  matic: string;
  link: string;
  atom: string;
  uni: string;
}

/**
 * Represents a user achievement
 * @interface Achievement
 */
export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
  reward: string;
}

/**
 * Represents a user account
 * @interface User
 */
export interface User {
  username: string;
  email: string;
  level: number;
  xp: number;
  maxXp: number;
  memberSince: string;
  avatar: string;
  twoFactorEnabled: boolean;
  referralCode: string;
  totalReferrals: number;
  referralEarnings: string;
  totalEarned?: string;
  totalClaims?: number;
}

/**
 * Represents a leaderboard entry
 * @interface LeaderboardEntry
 */
export interface LeaderboardEntry {
  rank: number;
  username: string;
  totalClaimed: string;
  claims: number;
  avatar: string;
  isUser?: boolean;
}

/**
 * Union type of all available navigation tabs
 * @type TabType
 */
export type TabType =
  | 'faucets'
  | 'dashboard'
  | 'wallet'
  | 'referral'
  | 'leaderboard'
  | 'achievements'
  | 'settings'
  | 'games'
  | 'analytics'
  | 'signals'
  | 'whale alerts'
  | 'price alerts'
  | 'staking'
  | 'defi-dashboard'
  | 'missions'
  | 'shop'
  | 'vip'
  | 'news'
  | 'portfolio'
  | 'lottery'
  | 'scam'
  | 'scanner'
  | 'yield'
  | 'calculator'
  | 'chat'
  | 'support'
  | 'marketplace'
  | 'staking'
  | 'airdrop'
  | 'tax'
  | 'sentiment'
  | 'nft'
  | 'launchpad'
  | 'courses'
  | 'converter'
  | 'defi'
  | 'gas'
  | 'bridge'
  | 'oracle'
  | 'explorer'
  | 'auditor'
  | 'tokenomics'
  | 'calendar'
  | 'rates'
  | 'social'
  | 'nft-marketplace'
  | 'dex'
  | 'lending'
  | 'liquidity'
  | 'flash-loan'
  | 'governance'
  | 'dao'
  | 'token-sale'
  | 'wallet-audit'
  | 'mev'
  | 'layer2'
  | 'xcm'
  | 'ai-bot'
  | 'yield-opt'
  | 'token-create'
  | 'nft-mint'
  | 'defi-ins'
  | 'forensics'
  | 'social-rec'
  | 'multi-sig'
  | 'prediction'
  | 'cc-swap'
  | 'token-vest'
  | 'arbitrage'
  | 'options'
  | 'stable-anal'
  | 'lend-opt'
  | 'token-sniff'
  | 'liq-mining'
  | 'validator'
  | 'node-guide'
  | 'testnet'
  | 'tx-accel'
  | 'custom-rpc'
  | 'address-book'
  | 'net-stats'
  | 'mempool'
  | 'ens-mgr'
  | 'fee-estimator'
  | 'aug-oracle'
  | 'webhook-mgr'
  | 'api-keys'
  | 'notif-center'
  | 'data-export'
  | 'contract-interact'
  | 'batch-tx'
  | 'port-rebal'
  | 'gas-alerts'
  | 'tx-history'
  | 'bridge-exp'
  | 'token-approv'
  | 'block-explore'
  | 'analytics-dash'
  | 'zk-proofs'
  | 'privacy-mixer'
  | 'market-cap'
  | 'dca-strat'
  | 'trading-journal'
  | 'derivatives'
  | 'copy-trading'
  | 'pl-calc'
  | 'grid-bot'
  | 'rebase'
  | 'dividend'
  | 'liq-mon'
  | 'events-log'
  | 'snapshot-mgr'
  | 'sandwich'
  | 'token-lock'
  | 'contract-scan'
  | 'kyc'
  | 'compliance'
  | 'tx-explore'
  | 'cross-track'
  | 'smart-rewards'
  | 'meme-gen'
  | 'il-calc'
  | 'dex-anal'
  | 'swap-interface'
  | 'metadata-mgr'
  | 'ipfs'
  | 'prop-create'
  | 'multi-chain'
  | 'alert-sys'
  | 'backup-mgr'
  | 'crypto-clock'
  | 'import-tools'
  | 'query-build'
  | 'badges'
  | 'crypto-charts'
  | 'toolbox'
  | 'reports'
  | 'metrics'
  | 'perf-anal'
  | 'risk-anal'
  | 'tx-sim'
  | 'replay-tx'
  | 'chain-health'
  | 'fail-anal'
  | 'gas-prof'
  | 'nft-faucet'
  | 'pl-calc'
  | 'risk-reward'
  | 'position-size'
  | 'breakeven'
  | 'options-greeks'
  | 'volatility'
  | 'max-drawdown'
  | 'sharpe-ratio'
  | 'sortino-ratio'
  | 'calmar-ratio'
  | 'correlation'
  | 'beta-calc'
  | 'alpha-track'
  | 'var-calc'
  | 'yield-opt'
  | 'apy-comp'
  | 'gasless'
  | 'lp-roi'
  | 'flash-profit'
  | 'bridge-comp'
  | 'staking-proj'
  | 'gov-track'
  | 'token-vest'
  | 'protocol-tvl'
  | 'whale-hist'
  | 'exchange-res'
  | 'etf-flow'
  | 'liq-heat'
  | 'spot-fut'
  | 'cb-premium'
  | 'ex-flow'
  | 'net-util'
  | 'defi-rev'
  | 'nft-anal'
  | 'pk-check'
  | 'seed-valid'
  | 'multi-sig-build'
  | 'tx-timer'
  | 'slippage'
  | 'mev-inspect'
  | 'sandwich-det'
  | 'token-revok'
  | 'wallet-age'
  | 'hist-port'
  | 'copy-signal'
  | 'trading-comp'
  | 'achievement-show'
  | 'news-agg'
  | 'events-track'
  | 'liquidation'
  | 'fee-est'
  | 'gas-opt'
  | 'order-book'
  | 'rug-pull'
  | 'phishing'
  | 'tax-loss'
  | 'on-chain'
  | 'token-dist'
  | 'hash-rate';

/**
 * Union type of available social media icon types
 * @type SocialIconType
 */
export type SocialIconType =
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'youtube'
  | 'discord'
  | 'telegram'
  | 'whatsapp';
