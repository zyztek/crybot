import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign, AlertTriangle } from 'lucide-react';

interface FutureContract {
  symbol: string;
  price: number;
  change24h: number;
  funding: number;
  volume24h: string;
  openInterest: string;
  nextFunding: string;
}

const FuturesTradingInterface: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');

  const contracts: FutureContract[] = [
    { symbol: 'BTC', price: 42850, change24h: 2.5, funding: 0.01, volume24h: '$2.4B', openInterest: '$4.2B', nextFunding: '4h 32m' },
    { symbol: 'ETH', price: 2265, change24h: 1.8, funding: -0.005, volume24h: '$1.8B', openInterest: '$2.8B', nextFunding: '4h 32m' },
    { symbol: 'SOL', price: 98.5, change24h: -1.2, funding: 0.02, volume24h: '$450M', openInterest: '$680M', nextFunding: '4h 32m' },
    { symbol: 'BNB', price: 312, change24h: 0.8, funding: 0.008, volume24h: '$320M', openInterest: '$520M', nextFunding: '4h 32m' },
  ];

  const contract = contracts.find(c => c.symbol === selectedSymbol) || contracts[0];

  return (
    <div className="space-y-6">
      {/* Symbol Selector */}
      <div className="flex gap-2 flex-wrap">
        {contracts.map((c) => (
          <button
            key={c.symbol}
            onClick={() => setSelectedSymbol(c.symbol)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSymbol === c.symbol ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.symbol}-PERP
          </button>
        ))}
      </div>

      {/* Price Card */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{selectedSymbol}-PERP</p>
            <p className="text-4xl font-bold text-white">${contract.price.toLocaleString()}</p>
            <p className={`text-lg ${contract.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {contract.change24h >= 0 ? '+' : ''}{contract.change24h}% (24h)
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold">Long</button>
            <button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold">Short</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <span className="text-slate-400 text-sm">Funding Rate</span>
          <p className={`text-xl font-bold ${contract.funding >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(contract.funding * 100).toFixed(3)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <span className="text-slate-400 text-sm">24h Volume</span>
          <p className="text-xl font-bold text-white">{contract.volume24h}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <span className="text-slate-400 text-sm">Open Interest</span>
          <p className="text-xl font-bold text-white">{contract.openInterest}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <span className="text-slate-400 text-sm">Next Funding</span>
          <p className="text-xl font-bold text-white">{contract.nextFunding}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <span className="text-slate-400 text-sm">24h Change</span>
          <p className={`text-xl font-bold ${contract.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {contract.change24h >= 0 ? '+' : ''}{contract.change24h}%
          </p>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-yellow-400 font-medium">Futures Trading Risk</h4>
            <p className="text-slate-300 text-sm mt-1">
              Futures trading involves significant risk. Ensure you understand the risks before trading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturesTradingInterface;