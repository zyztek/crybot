/**
 * Ecosystem Integration Component
 * 
 * Comprehensive third-party platform integration and ecosystem management
 * Features API integrations, partner management, and cross-platform synchronization
 */

import React, { useState, useEffect } from 'react';
import { Globe, Network, Link, Settings, Search, Filter, Activity, TrendingUp, BarChart3, PieChart, Target, Zap, Shield, Database, Cloud, Code, Api, Key, RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, Users, Package, Plug, ArrowUpRight, ArrowDownRight, Plus, Minus, Edit, Trash2, Eye, EyeOff, Download, Upload } from 'lucide-react';

interface ThirdPartyPlatform {
  id: string;
  name: string;
  category: 'payment' | 'analytics' | 'crm' | 'marketing' | 'communication' | 'storage' | 'security' | 'development' | 'social' | 'marketplace';
  type: 'api' | 'webhook' | 'sdk' | 'oauth' | 'ftp' | 'database' | 'queue' | 'custom';
  status: 'connected' | 'disconnected' | 'error' | 'testing' | 'maintenance';
  provider: string;
  version: string;
  authentication: {
    method: 'api_key' | 'oauth2' | 'basic_auth' | 'certificate' | 'custom';
    configured: boolean;
    last_verified: string;
    expires_at?: string;
  };
  endpoints: Array<{
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    rate_limit: {
      requests_per_minute: number;
      requests_per_hour: number;
      requests_per_day: number;
    };
    status: 'active' | 'inactive' | 'error';
    last_called?: string;
    response_time?: number;
    success_rate?: number;
  }>;
  usage: {
    requests_today: number;
    requests_this_month: number;
    data_transferred_mb: number;
    error_rate: number;
    average_response_time: number;
  };
  configuration: {
    retry_attempts: number;
    timeout_seconds: number;
    webhook_secret?: string;
    custom_headers?: Record<string, string>;
    environment_variables?: Record<string, string>;
  };
  monitoring: {
    health_check_enabled: boolean;
    health_check_interval: number;
    last_health_check: string;
    uptime_percentage: number;
    alerts_enabled: boolean;
  };
}

interface IntegrationFlow {
  id: string;
  name: string;
  description: string;
  type: 'data_sync' | 'event_driven' | 'scheduled' | 'real_time' | 'batch';
  status: 'active' | 'inactive' | 'error' | 'testing';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source_platform: string;
  target_platform: string;
  data_mapping: Array<{
    source_field: string;
    target_field: string;
    transformation?: string;
    validation?: string;
  }>;
  triggers: Array<{
    type: 'webhook' | 'schedule' | 'event' | 'manual';
    configuration: Record<string, any>;
    enabled: boolean;
  }>;
  performance: {
    executions_today: number;
    executions_this_month: number;
    success_rate: number;
    average_execution_time: number;
    data_processed_mb: number;
    last_execution: string;
  };
  error_handling: {
    retry_policy: string;
    dead_letter_queue: boolean;
    error_notifications: boolean;
    max_retries: number;
  };
}

interface Partner {
  id: string;
  name: string;
  type: 'technology' | 'reseller' | 'integration' | 'strategic' | 'affiliate';
  status: 'active' | 'inactive' | 'pending' | 'terminated';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  contact: {
    email: string;
    phone: string;
    website: string;
    address: string;
  };
  integration_details: {
    platforms_connected: number;
    api_calls_monthly: number;
    data_sync_frequency: string;
    custom_integrations: number;
  };
  performance: {
    revenue_generated: number;
    customers_acquired: number;
    support_tickets: number;
    satisfaction_score: number;
    partnership_duration: number;
  };
  benefits: Array<{
    name: string;
    description: string;
    value: string;
  }>;
  agreements: Array<{
    type: 'api_access' | 'data_sharing' | 'revenue_sharing' | 'co_marketing' | 'technical_support';
    status: 'active' | 'expired' | 'pending';
    start_date: string;
    end_date?: string;
    terms: string;
  }>;
}

interface EcosystemMetrics {
  overview: {
    total_platforms: number;
    active_integrations: number;
    total_partners: number;
    api_calls_today: number;
    data_transferred_gb: number;
    system_uptime: number;
  };
  by_category: Array<{
    category: string;
    platforms: number;
    integrations: number;
    api_calls: number;
    success_rate: number;
  }>;
  performance: Array<{
    date: string;
    api_calls: number;
    success_rate: number;
    average_response_time: number;
    error_count: number;
    data_transferred: number;
  }>;
  health: {
    healthy_platforms: number;
    degraded_platforms: number;
    failed_platforms: number;
    maintenance_platforms: number;
  };
}

interface EcosystemIntegrationConfig {
  security: {
    api_key_rotation: boolean;
    encryption_enabled: boolean;
    audit_logging: boolean;
    access_control: 'rbac' | 'abac' | 'custom';
  };
  monitoring: {
    real_time_alerts: boolean;
    performance_tracking: boolean;
    error_tracking: boolean;
    usage_analytics: boolean;
  };
  optimization: {
    auto_retry: boolean;
    load_balancing: boolean;
    caching_enabled: boolean;
    compression_enabled: boolean;
  };
  compliance: {
    gdpr_compliance: boolean;
    soc2_compliance: boolean;
    data_residency: boolean;
    audit_trail: boolean;
  };
}

