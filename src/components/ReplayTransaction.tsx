import { useState } from 'react'
import { Play, RotateCcw, History, ArrowRight } from 'lucide-react'

export default function ReplayTransaction() {
  const [isSpanish, setIsSpanish] = useState(true)

  const text = isSpanish ? {
    title: 'Replay de Transacción',
    txHash: 'Hash de Transacción',
    replay: 'Replay',
    history: 'Historial',
  } : {
    title: 'Transaction Replay',
    txHash: 'Transaction Hash',
    replay: 'Replay',
    history: 'History',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <History className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <button onClick={() => setIsSpanish(!isSpanish)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 space-y-4">
          <div>
            <label className="text-slate-400 text-sm mb-1 block">{text.txHash}</label>
            <input defaultValue="0x7f3a...2b8c" className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              {text.replay}
            </button>
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            <span className="text-white">Previous replay results available</span>
          </div>
        </div>
      </div>
    </div>
  )
}