export interface Faucet {
  id: number
  name: string
  coin: string
  icon: string
  reward: string
  timer: number
  status: 'available' | 'claimed' | 'wait'
  category: 'hot' | 'stable' | 'new' | 'premium'
  difficulty: 'easy' | 'medium' | 'hard'
  translations: {
    es: string
    en: string
  }
}

export interface ClaimHistory {
  id: number
  faucet: string
  faucetId: number
  coin: string
  amount: string
  time: string
  date: string
}

export interface WalletBalance {
  btc: string
  eth: string
  doge: string
  sol: string
  ltc: string
  bnb: string
}

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  progress: number
  total: number
  unlocked: boolean
  reward: string
}

export interface User {
  username: string
  email: string
  level: number
  xp: number
  maxXp: number
  memberSince: string
  avatar: string
  twoFactorEnabled: boolean
  referralCode: string
  totalReferrals: number
  referralEarnings: string
  totalEarned?: string
  totalClaims?: number
}

export interface LeaderboardEntry {
  rank: number
  username: string
  totalClaimed: string
  claims: number
  avatar: string
  isUser?: boolean
}

export type TabType = 'faucets' | 'dashboard' | 'wallet' | 'referral' | 'leaderboard' | 'achievements' | 'settings' | 'games' | 'analytics' | 'signals' | 'whale alerts' | 'missions' | 'shop' | 'vip' | 'news' | 'portfolio' | 'lottery' | 'scam' | 'scanner' | 'yield' | 'calculator' | 'chat' | 'support' | 'marketplace' | 'staking' | 'airdrop' | 'tax' | 'sentiment' | 'nft' | 'launchpad' | 'courses' | 'converter' | 'defi' | 'gas' | 'bridge' | 'oracle' | 'explorer' | 'auditor' | 'tokenomics' | 'calendar' | 'rates' | 'social' | 'nft-marketplace' | 'dex' | 'lending' | 'liquidity' | 'flash-loan' | 'governance' | 'dao' | 'token-sale' | 'wallet-audit' | 'mev' | 'layer2' | 'xcm' | 'ai-bot' | 'yield-opt' | 'token-create' | 'nft-mint' | 'defi-ins' | 'forensics' | 'social-rec' | 'multi-sig' | 'prediction' | 'cc-swap' | 'token-vest' | 'arbitrage' | 'options' | 'stable-anal' | 'lend-opt' | 'token-sniff' | 'liq-mining' | 'validator' | 'node-guide' | 'testnet' | 'tx-accel' | 'custom-rpc' | 'address-book' | 'net-stats' | 'mempool' | 'ens-mgr' | 'fee-estimator' | 'aug-oracle' | 'webhook-mgr' | 'api-keys' | 'notif-center' | 'data-export' | 'contract-interact' | 'batch-tx' | 'port-rebal' | 'gas-alerts' | 'tx-history' | 'bridge-exp' | 'token-approv' | 'block-explore' | 'analytics-dash' | 'zk-proofs' | 'privacy-mixer' | 'market-cap' | 'dca-strat' | 'trading-journal' | 'derivatives' | 'copy-trading' | 'pl-calc' | 'grid-bot' | 'rebase' | 'dividend' | 'liq-mon' | 'events-log' | 'snapshot-mgr' | 'sandwich' | 'token-lock' | 'contract-scan' | 'kyc' | 'compliance' | 'tx-explore' | 'cross-track' | 'smart-rewards' | 'meme-gen' | 'il-calc' | 'dex-anal' | 'swap-interface' | 'metadata-mgr' | 'ipfs' | 'prop-create' | 'multi-chain' | 'alert-sys' | 'backup-mgr' | 'crypto-clock' | 'import-tools' | 'query-build' | 'badges' | 'crypto-charts' | 'toolbox' | 'reports' | 'metrics' | 'perf-anal' | 'risk-anal' | 'tx-sim' | 'replay-tx' | 'chain-health' | 'fail-anal' | 'gas-prof'