const EcosystemIntegration: React.FC = () => {
  const [platforms, setPlatforms] = useState<ThirdPartyPlatform[]>([
    {
      id: 'platform-1',
      name: 'Stripe Payment Gateway',
      category: 'payment',
      type: 'api',
      status: 'connected',
      provider: 'Stripe',
      version: '2023-10-16',
      authentication: {
        method: 'api_key',
        configured: true,
        last_verified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      endpoints: [
        {
          name: 'Create Payment',
          url: 'https://api.stripe.com/v1/payment_intents',
          method: 'POST',
          rate_limit: {
            requests_per_minute: 100,
            requests_per_hour: 5000,
            requests_per_day: 100000
          },
          status: 'active',
          last_called: new Date(Date.now() - 300000).toISOString(),
          response_time: 245,
          success_rate: 99.8
        },
        {
          name: 'Retrieve Customer',
          url: 'https://api.stripe.com/v1/customers',
          method: 'GET',
          rate_limit: {
            requests_per_minute: 100,
            requests_per_hour: 5000,
            requests_per_day: 100000
          },
          status: 'active',
          last_called: new Date(Date.now() - 600000).toISOString(),
          response_time: 189,
          success_rate: 99.9
        }
      ],
      usage: {
        requests_today: 1234,
        requests_this_month: 45678,
        data_transferred_mb: 234.5,
        error_rate: 0.2,
        average_response_time: 217
      },
      configuration: {
        retry_attempts: 3,
        timeout_seconds: 30,
        webhook_secret: 'whsec_***',
        custom_headers: {
          'User-Agent': 'Crybot/1.0'
        }
      },
      monitoring: {
        health_check_enabled: true,
        health_check_interval: 300,
        last_health_check: new Date(Date.now() - 300000).toISOString(),
        uptime_percentage: 99.95,
        alerts_enabled: true
      }
    },
    {
      id: 'platform-2',
      name: 'Google Analytics',
      category: 'analytics',
      type: 'api',
      status: 'connected',
      provider: 'Google',
      version: 'v4',
      authentication: {
        method: 'oauth2',
        configured: true,
        last_verified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      endpoints: [
        {
          name: 'Report Data',
          url: 'https://analyticsreporting.googleapis.com/v4/reports:batchGet',
          method: 'POST',
          rate_limit: {
            requests_per_minute: 60,
            requests_per_hour: 1000,
            requests_per_day: 10000
          },
          status: 'active',
          last_called: new Date(Date.now() - 900000).toISOString(),
          response_time: 567,
          success_rate: 99.5
        }
      ],
      usage: {
        requests_today: 567,
        requests_this_month: 12345,
        data_transferred_mb: 89.2,
        error_rate: 0.5,
        average_response_time: 567
      },
      configuration: {
        retry_attempts: 2,
        timeout_seconds: 45
      },
      monitoring: {
        health_check_enabled: true,
        health_check_interval: 600,
        last_health_check: new Date(Date.now() - 600000).toISOString(),
        uptime_percentage: 99.8,
        alerts_enabled: true
      }
    },
    {
      id: 'platform-3',
      name: 'Salesforce CRM',
      category: 'crm',
      type: 'api',
      status: 'error',
      provider: 'Salesforce',
      version: 'v58.0',
      authentication: {
        method: 'oauth2',
        configured: true,
        last_verified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      endpoints: [
        {
          name: 'Query Records',
          url: 'https://yourinstance.salesforce.com/services/data/v58.0/query',
          method: 'GET',
          rate_limit: {
            requests_per_minute: 200,
            requests_per_hour: 10000,
            requests_per_day: 50000
          },
          status: 'error',
          last_called: new Date(Date.now() - 1800000).toISOString(),
          response_time: 1200,
          success_rate: 85.2
        }
      ],
      usage: {
        requests_today: 234,
        requests_this_month: 6789,
        data_transferred_mb: 156.7,
        error_rate: 14.8,
        average_response_time: 1200
      },
      configuration: {
        retry_attempts: 5,
        timeout_seconds: 60
      },
      monitoring: {
        health_check_enabled: true,
        health_check_interval: 300,
        last_health_check: new Date(Date.now() - 1800000).toISOString(),
        uptime_percentage: 85.2,
        alerts_enabled: true
      }
    },
    {
      id: 'platform-4',
      name: 'AWS S3 Storage',
      category: 'storage',
      type: 'api',
      status: 'connected',
      provider: 'Amazon Web Services',
      version: 'v1',
      authentication: {
        method: 'api_key',
        configured: true,
        last_verified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      endpoints: [
        {
          name: 'Upload Object',
          url: 'https://s3.amazonaws.com/your-bucket',
          method: 'PUT',
          rate_limit: {
            requests_per_minute: 1000,
            requests_per_hour: 50000,
            requests_per_day: 1000000
          },
          status: 'active',
          last_called: new Date(Date.now() - 120000).toISOString(),
          response_time: 123,
          success_rate: 99.9
        }
      ],
      usage: {
        requests_today: 3456,
        requests_this_month: 98765,
        data_transferred_mb: 2345.6,
        error_rate: 0.1,
        average_response_time: 123
      },
      configuration: {
        retry_attempts: 3,
        timeout_seconds: 120
      },
      monitoring: {
        health_check_enabled: true,
        health_check_interval: 300,
        last_health_check: new Date(Date.now() - 300000).toISOString(),
        uptime_percentage: 99.9,
        alerts_enabled: true
      }
    }
  ]);

  const [integrationFlows, setIntegrationFlows] = useState<IntegrationFlow[]>([
    {
      id: 'flow-1',
      name: 'Payment to CRM Sync',
      description: 'Sync payment data from Stripe to Salesforce CRM',
      type: 'event_driven',
      status: 'active',
      priority: 'high',
      source_platform: 'Stripe Payment Gateway',
      target_platform: 'Salesforce CRM',
      data_mapping: [
        { source_field: 'customer.email', target_field: 'Contact.Email' },
        { source_field: 'amount', target_field: 'Opportunity.Amount' },
        { source_field: 'created', target_field: 'Opportunity.Close_Date' }
      ],
      triggers: [
        {
          type: 'webhook',
          configuration: { event: 'payment_intent.succeeded' },
          enabled: true
        }
      ],
      performance: {
        executions_today: 234,
        executions_this_month: 6789,
        success_rate: 98.5,
        average_execution_time: 450,
        data_processed_mb: 12.3,
        last_execution: new Date(Date.now() - 300000).toISOString()
      },
      error_handling: {
        retry_policy: 'exponential_backoff',
        dead_letter_queue: true,
        error_notifications: true,
        max_retries: 3
      }
    },
    {
      id: 'flow-2',
      name: 'Analytics Data Pipeline',
      description: 'Process and analyze user behavior data',
      type: 'batch',
      status: 'active',
      priority: 'medium',
      source_platform: 'Google Analytics',
      target_platform: 'AWS S3 Storage',
      data_mapping: [
        { source_field: 'userId', target_field: 'user_id' },
        { source_field: 'eventCategory', target_field: 'event_category' },
        { source_field: 'eventAction', target_field: 'event_action' }
      ],
      triggers: [
        {
          type: 'schedule',
          configuration: { cron: '0 2 * * *' },
          enabled: true
        }
      ],
      performance: {
        executions_today: 1,
        executions_this_month: 30,
        success_rate: 96.7,
        average_execution_time: 1200,
        data_processed_mb: 234.5,
        last_execution: new Date(Date.now() - 7200000).toISOString()
      },
      error_handling: {
        retry_policy: 'linear',
        dead_letter_queue: true,
        error_notifications: true,
        max_retries: 5
      }
    }
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 'partner-1',
      name: 'TechCorp Solutions',
      type: 'technology',
      status: 'active',
      tier: 'platinum',
      contact: {
        email: 'partnerships@techcorp.com',
        phone: '+1-555-0123',
        website: 'https://techcorp.com',
        address: '123 Tech Street, San Francisco, CA 94105'
      },
      integration_details: {
        platforms_connected: 12,
        api_calls_monthly: 500000,
        data_sync_frequency: 'real_time',
        custom_integrations: 5
      },
      performance: {
        revenue_generated: 1250000,
        customers_acquired: 1250,
        support_tickets: 23,
        satisfaction_score: 94.5,
        partnership_duration: 36
      },
      benefits: [
        { name: 'Priority Support', description: '24/7 dedicated support team', value: 'Premium' },
        { name: 'Custom Integrations', description: 'Tailored integration solutions', value: 'Unlimited' },
        { name: 'Revenue Sharing', description: 'Competitive revenue split', value: '70/30' }
      ],
      agreements: [
        {
          type: 'api_access',
          status: 'active',
          start_date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          terms: 'Full API access with rate limits'
        },
        {
          type: 'revenue_sharing',
          status: 'active',
          start_date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          terms: '70/30 revenue split on referred customers'
        }
      ]
    },
    {
      id: 'partner-2',
      name: 'DataFlow Analytics',
      type: 'integration',
      status: 'active',
      tier: 'gold',
      contact: {
        email: 'hello@dataflow.com',
        phone: '+1-555-0456',
        website: 'https://dataflow.com',
        address: '456 Data Avenue, Austin, TX 78701'
      },
      integration_details: {
        platforms_connected: 8,
        api_calls_monthly: 250000,
        data_sync_frequency: 'hourly',
        custom_integrations: 2
      },
      performance: {
        revenue_generated: 567000,
        customers_acquired: 567,
        support_tickets: 45,
        satisfaction_score: 89.2,
        partnership_duration: 24
      },
      benefits: [
        { name: 'Enhanced Analytics', description: 'Advanced data insights', value: 'Premium' },
        { name: 'Co-marketing', description: 'Joint marketing campaigns', value: 'Quarterly' }
      ],
      agreements: [
        {
          type: 'data_sharing',
          status: 'active',
          start_date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          terms: 'Anonymous data sharing for analytics'
        }
      ]
    }
  ]);

  const [ecosystemMetrics, setEcosystemMetrics] = useState<EcosystemMetrics>({
    overview: {
      total_platforms: 4,
      active_integrations: 2,
      total_partners: 2,
      api_calls_today: 5491,
      data_transferred_gb: 2.83,
      system_uptime: 98.7
    },
    by_category: [
      { category: 'payment', platforms: 1, integrations: 1, api_calls: 1234, success_rate: 99.8 },
      { category: 'analytics', platforms: 1, integrations: 1, api_calls: 567, success_rate: 99.5 },
      { category: 'crm', platforms: 1, integrations: 1, api_calls: 234, success_rate: 85.2 },
      { category: 'storage', platforms: 1, integrations: 0, api_calls: 3456, success_rate: 99.9 }
    ],
    performance: [
      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), api_calls: 5234, success_rate: 98.5, average_response_time: 345, error_count: 78, data_transferred: 2.67 },
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), api_calls: 5456, success_rate: 98.7, average_response_time: 334, error_count: 71, data_transferred: 2.78 },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), api_calls: 5367, success_rate: 98.9, average_response_time: 329, error_count: 59, data_transferred: 2.81 },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), api_calls: 5489, success_rate: 98.6, average_response_time: 338, error_count: 77, data_transferred: 2.85 },
      { date: new Date().toISOString(), api_calls: 5491, success_rate: 98.7, average_response_time: 342, error_count: 71, data_transferred: 2.83 }
    ],
    health: {
      healthy_platforms: 3,
      degraded_platforms: 0,
      failed_platforms: 1,
      maintenance_platforms: 0
    }
  });

  const [config, setConfig] = useState<EcosystemIntegrationConfig>({
    security: {
      api_key_rotation: true,
      encryption_enabled: true,
      audit_logging: true,
      access_control: 'rbac'
    },
    monitoring: {
      real_time_alerts: true,
      performance_tracking: true,
      error_tracking: true,
      usage_analytics: true
    },
    optimization: {
      auto_retry: true,
      load_balancing: true,
      caching_enabled: true,
      compression_enabled: true
    },
    compliance: {
      gdpr_compliance: true,
      soc2_compliance: true,
      data_residency: true,
      audit_trail: true
    }
  });

  const [selectedPlatform, setSelectedPlatform] = useState<ThirdPartyPlatform | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<IntegrationFlow | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update platform usage
      setPlatforms(prev => prev.map(platform => ({
        ...platform,
        usage: {
          ...platform.usage,
          requests_today: platform.usage.requests_today + Math.floor(Math.random() * 50) - 25,
          requests_this_month: platform.usage.requests_this_month + Math.floor(Math.random() * 100) - 50,
          data_transferred_mb: Math.max(0, platform.usage.data_transferred_mb + (Math.random() * 10) - 5),
          error_rate: Math.max(0, platform.usage.error_rate + (Math.random() * 0.2) - 0.1),
          average_response_time: Math.max(50, platform.usage.average_response_time + (Math.random() * 20) - 10)
        }
      })));

      // Update integration flows
      setIntegrationFlows(prev => prev.map(flow => ({
        ...flow,
        performance: {
          ...flow.performance,
          executions_today: flow.performance.executions_today + Math.floor(Math.random() * 10) - 5,
          executions_this_month: flow.performance.executions_this_month + Math.floor(Math.random() * 20) - 10,
          success_rate: Math.max(0, Math.min(100, flow.performance.success_rate + (Math.random() * 2) - 1)),
          average_execution_time: Math.max(100, flow.performance.average_execution_time + (Math.random() * 50) - 25),
          data_processed_mb: Math.max(0, flow.performance.data_processed_mb + (Math.random() * 5) - 2.5)
        }
      })));

      // Update ecosystem metrics
      setEcosystemMetrics(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          api_calls_today: prev.overview.api_calls_today + Math.floor(Math.random() * 100) - 50,
          data_transferred_gb: Math.max(0, prev.overview.data_transferred_gb + (Math.random() * 0.1) - 0.05),
          system_uptime: Math.max(0, Math.min(100, prev.overview.system_uptime + (Math.random() * 0.5) - 0.25))
        },
        performance: [
          ...prev.performance.slice(1),
          {
            date: new Date().toISOString(),
            api_calls: prev.overview.api_calls_today,
            success_rate: 98.7 + (Math.random() * 2) - 1,
            average_response_time: 342 + (Math.random() * 20) - 10,
            error_count: Math.floor(Math.random() * 100),
            data_transferred: prev.overview.data_transferred_gb
          }
        ]
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: ThirdPartyPlatform['category']) => {
    switch (category) {
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'crm': return <Users className="w-4 h-4" />;
      case 'marketing': return <Target className="w-4 h-4" />;
      case 'communication': return <Globe className="w-4 h-4" />;
      case 'storage': return <Database className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'development': return <Code className="w-4 h-4" />;
      case 'social': return <Network className="w-4 h-4" />;
      case 'marketplace': return <Package className="w-4 h-4" />;
      default: return <Plug className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: ThirdPartyPlatform['category']) => {
    switch (category) {
      case 'payment': return 'bg-green-600';
      case 'analytics': return 'bg-blue-600';
      case 'crm': return 'bg-purple-600';
      case 'marketing': return 'bg-orange-600';
      case 'communication': return 'bg-red-600';
      case 'storage': return 'bg-yellow-600';
      case 'security': return 'bg-indigo-600';
      case 'development': return 'bg-pink-600';
      case 'social': return 'bg-teal-600';
      case 'marketplace': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': case 'active': return 'bg-green-600';
      case 'testing': case 'inactive': return 'bg-yellow-600';
      case 'error': case 'failed': return 'bg-red-600';
      case 'disconnected': case 'terminated': return 'bg-gray-600';
      case 'maintenance': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getTierColor = (tier: Partner['tier']) => {
    switch (tier) {
      case 'bronze': return 'bg-orange-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-600';
      case 'diamond': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredPlatforms = () => {
    return platforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           platform.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || platform.category === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-400" />
            Ecosystem Integration
          </h1>
          <p className="text-gray-400">
            Comprehensive third-party platform integration and ecosystem management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Platforms</div>
                <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'connected').length}/{platforms.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">API Calls Today</div>
                <div className="text-2xl font-bold">{ecosystemMetrics.overview.api_calls_today.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Data Transferred</div>
                <div className="text-2xl font-bold">{ecosystemMetrics.overview.data_transferred_gb.toFixed(2)}GB</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">System Uptime</div>
                <div className="text-2xl font-bold">{ecosystemMetrics.overview.system_uptime.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Ecosystem Control Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{integrationFlows.filter(f => f.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Flows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{partners.length}</div>
              <div className="text-sm text-gray-400">Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{ecosystemMetrics.health.healthy_platforms}</div>
              <div className="text-sm text-gray-400">Healthy Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{ecosystemMetrics.performance[ecosystemMetrics.performance.length - 1].success_rate.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Third-Party Platforms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Third-Party Platforms</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search platforms..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="payment">Payment</option>
                <option value="analytics">Analytics</option>
                <option value="crm">CRM</option>
                <option value="storage">Storage</option>
                <option value="communication">Communication</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredPlatforms().map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatform?.id === platform.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(platform.status)}`}></div>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(platform.category)}
                        <div>
                          <h4 className="font-semibold">{platform.name}</h4>
                          <div className="text-sm text-gray-400">{platform.provider} - v{platform.version}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(platform.category)}`}>
                        {platform.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(platform.status)}`}>
                        {platform.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Requests Today:</span> {platform.usage.requests_today.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {platform.usage.error_rate < 5 ? (99.9 - platform.usage.error_rate).toFixed(1) : (100 - platform.usage.error_rate).toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Response:</span> {platform.usage.average_response_time}ms
                    </div>
                    <div>
                      <span className="text-gray-400">Data Transfer:</span> {platform.usage.data_transferred_mb.toFixed(1)}MB
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${platform.monitoring.uptime_percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {platform.endpoints.length} endpoints
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Uptime: {platform.monitoring.uptime_percentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredPlatforms().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No platforms found
              </div>
            )}
          </div>

          {/* Selected Platform Details */}
          {selectedPlatform && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform Details: {selectedPlatform.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Authentication</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Method:</span>
                        <span className="font-medium capitalize">{selectedPlatform.authentication.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Configured:</span>
                        <span className="font-medium">{selectedPlatform.authentication.configured ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Verified:</span>
                        <span className="font-medium">{new Date(selectedPlatform.authentication.last_verified).toLocaleDateString()}</span>
                      </div>
                      {selectedPlatform.authentication.expires_at && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expires:</span>
                          <span className="font-medium">{new Date(selectedPlatform.authentication.expires_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Usage Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requests Today:</span>
                        <span className="font-medium">{selectedPlatform.usage.requests_today.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requests This Month:</span>
                        <span className="font-medium">{selectedPlatform.usage.requests_this_month.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Transferred:</span>
                        <span className="font-medium">{selectedPlatform.usage.data_transferred_mb.toFixed(2)}MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Error Rate:</span>
                        <span className="font-medium">{selectedPlatform.usage.error_rate.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Retry Attempts:</span>
                        <span className="font-medium">{selectedPlatform.configuration.retry_attempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeout:</span>
                        <span className="font-medium">{selectedPlatform.configuration.timeout_seconds}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Health Check:</span>
                        <span className="font-medium">{selectedPlatform.monitoring.health_check_enabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Alerts:</span>
                        <span className="font-medium">{selectedPlatform.monitoring.alerts_enabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Endpoints</h4>
                    <div className="space-y-2">
                      {selectedPlatform.endpoints.map((endpoint, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{endpoint.name}</span>
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(endpoint.status)}`}>
                              {endpoint.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {endpoint.method} {endpoint.url}
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                            <div>
                              <span className="text-gray-400">Rate Limit:</span> {endpoint.rate_limit.requests_per_minute}/min
                            </div>
                            {endpoint.response_time && (
                              <div>
                                <span className="text-gray-400">Response:</span> {endpoint.response_time}ms
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Integration Flows */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Integration Flows</h3>
          <div className="space-y-4">
            {integrationFlows.map((flow) => (
              <div key={flow.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{flow.name}</h4>
                    <div className="text-sm text-gray-400">{flow.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(flow.status)}`}>
                      {flow.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${
                      flow.priority === 'critical' ? 'bg-red-600' :
                      flow.priority === 'high' ? 'bg-orange-600' :
                      flow.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {flow.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Flow Configuration</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="capitalize">{flow.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Source:</span>
                        <span>{flow.source_platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target:</span>
                        <span>{flow.target_platform}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Executions Today:</span>
                        <span>{flow.performance.executions_today}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{flow.performance.success_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Execution:</span>
                        <span>{flow.performance.average_execution_time}ms</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Data Mapping</h5>
                    <div className="space-y-1 text-sm">
                      {flow.data_mapping.slice(0, 3).map((mapping, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400">{mapping.source_field}</span>
                          <span>-> {mapping.target_field}</span>
                        </div>
                      ))}
                      {flow.data_mapping.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{flow.data_mapping.length - 3} more mappings
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${flow.performance.success_rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Ecosystem Partners</h3>
          <div className="space-y-4">
            {partners.map((partner) => (
              <div key={partner.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{partner.name}</h4>
                    <div className="text-sm text-gray-400 capitalize">{partner.type} partner</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getTierColor(partner.tier)}`}>
                      {partner.tier}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Integration Details</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Platforms:</span>
                        <span>{partner.integration_details.platforms_connected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Calls/Month:</span>
                        <span>{partner.integration_details.api_calls_monthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sync Frequency:</span>
                        <span className="capitalize">{partner.integration_details.data_sync_frequency}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span>${partner.performance.revenue_generated.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Customers:</span>
                        <span>{partner.performance.customers_acquired.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Satisfaction:</span>
                        <span>{partner.performance.satisfaction_score.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Partnership</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span>{partner.performance.partnership_duration} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Support Tickets:</span>
                        <span>{partner.performance.support_tickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Agreements:</span>
                        <span>{partner.agreements.length} active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2 text-blue-400">Benefits</h5>
                  <div className="flex flex-wrap gap-2">
                    {partner.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs">
                        {benefit.name}: {benefit.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
            <div className="space-y-3">
              {ecosystemMetrics.performance.slice(-5).map((metric, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{new Date(metric.date).toLocaleDateString()}</h4>
                    <span className="text-sm text-gray-400">
                      Success: {metric.success_rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">API Calls:</span>
                      <span>{metric.api_calls.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span>{metric.average_response_time}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Errors:</span>
                      <span className="text-red-400">{metric.error_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Transfer:</span>
                      <span>{metric.data_transferred.toFixed(2)}GB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
            <div className="space-y-3">
              {ecosystemMetrics.by_category.map((category) => (
                <div key={category.category} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(category.category as any)}
                      <h4 className="font-medium capitalize">{category.category}</h4>
                    </div>
                    <span className="text-sm text-gray-400">
                      {category.platforms} platforms
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Integrations:</span>
                      <span>{category.integrations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">API Calls:</span>
                      <span>{category.api_calls.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span>{category.success_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${category.success_rate}%` }}
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
              <h2 className="text-2xl font-bold mb-6">Ecosystem Integration Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.api_key_rotation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, api_key_rotation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">API Key Rotation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryption_enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, encryption_enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Encryption Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.audit_logging}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, audit_logging: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Audit Logging</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Monitoring</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.real_time_alerts}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, real_time_alerts: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Real-time Alerts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.performance_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, performance_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Performance Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.error_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, error_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Error Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.usage_analytics}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, usage_analytics: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Usage Analytics</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Optimization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.auto_retry}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, auto_retry: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Auto Retry</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.load_balancing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, load_balancing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Load Balancing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.caching_enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, caching_enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Caching Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.optimization.compression_enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, compression_enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Compression Enabled</span>
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

export default EcosystemIntegration;
