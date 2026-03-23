import { useState } from 'react';
import { RefreshCw, TrendingUp, TrendingDown, Activity, Zap, CheckCircle, AlertTriangle, Clock, Database } from 'lucide-react';

interface PriceFeed {
  asset: string;
  name: string;
  price: number;
  change24h: number;
  change1h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: string;
  source: string;
  status: 'live' | 'delayed' | 'offline';
}

interface OracleNetwork {
  name: string;
  status: 'operational' | 'degraded' | 'offline';
  uptime: string;
  feeds: number;
  latency: string;
  accuracy: string;
}

const PRICE_FEEDS: PriceFeed[] = [
  { asset: 'BTC', name: 'Bitcoin', price: 67500, change24h: 3.2, change1h: 0.5, volume24h: 45200000000, marketCap: 1325000000000, lastUpdate: '2s ago', source: 'Chainlink', status: 'live' },
  { asset: 'ETH', name: 'Ethereum', price: 3520, change24h: -1.8, change1h: 0.3, volume24h: 18200000000, marketCap: 423000000000, lastUpdate: '3s ago', source: 'Chainlink', status: 'live' },
  { asset: 'SOL', name: 'Solana', price: 175, change24h: 8.5, change1h: 2.1, volume24h: 5200000000, marketCap: 78000000000, lastUpdate: '1s ago', source: 'Pyth', status: 'live' },
  { asset: 'DOGE', name: 'Dogecoin', price: 0.15, change24h: -2.4, change1h: -0.8, volume24h: 1200000000, marketCap: 22000000000, lastUpdate: '4s ago', source: 'Band', status: 'live' },
  { asset: 'AVAX', name: 'Avalanche', price: 42.5, change24h: 5.6, change1h: 1.2, volume24h: 890000000, marketCap: 16000000000, lastUpdate: '2s ago', source: 'Chainlink', status: 'live' },
  { asset: 'LINK', name: 'Chainlink', price: 18.75, change24h: 4.3, change1h: 0.9, volume24h: 560000000, marketCap: 11000000000, lastUpdate: '3s ago', source: 'Chainlink', status: 'live' },
  { asset: 'MATIC', name: 'Polygon', price: 0.72, change24h: 7.1, change1h: 1.8, volume24h: 780000000, marketCap: 7000000000, lastUpdate: '3s ago', source: 'Pyth', status: 'live' },
  { asset: 'ARB', name: 'Arbitrum', price: 1.45, change24h: 6.8, change1h: 1.5, volume24h: 420000000, marketCap: 1900000000, lastUpdate: '2s ago', source: 'Pyth', status: 'live' },
];

const ORACLE_NETWORKS: OracleNetwork[] = [
  { name: 'Chainlink', status: 'operational', uptime: '99.99%', feeds: 850, latency: '<1s', accuracy: '99.999%' },
  { name: 'Pyth Network', status: 'operational', uptime: '99.98%', feeds: 340, latency: '<400ms', accuracy: '99.995%' },
  { name: 'Band Protocol', status: 'operational', uptime: '99.95%', feeds: 180, latency: '<2s', accuracy: '99.99%' },
  { name: 'UMA Oracle', status: 'degraded', uptime: '99.90%', feeds: 65, latency: '<3s', accuracy: '99.98%' },
  { name: 'Tellor', status: 'operational', uptime: '99.92%', feeds: 120, latency: '<2s', accuracy: '99.99%' },
];

export default function OraclePriceFeeds() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<PriceFeed | null>(null);

  const texts = {
    es: {
      title: 'Feeds de Precios Oracle',
      subtitle: 'Datos de precios en tiempo real de oráculos descentralizados',
      refresh: 'Actualizar',
      lastUpdate: 'Última actualización',
      price: 'Precio',
      change24h: 'Cambio 24h',
      change1h: 'Cambio 1h',
      volume: 'Volumen 24h',
      marketCap: 'Capitalización',
      source: 'Origen',
      status: 'Estado',
      live: 'En vivo',
      delayed: 'Retrasado',
      offline: 'Desconectado',
      oracleNetworks: 'Redes Oracle',
      uptime: 'Disponibilidad',
      feeds: 'Feeds',
      latency: 'Latencia',
      accuracy: 'Precisión',
      operational: 'Operativo',
      degraded: 'Degradado',
      networkStatus: 'Estado de la red',
      viewDetails: 'Ver detalles',
      hideDetails: 'Ocultar detalles',
    },
    en: {
      title: 'Oracle Price Feeds',
      subtitle: 'Real-time price data from decentralized oracles',
      refresh: 'Refresh',
      lastUpdate: 'Last update',
      price: 'Price',
      change24h: '24h Change',
      change1h: '1h Change',
      volume: '24h Volume',
      marketCap: 'Market Cap',
      source: 'Source',
      status: 'Status',
      live: 'Live',
      delayed: 'Delayed',
      offline: 'Offline',
      oracleNetworks: 'Oracle Networks',
      uptime: 'Uptime',
      feeds: 'Feeds',
      latency: 'Latency',
      accuracy: 'Accuracy',
      operational: 'Operational',
      degraded: 'Degraded',
      networkStatus: 'Network Status',
      viewDetails: 'View details',
      hideDetails: 'Hide details',
    },
  };

  const t = texts[language];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl">
              <Database className="w-8 h-8 text-white" />
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

        {/* Oracle Networks Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {ORACLE_NETWORKS.map((network, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border ${
                network.status === 'operational' ? 'border-green-500/30' :
                network.status === 'degraded' ? 'border-yellow-500/30' :
                'border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${
                  network.status === 'operational' ? 'bg-green-400' :
                  network.status === 'degraded' ? 'bg-yellow-400' :
                  'bg-red-400 animate-pulse'
                }`} />
                <h4 className="text-white font-bold">{network.name}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.uptime}</span>
                  <span className="text-green-400">{network.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.latency}</span>
                  <span className="text-white">{network.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.accuracy}</span>
                  <span className="text-blue-400">{network.accuracy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Feeds */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              {t.live} Price Feeds
            </h3>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">{PRICE_FEEDS.length} feeds</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="text-left py-4 px-4">Asset</th>
                  <th className="text-right py-4 px-4">{t.price}</th>
                  <th className="text-right py-4 px-4">{t.change24h}</th>
                  <th className="text-right py-4 px-4">{t.change1h}</th>
                  <th className="text-right py-4 px-4">{t.volume}</th>
                  <th className="text-right py-4 px-4">{t.marketCap}</th>
                  <th className="text-right py-4 px-4">{t.source}</th>
                  <th className="text-center py-4 px-4">{t.status}</th>
                  <th className="text-center py-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_FEEDS.map((feed, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {feed.asset.slice(0,2)}
                        </div>
                        <div>
                          <p className="text-white font-bold">{feed.asset}</p>
                          <p className="text-gray-400 text-sm">{feed.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="text-white font-bold text-lg">
                        {feed.price < 1 ? `$${feed.price.toFixed(4)}` : `$${feed.price.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className={`flex items-center justify-end gap-1 ${feed.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {feed.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(feed.change24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className={`flex items-center justify-end gap-1 ${feed.change1h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Math.abs(feed.change1h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-white font-medium">
                      {formatNumber(feed.volume24h)}
                    </td>
                    <td className="text-right py-4 px-4 text-white font-medium">
                      {formatNumber(feed.marketCap)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {feed.source}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feed.status === 'live' ? 'bg-green-500/20 text-green-400' :
                        feed.status === 'delayed' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {t[feed.status]}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <button
                        onClick={() => setSelectedFeed(selectedFeed?.asset === feed.asset ? null : feed)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {selectedFeed?.asset === feed.asset ? t.hideDetails : t.viewDetails}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feed Details */}
        {selectedFeed && (
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-500/30">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">{t.lastUpdate}</p>
                  <p className="text-white font-bold">{selectedFeed.lastUpdate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">{t.change1h}</p>
                  <p className={`font-bold ${selectedFeed.change1h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedFeed.change1h >= 0 ? '+' : ''}{selectedFeed.change1h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">{t.change24h}</p>
                  <p className={`font-bold ${selectedFeed.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedFeed.change24h >= 0 ? '+' : ''}{selectedFeed.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-400 text-sm">{t.source}</p>
                  <p className="text-white font-bold">{selectedFeed.source}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Network Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">{t.operational}</h3>
            </div>
            <p className="text-4xl font-bold text-green-400">
              {ORACLE_NETWORKS.filter(n => n.status === 'operational').length}
            </p>
            <p className="text-gray-400 mt-2">Networks online</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">{t.degraded}</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-400">
              {ORACLE_NETWORKS.filter(n => n.status === 'degraded').length}
            </p>
            <p className="text-gray-400 mt-2">Networks affected</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Total Feeds</h3>
            </div>
            <p className="text-4xl font-bold text-blue-400">
              {ORACLE_NETWORKS.reduce((sum, n) => sum + n.feeds, 0)}
            </p>
            <p className="text-gray-400 mt-2">Active price feeds</p>
          </div>
        </div>
      </div>
    </div>
  );
}