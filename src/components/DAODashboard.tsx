import { useState } from 'react'
import { Building2, DollarSign, Users, TrendingUp, Lock, PieChart, Activity, Timer, Vote as VoteIcon } from 'lucide-react'

export default function DAODashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    treasury: 45600000,
    members: 12450,
    proposals: 156,
    activeVotes: 8750
  }

  const treasuries = [
    { token: 'ETH', amount: 12500, value: 23125000, percentage: 50.7 },
    { token: 'USDC', amount: 12500000, value: 12500000, percentage: 27.4 },
    { token: 'DAI', amount: 5000000, value: 5000000, percentage: 11.0 },
    { token: 'WBTC', amount: 250, value: 4500000, percentage: 9.9 },
  ]

  const recentActivities = [
    { type: 'proposal', title: 'New yield strategy deployed', time: '2 hours ago', status: 'completed' },
    { type: 'vote', title: 'You voted on #42', time: '5 hours ago', status: 'completed' },
    { type: 'treasury', title: 'Treasury rebalanced', time: '1 day ago', status: 'completed' },
    { type: 'grant', title: 'Grant proposal approved', time: '2 days ago', status: 'completed' },
    { type: 'vote', title: 'You voted on #38', time: '3 days ago', status: 'completed' },
  ]

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'proposal': return <PieChart className="w-5 h-5 text-purple-400" />
      case 'vote': return <VoteIcon className="w-5 h-5 text-blue-400" />
      case 'treasury': return <DollarSign className="w-5 h-5 text-green-400" />
      case 'grant': return <Lock className="w-5 h-5 text-orange-400" />
      default: return <Activity className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-violet-400" />
          DAO Dashboard
        </h1>
        <p className="text-gray-400">Comprehensive overview of DAO treasury, governance, and activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Treasury</span>
            <DollarSign className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-3xl font-bold text-white">${(stats.treasury / 1000000).toFixed(1)}M</div>
          <div className="text-green-400 text-sm mt-2">+8.4% (30d)</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Members</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.members.toLocaleString()}</div>
          <div className="text-green-400 text-sm mt-2">+125 this week</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Proposals</span>
            <PieChart className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.proposals}</div>
          <div className="text-green-400 text-sm mt-2">5 pending</div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Active Votes</span>
            <Activity className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.activeVotes.toLocaleString()}</div>
          <div className="text-orange-400 text-sm mt-2">12 proposals active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treasury Breakdown */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            Treasury Breakdown
          </h2>
          <div className="space-y-4">
            {treasuries.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-semibold">{item.token}</span>
                    <span className="text-gray-400 text-sm ml-2">{item.amount.toLocaleString()} tokens</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${item.value.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">{item.percentage}%</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${idx === 0 ? 'bg-purple-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            Recent Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'proposal' ? 'bg-purple-500/20' : 
                  activity.type === 'vote' ? 'bg-blue-500/20' : 
                  activity.type === 'treasury' ? 'bg-green-500/20' : 'bg-orange-500/20'
                }`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{activity.title}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
                <span className="text-green-400 text-sm font-semibold">{activity.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}