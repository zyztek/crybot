import { useState } from 'react';
import { Fuel, Zap, Clock, Calculator } from 'lucide-react';

const GasOptimizationTool: React.FC = () => {
  const [txType, setTxType] = useState('transfer');
  const [useOptimism, setUseOptimism] = useState(false);
  const [useBatch, setUseBatch] = useState(false);

  const txTypes: Record<string, { gas: number; label: string }> = {
    transfer: { gas: 21000, label: 'ETH Transfer' },
    swap: { gas: 150000, label: 'Uniswap Swap' },
    nft: { gas: 85000, label: 'NFT Mint' },
    erc20: { gas: 65000, label: 'ERC20 Transfer' },
  };

  const baseGas = txTypes[txType].gas;
  const currentGasPrice = 32;
  const optimisticGasPrice = 2;
  
  const standardCost = (baseGas * currentGasPrice) / 1e9;
  const optimizedCost = (baseGas * optimisticGasPrice) / 1e9;
  const savings = standardCost - optimizedCost;
  const savingsPercent = (savings / standardCost) * 100;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Standard Cost</span>
          </div>
          <p className="text-2xl font-bold text-white">${standardCost.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Optimized Cost</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${optimizedCost.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Savings</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">${savings.toFixed(2)} ({savingsPercent.toFixed(0)}%)</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Time Saved</span>
          </div>
          <p className="text-2xl font-bold text-white">~85%</p>
        </div>
      </div>

      {/* Config */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Optimization Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Transaction Type</label>
            <select
              value={txType}
              onChange={(e) => setTxType(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              {Object.entries(txTypes).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="optimism"
              checked={useOptimism}
              onChange={(e) => setUseOptimism(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="optimism" className="text-white">Use Layer 2 (Optimism)</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="batch"
              checked={useBatch}
              onChange={(e) => setUseBatch(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="batch" className="text-white">Batch Transactions</label>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Optimization Tips</h3>
        <div className="space-y-3">
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-medium">Use Layer 2 Networks</p>
            <p className="text-slate-300 text-sm">Save up to 95% on gas fees by using Optimism, Arbitrum, or Polygon</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 font-medium">Batch Transactions</p>
            <p className="text-slate-300 text-sm">Combine multiple operations into one transaction to reduce overhead</p>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-purple-400 font-medium">Time Your Transactions</p>
            <p className="text-slate-300 text-sm">Gas is lower during weekends and off-peak hours (12am-6am UTC)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasOptimizationTool;