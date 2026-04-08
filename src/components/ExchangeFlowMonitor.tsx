import { useState } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Wallet, Clock } from 'lucide-react';

interface ExchangeFlow {
  from: string;
  to: string;
  amount: number;
  token: string;
  time: string;
  type: 'inflow' | 'outflow';
}

const ExchangeFlowMonitor: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  const flows: ExchangeFlow[] = [
    { from: 'Binance', to: 'Coinbase', amount: 1250, token: 'BTC', time: '5m ago', type: 'outflow' },
    { from: 'Kraken', to: 'Binance', amount: 8500, token: 'ETH', time: '15m ago', type: 'outflow' },
    { from: 'Gemini', to: 'Cold Wallet', amount: 2300, token: 'BTC', time: '32m ago', type: 'outflow' },
    { from: 'FTX', to: 'Binance', amount: 45000, token: 'SOL', time: '1h ago', type: 'inflow' },
    { from: 'KuCoin', to: 'Unknown', amount: 120000, token: 'USDT', time: '2h ago', type: 'outflow' },
  ];

  const totalInflow = flows.filter(f => f.type === 'inflow').reduce((acc, f) => acc + f.amount, 0);
  const totalOutflow = flows.filter(f => f.type === 'outflow').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Inflow ({timeframe})</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${(totalInflow / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span className="text-slate-400 text-sm">Total Outflow ({timeframe})</span>
          </div>
          <p className="text-2xl font-bold text-red-400">${(totalOutflow / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Net Flow</span>
          </div>
          <p className={`text-2xl font-bold ${totalInflow - totalOutflow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalInflow - totalOutflow >= 0 ? '+' : ''}${((totalInflow - totalOutflow) / 1000).toFixed(1)}K
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(['1h', '24h', '7d'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeframe === tf ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Flows List */}
      <div className="space-y-3">
        {flows.map((flow, idx) => (
          <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${flow.type === 'inflow' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {flow.type === 'inflow' ? <TrendingDown className="w-5 h-5 text-green-400" /> : <TrendingUp className="w-5 h-5 text-red-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{flow.from}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="text-white font-medium">{flow.to}</span>
                </div>
                <span className="text-slate-400 text-sm">{flow.amount.toLocaleString()} {flow.token}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{flow.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeFlowMonitor;