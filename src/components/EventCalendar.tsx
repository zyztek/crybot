import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  TrendingUp,
  Flame,
  Globe,
  Zap,
  Trophy,
  Users,
  BarChart3,
  DollarSign,
  Bitcoin,
  Search,
  Gift,
} from 'lucide-react';

interface CryptoEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type:
    | 'conference'
    | 'airdrop'
    | 'listing'
    | 'burn'
    | 'upgrade'
    | 'partnership'
    | 'hackathon'
    | 'earnings'
    | 'farming';
  status: 'upcoming' | 'live' | 'completed';
  impact: 'high' | 'medium' | 'low';
  description: string;
  project?: string;
  location?: string;
  link?: string;
}

const events: CryptoEvent[] = [
  {
    id: 1,
    title: 'Ethereum Cancun Upgrade',
    date: '2024-03-15',
    time: '14:00 UTC',
    type: 'upgrade',
    status: 'upcoming',
    impact: 'high',
    description: 'Major network upgrade introducing EIP-4844 for improved L2 scalability',
    project: 'Ethereum',
    link: '#',
  },
  {
    id: 2,
    title: 'Bitcoin Halving',
    date: '2024-04-19',
    time: '00:00 UTC',
    type: 'burn',
    status: 'upcoming',
    impact: 'high',
    description: ' Bitcoin block reward halves from 6.25 BTC to 3.125 BTC',
    project: 'Bitcoin',
    link: '#',
  },
  {
    id: 3,
    title: 'Binance Blockchain Week',
    date: '2024-05-06',
    time: '09:00 UTC',
    type: 'conference',
    status: 'upcoming',
    impact: 'medium',
    description: 'Annual blockchain conference featuring industry leaders',
    project: 'Binance',
    location: 'Dubai',
    link: '#',
  },
  {
    id: 4,
    title: 'Solana Airdrop Distribution',
    date: '2024-03-20',
    time: '16:00 UTC',
    type: 'airdrop',
    status: 'upcoming',
    impact: 'high',
    description: 'First airdrop season distributing tokens to active users',
    project: 'Solana',
    link: '#',
  },
  {
    id: 5,
    title: 'ETH/USDT Fee Burn Event',
    date: '2024-03-18',
    time: '12:00 UTC',
    type: 'burn',
    status: 'live',
    impact: 'medium',
    description: 'Monthly token burn reducing circulating supply',
    project: 'Ethereum',
    link: '#',
  },
  {
    id: 6,
    title: 'DeFi Protocol Security Audit',
    date: '2024-03-22',
    time: '10:00 UTC',
    type: 'hackathon',
    status: 'upcoming',
    impact: 'low',
    description: 'Security audit competition with $100k prize pool',
    location: 'Online',
    link: '#',
  },
  {
    id: 7,
    title: 'Coinbase New Token Listing',
    date: '2024-03-25',
    time: '15:30 UTC',
    type: 'listing',
    status: 'upcoming',
    impact: 'high',
    description: 'Major exchange listing for popular DeFi token',
    project: 'Coinbase',
    link: '#',
  },
  {
    id: 8,
    title: 'Solana x Polygon Partnership',
    date: '2024-03-28',
    time: '14:00 UTC',
    type: 'partnership',
    status: 'upcoming',
    impact: 'high',
    description: 'Strategic partnership announcement for cross-chain solutions',
    project: 'Solana',
    link: '#',
  },
  {
    id: 9,
    title: 'Staking Rewards Update',
    date: '2024-04-01',
    time: '00:00 UTC',
    type: 'earnings',
    status: 'upcoming',
    impact: 'medium',
    description: 'APY adjustment based on network participation',
    project: 'Ethereum',
    link: '#',
  },
  {
    id: 10,
    title: ' liquidity Mining Initiation',
    date: '2024-03-30',
    time: '10:00 UTC',
    type: 'farming',
    status: 'upcoming',
    impact: 'medium',
    description: 'New yield farming program with 20% APY',
    project: 'Aave',
    link: '#',
  },
];

const typeLabels: Record<CryptoEvent['type'], string> = {
  conference: 'Conferencia',
  airdrop: 'Airdrop',
  listing: 'Listado',
  burn: 'Token Burn',
  upgrade: 'Upgrade',
  partnership: 'Partnership',
  hackathon: 'Hackathon',
  earnings: 'Earnings',
  farming: 'Yield Farming',
};

const statusLabels: Record<CryptoEvent['status'], string> = {
  upcoming: 'Próximo',
  live: 'En vivo',
  completed: 'Completado',
};

const impactColors: Record<CryptoEvent['impact'], string> = {
  high: 'text-red-400 bg-red-400/10 border-red-400/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  low: 'text-green-400 bg-green-400/10 border-green-400/30',
};

const typeIcons: Record<CryptoEvent['type'], any> = {
  conference: Users,
  airdrop: Gift,
  listing: TrendingUp,
  burn: Flame,
  upgrade: Zap,
  partnership: Globe,
  hackathon: Trophy,
  earnings: DollarSign,
  farming: BarChart3,
};

const EventCalendar = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    live: events.filter(e => e.status === 'live').length,
    highImpact: events.filter(e => e.impact === 'high').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📅 Crypto Event Calendar</h1>
          <p className="text-slate-400">
            Follow important crypto events that could impact the market
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Eventos</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Próximos</p>
                <p className="text-2xl font-bold text-white">{stats.upcoming}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">En Vivo</p>
                <p className="text-2xl font-bold text-white">{stats.live}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-sm text-slate-400">Alto Impacto</p>
                <p className="text-2xl font-bold text-white">{stats.highImpact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los Tipos</option>
              {Object.entries(typeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los Estados</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map(event => {
            const TypeIcon = typeIcons[event.type];
            return (
              <div
                key={event.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${impactColors[event.impact]}`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      {event.status === 'live' && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 mb-4">{event.description}</p>

                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.project && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Bitcoin className="w-4 h-4" />
                          <span>{event.project}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                        {typeLabels[event.type]}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm rounded-full border ${
                          event.status === 'live'
                            ? 'bg-red-500/20 text-red-400 border-red-400/30'
                            : event.status === 'upcoming'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-400/30'
                              : 'bg-green-500/20 text-green-400 border-green-400/30'
                        }`}
                      >
                        {statusLabels[event.status]}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm rounded-full border ${impactColors[event.impact]}`}
                      >
                        Impacto:{' '}
                        {event.impact === 'high'
                          ? 'Alto'
                          : event.impact === 'medium'
                            ? 'Medio'
                            : 'Bajo'}
                      </span>
                    </div>
                  </div>

                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-lg text-purple-300 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver más
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              No se encontraron eventos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
