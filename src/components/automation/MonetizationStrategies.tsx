/**
 * Monetization Strategies Component
 * 
 * Comprehensive monetization strategies and subscription model management
 * Features pricing tiers, revenue optimization, and customer lifecycle management
 */

import React, { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Crown, Star, Users, TrendingUp, Settings, Search, Filter, Activity, BarChart3, PieChart, Target, Zap, Shield, Globe, Award, AlertTriangle, CheckCircle, XCircle, Clock, Rocket, Lightbulb, Package, Gift, Repeat, ArrowUpRight, ArrowDownRight, Plus, Minus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface SubscriptionTier {
  id: string;
  name: string;
  tier: 'free' | 'basic' | 'professional' | 'enterprise' | 'custom';
  price: {
    monthly: number;
    quarterly: number;
    annual: number;
    currency: string;
  };
  features: Array<{
    name: string;
    description: string;
    included: boolean;
    limit?: string;
    highlighted?: boolean;
  }>;
  limits: {
    users?: number;
    api_calls?: number;
    storage?: number;
    bandwidth?: number;
    projects?: number;
    support_level: 'community' | 'email' | 'priority' | 'dedicated';
  };
  metrics: {
    subscribers: number;
    revenue: number;
    churn_rate: number;
    upgrade_rate: number;
    downgrade_rate: number;
    lifetime_value: number;
    acquisition_cost: number;
  };
  positioning: {
    target_audience: string;
    value_proposition: string;
    competitive_advantage: string;
  };
}

interface RevenueStream {
  id: string;
  name: string;
  type: 'subscription' | 'one_time' | 'usage_based' | 'commission' | 'licensing' | 'advertising' | 'marketplace' | 'services' | 'affiliate';
  status: 'active' | 'inactive' | 'testing' | 'deprecated';
  category: 'primary' | 'secondary' | 'experimental';
  performance: {
    monthly_revenue: number;
    growth_rate: number;
    profit_margin: number;
    customer_count: number;
    average_transaction: number;
  };
  pricing: {
    model: string;
    base_price: number;
    currency: string;
    commission_rate?: number;
    usage_rates?: Array<{
      metric: string;
      rate: number;
      unit: string;
    }>;
  };
  forecasts: {
    next_month: number;
    next_quarter: number;
    next_year: number;
    confidence: number;
  };
}

interface MonetizationStrategy {
  id: string;
  name: string;
  description: string;
  type: 'pricing_optimization' | 'feature_gating' | 'upselling' | 'cross_selling' | 'retention' | 'expansion' | 'new_segment';
  status: 'planned' | 'active' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  impact: {
    revenue_increase: number;
    cost_savings: number;
    customer_satisfaction: number;
    competitive_advantage: number;
  };
  implementation: {
    start_date: string;
    end_date?: string;
    progress: number;
    phases: Array<{
      name: string;
      status: 'pending' | 'in_progress' | 'completed' | 'failed';
      progress: number;
      deadline?: string;
    }>;
  };
  results?: {
    actual_revenue_increase: number;
    actual_cost_savings: number;
    roi: number;
    customer_feedback: number;
  };
}

interface CustomerLifecycle {
  stage: 'awareness' | 'consideration' | 'trial' | 'conversion' | 'retention' | 'expansion' | 'advocacy';
  customers: number;
  conversion_rate: number;
  average_time: number;
  revenue_per_customer: number;
  churn_rate: number;
  strategies: string[];
}

interface MonetizationConfig {
  pricing_strategy: {
    model: 'value_based' | 'competitor_based' | 'cost_plus' | 'dynamic' | 'freemium';
    update_frequency: string;
    auto_adjustment: boolean;
    discount_enabled: boolean;
  };
  subscription_management: {
    auto_renewal: boolean;
    grace_period_days: number;
    dunning_enabled: boolean;
    cancellation_flow: 'simple' | 'retention' | 'survey';
  };
  revenue_optimization: {
    a_b_testing: boolean;
    price_elasticity_analysis: boolean;
    customer_segmentation: boolean;
    churn_prediction: boolean;
  };
  compliance: {
    tax_calculation: boolean;
    gdpr_compliance: boolean;
    payment_regulations: boolean;
    fraud_detection: boolean;
  };
}

const MonetizationStrategies: React.FC = () => {
  const [subscriptionTiers, setSubscriptionTiers] = useState<SubscriptionTier[]>([
    {
      id: 'tier-1',
      name: 'Starter',
      tier: 'free',
      price: {
        monthly: 0,
        quarterly: 0,
        annual: 0,
        currency: 'USD'
      },
      features: [
        { name: 'Basic Features', description: 'Core functionality for individuals', included: true },
        { name: 'API Access', description: '1000 API calls per month', included: true, limit: '1000/month' },
        { name: 'Community Support', description: 'Community forums and documentation', included: true },
        { name: 'Advanced Analytics', description: 'Detailed insights and reporting', included: false },
        { name: 'Priority Support', description: '24/7 email and chat support', included: false },
        { name: 'Custom Integrations', description: 'Custom API integrations', included: false }
      ],
      limits: {
        api_calls: 1000,
        storage: 1,
        support_level: 'community'
      },
      metrics: {
        subscribers: 12500,
        revenue: 0,
        churn_rate: 15.2,
        upgrade_rate: 8.7,
        downgrade_rate: 0,
        lifetime_value: 0,
        acquisition_cost: 5
      },
      positioning: {
        target_audience: 'Individual users and hobbyists',
        value_proposition: 'Free access to core features',
        competitive_advantage: 'No cost entry point with generous limits'
      }
    },
    {
      id: 'tier-2',
      name: 'Professional',
      tier: 'basic',
      price: {
        monthly: 29.99,
        quarterly: 79.99,
        annual: 299.99,
        currency: 'USD'
      },
      features: [
        { name: 'Basic Features', description: 'Core functionality for individuals', included: true },
        { name: 'API Access', description: '10000 API calls per month', included: true, limit: '10000/month' },
        { name: 'Advanced Analytics', description: 'Detailed insights and reporting', included: true, highlighted: true },
        { name: 'Email Support', description: 'Business hours email support', included: true },
        { name: 'Priority Support', description: '24/7 email and chat support', included: false },
        { name: 'Custom Integrations', description: 'Custom API integrations', included: false }
      ],
      limits: {
        users: 5,
        api_calls: 10000,
        storage: 10,
        support_level: 'email'
      },
      metrics: {
        subscribers: 3450,
        revenue: 103467,
        churn_rate: 8.9,
        upgrade_rate: 12.3,
        downgrade_rate: 3.4,
        lifetime_value: 1250,
        acquisition_cost: 45
      },
      positioning: {
        target_audience: 'Small teams and professionals',
        value_proposition: 'Professional features at affordable price',
        competitive_advantage: 'Best value for growing businesses'
      }
    },
    {
      id: 'tier-3',
      name: 'Business',
      tier: 'professional',
      price: {
        monthly: 99.99,
        quarterly: 269.99,
        annual: 999.99,
        currency: 'USD'
      },
      features: [
        { name: 'Basic Features', description: 'Core functionality for individuals', included: true },
        { name: 'API Access', description: 'Unlimited API calls', included: true, limit: 'Unlimited' },
        { name: 'Advanced Analytics', description: 'Detailed insights and reporting', included: true },
        { name: 'Priority Support', description: '24/7 email and chat support', included: true, highlighted: true },
        { name: 'Custom Integrations', description: 'Custom API integrations', included: true },
        { name: 'Dedicated Account Manager', description: 'Personal account management', included: false }
      ],
      limits: {
        users: 25,
        api_calls: 100000,
        storage: 100,
        support_level: 'priority'
      },
      metrics: {
        subscribers: 1250,
        revenue: 124988,
        churn_rate: 5.6,
        upgrade_rate: 18.7,
        downgrade_rate: 2.1,
        lifetime_value: 3450,
        acquisition_cost: 125
      },
      positioning: {
        target_audience: 'Medium to large businesses',
        value_proposition: 'Enterprise features for growing teams',
        competitive_advantage: 'Comprehensive solution with priority support'
      }
    },
    {
      id: 'tier-4',
      name: 'Enterprise',
      tier: 'enterprise',
      price: {
        monthly: 499.99,
        quarterly: 1349.99,
        annual: 4999.99,
        currency: 'USD'
      },
      features: [
        { name: 'Basic Features', description: 'Core functionality for individuals', included: true },
        { name: 'API Access', description: 'Unlimited API calls', included: true, limit: 'Unlimited' },
        { name: 'Advanced Analytics', description: 'Detailed insights and reporting', included: true },
        { name: 'Priority Support', description: '24/7 email and chat support', included: true },
        { name: 'Custom Integrations', description: 'Custom API integrations', included: true },
        { name: 'Dedicated Account Manager', description: 'Personal account management', included: true, highlighted: true },
        { name: 'SLA Guarantee', description: '99.9% uptime SLA', included: true },
        { name: 'Custom Development', description: 'Custom feature development', included: true }
      ],
      limits: {
        users: 100,
        api_calls: 1000000,
        storage: 1000,
        support_level: 'dedicated'
      },
      metrics: {
        subscribers: 125,
        revenue: 62499,
        churn_rate: 2.3,
        upgrade_rate: 5.6,
        downgrade_rate: 0.8,
        lifetime_value: 12500,
        acquisition_cost: 625
      },
      positioning: {
        target_audience: 'Large enterprises and organizations',
        value_proposition: 'Complete enterprise solution with premium support',
        competitive_advantage: 'Full-service solution with custom development'
      }
    }
  ]);

  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([
    {
      id: 'stream-1',
      name: 'Subscription Revenue',
      type: 'subscription',
      status: 'active',
      category: 'primary',
      performance: {
        monthly_revenue: 290954,
        growth_rate: 23.4,
        profit_margin: 78.5,
        customer_count: 17325,
        average_transaction: 16.79
      },
      pricing: {
        model: 'tiered_subscription',
        base_price: 29.99,
        currency: 'USD'
      },
      forecasts: {
        next_month: 359077,
        next_quarter: 1123456,
        next_year: 4567890,
        confidence: 0.87
      }
    },
    {
      id: 'stream-2',
      name: 'API Usage Fees',
      type: 'usage_based',
      status: 'active',
      category: 'secondary',
      performance: {
        monthly_revenue: 45678,
        growth_rate: 45.6,
        profit_margin: 85.2,
        customer_count: 3450,
        average_transaction: 13.24
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
      forecasts: {
        next_month: 66456,
        next_quarter: 234567,
        next_year: 1234567,
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
        monthly_revenue: 34567,
        growth_rate: 12.3,
        profit_margin: 52.3,
        customer_count: 125,
        average_transaction: 276.54
      },
      pricing: {
        model: 'hourly_rate',
        base_price: 150,
        currency: 'USD'
      },
      forecasts: {
        next_month: 38789,
        next_quarter: 123456,
        next_year: 567890,
        confidence: 0.78
      }
    },
    {
      id: 'stream-4',
      name: 'Marketplace Commission',
      type: 'commission',
      status: 'testing',
      category: 'experimental',
      performance: {
        monthly_revenue: 12345,
        growth_rate: 67.8,
        profit_margin: 92.1,
        customer_count: 890,
        average_transaction: 13.87
      },
      pricing: {
        model: 'percentage_commission',
        base_price: 15,
        currency: 'USD',
        commission_rate: 0.15
      },
      forecasts: {
        next_month: 20789,
        next_quarter: 89012,
        next_year: 456789,
        confidence: 0.65
      }
    }
  ]);

  const [monetizationStrategies, setMonetizationStrategies] = useState<MonetizationStrategy[]>([
    {
      id: 'strategy-1',
      name: 'Dynamic Pricing Implementation',
      description: 'AI-powered dynamic pricing based on demand and customer behavior',
      type: 'pricing_optimization',
      status: 'active',
      priority: 'high',
      impact: {
        revenue_increase: 15.5,
        cost_savings: 2.3,
        customer_satisfaction: 8.7,
        competitive_advantage: 12.3
      },
      implementation: {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 65,
        phases: [
          { name: 'Data Collection', status: 'completed', progress: 100 },
          { name: 'Model Training', status: 'completed', progress: 100 },
          { name: 'Algorithm Implementation', status: 'in_progress', progress: 75 },
          { name: 'A/B Testing', status: 'pending', progress: 0 }
        ]
      }
    },
    {
      id: 'strategy-2',
      name: 'Feature Gating Optimization',
      description: 'Strategic feature gating to drive upgrades and conversions',
      type: 'feature_gating',
      status: 'completed',
      priority: 'medium',
      impact: {
        revenue_increase: 8.7,
        cost_savings: 1.2,
        customer_satisfaction: 5.6,
        competitive_advantage: 6.7
      },
      implementation: {
        start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 100,
        phases: [
          { name: 'Feature Analysis', status: 'completed', progress: 100 },
          { name: 'Gating Logic', status: 'completed', progress: 100 },
          { name: 'User Testing', status: 'completed', progress: 100 }
        ]
      },
      results: {
        actual_revenue_increase: 9.2,
        actual_cost_savings: 1.4,
        roi: 245.6,
        customer_feedback: 87.3
      }
    },
    {
      id: 'strategy-3',
      name: 'Customer Retention Program',
      description: 'Proactive churn reduction through personalized engagement',
      type: 'retention',
      status: 'planned',
      priority: 'high',
      impact: {
        revenue_increase: 12.3,
        cost_savings: 8.9,
        customer_satisfaction: 15.6,
        competitive_advantage: 8.9
      },
      implementation: {
        start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 0,
        phases: [
          { name: 'Risk Assessment', status: 'pending', progress: 0 },
          { name: 'Campaign Design', status: 'pending', progress: 0 },
          { name: 'Automation Setup', status: 'pending', progress: 0 }
        ]
      }
    }
  ]);

  const [customerLifecycle, setCustomerLifecycle] = useState<CustomerLifecycle[]>([
    {
      stage: 'awareness',
      customers: 50000,
      conversion_rate: 15.2,
      average_time: 7,
      revenue_per_customer: 0,
      churn_rate: 0,
      strategies: ['Content Marketing', 'SEO Optimization', 'Social Media']
    },
    {
      stage: 'consideration',
      customers: 7600,
      conversion_rate: 45.3,
      average_time: 14,
      revenue_per_customer: 0,
      churn_rate: 0,
      strategies: ['Free Trials', 'Product Demos', 'Case Studies']
    },
    {
      stage: 'trial',
      customers: 3443,
      conversion_rate: 67.8,
      average_time: 21,
      revenue_per_customer: 0,
      churn_rate: 12.3,
      strategies: ['Onboarding Flow', 'Feature Highlights', 'Email Nurturing']
    },
    {
      stage: 'conversion',
      customers: 2334,
      conversion_rate: 100,
      average_time: 1,
      revenue_per_customer: 29.99,
      churn_rate: 8.9,
      strategies: ['Pricing Optimization', 'Limited Offers', 'Social Proof']
    },
    {
      stage: 'retention',
      customers: 2125,
      conversion_rate: 91.1,
      average_time: 180,
      revenue_per_customer: 359.88,
      churn_rate: 8.9,
      strategies: ['Customer Support', 'Feature Updates', 'Community Building']
    },
    {
      stage: 'expansion',
      customers: 1935,
      conversion_rate: 23.4,
      average_time: 365,
      revenue_per_customer: 899.97,
      churn_rate: 5.6,
      strategies: ['Upselling Campaigns', 'Cross-selling', 'Usage Analytics']
    },
    {
      stage: 'advocacy',
      customers: 453,
      conversion_rate: 100,
      average_time: 730,
      revenue_per_customer: 1250,
      churn_rate: 2.3,
      strategies: ['Referral Programs', 'Customer Success', 'Community Leadership']
    }
  ]);

  const [config, setConfig] = useState<MonetizationConfig>({
    pricing_strategy: {
      model: 'value_based',
      update_frequency: 'quarterly',
      auto_adjustment: true,
      discount_enabled: true
    },
    subscription_management: {
      auto_renewal: true,
      grace_period_days: 7,
      dunning_enabled: true,
      cancellation_flow: 'retention'
    },
    revenue_optimization: {
      a_b_testing: true,
      price_elasticity_analysis: true,
      customer_segmentation: true,
      churn_prediction: true
    },
    compliance: {
      tax_calculation: true,
      gdpr_compliance: true,
      payment_regulations: true,
      fraud_detection: true
    }
  });

  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  const [selectedStream, setSelectedStream] = useState<RevenueStream | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<MonetizationStrategy | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update subscription tier metrics
      setSubscriptionTiers(prev => prev.map(tier => ({
        ...tier,
        metrics: {
          ...tier.metrics,
          subscribers: tier.metrics.subscribers + Math.floor(Math.random() * 20) - 10,
          revenue: tier.tier === 'free' ? 0 : tier.metrics.revenue * (1 + (Math.random() * 0.04) - 0.02),
          churn_rate: Math.max(0, tier.metrics.churn_rate + (Math.random() * 2) - 1),
          upgrade_rate: Math.max(0, tier.metrics.upgrade_rate + (Math.random() * 2) - 1)
        }
      })));

      // Update revenue streams
      setRevenueStreams(prev => prev.map(stream => ({
        ...stream,
        performance: {
          ...stream.performance,
          monthly_revenue: stream.performance.monthly_revenue * (1 + (Math.random() * 0.05) - 0.025),
          growth_rate: Math.max(0, stream.performance.growth_rate + (Math.random() * 3) - 1.5),
          customer_count: stream.performance.customer_count + Math.floor(Math.random() * 50) - 25
        }
      })));

      // Update monetization strategies
      setMonetizationStrategies(prev => prev.map(strategy => {
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

  const getTierIcon = (tier: SubscriptionTier['tier']) => {
    switch (tier) {
      case 'free': return <Gift className="w-4 h-4" />;
      case 'basic': return <Star className="w-4 h-4" />;
      case 'professional': return <Award className="w-4 h-4" />;
      case 'enterprise': return <Crown className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: SubscriptionTier['tier']) => {
    switch (tier) {
      case 'free': return 'bg-gray-600';
      case 'basic': return 'bg-blue-600';
      case 'professional': return 'bg-purple-600';
      case 'enterprise': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'bg-green-600';
      case 'testing': case 'in_progress': return 'bg-yellow-600';
      case 'planned': case 'pending': return 'bg-gray-600';
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

  const getStreamTypeColor = (type: RevenueStream['type']) => {
    switch (type) {
      case 'subscription': return 'bg-blue-600';
      case 'usage_based': return 'bg-green-600';
      case 'services': return 'bg-purple-600';
      case 'commission': return 'bg-orange-600';
      case 'one_time': return 'bg-red-600';
      case 'licensing': return 'bg-pink-600';
      case 'advertising': return 'bg-indigo-600';
      case 'marketplace': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredTiers = () => {
    return subscriptionTiers.filter(tier => {
      const matchesSearch = tier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tier.tier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tier.tier === filterType;
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
            Monetization Strategies
          </h1>
          <p className="text-gray-400">
            Comprehensive monetization strategies and subscription model management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Subscribers</div>
                <div className="text-2xl font-bold">{subscriptionTiers.reduce((sum, tier) => sum + tier.metrics.subscribers, 0).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Monthly Revenue</div>
                <div className="text-2xl font-bold">${revenueStreams.reduce((sum, stream) => sum + stream.performance.monthly_revenue, 0).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg LTV</div>
                <div className="text-2xl font-bold">
                  ${(subscriptionTiers.reduce((sum, tier) => sum + tier.metrics.lifetime_value * tier.metrics.subscribers, 0) / subscriptionTiers.reduce((sum, tier) => sum + tier.metrics.subscribers, 0)).toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Growth Rate</div>
                <div className="text-2xl font-bold">{(revenueStreams.reduce((sum, stream) => sum + stream.performance.growth_rate, 0) / revenueStreams.length).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Monetization Control Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{subscriptionTiers.length}</div>
              <div className="text-sm text-gray-400">Subscription Tiers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{revenueStreams.length}</div>
              <div className="text-sm text-gray-400">Revenue Streams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{monetizationStrategies.filter(s => s.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Strategies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{(subscriptionTiers.reduce((sum, tier) => sum + tier.metrics.churn_rate * tier.metrics.subscribers, 0) / subscriptionTiers.reduce((sum, tier) => sum + tier.metrics.subscribers, 0)).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Churn Rate</div>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscription Tiers</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tiers..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredTiers().map((tier) => (
                <div
                  key={tier.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTier?.id === tier.id ? 'border-green-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTierIcon(tier.tier)}
                      <div>
                        <h4 className="font-semibold">{tier.name}</h4>
                        <div className="text-sm text-gray-400 capitalize">{tier.tier}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getTierColor(tier.tier)}`}>
                        {tier.tier}
                      </span>
                      <span className="text-lg font-bold">
                        ${tier.price.monthly === 0 ? 'Free' : `$${tier.price.monthly}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Subscribers:</span> {tier.metrics.subscribers.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span> ${tier.metrics.revenue.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Churn Rate:</span> {tier.metrics.churn_rate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Upgrade Rate:</span> {tier.metrics.upgrade_rate.toFixed(1)}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${tier.metrics.subscribers / 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {tier.features.filter(f => f.included).length} features included
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        LTV: ${tier.metrics.lifetime_value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredTiers().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No tiers found
              </div>
            )}
          </div>

          {/* Selected Tier Details */}
          {selectedTier && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Tier Details: {selectedTier.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-400">Pricing</h4>
                    <div className="text-2xl font-bold">
                      ${selectedTier.price.monthly === 0 ? 'Free' : `$${selectedTier.price.monthly}/month`}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Monthly:</span> ${selectedTier.price.monthly}
                    </div>
                    <div>
                      <span className="text-gray-400">Quarterly:</span> ${selectedTier.price.quarterly}
                    </div>
                    <div>
                      <span className="text-gray-400">Annual:</span> ${selectedTier.price.annual}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-green-400 mb-2">Features</h4>
                  <div className="space-y-2">
                    {selectedTier.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {feature.included ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className={feature.included ? '' : 'text-gray-500'}>
                            {feature.name}
                          </span>
                        </div>
                        <div className="text-right">
                          {feature.highlighted && (
                            <span className="px-2 py-1 bg-yellow-600 rounded text-xs">Popular</span>
                          )}
                          {feature.limit && (
                            <span className="text-xs text-gray-400 ml-2">{feature.limit}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subscribers:</span>
                        <span className="font-medium">{selectedTier.metrics.subscribers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="font-medium">${selectedTier.metrics.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Churn Rate:</span>
                        <span className="font-medium">{selectedTier.metrics.churn_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Upgrade Rate:</span>
                        <span className="font-medium">{selectedTier.metrics.upgrade_rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Limits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Users:</span>
                        <span className="font-medium">{selectedTier.limits.users || 'Unlimited'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Calls:</span>
                        <span className="font-medium">{selectedTier.limits.api_calls?.toLocaleString() || 'Unlimited'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage:</span>
                        <span className="font-medium">{selectedTier.limits.storage || 'Unlimited'}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Support:</span>
                        <span className="font-medium capitalize">{selectedTier.limits.support_level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-green-400 mb-2">Positioning</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Target Audience:</span>
                      <div className="mt-1">{selectedTier.positioning.target_audience}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Value Proposition:</span>
                      <div className="mt-1">{selectedTier.positioning.value_proposition}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Streams */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Revenue Streams</h3>
          <div className="space-y-4">
            {revenueStreams.map((stream) => (
              <div key={stream.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{stream.name}</h4>
                    <div className="text-sm text-gray-400">{stream.type}</div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="font-medium">${stream.performance.monthly_revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-medium text-green-400">{stream.performance.growth_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit Margin:</span>
                        <span className="font-medium">{stream.performance.profit_margin.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Pricing</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model:</span>
                        <span className="font-medium">{stream.pricing.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Base Price:</span>
                        <span className="font-medium">${stream.pricing.base_price}</span>
                      </div>
                      {stream.pricing.commission_rate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Commission:</span>
                          <span className="font-medium">{(stream.pricing.commission_rate * 100).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Forecasts</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Month:</span>
                        <span className="font-medium">${stream.forecasts.next_month.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Quarter:</span>
                        <span className="font-medium">${stream.forecasts.next_quarter.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Year:</span>
                        <span className="font-medium">${(stream.forecasts.next_year / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monetization Strategies */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Monetization Strategies</h3>
          <div className="space-y-4">
            {monetizationStrategies.map((strategy) => (
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
                        <span className="text-gray-400">Revenue Increase:</span>
                        <span className="text-green-400">{strategy.impact.revenue_increase.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Savings:</span>
                        <span className="text-blue-400">{strategy.impact.cost_savings.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Customer Satisfaction:</span>
                        <span className="text-purple-400">{strategy.impact.customer_satisfaction.toFixed(1)}%</span>
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

                  <div>
                    <h5 className="font-medium text-sm mb-2">Phases</h5>
                    <div className="space-y-1">
                      {strategy.implementation.phases.map((phase, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(phase.status)}`}></div>
                          <span className={phase.status === 'completed' ? '' : 'text-gray-400'}>
                            {phase.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {phase.progress.toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${strategy.implementation.progress}%` }}
                  ></div>
                </div>

                {strategy.results && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-green-400">Results</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue Increase:</span>
                        <span className="text-green-400">{strategy.results.actual_revenue_increase.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-purple-400">{strategy.results.roi.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Lifecycle */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Customer Lifecycle</h3>
          <div className="space-y-3">
            {customerLifecycle.map((stage) => (
              <div key={stage.stage} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium capitalize">{stage.stage}</h4>
                  <span className="text-sm text-gray-400">
                    {stage.customers.toLocaleString()} customers
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversion Rate:</span>
                    <span>{stage.conversion_rate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Time:</span>
                    <span>{stage.average_time} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue/Customer:</span>
                    <span>${stage.revenue_per_customer.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Churn Rate:</span>
                    <span className="text-red-400">{stage.churn_rate.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-400">Strategies:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stage.strategies.map((strategy, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs">
                        {strategy}
                      </span>
                    ))}
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
              <h2 className="text-2xl font-bold mb-6">Monetization Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Pricing Strategy</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Pricing Model</label>
                      <select
                        value={config.pricing_strategy.model}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          pricing_strategy: { ...prev.pricing_strategy, model: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      >
                        <option value="value_based">Value Based</option>
                        <option value="competitor_based">Competitor Based</option>
                        <option value="cost_plus">Cost Plus</option>
                        <option value="dynamic">Dynamic</option>
                        <option value="freemium">Freemium</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Update Frequency</label>
                      <select
                        value={config.pricing_strategy.update_frequency}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          pricing_strategy: { ...prev.pricing_strategy, update_frequency: e.target.value }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.pricing_strategy.auto_adjustment}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          pricing_strategy: { ...prev.pricing_strategy, auto_adjustment: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Auto Adjustment</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.pricing_strategy.discount_enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          pricing_strategy: { ...prev.pricing_strategy, discount_enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Discount Enabled</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Subscription Management</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.subscription_management.auto_renewal}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          subscription_management: { ...prev.subscription_management, auto_renewal: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Auto Renewal</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.subscription_management.dunning_enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          subscription_management: { ...prev.subscription_management, dunning_enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Dunning Enabled</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Grace Period (days)</label>
                      <input
                        type="number"
                        value={config.subscription_management.grace_period_days}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          subscription_management: { ...prev.subscription_management, grace_period_days: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        min="0"
                        max="30"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Cancellation Flow</label>
                      <select
                        value={config.subscription_management.cancellation_flow}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          subscription_management: { ...prev.subscription_management, cancellation_flow: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      >
                        <option value="simple">Simple</option>
                        <option value="retention">Retention</option>
                        <option value="survey">Survey</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Revenue Optimization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenue_optimization.a_b_testing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          revenue_optimization: { ...prev.revenue_optimization, a_b_testing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">A/B Testing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenue_optimization.price_elasticity_analysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          revenue_optimization: { ...prev.revenue_optimization, price_elasticity_analysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Price Elasticity Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenue_optimization.customer_segmentation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          revenue_optimization: { ...prev.revenue_optimization, customer_segmentation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Customer Segmentation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenue_optimization.churn_prediction}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          revenue_optimization: { ...prev.revenue_optimization, churn_prediction: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Churn Prediction</span>
                    </label>
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

export default MonetizationStrategies;
