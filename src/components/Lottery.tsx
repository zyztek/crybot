import { CheckCircle, Clock, Coins, Loader2, Sparkles, Ticket, Trophy, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLottery } from '../hooks/useGraphQL';

interface LotteryTicket {
  id: number;
  numbers: number[];
  date: string;
  isWinner: boolean;
  prize?: number;
}

const Lottery: React.FC = () => {
  const { fetchRounds, fetchMyTickets, claimPrize } = useLottery();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [myTickets, setMyTickets] = useState<LotteryTicket[]>([]);
  const [ticketCost] = useState(10);
  const [jackpot, setJackpot] = useState(50000);
  const [nextDraw, setNextDraw] = useState('23:45:32');
  const [participants, setParticipants] = useState(1543);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch lottery data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const roundsResult = await fetchRounds.execute();
        if ((roundsResult as any)?.lotteryRounds) {
          const activeRound = (roundsResult as any).lotteryRounds.find(
            (r: any) => r.status === 'active'
          );
          if (activeRound) {
            setJackpot(parseFloat(activeRound.prizePool) || 50000);
          }
        }
      } catch (e) {
        // Use mock data on error
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const maxNumbers = 6;
  const numberRange = 49;

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < maxNumbers) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const handleBuyTicket = () => {
    if (selectedNumbers.length !== maxNumbers) return;

    const newTicket: LotteryTicket = {
      id: Date.now(),
      numbers: [...selectedNumbers],
      date: new Date().toLocaleDateString(),
      isWinner: false,
      prize: 0,
    };

    setMyTickets([...myTickets, newTicket]);
    setSelectedNumbers([]);
  };

  const generateRandom = () => {
    const nums: number[] = [];
    while (nums.length < maxNumbers) {
      const num = Math.floor(Math.random() * numberRange) + 1;
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    setSelectedNumbers(nums.sort((a, b) => a - b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Ticket className="w-10 h-10 text-yellow-400" />
            Crypto Lottery
          </h1>
          <p className="text-slate-400 mt-2">Win big with lucky draws!</p>
        </div>

        {/* Jackpot Banner */}
        {isLoading && (
          <div className="flex justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        )}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-yellow-200/20 to-amber-200/20"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-8 h-8 text-amber-900" />
              <span className="text-amber-900 font-semibold text-xl">MEGA JACKPOT</span>
              <Trophy className="w-8 h-8 text-amber-900" />
            </div>
            <p className="text-6xl font-black text-amber-900">${jackpot.toLocaleString()}</p>
            <div className="flex items-center justify-center gap-6 mt-4 text-amber-900">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Next Draw: {nextDraw}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{participants} Participants</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Number Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Pick Your Numbers</h2>
                <div className="text-slate-400">
                  {selectedNumbers.length}/{maxNumbers} selected
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-6">
                {Array.from({ length: numberRange }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => toggleNumber(num)}
                    disabled={
                      !selectedNumbers.includes(num) && selectedNumbers.length >= maxNumbers
                    }
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                      selectedNumbers.includes(num)
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white transform scale-110 shadow-lg'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:scale-105'
                    } ${!selectedNumbers.includes(num) && selectedNumbers.length >= maxNumbers ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBuyTicket}
                  disabled={selectedNumbers.length !== maxNumbers}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Coins className="w-5 h-5" />
                  Buy Ticket - {ticketCost} USDT
                </button>
                <button
                  onClick={generateRandom}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Random
                </button>
              </div>

              {selectedNumbers.length > 0 && (
                <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-400 mb-2">Selected Numbers:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNumbers
                      .sort((a, b) => a - b)
                      .map(num => (
                        <span
                          key={num}
                          className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        >
                          {num}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* My Tickets */}
            {myTickets.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  My Tickets ({myTickets.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      className={`p-4 rounded-xl border ${
                        ticket.isWinner
                          ? 'bg-green-900/30 border-green-500/50'
                          : 'bg-slate-700/50 border-slate-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {ticket.isWinner ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <Ticket className="w-5 h-5 text-slate-400" />
                          )}
                          <span className="text-white font-medium">#{ticket.id}</span>
                        </div>
                        {ticket.isWinner && ticket.prize && (
                          <span className="px-2 py-1 bg-green-500 text-white text-sm rounded-full font-bold">
                            +${ticket.prize}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {ticket.numbers.map(num => (
                          <span
                            key={num}
                            className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-400 text-sm">{ticket.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prize Tiers */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Prize Tiers</h3>
              <div className="space-y-3">
                {[
                  {
                    match: 6,
                    prize: 'Jackpot',
                    amount: '$50,000',
                    color: 'from-yellow-400 to-amber-500',
                  },
                  {
                    match: 5,
                    prize: '2nd Prize',
                    amount: '$5,000',
                    color: 'from-slate-300 to-slate-400',
                  },
                  {
                    match: 4,
                    prize: '3rd Prize',
                    amount: '$500',
                    color: 'from-amber-600 to-amber-700',
                  },
                  {
                    match: 3,
                    prize: 'Consolation',
                    amount: '$50',
                    color: 'from-orange-600 to-orange-700',
                  },
                ].map(tier => (
                  <div
                    key={tier.match}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-white font-bold`}
                      >
                        {tier.match}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tier.prize}</p>
                        <p className="text-slate-400 text-sm">{tier.match} numbers</p>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${tier.match === 6 ? 'text-2xl text-yellow-400' : 'text-white'}`}
                    >
                      {tier.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Winners */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recent Winners
              </h3>
              <div className="space-y-3">
                {[
                  { user: 'crypto_king', amount: '$12,500', numbers: [5, 12, 23, 34, 41, 48] },
                  { user: 'lucky_duck', amount: '$3,200', numbers: [7, 15, 22, 33, 39, 45] },
                  { user: 'bitcoin_babe', amount: '$500', numbers: [3, 11, 27, 36, 44, 49] },
                ].map((winner, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-400' : 'bg-amber-700'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{winner.user}</p>
                      <p className="text-slate-400 text-xs">
                        Matched {winner.numbers.length} numbers
                      </p>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{winner.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;
