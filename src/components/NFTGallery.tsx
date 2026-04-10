import {
  ExternalLink,
  Eye,
  Filter,
  Gem,
  Heart,
  Image as ImageIcon,
  Palette,
  Tag,
  TrendingUp,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNFT } from '../hooks/useGraphQL';

interface NFT {
  id: number;
  name: string;
  collection: string;
  image: string;
  price: number;
  currency: string;
  creator: string;
  likes: number;
  views: number;
  category: 'art' | 'gaming' | 'collectibles' | 'metaverse' | 'music';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  listed: boolean;
  lastSale: number;
}

const nfts: NFT[] = [
  {
    id: 1,
    name: 'Cosmic Ape #1234',
    collection: 'Bored Ape YC',
    image: '🦍',
    price: 45.5,
    currency: 'ETH',
    creator: '0x1a2b...3c4d',
    likes: 2341,
    views: 15420,
    category: 'collectibles',
    rarity: 'legendary',
    listed: true,
    lastSale: 42.3,
  },
  {
    id: 2,
    name: 'Digital Dreams #567',
    collection: 'Art Blocks',
    image: '🎨',
    price: 8.2,
    currency: 'ETH',
    creator: '0x5e6f...7g8h',
    likes: 987,
    views: 5620,
    category: 'art',
    rarity: 'epic',
    listed: true,
    lastSale: 7.5,
  },
  {
    id: 3,
    name: 'Space Explorer #89',
    collection: 'Galactic Quest',
    image: '🚀',
    price: 2.1,
    currency: 'ETH',
    creator: '0x9i0j...1k2l',
    likes: 543,
    views: 3210,
    category: 'gaming',
    rarity: 'rare',
    listed: true,
    lastSale: 1.8,
  },
  {
    id: 4,
    name: 'Virtual Land #456',
    collection: 'Decentraland',
    image: '🏝️',
    price: 15.8,
    currency: 'ETH',
    creator: '0x3m4n...5o6p',
    likes: 1876,
    views: 12340,
    category: 'metaverse',
    rarity: 'legendary',
    listed: true,
    lastSale: 14.2,
  },
  {
    id: 5,
    name: 'Beat Token #234',
    collection: 'Audius',
    image: '🎵',
    price: 0.8,
    currency: 'ETH',
    creator: '0x7q8r...9s0t',
    likes: 432,
    views: 2870,
    category: 'music',
    rarity: 'common',
    listed: true,
    lastSale: 0.65,
  },
  {
    id: 6,
    name: 'Pixel Punk #7890',
    collection: 'CryptoPunks',
    image: '👾',
    price: 68.4,
    currency: 'ETH',
    creator: '0x1u2v...3w4x',
    likes: 4567,
    views: 23450,
    category: 'collectibles',
    rarity: 'legendary',
    listed: false,
    lastSale: 65.0,
  },
  {
    id: 7,
    name: 'Abstract Mind #345',
    collection: 'Generative Art',
    image: '🌌',
    price: 4.5,
    currency: 'ETH',
    creator: '0x5y6z...7a8b',
    likes: 1234,
    views: 8900,
    category: 'art',
    rarity: 'rare',
    listed: true,
    lastSale: 4.0,
  },
  {
    id: 8,
    name: 'Warrior Hero #123',
    collection: 'Axie Infinity',
    image: '⚔️',
    price: 0.25,
    currency: 'ETH',
    creator: '0x9c0d...1e2f',
    likes: 876,
    views: 5430,
    category: 'gaming',
    rarity: 'common',
    listed: true,
    lastSale: 0.2,
  },
  {
    id: 9,
    name: 'Fashion Item #567',
    collection: 'DressX',
    image: '👗',
    price: 1.2,
    currency: 'ETH',
    creator: '0x3g4h...5i6j',
    likes: 654,
    views: 4120,
    category: 'metaverse',
    rarity: 'rare',
    listed: true,
    lastSale: 1.0,
  },
  {
    id: 10,
    name: 'Sound Wave #890',
    collection: 'audioNFT',
    image: '🎹',
    price: 0.35,
    currency: 'ETH',
    creator: '0x7k8l...9m0n',
    likes: 321,
    views: 2340,
    category: 'music',
    rarity: 'common',
    listed: true,
    lastSale: 0.3,
  },
];

const collections = [
  { name: 'Bored Ape YC', volume: '28,450 ETH', items: 10000, floor: '45.2 ETH', change: '+12%' },
  { name: 'CryptoPunks', volume: '45,230 ETH', items: 10000, floor: '68.5 ETH', change: '+8%' },
  { name: 'Art Blocks', volume: '12,340 ETH', items: 5600, floor: '2.5 ETH', change: '-5%' },
  { name: 'Azuki', volume: '8,920 ETH', items: 10000, floor: '9.8 ETH', change: '+3%' },
  { name: 'Decentraland', volume: '15,670 ETH', items: 96000, floor: '0.8 ETH', change: '-2%' },
];

export const NFTGallery: React.FC = () => {
  const { fetchCollections, fetchMyNFTs, mint, buy, list } = useNFT();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'likes' | 'views'>('price');
  const [isLoading, setIsLoading] = useState(false);
  const [nftList, setNftList] = useState<NFT[]>(nfts);

  // Fetch NFTs on mount
  useEffect(() => {
    const loadNFTs = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCollections.execute();
        if ((result as any)?.nftCollections) {
          setNftList(
            (result as any).nftCollections.map((c: any, idx: number) => ({
              id: idx + 1,
              name: c.name,
              collection: c.name,
              image: '🖼️',
              price: parseFloat(c.floorPrice) || 0,
              currency: 'ETH',
              creator: '0x...',
              likes: 0,
              views: 0,
              category: 'collectibles',
              rarity: 'common',
              listed: true,
              lastSale: parseFloat(c.floorPrice) || 0,
            }))
          );
        }
      } catch (e) {
        // Use mock data on error
      } finally {
        setIsLoading(false);
      }
    };
    loadNFTs();
  }, []);

  const filteredNFTs = nftList
    .filter(nft => {
      const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
      const matchesRarity = selectedRarity === 'all' || nft.rarity === selectedRarity;
      return matchesCategory && matchesRarity;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'likes') return b.likes - a.likes;
      return b.views - a.views;
    });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'rare':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'epic':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'legendary':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '●';
      case 'rare':
        return '◆';
      case 'epic':
        return '⬡';
      case 'legendary':
        return '★';
    }
  };

  const stats = {
    totalVolume: '210,890 ETH',
    activeCollections: 156,
    itemsListed: 12456,
    dailySales: 892,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gem className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NFT Gallery
            </h1>
          </div>
          <p className="text-slate-400">Explora y descubre NFTs exclusivos del mercado</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Volumen Total</p>
                <p className="text-lg font-bold text-white">{stats.totalVolume}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Colecciones</p>
                <p className="text-lg font-bold text-white">{stats.activeCollections}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Items Listados</p>
                <p className="text-lg font-bold text-white">{stats.itemsListed}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Ventas Hoy</p>
                <p className="text-lg font-bold text-white">{stats.dailySales}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Collections */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6 overflow-hidden">
          <h2 className="text-xl font-semibold text-white mb-4">Top Colecciones</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-700/50">
                  <th className="pb-3">#</th>
                  <th className="pb-3">Colección</th>
                  <th className="pb-3">Volumen</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Floor</th>
                  <th className="pb-3">24h Cambio</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {collections.map((col, idx) => (
                  <tr key={idx} className="border-b border-slate-700/30 hover:bg-slate-700/30">
                    <td className="py-3 text-slate-400">{idx + 1}</td>
                    <td className="py-3 font-medium">{col.name}</td>
                    <td className="py-3">{col.volume}</td>
                    <td className="py-3">{col.items.toLocaleString()}</td>
                    <td className="py-3">{col.floor}</td>
                    <td
                      className={`py-3 ${col.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {col.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Filter className="w-5 h-5 text-slate-400" />
            <div className="flex gap-2">
              {['all', 'art', 'gaming', 'collectibles', 'metaverse', 'music'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  } capitalize`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              {['all', 'common', 'rare', 'epic', 'legendary'].map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    selectedRarity === rarity
                      ? getRarityColor(rarity)
                      : 'bg-slate-700 text-slate-300 border-slate-600'
                  } capitalize`}
                >
                  {getRarityBadge(rarity)} {rarity === 'all' ? 'Todas' : rarity}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="price">Precio</option>
              <option value="likes">Likes</option>
              <option value="views">Vistas</option>
            </select>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map(nft => (
            <div
              key={nft.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              {nft.image ? (
                <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <span className="text-7xl">{nft.image}</span>
                  {!nft.listed && (
                    <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs text-white">
                      Not Listed
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-600" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{nft.name}</h3>
                    <p className="text-xs text-slate-400">{nft.collection}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(nft.rarity)}`}
                  >
                    {getRarityBadge(nft.rarity)} {nft.rarity}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {nft.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {nft.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div>
                    <p className="text-xs text-slate-400">Precio</p>
                    <p className="font-bold text-white">
                      {nft.price} {nft.currency}
                    </p>
                  </div>
                  {nft.listed && (
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-1">
                      Comprar <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-all duration-300">
            Cargar Más NFTs
          </button>
        </div>
      </div>
    </div>
  );
};
