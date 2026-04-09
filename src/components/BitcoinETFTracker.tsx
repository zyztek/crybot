import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  RefreshCw,
  TrendingDown,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useBTCEtf } from '../hooks/useGraphQL';

interface ETFData {
  symbol: string;
  name: string;
  flow: number;
  price: number;
  holdings: number;
  avgInflow: number;
  lastUpdate: string;
}

const ETF_DATA: ETFData[] = [
  {
    symbol: 'IBIT',
    name: 'iShares Bitcoin Trust',
    flow: 521000000,
    price: 42.35,
    holdings: 582000000,
    avgInflow: 89000000,
    lastUpdate: '2 min ago',
  },
  {
    symbol: 'FBTC',
    name: 'Fidelity Bitcoin ETF',
    flow: 315000000,
    price: 42.18,
    holdings: 285000000,
    avgInflow: 45000000,
    lastUpdate: '5 min ago',
  },
  {
    symbol: 'GBTC',
    name: 'Grayscale Bitcoin Trust',
    flow: -125000000,
    price: 42.05,
    holdings: 625000000,
    avgInflow: -18000000,
    lastUpdate: '8 min ago',
  },
  {
    symbol: 'ARKB',
    name: 'ARK 21Shares Bitcoin ETF',
    flow: 89000000,
    price: 42.22,
    holdings: 78000000,
    avgInflow: 15000000,
    lastUpdate: '12 min ago',
  },
  {
    symbol: 'BTCO',
    name: 'Invesco Bitcoin ETF',
    flow: 45000000,
    price: 42.1,
    holdings: 35000000,
    avgInflow: 8500000,
    lastUpdate: '15 min ago',
  },
];

const BitcoinETFTracker: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1d' | '7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchFlows, fetchSummary } = useBTCEtf();

  // Use mock data as fallback
  const [etfData, setEtfData] = useState(ETF_DATA);
  const [summary, setSummary] = useState({
    totalInflow: 845000000,
    totalOutflow: 125000000,
    netFlow: 720000000,
    btcPrice: 67432.5,
    btcPriceImpact: 2.4,
  });

  // Fetch data on mount and period change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [flowsResult, summaryResult] = await Promise.all([
          fetchFlows.execute({ period: selectedPeriod }),
          fetchSummary.execute(),
        ]);

        if ((flowsResult as any)?.btcEtfFlows) {
          setEtfData((flowsResult as any).btcEtfFlows as typeof ETF_DATA);
        }
        if ((summaryResult as any)?.btcEtfSummary) {
          setSummary((summaryResult as any).btcEtfSummary as typeof summary);
        }
      } catch (err) {
        // Use mock data on error
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedPeriod, fetchFlows, fetchSummary]);

  const totalInflow = etfData.filter(e => e.flow > 0).reduce((acc, e) => acc + e.flow, 0);
  const totalOutflow = Math.abs(
    etfData.filter(e => e.flow < 0).reduce((acc, e) => acc + e.flow, 0)
  );
  const netFlow = totalInflow - totalOutflow;
  const totalInflow7d = 2850000000;
  const totalOutflow7d = 890000000;

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchFlows.execute({ period: selectedPeriod }), fetchSummary.execute()]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Total Inflow ({selectedPeriod})</span>
          </div>
          <p className="text-2xl font-bold text-green-400">
            ${(summary.totalInflow / 1000000000).toFixed(2)}B
          </p>
          <p className="text-green-400 text-xs">
            +{((summary.netFlow / totalInflow7d) * 100).toFixed(1)}% vs avg
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-slate-400 text-sm">Total Outflow ({selectedPeriod})</span>
          </div>
          <p className="text-2xl font-bold text-red-400">
            ${(summary.totalOutflow / 1000000000).toFixed(2)}B
          </p>
          <p className="text-slate-400 text-xs">
            -{((summary.totalOutflow / totalInflow7d) * 100).toFixed(1)}% vs inflow
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            {summary.netFlow > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            <span className="text-slate-400 text-sm">Net Flow</span>
          </div>
          <p
            className={`text-2xl font-bold ${summary.netFlow > 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            {summary.netFlow > 0 ? '+' : ''}${Math.abs(summary.netFlow / 1000000000).toFixed(2)}B
          </p>
          <p className="text-slate-400 text-xs">
            {summary.netFlow > 0 ? 'Bullish' : 'Bearish'} sentiment
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">BTC Price Impact</span>
          </div>
          <p className="text-2xl font-bold text-white">${summary.btcPrice.toFixed(2)}</p>
          <p
            className={`text-xs ${summary.btcPriceImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            {summary.btcPriceImpact >= 0 ? '+' : ''}
            {summary.btcPriceImpact.toFixed(1)}% today
          </p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['1d', '7d', '30d', '90d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === p
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {p === '1d' ? '24H' : p === '7d' ? '7D' : p === '30d' ? '30D' : '90D'}
            </button>
          ))}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {/* ETF List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            ETF Flows
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-xs text-slate-400">
                <th className="px-4 py-3">ETF</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Flow ({selectedPeriod})</th>
                <th className="px-4 py-3 text-right">Total Holdings</th>
                <th className="px-4 py-3 text-right">Avg Daily</th>
                <th className="px-4 py-3 text-right">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {etfData.map(etf => (
                <tr key={etf.symbol} className="text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{etf.symbol[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{etf.symbol}</p>
                        <p className="text-slate-400 text-xs">{etf.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-white">${etf.price.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {etf.flow > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                      )}
                      <span className={etf.flow > 0 ? 'text-green-400' : 'text-red-400'}>
                        {etf.flow > 0 ? '+' : ''}${(etf.flow / 1000000).toFixed(0)}M
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    ${(etf.holdings / 1000000000).toFixed(2)}B
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">
                    ${(etf.avgInflow / 1000000).toFixed(0)}M
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500 text-xs">{etf.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flow Charts with Recharts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-4">Inflow Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={[
                { day: 'Mon', inflow: 650000000 },
                { day: 'Tue', inflow: 720000000 },
                { day: 'Wed', inflow: 580000000 },
                { day: 'Thu', inflow: 800000000 },
                { day: 'Fri', inflow: 950000000 },
                { day: 'Sat', inflow: 880000000 },
                { day: 'Sun', inflow: 750000000 },
              ]}
            >
              <defs>
                <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `$${v / 1000000000}B`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(value: any) =>
                  typeof value === 'number'
                    ? [`$${(value / 1000000000).toFixed(2)}B`, 'Inflow']
                    : ['', 'Inflow']
                }
              />
              <Area
                type="monotone"
                dataKey="inflow"
                stroke="#22c55e"
                fill="url(#inflowGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-medium mb-4">Net Flow vs BTC Price</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { day: 'Mon', netFlow: 450, btcPrice: 66500 },
                { day: 'Tue', netFlow: 520, btcPrice: 66800 },
                { day: 'Wed', netFlow: 480, btcPrice: 67100 },
                { day: 'Thu', netFlow: 650, btcPrice: 67300 },
                { day: 'Fri', netFlow: 720, btcPrice: 67500 },
                { day: 'Sat', netFlow: 680, btcPrice: 67400 },
                { day: 'Sun', netFlow: 600, btcPrice: 67200 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis yAxisId="left" stroke="#a855f7" fontSize={12} tickFormatter={v => `$${v}M`} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#3b82f6"
                fontSize={12}
                tickFormatter={v => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(value: any, name: any) =>
                  typeof value === 'number'
                    ? [
                        name === 'netFlow' ? `$${value}M` : `$${value.toLocaleString()}`,
                        name === 'netFlow' ? 'Net Flow' : 'BTC Price',
                      ]
                    : ['', name === 'netFlow' ? 'Net Flow' : 'BTC Price']
                }
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="netFlow"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: '#a855f7' }}
                name="Net Flow"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="btcPrice"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
                name="BTC Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BitcoinETFTracker;
