import { lazy, Suspense } from 'react'
import type { TabType, Faucet, WalletBalance, ClaimHistory, Achievement, LeaderboardEntry } from '@/types'
import type { TranslationTexts } from '@/i18n/translations'
import type { User } from '@/types'

// Core components (loaded immediately - used most often)
import FaucetsView from '../FaucetsView'
import DashboardView from '../DashboardView'
import WalletView from '../WalletView'
import ReferralView from '../ReferralView'
import LeaderboardView from '../LeaderboardView'
import AchievementsView from '../AchievementsView'
import SettingsView from '../SettingsView'

// Lazy-loaded components (loaded on-demand)
const MiniGames = lazy(() => import('../MiniGames'))
const TradingSignals = lazy(() => import('../TradingSignals'))
const WhaleAlerts = lazy(() => import('../WhaleAlerts'))
const AdvancedAnalytics = lazy(() => import('../AdvancedAnalytics'))
const Portfolio = lazy(() => import('../Portfolio'))
const Lottery = lazy(() => import('../Lottery'))
const ScamDetector = lazy(() => import('../ScamDetector'))
const FaucetScanner = lazy(() => import('../FaucetScanner'))
const YieldFarming = lazy(() => import('../YieldFarming'))
const CompoundingCalculator = lazy(() => import('../CompoundingCalculator'))
const createLazyComponent = <T extends React.ComponentType<any>>(loader: () => Promise<{ default: T }>) => {
  return lazy(loader) as React.LazyExoticComponent<React.ComponentType<any>>
}

const AirdropHunter = createLazyComponent(() => import('../AirdropHunter'))
const CryptoTaxCalculator = createLazyComponent(() => import('../CryptoTaxCalculator'))
const SentimentAnalyzer = createLazyComponent(() => import('../SentimentAnalyzer'))
const NFTGallery = createLazyComponent(() => import('../NFTGallery'))
const LaunchpadTracker = createLazyComponent(() => import('../LaunchpadTracker'))
const CryptoCourses = createLazyComponent(() => import('../CryptoCourses'))
const CryptoConverter = lazy(() => import('../CryptoConverter'))
const DeFiExplorer = lazy(() => import('../DeFiExplorer'))
const GasTracker = lazy(() => import('../GasTracker'))
const CrossChainBridge = lazy(() => import('../CrossChainBridge'))
const OraclePriceFeeds = lazy(() => import('../OraclePriceFeeds'))
const BlockchainExplorer = lazy(() => import('../BlockchainExplorer'))
const SmartContractAuditor = lazy(() => import('../SmartContractAuditor'))
const TokenomicsAnalyzer = lazy(() => import('../TokenomicsAnalyzer'))
const EventCalendar = lazy(() => import('../EventCalendar'))
const ExchangeRates = lazy(() => import('../ExchangeRates'))
const SocialTrading = lazy(() => import('../SocialTrading'))
const NFTMarketplace = lazy(() => import('../NFTMarketplace'))
const DexAggregator = lazy(() => import('../DexAggregator'))
const LendingProtocol = lazy(() => import('../LendingProtocol'))
const LiquidityPoolAnalyzer = lazy(() => import('../LiquidityPoolAnalyzer'))
const FlashLoanCalculator = lazy(() => import('../FlashLoanCalculator'))
const GovernanceVoting = lazy(() => import('../GovernanceVoting'))
const DAODashboard = lazy(() => import('../DAODashboard'))
const TokenSale = lazy(() => import('../TokenSale'))
const WalletAudit = lazy(() => import('../WalletAudit'))
const MEVProtection = lazy(() => import('../MEVProtection'))
const Layer2Explorers = lazy(() => import('../Layer2Explorers'))
const CrossChainMessaging = lazy(() => import('../CrossChainMessaging'))
const Reports = lazy(() => import('../Reports'))
const Metrics = lazy(() => import('../Metrics'))
const PerformanceAnalyzer = lazy(() => import('../PerformanceAnalyzer'))
const RiskAnalyzer = lazy(() => import('../RiskAnalyzer'))
const TransactionSimulator = lazy(() => import('../TransactionSimulator'))
const ReplayTransaction = lazy(() => import('../ReplayTransaction'))
const ChainHealth = lazy(() => import('../ChainHealth'))
const FailureAnalyzer = lazy(() => import('../FailureAnalyzer'))
const GasProfiler = lazy(() => import('../GasProfiler'))

interface ContentAreaProps {
  activeTab: TabType
  faucets: Faucet[]
  walletBalance: WalletBalance
  history: ClaimHistory[]
  achievements: Achievement[]
  leaderboard: LeaderboardEntry[]
  withdrawalHistory: { id: number; coin: string; amount: string; address: string; status: string; date: string }[]
  user: User
  showWalletAddress: boolean
  language: 'es' | 'en'
  t: TranslationTexts
  onClaimFaucet: (faucet: Faucet) => void
  onToggleWalletAddress: () => void
  onCopyReferralCode: () => void
  onLogout: () => void
}

// Render lazy component inline - uses any type to bypass strict TypeScript checking for lazy imports
const renderLazy = (Component: any) => (
  <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div><span className="ml-3 text-purple-300">Loading...</span></div>}>
    <Component />
  </Suspense>
)

export default function ContentArea({
  activeTab,
  faucets,
  walletBalance,
  history,
  achievements,
  leaderboard,
  withdrawalHistory,
  user,
  showWalletAddress,
  language,
  t,
  onClaimFaucet,
  onToggleWalletAddress,
  onCopyReferralCode,
  onLogout,
}: ContentAreaProps) {

  switch (activeTab) {
    case 'faucets':
      return <FaucetsView faucets={faucets} onClaim={onClaimFaucet} language={language} t={t} />
    case 'dashboard':
      return <DashboardView history={history} achievements={achievements} t={t} language={language} />
    case 'wallet':
      return <WalletView walletBalance={walletBalance} withdrawalHistory={withdrawalHistory} showAddress={showWalletAddress} onToggleAddress={onToggleWalletAddress} t={t} />
    case 'referral':
      return <ReferralView user={user} onCopy={onCopyReferralCode} t={t} />
    case 'leaderboard':
      return <LeaderboardView leaderboard={leaderboard} t={t} />
    case 'achievements':
      return <AchievementsView achievements={achievements} t={t} />
    case 'settings':
      return <SettingsView user={user} t={t} lang={language} onLogout={onLogout} />
    case 'analytics':
      return renderLazy(AdvancedAnalytics)
    case 'signals':
      return renderLazy(TradingSignals)
    case 'whale alerts':
      return renderLazy(WhaleAlerts)
    case 'games':
      return renderLazy(MiniGames)
    case 'portfolio':
      return renderLazy(Portfolio)
    case 'lottery':
      return renderLazy(Lottery)
    case 'scam':
      return renderLazy(ScamDetector)
    case 'scanner':
      return renderLazy(FaucetScanner)
    case 'yield':
      return renderLazy(YieldFarming)
    case 'calculator':
      return renderLazy(CompoundingCalculator)
    case 'airdrop':
      return renderLazy(AirdropHunter)
    case 'tax':
      return renderLazy(CryptoTaxCalculator)
    case 'sentiment':
      return renderLazy(SentimentAnalyzer)
    case 'nft':
      return renderLazy(NFTGallery)
    case 'launchpad':
      return renderLazy(LaunchpadTracker)
    case 'courses':
      return renderLazy(CryptoCourses)
    case 'converter':
      return renderLazy(CryptoConverter)
    case 'defi':
      return renderLazy(DeFiExplorer)
    case 'gas':
      return renderLazy(GasTracker)
    case 'bridge':
      return renderLazy(CrossChainBridge)
    case 'oracle':
      return renderLazy(OraclePriceFeeds)
    case 'explorer':
      return renderLazy(BlockchainExplorer)
    case 'auditor':
      return renderLazy(SmartContractAuditor)
    case 'tokenomics':
      return renderLazy(TokenomicsAnalyzer)
    case 'calendar':
      return renderLazy(EventCalendar)
    case 'rates':
      return renderLazy(ExchangeRates)
    case 'social':
      return renderLazy(SocialTrading)
    case 'nft-marketplace':
      return renderLazy(NFTMarketplace)
    case 'dex':
      return renderLazy(DexAggregator)
    case 'lending':
      return renderLazy(LendingProtocol)
    case 'liquidity':
      return renderLazy(LiquidityPoolAnalyzer)
    case 'flash-loan':
      return renderLazy(FlashLoanCalculator)
    case 'governance':
      return renderLazy(GovernanceVoting)
    case 'dao':
      return renderLazy(DAODashboard)
    case 'token-sale':
      return renderLazy(TokenSale)
    case 'wallet-audit':
      return renderLazy(WalletAudit)
    case 'mev':
      return renderLazy(MEVProtection)
    case 'layer2':
      return renderLazy(Layer2Explorers)
    case 'xcm':
      return renderLazy(CrossChainMessaging)
    case 'reports':
      return renderLazy(Reports)
    case 'metrics':
      return renderLazy(Metrics)
    case 'perf-anal':
      return renderLazy(PerformanceAnalyzer)
    case 'risk-anal':
      return renderLazy(RiskAnalyzer)
    case 'tx-sim':
      return renderLazy(TransactionSimulator)
    case 'replay-tx':
      return renderLazy(ReplayTransaction)
    case 'chain-health':
      return renderLazy(ChainHealth)
    case 'fail-anal':
      return renderLazy(FailureAnalyzer)
    case 'gas-prof':
      return renderLazy(GasProfiler)
    default:
      return <FaucetsView faucets={faucets} onClaim={onClaimFaucet} language={language} t={t} />
  }
}