import React, { useState, useEffect } from 'react';
import { Server, Network, Database, Shield, Zap, Settings, Activity, Globe, Cpu, HardDrive, Wifi, Code, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

interface Microservice {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'error' | 'deploying';
  version: string;
  cpu: number;
  memory: number;
  instances: number;
  endpoint: string;
  dependencies: string[];
  health: 'healthy' | 'unhealthy' | 'degraded';
  lastDeployed: string;
  uptime: string;
}

interface ServiceMesh {
  name: string;
  type: 'istio' | 'linkerd' | 'consul';
  status: 'active' | 'inactive';
  features: string[];
  endpoints: number;
  requests: number;
  latency: number;
}

interface DatabaseCluster {
  name: string;
  type: 'postgresql' | 'mongodb' | 'redis' | 'elasticsearch';
  status: 'healthy' | 'degraded' | 'down';
  nodes: number;
  replication: boolean;
  backup: boolean;
  size: string;
  connections: number;
}

interface LoadBalancer {
  name: string;
  algorithm: 'round-robin' | 'least-connections' | 'ip-hash';
  status: 'active' | 'inactive';
  endpoints: number;
  requests: number;
  responseTime: number;
}

export const MicroservicesArchitecture: React.FC = () => {
  const [services, setServices] = useState<Microservice[]>([]);
  const [serviceMesh, setServiceMesh] = useState<ServiceMesh | null>(null);
  const [databases, setDatabases] = useState<DatabaseCluster[]>([]);
  const [loadBalancers, setLoadBalancers] = useState<LoadBalancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'services' | 'mesh' | 'databases' | 'loadbalancers'>('services');

  useEffect(() => {
    const fetchInfrastructureData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockServices: Microservice[] = [
          {
            id: 'auth-service',
            name: 'Authentication Service',
            description: 'User authentication and authorization',
            status: 'running',
            version: '3.2.1',
            cpu: 15,
            memory: 512,
            instances: 3,
            endpoint: 'https://auth.crybot.com',
            dependencies: ['user-db', 'redis-cache'],
            health: 'healthy',
            lastDeployed: '2024-01-15T10:30:00Z',
            uptime: '45d 12h 30m'
          },
          {
            id: 'trading-service',
            name: 'Trading Service',
            description: 'Order execution and trade management',
            status: 'running',
            version: '4.1.0',
            cpu: 35,
            memory: 1024,
            instances: 5,
            endpoint: 'https://trading.crybot.com',
            dependencies: ['order-db', 'price-feed', 'risk-engine'],
            health: 'healthy',
            lastDeployed: '2024-01-14T15:45:00Z',
            uptime: '30d 8h 15m'
          },
          {
            id: 'portfolio-service',
            name: 'Portfolio Service',
            description: 'Portfolio management and analytics',
            status: 'running',
            version: '2.8.3',
            cpu: 25,
            memory: 768,
            instances: 4,
            endpoint: 'https://portfolio.crybot.com',
            dependencies: ['portfolio-db', 'analytics-engine'],
            health: 'healthy',
            lastDeployed: '2024-01-13T09:20:00Z',
            uptime: '22d 16h 45m'
          },
          {
            id: 'notification-service',
            name: 'Notification Service',
            description: 'Push notifications and alerts',
            status: 'running',
            version: '1.5.2',
            cpu: 10,
            memory: 256,
            instances: 2,
            endpoint: 'https://notifications.crybot.com',
            dependencies: ['notification-db', 'message-queue'],
            health: 'healthy',
            lastDeployed: '2024-01-12T14:10:00Z',
            uptime: '18d 4h 20m'
          },
          {
            id: 'api-gateway',
            name: 'API Gateway',
            description: 'Central API gateway and routing',
            status: 'running',
            version: '5.0.1',
            cpu: 20,
            memory: 512,
            instances: 6,
            endpoint: 'https://api.crybot.com',
            dependencies: ['service-discovery', 'rate-limiter'],
            health: 'healthy',
            lastDeployed: '2024-01-11T11:30:00Z',
            uptime: '15d 10h 55m'
          },
          {
            id: 'analytics-service',
            name: 'Analytics Service',
            description: 'Data analytics and reporting',
            status: 'error',
            version: '2.3.0',
            cpu: 0,
            memory: 0,
            instances: 0,
            endpoint: 'https://analytics.crybot.com',
            dependencies: ['analytics-db', 'data-warehouse'],
            health: 'unhealthy',
            lastDeployed: '2024-01-10T08:15:00Z',
            uptime: '0d 0h 0m'
          },
          {
            id: 'market-data-service',
            name: 'Market Data Service',
            description: 'Real-time market data aggregation',
            status: 'running',
            version: '3.7.4',
            cpu: 30,
            memory: 896,
            instances: 4,
            endpoint: 'https://market-data.crybot.com',
            dependencies: ['market-db', 'exchanges-api'],
            health: 'healthy',
            lastDeployed: '2024-01-09T16:45:00Z',
            uptime: '12d 20h 30m'
          },
          {
            id: 'risk-service',
            name: 'Risk Management Service',
            description: 'Risk assessment and management',
            status: 'deploying',
            version: '1.9.0',
            cpu: 15,
            memory: 640,
            instances: 3,
            endpoint: 'https://risk.crybot.com',
            dependencies: ['risk-db', 'ml-engine'],
            health: 'degraded',
            lastDeployed: '2024-01-15T12:00:00Z',
            uptime: '0d 0h 15m'
          }
        ];

        const mockServiceMesh: ServiceMesh = {
          name: 'Istio Service Mesh',
          type: 'istio',
          status: 'active',
          features: ['Traffic Management', 'Security', 'Observability', 'Policy'],
          endpoints: 45,
          requests: 1250000,
          latency: 12
        };

        const mockDatabases: DatabaseCluster[] = [
          {
            name: 'Primary PostgreSQL',
            type: 'postgresql',
            status: 'healthy',
            nodes: 3,
            replication: true,
            backup: true,
            size: '2.5 TB',
            connections: 850
          },
          {
            name: 'MongoDB Cluster',
            type: 'mongodb',
            status: 'healthy',
            nodes: 5,
            replication: true,
            backup: true,
            size: '1.8 TB',
            connections: 450
          },
          {
            name: 'Redis Cache',
            type: 'redis',
            status: 'healthy',
            nodes: 6,
            replication: true,
            backup: false,
            size: '256 GB',
            connections: 1200
          },
          {
            name: 'Elasticsearch',
            type: 'elasticsearch',
            status: 'degraded',
            nodes: 3,
            replication: true,
            backup: true,
            size: '850 GB',
            connections: 320
          }
        ];

        const mockLoadBalancers: LoadBalancer[] = [
          {
            name: 'Main Load Balancer',
            algorithm: 'least-connections',
            status: 'active',
            endpoints: 8,
            requests: 450000,
            responseTime: 45
          },
          {
            name: 'API Load Balancer',
            algorithm: 'round-robin',
            status: 'active',
            endpoints: 6,
            requests: 320000,
            responseTime: 38
          },
          {
            name: 'WebSocket Load Balancer',
            algorithm: 'ip-hash',
            status: 'active',
            endpoints: 4,
            requests: 125000,
            responseTime: 25
          }
        ];

        setServices(mockServices);
        setServiceMesh(mockServiceMesh);
        setDatabases(mockDatabases);
        setLoadBalancers(mockLoadBalancers);
      } catch (error) {
        console.error('Error fetching infrastructure data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfrastructureData();
  }, []);

  const getStatusColor = (status: Microservice['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'deploying': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: Microservice['health']) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'unhealthy': return 'text-red-600';
      case 'degraded': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDatabaseStatusColor = (status: DatabaseCluster['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'down': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Server className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Microservices Architecture</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {services.filter(s => s.status === 'running').length} services running
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Manage Services</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Services</p>
              <p className="text-3xl font-bold">{services.length}</p>
            </div>
            <Server className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Running Services</p>
              <p className="text-3xl font-bold">{services.filter(s => s.status === 'running').length}</p>
            </div>
            <Activity className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Instances</p>
              <p className="text-3xl font-bold">{services.reduce((sum, s) => sum + s.instances, 0)}</p>
            </div>
            <Network className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg CPU Usage</p>
              <p className="text-3xl font-bold">
                {Math.round(services.reduce((sum, s) => sum + s.cpu, 0) / services.length)}%
              </p>
            </div>
            <Cpu className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* Service Mesh Overview */}
      {serviceMesh && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{serviceMesh.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-90">Status</p>
                  <p className="font-medium capitalize">{serviceMesh.status}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Endpoints</p>
                  <p className="font-medium">{serviceMesh.endpoints}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Requests/sec</p>
                  <p className="font-medium">{(serviceMesh.requests / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Avg Latency</p>
                  <p className="font-medium">{serviceMesh.latency}ms</p>
                </div>
              </div>
            </div>
            <Globe className="w-16 h-16 opacity-50" />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['services', 'mesh', 'databases', 'loadbalancers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
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
                      <div className={`w-3 h-3 rounded-full ${getHealthColor(service.health)}`}></div>
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Version</p>
                      <p className="text-sm font-medium">{service.version}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Instances</p>
                      <p className="text-sm font-medium">{service.instances}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">CPU</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(service.cpu, 100)}`}
                            style={{ width: `${service.cpu}%` }}
                          />
                        </div>
                        <span className="text-xs">{service.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Memory</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(service.memory, 2048)}`}
                            style={{ width: `${(service.memory / 2048) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs">{service.memory}MB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Endpoint</p>
                    <p className="text-sm font-mono text-blue-600">{service.endpoint}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Uptime: {service.uptime}</span>
                    <span>Last deployed: {new Date(service.lastDeployed).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Mesh Tab */}
        {activeTab === 'mesh' && serviceMesh && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Service Mesh Configuration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium capitalize">{serviceMesh.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium capitalize">{serviceMesh.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Endpoints</span>
                    <span className="text-sm font-medium">{serviceMesh.endpoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Requests/sec</span>
                    <span className="text-sm font-medium">{(serviceMesh.requests / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Latency</span>
                    <span className="text-sm font-medium">{serviceMesh.latency}ms</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Enabled Features</h4>
                <div className="space-y-2">
                  {serviceMesh.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Traffic Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Request Routing</h5>
                  <p className="text-sm text-gray-600">Intelligent routing based on service health and latency</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Load Balancing</h5>
                  <p className="text-sm text-gray-600">Automatic load distribution across service instances</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Circuit Breaking</h5>
                  <p className="text-sm text-gray-600">Automatic circuit breaking for failed services</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Databases Tab */}
        {activeTab === 'databases' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {databases.map(database => (
                <div key={database.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">{database.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{database.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDatabaseStatusColor(database.status)}`}>
                      {database.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Nodes</p>
                      <p className="text-sm font-medium">{database.nodes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Size</p>
                      <p className="text-sm font-medium">{database.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Connections</p>
                      <p className="text-sm font-medium">{database.connections}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Replication</p>
                      <p className="text-sm font-medium">{database.replication ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      {database.backup ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span>Backup: {database.backup ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Load Balancers Tab */}
        {activeTab === 'loadbalancers' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loadBalancers.map(lb => (
                <div key={lb.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Network className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold">{lb.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{lb.algorithm}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lb.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lb.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Endpoints</span>
                      <span className="text-sm font-medium">{lb.endpoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Requests/sec</span>
                      <span className="text-sm font-medium">{(lb.requests / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium">{lb.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">System Health Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">Healthy Services</h4>
              <div className="space-y-2">
                {services.filter(s => s.health === 'healthy').map(service => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-yellow-600">Degraded Services</h4>
              <div className="space-y-2">
                {services.filter(s => s.health === 'degraded').map(service => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-red-600">Unhealthy Services</h4>
              <div className="space-y-2">
                {services.filter(s => s.health === 'unhealthy').map(service => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
