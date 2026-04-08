import { useState } from 'react';
import { Signal, TrendingUp, TrendingDown, Users, Star, Bell, ArrowUp, ArrowDown } from 'lucide-react';

interface Signal {
  id: number;
  trader: string;
  avatar: string;
  pair: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  winRate: number;
  followers: number;
  timestamp: string;
}

const TradingSignals: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('all');

  const signals: Signal[] = [
    { id: 1, trader: 'CryptoMaster', avatar: 'CM', pair: 'BTC/USDT', type: 'buy', entryPrice: 42000, currentPrice: 42800, pnl: 1.9, winRate: 78, followers: 1250, timestamp: '2h ago' },
    { id: 2, trader: 'DeFiWhale', avatar: 'DW', pair: 'ETH/USDT', type: 'sell', entryPrice: 2300, currentPrice: 2240, pnl: -2.6, winRate: 65, followers: 890, timestamp: '4h ago' },
    { id: 3, trader: 'SolanaKing', avatar: 'SK', pair: 'SOL/USDT', type: 'buy', entryPrice: 95, currentPrice: 99, pnl: 4.2, winRate: 82, followers: 2100, timestamp: '6h ago' },
    { id: 4, trader: 'AltSeason', avatar: 'AS', pair: 'AVAX/USDT', type: 'buy', entryPrice: 35, currentPrice: 36.5, pnl: 4.3, winRate: 71, followers: 560, timestamp: '8h ago' },
    { id: 5, trader: 'MemeLord', avatar: 'ML', pair: 'DOGE/USDT', type: 'sell', entryPrice: 0.12, currentPrice: 0.11, pnl: -8.3, winRate: 55, followers: 3200, timestamp: '12h ago' },
  ];

  const filteredSignals = selectedPair === 'all' ? signals : signals.filter(s => s.pair === selectedPair);
  const pairs = ['all', ...new Set(signals.map(s => s.pair))];

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {pairs.map(pair => (
          <button
            key={pair}
            onClick={() => setSelectedPair(pair)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPair === pair ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {pair === 'all' ? 'All Pairs' : pair}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Active Signals</p>
          <p className="text-2xl font-bold text-white">{filteredSignals.length}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Avg Win Rate</p>
          <p className="text-2xl font-bold text-green-400">70%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Followers</p>
          <p className="text-2xl font-bold text-purple-400">8K</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Today's PnL</p>
          <p className="text-2xl font-bold text-green-400">+2.4%</p>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-3">
        {filteredSignals.map(signal => (
          <div key={signal.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {signal.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{signal.trader}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${signal.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {signal.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{signal.pair} · {signal.timestamp}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-xl font-bold ${signal.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {signal.pnl >= 0 ? '+' : ''}{signal.pnl}%
                </p>
                <p className="text-slate-400 text-sm">Entry: ${signal.entryPrice.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {signal.winRate}% win rate
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {signal.followers.toLocaleString()} followers
                </span>
              </div>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Copy Trade
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingSignals;