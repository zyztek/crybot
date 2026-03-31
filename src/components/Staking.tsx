import { useState } from 'react';
import { Lock, TrendingUp, Clock, Coins, ArrowUpRight, ArrowDownRight, Award, Info } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';

interface StakingPlan {
  id: string;
  name: string;
  coin: string;
  apy: number;
  minAmount: number;
  lockPeriod: number; // days
  rewards: string;
}

const STAKING_PLANS: StakingPlan[] = [
  { id: '1', name: 'Flexible', coin: 'ETH', apy: 3.5, minAmount: 0.01, lockPeriod: 0, rewards: 'Daily' },
  { id: '2', name: '30 Days', coin: 'ETH', apy: 5.2, minAmount: 0.1, lockPeriod: 30, rewards: 'Weekly' },
  { id: '3', name: '60 Days', coin: 'ETH', apy: 7.8, minAmount: 0.1, lockPeriod: 60, rewards: 'Weekly' },
  { id: '4', name: '90 Days', coin: 'ETH', apy: 12.5, minAmount: 0.1, lockPeriod: 90, rewards: 'Weekly' },
  { id: '5', name: 'Flexible', coin: 'SOL', apy: 4.2, minAmount: 1, lockPeriod: 0, rewards: 'Daily' },
  { id: '6', name: '30 Days', coin: 'SOL', apy: 6.5, minAmount: 5, lockPeriod: 30, rewards: 'Weekly' },
  { id: '7', name: 'Flexible', coin: 'BTC', apy: 2.1, minAmount: 0.001, lockPeriod: 0, rewards: 'Daily' },
  { id: '8', name: '60 Days', coin: 'BTC', apy: 4.8, minAmount: 0.01, lockPeriod: 60, rewards: 'Weekly' },
];

interface StakedPosition {
  id: string;
  plan: string;
  coin: string;
  amount: number;
  startDate: string;
  endDate: string | null;
  earned: number;
  status: 'active' | 'unlocked';
}

const MOCK_STAKES: StakedPosition[] = [
  { id: '1', plan: '30 Days', coin: 'ETH', amount: 0.5, startDate: '2024-01-01', endDate: '2024-01-31', earned: 0.0089, status: 'active' },
  { id: '2', plan: 'Flexible', coin: 'SOL', amount: 10, startDate: '2024-01-05', endDate: null, earned: 0.042, status: 'active' },
];

export default function Staking() {
  const { language } = useCryptoStore();
  const [activeTab, setActiveTab] = useState<'earn' | 'positions'>('earn');
  const [selectedCoin, setSelectedCoin] = useState<string>('all');

  const filteredPlans = selectedCoin === 'all' 
    ? STAKING_PLANS 
    : STAKING_PLANS.filter(p => p.coin === selectedCoin);

  const totalStaked = MOCK_STAKES.reduce((acc, s) => acc + s.amount, 0);
  const totalEarned = MOCK_STAKES.reduce((acc, s) => acc + s.earned, 0);

  const t = {
    title: language === 'es' ? 'Staking Rewards' : 'Staking Rewards',
    subtitle: language === 'es' ? 'Earn passive income on your crypto' : 'Earn passive income on your crypto',
    earn: language === 'es' ? 'Ganar' : 'Earn',
    positions: language === 'es' ? 'Posiciones' : 'Positions',
    apy: language === 'es' ? 'APY' : 'APY',
    stake: language === 'es' ? 'Stake' : 'Stake',
    lockPeriod: language === 'es' ? 'Período de bloqueo' : 'Lock Period',
    rewards: language === 'es' ? 'Recompensas' : 'Rewards',
    minAmount: language === 'es' ? 'Monto mínimo' : 'Min Amount',
    active: language === 'es' ? 'Activo' : 'Active',
    unlocked: language === 'es' ? 'Desbloqueado' : 'Unlocked',
    earned: language === 'es' ? 'Ganado' : 'Earned',
    days: language === 'es' ? 'días' : 'days',
    flexible: language === 'es' ? 'Flexible' : 'Flexible',
    totalStaked: language === 'es' ? 'Total en Staking' : 'Total Staked',
    totalEarned: language === 'es' ? 'Total Ganado' : 'Total Earned',
    viewPlan: language === 'es' ? 'Ver Plan' : 'View Plan',
    daysAbbrev: 'd',
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-300 text-sm">{t.totalStaked}</p>
              <p className="text-white text-xl font-bold">$1,245.80</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-green-300 text-sm">{t.totalEarned}</p>
              <p className="text-white text-xl font-bold">$42.50</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-300 text-sm">Avg. APY</p>
              <p className="text-white text-xl font-bold">5.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-purple-500/20 pb-2">
        <button
          onClick={() => setActiveTab('earn')}
          className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
            activeTab === 'earn'
              ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.earn}
        </button>
        <button
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
            activeTab === 'positions'
              ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.positions}
        </button>
      </div>

      {/* Coin Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'ETH', 'SOL', 'BTC'].map(coin => (
          <button
            key={coin}
            onClick={() => setSelectedCoin(coin)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCoin === coin
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {coin === 'all' ? (language === 'es' ? 'Todas' : 'All') : coin}
          </button>
        ))}
      </div>

      {activeTab === 'earn' ? (
        /* Staking Plans Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{plan.coin}</span>
                  <span className="text-slate-400 text-sm">- {plan.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-xl">{plan.apy}%</p>
                  <p className="text-slate-400 text-xs">{t.apy}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t.lockPeriod}</span>
                  <span className="text-white">{plan.lockPeriod === 0 ? t.flexible : `${plan.lockPeriod} ${t.days}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t.rewards}</span>
                  <span className="text-white">{plan.rewards}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t.minAmount}</span>
                  <span className="text-white">{plan.minAmount} {plan.coin}</span>
                </div>
              </div>
              <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all">
                {t.stake}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Active Positions */
        <div className="space-y-4">
          {MOCK_STAKES.map(stake => (
            <div
              key={stake.id}
              className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stake.coin === 'ETH' ? 'bg-gradient-to-br from-blue-400 to-purple-500' :
                    stake.coin === 'SOL' ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                    'bg-gradient-to-br from-yellow-400 to-orange-500'
                  }`}>
                    <span className="text-white font-bold">{stake.coin}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{stake.amount} {stake.coin}</p>
                    <p className="text-slate-400 text-sm">{stake.plan} - {stake.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+{stake.earned} {stake.coin}</p>
                    <p className="text-slate-400 text-xs">{t.earned}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stake.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {stake.status === 'active' ? t.active : t.unlocked}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-200 text-sm">
          {language === 'es' 
            ? 'Los rendimientos de staking se calculan diariamente y se distribuyen según el plan escolhido. Los fondos en staking flexible pueden retirarse en cualquier momento.'
            : 'Staking rewards are calculated daily and distributed according to the selected plan. Flexible staking funds can be withdrawn at any time.'}
        </p>
      </div>
    </div>
  );
}