import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PieChart, Activity, Zap, ExternalLink, Filter } from 'lucide-react';

interface DeFiProtocol {
  name: string;
  category: string;
  chain: string;
  tvl: number;
  change24h: number;
  apy: number;
  users: number;
  icon: string;
  verified: boolean;
}

interface DeFiPool {
  name: string;
  protocol: string;
  pair: string;
  tvl: number;
  apy: number;
  chain: string;
  status: 'active' | 'risky' | 'paused';
}

const DEFI_PROTOCOLS: DeFiProtocol[] = [
  {
    name: 'Aave',
    category: 'Lending',
    chain: 'Ethereum',
    tvl: 12.4,
    change24h: 3.2,
    apy: 4.5,
    users: 250000,
    icon: 'AA',
    verified: true,
  },
  {
    name: 'Uniswap',
    category: 'DEX',
    chain: 'Ethereum',
    tvl: 18.7,
    change24h: -2.1,
    apy: 15.2,
    users: 420000,
    icon: 'UN',
    verified: true,
  },
  {
    name: 'Curve',
    category: 'DEX',
    chain: 'Ethereum',
    tvl: 8.9,
    change24h: 1.8,
    apy: 8.7,
    users: 120000,
    icon: 'CR',
    verified: true,
  },
  {
    name: 'Lido',
    category: 'Liquid Staking',
    chain: 'Ethereum',
    tvl: 32.1,
    change24h: 4.5,
    apy: 5.2,
    users: 380000,
    icon: 'LD',
    verified: true,
  },
  {
    name: 'Raydium',
    category: 'DEX',
    chain: 'Solana',
    tvl: 2.3,
    change24h: 8.9,
    apy: 45.6,
    users: 85000,
    icon: 'RD',
    verified: true,
  },
  {
    name: 'Jupiter',
    category: 'Dex Aggregator',
    chain: 'Solana',
    tvl: 4.7,
    change24h: 12.3,
    apy: 38.9,
    users: 145000,
    icon: 'JP',
    verified: true,
  },
  {
    name: 'PancakeSwap',
    category: 'DEX',
    chain: 'BNB Chain',
    tvl: 1.8,
    change24h: -1.5,
    apy: 28.4,
    users: 220000,
    icon: 'PS',
    verified: true,
  },
  {
    name: 'Convex',
    category: 'Yield Optimizer',
    chain: 'Ethereum',
    tvl: 3.2,
    change24h: 2.7,
    apy: 12.5,
    users: 45000,
    icon: 'CV',
    verified: true,
  },
];

const DEFI_POOLS: DeFiPool[] = [
  { name: 'USDC-ETH Pool', protocol: 'Uniswap', pair: 'USDC/ETH', tvl: 450, apy: 12.3, chain: 'Ethereum', status: 'active' },
  { name: 'wbtc-eth Pool', protocol: 'Curve', pair: 'WBTC/ETH', tvl: 890, apy: 8.7, chain: 'Ethereum', status: 'active' },
  { name: 'SOL-USDC Pool', protocol: 'Raydium', pair: 'SOL/USDC', tvl: 120, apy: 85.4, chain: 'Solana', status: 'active' },
  { name: ' Рыночный Pool', protocol: 'Jupiter', pair: 'SOL/USDT', tvl: 85, apy: 67.2, chain: 'Solana', status: 'active' },
  { name: 'CAKE-BNB Pool', protocol: 'PancakeSwap', pair: 'CAKE/BNB', tvl: 45, apy: 52.8, chain: 'BNB Chain', status: 'risky' },
  { name: 'stETH-ETH Pool', protocol: 'Curve', pair: 'stETH/ETH', tvl: 1250, apy: 6.4, chain: 'Ethereum', status: 'active' },
];

const CHAINS = ['All', 'Ethereum', 'Solana', 'BNB Chain', 'Arbitrum', 'Optimism', 'Avalanche'];
const CATEGORIES = ['All', 'Lending', 'DEX', 'Liquid Staking', 'Dex Aggregator', 'Yield Optimizer'];

export default function DeFiExplorer() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [selectedChain, setSelectedChain] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'tvl' | 'apy' | 'users'>('tvl');
  const [viewMode, setViewMode] = useState<'protocols' | 'pools'>('protocols');

  const texts = {
    es: {
      title: 'Explorador DeFi',
      subtitle: 'Explora el ecosistema DeFi en tiempo real',
      protocols: 'Protocolos',
      pools: 'Pools',
      chain: 'Red',
      category: 'Categoría',
      tvl: 'TVL',
      apy: 'APY',
      users: 'Usuarios',
      sortBy: 'Ordenar por',
      explore: 'Explorar',
      totalTvl: 'TVL Total',
      totalUsers: 'Usuarios Totales',
      avgApy: 'APY Promedio',
      activePools: 'Pools Activos',
      protocolsFound: 'Protocolos encontrados',
      poolsFound: 'Pools encontrados',
      status: 'Estado',
      active: 'Activo',
      risky: 'Riesgoso',
      paused: 'Pausado',
      connect: 'Conectar',
    },
    en: {
      title: 'DeFi Explorer',
      subtitle: 'Explore the DeFi ecosystem in real-time',
      protocols: 'Protocols',
      pools: 'Pools',
      chain: 'Chain',
      category: 'Category',
      tvl: 'TVL',
      apy: 'APY',
      users: 'Users',
      sortBy: 'Sort by',
      explore: 'Explore',
      totalTvl: 'Total TVL',
      totalUsers: 'Total Users',
      avgApy: 'Avg APY',
      activePools: 'Active Pools',
      protocolsFound: 'Protocols found',
      poolsFound: 'Pools found',
      status: 'Status',
      active: 'Active',
      risky: 'Risky',
      paused: 'Paused',
      connect: 'Connect',
    },
  };

  const t = texts[language];

  const filteredProtocols = DEFI_PROTOCOLS.filter(p => {
    if (selectedChain !== 'All' && p.chain !== selectedChain) return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'tvl') return b.tvl - a.tvl;
    if (sortBy === 'apy') return b.apy - a.apy;
    return b.users - a.users;
  });

  const filteredPools = DEFI_POOLS.filter(p => {
    if (selectedChain !== 'All' && p.chain !== selectedChain) return false;
    return true;
  });

  const totalTvl = filteredProtocols.reduce((sum, p) => sum + p.tvl, 0);
  const totalUsers = filteredProtocols.reduce((sum, p) => sum + p.users, 0);
  const avgApy = filteredProtocols.length > 0 ? filteredProtocols.reduce((sum, p) => sum + p.apy, 0) / filteredProtocols.length : 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.totalTvl}</p>
                <p className="text-2xl font-bold text-white">${totalTvl.toFixed(1)}B</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-5 border border-green-500/30">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.totalUsers}</p>
                <p className="text-2xl font-bold text-white">{(totalUsers / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-5 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.avgApy}</p>
                <p className="text-2xl font-bold text-white">{avgApy.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-2xl p-5 border border-pink-500/30">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-pink-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.activePools}</p>
                <p className="text-2xl font-bold text-white">{filteredPools.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('protocols')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'protocols' ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                {t.protocols}
              </button>
              <button
                onClick={() => setViewMode('pools')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'pools' ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                {t.pools}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
              >
                {CHAINS.map(chain => <option key={chain} value={chain}>{chain}</option>)}
              </select>

              {viewMode === 'protocols' && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              )}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
              >
                <option value="tvl">TVL</option>
                <option value="apy">APY</option>
                <option value="users">Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'protocols' ? (
          <div className="space-y-4">
            <p className="text-gray-400 mb-4">{t.protocolsFound}: {filteredProtocols.length}</p>
            {filteredProtocols.map((protocol, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {protocol.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{protocol.name}</h3>
                        {protocol.verified && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">✓</span>}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">{protocol.category}</span>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">{protocol.chain}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.tvl}</p>
                    <p className="text-lg font-bold text-white">${protocol.tvl.toFixed(1)}B</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.apy}</p>
                    <p className="text-lg font-bold text-green-400">{protocol.apy.toFixed(1)}%</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.users}</p>
                    <p className="text-lg font-bold text-white">{(protocol.users / 1000).toFixed(0)}K</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm" style={{fontSize:'0.75rem'}}>24h</p>
                    <div className={`flex items-center gap-1 ${protocol.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {protocol.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-bold">{Math.abs(protocol.change24h).toFixed(1)}%</span>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-105 transition flex items-center gap-2">
                    {t.explore}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 mb-4">{t.poolsFound}: {filteredPools.length}</p>
            {filteredPools.map((pool, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {pool.protocol.slice(0,2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400">{pool.protocol}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-300">{pool.pair}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">TVL</p>
                    <p className="text-lg font-bold text-white">${pool.tvl}M</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">APY</p>
                    <p className="text-lg font-bold text-green-400">{pool.apy.toFixed(1)}%</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Chain</p>
                    <p className="text-lg font-bold text-white">{pool.chain}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.status}</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pool.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      pool.status === 'risky' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {pool.status === 'active' ? t.active : pool.status === 'risky' ? t.risky : t.paused}
                    </span>
                  </div>

                  <button className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:scale-105 transition">
                    {t.connect}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}