import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, AlertTriangle, Clock, ExternalLink, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Protocol {
  id: string;
  name: string;
  chain: string;
  apy: number;
  tvl: number;
  riskScore: number;
  category: 'lending' | 'liquidity' | 'staking' | 'yield';
  token: string;
  requiresLock: boolean;
  lockPeriod?: string;
  insurance: boolean;
  audited: boolean;
  lastUpdated: string;
}

interface YieldData {
  protocols: Protocol[];
  totalTVL: number;
  averageAPY: number;
  riskDistribution: { name: string; value: number; color: string }[];
}

export const YieldFarmingAggregator: React.FC = () => {
  const [yieldData, setYieldData] = useState<YieldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'risk'>('apy');
  const [showRiskOnly, setShowRiskOnly] = useState(false);

  const chains = [
    { id: 'all', name: 'All Chains' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'polygon', name: 'Polygon' },
    { id: 'bnb', name: 'BSC' },
    { id: 'avalanche', name: 'Avalanche' },
    { id: 'arbitrum', name: 'Arbitrum' }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'lending', name: 'Lending' },
    { id: 'liquidity', name: 'Liquidity' },
    { id: 'staking', name: 'Staking' },
    { id: 'yield', name: 'Yield' }
  ];

  const riskColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const categoryColors = {
    lending: '#3b82f6',
    liquidity: '#8b5cf6',
    staking: '#10b981',
    yield: '#f59e0b'
  };

  useEffect(() => {
    const fetchYieldData = async () => {
      setLoading(true);
      try {
        // Simulate API call to DeFi protocols
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockProtocols: Protocol[] = [
          {
            id: 'aave-eth',
            name: 'Aave',
            chain: 'ethereum',
            apy: 3.2,
            tvl: 5400000000,
            riskScore: 2,
            category: 'lending',
            token: 'USDC',
            requiresLock: false,
            insurance: true,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'compound-eth',
            name: 'Compound',
            chain: 'ethereum',
            apy: 2.8,
            tvl: 3200000000,
            riskScore: 2,
            category: 'lending',
            token: 'USDC',
            requiresLock: false,
            insurance: true,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'uniswap-v3',
            name: 'Uniswap V3',
            chain: 'ethereum',
            apy: 12.5,
            tvl: 2100000000,
            riskScore: 4,
            category: 'liquidity',
            token: 'ETH-USDC',
            requiresLock: false,
            insurance: false,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'curve-finance',
            name: 'Curve Finance',
            chain: 'ethereum',
            apy: 8.3,
            tvl: 1800000000,
            riskScore: 3,
            category: 'liquidity',
            token: '3CRV',
            requiresLock: false,
            insurance: true,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'lido-staking',
            name: 'Lido Staking',
            chain: 'ethereum',
            apy: 4.1,
            tvl: 14000000000,
            riskScore: 3,
            category: 'staking',
            token: 'stETH',
            requiresLock: false,
            insurance: false,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'pancakeswap',
            name: 'PancakeSwap',
            chain: 'bnb',
            apy: 18.7,
            tvl: 3200000000,
            riskScore: 4,
            category: 'liquidity',
            token: 'CAKE-BNB',
            requiresLock: false,
            insurance: false,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'quickswap',
            name: 'QuickSwap',
            chain: 'polygon',
            apy: 15.2,
            tvl: 890000000,
            riskScore: 4,
            category: 'liquidity',
            token: 'QUICK-ETH',
            requiresLock: false,
            insurance: false,
            audited: true,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'benqi',
            name: 'Benqi',
            chain: 'avalanche',
            apy: 6.8,
            tvl: 420000000,
            riskScore: 3,
            category: 'lending',
            token: 'AVAX',
            requiresLock: false,
            insurance: true,
            audited: true,
            lastUpdated: new Date().toISOString()
          }
        ];

        const totalTVL = mockProtocols.reduce((sum, p) => sum + p.tvl, 0);
        const averageAPY = mockProtocols.reduce((sum, p) => sum + p.apy, 0) / mockProtocols.length;

        const riskDistribution = [
          { name: 'Low Risk', value: mockProtocols.filter(p => p.riskScore <= 2).length, color: riskColors.low },
          { name: 'Medium Risk', value: mockProtocols.filter(p => p.riskScore === 3).length, color: riskColors.medium },
          { name: 'High Risk', value: mockProtocols.filter(p => p.riskScore >= 4).length, color: riskColors.high }
        ];

        setYieldData({
          protocols: mockProtocols,
          totalTVL,
          averageAPY,
          riskDistribution
        });
      } catch (error) {
        console.error('Error fetching yield data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYieldData();
  }, []);

  const filteredProtocols = yieldData?.protocols.filter(protocol => {
    const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.token.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChain = selectedChain === 'all' || protocol.chain === selectedChain;
    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;
    const matchesRisk = !showRiskOnly || protocol.riskScore >= 4;
    
    return matchesSearch && matchesChain && matchesCategory && matchesRisk;
  ).sort((a, b) => {
    switch (sortBy) {
      case 'apy':
        return b.apy - a.apy;
      case 'tvl':
        return b.tvl - a.tvl;
      case 'risk':
        return a.riskScore - b.riskScore;
      default:
        return 0;
    }
  }) || [];

  const getRiskLevel = (score: number) => {
    if (score <= 2) return { level: 'Low', color: riskColors.low };
    if (score === 3) return { level: 'Medium', color: riskColors.medium };
    return { level: 'High', color: riskColors.high };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold">Yield Farming Aggregator</h2>
        </div>
        <div className="text-sm text-gray-600">
          {yieldData?.protocols.length || 0} Protocols Tracked
        </div>
      </div>

      {/* Summary Stats */}
      {yieldData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total TVL</p>
                <p className="text-3xl font-bold">
                  ${(yieldData.totalTVL / 1000000000).toFixed(2)}B
                </p>
              </div>
              <DollarSign className="w-8 h-8 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Average APY</p>
                <p className="text-3xl font-bold">{yieldData.averageAPY.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Protocols</p>
                <p className="text-3xl font-bold">{yieldData.protocols.length}</p>
              </div>
              <Filter className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* Risk Distribution Chart */}
      {yieldData && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={yieldData.riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {yieldData.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search protocols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {chains.map(chain => (
              <option key={chain.id} value={chain.id}>{chain.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="apy">Sort by APY</option>
            <option value="tvl">Sort by TVL</option>
            <option value="risk">Sort by Risk</option>
          </select>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showRiskOnly}
              onChange={(e) => setShowRiskOnly(e.target.checked)}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">High Risk Only</span>
          </label>
        </div>
      </div>

      {/* Protocols List */}
      <div className="space-y-4">
        {filteredProtocols.map(protocol => {
          const risk = getRiskLevel(protocol.riskScore);
          
          return (
            <div key={protocol.id} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{protocol.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium`} style={{ backgroundColor: categoryColors[protocol.category] + '20', color: categoryColors[protocol.category] }}>
                      {protocol.category}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {protocol.chain}
                    </span>
                    {protocol.audited && (
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                        Audited
                      </span>
                    )}
                    {protocol.insurance && (
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                        Insured
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">APY</p>
                      <p className="text-xl font-bold text-green-600">{protocol.apy}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">TVL</p>
                      <p className="text-lg font-semibold">
                        ${(protocol.tvl / 1000000).toFixed(0)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Risk Level</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }}></div>
                        <span className="font-medium" style={{ color: risk.color }}>
                          {risk.level}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Token</p>
                      <p className="font-medium">{protocol.token}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{protocol.requiresLock ? `Locked: ${protocol.lockPeriod || 'Variable'}` : 'No Lock'}</span>
                    </div>
                    <div>
                      Updated: {new Date(protocol.lastUpdated).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {protocol.riskScore >= 4 && (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <span>Deposit</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Risk Disclaimer</p>
            <p>
              Yield farming involves significant risks including smart contract vulnerabilities, impermanent loss, and market volatility. 
              Always do your own research and never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
