import { useState, useEffect } from 'react';
import { Target, Zap, Clock, TrendingUp, Users, Gift, Check, Lock } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export default function Missions() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [claimedMissions, setClaimedMissions] = useState<number[]>([1, 4]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const missions = [
    {
      id: 1,
      title: 'Claim 5 Times',
      description: 'Claim from any faucet 5 times',
      progress: 5,
      target: 5,
      reward: 200,
      difficulty: 'easy' as const,
      icon: Target,
    },
    {
      id: 2,
      title: 'Visit Store',
      description: 'Browse the rewards store',
      progress: 0,
      target: 1,
      reward: 50,
      difficulty: 'easy' as const,
      icon: Gift,
    },
    {
      id: 3,
      title: 'Daily Login Streak',
      description: 'Login 7 days in a row',
      progress: 5,
      target: 7,
      reward: 500,
      difficulty: 'medium' as const,
      icon: Clock,
    },
    {
      id: 4,
      title: 'Refer a Friend',
      description: 'Get a new user to sign up',
      progress: 1,
      target: 1,
      reward: 1000,
      difficulty: 'medium' as const,
      icon: Users,
    },
    {
      id: 5,
      title: ' accumulates 10000 in points',
      description: 'Earn 10000 total points from all activities',
      progress: 7500,
      target: 10000,
      reward: 1500,
      difficulty: 'hard' as const,
      icon: TrendingUp,
    },
    {
      id: 6,
      title: 'Complete 10 Claims',
      description: 'Make 10 total claims across all faucets',
      progress: 8,
      target: 10,
      reward: 400,
      difficulty: 'easy' as const,
      icon: Zap,
    },
    {
      id: 7,
      title: 'Stake for First Time',
      description: 'Make your first staking deposit',
      progress: 0,
      target: 1,
      reward: 2000,
      difficulty: 'medium' as const,
      icon: Target,
    },
    {
      id: 8,
      title: 'Reach Level 10',
      description: 'Unlock Level 10 by earning XP',
      progress: 2450,
      target: 5000,
      reward: 3000,
      difficulty: 'hard' as const,
      icon: TrendingUp,
    },
  ];

  const totalReward = missions.reduce((sum, m) => sum + m.reward, 0);
  const completedMissions = missions.filter(m => m.progress >= m.target).length;

  const progressPercent = (mission: any) => {
    return Math.min(100, Math.round((mission.progress / mission.target) * 100));
  };

  const difficultyColor = {
    easy: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    hard: 'from-red-500 to-pink-500',
  };

  const difficultyBorder = {
    easy: 'border-green-500/30',
    medium: 'border-yellow-500/30',
    hard: 'border-red-500/30',
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="text-gray-400 mb-2">
            {completedMissions}/{missions.length} {t('missions.title')}
          </div>
          <div className="text-3xl font-bold text-white">
            {Math.round((completedMissions / missions.length) * 100)}%
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${(completedMissions / missions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="text-gray-400 mb-2">{t('missions.reward')}</div>
          <div className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
            <span>⭐</span>
            {totalReward.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400 mt-1">{t('store.points')} Available</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">{t('missions.dailyReset')}</span>
            <Clock className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-2">{t('missions.title')}</h2>
        <p className="text-gray-400 mb-6">{t('missions.description')}</p>

        <div className="space-y-4">
          {missions.map(mission => {
            const Icon = mission.icon;
            const isCompleted = mission.progress >= mission.target;
            const isClaimed = claimedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                className={`bg-gradient-to-r ${isCompleted ? 'from-green-500/10 to-emerald-500/10' : 'from-white/5 to-white/5'} border ${
                  isCompleted ? 'border-green-500/30' : difficultyBorder[mission.difficulty]
                } rounded-xl p-5 transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-gradient-to-br ${difficultyColor[mission.difficulty]} p-3 rounded-xl`}
                  >
                    <Icon className="text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                        {mission.title}
                      </h3>
                      {isCompleted && <Check className="text-green-400" size={16} />}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{mission.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-400">
                          {t('missions.progress')}:
                          <span
                            className={`font-bold ml-1 ${isCompleted ? 'text-green-400' : 'text-white'}`}
                          >
                            {mission.progress}/{mission.target}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            mission.difficulty === 'easy'
                              ? 'bg-green-500/20 text-green-400'
                              : mission.difficulty === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {t(`missions.${mission.difficulty}`)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-yellow-400 font-bold">
                        <span>⭐</span>
                        {mission.reward}
                      </div>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 mt-4 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : `bg-gradient-to-r ${difficultyColor[mission.difficulty]}`
                        }`}
                        style={{ width: `${progressPercent(mission)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {isClaimed ? (
                      <span className="flex items-center gap-1 text-green-400 bg-green-500/20 px-4 py-2 rounded-lg font-bold">
                        <Check size={18} /> {t('missions.claimed')}
                      </span>
                    ) : isCompleted ? (
                      <button
                        onClick={() => setClaimedMissions([...claimedMissions, mission.id])}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                      >
                        {t('missions.claim')}
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 bg-white/10 px-4 py-2 rounded-lg">
                        <Lock size={18} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
