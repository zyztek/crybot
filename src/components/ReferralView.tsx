import { Gift, Copy, Share2, TrendingUp, Users } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'

interface ReferralViewProps {
  user: {
    referralCode: string
    totalReferrals: number
    referralEarnings: string
  }
  onCopy: () => void
  t: TranslationTexts
}

export default function ReferralView({ user, onCopy, t }: ReferralViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{t.referralTitle}</h2>
            <p className="text-purple-300">{t.referralDesc}</p>
          </div>
        </div>
        
        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <p className="text-purple-300 text-sm mb-2">{t.yourCode}</p>
          <div className="flex items-center gap-2">
            <span className="flex-1 text-white font-mono text-lg bg-slate-800/50 px-4 py-2 rounded-lg">
              {user.referralCode}
            </span>
            <button 
              onClick={onCopy}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {t.copyCode}
            </button>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          {t.shareLink}
        </button>
      </div>

      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          {t.totalEarnings}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-purple-300 text-sm">Referidos</p>
            <p className="text-3xl font-bold text-white">{user.totalReferrals}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-purple-300 text-sm">Ganado</p>
            <p className="text-3xl font-bold text-green-400">{user.referralEarnings}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            Últimos Referidos
          </h4>
          {['User123', 'CryptoFan', 'BTClover', 'EthHodler', 'SOLMoon'].map((name, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-sm">
                  {name[0]}
                </div>
                <span className="text-white text-sm">{name}</span>
              </div>
              <span className="text-green-400 text-sm">+{['0.00001', '0.00002', '0.00001', '0.00003', '0.00001'][i]} BTC</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
