import { useState } from 'react';
import { Hash, TrendingUp, Clock, Activity } from 'lucide-react';

const HashRateMonitor: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState('ethereum');

  const chainData = {
    ethereum: {
      hashrate: '350 TH/s',
      hashrateChange: 5.2,
      avgBlockTime: '14.2s',
      miners: '45.2K',
      revenue: '$18.5M/day',
    },
    bitcoin: {
      hashrate: '450 EH/s',
      hashrateChange: 2.8,
      avgBlockTime: '9.8m',
      miners: '12.5K',
      revenue: '$42.3M/day',
    },
  };

  const data = chainData[selectedChain as keyof typeof chainData];

  return (
    <div className="space-y-6">
      {/* Chain Selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(chainData).map((chain) => (
          <button
            key={chain}
            onClick={() => setSelectedChain(chain)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              selectedChain === chain ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {chain}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Hash Rate</span>
          </div>
          <p className="text-xl font-bold text-white">{data.hashrate}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">24h Change</span>
          </div>
          <p className="text-xl font-bold text-green-400">+{data.hashrateChange}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Block Time</span>
          </div>
          <p className="text-xl font-bold text-white">{data.avgBlockTime}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Active Miners</span>
          </div>
          <p className="text-xl font-bold text-white">{data.miners}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">Revenue</span>
          </div>
          <p className="text-xl font-bold text-white">{data.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default HashRateMonitor;