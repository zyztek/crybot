import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, DollarSign, Zap, Globe, Server, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RealTimeMetrics {
  timestamp: string;
  activeUsers: number;
  transactions: number;
  volume: number;
  apiCalls: number;
  responseTime: number;
  errorRate: number;
}

interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
}

interface GeographicData {
  country: string;
  users: number;
  percentage: number;
  code: string;
}

export const RealTimeAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [geoData, setGeoData] = useState<GeographicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  const timeRanges = [
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' }
  ];

  const countryColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
  ];

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        // Simulate WebSocket connection
        const newMetric: RealTimeMetrics = {
          timestamp: new Date().toLocaleTimeString(),
          activeUsers: 1200 + Math.floor(Math.random() * 300),
          transactions: 45 + Math.floor(Math.random() * 20),
          volume: 125000 + Math.floor(Math.random() * 50000),
          apiCalls: 850 + Math.floor(Math.random() * 200),
          responseTime: 45 + Math.floor(Math.random() * 30),
          errorRate: Math.random() * 2
        };

        setMetrics(prev => {
          const updated = [...prev, newMetric];
          return updated.slice(-50); // Keep last 50 data points
        });

        setSystemHealth({
          cpu: 20 + Math.random() * 40,
          memory: 30 + Math.random() * 35,
          disk: 45 + Math.random() * 20,
          network: 10 + Math.random() * 25,
          uptime: '15 days, 8 hours, 32 minutes'
        });

        const mockGeoData: GeographicData[] = [
          { country: 'United States', users: 450, percentage: 37.5, code: 'US' },
          { country: 'United Kingdom', users: 180, percentage: 15.0, code: 'GB' },
          { country: 'Germany', users: 150, percentage: 12.5, code: 'DE' },
          { country: 'Japan', users: 120, percentage: 10.0, code: 'JP' },
          { country: 'Canada', users: 90, percentage: 7.5, code: 'CA' },
          { country: 'Australia', users: 75, percentage: 6.25, code: 'AU' },
          { country: 'France', users: 60, percentage: 5.0, code: 'FR' },
          { country: 'Others', users: 75, percentage: 6.25, code: 'OT' }
        ];

        setGeoData(mockGeoData);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTimeData();

    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(fetchRealTimeData, 2000); // Update every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const currentMetrics = metrics[metrics.length - 1];
  const previousMetrics = metrics[metrics.length - 2];

  const getChange = (current: number, previous: number | undefined) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm">{isLive ? 'Live' : 'Paused'}</span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-lg text-sm ${
              isLive 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      {currentMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
              {previousMetrics && (
                <span className={`text-xs font-medium ${getChangeColor(getChange(currentMetrics.activeUsers, previousMetrics.activeUsers))}`}>
                  {getChange(currentMetrics.activeUsers, previousMetrics.activeUsers).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{currentMetrics.activeUsers.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Transactions</span>
              </div>
              {previousMetrics && (
                <span className={`text-xs font-medium ${getChangeColor(getChange(currentMetrics.transactions, previousMetrics.transactions))}`}>
                  {getChange(currentMetrics.transactions, previousMetrics.transactions).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{currentMetrics.transactions}</p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">Volume</span>
              </div>
              {previousMetrics && (
                <span className={`text-xs font-medium ${getChangeColor(getChange(currentMetrics.volume, previousMetrics.volume))}`}>
                  {getChange(currentMetrics.volume, previousMetrics.volume).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">${(currentMetrics.volume / 1000).toFixed(0)}K</p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">API Calls</span>
              </div>
              {previousMetrics && (
                <span className={`text-xs font-medium ${getChangeColor(getChange(currentMetrics.apiCalls, previousMetrics.apiCalls))}`}>
                  {getChange(currentMetrics.apiCalls, previousMetrics.apiCalls).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{currentMetrics.apiCalls}</p>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Active Users Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Volume */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health & Geographic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        {systemHealth && (
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">System Health</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Server className="w-4 h-4" />
                <span>{systemHealth.uptime}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span>{systemHealth.cpu.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      systemHealth.cpu > 80 ? 'bg-red-500' : 
                      systemHealth.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${systemHealth.cpu}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory Usage</span>
                  <span>{systemHealth.memory.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      systemHealth.memory > 80 ? 'bg-red-500' : 
                      systemHealth.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${systemHealth.memory}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Disk Usage</span>
                  <span>{systemHealth.disk.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      systemHealth.disk > 80 ? 'bg-red-500' : 
                      systemHealth.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${systemHealth.disk}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Network I/O</span>
                  <span>{systemHealth.network.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      systemHealth.network > 80 ? 'bg-red-500' : 
                      systemHealth.network > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${systemHealth.network}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          
          <div className="space-y-3">
            {geoData.map((country, index) => (
              <div key={country.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: countryColors[index] }}></div>
                  <span className="text-sm font-medium">{country.country}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{country.users.toLocaleString()} users</span>
                  <span className="text-sm font-medium">{country.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={geoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="users"
                >
                  {geoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={countryColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      {currentMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600">Response Time</span>
              </div>
            </div>
            <p className={`text-xl font-bold ${
              currentMetrics.responseTime > 100 ? 'text-red-600' :
              currentMetrics.responseTime > 50 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {currentMetrics.responseTime}ms
            </p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">Error Rate</span>
              </div>
            </div>
            <p className={`text-xl font-bold ${
              currentMetrics.errorRate > 5 ? 'text-red-600' :
              currentMetrics.errorRate > 2 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {currentMetrics.errorRate.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Data Points</span>
              </div>
            </div>
            <p className="text-xl font-bold">{metrics.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};
