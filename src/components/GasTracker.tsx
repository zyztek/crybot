import { useState, useEffect } from 'react';
import { Fuel, Zap, Clock, TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';

interface GasPrice {
  slow: number;
  average: number;
  fast: number;
  unit: string;
  lastUpdated: string;
}

const MOCK_GAS_DATA: Record<string, GasPrice> = {
  ethereum: { slow: 15, average: 22, fast: 35, unit: 'Gwei', lastUpdated: new Date().toISOString() },
  solana: { slow: 0.00025, average: 0.0005, fast: 0.001, unit: 'SOL', lastUpdated: new Date().toISOString() },
  polygon: { slow: 45, average: 65, fast: 95, unit: 'Gwei', lastUpdated: new Date().toISOString() },
  arbitrum: { slow: 0.08, average: 0.12, fast: 0.2, unit: 'Gwei', lastUpdated: new Date().toISOString() },
};

export default function GasTracker() {
  const { language } = useCryptoStore();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum');
  const [gasData, setGasData] = useState<Record<string, GasPrice>>(MOCK_GAS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const t = {
    title: language === 'es' ? 'Gas Tracker' : 'Gas Tracker',
    subtitle: language === 'es' ? 'Comisiones de red en tiempo real' : 'Real-time network fees',
    slow: language === 'es' ? 'Lento' : 'Slow',
    average: language === 'es' ? 'Promedio' : 'Average',
    fast: language === 'es' ? 'Rápido' : 'Fast',
    lastUpdate: language === 'es' ? 'Última actualización' : 'Last updated',
    refresh: language === 'es' ? 'Actualizar' : 'Refresh',
    gasPrice: language === 'es' ? 'Precio Gas' : 'Gas Price',
    estimatedTime: language === 'es' ? 'Tiempo Est.' : 'Est. Time',
    network: language === 'es' ? 'Red' : 'Network',
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const getNetworkIcon = (network: string) => {
    switch(network) {
      case 'ethereum': return 'E';
      case 'solana': return 'S';
      case 'polygon': return 'M';
      case 'arbitrum': return 'A';
      default: return '?';
    }
  };

  const getNetworkColor = (network: string) => {
    switch(network) {
      case 'ethereum': return 'from-blue-400 to-purple-500';
      case 'solana': return 'from-purple-400 to-pink-500';
      case 'polygon': return 'from-purple-500 to-indigo-500';
      case 'arbitrum': return 'from-blue-500 to-cyan-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const currentGas = gasData[selectedNetwork];

  return (
    <div className="space-y-6">
      {/* Network Selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(gasData).map(network => (
          <button
            key={network}
            onClick={() => setSelectedNetwork(network)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedNetwork === network
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="mr-2">{getNetworkIcon(network)}</span>
            {network.charAt(0).toUpperCase() + network.slice(1)}
          </button>
        ))}
      </div>

      {/* Current Network Gas Info */}
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${getNetworkColor(selectedNetwork)} rounded-xl flex items-center justify-center`}>
              <Fuel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg capitalize">{selectedNetwork} {t.gasPrice}</h3>
              <p className="text-slate-400 text-sm">{currentGas.unit}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 bg-slate-700 rounded-lg text-purple-400 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Gas Price Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Slow */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">{t.slow}</span>
            </div>
            <p className="text-white text-2xl font-bold">{currentGas.slow}</p>
            <p className="text-slate-400 text-xs mt-1">~5-10 min</p>
          </div>

          {/* Average */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">{t.average}</span>
            </div>
            <p className="text-white text-2xl font-bold">{currentGas.average}</p>
            <p className="text-slate-400 text-xs mt-1">~1-3 min</p>
          </div>

          {/* Fast */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-slate-400 text-sm">{t.fast}</span>
            </div>
            <p className="text-white text-2xl font-bold">{currentGas.fast}</p>
            <p className="text-slate-400 text-xs mt-1">~{"<30s"}</p>
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-4 text-center text-slate-400 text-sm">
          {t.lastUpdate}: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* All Networks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(gasData).map(([network, data]) => (
          <div
            key={network}
            onClick={() => setSelectedNetwork(network)}
            className={`bg-slate-800/50 border rounded-xl p-4 cursor-pointer transition-all hover:border-purple-500/40 ${
              selectedNetwork === network ? 'border-purple-500/30' : 'border-purple-500/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium capitalize">{network}</span>
              <div className={`w-6 h-6 bg-gradient-to-r ${getNetworkColor(network)} rounded flex items-center justify-center text-xs text-white font-bold`}>
                {getNetworkIcon(network)}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Avg:</span>
              <span className="text-white font-medium">{data.average} {data.unit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fast:</span>
              <span className="text-green-400 font-medium">{data.fast} {data.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <Fuel className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-200 text-sm">
          {language === 'es' 
            ? 'Los precios de gas son aproximados y pueden cambiar rápidamente. Para transacciones importantes, usa gas más alto para confirmar más rápido.'
            : 'Gas prices are approximate and can change rapidly. For important transactions, use higher gas for faster confirmation.'}
        </p>
      </div>
    </div>
  );
}