import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Activity, Percent, ChevronDown, Plus } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import CryptoChart from './CryptoChart';

interface Asset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change24h: number;
  change7d: number;
  allocation: number;
}

const Portfolio: React.FC = () => {
  const { language } = useCryptoStore();
  const [timeframe, setTimeframe] = useState('1D');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const assets: Asset[] = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.125, value: 5423.50, change24h: 2.5, change7d: 8.3, allocation: 42 },
    { symbol: 'ETH', name: 'Ethereum', amount: 2.5, value: 3987.75, change24h: 3.2, change7d: 12.1, allocation: 31 },
    { symbol: 'DOGE', name: 'Dogecoin', amount: 15420, value: 865.32, change24h: -1.8, change7d: 5.4, allocation: 6 },
    { symbol: 'SOL', name: 'Solana', amount: 18.75, value: 1875.00, change24h: 4.8, change7d: 15.2, allocation: 14 },
    { symbol: 'LTC', name: 'Litecoin', amount: 4.2, value: 319.80, change24h: 1.2, change7d: 3.8, allocation: 2 },
    { symbol: 'BNB', name: 'BNB', amount: 1.8, value: 540.00, change24h: 0.9, change7d: 2.1, allocation: 5 },
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0);
  const totalChange7d = assets.reduce((sum, asset) => sum + (asset.value * asset.change7d / 100), 0);

  const text = {
    es: {
      title: 'Mi Portafolio',
      totalValue: 'Valor Total',
      change24h: 'Cambio 24h',
      change7d: 'Cambio 7d',
      allocation: 'Asignación',
      holdings: 'Holdings',
      add: 'Añadir',
      refresh: 'Actualizar',
      details: 'Ver Detalles',
      hide: 'Ocultar',
      timeframe: 'Periodo',
      balance: 'Balance',
      profit: 'Beneficio',
      performance: 'Rendimiento',
      chart: 'Gráfico',
    },
    en: {
      title: 'My Portfolio',
      totalValue: 'Total Value',
      change24h: '24h Change',
      change7d: '7d Change',
      allocation: 'Allocation',
      holdings: 'Holdings',
      add: 'Add',
      refresh: 'Refresh',
      details: 'View Details',
      hide: 'Hide',
      timeframe: 'Period',
      balance: 'Balance',
      profit: 'Profit',
      performance: 'Performance',
      chart: 'Chart',
    }
  };

  const t = text[language as keyof typeof text];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="w-8 h-8 text-yellow-400" />
            {t.title}
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setTimeframe('1D')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1D' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1D
            </button>
            <button 
              onClick={() => setTimeframe('1W')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1W' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1W
            </button>
            <button 
              onClick={() => setTimeframe('1M')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1M' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1M
            </button>
            <button 
              onClick={() => setTimeframe('1Y')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === '1Y' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              1Y
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.totalValue}</p>
                <p className="text-3xl font-bold text-white mt-1">${totalValue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  {totalChange24h >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span className={totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {totalChange24h >= 0 ? '+' : ''}${Math.abs(totalChange24h).toFixed(2)}
                  </span>
                  <span className={`text-sm ${totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ({totalChange24h >= 0 ? '+' : ''}{totalChange24h.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.performance} 7D</p>
                <p className={`text-3xl font-bold mt-1 ${totalChange7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalChange7d >= 0 ? '+' : ''}{totalChange7d.toFixed(2)}%
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {totalChange7d >= 0 ? '+' : ''}${Math.abs(totalChange7d).toFixed(2)}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.balance}</p>
                <p className="text-3xl font-bold text-white mt-1">{assets.length}</p>
                <p className="text-slate-400 text-sm mt-2">{t.holdings}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                <Wallet className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{t.profit} Total</p>
                <p className="text-3xl font-bold text-green-400 mt-1">+$1,234.56</p>
                <p className="text-slate-400 text-sm mt-2">+12.34%收益率</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <Percent className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">{t.holdings}</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-sm">
                      <th className="text-left pb-4">Activo</th>
                      <th className="text-right pb-4">{t.balance}</th>
                      <th className="text-right pb-4">Valor</th>
                      <th className="text-right pb-4">{t.change24h}</th>
                      <th className="text-right pb-4">{t.allocation}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <>
                        <tr key={asset.symbol} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                                {asset.symbol[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{asset.symbol}</p>
                                <p className="text-sm text-slate-400">{asset.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <p className="text-white font-medium">{asset.amount.toFixed(4)}</p>
                          </td>
                          <td className="text-right py-4">
                            <p className="text-white font-medium">${asset.value.toLocaleString()}</p>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex items-center justify-end gap-1">
                              {asset.change24h >= 0 ? (
                                <ArrowUpRight className="w-4 h-4 text-green-400" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-400" />
                              )}
                              <span className={asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex items-center justify-end">
                              <div className="w-24 bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full" 
                                  style={{ width: `${asset.allocation}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-white text-sm">{asset.allocation}%</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <button 
                              onClick={() => setShowDetails(showDetails === asset.symbol ? null : asset.symbol)}
                              className="p-2 hover:bg-slate-700 rounded-lg transition-all"
                            >
                              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showDetails === asset.symbol ? 'rotate-180' : ''}`} />
                            </button>
                          </td>
                        </tr>
                        {showDetails === asset.symbol && (
                          <tr className="bg-slate-800/50">
                            <td colSpan={6} className="p-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">7D Change</p>
                                  <p className={`text-lg font-semibold ${asset.change7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {asset.change7d >= 0 ? '+' : ''}{asset.change7d.toFixed(2)}%
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">Avg Buy Price</p>
                                  <p className="text-lg font-semibold text-white">
                                    ${(asset.value / asset.amount * 0.95).toFixed(2)}
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">P&L</p>
                                  <p className={`text-lg font-semibold ${(asset.value / asset.amount * 0.95) < (asset.value / asset.amount) ? 'text-green-400' : 'text-red-400'}`}>
                                    +${(asset.value * 0.05).toFixed(2)}
                                  </p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-slate-400 text-sm">Actions</p>
                                  <div className="flex gap-2 mt-1">
                                    <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm">Buy</button>
                                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm">Sell</button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 h-48">
                                <CryptoChart symbol={asset.symbol} height={192} />
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6">{t.allocation}</h2>
            
            {/* Donut Chart Simulation */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  let offset = 0;
                  const colors = ['#F59E0B', '#8B5CF6', '#3B82F6', '#10B981', '#6366F1', '#EC4899'];
                  
                  return assets.map((asset, i) => {
                    const percentage = asset.allocation / 100;
                    const dashArray = `${percentage * 314} 314`;
                    const circle = (
                      <circle
                        key={asset.symbol}
                        cx="50"
                        cy="50"
                        r="50"
                        fill="none"
                        stroke={colors[i % colors.length]}
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        className="transition-all duration-500"
                      />
                    );
                    offset += percentage * 314;
                    return circle;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">{t.totalValue}</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {assets.map((asset, i) => {
                const colors = ['bg-yellow-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-indigo-500', 'bg-pink-500'];
                return (
                  <div key={asset.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`}></div>
                      <span className="text-white">{asset.symbol}</span>
                    </div>
                    <span className="text-slate-400">{asset.allocation}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;