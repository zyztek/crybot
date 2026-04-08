import { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

interface Position {
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  leverage: number;
  margin: number;
}

const PortfolioMarginCalculator: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([
    { symbol: 'BTC', side: 'long', size: 0.5, entryPrice: 42000, leverage: 10, margin: 2100 },
    { symbol: 'ETH', side: 'short', size: 2, entryPrice: 2250, leverage: 5, margin: 900 },
    { symbol: 'SOL', side: 'long', size: 50, entryPrice: 95, leverage: 8, margin: 593.75 },
  ]);

  const [newPosition, setNewPosition] = useState({
    symbol: 'BTC', side: 'long' as 'long' | 'short', size: 0.1, entryPrice: 42500, leverage: 5
  });

  const totalMargin = positions.reduce((acc, p) => acc + p.margin, 0);
  const totalNotional = positions.reduce((acc, p) => acc + (p.size * p.entryPrice * p.leverage), 0);
  const avgLeverage = totalNotional / totalMargin;

  const addPosition = () => {
    const margin = (newPosition.size * newPosition.entryPrice) / newPosition.leverage;
    setPositions([...positions, { ...newPosition, margin }]);
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Margin</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalMargin.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Total Notional</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalNotional / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Avg Leverage</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgLeverage.toFixed(1)}x</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Positions</span>
          </div>
          <p className="text-2xl font-bold text-white">{positions.length}</p>
        </div>
      </div>

      {/* Add Position */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Add Position</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Symbol</label>
            <select
              value={newPosition.symbol}
              onChange={(e) => setNewPosition({ ...newPosition, symbol: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              <option>BTC</option><option>ETH</option><option>SOL</option><option>BNB</option>
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Side</label>
            <select
              value={newPosition.side}
              onChange={(e) => setNewPosition({ ...newPosition, side: e.target.value as 'long' | 'short' })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              <option value="long">Long</option><option value="short">Short</option>
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Size</label>
            <input
              type="number"
              value={newPosition.size}
              onChange={(e) => setNewPosition({ ...newPosition, size: parseFloat(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Entry Price</label>
            <input
              type="number"
              value={newPosition.entryPrice}
              onChange={(e) => setNewPosition({ ...newPosition, entryPrice: parseFloat(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Leverage</label>
            <input
              type="number"
              value={newPosition.leverage}
              onChange={(e) => setNewPosition({ ...newPosition, leverage: parseFloat(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
        </div>
        <button onClick={addPosition} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">Add Position</button>
      </div>

      {/* Positions Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Symbol</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Side</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Size</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Entry</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Leverage</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Margin</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, idx) => (
              <tr key={idx} className="border-t border-slate-700/50">
                <td className="px-4 py-3 text-white font-medium">{pos.symbol}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${pos.side === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {pos.side.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{pos.size}</td>
                <td className="px-4 py-3 text-right text-slate-300">${pos.entryPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{pos.leverage}x</td>
                <td className="px-4 py-3 text-right text-purple-400 font-medium">${pos.margin.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioMarginCalculator;