import { useState } from 'react';
import {
  PieChart as PieChartIcon,
  BarChart2,
  TrendingUp,
  Users,
  Lock,
  Wallet,
  RefreshCw,
  Percent,
} from 'lucide-react';

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  volume24h: number;
}

interface Distribution {
  category: string;
  percentage: number;
  holders: string;
  vesting?: string;
}

const TOKEN_DATA: TokenData = {
  name: 'Bitcoin',
  symbol: 'BTC',
  price: 67500,
  marketCap: 1325000000000,
  circulatingSupply: 19640000,
  totalSupply: 19640000,
  maxSupply: 21000000,
  volume24h: 45200000000,
};

const DISTRIBUTION: Distribution[] = [
  { category: 'Team', percentage: 15, holders: '5 wallets', vesting: 'Linear over 4 years' },
  {
    category: 'Investors',
    percentage: 20,
    holders: '32 wallets',
    vesting: '1 year cliff, 3 year linear',
  },
  { category: 'Community', percentage: 35, holders: '125,000+ wallets' },
  { category: 'Ecosystem', percentage: 20, holders: '78 wallets' },
  { category: 'DAO', percentage: 10, holders: 'Treasury' },
];

const INFLATION_METRICS = {
  currentInflation: '1.5%',
  annualEmissions: '328,500 BTC',
  halvingDate: 'April 2028',
  blockReward: '3.125 BTC',
};

export default function TokenomicsAnalyzer() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [selectedToken, setSelectedToken] = useState('BTC');

  const texts = {
    es: {
      title: 'Analizador de Tokenomics',
      subtitle: 'Analiza la distribución y economías de tokens en detalle',
      overview: 'Resumen General',
      distribution: 'Distribución de Tokens',
      priceMetrics: 'Métricas de Precio',
      inflationMetrics: 'Métricas de Inflación',
      schedule: 'Calendario',
      price: 'Precio',
      marketCap: 'Capitalización',
      circulatingSupply: 'Suministro Circulante',
      totalSupply: 'Suministro Total',
      maxSupply: 'Suministro Máximo',
      volume24h: 'Volumen 24h',
      holders: 'Titulares',
      vesting: 'Vesting',
      currentInflation: 'Inflación Actual',
      annualEmissions: 'Emisiones Anuales',
      halvingDate: 'Fecha de Halving',
      blockReward: 'Recompensa de Bloque',
      circulatingPercent: '% Circulante',
      burned: 'Quemado',
      locked: 'Bloqueado',
      staked: 'Staked',
      Dao: 'DAO',
    },
    en: {
      title: 'Tokenomics Analyzer',
      subtitle: 'Analyze token distribution and economies in detail',
      overview: 'Overview',
      distribution: 'Token Distribution',
      priceMetrics: 'Price Metrics',
      inflationMetrics: 'Inflation Metrics',
      schedule: 'Schedule',
      price: 'Price',
      marketCap: 'Market Cap',
      circulatingSupply: 'Circulating Supply',
      totalSupply: 'Total Supply',
      maxSupply: 'Max Supply',
      volume24h: '24h Volume',
      holders: 'Holders',
      vesting: 'Vesting',
      currentInflation: 'Current Inflation',
      annualEmissions: 'Annual Emissions',
      halvingDate: 'Halving Date',
      blockReward: 'Block Reward',
      circulatingPercent: '% Circulating',
      burned: 'Burned',
      locked: 'Locked',
      staked: 'Staked',
      dao: 'DAO',
    },
  };

  const t = texts[language];
  const circulatingPercent = ((TOKEN_DATA.circulatingSupply / TOKEN_DATA.maxSupply) * 100).toFixed(
    2
  );

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl">
              <PieChartIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Token Selector */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                BTC
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{TOKEN_DATA.name}</h3>
                <p className="text-gray-400">{TOKEN_DATA.symbol}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">
                ${TOKEN_DATA.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Price Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Stats */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-400" />
                {t.overview}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t.marketCap}</p>
                  <p className="text-xl font-bold text-white">
                    ${formatNumber(TOKEN_DATA.marketCap)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t.circulatingSupply}</p>
                  <p className="text-xl font-bold text-white">
                    {formatNumber(TOKEN_DATA.circulatingSupply)} {TOKEN_DATA.symbol}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t.maxSupply}</p>
                  <p className="text-xl font-bold text-white">
                    {formatNumber(TOKEN_DATA.maxSupply)} {TOKEN_DATA.symbol}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t.volume24h}</p>
                  <p className="text-xl font-bold text-white">
                    ${formatNumber(TOKEN_DATA.volume24h)}
                  </p>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-pink-400" />
                {t.distribution}
              </h3>

              {/* Simple Bar Representation */}
              <div className="mb-6">
                {DISTRIBUTION.map((item, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{item.category}</span>
                      <span className="text-gray-400">{item.percentage}%</span>
                    </div>
                    <div className="h-6 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{item.holders}</span>
                      {item.vesting && <span>{item.vesting}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inflation Metrics */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Percent className="w-5 h-5 text-orange-400" />
                {t.inflationMetrics}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <RefreshCw className="w-8 h-8 text-orange-400" />
                  <div>
                    <p className="text-gray-400 text-sm">{t.currentInflation}</p>
                    <p className="text-xl font-bold text-white">
                      {INFLATION_METRICS.currentInflation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <Wallet className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">{t.annualEmissions}</p>
                    <p className="text-xl font-bold text-white">
                      {INFLATION_METRICS.annualEmissions}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">{t.halvingDate}</p>
                    <p className="text-xl font-bold text-white">{INFLATION_METRICS.halvingDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <Lock className="w-8 h-8 text-pink-400" />
                  <div>
                    <p className="text-gray-400 text-sm">{t.blockReward}</p>
                    <p className="text-xl font-bold text-white">{INFLATION_METRICS.blockReward}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Token Supply */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Supply Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t.circulatingPercent}</span>
                  <span className="text-white font-bold">{circulatingPercent}%</span>
                </div>
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${circulatingPercent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t.locked}</span>
                  <span className="text-orange-400 font-bold">5.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t.staked}</span>
                  <span className="text-blue-400 font-bold">8.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t.burned}</span>
                  <span className="text-red-400 font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Holder Stats */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Holder Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-gray-400">Total Holders</span>
                  <span className="text-white font-bold">125,847</span>
                </div>
                <div className="flex justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-gray-400">Whales (1%+)</span>
                  <span className="text-orange-400 font-bold">1,245</span>
                </div>
                <div className="flex justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-gray-400">Institutional</span>
                  <span className="text-blue-400 font-bold">89</span>
                </div>
                <div className="flex justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-gray-400">Exchange Reserves</span>
                  <span className="text-yellow-400 font-bold">2.3M</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-4">Token Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-gray-300">Trading Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-gray-300">Staking Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-gray-300">Governance Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Halving Countdown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
