/**
 * Scaling Growth Engine Component
 * 
 * Scaling and growth engine that automatically expands capabilities as resources and personas increase
 * Manages exponential growth, resource allocation, and strategic expansion planning
 */

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Rocket, Globe, Brain } from 'lucide-react';

interface GrowthMetric {
  id: string;
  name: string;
  category: 'resource' | 'persona' | 'capability' | 'revenue' | 'efficiency' | 'intelligence' | 'influence' | 'reach';
  currentValue: number;
  previousValue: number;
  targetValue: number;
  growthRate: number; // percentage
  trend: 'increasing' | 'decreasing' | 'stable';
  unit: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
}

interface ScalingStrategy {
  id: string;
  name: string;
  type: 'linear' | 'exponential' | 'logarithmic' | 'sigmoid' | 'custom';
  category: 'resource' | 'persona' | 'capability' | 'market' | 'technology';
  description: string;
  parameters: {
    growthRate: number; // multiplier
    scalingFactor: number;
    threshold: number;
    cooldown: number; // minutes
    maxCapacity: number;
    efficiency: number; // 0-100
  };
  triggers: {
    resourceUtilization: number; // percentage
    personaCount: number;
    revenueTarget: number;
    marketShare: number;
    timeInterval: number; // hours
  };
  actions: {
    resourceAllocation: string[];
    personaCreation: string[];
    capabilityDeployment: string[];
    marketExpansion: string[];
    technologyUpgrade: string[];
  };
  performance: {
    successRate: number; // 0-100
    averageGrowth: number;
    efficiency: number;
    costEffectiveness: number;
    timeToScale: number; // minutes
  };
  status: 'active' | 'paused' | 'testing' | 'optimizing' | 'error';
  isActive: boolean;
  priority: number;
  createdAt: string;
  lastExecuted: string;
}

interface GrowthTarget {
  id: string;
  name: string;
  category: 'short_term' | 'medium_term' | 'long_term' | 'strategic';
  description: string;
  metrics: {
    targetValue: number;
    currentValue: number;
    progress: number; // 0-100
    deadline: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
  requirements: {
    resources: string[];
    personas: string[];
    capabilities: string[];
    technologies: string[];
    investments: string[];
  };
  rewards: {
    benefits: string[];
    capabilities: string[];
    marketPosition: string[];
    competitiveAdvantage: string[];
  };
  status: 'planning' | 'in_progress' | 'achieved' | 'missed' | 'cancelled';
  milestones: Array<{
    name: string;
    description: string;
    targetDate: string;
    achieved: boolean;
    achievedDate?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ScalingConfig {
  autoScaling: boolean;
  growthMode: 'conservative' | 'balanced' | 'aggressive' | 'exponential';
  resourceManagement: {
    autoAllocation: boolean;
    loadBalancing: boolean;
    optimization: boolean;
    monitoring: boolean;
  };
  personaManagement: {
    autoCreation: boolean;
    specialization: boolean;
    training: boolean;
    deployment: boolean;
  };
  capabilityManagement: {
    autoDeployment: boolean;
    integration: boolean;
    optimization: boolean;
    innovation: boolean;
  };
  marketManagement: {
    expansionEnabled: boolean;
    competitionMonitoring: boolean;
    opportunityScanning: boolean;
    riskAssessment: boolean;
  };
  limits: {
    maxPersonas: number;
    maxResources: number;
    maxCapabilities: number;
    maxGrowthRate: number;
    budgetLimit: number;
    riskThreshold: number;
  };
  notifications: {
    growthAlerts: boolean;
    targetAchievements: boolean;
    resourceShortages: boolean;
    performanceIssues: boolean;
    strategicUpdates: boolean;
  };
}

const ScalingGrowthEngine: React.FC = () => {
  const [metrics, setMetrics] = useState<GrowthMetric[]>([]);
  const [strategies, setStrategies] = useState<ScalingStrategy[]>([]);
  const [targets, setTargets] = useState<GrowthTarget[]>([]);
  const [config, setConfig] = useState<ScalingConfig>({
    autoScaling: true,
    growthMode: 'balanced',
    resourceManagement: {
      autoAllocation: true,
      loadBalancing: true,
      optimization: true,
      monitoring: true
    },
    personaManagement: {
      autoCreation: true,
      specialization: true,
      training: true,
      deployment: true
    },
    capabilityManagement: {
      autoDeployment: true,
      integration: true,
      optimization: true,
      innovation: true
    },
    marketManagement: {
      expansionEnabled: true,
      competitionMonitoring: true,
      opportunityScanning: true,
      riskAssessment: true
    },
    limits: {
      maxPersonas: 1000,
      maxResources: 10000,
      maxCapabilities: 500,
      maxGrowthRate: 1000,
      budgetLimit: 10000000,
      riskThreshold: 80
    },
    notifications: {
      growthAlerts: true,
      targetAchievements: true,
      resourceShortages: true,
      performanceIssues: true,
      strategicUpdates: true
    }
  });
  const [selectedMetric, setSelectedMetric] = useState<GrowthMetric | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<ScalingStrategy | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<GrowthTarget | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalMetrics: 0,
    activeStrategies: 0,
    achievedTargets: 0,
    averageGrowthRate: 0,
    totalGrowth: 0,
    efficiency: 0,
    bestCategory: '',
    nextMilestone: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock growth metrics initialization
  useEffect(() => {
    const mockMetrics: GrowthMetric[] = [
      {
        id: 'metric-1',
        name: 'Active Personas',
        category: 'persona',
        currentValue: 156,
        previousValue: 142,
        targetValue: 500,
        growthRate: 9.9,
        trend: 'increasing',
        unit: 'personas',
        priority: 'high',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'metric-2',
        name: 'Computational Resources',
        category: 'resource',
        currentValue: 2847,
        previousValue: 2456,
        targetValue: 5000,
        growthRate: 15.9,
        trend: 'increasing',
        unit: 'cores',
        priority: 'high',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'metric-3',
        name: 'AI Capabilities',
        category: 'capability',
        currentValue: 89,
        previousValue: 76,
        targetValue: 200,
        growthRate: 17.1,
        trend: 'increasing',
        unit: 'capabilities',
        priority: 'high',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'metric-4',
        name: 'Monthly Revenue',
        category: 'revenue',
        currentValue: 45780,
        previousValue: 38920,
        targetValue: 100000,
        growthRate: 17.6,
        trend: 'increasing',
        unit: 'USD',
        priority: 'critical',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'metric-5',
        name: 'Market Influence',
        category: 'influence',
        currentValue: 67,
        previousValue: 58,
        targetValue: 85,
        growthRate: 15.5,
        trend: 'increasing',
        unit: 'score',
        priority: 'medium',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'metric-6',
        name: 'Global Reach',
        category: 'reach',
        currentValue: 124,
        previousValue: 98,
        targetValue: 500,
        growthRate: 26.5,
        trend: 'increasing',
        unit: 'countries',
        priority: 'medium',
        lastUpdated: new Date().toISOString()
      }
    ];

    setMetrics(mockMetrics);
  }, []);

  // Mock scaling strategies initialization
  useEffect(() => {
    const mockStrategies: ScalingStrategy[] = [
      {
        id: 'strategy-1',
        name: 'Exponential Persona Growth',
        type: 'exponential',
        category: 'persona',
        description: 'Rapidly scale persona count based on resource availability and market demand',
        parameters: {
          growthRate: 1.5,
          scalingFactor: 2.0,
          threshold: 80,
          cooldown: 60,
          maxCapacity: 1000,
          efficiency: 85
        },
        triggers: {
          resourceUtilization: 85,
          personaCount: 100,
          revenueTarget: 50000,
          marketShare: 10,
          timeInterval: 24
        },
        actions: {
          resourceAllocation: ['CPU allocation', 'Memory assignment', 'Storage provisioning'],
          personaCreation: ['Specialized personas', 'Cross-trained personas', 'Multi-skilled personas'],
          capabilityDeployment: ['AI models', 'Automation tools', 'Communication systems'],
          marketExpansion: ['New markets', 'Service offerings', 'Partnerships'],
          technologyUpgrade: ['Hardware upgrades', 'Software updates', 'Infrastructure expansion']
        },
        performance: {
          successRate: 92.5,
          averageGrowth: 15.8,
          efficiency: 87.2,
          costEffectiveness: 78.9,
          timeToScale: 45
        },
        status: 'active',
        isActive: true,
        priority: 1,
        createdAt: '2024-01-15T00:00:00Z',
        lastExecuted: new Date().toISOString()
      },
      {
        id: 'strategy-2',
        name: 'Resource Optimization Scaling',
        type: 'sigmoid',
        category: 'resource',
        description: 'Intelligently scale resources based on demand patterns and efficiency metrics',
        parameters: {
          growthRate: 1.3,
          scalingFactor: 1.8,
          threshold: 75,
          cooldown: 30,
          maxCapacity: 10000,
          efficiency: 92
        },
        triggers: {
          resourceUtilization: 80,
          personaCount: 50,
          revenueTarget: 25000,
          marketShare: 5,
          timeInterval: 12
        },
        actions: {
          resourceAllocation: ['Load balancing', 'Resource pooling', 'Dynamic allocation'],
          personaCreation: ['Resource-efficient personas', 'Lightweight personas'],
          capabilityDeployment: ['Efficiency tools', 'Monitoring systems', 'Optimization algorithms'],
          marketExpansion: ['Cost-effective markets', 'Premium services'],
          technologyUpgrade: ['Efficiency improvements', 'Cost optimization']
        },
        performance: {
          successRate: 88.7,
          averageGrowth: 12.3,
          efficiency: 91.5,
          costEffectiveness: 85.2,
          timeToScale: 30
        },
        status: 'active',
        isActive: true,
        priority: 2,
        createdAt: '2024-01-10T00:00:00Z',
        lastExecuted: new Date().toISOString()
      },
      {
        id: 'strategy-3',
        name: 'Capability Expansion',
        type: 'linear',
        category: 'capability',
        description: 'Systematically expand AI and automation capabilities based on market needs',
        parameters: {
          growthRate: 1.2,
          scalingFactor: 1.5,
          threshold: 70,
          cooldown: 45,
          maxCapacity: 500,
          efficiency: 88
        },
        triggers: {
          resourceUtilization: 70,
          personaCount: 25,
          revenueTarget: 30000,
          marketShare: 8,
          timeInterval: 48
        },
        actions: {
          resourceAllocation: ['Capability deployment', 'Model training', 'Tool integration'],
          personaCreation: ['Specialized personas', 'Expert personas'],
          capabilityDeployment: ['New AI models', 'Advanced automation', 'Enhanced tools'],
          marketExpansion: ['Capability-based services', 'Premium offerings'],
          technologyUpgrade: ['Capability upgrades', 'Model improvements']
        },
        performance: {
          successRate: 85.3,
          averageGrowth: 10.7,
          efficiency: 86.8,
          costEffectiveness: 82.1,
          timeToScale: 60
        },
        status: 'active',
        isActive: true,
        priority: 3,
        createdAt: '2024-01-08T00:00:00Z',
        lastExecuted: new Date().toISOString()
      }
    ];

    setStrategies(mockStrategies);
  }, []);

  // Mock growth targets initialization
  useEffect(() => {
    const mockTargets: GrowthTarget[] = [
      {
        id: 'target-1',
        name: 'Q2 2024 Persona Expansion',
        category: 'short_term',
        description: 'Reach 500 active personas by end of Q2 2024',
        metrics: {
          targetValue: 500,
          currentValue: 156,
          progress: 31.2,
          deadline: '2024-06-30T23:59:59Z',
          priority: 'high'
        },
        requirements: {
          resources: ['VPS instances', 'GPU resources', 'Storage capacity'],
          personas: ['Specialized personas', 'Cross-trained personas'],
          capabilities: ['AI models', 'Automation tools', 'Communication systems'],
          technologies: ['Deep learning', 'Natural language processing', 'Computer vision'],
          investments: ['Infrastructure', 'Training data', 'Software licenses']
        },
        rewards: {
          benefits: ['Increased market coverage', 'Higher revenue potential', 'Competitive advantage'],
          capabilities: ['Advanced automation', 'Enhanced AI capabilities', 'Scalable infrastructure'],
          marketPosition: ['Market leader', 'Innovation pioneer', 'Service provider'],
          competitiveAdvantage: ['Scale advantage', 'Capability diversity', 'Technology leadership']
        },
        status: 'in_progress',
        milestones: [
          {
            name: '250 Personas',
            description: 'Reach 250 active personas',
            targetDate: '2024-04-30T23:59:59Z',
            achieved: false
          },
          {
            name: '375 Personas',
            description: 'Reach 375 active personas',
            targetDate: '2024-05-31T23:59:59Z',
            achieved: false
          },
          {
            name: '500 Personas',
            description: 'Reach 500 active personas',
            targetDate: '2024-06-30T23:59:59Z',
            achieved: false
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      },
      {
        id: 'target-2',
        name: 'Annual Revenue Goal',
        category: 'long_term',
        description: 'Achieve $1M annual revenue by end of 2024',
        metrics: {
          targetValue: 1000000,
          currentValue: 45780,
          progress: 4.6,
          deadline: '2024-12-31T23:59:59Z',
          priority: 'critical'
        },
        requirements: {
          resources: ['Enterprise infrastructure', 'Advanced AI models', 'Global presence'],
          personas: ['Expert personas', 'Executive personas', 'Specialist personas'],
          capabilities: ['Enterprise AI', 'Advanced automation', 'Global operations'],
          technologies: ['Enterprise AI', 'Cloud infrastructure', 'Advanced analytics'],
          investments: ['Major infrastructure', 'Enterprise licenses', 'Global expansion']
        },
        rewards: {
          benefits: ['Financial independence', 'Market dominance', 'Sustainable growth'],
          capabilities: ['Enterprise operations', 'Global infrastructure', 'Advanced AI'],
          marketPosition: ['Market leader', 'Enterprise provider', 'Global presence'],
          competitiveAdvantage: ['Scale advantage', 'Technology leadership', 'Global reach']
        },
        status: 'in_progress',
        milestones: [
          {
            name: '$250K Revenue',
            description: 'Reach $250K annual revenue',
            targetDate: '2024-06-30T23:59:59Z',
            achieved: false
          },
          {
            name: '$500K Revenue',
            description: 'Reach $500K annual revenue',
            targetDate: '2024-09-30T23:59:59Z',
            achieved: false
          },
          {
            name: '$1M Revenue',
            description: 'Reach $1M annual revenue',
            targetDate: '2024-12-31T23:59:59Z',
            achieved: false
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];

    setTargets(mockTargets);
  }, []);

  // Auto scaling simulation
  useEffect(() => {
    if (!config.autoScaling || !isOperating) return;

    const interval = setInterval(() => {
      // Update metrics with growth
      setMetrics(prev => prev.map(metric => {
        const growthFactor = config.growthMode === 'exponential' ? 1.05 : 
                            config.growthMode === 'aggressive' ? 1.03 : 
                            config.growthMode === 'balanced' ? 1.02 : 1.01;
        
        const newValue = Math.min(metric.targetValue, metric.currentValue * growthFactor);
        const actualGrowthRate = ((newValue - metric.currentValue) / metric.currentValue) * 100;
        
        return {
          ...metric,
          previousValue: metric.currentValue,
          currentValue: newValue,
          growthRate: actualGrowthRate,
          lastUpdated: new Date().toISOString()
        };
      }));

      // Execute strategies based on triggers
      strategies.forEach(strategy => {
        if (!strategy.isActive) return;

        const shouldExecute = Math.random() > 0.7; // 30% chance per interval
        
        if (shouldExecute) {
          setStrategies(prev => prev.map(s => 
            s.id === strategy.id 
              ? {
                  ...s,
                  lastExecuted: new Date().toISOString(),
                  performance: {
                    ...s.performance,
                    successRate: Math.min(100, s.performance.successRate + Math.random() * 2),
                    averageGrowth: s.performance.averageGrowth + Math.random() * 0.5
                  }
                }
              : s
          ));
        }
      });

      // Update target progress
      setTargets(prev => prev.map(target => {
        const relatedMetric = metrics.find(m => 
          m.category === 'persona' && target.name.includes('Persona') ||
          m.category === 'revenue' && target.name.includes('Revenue')
        );
        
        if (relatedMetric) {
          const progress = (relatedMetric.currentValue / target.metrics.targetValue) * 100;
          
          return {
            ...target,
            metrics: {
              ...target.metrics,
              currentValue: relatedMetric.currentValue,
              progress: Math.min(100, progress)
            },
            updatedAt: new Date().toISOString()
          };
        }
        
        return target;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.autoScaling, config.growthMode, isOperating, metrics, strategies]);

  // Update stats
  useEffect(() => {
    const activeStrategies = strategies.filter(s => s.isActive).length;
    const achievedTargets = targets.filter(t => t.status === 'achieved').length;
    const averageGrowthRate = metrics.length > 0 
      ? metrics.reduce((sum, m) => sum + m.growthRate, 0) / metrics.length 
      : 0;
    const totalGrowth = metrics.reduce((sum, m) => sum + (m.currentValue - m.previousValue), 0);
    const efficiency = strategies.length > 0 
      ? strategies.reduce((sum, s) => sum + s.performance.efficiency, 0) / strategies.length 
      : 0;
    
    const categoryCounts = metrics.reduce((acc, metric) => {
      acc[metric.category] = (acc[metric.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestCategory = Object.entries(categoryCounts).reduce((best, [category, count]) => 
      count > (best?.count || 0) ? { category, count } : best, null as { category: string; count: number } | null);
    
    const nextMilestone = targets.find(t => t.status === 'in_progress')?.milestones.find(m => !m.achieved);

    setStats({
      totalMetrics: metrics.length,
      activeStrategies,
      achievedTargets,
      averageGrowthRate,
      totalGrowth,
      efficiency,
      bestCategory: bestCategory?.category || '',
      nextMilestone: nextMilestone?.name || ''
    });
  }, [metrics, strategies, targets]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const executeStrategy = (strategyId: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? {
            ...strategy,
            status: 'optimizing'
          }
        : strategy
    ));

    // Simulate strategy execution
    setTimeout(() => {
      setStrategies(prev => prev.map(strategy => 
        strategy.id === strategyId 
          ? {
              ...strategy,
              status: 'active',
              lastExecuted: new Date().toISOString(),
              performance: {
                ...strategy.performance,
                successRate: Math.min(100, strategy.performance.successRate + Math.random() * 5),
                timeToScale: Math.max(10, strategy.performance.timeToScale - Math.random() * 10)
              }
            }
          : strategy
      ));
    }, 15000); // 15 seconds
  };

  const createTarget = () => {
    const categories: GrowthTarget['category'][] = ['short_term', 'medium_term', 'long_term'];
    const priorities: GrowthTarget['metrics']['priority'][] = ['low', 'medium', 'high', 'critical'];
    
    const newTarget: GrowthTarget = {
      id: `target-${Date.now()}`,
      name: `New Growth Target ${targets.length + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: 'Automatically generated growth target',
      metrics: {
        targetValue: Math.floor(Math.random() * 1000) + 100,
        currentValue: 0,
        progress: 0,
        deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      },
      requirements: {
        resources: ['Infrastructure', 'Computing resources'],
        personas: ['Specialized personas'],
        capabilities: ['AI capabilities', 'Automation tools'],
        technologies: ['Machine learning', 'Natural language processing'],
        investments: ['Infrastructure investment', 'Technology investment']
      },
      rewards: {
        benefits: ['Increased capabilities', 'Market expansion'],
        capabilities: ['Advanced features', 'Enhanced performance'],
        marketPosition: ['Competitive advantage', 'Market leadership'],
        competitiveAdvantage: ['Scale advantage', 'Technology edge']
      },
      status: 'planning',
      milestones: [
        {
          name: '25% Progress',
          description: 'Reach 25% of target',
          targetDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          achieved: false
        },
        {
          name: '50% Progress',
          description: 'Reach 50% of target',
          targetDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
          achieved: false
        },
        {
          name: '75% Progress',
          description: 'Reach 75% of target',
          targetDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          achieved: false
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTargets(prev => [...prev, newTarget]);
  };

  const getCategoryColor = (category: GrowthMetric['category']) => {
    switch (category) {
      case 'resource': return 'bg-blue-600';
      case 'persona': return 'bg-green-600';
      case 'capability': return 'bg-purple-600';
      case 'revenue': return 'bg-yellow-600';
      case 'efficiency': return 'bg-orange-600';
      case 'intelligence': return 'bg-red-600';
      case 'influence': return 'bg-pink-600';
      case 'reach': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrendIcon = (trend: GrowthMetric['trend']) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      case 'stable': return <TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />;
      default: return null;
    }
  };

  const getFilteredMetrics = () => {
    return metrics.filter(metric => {
      const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           metric.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || metric.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-purple-400" />
            Scaling Growth Engine
          </h1>
          <p className="text-gray-400">
            Scaling and growth engine that automatically expands capabilities as resources and personas increase
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Metrics</div>
                <div className="text-2xl font-bold">{stats.totalMetrics}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Strategies</div>
                <div className="text-2xl font-bold">{stats.activeStrategies}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Achieved Targets</div>
                <div className="text-2xl font-bold">{stats.achievedTargets}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Growth Rate</div>
                <div className="text-2xl font-bold">{stats.averageGrowthRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Efficiency</div>
                <div className="text-2xl font-bold">{stats.efficiency.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Growth Operations</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleOperation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isOperating
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isOperating ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Scaling
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Scaling
                  </>
                )}
              </button>
              <button
                onClick={createTarget}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Target className="w-4 h-4" />
                Create Target
              </button>
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
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              Best Category: {stats.bestCategory || 'None'} | 
              Next Milestone: {stats.nextMilestone || 'None'} | 
              Growth Mode: {config.growthMode}
            </span>
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Growth Metrics</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search metrics..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="resource">Resources</option>
                <option value="persona">Personas</option>
                <option value="capability">Capabilities</option>
                <option value="revenue">Revenue</option>
                <option value="influence">Influence</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredMetrics().map((metric) => (
                <div
                  key={metric.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMetric?.id === metric.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedMetric(metric)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${metric.trend === 'increasing' ? 'bg-green-500' : metric.trend === 'decreasing' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{metric.name}</h4>
                        <div className="text-sm text-gray-400">{metric.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(metric.category)}`}>
                        {metric.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        metric.priority === 'critical' ? 'bg-red-600' :
                        metric.priority === 'high' ? 'bg-orange-600' :
                        metric.priority === 'medium' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}>
                        {metric.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Current:</span> {metric.currentValue} {metric.unit}
                    </div>
                    <div>
                      <span className="text-gray-400">Target:</span> {metric.targetValue} {metric.unit}
                    </div>
                    <div>
                      <span className="text-gray-400">Growth:</span> {metric.growthRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Trend:</span> {metric.trend}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(metric.currentValue / metric.targetValue) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className="text-xs text-gray-400">
                        {metric.currentValue - metric.previousValue > 0 ? '+' : ''}{(metric.currentValue - metric.previousValue).toFixed(1)} {metric.unit}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Updated: {new Date(metric.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredMetrics().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No metrics found
              </div>
            )}
          </div>

          {/* Selected Metric Details */}
          {selectedMetric && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Metric Details: {selectedMetric.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Current Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Value:</span>
                        <span className="font-medium">{selectedMetric.currentValue} {selectedMetric.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Previous Value:</span>
                        <span className="font-medium">{selectedMetric.previousValue} {selectedMetric.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-medium">{selectedMetric.growthRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trend:</span>
                        <span className="font-medium capitalize">{selectedMetric.trend}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Target Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Value:</span>
                        <span className="font-medium">{selectedMetric.targetValue} {selectedMetric.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span className="font-medium">{((selectedMetric.currentValue / selectedMetric.targetValue) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority:</span>
                        <span className="font-medium capitalize">{selectedMetric.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedMetric.lastUpdated).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scaling Strategies */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Scaling Strategies</h3>
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{strategy.name}</h4>
                    <div className="text-sm text-gray-400">{strategy.type} - {strategy.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${strategy.isActive ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {strategy.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      Priority: {strategy.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Growth Rate:</span> {strategy.parameters.growthRate}x
                  </div>
                  <div>
                    <span className="text-gray-400">Scaling Factor:</span> {strategy.parameters.scalingFactor}x
                  </div>
                  <div>
                    <span className="text-gray-400">Efficiency:</span> {strategy.parameters.efficiency}%
                  </div>
                  <div>
                    <span className="text-gray-400">Success Rate:</span> {strategy.performance.successRate.toFixed(1)}%
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${strategy.performance.efficiency}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Avg Growth: {strategy.performance.averageGrowth.toFixed(1)}% | 
                      Time to Scale: {strategy.performance.timeToScale}min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {strategy.isActive && (
                      <button
                        onClick={() => executeStrategy(strategy.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Execute
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Growth Engine Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Growth Configuration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoScaling}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoScaling: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Scaling</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.resourceManagement.autoAllocation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          resourceManagement: { ...prev.resourceManagement, autoAllocation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Allocation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.personaManagement.autoCreation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          personaManagement: { ...prev.personaManagement, autoCreation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Creation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.capabilityManagement.autoDeployment}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          capabilityManagement: { ...prev.capabilityManagement, autoDeployment: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Deployment</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Growth Mode</h4>
                  <select
                    value={config.growthMode}
                    onChange={(e) => setConfig(prev => ({ ...prev, growthMode: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="balanced">Balanced</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="exponential">Exponential</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Limits & Thresholds</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Personas</label>
                      <input
                        type="number"
                        value={config.limits.maxPersonas}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, maxPersonas: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="10000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Resources</label>
                      <input
                        type="number"
                        value={config.limits.maxResources}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, maxResources: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="100000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Growth Rate</label>
                      <input
                        type="number"
                        value={config.limits.maxGrowthRate}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, maxGrowthRate: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Risk Threshold</label>
                      <input
                        type="number"
                        value={config.limits.riskThreshold}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, riskThreshold: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
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
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
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

export default ScalingGrowthEngine;
