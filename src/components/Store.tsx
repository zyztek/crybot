import { useState } from 'react';
import { ShoppingCart, Star, Check, X, Gift, Zap, Crown, Award } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export default function Store() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPoints] = useState(12500);
  const [ownedItems, setOwnedItems] = useState<number[]>([1, 5]);
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { id: 'all', name: t('store.all'), icon: Gift },
    { id: 'electronics', name: t('store.electronics'), icon: Zap },
    { id: 'giftCards', name: t('store.giftCards'), icon: Star },
    { id: 'crypto', name: t('store.crypto'), icon: Award },
    { id: 'premium', name: t('store.premium'), icon: Crown },
  ];

  const storeItems = [
    {
      id: 1,
      name: 'Amazon Gift Card $10',
      category: 'giftCards',
      price: 2000,
      image: '🎁',
      stock: 15,
      featured: true
    },
    {
      id: 2,
      name: 'Bitcoin 0.001',
      category: 'crypto',
      price: 5000,
      image: '₿',
      stock: 5,
      featured: true
    },
    {
      id: 3,
      name: 'Ethereum 0.01',
      category: 'crypto',
      price: 4500,
      image: 'Ξ',
      stock: 8,
      featured: false
    },
    {
      id: 4,
      name: 'Wireless Earbuds',
      category: 'electronics',
      price: 15000,
      image: '🎧',
      stock: 3,
      featured: true
    },
    {
      id: 5,
      name: 'VIP Gold Membership',
      category: 'premium',
      price: 30000,
      image: '👑',
      stock: 999,
      featured: true
    },
    {
      id: 6,
      name: 'PlayStation Gift Card $25',
      category: 'giftCards',
      price: 5000,
      image: '🎮',
      stock: 7,
      featured: false
    },
    {
      id: 7,
      name: 'USB Flash Drive 64GB',
      category: 'electronics',
      price: 3000,
      image: '💾',
      stock: 20,
      featured: false
    },
    {
      id: 8,
      name: 'Solana 1 SOL',
      category: 'crypto',
      price: 4000,
      image: '◎',
      stock: 10,
      featured: false
    },
    {
      id: 9,
      name: 'Netflix Subscription 1 Month',
      category: 'premium',
      price: 8000,
      image: '🎬',
      stock: 999,
      featured: true
    },
    {
      id: 10,
      name: 'Steam Gift Card $20',
      category: 'giftCards',
      price: 4000,
      image: '🎲',
      stock: 12,
      featured: false
    },
    {
      id: 11,
      name: 'Dogecoin 500 DOGE',
      category: 'crypto',
      price: 1000,
      image: 'Ð',
      stock: 25,
      featured: false
    },
    {
      id: 12,
      name: 'Wireless Mouse',
      category: 'electronics',
      price: 2000,
      image: '🖱️',
      stock: 18,
      featured: false
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  const featuredItems = storeItems.filter(item => item.featured);

  const handleBuy = (itemId: number, price: number) => {
    if (userPoints >= price && !ownedItems.includes(itemId)) {
      setOwnedItems([...ownedItems, itemId]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const isOwned = (itemId: number) => ownedItems.includes(itemId);

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/80 mb-1">{t('store.balance')}</div>
            <div className="text-4xl font-bold text-white flex items-center gap-2">
              <span className="text-yellow-300">⭐</span>
              {userPoints.toLocaleString()} {t('store.points')}
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <ShoppingCart className="text-white text-3xl" />
          </div>
        </div>
        <p className="text-white/90 mt-4">{t('store.description')}</p>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon size={18} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Featured Items */}
      {selectedCategory === 'all' && featuredItems.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="text-yellow-400" />
            {t('store.featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 relative"
              >
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Hot
                </div>
                <div className="text-5xl text-center mb-4">{item.image}</div>
                <h3 className="text-white font-bold text-center mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-yellow-400 font-bold flex items-center gap-1">
                    <span>⭐</span>
                    {item.price.toLocaleString()}
                  </div>
                  {isOwned(item.id) ? (
                    <span className="flex items-center gap-1 text-green-400 bg-green-500/20 px-3 py-1 rounded-lg">
                      <Check size={16} /> {t('store.owned')}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(item.id, item.price)}
                      className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        userPoints >= item.price
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {t('store.buy')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 hover:border-white/40 transition-all hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">{item.image}</div>
              {item.featured && <Star className="text-yellow-400 fill-yellow-400" />}
            </div>
            
            <h3 className="text-white font-bold mb-2 line-clamp-2">{item.name}</h3>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-xl font-bold text-yellow-400 flex items-center gap-1">
                <span>⭐</span>
                {item.price.toLocaleString()}
              </div>
              <div className={`text-sm ${
                item.stock > 10 ? 'text-green-400' : item.stock > 0 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {item.stock} {item.stock === 1 ? 'left' : 'left'}
              </div>
            </div>

            <button
              onClick={() => handleBuy(item.id, item.price)}
              disabled={isOwned(item.id) || item.stock === 0 || userPoints < item.price}
              className={`w-full mt-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                isOwned(item.id)
                  ? 'bg-green-500/20 text-green-400'
                  : item.stock === 0
                  ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                  : userPoints >= item.price
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isOwned(item.id) ? (
                <>
                  <Check size={18} /> {t('store.owned')}
                </>
              ) : item.stock === 0 ? (
                <>
                  <X size={18} /> {t('store.outOfStock')}
                </>
              ) : userPoints >= item.price ? (
                <>
                  <ShoppingCart size={18} /> {t('store.buy')}
                </>
              ) : (
                <>
                  <X size={18} /> Insufficient Points
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="text-2xl" />
          <div>
            <div className="font-bold">{t('store.success')}</div>
            <div className="text-sm text-white/80">Check your inventory!</div>
          </div>
        </div>
      )}
    </div>
  );
}