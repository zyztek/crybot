import { useState } from 'react';
import {
  TrendingUp,
  Shield,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Percent,
} from 'lucide-react';

interface SupplyPosition {
  asset: string;
  supplied: number;
  apy: number;
  value: number;
}

interface BorrowPosition {
  asset: string;
  borrowed: number;
  apy: number;
  value: number;
}

export default function LendingProtocol() {
  const [supplyPositions] = useState<SupplyPosition[]>([
    { asset: 'USDC', supplied: 5000, apy: 4.5, value: 5000 },
    { asset: 'ETH', supplied: 2.5, apy: 2.1, value: 4625.5 },
    { asset: 'WBTC', supplied: 0.5, apy: 1.8, value: 22500 },
  ]);

  const [borrowPositions] = useState<BorrowPosition[]>([
    { asset: 'USDC', borrowed: 2500, apy: 5.2, value: 2500 },
    { asset: 'ETH', borrowed: 1, apy: 3.5, value: 1850 },
  ]);

  const totalSupplied = supplyPositions.reduce((sum, p) => sum + p.value, 0);
  const totalBorrowed = borrowPositions.reduce((sum, p) => sum + p.value, 0);
  const healthFactor = 1.85;
  const borrowLimit = totalSupplied * 0.75;
  const availableToBorrow = borrowLimit - totalBorrowed;
  const utilizationRate = ((totalBorrowed / borrowLimit) * 100).toFixed(2);

  const markets = [
    { asset: 'USDC', supplyApy: 4.5, borrowApy: 5.2, liquidity: '$45M', factor: 0.9 },
    { asset: 'ETH', supplyApy: 2.1, borrowApy: 3.5, liquidity: '$125M', factor: 0.82 },
    { asset: 'WBTC', supplyApy: 1.8, borrowApy: 3.2, liquidity: '$89M', factor: 0.85 },
    { asset: 'USDT', supplyApy: 3.8, borrowApy: 4.8, liquidity: '$32M', factor: 0.9 },
    { asset: 'DAI', supplyApy: 2.9, borrowApy: 4.5, liquidity: '$28M', factor: 0.9 },
    { asset: 'LINK', supplyApy: 1.5, borrowApy: 4.1, liquidity: '$12M', factor: 0.75 },
    { asset: 'AAVE', supplyApy: 0.8, borrowApy: 2.8, liquidity: '$8M', factor: 0.7 },
  ];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [supplyAmount, setSupplyAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('USDC');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              Lending Protocol
            </h1>
            <p className="text-gray-400">Lend and borrow assets securely on-chain</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2 text-green-400 font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              TVL: $345.6M
            </div>
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl px-4 py-2 text-blue-400 font-semibold flex items-center gap-2">
              <Percent className="w-5 h-5" />
              Avg APY: 2.8%
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'dashboard', name: 'Dashboard' },
          { id: 'supply', name: 'Supply' },
          { id: 'borrow', name: 'Borrow' },
          { id: 'repay', name: 'Repay' },
          { id: 'markets', name: 'Markets' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-medium">Total Supplied</span>
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                ${totalSupplied.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-green-400 text-sm mt-2">+$234.50 (24h)</div>
            </div>

            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-medium">Total Borrowed</span>
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                ${totalBorrowed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-red-400 text-sm mt-2">-$89.20 (24h)</div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-medium">Available to Borrow</span>
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                ${availableToBorrow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-purple-400 text-sm mt-2">
                ${borrowLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })} limit
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-medium">Health Factor</span>
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{healthFactor.toFixed(2)}</div>
              <div
                className={`text-sm mt-2 ${healthFactor > 1.5 ? 'text-green-400' : healthFactor > 1.2 ? 'text-yellow-400' : 'text-red-400'}`}
              >
                {healthFactor > 1.5 ? 'Safe' : healthFactor > 1.2 ? 'Caution' : 'Danger'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Supply Positions */}
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-6 h-6 text-green-400" />
                Supply Positions
              </h2>
              <div className="space-y-3">
                {supplyPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-bold text-white">
                          {pos.supplied.toLocaleString()} {pos.asset}
                        </div>
                        <div className="text-gray-400 text-sm">
                          ${pos.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">{pos.apy}% APY</div>
                        <div className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Daily: $0.61
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Borrow Positions */}
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ArrowDownRight className="w-6 h-6 text-red-400" />
                Borrow Positions
              </h2>
              <div className="space-y-3">
                {borrowPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-bold text-white">
                          {pos.borrowed.toLocaleString()} {pos.asset}
                        </div>
                        <div className="text-gray-400 text-sm">
                          ${pos.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-400 font-bold text-lg">{pos.apy}% APY</div>
                        <div className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Daily: -$0.45
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'supply' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Supply Assets</h2>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Select Asset</label>
              <select
                value={selectedMarket}
                onChange={e => setSelectedMarket(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white font-semibold outline-none focus:border-blue-500"
              >
                {markets.map(m => (
                  <option key={m.asset} value={m.asset}>
                    {m.asset} - {m.supplyApy}% APY
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Amount</label>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <input
                  type="number"
                  value={supplyAmount}
                  onChange={e => setSupplyAmount(e.target.value)}
                  className="w-full bg-transparent text-xl text-white font-bold outline-none"
                  placeholder="0.00"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-400">Selected Asset: {selectedMarket}</span>
                  <span className="text-blue-400 cursor-pointer hover:underline">MAX</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Supply APY</span>
                <span className="text-green-400 font-semibold">
                  {markets.find(m => m.asset === selectedMarket)?.supplyApy}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Collateral Factor</span>
                <span className="text-white font-semibold">
                  {markets.find(m => m.asset === selectedMarket)?.factor}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Liquidity</span>
                <span className="text-white font-semibold">
                  {markets.find(m => m.asset === selectedMarket)?.liquidity}
                </span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all">
              Supply {selectedMarket}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'borrow' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Borrow Assets</h2>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Select Asset</label>
              <select
                value={selectedMarket}
                onChange={e => setSelectedMarket(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white font-semibold outline-none focus:border-red-500"
              >
                {markets.map(m => (
                  <option key={m.asset} value={m.asset}>
                    {m.asset} - {m.borrowApy}% APY
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Amount</label>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={e => setBorrowAmount(e.target.value)}
                  className="w-full bg-transparent text-xl text-white font-bold outline-none"
                  placeholder="0.00"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-400">
                    Avail: $
                    {(parseFloat(borrowAmount) > 0
                      ? parseFloat(borrowAmount) * 1850
                      : availableToBorrow
                    ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-red-400 cursor-pointer hover:underline">MAX</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Borrow APY</span>
                <span className="text-red-400 font-semibold">
                  {markets.find(m => m.asset === selectedMarket)?.borrowApy}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Collateral Factor</span>
                <span className="text-white font-semibold">
                  {markets.find(m => m.asset === selectedMarket)?.factor}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Health</span>
                <span
                  className={`font-semibold ${healthFactor > 1.5 ? 'text-green-400' : 'text-yellow-400'}`}
                >
                  {healthFactor.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">After Borrow</span>
                <span className="text-yellow-400 font-semibold">1.72</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all">
              Borrow {selectedMarket}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'repay' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Repay Assets</h2>
          <div className="space-y-4">
            {borrowPositions.map((pos, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-white">
                      Borrowed: {pos.borrowed.toLocaleString()} {pos.asset}
                    </div>
                    <div className="text-gray-400 text-sm">
                      ${pos.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} @ {pos.apy}
                      % APY
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-xl transition-all">
                  Repay {pos.asset}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'markets' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">All Markets</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="pb-4 pr-4">Asset</th>
                  <th className="pb-4 pr-4">Supply APY</th>
                  <th className="pb-4 pr-4">Borrow APY</th>
                  <th className="pb-4 pr-4">Total Liquidity</th>
                  <th className="pb-4 pr-4">Collateral Factor</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {markets.map((market, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="py-4 pr-4">
                      <div className="font-bold text-lg">{market.asset}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400 font-semibold">{market.supplyApy}%</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-red-400 font-semibold">{market.borrowApy}%</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white">{market.liquidity}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white">{market.factor}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                          Supply
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                          Borrow
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
