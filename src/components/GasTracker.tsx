import { useState } from 'react';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Gauge,
} from 'lucide-react';

interface GasNetwork {
  name: string;
  symbol: string;
  gasPrice: string;
  gasPriceGwei: number;
  change24h: number;
  tps: number;
  status: 'low' | 'medium' | 'high';
  color: string;
}

interface GasTx {
  type: string;
  name: string;
  estimatedGas: string;
  estimatedTime: string;
  priority: 'slow' | 'average' | 'fast' | 'instant';
}

const GAS_NETWORKS: GasNetwork[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    gasPrice: '$4.52',
    gasPriceGwei: 28,
    change24h: 12.3,
    tps: 15.2,
    status: 'low',
    color: '#627EEA',
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    gasPrice: '$2.18',
    gasPriceGwei: 12,
    change24h: -8.5,
    tps: 5.4,
    status: 'low',
    color: '#F7931A',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    gasPrice: '$0.00025',
    gasPriceGwei: 0.00001,
    change24h: 0,
    tps: 4500,
    status: 'low',
    color: '#9945FF',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BSC',
    gasPrice: '$0.15',
    gasPriceGwei: 5,
    change24h: 3.2,
    tps: 85,
    status: 'low',
    color: '#F0B90B',
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    gasPrice: '$0.01',
    gasPriceGwei: 150,
    change24h: 15.8,
    tps: 185,
    status: 'medium',
    color: '#8247E5',
  },
  {
    name: 'Arbitrum',
    symbol: 'ARB',
    gasPrice: '$0.08',
    gasPriceGwei: 0.5,
    change24h: -2.1,
    tps: 22,
    status: 'low',
    color: '#28A0F0',
  },
  {
    name: 'Optimism',
    symbol: 'OP',
    gasPrice: '$0.12',
    gasPriceGwei: 0.75,
    change24h: 5.4,
    tps: 18,
    status: 'low',
    color: '#FF0420',
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    gasPrice: '$0.03',
    gasPriceGwei: 25,
    change24h: 8.9,
    tps: 45,
    status: 'low',
    color: '#E84142',
  },
];

const ETHEREUM_TXS: GasTx[] = [
  {
    type: 'Transfer',
    name: 'ETH Transfer',
    estimatedGas: '21000',
    estimatedTime: '~30s',
    priority: 'slow',
  },
  {
    type: 'ERC20',
    name: 'Token Transfer',
    estimatedGas: '52000',
    estimatedTime: '~45s',
    priority: 'average',
  },
  {
    type: 'Swap',
    name: 'DEX Swap',
    estimatedGas: '150000',
    estimatedTime: '~1m',
    priority: 'average',
  },
  {
    type: 'Add LIQ',
    name: 'Add Liquidity',
    estimatedGas: '180000',
    estimatedTime: '~1m',
    priority: 'fast',
  },
  {
    type: 'NFT Mint',
    name: 'NFT Mint',
    estimatedGas: '85000',
    estimatedTime: '~45s',
    priority: 'average',
  },
  {
    type: 'Bridge',
    name: 'Cross-Chain Bridge',
    estimatedGas: '350000',
    estimatedTime: '~3m',
    priority: 'instant',
  },
];

export default function GasTracker() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [refreshing, setRefreshing] = useState(false);

  const texts = {
    es: {
      title: 'Gas Tracker',
      subtitle: 'Monitorea las tarifas de gas en tiempo real',
      currentGas: 'Gas Actual',
      network: 'Red',
      gasPrice: 'Precio del Gas',
      change24h: 'Cambio 24h',
      tps: 'TPS',
      txType: 'Tipo de tx',
      estimatedGas: 'Gas estimado',
      estimatedTime: 'Tiempo estimado',
      refresh: 'Actualizar',
      slow: 'Lento',
      average: 'Promedio',
      fast: 'Rápido',
      instant: 'Instantáneo',
      lowGas: 'Gas bajo',
      mediumGas: 'Gas medio',
      highGas: 'Gas alto',
      gasHistory: 'Historial de gas',
      quickTips: 'Tips rápidos',
      tip1: 'El gas es más bajo durante fines de semana',
      tip2: 'Usa L2s como Arbitrum para transacciones más baratas',
      tip3: 'Solana tiene tarifas casi nulas',
      gasAlerts: 'Alertas de gas',
      alert1: 'Ethereum gas subió 15% en la última hora',
      alert2: 'Optimism gas considerablly más bajo que Ethereum',
      alert3: 'BSC mantiene gas estable en $0.15',
    },
    en: {
      title: 'Gas Tracker',
      subtitle: 'Monitor gas fees in real-time',
      currentGas: 'Current Gas',
      network: 'Network',
      gasPrice: 'Gas Price',
      change24h: '24h Change',
      tps: 'TPS',
      txType: 'Tx Type',
      estimatedGas: 'Est. Gas',
      estimatedTime: 'Est. Time',
      refresh: 'Refresh',
      slow: 'Slow',
      average: 'Average',
      fast: 'Fast',
      instant: 'Instant',
      lowGas: 'Low Gas',
      mediumGas: 'Medium Gas',
      highGas: 'High Gas',
      gasHistory: 'Gas History',
      quickTips: 'Quick Tips',
      tip1: 'Gas is lower during weekends',
      tip2: 'Use L2s like Arbitrum for cheaper transactions',
      tip3: 'Solana has near-zero fees',
      gasAlerts: 'Gas Alerts',
      alert1: 'Ethereum gas up 15% in last hour',
      alert2: 'Optimism gas significantly lower than Ethereum',
      alert3: 'BSC maintaining stable gas at $0.15',
    },
  };

  const t = texts[language];
  const selectedNetworkData = GAS_NETWORKS.find(n => n.name === selectedNetwork);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'slow':
        return 'from-gray-400 to-gray-500';
      case 'average':
        return 'from-blue-400 to-blue-500';
      case 'fast':
        return 'from-green-400 to-green-500';
      case 'instant':
        return 'from-purple-400 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language & Refresh */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {t.refresh}
          </button>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Main Gas Display */}
        {selectedNetworkData && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ background: selectedNetworkData.color }}
                >
                  {selectedNetworkData.symbol}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedNetworkData.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`flex items-center gap-1 ${selectedNetworkData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {selectedNetworkData.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(selectedNetworkData.change24h).toFixed(1)}%
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        selectedNetworkData.status === 'low'
                          ? 'bg-green-500/20 text-green-400'
                          : selectedNetworkData.status === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {selectedNetworkData.status === 'low'
                        ? t.lowGas
                        : selectedNetworkData.status === 'medium'
                          ? t.mediumGas
                          : t.highGas}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{t.gasPrice}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {selectedNetworkData.gasPrice}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Gwei</p>
                  <p className="text-3xl font-bold text-white">
                    {selectedNetworkData.gasPriceGwei}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{t.tps}</p>
                  <p className="text-3xl font-bold text-white">{selectedNetworkData.tps}</p>
                </div>
              </div>
            </div>

            {/* Gauge */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>0</span>
                <span>Gwei</span>
                <span>100</span>
              </div>
              <div className="relative h-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 w-1 h-full bg-white shadow-lg"
                  style={{ left: `${selectedNetworkData.gasPriceGwei}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Networks Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              {t.network}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {GAS_NETWORKS.map((network, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedNetwork(network.name)}
                  className={`cursor-pointer bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border transition ${
                    selectedNetwork === network.name
                      ? 'border-orange-500/50'
                      : 'border-white/10 hover:border-orange-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: network.color }}
                      >
                        {network.symbol}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{network.name}</h4>
                        <div
                          className={`flex items-center gap-1 text-sm ${network.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {network.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(network.change24h).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{network.gasPrice}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          network.status === 'low'
                            ? 'bg-green-500/20 text-green-400'
                            : network.status === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {network.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Types */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-orange-400" />
              {t.network} - Transaction Types
            </h3>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
              <div className="space-y-3">
                {ETHEREUM_TXS.map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">{tx.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-3 h-3" />
                        {tx.estimatedTime}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{tx.estimatedGas}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(tx.priority)} text-white`}
                      >
                        {t[tx.priority as keyof typeof t]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              {t.quickTips}
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30"
                >
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{t[`tip${i}` as keyof typeof t]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gas Alerts */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              {t.gasAlerts}
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30"
                >
                  <Activity className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{t[`alert${i}` as keyof typeof t]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
