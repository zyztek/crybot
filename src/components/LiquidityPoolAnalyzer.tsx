import { useState } from 'react'
import { Droplets, TrendingUp, DollarSign, Percent, Wallet, Activity } from 'lucide-react'

interface Pool {
  pair: string
  token0: string
  token1: string
  tvl: number
  volume24h: number
  fees24h: number
  apy: number
  apr: number
  myLiquidity?: number
  myShare?: number
}

export default function LiquidityPoolAnalyzer() {
  const pools: Pool[] = [
    { pair: 'USDC-ETH', token0: 'USDC', token1: 'ETH', tvl: 125400000, volume24h: 8920000, fees24h: 26760, apy: 7.8, apr: 7.2, myLiquidity: 5000, myShare: 0.004 },
    { pair: 'WBTC-ETH', token0: 'WBTC', token1: 'ETH', tvl: 89500000, volume24h: 5670000, fees24h: 17010, apy: 6.9, apr: 6.4, myLiquidity: 0, myShare: 0 },
    { pair: 'USDT-USDC', token0: 'USDT', token1: 'USDC', tvl: 67800000, volume24h: 12500000, fees24h: 37500, apy: 20.2, apr: 18.5 },
    { pair: 'LINK-ETH', token0: 'LINK', token1: 'ETH', tvl: 45600000, volume24h: 2340000, fees24h: 7020, apy: 5.6, apr: 5.2 },
    { pair: 'AAVE-ETH', token0: 'AAVE', token1: 'ETH', tvl: 34200000, volume24h: 1890000, fees24h: 5670, apy: 6.1, apr: 5.7 },
    { pair: 'UNI-ETH', token0: 'UNI', token1: 'ETH', tvl: 28900000, volume24h: 1450000, fees24h: 4350, apy: 5.5, apr: 5.1 },
  ]

  const [selectedPool, setSelectedPool] = useState<Pool | null>(pools[0])
  const [lpTokenAmount, setLpTokenAmount] = useState('')
  const [activeTab, setActiveTab] = useState('discover')

  const myTotalLiquidity = pools.reduce((sum, p) => sum + (p.myLiquidity || 0), 0)
  const myTotalFees = myTotalLiquidity * 0.05

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(2)}K`
    return `$${val.toFixed(2)}`
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl border border-teal-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Droplets className="w-8 h-8 text-teal-400" />
              Liquidity Pool Analyzer
            </h1>
            <p className="text-gray-400">Analyze and manage liquidity pools across DEXs</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-teal-500/20 border border-teal-500/50 rounded-xl px-4 py-2 text-teal-400 font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              TVL: $391.4M
            </div>
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2 text-green-400 font-semibold flex items-center gap-2">
              <Percent className="w-5 h-5" />
              Avg APY: 8.7%
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'discover', name: 'Discover', icon: Activity },
          { id: 'my-liquidity', name: 'My Liquidity', icon: Wallet },
          { id: 'add-liquidity', name: 'Add Liquidity', icon: Droplets },
          { id: 'remove-liquidity', name: 'Remove Liquidity', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'discover' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Top Liquidity Pools</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="pb-4 pr-4">Pool</th>
                  <th className="pb-4 pr-4">TVL</th>
                  <th className="pb-4 pr-4">Volume 24h</th>
                  <th className="pb-4 pr-4">Fees 24h</th>
                  <th className="pb-4 pr-4">APY</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {pools.map((pool, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer" onClick={() => setSelectedPool(pool)}>
                    <td className="py-4 pr-4">
                      <div className="font-bold text-lg">{pool.pair}</div>
                      <div className="text-gray-400 text-sm">{pool.token0} / {pool.token1}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white font-semibold">{formatCurrency(pool.tvl)}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white">{formatCurrency(pool.volume24h)}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400 font-semibold">{formatCurrency(pool.fees24h)}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-teal-400 font-bold text-lg">{pool.apy}%</span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">Add</button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'my-liquidity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">My Liquidity Positions</h2>
            <div className="space-y-4">
              {pools.filter(p => p.myLiquidity && p.myLiquidity > 0).map((pool, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xl font-bold text-white">{pool.pair}</div>
                      <div className="text-gray-400 text-sm">{pool.token0} / {pool.token1}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">${pool.myLiquidity?.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">{pool.myShare?.toFixed(4)}% share</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">APY</div>
                      <div className="text-teal-400 font-semibold">{pool.apy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Daily Fees</div>
                      <div className="text-green-400 font-semibold">${((pool.myLiquidity || 0) * pool.apy / 100 / 365).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Volume 24h</div>
                      <div className="text-white">{formatCurrency(pool.volume24h)}</div>
                    </div>
                  </div>
                </div>
              ))}
              {pools.filter(p => p.myLiquidity && p.myLiquidity > 0).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No liquidity positions yet. Add liquidity to start earning!
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Summary</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-teal-600/20 to-emerald-600/20 rounded-xl p-5 border border-teal-500/30">
                <div className="text-gray-400 mb-2">Total Liquidity</div>
                <div className="text-3xl font-bold text-white">${myTotalLiquidity.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-xl p-5 border border-green-500/30">
                <div className="text-gray-400 mb-2">Estimated Daily Fees</div>
                <div className="text-3xl font-bold text-green-400">${myTotalFees.toFixed(2)}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-5 border border-purple-500/30">
                <div className="text-gray-400 mb-2">Estimated Monthly</div>
                <div className="text-3xl font-bold text-purple-400">${(myTotalFees * 30).toFixed(2)}</div>
              </div>
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-5 border border-blue-500/30">
                <div className="text-gray-400 mb-2">Number of Positions</div>
                <div className="text-3xl font-bold text-blue-400">{pools.filter(p => p.myLiquidity && p.myLiquidity > 0).length}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add-liquidity' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Liquidity</h2>
          {selectedPool && (
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Pool: {selectedPool.pair}</label>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <input
                    type="number"
                    value={lpTokenAmount}
                    onChange={(e) => setLpTokenAmount(e.target.value)}
                    className="w-full bg-transparent text-2xl text-white font-bold outline-none"
                    placeholder="0.00"
                  />
                  <div className="text-gray-400 text-sm mt-2">LP Tokens</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">{selectedPool.token0}</div>
                  <div className="text-xl font-bold text-white">{((parseFloat(lpTokenAmount) || 0) * 0.5).toFixed(4)}</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">{selectedPool.token1}</div>
                  <div className="text-xl font-bold text-white">{((parseFloat(lpTokenAmount) || 0) * 0.27).toFixed(6)}</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pool APY</span>
                  <span className="text-teal-400 font-semibold">{selectedPool.apy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Your Share</span>
                  <span className="text-white font-semibold">{((parseFloat(lpTokenAmount) || 0) / selectedPool.tvl * 100).toFixed(4)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Daily</span>
                  <span className="text-green-400 font-semibold">${((parseFloat(lpTokenAmount) || 0) * selectedPool.apy / 100 / 365).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all">
                Add Liquidity
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'remove-liquidity' && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Remove Liquidity</h2>
          <div className="space-y-4">
            {pools.filter(p => p.myLiquidity && p.myLiquidity > 0).map((pool, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-white">{pool.pair}</div>
                    <div className="text-gray-400 text-sm">{pool.myLiquidity?.toLocaleString()} LP Tokens</div>
                  </div>
                  <div className="text-2xl font-bold text-white">${pool.myLiquidity?.toLocaleString()}</div>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all">
                  Remove All
                </button>
              </div>
            ))}
            {pools.filter(p => p.myLiquidity && p.myLiquidity > 0).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No liquidity positions to remove.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}