import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Signal, Clock, Target } from 'lucide-react';

interface TradingSignal {
  id: string;
  coin: string;
  type: 'long' | 'short';
  entry: number;
  target: number;
  stopLoss: number;
  timeframe: string;
  confidence: number;
  status: 'active' | 'hit' | 'stopped' | 'pending';
  timestamp: number;
  currentPrice: number;
}

// Mock timestamps - using fixed values for demo
const MOCK_NOW = 1700000000000;

const TradingSignals = () => {
  const [signals] = useState<TradingSignal[]>([
    {
      id: '1',
      coin: 'BTC/USDT',
      type: 'long',
      entry: 67450,
      target: 72500,
      stopLoss: 64200,
      timeframe: '4H',
      confidence: 87,
      status: 'active',

      timestamp: Date.now() - 3600000 * 2,
      currentPrice: 68230,
    },
    {
      id: '2',
      coin: 'ETH/USDT',
      type: 'long',
      entry: 3520,
      target: 3950,
      stopLoss: 3380,
      timeframe: '1D',
      confidence: 92,
      status: 'active',

      timestamp: Date.now() - 3600000 * 6,
      currentPrice: 3650,
    },
    {
      id: '3',
      coin: 'SOL/USDT',
      type: 'short',
      entry: 185,
      target: 165,
      stopLoss: 195,
      timeframe: '4H',
      confidence: 78,
      status: 'active',

      timestamp: Date.now() - 3600000 * 4,
      currentPrice: 182,
    },
    {
      id: '4',
      coin: 'DOGE/USDT',
      type: 'long',
      entry: 0.185,
      target: 0.22,
      stopLoss: 0.172,
      timeframe: '1H',
      confidence: 65,
      status: 'pending',

      timestamp: Date.now() - 3600000,
      currentPrice: 0.188,
    },
    {
      id: '5',
      coin: 'BNB/USDT',
      type: 'long',
      entry: 620,
      target: 680,
      stopLoss: 605,
      timeframe: '1D',
      confidence: 85,
      status: 'hit',

      timestamp: Date.now() - 3600000 * 24,
      currentPrice: 690,
    },
  ]);

  // Mock price history for charts
  const priceHistory = signals.slice(0, 3).map(signal => ({
    coin: signal.coin,
    data: Array.from({ length: 20 }, (_, i) => ({
      time: `${i}h`,
      price: signal.entry * (1 + (Math.random() - 0.45) * 0.1),
    })),
  }));

  const [filter, setFilter] = useState<'all' | 'long' | 'short' | 'active'>('all');

  const filteredSignals = signals.filter(s =>
    filter === 'all' ? true : filter === 'active' ? s.status === 'active' : s.type === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'hit':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Signal className="w-4 h-4" />
            Active Signals
          </div>
          <div className="text-3xl font-bold text-white">12</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Win Rate
          </div>
          <div className="text-3xl font-bold text-green-400">78.5%</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Target className="w-4 h-4" />
            Avg. Profit
          </div>
          <div className="text-3xl font-bold text-emerald-400">+12.3%</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Activity className="w-4 h-4" />
            This Month
          </div>
          <div className="text-3xl font-bold text-purple-400">+45</div>
        </div>
      </div>

      {/* Price Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {priceHistory.map(({ coin, data }) => (
          <div
            key={coin}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">{coin}</h3>
              <span className="text-green-400 text-sm flex items-center">
                <TrendingUp className="w-4 h-4" />
                +2.4%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`gradient-${coin}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '#334155' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  fill={`url(#gradient-${coin})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Signals List */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Signal className="w-6 h-6 text-yellow-400" />
            Trading Signals
          </h2>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'long', label: 'Long' },
              { key: 'short', label: 'Short' },
              { key: 'active', label: 'Active' },
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
          </div>
        </div>

        <div className="space-y-4">
          {filteredSignals.map(signal => {
            const pnlPercent =
              signal.type === 'long'
                ? ((signal.currentPrice - signal.entry) / signal.entry) * 100
                : ((signal.entry - signal.currentPrice) / signal.entry) * 100;

            return (
              <div
                key={signal.id}
                className={`p-4 rounded-xl border ${
                  signal.status === 'hit'
                    ? 'bg-green-500/10 border-green-500/30'
                    : signal.status === 'stopped'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-slate-700/50 border-slate-600'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {/* Left Section - Signal Info */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{signal.coin}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          signal.type === 'long'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {signal.type.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(signal.status)} text-white`}
                      >
                        {signal.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Entry:</span>
                        <span className="text-white ml-1">{signal.entry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Target:</span>
                        <span
                          className={`ml-1 ${pnlPercent > 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {signal.target}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Stop Loss:</span>
                        <span className="text-red-400 ml-1">{signal.stopLoss}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - PnL & Progress */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className={`text-2xl font-bold ${pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {pnlPercent >= 0 ? '+' : ''}
                        {pnlPercent.toFixed(2)}%
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {signal.timeframe}
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${pnlPercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(pnlPercent) + 30, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Current Price: {signal.currentPrice}
                    </div>
                  </div>

                  {/* Right Section - Confidence */}
                  <div className="text-center min-w-[100px]">
                    <div className="text-xs text-slate-400 mb-1">Confidence</div>
                    <div
                      className={`text-3xl font-bold ${
                        signal.confidence >= 85
                          ? 'text-green-400'
                          : signal.confidence >= 70
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {signal.confidence}%
                    </div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`text-lg ${star <= Math.ceil(signal.confidence / 20) ? 'text-yellow-400' : 'text-slate-600'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Time */}
                <div className="mt-3 pt-3 border-t border-slate-600 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Published: {new Date(signal.timestamp).toLocaleString()}
                  </div>
                  {signal.status === 'active' && (
                    <button className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Signal Upgrade */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Signal className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">Unlock Premium Signals</h3>
        </div>
        <p className="text-white/80 mb-4">
          Get access to expert-curated signals with 85%+ success rate. AI-powered analysis updated
          every 15 minutes.
        </p>
        <button className="px-6 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:bg-yellow-50 transition-colors">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default TradingSignals;
