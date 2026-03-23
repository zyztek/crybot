import { useState } from 'react';
import { Target, CheckCircle2, Clock, Trophy, Flame, Star, RefreshCw } from 'lucide-react';

const missions = [
  {
    id: 1,
    name: 'Complete 5 Faucet Claims',
    nameZH: '完成5次水龙头领取',
    description: 'Claim from any faucet 5 times',
    descriptionZH: '从任意水龙头领取5次',
    icon: Target,
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    progress: 3,
    target: 5,
    reward: 50,
    rewardType: 'FAUCBITS',
    completed: false
  },
  {
    id: 2,
    name: 'Login 3 Days in a Row',
    nameZH: '连续登录3天',
    description: 'Keep your streak going',
    descriptionZH: '保持你的登录连胜',
    icon: Flame,
    iconColor: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    progress: 3,
    target: 3,
    reward: 100,
    rewardType: 'FAUCBITS',
    completed: true
  },
  {
    id: 3,
    name: 'Invite 1 Friend',
    nameZH: '邀请1位好友',
    description: 'Share your referral link',
    descriptionZH: '分享你的邀请链接',
    icon: Star,
    iconColor: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-500/10',
    progress: 0,
    target: 1,
    reward: 200,
    rewardType: 'FAUCBITS',
    completed: false
  },
  {
    id: 4,
    name: 'Make a Withdrawal',
    nameZH: '进行一次提现',
    description: 'Withdraw your earnings',
    descriptionZH: '提现你的收益',
    icon: CheckCircle2,
    iconColor: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/10',
    progress: 0,
    target: 1,
    reward: 75,
    rewardType: 'FAUCBITS',
    completed: false
  },
  {
    id: 5,
    name: 'Stake for 7 Days',
    nameZH: '质押7天',
    description: 'Start staking and maintain for a week',
    descriptionZH: '开始质押并保持一周',
    icon: Clock,
    iconColor: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-pink-500/10',
    progress: 0,
    target: 7,
    reward: 150,
    rewardType: 'FAUCBITS',
    completed: false
  },
  {
    id: 6,
    name: 'Reach Level 5',
    nameZH: '达到5级',
    description: 'Level up through activities',
    descriptionZH: '通过活动升级',
    icon: Trophy,
    iconColor: 'text-teal-400',
    bgGradient: 'from-teal-500/20 to-cyan-500/10',
    progress: 3,
    target: 5,
    reward: 500,
    rewardType: 'FAUCBITS',
    completed: false
  }
];

export default function DailyMissions({ language }: { language: 'zh' | 'en' }) {
  const [timeLeft] = useState('12:34:56');

  const completedCount = missions.filter(m => m.completed).length;
  const totalReward = missions.filter(m => m.completed).reduce((sum, m) => sum + m.reward, 0);
  const progressPercent = (completedCount / missions.length) * 100;

  const t = {
    title: language === 'zh' ? '每日任务' : 'Daily Missions',
    subtitle: language === 'zh' ? '完成任务赚取 FaucetBits 并提升等级' : 'Complete tasks to earn FaucetBits and level up',
    progress: language === 'zh' ? '今日进度' : "Today's Progress",
    completed: language === 'zh' ? '已完成' : 'Completed',
    resetIn: language === 'zh' ? '重置倒计时' : 'Resets in',
    reward: language === 'zh' ? '奖励' : 'Reward',
    rewardClaimed: language === 'zh' ? '已领取' : 'Claimed',
    collectAll: language === 'zh' ? '收集全部' : 'Collect All',
    startMission: language === 'zh' ? '开始任务' : 'Start Mission',
    inProgress: language === 'zh' ? '进行中' : 'In Progress',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-gray-400 text-sm">{t.resetIn}</p>
            <p className="text-xl font-bold text-white">{timeLeft}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{t.progress}</h2>
            <p className="text-gray-400 text-sm mt-1">{completedCount} / {missions.length} {t.completed}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">{language === 'zh' ? '总奖励' : 'Total Earned'}</p>
            <p className="text-2xl font-bold text-yellow-400">{totalReward.toLocaleString()} FaucetBits</p>
          </div>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-400 mt-2">{progressPercent.toFixed(0)}%</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {missions.map(mission => {
          const Icon = mission.icon;
          const progressPercent = (mission.progress / mission.target) * 100;
          
          return (
            <div 
              key={mission.id} 
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                mission.completed 
                  ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30' 
                  : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-slate-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${mission.bgGradient} rounded-2xl flex items-center justify-center shrink-0`}>
                  {mission.completed ? (
                    <CheckCircle2 className="w-7 h-7 text-green-400" />
                  ) : (
                    <Icon className={`w-7 h-7 ${mission.iconColor}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {language === 'zh' ? mission.nameZH : mission.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {language === 'zh' ? mission.descriptionZH : mission.description}
                  </p>

                  {!mission.completed && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">{t.inProgress}</span>
                        <span className="text-white">{mission.progress} / {mission.target}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">🪙</span>
                      <span className="font-bold text-yellow-400">{mission.reward} FaucetBits</span>
                    </div>
                    {mission.completed ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.rewardClaimed}
                      </span>
                    ) : (
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white text-sm font-semibold rounded-xl transition-all">
                        {mission.progress > 0 ? language === 'zh' ? '继续' : 'Continue' : t.startMission}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}