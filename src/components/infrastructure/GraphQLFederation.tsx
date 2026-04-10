import React, { useState, useEffect } from 'react';
import { Network, Code, Zap, Shield, Database, Globe, CheckCircle, AlertTriangle, Clock, Activity, Cpu, HardDrive } from 'lucide-react';

interface GraphQLService {
  id: string;
  name: string;
  type: 'user' | 'portfolio' | 'trading' | 'market' | 'analytics';
  endpoint: string;
  status: 'active' | 'inactive' | 'error';
  version: string;
  latency: number;
  requests: number;
  errors: number;
  cacheHitRate: number;
  schema: string;
  resolvers: number;
}

interface FederationGateway {
  name: string;
  status: 'active' | 'inactive';
  version: string;
  services: string[];
  totalRequests: number;
  avgLatency: number;
  errorRate: number;
  cacheHitRate: number;
}

interface GraphQLQuery {
  id: string;
  name: string;
  query: string;
  variables: string;
  service: string;
  complexity: number;
  depth: number;
  duration: number;
  timestamp: string;
  status: 'success' | 'error';
}

interface CacheLayer {
  name: string;
  type: 'redis' | 'memcached' | 'in-memory';
  status: 'active' | 'inactive';
  hitRate: number;
  size: string;
  ttl: number;
  keys: number;
}

export const GraphQLFederation: React.FC = () => {
  const [services, setServices] = useState<GraphQLService[]>([]);
  const [gateway, setGateway] = useState<FederationGateway | null>(null);
  const [queries, setQueries] = useState<GraphQLQuery[]>([]);
  const [cacheLayers, setCacheLayers] = useState<CacheLayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'services' | 'gateway' | 'queries' | 'cache'>('services');

  useEffect(() => {
    const fetchGraphQLData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockServices: GraphQLService[] = [
          {
            id: 'user-service',
            name: 'User Service',
            type: 'user',
            endpoint: 'https://user.crybot.com/graphql',
            status: 'active',
            version: '3.2.1',
            latency: 45,
            requests: 125000,
            errors: 12,
            cacheHitRate: 85,
            schema: 'UserSchema',
            resolvers: 24
          },
          {
            id: 'portfolio-service',
            name: 'Portfolio Service',
            type: 'portfolio',
            endpoint: 'https://portfolio.crybot.com/graphql',
            status: 'active',
            version: '2.8.3',
            latency: 38,
            requests: 89000,
            errors: 8,
            cacheHitRate: 92,
            schema: 'PortfolioSchema',
            resolvers: 18
          },
          {
            id: 'trading-service',
            name: 'Trading Service',
            type: 'trading',
            endpoint: 'https://trading.crybot.com/graphql',
            status: 'active',
            version: '4.1.0',
            latency: 52,
            requests: 156000,
            errors: 23,
            cacheHitRate: 78,
            schema: 'TradingSchema',
            resolvers: 32
          },
          {
            id: 'market-service',
            name: 'Market Service',
            type: 'market',
            endpoint: 'https://market.crybot.com/graphql',
            status: 'active',
            version: '3.7.4',
            latency: 28,
            requests: 234000,
            errors: 5,
            cacheHitRate: 95,
            schema: 'MarketSchema',
            resolvers: 28
          },
          {
            id: 'analytics-service',
            name: 'Analytics Service',
            type: 'analytics',
            endpoint: 'https://analytics.crybot.com/graphql',
            status: 'error',
            version: '2.3.0',
            latency: 0,
            requests: 0,
            errors: 0,
            cacheHitRate: 0,
            schema: 'AnalyticsSchema',
            resolvers: 16
          }
        ];

        const mockGateway: FederationGateway = {
          name: 'Apollo Federation Gateway',
          status: 'active',
          version: '2.4.1',
          services: ['user-service', 'portfolio-service', 'trading-service', 'market-service'],
          totalRequests: 604000,
          avgLatency: 41,
          errorRate: 0.008,
          cacheHitRate: 87
        };

        const mockQueries: GraphQLQuery[] = [
          {
            id: 'query-1',
            name: 'Get User Portfolio',
            query: 'query GetUserPortfolio($userId: ID!) { user(id: $userId) { portfolio { assets { symbol amount value } } } }',
            variables: '{"userId": "123"}',
            service: 'portfolio-service',
            complexity: 15,
            depth: 4,
            duration: 38,
            timestamp: '2024-01-15T10:30:00Z',
            status: 'success'
          },
          {
            id: 'query-2',
            name: 'Market Data',
            query: 'query GetMarketData($symbols: [String!]!) { marketData(symbols: $symbols) { symbol price change volume } }',
            variables: '{"symbols": ["BTC", "ETH"]}',
            service: 'market-service',
            complexity: 8,
            depth: 3,
            duration: 25,
            timestamp: '2024-01-15T10:31:00Z',
            status: 'success'
          },
          {
            id: 'query-3',
            name: 'Execute Trade',
            query: 'mutation ExecuteTrade($input: TradeInput!) { executeTrade(input: $input) { id status } }',
            variables: '{"input": {"symbol": "BTC", "amount": 0.1, "type": "buy"}}',
            service: 'trading-service',
            complexity: 25,
            depth: 3,
            duration: 52,
            timestamp: '2024-01-15T10:32:00Z',
            status: 'success'
          },
          {
            id: 'query-4',
            name: 'Analytics Report',
            query: 'query GetAnalytics($userId: ID!, $period: Period!) { analytics(userId: $userId, period: $period) { returns volume trades } }',
            variables: '{"userId": "123", "period": "7d"}',
            service: 'analytics-service',
            complexity: 20,
            depth: 4,
            duration: 0,
            timestamp: '2024-01-15T10:33:00Z',
            status: 'error'
          }
        ];

        const mockCacheLayers: CacheLayer[] = [
          {
            name: 'Redis Cache',
            type: 'redis',
            status: 'active',
            hitRate: 87,
            size: '2.5 GB',
            ttl: 300,
            keys: 125000
          },
          {
            name: 'In-Memory Cache',
            type: 'in-memory',
            status: 'active',
            hitRate: 92,
            size: '1.8 GB',
            ttl: 60,
            keys: 45000
          },
          {
            name: 'Memcached',
            type: 'memcached',
            status: 'inactive',
            hitRate: 0,
            size: '0 GB',
            ttl: 0,
            keys: 0
          }
        ];

        setServices(mockServices);
        setGateway(mockGateway);
        setQueries(mockQueries);
        setCacheLayers(mockCacheLayers);
      } catch (error) {
        console.error('Error fetching GraphQL data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphQLData();
  }, []);

  const getStatusColor = (status: GraphQLService['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: GraphQLService['type']) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'portfolio': return 'bg-purple-100 text-purple-800';
      case 'trading': return 'bg-green-100 text-green-800';
      case 'market': return 'bg-orange-100 text-orange-800';
      case 'analytics': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQueryStatusColor = (status: GraphQLQuery['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity < 10) return 'bg-green-100 text-green-800';
    if (complexity < 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Network className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold">GraphQL Federation</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {services.filter(s => s.status === 'active').length} services active
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <Code className="w-4 h-4" />
            <span>GraphQL Playground</span>
          </button>
        </div>
      </div>

      {/* Gateway Overview */}
      {gateway && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{gateway.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-90">Status</p>
                  <p className="font-medium capitalize">{gateway.status}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Requests</p>
                  <p className="font-medium">{gateway.totalRequests.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Avg Latency</p>
                  <p className="font-medium">{gateway.avgLatency}ms</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Cache Hit Rate</p>
                  <p className="font-medium">{gateway.cacheHitRate}%</p>
                </div>
              </div>
            </div>
            <Globe className="w-16 h-16 opacity-50" />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-2xl font-bold">{services.length}</p>
            </div>
            <Network className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Queries</p>
              <p className="text-2xl font-bold">
                {services.reduce((sum, s) => sum + s.requests, 0).toLocaleString()}
              </p>
            </div>
            <Code className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Cache Hit Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(services.reduce((sum, s) => sum + s.cacheHitRate, 0) / services.length)}%
              </p>
            </div>
            <Database className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resolvers</p>
              <p className="text-2xl font-bold">
                {services.reduce((sum, s) => sum + s.resolvers, 0)}
              </p>
            </div>
            <Zap className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['services', 'gateway', 'queries', 'cache'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'services' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {services.filter(s => s.status === 'error').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {services.map(service => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        service.status === 'active' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Network className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.endpoint}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(service.type)}`}>
                      {service.type}
                    </span>
                    <span className="text-xs text-gray-600">v{service.version}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Latency</p>
                      <p className="text-sm font-medium">{service.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Requests</p>
                      <p className="text-sm font-medium">{service.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Errors</p>
                      <p className="text-sm font-medium">{service.errors}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Cache Hit Rate</p>
                      <p className="text-sm font-medium">{service.cacheHitRate}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Schema: {service.schema}</span>
                    <span>{service.resolvers} resolvers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gateway Tab */}
        {activeTab === 'gateway' && gateway && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Gateway Configuration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium">{gateway.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium capitalize">{gateway.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Connected Services</span>
                    <span className="text-sm font-medium">{gateway.services.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Requests</span>
                    <span className="text-sm font-medium">{gateway.totalRequests.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Latency</span>
                    <span className="text-sm font-medium">{gateway.avgLatency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium">{(gateway.errorRate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cache Hit Rate</span>
                    <span className="text-sm font-medium">{gateway.cacheHitRate}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Connected Services</h4>
                <div className="space-y-2">
                  {gateway.services.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            service.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium">{service.name}</span>
                        </div>
                        <span className="text-xs text-gray-600">{service.version}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Federation Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Schema Composition</h5>
                  <p className="text-sm text-gray-600">Automatic composition of multiple GraphQL schemas</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Query Planning</h5>
                  <p className="text-sm text-gray-600">Intelligent query planning and execution</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Distributed Caching</h5>
                  <p className="text-sm text-gray-600">Multi-level caching for optimal performance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Queries Tab */}
        {activeTab === 'queries' && (
          <div className="p-6">
            <div className="space-y-4">
              {queries.map(query => (
                <div key={query.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{query.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getQueryStatusColor(query.status)} bg-opacity-20`}>
                          {query.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getComplexityColor(query.complexity)}`}>
                          Complexity: {query.complexity}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Query:</p>
                        <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                          {query.query}
                        </code>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Service:</span>
                          <span className="ml-2 font-medium">{query.service}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Depth:</span>
                          <span className="ml-2 font-medium">{query.depth}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium">{query.duration}ms</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Time:</span>
                          <span className="ml-2 font-medium">{new Date(query.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cache Tab */}
        {activeTab === 'cache' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cacheLayers.map(cache => (
                <div key={cache.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        cache.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{cache.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{cache.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cache.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cache.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hit Rate</span>
                      <span className="text-sm font-medium">{cache.hitRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Size</span>
                      <span className="text-sm font-medium">{cache.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TTL</span>
                      <span className="text-sm font-medium">{cache.ttl}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Keys</span>
                      <span className="text-sm font-medium">{cache.keys.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Performance Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Query Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg Duration</span>
                  <span className="font-medium">
                    {Math.round(queries.reduce((sum, q) => sum + q.duration, 0) / queries.length)}ms
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Success Rate</span>
                  <span className="font-medium">
                    {Math.round((queries.filter(q => q.status === 'success').length / queries.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Cache Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg Hit Rate</span>
                  <span className="font-medium">
                    {Math.round(cacheLayers.reduce((sum, c) => sum + c.hitRate, 0) / cacheLayers.length)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Keys</span>
                  <span className="font-medium">
                    {cacheLayers.reduce((sum, c) => sum + c.keys, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Service Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Services</span>
                  <span className="font-medium">{services.filter(s => s.status === 'active').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Error Services</span>
                  <span className="font-medium">{services.filter(s => s.status === 'error').length}</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Resource Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Requests</span>
                  <span className="font-medium">
                    {services.reduce((sum, s) => sum + s.requests, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Errors</span>
                  <span className="font-medium">
                    {services.reduce((sum, s) => sum + s.errors, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
