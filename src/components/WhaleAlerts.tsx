import React, { useState } from 'react';
import {
  Fish,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  Bell,
  Clock,
  Filter as FilterIcon,
} from 'lucide-react';

interface WhaleAlert {
  id: string;
  type: 'buy' | 'sell' | 'transfer' | 'exchange_deposit' | 'exchange_withdrawal';
  coin: string;
  amount: number;
  valueUSD: number;
  exchange?: string;
  walletAddress?: string;
  timestamp: number;
  impact: 'high' | 'medium' | 'low';
}

const WhaleAlerts = () => {
  const [alerts] = useState<WhaleAlert[]>([
    {
      id: '1',
      type: 'buy',
      coin: 'BTC',
      amount: 125.5,
      valueUSD: 8478125,

      timestamp: Date.now() - 30000, // 30 seconds ago
      impact: 'high',
    },
    {
      id: '2',
      type: 'sell',
      coin: 'ETH',
      amount: 5000,
      valueUSD: 18250000,
      exchange: 'Binance',

      timestamp: Date.now() - 120000, // 2 minutes ago
      impact: 'high',
    },
    {
      id: '3',
      type: 'transfer',
      coin: 'SOL',
      amount: 250000,
      valueUSD: 46250000,
      walletAddress: '3x...8kP2',

      timestamp: Date.now() - 300000, // 5 minutes ago
      impact: 'high',
    },
    {
      id: '4',
      type: 'exchange_deposit',
      coin: 'DOGE',
      amount: 50000000,
      valueUSD: 9500000,
      exchange: 'Coinbase',

      timestamp: Date.now() - 480000, // 8 minutes ago
      impact: 'high',
    },
    {
      id: '5',
      type: 'sell',
      coin: 'BTC',
      amount: 45,
      valueUSD: 3037500,
      exchange: 'Kraken',

      timestamp: Date.now() - 720000, // 12 minutes ago
      impact: 'medium',
    },
    {
      id: '6',
      type: 'buy',
      coin: 'BNB',
      amount: 10000,
      valueUSD: 6250000,
      exchange: 'OKX',

      timestamp: Date.now() - 900000, // 15 minutes ago
      impact: 'medium',
    },
    {
      id: '7',
      type: 'transfer',
      coin: 'ETH',
      amount: 3500,
      valueUSD: 12775000,
      walletAddress: '0x...a7F9',

      timestamp: Date.now() - 1200000, // 20 minutes ago
      impact: 'high',
    },
    {
      id: '8',
      type: 'exchange_withdrawal',
      coin: 'SOL',
      amount: 150000,
      valueUSD: 27750000,
      exchange: 'Binance',

      timestamp: Date.now() - 1800000, // 30 minutes ago
      impact: 'high',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'transfer' | 'exchange'>('all');
  const [alertThreshold, setAlertThreshold] = useState(1000000);

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch =
      filter === 'all'
        ? true
        : filter === 'exchange'
          ? alert.type.includes('exchange')
          : alert.type === filter;
    const valueMatch = alert.valueUSD >= alertThreshold;
    return typeMatch && valueMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'sell':
        return <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />;
      case 'transfer':
        return <Activity className="w-5 h-5 text-blue-400" />;
      case 'exchange_deposit':
        return <Bell className="w-5 h-5 text-yellow-400" />;
      case 'exchange_withdrawal':
        return <Bell className="w-5 h-5 text-purple-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'buy':
        return 'Whale Buy';
      case 'sell':
        return 'Whale Sell';
      case 'transfer':
        return 'Large Transfer';
      case 'exchange_deposit':
        return 'Exchange Deposit';
      case 'exchange_withdrawal':
        return 'Exchange Withdrawal';
      default:
        return 'Unknown';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-500 bg-red-500/10';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatAmount = (amount: number, coin: string) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
    return amount.toFixed(2);
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const totalVolumeToday = alerts.reduce((sum, a) => sum + a.valueUSD, 0);
  const buyVolume = alerts.filter(a => a.type === 'buy').reduce((sum, a) => sum + a.valueUSD, 0);
  const sellVolume = alerts.filter(a => a.type === 'sell').reduce((sum, a) => sum + a.valueUSD, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Fish className="w-4 h-4" />
            Today&apos;s Alerts
          </div>
          <div className="text-3xl font-bold text-white">{alerts.length}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Volume
          </div>
          <div className="text-3xl font-bold text-white">
            ${(totalVolumeToday / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Buy Volume
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${(buyVolume / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
            Sell Volume
          </div>
          <div className="text-3xl font-bold text-red-400">
            ${(sellVolume / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-slate-400" />
            <span className="text-white font-medium">Filter:</span>
          </div>
          {[
            { key: 'all', label: 'All' },
            { key: 'buy', label: 'Buys' },
            { key: 'sell', label: 'Sells' },
            { key: 'transfer', label: 'Transfers' },
            { key: 'exchange', label: 'Exchanges' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-slate-400" />
            <span className="text-white text-sm">
              Min: $
              {alertThreshold > 1000000
                ? `${(alertThreshold / 1000000).toFixed(0)}M`
                : `${(alertThreshold / 1000).toFixed(0)}K`}
            </span>
            <input
              type="range"
              min="100000"
              max="10000000"
              value={alertThreshold}
              onChange={e => setAlertThreshold(parseInt(e.target.value))}
              className="w-32 accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`rounded-xl border-2 p-4 ${getImpactColor(alert.impact)}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              {/* Left - Type & Coin */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    alert.type === 'buy'
                      ? 'bg-green-500/20'
                      : alert.type === 'sell'
                        ? 'bg-red-500/20'
                        : alert.type === 'transfer'
                          ? 'bg-blue-500/20'
                          : alert.type === 'exchange_deposit'
                            ? 'bg-yellow-500/20'
                            : 'bg-purple-500/20'
                  }`}
                >
                  {getTypeIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{getTypeLabel(alert.type)}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        alert.impact === 'high'
                          ? 'bg-red-500 text-white'
                          : alert.impact === 'medium'
                            ? 'bg-yellow-500 text-black'
                            : 'bg-blue-500 text-white'
                      }`}
                    >
                      {alert.impact.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    {alert.type.includes('exchange') && alert.exchange && (
                      <span className="mr-2">{alert.exchange}</span>
                    )}
                    {alert.walletAddress && <span className="mr-2">{alert.walletAddress}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getTimeAgo(alert.timestamp)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle - Amount & */}
              <div className="text-center">
                <div className="text-slate-400 text-sm">{alert.coin}</div>
                <div className="text-2xl font-bold text-white">
                  {formatAmount(alert.amount, alert.coin)} {alert.coin}
                </div>
              </div>

              {/* Right - USD Value */}
              <div className="text-center">
                <div className="text-slate-400 text-sm">USD Value</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {formatValue(alert.valueUSD)}
                </div>
              </div>
            </div>

            {/* Impact Indicator */}
            {alert.impact === 'high' && (
              <div className="mt-3 pt-3 border-t border-slate-600 md:border-slate-700/50 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">High Impact - Market movement expected</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Fish className="w-8 h-8 text-white shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">What are Whale Alerts?</h3>
            <p className="text-white/80 text-sm mb-3">
              Whale alerts notify you when large cryptocurrency transactions occur. These trades can
              significantly influence market prices and provide insights for your trading strategy.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-white/60">Buy:</span>
                <span className="text-green-300 ml-1">Bullish signal</span>
              </div>
              <div>
                <span className="text-white/60">Sell:</span>
                <span className="text-red-300 ml-1">Bearish signal</span>
              </div>
              <div>
                <span className="text-white/60">Exchange Deposit:</span>
                <span className="text-yellow-300 ml-1">Possible sell pressure</span>
              </div>
              <div>
                <span className="text-white/60">Exchange Withdrawal:</span>
                <span className="text-green-300 ml-1">Possible holding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhaleAlerts;
