import { useState } from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart as PieChartIcon, Target, Award } from 'lucide-react';

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

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
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
    { coin: 'BTC', amount: 0.0234, value: 1579.80, color: '#f7931a' },
    { coin: 'ETH', amount: 0.5678, value: 2075.92, color: '#627eea' },
    { coin: 'SOL', amount: 45.67, value: 7560.99, color: '#9945ff' },
    { coin: 'DOGE', amount: 8500, value: 1615.00, color: '#ba9f33' },
    { coin: 'LTC', amount: 5.23, value: 628.30, color: '#bfbbbb' },
    { coin: 'BNB', amount: 12.45, value: 7781.25, color: '#f0b90b' },
  ]);

  const [dailyActivity] = useState([
    { day: 'Mon', claims: 28, games: 12, logins: 3 },
    { day: 'Tue', claims: 35, games: 18, logins: 3 },
    { day: 'Wed', claims: 42, games: 25, logins: 4 },
    { day: 'Thu', claims: 31, games: 15, logins: 3 },
    { day: 'Fri', claims: 48, games: 32, logins: 4 },
    { day: 'Sat', claims: 55, games: 41, logins: 5 },
    { day: 'Sun', claims: 62, games: 38, logins: 5 },
  ]);

  const totalValue = coinDistributions.reduce((sum, c) => sum + c.value, 0);
  const totalEarnings = earningsData.reduce((sum, d) => sum + d.total, 0);
  const growthRate = ((earningsData[earningsData.length - 1].total - earningsData[0].total) / earningsData[0].total * 100).toFixed(1);

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

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Earnings
          </div>
          <div className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
          <div className={`text-sm flex items-center gap-1 ${parseFloat(growthRate) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
            {Math.round(earningsData.reduce((sum, d) => sum + d.faucets, 0) / earningsData.length)}
          </div>
          <div className="text-sm text-slate-400">From 8 faucet sites</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Target className="w-4 h-4" />
            Game Profits
          </div>
          <div className="text-3xl font-bold text-green-400">
            +${earningsData.reduce((sum, d) => sum + d.games, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {Math.round(earningsData.reduce((sum, d) => sum + d.games, 0) / totalEarnings * 100)}% of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Award className="w-4 h-4" />
            Referral Earnings
          </div>
          <div className="text-3xl font-bold text-purple-400">
            ${earningsData.reduce((sum, d) => sum + d.referrals, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">47 active referrals</div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Earnings Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
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
              <Area type="monotone" dataKey="total" stroke="#8b5cf6" fill="url(#colorTotal)" name="Total" />
              <Line type="monotone" dataKey="faucets" stroke="#10b981" strokeWidth={2} name="Faucets" />
              <Line type="monotone" dataKey="staking" stroke="#f59e0b" strokeWidth={2} name="Staking" />
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
              {coinDistributions.map((coin) => (
                <div key={coin.coin} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: coin.color }}></div>
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
        <div className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            Faucets
          </div>
          <div className="text-2xl font-bold text-white">
            ${earningsData.reduce((sum, d) => sum + d.faucets, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {Math.round(earningsData.reduce((sum, d) => sum + d.faucets, 0) / totalEarnings * 100)}% of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/30 to-slate-900 border border-yellow-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            Staking
          </div>
          <div className="text-2xl font-bold text-white">
            ${earningsData.reduce((sum, d) => sum + d.staking, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {Math.round(earningsData.reduce((sum, d) => sum + d.staking, 0) / totalEarnings * 100)}% of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            Games
          </div>
          <div className="text-2xl font-bold text-white">
            ${earningsData.reduce((sum, d) => sum + d.games, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {Math.round(earningsData.reduce((sum, d) => sum + d.games, 0) / totalEarnings * 100)}% of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            Referrals
          </div>
          <div className="text-2xl font-bold text-white">
            ${earningsData.reduce((sum, d) => sum + d.referrals, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">
            {Math.round(earningsData.reduce((sum, d) => sum + d.referrals, 0) / totalEarnings * 100)}% of total
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;