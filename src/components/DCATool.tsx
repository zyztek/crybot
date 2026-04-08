import { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, Clock, Play, Pause } from 'lucide-react';

interface DCAPlan {
  id: number;
  token: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  totalInvested: number;
  totalBought: number;
  avgPrice: number;
  status: 'active' | 'paused';
}

const DCATool: React.FC = () => {
  const [plans] = useState<DCAPlan[]>([
    { id: 1, token: 'BTC', amount: 100, frequency: 'weekly', totalInvested: 2400, totalBought: 0.056, avgPrice: 42857, status: 'active' },
    { id: 2, token: 'ETH', amount: 200, frequency: 'weekly', totalInvested: 3600, totalBought: 1.58, avgPrice: 2278, status: 'active' },
    { id: 3, token: 'SOL', amount: 50, frequency: 'daily', totalInvested: 1450, totalBought: 15.2, avgPrice: 95.4, status: 'paused' },
  ]);

  const totalInvested = plans.reduce((acc, p) => acc + p.totalInvested, 0);
  const activePlans = plans.filter(p => p.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Invested</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalInvested.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Active Plans</span>
          </div>
          <p className="text-2xl font-bold text-white">{activePlans}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Next Purchase</span>
          </div>
          <p className="text-2xl font-bold text-white">2d 4h</p>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Token</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Amount</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Frequency</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Invested</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Bought</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Avg Price</th>
              <th className="px-4 py-3 text-center text-slate-400 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3">
                  <span className="text-white font-medium">{plan.token}</span>
                </td>
                <td className="px-4 py-3 text-right text-white">${plan.amount}</td>
                <td className="px-4 py-3 text-slate-300 capitalize">{plan.frequency}</td>
                <td className="px-4 py-3 text-right text-slate-300">${plan.totalInvested.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-white">{plan.totalBought.toFixed(4)} {plan.token}</td>
                <td className="px-4 py-3 text-right text-slate-300">${plan.avgPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${plan.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {plan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DCATool;