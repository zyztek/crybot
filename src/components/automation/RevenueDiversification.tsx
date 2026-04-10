/**
 * Revenue Diversification Component
 * 
 * Comprehensive revenue stream management and diversification strategies
 * Features multiple income sources, subscription models, and revenue optimization
 */

import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CreditCard, Users, Package, Globe, Zap, Settings, Search, Filter, Calendar, Target, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle, XCircle, Clock, Award, Crown, Shield, Rocket, Lightbulb, Briefcase, ShoppingCart, Star, ArrowUpRight, ArrowDownRight, Plus, Minus, Edit, Trash2 } from 'lucide-react';

interface RevenueStream {
  id: string;
  name: string;
  type: 'subscription' | 'one_time' | 'usage_based' | 'commission' | 'licensing' | 'advertising' | 'marketplace' | 'services' | 'products';
  status: 'active' | 'inactive' | 'testing' | 'deprecated';
  category: 'primary' | 'secondary' | 'experimental';
  performance: {
    monthly_revenue: number;
    growth_rate: number;
    profit_margin: number;
    customer_count: number;
    churn_rate: number;
    lifetime_value: number;
  };
  pricing: {
    model: string;
    base_price: number;
    currency: string;
    tiers?: Array<{
      name: string;
      price: number;
      features: string[];
      customers: number;
    }>;
    usage_rates?: Array<{
      metric: string;
      rate: number;
      unit: string;
    }>;
  };
  metrics: {
    mrr: number; // Monthly Recurring Revenue
    arr: number; // Annual Recurring Revenue
    arpu: number; // Average Revenue Per User
    cac: number; // Customer Acquisition Cost
    ltv_cac_ratio: number;
    payback_period: number;
  };
  forecasts: {
    next_month: number;
    next_quarter: number;
    next_year: number;
    confidence: number;
  };
}

interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'enterprise' | 'custom';
  price: number;
  currency: string;
  billing_cycle: 'monthly' | 'quarterly' | 'annual';
  features: string[];
  limits: {
    users?: number;
    storage?: number;
    api_calls?: number;
    bandwidth?: number;
    requests?: number;
  };
  customers: number;
  revenue: number;
  churn_rate: number;
  upgrade_rate: number;
  downgrade_rate: number;
}

interface RevenueOptimization {
  id: string;
  name: string;
  description: string;
  type: 'pricing' | 'packaging' | 'upselling' | 'cross_selling' | 'retention' | 'acquisition';
  status: 'planned' | 'active' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  impact: {
    revenue_increase: number;
    cost_savings: number;
    roi: number;
    payback_period: number;
    risk_level: 'low' | 'medium' | 'high';
  };
  implementation: {
    start_date: string;
    end_date?: string;
    progress: number;
    resources_used: number;
    budget: number;
    actual_cost: number;
  };
  results?: {
    actual_revenue_increase: number;
    actual_cost_savings: number;
    actual_roi: number;
    customer_satisfaction: number;
  };
}

interface RevenueAnalytics {
  total_revenue: number;
  monthly_growth: number;
  quarterly_growth: number;
  yearly_growth: number;
  revenue_by_type: Array<{
    type: string;
    amount: number;
    percentage: number;
    growth: number;
  }>;
  revenue_by_category: Array<{
    category: string;
    amount: number;
    percentage: number;
    growth: number;
  }>;
  customer_segments: Array<{
    segment: string;
    customers: number;
    revenue: number;
    arpu: number;
    growth: number;
  }>;
  geographic_distribution: Array<{
    region: string;
    revenue: number;
    percentage: number;
    growth: number;
    customers: number;
  }>;
}

interface RevenueDiversificationConfig {
  auto_optimization: boolean;
  revenue_tracking: boolean;
  forecast_accuracy: number;
  alert_thresholds: {
    revenue_decline: number;
    churn_rate: number;
    profit_margin: number;
    customer_acquisition_cost: number;
  };
  diversification_strategy: {
    max_single_stream_percentage: number;
    target_stream_count: number;
    risk_tolerance: 'low' | 'medium' | 'high';
    innovation_budget_percentage: number;
  };
}

const RevenueDiversification: React.FC = () => {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([
    {
      id: 'stream-1',
      name: 'Premium Subscriptions',
      type: 'subscription',
      status: 'active',
      category: 'primary',
      performance: {
        monthly_revenue: 125000,
        growth_rate: 15.2,
        profit_margin: 78.5,
        customer_count: 3450,
        churn_rate: 3.2,
        lifetime_value: 2850
      },
      pricing: {
        model: 'tiered_subscription',
        base_price: 29.99,
        currency: 'USD',
        tiers: [
          {
            name: 'Basic',
            price: 29.99,
            features: ['Core features', 'Basic support', '1000 API calls'],
            customers: 1200
          },
          {
            name: 'Professional',
            price: 79.99,
            features: ['Advanced features', 'Priority support', '10000 API calls'],
            customers: 1800
          },
          {
            name: 'Enterprise',
            price: 299.99,
            features: ['All features', 'Dedicated support', 'Unlimited API calls'],
            customers: 450
          }
        ]
      },
      metrics: {
        mrr: 125000,
        arr: 1500000,
        arpu: 36.23,
        cac: 156.78,
        ltv_cac_ratio: 18.18,
        payback_period: 4.3
      },
      forecasts: {
        next_month: 143875,
        next_quarter: 475000,
        next_year: 2150000,
        confidence: 0.87
      }
    },
    {
      id: 'stream-2',
      name: 'Marketplace Commission',
      type: 'commission',
      status: 'active',
      category: 'primary',
      performance: {
        monthly_revenue: 87500,
        growth_rate: 22.4,
        profit_margin: 65.2,
        customer_count: 12500,
        churn_rate: 8.7,
        lifetime_value: 450
      },
      pricing: {
        model: 'percentage_commission',
        base_price: 15,
        currency: 'USD'
      },
      metrics: {
        mrr: 87500,
        arr: 1050000,
        arpu: 7.00,
        cac: 23.45,
        ltv_cac_ratio: 19.19,
        payback_period: 3.3
      },
      forecasts: {
        next_month: 107060,
        next_quarter: 345000,
        next_year: 1850000,
        confidence: 0.82
      }
    },
    {
      id: 'stream-3',
      name: 'Professional Services',
      type: 'services',
      status: 'active',
      category: 'secondary',
      performance: {
        monthly_revenue: 45600,
        growth_rate: 8.9,
        profit_margin: 52.3,
        customer_count: 234,
        churn_rate: 12.3,
        lifetime_value: 1250
      },
      pricing: {
        model: 'hourly_rate',
        base_price: 150,
        currency: 'USD'
      },
      metrics: {
        mrr: 45600,
        arr: 547200,
        arpu: 194.87,
        cac: 678.90,
        ltv_cac_ratio: 1.84,
        payback_period: 3.5
      },
      forecasts: {
        next_month: 49658,
        next_quarter: 156000,
        next_year: 625000,
        confidence: 0.78
      }
    },
    {
      id: 'stream-4',
      name: 'API Usage Fees',
      type: 'usage_based',
      status: 'active',
      category: 'secondary',
      performance: {
        monthly_revenue: 34500,
        growth_rate: 35.6,
        profit_margin: 82.1,
        customer_count: 5670,
        churn_rate: 5.4,
        lifetime_value: 680
      },
      pricing: {
        model: 'usage_based',
        base_price: 0.01,
        currency: 'USD',
        usage_rates: [
          { metric: 'api_calls', rate: 0.01, unit: 'call' },
          { metric: 'storage', rate: 0.05, unit: 'GB' },
          { metric: 'bandwidth', rate: 0.02, unit: 'GB' }
        ]
      },
      metrics: {
        mrr: 34500,
        arr: 414000,
        arpu: 6.08,
        cac: 45.67,
        ltv_cac_ratio: 14.89,
        payback_period: 7.5
      },
      forecasts: {
        next_month: 46778,
        next_quarter: 156000,
        next_year: 875000,
        confidence: 0.91
      }
    }
  ]);

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'plan-1',
      name: 'Basic Plan',
      tier: 'basic',
      price: 29.99,
      currency: 'USD',
      billing_cycle: 'monthly',
      features: ['Core automation features', 'Basic analytics', 'Email support', '1000 API calls/month'],
      limits: {
        users: 5,
        api_calls: 1000,
        bandwidth: 10
      },
      customers: 1200,
      revenue: 35988,
      churn_rate: 4.2,
      upgrade_rate: 12.5,
      downgrade_rate: 2.1
    },
    {
      id: 'plan-2',
      name: 'Professional Plan',
      tier: 'standard',
      price: 79.99,
      currency: 'USD',
      billing_cycle: 'monthly',
      features: ['Advanced automation', 'Advanced analytics', 'Priority support', '10000 API calls/month', 'Custom integrations'],
      limits: {
        users: 25,
        api_calls: 10000,
        bandwidth: 100
      },
      customers: 1800,
      revenue: 143982,
      churn_rate: 2.8,
      upgrade_rate: 8.3,
      downgrade_rate: 3.7
    },
    {
      id: 'plan-3',
      name: 'Enterprise Plan',
      tier: 'enterprise',
      price: 299.99,
      currency: 'USD',
      billing_cycle: 'monthly',
      features: ['All features', 'Dedicated support', 'Unlimited API calls', 'Custom solutions', 'SLA guarantee'],
      limits: {
        users: 100,
        bandwidth: 1000
      },
      customers: 450,
      revenue: 134996,
      churn_rate: 1.2,
      upgrade_rate: 2.1,
      downgrade_rate: 0.8
    }
  ]);

  const [revenueOptimizations, setRevenueOptimizations] = useState<RevenueOptimization[]>([
    {
      id: 'opt-1',
      name: 'Dynamic Pricing Implementation',
      description: 'AI-powered dynamic pricing based on demand and customer behavior',
      type: 'pricing',
      status: 'active',
      priority: 'high',
      impact: {
        revenue_increase: 15.5,
        cost_savings: 2.3,
        roi: 245.6,
        payback_period: 2.1,
        risk_level: 'medium'
      },
      implementation: {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 65,
        resources_used: 12,
        budget: 50000,
        actual_cost: 32500
      }
    },
    {
      id: 'opt-2',
      name: 'Cross-selling Integration',
      description: 'Automated cross-selling recommendations based on user behavior',
      type: 'cross_selling',
      status: 'completed',
      priority: 'medium',
      impact: {
        revenue_increase: 8.7,
        cost_savings: 1.2,
        roi: 156.8,
        payback_period: 3.5,
        risk_level: 'low'
      },
      implementation: {
        start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 100,
        resources_used: 8,
        budget: 25000,
        actual_cost: 22300
      },
      results: {
        actual_revenue_increase: 9.2,
        actual_cost_savings: 1.4,
        actual_roi: 168.5,
        customer_satisfaction: 87.3
      }
    },
    {
      id: 'opt-3',
      name: 'Customer Retention Program',
      description: 'Proactive churn reduction through personalized engagement',
      type: 'retention',
      status: 'planned',
      priority: 'high',
      impact: {
        revenue_increase: 12.3,
        cost_savings: 8.9,
        roi: 189.4,
        payback_period: 4.2,
        risk_level: 'low'
      },
      implementation: {
        start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 0,
        resources_used: 0,
        budget: 35000,
        actual_cost: 0
      }
    }
  ]);

  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics>({
    total_revenue: 292600,
    monthly_growth: 18.4,
    quarterly_growth: 22.7,
    yearly_growth: 45.6,
    revenue_by_type: [
      { type: 'subscription', amount: 125000, percentage: 42.7, growth: 15.2 },
      { type: 'commission', amount: 87500, percentage: 29.9, growth: 22.4 },
      { type: 'services', amount: 45600, percentage: 15.6, growth: 8.9 },
      { type: 'usage_based', amount: 34500, percentage: 11.8, growth: 35.6 }
    ],
    revenue_by_category: [
      { category: 'primary', amount: 212500, percentage: 72.6, growth: 18.8 },
      { category: 'secondary', amount: 80100, percentage: 27.4, growth: 22.3 }
    ],
    customer_segments: [
      { segment: 'Enterprise', customers: 450, revenue: 134996, arpu: 299.99, growth: 12.3 },
      { segment: 'Professional', customers: 1800, revenue: 143982, arpu: 79.99, growth: 15.6 },
      { segment: 'Basic', customers: 1200, revenue: 35988, arpu: 29.99, growth: 8.7 },
      { segment: 'Marketplace', customers: 12500, revenue: 87500, arpu: 7.00, growth: 22.4 }
    ],
    geographic_distribution: [
      { region: 'North America', revenue: 145000, percentage: 49.6, growth: 18.2, customers: 8900 },
      { region: 'Europe', revenue: 87500, percentage: 29.9, growth: 21.5, customers: 6200 },
      { region: 'Asia Pacific', revenue: 45600, percentage: 15.6, growth: 28.9, customers: 3400 },
      { region: 'Other', revenue: 14500, percentage: 4.9, growth: 15.3, customers: 1200 }
    ]
  });

  const [config, setConfig] = useState<RevenueDiversificationConfig>({
    auto_optimization: true,
    revenue_tracking: true,
    forecast_accuracy: 0.85,
    alert_thresholds: {
      revenue_decline: 10,
      churn_rate: 15,
      profit_margin: 50,
      customer_acquisition_cost: 200
    },
    diversification_strategy: {
      max_single_stream_percentage: 40,
      target_stream_count: 6,
      risk_tolerance: 'medium',
      innovation_budget_percentage: 15
    }
  });

  const [selectedStream, setSelectedStream] = useState<RevenueStream | null>(null);
  const [selectedOptimization, setSelectedOptimization] = useState<RevenueOptimization | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update revenue streams with realistic variations
      setRevenueStreams(prev => prev.map(stream => ({
        ...stream,
        performance: {
          ...stream.performance,
          monthly_revenue: stream.performance.monthly_revenue * (1 + (Math.random() * 0.04) - 0.02),
          growth_rate: Math.max(0, stream.performance.growth_rate + (Math.random() * 2) - 1),
          customer_count: stream.performance.customer_count + Math.floor(Math.random() * 20) - 10
        },
        metrics: {
          ...stream.metrics,
          mrr: stream.metrics.mrr * (1 + (Math.random() * 0.04) - 0.02),
          arpu: stream.metrics.arpu * (1 + (Math.random() * 0.02) - 0.01)
        }
      })));

      // Update analytics
      setRevenueAnalytics(prev => ({
        ...prev,
        total_revenue: prev.total_revenue * (1 + (Math.random() * 0.03) - 0.015),
        monthly_growth: Math.max(0, prev.monthly_growth + (Math.random() * 2) - 1),
        revenue_by_type: prev.revenue_by_type.map(type => ({
          ...type,
          amount: type.amount * (1 + (Math.random() * 0.04) - 0.02),
          growth: Math.max(0, type.growth + (Math.random() * 2) - 1)
        }))
      }));

      // Update optimization progress
      setRevenueOptimizations(prev => prev.map(opt => {
        if (opt.status === 'active') {
          return {
            ...opt,
            implementation: {
              ...opt.implementation,
              progress: Math.min(100, opt.implementation.progress + Math.random() * 5),
              actual_cost: opt.implementation.actual_cost + (Math.random() * 1000) - 500
            }
          };
        }
        return opt;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStreamTypeColor = (type: RevenueStream['type']) => {
    switch (type) {
      case 'subscription': return 'bg-blue-600';
      case 'one_time': return 'bg-green-600';
      case 'usage_based': return 'bg-purple-600';
      case 'commission': return 'bg-orange-600';
      case 'licensing': return 'bg-pink-600';
      case 'advertising': return 'bg-red-600';
      case 'marketplace': return 'bg-yellow-600';
      case 'services': return 'bg-indigo-600';
      case 'products': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'bg-green-600';
      case 'testing': case 'active': return 'bg-yellow-600';
      case 'planned': case 'inactive': return 'bg-gray-600';
      case 'failed': case 'deprecated': return 'bg-red-600';
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

  const getFilteredStreams = () => {
    return revenueStreams.filter(stream => {
      const matchesSearch = stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stream.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || stream.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            Revenue Diversification
          </h1>
          <p className="text-gray-400">
            Comprehensive revenue stream management and diversification strategies
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${revenueAnalytics.total_revenue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Monthly Growth</div>
                <div className="text-2xl font-bold">{revenueAnalytics.monthly_growth.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Streams</div>
                <div className="text-2xl font-bold">{revenueStreams.filter(s => s.status === 'active').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Margin</div>
                <div className="text-2xl font-bold">
                  {(revenueStreams.reduce((sum, s) => sum + s.performance.profit_margin, 0) / revenueStreams.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Revenue Management Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{revenueStreams.length}</div>
              <div className="text-sm text-gray-400">Total Streams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{subscriptionPlans.length}</div>
              <div className="text-sm text-gray-400">Subscription Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{revenueOptimizations.filter(o => o.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Optimizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{(revenueAnalytics.yearly_growth).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Yearly Growth</div>
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Revenue Streams</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search streams..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="subscription">Subscription</option>
                <option value="commission">Commission</option>
                <option value="usage_based">Usage Based</option>
                <option value="services">Services</option>
                <option value="products">Products</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredStreams().map((stream) => (
                <div
                  key={stream.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedStream?.id === stream.id ? 'border-green-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedStream(stream)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(stream.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{stream.name}</h4>
                        <div className="text-sm text-gray-400">{stream.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getStreamTypeColor(stream.type)}`}>
                        {stream.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(stream.status)}`}>
                        {stream.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Revenue:</span> ${stream.performance.monthly_revenue.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Growth:</span> {stream.performance.growth_rate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Margin:</span> {stream.performance.profit_margin.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Customers:</span> {stream.performance.customer_count.toLocaleString()}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${Math.min(100, stream.performance.growth_rate * 5)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        MRR: ${stream.metrics.mrr.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        LTV: ${stream.performance.lifetime_value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredStreams().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No streams found
              </div>
            )}
          </div>

          {/* Selected Stream Details */}
          {selectedStream && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Stream Details: {selectedStream.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="font-medium">${selectedStream.performance.monthly_revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-medium text-green-400">{selectedStream.performance.growth_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit Margin:</span>
                        <span className="font-medium">{selectedStream.performance.profit_margin.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Customer Count:</span>
                        <span className="font-medium">{selectedStream.performance.customer_count.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Key Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">MRR:</span>
                        <span className="font-medium">${selectedStream.metrics.mrr.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ARR:</span>
                        <span className="font-medium">${selectedStream.metrics.arr.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ARPU:</span>
                        <span className="font-medium">${selectedStream.metrics.arpu.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">LTV/CAC Ratio:</span>
                        <span className="font-medium">{selectedStream.metrics.ltv_cac_ratio.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Pricing Model</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model:</span>
                        <span className="font-medium">{selectedStream.pricing.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Base Price:</span>
                        <span className="font-medium">${selectedStream.pricing.base_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Currency:</span>
                        <span className="font-medium">{selectedStream.pricing.currency}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Forecasts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Month:</span>
                        <span className="font-medium">${selectedStream.forecasts.next_month.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Quarter:</span>
                        <span className="font-medium">${selectedStream.forecasts.next_quarter.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Year:</span>
                        <span className="font-medium">${selectedStream.forecasts.next_year.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="font-medium">{(selectedStream.forecasts.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedStream.pricing.tiers && (
                  <div className="mt-6">
                    <h4 className="font-medium text-green-400 mb-2">Pricing Tiers</h4>
                    <div className="space-y-2">
                      {selectedStream.pricing.tiers.map((tier, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{tier.name}</span>
                            <span>${tier.price}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {tier.customers} customers
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Subscription Plans */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{plan.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    plan.tier === 'basic' ? 'bg-green-600' :
                    plan.tier === 'standard' ? 'bg-blue-600' :
                    plan.tier === 'premium' ? 'bg-purple-600' : 'bg-orange-600'
                  }`}>
                    {plan.tier}
                  </span>
                </div>

                <div className="text-2xl font-bold mb-3">${plan.price}/{plan.billing_cycle === 'monthly' ? 'mo' : plan.billing_cycle === 'quarterly' ? 'qtr' : 'yr'}</div>

                <div className="space-y-2 mb-4">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {feature}
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <div className="text-sm text-gray-400">
                      +{plan.features.length - 3} more features
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Customers:</span> {plan.customers}
                  </div>
                  <div>
                    <span className="text-gray-400">Revenue:</span> ${plan.revenue.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Churn:</span> {plan.churn_rate.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Upgrade:</span> {plan.upgrade_rate.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Revenue by Type</h3>
            <div className="space-y-3">
              {revenueAnalytics.revenue_by_type.map((type) => (
                <div key={type.type} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize">{type.type.replace('_', ' ')}</h4>
                    <span className={`text-sm ${type.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {type.growth > 0 ? '+' : ''}{type.growth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span>${type.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Percentage:</span>
                      <span>{type.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
            <div className="space-y-3">
              {revenueAnalytics.customer_segments.map((segment) => (
                <div key={segment.segment} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <span className={`text-sm ${segment.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {segment.growth > 0 ? '+' : ''}{segment.growth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customers:</span>
                      <span>{segment.customers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span>${segment.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ARPU:</span>
                      <span>${segment.arpu.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Optimizations */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Revenue Optimizations</h3>
          <div className="space-y-4">
            {revenueOptimizations.map((optimization) => (
              <div key={optimization.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{optimization.name}</h4>
                    <div className="text-sm text-gray-400">{optimization.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(optimization.priority)}`}>
                      {optimization.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(optimization.status)}`}>
                      {optimization.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Expected Impact</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue Increase:</span>
                        <span className="text-green-400">{optimization.impact.revenue_increase.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Savings:</span>
                        <span className="text-blue-400">{optimization.impact.cost_savings.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-purple-400">{optimization.impact.roi.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Implementation</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span>{optimization.implementation.progress.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Budget:</span>
                        <span>${optimization.implementation.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Actual Cost:</span>
                        <span>${optimization.implementation.actual_cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Risk Assessment</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level:</span>
                        <span className={`capitalize ${
                          optimization.impact.risk_level === 'low' ? 'text-green-400' :
                          optimization.impact.risk_level === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {optimization.impact.risk_level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payback Period:</span>
                        <span>{optimization.impact.payback_period.toFixed(1)} months</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${optimization.implementation.progress}%` }}
                  ></div>
                </div>

                {optimization.results && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-green-400">Actual Results</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue Increase:</span>
                        <span className="text-green-400">{optimization.results.actual_revenue_increase.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-purple-400">{optimization.results.actual_roi.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Revenue Diversification Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Revenue Management</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.auto_optimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, auto_optimization: e.target.checked }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Auto Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenue_tracking}
                        onChange={(e) => setConfig(prev => ({ ...prev, revenue_tracking: e.target.checked }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Revenue Tracking</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Alert Thresholds</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Revenue Decline (%)</label>
                      <input
                        type="number"
                        value={config.alert_thresholds.revenue_decline}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          alert_thresholds: { ...prev.alert_thresholds, revenue_decline: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Churn Rate (%)</label>
                      <input
                        type="number"
                        value={config.alert_thresholds.churn_rate}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          alert_thresholds: { ...prev.alert_thresholds, churn_rate: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Diversification Strategy</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Max Single Stream (%)</label>
                      <input
                        type="number"
                        value={config.diversification_strategy.max_single_stream_percentage}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          diversification_strategy: { ...prev.diversification_strategy, max_single_stream_percentage: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Target Stream Count</label>
                      <input
                        type="number"
                        value={config.diversification_strategy.target_stream_count}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          diversification_strategy: { ...prev.diversification_strategy, target_stream_count: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        min="1"
                        max="20"
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
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
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

export default RevenueDiversification;
