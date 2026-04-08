import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface OrderLevel {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  baseToken?: string;
  quoteToken?: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ 
  baseToken = 'BTC', 
  quoteToken = 'USDT' 
}) => {
  const [precision, setPrecision] = useState<2 | 4>(2);

  // Generate mock order book data
  const generateOrders = (): { bids: OrderLevel[]; asks: OrderLevel[] } => {
    const basePrice = 42500;
    const bids: OrderLevel[] = [];
    const asks: OrderLevel[] = [];
    
    let bidTotal = 0;
    let askTotal = 0;
    
    for (let i = 0; i < 15; i++) {
      const bidPrice = basePrice - i * 0.5;
      const bidAmount = Math.random() * 2 + 0.1;
      bidTotal += bidAmount;
      bids.push({ price: bidPrice, amount: bidAmount, total: bidTotal });
      
      const askPrice = basePrice + (i + 1) * 0.5;
      const askAmount = Math.random() * 2 + 0.1;
      askTotal += askAmount;
      asks.push({ price: askPrice, amount: askAmount, total: askTotal });
    }
    
    return { bids, asks };
  };

  const { bids, asks } = generateOrders();
  const maxTotal = Math.max(bids[bids.length - 1]?.total || 0, asks[asks.length - 1]?.total || 0);

  const spread = ((asks[0]?.price || 0) - (bids[0]?.price || 0)).toFixed(2);
  const spreadPercent = (((asks[0]?.price || 0) - (bids[0]?.price || 0)) / (bids[0]?.price || 1) * 100).toFixed(3);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold">Order Book</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPrecision(2)}
            className={`px-2 py-1 text-xs rounded ${precision === 2 ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}
          >
            0.01
          </button>
          <button
            onClick={() => setPrecision(4)}
            className={`px-2 py-1 text-xs rounded ${precision === 4 ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}
          >
            0.0001
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-slate-900/50 text-xs text-slate-400">
        <span>Price ({quoteToken})</span>
        <span className="text-right">Amount ({baseToken})</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders) - reversed to show lowest at bottom */}
      <div className="border-b border-slate-700">
        {asks.slice(0, 10).reverse().map((ask, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 gap-2 px-4 py-1 text-xs relative">
            <div 
              className="absolute right-0 top-0 bottom-0 bg-red-500/20"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <span className="text-red-400 relative z-10">{ask.price.toFixed(precision)}</span>
            <span className="text-right text-slate-300 relative z-10">{ask.amount.toFixed(4)}</span>
            <span className="text-right text-slate-400 relative z-10">{ask.total.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* Spread indicator */}
      <div className="px-4 py-2 bg-slate-900/50 flex items-center justify-center gap-2">
        <span className="text-lg font-bold text-white">{bids[0]?.price.toFixed(precision)}</span>
        <span className="text-slate-500">=</span>
        <span className="text-sm text-slate-400">
          Spread: {spread} ({spreadPercent}%)
        </span>
      </div>

      {/* Bids (Buy Orders) */}
      <div>
        {bids.slice(0, 10).map((bid, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 gap-2 px-4 py-1 text-xs relative">
            <div 
              className="absolute right-0 top-0 bottom-0 bg-green-500/20"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="text-green-400 relative z-10">{bid.price.toFixed(precision)}</span>
            <span className="text-right text-slate-300 relative z-10">{bid.amount.toFixed(4)}</span>
            <span className="text-right text-slate-400 relative z-10">{bid.total.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-3 bg-slate-900/30 border-t border-slate-700 grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400">24h Volume: </span>
          <span className="text-white font-medium">12,543 {baseToken}</span>
        </div>
        <div>
          <span className="text-slate-400">Market: </span>
          <span className="text-green-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;