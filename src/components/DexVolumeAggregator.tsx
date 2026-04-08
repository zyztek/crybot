import { useState } from 'react';
import { BarChart3, TrendingUp, ArrowUpDown, PieChart } from 'lucide-react';

interface DexVolume {
  name: string;
  volume24h: string;
  volumeChange: number;
  tvl: string;
  trades: number;
  dominantPair: string;
}

const DexVolumeAggregator: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  const dexData: DexVolume[] = [
    { name: 'Uniswap V3', volume24h: '$1.2B', volumeChange: 12.5, tvl: '$3.8B', trades: 452000, dominantPair: 'USDC/ETH' },
    { name: 'Curve', volume24h: '$890M', volumeChange: -3.2, tvl: '$2.1B', trades: 125000, dominantPair: 'USDT/USDC' },
    { name: 'Aave', volume24h: '$456M', volumeChange: 8.7, tvl: '$8.5B', trades: 89000, dominantPair: 'ETH/USDT' },
    { name: 'SushiSwap', volume24h: '$342M', volumeChange: 5.1, tvl: '$980M', trades: 156000, dominantPair: 'WBTC/ETH' },
    { name: 'Balancer', volume24h: '$198M', volumeChange: -1.8, tvl: '$650M', trades: 45000, dominantPair: 'BB-A-USD' },
    { name: 'PancakeSwap', volume24h: '$156M', volumeChange: 15.3, tvl: '$1.2B', trades: 234000, dominantPair: 'BNB/USDT' },
  ];

  const totalVolume = dexData.reduce((acc, d) => acc + parseFloat(d.volume24h.replace(/[$,BM]/g, '')), 0);
  const avgChange = dexData.reduce((acc, d) => acc + d.volumeChange, 0) / dexData.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Volume ({timeframe})</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalVolume.toFixed(1)}B</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Avg Change</span>
          </div>
          <p className={`text-2xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Total TVL</span>
          </div>
          <p className="text-2xl font-bold text-white">$17.2B</p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(['24h', '7d', '30d'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeframe === tf
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* DEX Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">DEX</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Volume</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Change</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">TVL</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Trades</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Top Pair</th>
            </tr>
          </thead>
          <tbody>
            {dexData.map((dex, idx) => (
              <tr key={idx} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <ArrowUpDown className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white font-medium">{dex.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-white font-medium">{dex.volume24h}</td>
                <td className={`px-4 py-3 text-right font-medium ${dex.volumeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {dex.volumeChange >= 0 ? '+' : ''}{dex.volumeChange}%
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{dex.tvl}</td>
                <td className="px-4 py-3 text-right text-slate-300">{dex.trades.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{dex.dominantPair}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DexVolumeAggregator;