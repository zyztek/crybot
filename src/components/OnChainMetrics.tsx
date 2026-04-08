import { useState } from 'react';
import { Activity, Hash, Users, Wallet, TrendingUp, Globe, Blocks } from 'lucide-react';

const OnChainMetrics: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState('ethereum');

  const chainData: Record<string, {
    name: string;
    price: number;
    marketCap: string;
    tvl: string;
    activeAddresses: string;
    txCount: string;
    gasPrice: string;
    difficulty: string;
    hashrate: string;
  }> = {
    ethereum: {
      name: 'Ethereum',
      price: 2250,
      marketCap: '$270B',
      tvl: '$45.2B',
      activeAddresses: '485K',
      txCount: '1.2M',
      gasPrice: '32 Gwei',
      difficulty: '15.5 P',
      hashrate: '350 TH/s'
    },
    bitcoin: {
      name: 'Bitcoin',
      price: 42500,
      marketCap: '$835B',
      tvl: '$12.5B',
      activeAddresses: '1.1M',
      txCount: '325K',
      gasPrice: '10 sat/vB',
      difficulty: '67.3 T',
      hashrate: '450 EH/s'
    },
    solana: {
      name: 'Solana',
      price: 98,
      marketCap: '$42B',
      tvl: '$3.8B',
      activeAddresses: '2.3M',
      txCount: '45M',
      gasPrice: '0.00025 SOL',
      difficulty: 'N/A',
      hashrate: 'N/A'
    }
  };

  const data = chainData[selectedChain];

  const metrics = [
    { icon: Wallet, label: 'Active Addresses', value: data.activeAddresses, color: 'purple' },
    { icon: Activity, label: 'Daily Transactions', value: data.txCount, color: 'blue' },
    { icon: Hash, label: 'Gas Price', value: data.gasPrice, color: 'green' },
    { icon: TrendingUp, label: 'Difficulty', value: data.difficulty, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Chain Selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(chainData).map(([key, chain]) => (
          <button
            key={key}
            onClick={() => setSelectedChain(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedChain === key
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {chain.name}
          </button>
        ))}
      </div>

      {/* Price & Market Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Price</p>
          <p className="text-2xl font-bold text-white">${data.price.toLocaleString()}</p>
          <p className="text-green-400 text-sm">+2.4%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Market Cap</p>
          <p className="text-2xl font-bold text-white">{data.marketCap}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">TVL</p>
          <p className="text-2xl font-bold text-white">{data.tvl}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Hash Rate</p>
          <p className="text-2xl font-bold text-white">{data.hashrate}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className={`w-10 h-10 rounded-lg bg-${metric.color}-500/20 flex items-center justify-center mb-3`}>
              <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
            </div>
            <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
            <p className="text-lg font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Network Status */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Blocks className="w-5 h-5 text-purple-400" />
            Network Status
          </h3>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
            <p className="text-slate-400 text-sm">Network</p>
            <p className="text-green-400 font-medium">Healthy</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-sm">Last Block</p>
            <p className="text-white font-medium">#18,543,221</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-sm">Avg Block Time</p>
            <p className="text-white font-medium">12.3s</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-sm">Block Reward</p>
            <p className="text-white font-medium">2.1 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnChainMetrics;