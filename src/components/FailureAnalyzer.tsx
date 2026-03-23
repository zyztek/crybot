import { useState } from 'react'
import { AlertTriangle, XCircle, CheckCircle, Search, Activity } from 'lucide-react'

export default function FailureAnalyzer() {
  const [isSpanish, setIsSpanish] = useState(true)

  const failures = [
    { id: 1, type: 'Out of Gas', txHash: '0x7f3a...2b8c', timestamp: '2025-01-15 10:23:45', reason: 'Gas limit too low' },
    { id: 2, type: 'Revert', txHash: '0x9c4d...3e7b', timestamp: '2025-01-15 09:12:33', reason: 'Condition not met' },
    { id: 3, type: 'Nonce Mismatch', txHash: '0x2e5f...1a9c', timestamp: '2025-01-14 18:45:22', reason: 'Invalid nonce' },
  ]

  const text = isSpanish ? {
    title: 'Analizador de Fallos',
    search: 'Buscar transacción',
    failures: 'Fallos Detectados',
    type: 'Tipo',
    reason: 'Razón',
    analyze: 'Analizar',
  } : {
    title: 'Failure Analyzer',
    search: 'Search transaction',
    failures: 'Detected Failures',
    type: 'Type',
    reason: 'Reason',
    analyze: 'Analyze',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <button onClick={() => setIsSpanish(!isSpanish)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <div className="flex gap-3">
            <input placeholder={text.search} className="flex-1 bg-slate-700 rounded-lg px-4 py-2 text-white" />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Search className="w-4 h-4" />
              {text.analyze}
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            {text.failures}
          </h3>
          <div className="space-y-3">
            {failures.map(failure => (
              <div key={failure.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-white font-semibold">{failure.type}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{failure.timestamp}</span>
                </div>
                <p className="text-slate-400 mb-1">{failure.txHash}</p>
                <p className="text-red-400 text-sm">{failure.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}