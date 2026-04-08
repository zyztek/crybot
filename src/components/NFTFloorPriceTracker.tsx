import { useState } from 'react';
import { TrendingUp, TrendingDown, Image, Flame, Clock, Users } from 'lucide-react';

interface NFTCollection {
  id: number;
  name: string;
  symbol: string;
  floorPrice: number;
  priceChange24h: number;
  volume24h: number;
  owners: number;
  items: number;
  image: string;
}

const NFTFloorPriceTracker: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'art' | 'pfp' | 'gaming'>('all');

  const collections: NFTCollection[] = [
    { id: 1, name: 'Bored Ape YC', symbol: 'BAYC', floorPrice: 28.5, priceChange24h: 5.2, volume24h: 12500000, owners: 9800, items: 10000, image: ' apes' },
    { id: 2, name: 'CryptoPunks', symbol: 'PUNKS', floorPrice: 42.8, priceChange24h: -2.1, volume24h: 8900000, owners: 4200, items: 10000, image: ' punks' },
    { id: 3, name: 'Azuki', symbol: 'AZUKI', floorPrice: 12.5, priceChange24h: 8.7, volume24h: 5600000, owners: 6500, items: 10000, image: ' beans' },
    { id: 4, name: 'Doodle', symbol: 'DOODLE', floorPrice: 3.2, priceChange24h: -5.8, volume24h: 2100000, owners: 8000, items: 10000, image: ' doodles' },
    { id: 5, name: 'Mutant Ape', symbol: 'MAYC', floorPrice: 15.8, priceChange24h: 3.4, volume24h: 7800000, owners: 12000, items: 20000, image: ' mutants' },
    { id: 6, name: 'World of Women', symbol: 'WOW', floorPrice: 2.1, priceChange24h: 12.5, volume24h: 1200000, owners: 5500, items: 10000, image: ' women' },
  ];

  const filteredCollections = filter === 'all' ? collections : collections.slice(0, 3);

  const totalVolume = collections.reduce((acc, c) => acc + c.volume24h, 0);
  const avgChange = collections.reduce((acc, c) => acc + c.priceChange24h, 0) / collections.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total 24h Volume</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalVolume / 1e6).toFixed(1)}M</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Avg Floor Change</span>
          </div>
          <p className={`text-2xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Total Owners</span>
          </div>
          <p className="text-2xl font-bold text-white">{collections.reduce((acc, c) => acc + c.owners, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'art', 'pfp', 'gaming'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                {collection.image}
              </div>
              <div>
                <h4 className="text-white font-semibold">{collection.name}</h4>
                <span className="text-slate-400 text-sm">{collection.symbol}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-400">Floor</span>
                <p className="text-white font-medium">{collection.floorPrice} ETH</p>
              </div>
              <div>
                <span className="text-slate-400">24h</span>
                <p className={`font-medium ${collection.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {collection.priceChange24h >= 0 ? '+' : ''}{collection.priceChange24h}%
                </p>
              </div>
              <div>
                <span className="text-slate-400">Volume</span>
                <p className="text-white">${(collection.volume24h / 1e6).toFixed(1)}M</p>
              </div>
              <div>
                <span className="text-slate-400">Owners</span>
                <p className="text-white">{collection.owners.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTFloorPriceTracker;