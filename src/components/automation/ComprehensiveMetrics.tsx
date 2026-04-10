/**
 * Comprehensive Metrics Component
 * 
 * Advanced metrics and KPI tracking management system
 * Features real-time analytics, performance monitoring, and strategic insights
 */

import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Activity, Target, Zap, Shield, Clock, Users, DollarSign, Award, AlertTriangle, CheckCircle, XCircle, Settings, Search, Filter, Plus, Minus, Edit, Trash2, Eye, EyeOff, Download, Upload, RefreshCw, Calendar, FileText, Database, Cloud, Cpu, Network, Globe, Brain, Heart } from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'operational' | 'customer' | 'product' | 'technical' | 'strategic' | 'compliance' | 'employee';
  type: 'leading' | 'lagging';
  measurement: {
    unit: string;
    target: number;
    current: number;
    baseline: number;
    trend: 'improving' | 'stable' | 'declining';
    frequency: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
    data_source: string;
  };
  performance: {
    score: number;
    rating: 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'critical';
    variance: number;
    last_updated: string;
    confidence_level: number;
  };
  ownership: {
    owner: string;
    department: string;
    reviewers: string[];
    stakeholders: string[];
  };
  alerts: Array<{
    threshold: number;
    condition: 'above' | 'below' | 'equals';
    severity: 'info' | 'warning' | 'critical';
    notification_channels: string[];
    enabled: boolean;
  }>;
  history: Array<{
    date: string;
    value: number;
    target: number;
    events?: string[];
  }>;
}

interface MetricDashboard {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'operational' | 'departmental' | 'project' | 'real_time';
  layout: 'grid' | 'list' | 'card' | 'chart';
  widgets: Array<{
    id: string;
    type: 'kpi' | 'chart' | 'table' | 'gauge' | 'trend' | 'comparison';
    title: string;
    kpi_id?: string;
    data_source?: string;
    visualization: {
      chart_type?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
      time_range: string;
      aggregation: 'sum' | 'average' | 'count' | 'min' | 'max';
    };
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    refresh_interval: number;
  }>;
  permissions: {
    view: string[];
    edit: string[];
    share: string[];
  };
  last_updated: string;
}

interface PerformanceReport {
  id: string;
  name: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'ad_hoc';
  period: {
    start_date: string;
    end_date: string;
  };
  status: 'draft' | 'generating' | 'completed' | 'published';
  sections: Array<{
    title: string;
    type: 'summary' | 'kpi_analysis' | 'trends' | 'insights' | 'recommendations';
    content: string;
    charts?: Array<{
      title: string;
      data: any;
      type: string;
    }>;
  }>;
  metrics: {
    kpis_analyzed: number;
    insights_generated: number;
    recommendations_made: number;
    data_points_processed: number;
  };
  distribution: {
    recipients: string[];
    channels: string[];
    scheduled: boolean;
    frequency?: string;
  };
}

interface AnalyticsEngine {
  id: string;
  name: string;
  type: 'descriptive' | 'diagnostic' | 'predictive' | 'prescriptive';
  status: 'active' | 'inactive' | 'training' | 'error';
  configuration: {
    data_sources: string[];
    algorithms: string[];
    models: string[];
    parameters: Record<string, any>;
  };
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    processing_time: number;
    last_run: string;
  };
  insights: Array<{
    title: string;
    description: string;
    confidence: number;
    impact: 'low' | 'medium' | 'high';
    timestamp: string;
    actionable: boolean;
  }>;
}

interface ComprehensiveMetricsConfig {
  data: {
    real_time_processing: boolean;
    data_validation: boolean;
    quality_checks: boolean;
    backup_frequency: string;
  };
  analytics: {
    machine_learning: boolean;
    anomaly_detection: boolean;
    predictive_analytics: boolean;
    sentiment_analysis: boolean;
  };
  reporting: {
    automated_reports: boolean;
    scheduled_distribution: boolean;
    interactive_dashboards: boolean;
    export_formats: string[];
  };
  alerts: {
    real_time_notifications: boolean;
    escalation_rules: boolean;
    smart_alerts: boolean;
    integration_channels: string[];
  };
}

const ComprehensiveMetrics: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: 'kpi-1',
      name: 'Revenue Growth Rate',
      description: 'Year-over-year revenue growth percentage',
      category: 'financial',
      type: 'lagging',
      measurement: {
        unit: '%',
        target: 25,
        current: 28.5,
        baseline: 15.2,
        trend: 'improving',
        frequency: 'monthly',
        data_source: 'Financial System'
      },
      performance: {
        score: 85.5,
        rating: 'good',
        variance: 13.3,
        last_updated: new Date().toISOString(),
        confidence_level: 0.95
      },
      ownership: {
        owner: 'CFO',
        department: 'Finance',
        reviewers: ['CEO', 'Board'],
        stakeholders: ['Investors', 'Management']
      },
      alerts: [
        {
          threshold: 20,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email', 'slack'],
          enabled: true
        },
        {
          threshold: 15,
          condition: 'below',
          severity: 'critical',
          notification_channels: ['email', 'slack', 'sms'],
          enabled: true
        }
      ],
      history: [
        { date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), value: 15.2, target: 20 },
        { date: new Date(Date.now() - 274 * 24 * 60 * 60 * 1000).toISOString(), value: 18.7, target: 22 },
        { date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000).toISOString(), value: 22.3, target: 24 },
        { date: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000).toISOString(), value: 25.8, target: 25 },
        { date: new Date().toISOString(), value: 28.5, target: 25 }
      ]
    },
    {
      id: 'kpi-2',
      name: 'Customer Satisfaction Score',
      description: 'Net Promoter Score measuring customer loyalty',
      category: 'customer',
      type: 'leading',
      measurement: {
        unit: 'NPS',
        target: 50,
        current: 62,
        baseline: 35,
        trend: 'improving',
        frequency: 'weekly',
        data_source: 'Customer Survey System'
      },
      performance: {
        score: 88.0,
        rating: 'excellent',
        variance: 27.0,
        last_updated: new Date().toISOString(),
        confidence_level: 0.92
      },
      ownership: {
        owner: 'Head of Customer Success',
        department: 'Customer Success',
        reviewers: ['CEO', 'Product Lead'],
        stakeholders: ['All Departments', 'Customers']
      },
      alerts: [
        {
          threshold: 40,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email', 'slack'],
          enabled: true
        }
      ],
      history: [
        { date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), value: 35, target: 45 },
        { date: new Date(Date.now() - 274 * 24 * 60 * 60 * 1000).toISOString(), value: 42, target: 47 },
        { date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000).toISOString(), value: 48, target: 49 },
        { date: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000).toISOString(), value: 55, target: 50 },
        { date: new Date().toISOString(), value: 62, target: 50 }
      ]
    },
    {
      id: 'kpi-3',
      name: 'System Uptime',
      description: 'Percentage of time systems are operational',
      category: 'technical',
      type: 'leading',
      measurement: {
        unit: '%',
        target: 99.9,
        current: 99.85,
        baseline: 98.5,
        trend: 'improving',
        frequency: 'real_time',
        data_source: 'Monitoring System'
      },
      performance: {
        score: 92.5,
        rating: 'good',
        variance: 1.35,
        last_updated: new Date().toISOString(),
        confidence_level: 0.99
      },
      ownership: {
        owner: 'CTO',
        department: 'Engineering',
        reviewers: ['DevOps Lead', 'Infrastructure Manager'],
        stakeholders: ['All Users', 'Customers']
      },
      alerts: [
        {
          threshold: 99.5,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['slack', 'pagerduty'],
          enabled: true
        },
        {
          threshold: 99.0,
          condition: 'below',
          severity: 'critical',
          notification_channels: ['slack', 'pagerduty', 'sms'],
          enabled: true
        }
      ],
      history: [
        { date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), value: 98.5, target: 99.0 },
        { date: new Date(Date.now() - 274 * 24 * 60 * 60 * 1000).toISOString(), value: 99.1, target: 99.5 },
        { date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000).toISOString(), value: 99.6, target: 99.7 },
        { date: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000).toISOString(), value: 99.8, target: 99.8 },
        { date: new Date().toISOString(), value: 99.85, target: 99.9 }
      ]
    },
    {
      id: 'kpi-4',
      name: 'Employee Engagement',
      description: 'Employee satisfaction and engagement score',
      category: 'employee',
      type: 'leading',
      measurement: {
        unit: 'score',
        target: 80,
        current: 76,
        baseline: 65,
        trend: 'stable',
        frequency: 'quarterly',
        data_source: 'HR Survey System'
      },
      performance: {
        score: 78.0,
        rating: 'acceptable',
        variance: 11.0,
        last_updated: new Date().toISOString(),
        confidence_level: 0.88
      },
      ownership: {
        owner: 'HR Director',
        department: 'Human Resources',
        reviewers: ['CEO', 'Department Heads'],
        stakeholders: ['All Employees', 'Management']
      },
      alerts: [
        {
          threshold: 70,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email'],
          enabled: true
        }
      ],
      history: [
        { date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), value: 65, target: 75 },
        { date: new Date(Date.now() - 274 * 24 * 60 * 60 * 1000).toISOString(), value: 70, target: 77 },
        { date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000).toISOString(), value: 74, target: 79 },
        { date: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000).toISOString(), value: 75, target: 80 },
        { date: new Date().toISOString(), value: 76, target: 80 }
      ]
    }
  ]);

  const [dashboards, setDashboards] = useState<MetricDashboard[]>([
    {
      id: 'dashboard-1',
      name: 'Executive Overview',
      description: 'High-level metrics for executive leadership',
      type: 'executive',
      layout: 'grid',
      widgets: [
        {
          id: 'widget-1',
          type: 'kpi',
          title: 'Revenue Growth',
          kpi_id: 'kpi-1',
          visualization: {
            time_range: '12months',
            aggregation: 'average'
          },
          position: { x: 0, y: 0, width: 3, height: 2 },
          refresh_interval: 3600
        },
        {
          id: 'widget-2',
          type: 'kpi',
          title: 'Customer Satisfaction',
          kpi_id: 'kpi-2',
          visualization: {
            time_range: '3months',
            aggregation: 'average'
          },
          position: { x: 3, y: 0, width: 3, height: 2 },
          refresh_interval: 3600
        },
        {
          id: 'widget-3',
          type: 'chart',
          title: 'Performance Trends',
          visualization: {
            chart_type: 'line',
            time_range: '6months',
            aggregation: 'sum'
          },
          position: { x: 0, y: 2, width: 6, height: 3 },
          refresh_interval: 1800
        }
      ],
      permissions: {
        view: ['executives', 'board'],
        edit: ['executives'],
        share: ['executives']
      },
      last_updated: new Date().toISOString()
    },
    {
      id: 'dashboard-2',
      name: 'Operations Dashboard',
      description: 'Real-time operational metrics',
      type: 'real_time',
      layout: 'card',
      widgets: [
        {
          id: 'widget-4',
          type: 'kpi',
          title: 'System Uptime',
          kpi_id: 'kpi-3',
          visualization: {
            time_range: '24hours',
            aggregation: 'average'
          },
          position: { x: 0, y: 0, width: 2, height: 2 },
          refresh_interval: 60
        },
        {
          id: 'widget-5',
          type: 'gauge',
          title: 'Performance Score',
          visualization: {
            time_range: '1hour',
            aggregation: 'average'
          },
          position: { x: 2, y: 0, width: 2, height: 2 },
          refresh_interval: 300
        }
      ],
      permissions: {
        view: ['operations', 'engineering'],
        edit: ['operations'],
        share: ['operations', 'engineering']
      },
      last_updated: new Date().toISOString()
    }
  ]);

  const [reports, setReports] = useState<PerformanceReport[]>([
    {
      id: 'report-1',
      name: 'Monthly Performance Report',
      type: 'monthly',
      period: {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date().toISOString()
      },
      status: 'completed',
      sections: [
        {
          title: 'Executive Summary',
          type: 'summary',
          content: 'Overall performance improved by 15% compared to previous month. Key highlights include revenue growth exceeding targets and customer satisfaction reaching all-time highs.'
        },
        {
          title: 'KPI Analysis',
          type: 'kpi_analysis',
          content: '12 out of 15 KPIs met or exceeded targets. Areas for improvement identified in employee engagement and operational efficiency.'
        },
        {
          title: 'Trends and Insights',
          type: 'trends',
          content: 'Positive trends observed in customer acquisition and retention. Market analysis shows growing demand for premium features.'
        }
      ],
      metrics: {
        kpis_analyzed: 15,
        insights_generated: 8,
        recommendations_made: 5,
        data_points_processed: 50000
      },
      distribution: {
        recipients: ['executives', 'department_heads'],
        channels: ['email', 'dashboard'],
        scheduled: true,
        frequency: 'monthly'
      }
    },
    {
      id: 'report-2',
      name: 'Quarterly Business Review',
      type: 'quarterly',
      period: {
        start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date().toISOString()
      },
      status: 'generating',
      sections: [
        {
          title: 'Quarterly Performance',
          type: 'summary',
          content: 'Q3 performance exceeded expectations with 22% revenue growth and improved operational metrics.'
        }
      ],
      metrics: {
        kpis_analyzed: 25,
        insights_generated: 12,
        recommendations_made: 8,
        data_points_processed: 150000
      },
      distribution: {
        recipients: ['board', 'investors', 'executives'],
        channels: ['email', 'portal'],
        scheduled: true,
        frequency: 'quarterly'
      }
    }
  ]);

  const [analyticsEngines, setAnalyticsEngines] = useState<AnalyticsEngine[]>([
    {
      id: 'engine-1',
      name: 'Revenue Prediction Engine',
      type: 'predictive',
      status: 'active',
      configuration: {
        data_sources: ['financial_system', 'crm', 'market_data'],
        algorithms: ['linear_regression', 'random_forest', 'neural_network'],
        models: ['revenue_forecast_v2'],
        parameters: {
          forecast_horizon: 90,
          confidence_interval: 0.95,
          features: ['historical_revenue', 'market_trends', 'customer_growth']
        }
      },
      performance: {
        accuracy: 0.92,
        precision: 0.89,
        recall: 0.91,
        f1_score: 0.90,
        processing_time: 120,
        last_run: new Date(Date.now() - 3600000).toISOString()
      },
      insights: [
        {
          title: 'Revenue Growth Acceleration',
          description: 'ML models predict 15% higher growth rate for next quarter based on current trends',
          confidence: 0.88,
          impact: 'high',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          actionable: true
        },
        {
          title: 'Seasonal Pattern Detected',
          description: 'Strong seasonal correlation identified in Q4 performance data',
          confidence: 0.92,
          impact: 'medium',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          actionable: true
        }
      ]
    },
    {
      id: 'engine-2',
      name: 'Customer Churn Predictor',
      type: 'predictive',
      status: 'active',
      configuration: {
        data_sources: ['crm', 'support_system', 'usage_analytics'],
        algorithms: ['gradient_boosting', 'svm'],
        models: ['churn_prediction_v3'],
        parameters: {
          prediction_window: 30,
          risk_threshold: 0.7,
          features: ['usage_frequency', 'support_tickets', 'payment_history']
        }
      },
      performance: {
        accuracy: 0.86,
        precision: 0.84,
        recall: 0.82,
        f1_score: 0.83,
        processing_time: 45,
        last_run: new Date(Date.now() - 1800000).toISOString()
      },
      insights: [
        {
          title: 'High-Risk Customer Segment',
          description: 'Customers with declining usage patterns show 3x higher churn probability',
          confidence: 0.91,
          impact: 'high',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          actionable: true
        }
      ]
    }
  ]);

  const [config, setConfig] = useState<ComprehensiveMetricsConfig>({
    data: {
      real_time_processing: true,
      data_validation: true,
      quality_checks: true,
      backup_frequency: 'daily'
    },
    analytics: {
      machine_learning: true,
      anomaly_detection: true,
      predictive_analytics: true,
      sentiment_analysis: false
    },
    reporting: {
      automated_reports: true,
      scheduled_distribution: true,
      interactive_dashboards: true,
      export_formats: ['pdf', 'excel', 'csv', 'json']
    },
    alerts: {
      real_time_notifications: true,
      escalation_rules: true,
      smart_alerts: true,
      integration_channels: ['email', 'slack', 'sms', 'webhook']
    }
  });

  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<MetricDashboard | null>(null);
  const [selectedReport, setSelectedReport] = useState<PerformanceReport | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update KPI values
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        measurement: {
          ...kpi.measurement,
          current: kpi.measurement.current + (Math.random() * 2) - 1
        },
        performance: {
          ...kpi.performance,
          score: Math.max(0, Math.min(100, (kpi.measurement.current / kpi.measurement.target) * 100)),
          last_updated: new Date().toISOString()
        },
        history: [
          ...kpi.history.slice(-4),
          {
            date: new Date().toISOString(),
            value: kpi.measurement.current,
            target: kpi.measurement.target
          }
        ]
      })));

      // Update analytics engines
      setAnalyticsEngines(prev => prev.map(engine => ({
        ...engine,
        performance: {
          ...engine.performance,
          accuracy: Math.max(0, Math.min(1, engine.performance.accuracy + (Math.random() * 0.02) - 0.01)),
          last_run: new Date().toISOString()
        },
        insights: [
          ...engine.insights.slice(-2),
          {
            title: 'New Pattern Detected',
            description: 'Analytics engine identified emerging trend in data patterns',
            confidence: 0.75 + Math.random() * 0.2,
            impact: 'medium' as const,
            timestamp: new Date().toISOString(),
            actionable: true
          }
        ]
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: KPI['category']) => {
    switch (category) {
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'operational': return <Activity className="w-4 h-4" />;
      case 'customer': return <Users className="w-4 h-4" />;
      case 'product': return <Target className="w-4 h-4" />;
      case 'technical': return <Cpu className="w-4 h-4" />;
      case 'strategic': return <Brain className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'employee': return <Heart className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: KPI['category']) => {
    switch (category) {
      case 'financial': return 'bg-green-600';
      case 'operational': return 'bg-blue-600';
      case 'customer': return 'bg-purple-600';
      case 'product': return 'bg-orange-600';
      case 'technical': return 'bg-red-600';
      case 'strategic': return 'bg-indigo-600';
      case 'compliance': return 'bg-yellow-600';
      case 'employee': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getRatingColor = (rating: KPI['performance']['rating']) => {
    switch (rating) {
      case 'excellent': return 'bg-green-600';
      case 'good': return 'bg-blue-600';
      case 'acceptable': return 'bg-yellow-600';
      case 'needs_improvement': return 'bg-orange-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrendIcon = (trend: KPI['measurement']['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-yellow-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFilteredKPIs = () => {
    return kpis.filter(kpi => {
      const matchesSearch = kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kpi.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || kpi.category === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-green-400" />
            Comprehensive Metrics
          </h1>
          <p className="text-gray-400">
            Advanced metrics and KPI tracking management system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total KPIs</div>
                <div className="text-2xl font-bold">{kpis.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Healthy KPIs</div>
                <div className="text-2xl font-bold">{kpis.filter(k => k.performance.rating === 'excellent' || k.performance.rating === 'good').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Dashboards</div>
                <div className="text-2xl font-bold">{dashboards.filter(d => d.type === 'real_time' || d.type === 'executive').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Analytics Engines</div>
                <div className="text-2xl font-bold">{analyticsEngines.filter(e => e.status === 'active').length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Metrics Control Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{kpis.filter(k => k.measurement.trend === 'improving').length}</div>
              <div className="text-sm text-gray-400">Improving Trends</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{reports.filter(r => r.status === 'completed').length}</div>
              <div className="text-sm text-gray-400">Completed Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{dashboards.reduce((sum, d) => sum + d.widgets.length, 0)}</div>
              <div className="text-sm text-gray-400">Total Widgets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{analyticsEngines.reduce((sum, e) => sum + e.insights.length, 0)}</div>
              <div className="text-sm text-gray-400">AI Insights</div>
            </div>
          </div>
        </div>

        {/* KPIs Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search KPIs..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="customer">Customer</option>
                <option value="technical">Technical</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredKPIs().map((kpi) => (
                <div
                  key={kpi.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedKPI?.id === kpi.id ? 'border-green-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedKPI(kpi)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(kpi.category)}
                      <div>
                        <h4 className="font-semibold">{kpi.name}</h4>
                        <div className="text-sm text-gray-400">{kpi.ownership.owner}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(kpi.category)}`}>
                        {kpi.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getRatingColor(kpi.performance.rating)}`}>
                        {kpi.performance.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Current:</span>
                      <span className="font-medium">{kpi.measurement.current.toFixed(1)} {kpi.measurement.unit}</span>
                      {getTrendIcon(kpi.measurement.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Target:</span>
                      <span className="font-medium">{kpi.measurement.target} {kpi.measurement.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Performance:</span>
                      <span className="font-medium ml-1">{kpi.performance.score.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="font-medium ml-1 capitalize">{kpi.type}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${Math.min(100, (kpi.measurement.current / kpi.measurement.target) * 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {kpi.alerts.filter(a => a.enabled).length} alerts
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {kpi.measurement.frequency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredKPIs().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No KPIs found
              </div>
            )}
          </div>

          {/* Selected KPI Details */}
          {selectedKPI && (
            <div>
              <h3 className="text-lg font-semibold mb-4">KPI Details: {selectedKPI.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-300">{selectedKPI.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Measurement Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Value:</span>
                        <span className="font-medium">{selectedKPI.measurement.current.toFixed(2)} {selectedKPI.measurement.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Value:</span>
                        <span className="font-medium">{selectedKPI.measurement.target} {selectedKPI.measurement.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Baseline:</span>
                        <span className="font-medium">{selectedKPI.measurement.baseline} {selectedKPI.measurement.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trend:</span>
                        <span className="font-medium capitalize flex items-center gap-1">
                          {selectedKPI.measurement.trend}
                          {getTrendIcon(selectedKPI.measurement.trend)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Frequency:</span>
                        <span className="font-medium capitalize">{selectedKPI.measurement.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Source:</span>
                        <span className="font-medium">{selectedKPI.measurement.data_source}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Performance Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance Score:</span>
                        <span className="font-medium">{selectedKPI.performance.score.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="font-medium capitalize">{selectedKPI.performance.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Variance:</span>
                        <span className="font-medium">{selectedKPI.performance.variance.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence Level:</span>
                        <span className="font-medium">{(selectedKPI.performance.confidence_level * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedKPI.performance.last_updated).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Ownership</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Owner:</span>
                        <span className="font-medium">{selectedKPI.ownership.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Department:</span>
                        <span className="font-medium">{selectedKPI.ownership.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reviewers:</span>
                        <span className="font-medium">{selectedKPI.ownership.reviewers.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stakeholders:</span>
                        <span className="font-medium">{selectedKPI.ownership.stakeholders.length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Alert Configuration</h4>
                    <div className="space-y-2">
                      {selectedKPI.alerts.map((alert, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span>Threshold: {alert.threshold} {selectedKPI.measurement.unit}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              alert.severity === 'critical' ? 'bg-red-600' :
                              alert.severity === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Condition: {alert.condition} | Channels: {alert.notification_channels.join(', ')} | Enabled: {alert.enabled ? 'Yes' : 'No'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-green-400 mb-2">Historical Performance</h4>
                  <div className="space-y-2">
                    {selectedKPI.history.map((point, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-700 rounded">
                        <span>{new Date(point.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-4">
                          <span>Value: {point.value.toFixed(1)}</span>
                          <span>Target: {point.target}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            point.value >= point.target ? 'bg-green-600' : 'bg-red-600'
                          }`}>
                            {point.value >= point.target ? 'Met' : 'Missed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboards */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Metric Dashboards</h3>
          <div className="space-y-4">
            {dashboards.map((dashboard) => (
              <div key={dashboard.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{dashboard.name}</h4>
                    <div className="text-sm text-gray-400">{dashboard.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${
                      dashboard.type === 'executive' ? 'bg-purple-600' :
                      dashboard.type === 'operational' ? 'bg-blue-600' :
                      dashboard.type === 'real_time' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {dashboard.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {dashboard.widgets.length} widgets
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Layout</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="capitalize">{dashboard.layout}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Widgets:</span>
                        <span>{dashboard.widgets.length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Permissions</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">View Access:</span>
                        <span>{dashboard.permissions.view.length} roles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Edit Access:</span>
                        <span>{dashboard.permissions.edit.length} roles</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Activity</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span>{new Date(dashboard.last_updated).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Refresh:</span>
                        <span>{Math.round(dashboard.widgets.reduce((sum, w) => sum + w.refresh_interval, 0) / dashboard.widgets.length)}s</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Widget Overview</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {dashboard.widgets.map((widget) => (
                      <div key={widget.id} className="p-2 bg-gray-600 rounded text-xs">
                        <div className="font-medium">{widget.title}</div>
                        <div className="text-gray-400 capitalize">{widget.type}</div>
                        <div className="text-gray-400">{widget.refresh_interval}s refresh</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Reports</h3>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 bg-gray-800 rounded-lg cursor-pointer transition-all ${
                    selectedReport?.id === report.id ? 'border-green-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{report.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        report.status === 'completed' ? 'bg-green-600' :
                        report.status === 'generating' ? 'bg-yellow-600' :
                        report.status === 'draft' ? 'bg-gray-600' : 'bg-blue-600'
                      }`}>
                        {report.status}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {report.type}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-300 mb-3">
                    {new Date(report.period.start_date).toLocaleDateString()} - {new Date(report.period.end_date).toLocaleDateString()}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">KPIs Analyzed:</span>
                      <span>{report.metrics.kpis_analyzed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Insights:</span>
                      <span>{report.metrics.insights_generated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recommendations:</span>
                      <span>{report.metrics.recommendations_made}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Points:</span>
                      <span>{report.metrics.data_points_processed.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {report.distribution.recipients.length} recipients
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {report.distribution.scheduled ? 'Scheduled' : 'Manual'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Engines */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Analytics Engines</h3>
            <div className="space-y-3">
              {analyticsEngines.map((engine) => (
                <div key={engine.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{engine.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        engine.type === 'predictive' ? 'bg-purple-600' :
                        engine.type === 'prescriptive' ? 'bg-blue-600' :
                        engine.type === 'diagnostic' ? 'bg-orange-600' : 'bg-green-600'
                      }`}>
                        {engine.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        engine.status === 'active' ? 'bg-green-600' :
                        engine.status === 'training' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {engine.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy:</span>
                      <span>{(engine.performance.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">F1 Score:</span>
                      <span>{(engine.performance.f1_score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing Time:</span>
                      <span>{engine.performance.processing_time}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Run:</span>
                      <span>{new Date(engine.performance.last_run).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-medium text-sm mb-2">Recent Insights</h5>
                    <div className="space-y-2">
                      {engine.insights.slice(-2).map((insight, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{insight.title}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              insight.impact === 'high' ? 'bg-red-600' :
                              insight.impact === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                            }`}>
                              {insight.impact}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{insight.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Confidence: {(insight.confidence * 100).toFixed(0)}% | Actionable: {insight.actionable ? 'Yes' : 'No'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${engine.performance.accuracy * 100}%` }}
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
              <h2 className="text-2xl font-bold mb-6">Comprehensive Metrics Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Data Management</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.data.real_time_processing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          data: { ...prev.data, real_time_processing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Real-time Processing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.data.data_validation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          data: { ...prev.data, data_validation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Data Validation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.data.quality_checks}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          data: { ...prev.data, quality_checks: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Quality Checks</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Analytics & AI</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.machine_learning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, machine_learning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Machine Learning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.anomaly_detection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, anomaly_detection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Anomaly Detection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.predictive_analytics}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, predictive_analytics: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Predictive Analytics</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.analytics.sentiment_analysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          analytics: { ...prev.analytics, sentiment_analysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Sentiment Analysis</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Reporting</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.reporting.automated_reports}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          reporting: { ...prev.reporting, automated_reports: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Automated Reports</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.reporting.scheduled_distribution}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          reporting: { ...prev.reporting, scheduled_distribution: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Scheduled Distribution</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.reporting.interactive_dashboards}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          reporting: { ...prev.reporting, interactive_dashboards: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Interactive Dashboards</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">Alerts & Notifications</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.alerts.real_time_notifications}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          alerts: { ...prev.alerts, real_time_notifications: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Real-time Notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.alerts.escalation_rules}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          alerts: { ...prev.alerts, escalation_rules: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Escalation Rules</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.alerts.smart_alerts}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          alerts: { ...prev.alerts, smart_alerts: e.target.checked }
                        }))}
                        className="w-3 h-3 text-green-600 rounded"
                      />
                      <span className="text-sm">Smart Alerts</span>
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

export default ComprehensiveMetrics;
