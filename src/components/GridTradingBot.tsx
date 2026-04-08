import { useState } from 'react';
import { Settings, Play, Pause, TrendingUp, DollarSign } from 'lucide-react';

interface GridLevel {
  id: number;
  price: number;
  orders: number;
  profit: number;
}

const GridTradingBot: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [config, setConfig] = useState({
    symbol: 'BTC/USDT',
    gridCount: 10,
    rangePercent: 5,
    orderSize: 100,
  });

  const basePrice = 42500;
  const gridLevels: GridLevel[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    price: basePrice * (1 - (config.rangePercent / 100) / 2 + (i * config.rangePercent / 100) / 9),
    orders: Math.floor(Math.random() * 5) + 1,
    profit: Math.random() * 50 + 10,
  }));

  const totalProfit = gridLevels.reduce((acc, l) => acc + l.profit, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Profit</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${totalProfit.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Grid Levels</span>
          </div>
          <p className="text-2xl font-bold text-white">{config.gridCount}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Price Range</span>
          </div>
          <p className="text-2xl font-bold text-white">±{config.rangePercent}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-400 text-sm">Status</span>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isActive ? <><Pause className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> Start</>}
          </button>
        </div>
      </div>

      {/* Config */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Grid Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Symbol</label>
            <select
              value={config.symbol}
              onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              <option>BTC/USDT</option>
              <option>ETH/USDT</option>
              <option>SOL/USDT</option>
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Grid Count</label>
            <input
              type="number"
              value={config.gridCount}
              onChange={(e) => setConfig({ ...config, gridCount: parseInt(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Range (%)</label>
            <input
              type="number"
              value={config.rangePercent}
              onChange={(e) => setConfig({ ...config, rangePercent: parseFloat(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Order Size ($)</label>
            <input
              type="number"
              value={config.orderSize}
              onChange={(e) => setConfig({ ...config, orderSize: parseFloat(e.target.value) })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
        </div>
      </div>

      {/* Grid Levels */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Grid Levels</h3>
        <div className="space-y-2">
          {gridLevels.map((level) => (
            <div key={level.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-white">${level.price.toLocaleString()}</span>
              <span className="text-slate-400">{level.orders} orders</span>
              <span className="text-green-400">+${level.profit.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridTradingBot;