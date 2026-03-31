/**
 * GraphQL Type Definitions
 * 
 * TypeScript type definitions for all GraphQL queries, mutations, and responses
 */

// ============== Core GraphQL Types ==============

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

export interface GraphQLVariables {
  [key: string]: unknown;
}

export interface GraphQLQueryOptions {
  variables?: GraphQLVariables;
  headers?: Record<string, string>;
}

// ============== User Types ==============

export interface User {
  id: string;
  email: string;
  username: string;
  walletAddress: string;
  referralCode: string;
  level: number;
  totalEarned: string;
  createdAt: string;
  wallets?: Wallet[];
}

export interface Wallet {
  id: string;
  userId: string;
  coin: string;
  address: string;
  balance: string;
  isCustodial: boolean;
  createdAt: string;
}

// ============== Transaction Types ==============

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  coin: string;
  amount: string;
  fee: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  confirmations: number;
  createdAt: string;
}

export interface Faucet {
  id: string;
  name: string;
  coin: string;
  network: string;
  faucetUrl: string;
  amountMin: string;
  amountMax: string;
  intervalHours: number;
  isActive: boolean;
  requiresApiKey: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  coin: string;
  target: string;
  reward: string;
  type: string;
}

export interface UserAchievement {
  id: string;
  achievementId: string;
  progress: number;
  completed: boolean;
  completedAt: string;
  claimedAt: string;
  achievement: Achievement;
}

export interface AnalyticsSummary {
  totalUsers: number;
  totalClaims: number;
  totalVolume: string;
  activeUsers24h: number;
  topCoins: Array<{ coin: string; claims: number; volume: string }>;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  score: string;
  rank: number;
  period: string;
  updatedAt: string;
}

// ============== Staking Types ==============

export interface StakingPool {
  id: string;
  name: string;
  coin: string;
  network: string;
  apy: string;
  tvl: string;
  minStake: string;
  maxStake: string;
  lockPeriod: string;
  rewardsCoin: string;
  isActive: boolean;
  totalStakers: number;
  createdAt: string;
}

export interface StakingPosition {
  id: string;
  poolId: string;
  poolName: string;
  coin: string;
  stakedAmount: string;
  rewardsEarned: string;
  rewardsClaimed: string;
  startTime: string;
  unlockTime: string;
  status: string;
  compounded: boolean;
}

export interface StakingReward {
  id: string;
  positionId: string;
  amount: string;
  type: string;
  txHash: string;
  createdAt: string;
}

export interface StakeTokenResponse {
  id: string;
  poolId: string;
  stakedAmount: string;
  rewardsEarned: string;
  startTime: string;
  unlockTime: string;
  status: string;
  txHash: string;
}

export interface UnstakeTokenResponse {
  id: string;
  status: string;
  txHash: string;
  releasedAmount: string;
}

export interface ClaimStakingRewardsResponse {
  id: string;
  amount: string;
  txHash: string;
}

// ============== DeFi Types ==============

export interface DeFiAsset {
  id: string;
  protocol: string;
  token: string;
  amount: string;
  value: string;
  apy: string;
  type: string;
}

export interface DeFiDebt {
  id: string;
  protocol: string;
  token: string;
  amount: string;
  value: string;
  interestRate: string;
}

export interface DeFiPortfolio {
  totalValue: string;
  totalYield: string;
  totalDebt: string;
  netWorth: string;
  assets: DeFiAsset[];
  debts: DeFiDebt[];
}

export interface DeFiProtocol {
  id: string;
  name: string;
  logo: string;
  category: string;
  network: string;
  tvl: string;
  apy: string;
  riskLevel: string;
  description: string;
  website: string;
  docsUrl: string;
}

export interface YieldOpportunity {
  id: string;
  protocol: string;
  token: string;
  network: string;
  apy: string;
  tvl: string;
  lockPeriod: string;
  riskLevel: string;
  type: string;
  actions: string[];
}

export interface SupplyLiquidityResponse {
  id: string;
  protocolId: string;
  token: string;
  amount: string;
  sharesReceived: string;
  apy: string;
  txHash: string;
}

export interface WithdrawLiquidityResponse {
  id: string;
  amountReceived: string;
  txHash: string;
}

// ============== News Types ==============

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  imageUrl: string;
  url: string;
  category: string;
  tags: string[];
  publishedAt: string;
  trending: boolean;
  sentiment: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  icon: string;
}

export interface MarketSentiment {
  overall: string;
  fearGreedIndex: number;
  socialSentiment: number;
  newsSentiment: number;
  trendingCoins: string[];
  updatedAt: string;
}

// ============== NFT Types ==============

export interface NFTCollection {
  id: string;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  floorPrice: string;
  totalVolume: string;
  totalSupply: string;
  ownersCount: number;
  blockchain: string;
  contractAddress: string;
  website: string;
  socialLinks: Record<string, string>;
}

export interface UserNFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  animationUrl: string;
  attributes: Record<string, string>;
  collection: {
    id: string;
    name: string;
    symbol: string;
  };
  acquiredAt: string;
  acquiredPrice: string;
  currentValue: string;
}

export interface NFTMarketData {
  floorPrice: string;
  highestSale: string;
  averagePrice: string;
  totalVolume: string;
  totalSales: number;
  holdersCount: number;
  priceHistory: Array<{ date: string; price: string; volume: string }>;
}

export interface MintNFTResponse {
  id: string;
  tokenId: string;
  name: string;
  imageUrl: string;
  txHash: string;
}

export interface TransferNFTResponse {
  id: string;
  txHash: string;
}

export interface BuyNFTResponse {
  id: string;
  nftId: string;
  price: string;
  txHash: string;
}

// ============== Lottery Types ==============

export interface LotteryRound {
  id: string;
  name: string;
  ticketPrice: string;
  prizePool: string;
  startTime: string;
  endTime: string;
  status: string;
  winningNumbers: number[];
  totalTickets: number;
  myTickets: number;
}

export interface LotteryTicket {
  id: string;
  roundId: string;
  numbers: number[];
  isWinner: boolean;
  prize: string;
  purchasedAt: string;
}

export interface BuyLotteryTicketResponse {
  id: string;
  roundId: string;
  numbers: number[];
  price: string;
  txHash: string;
}

export interface ClaimLotteryPrizeResponse {
  id: string;
  prize: string;
  txHash: string;
}

// ============== Airdrop Types ==============

export interface Airdrop {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  totalAmount: string;
  perUser: string;
  network: string;
  status: string;
  startTime: string;
  endTime: string;
  requirements: string[];
  website: string;
  isClaimed: boolean;
  canClaim: boolean;
}

export interface AirdropClaim {
  id: string;
  airdropId: string;
  airdropName: string;
  tokenAmount: string;
  txHash: string;
  claimedAt: string;
  status: string;
}

export interface ClaimAirdropResponse {
  id: string;
  airdropId: string;
  amount: string;
  txHash: string;
}

// ============== VIP Types ==============

export interface VIPTier {
  id: string;
  name: string;
  level: number;
  requiredVolume: string;
  requiredReferrals: number;
  benefits: string[];
  icon: string;
  color: string;
}

export interface UserVIPStatus {
  tierId: string;
  tierName: string;
  level: number;
  currentVolume: string;
  currentReferrals: number;
  nextTierAt: string;
  benefitsUnlocked: string[];
  progress: number;
}

// ============== Gas/Oracle Types ==============

export interface GasPrice {
  network: string;
  slow: string;
  standard: string;
  fast: string;
  fastest: string;
  lastUpdated: string;
}

export interface TokenPrice {
  coin: string;
  price: string;
  change24h: string;
  change7d: string;
  marketCap: string;
  volume24h: string;
  updatedAt: string;
}

export interface OracleData {
  id: string;
  name: string;
  value: string;
  timestamp: string;
  source: string;
  confidence: number;
}

// ============== Analytics Types ==============

export interface PortfolioAllocation {
  coin: string;
  value: string;
  percentage: number;
}

export interface PortfolioHistory {
  date: string;
  value: string;
}

export interface PortfolioAnalytics {
  totalValue: string;
  totalProfit: string;
  totalLoss: string;
  profitPercentage: number;
  allocation: PortfolioAllocation[];
  history: PortfolioHistory[];
}

export interface TransactionAnalytics {
  totalTransactions: number;
  totalVolume: string;
  averageTransactionSize: string;
  byType: Array<{ type: string; count: number; volume: string }>;
  byStatus: Array<{ status: string; count: number }>;
}

// ============== Alert Types ==============

export interface PriceAlert {
  id: string;
  coin: string;
  targetPrice: number;
  condition: string;
  isActive: boolean;
  triggered: boolean;
  triggeredAt: string;
  createdAt: string;
}

export interface CreatePriceAlertResponse {
  id: string;
  coin: string;
  targetPrice: number;
  condition: string;
  isActive: boolean;
  createdAt: string;
}

export interface WhaleAlert {
  id: string;
  coin: string;
  amount: string;
  usdValue: string;
  fromAddress: string;
  toAddress: string;
  txHash: string;
  type: string;
  timestamp: string;
}

export interface SubscribeWhaleAlertsResponse {
  id: string;
  coin: string;
  minAmount: number;
  subscribedAt: string;
}

export interface GasAlert {
  id: string;
  network: string;
  targetPrice: number;
  condition: string;
  createdAt: string;
}

// ============== Trading Signal Types ==============

export interface TradingSignal {
  id: string;
  coin: string;
  signal: string;
  entryPrice: string;
  takeProfitPrices: string[];
  stopLoss: string;
  confidence: number;
  timeframe: string;
  createdAt: string;
  expiresAt: string;
  rationale: string;
}

export interface SubscribeSignalResponse {
  id: string;
  signalId: string;
  subscribedAt: string;
}

// ============== Mission Types ==============

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: string;
  reward: string;
  rewardCoin: string;
  requirements: string[];
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  isClaimed: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface UserMission {
  id: string;
  missionId: string;
  progress: number;
  completed: boolean;
  claimedAt: string;
  mission: Mission;
}

export interface ClaimMissionRewardResponse {
  id: string;
  missionId: string;
  reward: string;
  rewardCoin: string;
  txHash: string;
}

// ============== Shop Types ==============

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceCoin: string;
  imageUrl: string;
  category: string;
  stock: number;
  isLimited: boolean;
  expiresAt: string;
}

export interface Purchase {
  id: string;
  itemId: string;
  itemName: string;
  price: string;
  purchasedAt: string;
  status: string;
}

export interface PurchaseItemResponse {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  totalPrice: string;
  txHash: string;
}

// ============== Converter Types ==============

export interface ConversionRate {
  fromCoin: string;
  toCoin: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  fee: string;
  total: string;
}

// ============== Token Analysis Types ==============

export interface TokenSecurity {
  isVerified: boolean;
  isHoneypot: boolean;
  isOpenSource: boolean;
  hasProxy: boolean;
  hasBlacklist: boolean;
  holderDistribution: Array<{ address: string; percentage: number }>;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface TokenAnalysis {
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  supply: string;
  holders: number;
  topHolders: Array<{ address: string; percentage: number }>;
  transfers24h: number;
  isMintable: boolean;
  isPaused: boolean;
  trustScore: number;
  security: TokenSecurity;
  socialLinks: Record<string, string>;
  website: string;
}

export interface WatchlistItem {
  id: string;
  contractAddress: string;
  network: string;
  addedAt: string;
}

// ============== Validator Types ==============

export interface Validator {
  id: string;
  name: string;
  network: string;
  commission: string;
  uptime: string;
  totalStaked: string;
  delegators: number;
  rewardRate: string;
  status: string;
  website: string;
  socialLinks: Record<string, string>;
}

export interface UserValidator {
  id: string;
  validatorId: string;
  validatorName: string;
  network: string;
  stakedAmount: string;
  rewardsEarned: string;
  startTime: string;
  status: string;
}

export interface DelegateToValidatorResponse {
  id: string;
  validatorId: string;
  amount: string;
  rewardsEarned: string;
  startTime: string;
  txHash: string;
}

export interface UndelegateResponse {
  id: string;
  amount: string;
  txHash: string;
}

export interface ClaimValidatorRewardsResponse {
  id: string;
  amount: string;
  txHash: string;
}

// ============== DAO/Governance Types ==============

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  status: string;
  votesFor: string;
  votesAgainst: string;
  totalVotes: string;
  quorum: string;
  createdAt: string;
  endsAt: string;
  executedAt: string;
  creator: string;
}

export interface DAOVote {
  id: string;
  proposalId: string;
  vote: string;
  weight: string;
  votedAt: string;
}

