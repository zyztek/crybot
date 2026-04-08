import { useState } from 'react';
import { Search, TrendingUp, DollarSign, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface ArbitrageOpportunity {
  id: number;
  pair: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  spreadPercent: number;
  volume: number;
  potentialProfit: number;
}

const ArbitrageDetector: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([
    { id: 1, pair: 'BTC/USDT', buyExchange: 'Binance', sellExchange: 'Coinbase', buyPrice: 42850, sellPrice: 43120, spread: 270, spreadPercent: 0.63, volume: 50000, potentialProfit: 135 },
    { id: 2, pair: 'ETH/USDT', buyExchange: 'Kraken', sellExchange: 'Binance', buyPrice: 2245, sellPrice: 2268, spread: 23, spreadPercent: 1.02, volume: 100000, potentialProfit: 230 },
    { id: 3, pair: 'SOL/USDT', buyExchange: 'FTX', sellExchange: 'Binance', buyPrice: 97.5, sellPrice: 98.2, spread: 0.7, spreadPercent: 0.72, volume: 25000, potentialProfit: 175 },
  ]);

  const startScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScanning(false);
  };

  const totalPotential = opportunities.reduce((acc, o) => acc + o.potentialProfit, 0);
  const avgSpread = opportunities.reduce((acc, o) => acc + o.spreadPercent, 0) / opportunities.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Potential Profit</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${totalPotential.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Avg Spread</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgSpread.toFixed(2)}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Opportunities</span>
          </div>
          <p className="text-2xl font-bold text-white">{opportunities.length}</p>
        </div>
      </div>

      {/* Scan Button */}
      <div className="flex justify-center">
        <button
          onClick={startScan}
          disabled={scanning}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {scanning ? <Clock className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {scanning ? 'Scanning Exchanges...' : 'Scan for Arbitrage'}
        </button>
      </div>

      {/* Opportunities */}
      <div className="space-y-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold text-lg">{opp.pair}</h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                  <span>{opp.buyExchange}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>{opp.sellExchange}</span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${opp.spreadPercent >= 0.5 ? 'text-green-400' : 'text-yellow-400'}`}>
                  +{opp.spreadPercent.toFixed(2)}%
                </p>
                <p className="text-slate-400 text-sm">${opp.potentialProfit} potential</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <span className="text-slate-400">Buy at</span>
                <p className="text-white">${opp.buyPrice.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-400">Sell at</span>
                <p className="text-white">${opp.sellPrice.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-400">Min Volume</span>
                <p className="text-white">${opp.volume.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArbitrageDetector;