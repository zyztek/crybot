import { useState } from 'react'
import { Users, TrendingUp, Copy, ExternalLink, Star, Trophy, CheckCircle, AlertCircle, Handshake, Eye, RefreshCw, Filter } from 'lucide-react'

interface Trader {
  id: number
  username: string
  avatar: string
  roi: number
  profit: number
  trades: number
  winRate: number
  followers: number
  copiers: number
  riskLevel: 'low' | 'medium' | 'high'
  streak: number
  isVerified: boolean
  badge?: 'top' | 'verified' | 'rising'
}

const traders: Trader[] = [
  {
    id: 1,
    username: 'CryptoWhale',
    avatar: '🐋',
    roi: 245.67,
    profit: 45678,
    trades: 1247,
    winRate: 78,
    followers: 12450,
    copiers: 856,
    riskLevel: 'medium',
    streak: 12,
    isVerified: true,
    badge: 'top'
  },
  {
    id: 2,
    username: 'SatoshiJr',
    avatar: '⚡',
    roi: 189.34,
    profit: 34567,
    trades: 892,
    winRate: 72,
    followers: 8923,
    copiers: 543,
    riskLevel: 'low',
    streak: 8,
    isVerified: true,
    badge: 'verified'
  },
  {
    id: 3,
    username: 'DeFiMaster',
    avatar: '🦊',
    roi: 156.78,
    profit: 28945,
    trades: 756,
    winRate: 81,
    followers: 6789,
    copiers: 412,
    riskLevel: 'high',
    streak: 5,
    isVerified: true,
    badge: 'rising'
  },
  {
    id: 4,
    username: 'MoonBoy',
    avatar: '🌙',
    roi: 134.56,
    profit: 23456,
    trades: 1023,
    winRate: 69,
    followers: 5678,
    copiers: 378,
    riskLevel: 'high',
    streak: 3,
    isVerified: false
  },
  {
    id: 5,
    username: 'StableKing',
    avatar: '👑',
    roi: 98.45,
    profit: 17892,
    trades: 634,
    winRate: 85,
    followers: 4567,
    copiers: 267,
    riskLevel: 'low',
    streak: 7,
    isVerified: true
  },
  {
    id: 6,
    username: 'YieldHunter',
    avatar: '🎯',
    roi: 87.23,
    profit: 15678,
    trades: 542,
    winRate: 76,
    followers: 3456,
    copiers: 198,
    riskLevel: 'medium',
    streak: 4,
    isVerified: false
  },
  {
    id: 7,
    username: 'GridTrader',
    avatar: '📊',
    roi: 76.89,
    profit: 13456,
    trades: 1876,
    winRate: 71,
    followers: 2345,
    copiers: 156,
    riskLevel: 'low',
    streak: 2,
    isVerified: true
  },
  {
    id: 8,
    username: 'SwingLord',
    avatar: '🎭',
    roi: 65.34,
    profit: 11234,
    trades: 423,
    winRate: 68,
    followers: 1234,
    copiers: 89,
    riskLevel: 'medium',
    streak: 6,
    isVerified: false
  }
]

interface MyCopy {
  traderId: number
  traderName: string
  amount: number
  startDate: string
  profit: number
  roi: number
  autoCopy: boolean
  riskMultiplier: number
}

const myCopies: MyCopy[] = [
  {
    traderId: 1,
    traderName: 'CryptoWhale',
    amount: 1000,
    startDate: '2024-01-15',
    profit: 2456.70,
    roi: 245.67,
    autoCopy: true,
    riskMultiplier: 1.0
  },
  {
    traderId: 2,
    traderName: 'SatoshiJr',
    amount: 500,
    startDate: '2024-02-01',
    profit: 946.70,
    roi: 189.34,
    autoCopy: true,
    riskMultiplier: 0.8
  }
]

const SocialTrading = () => {
  const [selectedTab, setSelectedTab] = useState<'traders' | 'my-copies' | 'portfolio'>('traders')
  const [selectedRisk, setSelectedRisk] = useState<string>('all')
  const [selectedBadge, setSelectedBadge] = useState<string>('all')

  const filteredTraders = traders.filter(trader => {
    const matchesRisk = selectedRisk === 'all' || trader.riskLevel === selectedRisk
    const matchesBadge = selectedBadge === 'all' || trader.badge === selectedBadge
    return matchesRisk && matchesBadge
  })

  const riskColors = {
    low: 'bg-green-500/20 text-green-400 border-green-400/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    high: 'bg-red-500/20 text-red-400 border-red-400/30'
  }

  const badgeIcons: Record<string, any> = {
    top: Trophy,
    verified: CheckCircle,
    rising: TrendingUp
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🤝 Social Trading</h1>
          <p className="text-slate-400">Copy top traders and share in their success</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Copiers</p>
                <p className="text-2xl font-bold text-white">{traders.reduce((sum, t) => sum + t.copiers, 0)}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Avg ROI</p>
                <p className="text-2xl font-bold text-green-400">{(traders.reduce((sum, t) => sum + t.roi, 0) / traders.length).toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Top ROI</p>
                <p className="text-2xl font-bold text-white">{Math.max(...traders.map(t => t.roi)).toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Copy className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">My Copies</p>
                <p className="text-2xl font-bold text-white">{myCopies.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['traders', 'my-copies', 'portfolio'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {tab === 'traders' ? 'Top Traders' : tab === 'my-copies' ? 'My Copies' : 'My Portfolio'}
            </button>
          ))}
        </div>

        {selectedTab === 'traders' && (
          <>
            {/* Filters */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
              <div className="flex flex-wrap gap-4">
                <Filter className="w-5 h-5 text-slate-400 self-center" />
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk 🟢</option>
                  <option value="medium">Medium Risk 🟡</option>
                  <option value="high">High Risk 🔴</option>
                </select>
                <select
                  value={selectedBadge}
                  onChange={(e) => setSelectedBadge(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Traders</option>
                  <option value="top">Top Traders 🏆</option>
                  <option value="verified">Verified ✓</option>
                  <option value="rising">Rising Stars 📈</option>
                </select>
              </div>
            </div>

            {/* Traders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTraders.map((trader, index) => (
                <div
                  key={trader.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                        {trader.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">{trader.username}</h3>
                          {trader.isVerified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                          {trader.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              trader.badge === 'top' ? 'bg-yellow-500/20 text-yellow-400' :
                              trader.badge === 'verified' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {trader.badge === 'top' ? '🏆 Top' : trader.badge === 'verified' ? '✓ Verified' : '📈 Rising'}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-sm">#{index + 1} Ranking</span>
                      </div>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300">
                      <Star className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-slate-400 text-sm">ROI</p>
                      <p className="text-xl font-bold text-green-400">+{trader.roi.toFixed(2)}%</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-slate-400 text-sm">Profit</p>
                      <p className="text-xl font-bold text-white">${trader.profit.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-slate-400 text-sm">Win Rate</p>
                      <p className="text-xl font-bold text-white">{trader.winRate}%</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-slate-400 text-sm">Trades</p>
                      <p className="text-xl font-bold text-white">{trader.trades}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${riskColors[trader.riskLevel]}`}>
                      {trader.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                      🔥 {trader.streak} streak
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                      👥 {trader.followers.toLocaleString()} followers
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === 'my-copies' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Trader</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Amount</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Profit</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">ROI</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Auto-Copy</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Risk Multiplier</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCopies.map(copy => (
                  <tr key={copy.traderId} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {copy.traderName[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-white">{copy.traderName}</span>
                          <p className="text-sm text-slate-400">Since {copy.startDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-white">${copy.amount}</td>
                    <td className="px-6 py-4 text-right text-green-400">+${copy.profit.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-green-400">+{copy.roi.toFixed(2)}%</td>
                    <td className="px-6 py-4 text-center">
                      {copy.autoCopy ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">ON</span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs">OFF</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">{copy.riskMultiplier}x</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded text-sm transition-colors">
                          Adjust
                        </button>
                        <button className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded text-sm transition-colors">
                          Stop
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === 'portfolio' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
            <Handshake className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Your Copy Trading Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400">Total Invested</p>
                <p className="text-2xl font-bold text-white">${myCopies.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400">Total Profit</p>
                <p className="text-2xl font-bold text-green-400">+${myCopies.reduce((sum, c) => sum + c.profit, 0).toFixed(2)}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400">Average ROI</p>
                <p className="text-2xl font-bold text-purple-400">+{(myCopies.reduce((sum, c) => sum + c.roi, 0) / myCopies.length).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialTrading