import { Crown, Target, Clock, Zap, Timer } from 'lucide-react'
import type { Faucet } from '@/types'

interface FaucetCardProps {
  faucet: Faucet
  onClaim: (faucet: Faucet) => void
  featured?: boolean
  language: 'es' | 'en'
}

const coinColors: Record<string, string> = {
  'BTC': 'from-yellow-400 to-orange-500',
  'ETH': 'from-blue-400 to-purple-500',
  'DOGE': 'from-yellow-300 to-yellow-500',
  'SOL': 'from-purple-400 to-pink-500',
  'LTC': 'from-gray-400 to-gray-500',
  'BNB': 'from-yellow-400 to-yellow-600',
}

const categoryBadges: Record<string, { bg: string; text: string }> = {
  'hot': { bg: 'bg-red-500/20', text: 'text-red-400' },
  'stable': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  'new': { bg: 'bg-green-500/20', text: 'text-green-400' },
  'premium': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
}

const difficultyColors: Record<string, string> = {
  'easy': 'text-green-400',
  'medium': 'text-yellow-400',
  'hard': 'text-red-400',
}

export default function FaucetCard({ faucet, onClaim, featured, language }: FaucetCardProps) {
  return (
    <div className={`
      ${featured ? 'bg-gradient-to-br from-slate-800/80 to-purple-900/40' : 'bg-slate-800/50'} 
      border ${featured ? 'border-purple-500/30' : 'border-purple-500/20'} 
      rounded-xl p-4 backdrop-blur-sm hover:border-purple-500/40 transition-all
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`
            w-10 h-10 bg-gradient-to-r ${coinColors[faucet.coin]} 
            rounded-lg flex items-center justify-center text-lg font-bold text-white
          `}>
            {faucet.icon}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{faucet.name}</h3>
            <span className={`
              text-xs px-2 py-0.5 rounded-full ${categoryBadges[faucet.category].bg} ${categoryBadges[faucet.category].text}
            `}>
              {faucet.category.toUpperCase()}
            </span>
          </div>
        </div>
        {featured && <Crown className="w-4 h-4 text-yellow-400" />}
      </div>

      <div className="bg-slate-900/50 rounded-lg p-2.5 mb-3">
        <p className="text-purple-300 text-xs mb-1">Reward</p>
        <p className="text-lg font-bold text-green-400">{faucet.reward} <span className="text-purple-300 text-sm">{faucet.coin}</span></p>
      </div>

      <div className="flex items-center gap-1.5 text-purple-300 text-xs mb-3">
        <Target className="w-3.5 h-3.5" />
        <span className={`capitalize ${difficultyColors[faucet.difficulty]}`}>{faucet.difficulty}</span>
        <span className="text-purple-500">•</span>
        <Clock className="w-3.5 h-3.5" />
        <span>{faucet.timer}s</span>
      </div>

      <div>
        {faucet.status === 'available' ? (
          <button
            onClick={() => onClaim(faucet)}
            className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {language === 'es' ? 'Reclamar' : 'Claim'}
          </button>
        ) : (
          <div className="w-full py-2.5 bg-slate-700 text-purple-300 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
            <Timer className="w-4 h-4" />
            {faucet.timer}s {language === 'es' ? 'restantes' : 'remaining'}
          </div>
        )}
      </div>
    </div>
  )
}
