import React, { useState } from 'react';
import { RotateCw, Trophy, Clock, Zap } from 'lucide-react';

interface SpinProps {
  userCoins: number;
  onWin: (amount: number) => void;
}

const PRIZES = [
  { amount: 10, probability: 30, color: 'from-green-500 to-green-600' },
  { amount: 25, probability: 25, color: 'from-emerald-500 to-emerald-600' },
  { amount: 50, probability: 20, color: 'from-teal-500 to-teal-600' },
  { amount: 0, probability: 12, color: 'from-gray-500 to-gray-600', label: 'Try Again' },
  { amount: 100, probability: 8, color: 'from-blue-500 to-blue-600' },
  { amount: 250, probability: 4, color: 'from-purple-500 to-purple-600' },
  { amount: 0, probability: 0.8, color: 'from-red-500 to-red-600', label: 'Try Again' },
  { amount: 1000, probability: 0.2, color: 'from-yellow-400 to-yellow-500' },
];

const SpinWheel: React.FC<SpinProps> = ({ userCoins, onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [spinHistory, setSpinHistory] = useState<number[]>([50, 0, 25, 10, 100]);
  const [freeSpins, setFreeSpins] = useState(3);
  const [nextFreeSpin, setNextFreeSpin] = useState(172800000);

  const spinCost = 50;

  const spin = () => {
    if (spinning) return;
    
    if (freeSpins > 0) {
      setFreeSpins(prev => prev - 1);
    } else if (userCoins < spinCost) {
      return;
    }

    setSpinning(true);

    // Random prize selection
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedPrize = PRIZES[0];

    for (const prize of PRIZES) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        selectedPrize = prize;
        break;
      }
    }

    // Calculate rotation
    const prizeIndex = PRIZES.indexOf(selectedPrize);
    const segmentAngle = 360 / PRIZES.length;
    const targetAngle = 360 - (prizeIndex * segmentAngle) - (segmentAngle / 2);
    const newRotation = rotation + 360 * 5 + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      const winAmount = selectedPrize.amount;
      setLastWin(winAmount);
      setSpinHistory(prev => [winAmount, ...prev.slice(0, 9)]);
      onWin(winAmount);
      setSpinning(false);
    }, 4000);
  };

  const getTimeUntilFree = () => {
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const diff = nextFreeSpin - now;
    if (diff <= 0) return '00:00:00';
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="stats stats-vertical lg:stats-horizontal bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <div className="stat place-items-center">
            <div className="stat-title text-slate-400">Free Spins</div>
            <div className="stat-value text-3xl">
              {freeSpins}
            </div>
            <div className="stat-desc text-green-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Next in {getTimeUntilFree()}
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-slate-400">Cost Per Spin</div>
            <div className="stat-value text-2xl text-yellow-400">
              {spinCost}
            </div>
            <div className="stat-desc">Coins</div>
          </div>
        </div>
        <div className="alert alert-info bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <Zap className="w-5 h-5" />
          <div>
            <h3 className="font-bold">Jackpot: 1000 Coins!</h3>
            <div className="text-xs opacity-80">0.2% chance to hit the jackpot</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Wheel */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-yellow-400"></div>
            </div>

            {/* Wheel */}
            <div
              className={`w-72 h-72 md:w-80 md:h-80 rounded-full relative transition-transform duration-[4000ms] ease-out ${spinning ? '' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(
                  ${PRIZES.map((p, i) => `${p.color.split(' ').map(c => c.split('-')[1]).join(' ')} ${i * (100/PRIZES.length)}% ${(i+1) * (100/PRIZES.length)}%`).join(', ')}
                )`
              }}
            >
              <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                  <span className="text-2xl font-bold text-white">SPIN</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning || (userCoins < spinCost && freeSpins === 0)}
            className={`mt-8 px-12 py-4 rounded-xl font-bold text-white text-lg transition-all ${
              spinning || (userCoins < spinCost && freeSpins === 0)
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transform hover:scale-105'
            }`}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 animate-spin" />
                Spinning...
              </span>
            ) : freeSpins > 0 ? (
              'FREE SPIN'
            ) : (
              `Spin (${spinCost} coins)`
            )}
          </button>

          {lastWin !== null && (
            <div className={`mt-4 px-6 py-2 rounded-lg font-bold ${lastWin > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
              {lastWin > 0 ? `🎉 Won ${lastWin} coins!` : '😢 Better luck next time!'}
            </div>
          )}
        </div>

        {/* Spin History & Legend */}
        <div className="flex-1 space-y-6">
          {/* Legend */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">Prize Legend</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {PRIZES.map((prize) => (
                <div key={prize.amount} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${prize.color}`}></div>
                  <span className="text-slate-300">
                    {prize.amount} coins ({prize.probability}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">Recent Spins</h3>
            <div className="space-y-2">
              {spinHistory.map((win, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    win > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}
                >
                  <span className="text-slate-400 text-sm">Spin #{spinHistory.length - i}</span>
                  <span className={`font-bold ${win > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {win > 0 ? `+${win} coins` : 'No win'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;