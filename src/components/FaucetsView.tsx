import { useState, useMemo } from 'react';
import { Crown, Coins, Filter, X } from 'lucide-react';
import type { Faucet } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';
import FaucetCard from './FaucetCard';

interface FaucetsViewProps {
  faucets: Faucet[];
  onClaim: (faucet: Faucet) => void;
  language: 'es' | 'en';
  t: TranslationTexts;
  searchTerm?: string;
  onClearSearch?: () => void;
}

export default function FaucetsView({
  faucets,
  onClaim,
  language,
  t,
  searchTerm = '',
  onClearSearch,
}: FaucetsViewProps) {
  const [coinFilter, setCoinFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredFaucets = useMemo(() => {
    let result = faucets;

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (f: Faucet) =>
          f.name.toLowerCase().includes(term) ||
          f.coin.toLowerCase().includes(term) ||
          f.category.toLowerCase().includes(term)
      );
    }

    // Coin filter
    if (coinFilter !== 'all') {
      result = result.filter((f: Faucet) => f.coin === coinFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((f: Faucet) => f.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((f: Faucet) => f.status === statusFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter((f: Faucet) => f.difficulty === difficultyFilter);
    }

    return result;
  }, [faucets, searchTerm, coinFilter, categoryFilter, statusFilter, difficultyFilter]);

  const activeFiltersCount = [
    coinFilter !== 'all',
    categoryFilter !== 'all',
    statusFilter !== 'all',
    difficultyFilter !== 'all',
    !!searchTerm,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCoinFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
    setDifficultyFilter('all');
    onClearSearch?.();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          {t.premium} Faucets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faucets
            .filter((f: Faucet) => f.category === 'premium' || f.category === 'hot')
            .map((faucet: Faucet) => (
              <FaucetCard
                key={faucet.id}
                faucet={faucet}
                onClaim={onClaim}
                featured
                language={language}
              />
            ))}
        </div>
      </div>

      {/* Quick filter buttons */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <button
          onClick={() => setCoinFilter('all')}
          aria-pressed={coinFilter === 'all'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          {language === 'es' ? 'Todas' : 'All'}
        </button>
        <button
          onClick={() => setCoinFilter('BTC')}
          aria-pressed={coinFilter === 'BTC'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'BTC'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-orange-300 hover:bg-slate-700'
          }`}
        >
          BTC
        </button>
        <button
          onClick={() => setCoinFilter('ETH')}
          aria-pressed={coinFilter === 'ETH'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'ETH'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-800 text-blue-300 hover:bg-slate-700'
          }`}
        >
          ETH
        </button>
        <button
          onClick={() => setCoinFilter('DOGE')}
          aria-pressed={coinFilter === 'DOGE'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'DOGE'
              ? 'bg-yellow-500 text-white'
              : 'bg-slate-800 text-yellow-300 hover:bg-slate-700'
          }`}
        >
          DOGE
        </button>
        <button
          onClick={() => setCoinFilter('SOL')}
          aria-pressed={coinFilter === 'SOL'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'SOL'
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          SOL
        </button>
        <button
          onClick={() => setCoinFilter('LTC')}
          aria-pressed={coinFilter === 'LTC'}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            coinFilter === 'LTC'
              ? 'bg-gray-400 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          LTC
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`ml-auto px-3 py-1.5 rounded-lg font-medium transition-all text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            showFilters || activeFiltersCount > 0
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
          }`}
        >
          <Filter className="w-4 h-4" />
          {language === 'es' ? 'Filtros' : 'Filters'}
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="mb-4 p-4 bg-slate-800/50 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">
              {language === 'es' ? 'Filtros avanzados' : 'Advanced Filters'}
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-purple-300 hover:text-white text-sm flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {language === 'es' ? 'Limpiar todo' : 'Clear all'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category filter */}
            <div>
              <label className="text-purple-300 text-sm mb-2 block">
                {language === 'es' ? 'Categoría' : 'Category'}
              </label>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">{language === 'es' ? 'Todas' : 'All'}</option>
                <option value="hot">{language === 'es' ? '🔥 Popular' : '🔥 Hot'}</option>
                <option value="new">{language === 'es' ? '🆕 Nuevo' : '🆕 New'}</option>
                <option value="stable">{language === 'es' ? '💎 Estable' : '💎 Stable'}</option>
                <option value="premium">{language === 'es' ? '👑 Premium' : '👑 Premium'}</option>
              </select>
            </div>

            {/* Status filter */}
            <div>
              <label className="text-purple-300 text-sm mb-2 block">
                {language === 'es' ? 'Estado' : 'Status'}
              </label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">{language === 'es' ? 'Todos' : 'All'}</option>
                <option value="available">
                  {language === 'es' ? '✅ Disponible' : '✅ Available'}
                </option>
                <option value="cooldown">
                  {language === 'es' ? '⏳ En espera' : '⏳ Cooldown'}
                </option>
              </select>
            </div>

            {/* Difficulty filter */}
            <div>
              <label htmlFor="difficulty-filter" className="text-purple-300 text-sm mb-2 block">
                {language === 'es' ? 'Dificultad' : 'Difficulty'}
              </label>
              <select
                id="difficulty-filter"
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">{language === 'es' ? 'Todas' : 'All'}</option>
                <option value="easy">{language === 'es' ? '🟢 Fácil' : '🟢 Easy'}</option>
                <option value="medium">{language === 'es' ? '🟡 Media' : '🟡 Medium'}</option>
                <option value="hard">{language === 'es' ? '🔴 Difícil' : '🔴 Hard'}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search results info */}
      {searchTerm && (
        <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-between">
          <p className="text-purple-300 text-sm">
            {language === 'es'
              ? `Encontrados ${filteredFaucets.length} faucet(s) para "${searchTerm}"`
              : `Found ${filteredFaucets.length} faucet(s) for "${searchTerm}"`}
          </p>
        </div>
      )}

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
  );
}
