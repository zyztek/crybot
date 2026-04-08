import { useState } from 'react';
import { Fuel, Zap, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const GasFeePredictor: React.FC = () => {
  const [txType, setTxType] = useState('transfer');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  const gasData = {
    baseFee: 32,
    priorityFee: 2,
    gasPrice: 34,
    trend: 'up' as const,
    predicted: 38,
  };

  const txTypes: Record<string, { gas: number; label: string }> = {
    transfer: { gas: 21000, label: 'ETH Transfer' },
    swap: { gas: 150000, label: 'Uniswap Swap' },
    nft: { gas: 85000, label: 'NFT Mint' },
    contract: { gas: 200000, label: 'Contract Deploy' },
    erc20: { gas: 65000, label: 'ERC20 Transfer' },
  };

  const currentTx = txTypes[txType];
  const estimatedCost = (currentTx.gas * gasData.gasPrice) / 1e9;

  const urgencyMultiplier = { low: 0.8, medium: 1, high: 1.3 };
  const adjustedCost = estimatedCost * urgencyMultiplier[urgency];

  return (
    <div className="space-y-6">
      {/* Current Gas Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Base Fee</span>
          </div>
          <p className="text-2xl font-bold text-white">{gasData.baseFee} Gwei</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Gas Price</span>
          </div>
          <p className="text-2xl font-bold text-white">{gasData.gasPrice} Gwei</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            {gasData.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-red-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-400" />
            )}
            <span className="text-slate-400 text-sm">Trend</span>
          </div>
          <p className={`text-2xl font-bold ${gasData.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
            {gasData.trend === 'up' ? 'Rising' : 'Falling'}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Predicted (1h)</span>
          </div>
          <p className="text-2xl font-bold text-white">{gasData.predicted} Gwei</p>
        </div>
      </div>

      {/* Calculator */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Estimate Transaction Cost</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-slate-400 text-sm block mb-2">Transaction Type</label>
            <select
              value={txType}
              onChange={(e) => setTxType(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg"
            >
              {Object.entries(txTypes).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-slate-400 text-sm block mb-2">Urgency</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setUrgency(level)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    urgency === level
                      ? level === 'low' ? 'bg-green-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      : 'bg-slate-700 text-slate-400'
                  } text-white`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-slate-400 text-sm block mb-2">Gas Limit</label>
            <input
              type="number"
              value={currentTx.gas}
              readOnly
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Estimated Cost</p>
          <p className="text-4xl font-bold text-white">${adjustedCost.toFixed(4)}</p>
          <p className="text-slate-400 text-sm">{currentTx.gas} × {Math.round(gasData.gasPrice * urgencyMultiplier[urgency])} Gwei</p>
        </div>
      </div>

      {/* Timing Recommendation */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">Timing Recommendation</h4>
        <div className="flex items-center gap-4">
          {gasData.trend === 'up' ? (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400">Gas prices rising - transact now to save</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400">Gas prices stable - good time to transact</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GasFeePredictor;