import { useState } from 'react';
import { AlertTriangle, Target, TrendingUp, TrendingDown, Plus, Trash2 } from 'lucide-react';

interface Order {
  id: number;
  type: 'stop-loss' | 'take-profit';
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  triggered: boolean;
}

interface StopLossTakeProfitProps {
  currentPrice?: number;
  symbol?: string;
}

const StopLossTakeProfit: React.FC<StopLossTakeProfitProps> = ({
  currentPrice = 42500,
  symbol = 'BTC/USDT'
}) => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, type: 'stop-loss', side: 'sell', price: 40000, amount: 0.5, triggered: false },
    { id: 2, type: 'take-profit', side: 'sell', price: 45000, amount: 0.5, triggered: false },
  ]);

  const [newOrder, setNewOrder] = useState({
    type: 'stop-loss' as 'stop-loss' | 'take-profit',
    side: 'sell' as 'buy' | 'sell',
    price: currentPrice,
    amount: 0.1,
  });

  const addOrder = () => {
    const order: Order = {
      id: Date.now(),
      ...newOrder,
      triggered: false,
    };
    setOrders([...orders, order]);
  };

  const removeOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const profitLoss = orders
    .filter(o => o.type === 'take-profit' && o.side === 'sell')
    .reduce((acc, o) => acc + (o.price - currentPrice) * o.amount, 0);

  const stopLossRisk = orders
    .filter(o => o.type === 'stop-loss' && o.side === 'sell')
    .reduce((acc, o) => acc + (currentPrice - o.price) * o.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-slate-400 text-sm">Total Risk</span>
          </div>
          <p className="text-2xl font-bold text-red-400">${stopLossRisk.toFixed(2)}</p>
          <p className="text-xs text-slate-500">If stop-loss triggered</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Profit Potential</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${profitLoss.toFixed(2)}</p>
          <p className="text-xs text-slate-500">If take-profit reached</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Active Orders</span>
          </div>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
          <p className="text-xs text-slate-500">{symbol}</p>
        </div>
      </div>

      {/* Create New Order */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-purple-400" />
          Create New Order
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <select
            value={newOrder.type}
            onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value as any })}
            className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="stop-loss">Stop-Loss</option>
            <option value="take-profit">Take-Profit</option>
          </select>

          <select
            value={newOrder.side}
            onChange={(e) => setNewOrder({ ...newOrder, side: e.target.value as any })}
            className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="sell">Sell</option>
            <option value="buy">Buy</option>
          </select>

          <input
            type="number"
            value={newOrder.price}
            onChange={(e) => setNewOrder({ ...newOrder, price: parseFloat(e.target.value) || 0 })}
            placeholder="Price"
            className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            value={newOrder.amount}
            onChange={(e) => setNewOrder({ ...newOrder, amount: parseFloat(e.target.value) || 0 })}
            placeholder="Amount"
            className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={addOrder}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-3 py-2 text-sm font-medium"
          >
            Add Order
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-400">
          Current Price: <span className="text-white font-medium">${currentPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Active Orders</h3>
        </div>

        <div className="divide-y divide-slate-700">
          {orders.map(order => (
            <div key={order.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  order.type === 'stop-loss' ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}>
                  {order.type === 'stop-loss' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Target className="w-5 h-5 text-green-400" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      order.type === 'stop-loss' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {order.type === 'stop-loss' ? 'Stop-Loss' : 'Take-Profit'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      order.side === 'sell' 
                        ? 'bg-red-500/20 text-red-300' 
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {order.side.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    @ ${order.price.toLocaleString()} · {order.amount} {symbol.split('/')[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${(order.price * order.amount).toLocaleString()}
                  </p>
                  <p className={`text-xs ${
                    order.side === 'sell' 
                      ? order.price < currentPrice ? 'text-green-400' : 'text-red-400'
                      : order.price > currentPrice ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {order.side === 'sell' 
                      ? order.price < currentPrice ? 'In profit' : 'At loss'
                      : order.price > currentPrice ? 'In profit' : 'At loss'
                    }
                  </p>
                </div>
                <button
                  onClick={() => removeOrder(order.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No active orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StopLossTakeProfit;