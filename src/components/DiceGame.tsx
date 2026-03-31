import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, TrendingUp, RefreshCw } from 'lucide-react';

interface DiceProps {
  userCoins: number;
  onWin: (amount: number) => void;
  onLoss: (amount: number) => void;
}

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const DiceGame: React.FC<DiceProps> = ({ userCoins, onWin, onLoss }) => {
  const [betAmount, setBetAmount] = useState(50);
  const [selectedSide, setSelectedSide] = useState<1 | 2 | 3 | 4 | 5 | 6>(6);
  const [rolling, setRolling] = useState(false);
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [lastResult, setLastResult] = useState<{ won: boolean; amount: number } | null>(null);
  const [rollHistory, setRollHistory] = useState<
    { dice: number[]; won: boolean; amount: number }[]
  >([
    { dice: [3, 2], won: true, amount: 50 },
    { dice: [5, 6], won: false, amount: -50 },
    { dice: [2, 3], won: true, amount: 50 },
    { dice: [1, 1], won: false, amount: -50 },
    { dice: [4, 5], won: true, amount: 66 },
  ]);

  const calculatePayout = (side: number) => {
    const winChance = (7 - side) / 6;
    return Math.floor(90 / winChance); // 90% return to player
  };

  const rollDice = () => {
    if (rolling || betAmount <= 0 || userCoins < betAmount) return;

    setRolling(true);
    setLastResult(null);
    setDice([1, 1]);

    // Animate dice
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
      rollCount++;
      if (rollCount > 15) {
        clearInterval(rollInterval);
        finishRoll();
      }
    }, 100);
  };

  const finishRoll = () => {
    const result = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1] as [
      number,
      number,
    ];
    setDice(result);

    const sum = result[0] + result[1];
    const won = sum <= selectedSide;
    const payout = calculatePayout(selectedSide);

    if (won) {
      const winAmount = Math.floor(betAmount * (payout / 100));
      onWin(winAmount);
      setLastResult({ won: true, amount: winAmount });
    } else {
      onLoss(betAmount);
      setLastResult({ won: false, amount: -betAmount });
    }

    setRollHistory(prev => [
      { dice: result, won, amount: won ? Math.floor(betAmount * (payout / 100)) : -betAmount },
      ...prev.slice(0, 9),
    ]);
    setRolling(false);
  };

  const winChance = Math.floor(((7 - selectedSide) / 6) * 100);
  const payout = calculatePayout(selectedSide);
  const potentialWin = Math.floor(betAmount * (payout / 100));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Bet Amount</div>
          <div className="text-2xl font-bold text-white">{betAmount}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Win Chance</div>
          <div className="text-2xl font-bold text-green-400">{winChance}%</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Payout</div>
          <div className="text-2xl font-bold text-yellow-400">{payout}x</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Potential Win</div>
          <div className="text-2xl font-bold text-emerald-400">+{potentialWin}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Game Area */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Roll the Dice</h3>

          {/* Dice Display */}
          <div className="flex justify-center gap-8 mb-8">
            {dice.map((value, i) => {
              const DiceIcon = DICE_ICONS[value - 1];
              return (
                <div
                  key={i}
                  className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center border-4 border-slate-600 ${
                    rolling ? 'animate-bounce' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <DiceIcon className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              );
            })}
          </div>

          {/* Sum Display */}
          <div className="text-center mb-6">
            <div className="text-slate-400 mb-2">Sum: {dice.reduce((a, b) => a + b, 0)}</div>
            <div className="text-slate-400 text-sm">Roll under {selectedSide} to win</div>
          </div>

          {/* Side Selection */}
          <div className="mb-6">
            <label className="text-slate-400 text-sm block mb-2">Select Target Side</label>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map(side => {
                const DiceIcon = DICE_ICONS[side - 1];
                const isSelected = selectedSide === side;
                return (
                  <button
                    key={side}
                    onClick={() => setSelectedSide(side as any)}
                    className={`p-3 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-purple-400'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <DiceIcon className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-white font-bold">{side}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bet Amount */}
          <div className="mb-6">
            <label className="text-slate-400 text-sm block mb-2">Bet Amount</label>
            <div className="flex gap-2">
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
              type="range"
              min="10"
              max="1000"
              value={betAmount}
              onChange={e => setBetAmount(parseInt(e.target.value))}
              className="w-full mt-3 accent-purple-500"
            />
          </div>

          {/* Roll Button */}
          <button
            onClick={rollDice}
            disabled={rolling || userCoins < betAmount}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${
              rolling || userCoins < betAmount
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transform hover:scale-105'
            }`}
          >
            {rolling ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                Rolling...
              </span>
            ) : (
              `Roll Dice (${betAmount} coins)`
            )}
          </button>

          {/* Result */}
          {lastResult && (
            <div
              className={`mt-4 text-center p-4 rounded-lg ${
                lastResult.won ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}
            >
              <div
                className={`text-2xl font-bold ${lastResult.won ? 'text-green-400' : 'text-red-400'}`}
              >
                {lastResult.won ? '🎉 You Won!' : '😢 You Lost'}
              </div>
              <div className={`text-lg ${lastResult.won ? 'text-green-300' : 'text-red-300'}`}>
                {lastResult.amount > 0 ? `+${lastResult.amount}` : lastResult.amount} coins
              </div>
            </div>
          )}
        </div>

        {/* History */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Roll History</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-2">
            {rollHistory.map((roll, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${roll.won ? 'bg-green-500/10' : 'bg-red-500/10'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {roll.dice.map((die, j) => {
                      const DiceIcon = DICE_ICONS[die - 1];
                      return <DiceIcon key={j} className="w-6 h-6 text-slate-300" />;
                    })}
                    <span className="text-white font-bold">
                      = {roll.dice.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${roll.amount > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {roll.amount > 0 ? `+${roll.amount}` : roll.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;
