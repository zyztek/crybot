import { useState, useEffect } from 'react';
import { Coins, Bell, Flame, Star, Users, Sun, Moon, Search, X } from 'lucide-react';
import type { User } from '@/types';

interface HeaderProps {
  user: User;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  notifications: number;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export default function Header({
  user,
  language,
  theme,
  notifications,
  onToggleLanguage,
  onToggleTheme,
  searchTerm = '',
  onSearch,
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sync local search with parent searchTerm prop
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearch?.('');
  };

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

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Search
              className={`absolute left-3 w-4 h-4 transition-colors ${isSearchFocused ? 'text-purple-400' : 'text-purple-500'}`}
            />
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={language === 'es' ? 'Buscar faucets...' : 'Search faucets...'}
              className="w-full pl-10 pr-10 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              aria-label={language === 'es' ? 'Buscar faucets' : 'Search faucets'}
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-3 p-1 text-purple-400 hover:text-white transition-colors"
                aria-label={language === 'es' ? 'Limpiar búsqueda' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 text-purple-300 hover:text-white transition-colors"
              aria-label={language === 'es' ? 'Notificaciones' : 'Notifications'}
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 bg-slate-800 rounded-lg text-purple-300 hover:text-white transition-colors"
              title={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
              aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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

        <div
          className="flex items-center gap-4 py-3 border-t border-purple-500/10"
          role="navigation"
          aria-label="User stats"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-purple-300 text-sm">Racha: 5 días</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-purple-300 text-sm">
              {user.xp}/{user.maxXp} XP
            </span>
          </div>
          <div className="flex-1 bg-slate-800 rounded-full h-2 max-w-xs">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-purple-300 text-sm">{user.totalReferrals} referidos</span>
          </div>
        </div>
      </div>
    </header>
  );
}
