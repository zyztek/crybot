import { useState } from 'react';
import { Newspaper, TrendingUp, ExternalLink, Clock, Filter, Search } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: string;
  image?: string;
  url: string;
  trending: boolean;
}

const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'Bitcoin Surges Past $45,000 as Institutional Adoption Grows', source: 'CoinDesk', category: 'Bitcoin', timestamp: '2 hours ago', trending: true, url: '#' },
  { id: '2', title: 'Ethereum Layer 2 Solutions See Record Transaction Volume', source: 'The Block', category: 'Ethereum', timestamp: '4 hours ago', trending: true, url: '#' },
  { id: '3', title: 'Solana DeFi TVL Reaches New All-Time High', source: 'DeFi Pulse', category: 'DeFi', timestamp: '5 hours ago', trending: false, url: '#' },
  { id: '4', title: 'SEC Approves Multiple Spot Bitcoin ETF Applications', source: 'Bloomberg', category: 'Regulation', timestamp: '8 hours ago', trending: true, url: '#' },
  { id: '5', title: 'Polygon Releases zkEVM Mainnet Beta', source: 'Polygon Blog', category: 'Technology', timestamp: '12 hours ago', trending: false, url: '#' },
  { id: '6', title: 'Uniswap V4 Introduces Revolutionary Hook Architecture', source: 'Uniswap', category: 'DeFi', timestamp: '1 day ago', trending: true, url: '#' },
  { id: '7', title: 'Cardano Smart Contract Usage Reaches Milestone', source: 'CryptoSlate', category: 'Blockchain', timestamp: '1 day ago', trending: false, url: '#' },
  { id: '8', title: 'Arbitrum Governance Token ARB Sees Major Adoption', source: 'The Block', category: 'DeFi', timestamp: '2 days ago', trending: false, url: '#' },
];

const CATEGORIES = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'Regulation', 'Technology', 'Blockchain'];

export default function NewsAggregator() {
  const { language } = useCryptoStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = MOCK_NEWS.filter(news => {
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const t = {
    title: language === 'es' ? 'Crypto News' : 'Crypto News',
    subtitle: language === 'es' ? 'Últimas noticias del mundo cripto' : 'Latest news from the crypto world',
    trending: language === 'es' ? 'Tendencias' : 'Trending',
    latest: language === 'es' ? 'Últimas' : 'Latest',
    readMore: language === 'es' ? 'Leer más' : 'Read more',
    allCategories: language === 'es' ? 'Todas las categorías' : 'All categories',
    search: language === 'es' ? 'Buscar noticias...' : 'Search news...',
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-purple-500/20 rounded-lg text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h3 className="text-white font-bold">{t.trending}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_NEWS.filter(n => n.trending).slice(0, 4).map(news => (
            <a
              key={news.id}
              href={news.url}
              className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all group"
            >
              <div className="flex-1">
                <p className="text-white font-medium text-sm group-hover:text-orange-400 transition-colors line-clamp-2">
                  {news.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span>{news.source}</span>
                  <span>·</span>
                  <span>{news.timestamp}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-400 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map(news => (
          <div
            key={news.id}
            className="bg-slate-800/50 border border-purple-500/10 rounded-xl p-5 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {news.category}
                  </span>
                  {news.trending && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Trending
                    </span>
                  )}
                </div>
                <h3 className="text-white font-medium mb-2 hover:text-purple-400 transition-colors">
                  {news.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Newspaper className="w-4 h-4" />
                    {news.source}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.timestamp}
                  </span>
                </div>
              </div>
              <a
                href={news.url}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-all flex items-center gap-2 flex-shrink-0"
              >
                {t.readMore}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{language === 'es' ? 'No se encontraron noticias' : 'No news found'}</p>
        </div>
      )}
    </div>
  );
}