import { CheckCircle } from 'lucide-react';
import type { Achievement } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

interface AchievementsViewProps {
  achievements: Achievement[];
  t: TranslationTexts;
}

export default function AchievementsView({ achievements, t }: AchievementsViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement: Achievement) => (
        <div
          key={achievement.id}
          className={`${
            achievement.unlocked
              ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
              : 'bg-slate-800/50 border-purple-500/20'
          } border rounded-xl p-5 backdrop-blur-sm transition-all hover:scale-[1.02]`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
              {achievement.icon}
            </span>
            {achievement.unlocked && <CheckCircle className="w-5 h-5 text-green-400" />}
          </div>

          <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
          <p className="text-purple-300 text-sm mb-3">{achievement.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={`${achievement.unlocked ? 'text-green-400' : 'text-purple-400'}`}>
                {achievement.unlocked ? t.complete : t.progress}
              </span>
              <span className="text-white">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
              />
            </div>
            <div className="text-center">
              <span
                className={`text-xs ${achievement.unlocked ? 'text-green-400' : 'text-purple-400'}`}
              >
                {achievement.unlocked ? '✓ Desbloqueado' : `Reward: ${achievement.reward}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
