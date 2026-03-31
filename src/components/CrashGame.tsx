import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Flame, AlertTriangle } from 'lucide-react';

interface CrashProps {
  userCoins: number;
  onWin: (amount: number) => void;
  onLoss: (amount: number) => void;
}

const CrashGame: React.FC<CrashProps> = ({ userCoins, onWin, onLoss }) => {
  const [betAmount, setBetAmount] = useState(50);
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'crashed'>('idle');
  const [autoCashout, setAutoCashout] = useState(2.0);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number | null>(null);
  const [crashHistory, setCrashHistory] = useState<number[]>([
    1.24, 2.56, 1.02, 4.89, 1.45, 3.21, 1.08, 2.11,
  ]);
  const [hasBetted, setHasBetted] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);

  const crashPoint = useRef(0);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    if (gameState !== 'idle' || userCoins < betAmount) return;

    // Generate random crash point (weighted towards lower multipliers)

    const random = Math.random();
    if (random < 0.3) {
      crashPoint.current = 1 + Math.random() * 0.5; // 30% chance of 1.00-1.50x
    } else if (random < 0.6) {
      crashPoint.current = 1.5 + Math.random() * 1.5; // 30% chance of 1.50-3.00x
    } else if (random < 0.85) {
      crashPoint.current = 3 + Math.random() * 4; // 25% chance of 3.00-7.00x
    } else {
      crashPoint.current = 7 + Math.random() * 20; // 15% chance of 7.00-27.00x
    }
    crashPoint.current = Math.floor(crashPoint.current * 100) / 100;

    setGameState('running');
    setMultiplier(1.0);
    setHasBetted(true);
    setCurrentBet(betAmount);
    setCashOutMultiplier(null);

    let currentMultiplier = 1.0;

    const growthRate = 0.001 + Math.random() * 0.002;

    gameInterval.current = setInterval(() => {
      currentMultiplier += growthRate * currentMultiplier;
      currentMultiplier = Math.floor(currentMultiplier * 100) / 100;
      setMultiplier(currentMultiplier);

      if (currentMultiplier >= crashPoint.current) {
        crash();
      }
    }, 50);
  };

  const crash = () => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
      gameInterval.current = null;
    }

    setGameState('crashed');
    setCrashHistory([crashPoint.current, ...crashHistory.slice(0, 9)]);

    if (hasBetted && !cashOutMultiplier) {
      onLoss(currentBet);
    }

    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  const cashOut = () => {
    if (gameState !== 'running' || !hasBetted) return;

    const winAmount = Math.floor(currentBet * multiplier);
    setCashOutMultiplier(multiplier);
    onWin(winAmount - currentBet);
    setHasBetted(false);
  };

  const resetGame = () => {
    setGameState('idle');
    setMultiplier(1.0);
    setCashOutMultiplier(null);
    setHasBetted(false);
  };

  useEffect(() => {
    // Auto cashout
    if (gameState === 'running' && hasBetted && !cashOutMultiplier && multiplier >= autoCashout) {
      cashOut();
    }
  }, [multiplier, autoCashout, gameState, hasBetted, cashOutMultiplier]);

  // potentialWin would be used for display purposes
  // const potentialWin = Math.floor(betAmount * multiplier);
  const canCashOut = gameState === 'running' && hasBetted && !cashOutMultiplier;

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Your Bet</div>
          <div className="text-2xl font-bold text-white">{currentBet || betAmount}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Multiplier</div>
          <div
            className={`text-2xl font-bold ${gameState === 'running' ? 'text-green-400' : 'text-white'}`}
          >
            {multiplier.toFixed(2)}x
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Potential Win</div>
          <div className="text-2xl font-bold text-emerald-400">
            {Math.floor((currentBet || betAmount) * multiplier)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Auto Cashout</div>
          <div className="text-2xl font-bold text-yellow-400">{autoCashout.toFixed(2)}x</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Game Display */}
        <div className="flex-1">
          <div
            className={`relative rounded-2xl p-8 text-center border-2 transition-all ${
              gameState === 'idle'
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                : gameState === 'running'
                  ? 'bg-gradient-to-br from-emerald-900 to-slate-900 border-emerald-600'
                  : 'bg-gradient-to-br from-red-900 to-slate-900 border-red-600'
            }`}
          >
            {/* Multiplier Display */}
            <div className="mb-4">
              {gameState === 'idle' ? (
                <div>
                  <div className="text-6xl md:text-8xl font-bold text-white mb-2">
                    {crashHistory[0]?.toFixed(2)}x
                  </div>
                  <div className="text-slate-400 text-lg">Previous Crash</div>
                </div>
              ) : gameState === 'running' && cashOutMultiplier ? (
                <div>
                  <div className="text-6xl md:text-7xl font-bold text-white mb-2 flex items-center justify-center">
                    <Flame className="w-12 h-12 mr-4 text-orange-500" />
                    {cashOutMultiplier.toFixed(2)}x
                  </div>
                  <div className="text-green-400 text-xl">YOU CASHED OUT!</div>
                </div>
              ) : gameState === 'crashed' ? (
                <div>
                  <div className="text-6xl md:text-8xl font-bold text-red-400 mb-2 flex items-center justify-center">
                    <AlertTriangle className="w-12 md:w-16 h-12 md:h-16 mr-4" />
                    {crashPoint.current.toFixed(2)}x
                  </div>
                  <div className="text-red-400 text-lg font-bold">CRASHED</div>
                </div>
              ) : (
                <div className="text-6xl md:text-8xl font-bold text-white">
                  {multiplier.toFixed(2)}x
                </div>
              )}
            </div>

            {/* Progress indicator */}
            {gameState === 'running' && !cashOutMultiplier && (
              <div className="w-full bg-slate-700 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    multiplier > 2 ? 'bg-gradient-to-r from-yellow-500 to-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((multiplier / 5) * 100, 100)}%` }}
                ></div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {gameState === 'idle' && (
                <button
                  onClick={startGame}
                  disabled={userCoins < betAmount}
                  className={`px-8 py-4 rounded-xl font-bold text-white text-lg transition-all ${
                    userCoins < betAmount
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transform hover:scale-105'
                  }`}
                >
                  Place Bet ({betAmount} coins)
                </button>
              )}

              {canCashOut && (
                <button
                  onClick={cashOut}
                  className="px-8 py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transform hover:scale-105 animate-pulse"
                >
                  Cash Out ({Math.floor(currentBet * multiplier)} coins)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Controls & History */}
        <div className="flex-1 space-y-4">
          {/* Bet Controls */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">Bet Settings</h3>

            {/* Bet Amount */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-2">Bet Amount</label>
              <div className="flex gap-2 flex-wrap">
                {[10, 50, 100, 500, 1000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`px-4 py-2 rounded-lg font-bold ${
                      betAmount === amount
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={betAmount}
                onChange={e => setBetAmount(parseInt(e.target.value) || 0)}
                min="10"
                max="10000"
                className="w-full mt-3 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>

            {/* Auto Cashout */}
            <div>
              <label className="text-slate-400 text-sm block mb-2">Auto Cashout</label>
              <div className="flex gap-2 flex-wrap">
                {[1.5, 2, 3, 5, 10].map(mult => (
                  <button
                    key={mult}
                    onClick={() => setAutoCashout(mult)}
                    className={`px-4 py-2 rounded-lg font-bold ${
                      autoCashout === mult
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={autoCashout}
                onChange={e => setAutoCashout(parseFloat(e.target.value) || 1)}
                step="0.1"
                min="1.01"
                max="100"
                className="w-full mt-3 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Crash History */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">Recent Crashes</h3>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {crashHistory.map((crash, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    crash < 1.5
                      ? 'bg-red-500/20 text-red-400'
                      : crash < 3
                        ? 'bg-orange-500/20 text-orange-400'
                        : crash < 5
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {crash.toFixed(2)}x
                </span>
              ))}
            </div>
          </div>

          {/* House Edge Info */}
          <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <div className="text-white font-bold mb-1">Game Info</div>
                <div className="text-slate-400 text-sm">
                  House edge is 4%. For every 1.00x you bet, the expected return is 0.96x. Play
                  responsibly and set limits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
