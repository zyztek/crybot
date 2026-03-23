import { useState } from 'react'
import { Crown, Coins } from 'lucide-react'
import type { Faucet } from '@/types'
import type { TranslationTexts } from '@/i18n/translations'
import FaucetCard from './FaucetCard'

interface FaucetsViewProps {
  faucets: Faucet[]
  onClaim: (faucet: Faucet) => void
  language: 'es' | 'en'
  t: TranslationTexts
}

export default function FaucetsView({ faucets, onClaim, language, t }: FaucetsViewProps) {
  const [filter, setFilter] = useState<string>('all')

  const filteredFaucets = filter === 'all' 
    ? faucets 
    : faucets.filter((f: Faucet) => f.coin === filter)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          {t.premium} Faucets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faucets.filter((f: Faucet) => f.category === 'premium' || f.category === 'hot').map((faucet: Faucet) => (
            <FaucetCard key={faucet.id} faucet={faucet} onClaim={onClaim} featured language={language} />
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'all' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('BTC')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'BTC' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-orange-300 hover:bg-slate-700'
          }`}
        >
          BTC
        </button>
        <button 
          onClick={() => setFilter('ETH')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'ETH' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-blue-300 hover:bg-slate-700'
          }`}
        >
          ETH
        </button>
        <button 
          onClick={() => setFilter('DOGE')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'DOGE' ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-yellow-300 hover:bg-slate-700'
          }`}
        >
          DOGE
        </button>
        <button 
          onClick={() => setFilter('SOL')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'SOL' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          SOL
        </button>
        <button 
          onClick={() => setFilter('LTC')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
            filter === 'LTC' ? 'bg-gray-400 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          LTC
        </button>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Coins className="w-5 h-5 text-purple-400" />
        {t.faucets}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredFaucets.map((faucet: Faucet) => (
          <FaucetCard key={faucet.id} faucet={faucet} onClaim={onClaim} language={language} />
        ))}
      </div>
    </div>
  )
}
