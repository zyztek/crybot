import { useState } from 'react'
import { ShoppingBag, Star, TrendingUp, Clock, DollarSign, ExternalLink, Filter, Search, Image as ImageIcon, Flame, Award } from 'lucide-react'

interface NFTItem {
  id: number
  name: string
  collection: string
  price: number
  currency: string
  image: string
  creator: string
  owner: string
  likes: number
  views: number
  bids: number
  endTime: string
  category: 'art' | 'music' | 'gaming' | 'collectibles' | 'utility'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  status: 'live' | 'ending' | 'sold'
}

const nftItems: NFTItem[] = [
  {
    id: 1,
    name: 'Cosmic Ape #7241',
    collection: 'Cosmic Apes',
    price: 2.5,
    currency: 'ETH',
    image: '🐵🌌',
    creator: 'ArtistX',
    owner: 'CryptoWhale',
    likes: 2456,
    views: 12450,
    bids: 23,
    endTime: '2h 45m',
    category: 'art',
    rarity: 'legendary',
    status: 'live'
  },
  {
    id: 2,
    name: 'Neon City #128',
    collection: 'Neon Dreams',
    price: 0.85,
    currency: 'SOL',
    image: '🏙️✨',
    creator: 'NeonMaster',
    owner: 'CollectorPro',
    likes: 1234,
    views: 5678,
    bids: 15,
    endTime: '5h 30m',
    category: 'art',
    rarity: 'epic',
    status: 'live'
  },
  {
    id: 3,
    name: 'Crypto Sword #999',
    collection: 'Blockchain Heroes',
    price: 1.2,
    currency: 'ETH',
    image: '⚔️💎',
    creator: 'GameStudio',
    owner: 'PunkTrader',
    likes: 3789,
    views: 18900,
    bids: 42,
    endTime: '1h 15m',
    category: 'gaming',
    rarity: 'rare',
    status: 'ending'
  },
  {
    id: 4,
    name: 'Abstract Mind #42',
    collection: 'Mental Art',
    price: 0.5,
    currency: 'ETH',
    image: '🧠🎨',
    creator: 'AbstractArtist',
    owner: 'ArtLover',
    likes: 890,
    views: 3456,
    bids: 8,
    endTime: '12h 00m',
    category: 'art',
    rarity: 'common',
    status: 'live'
  },
  {
    id: 5,
    name: 'Music Token #007',
    collection: 'SoundWave NFT',
    price: 0.15,
    currency: 'ETH',
    image: '🎵🎧',
    creator: 'DJCrypto',
    owner: 'MusicFan',
    likes: 567,
    views: 2345,
    bids: 5,
    endTime: '8h 20m',
    category: 'music',
    rarity: 'rare',
    status: 'live'
  },
  {
    id: 6,
    name: 'Golden Ticket #1',
    collection: 'VIP Access',
    price: 5.0,
    currency: 'ETH',
    image: '🎫🏆',
    creator: 'ExclusiveClub',
    owner: 'EliteMember',
    likes: 5678,
    views: 34567,
    bids: 67,
    endTime: '24h 00m',
    category: 'utility',
    rarity: 'legendary',
    status: 'live'
  },
  {
    id: 7,
    name: 'Dragon Egg #888',
    collection: 'Fantasy World',
    price: 0.75,
    currency: 'ETH',
    image: '🥚🐉',
    creator: 'DragonMaker',
    owner: 'FantasyFan',
    likes: 2345,
    views: 12345,
    bids: 28,
    endTime: '3h 45m',
    category: 'collectibles',
    rarity: 'epic',
    status: 'live'
  },
  {
    id: 8,
    name: 'Rare Gem #152',
    collection: 'Treasure Chest',
    price: 0.35,
    currency: 'ETH',
    image: '💎✨',
    creator: 'GemHunter',
    owner: 'ValueInvestor',
    likes: 456,
    views: 2345,
    bids: 7,
    endTime: '6h 10m',
    category: 'collectibles',
    rarity: 'rare',
    status: 'live'
  }
]

const collections = [
  { name: 'Cosmic Apes', items: 10000, floor: 0.8, volume: 12500, change: 12.5 },
  { name: 'Neon Dreams', items: 5000, floor: 0.25, volume: 3400, change: 8.3 },
  { name: 'Blockchain Heroes', items: 7777, floor: 0.45, volume: 8900, change: -2.1 },
  { name: 'SoundWave NFT', items: 2000, floor: 0.08, volume: 1200, change: 5.7 }
]

const NFTMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')
  const [sortBy, setSortBy] = useState('recent')

  const categories = ['all', 'art', 'music', 'gaming', 'collectibles', 'utility']
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary']

  const filteredNFTs = nftItems.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory
    const matchesRarity = selectedRarity === 'all' || nft.rarity === selectedRarity
    return matchesSearch && matchesCategory && matchesRarity
  })

  const rarityColors = {
    common: 'bg-slate-500/20 text-slate-400 border-slate-400/30',
    rare: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
    epic: 'bg-purple-500/20 text-purple-400 border-purple-400/30',
    legendary: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
  }

  const categoryEmojis: Record<string, string> = {
    art: '🎨',
    music: '🎵',
    gaming: '🎮',
    collectibles: '📦',
    utility: '🔧'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛒 NFT Marketplace</h1>
          <p className="text-slate-400">Discover, collect, and sell extraordinary NFTs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Items</p>
                <p className="text-2xl font-bold text-white">{nftItems.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Total Value</p>
                <p className="text-2xl font-bold text-white">{filteredNFTs.reduce((sum, n) => sum + n.price, 0).toFixed(2)} ETH</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-sm text-slate-400">Hot Items</p>
                <p className="text-2xl font-bold text-white">{nftItems.filter(n => n.status === 'ending').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Collections</p>
                <p className="text-2xl font-bold text-white">{collections.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Collections */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">🔥 Top Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {collections.map((collection, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/80 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-white">{collection.name}</span>
                  <span className={`text-sm ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {collection.change >= 0 ? '↑' : '↓'} {Math.abs(collection.change)}%
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Floor</span>
                    <span className="text-white">{collection.floor} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume</span>
                    <span className="text-white">{collection.volume.toLocaleString()} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Items</span>
                    <span className="text-white">{collection.items.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : `${categoryEmojis[cat]} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                </option>
              ))}
            </select>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity === 'all' ? 'All Rarities' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="likes">Most Liked</option>
              <option value="ending">Ending Soon</option>
            </select>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNFTs.map(nft => (
            <div
              key={nft.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-6xl">
                {nft.image}
                {nft.status === 'ending' && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full animate-pulse">
                    🔥 Ending Soon
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    🔍 View Details
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white truncate">{nft.name}</h3>
                    <p className="text-sm text-slate-400">{nft.collection}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${rarityColors[nft.rarity]}`}>
                    {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{nft.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>{nft.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{nft.bids} bids</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-slate-400">Current Bid</p>
                    <p className="text-xl font-bold text-white">
                      {nft.price} <span className="text-sm text-purple-400">{nft.currency}</span>
                    </p>
                  </div>
                  <div className={`text-right px-3 py-1 bg-slate-900/50 rounded-lg ${nft.status === 'ending' ? 'animate-pulse' : ''}`}>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm">{nft.endTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors text-sm">
                    Place Bid
                  </button>
                  <button className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No NFTs found</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTMarketplace