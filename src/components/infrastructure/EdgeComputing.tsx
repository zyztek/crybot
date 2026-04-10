import React, { useState, useEffect } from 'react';
import { Globe, Zap, Server, Shield, Activity, Clock, Users, MapPin, Wifi, Cpu, HardDrive, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

interface EdgeNode {
  id: string;
  name: string;
  location: string;
  region: string;
  status: 'active' | 'inactive' | 'maintenance';
  version: string;
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  latency: number;
  requests: number;
  cacheHitRate: number;
  lastSync: string;
  services: string[];
}

interface CDNProvider {
  name: string;
  status: 'active' | 'inactive';
  nodes: number;
  coverage: string;
  bandwidth: string;
  cacheSize: string;
  hitRate: number;
  avgLatency: number;
}

interface EdgeFunction {
  id: string;
  name: string;
  description: string;
  runtime: 'nodejs' | 'python' | 'go' | 'rust';
  status: 'active' | 'inactive' | 'error';
  executions: number;
  avgDuration: number;
  errors: number;
  memoryUsage: number;
  coldStarts: number;
  deployedAt: string;
  regions: string[];
}

interface TrafficRouting {
  algorithm: 'geographic' | 'latency' | 'load-balanced' | 'intelligent';
  status: 'active' | 'inactive';
  rules: number;
  avgResponseTime: number;
  failoverRate: number;
  regions: number;
}

export const EdgeComputing: React.FC = () => {
  const [edgeNodes, setEdgeNodes] = useState<EdgeNode[]>([]);
  const [cdnProviders, setCdnProviders] = useState<CDNProvider[]>([]);
  const [edgeFunctions, setEdgeFunctions] = useState<EdgeFunction[]>([]);
  const [trafficRouting, setTrafficRouting] = useState<TrafficRouting | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'nodes' | 'cdn' | 'functions' | 'routing'>('nodes');

  useEffect(() => {
    const fetchEdgeData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockEdgeNodes: EdgeNode[] = [
          {
            id: 'node-1',
            name: 'US East - Virginia',
            location: 'Ashburn, VA',
            region: 'us-east-1',
            status: 'active',
            version: '2.4.1',
            cpu: 45,
            memory: 65,
            storage: 35,
            bandwidth: 78,
            latency: 12,
            requests: 125000,
            cacheHitRate: 92,
            lastSync: '2024-01-15T10:30:00Z',
            services: ['api-gateway', 'auth-service', 'portfolio-service']
          },
          {
            id: 'node-2',
            name: 'US West - California',
            location: 'San Francisco, CA',
            region: 'us-west-1',
            status: 'active',
            version: '2.4.1',
            cpu: 38,
            memory: 58,
            storage: 42,
            bandwidth: 65,
            latency: 8,
            requests: 98000,
            cacheHitRate: 89,
            lastSync: '2024-01-15T10:29:00Z',
            services: ['trading-service', 'market-data-service']
          },
          {
            id: 'node-3',
            name: 'Europe - London',
            location: 'London, UK',
            region: 'eu-west-2',
            status: 'active',
            version: '2.4.0',
            cpu: 52,
            memory: 71,
            storage: 28,
            bandwidth: 82,
            latency: 15,
            requests: 87000,
            cacheHitRate: 94,
            lastSync: '2024-01-15T10:28:00Z',
            services: ['portfolio-service', 'analytics-service']
          },
          {
            id: 'node-4',
            name: 'Asia Pacific - Singapore',
            location: 'Singapore',
            region: 'ap-southeast-1',
            status: 'active',
            version: '2.4.1',
            cpu: 41,
            memory: 62,
            storage: 38,
            bandwidth: 71,
            latency: 18,
            requests: 76000,
            cacheHitRate: 87,
            lastSync: '2024-01-15T10:27:00Z',
            services: ['market-data-service', 'notification-service']
          },
          {
            id: 'node-5',
            name: 'Australia - Sydney',
            location: 'Sydney, AU',
            region: 'ap-southeast-2',
            status: 'maintenance',
            version: '2.3.9',
            cpu: 0,
            memory: 0,
            storage: 0,
            bandwidth: 0,
            latency: 0,
            requests: 0,
            cacheHitRate: 0,
            lastSync: '2024-01-15T08:00:00Z',
            services: []
          },
          {
            id: 'node-6',
            name: 'South America - São Paulo',
            location: 'São Paulo, BR',
            region: 'sa-east-1',
            status: 'active',
            version: '2.4.1',
            cpu: 35,
            memory: 48,
            storage: 31,
            bandwidth: 58,
            latency: 22,
            requests: 45000,
            cacheHitRate: 85,
            lastSync: '2024-01-15T10:26:00Z',
            services: ['auth-service', 'portfolio-service']
          }
        ];

        const mockCDNProviders: CDNProvider[] = [
          {
            name: 'Cloudflare CDN',
            status: 'active',
            nodes: 250,
            coverage: 'Global',
            bandwidth: '125 Tbps',
            cacheSize: '45 PB',
            hitRate: 96,
            avgLatency: 8
          },
          {
            name: 'AWS CloudFront',
            status: 'active',
            nodes: 410,
            coverage: 'Global',
            bandwidth: '185 Tbps',
            cacheSize: '78 PB',
            hitRate: 94,
            avgLatency: 12
          },
          {
            name: 'Fastly CDN',
            status: 'active',
            nodes: 95,
            coverage: 'Global',
            bandwidth: '65 Tbps',
            cacheSize: '28 PB',
            hitRate: 93,
            avgLatency: 10
          }
        ];

        const mockEdgeFunctions: EdgeFunction[] = [
          {
            id: 'func-1',
            name: 'Price Calculator',
            description: 'Calculate crypto prices with real-time data',
            runtime: 'nodejs',
            status: 'active',
            executions: 1250000,
            avgDuration: 45,
            errors: 23,
            memoryUsage: 128,
            coldStarts: 1250,
            deployedAt: '2024-01-10T15:30:00Z',
            regions: ['us-east-1', 'us-west-1', 'eu-west-2']
          },
          {
            id: 'func-2',
            name: 'Risk Assessment',
            description: 'Real-time risk calculation engine',
            runtime: 'python',
            status: 'active',
            executions: 890000,
            avgDuration: 78,
            errors: 45,
            memoryUsage: 256,
            coldStarts: 890,
            deployedAt: '2024-01-08T12:15:00Z',
            regions: ['us-east-1', 'eu-west-2', 'ap-southeast-1']
          },
          {
            id: 'func-3',
            name: 'Image Processor',
            description: 'Process and optimize user uploaded images',
            runtime: 'go',
            status: 'active',
            executions: 450000,
            avgDuration: 120,
            errors: 12,
            memoryUsage: 512,
            coldStarts: 450,
            deployedAt: '2024-01-12T09:45:00Z',
            regions: ['us-east-1', 'us-west-1', 'ap-southeast-1', 'ap-southeast-2']
          },
          {
            id: 'func-4',
            name: 'Notification Sender',
            description: 'Send push notifications and emails',
            runtime: 'nodejs',
            status: 'error',
            executions: 0,
            avgDuration: 0,
            errors: 0,
            memoryUsage: 0,
            coldStarts: 0,
            deployedAt: '2024-01-15T08:00:00Z',
            regions: ['us-east-1', 'eu-west-2']
          }
        ];

        const mockTrafficRouting: TrafficRouting = {
          algorithm: 'intelligent',
          status: 'active',
          rules: 45,
          avgResponseTime: 15,
          failoverRate: 0.002,
          regions: 6
        };

        setEdgeNodes(mockEdgeNodes);
        setCdnProviders(mockCDNProviders);
        setEdgeFunctions(mockEdgeFunctions);
        setTrafficRouting(mockTrafficRouting);
      } catch (error) {
        console.error('Error fetching edge data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdgeData();
  }, []);

  const getStatusColor = (status: EdgeNode['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRuntimeColor = (runtime: EdgeFunction['runtime']) => {
    switch (runtime) {
      case 'nodejs': return 'bg-green-100 text-green-800';
      case 'python': return 'bg-blue-100 text-blue-800';
      case 'go': return 'bg-cyan-100 text-cyan-800';
      case 'rust': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Globe className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold">Edge Computing</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {edgeNodes.filter(n => n.status === 'active').length} nodes active
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Zap className="w-4 h-4" />
            <span>Deploy Function</span>
          </button>
        </div>
      </div>

      {/* Global Coverage Overview */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Global Edge Network</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-90">Active Nodes</p>
                <p className="font-medium">{edgeNodes.filter(n => n.status === 'active').length}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Regions</p>
                <p className="font-medium">{new Set(edgeNodes.map(n => n.region)).size}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Requests</p>
                <p className="font-medium">
                  {edgeNodes.reduce((sum, n) => sum + n.requests, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Avg Latency</p>
                <p className="font-medium">
                  {Math.round(edgeNodes.reduce((sum, n) => sum + n.latency, 0) / edgeNodes.length)}ms
                </p>
              </div>
            </div>
          </div>
          <MapPin className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Edge Nodes</p>
              <p className="text-2xl font-bold">{edgeNodes.length}</p>
            </div>
            <Server className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Edge Functions</p>
              <p className="text-2xl font-bold">{edgeFunctions.length}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cache Hit Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(edgeNodes.reduce((sum, n) => sum + n.cacheHitRate, 0) / edgeNodes.length)}%
              </p>
            </div>
            <HardDrive className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bandwidth</p>
              <p className="text-2xl font-bold">
                {cdnProviders.reduce((sum, cdn) => sum + parseInt(cdn.bandwidth), 0)} Tbps
              </p>
            </div>
            <Wifi className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['nodes', 'cdn', 'functions', 'routing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'nodes' && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {edgeNodes.filter(n => n.status === 'maintenance').length}
                </span>
              )}
              {tab === 'functions' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {edgeFunctions.filter(f => f.status === 'error').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Edge Nodes Tab */}
        {activeTab === 'nodes' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {edgeNodes.map(node => (
                <div key={node.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        node.status === 'active' ? 'bg-green-100 text-green-600' : 
                        node.status === 'maintenance' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{node.name}</h4>
                        <p className="text-sm text-gray-600">{node.location}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {node.services.map(service => (
                        <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">CPU</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.cpu)}`}
                            style={{ width: `${node.cpu}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Memory</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.memory)}`}
                            style={{ width: `${node.memory}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.memory}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Storage</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.storage)}`}
                            style={{ width: `${node.storage}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.storage}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Bandwidth</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.bandwidth)}`}
                            style={{ width: `${node.bandwidth}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.bandwidth}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Latency: {node.latency}ms</span>
                    <span>Cache: {node.cacheHitRate}%</span>
                    <span>Requests: {(node.requests / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CDN Tab */}
        {activeTab === 'cdn' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cdnProviders.map(cdn => (
                <div key={cdn.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        cdn.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{cdn.name}</h4>
                        <p className="text-sm text-gray-600">{cdn.coverage}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cdn.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cdn.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nodes</span>
                      <span className="text-sm font-medium">{cdn.nodes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bandwidth</span>
                      <span className="text-sm font-medium">{cdn.bandwidth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cache Size</span>
                      <span className="text-sm font-medium">{cdn.cacheSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hit Rate</span>
                      <span className="text-sm font-medium">{cdn.hitRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Latency</span>
                      <span className="text-sm font-medium">{cdn.avgLatency}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edge Functions Tab */}
        {activeTab === 'functions' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {edgeFunctions.map(func => (
                <div key={func.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        func.status === 'active' ? 'bg-blue-100 text-blue-600' : 
                        func.status === 'error' ? 'bg-red-100 text-red-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{func.name}</h4>
                        <p className="text-sm text-gray-600">{func.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRuntimeColor(func.runtime)}`}>
                      {func.runtime}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Executions</p>
                      <p className="text-sm font-medium">{func.executions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Avg Duration</p>
                      <p className="text-sm font-medium">{func.avgDuration}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Errors</p>
                      <p className="text-sm font-medium">{func.errors}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Memory</p>
                      <p className="text-sm font-medium">{func.memoryUsage}MB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Cold Starts: {func.coldStarts}</span>
                    <span>Regions: {func.regions.length}</span>
                    <span>Deployed: {new Date(func.deployedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traffic Routing Tab */}
        {activeTab === 'routing' && trafficRouting && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Routing Configuration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Algorithm</span>
                    <span className="text-sm font-medium capitalize">{trafficRouting.algorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium capitalize">{trafficRouting.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Routing Rules</span>
                    <span className="text-sm font-medium">{trafficRouting.rules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="text-sm font-medium">{trafficRouting.avgResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Failover Rate</span>
                    <span className="text-sm font-medium">{(trafficRouting.failoverRate * 100).toFixed(3)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Regions</span>
                    <span className="text-sm font-medium">{trafficRouting.regions}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Routing Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Geographic routing based on user location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Latency-based routing for optimal performance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Load balancing across multiple nodes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Automatic failover to healthy nodes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Health checks and monitoring</span>
                  </div>
                </div>
              </div>
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
              <h4 className="font-medium mb-2">Global Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg Latency</span>
                  <span className="font-medium">
                    {Math.round(edgeNodes.reduce((sum, n) => sum + n.latency, 0) / edgeNodes.length)}ms
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cache Hit Rate</span>
                  <span className="font-medium">
                    {Math.round(edgeNodes.reduce((sum, n) => sum + n.cacheHitRate, 0) / edgeNodes.length)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Resource Utilization</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg CPU</span>
                  <span className="font-medium">
                    {Math.round(edgeNodes.reduce((sum, n) => sum + n.cpu, 0) / edgeNodes.length)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Memory</span>
                  <span className="font-medium">
                    {Math.round(edgeNodes.reduce((sum, n) => sum + n.memory, 0) / edgeNodes.length)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Function Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Executions</span>
                  <span className="font-medium">
                    {edgeFunctions.reduce((sum, f) => sum + f.executions, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Duration</span>
                  <span className="font-medium">
                    {Math.round(edgeFunctions.reduce((sum, f) => sum + f.avgDuration, 0) / edgeFunctions.length)}ms
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">CDN Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Nodes</span>
                  <span className="font-medium">
                    {cdnProviders.reduce((sum, cdn) => sum + cdn.nodes, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Hit Rate</span>
                  <span className="font-medium">
                    {Math.round(cdnProviders.reduce((sum, cdn) => sum + cdn.hitRate, 0) / cdnProviders.length)}%
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
