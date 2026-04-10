/**
 * Marketplace Optimization Component
 * 
 * Advanced analytics and optimization for marketplace performance
 * Features real-time monitoring, A/B testing, and automated optimization strategies
 */

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target, Zap, Settings, Search, Filter, Calendar, DollarSign, Users, Eye, MousePointer, ShoppingCart, Star, AlertTriangle, CheckCircle, XCircle, Clock, Award, Globe, Brain, Lightbulb } from 'lucide-react';

interface MarketplaceMetrics {
  total_listings: number;
  active_listings: number;
  total_views: number;
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
  average_rating: number;
  conversion_rate: number;
  click_through_rate: number;
  average_order_value: number;
  customer_satisfaction: number;
  market_share: number;
  competitor_analysis: {
    competitor_count: number;
    average_price: number;
    market_leader: string;
    price_competitiveness: number;
  };
}

interface OptimizationStrategy {
  id: string;
  name: string;
  description: string;
  type: 'pricing' | 'content' | 'visibility' | 'conversion' | 'retention';
  status: 'active' | 'testing' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  performance: {
    baseline: number;
    current: number;
    improvement: number;
    confidence: number;
  };
  implementation: {
    started_at: string;
    completed_at?: string;
    duration: number;
    resources_used: number;
  };
  results: {
    revenue_impact: number;
    conversion_impact: number;
    user_satisfaction: number;
    roi: number;
  };
}

interface ABTest {
  id: string;
  name: string;
  description: string;
  variant_a: {
    name: string;
    description: string;
    traffic_percentage: number;
    conversions: number;
    revenue: number;
    conversion_rate: number;
  };
  variant_b: {
    name: string;
    description: string;
    traffic_percentage: number;
    conversions: number;
    revenue: number;
    conversion_rate: number;
  };
  status: 'running' | 'completed' | 'paused';
  started_at: string;
  completed_at?: string;
  duration: number;
  statistical_significance: number;
  winner?: 'variant_a' | 'variant_b' | 'inconclusive';
  confidence: number;
}

interface AnalyticsData {
  daily_metrics: Array<{
    date: string;
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
    conversion_rate: number;
    avg_order_value: number;
  }>;
  category_performance: Array<{
    category: string;
    listings: number;
    views: number;
    conversions: number;
    revenue: number;
    conversion_rate: number;
    growth_rate: number;
  }>;
  user_segments: Array<{
    segment: string;
    users: number;
    avg_revenue: number;
    conversion_rate: number;
    retention_rate: number;
    satisfaction: number;
  }>;
  competitor_tracking: Array<{
    competitor: string;
    market_share: number;
    avg_price: number;
    listings: number;
    rating: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

interface MarketplaceOptimizationConfig {
  auto_optimization: boolean;
  ab_testing: boolean;
  competitor_monitoring: boolean;
  price_optimization: boolean;
  content_optimization: boolean;
  analytics: {
    real_time: boolean;
    predictive: boolean;
    alerts: boolean;
    reporting: boolean;
  };
  strategies: {
    pricing_strategy: 'dynamic' | 'fixed' | 'competitive' | 'value_based';
    content_strategy: 'automated' | 'manual' | 'hybrid';
    visibility_strategy: 'seo' | 'paid' | 'organic' | 'mixed';
    conversion_strategy: 'funnel' | 'direct' | 'multi_touch' | 'personalized';
  };
}

const MarketplaceOptimization: React.FC = () => {
  const [metrics, setMetrics] = useState<MarketplaceMetrics>({
    total_listings: 1250,
    active_listings: 1187,
    total_views: 456789,
    total_clicks: 23456,
    total_conversions: 3421,
    total_revenue: 234567.89,
    average_rating: 4.6,
    conversion_rate: 3.2,
    click_through_rate: 5.1,
    average_order_value: 68.54,
    customer_satisfaction: 92.3,
    market_share: 12.4,
    competitor_analysis: {
      competitor_count: 47,
      average_price: 45.67,
      market_leader: 'MarketGiant',
      price_competitiveness: 85.2
    }
  });

  const [strategies, setStrategies] = useState<OptimizationStrategy[]>([
    {
      id: 'strategy-1',
      name: 'Dynamic Pricing Optimization',
      description: 'AI-powered pricing based on demand, competition, and market trends',
      type: 'pricing',
      status: 'active',
      priority: 'high',
      performance: {
        baseline: 3.2,
        current: 3.8,
        improvement: 18.75,
        confidence: 94.2
      },
      implementation: {
        started_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 15
      },
      results: {
        revenue_impact: 23.4,
        conversion_impact: 18.75,
        user_satisfaction: 91.2,
        roi: 345.6
      }
    },
    {
      id: 'strategy-2',
      name: 'Content Enhancement AI',
      description: 'Automated content optimization for better engagement',
      type: 'content',
      status: 'testing',
      priority: 'medium',
      performance: {
        baseline: 5.1,
        current: 5.8,
        improvement: 13.73,
        confidence: 87.5
      },
      implementation: {
        started_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 7
      },
      results: {
        revenue_impact: 12.3,
        conversion_impact: 13.73,
        user_satisfaction: 88.9,
        roi: 234.5
      }
    },
    {
      id: 'strategy-3',
      name: 'SEO Visibility Boost',
      description: 'Search engine optimization for organic traffic growth',
      type: 'visibility',
      status: 'completed',
      priority: 'high',
      performance: {
        baseline: 456789,
        current: 567890,
        improvement: 24.32,
        confidence: 96.8
      },
      implementation: {
        started_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 25
      },
      results: {
        revenue_impact: 31.2,
        conversion_impact: 8.9,
        user_satisfaction: 93.4,
        roi: 456.7
      }
    }
  ]);

  const [abTests, setABTests] = useState<ABTest[]>([
    {
      id: 'test-1',
      name: 'Pricing Strategy A/B Test',
      description: 'Testing dynamic pricing vs fixed pricing',
      variant_a: {
        name: 'Dynamic Pricing',
        description: 'AI-adjusted prices based on demand',
        traffic_percentage: 50,
        conversions: 234,
        revenue: 15678.90,
        conversion_rate: 3.8
      },
      variant_b: {
        name: 'Fixed Pricing',
        description: 'Standard fixed pricing model',
        traffic_percentage: 50,
        conversions: 189,
        revenue: 12345.67,
        conversion_rate: 3.1
      },
      status: 'completed',
      started_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 12,
      statistical_significance: 96.5,
      winner: 'variant_a',
      confidence: 96.5
    },
    {
      id: 'test-2',
      name: 'Content Layout Test',
      description: 'Testing different content layouts for better engagement',
      variant_a: {
        name: 'Grid Layout',
        description: 'Traditional grid-based layout',
        traffic_percentage: 50,
        conversions: 156,
        revenue: 9876.54,
        conversion_rate: 2.9
      },
      variant_b: {
        name: 'Card Layout',
        description: 'Modern card-based layout',
        traffic_percentage: 50,
        conversions: 178,
        revenue: 11234.56,
        conversion_rate: 3.3
      },
      status: 'running',
      started_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 5,
      statistical_significance: 78.3,
      confidence: 78.3
    }
  ]);

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    daily_metrics: [
      { date: '2024-01-01', views: 12345, clicks: 678, conversions: 89, revenue: 5678.90, conversion_rate: 3.1, avg_order_value: 63.82 },
      { date: '2024-01-02', views: 13456, clicks: 723, conversions: 98, revenue: 6234.56, conversion_rate: 3.6, avg_order_value: 63.62 },
      { date: '2024-01-03', views: 14567, clicks: 789, conversions: 109, revenue: 6987.43, conversion_rate: 3.8, avg_order_value: 64.10 },
      { date: '2024-01-04', views: 15678, clicks: 834, conversions: 118, revenue: 7456.78, conversion_rate: 3.7, avg_order_value: 63.19 },
      { date: '2024-01-05', views: 16789, clicks: 890, conversions: 128, revenue: 8123.45, conversion_rate: 3.8, avg_order_value: 63.46 }
    ],
    category_performance: [
      { category: 'Digital Services', listings: 456, views: 123456, conversions: 1234, revenue: 87654.32, conversion_rate: 4.0, growth_rate: 12.3 },
      { category: 'Physical Products', listings: 321, views: 98765, conversions: 876, revenue: 65432.10, conversion_rate: 3.5, growth_rate: 8.7 },
      { category: 'Consulting', listings: 234, views: 76543, conversions: 654, revenue: 54321.09, conversion_rate: 3.2, growth_rate: 6.5 },
      { category: 'Education', listings: 176, views: 54321, conversions: 456, revenue: 27654.38, conversion_rate: 2.8, growth_rate: 4.2 }
    ],
    user_segments: [
      { segment: 'New Users', users: 12345, avg_revenue: 45.67, conversion_rate: 2.1, retention_rate: 23.4, satisfaction: 87.6 },
      { segment: 'Returning Users', users: 8765, avg_revenue: 78.90, conversion_rate: 4.5, retention_rate: 67.8, satisfaction: 92.3 },
      { segment: 'VIP Users', users: 1234, avg_revenue: 156.78, conversion_rate: 6.7, retention_rate: 89.2, satisfaction: 96.5 },
      { segment: 'Enterprise Users', users: 456, avg_revenue: 345.67, conversion_rate: 8.9, retention_rate: 94.5, satisfaction: 98.2 }
    ],
    competitor_tracking: [
      { competitor: 'MarketGiant', market_share: 28.4, avg_price: 42.34, listings: 2345, rating: 4.7, trend: 'up' },
      { competitor: 'CompetitorA', market_share: 15.6, avg_price: 48.90, listings: 1876, rating: 4.5, trend: 'stable' },
      { competitor: 'CompetitorB', market_share: 12.1, avg_price: 51.23, listings: 1543, rating: 4.3, trend: 'down' },
      { competitor: 'CompetitorC', market_share: 8.9, avg_price: 44.56, listings: 1234, rating: 4.4, trend: 'up' }
    ]
  });

  const [config, setConfig] = useState<MarketplaceOptimizationConfig>({
    auto_optimization: true,
    ab_testing: true,
    competitor_monitoring: true,
    price_optimization: true,
    content_optimization: true,
    analytics: {
      real_time: true,
      predictive: true,
      alerts: true,
      reporting: true
    },
    strategies: {
      pricing_strategy: 'dynamic',
      content_strategy: 'automated',
      visibility_strategy: 'mixed',
      conversion_strategy: 'personalized'
    }
  });

  const [selectedStrategy, setSelectedStrategy] = useState<OptimizationStrategy | null>(null);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-optimization simulation
  useEffect(() => {
    if (!config.auto_optimization) return;

    const interval = setInterval(() => {
      // Update metrics with realistic variations
      setMetrics(prev => ({
        ...prev,
        total_views: prev.total_views + Math.floor(Math.random() * 1000) - 200,
        total_clicks: prev.total_clicks + Math.floor(Math.random() * 100) - 20,
        total_conversions: prev.total_conversions + Math.floor(Math.random() * 20) - 5,
        total_revenue: prev.total_revenue + (Math.random() * 2000) - 500,
        conversion_rate: Math.max(0, prev.conversion_rate + (Math.random() * 0.2) - 0.1),
        click_through_rate: Math.max(0, prev.click_through_rate + (Math.random() * 0.1) - 0.05)
      }));

      // Update strategy performance
      setStrategies(prev => prev.map(strategy => {
        if (strategy.status === 'active' || strategy.status === 'testing') {
          const improvement = strategy.performance.improvement + (Math.random() * 2) - 0.5;
          return {
            ...strategy,
            performance: {
              ...strategy.performance,
              improvement: Math.max(0, improvement),
              confidence: Math.min(99, strategy.performance.confidence + (Math.random() * 2) - 0.5)
            }
          };
        }
        return strategy;
      }));

      // Update A/B test results
      setABTests(prev => prev.map(test => {
        if (test.status === 'running') {
          const newConversionsA = test.variant_a.conversions + Math.floor(Math.random() * 5);
          const newConversionsB = test.variant_b.conversions + Math.floor(Math.random() * 5);
          const newRevenueA = test.variant_a.revenue + (Math.random() * 500);
          const newRevenueB = test.variant_b.revenue + (Math.random() * 500);
          
          return {
            ...test,
            variant_a: {
              ...test.variant_a,
              conversions: newConversionsA,
              revenue: newRevenueA,
              conversion_rate: (newConversionsA / (test.variant_a.traffic_percentage * 10)) * 100
            },
            variant_b: {
              ...test.variant_b,
              conversions: newConversionsB,
              revenue: newRevenueB,
              conversion_rate: (newConversionsB / (test.variant_b.traffic_percentage * 10)) * 100
            },
            statistical_significance: Math.min(99, test.statistical_significance + Math.random() * 5)
          };
        }
        return test;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.auto_optimization]);

  const getStrategyTypeColor = (type: OptimizationStrategy['type']) => {
    switch (type) {
      case 'pricing': return 'bg-green-600';
      case 'content': return 'bg-blue-600';
      case 'visibility': return 'bg-purple-600';
      case 'conversion': return 'bg-orange-600';
      case 'retention': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'running': return 'bg-green-600';
      case 'testing': return 'bg-yellow-600';
      case 'completed': return 'bg-blue-600';
      case 'failed': case 'paused': return 'bg-red-600';
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

  const getFilteredStrategies = () => {
    return strategies.filter(strategy => {
      const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || strategy.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Marketplace Optimization
          </h1>
          <p className="text-gray-400">
            Advanced analytics and optimization for marketplace performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${metrics.total_revenue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
                <div className="text-2xl font-bold">{metrics.conversion_rate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Total Views</div>
                <div className="text-2xl font-bold">{metrics.total_views.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Rating</div>
                <div className="text-2xl font-bold">{metrics.average_rating.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Optimization Control Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{strategies.filter(s => s.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Strategies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{abTests.filter(t => t.status === 'running').length}</div>
              <div className="text-sm text-gray-400">Running Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{(metrics.market_share).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Market Share</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.competitor_analysis.competitor_count}</div>
              <div className="text-sm text-gray-400">Competitors</div>
            </div>
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Optimization Strategies</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search strategies..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="pricing">Pricing</option>
                <option value="content">Content</option>
                <option value="visibility">Visibility</option>
                <option value="conversion">Conversion</option>
                <option value="retention">Retention</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredStrategies().map((strategy) => (
                <div
                  key={strategy.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedStrategy?.id === strategy.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(strategy.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{strategy.name}</h4>
                        <div className="text-sm text-gray-400">{strategy.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getStrategyTypeColor(strategy.type)}`}>
                        {strategy.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(strategy.priority)}`}>
                        {strategy.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Improvement:</span> {strategy.performance.improvement.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Confidence:</span> {strategy.performance.confidence.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">ROI:</span> {strategy.results.roi.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span> {strategy.implementation.duration} days
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${strategy.performance.improvement}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Revenue Impact: {strategy.results.revenue_impact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(strategy.status)}`}>
                        {strategy.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredStrategies().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No strategies found
              </div>
            )}
          </div>

          {/* Selected Strategy Details */}
          {selectedStrategy && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Strategy Details: {selectedStrategy.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Baseline:</span>
                        <span className="font-medium">{selectedStrategy.performance.baseline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current:</span>
                        <span className="font-medium">{selectedStrategy.performance.current}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Improvement:</span>
                        <span className="font-medium text-green-400">{selectedStrategy.performance.improvement.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="font-medium">{selectedStrategy.performance.confidence.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Business Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue Impact:</span>
                        <span className="font-medium text-green-400">{selectedStrategy.results.revenue_impact.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversion Impact:</span>
                        <span className="font-medium text-blue-400">{selectedStrategy.results.conversion_impact.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">User Satisfaction:</span>
                        <span className="font-medium">{selectedStrategy.results.user_satisfaction.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="font-medium text-purple-400">{selectedStrategy.results.roi.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Implementation Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className="font-medium">{new Date(selectedStrategy.implementation.started_at).toLocaleDateString()}</span>
                      </div>
                      {selectedStrategy.implementation.completed_at && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Completed:</span>
                          <span className="font-medium">{new Date(selectedStrategy.implementation.completed_at).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium">{selectedStrategy.implementation.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resources Used:</span>
                        <span className="font-medium">{selectedStrategy.implementation.resources_used}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Strategy Type</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium capitalize">{selectedStrategy.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority:</span>
                        <span className="font-medium capitalize">{selectedStrategy.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-medium capitalize">{selectedStrategy.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* A/B Testing */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">A/B Testing</h3>
          <div className="space-y-4">
            {abTests.map((test) => (
              <div key={test.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{test.name}</h4>
                    <div className="text-sm text-gray-400">{test.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                    {test.winner && (
                      <span className="px-2 py-1 rounded text-xs bg-green-600">
                        Winner: {test.winner === 'variant_a' ? test.variant_a.name : test.variant_b.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-600 rounded">
                    <h5 className="font-medium mb-2">{test.variant_a.name}</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Traffic:</span>
                        <span>{test.variant_a.traffic_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span>{test.variant_a.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span>${test.variant_a.revenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span>{test.variant_a.conversion_rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-600 rounded">
                    <h5 className="font-medium mb-2">{test.variant_b.name}</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Traffic:</span>
                        <span>{test.variant_b.traffic_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span>{test.variant_b.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span>${test.variant_b.revenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span>{test.variant_b.conversion_rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      Duration: {test.duration} days | 
                      Significance: {test.statistical_significance.toFixed(1)}% | 
                      Confidence: {test.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTest(test)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
            <div className="space-y-3">
              {analytics.category_performance.map((category) => (
                <div key={category.category} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{category.category}</h4>
                    <span className={`text-sm ${category.growth_rate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {category.growth_rate > 0 ? '+' : ''}{category.growth_rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span>${category.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Conversion:</span>
                      <span>{category.conversion_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">User Segments</h3>
            <div className="space-y-3">
              {analytics.user_segments.map((segment) => (
                <div key={segment.segment} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <span className="text-sm text-gray-400">{segment.users.toLocaleString()} users</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Revenue:</span>
                      <span>${segment.avg_revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Retention:</span>
                      <span>{segment.retention_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Competitor Tracking</h3>
            <div className="space-y-3">
              {analytics.competitor_tracking.map((competitor) => (
                <div key={competitor.competitor} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{competitor.competitor}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${competitor.trend === 'up' ? 'text-green-400' : competitor.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                        {competitor.trend === 'up' ? 'Trending Up' : competitor.trend === 'down' ? 'Trending Down' : 'Stable'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Share:</span>
                      <span>{competitor.market_share.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Price:</span>
                      <span>${competitor.avg_price.toFixed(2)}</span>
                    </div>
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
              <h2 className="text-2xl font-bold mb-6">Optimization Settings</h2>
              
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
                        checked={config.ab_testing}
                        onChange={(e) => setConfig(prev => ({ ...prev, ab_testing: e.target.checked }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">A/B Testing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.competitor_monitoring}
                        onChange={(e) => setConfig(prev => ({ ...prev, competitor_monitoring: e.target.checked }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Competitor Monitoring</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.price_optimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, price_optimization: e.target.checked }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Price Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.content_optimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, content_optimization: e.target.checked }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Content Optimization</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Strategy Configuration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Pricing Strategy</label>
                      <select
                        value={config.strategies.pricing_strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategies: { ...prev.strategies, pricing_strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="dynamic">Dynamic</option>
                        <option value="fixed">Fixed</option>
                        <option value="competitive">Competitive</option>
                        <option value="value_based">Value Based</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Content Strategy</label>
                      <select
                        value={config.strategies.content_strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategies: { ...prev.strategies, content_strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="automated">Automated</option>
                        <option value="manual">Manual</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Visibility Strategy</label>
                      <select
                        value={config.strategies.visibility_strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategies: { ...prev.strategies, visibility_strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="seo">SEO</option>
                        <option value="paid">Paid</option>
                        <option value="organic">Organic</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Conversion Strategy</label>
                      <select
                        value={config.strategies.conversion_strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategies: { ...prev.strategies, conversion_strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="funnel">Funnel</option>
                        <option value="direct">Direct</option>
                        <option value="multi_touch">Multi Touch</option>
                        <option value="personalized">Personalized</option>
                      </select>
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

export default MarketplaceOptimization;
