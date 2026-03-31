import React from 'react';
import { Layers, Zap, Activity, Network, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface L2Solution {
  id: string;
  name: string;
  chain: string;
  type: 'Rollup' | 'Validium' | 'Plasma' | 'Channel' | 'Modular';
  tps: number;
  tvl: string;
  fee: string;
  finality: string;
  status: 'active' | 'beta' | 'coming';
  features: string[];
}

const templates = {
  es: {
    title: 'Exploradores Layer 2',
    subtitle: 'Explora y compara soluciones Layer 2 para Ethereum',
    tps: 'TPS',
    tvl: 'TVL',
    fee: 'Fee Promedio',
    finality: 'Finalidad',
    features: 'Características',
    status: {
      active: 'Activo',
      beta: 'Beta',
      coming: 'Próximamente',
    },
    viewExplorer: 'Ver Explorador',
    type: 'Tipo',
    chain: 'Cadena',
    toggle2D: 'Vista 2D',
    toggle3D: 'Vista 3D',
    createNode: 'Crear Nodo',
    createBridge: 'Crear Bridge',
  },
  en: {
    title: 'Layer 2 Explorers',
    subtitle: 'Explore and compare Ethereum Layer 2 solutions',
    tps: 'TPS',
    tvl: 'TVL',
    fee: 'Avg Fee',
    finality: 'Finality',
    features: 'Features',
    status: {
      active: 'Active',
      beta: 'Beta',
      coming: 'Coming Soon',
    },
    viewExplorer: 'View Explorer',
    type: 'Type',
    chain: 'Chain',
    toggle2D: '2D View',
    toggle3D: '3D View',
    createNode: 'Create Node',
    createBridge: 'Create Bridge',
  },
};

export default function Layer2Explorers() {
  const [isSpanish, setIsSpanish] = React.useState(true);
  // view3D kept for potential future 3D visualization feature
  // const [view3D, setView3D] = React.useState(false);
  const [selectedSolution, setSelectedSolution] = React.useState<L2Solution | null>(null);
  const text = templates[isSpanish ? 'es' : 'en'];

  const [solutions, setSolutions] = React.useState<L2Solution[]>([
    {
      id: 'arbitrum',
      name: 'Arbitrum One',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 40000,
      tvl: '$2.5B',
      fee: '$0.10',
      finality: '1 min',
      status: 'active',
      features: ['Optimistic Rollup', 'EVM Compatible', 'Low Gas', 'Fast Finality'],
    },
    {
      id: 'optimism',
      name: 'Optimism',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 4500,
      tvl: '$1.8B',
      fee: '$0.05',
      finality: '2 min',
      status: 'active',
      features: ['Optimistic Rollup', 'OP Stack', 'DeFi Friendly', 'Low Cost'],
    },
    {
      id: 'zksync',
      name: 'zkSync Era',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 20000,
      tvl: '$900M',
      fee: '$0.02',
      finality: '10 sec',
      status: 'active',
      features: ['ZK Rollup', 'EVM Compatible', 'Privacy', 'Ultra Low Fees'],
    },
    {
      id: 'starknet',
      name: 'Starknet',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 100000,
      tvl: '$600M',
      fee: '$0.01',
      finality: '5 min',
      status: 'beta',
      features: ['ZK Rollup', 'Cairo VM', 'Account Abstraction', 'Scalable'],
    },
    {
      id: 'polygon',
      name: 'Polygon zkEVM',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 2000,
      tvl: '$500M',
      fee: '$0.05',
      finality: '30 sec',
      status: 'active',
      features: ['ZK Rollup', 'EVM Equivalent', 'Security', 'Interoperable'],
    },
    {
      id: 'base',
      name: 'Base',
      chain: 'Coinbase',
      type: 'Rollup',
      tps: 20000,
      tvl: '$400M',
      fee: '$0.001',
      finality: '1 sec',
      status: 'active',
      features: ['OP Stack', 'Low Fees', 'Onchain Orderbook', 'Coinbase'],
    },
    {
      id: 'mantle',
      name: 'Mantle',
      chain: 'Ethereum',
      type: 'Modular',
      tps: 5000,
      tvl: '$200M',
      fee: '$0.01',
      finality: '2 min',
      status: 'active',
      features: ['Modular L2', 'Data Availability', 'Low Cost', 'EVM Compatible'],
    },
    {
      id: 'scroll',
      name: 'Scroll',
      chain: 'Ethereum',
      type: 'Rollup',
      tps: 5000,
      tvl: '$100M',
      fee: '$0.02',
      finality: '10 min',
      status: 'beta',
      features: ['ZK Rollup', 'Type 1 ZK-EVM', 'Native Support', 'Community'],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'from-green-600/20 to-emerald-600/20 border-green-500/30';
      case 'beta':
        return 'from-yellow-600/20 to-amber-600/20 border-yellow-500/30';
      case 'coming':
        return 'from-gray-600/20 to-slate-600/20 border-gray-500/30';
      default:
        return 'from-blue-600/20 to-cyan-600/20 border-blue-500/30';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 text-green-400';
      case 'beta':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'coming':
        return 'bg-gray-600/20 text-gray-400';
      default:
        return 'bg-blue-600/20 text-blue-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Layers className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <p className="text-gray-400">{text.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSpanish(!isSpanish)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors"
          >
            {isSpanish ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Network className="w-6 h-6 text-purple-400" />
            <span className="text-gray-400 text-sm">Total Solutions</span>
          </div>
          <div className="text-2xl font-bold text-white">{solutions.length}</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-green-400" />
            <span className="text-gray-400 text-sm">Total TVL</span>
          </div>
          <div className="text-2xl font-bold text-white">$6.0B</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400 text-sm">Active Solutions</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {solutions.filter(s => s.status === 'active').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-400 text-sm">Avg TPS</span>
          </div>
          <div className="text-2xl font-bold text-white">24,500</div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {solutions.map(solution => (
          <div
            key={solution.id}
            className={`bg-gradient-to-br ${getStatusColor(solution.status)} border backdrop-blur-lg rounded-xl p-5 cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => setSelectedSolution(solution)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{solution.name}</h3>
                  <span className="text-gray-400 text-xs">{solution.chain}</span>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadgeColor(solution.status)}`}
              >
                {text.status[solution.status]}
              </span>
            </div>

            {/* Type Badge */}
            <div className="mb-4">
              <span className="text-xs text-gray-400">{text.type}:</span>
              <span className="ml-2 text-sm text-white font-medium">{solution.type}</span>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{text.tps}</span>
                <span className="text-white font-medium">{solution.tps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{text.tvl}</span>
                <span className="text-white font-medium">{solution.tvl}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{text.fee}</span>
                <span className="text-green-400 font-medium">{solution.fee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{text.finality}</span>
                <span className="text-white font-medium">{solution.finality}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {solution.features.slice(0, 2).map(feature => (
                <span
                  key={feature}
                  className="text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {solution.features.length > 2 && (
                <span className="text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded">
                  +{solution.features.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSolution.name}</h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusBadgeColor(selectedSolution.status)}`}
                  >
                    {text.status[selectedSolution.status]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSolution(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Activity className="w-6 h-6" />
              </button>
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.type}</span>
                <div className="text-xl font-bold text-white">{selectedSolution.type}</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.chain}</span>
                <div className="text-xl font-bold text-white">{selectedSolution.chain}</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.tps}</span>
                <div className="text-xl font-bold text-white">
                  {selectedSolution.tps.toLocaleString()}
                </div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.tvl}</span>
                <div className="text-xl font-bold text-white">{selectedSolution.tvl}</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.fee}</span>
                <div className="text-xl font-bold text-green-400">{selectedSolution.fee}</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <span className="text-gray-400 text-sm">{text.finality}</span>
                <div className="text-xl font-bold text-white">{selectedSolution.finality}</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {text.features}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedSolution.features.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-lg font-medium hover:from-purple-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2">
              {text.viewExplorer}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
