/**
 * UX Enhancement Component
 * 
 * Advanced user experience optimization and personalization system
 * Features behavioral analytics, adaptive interfaces, and user journey optimization
 */

import React, { useState, useEffect } from 'react';
import { Users, Eye, MousePointer, Heart, Star, Settings, Search, Filter, Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock, Zap, Shield, Globe, BarChart3, PieChart, Target, Monitor, Smartphone, Tablet, Laptop, Palette, Layout, Brain, Lightbulb, Award, Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';

interface UserBehavior {
  id: string;
  user_id: string;
  session_id: string;
  timestamp: string;
  action_type: 'click' | 'scroll' | 'hover' | 'form_submit' | 'page_view' | 'search' | 'download' | 'share';
  element_id?: string;
  page_url: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: {
    country: string;
    city: string;
    timezone: string;
  };
  duration_ms: number;
  coordinates?: {
    x: number;
    y: number;
  };
  scroll_depth?: number;
  viewport_size: {
    width: number;
    height: number;
  };
  user_agent: string;
  referrer?: string;
}

interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    demographics?: {
      age_range?: string;
      location?: string[];
      language?: string[];
    };
    behavior?: {
      session_duration_min?: number;
      pages_per_session_min?: number;
      bounce_rate_max?: number;
      conversion_rate_min?: number;
    };
    technology?: {
      device_types?: string[];
      browsers?: string[];
      operating_systems?: string[];
    };
    preferences?: {
      features_used?: string[];
      content_types?: string[];
      interaction_patterns?: string[];
    };
  };
  size: number;
  growth_rate: number;
  engagement_score: number;
  conversion_rate: number;
  retention_rate: number;
  satisfaction_score: number;
  personalized_features: string[];
  optimization_suggestions: string[];
}

interface PersonalizationRule {
  id: string;
  name: string;
  description: string;
  type: 'content' | 'layout' | 'navigation' | 'features' | 'notifications' | 'pricing';
  trigger: {
    condition: string;
    parameters: Record<string, any>;
  };
  action: {
    type: string;
    parameters: Record<string, any>;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'inactive' | 'testing' | 'deprecated';
  performance: {
    impressions: number;
    conversions: number;
    engagement_rate: number;
    satisfaction_score: number;
    a_b_test_results?: {
      variant_a: number;
      variant_b: number;
      winner: 'variant_a' | 'variant_b' | 'inconclusive';
      confidence: number;
    };
  };
  created_at: string;
  last_updated: string;
}

interface UXMetrics {
  overall: {
    total_sessions: number;
    unique_users: number;
    average_session_duration: number;
    bounce_rate: number;
    pages_per_session: number;
    conversion_rate: number;
    satisfaction_score: number;
    net_promoter_score: number;
  };
  by_device: Array<{
    device_type: string;
    sessions: number;
    users: number;
    avg_duration: number;
    bounce_rate: number;
    conversion_rate: number;
    satisfaction_score: number;
  }>;
  by_page: Array<{
    page_url: string;
    page_name: string;
    views: number;
    unique_views: number;
    avg_time_on_page: number;
    bounce_rate: number;
    exit_rate: number;
    conversion_rate: number;
  }>;
  user_journey: Array<{
    step: number;
    action: string;
    users: number;
    completion_rate: number;
    avg_time: number;
    drop_off_rate: number;
  }>;
  feedback: Array<{
    type: 'satisfaction' | 'feature_request' | 'bug_report' | 'general';
    rating: number;
    comment?: string;
    timestamp: string;
    user_id: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
}

interface UXEnhancementConfig {
  personalization: {
    enabled: boolean;
    algorithm: 'collaborative_filtering' | 'content_based' | 'hybrid' | 'rule_based';
    update_frequency: string;
    min_data_points: number;
  };
  analytics: {
    real_time_tracking: boolean;
    heatmaps: boolean;
    session_recordings: boolean;
    form_analytics: boolean;
    error_tracking: boolean;
  };
  optimization: {
    auto_a_b_testing: boolean;
    multivariate_testing: boolean;
    progressive_enhancement: boolean;
    adaptive_loading: boolean;
  };
  accessibility: {
    compliance_level: 'AA' | 'AAA' | 'basic';
    auto_alt_text: boolean;
    keyboard_navigation: boolean;
    screen_reader_support: boolean;
    color_blind_support: boolean;
  };
}

const UXEnhancement: React.FC = () => {
  const [userBehaviors, setUserBehaviors] = useState<UserBehavior[]>([
    {
      id: 'behavior-1',
      user_id: 'user-123',
      session_id: 'session-456',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      action_type: 'page_view',
      page_url: '/dashboard',
      device_type: 'desktop',
      browser: 'Chrome',
      location: {
        country: 'United States',
        city: 'New York',
        timezone: 'America/New_York'
      },
      duration_ms: 45000,
      viewport_size: {
        width: 1920,
        height: 1080
      },
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'behavior-2',
      user_id: 'user-124',
      session_id: 'session-457',
      timestamp: new Date(Date.now() - 30000).toISOString(),
      action_type: 'click',
      element_id: 'cta-button',
      page_url: '/pricing',
      device_type: 'mobile',
      browser: 'Safari',
      location: {
        country: 'United Kingdom',
        city: 'London',
        timezone: 'Europe/London'
      },
      duration_ms: 12000,
      coordinates: {
        x: 150,
        y: 300
      },
      viewport_size: {
        width: 375,
        height: 667
      },
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
    },
    {
      id: 'behavior-3',
      user_id: 'user-125',
      session_id: 'session-458',
      timestamp: new Date(Date.now() - 15000).toISOString(),
      action_type: 'scroll',
      page_url: '/features',
      device_type: 'tablet',
      browser: 'Chrome',
      location: {
        country: 'Canada',
        city: 'Toronto',
        timezone: 'America/Toronto'
      },
      duration_ms: 28000,
      scroll_depth: 75,
      viewport_size: {
        width: 768,
        height: 1024
      },
      user_agent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X)'
    }
  ]);

