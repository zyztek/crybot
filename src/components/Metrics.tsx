import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
  ArrowUpRight,
  Users,
  ArrowDown,
  Zap,
  RefreshCw,
  Filter,
} from 'lucide-react';

export default function Metrics() {
  const [isSpanish, setIsSpanish] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = {
    tvl: { value: '$45.6B', change: '+5.2%', trend: 'up' },
    volume24h: { value: '$23.5B', change: '-2.3%', trend: 'down' },
    users: { value: '1.2M', change: '+8.5%', trend: 'up' },
    transactions: { value: '2.3M', change: '+12.1%', trend: 'up' },
    avgGas: { value: '42 Gwei', change: '-8.9%', trend: 'down' },
    protocols: { value: '234', change: '+5', trend: 'up' },
  };

  const chainMetrics = [
    { name: 'Ethereum', tvl: '$25.6B', change: '+4.5%', color: 'blue' },
    { name: 'Polygon', tvl: '$8.9B', change: '+6.2%', color: 'purple' },
    { name: 'Arbitrum', tvl: '$5.4B', change: '+8.1%', color: 'cyan' },
    { name: 'Optimism', tvl: '$3.8B', change: '+5.7%', color: 'pink' },
    { name: 'BNB', tvl: '$1.2B', change: '+2.3%', color: 'yellow' },
    { name: 'Avalanche', tvl: '$0.7B', change: '+4.1%', color: 'red' },
  ];

  const assetAllocation = [
    { name: 'BTC', percentage: 35, value: '$15.96B' },
    { name: 'ETH', percentage: 28, value: '$12.77B' },
    { name: 'USDC', percentage: 15, value: '$6.84B' },
    { name: 'USDT', percentage: 12, value: '$5.47B' },
    { name: 'Others', percentage: 10, value: '$4.56B' },
  ];

  const text = isSpanish
    ? {
        title: 'Métricas Globales',
        timeRange: 'Rango de Tiempo',
        tvl: 'Total Value Locked',
        volume24h: 'Volumen 24h',
        users: 'Usuarios Activos',
        transactions: 'Transacciones',
        avgGas: 'Gas Promedio',
        protocols: 'Protocolos',
        chainMetrics: 'Métricas por Cadena',
        assetAllocation: 'Asignación de Activos',
        performance: 'Rendimiento',
        lastUpdated: 'Última Actualización',
      }
    : {
        title: 'Global Metrics',
        timeRange: 'Time Range',
        tvl: 'Total Value Locked',
        volume24h: '24h Volume',
        users: 'Active Users',
        transactions: 'Transactions',
        avgGas: 'Avg Gas',
        protocols: 'Protocols',
        chainMetrics: 'Chain Metrics',
        assetAllocation: 'Asset Allocation',
        performance: 'Performance',
        lastUpdated: 'Last Updated',
      };

  const timeRanges = ['24h', '7d', '30d', '90d', '1y'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              {text.title}
            </h1>
            <p className="text-purple-300">
              {text.lastUpdated}: {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/50 rounded-lg p-1 flex">
              {timeRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded transition-all ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsSpanish(!isSpanish)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {isSpanish ? 'EN' : 'ES'}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {(Object.keys(metrics) as Array<keyof typeof metrics>).map(key => (
            <div
              key={key}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-purple-500/20"
            >
              <div className="flex justify-between items-start mb-2">
                {key === 'tvl' && <DollarSign className="w-6 h-6 text-green-400" />}
                {key === 'volume24h' && <Activity className="w-6 h-6 text-blue-400" />}
                {key === 'users' && <Users className="w-6 h-6 text-purple-400" />}
                {key === 'transactions' && <Zap className="w-6 h-6 text-yellow-400" />}
                {key === 'avgGas' && <TrendingUp className="w-6 h-6 text-pink-400" />}
                {key === 'protocols' && <BarChart3 className="w-6 h-6 text-cyan-400" />}
              </div>
              <p className="text-2xl font-bold text-white mb-1">{metrics[key].value}</p>
              <div className="flex items-center gap-1 text-sm">
                {metrics[key].trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-400" />
                )}
                <span className={metrics[key].trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                  {metrics[key].change}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1 capitalize">{text[key] || key}</p>
            </div>
          ))}
        </div>

        {/* Chain Metrics */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            {text.chainMetrics}
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {chainMetrics.map(chain => (
              <div key={chain.name} className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">{chain.name}</h4>
                <p className="text-2xl font-bold text-purple-400">{chain.tvl}</p>
                <span
                  className={`text-sm ${chain.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
                >
                  {chain.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            {text.assetAllocation}
          </h3>
          <div className="space-y-4">
            {assetAllocation.map(asset => (
              <div key={asset.name} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{asset.name}</span>
                  <span className="text-purple-400 font-bold">{asset.value}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${asset.percentage}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-1">{asset.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
