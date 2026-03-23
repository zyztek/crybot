import { useState } from 'react';
import { Clock, TrendingUp, Shield, Award, Lock, Unlock, Zap } from 'lucide-react';

const stakingPlans = [
  {
    id: 1,
    name: 'Micro Staking',
    icon: '🌱',
    minAmount: 0.0001,
    maxAmount: 0.5,
    duration: 7,
    apy: 5,
    compounding: false,
    earlyWithdrawal: true,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 2,
    name: 'Growth Pool',
    icon: '🌿',
    minAmount: 0.001,
    maxAmount: 1,
    duration: 14,
    apy: 12,
    compounding: true,
    earlyWithdrawal: true,
    penalty: 2,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    name: 'Power Vault',
    icon: '⚡',
    minAmount: 0.01,
    maxAmount: 5,
    duration: 30,
    apy: 25,
    compounding: true,
    earlyWithdrawal: true,
    penalty: 5,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    name: 'Mega Yield',
    icon: '🔥',
    minAmount: 0.05,
    maxAmount: 10,
    duration: 90,
    apy: 45,
    compounding: true,
    earlyWithdrawal: false,
    color: 'from-orange-500 to-red-600'
  }
];

const myStakes = [
  {
    id: 1,
    planName: 'Growth Pool',
    amount: 0.0025,
    startTime: '2024-01-15',
    endTime: '2024-01-29',
    earned: 0.00015,
    status: 'active'
  },
  {
    id: 2,
    planName: 'Micro Staking',
    amount: 0.0005,
    startTime: '2024-01-10',
    endTime: '2024-01-17',
    earned: 0.00002,
    status: 'completed'
  }
];

export default function Staking({ language }: { language: 'zh' | 'en' }) {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  const texts = {
    zh: {
      title: '质押中心',
      subtitle: '让你的加密货币为你工作 - 锁仓赚取被动收入',
      myStakes: '我的质押',
      plans: '质押方案',
      balance: '可用余额',
      stakeButton: '开始质押',
      earn: '预期收益',
      duration: '锁仓期限',
      compounding: '复利计算',
      earlyWithdrawal: '提前提取',
      penalty: '罚息',
      noPenalty: '无罚息',
      modalTitle: '确认质押',
      amountPlaceholder: '输入质押金额',
      confirmButton: '确认质押',
      cancelButton: '取消',
      minAmount: '最小金额',
      maxAmount: '最大金额',
      statusActive: '进行中',
      statusCompleted: '已完成',
    },
    en: {
      title: 'Staking Center',
      subtitle: 'Make your crypto work for you - Lock and earn passive income',
      myStakes: 'My Stakes',
      plans: 'Staking Plans',
      balance: 'Available Balance',
      stakeButton: 'Start Staking',
      earn: 'Expected Earnings',
      duration: 'Lock Period',
      compounding: 'Compound Interest',
      earlyWithdrawal: 'Early Withdrawal',
      penalty: 'Penalty',
      noPenalty: 'No Penalty',
      modalTitle: 'Confirm Staking',
      amountPlaceholder: 'Enter stake amount',
      confirmButton: 'Confirm Staking',
      cancelButton: 'Cancel',
      minAmount: 'Min Amount',
      maxAmount: 'Max Amount',
      statusActive: 'Active',
      statusCompleted: 'Completed',
    }
  };

  const t = texts[language];

  const handleStake = (planId: number) => {
    setSelectedPlan(planId);
    setShowModal(true);
  };

  const calculateEarnings = (amount: number, apy: number, days: number) => {
    return (amount * (apy / 100) * (days / 365)).toFixed(6);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-gray-400">{t.subtitle}</p>
      </div>

      <div className="flex items-center justify-between p-5 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{t.balance}</p>
            <p className="text-2xl font-bold text-yellow-400">0.00450 BTC</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Total Earned</p>
          <p className="text-xl font-bold text-green-400">0.00680 BTC</p>
        </div>
      </div>

      {myStakes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            {t.myStakes}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {myStakes.map((stake) => (
              <div key={stake.id} className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{stake.planName}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {stake.startTime} → {stake.endTime}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stake.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {stake.status === 'active' ? t.statusActive : t.statusCompleted}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-400 text-sm">Staked</p>
                    <p className="text-xl font-bold text-white">{stake.amount} BTC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Earned</p>
                    <p className="text-xl font-bold text-green-400">+{stake.earned} BTC</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          {t.plans}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakingPlans.map((plan) => (
            <div key={plan.id} className="group p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-slate-500/50 transition-all duration-300">
              <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {plan.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-3xl font-bold text-green-400">{plan.apy}%</span>
                <span className="text-gray-400">APY</span>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">{t.duration}:</span>
                  <span className="text-white font-medium">{plan.duration} days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">{t.compounding}:</span>
                  <span className={`font-medium ${plan.compounding ? 'text-green-400' : 'text-gray-400'}`}>
                    {plan.compounding ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {plan.earlyWithdrawal ? (
                    <Unlock className="w-4 h-4 text-green-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-gray-400">{t.earlyWithdrawal}:</span>
                  <span className={`font-medium ${plan.earlyWithdrawal ? 'text-green-400' : 'text-red-400'}`}>
                    {plan.earlyWithdrawal 
                      ? (plan.penalty ? `${t.penalty} ${plan.penalty}%` : t.noPenalty)
                      : '✗ Not Available'
                    }
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t.minAmount}</span>
                  <span className="text-white">{plan.minAmount} BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t.maxAmount}</span>
                  <span className="text-white">{plan.maxAmount} BTC</span>
                </div>
              </div>

              <button
                onClick={() => handleStake(plan.id)}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                {t.stakeButton}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">{t.modalTitle}</h3>
            
            {(() => {
              const plan = stakingPlans.find(p => p.id === selectedPlan)!;
              return (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center text-lg`}>
                        {plan.icon}
                      </div>
                      <div>
                        <p className="font-bold text-white">{plan.name}</p>
                        <p className="text-green-400">{plan.apy}% APY</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>{language === 'zh' ? `预计收益: 0.000036 BTC (${plan.apy}% APY)` : `Est. Earnings: 0.000036 BTC (${plan.apy}% APY)`}</p>
                      <p>{language === 'zh' ? `锁仓时间: ${plan.duration} 天` : `Lock Period: ${plan.duration} days`}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">{t.amountPlaceholder}</label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      min={plan.minAmount}
                      max={plan.maxAmount}
                      step="0.0001"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                      placeholder={`${plan.minAmount} - ${plan.maxAmount} BTC`}
                    />
                  </div>

                  {stakeAmount && (
                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <p className="text-green-400 font-medium">
                        {language === 'zh' ? '预计收益' : t.earn}: 0.000{calculateEarnings(parseFloat(stakeAmount), plan.apy, plan.duration)} BTC
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowModal(false); setStakeAmount(''); }}
                      className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      {t.cancelButton}
                    </button>
                    <button
                      onClick={() => { setShowModal(false); setStakeAmount(''); }}
                      className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white font-semibold rounded-xl transition-all"
                      disabled={!stakeAmount || parseFloat(stakeAmount) < plan.minAmount}
                    >
                      {t.confirmButton}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}