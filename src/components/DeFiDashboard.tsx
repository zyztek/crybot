import { useState } from 'react';
import { TrendingUp, Wallet, Zap, BarChart3, DollarSign, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';

interface Protocol {
  id: string;
  name: string;
  icon: string;
  protocol: string;
  tvl: number;
  apy: number;
  staked: number;
  earnings: number;
  token: string;
}

const PROTOCOLS: Protocol[] = [
  { id: '1', name: 'Uniswap V3', icon: 'Uniswap', protocol: 'Uniswap', tvl: 2500000000, apy: 15.5, staked: 0.5, earnings: 0.025, token: 'UNI' },
  { id: '2', name: 'Aave V3', icon: 'Aave', protocol: 'Aave', tvl: 12000000000, apy: 4.2, staked: 1.2, earnings: 0.018, token: 'ETH' },
  { id: '3', name: 'Compound', icon: 'Compound', protocol: 'Compound', tvl: 2500000000, apy: 3.8, staked: 0.8, earnings: 0.012, token: 'ETH' },
  { id: '4', name: 'Curve', icon: 'Curve', protocol: 'Curve', tvl: 8000000000, apy: 8.5, staked: 2.5, earnings: 0.045, token: 'CRV' },
  { id: '5', name: 'Yearn', icon: 'Yearn', protocol: 'Yearn', tvl: 600000000, apy: 12.3, staked: 0.3, earnings: 0.008, token: 'YFI' },
];

export default function DeFiDashboard() {
  const { language } = useCryptoStore();
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');

  const filteredProtocols = selectedProtocol === 'all' 
    ? PROTOCOLS 
    : PROTOCOLS.filter(p => p.name.toLowerCase().includes(selectedProtocol));

  const totalValue = PROTOCOLS.reduce((acc, p) => acc + p.staked * 2500, 0);
  const totalEarnings = PROTOCOLS.reduce((acc, p) => acc + p.earnings, 0);

  const t = {
    title: language === 'es' ? 'DeFi Dashboard' : 'DeFi Dashboard',
    subtitle: language === 'es' ? 'Gestiona tus posiciones en protocolos DeFi' : 'Manage your DeFi protocol positions',
    totalValue: language === 'es' ? 'Valor Total' : 'Total Value',
    totalEarnings: language === 'es' ? 'Ganancias Totales' : 'Total Earnings',
    protocols: language === 'es' ? 'Protocolos' : 'Protocols',
    tvl: language === 'es' ? 'TVL' : 'TVL',
    apy: language === 'es' ? 'APY' : 'APY',
    staked: language === 'es' ? 'Stakeado' : 'Staked',
    earnings: language === 'es' ? 'Ganancias' : 'Earnings',
    manage: language === 'es' ? 'Gestionar' : 'Manage',
    protocolsLabel: language === 'es' ? 'Todos los Protocolos' : 'All Protocols',
  };

  const formatTVL = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-300 text-sm">{t.totalValue}</p>
              <p className="text-white text-xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-green-300 text-sm">{t.totalEarnings}</p>
              <p className="text-white text-xl font-bold">${(totalEarnings * 2500).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-300 text-sm">Avg. APY</p>
              <p className="text-white text-xl font-bold">8.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedProtocol('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedProtocol === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {t.protocolsLabel}
        </button>
        {PROTOCOLS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProtocol(p.name.toLowerCase())}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedProtocol === p.name.toLowerCase()
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProtocols.map(protocol => (
          <div
            key={protocol.id}
            className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">{protocol.name}</p>
                  <p className="text-slate-400 text-xs">{protocol.protocol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold text-xl">{protocol.apy}%</p>
                <p className="text-slate-400 text-xs">{t.apy}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{t.tvl}</span>
                <span className="text-white">{formatTVL(protocol.tvl)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{t.staked}</span>
                <span className="text-white">{protocol.staked} {protocol.token}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{t.earnings}</span>
                <span className="text-green-400">+{protocol.earnings} {protocol.token}</span>
              </div>
            </div>

            <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all">
              {t.manage}
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-200 text-sm">
          {language === 'es' 
            ? 'Los datos de APY son aproximadas y pueden variar. Siempre investiga antes de invertir en protocolos DeFi.'
            : 'APY data is approximate and may vary. Always do your own research before investing in DeFi protocols.'}
        </p>
      </div>
    </div>
  );
}