  const [userSegments, setUserSegments] = useState<UserSegment[]>([
    {
      id: 'segment-1',
      name: 'Power Users',
      description: 'Highly engaged users who use advanced features frequently',
      criteria: {
        behavior: {
          session_duration_min: 600,
          pages_per_session_min: 10,
          conversion_rate_min: 0.15
        },
        technology: {
          device_types: ['desktop', 'tablet']
        },
        preferences: {
          features_used: ['advanced_analytics', 'automation', 'api_access'],
          interaction_patterns: ['keyboard_shortcuts', 'power_search']
        }
      },
      size: 1250,
      growth_rate: 12.5,
      engagement_score: 94.2,
      conversion_rate: 18.7,
      retention_rate: 87.3,
      satisfaction_score: 91.5,
      personalized_features: ['advanced_dashboard', 'custom_workflows', 'api_documentation'],
      optimization_suggestions: ['Add keyboard shortcuts', 'Implement dark mode', 'Enhance search functionality']
    },
    {
      id: 'segment-2',
      name: 'Mobile First Users',
      description: 'Users who primarily access the platform on mobile devices',
      criteria: {
        technology: {
          device_types: ['mobile']
        },
        behavior: {
          session_duration_min: 180,
          pages_per_session_min: 5
        }
      },
      size: 3450,
      growth_rate: 23.4,
      engagement_score: 78.6,
      conversion_rate: 12.3,
      retention_rate: 72.8,
      satisfaction_score: 85.2,
      personalized_features: ['mobile_optimized_ui', 'touch_gestures', 'offline_mode'],
      optimization_suggestions: ['Improve mobile navigation', 'Reduce page load time', 'Add swipe gestures']
    },
    {
      id: 'segment-3',
      name: 'New Explorers',
      description: 'Recently registered users exploring the platform',
      criteria: {
        demographics: {
          age_range: '18-35'
        },
        behavior: {
          session_duration_min: 120,
          pages_per_session_min: 3,
          bounce_rate_max: 0.6
        }
      },
      size: 5670,
      growth_rate: 45.6,
      engagement_score: 65.3,
      conversion_rate: 8.9,
      retention_rate: 56.7,
      satisfaction_score: 78.9,
      personalized_features: ['onboarding_tutorial', 'feature_highlights', 'guided_tours'],
      optimization_suggestions: ['Simplify onboarding', 'Add tooltips', 'Create welcome videos']
    }
  ]);

