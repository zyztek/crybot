import { useState } from 'react'
import { Zap, DollarSign, AlertTriangle, Info, ArrowRight, CheckCircle } from 'lucide-react'

interface FlashLoanOpportunity {
  protocol: string
  maxLoan: number
  fee: number
  feePercent: number
}

export default function FlashLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [borrowToken, setBorrowToken] = useState('ETH')
  const [repayToken, setRepayToken] = useState('USDC')
  const [arbitrageProfit, setArbitrageProfit] = useState('')
  const [simulateStep, setSimulateStep] = useState(0)

  const opportunities: FlashLoanOpportunity[] = [
    { protocol: 'Aave', maxLoan: 1000000, fee: 9, feePercent: 0.09 },
    { protocol: 'dYdX', maxLoan: 5000000, fee: 0, feePercent: 0 },
    { protocol: 'Balancer', maxLoan: 2500000, fee: 5, feePercent: 0.05 },
    { protocol: 'Uniswap', maxLoan: 750000, fee: 3, feePercent: 0.03 },
  ]

  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'LINK', 'UNI', 'LINK']
  const ethPrice = 1850
  const selectedProtocol = opportunities[0]

  const loanAmountNum = parseFloat(loanAmount) || 0
  const totalFee = loanAmountNum * (selectedProtocol.feePercent / 100)
  const totalRepay = loanAmountNum + totalFee
  const profit = parseFloat(arbitrageProfit) || 0
  const netProfit = profit - totalFee
  const profitPercent = loanAmountNum > 0 ? (netProfit / loanAmountNum) * 100 : 0

  const steps = [
    { title: 'Borrow Flash Loan', desc: `Borrow ${loanAmountNum.toLocaleString()} ${borrowToken}`, icon: Zap },
    { title: 'Execute Strategy', desc: `Execute arbitrage/trading strategy`, icon: DollarSign },
    { title: 'Generate Profit', desc: `Generated $${profit.toLocaleString()} profit`, icon: ArrowRight },
    { title: 'Repay + Fee', desc: `Repay $${totalRepay.toLocaleString()} including $${totalFee.toFixed(2)} fee`, icon: CheckCircle },
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              Flash Loan Calculator
            </h1>
            <p className="text-gray-400">Calculate flash loan fees and potential arbitrage profits</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl px-4 py-2 text-yellow-400 font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Max Loan: $5M
            </div>
            <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl px-4 py-2 text-orange-400 font-semibold flex items-center gap-2">
              <Info className="w-5 h-5" />
              4 Protocols
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Panel */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Flash Loan Calculator</h2>

          {/* Protocol Selection */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Select Protocol</label>
            <div className="grid grid-cols-2 gap-2">
              {opportunities.map((opp, idx) => (
                <button
                  key={opp.protocol}
                  className={`p-4 rounded-xl border transition-all ${idx === 0 ? 'bg-yellow-600/20 border-yellow-500/50' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{opp.protocol}</span>
                    <span className={`text-sm ${opp.feePercent === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {opp.feePercent === 0 ? 'FREE' : `${opp.feePercent}%`}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Max: ${opp.maxLoan.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Loan Amount</label>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="bg-transparent text-2xl text-white font-bold outline-none flex-1"
                  placeholder="0.00"
                />
                <select
                  value={borrowToken}
                  onChange={(e) => setBorrowToken(e.target.value)}
                  className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg outline-none ml-4"
                >
                  {tokens.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="text-gray-400 text-sm mt-2">~${(loanAmountNum * ethPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</div>
            </div>
          </div>

          {/* Arbitrage Profit */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Expected Arbitrage Profit (USD)</label>
            <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-green-500/30">
              <input
                type="number"
                value={arbitrageProfit}
                onChange={(e) => setArbitrageProfit(e.target.value)}
                className="w-full bg-transparent text-2xl text-green-400 font-bold outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Fee Calculation */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Protocol Fee</span>
              <span className="text-yellow-400 font-semibold">{selectedProtocol.feePercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fee Amount</span>
              <span className="text-white font-semibold">${totalFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total to Repay</span>
              <span className="text-white font-bold text-lg">${totalRepay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Profit Summary */}
          <div className={`rounded-xl p-5 border ${(netProfit > 0 ? 'from-green-600/20 to-teal-600/20 border-green-500/30' : 'from-red-600/20 to-orange-600/20 border-red-500/30')} bg-gradient-to-r`}>
            <div className="text-gray-400 mb-1">Net Profit</div>
            <div className="text-3xl font-bold text-white mb-2">
              ${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-lg font-semibold ${netProfit > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(3)}% ROI
            </div>
          </div>

          {/* Warning */}
          {netProfit <= 0 && profit > 0 && (
            <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-red-400 font-semibold mb-1">Warning: Unprofitable</div>
                <div className="text-gray-300 text-sm">The flash loan fee exceeds your projected profit. This arbitrage opportunity is not profitable.</div>
              </div>
            </div>
          )}

          {netProfit > 0 && (
            <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30">
              <Zap className="w-5 h-5" />
              Execute Flash Loan
            </button>
          )}
        </div>

        {/* Simulation Panel */}
        <div className="space-y-6">
          {/* Simulation Flow */}
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Flash Loan Flow Simulation</h3>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    idx <= simulateStep ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gray-700'
                  }`}>
                    <step.icon className={`w-5 h-5 ${idx <= simulateStep ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-white font-semibold">{step.title}</div>
                    <div className="text-gray-400 text-sm">{step.desc}</div>
                  </div>
                  <VoteBarIcon className="w-6 h-6 text-gray-600 mt-1" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setSimulateStep(Math.min(simulateStep + 1, 3))}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
              disabled={simulateStep >= 3}
            >
              {simulateStep >= 3 ? 'Simulation Complete' : 'Next Step'}
            </button>
          </div>

          {/* Strategy Tips */}
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Flash Loan Strategies</h3>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="text-white font-semibold mb-1">Arbitrage</div>
                <div className="text-gray-400 text-sm">Exploit price differences across DEXs</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="text-white font-semibold mb-1">Collateral Swaps</div>
                <div className="text-gray-400 text-sm">Swap collateral in lending protocols</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="text-white font-semibold mb-1">Liquidation</div>
                <div className="text-gray-400 text-sm">Liquidate under-collateralized positions</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="text-white font-semibold mb-1">Self-Liquidation</div>
                <div className="text-gray-400 text-sm">Repay your own debt at liquidation penalty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VoteBarIcon(props: any) {
  return <span className="w-6 h-6 flex items-center">→</span>
}