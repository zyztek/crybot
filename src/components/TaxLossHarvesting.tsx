import { useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Calculator, AlertCircle } from 'lucide-react';

interface Holding {
  token: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  unrealizedGain: number;
  unrealizedLoss: number;
}

const TaxLossHarvesting: React.FC = () => {
  const [holdings] = useState<Holding[]>([
    { token: 'BTC', purchasePrice: 45000, currentPrice: 42500, quantity: 0.5, unrealizedGain: 0, unrealizedLoss: 1250 },
    { token: 'ETH', purchasePrice: 2000, currentPrice: 2250, quantity: 2, unrealizedGain: 500, unrealizedLoss: 0 },
    { token: 'SOL', purchasePrice: 120, currentPrice: 98, quantity: 10, unrealizedGain: 0, unrealizedLoss: 220 },
    { token: 'BNB', purchasePrice: 280, currentPrice: 312, quantity: 5, unrealizedGain: 160, unrealizedLoss: 0 },
    { token: 'XRP', purchasePrice: 0.65, currentPrice: 0.52, quantity: 5000, unrealizedGain: 0, unrealizedLoss: 650 },
  ]);

  const totalGains = holdings.filter(h => h.unrealizedGain > 0).reduce((acc, h) => acc + h.unrealizedGain, 0);
  const totalLosses = holdings.filter(h => h.unrealizedLoss > 0).reduce((acc, h) => acc + h.unrealizedLoss, 0);
  const netPosition = totalGains - totalLosses;
  const potentialSavings = totalLosses * 0.25; // Assuming 25% tax rate

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Unrealized Gains</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${totalGains.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-slate-400 text-sm">Unrealized Losses</span>
          </div>
          <p className="text-2xl font-bold text-red-400">${totalLosses.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Net Position</span>
          </div>
          <p className={`text-2xl font-bold ${netPosition >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {netPosition >= 0 ? '+' : ''}${netPosition.toFixed(0)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Potential Tax Savings</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">${potentialSavings.toFixed(0)}</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">Token</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Purchase</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Current</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Qty</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Gain/Loss</th>
              <th className="px-4 py-3 text-center text-slate-400 text-sm font-medium">Harvest</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, idx) => (
              <tr key={idx} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-white font-medium">{h.token}</td>
                <td className="px-4 py-3 text-right text-slate-300">${h.purchasePrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">${h.currentPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{h.quantity}</td>
                <td className={`px-4 py-3 text-right font-medium ${h.unrealizedGain > 0 ? 'text-green-400' : h.unrealizedLoss > 0 ? 'text-red-400' : 'text-slate-300'}`}>
                  {h.unrealizedGain > 0 ? '+' : ''}${h.unrealizedGain || -h.unrealizedLoss}
                </td>
                <td className="px-4 py-3 text-center">
                  {h.unrealizedLoss > 0 && (
                    <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm">
                      Harvest
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-blue-400 font-medium">Tax Loss Harvesting Info</h4>
            <p className="text-slate-300 text-sm mt-1">
              Selling assets at a loss can offset capital gains. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxLossHarvesting;