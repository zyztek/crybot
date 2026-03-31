import { useState } from 'react';
import {
  ShoppingCart,
  Crown,
  Star,
  Gift,
  Coins,
  Zap,
  Shield,
  Ticket,
  Sparkles,
} from 'lucide-react';

const shopItems = [
  {
    id: 1,
    name: 'Premium Membership',
    icon: Crown,
    iconColor: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-500/10',
    price: 500,
    priceType: 'FAUCBITS',
    category: 'premium',
    description: 'Unlock exclusive perks, higher rewards, and priority support',
    benefits: ['2x faucet rewards', 'Priority withdrawals', 'Exclusive faucets', 'No ads'],
    popular: true,
  },
  {
    id: 2,
    name: 'Instant Withdrawal',
    icon: Zap,
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    price: 50,
    priceType: 'FAUCBITS',
    category: 'service',
    description: 'Skip the queue and get your crypto instantly',
    benefits: ['Instant processing', 'No waiting time', 'Any amount'],
    popular: false,
  },
  {
    id: 3,
    name: 'Lucky Spin Ticket',
    icon: Ticket,
    iconColor: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-pink-500/10',
    price: 10,
    priceType: 'FAUCBITS',
    category: 'game',
    description: 'Try your luck and win up to 0.01 BTC!',
    benefits: ['Prizes up to 0.01 BTC', 'Daily special rewards'],
    popular: false,
  },
  {
    id: 4,
    name: 'Power Multiplier',
    icon: Sparkles,
    iconColor: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-rose-500/10',
    price: 100,
    priceType: 'FAUCBITS',
    category: 'boost',
    description: 'Multiply your next claim by 5x',
    benefits: ['5x reward boost', 'Works once', 'Stackable'],
    popular: false,
  },
  {
    id: 5,
    name: 'XP Booster',
    icon: Star,
    iconColor: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/10',
    price: 75,
    priceType: 'FAUCBITS',
    category: 'boost',
    description: 'Gain 3x XP on all actions for 24 hours',
    benefits: ['3x XP gain', '24 hour duration', 'Level up faster'],
    popular: false,
  },
  {
    id: 6,
    name: 'Staking Bonus',
    icon: Coins,
    iconColor: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    price: 200,
    priceType: 'FAUCBITS',
    category: 'boost',
    description: 'Get +5% APY on any staking plan',
    benefits: ['Extra +5% APY', 'One time use', 'Unlimited plans'],
    popular: false,
  },
  {
    id: 7,
    name: 'Weekly Battle Pass',
    icon: Shield,
    iconColor: 'text-red-400',
    bgGradient: 'from-red-500/20 to-rose-500/10',
    price: 300,
    priceType: 'FAUCBITS',
    category: 'pass',
    description: 'Complete weekly challenges and earn exclusive rewards',
    benefits: ['10 premium challenges', 'Exclusive rewards', 'Bonus faucet access'],
    popular: false,
  },
  {
    id: 8,
    name: 'Mystery Box',
    icon: Gift,
    iconColor: 'text-teal-400',
    bgGradient: 'from-teal-500/20 to-cyan-500/10',
    price: 25,
    priceType: 'FAUCBITS',
    category: 'game',
    description: 'Open a mystery box with random prizes',
    benefits: ['Random crypto rewards', 'Special items', 'Jackpot chance'],
    popular: false,
  },
];

export default function Shop({
  language,
  faucetBits,
  setFaucetBits,
}: {
  language: 'zh' | 'en';
  faucetBits: number;
  setFaucetBits: (value: number) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'all', nameEN: 'All Items', nameZH: '全部商品' },
    { id: 'premium', nameEN: 'Premium', nameZH: '会员' },
    { id: 'boost', nameEN: 'Boosts', nameZH: '加速' },
    { id: 'game', nameEN: 'Games', nameZH: '游戏' },
    { id: 'service', nameEN: 'Services', nameZH: '服务' },
    { id: 'pass', nameEN: 'Battle Pass', nameZH: '通行证' },
  ];

  const t = {
    title: language === 'zh' ? '商城' : 'Shop',
    subtitle:
      language === 'zh'
        ? '用 FaucetBits 赎取独家福利和升级'
        : 'Redeem exclusive benefits and upgrades with FaucetBits',
    balance: language === 'zh' ? '可用余额' : 'Your Balance',
    popular: language === 'zh' ? '热门' : 'Popular',
    buy: language === 'zh' ? '购买' : 'Buy Now',
    benefits: language === 'zh' ? '包含' : 'Includes',
    emptyCart: language === 'zh' ? '购物车是空的' : 'Your cart is empty',
    checkout: language === 'zh' ? '结算' : 'Checkout',
    total: language === 'zh' ? '总计' : 'Total',
    remove: language === 'zh' ? '移除' : 'Remove',
    addToCart: language === 'zh' ? '加入购物车' : 'Add to Cart',
    insufficientBalance: language === 'zh' ? '余额不足' : 'Insufficient Balance',
  };

  const filteredItems =
    selectedCategory === 'all'
      ? shopItems
      : shopItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    if (!cart.includes(itemId)) {
      setCart([...cart, itemId]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(id => id !== itemId));
  };

  const cartItems = shopItems.filter(item => cart.includes(item.id));
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePurchase = () => {
    if (cartTotal <= faucetBits) {
      setFaucetBits(faucetBits - cartTotal);
      setCart([]);
      setShowCart(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-gray-400">{t.subtitle}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-2xl flex-1">
          <Coins className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-gray-400 text-sm">{t.balance}</p>
            <p className="text-2xl font-bold text-yellow-400">
              {faucetBits.toLocaleString()} FaucetBits
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          className="relative p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors"
        >
          <ShoppingCart className="w-8 h-8 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            {language === 'zh' ? cat.nameZH : cat.nameEN}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-slate-500/50 transition-all duration-300"
            >
              {item.popular && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-xs font-bold text-white">
                  {t.popular}
                </div>
              )}

              <div
                className={`w-14 h-14 bg-gradient-to-br ${item.bgGradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.description}</p>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-400">{t.benefits}:</p>
                {item.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-yellow-400">
                      {item.price} {item.priceType}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={faucetBits < item.price || cart.includes(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      faucetBits < item.price || cart.includes(item.id)
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white'
                    }`}
                  >
                    {cart.includes(item.id) ? (
                      <>✓ {language === 'zh' ? '已添加' : 'Added'}</>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        {t.addToCart}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {language === 'zh' ? '购物车' : 'Shopping Cart'}
              </h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 py-8">{t.emptyCart}</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${item.bgGradient} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-yellow-400">
                          {item.price} {item.priceType}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
                      >
                        {t.remove}
                      </button>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-slate-600">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">{t.total}</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      {cartTotal.toLocaleString()} FaucetBits
                    </span>
                  </div>

                  {cartTotal > faucetBits && (
                    <p className="text-red-400 text-sm mb-3">{t.insufficientBalance}</p>
                  )}

                  <button
                    onClick={handlePurchase}
                    disabled={cartTotal > faucetBits}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      cartTotal > faucetBits
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white'
                    }`}
                  >
                    {t.checkout}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
