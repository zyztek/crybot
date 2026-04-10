/**
 * Infrastructure Optimization Component
 * 
 * Advanced infrastructure management and performance optimization
 * Features resource monitoring, auto-scaling, performance tuning, and cost optimization
 */

import React, { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Wifi, Database, Cloud, Settings, Search, Filter, Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock, Zap, Shield, Globe, BarChart3, PieChart, Target, Monitor, Router, MemoryStick, Network } from 'lucide-react';

interface InfrastructureResource {
  id: string;
  name: string;
  type: 'server' | 'database' | 'cache' | 'storage' | 'network' | 'load_balancer' | 'cdn' | 'container';
  status: 'healthy' | 'warning' | 'critical' | 'offline' | 'maintenance';
  provider: 'aws' | 'gcp' | 'azure' | 'digital_ocean' | 'vultr' | 'linode' | 'on_premise';
  region: string;
  performance: {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_in: number;
    network_out: number;
    response_time: number;
    uptime: number;
    error_rate: number;
  };
  capacity: {
    cpu_cores: number;
    memory_gb: number;
    storage_gb: number;
    bandwidth_mbps: number;
    connections: number;
  };
  costs: {
    hourly_cost: number;
    monthly_cost: number;
    annual_cost: number;
    cost_per_request: number;
  };
  scaling: {
    auto_scaling: boolean;
    min_instances: number;
    max_instances: number;
    current_instances: number;
    target_instances: number;
    scale_up_threshold: number;
    scale_down_threshold: number;
  };
  optimization: {
    last_optimized: string;
    optimization_score: number;
    recommendations: string[];
    potential_savings: number;
  };
}

interface OptimizationStrategy {
  id: string;
  name: string;
  description: string;
  type: 'performance' | 'cost' | 'reliability' | 'security' | 'scalability';
  status: 'planned' | 'active' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  impact: {
    performance_improvement: number;
    cost_reduction: number;
    reliability_increase: number;
    security_enhancement: number;
  };
  implementation: {
    start_date: string;
    end_date?: string;
    progress: number;
    resources_affected: number;
    estimated_duration: number;
    actual_duration?: number;
  };
  results?: {
    actual_performance_improvement: number;
    actual_cost_reduction: number;
    actual_reliability_increase: number;
    roi: number;
  };
}

interface PerformanceMetrics {
  overall: {
    total_resources: number;
    healthy_resources: number;
    average_cpu_usage: number;
    average_memory_usage: number;
    average_response_time: number;
    uptime_percentage: number;
    error_rate: number;
  };
  by_type: Array<{
    type: string;
    count: number;
    average_performance: number;
    cost_efficiency: number;
    reliability: number;
  }>;
  by_provider: Array<{
    provider: string;
    resources: number;
    total_cost: number;
    performance_score: number;
    reliability_score: number;
  }>;
  trends: Array<{
    date: string;
    cpu_usage: number;
    memory_usage: number;
    response_time: number;
    error_rate: number;
    cost: number;
  }>;
}

interface InfrastructureOptimizationConfig {
  auto_optimization: boolean;
  monitoring: {
    real_time: boolean;
    alert_thresholds: {
      cpu_usage: number;
      memory_usage: number;
      disk_usage: number;
      response_time: number;
      error_rate: number;
    };
  };
  scaling: {
    enabled: boolean;
    algorithm: 'reactive' | 'predictive' | 'hybrid';
    cooldown_period: number;
    max_scale_events_per_hour: number;
  };
  cost_optimization: {
    enabled: boolean;
    target_savings: number;
    optimization_frequency: string;
    reserved_instances: boolean;
    spot_instances: boolean;
  };
  performance: {
    caching_enabled: boolean;
    cdn_enabled: boolean;
    load_balancing: boolean;
    database_optimization: boolean;
  };
}

const InfrastructureOptimization: React.FC = () => {
  const [resources, setResources] = useState<InfrastructureResource[]>([
    {
      id: 'resource-1',
      name: 'Web Server 01',
      type: 'server',
      status: 'healthy',
      provider: 'aws',
      region: 'us-east-1',
      performance: {
        cpu_usage: 45.2,
        memory_usage: 62.8,
        disk_usage: 34.5,
        network_in: 125.6,
        network_out: 89.3,
        response_time: 145,
        uptime: 99.97,
        error_rate: 0.03
      },
      capacity: {
        cpu_cores: 4,
        memory_gb: 16,
        storage_gb: 500,
        bandwidth_mbps: 1000,
        connections: 10000
      },
      costs: {
        hourly_cost: 0.156,
        monthly_cost: 112.32,
        annual_cost: 1347.84,
        cost_per_request: 0.0002
      },
      scaling: {
        auto_scaling: true,
        min_instances: 2,
        max_instances: 10,
        current_instances: 3,
        target_instances: 3,
        scale_up_threshold: 70,
        scale_down_threshold: 30
      },
      optimization: {
        last_optimized: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_score: 87.5,
        recommendations: ['Enable compression', 'Optimize database queries'],
        potential_savings: 15.6
      }
    },
    {
      id: 'resource-2',
      name: 'Database Primary',
      type: 'database',
      status: 'healthy',
      provider: 'aws',
      region: 'us-east-1',
      performance: {
        cpu_usage: 67.3,
        memory_usage: 78.9,
        disk_usage: 45.6,
        network_in: 234.5,
        network_out: 156.7,
        response_time: 89,
        uptime: 99.99,
        error_rate: 0.01
      },
      capacity: {
        cpu_cores: 8,
        memory_gb: 32,
        storage_gb: 1000,
        bandwidth_mbps: 2000,
        connections: 5000
      },
      costs: {
        hourly_cost: 0.468,
        monthly_cost: 336.96,
        annual_cost: 4043.52,
        cost_per_request: 0.0008
      },
      scaling: {
        auto_scaling: true,
        min_instances: 1,
        max_instances: 5,
        current_instances: 2,
        target_instances: 2,
        scale_up_threshold: 80,
        scale_down_threshold: 40
      },
      optimization: {
        last_optimized: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_score: 92.3,
        recommendations: ['Add read replicas', 'Optimize indexes'],
        potential_savings: 8.9
      }
    },
    {
      id: 'resource-3',
      name: 'Redis Cache Cluster',
      type: 'cache',
      status: 'healthy',
      provider: 'aws',
      region: 'us-east-1',
      performance: {
        cpu_usage: 23.4,
        memory_usage: 56.7,
        disk_usage: 12.3,
        network_in: 456.8,
        network_out: 234.5,
        response_time: 12,
        uptime: 99.98,
        error_rate: 0.02
      },
      capacity: {
        cpu_cores: 2,
        memory_gb: 8,
        storage_gb: 100,
        bandwidth_mbps: 500,
        connections: 50000
      },
      costs: {
        hourly_cost: 0.089,
        monthly_cost: 64.08,
        annual_cost: 768.96,
        cost_per_request: 0.0001
      },
      scaling: {
        auto_scaling: true,
        min_instances: 3,
        max_instances: 20,
        current_instances: 3,
        target_instances: 3,
        scale_up_threshold: 75,
        scale_down_threshold: 25
      },
      optimization: {
        last_optimized: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_score: 94.7,
        recommendations: ['Increase cache size', 'Implement cache warming'],
        potential_savings: 5.2
      }
    },
    {
      id: 'resource-4',
      name: 'Load Balancer',
      type: 'load_balancer',
      status: 'healthy',
      provider: 'aws',
      region: 'us-east-1',
      performance: {
        cpu_usage: 15.6,
        memory_usage: 34.2,
        disk_usage: 8.9,
        network_in: 567.8,
        network_out: 445.6,
        response_time: 23,
        uptime: 99.99,
        error_rate: 0.01
      },
      capacity: {
        cpu_cores: 2,
        memory_gb: 4,
        storage_gb: 50,
        bandwidth_mbps: 5000,
        connections: 100000
      },
      costs: {
        hourly_cost: 0.038,
        monthly_cost: 27.36,
        annual_cost: 328.32,
        cost_per_request: 0.00005
      },
      scaling: {
        auto_scaling: false,
        min_instances: 1,
        max_instances: 1,
        current_instances: 1,
        target_instances: 1,
        scale_up_threshold: 80,
        scale_down_threshold: 20
      },
      optimization: {
        last_optimized: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_score: 96.8,
        recommendations: ['Optimize health checks', 'Adjust timeout values'],
        potential_savings: 3.4
      }
    }
  ]);

  const [optimizationStrategies, setOptimizationStrategies] = useState<OptimizationStrategy[]>([
    {
      id: 'strategy-1',
      name: 'Database Query Optimization',
      description: 'Optimize slow database queries and add proper indexing',
      type: 'performance',
      status: 'active',
      priority: 'high',
      impact: {
        performance_improvement: 35.6,
        cost_reduction: 12.3,
        reliability_increase: 8.9,
        security_enhancement: 2.1
      },
      implementation: {
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 65,
        resources_affected: 2,
        estimated_duration: 14,
        actual_duration: 9
      }
    },
    {
      id: 'strategy-2',
      name: 'Auto-scaling Configuration',
      description: 'Implement predictive auto-scaling based on traffic patterns',
      type: 'scalability',
      status: 'completed',
      priority: 'medium',
      impact: {
        performance_improvement: 23.4,
        cost_reduction: 18.7,
        reliability_increase: 15.6,
        security_enhancement: 3.2
      },
      implementation: {
        start_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 100,
        resources_affected: 4,
        estimated_duration: 14,
        actual_duration: 14
      },
      results: {
        actual_performance_improvement: 26.8,
        actual_cost_reduction: 21.3,
        actual_reliability_increase: 17.2,
        roi: 245.6
      }
    },
    {
      id: 'strategy-3',
      name: 'CDN Implementation',
      description: 'Deploy CDN for static assets and improve global performance',
      type: 'performance',
      status: 'planned',
      priority: 'medium',
      impact: {
        performance_improvement: 45.2,
        cost_reduction: 8.9,
        reliability_increase: 12.3,
        security_enhancement: 5.6
      },
      implementation: {
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 0,
        resources_affected: 6,
        estimated_duration: 10
      }
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    overall: {
      total_resources: 4,
      healthy_resources: 4,
      average_cpu_usage: 37.9,
      average_memory_usage: 58.2,
      average_response_time: 67.3,
      uptime_percentage: 99.98,
      error_rate: 0.02
    },
    by_type: [
      { type: 'server', count: 1, average_performance: 87.5, cost_efficiency: 78.9, reliability: 99.97 },
      { type: 'database', count: 1, average_performance: 92.3, cost_efficiency: 82.1, reliability: 99.99 },
      { type: 'cache', count: 1, average_performance: 94.7, cost_efficiency: 89.5, reliability: 99.98 },
      { type: 'load_balancer', count: 1, average_performance: 96.8, cost_efficiency: 91.2, reliability: 99.99 }
    ],
    by_provider: [
      { provider: 'aws', resources: 4, total_cost: 540.72, performance_score: 92.8, reliability_score: 99.98 }
    ],
    trends: [
      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), cpu_usage: 42.1, memory_usage: 61.3, response_time: 78.5, error_rate: 0.03, cost: 545.23 },
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), cpu_usage: 38.7, memory_usage: 59.8, response_time: 71.2, error_rate: 0.02, cost: 542.89 },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), cpu_usage: 40.3, memory_usage: 57.9, response_time: 69.4, error_rate: 0.02, cost: 541.56 },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), cpu_usage: 36.8, memory_usage: 58.5, response_time: 65.7, error_rate: 0.01, cost: 540.12 },
      { date: new Date().toISOString(), cpu_usage: 37.9, memory_usage: 58.2, response_time: 67.3, error_rate: 0.02, cost: 540.72 }
    ]
  });

  const [config, setConfig] = useState<InfrastructureOptimizationConfig>({
    auto_optimization: true,
    monitoring: {
      real_time: true,
      alert_thresholds: {
        cpu_usage: 80,
        memory_usage: 85,
        disk_usage: 90,
        response_time: 500,
        error_rate: 5
      }
    },
    scaling: {
      enabled: true,
      algorithm: 'hybrid',
      cooldown_period: 300,
      max_scale_events_per_hour: 10
    },
    cost_optimization: {
      enabled: true,
      target_savings: 20,
      optimization_frequency: 'weekly',
      reserved_instances: true,
      spot_instances: true
    },
    performance: {
      caching_enabled: true,
      cdn_enabled: false,
      load_balancing: true,
      database_optimization: true
    }
  });

  const [selectedResource, setSelectedResource] = useState<InfrastructureResource | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<OptimizationStrategy | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update resource performance with realistic variations
      setResources(prev => prev.map(resource => ({
        ...resource,
        performance: {
          ...resource.performance,
          cpu_usage: Math.max(0, Math.min(100, resource.performance.cpu_usage + (Math.random() * 10) - 5)),
          memory_usage: Math.max(0, Math.min(100, resource.performance.memory_usage + (Math.random() * 8) - 4)),
          network_in: Math.max(0, resource.performance.network_in + (Math.random() * 50) - 25),
          network_out: Math.max(0, resource.performance.network_out + (Math.random() * 40) - 20),
          response_time: Math.max(10, resource.performance.response_time + (Math.random() * 20) - 10),
          error_rate: Math.max(0, resource.performance.error_rate + (Math.random() * 0.02) - 0.01)
        }
      })));

      // Update performance metrics
      setPerformanceMetrics(prev => ({
        ...prev,
        overall: {
          ...prev.overall,
          average_cpu_usage: Math.max(0, Math.min(100, prev.overall.average_cpu_usage + (Math.random() * 5) - 2.5)),
          average_memory_usage: Math.max(0, Math.min(100, prev.overall.average_memory_usage + (Math.random() * 4) - 2)),
          average_response_time: Math.max(10, prev.overall.average_response_time + (Math.random() * 15) - 7.5),
          error_rate: Math.max(0, prev.overall.error_rate + (Math.random() * 0.01) - 0.005)
        },
        trends: [
          ...prev.trends.slice(1),
          {
            date: new Date().toISOString(),
            cpu_usage: prev.overall.average_cpu_usage,
            memory_usage: prev.overall.average_memory_usage,
            response_time: prev.overall.average_response_time,
            error_rate: prev.overall.error_rate,
            cost: prev.trends[prev.trends.length - 1].cost + (Math.random() * 10) - 5
          }
        ]
      }));

      // Update optimization strategies
      setOptimizationStrategies(prev => prev.map(strategy => {
        if (strategy.status === 'active') {
          return {
            ...strategy,
            implementation: {
              ...strategy.implementation,
              progress: Math.min(100, strategy.implementation.progress + Math.random() * 5)
            }
          };
        }
        return strategy;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getResourceTypeIcon = (type: InfrastructureResource['type']) => {
    switch (type) {
      case 'server': return <Server className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'cache': return <MemoryStick className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      case 'network': return <Network className="w-4 h-4" />;
      case 'load_balancer': return <Router className="w-4 h-4" />;
      case 'cdn': return <Globe className="w-4 h-4" />;
      case 'container': return <Cloud className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getResourceTypeColor = (type: InfrastructureResource['type']) => {
    switch (type) {
      case 'server': return 'bg-blue-600';
      case 'database': return 'bg-green-600';
      case 'cache': return 'bg-purple-600';
      case 'storage': return 'bg-orange-600';
      case 'network': return 'bg-red-600';
      case 'load_balancer': return 'bg-yellow-600';
      case 'cdn': return 'bg-indigo-600';
      case 'container': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      case 'offline': return 'bg-gray-600';
      case 'maintenance': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredResources = () => {
    return resources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || resource.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Server className="w-8 h-8 text-blue-400" />
            Infrastructure Optimization
          </h1>
          <p className="text-gray-400">
            Advanced infrastructure management and performance optimization
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Healthy Resources</div>
                <div className="text-2xl font-bold">{performanceMetrics.overall.healthy_resources}/{performanceMetrics.overall.total_resources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Avg CPU Usage</div>
                <div className="text-2xl font-bold">{performanceMetrics.overall.average_cpu_usage.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Response Time</div>
                <div className="text-2xl font-bold">{performanceMetrics.overall.average_response_time.toFixed(0)}ms</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Monthly Cost</div>
                <div className="text-2xl font-bold">${performanceMetrics.by_provider[0].total_cost.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Infrastructure Control Center</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{performanceMetrics.overall.uptime_percentage.toFixed(2)}%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{performanceMetrics.overall.error_rate.toFixed(3)}%</div>
              <div className="text-sm text-gray-400">Error Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{optimizationStrategies.filter(s => s.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Optimizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{resources.filter(r => r.scaling.auto_scaling).length}</div>
              <div className="text-sm text-gray-400">Auto-scaling Enabled</div>
            </div>
          </div>
        </div>

        {/* Infrastructure Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Infrastructure Resources</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="server">Server</option>
                <option value="database">Database</option>
                <option value="cache">Cache</option>
                <option value="storage">Storage</option>
                <option value="load_balancer">Load Balancer</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredResources().map((resource) => (
                <div
                  key={resource.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedResource?.id === resource.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(resource.status)}`}></div>
                      <div className="flex items-center gap-2">
                        {getResourceTypeIcon(resource.type)}
                        <div>
                          <h4 className="font-semibold">{resource.name}</h4>
                          <div className="text-sm text-gray-400">{resource.provider} - {resource.region}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getResourceTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">CPU:</span> {resource.performance.cpu_usage.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Memory:</span> {resource.performance.memory_usage.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Response:</span> {resource.performance.response_time}ms
                    </div>
                    <div>
                      <span className="text-gray-400">Uptime:</span> {resource.performance.uptime.toFixed(2)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Instances:</span> {resource.scaling.current_instances}/{resource.scaling.max_instances}
                    </div>
                    <div>
                      <span className="text-gray-400">Monthly Cost:</span> ${resource.costs.monthly_cost.toFixed(2)}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${resource.performance.cpu_usage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {resource.scaling.auto_scaling && (
                        <span className="px-2 py-1 rounded text-xs bg-green-600">
                          Auto-scaling
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Score: {resource.optimization.optimization_score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredResources().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No resources found
              </div>
            )}
          </div>

          {/* Selected Resource Details */}
          {selectedResource && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Resource Details: {selectedResource.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Usage:</span>
                        <span className="font-medium">{selectedResource.performance.cpu_usage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory Usage:</span>
                        <span className="font-medium">{selectedResource.performance.memory_usage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Disk Usage:</span>
                        <span className="font-medium">{selectedResource.performance.disk_usage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="font-medium">{selectedResource.performance.response_time}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="font-medium">{selectedResource.performance.uptime.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Error Rate:</span>
                        <span className="font-medium">{selectedResource.performance.error_rate.toFixed(3)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Capacity & Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Cores:</span>
                        <span className="font-medium">{selectedResource.capacity.cpu_cores}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory:</span>
                        <span className="font-medium">{selectedResource.capacity.memory_gb}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage:</span>
                        <span className="font-medium">{selectedResource.capacity.storage_gb}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bandwidth:</span>
                        <span className="font-medium">{selectedResource.capacity.bandwidth_mbps}Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Hourly Cost:</span>
                        <span className="font-medium">${selectedResource.costs.hourly_cost.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Cost:</span>
                        <span className="font-medium">${selectedResource.costs.monthly_cost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Auto-scaling Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auto-scaling:</span>
                        <span className="font-medium">{selectedResource.scaling.auto_scaling ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Instances:</span>
                        <span className="font-medium">{selectedResource.scaling.min_instances}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Instances:</span>
                        <span className="font-medium">{selectedResource.scaling.max_instances}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Instances:</span>
                        <span className="font-medium">{selectedResource.scaling.current_instances}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scale Up Threshold:</span>
                        <span className="font-medium">{selectedResource.scaling.scale_up_threshold}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scale Down Threshold:</span>
                        <span className="font-medium">{selectedResource.scaling.scale_down_threshold}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Optimization</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Optimization Score:</span>
                        <span className="font-medium">{selectedResource.optimization.optimization_score.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Potential Savings:</span>
                        <span className="font-medium text-green-400">{selectedResource.optimization.potential_savings.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Optimized:</span>
                        <span className="font-medium">{new Date(selectedResource.optimization.last_optimized).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {selectedResource.optimization.recommendations.length > 0 && (
                      <div className="mt-3">
                        <h5 className="font-medium text-sm text-orange-400 mb-2">Recommendations</h5>
                        <div className="space-y-1">
                          {selectedResource.optimization.recommendations.map((rec, index) => (
                            <div key={index} className="text-xs text-gray-300">
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Optimization Strategies */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Optimization Strategies</h3>
          <div className="space-y-4">
            {optimizationStrategies.map((strategy) => (
              <div key={strategy.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{strategy.name}</h4>
                    <div className="text-sm text-gray-400">{strategy.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(strategy.priority)}`}>
                      {strategy.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(strategy.status)}`}>
                      {strategy.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Expected Impact</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance:</span>
                        <span className="text-green-400">{strategy.impact.performance_improvement.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Reduction:</span>
                        <span className="text-blue-400">{strategy.impact.cost_reduction.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reliability:</span>
                        <span className="text-purple-400">{strategy.impact.reliability_increase.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Implementation</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span>{strategy.implementation.progress.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resources Affected:</span>
                        <span>{strategy.implementation.resources_affected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span>{strategy.implementation.estimated_duration} days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Type</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="capitalize">{strategy.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span>{new Date(strategy.implementation.start_date).toLocaleDateString()}</span>
                      </div>
                      {strategy.implementation.end_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Completed:</span>
                          <span>{new Date(strategy.implementation.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${strategy.implementation.progress}%` }}
                  ></div>
                </div>

                {strategy.results && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-green-400">Actual Results</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance Improvement:</span>
                        <span className="text-green-400">{strategy.results.actual_performance_improvement.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Reduction:</span>
                        <span className="text-blue-400">{strategy.results.actual_cost_reduction.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reliability Increase:</span>
                        <span className="text-purple-400">{strategy.results.actual_reliability_increase.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-orange-400">{strategy.results.roi.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
            <div className="space-y-3">
              {performanceMetrics.trends.slice(-5).map((trend, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{new Date(trend.date).toLocaleDateString()}</h4>
                    <span className="text-sm text-gray-400">
                      Cost: ${trend.cost.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">CPU:</span>
                      <span>{trend.cpu_usage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory:</span>
                      <span>{trend.memory_usage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response:</span>
                      <span>{trend.response_time.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Error Rate:</span>
                      <span>{trend.error_rate.toFixed(3)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resource Performance by Type</h3>
            <div className="space-y-3">
              {performanceMetrics.by_type.map((type) => (
                <div key={type.type} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize">{type.type.replace('_', ' ')}</h4>
                    <span className="text-sm text-gray-400">
                      {type.count} resources
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Performance:</span>
                      <span>{type.average_performance.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost Efficiency:</span>
                      <span>{type.cost_efficiency.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reliability:</span>
                      <span>{type.reliability.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${type.average_performance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Infrastructure Optimization Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Optimization Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.auto_optimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, auto_optimization: e.target.checked }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Auto Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.real_time}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, real_time: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Real-time Monitoring</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scaling.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          scaling: { ...prev.scaling, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Auto-scaling</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.cost_optimization.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          cost_optimization: { ...prev.cost_optimization, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Cost Optimization</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Alert Thresholds</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">CPU Usage (%)</label>
                      <input
                        type="number"
                        value={config.monitoring.alert_thresholds.cpu_usage}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { 
                            ...prev.monitoring, 
                            alert_thresholds: { ...prev.monitoring.alert_thresholds, cpu_usage: parseFloat(e.target.value) }
                          }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Memory Usage (%)</label>
                      <input
                        type="number"
                        value={config.monitoring.alert_thresholds.memory_usage}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { 
                            ...prev.monitoring, 
                            alert_thresholds: { ...prev.monitoring.alert_thresholds, memory_usage: parseFloat(e.target.value) }
                          }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Response Time (ms)</label>
                      <input
                        type="number"
                        value={config.monitoring.alert_thresholds.response_time}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { 
                            ...prev.monitoring, 
                            alert_thresholds: { ...prev.monitoring.alert_thresholds, response_time: parseFloat(e.target.value) }
                          }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Error Rate (%)</label>
                      <input
                        type="number"
                        value={config.monitoring.alert_thresholds.error_rate}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { 
                            ...prev.monitoring, 
                            alert_thresholds: { ...prev.monitoring.alert_thresholds, error_rate: parseFloat(e.target.value) }
                          }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfrastructureOptimization;
