import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target } from 'lucide-react';

interface Option {
  id: number;
  symbol: string;
  type: 'call' | 'put';
  strike: number;
  expiry: string;
  premium: number;
  volume: number;
  openInterest: number;
}

const OptionsTradingDashboard: React.FC = () => {
  const [selectedExpiry, setSelectedExpiry] = useState('weekly');

  const options: Option[] = [
    { id: 1, symbol: 'BTC', type: 'call', strike: 45000, expiry: '2024-01-26', premium: 1250, volume: 4500, openInterest: 3200 },
    { id: 2, symbol: 'BTC', type: 'put', strike: 40000, expiry: '2024-01-26', premium: 980, volume: 3800, openInterest: 2800 },
    { id: 3, symbol: 'ETH', type: 'call', strike: 2500, expiry: '2024-01-26', premium: 185, volume: 12000, openInterest: 8500 },
    { id: 4, symbol: 'ETH', type: 'put', strike: 2000, expiry: '2024-01-26', premium: 145, volume: 9800, openInterest: 7200 },
    { id: 5, symbol: 'SOL', type: 'call', strike: 120, expiry: '2024-01-26', premium: 8.5, volume: 25000, openInterest: 15000 },
  ];

  const totalVolume = options.reduce((acc, o) => acc + o.volume, 0);
  const totalOI = options.reduce((acc, o) => acc + o.openInterest, 0);
  const callOI = options.filter(o => o.type === 'call').reduce((acc, o) => acc + o.openInterest, 0);
  const putOI = options.filter(o => o.type === 'put').reduce((acc, o) => acc + o.openInterest, 0);
  const callPutRatio = callOI / putOI;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Volume</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalVolume.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Open Interest</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalOI.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Call/Put Ratio</span>
          </div>
          <p className="text-2xl font-bold text-white">{callPutRatio.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Next Expiry</span>
          </div>
          <p className="text-2xl font-bold text-white">3 days</p>
        </div>
      </div>

      {/* Expiry Filter */}
      <div className="flex gap-2 flex-wrap">
        {['weekly', 'monthly', 'quarterly'].map((expiry) => (
          <button
            key={expiry}
            onClick={() => setSelectedExpiry(expiry)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              selectedExpiry === expiry ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {expiry}
          </button>
        ))}
      </div>

      {/* Options Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Symbol</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Strike</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Premium</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Volume</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Open Interest</th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt) => (
              <tr key={opt.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-white font-medium">{opt.symbol}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${opt.type === 'call' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {opt.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-white">${opt.strike.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">${opt.premium}</td>
                <td className="px-4 py-3 text-right text-slate-300">{opt.volume.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{opt.openInterest.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionsTradingDashboard;