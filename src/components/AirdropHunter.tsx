import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter,
  Gift,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAirdrop } from '../hooks/useGraphQL';

interface Airdrop {
  id: number;
  name: string;
  project: string;
  status: 'active' | 'upcoming' | 'ended';
  reward: string;
  value: string;
  deadline: string;
  tasks: string[];
  requirements: string;
  difficulty: 'easy' | 'medium' | 'hard';
  verified: boolean;
  logo: string;
}

const airdrops: Airdrop[] = [
  {
    id: 1,
    name: 'LayerZero Airdrop',
    project: 'LayerZero Labs',
    status: 'active',
    reward: '~500 LZO',
    value: '$1,200 - $3,000',
    deadline: '2024-03-15',
    tasks: ['Bridge assets', 'Use dApps', 'Provide liquidity'],
    requirements: 'Min $100 TVL',
    difficulty: 'medium',
    verified: true,
    logo: '🌐',
  },
  {
    id: 2,
    name: 'Arbitrum Odyssey',
    project: 'Arbitrum',
    status: 'active',
    reward: '~400 ARB',
    value: '$500 - $1,500',
    deadline: '2024-02-28',
    tasks: ['Bridge ETH', 'Use protocols', 'NFT mint'],
    requirements: 'Min 5 transactions',
    difficulty: 'easy',
    verified: true,
    logo: '⚡',
  },
  {
    id: 3,
    name: 'zkSync Era Quest',
    project: 'zkSync',
    status: 'active',
    reward: '~300 ZK',
    value: '$400 - $1,000',
    deadline: '2024-04-01',
    tasks: ['Deposit funds', 'Swap tokens', 'Bridge L1→L2'],
    requirements: 'No minimum',
    difficulty: 'easy',
    verified: true,
    logo: '🔷',
  },
  {
    id: 4,
    name: 'Starknet Provisions',
    project: 'Starknet',
    status: 'upcoming',
    reward: '~500 STRK',
    value: '$600 - $1,800',
    deadline: 'TBA',
    tasks: ['Deploy contract', 'Use dApps', 'Bridge funds'],
    requirements: 'Min $50 spent',
    difficulty: 'hard',
    verified: true,
    logo: '🔺',
  },
  {
    id: 5,
    name: 'Scroll Alpha',
    project: 'Scroll',
    status: 'active',
    reward: '~200 SCR',
    value: '$200 - $800',
    deadline: '2024-03-01',
    tasks: ['Bridge ETH', 'Swap tokens', 'Provide liquidity'],
    requirements: 'Min 3 txns',
    difficulty: 'easy',
    verified: true,
    logo: '📜',
  },
  {
    id: 6,
    name: 'Linea Voyage',
    project: 'Linea',
    status: 'active',
    reward: '~350 LINA',
    value: '$350 - $1,200',
    deadline: '2024-03-20',
    tasks: ['Complete quests', 'Use bridge', 'NFT collection'],
    requirements: 'Min $20 spent',
    difficulty: 'medium',
    verified: true,
    logo: '🌊',
  },
  {
    id: 7,
    name: 'Base Quests',
    project: 'Coinbase Base',
    status: 'active',
    reward: '~250 BASE',
    value: '$150 - $500',
    deadline: 'Ongoing',
    tasks: ['Use Onchain Summer', 'Mint NFTs', 'Bridge funds'],
    requirements: 'No minimum',
    difficulty: 'easy',
    verified: true,
    logo: '🔵',
  },
  {
    id: 8,
    name: 'Berachain Testnet',
    project: 'Berachain',
    status: 'upcoming',
    reward: '~BRIA tokens',
    value: '$500 - $2,000',
    deadline: '2024-06-01',
    tasks: ['Testnet swap', 'Provide liquidity', 'Use dApps'],
    requirements: 'Testnet participation',
    difficulty: 'medium',
    verified: false,
    logo: '🐻',
  },
  {
    id: 9,
    name: 'Metis Season 2',
    project: 'MetisDAO',
    status: 'ended',
    reward: '~150 METIS',
    value: '$200 - $600',
    deadline: '2024-01-15',
    tasks: ['Stake tokens', 'Bridge funds', 'Use dApps'],
    requirements: 'Min 500 METIS staked',
    difficulty: 'medium',
    verified: true,
    logo: '⚙️',
  },
  {
    id: 10,
    name: 'Altlayer Rollups',
    project: 'Altlayer',
    status: 'upcoming',
    reward: '~ALT tokens',
    value: '$300 - $1,000',
    deadline: 'TBA',
    tasks: ['Use rollups', 'Bridge assets', 'Provide liquidity'],
    requirements: 'Multiple rollups',
    difficulty: 'hard',
    verified: false,
    logo: '🚀',
  },
];

export const AirdropHunter: React.FC = () => {
  const { fetchAirdrops, fetchMyClaims, claim, verify } = useAirdrop();
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>(
    'all'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [airdropList, setAirdropList] = useState<Airdrop[]>(airdrops);

  // Fetch airdrops on mount
  useEffect(() => {
    fetchAirdrops
      .execute()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchAirdrops]);

  // Update airdrop list when data changes
  useEffect(() => {
    if (fetchAirdrops.data?.airdrops) {
      setAirdropList(
        fetchAirdrops.data.airdrops.map((a: any) => ({
          id: parseInt(a.id),
          name: a.name,
          project: a.description,
          status: a.status,
          reward: a.amount,
          value: '$0',
          deadline: 'TBA',
          tasks: [],
          requirements: '',
          difficulty: 'medium',
          verified: false,
          logo: '🎁',
        }))
      );
    }
  }, [fetchAirdrops.data]);

  const filteredAirdrops = airdropList.filter(airdrop => {
    const matchesStatus = filter === 'all' || airdrop.status === filter;
    const matchesDifficulty = difficultyFilter === 'all' || airdrop.difficulty === difficultyFilter;
    const matchesSearch =
      airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airdrop.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesDifficulty && matchesSearch;
  });

  const getStatusColor = (status: Airdrop['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ended':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: Airdrop['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      case 'hard':
        return 'bg-red-500/20 text-red-400';
    }
  };

  const stats = {
    active: airdropList.filter(a => a.status === 'active').length,
    upcoming: airdropList.filter(a => a.status === 'upcoming').length,
    ended: airdropList.filter(a => a.status === 'ended').length,
    verified: airdropList.filter(a => a.verified).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gift className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Airdrop Hunter
            </h1>
          </div>
          <p className="text-slate-400">Descubre y participa en los mejores airdrops del mercado</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.active}</p>
                <p className="text-sm text-slate-400">Activos</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.upcoming}</p>
                <p className="text-sm text-slate-400">Próximos</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.verified}</p>
                <p className="text-sm text-slate-400">Verificados</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.ended}</p>
                <p className="text-sm text-slate-400">Finalizados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar airdrop..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="upcoming">Próximos</option>
                <option value="ended">Finalizados</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value as any)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todas las dificultades</option>
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Airdrop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAirdrops.map(airdrop => (
            <div
              key={airdrop.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{airdrop.logo}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{airdrop.name}</h3>
                      <p className="text-sm text-slate-400">{airdrop.project}</p>
                    </div>
                  </div>
                  {airdrop.verified && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>

                <div className="flex gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(airdrop.status)}`}
                  >
                    {airdrop.status === 'active'
                      ? '🔥 Activo'
                      : airdrop.status === 'upcoming'
                        ? '⏳ Próximo'
                        : '✅ Finalizado'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(airdrop.difficulty)}`}
                  >
                    {airdrop.difficulty === 'easy'
                      ? '🟢 Fácil'
                      : airdrop.difficulty === 'medium'
                        ? '🟡 Medio'
                        : '🔴 Difícil'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Recompensa:</span>
                    <span className="text-white font-medium">{airdrop.reward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Valor estimado:</span>
                    <span className="text-green-400 font-medium">{airdrop.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Deadline:</span>
                    <span className="text-white font-medium">{airdrop.deadline}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4">
                  Requisitos: <span className="text-white">{airdrop.requirements}</span>
                </p>

                <div className="mb-4">
                  <p className="text-sm text-slate-400 mb-2">Tareas:</p>
                  <div className="space-y-2">
                    {airdrop.tasks.slice(0, 2).map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">{task}</span>
                      </div>
                    ))}
                    {airdrop.tasks.length > 2 && (
                      <p className="text-xs text-purple-400">
                        +{airdrop.tasks.length - 2} tareas más...
                      </p>
                    )}
                  </div>
                </div>

                {!airdrop.verified && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-300">
                        No verificado - Investiga antes de participar
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedAirdrop(airdrop)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Ver Detalles
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Airdrop Detail Modal */}
        {selectedAirdrop && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAirdrop(null)}
          >
            <div
              className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{selectedAirdrop.logo}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedAirdrop.name}</h2>
                      <p className="text-slate-400">{selectedAirdrop.project}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAirdrop(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAirdrop.status)}`}
                  >
                    {selectedAirdrop.status === 'active'
                      ? '🔥 Activo'
                      : selectedAirdrop.status === 'upcoming'
                        ? '⏳ Próximo'
                        : '✅ Finalizado'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedAirdrop.difficulty)}`}
                  >
                    {selectedAirdrop.difficulty === 'easy'
                      ? '🟢 Fácil'
                      : selectedAirdrop.difficulty === 'medium'
                        ? '🟡 Medio'
                        : '🔴 Difícil'}
                  </span>
                  {selectedAirdrop.verified && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                      ✓ Verificado
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Recompensa</p>
                    <p className="text-lg font-semibold text-white">{selectedAirdrop.reward}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Valor estimado</p>
                    <p className="text-lg font-semibold text-green-400">{selectedAirdrop.value}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Tareas requeridas</h3>
                  <div className="space-y-3">
                    {selectedAirdrop.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-3"
                      >
                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-purple-400 text-sm font-medium">{idx + 1}</span>
                        </div>
                        <span className="text-slate-300">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-400 mb-2">Requisitos mínimos</p>
                  <p className="text-white">{selectedAirdrop.requirements}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300">
                    Comenzar Participación
                  </button>
                  <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Sitio Web
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
