import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Calculator } from 'lucide-react';

const MarginTradingSimulator: React.FC = () => {
  const [position, setPosition] = useState({
    entryPrice: 42000,
    currentPrice: 43500,
    leverage: 10,
    side: 'long' as 'long' | 'short',
    amount: 1000,
  });

  const [newPosition, setNewPosition] = useState({
    entryPrice: 42000,
    leverage: 5,
    side: 'long' as 'long' | 'short',
    amount: 1000,
  });

  const calculatePnl = (entry: number, current: number, lev: number, side: 'long' | 'short', amt: number) => {
    const priceChange = side === 'long' ? (current - entry) / entry : (entry - current) / entry;
    return amt * priceChange * lev;
  };

  const pnl = calculatePnl(position.entryPrice, position.currentPrice, position.leverage, position.side, position.amount);
  const pnlPercent = (pnl / position.amount) * 100;
  const liquidationPrice = position.side === 'long' 
    ? position.entryPrice * (1 - 1 / position.leverage)
    : position.entryPrice * (1 + 1 / position.leverage);

  return (
    <div className="space-y-6">
      {/* Current Position Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Position Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${(position.amount * position.leverage).toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className={`w-4 h-4 ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-slate-400 text-sm">P&L</span>
          </div>
          <p className={`text-2xl font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {pnl >= 0 ? '+' : ''}${pnl.toFixed(0)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Leverage</span>
          </div>
          <p className="text-2xl font-bold text-white">{position.leverage}x</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Liq. Price</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">${liquidationPrice.toLocaleString()}</p>
        </div>
      </div>

      {/* Open New Position */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Simulate New Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Entry Price</label>
            <input
              type="number"
              value={newPosition.entryPrice}
              onChange={(e) => setNewPosition({ ...newPosition, entryPrice: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Leverage</label>
            <select
              value={newPosition.leverage}
              onChange={(e) => setNewPosition({ ...newPosition, leverage: parseInt(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              {[2, 5, 10, 20, 50, 100].map(l => <option key={l} value={l}>{l}x</option>)}
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Side</label>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setNewPosition({ ...newPosition, side: 'long' })}
                className={`flex-1 py-2 rounded-lg font-medium ${newPosition.side === 'long' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}
              >
                Long
              </button>
              <button
                onClick={() => setNewPosition({ ...newPosition, side: 'short' })}
                className={`flex-1 py-2 rounded-lg font-medium ${newPosition.side === 'short' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}
              >
                Short
              </button>
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Amount ($)</label>
            <input
              type="number"
              value={newPosition.amount}
              onChange={(e) => setNewPosition({ ...newPosition, amount: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
        </div>
      </div>

      {/* Leverage Risk Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-yellow-400 font-medium">Leverage Risk Warning</h4>
            <p className="text-slate-300 text-sm mt-1">
              Using leverage amplifies both profits and losses. At 10x leverage, a 10% price move can result in 100% loss or more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginTradingSimulator;