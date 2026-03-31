import { lazy, Suspense } from 'react';
import type {
  TabType,
  Faucet,
  WalletBalance,
  ClaimHistory,
  Achievement,
  LeaderboardEntry,
} from '@/types';
import type { TranslationTexts } from '@/i18n/translations';
import type { User } from '@/types';

// Core components (loaded immediately - used most often)
import FaucetsView from '../FaucetsView';
import DashboardView from '../DashboardView';
import WalletView from '../WalletView';
import ReferralView from '../ReferralView';
import LeaderboardView from '../LeaderboardView';
import AchievementsView from '../AchievementsView';
import SettingsView from '../SettingsView';
import TestnetView from '../TestnetView';
import NFTFaucetView from '../NFTFaucetView';

// Helper function to handle lazy loading of components with both default and named exports
const createLazyComponent = (importFunc: () => Promise<any>) => {
  return lazy(importFunc) as React.ComponentType<any>;
};

// Lazy-loaded components (loaded on-demand)
const MiniGames = createLazyComponent(() => import('../MiniGames'));
const TradingSignals = createLazyComponent(() => import('../TradingSignals'));
const WhaleAlerts = createLazyComponent(() => import('../WhaleAlerts'));
const PriceAlerts = createLazyComponent(() => import('../PriceAlerts'));
const AdvancedAnalytics = createLazyComponent(() => import('../AdvancedAnalytics'));
const Portfolio = createLazyComponent(() => import('../Portfolio'));
const Lottery = createLazyComponent(() => import('../Lottery'));
const ScamDetector = createLazyComponent(() => import('../ScamDetector'));
const FaucetScanner = createLazyComponent(() => import('../FaucetScanner'));
const YieldFarming = createLazyComponent(() => import('../YieldFarming'));
const CompoundingCalculator = createLazyComponent(() => import('../CompoundingCalculator'));
const AirdropHunter = createLazyComponent(() => import('../AirdropHunter'));
const CryptoTaxCalculator = createLazyComponent(() => import('../CryptoTaxCalculator'));
const SentimentAnalyzer = createLazyComponent(() => import('../SentimentAnalyzer'));
const NFTGallery = createLazyComponent(() => import('../NFTGallery'));
const LaunchpadTracker = createLazyComponent(() => import('../LaunchpadTracker'));
const CryptoCourses = createLazyComponent(() => import('../CryptoCourses'));
const CryptoConverter = createLazyComponent(() => import('../CryptoConverter'));
const DeFiExplorer = createLazyComponent(() => import('../DeFiExplorer'));
const GasTracker = createLazyComponent(() => import('../GasTracker'));
const CrossChainBridge = createLazyComponent(() => import('../CrossChainBridge'));
const OraclePriceFeeds = createLazyComponent(() => import('../OraclePriceFeeds'));
const BlockchainExplorer = createLazyComponent(() => import('../BlockchainExplorer'));
const SmartContractAuditor = createLazyComponent(() => import('../SmartContractAuditor'));
const TokenomicsAnalyzer = createLazyComponent(() => import('../TokenomicsAnalyzer'));
const EventCalendar = createLazyComponent(() => import('../EventCalendar'));
const ExchangeRates = createLazyComponent(() => import('../ExchangeRates'));
const SocialTrading = createLazyComponent(() => import('../SocialTrading'));
const NFTMarketplace = createLazyComponent(() => import('../NFTMarketplace'));
const DexAggregator = createLazyComponent(() => import('../DexAggregator'));
const LendingProtocol = createLazyComponent(() => import('../LendingProtocol'));
const LiquidityPoolAnalyzer = createLazyComponent(() => import('../LiquidityPoolAnalyzer'));
const FlashLoanCalculator = createLazyComponent(() => import('../FlashLoanCalculator'));
const GovernanceVoting = createLazyComponent(() => import('../GovernanceVoting'));
const DAODashboard = createLazyComponent(() => import('../DAODashboard'));
const TokenSale = createLazyComponent(() => import('../TokenSale'));
const WalletAudit = createLazyComponent(() => import('../WalletAudit'));
const MEVProtection = createLazyComponent(() => import('../MEVProtection'));
const Layer2Explorers = createLazyComponent(() => import('../Layer2Explorers'));
const CrossChainMessaging = createLazyComponent(() => import('../CrossChainMessaging'));
const Reports = createLazyComponent(() => import('../Reports'));
const Metrics = createLazyComponent(() => import('../Metrics'));
const PerformanceAnalyzer = createLazyComponent(() => import('../PerformanceAnalyzer'));
const RiskAnalyzer = createLazyComponent(() => import('../RiskAnalyzer'));
const TransactionSimulator = createLazyComponent(() => import('../TransactionSimulator'));
const ReplayTransaction = createLazyComponent(() => import('../ReplayTransaction'));
const ChainHealth = createLazyComponent(() => import('../ChainHealth'));
const FailureAnalyzer = createLazyComponent(() => import('../FailureAnalyzer'));
const GasProfiler = createLazyComponent(() => import('../GasProfiler'));

interface ContentAreaProps {
  activeTab: TabType;
  faucets: Faucet[];
  walletBalance: WalletBalance;
  history: ClaimHistory[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  withdrawalHistory: {
    id: number;
    coin: string;
    amount: string;
    address: string;
    status: string;
    date: string;
  }[];
  user: User;
  showWalletAddress: boolean;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  searchTerm?: string;
  t: TranslationTexts;
  onClaimFaucet: (faucet: Faucet) => void;
  onToggleWalletAddress: () => void;
  onToggleTheme: () => void;
  onCopyReferralCode: () => void;
  onLogout: () => void;
  onClearSearch?: () => void;
  referrals?: Array<{ id: string; username: string; createdAt: string; earnings?: string }>;
}

// Render lazy component inline - uses any type to bypass strict TypeScript checking for lazy imports
const renderLazy = (Component: any) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-purple-300">Loading...</span>
      </div>
    }
  >
    <Component />
  </Suspense>
);

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
  theme,
  searchTerm = '',
  t,
  onClaimFaucet,
  onToggleWalletAddress,
  onToggleTheme,
  onCopyReferralCode,
  onLogout,
  onClearSearch,
  referrals,
}: ContentAreaProps) {
  switch (activeTab) {
    case 'faucets':
      return (
        <FaucetsView
          faucets={faucets}
          onClaim={onClaimFaucet}
          language={language}
          t={t}
          searchTerm={searchTerm}
          onClearSearch={onClearSearch}
        />
      );
    case 'dashboard':
      return (
        <DashboardView history={history} achievements={achievements} t={t} language={language} />
      );
    case 'wallet':
      return (
        <WalletView
          walletBalance={walletBalance}
          withdrawalHistory={withdrawalHistory}
          showAddress={showWalletAddress}
          onToggleAddress={onToggleWalletAddress}
          t={t}
        />
      );
    case 'referral':
      return <ReferralView user={user} referrals={referrals} onCopy={onCopyReferralCode} t={t} />;
    case 'leaderboard':
      return <LeaderboardView leaderboard={leaderboard} t={t} />;
    case 'achievements':
      return <AchievementsView achievements={achievements} t={t} />;
    case 'settings':
      return (
        <SettingsView
          user={user}
          t={t}
          lang={language}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
        />
      );
    case 'testnet':
      return <TestnetView t={t} language={language} />;
    case 'analytics':
      return renderLazy(AdvancedAnalytics);
    case 'signals':
      return renderLazy(TradingSignals);
    case 'whale alerts':
      return renderLazy(WhaleAlerts);
    case 'price alerts':
      return renderLazy(PriceAlerts);
    case 'games':
      return renderLazy(MiniGames);
    case 'portfolio':
      return renderLazy(Portfolio);
    case 'lottery':
      return renderLazy(Lottery);
    case 'scam':
      return renderLazy(ScamDetector);
    case 'scanner':
      return renderLazy(FaucetScanner);
    case 'yield':
      return renderLazy(YieldFarming);
    case 'calculator':
      return renderLazy(CompoundingCalculator);
    case 'airdrop':
      return renderLazy(AirdropHunter);
    case 'tax':
      return renderLazy(CryptoTaxCalculator);
    case 'sentiment':
      return renderLazy(SentimentAnalyzer);
    case 'nft':
      return renderLazy(NFTGallery);
    case 'launchpad':
      return renderLazy(LaunchpadTracker);
    case 'courses':
      return renderLazy(CryptoCourses);
    case 'converter':
      return renderLazy(CryptoConverter);
    case 'defi':
      return renderLazy(DeFiExplorer);
    case 'gas':
      return renderLazy(GasTracker);
    case 'bridge':
      return renderLazy(CrossChainBridge);
    case 'oracle':
      return renderLazy(OraclePriceFeeds);
    case 'explorer':
      return renderLazy(BlockchainExplorer);
    case 'auditor':
      return renderLazy(SmartContractAuditor);
    case 'tokenomics':
      return renderLazy(TokenomicsAnalyzer);
    case 'calendar':
      return renderLazy(EventCalendar);
    case 'rates':
      return renderLazy(ExchangeRates);
    case 'social':
      return renderLazy(SocialTrading);
    case 'nft-marketplace':
      return renderLazy(NFTMarketplace);
    case 'dex':
      return renderLazy(DexAggregator);
    case 'lending':
      return renderLazy(LendingProtocol);
    case 'liquidity':
      return renderLazy(LiquidityPoolAnalyzer);
    case 'flash-loan':
      return renderLazy(FlashLoanCalculator);
    case 'governance':
      return renderLazy(GovernanceVoting);
    case 'dao':
      return renderLazy(DAODashboard);
    case 'token-sale':
      return renderLazy(TokenSale);
    case 'wallet-audit':
      return renderLazy(WalletAudit);
    case 'mev':
      return renderLazy(MEVProtection);
    case 'layer2':
      return renderLazy(Layer2Explorers);
    case 'xcm':
      return renderLazy(CrossChainMessaging);
    case 'reports':
      return renderLazy(Reports);
    case 'metrics':
      return renderLazy(Metrics);
    case 'perf-anal':
      return renderLazy(PerformanceAnalyzer);
    case 'risk-anal':
      return renderLazy(RiskAnalyzer);
    case 'tx-sim':
      return renderLazy(TransactionSimulator);
    case 'replay-tx':
      return renderLazy(ReplayTransaction);
    case 'chain-health':
      return renderLazy(ChainHealth);
    case 'fail-anal':
      return renderLazy(FailureAnalyzer);
    case 'gas-prof':
      return renderLazy(GasProfiler);
    case 'nft-faucet':
      return <NFTFaucetView language={language} t={t} />;
    default:
      return <FaucetsView faucets={faucets} onClaim={onClaimFaucet} language={language} t={t} />;
  }
}
