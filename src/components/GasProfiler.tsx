import { useState } from 'react'
import { Zap, Activity, TrendingUp, Timer, DollarSign, BarChart3 } from 'lucide-react'

export default function GasProfiler() {
  const [isSpanish, setIsSpanish] = useState(true)

  const gasData = {
    current: 42,
    low: 25,
    average: 45,
    high: 85,
    timestamp: '2025-01-15 14:23:45',
  }

  const history = [
    { time: '14:00', gas: 38 },
    { time: '14:05', gas: 42 },
    { time: '14:10', gas: 45 },
    { time: '14:15', gas: 52 },
    { time: '14:20', gas: 42 },
    { time: '14:25', gas: 42 },
  ]

  const text = isSpanish ? {
    title: 'Analizador de Gas',
    current: 'Gas Actual',
    low: 'Bajo',
    average: 'Promedio',
    high: 'Alto',
    history: 'Historial Últimos 30 min',
    recommendations: 'Recomendaciones',
  } : {
    title: 'Gas Profiler',
    current: 'Current Gas',
    low: 'Low',
    average: 'Average',
    high: 'High',
    history: 'Last 30 min History',
    recommendations: 'Recommendations',
  }

  const getGasColor = (gas: number) => {
    if (gas < 30) return 'green'
    if (gas < 50) return 'yellow'
    if (gas < 80) return 'orange'
    return 'red'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <button onClick={() => setIsSpanish(!isSpanish)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        {/* Current Gas */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 text-center">
            <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">{text.current}</p>
            <p className={`text-3xl font-bold text-${getGasColor(gasData.current)}-400`}>{gasData.current} Gwei</p>
          </div>
          <div className="bg-green-500/20 backdrop-blur rounded-xl p-6 border border-green-500/30 text-center">
            <Timer className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">{text.low}</p>
            <p className="text-3xl font-bold text-green-400">{gasData.low} Gwei</p>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur rounded-xl p-6 border border-yellow-500/30 text-center">
            <BarChart3 className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">{text.average}</p>
            <p className="text-3xl font-bold text-yellow-400">{gasData.average} Gwei</p>
          </div>
          <div className="bg-orange-500/20 backdrop-blur rounded-xl p-6 border border-orange-500/30 text-center">
            <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">{text.high}</p>
            <p className="text-3xl font-bold text-orange-400">{gasData.high} Gwei</p>
          </div>
        </div>

        {/* History */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">{text.history}</h3>
          <div className="flex items-end gap-4 h-40">
            {history.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full bg-gradient-to-t from-${getGasColor(h.gas)}-500 to-${getGasColor(h.gas)}-400 rounded-t transition-all`}
                  style={{ height: `${(h.gas / 100) * 100}%` }}
                />
                <span className="text-slate-400 text-xs mt-2">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            {text.recommendations}
          </h3>
          <div className="space-y-3">
            <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <p className="text-green-400">✓ Gas is low - good time to execute transactions</p>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
              <p className="text-yellow-400">ℹ Consider using Layer 2 for cost savings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}