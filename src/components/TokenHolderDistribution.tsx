import { useState } from 'react';
import { Users, PieChart, TrendingUp, Wallet } from 'lucide-react';

interface HolderTier {
  range: string;
  holders: number;
  percentage: number;
  tokens: string;
}

const TokenHolderDistribution: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('ETH');

  const tokens = {
    ETH: {
      totalHolders: 245000,
      top10Percent: 82.5,
      distribution: [
        { range: 'Whales (100K+)', holders: 125, percentage: 0.05, tokens: '45.2%' },
        { range: 'Large (10K-100K)', holders: 850, percentage: 0.35, tokens: '28.5%' },
        { range: 'Medium (1K-10K)', holders: 8500, percentage: 3.5, tokens: '15.2%' },
        { range: 'Small (100-1K)', holders: 45000, percentage: 18.4, tokens: '8.5%' },
        { range: 'Micro (<100)', holders: 190525, percentage: 77.75, tokens: '2.6%' },
      ],
    },
    BTC: {
      totalHolders: 180000,
      top10Percent: 88.2,
      distribution: [
        { range: 'Whales (100K+)', holders: 85, percentage: 0.05, tokens: '52.5%' },
        { range: 'Large (10K-100K)', holders: 420, percentage: 0.23, tokens: '25.2%' },
        { range: 'Medium (1K-10K)', holders: 3200, percentage: 1.78, tokens: '12.5%' },
        { range: 'Small (100-1K)', holders: 28000, percentage: 15.6, tokens: '7.8%' },
        { range: 'Micro (<100)', holders: 148295, percentage: 82.4, tokens: '2.0%' },
      ],
    },
  };

  const data = tokens[selectedToken as keyof typeof tokens];

  return (
    <div className="space-y-6">
      {/* Token Selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(tokens).map((token) => (
          <button
            key={token}
            onClick={() => setSelectedToken(token)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedToken === token ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {token}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Holders</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.totalHolders.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Top 10% Hold</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.top10Percent}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Whale %</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.distribution[0].tokens}</p>
        </div>
      </div>

      {/* Distribution Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Tier</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Holders</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">% of Holders</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">% of Tokens</th>
            </tr>
          </thead>
          <tbody>
            {data.distribution.map((tier, idx) => (
              <tr key={idx} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-white font-medium">{tier.range}</td>
                <td className="px-4 py-3 text-right text-slate-300">{tier.holders.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{tier.percentage}%</td>
                <td className="px-4 py-3 text-right text-purple-400 font-medium">{tier.tokens}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenHolderDistribution;