import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDown,
  BarChart2,
  PieChart,
  LineChart,
  Filter,
  Calendar,
} from 'lucide-react';

export default function PerformanceAnalyzer() {
  const [isSpanish, setIsSpanish] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const performanceData = {
    totalReturn: 23.4,
    dailyReturn: 1.2,
    weeklyReturn: 5.6,
    monthlyReturn: 23.4,
    yearlyReturn: 89.5,
    sharpeRatio: 2.34,
    sortinoRatio: 3.12,
    maxDrawdown: -8.5,
    volatility: 12.3,
    beta: 0.85,
    alpha: 5.6,
    winRate: 67.8,
  };

  const assetPerformance = [
    { name: 'BTC', return: 15.2, contribution: 35 },
    { name: 'ETH', return: 28.7, contribution: 28 },
    { name: 'SOL', return: 45.6, contribution: 20 },
    { name: 'DOGE', return: -8.3, contribution: 8 },
    { name: 'AVAX', return: 32.1, contribution: 9 },
  ];

  const monthlyReturns = [
    { month: 'Jul', return: 5.2 },
    { month: 'Aug', return: 8.9 },
    { month: 'Sep', return: -2.3 },
    { month: 'Oct', return: 12.5 },
    { month: 'Nov', return: 15.6 },
    { month: 'Dec', return: 23.4 },
  ];

  const text = isSpanish
    ? {
        title: 'Analizador de Rendimiento',
        overview: 'Resumen',
        returns: 'Rendimientos',
        risk: 'Riesgo',
        assetPerformance: 'Rendimiento por Activo',
        timeRange: 'Rango de Tiempo',
        totalReturn: 'Retorno Total',
        dailyReturn: 'Retorno Diario',
        weeklyReturn: 'Retorno Semanal',
        monthlyReturn: 'Retorno Mensual',
        yearlyReturn: 'Retorno Anual',
        sharpeRatio: 'Ratio Sharpe',
        sortinoRatio: 'Ratio Sortino',
        maxDrawdown: 'Max Drawdown',
        volatility: 'Volatilidad',
        beta: 'Beta',
        alpha: 'Alpha',
        winRate: 'Tasa de Ganancia',
      }
    : {
        title: 'Performance Analyzer',
        overview: 'Overview',
        returns: 'Returns',
        risk: 'Risk',
        assetPerformance: 'Asset Performance',
        timeRange: 'Time Range',
        totalReturn: 'Total Return',
        dailyReturn: 'Daily Return',
        weeklyReturn: 'Weekly Return',
        monthlyReturn: 'Monthly Return',
        yearlyReturn: 'Yearly Return',
        sharpeRatio: 'Sharpe Ratio',
        sortinoRatio: 'Sortino Ratio',
        maxDrawdown: 'Max Drawdown',
        volatility: 'Volatility',
        beta: 'Beta',
        alpha: 'Alpha',
        winRate: 'Win Rate',
      };

  const timeRanges = ['7d', '30d', '90d', '1y'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              {text.title}
            </h1>
            <p className="text-purple-300">{text.assetPerformance}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/50 rounded-lg p-1 flex">
              {timeRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded transition-all ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsSpanish(!isSpanish)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-all"
            >
              {isSpanish ? 'EN' : 'ES'}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-green-500/20">
            <DollarSign className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.totalReturn}</p>
            <p
              className={`text-2xl font-bold ${performanceData.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {performanceData.totalReturn >= 0 ? '+' : ''}
              {performanceData.totalReturn}%
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-blue-500/20">
            <Activity className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.volatility}</p>
            <p className="text-2xl font-bold text-white">{performanceData.volatility}%</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-purple-500/20">
            <BarChart2 className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.sharpeRatio}</p>
            <p className="text-2xl font-bold text-white">{performanceData.sharpeRatio}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-yellow-500/20">
            <TrendingDown className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.maxDrawdown}</p>
            <p
              className={`text-2xl font-bold ${performanceData.maxDrawdown >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {performanceData.maxDrawdown}%
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-cyan-500/20">
            <ArrowUpRight className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.alpha}</p>
            <p
              className={`text-2xl font-bold ${performanceData.alpha >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {performanceData.alpha >= 0 ? '+' : ''}
              {performanceData.alpha}%
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-pink-500/20">
            <PieChart className="w-6 h-6 text-pink-400 mb-2" />
            <p className="text-slate-400 text-sm">{text.winRate}</p>
            <p className="text-2xl font-bold text-white">{performanceData.winRate}%</p>
          </div>
        </div>

        {/* Asset Performance */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-purple-400" />
            {text.assetPerformance}
          </h3>
          <div className="space-y-3">
            {assetPerformance.map(asset => (
              <div key={asset.name} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{asset.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${asset.return >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {asset.return >= 0 ? '+' : ''}
                      {asset.return}%
                    </span>
                    {asset.return >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${asset.return >= 0 ? 'bg-gradient-to-r from-green-500 to-cyan-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}
                    style={{ width: `${asset.contribution}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-1">
                  {isSpanish ? 'Contribución' : 'Contribution'}: {asset.contribution}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Returns */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            {text.monthlyReturn}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {monthlyReturns.map(month => (
              <div
                key={month.month}
                className={`rounded-lg p-4 text-center ${month.return >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}
              >
                <p className="text-white font-semibold mb-2">{month.month}</p>
                <p
                  className={`text-2xl font-bold ${month.return >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {month.return >= 0 ? '+' : ''}
                  {month.return}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
