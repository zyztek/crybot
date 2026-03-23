import React, { useState } from 'react';
import { Calculator, Plus, Minus, RotateCcw, TrendingUp, ArrowUpRight } from 'lucide-react';

const CompoundingCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [apy, setApy] = useState(50);
  const [period, setPeriod] = useState(12);
  const [compounding, setCompounding] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [contributions, setContributions] = useState(0);
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'weekly'>('monthly');

  const calculateCompound = () => {
    const n = compounding === 'daily' ? 365 : compounding === 'weekly' ? 52 : 12;
    const r = apy / 100;
    const t = period / 12;
    
    let finalAmount = initialAmount * Math.pow((1 + r/n), n * t);
    
    // Add contributions
    if (contributions > 0) {
      const contrFreq = contributionFrequency === 'monthly' ? 12 : 52;
      const periods = contributionFrequency === 'monthly' ? period : period * 4;
      for (let i = 1; i <= periods; i++) {
        finalAmount += contributions * Math.pow((1 + r/n), n * (t - (i / contrFreq)));
      }
    }
    
    return finalAmount;
  };

  const calculateYearlyBreakdown = () => {
    const breakdown = [];
    const n = compounding === 'daily' ? 365 : compounding === 'weekly' ? 52 : 12;
    const r = apy / 100;
    
    let amount = initialAmount;
    breakdown.push({ year: 0, amount, earnings: 0 });
    
    for (let year = 1; year <= period; year++) {
      const t = year;
      amount = initialAmount * Math.pow((1 + r/n), n * t);
      
      // Add contributions for this year
      if (contributions > 0) {
        const contrFreq = contributionFrequency === 'monthly' ? 12 : 52;
        for (let m = 1; m <= contrFreq; m++) {
          amount += contributions * Math.pow((1 + r/n), n * (t - (m / contrFreq)));
        }
      }
      
      breakdown.push({
        year,
        amount,
        earnings: amount - initialAmount - (contributions * (contributionFrequency === 'monthly' ? year * 12 : year * 52))
      });
    }
    
    return breakdown;
  };

  const finalAmount = calculateCompound();
  const earnings = finalAmount - initialAmount;
  const breakdown = calculateYearlyBreakdown();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-10 h-10 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Compounding Calculator</h1>
            <p className="text-slate-400 text-sm">Calculate your returns with compound interest</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6">Input Parameters</h2>

            <div className="space-y-6">
              {/* Initial Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-400">Initial Amount</label>
                  <span className="text-white font-bold">${initialAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                  <button 
                    onClick={() => setInitialAmount(initialAmount + 100)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setInitialAmount(Math.max(0, initialAmount - 100))}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setInitialAmount(1000)}
                    className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* APY */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-400">Annual APY</label>
                  <span className="text-green-400 font-bold">{apy}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={apy}
                  onChange={(e) => setApy(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Period */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-400">Investment Period</label>
                  <span className="text-white font-bold">{period} {period === 1 ? 'year' : 'years'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Compounding Frequency */}
              <div>
                <label className="text-slate-400 block mb-2">Compounding Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {['daily', 'weekly', 'monthly'].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setCompounding(freq as any)}
                      className={`py-2 rounded-lg capitalize transition-all ${
                        compounding === freq 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contributions */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-400">Additional Contributions</label>
                  <span className="text-white font-bold">${contributions.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={contributions}
                  onChange={(e) => setContributions(Number(e.target.value))}
                  className="w-full"
                />
                {contributions > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => setContributionFrequency('monthly')}
                      className={`py-2 rounded-lg transition-all ${
                        contributionFrequency === 'monthly' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setContributionFrequency('weekly')}
                      className={`py-2 rounded-lg transition-all ${
                        contributionFrequency === 'weekly' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      Weekly
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Projection Summary
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl">
                  <p className="text-slate-400 mb-1">Final Value</p>
                  <p className="text-4xl font-bold text-white">${finalAmount.toFixed(2)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-xl">
                    <p className="text-slate-400 mb-1">Initial Investment</p>
                    <p className="text-2xl font-bold text-white">${initialAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                    <p className="text-slate-400 mb-1">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-400">+${earnings.toFixed(2)}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">ROI</span>
                    <span className="text-green-400 font-bold text-xl">{((earnings / initialAmount) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                      style={{ width: `${Math.min((earnings / initialAmount) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Yearly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-sm border-b border-slate-700">
                      <th className="text-left py-2">Year</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="text-right py-2">Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className="py-3 text-slate-300">{row.year}</td>
                        <td className="py-3 text-right text-white font-medium">${row.amount.toFixed(2)}</td>
                        <td className="py-3 text-right text-green-400">+${row.earnings.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg flex items-start gap-3">
          <ArrowUpRight className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-1">The Power of Compounding</h4>
            <p className="text-slate-300 text-sm">
              Compound interest is the eighth wonder of the world. The more frequently your earnings compound, 
              the faster your wealth grows. Consider reinvesting your earnings for maximum returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundingCalculator;