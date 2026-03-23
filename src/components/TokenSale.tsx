import { useState } from 'react'
import { Sparkles, TrendingUp, Users, Clock, DollarSign, Award, Lock, Zap } from 'lucide-react'

interface TokenSale {
  id: number
  name: string
  symbol: string
  description: string
  type: 'IDO' | 'IEO' | 'INO' | 'Private Sale'
  stage: 'Live' | 'Upcoming' | 'Ended'
  startDate: string
  endDate: string
  raiseGoal: number
  currentRaise: number
  tokenPrice: number
  minPurchase: number
  maxPurchase: number
  totalSupply: number
  saleSupply: number
  participants: number
  verified: boolean
  kycRequired: boolean
}

export default function TokenSale() {
  const [selectedSale, setSelectedSale] = useState<TokenSale | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const tokenSales: TokenSale[] = [
    {
      id: 1,
      name: 'Aether Protocol',
      symbol: 'AETH',
      description: 'Next-generation DeFi platform with cross-chain compatibility and AI-powered yield optimization.',
      type: 'IDO',
      stage: 'Live',
      startDate: 'Dec 15, 2024',
      endDate: 'Dec 25, 2024',
      raiseGoal: 250000,
      currentRaise: 187500,
      tokenPrice: 0.05,
      minPurchase: 100,
      maxPurchase: 5000,
      totalSupply: 100000000,
      saleSupply: 5000000,
      participants: 2450,
      verified: true,
      kycRequired: true
    },
    {
      id: 2,
      name: 'Nova Chain',
      symbol: 'NOVA',
      description: 'High-performance L2 blockchain with 100,000+ TPS and near-zero gas fees.',
      type: 'IEO',
      stage: 'Live',
      startDate: 'Dec 10, 2024',
      endDate: 'Jan 10, 2025',
      raiseGoal: 500000,
      currentRaise: 325000,
      tokenPrice: 0.02,
      minPurchase: 50,
      maxPurchase: 10000,
      totalSupply: 500000000,
      saleSupply: 25000000,
      participants: 5200,
      verified: true,
      kycRequired: true
    },
    {
      id: 3,
      name: 'PixelVerse',
      symbol: 'PIXEL',
      description: 'Metaverse gaming platform with NFT integration and play-to-earn mechanics.',
      type: 'INO',
      stage: 'Upcoming',
      startDate: 'Jan 5, 2025',
      endDate: 'Jan 15, 2025',
      raiseGoal: 150000,
      currentRaise: 0,
      tokenPrice: 0.03,
      minPurchase: 50,
      maxPurchase: 2000,
      totalSupply: 1000000000,
      saleSupply: 50000000,
      participants: 0,
      verified: true,
      kycRequired: false
    },
    {
      id: 4,
      name: 'Quantum AI',
      symbol: 'QAI',
      description: 'Decentralized AI computing network powered by quantum-resistant algorithms.',
      type: 'IDO',
      stage: 'Upcoming',
      startDate: 'Jan 20, 2025',
      endDate: 'Feb 5, 2025',
      raiseGoal: 750000,
      currentRaise: 0,
      tokenPrice: 0.08,
      minPurchase: 500,
      maxPurchase: 25000,
      totalSupply: 50000000,
      saleSupply: 9375000,
      participants: 0,
      verified: false,
      kycRequired: true
    },
  ]

  const myParticipations = [
    { name: 'Aether Protocol', symbol: 'AETH', amount: 500, price: 0.05, tokens: 10000, status: ' vested' },
    { name: 'PixelVerse', symbol: 'PIXEL', amount: 200, price: 0.03, tokens: 6666, status: 'pending' },
  ]

  const stats = {
    totalRaised: tokenSales.reduce((sum, s) => sum + s.currentRaise, 0),
    totalGoal: tokenSales.reduce((sum, s) => sum + s.raiseGoal, 0),
    liveSales: tokenSales.filter(s => s.stage === 'Live').length,
    upcomingSales: tokenSales.filter(s => s.stage === 'Upcoming').length,
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Token Sale Platform
            </h1>
            <p className="text-gray-400">Discover and participate in promising token sales</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl px-4 py-2 text-amber-400 font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              ${(stats.totalRaised / 1000).toFixed(0)}K Raised
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl px-4 py-2 text-yellow-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {stats.liveSales} Live
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Total Raised</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">${(stats.totalRaised / 1000).toFixed(0)}K</div>
          <div className="text-amber-400 text-sm mt-2">of ${(stats.totalGoal / 1000).toFixed(0)}K goal</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Live Sales</span>
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.liveSales}</div>
          <div className="text-green-400 text-sm mt-2">Participate now!</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Upcoming</span>
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.upcomingSales}</div>
          <div className="text-blue-400 text-sm mt-2">Whitelist now</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">My Tokens</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{myParticipations.length}</div>
          <div className="text-purple-400 text-sm mt-2">Holdings</div>
        </div>
      </div>

      {/* My Participations */}
      {myParticipations.length > 0 && (
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" />
            My Participations
          </h2>
          <div className="space-y-3">
            {myParticipations.map((part, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 flex justify-between items-center">
                <div>
                  <div className="text-white font-bold text-lg">{part.symbol}</div>
                  <div className="text-gray-400 text-sm">{part.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">{part.tokens.toLocaleString()} {part.symbol}</div>
                  <div className="text-gray-400 text-sm">@ ${part.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">${part.amount.toLocaleString()}</div>
                  <span className={`text-sm ${part.status === 'vested' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {part.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Token Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokenSales.map((sale) => {
          const progress = (sale.currentRaise / sale.raiseGoal) * 100
          return (
            <div key={sale.id} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 hover:border-amber-500/50 transition-all cursor-pointer" onClick={() => setSelectedSale(sale)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{sale.name}</h3>
                      {sale.verified && (
                        <div className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400">{sale.symbol} • {sale.type}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  sale.stage === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  sale.stage === 'Upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                }`}>
                  {sale.stage}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{sale.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Raised: ${sale.currentRaise.toLocaleString()} / ${sale.raiseGoal.toLocaleString()}</span>
                    <span className="text-amber-400 font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400">Price</div>
                    <div className="text-white font-semibold">${sale.tokenPrice}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400">Participants</div>
                    <div className="text-white font-semibold">{sale.participants.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400">Sale Supply</div>
                    <div className="text-white font-semibold">{(sale.saleSupply / 1000000).toFixed(1)}M</div>
                  </div>
                </div>

                {sale.stage === 'Live' && (
                  <button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Participate Now
                  </button>
                )}

                {sale.stage === 'Upcoming' && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    {sale.startDate}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Modal */}
      {selectedSale && modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedSale.name} ({selectedSale.symbol})</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>

            <p className="text-gray-300 mb-6">{selectedSale.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Token Price</div>
                <div className="text-white font-bold text-xl">${selectedSale.tokenPrice}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Sale Supply</div>
                <div className="text-white font-bold text-xl">{selectedSale.saleSupply.toLocaleString()} {selectedSale.symbol}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Min Purchase</div>
                <div className="text-white font-bold text-xl">${selectedSale.minPurchase}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Max Purchase</div>
                <div className="text-white font-bold text-xl">${selectedSale.maxPurchase}</div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-sm font-medium mb-2 block">Purchase Amount (USD)</label>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="w-full bg-transparent text-2xl text-white font-bold outline-none"
                  placeholder={`${selectedSale.minPurchase} - ${selectedSale.maxPurchase}`}
                />
              </div>
              {purchaseAmount && (
                <div className="text-amber-400 mt-2 font-semibold">
                  You will receive: {((parseFloat(purchaseAmount) || 0) / selectedSale.tokenPrice).toLocaleString()} {selectedSale.symbol}
                </div>
              )}
            </div>

            {selectedSale.kycRequired && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-blue-400 font-semibold">KYC Required</div>
                  <div className="text-blue-300 text-sm">Complete KYC verification to participate</div>
                </div>
              </div>
            )}

            <button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 rounded-xl transition-all">
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  )
}