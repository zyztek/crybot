import { useState } from 'react';
import { Scale, RefreshCw, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface PortfolioAsset {
  symbol: string;
  name: string;
  current: number;
  target: number;
  price: number;
}

const PortfolioRebalancer: React.FC = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    { symbol: 'BTC', name: 'Bitcoin', current: 35, target: 30, price: 42500 },
    { symbol: 'ETH', name: 'Ethereum', current: 25, target: 30, price: 2250 },
    { symbol: 'SOL', name: 'Solana', current: 15, target: 20, price: 98 },
    { symbol: 'USDT', name: 'Tether', current: 25, target: 20, price: 1 },
  ]);

  const totalValue = assets.reduce((acc, a) => acc + (a.current / 100) * 10000, 0);

  const calculateRebalance = () => {
    return assets.map(asset => {
      const currentValue = (asset.current / 100) * totalValue;
      const targetValue = (asset.target / 100) * totalValue;
      const diff = targetValue - currentValue;
      const tokens = diff / asset.price;
      return { ...asset, diff, tokens };
    });
  };

  const rebalanced = calculateRebalance();
  const totalDiff = rebalanced.reduce((acc, a) => acc + Math.abs(a.diff || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Portfolio Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Trades Needed</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">
            {rebalanced.filter(a => (a.diff || 0) !== 0).length}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Volume</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${totalDiff.toFixed(2)}</p>
        </div>
      </div>

      {/* Asset Allocation Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-400" />
            Portfolio Allocation
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-xs text-slate-400">
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3 text-right">Current %</th>
                <th className="px-4 py-3 text-right">Target %</th>
                <th className="px-4 py-3 text-right">Current Value</th>
                <th className="px-4 py-3 text-right">Target Value</th>
                <th className="px-4 py-3 text-right">Action</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {rebalanced.map(asset => {
                const currentValue = (asset.current / 100) * totalValue;
                const targetValue = (asset.target / 100) * totalValue;
                const diff = (asset.diff || 0);
                const tokens = (asset.tokens || 0);

                return (
                  <tr key={asset.symbol} className="text-sm">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-xs font-bold">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{asset.symbol}</p>
                          <p className="text-slate-400 text-xs">{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-white">{asset.current}%</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input
                        type="number"
                        value={asset.target}
                        onChange={(e) => {
                          const newTarget = parseFloat(e.target.value) || 0;
                          setAssets(assets.map(a => 
                            a.symbol === asset.symbol ? { ...a, target: newTarget } : a
                          ));
                        }}
                        className="w-16 bg-slate-700 text-white text-right px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      ${currentValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      ${targetValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Math.abs(diff) < 1 ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" /> Balanced
                        </span>
                      ) : diff > 0 ? (
                        <span className="text-green-400 text-xs">Buy</span>
                      ) : (
                        <span className="text-red-400 text-xs">Sell</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Math.abs(tokens) > 0.001 ? (
                        <span className={diff > 0 ? 'text-green-400' : 'text-red-400'}>
                          {diff > 0 ? '+' : ''}{tokens.toFixed(4)} {asset.symbol}
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-4">Current Allocation</h4>
          <div className="space-y-2">
            {assets.map(asset => (
              <div key={asset.symbol} className="flex items-center gap-2">
                <span className="text-slate-400 text-sm w-12">{asset.symbol}</span>
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500"
                    style={{ width: `${asset.current}%` }}
                  />
                </div>
                <span className="text-white text-sm w-12 text-right">{asset.current}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-4">Target Allocation</h4>
          <div className="space-y-2">
            {assets.map(asset => (
              <div key={asset.symbol} className="flex items-center gap-2">
                <span className="text-slate-400 text-sm w-12">{asset.symbol}</span>
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${asset.target}%` }}
                  />
                </div>
                <span className="text-white text-sm w-12 text-right">{asset.target}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRebalancer;