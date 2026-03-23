import { useState } from 'react';
import { Gamepad2, Dice5, Ticket, Target, Trophy, Zap, RefreshCw, Star, ArrowRight } from 'lucide-react';

const games = [
  {
    id: 1,
    name: 'Lucky Spin',
    nameZH: '幸运转盘',
    description: 'Spin the wheel and win up to 0.01 BTC!',
    descriptionZH: '转动轮盘赢得高达0.01 BTC！',
    icon: Ticket,
    iconColor: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-pink-500/10',
    maxReward: 0.01,
    cost: 10,
    playsToday: 3,
    maxPlays: 5,
    hot: true,
    category: 'luck'
  },
  {
    id: 2,
    name: 'Dice Roll',
    nameZH: '骰子投掷',
    description: 'Roll the dice and guess correctly for 2x rewards',
    descriptionZH: '掷骰子并猜对获得2倍奖励',
    icon: Dice5,
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    maxReward: 0.005,
    cost: 5,
    playsToday: 10,
    maxPlays: 10,
    hot: false,
    category: 'strategy'
  },
  {
    id: 3,
    name: 'Grid Hunter',
    nameZH: '网格猎手',
    description: 'Find the treasure in 3x3 grid - 1 in 9 chance',
    descriptionZH: '在3x3网格中找到宝藏 - 9分之1的机会',
    icon: Target,
    iconColor: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/10',
    maxReward: 0.02,
    cost: 5,
    playsToday: 7,
    maxPlays: 10,
    hot: false,
    category: 'luck'
  },
  {
    id: 4,
    name: 'Daily Challenge',
    nameZH: '每日挑战',
    description: 'Complete challenge for guaranteed rewards',
    descriptionZH: '完成挑战获得保证奖励',
    icon: Trophy,
    iconColor: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-500/10',
    maxReward: 0.003,
    cost: 0,
    playsToday: 0,
    maxPlays: 1,
    hot: true,
    category: 'skill'
  }
];

const recentWins = [
  { user: 'CryptoKing', amount: 0.008, game: 'Lucky Spin', time: '2 min ago' },
  { user: 'SatoshiFan', amount: 0.005, game: 'Dice Roll', time: '5 min ago' },
  { user: 'MoonWalker', amount: 0.002, game: 'Grid Hunter', time: '8 min ago' },
];

export default function Games({ language, faucetBits, setFaucetBits }: { language: 'zh' | 'en', faucetBits: number, setFaucetBits: (value: number) => void }) {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const t = {
    title: language === 'zh' ? '游戏中心' : 'Game Center',
    subtitle: language === 'zh' ? '玩游戏赚取更多加密货币' : 'Play games to earn more crypto',
    hot: language === 'zh' ? '热门' : 'Hot',
    play: language === 'zh' ? '开始游戏' : 'Play Now',
    cost: language === 'zh' ? '消耗' : 'Cost',
    free: language === 'zh' ? '免费' : 'Free',
    remaining: language === 'zh' ? '剩余次数' : 'Remaining',
    maxReward: language === 'zh' ? '最大奖励' : 'Max Reward',
    recentWins: language === 'zh' ? '最近中奖' : 'Recent Wins',
    gameTitle: language === 'zh' ? '幸运转盘' : 'Lucky Spin',
    spinButton: language === 'zh' ? '转动' : 'Spin',
    congrats: language === 'zh' ? '恭喜！你赢得了' : 'Congratulations! You won',
    tryAgain: language === 'zh' ? '再试一次' : 'Try Again',
    close: language === 'zh' ? '关闭' : 'Close',
    categoryLuck: language === 'zh' ? '运气' : 'Luck',
    categoryStrategy: language === 'zh' ? '策略' : 'Strategy',
    categorySkill: language === 'zh' ? '技巧' : 'Skill',
  };

  const prizes = [0, 0.0001, 0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01];
  const prizeColors = [
    'from-gray-500 to-gray-600',
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600'
  ];

  const handleSpin = () => {
    if (faucetBits >= 10 && !isSpinning) {
      setFaucetBits(faucetBits - 10);
      setIsSpinning(true);
      
      setTimeout(() => {
        const prizeIndex = Math.floor(Math.random() * 8);
        setSpinResult(prizeIndex);
        setIsSpinning(false);
      }, 3000);
    }
  };

  if (showGame && selectedGame === 1) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => { setShowGame(false); setSelectedGame(null); setSpinResult(null); }}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            {t.close}
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Ticket className="w-10 h-10 text-purple-400" />
              {t.gameTitle}
            </h1>
            <p className="text-gray-400">{t.cost}: 10 FaucetBits</p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-8 border-slate-700" />
              <div className="absolute in-0 w-4 h-4 bg-yellow-500 left-1/2 -translate-x-1/2 -translate-y-2" style={{ top: '-8px' }}>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-yellow-500" />
              </div>
              
              <div 
                className={`w-full h-full rounded-full transition-transform duration-3000 ease-out flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}
                style={{ transform: spinResult !== null ? `rotate(-${spinResult * 45 + 180}deg)` : 'rotate(0deg)' }}
              >
                {prizes.map((prize, idx) => {
                  const angle = (idx * 45) - 22.5;
                  const radian = (angle * Math.PI) / 180;
                  const x = Math.sin(radian) * 90;
                  const y = -Math.cos(radian) * 90;
                  const textAngle = angle + 90;
                  
                  return (
                    <div
                      key={idx}
                      className="absolute"
                      style={{ 
                        left: '50%', 
                        top: '50%',
                        transform: `translate(${x + 60}px, ${y + 60}px) rotate(${textAngle}deg)`,
                        transformOrigin: '0 0'
                      }}
                    >
                      <div className={`w-16 h-28 bg-gradient-to-br ${prizeColors[idx]} rounded flex items-center justify-center text-white font-bold text-xs`}>
                        {prize > 0 ? `${prize} BTC` : '0'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {spinResult !== null && prizes[spinResult] > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-6 bg-green-500/90 rounded-2xl text-center animate-bounce">
                    <p className="text-2xl font-bold text-white">{t.congrats}</p>
                    <p className="text-4xl font-bold text-yellow-400 mt-2">{prizes[spinResult]} BTC</p>
                    <Zap className="w-12 h-12 text-yellow-400 mx-auto mt-2" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleSpin}
              disabled={faucetBits < 10 || isSpinning}
              className={`px-8 py-4 rounded-xl font-bold text-white text-xl transition-all flex items-center gap-3 ${
                faucetBits < 10 || isSpinning
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
              }`}
            >
              {isSpinning ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  {language === 'zh' ? '转动中...' : 'Spinning...'}
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  {t.spinButton} (10 FaucetBits)
                </>
              )}
            </button>
          </div>

          {spinResult !== null && (
            <div className="text-center">
              <button
                onClick={() => { setShowGame(false); setSelectedGame(null); setSpinResult(null); }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          <Gamepad2 className="w-10 h-10 text-green-400" />
          {t.title}
        </h1>
        <p className="text-gray-400">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div 
              key={game.id}
              className="group relative p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-slate-500/50 transition-all duration-300"
            >
              {game.hot && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {t.hot}
                </div>
              )}

              <div className={`w-16 h-16 bg-gradient-to-br ${game.bgGradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-8 h-8 ${game.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{language === 'zh' ? game.nameZH : game.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{language === 'zh' ? game.descriptionZH : game.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{t.cost}</span>
                  <span className={`font-bold ${game.cost === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {game.cost === 0 ? t.free : `${game.cost} FaucetBits`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{t.maxReward}</span>
                  <span className="font-bold text-green-400">{game.maxReward} BTC</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{t.remaining}</span>
                  <span className="font-bold text-white">{game.maxPlays - game.playsToday} / {game.maxPlays}</span>
                </div>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  style={{ width: `${((game.maxPlays - game.playsToday) / game.maxPlays) * 100}%` }}
                />
              </div>

              <button
                onClick={() => { setSelectedGame(game.id); setShowGame(true); }}
                disabled={game.playsToday >= game.maxPlays || (game.cost > 0 && faucetBits < game.cost)}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  game.playsToday >= game.maxPlays || (game.cost > 0 && faucetBits < game.cost)
                    ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
                }`}
              >
                {game.playsToday >= game.maxPlays 
                  ? (language === 'zh' ? '次数用完' : 'No plays left')
                  : (game.cost > 0 && faucetBits < game.cost)
                    ? (language === 'zh' ? '余额不足' : 'Insufficient balance')
                    : t.play
                }
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          {t.recentWins}
        </h2>
        <div className="space-y-3">
          {recentWins.map((win, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{win.user}</p>
                  <p className="text-sm text-gray-400">{win.game}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-400">{win.amount} BTC</p>
                <p className="text-xs text-gray-400">{win.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}