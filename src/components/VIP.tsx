import { useState } from 'react';
import { Crown, Star, Infinity, Check, Zap, ArrowUp, ArrowRight, TrendingUp, Gift, Award, Shield, Bell, Sparkles } from 'lucide-react';

const vipTiers = [
  {
    id: 'free',
    name: 'Free',
    nameZH: '免费会员',
    icon: Star,
    iconColor: 'text-gray-400',
    bgColor: 'from-gray-500/20 to-gray-600/10',
    borderColor: 'border-gray-600',
    price: 0,
    period: 'forever',
    periodZH: '永久',
    rewardsMultiplier: 1,
    withdrawalLimit: 0.001,
    dailyClaims: 10,
    prioritySupport: false,
    customUsername: false,
    exclusiveFaucets: false,
    noAds: false,
    features: [
      'Basic faucet access',
      'Standard rewards',
      'Community chat',
      'Referral program'
    ],
    featuresZH: [
      '基础水龙头访问',
      '标准奖励',
      '社区聊天',
      '推荐计划'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    nameZH: '黄金会员',
    icon: Award,
    iconColor: 'text-yellow-400',
    bgColor: 'from-yellow-500/20 to-amber-500/10',
    borderColor: 'border-yellow-500',
    price: 9.99,
    period: 'month',
    periodZH: '每月',
    rewardsMultiplier: 1.5,
    withdrawalLimit: 0.01,
    dailyClaims: 20,
    prioritySupport: true,
    customUsername: true,
    exclusiveFaucets: true,
    noAds: true,
    features: [
      '1.5x faucet rewards',
      '0.01 BTC withdrawal limit',
      'Priority support',
      'Custom username',
      '3 exclusive faucets',
      'No advertisements',
      'Gold badge profile',
      'Weekly bonus'
    ],
    featuresZH: [
      '1.5倍水龙头奖励',
      '0.01 BTC提现限额',
      '优先支持',
      '自定义用户名',
      '3个专属水龙头',
      '无广告',
      '金色徽章标识',
      '每周奖励'
    ],
    popular: true
  },
  {
    id: 'platinum',
    name: 'Platinum',
    nameZH: '铂金会员',
    icon: Crown,
    iconColor: 'text-slate-200',
    bgColor: 'from-slate-400/20 to-gray-500/10',
    borderColor: 'border-slate-300',
    price: 29.99,
    period: 'month',
    periodZH: '每月',
    rewardsMultiplier: 2,
    withdrawalLimit: 0.05,
    dailyClaims: 50,
    prioritySupport: true,
    customUsername: true,
    exclusiveFaucets: true,
    noAds: true,
    features: [
      '2x faucet rewards',
      '0.05 BTC withdrawal limit',
      'VIP support 24/7',
      'Custom username + frame',
      '10 exclusive faucets',
      'No advertisements',
      'Platinum badge + glow',
      'Daily bonus rewards',
      'Early access features',
      '4% referral bonus'
    ],
    featuresZH: [
      '2倍水龙头奖励',
      '0.05 BTC提现限额',
      '24/7 VIP支持',
      '自定义用户名+头像框',
      '10个专属水龙头',
      '无广告',
      '铂金徽章+光效',
      '每日额外奖励',
      '抢先体验新功能',
      '4%推荐奖励'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameZH: '钻石会员',
    icon: Sparkles,
    iconColor: 'text-cyan-400',
    bgColor: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-400',
    price: 99.99,
    period: 'month',
    periodZH: '每月',
    rewardsMultiplier: 3,
    withdrawalLimit: Infinity,
    dailyClaims: Infinity,
    prioritySupport: true,
    customUsername: true,
    exclusiveFaucets: true,
    noAds: true,
    features: [
      '3x faucet rewards',
      'Unlimited withdrawal',
      'Dedicated manager',
      'Custom profile themes',
      'All exclusive faucets',
      'No advertisements',
      'Diamond badge + animation',
      'Hourly bonus rewards',
      'Feature requests priority',
      '5% referral bonus',
      'VIP events access'
    ],
    featuresZH: [
      '3倍水龙头奖励',
      '无限提现',
      '专属客户经理',
      '自定义个人主题',
      '所有专属水龙头',
      '无广告',
      '钻石徽章+动画',
      '每小时额外奖励',
      '功能请求优先权',
      '5%推荐奖励',
      'VIP活动访问'
    ]
  }
];

const currentBenefits = [
  { icon: Check, label: '1.5x Rewards', labelZH: '1.5倍奖励', color: 'text-green-400' },
  { icon: Zap, label: 'Priority Claims', labelZH: '优先领取', color: 'text-yellow-400' },
  { icon: Shield, label: 'No Daily Limits', labelZH: '无每日限制', color: 'text-blue-400' },
  { icon: Bell, label: 'Exclusive Faucets', labelZH: '专属水龙头', color: 'text-purple-400' },
  { icon: Gift, label: 'Weekly Bonuses', labelZH: '每周奖励', color: 'text-pink-400' }
];

export default function VIP({ language }: { language: 'zh' | 'en' }) {
  const [currentTier] = useState('gold');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const t = {
    title: language === 'zh' ? 'VIP会员' : 'VIP Membership',
    subtitle: language === 'zh' ? '解锁专属特权和额外奖励' : 'Unlock exclusive privileges and earn more',
    currentPlan: language === 'zh' ? '当前方案' : 'Current Plan',
    upgradeTo: language === 'zh' ? '升级到' : 'Upgrade to',
    perMonth: language === 'zh' ? '/月' : '/month',
    forever: language === 'zh' ? '永久免费' : 'Forever Free',
    selectPlan: language === 'zh' ? '选择方案' : 'Select Plan',
    currentActive: language === 'zh' ? '当前使用' : 'Current',
    rewardsMultiplier: language === 'zh' ? '奖励倍率' : 'Rewards Multiplier',
    withdrawalLimit: language === 'zh' ? '提现限额' : 'Withdrawal Limit',
    dailyClaims: language === 'zh' ? '每日领取' : 'Daily Claims',
    unlimited: language === 'zh' ? '无限制' : 'Unlimited',
    popular: language === 'zh' ? '最受欢迎' : 'Most Popular',
    bestValue: language === 'zh' ? '最佳性价比' : 'Best Value',
    includes: language === 'zh' ? '包含' : 'Includes',
  };

  const currentPlan = vipTiers.find(t => t.id === currentTier)!;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          <Crown className="w-10 h-10 text-yellow-400" />
          {t.title}
        </h1>
        <p className="text-gray-400">{t.subtitle}</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 rounded-2xl border border-yellow-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          {t.currentPlan}
        </h2>
        <div className="flex items-center gap-6 flex-wrap">
          <div className={`w-16 h-16 bg-gradient-to-br ${currentPlan.bgColor} rounded-2xl flex items-center justify-center border ${currentPlan.borderColor}`}>
            <currentPlan.icon className={`w-8 h-8 ${currentPlan.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">{currentPlan.name} {language === 'zh' ? currentPlan.nameZH : ''}</h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-yellow-400 font-semibold">
                {t.rewardsMultiplier}: {currentPlan.rewardsMultiplier}x
              </span>
              <span className="text-gray-400">
                | {t.withdrawalLimit}: {currentPlan.withdrawalLimit === Infinity ? t.unlimited : `>${currentPlan.withdrawalLimit} BTC`}
              </span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {currentBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                  <Icon className={`w-4 h-4 ${benefit.color}`} />
                  <span className="text-white text-sm">{language === 'zh' ? benefit.labelZH : benefit.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          {t.upgradeTo}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vipTiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrent = tier.id === currentTier;
            const isUpgrade = vipTiers.findIndex(t => t.id === currentTier) < vipTiers.findIndex(t => t.id === tier.id);

            return (
              <div 
                key={tier.id}
                className={`relative p-5 rounded-2xl border transition-all duration-300 ${
                  isCurrent
                    ? `bg-gradient-to-br ${tier.bgColor} border-2 ${tier.borderColor} shadow-lg ${tier.borderColor.split('-')[1]}-500/20`
                    : isUpgrade
                      ? `bg-gradient-to-br ${tier.bgColor} border-slate-700 hover:border-slate-500 cursor-pointer`
                      : `bg-gradient-to-br ${tier.bgColor} border-slate-700 opacity-60`
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-xs font-bold text-white">
                    {t.popular}
                  </div>
                )}
                {tier.id === 'diamond' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t.bestValue}
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-br ${tier.bgColor} rounded-2xl flex items-center justify-center border ${tier.borderColor} mb-4 ${!isUpgrade && !isCurrent ? 'grayscale' : ''}`}>
                  <Icon className={`w-8 h-8 ${tier.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{language === 'zh' ? tier.nameZH : ''}</p>

                <div className="mb-4">
                  {tier.id === 'free' ? (
                    <p className="text-2xl font-bold text-white">{t.forever}</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-yellow-400">${tier.price}</span>
                      <span className="text-gray-400">{t.perMonth}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.rewardsMultiplier}</span>
                    <span className={`font-semibold ${tier.rewardsMultiplier > 1 ? 'text-green-400' : 'text-white'}`}>
                      {tier.rewardsMultiplier}x
                      {tier.rewardsMultiplier > currentPlan.rewardsMultiplier && (
                        <span><ArrowUp className="w-3 h-3 inline ml-1" /></span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.withdrawalLimit}</span>
                    <span className="font-semibold text-white">
                      {tier.withdrawalLimit === Infinity ? t.unlimited : `>${tier.withdrawalLimit} BTC`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.dailyClaims}</span>
                    <span className="font-semibold text-white">
                      {tier.dailyClaims === Infinity ? t.unlimited : String(tier.dailyClaims)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 mb-4">
                  <p className="text-xs text-gray-400 mb-2">{t.includes}:</p>
                  <ul className="space-y-1">
                    {tier.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-center gap-1">
                        <Check className={`w-3 h-3 ${isCurrent || isUpgrade ? 'text-green-400' : 'text-gray-500'}`} />
                        {language === 'zh' ? tier.featuresZH[idx] : feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {isCurrent ? (
                  <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    {t.currentActive}
                  </button>
                ) : isUpgrade ? (
                  <button 
                    onClick={() => setShowUpgrade(!showUpgrade)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {t.selectPlan}
                  </button>
                ) : (
                  <button className="w-full py-3 bg-slate-700 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
                    Locked
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-3">
          <Gift className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="text-lg font-bold text-white">
              {language === 'zh' ? '年付优惠' : 'Annual Discount'}
            </h3>
            <p className="text-gray-400 text-sm">
              {language === 'zh' ? '购买年度会员可享受20%折扣！' : 'Get 20% off when you buy annual membership!'}
            </p>
          </div>
          <button className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl">
            {language === 'zh' ? '查看年付计划' : 'View Annual Plans'}
          </button>
        </div>
      </div>
    </div>
  );
}