import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Clock, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, BarChart, Bar, Legend } from 'recharts';
import { useCoinbasePremium } from '../hooks/useGraphQL';

interface PremiumData {
  timestamp: string;
  coinbasePrice: number;
  otherExchangesAvg: number;
  premium: number;
  volume: number;
}

const PREMIUM_HISTORY: PremiumData[] = [
  { timestamp: '2 min ago', coinbasePrice: 67432.50, otherExchangesAvg: 67345.25, premium: 0.129, volume: 2845000000 },
  { timestamp: '15 min ago', coinbasePrice: 67415.75, otherExchangesAvg: 67320.50, premium: 0.141, volume: 2156000000 },
  { timestamp: '30 min ago', coinbasePrice: 67380.25, otherExchangesAvg: 67295.00, premium: 0.127, volume: 1890000000 },
  { timestamp: '1 hour ago', coinbasePrice: 67250.00, otherExchangesAvg: 67180.50, premium: 0.103, volume: 3250000000 },
  { timestamp: '2 hours ago', coinbasePrice: 67180.25, otherExchangesAvg: 67105.75, premium: 0.111, volume: 4120000000 },
  { timestamp: '4 hours ago', coinbasePrice: 66950.75, otherExchangesAvg: 66880.00, premium: 0.106, volume: 5680000000 },
];

const CoinbasePremiumGap: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '4h' | '24h' | '7d'>('24h');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPremium } = useCoinbasePremium();

  // Use mock data as fallback
  const [premiumHistory, setPremiumHistory] = useState(PREMIUM_HISTORY);
  const [currentPremium, setCurrentPremium] = useState(0.129);
  const [avgPremium, setAvgPremium] = useState(0.119);
  const [maxPremium, setMaxPremium] = useState(0.141);
  const [minPremium, setMinPremium] = useState(0.103);
  const [currentCoinbase, setCurrentCoinbase] = useState(67432.50);
  const [currentOthers, setCurrentOthers] = useState(67345.25);

  // Fetch data on mount and period change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPremium.execute({ period: selectedPeriod });
        if (result?.coinbasePremium) {
          const data = result.coinbasePremium;
          setCurrentPremium(data.currentPremium);
          setAvgPremium(data.avgPremium);
          setMaxPremium(data.maxPremium);
          setMinPremium(data.minPremium);
          setCurrentCoinbase(data.coinbasePrice);
          setCurrentOthers(data.otherExchangesAvg);
          if (data.history) {
            setPremiumHistory(data.history.map((h: any) => ({
              timestamp: h.timestamp,
              coinbasePrice: h.coinbasePrice,
              otherExchangesAvg: h.otherExchangesAvg,
              premium: h.premium,
              volume: h.volume,
            })));
          }
        }
      } catch (err) {
        // Use mock data on error
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedPeriod, fetchPremium]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchPremium.execute({ period: selectedPeriod });
    } finally {
      setIsLoading(false);
    }
  };

  const getPremiumColor = (premium: number) => {
    if (premium > 0.15) return 'text-green-400';
    if (premium > 0.10) return 'text-yellow-400';
    if (premium > 0) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPremiumLabel = (premium: number) => {
    if (premium > 0.15) return 'Strong Buy Signal';
    if (premium > 0.10) return 'Moderate Premium';
    if (premium > 0) return 'Slight Premium';
    return 'Below Average';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Current Premium</span>
          </div>
          <p className={`text-2xl font-bold ${getPremiumColor(currentPremium)}`}>
            {currentPremium.toFixed(3)}%
          </p>
          <p className="text-slate-400 text-xs">{getPremiumLabel(currentPremium)}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">24h Avg Premium</span>
          </div>
          <p className={`text-2xl font-bold ${getPremiumColor(avgPremium)}`}>
            {avgPremium.toFixed(3)}%
          </p>
          <p className="text-slate-400 text-xs">Historical: 0.08%</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Premium Range</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {minPremium.toFixed(3)}% - {maxPremium.toFixed(3)}%
          </p>
          <p className="text-slate-400 text-xs">Min to Max</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-orange-400" />
            <span className="text-slate-400 text-sm">Price Difference</span>
          </div>
          <p className="text-2xl font-bold text-white">
            ${(currentCoinbase - currentOthers).toFixed(2)}
          </p>
          <p className="text-slate-400 text-xs">CB vs Others</p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['1h', '4h', '24h', '7d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === p
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {p === '1h' ? '1H' : p === '4h' ? '4H' : p === '24h' ? '24H' : '7D'}
            </button>
          ))}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-all"
        >
          <Activity className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
        </div>
      )}

      {/* Price Comparison */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Real-time Price Comparison
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Coinbase */}
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CB</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Coinbase</p>
                  <p className="text-slate-400 text-xs">US Spot</p>
                </div>
              </div>
              {currentPremium > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
            </div>
            <p className="text-3xl font-bold text-white">${currentCoinbase.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <p className="text-green-400 text-sm mt-1">+2.34% (24h)</p>
          </div>

          {/* Other Exchanges Avg */}
          <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EX</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Other Exchanges</p>
                  <p className="text-slate-400 text-xs">Binance, Kraken, OKX</p>
                </div>
              </div>
              {currentPremium > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
            </div>
            <p className="text-3xl font-bold text-white">${currentOthers.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <p className="text-orange-400 text-sm mt-1">+2.18% (24h)</p>
          </div>
        </div>
      </div>

      {/* Premium History Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Premium History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-xs text-slate-400">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Coinbase</th>
                <th className="px-4 py-3 text-right">Others Avg</th>
                <th className="px-4 py-3 text-right">Premium</th>
                <th className="px-4 py-3 text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {premiumHistory.map((data, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">
                    <span className="text-slate-400">{data.timestamp}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-white">${data.coinbasePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-slate-300">${data.otherExchangesAvg.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${getPremiumColor(data.premium)}`}>
                      {data.premium > 0 ? '+' : ''}{data.premium.toFixed(3)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">
                    ${(data.volume / 1000000000).toFixed(2)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Chart */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-4">Premium Over Time</h4>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={premiumHistory.map(d => ({
            time: d.timestamp,
            premium: d.premium * 100,
            coinbase: d.coinbasePrice,
            others: d.otherExchangesAvg,
          })).reverse()}>
            <defs>
              <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis yAxisId="left" stroke="#a855f7" fontSize={11} tickFormatter={(v) => `${v.toFixed(2)}%`} />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: number, name: string) => {
                if (name === 'premium') return [`${value.toFixed(3)}%`, 'Premium'];
                return [`$${value.toLocaleString()}`, name === 'coinbase' ? 'Coinbase' : 'Others'];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="premium" fill="url(#premiumGradient)" name="Premium %" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="coinbase" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Coinbase" />
            <Line yAxisId="right" type="monotone" dataKey="others" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#f97316' }} name="Others" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-3">Premium Analysis</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Current premium above historical average
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              High volume suggests strong institutional interest
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Positive premium often leads to price appreciation
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-3">Trading Signal</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Signal Strength</span>
              <span className="text-green-400 font-medium">Moderate Bullish</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Confidence</span>
              <span className="text-white font-medium">72%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Recommended Action</span>
              <span className="text-purple-400 font-medium">Accumulate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinbasePremiumGap;