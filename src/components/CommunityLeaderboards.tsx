import { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users } from 'lucide-react';

interface Leader {
  rank: number;
  username: string;
  points: number;
  change: number;
  badges: number;
}

const CommunityLeaderboards: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const leaders: Leader[] = [
    { rank: 1, username: 'CryptoKing', points: 15420, change: 2, badges: 45 },
    { rank: 2, username: 'DeFiWhale', points: 12850, change: -1, badges: 38 },
    { rank: 3, username: 'YieldFarmer', points: 11200, change: 3, badges: 32 },
    { rank: 4, username: 'NFTCollector', points: 9850, change: 0, badges: 28 },
    { rank: 5, username: 'StakingPro', points: 8200, change: 1, badges: 22 },
    { rank: 6, username: 'TraderJoe', points: 7800, change: -2, badges: 19 },
    { rank: 7, username: 'ChainWalker', points: 6500, change: 4, badges: 15 },
    { rank: 8, username: 'GasSaver', points: 5200, change: 1, badges: 12 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-slate-400 font-bold">{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Top Trader</span>
          </div>
          <p className="text-xl font-bold text-white">{leaders[0].username}</p>
          <p className="text-slate-400 text-sm">{leaders[0].points.toLocaleString()} pts</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Active Traders</span>
          </div>
          <p className="text-xl font-bold text-white">1,248</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Points</span>
          </div>
          <p className="text-xl font-bold text-white">{(leaders.reduce((acc, l) => acc + l.points, 0) / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Timeframe */}
      <div className="flex gap-2 flex-wrap">
        {(['daily', 'weekly', 'monthly'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              timeframe === tf ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-center text-slate-400 text-sm font-medium">Rank</th>
              <th className="px-4 py-3 text-left text-slate-400 text-sm font-medium">User</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Points</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Change</th>
              <th className="px-4 py-3 text-right text-slate-400 text-sm font-medium">Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader.rank} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">{getRankIcon(leader.rank)}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-white font-medium">{leader.username}</span>
                </td>
                <td className="px-4 py-3 text-right text-purple-400 font-bold">{leader.points.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right ${leader.change > 0 ? 'text-green-400' : leader.change < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                  {leader.change > 0 ? '+' : ''}{leader.change}
                </td>
                <td className="px-4 py-3 text-right text-slate-300">{leader.badges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityLeaderboards;