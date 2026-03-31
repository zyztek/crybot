import { useState } from 'react';
import { RotateCw, Dice3, TrendingDown, Gem, Coins, Trophy, AlertCircle, Star } from 'lucide-react';

type GameType = 'spin' | 'dice' | 'crash' | 'mines';

interface GameState {
  type: GameType;
  balance: number;
  lastWin: number;
  history: number[];
}

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState<GameType>('spin');
  const [games, setGames] = useState<Record<GameType, GameState>>({
    spin: { type: 'spin', balance: 1000, lastWin: 0, history: [] },
    dice: { type: 'dice', balance: 1000, lastWin: 0, history: [] },
    crash: { type: 'crash', balance: 1000, lastWin: 0, history: [] },
    mines: { type: 'mines', balance: 1000, lastWin: 0, history: [] },
  });

  // Spin Wheel
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const wheelSegments = [
    { value: 0, multiplier: 0, color: '#ef4444' },
    { value: 1, multiplier: 2, color: '#f97316' },
    { value: 2, multiplier: 0, color: '#ef4444' },
    { value: 3, multiplier: 3, color: '#eab308' },
    { value: 4, multiplier: 0, color: '#ef4444' },
    { value: 5, multiplier: 1.5, color: '#84cc16' },
    { value: 6, multiplier: 0, color: '#ef4444' },
    { value: 7, multiplier: 5, color: '#a855f7' },
  ];

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * wheelSegments.length);
    setTimeout(() => {
      const result = wheelSegments[randomIndex];
      setSpinResult(randomIndex);
      const winAmount = result.multiplier > 0 ? 10 * result.multiplier : 0;
      setGames(prev => ({
        ...prev,
        spin: {
          ...prev.spin,
          lastWin: winAmount,
          balance: prev.spin.balance - 10 + winAmount,
          history: [winAmount, ...prev.spin.history.slice(0, 9)],
        },
      }));
      setSpinning(false);
    }, 3000);
  };

  // Dice Game
  const [diceRoll, setDiceRoll] = useState<number[]>([1, 1]);
  const [betAmount, setBetAmount] = useState(10);
  const [selectedNumber, setSelectedNumber] = useState<number>(7);

  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const sum = d1 + d2;
    setDiceRoll([d1, d2]);
    const win = sum === selectedNumber ? betAmount * 6 : 0;
    setGames(prev => ({
      ...prev,
      dice: {
        ...prev.dice,
        lastWin: win,
        balance: prev.dice.balance - betAmount + win,
        history: [win, ...prev.dice.history.slice(0, 9)],
      },
    }));
  };

  // Crash Game
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [autoCashout, setAutoCashout] = useState(2.0);
  const [crashBet, setCrashBet] = useState(10);
  const [cashedOutAt, setCashedOutAt] = useState<number | null>(null);

  const startCrash = () => {
    setCrashMultiplier(1.0);
    setCrashed(false);
    setCashedOutAt(null);
    let multiplier = 1.0;
    const crashPoint = 1 + Math.random() * 5;

    const interval = setInterval(() => {
      multiplier += 0.01;
      setCrashMultiplier(multiplier);

      if (multiplier >= crashPoint) {
        clearInterval(interval);
        setCrashed(true);
        setGames(prev => ({
          ...prev,
          crash: {
            ...prev.crash,
            lastWin: 0,
            balance: prev.crash.balance - crashBet,
            history: [0, ...prev.crash.history.slice(0, 9)],
          },
        }));
      }
    }, 50);

    return () => clearInterval(interval);
  };

  const cashOut = () => {
    if (crashed) return;
    setCashedOutAt(crashMultiplier);
    setGames(prev => ({
      ...prev,
      crash: {
        ...prev.crash,
        lastWin: crashBet * crashMultiplier,
        balance: prev.crash.balance - crashBet + crashBet * crashMultiplier,
        history: [crashBet * crashMultiplier, ...prev.crash.history.slice(0, 9)],
      },
    }));
    setCrashed(true);
  };

  // Mines Game
  const [minesCount, setMinesCount] = useState(3);
  const [minesPositions, setMinesPositions] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [minesGameOver, setMinesGameOver] = useState(false);
  const [minesBet, setMinesBet] = useState(10);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);

  const startMines = () => {
    const totalTiles = 25;
    const positions: number[] = [];
    while (positions.length < minesCount) {
      const pos = Math.floor(Math.random() * totalTiles);
      if (!positions.includes(pos)) positions.push(pos);
    }
    setMinesPositions(positions);
    setRevealed(new Set());
    setMinesGameOver(false);
    setCurrentMultiplier(1);
  };

  const revealTile = (index: number) => {
    if (revealed.has(index) || minesGameOver) return;

    const newRevealed = new Set(revealed);
    newRevealed.add(index);

    if (minesPositions.includes(index)) {
      setMinesGameOver(true);
      setGames(prev => ({
        ...prev,
        mines: {
          ...prev.mines,
          lastWin: 0,
          balance: prev.mines.balance - minesBet,
          history: [0, ...prev.mines.history.slice(0, 9)],
        },
      }));
    } else {
      const safeCount = newRevealed.size - minesPositions.filter(p => newRevealed.has(p)).length;
      setCurrentMultiplier(parseFloat((1 + safeCount * 0.1).toFixed(2)));
      setGames(prev => ({
        ...prev,
        mines: { ...prev.mines, balance: prev.mines.balance - minesBet },
      }));
    }
    setRevealed(newRevealed);
  };

  const cashOutMines = () => {
    if (minesGameOver) return;
    const winAmount = minesBet * currentMultiplier;
    setGames(prev => ({
      ...prev,
      mines: {
        ...prev.mines,
        lastWin: winAmount,
        balance: prev.mines.balance - minesBet + winAmount,
        history: [winAmount, ...prev.mines.history.slice(0, 9)],
      },
    }));
    setMinesGameOver(true);
    setRevealed(new Set([...Array(25).keys()]));
  };

  const getSafeTiles = () => minesPositions.length;
  const revealedSafe = revealed.size - minesPositions.filter(p => revealed.has(p)).length;

  const renderSpinWheel = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div
          className="relative w-72 h-72 rounded-full border-4 border-yellow-500 transition-transform duration-3000 ease-out"
          style={{
            transform: spinning
              ? `rotate(${720 + (spinResult ?? 0) * 45}deg)`
              : `rotate(${(spinResult ?? 0) * 45}deg)`,
          }}
        >
          {wheelSegments.map((seg, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${i * 45}deg)`,
                background: `conic-gradient(from ${i * 45}deg, ${seg.color} 0deg, ${seg.color} 45deg)`,
              }}
            >
              <span className="absolute top-17 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                {seg.multiplier}x
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={spinWheel}
          disabled={spinning || games.spin.balance < 10}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold text-white disabled:opacity-50 hover:scale-105 transition-transform"
        >
          {spinning ? 'Girando...' : `Girar (10 BTC)`}
        </button>
        {spinResult !== null && (
          <div
            className={`text-2xl font-bold ${games.spin.lastWin > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {games.spin.lastWin > 0 ? `+${games.spin.lastWin.toFixed(2)} BTC` : '-10 BTC'}
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2">Historial de Giros</h4>
        <div className="flex gap-2">
          {games.spin.history.map((win, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${win > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
            >
              {win > 0 ? '+' : '-'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDice = () => (
    <div className="space-y-6">
      <div className="flex justify-center gap-6">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all ${
              selectedNumber === num
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110 shadow-lg shadow-purple-500/50'
                : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
              selectedNumber === num
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-8">
        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg">
          {diceRoll[0]}
        </div>
        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg">
          {diceRoll[1]}
        </div>
      </div>

      <div className="text-center text-white text-xl">
        Total: <span className="font-bold text-yellow-500">{diceRoll[0] + diceRoll[1]}</span>
        {diceRoll[0] + diceRoll[1] === selectedNumber && (
          <span className="ml-2 text-green-500">¡Ganaste! 🎉</span>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <input
          type="number"
          value={betAmount}
          onChange={e => setBetAmount(Number(e.target.value))}
          className="w-24 px-3 py-2 bg-slate-700 rounded-lg text-white text-center"
          min={1}
          max={100}
        />
        <button
          onClick={rollDice}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-white hover:scale-105 transition-transform"
        >
          Tirar Dados
        </button>
      </div>

      {games.dice.lastWin > 0 && (
        <div className="text-center text-2xl font-bold text-green-500">
          +{games.dice.lastWin.toFixed(2)} BTC 🎊
        </div>
      )}

      <div className="bg-slate-800/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2">Historial</h4>
        <div className="flex gap-2">
          {games.dice.history.map((win, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${win > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
            >
              {win > 0 ? '+' : '-'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCrash = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div
          className={`text-7xl font-bold transition-colors ${crashed ? (cashedOutAt ? 'text-green-500' : 'text-red-500') : 'text-white'}`}
        >
          {crashed ? 'CRASH' : `${crashMultiplier.toFixed(2)}x`}
        </div>
        {!crashed && <div className="text-gray-400 mt-2">Cashout to win!</div>}
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Bet Amount:</span>
          <input
            type="number"
            value={crashBet}
            onChange={e => setCrashBet(Number(e.target.value))}
            className="w-24 px-3 py-2 bg-slate-700 rounded-lg text-white text-center"
            min={1}
            max={100}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Auto Cashout:</span>
          <input
            type="number"
            value={autoCashout}
            onChange={e => setAutoCashout(Number(e.target.value))}
            className="w-24 px-3 py-2 bg-slate-700 rounded-lg text-white text-center"
            step={0.1}
            min={1.01}
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!crashed ? (
          <>
            <button
              onClick={startCrash}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-white hover:scale-105 transition-transform"
            >
              Apostar
            </button>
            <button
              onClick={cashOut}
              disabled={crashMultiplier <= 1}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-white hover:scale-105 transition-transform disabled:opacity-50"
            >
              Retirar ({(crashBet * crashMultiplier).toFixed(2)} BTC)
            </button>
          </>
        ) : (
          <button
            onClick={startCrash}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white hover:scale-105 transition-transform"
          >
            Jugar de Nuevo
          </button>
        )}
      </div>

      {cashedOutAt && (
        <div className="text-center text-2xl font-bold text-green-500">
          Cashouted at {cashedOutAt.toFixed(2)}x → +{games.crash.lastWin.toFixed(2)} BTC 🎊
        </div>
      )}

      <div className="bg-slate-800/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2">Historial</h4>
        <div className="flex gap-2">
          {games.crash.history.map((win, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${win > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
            >
              {win > 0 ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMines = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
        <div className="text-white">
          <span className="text-gray-400">Multiplicador: </span>
          <span className="text-2xl font-bold text-yellow-500">{currentMultiplier}x</span>
        </div>
        <div className="flex gap-2">
          {[1, 3, 5, 7, 10, 15, 20].map(m => (
            <button
              key={m}
              onClick={() => setMinesCount(m)}
              className={`px-3 py-1 rounded-lg text-sm font-bold ${
                minesCount === m
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-slate-700 text-gray-400'
              }`}
            >
              {m} Minas
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {Array.from({ length: 25 }).map((_, i) => (
          <button
            key={i}
            onClick={() => revealTile(i)}
            disabled={!revealed.has(i) && minesGameOver}
            className={`aspect-square rounded-lg transition-all ${
              !revealed.has(i)
                ? 'bg-slate-700 hover:bg-slate-600 cursor-pointer'
                : minesPositions.includes(i)
                  ? 'bg-red-500'
                  : 'bg-green-500'
            } ${minesPositions.length > 0 && revealed.has(i) && !minesPositions.includes(i) ? 'animate-pulse' : ''}`}
          >
            {revealed.has(i) && (minesPositions.includes(i) ? '💣' : '💎')}
          </button>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        {!revealed.size ? (
          <button
            onClick={startMines}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-white hover:scale-105 transition-transform"
          >
            Comenzar (10 BTC)
          </button>
        ) : (
          <>
            <button
              onClick={cashOutMines}
              disabled={minesGameOver || revealedSafe === 0}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-white hover:scale-105 transition-transform disabled:opacity-50"
            >
              Retirar ({(10 * currentMultiplier).toFixed(2)} BTC)
            </button>
            <button
              onClick={startMines}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white hover:scale-105 transition-transform"
            >
              Reiniciar
            </button>
          </>
        )}
      </div>

      {games.mines.lastWin > 0 && (
        <div className="text-center text-2xl font-bold text-green-500">
          +{games.mines.lastWin.toFixed(2)} BTC 🎊
        </div>
      )}

      <div className="bg-slate-800/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2">Historial</h4>
        <div className="flex gap-2">
          {games.mines.history.map((win, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${win > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
            >
              {win > 0 ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🎮 Mini-Juegos de Crypto
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              type: 'spin',
              icon: RotateCw,
              label: 'Ruleta',
              color: 'from-yellow-500 to-orange-500',
            },
            { type: 'dice', icon: Dice3, label: 'Dados', color: 'from-green-500 to-emerald-500' },
            {
              type: 'crash',
              icon: TrendingDown,
              label: 'Crash',
              color: 'from-red-500 to-pink-500',
            },
            { type: 'mines', icon: Gem, label: 'Minas', color: 'from-blue-500 to-cyan-500' },
          ].map(game => (
            <button
              key={game.type}
              onClick={() => setActiveGame(game.type as GameType)}
              className={`p-4 rounded-xl transition-all ${
                activeGame === game.type
                  ? `bg-gradient-to-r ${game.color} shadow-lg scale-105`
                  : 'bg-slate-800/50 hover:bg-slate-700/50'
              }`}
            >
              <game.icon className="w-8 h-8 mx-auto mb-2" />
              <div className="font-bold text-center">{game.label}</div>
              <div className="text-center text-sm opacity-75">
                {games[game.type as GameType].balance.toFixed(0)} BTC
              </div>
            </button>
          ))}
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
          {activeGame === 'spin' && renderSpinWheel()}
          {activeGame === 'dice' && renderDice()}
          {activeGame === 'crash' && renderCrash()}
          {activeGame === 'mines' && renderMines()}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-white">
              {Object.values(games).reduce(
                (sum, g) => sum + g.history.filter(w => w > 0).length,
                0
              )}
            </div>
            <div className="text-gray-400 text-sm">Ganadas</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <Coins className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-white">
              {Object.values(games)
                .reduce((sum, g) => sum + g.lastWin, 0)
                .toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm">Última Ganancia</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-white">
              {Object.values(games).reduce(
                (sum, g) => sum + g.history.filter(w => w === 0).length,
                0
              )}
            </div>
            <div className="text-gray-400 text-sm">Perdidas</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-white">
              {Object.values(games)
                .reduce((sum, g) => sum + g.balance, 0)
                .toFixed(0)}
            </div>
            <div className="text-gray-400 text-sm">Balance Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
