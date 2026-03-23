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
const AirdropHunter = lazy(() => import('../AirdropHunter'))
const CryptoTaxCalculator = lazy(() => import('../CryptoTaxCalculator'))
const SentimentAnalyzer = lazy(() => import('../SentimentAnalyzer'))
const NFTGallery = lazy(() => import('../NFTGallery'))
const LaunchpadTracker = lazy(() => import('../LaunchpadTracker'))
const CryptoCourses = lazy(() => import('../CryptoCourses'))
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

// Type for lazy-loaded components that return JSX
type LazyComponent<TProps = Record<string, never>> = React.LazyExoticComponent<React.ComponentType<TProps>>

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-purple-300">Loading...</span>
    </div>
  )
}

// Helper function with proper typing for lazy components
function renderLazyComponent<TProps extends Record<string, unknown> = Record<string, never>>(
  Component: LazyComponent<TProps>
): JSX.Element {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  )
}

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
      return renderLazyComponent(AdvancedAnalytics)
    case 'signals':
      return renderLazyComponent(TradingSignals)
    case 'whale alerts':
      return renderLazyComponent(WhaleAlerts)
    case 'games':
      return renderLazyComponent(MiniGames)
    case 'portfolio':
      return renderLazyComponent(Portfolio)
    case 'lottery':
      return renderLazyComponent(Lottery)
    case 'scam':
      return renderLazyComponent(ScamDetector)
    case 'scanner':
      return renderLazyComponent(FaucetScanner)
    case 'yield':
      return renderLazyComponent(YieldFarming)
    case 'calculator':
      return renderLazyComponent(CompoundingCalculator)
    case 'airdrop':
      return renderLazyComponent(AirdropHunter)
    case 'tax':
      return renderLazyComponent(CryptoTaxCalculator)
    case 'sentiment':
      return renderLazyComponent(SentimentAnalyzer)
    case 'nft':
      return renderLazyComponent(NFTGallery)
    case 'launchpad':
      return renderLazyComponent(LaunchpadTracker)
    case 'courses':
      return renderLazyComponent(CryptoCourses)
    case 'converter':
      return renderLazyComponent(CryptoConverter)
    case 'defi':
      return renderLazyComponent(DeFiExplorer)
    case 'gas':
      return renderLazyComponent(GasTracker)
    case 'bridge':
      return renderLazyComponent(CrossChainBridge)
    case 'oracle':
      return renderLazyComponent(OraclePriceFeeds)
    case 'explorer':
      return renderLazyComponent(BlockchainExplorer)
    case 'auditor':
      return renderLazyComponent(SmartContractAuditor)
    case 'tokenomics':
      return renderLazyComponent(TokenomicsAnalyzer)
    case 'calendar':
      return renderLazyComponent(EventCalendar)
    case 'rates':
      return renderLazyComponent(ExchangeRates)
    case 'social':
      return renderLazyComponent(SocialTrading)
    case 'nft-marketplace':
      return renderLazyComponent(NFTMarketplace)
    case 'dex':
      return renderLazyComponent(DexAggregator)
    case 'lending':
      return renderLazyComponent(LendingProtocol)
    case 'liquidity':
      return renderLazyComponent(LiquidityPoolAnalyzer)
    case 'flash-loan':
      return renderLazyComponent(FlashLoanCalculator)
    case 'governance':
      return renderLazyComponent(GovernanceVoting)
    case 'dao':
      return renderLazyComponent(DAODashboard)
    case 'token-sale':
      return renderLazyComponent(TokenSale)
    case 'wallet-audit':
      return renderLazyComponent(WalletAudit)
    case 'mev':
      return renderLazyComponent(MEVProtection)
    case 'layer2':
      return renderLazyComponent(Layer2Explorers)
    case 'xcm':
      return renderLazyComponent(CrossChainMessaging)
    case 'reports':
      return renderLazyComponent(Reports)
    case 'metrics':
      return renderLazyComponent(Metrics)
    case 'perf-anal':
      return renderLazyComponent(PerformanceAnalyzer)
    case 'risk-anal':
      return renderLazyComponent(RiskAnalyzer)
    case 'tx-sim':
      return renderLazyComponent(TransactionSimulator)
    case 'replay-tx':
      return renderLazyComponent(ReplayTransaction)
    case 'chain-health':
      return renderLazyComponent(ChainHealth)
    case 'fail-anal':
      return renderLazyComponent(FailureAnalyzer)
    case 'gas-prof':
      return renderLazyComponent(GasProfiler)
    default:
      return <FaucetsView faucets={faucets} onClaim={onClaimFaucet} language={language} t={t} />
  }
}