export interface CreateProposalResponse {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export interface VoteOnProposalResponse {
  id: string;
  proposalId: string;
  vote: string;
  weight: string;
  votedAt: string;
}

export interface ExecuteProposalResponse {
  id: string;
  executedAt: string;
  txHash: string;
}

// ============== Bridge Types ==============

export interface BridgeQuote {
  fromNetwork: string;
  toNetwork: string;
  token: string;
  amount: string;
  estimatedReceive: string;
  fee: string;
  feeToken: string;
  estimatedTime: string;
  route: string[];
}

export interface BridgeTransaction {
  id: string;
  fromNetwork: string;
  toNetwork: string;
  token: string;
  sentAmount: string;
  receivedAmount: string;
  fee: string;
  status: string;
  txHash: string;
  bridgeTxHash: string;
  createdAt: string;
  completedAt: string;
}

export interface InitiateBridgeResponse {
  id: string;
  fromNetwork: string;
  toNetwork: string;
  token: string;
  amount: string;
  fee: string;
  estimatedReceive: string;
  txHash: string;
}

export interface CompleteBridgeResponse {
  id: string;
  status: string;
  txHash: string;
}

// ============== Calendar Types ==============

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  coin: string;
  importance: string;
  source: string;
  url: string;
}

// ============== Referral Types ==============

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: string;
  pendingEarnings: string;
  referralLink: string;
  commissionRate: string;
}

export interface ReferralActivity {
  id: string;
  userId: string;
  username: string;
  action: string;
  reward: string;
  status: string;
  createdAt: string;
}

// ============== DEX/Swap Types ==============

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  priceImpact: string;
  route: string[];
}

export interface ExecuteSwapResponse {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  priceImpact: string;
  route: string[];
  txHash: string;
}

export interface PoolInfo {
  token0: string;
  token1: string;
  reserve0: string;
  reserve1: string;
  totalLiquidity: string;
  fee: string;
}

// ============== DCA Strategy Types ==============

export interface DCAStrategy {
  id: string;
  fromToken: string;
  toToken: string;
  amount: string;
  frequency: string;
  startTime: string;
  isActive: boolean;
}

export interface CreateDCAStrategyResponse {
  id: string;
  fromToken: string;
  toToken: string;
  amount: string;
  frequency: string;
  startTime: string;
  isActive: boolean;
}

// ============== Grid Trading Types ==============

export interface GridBot {
  id: string;
  token: string;
  lowerPrice: string;
  upperPrice: string;
  gridCount: number;
  isActive: boolean;
}

export interface CreateGridBotResponse {
  id: string;
  token: string;
  lowerPrice: string;
  upperPrice: string;
  gridCount: number;
  isActive: boolean;
}

export interface StopGridBotResponse {
  id: string;
  totalProfit: string;
  closedPositions: number;
}

// ============== Copy Trading Types ==============

export interface CopyTrade {
  id: string;
  traderId: string;
  allocation: number;
  startedAt: string;
}

export interface FollowTraderResponse {
  id: string;
  traderId: string;
  allocation: number;
  startedAt: string;
}

// ============== Token Vesting Types ==============

export interface VestingSchedule {
  id: string;
  recipient: string;
  totalAmount: string;
  startTime: string;
  duration: number;
}

export interface ClaimVestedTokensResponse {
  id: string;
  amount: string;
  txHash: string;
}

// ============== Multi-sig Types ==============

export interface MultisigWallet {
  id: string;
  address: string;
  name: string;
}

export interface CreateMultisigWalletResponse {
  id: string;
  address: string;
  name: string;
}

export interface ExecuteMultisigTransactionResponse {
  id: string;
  txHash: string;
}

// ============== Webhook Types ==============

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
}

export interface CreateWebhookResponse {
  id: string;
  url: string;
  events: string[];
  secret: string;
}

// ============== API Key Types ==============

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  expiresAt: string;
  createdAt: string;
}

export interface CreateAPIKeyResponse {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  expiresAt: string;
  createdAt: string;
}

// ============== Settings Types ==============

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  telegram: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  allowedIPs: string[];
}

// ============== Export Types ==============

export interface ExportDataResponse {
  url: string;
  expiresAt: string;
}

// ============== Batch Transaction Types ==============

export interface BatchTransactionResult {
  id: string;
  status: string;
  transactions: Array<{ txHash: string; status: string }>;
}

export interface RebalanceResult {
  id: string;
  swaps: Array<{
    fromToken: string;
    toToken: string;
    fromAmount: string;
    toAmount: string;
    txHash: string;
  }>;
  totalValue: string;
}

// ============== Token Lock Types ==============

export interface TokenLock {
  id: string;
  token: string;
  amount: string;
  lockEnd: string;
  beneficiary: string;
}

export interface LockTokensResponse {
  id: string;
  token: string;
  amount: string;
  lockEnd: string;
  beneficiary: string;
}

export interface UnlockTokensResponse {
  id: string;
  amount: string;
  txHash: string;
}

// ============== Contract Interaction Types ==============

export interface ContractInteractionResponse {
  id: string;
  txHash: string;
  result: unknown;
}