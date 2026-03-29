import { useState, useMemo } from 'react'
import { Gem, Droplet, Filter, X, Gift, TrendingUp, Sparkles } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'
import NFTFaucetCard from './NFTFaucetCard'

/**
 * NFT Faucet data structure
 * @interface NFTFaucet
 */
interface NFTFaucet {
  id: string
  name: string
  collection: string
  image: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  chain: string
  price: number
  currency: string
  nextClaim: string
  difficulty: string
  status: 'available' | 'cooldown' | 'locked'
  claimed: boolean
  totalClaimed: number
  category: string
}

/**
 * Props for NFTFaucetView component
 * @interface NFTFaucetViewProps
 */
interface NFTFaucetViewProps {
  language: 'es' | 'en'
  t: TranslationTexts
}

const mockNFTFaucets: NFTFaucet[] = [
  {
    id: '1',
    name: 'Cosmic Ape #0001',
    collection: 'Cosmic Apes',
    image: '🦍',
    description: 'A rare cosmic ape from the galaxy far, far away. Contains unique traits that make it one of a kind.',
    rarity: 'legendary',
    chain: 'Ethereum',
    price: 2.5,
    currency: 'ETH',
    nextClaim: '2h 30m',
    difficulty: 'hard',
    status: 'available',
    claimed: false,
    totalClaimed: 1245,
    category: 'hot'
  },
  {
    id: '2',
    name: 'Pixel Punk #888',
    collection: 'Pixel Punks',
    image: '👾',
    description: 'Classic 8-bit style punk with unique attributes. A must-have for collectors.',
    rarity: 'epic',
    chain: 'Ethereum',
    price: 0.85,
    currency: 'ETH',
    nextClaim: '1h 15m',
    difficulty: 'medium',
    status: 'available',
    claimed: false,
    totalClaimed: 3421,
    category: 'hot'
  },
  {
    id: '3',
    name: 'Neon Runner #42',
    collection: 'Neon Runners',
    image: '🏃',
    description: 'Cyberpunk runner with glowing neon accessories. Fast and rare!',
    rarity: 'rare',
    chain: 'Solana',
    price: 0.45,
    currency: 'SOL',
    nextClaim: '45m',
    difficulty: 'easy',
    status: 'available',
    claimed: false,
    totalClaimed: 8923,
    category: 'new'
  },
  {
    id: '4',
    name: 'Dragon Egg #007',
    collection: 'Dragon Kingdom',
    image: '🥚',
    description: 'A mysterious dragon egg waiting to hatch. May contain legendary dragons!',
    rarity: 'epic',
    chain: 'Polygon',
    price: 0.25,
    currency: 'MATIC',
    nextClaim: '3h',
    difficulty: 'medium',
    status: 'cooldown',
    claimed: false,
    totalClaimed: 5642,
    category: 'stable'
  },
  {
    id: '5',
    name: 'Space Cat #123',
    collection: 'Cosmic Cats',
    image: '🐱',
    description: 'An adventurous cat exploring the universe. Loves space treats.',
    rarity: 'common',
    chain: 'BNB Chain',
    price: 0.08,
    currency: 'BNB',
    nextClaim: '15m',
    difficulty: 'easy',
    status: 'available',
    claimed: false,
    totalClaimed: 15678,
    category: 'new'
  },
  {
    id: '6',
    name: 'Golden Ticket #001',
    collection: 'VIP Access',
    image: '🎫',
    description: 'Exclusive golden ticket granting access to premium events and rewards.',
    rarity: 'legendary',
    chain: 'Ethereum',
    price: 5.0,
    currency: 'ETH',
    nextClaim: '24h',
    difficulty: 'hard',
    status: 'locked',
    claimed: false,
    totalClaimed: 89,
    category: 'premium'
  },
  {
    id: '7',
    name: 'Mystic Flower #256',
    collection: 'Garden of Dreams',
    image: '🌸',
    description: 'A beautiful flower from an enchanted garden. Has magical properties.',
    rarity: 'rare',
    chain: 'Avalanche',
    price: 0.18,
    currency: 'AVAX',
    nextClaim: '30m',
    difficulty: 'easy',
    status: 'available',
    claimed: true,
    totalClaimed: 7834,
    category: 'stable'
  },
  {
    id: '8',
    name: 'Cyber Samurai #999',
    collection: 'Digital Warriors',
    image: '⚔️',
    description: 'A fierce warrior from the digital realm. Armed with powerful weapons.',
    rarity: 'epic',
    chain: 'Arbitrum',
    price: 0.65,
    currency: 'ETH',
    nextClaim: '1h 45m',
    difficulty: 'medium',
    status: 'available',
    claimed: false,
    totalClaimed: 2156,
    category: 'hot'
  },
]

/**
 * NFTFaucetView - Main view for displaying and filtering NFT faucets
 * @component
 * @param props - NFTFaucetViewProps with language and translations
 * @returns Grid display of NFT faucet cards with filtering capabilities
 */
export default function NFTFaucetView({ language, t }: NFTFaucetViewProps) {
  const [rarityFilter, setRarityFilter] = useState<string>('all')
  const [chainFilter, setChainFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredFaucets = useMemo(() => {
    let result = mockNFTFaucets

    if (rarityFilter !== 'all') {
      result = result.filter(f => f.rarity === rarityFilter)
    }
    if (chainFilter !== 'all') {
      result = result.filter(f => f.chain === chainFilter)
    }
    if (categoryFilter !== 'all') {
      result = result.filter(f => f.category === categoryFilter)
    }

    return result
  }, [rarityFilter, chainFilter, categoryFilter])

  const stats = useMemo(() => {
    const totalValue = mockNFTFaucets.reduce((sum, f) => sum + f.price, 0)
    const available = mockNFTFaucets.filter(f => f.status === 'available').length
    const claimed = mockNFTFaucets.filter(f => f.claimed).length
    const totalClaimedAll = mockNFTFaucets.reduce((sum, f) => sum + f.totalClaimed, 0)
    return { totalValue, available, claimed, totalClaimedAll }
  }, [])

  const activeFiltersCount = [
    rarityFilter !== 'all',
    chainFilter !== 'all',
    categoryFilter !== 'all',
  ].filter(Boolean).length

  const clearAllFilters = () => {
    setRarityFilter('all')
    setChainFilter('all')
    setCategoryFilter('all')
  }

  const text = language === 'es' ? {
    title: 'Faucets NFT',
    subtitle: 'Reclama NFTs gratuitos de varias colecciones',
    totalValue: 'Valor Total',
    available: 'Disponibles',
    claimed: 'Reclamados',
    totalClaimedAll: 'Total Reclamados',
    rarity: 'Rareza',
    chain: 'Cadena',
    category: 'Categoría',
    filters: 'Filtros',
    clearAll: 'Limpiar',
    all: 'Todos',
    hot: '🔥 Popular',
    new: '🆕 Nuevo',
    stable: '💎 Estable',
    premium: '👑 Premium',
    legendary: 'Legendario',
    epic: 'Épico',
    rare: 'Raro',
    common: 'Común',
  } : {
    title: 'NFT Faucets',
    subtitle: 'Claim free NFTs from various collections',
    totalValue: 'Total Value',
    available: 'Available',
    claimed: 'Claimed',
    totalClaimedAll: 'Total Claimed',
    rarity: 'Rarity',
    chain: 'Chain',
    category: 'Category',
    filters: 'Filters',
    clearAll: 'Clear',
    all: 'All',
    hot: '🔥 Hot',
    new: '🆕 New',
    stable: '💎 Stable',
    premium: '👑 Premium',
    legendary: 'Legendary',
    epic: 'Epic',
    rare: 'Rare',
    common: 'Common',
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Gem className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {text.title}
          </h1>
        </div>
        <p className="text-slate-400">{text.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">{text.totalValue}</p>
              <p className="text-lg font-bold text-white">{stats.totalValue.toFixed(2)} ETH</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Droplet className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">{text.available}</p>
              <p className="text-lg font-bold text-white">{stats.available}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">{text.claimed}</p>
              <p className="text-lg font-bold text-white">{stats.claimed}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">{text.totalClaimedAll}</p>
              <p className="text-lg font-bold text-white">{stats.totalClaimedAll.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        {/* Category Filter */}
        {['all', 'hot', 'new', 'stable', 'premium'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
              categoryFilter === cat
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? text.all : text[cat as keyof typeof text]}
          </button>
        ))}

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`ml-auto px-3 py-1.5 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
            showFilters || activeFiltersCount > 0 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          <Filter className="w-4 h-4" />
          {text.filters}
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mb-4 p-4 bg-slate-800/50 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">{text.filters}</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-purple-300 hover:text-white text-sm flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {text.clearAll}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rarity Filter */}
            <div>
              <label className="text-purple-300 text-sm mb-2 block">{text.rarity}</label>
              <select
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white text-sm"
              >
                <option value="all">{text.all}</option>
                <option value="legendary">{text.legendary}</option>
                <option value="epic">{text.epic}</option>
                <option value="rare">{text.rare}</option>
                <option value="common">{text.common}</option>
              </select>
            </div>
            
            {/* Chain Filter */}
            <div>
              <label className="text-purple-300 text-sm mb-2 block">{text.chain}</label>
              <select
                value={chainFilter}
                onChange={(e) => setChainFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white text-sm"
              >
                <option value="all">{text.all}</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Solana">Solana</option>
                <option value="Polygon">Polygon</option>
                <option value="BNB Chain">BNB Chain</option>
                <option value="Avalanche">Avalanche</option>
                <option value="Arbitrum">Arbitrum</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* NFT Faucet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFaucets.map((faucet) => (
          <NFTFaucetCard
            key={faucet.id}
            {...faucet}
            language={language}
          />
        ))}
      </div>

      {filteredFaucets.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <Gem className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No NFT faucets found</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}