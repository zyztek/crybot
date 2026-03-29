import { useState } from 'react'
import { ArrowLeftRight, Coins, TrendingUp, Shield, Zap, Clock } from 'lucide-react'

interface SwapQuote {
  dex: string
  price: number
  output: number
  priceImpact: number
  gasUsd: number
  route: string[]
  time: string
}

export default function DexAggregator() {
  const [fromAmount, setFromAmount] = useState('1')
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [quotes] = useState<SwapQuote[]>([
    { dex: 'Uniswap V3', price: 1850.23, output: 1850.23, priceImpact: 0.05, gasUsd: 2.5, route: ['ETH', 'USDC'], time: '~2s' },
    { dex: '1inch', price: 1851.45, output: 1851.45, priceImpact: 0.03, gasUsd: 1.8, route: ['ETH', 'USDC'], time: '~3s' },
    { dex: 'Curve', price: 1849.87, output: 1849.87, priceImpact: 0.02, gasUsd: 1.2, route: ['ETH', 'USDT', 'USDC'], time: '~4s' },
    { dex: 'Balancer', price: 1848.56, output: 1848.56, priceImpact: 0.08, gasUsd: 3.1, route: ['ETH', 'USDC'], time: '~3s' },
    { dex: 'Paraswap', price: 1850.89, output: 1850.89, priceImpact: 0.04, gasUsd: 2.0, route: ['ETH', 'USDC'], time: '~2s' },
  ])

  const tokens = ['ETH', 'BTC', 'USDC', 'USDT', 'DAI', 'WBTC', 'MATIC', 'LINK', 'UNI', 'AAVE']
  const [activeTab, setActiveTab] = useState('swap')

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              DEX Aggregator
            </h1>
            <p className="text-gray-400">Find the best prices across all decentralized exchanges</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2 text-green-400 font-semibold">
              <TrendingUp className="w-5 h-5 inline mr-2" />
              $12.4M 24h Volume
            </div>
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl px-4 py-2 text-blue-400 font-semibold">
              <Shield className="w-5 h-5 inline mr-2" />
              Audited
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'swap', name: 'Swap', icon: ArrowLeftRight },
          { id: 'limit', name: 'Limit Order', icon: Clock },
          { id: 'cross-chain', name: 'Cross-Chain', icon: Coins },
          { id: 'flash', name: 'Flash Loan', icon: Zap },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Panel */}
        <div className="lg:col-span-1 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 space-y-6">
          {/* From */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium">Sell</label>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent text-3xl text-white font-bold outline-none w-1/2"
                  placeholder="0.0"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg outline-none"
                >
                  {tokens.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="text-gray-500 text-sm flex justify-between">
                <span>Balance: 2.45 {fromToken}</span>
                <span className="text-purple-400 cursor-pointer hover:underline">MAX</span>
              </div>
            </div>
            <div className="text-right text-gray-400 text-sm">~${(parseFloat(fromAmount) * 1850).toFixed(2)} USD</div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center -my-3 relative z-10">
            <div className="bg-gray-900 rounded-full p-3 border-2 border-gray-700 shadow-lg">
              <ArrowLeftRight className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium">Buy</label>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <div className="text-3xl text-white font-bold">
                  {((parseFloat(fromAmount) || 0) * quotes[0].price).toFixed(2)}
                </div>
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg outline-none"
                >
                  {tokens.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="text-gray-500 text-sm flex justify-between">
                <span>Balance: 1,234.56 {toToken}</span>
              </div>
            </div>
            <div className="text-right text-gray-400 text-sm">~${((parseFloat(fromAmount) || 0) * quotes[0].price).toFixed(2)} USD</div>
          </div>

          {/* Quote Summary */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Best Price</span>
              <span className="text-white font-semibold">${quotes[0].price.toFixed(2)} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expected Output</span>
              <span className="text-green-400 font-semibold">{quotes[0].output.toFixed(2)} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Gas (est.)</span>
              <span className="text-white font-semibold">${quotes[0].gasUsd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price Impact</span>
              <span className={`font-semibold ${quotes[0].priceImpact < 0.1 ? 'text-green-400' : quotes[0].priceImpact < 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                {quotes[0].priceImpact.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30">
            <ArrowLeftRight className="w-5 h-5" />
            Swap Now
          </button>
        </div>

        {/* Quotes Table */}
        <div className="lg:col-span-2 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            Best Quotes Across DEXs
          </h2>

          <div className="space-y-4">
            {quotes.map((quote, index) => (
              <div
                key={quote.dex}
                className={`bg-gray-800/80 rounded-xl p-4 border transition-all ${
                  index === 0 ? 'border-green-500/50 shadow-lg shadow-green-500/20' : 'border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {index === 0 && (
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        BEST
                      </div>
                    )}
                    <div>
                      <div className="text-lg font-bold text-white">{quote.dex}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {quote.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{quote.output.toFixed(2)} {toToken}</div>
                    <div className="text-gray-400 text-sm">@ ${quote.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    {quote.route.map((token, i) => (
                      <span key={i} className="flex items-center">
                        <span className="bg-gray-700 text-white px-2 py-1 rounded">{token}</span>
                        {i < quote.route.length - 1 && <ArrowLeftRight className="w-4 h-4 text-gray-500 mx-1" />}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`font-semibold ${quote.priceImpact < 0.1 ? 'text-green-400' : quote.priceImpact < 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                      Impact: {quote.priceImpact.toFixed(2)}%
                    </span>
                    <span className="text-gray-400">
                      Gas: <span className="text-white font-semibold">${quote.gasUsd.toFixed(2)}</span>
                    </span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all">
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Supported DEXs</div>
              <div className="text-2xl font-bold text-white">15</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Chains</div>
              <div className="text-2xl font-bold text-white">8</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Avg Savings</div>
              <div className="text-2xl font-bold text-green-400">2.4%</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Users</div>
              <div className="text-2xl font-bold text-white">1.2M+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}