  const [personalizationRules, setPersonalizationRules] = useState<PersonalizationRule[]>([
    {
      id: 'rule-1',
      name: 'Dynamic Content Recommendation',
      description: 'Show personalized content based on user behavior and preferences',
      type: 'content',
      trigger: {
        condition: 'user_segment_matches',
        parameters: { segment: 'Power Users' }
      },
      action: {
        type: 'show_content',
        parameters: { content_type: 'advanced_features', priority: 'high' }
      },
      priority: 'high',
      status: 'active',
      performance: {
        impressions: 12500,
        conversions: 2340,
        engagement_rate: 18.7,
        satisfaction_score: 89.3
      },
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'rule-2',
      name: 'Mobile Layout Optimization',
      description: 'Optimize layout for mobile users with touch-friendly interfaces',
      type: 'layout',
      trigger: {
        condition: 'device_type_matches',
        parameters: { device_type: 'mobile' }
      },
      action: {
        type: 'apply_layout',
        parameters: { layout: 'mobile_optimized', touch_friendly: true }
      },
      priority: 'medium',
      status: 'active',
      performance: {
        impressions: 34500,
        conversions: 4560,
        engagement_rate: 13.2,
        satisfaction_score: 87.6
      },
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'rule-3',
      name: 'New User Onboarding',
      description: 'Provide guided onboarding for new users',
      type: 'navigation',
      trigger: {
        condition: 'user_is_new',
        parameters: { days_since_signup: 7 }
      },
      action: {
        type: 'show_tour',
        parameters: { tour_type: 'comprehensive', interactive: true }
      },
      priority: 'high',
      status: 'testing',
      performance: {
        impressions: 8900,
        conversions: 1234,
        engagement_rate: 13.9,
        satisfaction_score: 85.7,
        a_b_test_results: {
          variant_a: 12.3,
          variant_b: 15.6,
          winner: 'variant_b',
          confidence: 94.2
        }
      },
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [uxMetrics, setUXMetrics] = useState<UXMetrics>({
    overall: {
      total_sessions: 45678,
      unique_users: 12345,
      average_session_duration: 245,
      bounce_rate: 32.4,
      pages_per_session: 4.7,
      conversion_rate: 12.8,
      satisfaction_score: 87.3,
      net_promoter_score: 45.6
    },
    by_device: [
      {
        device_type: 'desktop',
        sessions: 23456,
        users: 6789,
        avg_duration: 345,
        bounce_rate: 28.7,
        conversion_rate: 15.2,
        satisfaction_score: 89.4
      },
      {
        device_type: 'mobile',
        sessions: 18765,
        users: 4567,
        avg_duration: 189,
        bounce_rate: 38.9,
        conversion_rate: 10.3,
        satisfaction_score: 85.1
      },
      {
        device_type: 'tablet',
        sessions: 3457,
        users: 989,
        avg_duration: 267,
        bounce_rate: 31.2,
        conversion_rate: 13.7,
        satisfaction_score: 87.8
      }
    ],
    by_page: [
      {
        page_url: '/dashboard',
        page_name: 'Dashboard',
        views: 12345,
        unique_views: 8901,
        avg_time_on_page: 345,
        bounce_rate: 12.3,
        exit_rate: 23.4,
        conversion_rate: 8.9
      },
      {
        page_url: '/pricing',
        page_name: 'Pricing',
        views: 9876,
        unique_views: 7654,
        avg_time_on_page: 267,
        bounce_rate: 34.5,
        exit_rate: 45.6,
        conversion_rate: 23.4
      },
      {
        page_url: '/features',
        page_name: 'Features',
        views: 7654,
        unique_views: 5432,
        avg_time_on_page: 189,
        bounce_rate: 28.9,
        exit_rate: 34.5,
        conversion_rate: 15.6
      }
    ],
    user_journey: [
      {
        step: 1,
        action: 'Visit Homepage',
        users: 12345,
        completion_rate: 100,
        avg_time: 45,
        drop_off_rate: 0
      },
      {
        step: 2,
        action: 'View Features',
        users: 9876,
        completion_rate: 80,
        avg_time: 123,
        drop_off_rate: 20
      },
      {
        step: 3,
        action: 'Check Pricing',
        users: 7654,
        completion_rate: 62,
        avg_time: 89,
        drop_off_rate: 22
      },
      {
        step: 4,
        action: 'Sign Up',
        users: 4567,
        completion_rate: 37,
        avg_time: 234,
        drop_off_rate: 40
      },
      {
        step: 5,
        action: 'Complete Onboarding',
        users: 2345,
        completion_rate: 19,
        avg_time: 456,
        drop_off_rate: 49
      }
    ],
    feedback: [
      {
        type: 'satisfaction',
        rating: 5,
        comment: 'Great user experience! Very intuitive interface.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user_id: 'user-123',
        sentiment: 'positive'
      },
      {
        type: 'feature_request',
        rating: 4,
        comment: 'Would love to see dark mode support.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        user_id: 'user-124',
        sentiment: 'neutral'
      },
      {
        type: 'bug_report',
        rating: 2,
        comment: 'Mobile navigation is confusing on smaller screens.',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        user_id: 'user-125',
        sentiment: 'negative'
      }
    ]
  });

  const [config, setConfig] = useState<UXEnhancementConfig>({
    personalization: {
      enabled: true,
      algorithm: 'hybrid',
      update_frequency: 'daily',
      min_data_points: 50
    },
    analytics: {
      real_time_tracking: true,
      heatmaps: true,
      session_recordings: true,
      form_analytics: true,
      error_tracking: true
    },
    optimization: {
      auto_a_b_testing: true,
      multivariate_testing: false,
      progressive_enhancement: true,
      adaptive_loading: true
    },
    accessibility: {
      compliance_level: 'AA',
      auto_alt_text: true,
      keyboard_navigation: true,
      screen_reader_support: true,
      color_blind_support: true
    }
  });

  const [selectedSegment, setSelectedSegment] = useState<UserSegment | null>(null);
  const [selectedRule, setSelectedRule] = useState<PersonalizationRule | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update user behaviors with new events
      setUserBehaviors(prev => [
        ...prev.slice(-50), // Keep last 50 behaviors
        {
          id: `behavior-${Date.now()}`,
          user_id: `user-${Math.floor(Math.random() * 1000)}`,
          session_id: `session-${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toISOString(),
          action_type: ['click', 'page_view', 'scroll', 'hover'][Math.floor(Math.random() * 4)] as any,
          page_url: ['/dashboard', '/pricing', '/features', '/settings'][Math.floor(Math.random() * 4)],
          device_type: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)] as any,
          browser: 'Chrome',
          location: {
            country: 'United States',
            city: 'New York',
            timezone: 'America/New_York'
          },
          duration_ms: Math.floor(Math.random() * 60000),
          viewport_size: {
            width: [1920, 375, 768][Math.floor(Math.random() * 3)],
            height: [1080, 667, 1024][Math.floor(Math.random() * 3)]
          },
          user_agent: 'Mozilla/5.0'
        }
      ]);

      // Update metrics with realistic variations
      setUXMetrics(prev => ({
        ...prev,
        overall: {
          ...prev.overall,
          total_sessions: prev.overall.total_sessions + Math.floor(Math.random() * 10) - 5,
          average_session_duration: Math.max(60, prev.overall.average_session_duration + (Math.random() * 20) - 10),
          bounce_rate: Math.max(0, Math.min(100, prev.overall.bounce_rate + (Math.random() * 2) - 1)),
          conversion_rate: Math.max(0, Math.min(100, prev.overall.conversion_rate + (Math.random() * 1) - 0.5))
        }
      }));

      // Update personalization rule performance
      setPersonalizationRules(prev => prev.map(rule => ({
        ...rule,
        performance: {
          ...rule.performance,
          impressions: rule.performance.impressions + Math.floor(Math.random() * 50) - 25,
          conversions: rule.performance.conversions + Math.floor(Math.random() * 5) - 2,
          engagement_rate: Math.max(0, Math.min(100, rule.performance.engagement_rate + (Math.random() * 2) - 1))
        }
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop': return <Laptop className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getRuleTypeColor = (type: PersonalizationRule['type']) => {
    switch (type) {
      case 'content': return 'bg-blue-600';
      case 'layout': return 'bg-green-600';
      case 'navigation': return 'bg-purple-600';
      case 'features': return 'bg-orange-600';
      case 'notifications': return 'bg-red-600';
      case 'pricing': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'testing': return 'bg-yellow-600';
      case 'inactive': return 'bg-gray-600';
      case 'deprecated': return 'bg-red-600';
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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-400" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-400" />;
      case 'neutral': return <Meh className="w-4 h-4 text-yellow-400" />;
      default: return <Meh className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFilteredSegments = () => {
    return userSegments.filter(segment => {
      const matchesSearch = segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           segment.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            UX Enhancement
          </h1>
          <p className="text-gray-400">
            Advanced user experience optimization and personalization system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Sessions</div>
                <div className="text-2xl font-bold">{uxMetrics.overall.total_sessions.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Satisfaction Score</div>
                <div className="text-2xl font-bold">{uxMetrics.overall.satisfaction_score.toFixed(1)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
                <div className="text-2xl font-bold">{uxMetrics.overall.conversion_rate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Session Duration</div>
                <div className="text-2xl font-bold">{Math.floor(uxMetrics.overall.average_session_duration / 60)}m</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">UX Enhancement Control Center</h2>
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
              <div className="text-2xl font-bold text-blue-400">{userSegments.length}</div>
              <div className="text-sm text-gray-400">User Segments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{personalizationRules.filter(r => r.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{uxMetrics.overall.net_promoter_score.toFixed(1)}</div>
              <div className="text-sm text-gray-400">NPS Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{uxMetrics.overall.bounce_rate.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Bounce Rate</div>
            </div>
          </div>
        </div>

        {/* User Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">User Segments</h3>
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search segments..."
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredSegments().map((segment) => (
                <div
                  key={segment.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSegment?.id === segment.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedSegment(segment)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{segment.name}</h4>
                      <div className="text-sm text-gray-400">{segment.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{segment.size.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">users</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Engagement:</span> {segment.engagement_score.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Conversion:</span> {segment.conversion_rate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Retention:</span> {segment.retention_rate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Growth:</span> {segment.growth_rate.toFixed(1)}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${segment.engagement_score}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {segment.personalized_features.length} personalized features
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Satisfaction: {segment.satisfaction_score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredSegments().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No segments found
              </div>
            )}
          </div>

          {/* Selected Segment Details */}
          {selectedSegment && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Segment Details: {selectedSegment.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="font-medium">{selectedSegment.size.toLocaleString()} users</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-medium text-green-400">{selectedSegment.growth_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Engagement Score:</span>
                        <span className="font-medium">{selectedSegment.engagement_score.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversion Rate:</span>
                        <span className="font-medium">{selectedSegment.conversion_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Retention Rate:</span>
                        <span className="font-medium">{selectedSegment.retention_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Satisfaction Score:</span>
                        <span className="font-medium">{selectedSegment.satisfaction_score.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Personalization Features</h4>
                    <div className="space-y-2">
                      {selectedSegment.personalized_features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Optimization Suggestions</h4>
                    <div className="space-y-2">
                      {selectedSegment.optimization_suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Lightbulb className="w-3 h-3 text-yellow-400" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Segment Criteria</h4>
                    <div className="space-y-2 text-sm">
                      {selectedSegment.criteria.behavior && (
                        <div>
                          <span className="text-gray-400">Behavior:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(selectedSegment.criteria.behavior).map(([key, value]) => (
                              <div key={key} className="text-xs text-gray-300">
                                {key}: {value}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedSegment.criteria.technology && (
                        <div>
                          <span className="text-gray-400">Technology:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(selectedSegment.criteria.technology).map(([key, value]) => (
                              <div key={key} className="text-xs text-gray-300">
                                {key}: {Array.isArray(value) ? value.join(', ') : value}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Personalization Rules */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Personalization Rules</h3>
          <div className="space-y-4">
            {personalizationRules.map((rule) => (
              <div key={rule.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{rule.name}</h4>
                    <div className="text-sm text-gray-400">{rule.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getRuleTypeColor(rule.type)}`}>
                      {rule.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(rule.priority)}`}>
                      {rule.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(rule.status)}`}>
                      {rule.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Trigger</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Condition:</span>
                        <span>{rule.trigger.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Parameters:</span>
                        <span>{JSON.stringify(rule.trigger.parameters).substring(0, 30)}...</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Action</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span>{rule.action.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Parameters:</span>
                        <span>{JSON.stringify(rule.action.parameters).substring(0, 30)}...</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Impressions:</span>
                        <span>{rule.performance.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversions:</span>
                        <span>{rule.performance.conversions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Engagement:</span>
                        <span>{rule.performance.engagement_rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {rule.performance.a_b_test_results && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-green-400">A/B Test Results</h5>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Variant A:</span>
                        <span>{rule.performance.a_b_test_results.variant_a.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Variant B:</span>
                        <span>{rule.performance.a_b_test_results.variant_b.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Winner:</span>
                        <span className="capitalize">{rule.performance.a_b_test_results.winner}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Device Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Device Performance</h3>
            <div className="space-y-3">
              {uxMetrics.by_device.map((device) => (
                <div key={device.device_type} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.device_type)}
                      <h4 className="font-medium capitalize">{device.device_type}</h4>
                    </div>
                    <span className="text-sm text-gray-400">
                      {device.sessions.toLocaleString()} sessions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Users:</span>
                      <span>{device.users.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Duration:</span>
                      <span>{Math.floor(device.avg_duration / 60)}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bounce Rate:</span>
                      <span>{device.bounce_rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Conversion:</span>
                      <span>{device.conversion_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${device.satisfaction_score}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Satisfaction: {device.satisfaction_score.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">User Journey Analysis</h3>
            <div className="space-y-3">
              {uxMetrics.user_journey.map((step) => (
                <div key={step.step} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Step {step.step}: {step.action}</h4>
                    <span className="text-sm text-gray-400">
                      {step.users.toLocaleString()} users
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completion:</span>
                      <span>{step.completion_rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Time:</span>
                      <span>{step.avg_time}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Drop-off:</span>
                      <span className="text-red-400">{step.drop_off_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${step.completion_rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Feedback */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent User Feedback</h3>
          <div className="space-y-3">
            {uxMetrics.feedback.slice(-5).map((feedback, index) => (
              <div key={index} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getSentimentIcon(feedback.sentiment)}
                    <span className={`px-2 py-1 rounded text-xs ${
                      feedback.type === 'satisfaction' ? 'bg-green-600' :
                      feedback.type === 'feature_request' ? 'bg-blue-600' :
                      feedback.type === 'bug_report' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {feedback.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(feedback.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {feedback.comment && (
                  <div className="text-sm text-gray-300 mt-2">
                    {feedback.comment}
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
              <h2 className="text-2xl font-bold mb-6">UX Enhancement Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Personalization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.personalization.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          personalization: { ...prev.personalization, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Enable Personalization</span>
                    </label>
                    <div>
                      <label className="text-sm text-gray-400">Algorithm</label>
                      <select
                        value={config.personalization.algorithm}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          personalization: { ...prev.personalization, algorithm: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="collaborative_filtering">Collaborative Filtering</option>
                        <option value="content_based">Content Based</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="rule_based">Rule Based</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Analytics Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.real_time_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, real_time_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Real-time Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.heatmaps}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, heatmaps: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Heatmaps</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.session_recordings}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, session_recordings: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Session Recordings</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.form_analytics}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, form_analytics: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Form Analytics</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Optimization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.auto_a_b_testing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, auto_a_b_testing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto A/B Testing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.progressive_enhancement}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, progressive_enhancement: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Progressive Enhancement</span>
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

export default UXEnhancement;
