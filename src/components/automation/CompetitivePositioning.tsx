/**
 * Competitive Positioning Component
 * 
 * Advanced competitive positioning and market differentiation management system
 * Features market analysis, competitive intelligence, and strategic positioning
 */

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, BarChart3, PieChart, Globe, Shield, Award, AlertTriangle, CheckCircle, XCircle, Activity, Users, DollarSign, Zap, Eye, EyeOff, Settings, Search, Filter, Plus, Minus, Edit, Trash2, ArrowUpRight, ArrowDownRight, Star, Trophy, Crown, Flag, MapPin, Compass, Radar, Crosshair } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  type: 'direct' | 'indirect' | 'emerging' | 'potential';
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  market_share: number;
  growth_rate: number;
  funding_stage?: 'seed' | 'series_a' | 'series_b' | 'series_c' | 'ipo' | 'private';
  headquarters: {
    country: string;
    city: string;
  };
  founded_year: number;
  employee_count: number;
  strengths: string[];
  weaknesses: string[];
  product_offering: {
    features: Array<{
      name: string;
      available: boolean;
      quality: 'basic' | 'good' | 'excellent' | 'industry_leading';
    }>;
    pricing: {
      model: string;
      starting_price: number;
      currency: string;
    };
    target_market: string[];
  };
  market_position: {
    innovation_score: number;
    market_reach: number;
    brand_recognition: number;
    customer_satisfaction: number;
    financial_stability: number;
  };
  recent_activities: Array<{
    type: 'product_launch' | 'funding' | 'acquisition' | 'partnership' | 'expansion';
    description: string;
    date: string;
    impact: 'low' | 'medium' | 'high';
  }>;
}

interface MarketSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  growth_rate: number;
  competition_level: 'low' | 'medium' | 'high' | 'saturated';
  barriers_to_entry: 'low' | 'medium' | 'high';
  customer_segments: Array<{
    name: string;
    size: number;
    characteristics: string[];
    pain_points: string[];
  }>;
  trends: Array<{
    name: string;
    direction: 'increasing' | 'decreasing' | 'stable';
    impact: 'low' | 'medium' | 'high';
    timeframe: 'short_term' | 'medium_term' | 'long_term';
  }>;
  opportunities: Array<{
    type: 'product' | 'service' | 'market' | 'technology';
    description: string;
    potential_value: number;
    difficulty: 'low' | 'medium' | 'high';
  }>;
  threats: Array<{
    type: 'competitive' | 'technological' | 'regulatory' | 'economic';
    description: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
  }>;
}

interface DifferentiationStrategy {
  id: string;
  name: string;
  description: string;
  type: 'cost_leadership' | 'differentiation' | 'focus' | 'hybrid';
  status: 'developing' | 'implementing' | 'measuring' | 'optimizing';
  priority: 'low' | 'medium' | 'high' | 'critical';
  value_proposition: {
    primary_benefit: string;
    supporting_benefits: string[];
    unique_selling_points: string[];
  };
  target_audience: {
    primary: string;
    secondary: string[];
    demographics: Record<string, any>;
  };
  competitive_advantages: Array<{
    type: 'product' | 'service' | 'technology' | 'brand' | 'cost' | 'network';
    description: string;
    sustainability: 'short_term' | 'medium_term' | 'long_term';
    defensibility: 'low' | 'medium' | 'high';
  }>;
  implementation: {
    current_progress: number;
    required_investments: number;
    expected_roi: number;
    timeline_months: number;
    key_initiatives: Array<{
      name: string;
      status: 'planned' | 'in_progress' | 'completed';
      completion_date?: string;
    }>;
  };
  metrics: {
    market_share_change: number;
    customer_acquisition_cost: number;
    customer_lifetime_value: number;
    brand_awareness: number;
    competitive_index: number;
  };
}

interface MarketIntelligence {
  id: string;
  title: string;
  source: string;
  type: 'competitor_news' | 'market_trend' | 'technology_advancement' | 'regulatory_change' | 'customer_insight';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  content: string;
  impact_assessment: {
    relevance: number;
    urgency: number;
    potential_impact: 'low' | 'medium' | 'high';
    action_required: boolean;
  };
  related_competitors: string[];
  tags: string[];
}

interface CompetitivePositioningConfig {
  intelligence: {
    automated_monitoring: boolean;
    social_media_tracking: boolean;
    news_scraping: boolean;
    patent_monitoring: boolean;
  };
  analysis: {
    real_time_updates: boolean;
    predictive_analytics: boolean;
    sentiment_analysis: boolean;
    market_forecasting: boolean;
  };
  strategy: {
    competitive_response_planning: boolean;
    scenario_planning: boolean;
    war_gaming: boolean;
    market_positioning: boolean;
  };
  alerts: {
    competitor_movements: boolean;
    market_shifts: boolean;
    technology_disruptions: boolean;
    opportunity_alerts: boolean;
  };
}

const CompetitivePositioning: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: 'competitor-1',
      name: 'CryptoPro Solutions',
      type: 'direct',
      size: 'medium',
      market_share: 15.2,
      growth_rate: 23.4,
      funding_stage: 'series_b',
      headquarters: {
        country: 'United States',
        city: 'San Francisco'
      },
      founded_year: 2019,
      employee_count: 125,
      strengths: ['Advanced analytics', 'Strong API', 'Enterprise features'],
      weaknesses: ['Limited mobile support', 'High pricing', 'Complex setup'],
      product_offering: {
        features: [
          { name: 'Real-time Trading', available: true, quality: 'excellent' },
          { name: 'Portfolio Management', available: true, quality: 'good' },
          { name: 'Mobile App', available: true, quality: 'basic' },
          { name: 'Advanced Analytics', available: true, quality: 'industry_leading' },
          { name: 'API Access', available: true, quality: 'excellent' }
        ],
        pricing: {
          model: 'subscription',
          starting_price: 99.99,
          currency: 'USD'
        },
        target_market: ['Enterprise', 'Professional Traders', 'Hedge Funds']
      },
      market_position: {
        innovation_score: 8.5,
        market_reach: 6.2,
        brand_recognition: 7.1,
        customer_satisfaction: 8.2,
        financial_stability: 7.8
      },
      recent_activities: [
        {
          type: 'funding',
          description: 'Raised $25M Series B funding led by Andreessen Horowitz',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          impact: 'high'
        },
        {
          type: 'product_launch',
          description: 'Launched AI-powered trading signals feature',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          impact: 'medium'
        }
      ]
    },
    {
      id: 'competitor-2',
      name: 'TradeFlow Analytics',
      type: 'direct',
      size: 'small',
      market_share: 8.7,
      growth_rate: 45.6,
      funding_stage: 'series_a',
      headquarters: {
        country: 'United Kingdom',
        city: 'London'
      },
      founded_year: 2020,
      employee_count: 45,
      strengths: ['User-friendly interface', 'Low pricing', 'Quick onboarding'],
      weaknesses: ['Limited features', 'Scalability issues', 'Basic analytics'],
      product_offering: {
        features: [
          { name: 'Real-time Trading', available: true, quality: 'good' },
          { name: 'Portfolio Management', available: true, quality: 'basic' },
          { name: 'Mobile App', available: true, quality: 'good' },
          { name: 'Advanced Analytics', available: false, quality: 'basic' },
          { name: 'API Access', available: true, quality: 'basic' }
        ],
        pricing: {
          model: 'freemium',
          starting_price: 0,
          currency: 'USD'
        },
        target_market: ['Retail Investors', 'Beginners', 'Small Teams']
      },
      market_position: {
        innovation_score: 6.8,
        market_reach: 4.5,
        brand_recognition: 5.2,
        customer_satisfaction: 7.9,
        financial_stability: 6.1
      },
      recent_activities: [
        {
          type: 'product_launch',
          description: 'Introduced mobile-first trading experience',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          impact: 'medium'
        }
      ]
    },
    {
      id: 'competitor-3',
      name: 'Global Crypto Exchange',
      type: 'indirect',
      size: 'enterprise',
      market_share: 35.8,
      growth_rate: 12.3,
      funding_stage: 'ipo',
      headquarters: {
        country: 'Singapore',
        city: 'Singapore'
      },
      founded_year: 2017,
      employee_count: 850,
      strengths: ['Large user base', 'Global presence', 'High liquidity'],
      weaknesses: ['Complex interface', 'High fees', 'Limited analytics'],
      product_offering: {
        features: [
          { name: 'Real-time Trading', available: true, quality: 'excellent' },
          { name: 'Portfolio Management', available: true, quality: 'basic' },
          { name: 'Mobile App', available: true, quality: 'good' },
          { name: 'Advanced Analytics', available: false, quality: 'basic' },
          { name: 'API Access', available: true, quality: 'good' }
        ],
        pricing: {
          model: 'transaction_based',
          starting_price: 0.1,
          currency: 'USD'
        },
        target_market: ['Mass Market', 'Day Traders', 'Institutional']
      },
      market_position: {
        innovation_score: 5.9,
        market_reach: 9.5,
        brand_recognition: 9.2,
        customer_satisfaction: 6.8,
        financial_stability: 9.1
      },
      recent_activities: [
        {
          type: 'expansion',
          description: 'Expanded operations to 15 new countries',
          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          impact: 'high'
        }
      ]
    }
  ]);

  const [marketSegments, setMarketSegments] = useState<MarketSegment[]>([
    {
      id: 'segment-1',
      name: 'Professional Trading',
      description: 'Advanced trading tools for professional traders and hedge funds',
      size: 2500000000,
      growth_rate: 18.5,
      competition_level: 'high',
      barriers_to_entry: 'high',
      customer_segments: [
        {
          name: 'Hedge Funds',
          size: 50000000,
          characteristics: ['High volume', 'Advanced features', 'Low latency'],
          pain_points: ['Integration complexity', 'Customization needs', 'Regulatory compliance']
        },
        {
          name: 'Professional Traders',
          size: 200000000,
          characteristics: ['Technical analysis', 'Risk management', 'Automation'],
          pain_points: ['Real-time data', 'Advanced analytics', 'Reliability']
        }
      ],
      trends: [
        {
          name: 'AI-powered trading',
          direction: 'increasing',
          impact: 'high',
          timeframe: 'medium_term'
        },
        {
          name: 'DeFi integration',
          direction: 'increasing',
          impact: 'medium',
          timeframe: 'short_term'
        }
      ],
      opportunities: [
        {
          type: 'technology',
          description: 'AI-driven predictive analytics',
          potential_value: 125000000,
          difficulty: 'high'
        },
        {
          type: 'service',
          description: 'Institutional-grade support',
          potential_value: 45000000,
          difficulty: 'medium'
        }
      ],
      threats: [
        {
          type: 'competitive',
          description: 'New entrants with AI capabilities',
          probability: 'medium',
          impact: 'high'
        },
        {
          type: 'regulatory',
          description: 'Stricter trading regulations',
          probability: 'medium',
          impact: 'medium'
        }
      ]
    },
    {
      id: 'segment-2',
      name: 'Retail Investment',
      description: 'User-friendly platforms for individual investors',
      size: 12000000000,
      growth_rate: 35.7,
      competition_level: 'saturated',
      barriers_to_entry: 'medium',
      customer_segments: [
        {
          name: 'Beginner Investors',
          size: 8000000000,
          characteristics: ['Simplicity', 'Education', 'Low cost'],
          pain_points: ['Complex interfaces', 'High fees', 'Lack of guidance']
        },
        {
          name: 'Experienced Retail',
          size: 4000000000,
          characteristics: ['Advanced features', 'Research tools', 'Mobile access'],
          pain_points: ['Limited analytics', 'Poor mobile experience', 'High costs']
        }
      ],
      trends: [
        {
          name: 'Mobile-first trading',
          direction: 'increasing',
          impact: 'high',
          timeframe: 'short_term'
        },
        {
          name: 'Social trading',
          direction: 'increasing',
          impact: 'medium',
          timeframe: 'medium_term'
        }
      ],
      opportunities: [
        {
          type: 'product',
          description: 'Gamified learning experience',
          potential_value: 85000000,
          difficulty: 'low'
        },
        {
          type: 'market',
          description: 'Emerging market expansion',
          potential_value: 150000000,
          difficulty: 'medium'
        }
      ],
      threats: [
        {
          type: 'competitive',
          description: 'Zero-fee trading platforms',
          probability: 'high',
          impact: 'high'
        }
      ]
    }
  ]);

  const [differentiationStrategies, setDifferentiationStrategies] = useState<DifferentiationStrategy[]>([
    {
      id: 'strategy-1',
      name: 'AI-Powered Trading Intelligence',
      description: 'Leverage advanced AI to provide superior trading insights and automation',
      type: 'differentiation',
      status: 'implementing',
      priority: 'high',
      value_proposition: {
        primary_benefit: 'AI-driven trading decisions with 85% accuracy',
        supporting_benefits: ['Automated risk management', 'Predictive analytics', 'Real-time insights'],
        unique_selling_points: ['Proprietary AI models', 'Machine learning optimization', 'Neural network predictions']
      },
      target_audience: {
        primary: 'Professional Traders',
        secondary: ['Hedge Funds', 'Investment Firms'],
        demographics: {
          experience_level: 'advanced',
          portfolio_size: '> $100K',
          trading_frequency: 'daily'
        }
      },
      competitive_advantages: [
        {
          type: 'technology',
          description: 'Proprietary AI algorithms with proven track record',
          sustainability: 'long_term',
          defensibility: 'high'
        },
        {
          type: 'product',
          description: 'Real-time predictive analytics platform',
          sustainability: 'medium_term',
          defensibility: 'medium'
        }
      ],
      implementation: {
        current_progress: 65,
        required_investments: 2500000,
        expected_roi: 185,
        timeline_months: 12,
        key_initiatives: [
          { name: 'AI Model Development', status: 'completed' },
          { name: 'Platform Integration', status: 'in_progress' },
          { name: 'Beta Testing', status: 'planned' }
        ]
      },
      metrics: {
        market_share_change: 5.2,
        customer_acquisition_cost: 125,
        customer_lifetime_value: 3450,
        brand_awareness: 78.5,
        competitive_index: 8.7
      }
    },
    {
      id: 'strategy-2',
      name: 'Premium Customer Experience',
      description: 'Deliver white-glove service and support for high-value clients',
      type: 'focus',
      status: 'measuring',
      priority: 'medium',
      value_proposition: {
        primary_benefit: 'Dedicated support with 15-minute response time',
        supporting_benefits: ['Personalized onboarding', 'Custom solutions', 'Priority access'],
        unique_selling_points: ['24/7 dedicated support', 'Custom feature development', 'Executive account management']
      },
      target_audience: {
        primary: 'Enterprise Clients',
        secondary: ['High Net Worth Individuals', 'Family Offices'],
        demographics: {
          account_size: '> $1M',
          support_requirements: 'premium',
          customization_needs: 'high'
        }
      },
      competitive_advantages: [
        {
          type: 'service',
          description: 'White-glove customer service with dedicated teams',
          sustainability: 'long_term',
          defensibility: 'high'
        },
        {
          type: 'brand',
          description: 'Premium brand positioning in enterprise market',
          sustainability: 'medium_term',
          defensibility: 'medium'
        }
      ],
      implementation: {
        current_progress: 80,
        required_investments: 850000,
        expected_roi: 145,
        timeline_months: 8,
        key_initiatives: [
          { name: 'Support Team Expansion', status: 'completed' },
          { name: 'Service Level Agreements', status: 'completed' },
          { name: 'Customer Success Program', status: 'in_progress' }
        ]
      },
      metrics: {
        market_share_change: 2.8,
        customer_acquisition_cost: 450,
        customer_lifetime_value: 12500,
        brand_awareness: 82.3,
        competitive_index: 7.9
      }
    }
  ]);

  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence[]>([
    {
      id: 'intel-1',
      title: 'CryptoPro Solutions Launches AI Trading Assistant',
      source: 'TechCrunch',
      type: 'competitor_news',
      priority: 'high',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      content: 'CryptoPro Solutions announced the launch of their AI-powered trading assistant, claiming 85% prediction accuracy. This directly competes with our AI offerings.',
      impact_assessment: {
        relevance: 9,
        urgency: 8,
        potential_impact: 'high',
        action_required: true
      },
      related_competitors: ['competitor-1'],
      tags: ['AI', 'product_launch', 'competition']
    },
    {
      id: 'intel-2',
      title: 'Market Trend: DeFi Integration Growing 45% YoY',
      source: 'CoinDesk',
      type: 'market_trend',
      priority: 'medium',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      content: 'Recent market analysis shows DeFi integration in trading platforms growing at 45% year-over-year. Customer demand for decentralized trading features is increasing significantly.',
      impact_assessment: {
        relevance: 8,
        urgency: 6,
        potential_impact: 'medium',
        action_required: true
      },
      related_competitors: [],
      tags: ['DeFi', 'market_trend', 'opportunity']
    },
    {
      id: 'intel-3',
      title: 'TradeFlow Analytics Secures $15M Series A',
      source: 'VentureBeat',
      type: 'competitor_news',
      priority: 'medium',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      content: 'TradeFlow Analytics raised $15M in Series A funding to expand their mobile-first trading platform. This could accelerate their growth and market penetration.',
      impact_assessment: {
        relevance: 7,
        urgency: 5,
        potential_impact: 'medium',
        action_required: false
      },
      related_competitors: ['competitor-2'],
      tags: ['funding', 'competition', 'growth']
    }
  ]);

  const [config, setConfig] = useState<CompetitivePositioningConfig>({
    intelligence: {
      automated_monitoring: true,
      social_media_tracking: true,
      news_scraping: true,
      patent_monitoring: false
    },
    analysis: {
      real_time_updates: true,
      predictive_analytics: true,
      sentiment_analysis: true,
      market_forecasting: false
    },
    strategy: {
      competitive_response_planning: true,
      scenario_planning: true,
      war_gaming: false,
      market_positioning: true
    },
    alerts: {
      competitor_movements: true,
      market_shifts: true,
      technology_disruptions: true,
      opportunity_alerts: true
    }
  });

  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<MarketSegment | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<DifferentiationStrategy | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update competitor metrics
      setCompetitors(prev => prev.map(competitor => ({
        ...competitor,
        market_share: Math.max(0, competitor.market_share + (Math.random() * 2) - 1),
        growth_rate: Math.max(0, competitor.growth_rate + (Math.random() * 4) - 2),
        market_position: {
          ...competitor.market_position,
          innovation_score: Math.max(0, Math.min(10, competitor.market_position.innovation_score + (Math.random() * 0.4) - 0.2)),
          brand_recognition: Math.max(0, Math.min(10, competitor.market_position.brand_recognition + (Math.random() * 0.3) - 0.15))
        }
      })));

      // Update market segments
      setMarketSegments(prev => prev.map(segment => ({
        ...segment,
        growth_rate: Math.max(0, segment.growth_rate + (Math.random() * 3) - 1.5),
        size: segment.size * (1 + (Math.random() * 0.02) - 0.01)
      })));

      // Update differentiation strategies
      setDifferentiationStrategies(prev => prev.map(strategy => ({
        ...strategy,
        implementation: {
          ...strategy.implementation,
          current_progress: Math.min(100, strategy.implementation.current_progress + Math.random() * 3)
        },
        metrics: {
          ...strategy.metrics,
          market_share_change: strategy.metrics.market_share_change + (Math.random() * 0.5) - 0.25,
          brand_awareness: Math.max(0, Math.min(100, strategy.metrics.brand_awareness + (Math.random() * 2) - 1))
        }
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getCompetitorTypeColor = (type: Competitor['type']) => {
    switch (type) {
      case 'direct': return 'bg-red-600';
      case 'indirect': return 'bg-orange-600';
      case 'emerging': return 'bg-yellow-600';
      case 'potential': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getSizeColor = (size: Competitor['size']) => {
    switch (size) {
      case 'startup': return 'bg-green-600';
      case 'small': return 'bg-blue-600';
      case 'medium': return 'bg-purple-600';
      case 'large': return 'bg-orange-600';
      case 'enterprise': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': case 'measuring': return 'bg-green-600';
      case 'implementing': case 'in_progress': case 'testing': return 'bg-yellow-600';
      case 'developing': case 'planned': case 'pending': return 'bg-gray-600';
      case 'optimizing': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'industry_leading': return 'bg-purple-600';
      case 'excellent': return 'bg-blue-600';
      case 'good': return 'bg-green-600';
      case 'basic': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredCompetitors = () => {
    return competitors.filter(competitor => {
      const matchesSearch = competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           competitor.headquarters.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || competitor.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Target className="w-8 h-8 text-red-400" />
            Competitive Positioning
          </h1>
          <p className="text-gray-400">
            Advanced competitive positioning and market differentiation management system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Competitors</div>
                <div className="text-2xl font-bold">{competitors.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Market Growth</div>
                <div className="text-2xl font-bold">
                  {(marketSegments.reduce((sum, seg) => sum + seg.growth_rate, 0) / marketSegments.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Strategies</div>
                <div className="text-2xl font-bold">{differentiationStrategies.filter(s => s.status === 'implementing' || s.status === 'measuring').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Market Intel</div>
                <div className="text-2xl font-bold">{marketIntelligence.filter(i => i.priority === 'high' || i.priority === 'critical').length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Competitive Intelligence Center</h2>
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
              <div className="text-2xl font-bold text-red-400">{competitors.filter(c => c.type === 'direct').length}</div>
              <div className="text-sm text-gray-400">Direct Competitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{marketSegments.length}</div>
              <div className="text-sm text-gray-400">Market Segments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{(competitors.reduce((sum, c) => sum + c.market_share, 0)).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Total Market Share</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{marketIntelligence.length}</div>
              <div className="text-sm text-gray-400">Intel Items</div>
            </div>
          </div>
        </div>

        {/* Competitors Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Competitor Analysis</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search competitors..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="direct">Direct</option>
                <option value="indirect">Indirect</option>
                <option value="emerging">Emerging</option>
                <option value="potential">Potential</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredCompetitors().map((competitor) => (
                <div
                  key={competitor.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCompetitor?.id === competitor.id ? 'border-red-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedCompetitor(competitor)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">{competitor.name}</div>
                        <div className="text-sm text-gray-400">{competitor.headquarters.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCompetitorTypeColor(competitor.type)}`}>
                        {competitor.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getSizeColor(competitor.size)}`}>
                        {competitor.size}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Market Share:</span> {competitor.market_share.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Growth Rate:</span> {competitor.growth_rate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Employees:</span> {competitor.employee_count}
                    </div>
                    <div>
                      <span className="text-gray-400">Founded:</span> {competitor.founded_year}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: `${competitor.market_share * 2}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {competitor.product_offering.features.filter(f => f.available).length} features
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Position: {competitor.market_position.innovation_score.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredCompetitors().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No competitors found
              </div>
            )}
          </div>

          {/* Selected Competitor Details */}
          {selectedCompetitor && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Competitor Details: {selectedCompetitor.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-400 mb-2">Market Position</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Share:</span>
                        <span className="font-medium">{selectedCompetitor.market_share.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-medium text-green-400">{selectedCompetitor.growth_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Innovation Score:</span>
                        <span className="font-medium">{selectedCompetitor.market_position.innovation_score.toFixed(1)}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Brand Recognition:</span>
                        <span className="font-medium">{selectedCompetitor.market_position.brand_recognition.toFixed(1)}/10</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-400 mb-2">Company Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="font-medium capitalize">{selectedCompetitor.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Employees:</span>
                        <span className="font-medium">{selectedCompetitor.employee_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Founded:</span>
                        <span className="font-medium">{selectedCompetitor.founded_year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Funding Stage:</span>
                        <span className="font-medium capitalize">{selectedCompetitor.funding_stage}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-400 mb-2">Product Features</h4>
                    <div className="space-y-2">
                      {selectedCompetitor.product_offering.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {feature.available ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                            <span className={feature.available ? '' : 'text-gray-500'}>
                              {feature.name}
                            </span>
                          </div>
                          {feature.available && (
                            <span className={`px-2 py-1 rounded text-xs ${getQualityColor(feature.quality)}`}>
                              {feature.quality.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-400 mb-2">SWOT Analysis</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-400">Strengths:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCompetitor.strengths.map((strength, index) => (
                            <span key={index} className="px-2 py-1 bg-green-600 rounded text-xs">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Weaknesses:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCompetitor.weaknesses.map((weakness, index) => (
                            <span key={index} className="px-2 py-1 bg-red-600 rounded text-xs">
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-red-400 mb-2">Recent Activities</h4>
                  <div className="space-y-2">
                    {selectedCompetitor.recent_activities.map((activity, index) => (
                      <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium capitalize">{activity.type.replace('_', ' ')}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            activity.impact === 'high' ? 'bg-red-600' :
                            activity.impact === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}>
                            {activity.impact}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{activity.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Market Segments */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Market Segments Analysis</h3>
          <div className="space-y-4">
            {marketSegments.map((segment) => (
              <div key={segment.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{segment.name}</h4>
                    <div className="text-sm text-gray-400">{segment.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      segment.competition_level === 'high' ? 'bg-red-600' :
                      segment.competition_level === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {segment.competition_level} competition
                    </span>
                    <span className="text-sm text-gray-400">
                      ${(segment.size / 1000000000).toFixed(1)}B market
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Segment Metrics</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Size:</span>
                        <span>${(segment.size / 1000000000).toFixed(1)}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="text-green-400">{segment.growth_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Barriers:</span>
                        <span className="capitalize">{segment.barriers_to_entry}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Customer Segments</h5>
                    <div className="space-y-1 text-sm">
                      {segment.customer_segments.map((customer, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{customer.name}</span>
                          <span className="text-gray-400">
                            ${(customer.size / 1000000).toFixed(0)}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Key Trends</h5>
                    <div className="space-y-1">
                      {segment.trends.map((trend, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${
                            trend.direction === 'increasing' ? 'bg-green-400' :
                            trend.direction === 'decreasing' ? 'bg-red-400' : 'bg-yellow-400'
                          }`}></span>
                          <span>{trend.name}</span>
                          <span className="text-xs text-gray-400">
                            {trend.impact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2 text-green-400">Opportunities</h5>
                    <div className="space-y-1">
                      {segment.opportunities.map((opportunity, index) => (
                        <div key={index} className="text-sm">
                          <span className="capitalize">{opportunity.type}:</span> {opportunity.description}
                          <span className="text-xs text-gray-400 ml-2">
                            ${(opportunity.potential_value / 1000000).toFixed(0)}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2 text-red-400">Threats</h5>
                    <div className="space-y-1">
                      {segment.threats.map((threat, index) => (
                        <div key={index} className="text-sm">
                          <span className="capitalize">{threat.type}:</span> {threat.description}
                          <span className="text-xs text-gray-400 ml-2">
                            {threat.probability}/{threat.impact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiation Strategies */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Differentiation Strategies</h3>
          <div className="space-y-4">
            {differentiationStrategies.map((strategy) => (
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
                    <span className="text-xs text-gray-400 capitalize">
                      {strategy.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Value Proposition</h5>
                    <div className="space-y-1 text-sm">
                      <div className="font-medium">{strategy.value_proposition.primary_benefit}</div>
                      {strategy.value_proposition.supporting_benefits.map((benefit, index) => (
                        <div key={index} className="text-gray-400">- {benefit}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Implementation Progress</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span>{strategy.implementation.current_progress.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-green-400">{strategy.implementation.expected_roi.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span>{strategy.implementation.timeline_months} months</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance Metrics</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Share Change:</span>
                        <span>{strategy.metrics.market_share_change.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CAC:</span>
                        <span>${strategy.metrics.customer_acquisition_cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">LTV:</span>
                        <span>${strategy.metrics.customer_lifetime_value}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${strategy.implementation.current_progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Intelligence */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Market Intelligence</h3>
          <div className="space-y-4">
            {marketIntelligence.map((intel) => (
              <div key={intel.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{intel.title}</h4>
                    <div className="text-sm text-gray-400">{intel.source} - {new Date(intel.timestamp).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(intel.priority)}`}>
                      {intel.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${
                      intel.type === 'competitor_news' ? 'bg-red-600' :
                      intel.type === 'market_trend' ? 'bg-green-600' :
                      intel.type === 'technology_advancement' ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}>
                      {intel.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-300 mb-3">
                  {intel.content}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Relevance:</span>
                    <span>{intel.impact_assessment.relevance}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Urgency:</span>
                    <span>{intel.impact_assessment.urgency}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Action Required:</span>
                    <span className={intel.impact_assessment.action_required ? 'text-red-400' : 'text-green-400'}>
                      {intel.impact_assessment.action_required ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {intel.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Competitive Positioning Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-red-400">Intelligence Gathering</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.automated_monitoring}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, automated_monitoring: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Automated Monitoring</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.social_media_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, social_media_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Social Media Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.news_scraping}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, news_scraping: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">News Scraping</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.patent_monitoring}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, patent_monitoring: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Patent Monitoring</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-red-400">Analysis & Analytics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analysis.real_time_updates}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analysis: { ...prev.analysis, real_time_updates: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Real-time Updates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analysis.predictive_analytics}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analysis: { ...prev.analysis, predictive_analytics: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Predictive Analytics</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analysis.sentiment_analysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analysis: { ...prev.analysis, sentiment_analysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Sentiment Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analysis.market_forecasting}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analysis: { ...prev.analysis, market_forecasting: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Market Forecasting</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-red-400">Strategy & Planning</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.strategy.competitive_response_planning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategy: { ...prev.strategy, competitive_response_planning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Competitive Response Planning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.strategy.scenario_planning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategy: { ...prev.strategy, scenario_planning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Scenario Planning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.strategy.war_gaming}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategy: { ...prev.strategy, war_gaming: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">War Gaming</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.strategy.market_positioning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          strategy: { ...prev.strategy, market_positioning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-red-600 rounded"
                      />
                      <span className="text-sm">Market Positioning</span>
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
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

export default CompetitivePositioning;
