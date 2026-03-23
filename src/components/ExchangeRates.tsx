import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, RefreshCw, Search, Star, ArrowUpRight, ArrowDownRight, BarChart3, Bitcoin, Globe, AlertCircle } from 'lucide-react'

interface ExchangeRate {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  change7d: number
  volume24h: number
  marketCap: number
  icon: string
  exchanges: number
  isFavorite: boolean
  lastUpdate: string
}

const exchangeRates: ExchangeRate[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67842.50,
    change24h: 2.34,
    change7d: 5.67,
    volume24h: 28500000000,
    marketCap: 1320000000000,
    icon: '₿',
    exchanges: 156,
    isFavorite: true,
    lastUpdate: '2024-03-15 14:32:05 UTC'
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3542.18,
    change24h: 1.89,
    change7d: 3.45,
    volume24h: 15200000000,
    marketCap: 425000000000,
    icon: 'Ξ',
    exchanges: 142,
    isFavorite: true,
    lastUpdate: '2024-03-15 14:31:58 UTC'
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    price: 598.45,
    change24h: -0.45,
    change7d: 2.12,
    volume24h: 850000000,
    marketCap: 89000000000,
    icon: '◆',
    exchanges: 98,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:32:01 UTC'
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 178.32,
    change24h: 4.56,
    change7d: 12.34,
    volume24h: 3200000000,
    marketCap: 78000000000,
    icon: '◎',
    exchanges: 87,
    isFavorite: true,
    lastUpdate: '2024-03-15 14:31:55 UTC'
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'XRP',
    price: 0.6234,
    change24h: -1.23,
    change7d: -2.45,
    volume24h: 1200000000,
    marketCap: 34000000000,
    icon: '✕',
    exchanges: 112,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:32:03 UTC'
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.7892,
    change24h: 0.89,
    change7d: 4.56,
    volume24h: 450000000,
    marketCap: 28000000000,
    icon: '₳',
    exchanges: 95,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:31:50 UTC'
  },
  {
    id: 'doge',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1547,
    change24h: 3.21,
    change7d: 8.90,
    volume24h: 890000000,
    marketCap: 22000000000,
    icon: 'Ð',
    exchanges: 134,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:32:07 UTC'
  },
  {
    id: 'dot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.84,
    change24h: -0.67,
    change7d: 1.23,
    volume24h: 320000000,
    marketCap: 10500000000,
    icon: '●',
    exchanges: 78,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:31:52 UTC'
  },
  {
    id: 'ltc',
    symbol: 'LTC',
    name: 'Litecoin',
    price: 87.65,
    change24h: 1.45,
    change7d: 2.34,
    volume24h: 420000000,
    marketCap: 6500000000,
    icon: 'Ł',
    exchanges: 102,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:31:48 UTC'
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 38.92,
    change24h: 2.78,
    change7d: 6.78,
    volume24h: 580000000,
    marketCap: 14000000000,
    icon: '▲',
    exchanges: 72,
    isFavorite: false,
    lastUpdate: '2024-03-15 14:32:06 UTC'
  }
]

const ExchangeRates = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSort, setSelectedSort] = useState('marketCap')
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['btc', 'eth', 'sol']))
  const [showFavorites, setShowFavorites] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatPrice = (price: number): string => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    return `$${price.toFixed(4)}`
  }

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const refreshRates = () => {
    setLastUpdate(new Date())
  }

  const sortedRates = [...exchangeRates]
    .filter(rate => {
      const matchesSearch = rate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rate.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorites = !showFavorites || favorites.has(rate.id)
      return matchesSearch && matchesFavorites
    })
    .sort((a, b) => {
      if (selectedSort === 'marketCap') return b.marketCap - a.marketCap
      if (selectedSort === 'change24h') return b.change24h - a.change24h
      if (selectedSort === 'change7d') return b.change7d - a.change7d
      if (selectedSort === 'volume') return b.volume24h - a.volume24h
      if (selectedSort === 'price') return b.price - a.price
      if (selectedSort === 'exchanges') return b.exchanges - a.exchanges
      return 0
    })

  const totalMarketCap = exchangeRates.reduce((sum, r) => sum + r.marketCap, 0)
  const totalVolume24h = exchangeRates.reduce((sum, r) => sum + r.volume24h, 0)
  const gainers24h = exchangeRates.filter(r => r.change24h > 0).length
  const losers24h = exchangeRates.filter(r => r.change24h < 0).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">💰 Crypto Exchange Rates</h1>
            <p className="text-slate-400">Live cryptocurrency prices and market data</p>
          </div>
          <button
            onClick={refreshRates}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Market Cap Total</p>
                <p className="text-xl font-bold text-white">{formatNumber(totalMarketCap)}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Volumen 24h</p>
                <p className="text-xl font-bold text-white">{formatNumber(totalVolume24h)}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Gainers 24h</p>
                <p className="text-xl font-bold text-green-400">{gainers24h}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-sm text-slate-400">Losers 24h</p>
                <p className="text-xl font-bold text-red-400">{losers24h}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="marketCap">Sort: Market Cap</option>
              <option value="change24h">Sort: Change 24h</option>
              <option value="change7d">Sort: Change 7d</option>
              <option value="volume">Sort: Volume</option>
              <option value="price">Sort: Price</option>
              <option value="exchanges">Sort: Exchanges</option>
            </select>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFavorites 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' 
                  : 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
              }`}
            >
              <Star className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
              {showFavorites ? 'Favorites Only' : 'All Coins'}
            </button>
            <div className="flex items-center justify-center text-slate-400 text-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Rates Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Coin</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">24h Change</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">7d Change</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">24h Volume</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Market Cap</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Exchanges</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedRates.map((rate, index) => (
                  <tr
                    key={rate.id}
                    className={`border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors ${
                      index % 2 === 0 ? 'bg-slate-800/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                          {rate.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{rate.name}</span>
                            {favorites.has(rate.id) && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          </div>
                          <span className="text-sm text-slate-400">{rate.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-semibold">{formatPrice(rate.price)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 ${rate.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {rate.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-semibold">{rate.change24h >= 0 ? '+' : ''}{rate.change24h.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 ${rate.change7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {rate.change7d >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-semibold">{rate.change7d >= 0 ? '+' : ''}{rate.change7d.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-300">{formatNumber(rate.volume24h)}</td>
                    <td className="px-6 py-4 text-right text-slate-300">{formatNumber(rate.marketCap)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">{rate.exchanges}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleFavorite(rate.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            favorites.has(rate.id) 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${favorites.has(rate.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-green-500/20 hover:text-green-400 transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sortedRates.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No results found</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Market Performance */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-4">📊 Top Gainers (24h)</h3>
            <div className="space-y-3">
              {exchangeRates
                .sort((a, b) => b.change24h - a.change24h)
                .slice(0, 5)
                .map(rate => (
                  <div key={rate.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {rate.icon}
                      </div>
                      <div>
                        <span className="text-white font-medium">{rate.symbol}</span>
                        <span className="text-slate-400 text-sm ml-2">{rate.name}</span>
                      </div>
                    </div>
                    <span className="text-green-400 font-semibold">+{rate.change24h.toFixed(2)}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-4">📉 Top Losers (24h)</h3>
            <div className="space-y-3">
              {exchangeRates
                .filter(r => r.change24h < 0)
                .sort((a, b) => a.change24h - b.change24h)
                .slice(0, 5)
                .map(rate => (
                  <div key={rate.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {rate.icon}
                      </div>
                      <div>
                        <span className="text-white font-medium">{rate.symbol}</span>
                        <span className="text-slate-400 text-sm ml-2">{rate.name}</span>
                      </div>
                    </div>
                    <span className="text-red-400 font-semibold">{rate.change24h.toFixed(2)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeRates