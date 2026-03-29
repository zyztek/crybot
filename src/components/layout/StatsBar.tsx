import { Wallet, Activity, Zap, TrendingUp } from 'lucide-react'
import StatCard from '../ui/StatCard'
import type { WalletBalance, ClaimHistory, Faucet } from '@/types'
import type { TranslationTexts } from '@/i18n/translations'

interface StatsBarProps {
  walletBalance: WalletBalance
  history: ClaimHistory[]
  faucets: Faucet[]
  t: TranslationTexts
}

export default function StatsBar({ walletBalance, history, faucets, t }: StatsBarProps) {
  const btcValue: string = walletBalance.btc ?? '0'
  const activeFaucetsCount: number = faucets ? faucets.filter(f => f.status === 'available').length : 0
  const availableCoinsCount: number = Object.values(walletBalance).filter((b) => parseFloat(String(b)) > 0).length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <StatCard 
        icon={<Wallet className="w-5 h-5" />}
        title={t.totalClaimed}
        value={btcValue + ' BTC'}
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
      <StatCard 
        icon={<Activity className="w-5 h-5" />}
        title={t.todayClaims}
        value={String(history.length)}
        color="from-green-500/20 to-emerald-500/20"
        borderColor="border-green-500/30"
        iconColor="text-green-400"
        iconBg="bg-green-500/20"
      />
      <StatCard 
        icon={<Zap className="w-5 h-5" />}
        title={t.activeFaucets}
        value={String(activeFaucetsCount)}
        color="from-purple-500/20 to-pink-500/20"
        borderColor="border-purple-500/30"
        iconColor="text-purple-400"
        iconBg="bg-purple-500/20"
      />
      <StatCard 
        icon={<TrendingUp className="w-5 h-5" />}
        title={t.availableCoins}
        value={String(availableCoinsCount)}
        color="from-blue-500/20 to-cyan-500/20"
        borderColor="border-blue-500/30"
        iconColor="text-blue-400"
        iconBg="bg-blue-500/20"
      />
    </div>
  )
}