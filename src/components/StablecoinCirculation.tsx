import { useState } from 'react';
import { CircleDollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface Stablecoin {
  name: string;
  symbol: string;
  supply: string;
  change24h: number;
  marketCap: string;
  volume24h: string;
}

const StablecoinCirculation: React.FC = () => {
  const stablecoins: Stablecoin[] = [
    { name: 'Tether', symbol: 'USDT', supply: '95.2B', change24h: 1.2, marketCap: '$95.2B', volume24h: '$42.5B' },
    { name: 'USD Coin', symbol: 'USDC', supply: '42.8B', change24h: -0.5, marketCap: '$42.8B', volume24h: '$18.2B' },
    { name: 'Binance USD', symbol: 'BUSD', supply: '7.2B', change24h: -2.1, marketCap: '$7.2B', volume24h: '$3.8B' },
    { name: 'Dai', symbol: 'DAI', supply: '5.1B', change24h: 0.8, marketCap: '$5.1B', volume24h: '$1.2B' },
    { name: 'TrueUSD', symbol: 'TUSD', supply: '3.2B', change24h: 0.3, marketCap: '$3.2B', volume24h: '$890M' },
  ];

  const totalSupply = stablecoins.reduce((acc, s) => acc + parseFloat(s.supply), 0);
  const totalVolume = stablecoins.reduce((acc, s) => acc + parseFloat(s.volume24h.replace(/[$,BM]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <CircleDollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Supply</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalSupply.toFixed(1)}B</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">24h Volume</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalVolume.toFixed(1)}B</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Dominance (USDT)</span>
          </div>
          <p className="text-2xl font-bold text-white">62.5%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Stablecoin</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Supply</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">24h Change</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Market Cap</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {stablecoins.map((coin, idx) => (
              <tr key={idx} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">{coin.name}</span>
                    <span className="text-slate-400 text-sm">({coin.symbol})</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-white">{coin.supply}B</td>
                <td className={`px-4 py-3 text-right font-medium ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{coin.marketCap}</td>
                <td className="px-4 py-3 text-right text-slate-300">{coin.volume24h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StablecoinCirculation;