import { useState } from 'react';
import { Clock, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface FundingRate {
  pair: string;
  rate: number;
  nextFunding: string;
  predictedRate: number;
  openInterest: string;
}

const FundingRateTracker: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'current' | 'predicted'>('current');

  const rates: FundingRate[] = [
    { pair: 'BTC-PERP', rate: 0.01, nextFunding: '4h 32m', predictedRate: -0.005, openInterest: '$2.4B' },
    { pair: 'ETH-PERP', rate: -0.008, nextFunding: '4h 32m', predictedRate: 0.012, openInterest: '$1.8B' },
    { pair: 'SOL-PERP', rate: 0.025, nextFunding: '4h 32m', predictedRate: 0.018, openInterest: '$450M' },
    { pair: 'BNB-PERP', rate: -0.015, nextFunding: '4h 32m', predictedRate: -0.008, openInterest: '$320M' },
    { pair: 'XRP-PERP', rate: 0.005, nextFunding: '4h 32m', predictedRate: 0.01, openInterest: '$280M' },
  ];

  const avgRate = rates.reduce((acc, r) => acc + r.rate, 0) / rates.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Avg Funding Rate</span>
          </div>
          <p className={`text-2xl font-bold ${avgRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(avgRate * 100).toFixed(3)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Next Funding</span>
          </div>
          <p className="text-2xl font-bold text-white">4h 32m</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Open Interest</span>
          </div>
          <p className="text-2xl font-bold text-white">$5.2B</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Pair</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Current Rate</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Next Funding</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Predicted</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Open Interest</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, idx) => (
              <tr key={idx} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-white font-medium">{rate.pair}</td>
                <td className={`px-4 py-3 text-right font-medium ${rate.rate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(rate.rate * 100).toFixed(3)}%
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{rate.nextFunding}</td>
                <td className={`px-4 py-3 text-right ${rate.predictedRate >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
                  {(rate.predictedRate * 100).toFixed(3)}%
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{rate.openInterest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingRateTracker;