import { Wallet, Send, CheckCircle, Clock, ArrowUpRight, QrCode, Key, Eye, EyeOff, Copy } from 'lucide-react'
import type { WalletBalance } from '@/types'
import type { TranslationTexts } from '@/i18n/translations'

interface WalletViewProps {
  walletBalance: WalletBalance
  withdrawalHistory: { id: number; coin: string; amount: string; address: string; status: string; date: string }[]
  showAddress: boolean
  onToggleAddress: () => void
  t: TranslationTexts
}

export default function WalletView({ walletBalance, withdrawalHistory, showAddress, onToggleAddress, t }: WalletViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            {t.balance}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { coin: 'BTC', icon: '₿', balance: walletBalance.btc, color: 'from-yellow-400 to-orange-500' },
              { coin: 'ETH', icon: 'Ξ', balance: walletBalance.eth, color: 'from-blue-400 to-purple-500' },
              { coin: 'DOGE', icon: 'Ð', balance: walletBalance.doge, color: 'from-yellow-300 to-yellow-500' },
              { coin: 'SOL', icon: '◎', balance: walletBalance.sol, color: 'from-purple-400 to-pink-500' },
              { coin: 'LTC', icon: 'Ł', balance: walletBalance.ltc, color: 'from-gray-400 to-gray-500' },
              { coin: 'BNB', icon: '⬡', balance: walletBalance.bnb, color: 'from-yellow-400 to-yellow-600' },
            ].map((item) => (
              <div key={item.coin} className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center font-bold text-white text-sm`}>
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
          <div className="space-y-2">
            {withdrawalHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.amount} {item.coin}</p>
                    <p className="text-purple-300 text-xs">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${
                    item.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {item.status === 'completed' ? 'Completado' : 'Pendiente'}
                  </p>
                  <p className="text-purple-300 text-xs">{item.address}</p>
                </div>
              </div>
            ))}
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
                {showAddress ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' : '••••••••••••••••••••••••••••'}
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
  )
}
