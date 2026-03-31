import { Trophy } from 'lucide-react';
import type { LeaderboardEntry } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

interface LeaderboardViewProps {
  leaderboard: LeaderboardEntry[];
  t: TranslationTexts;
}

export default function LeaderboardView({ leaderboard, t }: LeaderboardViewProps) {
  return (
    <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        {t.leaderboardTitle}
      </h2>

      <div className="space-y-2">
        {leaderboard.map((entry: LeaderboardEntry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
              entry.isUser
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/30'
                : 'bg-slate-900/50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                entry.rank === 1
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : entry.rank === 2
                    ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800'
                    : entry.rank === 3
                      ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white'
                      : 'bg-slate-700 text-purple-300'
              }`}
            >
              {entry.rank}
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-xl">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${entry.isUser ? 'text-white' : 'text-purple-200'}`}>
                {entry.username}
                {entry.isUser && <span className="ml-2 text-xs text-purple-300">(Tú)</span>}
              </p>
              <p className="text-purple-400 text-xs">{entry.claims} claims</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-bold">{entry.totalClaimed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
