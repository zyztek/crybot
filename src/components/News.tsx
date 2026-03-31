import { Newspaper, Bell, Clock, ArrowRight, Zap, Award, Flame } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Bitcoin Reaches New All-Time High',
    titleZH: '比特币创下历史新高',
    category: 'Market',
    categoryZH: '市场',
    categoryColor: 'green',
    content:
      'Bitcoin has surged past $100,000 for the first time, marking a historic milestone. Analysts predict continued growth as institutional adoption accelerates.',
    contentZH:
      '比特币首次突破10万美元，创下历史里程碑。分析师预测随着机构采用加速，价格将继续上涨。',
    source: 'CryptoNews',
    time: '2 hours ago',
    timeZH: '2小时前',
    trending: true,
    image: '📈',
  },
  {
    id: 2,
    title: 'New Ethereum Upgrade Announced',
    titleZH: '以太坊新升级宣布',
    category: 'Technology',
    categoryZH: '技术',
    categoryColor: 'blue',
    content:
      'Ethereum Foundation reveals plans for the next major network upgrade, promising significantly reduced gas fees and faster transactions.',
    contentZH: '以太坊基金会公布下一次重大网络升级计划，承诺大幅降低Gas费用并加快交易速度。',
    source: 'ETH Daily',
    time: '4 hours ago',
    timeZH: '4小时前',
    trending: true,
    image: '⚡',
  },
  {
    id: 3,
    title: 'CryptoFaucet Hub Launches VIP Program',
    titleZH: 'CryptoFaucet Hub 推出VIP计划',
    category: 'Platform',
    categoryZH: '平台',
    categoryColor: 'purple',
    content:
      'We are excited to announce our new VIP membership tiers with exclusive benefits including multipliers, priority withdrawals, and premium faucets.',
    contentZH: '我们很高兴宣布新的VIP会员等级，提供独家福利包括乘数、优先提现和高级水龙头。',
    source: 'Official',
    time: '6 hours ago',
    timeZH: '6小时前',
    trending: false,
    image: '🎉',
  },
  {
    id: 4,
    title: 'Solana Network Breaks Transaction Records',
    titleZH: 'Solana网络打破交易记录',
    category: 'Market',
    categoryZH: '市场',
    categoryColor: 'green',
    content:
      'Solana has processed over 40 million transactions in a single day, showcasing its high-speed capabilities and growing ecosystem.',
    contentZH: 'Solana在一天内处理了超过4000万笔交易，展示了其高速能力和不断增长的生态系统。',
    source: 'Solana News',
    time: '8 hours ago',
    timeZH: '8小时前',
    trending: true,
    image: '🚀',
  },
  {
    id: 5,
    title: 'New Staking Pool Now Available',
    titleZH: '新的质押池现已开放',
    category: 'Update',
    categoryZH: '更新',
    categoryColor: 'yellow',
    content:
      'Our new Mega Yield staking pool offers up to 45% APY with a 90-day lock period. Start earning passive income today!',
    contentZH: '我们新的Mega Yield质押池提供高达45%的APY，锁定期90天。今天就开始赚取被动收入！',
    source: 'Official',
    time: '12 hours ago',
    timeZH: '12小时前',
    trending: false,
    image: '💎',
  },
  {
    id: 6,
    title: 'Dogecoin Community Reaches New Milestone',
    titleZH: '狗狗币社区达成新里程碑',
    category: 'Community',
    categoryZH: '社区',
    categoryColor: 'orange',
    content:
      'The Dogecoin community has reached 5 million active wallets, continuing its growth as one of the most beloved cryptocurrencies.',
    contentZH: '狗狗币社区已达到500万活跃钱包，继续作为最受喜爱的加密货币之一增长。',
    source: 'DOGE Times',
    time: '1 day ago',
    timeZH: '1天前',
    trending: false,
    image: '🐕',
  },
];

const quickStats = [
  { label: 'Market Cap', labelZH: '市值', value: '$3.2T', change: '+5.2%', isUp: true },
  { label: '24h Volume', labelZH: '24h交易量', value: '$128B', change: '+12.8%', isUp: true },
  { label: 'BTC Dominance', labelZH: 'BTC主导地位', value: '52%', change: '-1.2%', isUp: false },
  { label: 'Active Wallets', labelZH: '活跃钱包', value: '420M', change: '+3.5%', isUp: true },
];

export default function News({ language }: { language: 'zh' | 'en' }) {
  const categoryColors: Record<string, string> = {
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  const t = {
    title: language === 'zh' ? '加密新闻' : 'Crypto News',
    subtitle:
      language === 'zh' ? '最新的加密货币和市场更新' : 'Latest cryptocurrency and market updates',
    trending: language === 'zh' ? '热门' : 'Trending',
    readMore: language === 'zh' ? '阅读更多' : 'Read More',
    allNews: language === 'zh' ? '所有新闻' : 'All News',
    marketStats: language === 'zh' ? '市场统计' : 'Market Stats',
    featured: language === 'zh' ? '精选' : 'Featured',
    latest: language === 'zh' ? '最新' : 'Latest',
  };

  const trendingNews = newsItems.filter(item => item.trending);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Newspaper className="w-10 h-10 text-blue-400" />
            {t.title}
          </h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors text-white">
          <Bell className="w-4 h-4" />
          {language === 'zh' ? '开启通知' : 'Enable Notifications'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-gray-400 text-sm">{language === 'zh' ? stat.labelZH : stat.label}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span
                className={`text-sm font-medium flex items-center gap-1 ${
                  stat.isUp ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stat.isUp ? '↑' : '↓'} {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-400" />
          {t.trending}
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {trendingNews.map(item => (
            <div
              key={item.id}
              className="group p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {item.trending && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="text-5xl mb-4">{item.image}</div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.categoryColor]}`}
                >
                  {language === 'zh' ? item.categoryZH : item.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {language === 'zh' ? item.titleZH : item.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {language === 'zh' ? item.contentZH : item.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'zh' ? item.timeZH : item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{item.source}</span>
                  {item.trending && <Award className="w-4 h-4 text-yellow-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-400" />
          {t.latest}
        </h2>
        <div className="space-y-4">
          {newsItems.slice(0, 4).map(item => (
            <div
              key={item.id}
              className="group p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-500/50 transition-all duration-300 flex gap-4"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${categoryColors[item.categoryColor].replace('/20', '/10')} rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform`}
              >
                {item.image}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.categoryColor]}`}
                  >
                    {language === 'zh' ? item.categoryZH : item.category}
                  </span>
                  {item.trending && (
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {t.trending}
                    </span>
                  )}
                </div>

                <h3 className="text-md font-bold text-white mb-1 line-clamp-1">
                  {language === 'zh' ? item.titleZH : item.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-1 mb-2">
                  {language === 'zh' ? item.contentZH : item.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{item.source}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{language === 'zh' ? item.timeZH : item.time}</span>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 mx-auto">
          {t.allNews}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
