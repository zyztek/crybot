import { useState, useMemo } from 'react';
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart as PieChartIcon,
  Target,
  Award,
  Download,
  Calendar,
  BarChart3,
  Layers,
  Zap,
  Calculator,
  Filter,
  X,
} from 'lucide-react';

interface EarningsData {
  date: string;
  faucets: number;
  staking: number;
  games: number;
  referrals: number;
  total: number;
}

interface CoinDistribution {
  coin: string;
  amount: number;
  value: number;
  color: string;
}

// CustomTooltip component moved outside to avoid react-hooks/static-components error

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
        <div className="text-white font-bold mb-2">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [showComparison, setShowComparison] = useState(false);
  const [showNetworkBreakdown, setShowNetworkBreakdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('2024-01-01');
  const [customEndDate, setCustomEndDate] = useState('2024-01-14');
  const [roiInvestment, setRoiInvestment] = useState(1000);
  const [roiDays, setRoiDays] = useState(30);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [earningsData] = useState<EarningsData[]>([
    { date: 'Jan 1', faucets: 1500, staking: 320, games: 480, referrals: 950, total: 3250 },
    { date: 'Jan 2', faucets: 1850, staking: 320, games: 620, referrals: 1100, total: 3890 },
    { date: 'Jan 3', faucets: 1200, staking: 320, games: 280, referrals: 890, total: 2690 },
    { date: 'Jan 4', faucets: 2100, staking: 330, games: 950, referrals: 1350, total: 4730 },
    { date: 'Jan 5', faucets: 1680, staking: 330, games: 420, referrals: 1000, total: 3430 },
    { date: 'Jan 6', faucets: 1920, staking: 340, games: 680, referrals: 1200, total: 4140 },
    { date: 'Jan 7', faucets: 2450, staking: 340, games: 1120, referrals: 1500, total: 5410 },
    { date: 'Jan 8', faucets: 1780, staking: 350, games: 520, referrals: 1050, total: 3700 },
    { date: 'Jan 9', faucets: 2200, staking: 350, games: 850, referrals: 1400, total: 4800 },
    { date: 'Jan 10', faucets: 1950, staking: 360, games: 620, referrals: 1150, total: 4080 },
    { date: 'Jan 11', faucets: 2300, staking: 360, games: 980, referrals: 1320, total: 4960 },
    { date: 'Jan 12', faucets: 2500, staking: 370, games: 1150, referrals: 1600, total: 5620 },
    { date: 'Jan 13', faucets: 2050, staking: 370, games: 720, referrals: 1100, total: 4240 },
    { date: 'Jan 14', faucets: 2750, staking: 380, games: 1350, referrals: 1850, total: 6330 },
  ]);

  const [coinDistributions] = useState<CoinDistribution[]>([
    { coin: 'BTC', amount: 0.0234, value: 1579.8, color: '#f7931a' },
    { coin: 'ETH', amount: 0.5678, value: 2075.92, color: '#627eea' },
    { coin: 'SOL', amount: 45.67, value: 7560.99, color: '#9945ff' },
    { coin: 'DOGE', amount: 8500, value: 1615.0, color: '#ba9f33' },
    { coin: 'LTC', amount: 5.23, value: 628.3, color: '#bfbbbb' },
    { coin: 'BNB', amount: 12.45, value: 7781.25, color: '#f0b90b' },
  ]);

  // Network breakdown data
  const networkData = [
    { network: 'Bitcoin', claims: 145, earnings: 2450, avgClaim: 16.9, trend: '+12%' },
    { network: 'Ethereum', claims: 89, earnings: 1890, avgClaim: 21.2, trend: '+8%' },
    { network: 'Solana', claims: 67, earnings: 1560, avgClaim: 23.3, trend: '+15%' },
    { network: 'BNB Chain', claims: 52, earnings: 980, avgClaim: 18.8, trend: '+5%' },
    { network: 'Polygon', claims: 38, earnings: 720, avgClaim: 18.9, trend: '+22%' },
    { network: 'Arbitrum', claims: 25, earnings: 540, avgClaim: 21.6, trend: '+31%' },
  ];

  // Comparison data
  const comparisonData = [
    { period: 'This Week', earnings: 12450, claims: 285, activeDays: 7 },
    { period: 'Last Week', earnings: 10890, claims: 242, activeDays: 6 },
    { period: '2 Weeks Ago', earnings: 9520, claims: 198, activeDays: 5 },
    { period: '3 Weeks Ago', earnings: 8840, claims: 175, activeDays: 5 },
  ];

  const [dailyActivity] = useState([
    { day: 'Mon', claims: 28, games: 12, logins: 3 },
    { day: 'Tue', claims: 35, games: 18, logins: 3 },
    { day: 'Wed', claims: 42, games: 25, logins: 4 },
    { day: 'Thu', claims: 31, games: 15, logins: 3 },
    { day: 'Fri', claims: 48, games: 32, logins: 4 },
    { day: 'Sat', claims: 55, games: 41, logins: 5 },
    { day: 'Sun', claims: 62, games: 38, logins: 5 },
  ]);

  // Filter data based on time range
  const filteredEarningsData = useMemo(() => {
    if (timeRange === 'custom') {
      // Custom date range filtering (simplified - assumes sequential data)
      const startIndex = Math.max(0, earningsData.length - 14);
      return earningsData.slice(startIndex);
    }
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return earningsData.slice(-days);
  }, [timeRange, earningsData]);

  // Filter data based on active category
  const categoryFilteredData = useMemo(() => {
    if (!activeCategory) return filteredEarningsData;
    return filteredEarningsData.map(d => ({
      ...d,
      [activeCategory]: d[activeCategory as keyof typeof d] as number,
    }));
  }, [activeCategory, filteredEarningsData]);

  // Handle custom date range apply
  const handleApplyCustomRange = () => {
    setTimeRange('custom');
    setShowDatePicker(false);
  };

  // Export to CSV functionality
  const exportToCSV = () => {
    const headers = ['Date', 'Faucets', 'Staking', 'Games', 'Referrals', 'Total'];
    const rows = filteredEarningsData.map(d => [
      d.date,
      d.faucets,
      d.staking,
      d.games,
      d.referrals,
      d.total,
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earnings_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalValue = coinDistributions.reduce((sum, c) => sum + c.value, 0);
  const totalEarnings = filteredEarningsData.reduce((sum, d) => sum + d.total, 0);
  const growthRate =
    filteredEarningsData.length > 1
      ? (
          ((filteredEarningsData[filteredEarningsData.length - 1].total -
            filteredEarningsData[0].total) /
            filteredEarningsData[0].total) *
          100
        ).toFixed(1)
      : '0.0';

  // ROI Calculator calculations
  const roiDailyRate = 2.5; // 2.5% daily average
  const roiTotalReturn = roiInvestment * Math.pow(1 + roiDailyRate / 100, roiDays);
  const roiProfit = roiTotalReturn - roiInvestment;
  const roiPercentage = ((roiProfit / roiInvestment) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-purple-400" />
          Advanced Analytics
        </h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              showDatePicker
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Custom
          </button>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              showComparison
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            Compare
          </button>
          <button
            onClick={() => setShowNetworkBreakdown(!showNetworkBreakdown)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              showNetworkBreakdown
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Zap className="w-4 h-4" />
            Networks
          </button>
          <button
            onClick={() => setShowROICalculator(!showROICalculator)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              showROICalculator
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Calculator className="w-4 h-4" />
            ROI
          </button>
          <button
            onClick={exportToCSV}
            className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          {['7d', '30d', '90d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {showDatePicker && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Custom Date Range
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-sm">Start:</label>
              <input
                type="date"
                value={customStartDate}
                onChange={e => setCustomStartDate(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-sm">End:</label>
              <input
                type="date"
                value={customEndDate}
                onChange={e => setCustomEndDate(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleApplyCustomRange}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            >
              Apply
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-3">
            Showing data from {customStartDate} to {customEndDate} ({filteredEarningsData.length}{' '}
            days)
          </p>
        </div>
      )}

      {/* ROI Calculator */}
      {showROICalculator && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-400" />
            ROI Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-slate-400 text-sm block mb-2">Investment Amount ($)</label>
              <input
                type="number"
                value={roiInvestment}
                onChange={e => setRoiInvestment(Number(e.target.value))}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm block mb-2">Investment Period (Days)</label>
              <input
                type="number"
                value={roiDays}
                onChange={e => setRoiDays(Number(e.target.value))}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-700/50 rounded-xl p-4">
              <div className="text-slate-400 text-sm mb-1">Projected Return</div>
              <div className="text-3xl font-bold text-green-400">
                ${roiTotalReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-green-300">
                +${roiProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} (
                {roiPercentage}%)
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-sm text-slate-400">
            Based on average daily return rate of {roiDailyRate}%. This is a projection based on
            historical performance and does not guarantee future results.
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Earnings
          </div>
          <div className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
          <div
            className={`text-sm flex items-center gap-1 ${parseFloat(growthRate) >= 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            {parseFloat(growthRate) >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {growthRate}% this period
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Activity className="w-4 h-4" />
            Avg. Daily Claims
          </div>
          <div className="text-3xl font-bold text-white">
            {Math.round(
              filteredEarningsData.reduce((sum, d) => sum + d.faucets, 0) /
                filteredEarningsData.length
            )}
          </div>
          <div className="text-sm text-slate-400">From 8 faucet sites</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Target className="w-4 h-4" />
            Game Profits
          </div>
          <div className="text-3xl font-bold text-green-400">
            +${filteredEarningsData.reduce((sum, d) => sum + d.games, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {totalEarnings > 0
              ? Math.round(
                  (filteredEarningsData.reduce((sum, d) => sum + d.games, 0) / totalEarnings) * 100
                )
              : 0}
            % of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Award className="w-4 h-4" />
            Referral Earnings
          </div>
          <div className="text-3xl font-bold text-purple-400">
            ${filteredEarningsData.reduce((sum, d) => sum + d.referrals, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">47 active referrals</div>
        </div>
      </div>

      {/* Comparison Section */}
      {showComparison && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Period Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="earnings" fill="#8b5cf6" name="Earnings ($)" />
              <Bar dataKey="claims" fill="#10b981" name="Claims" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Network Breakdown Section */}
      {showNetworkBreakdown && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Network Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-3 px-4">Network</th>
                  <th className="text-right py-3 px-4">Claims</th>
                  <th className="text-right py-3 px-4">Earnings</th>
                  <th className="text-right py-3 px-4">Avg/Claim</th>
                  <th className="text-right py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {networkData.map(net => (
                  <tr
                    key={net.network}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30"
                  >
                    <td className="py-3 px-4 text-white font-medium">{net.network}</td>
                    <td className="py-3 px-4 text-right text-slate-300">{net.claims}</td>
                    <td className="py-3 px-4 text-right text-green-400">
                      ${net.earnings.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-purple-400">${net.avgClaim}</td>
                    <td
                      className={`py-3 px-4 text-right ${net.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {net.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Earnings Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredEarningsData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                fill="url(#colorTotal)"
                name="Total"
              />
              <Line
                type="monotone"
                dataKey="faucets"
                stroke="#10b981"
                strokeWidth={2}
                name="Faucets"
              />
              <Line
                type="monotone"
                dataKey="staking"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Staking"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Coin Distribution */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-yellow-400" />
            Portfolio Distribution
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={coinDistributions}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {coinDistributions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {coinDistributions.map(coin => (
                <div key={coin.coin} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: coin.color }}
                  ></div>
                  <span className="text-white font-bold">{coin.coin}</span>
                  <span className="text-slate-400 text-sm">${coin.value.toLocaleString()}</span>
                  <span className="text-purple-400 text-sm">
                    ({((coin.value / totalValue) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="claims" fill="#10b981" name="Claims" />
            <Bar dataKey="games" fill="#8b5cf6" name="Games" />
            <Bar dataKey="logins" fill="#6366f1" name="Logins" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveCategory(activeCategory === 'faucets' ? null : 'faucets')}
          className={`bg-gradient-to-br from-green-900/30 to-slate-900 border rounded-xl p-4 text-left transition-all hover:border-green-500/50 ${activeCategory === 'faucets' ? 'border-green-500 ring-2 ring-green-500/30' : 'border-green-700/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              Faucets
            </div>
            {activeCategory === 'faucets' && (
              <span className="text-green-400 text-xs">✓ Active</span>
            )}
          </div>
          <div className="text-2xl font-bold text-white">
            ${filteredEarningsData.reduce((sum, d) => sum + d.faucets, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {totalEarnings > 0
              ? Math.round(
                  (filteredEarningsData.reduce((sum, d) => sum + d.faucets, 0) / totalEarnings) *
                    100
                )
              : 0}
            % of total
          </div>
        </button>

        <button
          onClick={() => setActiveCategory(activeCategory === 'staking' ? null : 'staking')}
          className={`bg-gradient-to-br from-yellow-900/30 to-slate-900 border rounded-xl p-4 text-left transition-all hover:border-yellow-500/50 ${activeCategory === 'staking' ? 'border-yellow-500 ring-2 ring-yellow-500/30' : 'border-yellow-700/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              Staking
            </div>
            {activeCategory === 'staking' && (
              <span className="text-yellow-400 text-xs">✓ Active</span>
            )}
          </div>
          <div className="text-2xl font-bold text-white">
            ${filteredEarningsData.reduce((sum, d) => sum + d.staking, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {totalEarnings > 0
              ? Math.round(
                  (filteredEarningsData.reduce((sum, d) => sum + d.staking, 0) / totalEarnings) *
                    100
                )
              : 0}
            % of total
          </div>
        </button>

        <button
          onClick={() => setActiveCategory(activeCategory === 'games' ? null : 'games')}
          className={`bg-gradient-to-br from-purple-900/30 to-slate-900 border rounded-xl p-4 text-left transition-all hover:border-purple-500/50 ${activeCategory === 'games' ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-purple-700/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              Games
            </div>
            {activeCategory === 'games' && (
              <span className="text-purple-400 text-xs">✓ Active</span>
            )}
          </div>
          <div className="text-2xl font-bold text-white">
            ${filteredEarningsData.reduce((sum, d) => sum + d.games, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {totalEarnings > 0
              ? Math.round(
                  (filteredEarningsData.reduce((sum, d) => sum + d.games, 0) / totalEarnings) * 100
                )
              : 0}
            % of total
          </div>
        </button>

        <button
          onClick={() => setActiveCategory(activeCategory === 'referrals' ? null : 'referrals')}
          className={`bg-gradient-to-br from-blue-900/30 to-slate-900 border rounded-xl p-4 text-left transition-all hover:border-blue-500/50 ${activeCategory === 'referrals' ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-blue-700/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              Referrals
            </div>
            {activeCategory === 'referrals' && (
              <span className="text-blue-400 text-xs">✓ Active</span>
            )}
          </div>
          <div className="text-2xl font-bold text-white">
            ${filteredEarningsData.reduce((sum, d) => sum + d.referrals, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {totalEarnings > 0
              ? Math.round(
                  (filteredEarningsData.reduce((sum, d) => sum + d.referrals, 0) / totalEarnings) *
                    100
                )
              : 0}
            % of total
          </div>
        </button>
      </div>

      {activeCategory && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-purple-300">
            Showing filtered view for{' '}
            <span className="text-white font-bold capitalize">{activeCategory}</span>.
            <button
              onClick={() => setActiveCategory(null)}
              className="text-purple-400 underline hover:text-white"
            >
              Clear filter
            </button>
          </p>
        </div>
      )}

      {/* Earnings by Category Stacked Chart */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Earnings Breakdown by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredEarningsData} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="faucets" stackId="a" fill="#10b981" name="Faucets" />
            <Bar dataKey="staking" stackId="a" fill="#f59e0b" name="Staking" />
            <Bar dataKey="games" stackId="a" fill="#8b5cf6" name="Games" />
            <Bar dataKey="referrals" stackId="a" fill="#6366f1" name="Referrals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
