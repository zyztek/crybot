import React, { useState, useEffect } from 'react';
import { Trophy, Star, Lock, Zap, Crown, Gem, Flame, Target, Shield, Rocket } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  reward: {
    type: 'nft' | 'tokens' | 'badge';
    value: string;
  };
}

interface UserStats {
  totalAchievements: number;
  unlockedAchievements: number;
  currentStreak: number;
  totalPoints: number;
  rank: string;
}

export const AchievementSystem2: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All', icon: <Trophy className="w-4 h-4" /> },
    { id: 'trading', name: 'Trading', icon: <Zap className="w-4 h-4" /> },
    { id: 'social', name: 'Social', icon: <Star className="w-4 h-4" /> },
    { id: 'defi', name: 'DeFi', icon: <Crown className="w-4 h-4" /> },
    { id: 'learning', name: 'Learning', icon: <Target className="w-4 h-4" /> }
  ];

  const rarityColors = {
    common: 'bg-gray-100 text-gray-800 border-gray-300',
    rare: 'bg-blue-100 text-blue-800 border-blue-300',
    epic: 'bg-purple-100 text-purple-800 border-purple-300',
    legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  const rarityIcons = {
    common: <Shield className="w-4 h-4" />,
    rare: <Gem className="w-4 h-4" />,
    epic: <Flame className="w-4 h-4" />,
    legendary: <Crown className="w-4 h-4" />
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAchievements: Achievement[] = [
          {
            id: 'first-trade',
            name: 'First Trade',
            description: 'Complete your first cryptocurrency trade',
            icon: <Zap className="w-6 h-6" />,
            rarity: 'common',
            progress: 1,
            maxProgress: 1,
            unlocked: true,
            unlockedAt: '2024-01-15T10:30:00Z',
            reward: { type: 'tokens', value: '100 CRY' }
          },
          {
            id: 'trader-streak',
            name: 'Trading Streak',
            description: 'Trade for 7 consecutive days',
            icon: <Flame className="w-6 h-6" />,
            rarity: 'rare',
            progress: 5,
            maxProgress: 7,
            unlocked: false,
            reward: { type: 'nft', value: 'Trading Streak NFT' }
          },
          {
            id: 'defi-master',
            name: 'DeFi Master',
            description: 'Use 10 different DeFi protocols',
            icon: <Crown className="w-6 h-6" />,
            rarity: 'epic',
            progress: 7,
            maxProgress: 10,
            unlocked: false,
            reward: { type: 'nft', value: 'DeFi Master NFT' }
          },
          {
            id: 'whale-status',
            name: 'Whale Status',
            description: 'Reach $100,000 portfolio value',
            icon: <Rocket className="w-6 h-6" />,
            rarity: 'legendary',
            progress: 45000,
            maxProgress: 100000,
            unlocked: false,
            reward: { type: 'nft', value: 'Golden Whale NFT' }
          },
          {
            id: 'social-butterfly',
            name: 'Social Butterfly',
            description: 'Refer 10 friends who complete registration',
            icon: <Star className="w-6 h-6" />,
            rarity: 'rare',
            progress: 3,
            maxProgress: 10,
            unlocked: false,
            reward: { type: 'tokens', value: '500 CRY' }
          }
        ];

        const mockStats: UserStats = {
          totalAchievements: 25,
          unlockedAchievements: 8,
          currentStreak: 5,
          totalPoints: 1250,
          rank: 'Silver Trader'
        };

        setAchievements(mockAchievements);
        setUserStats(mockStats);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Achievement System 2.0</h2>
        </div>
        <div className="text-sm text-gray-600">
          NFT-Powered Achievements
        </div>
      </div>

      {/* User Stats */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Achievements</p>
                <p className="text-2xl font-bold">{userStats.unlockedAchievements}/{userStats.totalAchievements}</p>
              </div>
              <Trophy className="w-8 h-8 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Current Streak</p>
                <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
              </div>
              <Flame className="w-8 h-8 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Rank</p>
                <p className="text-2xl font-bold">{userStats.rank}</p>
              </div>
              <Crown className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`relative border-2 rounded-lg p-4 transition-all ${
              achievement.unlocked
                ? `${rarityColors[achievement.rarity]} shadow-lg`
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            {/* Achievement Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    {rarityIcons[achievement.rarity]}
                    <span className="capitalize">{achievement.rarity}</span>
                  </div>
                </div>
              </div>
              {achievement.unlocked ? (
                <div className="text-green-600">
                  <Trophy className="w-5 h-5" />
                </div>
              ) : (
                <div className="text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Achievement Description */}
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                />
              </div>
            </div>

            {/* Reward */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Reward:</span>
              <span className={`px-2 py-1 rounded ${
                achievement.reward.type === 'nft' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {achievement.reward.value}
              </span>
            </div>

            {/* Unlocked Date */}
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="absolute top-2 right-2 text-xs text-gray-500">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NFT Gallery Preview */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your NFT Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.filter(a => a.unlocked && a.reward.type === 'nft').map(achievement => (
            <div key={achievement.id} className="bg-white rounded-lg p-3 text-center">
              <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg mb-2 flex items-center justify-center">
                {achievement.icon}
              </div>
              <p className="text-xs font-medium truncate">{achievement.reward.value}</p>
            </div>
          ))}
          <div className="bg-white rounded-lg p-3 text-center border-2 border-dashed border-gray-300">
            <div className="w-full h-20 flex items-center justify-center text-gray-400">
              <Lock className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-500">More NFTs...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
