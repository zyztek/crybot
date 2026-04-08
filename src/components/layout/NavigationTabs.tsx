import {
  Coins,
  TrendingUp,
  Wallet,
  Users,
  Trophy,
  Award,
  Settings,
  BarChart3,
  Activity,
  Gamepad2,
  Shield,
  Gift,
  Crown,
  Rocket,
  Zap,
  Building2,
  Send,
  Star,
  Network,
  Gem,
  Calculator,
  Target,
  LineChart,
  GitBranch,
  FlaskConical,
  Clock,
  Calendar,
  Radio,
  AlertTriangle,
  Search,
  FileText,
  Percent,
  Scale,
  Waves,
  Hash,
  Gauge,
  TrendingDown,
  Lock,
  BookOpen,
  History,
  Beaker,
} from 'lucide-react';
import NavTab from '../ui/NavTab';
import type { TabType, Faucet, Achievement } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  faucets: Faucet[];
  achievements: Achievement[];
  language: 'es' | 'en';
  t: TranslationTexts;
}

export default function NavigationTabs({
  activeTab,
  onTabChange,
  faucets,
  achievements,
  language,
  t,
}: NavigationTabsProps) {
  return (
    <div
      className="flex gap-2 mb-6 overflow-x-auto pb-2"
      role="tablist"
      aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}
    >
      <NavTab
        active={activeTab === 'faucets'}
        onClick={() => onTabChange('faucets')}
        icon={<Coins className="w-4 h-4" />}
      >
        {t.faucets}{' '}
        <span className="ml-1 px-2 py-0.5 bg-purple-500/20 rounded-full text-xs">
          {faucets.filter(f => f.status === 'available').length}
        </span>
      </NavTab>
      <NavTab
        active={activeTab === 'dashboard'}
        onClick={() => onTabChange('dashboard')}
        icon={<BarChart3 className="w-4 h-4" />}
      >
        {t.dashboard}
      </NavTab>
      <NavTab
        active={activeTab === 'wallet'}
        onClick={() => onTabChange('wallet')}
        icon={<Wallet className="w-4 h-4" />}
      >
        {t.wallet}
      </NavTab>
      <NavTab
        active={activeTab === 'referral'}
        onClick={() => onTabChange('referral')}
        icon={<Users className="w-4 h-4" />}
      >
        {t.referral}
      </NavTab>
      <NavTab
        active={activeTab === 'leaderboard'}
        onClick={() => onTabChange('leaderboard')}
        icon={<Trophy className="w-4 h-4" />}
      >
        {t.leaderboard}
      </NavTab>
      <NavTab
        active={activeTab === 'achievements'}
        onClick={() => onTabChange('achievements')}
        icon={<Award className="w-4 h-4" />}
      >
        {t.achievements}{' '}
        <span className="ml-1 px-2 py-0.5 bg-green-500/20 rounded-full text-xs">
          {achievements.filter(a => a.unlocked).length}
        </span>
      </NavTab>
      <NavTab
        active={activeTab === 'settings'}
        onClick={() => onTabChange('settings')}
        icon={<Settings className="w-4 h-4" />}
      >
        {t.settings}
      </NavTab>
      <NavTab
        active={activeTab === 'analytics'}
        onClick={() => onTabChange('analytics')}
        icon={<BarChart3 className="w-4 h-4" />}
      >
        Analytics
      </NavTab>
      <NavTab
        active={activeTab === 'signals'}
        onClick={() => onTabChange('signals')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Signals
      </NavTab>
      <NavTab
        active={activeTab === 'whale alerts'}
        onClick={() => onTabChange('whale alerts')}
        icon={<Activity className="w-4 h-4" />}
      >
        Whale Alerts
      </NavTab>
      <NavTab
        active={activeTab === 'price alerts'}
        onClick={() => onTabChange('price alerts')}
        icon={<Activity className="w-4 h-4" />}
      >
        Price Alerts
      </NavTab>
      <NavTab
        active={activeTab === 'staking'}
        onClick={() => onTabChange('staking')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Staking
      </NavTab>
      <NavTab
        active={activeTab === 'defi-dashboard'}
        onClick={() => onTabChange('defi-dashboard')}
        icon={<BarChart3 className="w-4 h-4" />}
      >
        DeFi
      </NavTab>
      <NavTab
        active={activeTab === 'news'}
        onClick={() => onTabChange('news')}
        icon={<Activity className="w-4 h-4" />}
      >
        News
      </NavTab>
      <NavTab
        active={activeTab === 'games'}
        onClick={() => onTabChange('games')}
        icon={<Gamepad2 className="w-4 h-4" />}
      >
        {language === 'es' ? 'Juegos' : 'Games'}
      </NavTab>
      <NavTab
        active={activeTab === 'portfolio'}
        onClick={() => onTabChange('portfolio')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Portfolio
      </NavTab>
      <NavTab
        active={activeTab === 'lottery'}
        onClick={() => onTabChange('lottery')}
        icon={<Trophy className="w-4 h-4" />}
      >
        Lottery
      </NavTab>
      <NavTab
        active={activeTab === 'scam'}
        onClick={() => onTabChange('scam')}
        icon={<Shield className="w-4 h-4" />}
      >
        Scam Check
      </NavTab>
      <NavTab
        active={activeTab === 'scanner'}
        onClick={() => onTabChange('scanner')}
        icon={<Activity className="w-4 h-4" />}
      >
        Scanner
      </NavTab>
      <NavTab
        active={activeTab === 'yield'}
        onClick={() => onTabChange('yield')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Yield
      </NavTab>
      <NavTab
        active={activeTab === 'calculator'}
        onClick={() => onTabChange('calculator')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Calculator
      </NavTab>
      <NavTab
        active={activeTab === 'airdrop'}
        onClick={() => onTabChange('airdrop')}
        icon={<Gift className="w-4 h-4" />}
      >
        Airdrops
      </NavTab>
      <NavTab
        active={activeTab === 'tax'}
        onClick={() => onTabChange('tax')}
        icon={<Activity className="w-4 h-4" />}
      >
        Tax Calculator
      </NavTab>
      <NavTab
        active={activeTab === 'sentiment'}
        onClick={() => onTabChange('sentiment')}
        icon={<BarChart3 className="w-4 h-4" />}
      >
        Sentiment
      </NavTab>
      <NavTab
        active={activeTab === 'nft'}
        onClick={() => onTabChange('nft')}
        icon={<Trophy className="w-4 h-4" />}
      >
        NFT Gallery
      </NavTab>
      <NavTab
        active={activeTab === 'launchpad'}
        onClick={() => onTabChange('launchpad')}
        icon={<Rocket className="w-4 h-4" />}
      >
        Launchpad
      </NavTab>
      <NavTab
        active={activeTab === 'courses'}
        onClick={() => onTabChange('courses')}
        icon={<Crown className="w-4 h-4" />}
      >
        Academy
      </NavTab>
      <NavTab
        active={activeTab === 'dex'}
        onClick={() => onTabChange('dex')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        DEX
      </NavTab>
      <NavTab
        active={activeTab === 'lending'}
        onClick={() => onTabChange('lending')}
        icon={<Wallet className="w-4 h-4" />}
      >
        Lending
      </NavTab>
      <NavTab
        active={activeTab === 'liquidity'}
        onClick={() => onTabChange('liquidity')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Liquidity
      </NavTab>
      <NavTab
        active={activeTab === 'flash-loan'}
        onClick={() => onTabChange('flash-loan')}
        icon={<Zap className="w-4 h-4" />}
      >
        Flash Loan
      </NavTab>
      <NavTab
        active={activeTab === 'governance'}
        onClick={() => onTabChange('governance')}
        icon={<Activity className="w-4 h-4" />}
      >
        Governance
      </NavTab>
      <NavTab
        active={activeTab === 'dao'}
        onClick={() => onTabChange('dao')}
        icon={<Building2 className="w-4 h-4" />}
      >
        DAO
      </NavTab>
      <NavTab
        active={activeTab === 'token-sale'}
        onClick={() => onTabChange('token-sale')}
        icon={<Star className="w-4 h-4" />}
      >
        Token Sale
      </NavTab>
      <NavTab
        active={activeTab === 'wallet-audit'}
        onClick={() => onTabChange('wallet-audit')}
        icon={<Shield className="w-4 h-4" />}
      >
        Wallet Audit
      </NavTab>
      <NavTab
        active={activeTab === 'mev'}
        onClick={() => onTabChange('mev')}
        icon={<Shield className="w-4 h-4" />}
      >
        MEV Protection
      </NavTab>
      <NavTab
        active={activeTab === 'layer2'}
        onClick={() => onTabChange('layer2')}
        icon={<Activity className="w-4 h-4" />}
      >
        Layer 2
      </NavTab>
      <NavTab
        active={activeTab === 'xcm'}
        onClick={() => onTabChange('xcm')}
        icon={<Send className="w-4 h-4" />}
      >
        XCM
      </NavTab>
      <NavTab
        active={activeTab === 'testnet'}
        onClick={() => onTabChange('testnet')}
        icon={<Network className="w-4 h-4" />}
      >
        Testnets
      </NavTab>
      <NavTab
        active={activeTab === 'nft-faucet'}
        onClick={() => onTabChange('nft-faucet')}
        icon={<Gem className="w-4 h-4" />}
      >
        NFT Faucets
      </NavTab>

      {/* ============ Phase 1: Trading & Finance ============ */}
      <NavTab
        active={activeTab === 'pl-calc'}
        onClick={() => onTabChange('pl-calc')}
        icon={<Calculator className="w-4 h-4" />}
      >
        Margin Calc
      </NavTab>
      <NavTab
        active={activeTab === 'risk-reward'}
        onClick={() => onTabChange('risk-reward')}
        icon={<Target className="w-4 h-4" />}
      >
        Risk/Reward
      </NavTab>
      <NavTab
        active={activeTab === 'position-size'}
        onClick={() => onTabChange('position-size')}
        icon={<Scale className="w-4 h-4" />}
      >
        Position Size
      </NavTab>
      <NavTab
        active={activeTab === 'liquidation'}
        onClick={() => onTabChange('liquidation')}
        icon={<AlertTriangle className="w-4 h-4" />}
      >
        Liquidation
      </NavTab>
      <NavTab
        active={activeTab === 'options-greeks'}
        onClick={() => onTabChange('options-greeks')}
        icon={<LineChart className="w-4 h-4" />}
      >
        Options
      </NavTab>
      <NavTab
        active={activeTab === 'derivatives'}
        onClick={() => onTabChange('derivatives')}
        icon={<TrendingDown className="w-4 h-4" />}
      >
        Futures
      </NavTab>
      <NavTab
        active={activeTab === 'grid-bot'}
        onClick={() => onTabChange('grid-bot')}
        icon={<GitBranch className="w-4 h-4" />}
      >
        Grid Bot
      </NavTab>
      <NavTab
        active={activeTab === 'trading-journal'}
        onClick={() => onTabChange('trading-journal')}
        icon={<BookOpen className="w-4 h-4" />}
      >
        Trading Journal
      </NavTab>

      {/* ============ Phase 2: DeFi & Yield ============ */}
      <NavTab
        active={activeTab === 'yield-opt'}
        onClick={() => onTabChange('yield-opt')}
        icon={<FlaskConical className="w-4 h-4" />}
      >
        Yield Opt
      </NavTab>
      <NavTab
        active={activeTab === 'lend-opt'}
        onClick={() => onTabChange('lend-opt')}
        icon={<Coins className="w-4 h-4" />}
      >
        Lend Pool
      </NavTab>
      <NavTab
        active={activeTab === 'lp-roi'}
        onClick={() => onTabChange('lp-roi')}
        icon={<Waves className="w-4 h-4" />}
      >
        LP ROI
      </NavTab>
      <NavTab
        active={activeTab === 'flash-profit'}
        onClick={() => onTabChange('flash-profit')}
        icon={<Zap className="w-4 h-4" />}
      >
        Flash Loan
      </NavTab>
      <NavTab
        active={activeTab === 'staking-proj'}
        onClick={() => onTabChange('staking-proj')}
        icon={<Lock className="w-4 h-4" />}
      >
        Staking
      </NavTab>
      <NavTab
        active={activeTab === 'gov-track'}
        onClick={() => onTabChange('gov-track')}
        icon={<Building2 className="w-4 h-4" />}
      >
        Governance
      </NavTab>
      <NavTab
        active={activeTab === 'token-vest'}
        onClick={() => onTabChange('token-vest')}
        icon={<Clock className="w-4 h-4" />}
      >
        Vesting
      </NavTab>

      {/* ============ Phase 3: Analytics & Monitoring ============ */}
      <NavTab
        active={activeTab === 'whale-hist'}
        onClick={() => onTabChange('whale-hist')}
        icon={<Activity className="w-4 h-4" />}
      >
        Whales
      </NavTab>
      <NavTab
        active={activeTab === 'exchange-res'}
        onClick={() => onTabChange('exchange-res')}
        icon={<TrendingUp className="w-4 h-4" />}
      >
        Exchange Res
      </NavTab>
      <NavTab
        active={activeTab === 'liq-heat'}
        onClick={() => onTabChange('liq-heat')}
        icon={<Gauge className="w-4 h-4" />}
      >
        Liq Heat
      </NavTab>
      <NavTab
        active={activeTab === 'net-util'}
        onClick={() => onTabChange('net-util')}
        icon={<Hash className="w-4 h-4" />}
      >
        Network
      </NavTab>
      <NavTab
        active={activeTab === 'nft-anal'}
        onClick={() => onTabChange('nft-anal')}
        icon={<Gem className="w-4 h-4" />}
      >
        NFT Analytics
      </NavTab>

      {/* ============ Phase 4: Security & Tools ============ */}
      <NavTab
        active={activeTab === 'pk-check'}
        onClick={() => onTabChange('pk-check')}
        icon={<Shield className="w-4 h-4" />}
      >
        Wallet Audit
      </NavTab>
      <NavTab
        active={activeTab === 'wallet-age'}
        onClick={() => onTabChange('wallet-age')}
        icon={<History className="w-4 h-4" />}
      >
        Wallet Age
      </NavTab>
      <NavTab
        active={activeTab === 'token-sniff'}
        onClick={() => onTabChange('token-sniff')}
        icon={<Search className="w-4 h-4" />}
      >
        Token Audit
      </NavTab>
      <NavTab
        active={activeTab === 'rug-pull'}
        onClick={() => onTabChange('rug-pull')}
        icon={<AlertTriangle className="w-4 h-4" />}
      >
        Rug Check
      </NavTab>
      <NavTab
        active={activeTab === 'phishing'}
        onClick={() => onTabChange('phishing')}
        icon={<Shield className="w-4 h-4" />}
      >
        Phishing
      </NavTab>
      <NavTab
        active={activeTab === 'sandwich'}
        onClick={() => onTabChange('sandwich')}
        icon={<Shield className="w-4 h-4" />}
      >
        MEV Protect
      </NavTab>

      {/* ============ Phase 5: Social & Gaming ============ */}
      <NavTab
        active={activeTab === 'trading-comp'}
        onClick={() => onTabChange('trading-comp')}
        icon={<Trophy className="w-4 h-4" />}
      >
        Competitions
      </NavTab>
      <NavTab
        active={activeTab === 'news-agg'}
        onClick={() => onTabChange('news-agg')}
        icon={<Radio className="w-4 h-4" />}
      >
        News
      </NavTab>
      <NavTab
        active={activeTab === 'events-track'}
        onClick={() => onTabChange('events-track')}
        icon={<Calendar className="w-4 h-4" />}
      >
        Events
      </NavTab>
      <NavTab
        active={activeTab === 'tax-loss'}
        onClick={() => onTabChange('tax-loss')}
        icon={<Percent className="w-4 h-4" />}
      >
        Tax Loss
      </NavTab>

      {/* ============ Additional Tools ============ */}
      <NavTab
        active={activeTab === 'dca-strat'}
        onClick={() => onTabChange('dca-strat')}
        icon={<FlaskConical className="w-4 h-4" />}
      >
        DCA
      </NavTab>
      <NavTab
        active={activeTab === 'on-chain'}
        onClick={() => onTabChange('on-chain')}
        icon={<LineChart className="w-4 h-4" />}
      >
        On-Chain
      </NavTab>
      <NavTab
        active={activeTab === 'token-dist'}
        onClick={() => onTabChange('token-dist')}
        icon={<GitBranch className="w-4 h-4" />}
      >
        Holders
      </NavTab>
      <NavTab
        active={activeTab === 'arbitrage'}
        onClick={() => onTabChange('arbitrage')}
        icon={<Search className="w-4 h-4" />}
      >
        Arbitrage
      </NavTab>
    </div>
  );
}
