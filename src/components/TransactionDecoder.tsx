import { useState } from 'react';
import { FileText, Search, Copy, ArrowRight, Hash } from 'lucide-react';

interface DecodedTx {
  to: string;
  from: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  data: string;
  method: string;
  params: Record<string, string>;
}

const TransactionDecoder: React.FC = () => {
  const [rawTx, setRawTx] = useState('');
  const [decoded, setDecoded] = useState<DecodedTx | null>(null);

  const decodeTx = () => {
    if (!rawTx) return;
    
    const mockDecoded: DecodedTx = {
      to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0e3A2',
      value: '0.5 ETH',
      gasLimit: '100000',
      gasPrice: '30 Gwei',
      data: '0x38ed1729000000000000000000000000...',
      method: 'swapExactETHForTokens',
      params: {
        amountOutMin: '1000000000000000000',
        path: 'ETH -> USDC',
        to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0e3A2',
        deadline: '1705123456',
      },
    };
    setDecoded(mockDecoded);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <label className="text-slate-400 text-sm mb-2 block">Raw Transaction Data</label>
        <textarea
          value={rawTx}
          onChange={(e) => setRawTx(e.target.value)}
          placeholder="Enter raw transaction hex..."
          className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg h-24 font-mono text-sm"
        />
        <button
          onClick={decodeTx}
          disabled={!rawTx}
          className="mt-3 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          Decode Transaction
        </button>
      </div>

      {/* Decoded Result */}
      {decoded && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold">Decoded Transaction</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <span className="text-slate-400 text-sm">Method</span>
              <p className="text-purple-400 font-medium">{decoded.method}</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <span className="text-slate-400 text-sm">Value</span>
              <p className="text-white font-medium">{decoded.value}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-400">From</span>
              <span className="text-white font-mono text-sm">{decoded.from.slice(0, 10)}...{decoded.from.slice(-8)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-400">To</span>
              <span className="text-white font-mono text-sm">{decoded.to.slice(0, 10)}...{decoded.to.slice(-8)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-400">Gas Limit</span>
              <span className="text-white">{decoded.gasLimit}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-400">Gas Price</span>
              <span className="text-white">{decoded.gasPrice}</span>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-white font-medium mb-2">Parameters</h4>
            <div className="space-y-2">
              {Object.entries(decoded.params).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{key}</span>
                  <span className="text-white font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDecoder;