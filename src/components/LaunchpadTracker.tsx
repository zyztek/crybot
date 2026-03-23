import React, { useState } from 'react';
import { Rocket, Clock, DollarSign, TrendingUp, CheckCircle, AlertCircle, Eye, Calendar, Shield, Flame, Zap } from 'lucide-react';

interface LaunchpadProject {
  id: number;
  name: string;
  logo: string;
  description: string;
  chain: string;
  status: 'upcoming' | 'live' | 'ended' | 'staking';
  saleType: 'ido' | 'ieo' | 'ino' | 'sweat';
  startDate: string;
  endDate: string;
  hardCap: number;
  raised: number;
  tokenPrice: number;
  tokenSymbol: string;
  allocation: string;
  kyccompleted: boolean;
  auditCompleted: boolean;
  category: string;
  socialLinks: { twitter?: string; telegram?: string; website?: string };
}

const projects: LaunchpadProject[] = [
  { id: 1, name: 'DeFi Protocol X', logo: '🔷', description: 'Protocolo DeFi de próxima generación con farming optimizado', chain: 'Ethereum', status: 'live', saleType: 'ido', startDate: '2024-02-01', endDate: '2024-02-15', hardCap: 500000, raised: 425000, tokenPrice: 0.05, tokenSymbol: 'DPX', allocation: '0.5 ETH max', kyccompleted: true, auditCompleted: true, category: 'DeFi', socialLinks: {} },
  { id: 2, name: 'Metaverse Game', logo: '🎮', description: 'Juego play-to-earn en el metaverse con economy real', chain: 'Solana', status: 'staking', saleType: 'ino', startDate: '2024-02-20', endDate: '2024-03-05', hardCap: 750000, raised: 0, tokenPrice: 0.03, tokenSymbol: 'META', allocation: '50 SOL max', kyccompleted: true, auditCompleted: true, category: 'Gaming', socialLinks: {} },
  { id: 3, name: 'AI Chat Protocol', logo: '🤖', description: 'Protocolo descentralizado de IA con chat privado', chain: 'Binance', status: 'upcoming', saleType: 'ido', startDate: '2024-02-25', endDate: '2024-03-10', hardCap: 300000, raised: 0, tokenPrice: 0.01, tokenSymbol: 'AIC', allocation: '0.2 BNB max', kyccompleted: true, auditCompleted: false, category: 'AI', socialLinks: {} },
  { id: 4, name: 'Green Energy DAO', logo: '🌱', description: 'DAO de energía renovable con tokenización de activos', chain: 'Polygon', status: 'live', saleType: 'ido', startDate: '2024-01-28', endDate: '2024-02-12', hardCap: 250000, raised: 218000, tokenPrice: 0.08, tokenSymbol: 'GEN', allocation: '1000 MATIC', kyccompleted: true, auditCompleted: true, category: 'Real World Assets', socialLinks: {} },
  { id: 5, name: 'NFT Marketplace V2', logo: '🖼️', description: 'Marketplace de NFTs con fees reducidos y royalties', chain: 'Avalanche', status: 'upcoming', saleType: 'ieo', startDate: '2024-03-01', endDate: '2024-03-15', hardCap: 400000, raised: 0, tokenPrice: 0.04, tokenSymbol: 'NFTX', allocation: '10 AVAX max', kyccompleted: true, auditCompleted: true, category: 'NFT', socialLinks: {} },
  { id: 6, name: 'Cross-Chain Bridge', logo: '🌉', description: 'Bridge cross-chain con seguridad y速度快', chain: 'Arbitrum', status: 'staking', saleType: 'ido', startDate: '2024-03-10', endDate: '2024-03-25', hardCap: 600000, raised: 0, tokenPrice: 0.06, tokenSymbol: 'XCB', allocation: '0.3 ETH equiv', kyccompleted: true, auditCompleted: true, category: 'Infrastructure', socialLinks: {} },
  { id: 7, name: 'SocialFi Platform', logo: '💬', description: 'Red social descentralizada con monetización', chain: 'Ethereum', status: 'upcoming', saleType: 'ido', startDate: '2024-03-15', endDate: '2024-03-30', hardCap: 350000, raised: 0, tokenPrice: 0.02, tokenSymbol: 'SOC', allocation: '0.4 ETH max', kyccompleted: false, auditCompleted: false, category: 'Social', socialLinks: {} },
  { id: 8, name: 'Privacy Layer One', logo: '🔒', description: 'L1 blockchain enfocada en privacidad', chain: 'Native', status: 'ended', saleType: 'ido', startDate: '2024-01-15', endDate: '2024-01-30', hardCap: 800000, raised: 800000, tokenPrice: 0.15, tokenSymbol: 'PRIV', allocation: 'Sold out', kyccompleted: true, auditCompleted: true, category: 'Infrastructure', socialLinks: {} }
];

export const LaunchpadTracker: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'staking' | 'ended'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filter === 'all' || project.status === filter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'staking': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ended': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <Flame className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'staking': return <Zap className="w-4 h-4" />;
      case 'ended': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const categories = [...new Set(projects.map(p => p.category))];

  const stats = {
    totalRaised: projects.filter(p => p.raised > 0).reduce((sum, p) => sum + p.raised, 0),
    totalCap: projects.reduce((sum, p) => sum + p.hardCap, 0),
    liveProjects: projects.filter(p => p.status === 'live').length,
    upcomingProjects: projects.filter(p => p.status === 'upcoming').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Launchpad Tracker
            </h1>
          </div>
          <p className="text-slate-400">Descubre las mejores opportunities en IDOs, IEOs y token sales</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Raiseado</p>
                <p className="text-2xl font-bold text-white">${(stats.totalRaised / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Cap Total</p>
                <p className="text-2xl font-bold text-white">${(stats.totalCap / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">En Vivo</p>
                <p className="text-2xl font-bold text-white">{stats.liveProjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-xl p-5 border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Próximos</p>
                <p className="text-2xl font-bold text-white">{stats.upcomingProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              {['all', 'live', 'staking', 'upcoming', 'ended'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    filter === status
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  } capitalize`}
                >
                  {status === 'all' ? 'Todos' : status === 'live' ? <><Flame className="w-4 h-4" /> En Vivo</> : status === 'staking' ? <><Zap className="w-4 h-4" /> Staking</> : status === 'upcoming' ? <><Clock className="w-4 h-4" /> Próximos</> : <><CheckCircle className="w-4 h-4" /> Finalizados</>}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todas las Categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const progress = project.hardCap > 0 ? (project.raised / project.hardCap) * 100 : 0;
            return (
              <div
                key={project.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{project.logo}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-slate-400">{project.chain}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-white uppercase">{project.saleType}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status === 'live' ? '🔥 Live' : project.status === 'staking' ? '⚡ Staking' : project.status === 'upcoming' ? '⏳ Upcoming' : '✅ Ended'}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mb-4">{project.description}</p>

                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Progress</span>
                      <span className="text-sm font-bold text-white">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Raised: <span className="text-white font-medium">${project.raised.toLocaleString()}</span></span>
                      <span className="text-slate-400">Cap: <span className="text-white font-medium">${project.hardCap.toLocaleString()}</span></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Token Price</p>
                      <p className="font-semibold text-white">${project.tokenPrice}</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Allocation</p>
                      <p className="font-semibold text-white">{project.allocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    {project.kyccompleted && (
                      <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                        <Shield className="w-3 h-3" /> KYC
                      </div>
                    )}
                    {project.auditCompleted && (
                      <div className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Auditado
                      </div>
                    )}
                    {!project.kyccompleted && (
                      <div className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" /> KYC Pendiente
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.startDate}</span>
                    </div>
                    <Eye className="w-4 h-4" />
                    <span>→</span>
                    <span>{project.endDate}</span>
                  </div>

                  <button
                    className={`w-full py-3 font-medium rounded-lg transition-all duration-300 ${
                      project.status === 'live' || project.status === 'staking'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : project.status === 'upcoming'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {project.status === 'live' ? '🚀 Participar Ahora' : 
                     project.status === 'staking' ? '⚡ Empezar Staking' :
                     project.status === 'upcoming' ? '🔔 Recordarme' : '✅ Finalizado'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-300 font-semibold mb-1">Aviso de Riesgo</p>
              <p className="text-xs text-amber-200/80">
                Las inversiones en IDOs/IEOs conllevan riesgos significativos. Investiga cada proyecto a fondo antes de participar.
                No inviertas dinero que no puedes permitirte perder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};