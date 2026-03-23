import { Coins, Bell, Flame, Star, Users } from 'lucide-react'
import type { User } from '@/types'

interface HeaderProps {
  user: User
  language: 'es' | 'en'
  notifications: number
  onToggleLanguage: () => void
}

export default function Header({ user, language, notifications, onToggleLanguage }: HeaderProps) {
  return (
    <header className="border-b border-purple-500/20 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CryptoFaucet Hub</h1>
              <p className="text-xs text-purple-300">Automation Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <input 
              type="text" 
              placeholder={language === 'es' ? 'Buscar faucets...' : 'Search faucets...'}
              className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-purple-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 bg-slate-800 rounded-lg text-purple-300 hover:text-white transition-colors text-sm font-medium"
            >
              {language.toUpperCase()}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-purple-500/20">
              <div className="text-right hidden sm:block">
                <p className="text-white font-medium text-sm">{user.username}</p>
                <p className="text-purple-300 text-xs">Nivel {user.level}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 border-t border-purple-500/10">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-purple-300 text-sm">Racha: 5 días</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-purple-300 text-sm">{user.xp}/{user.maxXp} XP</span>
          </div>
          <div className="flex-1 bg-slate-800 rounded-full h-2 max-w-xs">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${(user.xp / user.maxXp) * 100}%` }} />
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-purple-300 text-sm">{user.totalReferrals} referidos</span>
          </div>
        </div>
      </div>
    </header>
  )
}