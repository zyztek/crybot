import { useState } from 'react';
import {
  Wallet,
  Send,
  CheckCircle,
  Clock,
  ArrowUpRight,
  QrCode,
  Key,
  Eye,
  EyeOff,
  Copy,
  Search,
  Filter,
  X,
} from 'lucide-react';
import type { WalletBalance } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

interface WalletViewProps {
  walletBalance: WalletBalance;
  withdrawalHistory: {
    id: number;
    coin: string;
    amount: string;
    address: string;
    status: string;
    date: string;
  }[];
  showAddress: boolean;
  onToggleAddress: () => void;
  t: TranslationTexts;
}

export default function WalletView({
  walletBalance,
  withdrawalHistory,
  showAddress,
  onToggleAddress,
  t,
}: WalletViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [coinFilter, setCoinFilter] = useState('all');

  const filteredHistory = withdrawalHistory.filter(item => {
    const matchesSearch = item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCoin = coinFilter === 'all' || item.coin === coinFilter;
    return matchesSearch && matchesStatus && matchesCoin;
  });

  const coins = [...new Set(withdrawalHistory.map(h => h.coin))];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            {t.balance}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { coin: 'BTC', icon: '₿', balance: walletBalance.btc, color: 'from-yellow-400 to-orange-500' },
              { coin: 'ETH', icon: 'Ξ', balance: walletBalance.eth, color: 'from-blue-400 to-purple-500' },
              { coin: 'DOGE', icon: 'Ð', balance: walletBalance.doge, color: 'from-yellow-300 to-yellow-500' },
              { coin: 'SOL', icon: '◎', balance: walletBalance.sol, color: 'from-purple-400 to-pink-500' },
              { coin: 'LTC', icon: 'Ł', balance: walletBalance.ltc, color: 'from-gray-400 to-gray-500' },
              { coin: 'BNB', icon: '⬡', balance: walletBalance.bnb, color: 'from-yellow-400 to-yellow-600' },
              { coin: 'XRP', icon: '✕', balance: walletBalance.xrp, color: 'from-blue-400 to-blue-600' },
              { coin: 'ADA', icon: '₳', balance: walletBalance.ada, color: 'from-blue-300 to-blue-500' },
              { coin: 'AVAX', icon: '🔺', balance: walletBalance.avax, color: 'from-red-400 to-red-600' },
              { coin: 'DOT', icon: '●', balance: walletBalance.dot, color: 'from-pink-400 to-pink-600' },
            ].map(item => (
              <div
                key={item.coin}
                className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center font-bold text-white text-sm`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-white font-bold">{item.coin}</span>
                </div>
                <p className="text-green-400 font-bold">{item.balance}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-purple-400" />
            {t.recentWithdrawals}
          </h3>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4 p-3 bg-slate-900/50 rounded-lg">
            <div className="relative flex-1 min-w-[150px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search address or coin..."
                className="w-full pl-10 pr-10 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={coinFilter}
              onChange={(e) => setCoinFilter(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Coins</option>
              {coins.map(coin => (
                <option key={coin} value={coin}>{coin}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No transactions match your filters</p>
              </div>
            ) : (
              filteredHistory.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-purple-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}
                    >
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {item.amount} {item.coin}
                      </p>
                      <p className="text-purple-300 text-xs">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xs font-medium ${
                        item.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}
                    >
                      {item.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </p>
                    <p className="text-purple-300 text-xs">{item.address}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-green-400" />
            {t.withdraw}
          </h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Hacer Retiro
            </button>
            <button className="w-full py-3 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" />
              Escanear QR
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-400" />
            Wallet Address
          </h3>
          <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 text-purple-300 text-sm font-mono truncate">
                {showAddress
                  ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
                  : '••••••••••••••••••••••••••••'}
              </div>
              <button
                onClick={onToggleAddress}
                className="text-purple-400 hover:text-white transition-colors"
              >
                {showAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" />
            Copiar Dirección
          </button>
        </div>
      </div>
    </div>
  );
}
