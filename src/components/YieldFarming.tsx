import React, { useState } from 'react';
import {
  Sprout,
  TrendingUp,
  DollarSign,
  Clock,
  Lock,
  Unlock,
  PieChart,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';

interface Pool {
  id: number;
  name: string;
  pair: string;
  apy: number;
  tvl: number;
  staked: number;
  earned: number;
  lockPeriod: number;
  status: 'active' | 'filled' | 'ended';
}

const YieldFarming: React.FC = () => {
  const [pools] = useState<Pool[]>([
    {
      id: 1,
      name: 'BTC-USDT LP',
      pair: 'BTC/USDT',
      apy: 45.5,
      tvl: 12500000,
      staked: 0,
      earned: 0.12543,
      lockPeriod: 0,
      status: 'active',
    },
    {
      id: 2,
      name: 'ETH-BNB LP',
      pair: 'ETH/BNB',
      apy: 62.3,
      tvl: 8750000,
      staked: 500,
      earned: 2.45321,
      lockPeriod: 30,
      status: 'active',
    },
    {
      id: 3,
      name: 'SOL-USDC LP',
      pair: 'SOL/USDC',
      apy: 38.7,
      tvl: 5420000,
      staked: 0,
      earned: 0,
      lockPeriod: 0,
      status: 'active',
    },
    {
      id: 4,
      name: 'DOGE-SHIB LP',
      pair: 'DOGE/SHIB',
      apy: 125.0,
      tvl: 2340000,
      staked: 10000,
      earned: 156.78,
      lockPeriod: 7,
      status: 'active',
    },
    {
      id: 5,
      name: 'BNB-CAKE LP',
      pair: 'BNB/CAKE',
      apy: 89.2,
      tvl: 4230000,
      staked: 0,
      earned: 0.02345,
      lockPeriod: 0,
      status: 'filled',
    },
  ]);

  const totalStaked = pools.reduce((sum, p) => sum + p.staked, 0);
  const totalEarned = pools.reduce((sum, p) => sum + p.earned, 0);
  const totalAPY = pools.length > 0 ? pools.reduce((sum, p) => sum + p.apy, 0) / pools.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Sprout className="w-10 h-10 text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Yield Farming</h1>
            <p className="text-slate-400 text-sm">Stake and earn passive income</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Staked</p>
                <p className="text-2xl font-bold text-white">${totalStaked.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Earned</p>
                <p className="text-2xl font-bold text-green-400">${totalEarned.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg APY</p>
                <p className="text-2xl font-bold text-purple-400">{totalAPY.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Pools</p>
                <p className="text-2xl font-bold text-blue-400">
                  {pools.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Positions */}
        {totalStaked > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 mb-6 overflow-hidden">
            <div className="p-5 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-white">My Positions</h2>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-sm">
                    <th className="text-left pb-4">Pool</th>
                    <th className="text-right pb-4">Staked</th>
                    <th className="text-right pb-4">APY</th>
                    <th className="text-right pb-4">Earned</th>
                    <th className="text-center pb-4">Lock</th>
                    <th className="text-right pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pools
                    .filter(p => p.staked > 0)
                    .map(pool => (
                      <tr key={pool.id} className="border-t border-slate-700/50">
                        <td className="py-4">
                          <div>
                            <p className="font-semibold text-white">{pool.name}</p>
                            <p className="text-sm text-slate-400">{pool.pair}</p>
                          </div>
                        </td>
                        <td className="text-right py-4">
                          <p className="text-white font-medium">${pool.staked.toLocaleString()}</p>
                        </td>
                        <td className="text-right py-4">
                          <p className="text-green-400 font-medium">{pool.apy}% APY</p>
                        </td>
                        <td className="text-right py-4">
                          <p className="text-green-400 font-medium">${pool.earned.toFixed(4)}</p>
                        </td>
                        <td className="py-4 text-center">
                          {pool.lockPeriod > 0 ? (
                            <div className="flex items-center gap-1 justify-center text-yellow-400">
                              <Lock className="w-4 h-4" />
                              <span className="text-sm">{pool.lockPeriod}d</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 justify-center text-green-400">
                              <Unlock className="w-4 h-4" />
                              <span className="text-sm">No Lock</span>
                            </div>
                          )}
                        </td>
                        <td className="text-right py-4">
                          <div className="flex gap-2 justify-end">
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded">
                              Harvest
                            </button>
                            <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded">
                              Unstake
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

        {/* Available Pools */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Available Pools</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Active: {pools.filter(p => p.status === 'active').length}
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                Filled: {pools.filter(p => p.status === 'filled').length}
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pools.map(pool => (
                <div
                  key={pool.id}
                  className={`bg-slate-700/50 rounded-xl p-5 border ${
                    pool.status === 'active'
                      ? 'border-green-500/30 hover:border-green-500/60'
                      : pool.status === 'filled'
                        ? 'border-yellow-500/30'
                        : 'border-red-500/30'
                  } transition-all cursor-pointer hover:transform hover:scale-105`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{pool.name}</h3>
                      <p className="text-slate-400 text-sm">{pool.pair}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pool.status === 'active'
                          ? 'bg-green-500 text-white'
                          : pool.status === 'filled'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                      }`}
                    >
                      {pool.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">APY</span>
                      <span className="text-green-400 font-bold text-xl">{pool.apy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">TVL</span>
                      <span className="text-white font-medium">
                        ${(pool.tvl / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    {pool.lockPeriod > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Lock Period
                        </span>
                        <span className="text-yellow-400 font-medium">{pool.lockPeriod} days</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-600">
                    {pool.status === 'active' ? (
                      <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
                        <Unlock className="w-4 h-4" />
                        Stake Now
                      </button>
                    ) : pool.status === 'filled' ? (
                      <div className="flex items-center gap-2 text-yellow-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Pool capacity reached
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Pool ended
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-1">Farming Tips</h4>
            <p className="text-slate-300 text-sm">
              Higher APY pools often come with higher risk. Always DYOR (Do Your Own Research)
              before staking. Consider impermanent loss risks when providing liquidity to LP pools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldFarming;
