import { useState } from 'react'
import { Play, RotateCcw, Settings, Activity, Zap, CheckCircle, XCircle, Code, DollarSign } from 'lucide-react'

export default function TransactionSimulator() {
  const [isSpanish, setIsSpanish] = useState(true)
  const [txHash, setTxHash] = useState('0x7f3a...2b8c')
  const [simulating, setSimulating] = useState(false)
  const [result, setResult] = useState<'success' | 'failed' | null>(null)

  const text = isSpanish ? {
    title: 'Simulador de Transacciones',
    simulate: 'Simular',
    reset: 'Reiniciar',
    txHash: 'Hash de Transacción',
    gasLimit: 'Gas Limit',
    gasPrice: 'Gas Price',
    value: 'Valor',
    result: 'Resultado',
    success: 'Exitoso',
    failed: 'Fallido',
    estimatedCost: 'Costo Estimado',
    executionTime: 'Tiempo de Ejecución',
  } : {
    title: 'Transaction Simulator',
    simulate: 'Simulate',
    reset: 'Reset',
    txHash: 'Transaction Hash',
    gasLimit: 'Gas Limit',
    gasPrice: 'Gas Price',
    value: 'Value',
    result: 'Result',
    success: 'Successful',
    failed: 'Failed',
    estimatedCost: 'Estimated Cost',
    executionTime: 'Execution Time',
  }

  const simulateTx = () => {
    setSimulating(true)
    setTimeout(() => {
      setSimulating(false)
      setResult('success')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <button onClick={() => setIsSpanish(!isSpanish)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 space-y-4">
          <div>
            <label className="text-slate-400 text-sm mb-1 block">{text.txHash}</label>
            <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm mb-1 block">{text.gasLimit}</label>
              <input defaultValue="21000" className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">{text.gasPrice}</label>
              <input defaultValue="42 Gwei" className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-1 block">{text.value}</label>
            <input defaultValue="1.5 ETH" className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>

          <div className="flex gap-3">
            <button onClick={simulateTx} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              {text.simulate}
            </button>
            <button onClick={() => { setResult(null); setSimulating(false) }} className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {simulating && (
            <div className="bg-slate-700/50 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-white">Simulating...</span>
              </div>
            </div>
          )}

          {result === 'success' && (
            <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">{text.success}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-400">{text.estimatedCost}:</span> $0.89</div>
                <div><span className="text-slate-400">{text.executionTime}:</span> 1.2s</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}