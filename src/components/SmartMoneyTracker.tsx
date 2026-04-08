import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Eye, Users, Clock } from 'lucide-react';

interface WhaleWallet {
  id: number;
  address: string;
  label: string;
  balance: number;
  change24h: number;
  trades: number;
  lastActive: string;
  profit: number;
}

const SmartMoneyTracker: React.FC = () => {
  const [whales] = useState<WhaleWallet[]>([
    { id: 1, address: '0x742d...3A2F', label: 'DeFi Whale', balance: 12500000, change24h: 5.2, trades: 234, lastActive: '2h ago', profit: 45 },
    { id: 2, address: '0x1Ca5...8B4D', label: 'NFT Collector', balance: 8900000, change24h: -2.1, trades: 89, lastActive: '5h ago', profit: 32 },
    { id: 3, address: '0x9F2e...1C8A', label: 'Early ETH', balance: 45000000, change24h: 1.8, trades: 567, lastActive: '1h ago', profit: 156 },
    { id: 4, address: '0x3B7d...9E2C', label: 'VC Fund', balance: 78000000, change24h: 0.5, trades: 45, lastActive: '12h ago', profit: 89 },
    { id: 5, address: '0x8A1c...4D7F', label: 'Trader Bot', balance: 3200000, change24h: 8.7, trades: 1200, lastActive: '10m ago', profit: 28 },
  ]);

  const totalBalance = whales.reduce((acc, w) => acc + w.balance, 0);
  const avgChange = whales.reduce((acc, w) => acc + w.change24h, 0) / whales.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Tracked</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalBalance / 1e6).toFixed(1)}M</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className={`w-4 h-4 ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-slate-400 text-sm">Avg 24h Change</span>
          </div>
          <p className={`text-2xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Whales Tracked</span>
          </div>
          <p className="text-2xl font-bold text-white">{whales.length}</p>
        </div>
      </div>

      {/* Whales Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Wallet</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Balance</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">24h Change</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Trades</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Profit %</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {whales.map((whale) => (
              <tr key={whale.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">{whale.label}</p>
                      <p className="text-slate-400 text-sm">{whale.address}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-white font-medium">
                  ${(whale.balance / 1e6).toFixed(1)}M
                </td>
                <td className={`px-4 py-3 text-right font-medium ${whale.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {whale.change24h >= 0 ? '+' : ''}{whale.change24h}%
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{whale.trades}</td>
                <td className="px-4 py-3 text-right text-green-400">+{whale.profit}%</td>
                <td className="px-4 py-3 text-right text-slate-400">{whale.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SmartMoneyTracker;