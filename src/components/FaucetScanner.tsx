import React, { useState } from 'react';
import { Radar, Search, Filter, RefreshCw, DollarSign, Clock, TrendingUp, Star, ExternalLink, AlertCircle } from 'lucide-react';

interface Faucet {
  id: number;
  name: string;
  url: string;
  coin: string;
  reward: number;
  timer: number;
  rating: number;
  status: 'paying' | 'problem' | 'scam';
  lastPaid: string;
  dailyClaims: number;
  reliability: number;
}

const FaucetScanner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'paying' | 'problem' | 'scam'>('all');
  const [coinFilter, setCoinFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'reward' | 'timer' | 'rating'>('reward');

  const faucets: Faucet[] = [
    { id: 1, name: 'BigBTC Faucet', url: 'bigbtc.faucet', coin: 'BTC', reward: 0.00001234, timer: 60, rating: 4.8, status: 'paying', lastPaid: '2 min ago', dailyClaims: 15420, reliability: 98 },
    { id: 2, name: 'ETH Rain', url: 'ethrain.io', coin: 'ETH', reward: 0.0001, timer: 45, rating: 4.5, status: 'paying', lastPaid: '5 min ago', dailyClaims: 8930, reliability: 95 },
    { id: 3, name: 'DogeBits', url: 'dogebits.com', coin: 'DOGE', reward: 5.4, timer: 30, rating: 4.7, status: 'paying', lastPaid: '1 min ago', dailyClaims: 23450, reliability: 97 },
    { id: 4, name: 'SolanaDrop', url: 'solanadrop.net', coin: 'SOL', reward: 0.005, timer: 90, rating: 4.2, status: 'problem', lastPaid: '2 hours ago', dailyClaims: 4520, reliability: 72 },
    { id: 5, name: 'LiteFaucet', url: 'litefaucet.org', coin: 'LTC', reward: 0.0015, timer: 60, rating: 4.6, status: 'paying', lastPaid: '3 min ago', dailyClaims: 7230, reliability: 94 },
    { id: 6, name: 'BNB Rewards', url: 'bnbrewards.io', coin: 'BNB', reward: 0.0008, timer: 120, rating: 4.4, status: 'paying', lastPaid: '10 min ago', dailyClaims: 3120, reliability: 91 },
    { id: 7, name: 'CryptoGem', url: 'cryptogem.xyz', coin: 'BTC', reward: 0.000008, timer: 180, rating: 3.2, status: 'problem', lastPaid: '6 hours ago', dailyClaims: 890, reliability: 58 },
    { id: 8, name: 'QuickETH', url: 'quicketh.com', coin: 'ETH', reward: 0.00005, timer: 15, rating: 4.9, status: 'paying', lastPaid: '1 min ago', dailyClaims: 45670, reliability: 99 },
  ];

  const getFilteredFaucets = () => {
    let filtered = [...faucets];

    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.coin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(f => f.status === filter);
    }

    if (coinFilter !== 'all') {
      filtered = filtered.filter(f => f.coin === coinFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'reward') return b.reward - a.reward;
      if (sortBy === 'timer') return a.timer - b.timer;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paying': return 'bg-green-500';
      case 'problem': return 'bg-yellow-500';
      case 'scam': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paying': return 'Paying';
      case 'problem': return 'Problem';
      case 'scam': return 'Scam';
      default: return 'Unknown';
    }
  };

  const getCoinGradient = (coin: string) => {
    const gradients: any = {
      BTC: 'from-yellow-400 to-orange-500',
      ETH: 'from-purple-400 to-indigo-600',
      DOGE: 'from-amber-400 to-yellow-600',
      SOL: 'from-green-400 to-teal-500',
      LTC: 'from-slate-300 to-slate-500',
      BNB: 'from-yellow-300 to-amber-400',
    };
    return gradients[coin] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Radar className="w-10 h-10 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Faucet Scanner</h1>
              <p className="text-slate-400 text-sm">Real-time faucet status monitoring</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-green-400 text-2xl font-bold">{faucets.filter(f => f.status === 'paying').length}</p>
                <p className="text-slate-400 text-sm">Paying</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-yellow-400 text-2xl font-bold">{faucets.filter(f => f.status === 'problem').length}</p>
                <p className="text-slate-400 text-sm">Problems</p>
              </div>
            </div>
          </div>
          <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-red-400 text-2xl font-bold">{faucets.filter(f => f.status === 'scam').length}</p>
                <p className="text-slate-400 text-sm">Scams</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-400 text-2xl font-bold">
                  {faucets.reduce((sum, f) => sum + f.dailyClaims, 0).toLocaleString()}
                </p>
                <p className="text-slate-400 text-sm">Daily Claims</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search faucets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="paying">Paying</option>
              <option value="problem">Problems</option>
              <option value="scam">Scams</option>
            </select>
            <select
              value={coinFilter}
              onChange={(e) => setCoinFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Coins</option>
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="DOGE">Dogecoin</option>
              <option value="SOL">Solana</option>
              <option value="LTC">Litecoin</option>
              <option value="BNB">BNB</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="reward">Sort by Reward</option>
              <option value="timer">Sort by Timer</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Faucets Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-6 py-4 text-left text-slate-400 font-medium">Faucet</th>
                <th className="px-6 py-4 text-right text-slate-400 font-medium">Reward</th>
                <th className="px-6 py-4 text-right text-slate-400 font-medium">Timer</th>
                <th className="px-6 py-4 text-right text-slate-400 font-medium">Rating</th>
                <th className="px-6 py-4 text-center text-slate-400 font-medium">Status</th>
                <th className="px-6 py-4 text-right text-slate-400 font-medium">Reliability</th>
                <th className="px-6 py-4 text-right text-slate-400 font-medium">Daily</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredFaucets().map((faucet) => (
                <tr key={faucet.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCoinGradient(faucet.coin)} flex items-center justify-center text-white font-bold`}>
                        {faucet.coin[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{faucet.name}</p>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <span className="text-purple-400">{faucet.coin}</span>
                          <span>•</span>
                          <span>{faucet.lastPaid}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white font-medium">
                      {faucet.reward < 1 ? faucet.reward.toFixed(6) : faucet.reward.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-xs">{faucet.coin}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-white">{faucet.timer}m</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{faucet.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm text-white ${
                      faucet.status === 'paying' ? 'bg-green-500/20 text-green-400' :
                      faucet.status === 'problem' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(faucet.status)}`}></span>
                      {getStatusText(faucet.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            faucet.reliability >= 90 ? 'bg-green-500' :
                            faucet.reliability >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${faucet.reliability}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{faucet.reliability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white font-medium">{faucet.dailyClaims.toLocaleString()}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FaucetScanner;