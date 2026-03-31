import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Activity,
  Percent,
  ChevronDown,
  Plus,
  Globe,
  Layers,
  Link2,
  Bitcoin,
  Coins,
  Flame,
  Box,
} from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import CryptoChart from './CryptoChart';

interface Asset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change24h: number;
  change7d: number;
  allocation: number;
  chain: string;
  chainIcon: React.ReactNode;
  chainColor: string;
}

const Portfolio: React.FC = () => {
  const { language } = useCryptoStore();
  const [timeframe, setTimeframe] = useState('1D');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const [activeChain, setActiveChain] = useState<string | null>(null);
  const [showChainBreakdown, setShowChainBreakdown] = useState(true);

  // Chain icons as components
  const ChainIcons = {
    Bitcoin: <Bitcoin className="w-5 h-5 text-orange-400" />,
    Ethereum: <Box className="w-5 h-5 text-indigo-400" />,
    Solana: <Flame className="w-5 h-5 text-purple-400" />,
    BNB: <Coins className="w-5 h-5 text-yellow-400" />,
    Litecoin: <Coins className="w-5 h-5 text-slate-400" />,
    XRP: <Coins className="w-5 h-5 text-blue-400" />,
    Cardano: <Coins className="w-5 h-5 text-blue-300" />,
    Avalanche: <Flame className="w-5 h-5 text-red-400" />,
    Polkadot: <Coins className="w-5 h-5 text-pink-400" />,
    Polygon: <Coins className="w-5 h-5 text-purple-400" />,
    Chainlink: <Coins className="w-5 h-5 text-blue-500" />,
    Cosmos: <Box className="w-5 h-5 text-teal-400" />,
    Uniswap: <Coins className="w-5 h-5 text-pink-300" />,
    Pepe: <Coins className="w-5 h-5 text-green-400" />,
    ShibaInu: <Coins className="w-5 h-5 text-amber-400" />,
    Toncoin: <Coins className="w-5 h-5 text-blue-400" />,
    Arbitrum: <Box className="w-5 h-5 text-blue-300" />,
  };

  const assets: Asset[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.125,
      value: 5423.5,
      change24h: 2.5,
      change7d: 8.3,
      allocation: 42,
      chain: 'Bitcoin',
      chainIcon: ChainIcons.Bitcoin,
      chainColor: 'from-orange-500 to-yellow-500',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 2.5,
      value: 3987.75,
      change24h: 3.2,
      change7d: 12.1,
      allocation: 31,
      chain: 'Ethereum',
      chainIcon: ChainIcons.Ethereum,
      chainColor: 'from-indigo-500 to-purple-500',
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      amount: 15420,
      value: 865.32,
      change24h: -1.8,
      change7d: 5.4,
      allocation: 6,
      chain: 'Bitcoin',
      chainIcon: ChainIcons.Bitcoin,
      chainColor: 'from-orange-500 to-yellow-500',
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 18.75,
      value: 1875.0,
      change24h: 4.8,
      change7d: 15.2,
      allocation: 14,
      chain: 'Solana',
      chainIcon: ChainIcons.Solana,
      chainColor: 'from-purple-500 to-pink-500',
    },
    {
      symbol: 'LTC',
      name: 'Litecoin',
      amount: 4.2,
      value: 319.8,
      change24h: 1.2,
      change7d: 3.8,
      allocation: 2,
      chain: 'Litecoin',
      chainIcon: ChainIcons.Litecoin,
      chainColor: 'from-slate-500 to-slate-600',
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      amount: 1.8,
      value: 540.0,
      change24h: 0.9,
      change7d: 2.1,
      allocation: 5,
      chain: 'BNB',
      chainIcon: ChainIcons.BNB,
      chainColor: 'from-yellow-500 to-amber-600',
    },
    {
      symbol: 'XRP',
      name: 'Ripple',
      amount: 125.5,
      value: 112.95,
      change24h: 1.5,
      change7d: 4.2,
      allocation: 2,
      chain: 'XRP',
      chainIcon: ChainIcons.XRP,
      chainColor: 'from-blue-500 to-indigo-600',
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 85.2,
      value: 76.68,
      change24h: -0.8,
      change7d: 2.1,
      allocation: 1,
      chain: 'Cardano',
      chainIcon: ChainIcons.Cardano,
      chainColor: 'from-blue-400 to-blue-600',
    },
    {
      symbol: 'AVAX',
      name: 'Avalanche',
      amount: 5.75,
      value: 172.5,
      change24h: 3.5,
      change7d: 8.7,
      allocation: 2,
      chain: 'Avalanche',
      chainIcon: ChainIcons.Avalanche,
      chainColor: 'from-red-500 to-orange-600',
    },
    {
      symbol: 'DOT',
      name: 'Polkadot',
      amount: 15.5,
      value: 93.0,
      change24h: 2.1,
      change7d: 5.8,
      allocation: 1,
      chain: 'Polkadot',
      chainIcon: ChainIcons.Polkadot,
      chainColor: 'from-pink-500 to-rose-600',
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      amount: 50.25,
      value: 45.22,
      change24h: -0.5,
      change7d: 3.2,
      allocation: 1,
      chain: 'Polygon',
      chainIcon: ChainIcons.Polygon,
      chainColor: 'from-purple-500 to-violet-600',
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      amount: 8.75,
      value: 87.5,
      change24h: 1.8,
      change7d: 6.5,
      allocation: 1,
      chain: 'Chainlink',
      chainIcon: ChainIcons.Chainlink,
      chainColor: 'from-blue-500 to-cyan-600',
    },
    {
      symbol: 'ATOM',
      name: 'Cosmos',
      amount: 12.3,
      value: 110.7,
      change24h: 2.8,
      change7d: 7.2,
      allocation: 1,
      chain: 'Cosmos',
      chainIcon: ChainIcons.Cosmos,
      chainColor: 'from-teal-500 to-cyan-600',
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      amount: 5.2,
      value: 52.0,
      change24h: -1.2,
      change7d: 4.1,
      allocation: 1,
      chain: 'Uniswap',
      chainIcon: ChainIcons.Uniswap,
      chainColor: 'from-pink-400 to-rose-500',
    },
    {
      symbol: 'PEPE',
      name: 'Pepe',
      amount: 5000000,
      value: 5.0,
      change24h: 5.2,
      change7d: 12.5,
      allocation: 1,
      chain: 'Pepe',
      chainIcon: ChainIcons.Pepe,
      chainColor: 'from-green-400 to-emerald-600',
    },
    {
      symbol: 'SHIB',
      name: 'Shiba Inu',
      amount: 10000000,
      value: 8.5,
      change24h: 2.8,
      change7d: 8.3,
      allocation: 1,
      chain: 'ShibaInu',
      chainIcon: ChainIcons.ShibaInu,
      chainColor: 'from-amber-400 to-orange-500',
    },
    {
      symbol: 'TON',
      name: 'Toncoin',
      amount: 12.5,
      value: 62.5,
      change24h: 1.5,
      change7d: 6.2,
      allocation: 1,
      chain: 'Toncoin',
      chainIcon: ChainIcons.Toncoin,
      chainColor: 'from-blue-400 to-cyan-600',
    },
    {
      symbol: 'ARB',
      name: 'Arbitrum',
      amount: 25.0,
      value: 50.0,
      change24h: 3.1,
      change7d: 9.5,
      allocation: 1,
      chain: 'Arbitrum',
      chainIcon: ChainIcons.Arbitrum,
      chainColor: 'from-blue-300 to-indigo-500',
    },
  ];

  // Group assets by chain
  const assetsByChain = useMemo(() => {
    const grouped: Record<string, Asset[]> = {};
    assets.forEach(asset => {
      if (!grouped[asset.chain]) {
        grouped[asset.chain] = [];
      }
      grouped[asset.chain].push(asset);
    });
    return grouped;
  }, [assets]);

  // Calculate chain totals
  const chainTotals = useMemo(() => {
    return Object.entries(assetsByChain)
      .map(([chain, chainAssets]) => {
        const totalValue = chainAssets.reduce((sum, a) => sum + a.value, 0);
        const totalChange24h = chainAssets.reduce(
          (sum, a) => sum + (a.value * a.change24h) / 100,
          0
        );
        const avgChange24h = totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0;
        return {
          chain,
          totalValue,
          totalChange24h,
          avgChange24h,
          assetCount: chainAssets.length,
          assets: chainAssets,
          icon: chainAssets[0].chainIcon,
          color: chainAssets[0].chainColor,
        };
      })
      .sort((a, b) => b.totalValue - a.totalValue);
  }, [assetsByChain]);

  // Filter assets by active chain
  const filteredAssets = useMemo(() => {
    if (!activeChain) return assets;
    return assets.filter(a => a.chain === activeChain);
  }, [activeChain, assets]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = assets.reduce(
    (sum, asset) => sum + (asset.value * asset.change24h) / 100,
    0
  );
  const totalChange7d = assets.reduce(
    (sum, asset) => sum + (asset.value * asset.change7d) / 100,
    0
  );

  const text = {
    es: {
      title: 'Portafolio Cross-Chain',
      totalValue: 'Valor Total',
      change24h: 'Cambio 24h',
      change7d: 'Cambio 7d',
      allocation: 'Asignación',
      holdings: 'Holdings',
      add: 'Añadir',
      refresh: 'Actualizar',
      details: 'Ver Detalles',
      hide: 'Ocultar',
      timeframe: 'Periodo',
      balance: 'Balance',
      profit: 'Beneficio',
      performance: 'Rendimiento',
      chart: 'Gráfico',
      chains: 'Cadenas',
      allChains: 'Todas las Cadenas',
      chainBreakdown: 'Desglose por Cadena',
      totalByChain: 'Total por Cadena',
      bridge: 'Bridge',
      crossChain: 'Cross-Chain',
      viewChain: 'Ver Cadena',
    },
    en: {
      title: 'Cross-Chain Portfolio',
      totalValue: 'Total Value',
      change24h: '24h Change',
      change7d: '7d Change',
      allocation: 'Allocation',
      holdings: 'Holdings',
      add: 'Add',
      refresh: 'Refresh',
      details: 'View Details',
      hide: 'Hide',
      timeframe: 'Period',
      balance: 'Balance',
      profit: 'Profit',
      performance: 'Performance',
      chart: 'Chart',
      chains: 'Chains',
      allChains: 'All Chains',
      chainBreakdown: 'Chain Breakdown',
      totalByChain: 'Total per Chain',
      bridge: 'Bridge',
      crossChain: 'Cross-Chain',
      viewChain: 'View Chain',
    },
  };

  const t = text[language as keyof typeof text];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="w-8 h-8 text-yellow-400" />
            {t.title}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setTimeframe('1D')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1D'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1D
            </button>
            <button
              onClick={() => setTimeframe('1W')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1W'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1W
            </button>
            <button
              onClick={() => setTimeframe('1M')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1M'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1M
            </button>
            <button
              onClick={() => setTimeframe('1Y')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1Y'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1Y
            </button>
            <button
              onClick={() => setShowChainBreakdown(!showChainBreakdown)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showChainBreakdown
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t.chains}
            </button>
          </div>
        </div>

        {/* Chain Breakdown Cards */}
        {showChainBreakdown && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {/* All Chains Card */}
            <button
              onClick={() => setActiveChain(null)}
              className={`bg-gradient-to-br from-purple-900/50 to-slate-900 border rounded-xl p-4 text-left transition-all hover:border-purple-500/50 ${!activeChain ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-slate-700'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">{t.allChains}</span>
                </div>
                {!activeChain && <span className="text-purple-400 text-xs">✓</span>}
              </div>
              <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">{assets.length} assets</p>
            </button>

            {/* Chain-specific cards */}
            {chainTotals.map(chainData => (
              <button
                key={chainData.chain}
                onClick={() =>
                  setActiveChain(activeChain === chainData.chain ? null : chainData.chain)
                }
                className={`bg-gradient-to-br ${chainData.color} border rounded-xl p-4 text-left transition-all hover:opacity-90 ${activeChain === chainData.chain ? 'border-white ring-2 ring-white/30' : 'border-transparent'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white">
                    {chainData.icon}
                    <span className="font-semibold">{chainData.chain}</span>
                  </div>
                  {activeChain === chainData.chain && <span className="text-white text-xs">✓</span>}
                </div>
                <p className="text-2xl font-bold text-white">
                  ${chainData.totalValue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {chainData.avgChange24h >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 text-green-300" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-300" />
                  )}
                  <span
                    className={
                      chainData.avgChange24h >= 0
                        ? 'text-green-300 text-sm'
                        : 'text-red-300 text-sm'
                    }
                  >
                    {chainData.avgChange24h >= 0 ? '+' : ''}
                    {chainData.avgChange24h.toFixed(2)}%
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  {chainData.assetCount} {t.holdings}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.totalValue}</p>
                <p className="text-3xl font-bold text-white mt-1">${totalValue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  {totalChange24h >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span className={totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {totalChange24h >= 0 ? '+' : ''}${Math.abs(totalChange24h).toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    ({totalChange24h >= 0 ? '+' : ''}
                    {totalChange24h.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.performance} 7D</p>
                <p
                  className={`text-3xl font-bold mt-1 ${totalChange7d >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {totalChange7d >= 0 ? '+' : ''}
                  {totalChange7d.toFixed(2)}%
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {totalChange7d >= 0 ? '+' : ''}${Math.abs(totalChange7d).toFixed(2)}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.balance}</p>
                <p className="text-3xl font-bold text-white mt-1">{assets.length}</p>
                <p className="text-slate-400 text-sm mt-2">{t.holdings}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                <Wallet className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.profit} Total</p>
                <p className="text-3xl font-bold text-green-400 mt-1">+$1,234.56</p>
                <p className="text-slate-400 text-sm mt-2">+12.34%收益率</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <Percent className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">{t.holdings}</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-sm">
                      <th className="text-left pb-4">Activo</th>
                      <th className="text-right pb-4">{t.balance}</th>
                      <th className="text-right pb-4">Valor</th>
                      <th className="text-right pb-4">{t.change24h}</th>
                      <th className="text-right pb-4">{t.allocation}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map(asset => (
                      <React.Fragment key={asset.symbol}>
                        <tr className="border-t border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full bg-gradient-to-br ${asset.chainColor} flex items-center justify-center text-white font-bold`}
                              >
                                {asset.symbol[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{asset.symbol}</p>
                                <p className="text-sm text-slate-400">{asset.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <p className="text-white font-medium">{asset.amount.toFixed(4)}</p>
                          </td>
                          <td className="text-right py-4">
                            <p className="text-white font-medium">
                              ${asset.value.toLocaleString()}
                            </p>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex items-center justify-end gap-1">
                              {asset.change24h >= 0 ? (
                                <ArrowUpRight className="w-4 h-4 text-green-400" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-400" />
                              )}
                              <span
                                className={asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}
                              >
                                {asset.change24h >= 0 ? '+' : ''}
                                {asset.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex items-center justify-end">
                              <div className="w-24 bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${asset.allocation}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-white text-sm">{asset.allocation}%</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() =>
                                setShowDetails(showDetails === asset.symbol ? null : asset.symbol)
                              }
                              className="p-2 hover:bg-slate-700 rounded-lg transition-all"
                            >
                              <ChevronDown
                                className={`w-5 h-5 text-slate-400 transition-transform ${showDetails === asset.symbol ? 'rotate-180' : ''}`}
                              />
                            </button>
                          </td>
                        </tr>
                        {showDetails === asset.symbol && (
                          <tr className="bg-slate-800/50">
                            <td colSpan={6} className="p-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">7D Change</p>
                                  <p
                                    className={`text-lg font-semibold ${asset.change7d >= 0 ? 'text-green-400' : 'text-red-400'}`}
                                  >
                                    {asset.change7d >= 0 ? '+' : ''}
                                    {asset.change7d.toFixed(2)}%
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">Avg Buy Price</p>
                                  <p className="text-lg font-semibold text-white">
                                    ${((asset.value / asset.amount) * 0.95).toFixed(2)}
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">P&L</p>
                                  <p
                                    className={`text-lg font-semibold ${(asset.value / asset.amount) * 0.95 < asset.value / asset.amount ? 'text-green-400' : 'text-red-400'}`}
                                  >
                                    +${(asset.value * 0.05).toFixed(2)}
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">Actions</p>
                                  <div className="flex gap-2 mt-1">
                                    <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm">
                                      Buy
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm">
                                      Sell
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 h-48">
                                <CryptoChart symbol={asset.symbol} height={192} />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>{' '}
          {/* Chain Allocation Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6">{t.chainBreakdown}</h2>{' '}
            {/* Chain Donut Chart */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  const chainColors: Record<string, string> = {
                    Bitcoin: '#F59E0B',
                    Ethereum: '#8B5CF6',
                    Solana: '#6366F1',
                    BNB: '#F59E0B',
                    Litecoin: '#6B7280',
                    XRP: '#3B82F6',
                    Cardano: '#0EA5E9',
                    Avalanche: '#EF4444',
                    Polkadot: '#E11D48',
                    Polygon: '#8B5CF6',
                    Chainlink: '#0EA5E9',
                    Cosmos: '#14B8A6',
                    Uniswap: '#F472B6',
                    Pepe: '#10B981',
                    ShibaInu: '#F59E0B',
                    Toncoin: '#0EA5E9',
                    Arbitrum: '#6366F1',
                  };

                  // Precompute segments immutably to avoid ESLint error
                  const chartSegments = chainTotals.reduce<
                    Array<{ chain: string; dash: number; offset: number; color: string }>
                  >((acc, chainData) => {
                    const previousOffset =
                      acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
                    const percentage = chainData.totalValue / totalValue;
                    const dash = percentage * 314;

                    acc.push({
                      chain: chainData.chain,
                      dash,
                      offset: previousOffset,
                      color: chainColors[chainData.chain] || '#6B7280',
                    });
                    return acc;
                  }, []);

                  return chartSegments.map(segment => (
                    <circle
                      key={segment.chain}
                      cx="50"
                      cy="50"
                      r="50"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="20"
                      strokeDasharray={`${segment.dash} 314`}
                      strokeDashoffset={-segment.offset}
                      className="transition-all duration-500"
                    />
                  ));
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">{t.totalValue}</p>
                </div>
              </div>
            </div>
            {/* Chain Legend */}
            <div className="space-y-3">
              {chainTotals.map((chainData, i) => {
                const chainColors: Record<string, string> = {
                  Bitcoin: 'bg-yellow-500',
                  Ethereum: 'bg-purple-500',
                  Solana: 'bg-indigo-500',
                  BNB: 'bg-amber-500',
                  Litecoin: 'bg-slate-500',
                  XRP: 'bg-blue-500',
                  Cardano: 'bg-blue-400',
                  Avalanche: 'bg-red-500',
                  Polkadot: 'bg-rose-600',
                  Polygon: 'bg-violet-500',
                  Chainlink: 'bg-cyan-500',
                  Cosmos: 'bg-teal-500',
                  Uniswap: 'bg-pink-400',
                  Pepe: 'bg-emerald-500',
                  ShibaInu: 'bg-amber-500',
                  Toncoin: 'bg-cyan-500',
                  Arbitrum: 'bg-indigo-400',
                };
                const percentage = Math.round((chainData.totalValue / totalValue) * 100);
                return (
                  <div key={chainData.chain} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${chainColors[chainData.chain] || 'bg-slate-500'}`}
                      ></div>
                      <span className="text-white">{chainData.chain}</span>
                    </div>
                    <span className="text-slate-400">
                      ${chainData.totalValue.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Cross-Chain Actions */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all">
                <Link2 className="w-4 h-4" />
                {t.bridge} Assets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
