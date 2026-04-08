import { useState } from 'react';
import { Calculator, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const LiquidationCalculator: React.FC = () => {
  const [position, setPosition] = useState({
    entryPrice: 42000,
    leverage: 10,
    side: 'long' as 'long' | 'short',
    walletBalance: 1000,
  });

  const calculateLiquidation = (entry: number, lev: number, side: 'long' | 'short') => {
    const liquidationPercent = 1 / lev;
    return side === 'long' 
      ? entry * (1 - liquidationPercent)
      : entry * (1 + liquidationPercent);
  };

  const liquidationPrice = calculateLiquidation(position.entryPrice, position.leverage, position.side);
  const distanceToLiquidation = Math.abs((position.entryPrice - liquidationPrice) / position.entryPrice * 100);
  const maxLoss = position.walletBalance;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Liquidation Price</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">${liquidationPrice.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-slate-400 text-sm">Distance to Liquidation</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{distanceToLiquidation.toFixed(1)}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Max Loss</span>
          </div>
          <p className="text-2xl font-bold text-white">${maxLoss}</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Position Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Entry Price ($)</label>
            <input
              type="number"
              value={position.entryPrice}
              onChange={(e) => setPosition({ ...position, entryPrice: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Leverage (x)</label>
            <select
              value={position.leverage}
              onChange={(e) => setPosition({ ...position, leverage: parseInt(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              {[2, 3, 5, 10, 20, 50, 100].map(l => <option key={l} value={l}>{l}x</option>)}
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Side</label>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setPosition({ ...position, side: 'long' })}
                className={`flex-1 py-2 rounded-lg font-medium ${position.side === 'long' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}
              >
                Long
              </button>
              <button
                onClick={() => setPosition({ ...position, side: 'short' })}
                className={`flex-1 py-2 rounded-lg font-medium ${position.side === 'short' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}
              >
                Short
              </button>
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Wallet Balance ($)</label>
            <input
              type="number"
              value={position.walletBalance}
              onChange={(e) => setPosition({ ...position, walletBalance: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidationCalculator;