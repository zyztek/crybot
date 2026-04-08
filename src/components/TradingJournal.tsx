import { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, Calendar, DollarSign, Target, AlertCircle } from 'lucide-react';

interface Trade {
  id: number;
  date: string;
  pair: string;
  side: 'buy' | 'sell';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  strategy: string;
  notes: string;
}

const TradingJournal: React.FC = () => {
  const [trades] = useState<Trade[]>([
    { id: 1, date: '2024-01-15', pair: 'BTC/USDT', side: 'buy', entryPrice: 42000, exitPrice: 43500, quantity: 0.5, pnl: 750, pnlPercent: 3.57, strategy: 'Breakout', notes: 'Following resistance breakout' },
    { id: 2, date: '2024-01-14', pair: 'ETH/USDT', side: 'sell', entryPrice: 2350, exitPrice: 2280, quantity: 2, pnl: -140, pnlPercent: -2.98, strategy: 'Mean Reversion', notes: 'Stop loss hit early' },
    { id: 3, date: '2024-01-13', pair: 'SOL/USDT', side: 'buy', entryPrice: 95, exitPrice: 102, quantity: 10, pnl: 70, pnlPercent: 7.37, strategy: 'DCA', notes: 'Added to position on dip' },
    { id: 4, date: '2024-01-12', pair: 'BTC/USDT', side: 'sell', entryPrice: 44500, exitPrice: 43200, quantity: 0.3, pnl: -390, pnlPercent: -2.92, strategy: 'Swing', notes: 'Reversal signal triggered' },
  ]);

  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.pnl > 0).length;
  const winRate = (winningTrades / totalTrades) * 100;
  const totalPnl = trades.reduce((acc, t) => acc + t.pnl, 0);
  const avgWin = trades.filter(t => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0) / winningTrades;
  const avgLoss = Math.abs(trades.filter(t => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0) / (totalTrades - winningTrades));
  const riskReward = avgWin / avgLoss;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total P&L</span>
          </div>
          <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{winRate.toFixed(1)}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Risk:Reward</span>
          </div>
          <p className="text-2xl font-bold text-white">1:{riskReward.toFixed(1)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Total Trades</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalTrades}</p>
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Pair</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Side</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Entry</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Exit</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">P&L</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Strategy</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-slate-300">{trade.date}</td>
                <td className="px-4 py-3 text-white font-medium">{trade.pair}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${trade.side === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trade.side.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-300">${trade.entryPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">${trade.exitPrice.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl} ({trade.pnlPercent.toFixed(1)}%)
                </td>
                <td className="px-4 py-3 text-slate-300 text-sm">{trade.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingJournal;