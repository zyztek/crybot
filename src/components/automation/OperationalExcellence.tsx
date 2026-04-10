/**
 * Operational Excellence Component
 * 
 * Advanced operational excellence and automation management system
 * Features process optimization, workflow automation, and continuous improvement
 */

import React, { useState, useEffect } from 'react';
import { Settings, Activity, TrendingUp, BarChart3, PieChart, Target, Zap, Shield, Clock, Users, Award, CheckCircle, XCircle, AlertTriangle, RefreshCw, Play, Pause, Square, Plus, Minus, Edit, Trash2, Eye, EyeOff, Filter, Search, Calendar, FileText, GitBranch, Workflow, Cpu, Database, Cloud, Lightbulb } from 'lucide-react';

interface Process {
  id: string;
  name: string;
  description: string;
  category: 'development' | 'deployment' | 'monitoring' | 'support' | 'security' | 'finance' | 'hr' | 'marketing';
  status: 'active' | 'inactive' | 'optimizing' | 'deprecated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  stakeholders: string[];
  metrics: {
    efficiency: number;
    effectiveness: number;
    cycle_time: number;
    cost_per_execution: number;
    error_rate: number;
    satisfaction_score: number;
  };
  automation: {
    automated_steps: number;
    total_steps: number;
    automation_percentage: number;
    time_saved_per_execution: number;
    cost_savings_monthly: number;
  };
  improvement: {
    last_optimized: string;
    optimization_frequency: string;
    improvement_suggestions: Array<{
      title: string;
      description: string;
      impact: 'low' | 'medium' | 'high';
      effort: 'low' | 'medium' | 'high';
      estimated_savings: number;
    }>;
    kaizen_events: number;
  };
}

interface WorkflowAutomation {
  id: string;
  name: string;
  description: string;
  type: 'sequential' | 'parallel' | 'conditional' | 'event_driven' | 'scheduled';
  status: 'active' | 'inactive' | 'error' | 'testing';
  trigger: {
    type: 'manual' | 'schedule' | 'webhook' | 'event' | 'api_call';
    configuration: Record<string, any>;
  };
  steps: Array<{
    id: string;
    name: string;
    type: 'task' | 'decision' | 'approval' | 'notification' | 'integration';
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    assignee?: string;
    estimated_duration: number;
    actual_duration?: number;
    dependencies: string[];
    automation_level: 'manual' | 'semi_automated' | 'fully_automated';
  }>;
  performance: {
    total_executions: number;
    success_rate: number;
    average_duration: number;
    cost_per_execution: number;
    last_execution: string;
    next_scheduled?: string;
  };
  resources: {
    human_resources: number;
    software_licenses: number;
    compute_resources: number;
    storage_requirements: number;
  };
}

interface KPI {
  id: string;
  name: string;
  description: string;
  category: 'efficiency' | 'quality' | 'cost' | 'customer_satisfaction' | 'employee_satisfaction' | 'innovation';
  type: 'leading' | 'lagging';
  measurement: {
    unit: string;
    target: number;
    current: number;
    baseline: number;
    trend: 'improving' | 'stable' | 'declining';
    frequency: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  };
  performance: {
    score: number;
    rating: 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'critical';
    variance: number;
    last_updated: string;
  };
  ownership: {
    owner: string;
    department: string;
    reviewers: string[];
  };
  alerts: Array<{
    threshold: number;
    condition: 'above' | 'below';
    severity: 'info' | 'warning' | 'critical';
    notification_channels: string[];
  }>;
}

interface ContinuousImprovement {
  id: string;
  name: string;
  description: string;
  methodology: 'kaizen' | 'six_sigma' | 'lean' | 'agile' | 'custom';
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scope: {
    processes: string[];
    departments: string[];
    expected_duration: number;
  };
  goals: Array<{
    description: string;
    metric: string;
    target_value: number;
    current_value: number;
    measurement_method: string;
  }>;
  team: {
    leader: string;
    members: string[];
    stakeholders: string[];
  };
  progress: {
    completion_percentage: number;
    phases_completed: number;
    total_phases: number;
    milestones: Array<{
      name: string;
      due_date: string;
      status: 'completed' | 'in_progress' | 'upcoming';
      completion_date?: string;
    }>;
  };
  results?: {
    actual_improvements: Array<{
      metric: string;
      before_value: number;
      after_value: number;
      improvement_percentage: number;
    }>;
    roi: number;
    cost_savings: number;
    efficiency_gains: number;
  };
}

interface OperationalExcellenceConfig {
  automation: {
    auto_optimization: boolean;
    intelligent_routing: boolean;
    predictive_maintenance: boolean;
    self_healing: boolean;
  };
  monitoring: {
    real_time_dashboards: boolean;
    performance_tracking: boolean;
    anomaly_detection: boolean;
    predictive_analytics: boolean;
  };
  improvement: {
    continuous_improvement_program: boolean;
    suggestion_system: boolean;
    knowledge_sharing: boolean;
    best_practices_library: boolean;
  };
  governance: {
    process_documentation: boolean;
    compliance_tracking: boolean;
    audit_trail: boolean;
    change_management: boolean;
  };
}

const OperationalExcellence: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: 'process-1',
      name: 'Software Deployment Pipeline',
      description: 'End-to-end software deployment from development to production',
      category: 'deployment',
      status: 'active',
      priority: 'high',
      owner: 'DevOps Team',
      stakeholders: ['Development', 'QA', 'Operations'],
      metrics: {
        efficiency: 87.5,
        effectiveness: 92.3,
        cycle_time: 45,
        cost_per_execution: 125.50,
        error_rate: 2.3,
        satisfaction_score: 89.7
      },
      automation: {
        automated_steps: 8,
        total_steps: 10,
        automation_percentage: 80,
        time_saved_per_execution: 180,
        cost_savings_monthly: 15420
      },
      improvement: {
        last_optimized: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_frequency: 'monthly',
        improvement_suggestions: [
          {
            title: 'Implement canary deployments',
            description: 'Reduce deployment risk with gradual rollouts',
            impact: 'high',
            effort: 'medium',
            estimated_savings: 25000
          },
          {
            title: 'Optimize test automation',
            description: 'Increase test coverage and reduce manual testing',
            impact: 'medium',
            effort: 'low',
            estimated_savings: 8500
          }
        ],
        kaizen_events: 12
      }
    },
    {
      id: 'process-2',
      name: 'Customer Support Ticket Resolution',
      description: 'Complete customer support workflow from ticket creation to resolution',
      category: 'support',
      status: 'active',
      priority: 'medium',
      owner: 'Support Manager',
      stakeholders: ['Support Team', 'Product Team', 'Engineering'],
      metrics: {
        efficiency: 78.2,
        effectiveness: 85.6,
        cycle_time: 240,
        cost_per_execution: 45.75,
        error_rate: 5.8,
        satisfaction_score: 87.3
      },
      automation: {
        automated_steps: 3,
        total_steps: 7,
        automation_percentage: 43,
        time_saved_per_execution: 45,
        cost_savings_monthly: 6780
      },
      improvement: {
        last_optimized: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_frequency: 'quarterly',
        improvement_suggestions: [
          {
            title: 'Implement AI-powered ticket routing',
            description: 'Automatically categorize and route tickets to appropriate teams',
            impact: 'high',
            effort: 'medium',
            estimated_savings: 18500
          }
        ],
        kaizen_events: 8
      }
    },
    {
      id: 'process-3',
      name: 'Financial Reporting Process',
      description: 'Monthly financial reporting and analysis workflow',
      category: 'finance',
      status: 'optimizing',
      priority: 'high',
      owner: 'Finance Director',
      stakeholders: ['Finance Team', 'Executive Management', 'Audit'],
      metrics: {
        efficiency: 72.8,
        effectiveness: 88.9,
        cycle_time: 120,
        cost_per_execution: 890.25,
        error_rate: 1.2,
        satisfaction_score: 91.5
      },
      automation: {
        automated_steps: 4,
        total_steps: 8,
        automation_percentage: 50,
        time_saved_per_execution: 120,
        cost_savings_monthly: 12450
      },
      improvement: {
        last_optimized: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        optimization_frequency: 'monthly',
        improvement_suggestions: [
          {
            title: 'Implement automated data reconciliation',
            description: 'Reduce manual data validation and reconciliation time',
            impact: 'high',
            effort: 'high',
            estimated_savings: 35000
          },
          {
            title: 'Create dashboard templates',
            description: 'Standardize reporting templates for faster generation',
            impact: 'medium',
            effort: 'low',
            estimated_savings: 9200
          }
        ],
        kaizen_events: 15
      }
    }
  ]);

  const [workflowAutomations, setWorkflowAutomations] = useState<WorkflowAutomation[]>([
    {
      id: 'workflow-1',
      name: 'Automated Code Review',
      description: 'Automated code review and quality checks for pull requests',
      type: 'event_driven',
      status: 'active',
      trigger: {
        type: 'webhook',
        configuration: { event: 'pull_request.created' }
      },
      steps: [
        {
          id: 'step-1',
          name: 'Code Quality Analysis',
          type: 'task',
          status: 'completed',
          estimated_duration: 5,
          actual_duration: 4,
          automation_level: 'fully_automated'
        },
        {
          id: 'step-2',
          name: 'Security Scan',
          type: 'task',
          status: 'completed',
          estimated_duration: 8,
          actual_duration: 7,
          automation_level: 'fully_automated'
        },
        {
          id: 'step-3',
          name: 'Unit Test Execution',
          type: 'task',
          status: 'running',
          estimated_duration: 15,
          automation_level: 'fully_automated'
        },
        {
          id: 'step-4',
          name: 'Review Assignment',
          type: 'approval',
          status: 'pending',
          assignee: 'Senior Developer',
          estimated_duration: 30,
          automation_level: 'manual'
        }
      ],
      performance: {
        total_executions: 1234,
        success_rate: 94.5,
        average_duration: 45,
        cost_per_execution: 2.50,
        last_execution: new Date(Date.now() - 3600000).toISOString()
      },
      resources: {
        human_resources: 1,
        software_licenses: 3,
        compute_resources: 2,
        storage_requirements: 5
      }
    },
    {
      id: 'workflow-2',
      name: 'Employee Onboarding',
      description: 'Complete employee onboarding process from hire to first day',
      type: 'sequential',
      status: 'active',
      trigger: {
        type: 'event',
        configuration: { event: 'employee.hired' }
      },
      steps: [
        {
          id: 'step-1',
          name: 'Account Creation',
          type: 'task',
          status: 'completed',
          estimated_duration: 10,
          actual_duration: 8,
          automation_level: 'fully_automated'
        },
        {
          id: 'step-2',
          name: 'Equipment Assignment',
          type: 'task',
          status: 'completed',
          estimated_duration: 30,
          actual_duration: 25,
          automation_level: 'semi_automated'
        },
        {
          id: 'step-3',
          name: 'Welcome Package',
          type: 'notification',
          status: 'completed',
          estimated_duration: 5,
          actual_duration: 3,
          automation_level: 'fully_automated'
        },
        {
          id: 'step-4',
          name: 'Training Schedule',
          type: 'task',
          status: 'pending',
          assignee: 'HR Coordinator',
          estimated_duration: 60,
          automation_level: 'manual'
        }
      ],
      performance: {
        total_executions: 45,
        success_rate: 97.8,
        average_duration: 180,
        cost_per_execution: 125.00,
        last_execution: new Date(Date.now() - 7200000).toISOString()
      },
      resources: {
        human_resources: 3,
        software_licenses: 2,
        compute_resources: 1,
        storage_requirements: 2
      }
    }
  ]);

  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: 'kpi-1',
      name: 'Process Efficiency Score',
      description: 'Overall efficiency across all operational processes',
      category: 'efficiency',
      type: 'lagging',
      measurement: {
        unit: '%',
        target: 90,
        current: 82.7,
        baseline: 75.3,
        trend: 'improving',
        frequency: 'daily'
      },
      performance: {
        score: 82.7,
        rating: 'good',
        variance: 7.4,
        last_updated: new Date().toISOString()
      },
      ownership: {
        owner: 'Operations Director',
        department: 'Operations',
        reviewers: ['Process Owners', 'Quality Team']
      },
      alerts: [
        {
          threshold: 85,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email', 'slack']
        },
        {
          threshold: 75,
          condition: 'below',
          severity: 'critical',
          notification_channels: ['email', 'slack', 'sms']
        }
      ]
    },
    {
      id: 'kpi-2',
      name: 'Automation Coverage',
      description: 'Percentage of processes with automation implemented',
      category: 'efficiency',
      type: 'leading',
      measurement: {
        unit: '%',
        target: 75,
        current: 68.4,
        baseline: 45.2,
        trend: 'improving',
        frequency: 'weekly'
      },
      performance: {
        score: 68.4,
        rating: 'acceptable',
        variance: 23.2,
        last_updated: new Date().toISOString()
      },
      ownership: {
        owner: 'Automation Lead',
        department: 'Technology',
        reviewers: ['DevOps Team', 'Process Owners']
      },
      alerts: [
        {
          threshold: 70,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email']
        }
      ]
    },
    {
      id: 'kpi-3',
      name: 'Customer Satisfaction',
      description: 'Customer satisfaction with operational processes',
      category: 'customer_satisfaction',
      type: 'lagging',
      measurement: {
        unit: 'score',
        target: 4.5,
        current: 4.2,
        baseline: 3.8,
        trend: 'stable',
        frequency: 'monthly'
      },
      performance: {
        score: 4.2,
        rating: 'good',
        variance: 0.4,
        last_updated: new Date().toISOString()
      },
      ownership: {
        owner: 'Customer Success Manager',
        department: 'Customer Success',
        reviewers: ['Support Team', 'Product Team']
      },
      alerts: [
        {
          threshold: 4.0,
          condition: 'below',
          severity: 'warning',
          notification_channels: ['email', 'slack']
        }
      ]
    }
  ]);

  const [continuousImprovements, setContinuousImprovements] = useState<ContinuousImprovement[]>([
    {
      id: 'improvement-1',
      name: 'Deployment Pipeline Optimization',
      description: 'Six Sigma project to reduce deployment failures and improve speed',
      methodology: 'six_sigma',
      status: 'active',
      priority: 'high',
      scope: {
        processes: ['Software Deployment Pipeline'],
        departments: ['DevOps', 'Development', 'QA'],
        expected_duration: 90
      },
      goals: [
        {
          description: 'Reduce deployment failure rate',
          metric: 'deployment_failure_rate',
          target_value: 1,
          current_value: 2.3,
          measurement_method: 'automated_monitoring'
        },
        {
          description: 'Reduce deployment time',
          metric: 'deployment_cycle_time',
          target_value: 30,
          current_value: 45,
          measurement_method: 'pipeline_metrics'
        }
      ],
      team: {
        leader: 'DevOps Manager',
        members: ['Senior DevOps Engineer', 'QA Lead', 'Developer'],
        stakeholders: ['CTO', 'VP Engineering']
      },
      progress: {
        completion_percentage: 65,
        phases_completed: 3,
        total_phases: 5,
        milestones: [
          {
            name: 'Analysis Phase',
            due_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            completion_date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            name: 'Design Phase',
            due_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            completion_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            name: 'Implementation Phase',
            due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in_progress'
          },
          {
            name: 'Control Phase',
            due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming'
          }
        ]
      }
    },
    {
      id: 'improvement-2',
      name: 'Support Process Kaizen',
      description: 'Continuous improvement of customer support processes',
      methodology: 'kaizen',
      status: 'completed',
      priority: 'medium',
      scope: {
        processes: ['Customer Support Ticket Resolution'],
        departments: ['Support', 'Product'],
        expected_duration: 30
      },
      goals: [
        {
          description: 'Improve first contact resolution rate',
          metric: 'first_contact_resolution',
          target_value: 75,
          current_value: 68,
          measurement_method: 'ticket_analysis'
        }
      ],
      team: {
        leader: 'Support Manager',
        members: ['Support Team Lead', 'Product Specialist'],
        stakeholders: ['Head of Customer Experience']
      },
      progress: {
        completion_percentage: 100,
        phases_completed: 3,
        total_phases: 3,
        milestones: [
          {
            name: 'Current State Analysis',
            due_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            completion_date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            name: 'Improvement Implementation',
            due_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            completion_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            name: 'Results Validation',
            due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            completion_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      },
      results: {
        actual_improvements: [
          {
            metric: 'first_contact_resolution',
            before_value: 68,
            after_value: 74,
            improvement_percentage: 8.8
          }
        ],
        roi: 245.6,
        cost_savings: 12500,
        efficiency_gains: 12.3
      }
    }
  ]);

  const [config, setConfig] = useState<OperationalExcellenceConfig>({
    automation: {
      auto_optimization: true,
      intelligent_routing: true,
      predictive_maintenance: false,
      self_healing: true
    },
    monitoring: {
      real_time_dashboards: true,
      performance_tracking: true,
      anomaly_detection: true,
      predictive_analytics: false
    },
    improvement: {
      continuous_improvement_program: true,
      suggestion_system: true,
      knowledge_sharing: true,
      best_practices_library: true
    },
    governance: {
      process_documentation: true,
      compliance_tracking: true,
      audit_trail: true,
      change_management: true
    }
  });

  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowAutomation | null>(null);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [selectedImprovement, setSelectedImprovement] = useState<ContinuousImprovement | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update process metrics
      setProcesses(prev => prev.map(process => ({
        ...process,
        metrics: {
          ...process.metrics,
          efficiency: Math.max(0, Math.min(100, process.metrics.efficiency + (Math.random() * 4) - 2)),
          effectiveness: Math.max(0, Math.min(100, process.metrics.effectiveness + (Math.random() * 3) - 1.5)),
          cycle_time: Math.max(10, process.metrics.cycle_time + (Math.random() * 10) - 5),
          satisfaction_score: Math.max(0, Math.min(100, process.metrics.satisfaction_score + (Math.random() * 2) - 1))
        }
      })));

      // Update workflow automations
      setWorkflowAutomations(prev => prev.map(workflow => ({
        ...workflow,
        performance: {
          ...workflow.performance,
          total_executions: workflow.performance.total_executions + Math.floor(Math.random() * 5) - 2,
          success_rate: Math.max(0, Math.min(100, workflow.performance.success_rate + (Math.random() * 2) - 1)),
          average_duration: Math.max(10, workflow.performance.average_duration + (Math.random() * 10) - 5)
        }
      })));

      // Update KPIs
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        measurement: {
          ...kpi.measurement,
          current: Math.max(0, kpi.measurement.target > 100 ? 
            kpi.measurement.current + (Math.random() * 2) - 1 :
            kpi.measurement.current + (Math.random() * 0.5) - 0.25
          )
        },
        performance: {
          ...kpi.performance,
          score: kpi.measurement.target > 100 ? 
            kpi.measurement.current :
            (kpi.measurement.current / kpi.measurement.target) * 100,
          last_updated: new Date().toISOString()
        }
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: Process['category']) => {
    switch (category) {
      case 'development': return <Code className="w-4 h-4" />;
      case 'deployment': return <Cloud className="w-4 h-4" />;
      case 'monitoring': return <Activity className="w-4 h-4" />;
      case 'support': return <Users className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'finance': return <DollarSign className="w-4 h-4" />;
      case 'hr': return <Award className="w-4 h-4" />;
      case 'marketing': return <Target className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Process['category']) => {
    switch (category) {
      case 'development': return 'bg-blue-600';
      case 'deployment': return 'bg-green-600';
      case 'monitoring': return 'bg-purple-600';
      case 'support': return 'bg-orange-600';
      case 'security': return 'bg-red-600';
      case 'finance': return 'bg-yellow-600';
      case 'hr': return 'bg-indigo-600';
      case 'marketing': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'bg-green-600';
      case 'optimizing': case 'in_progress': case 'testing': return 'bg-yellow-600';
      case 'inactive': case 'pending': case 'upcoming': return 'bg-gray-600';
      case 'error': case 'failed': case 'critical': return 'bg-red-600';
      case 'deprecated': return 'bg-orange-600';
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

  const getFilteredProcesses = () => {
    return processes.filter(process => {
      const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           process.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || process.category === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            Operational Excellence
          </h1>
          <p className="text-gray-400">
            Advanced operational excellence and automation management system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Processes</div>
                <div className="text-2xl font-bold">{processes.filter(p => p.status === 'active').length}/{processes.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Efficiency</div>
                <div className="text-2xl font-bold">
                  {(processes.reduce((sum, p) => sum + p.metrics.efficiency, 0) / processes.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Automation Coverage</div>
                <div className="text-2xl font-bold">
                  {(processes.reduce((sum, p) => sum + p.automation.automation_percentage, 0) / processes.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Cost Savings</div>
                <div className="text-2xl font-bold">
                  ${(processes.reduce((sum, p) => sum + p.automation.cost_savings_monthly, 0) / 1000).toFixed(1)}K/mo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Operational Excellence Control Center</h2>
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
              <div className="text-2xl font-bold text-green-400">{workflowAutomations.filter(w => w.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{kpis.filter(k => k.performance.rating === 'excellent' || k.performance.rating === 'good').length}</div>
              <div className="text-sm text-gray-400">Healthy KPIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{continuousImprovements.filter(i => i.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Active Improvements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{processes.reduce((sum, p) => sum + p.improvement.kaizen_events, 0)}</div>
              <div className="text-sm text-gray-400">Kaizen Events</div>
            </div>
          </div>
        </div>

        {/* Business Processes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Processes</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search processes..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="development">Development</option>
                <option value="deployment">Deployment</option>
                <option value="support">Support</option>
                <option value="finance">Finance</option>
                <option value="hr">HR</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredProcesses().map((process) => (
                <div
                  key={process.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProcess?.id === process.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedProcess(process)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(process.status)}`}></div>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(process.category)}
                        <div>
                          <h4 className="font-semibold">{process.name}</h4>
                          <div className="text-sm text-gray-400">{process.owner}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(process.category)}`}>
                        {process.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(process.status)}`}>
                        {process.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Efficiency:</span> {process.metrics.efficiency.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Effectiveness:</span> {process.metrics.effectiveness.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Cycle Time:</span> {process.metrics.cycle_time}min
                    </div>
                    <div>
                      <span className="text-gray-400">Automation:</span> {process.automation.automation_percentage}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${process.metrics.efficiency}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        ${process.automation.cost_savings_monthly.toLocaleString()}/mo savings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Satisfaction: {process.metrics.satisfaction_score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredProcesses().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No processes found
              </div>
            )}
          </div>

          {/* Selected Process Details */}
          {selectedProcess && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Process Details: {selectedProcess.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="font-medium">{selectedProcess.metrics.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Effectiveness:</span>
                        <span className="font-medium">{selectedProcess.metrics.effectiveness.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cycle Time:</span>
                        <span className="font-medium">{selectedProcess.metrics.cycle_time} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost/Execution:</span>
                        <span className="font-medium">${selectedProcess.metrics.cost_per_execution.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Error Rate:</span>
                        <span className="font-medium">{selectedProcess.metrics.error_rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Automation Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Automated Steps:</span>
                        <span className="font-medium">{selectedProcess.automation.automated_steps}/{selectedProcess.automation.total_steps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Automation %:</span>
                        <span className="font-medium">{selectedProcess.automation.automation_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Saved:</span>
                        <span className="font-medium">{selectedProcess.automation.time_saved_per_execution} min/execution</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Savings:</span>
                        <span className="font-medium">${selectedProcess.automation.cost_savings_monthly.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Improvement Opportunities</h4>
                    <div className="space-y-2">
                      {selectedProcess.improvement.improvement_suggestions.map((suggestion, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="font-medium">{suggestion.title}</div>
                          <div className="text-xs text-gray-400 mt-1">{suggestion.description}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-1 py-0.5 rounded text-xs ${
                              suggestion.impact === 'high' ? 'bg-red-600' :
                              suggestion.impact === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                            }`}>
                              {suggestion.impact} impact
                            </span>
                            <span className={`px-1 py-0.5 rounded text-xs ${
                              suggestion.effort === 'high' ? 'bg-red-600' :
                              suggestion.effort === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                            }`}>
                              {suggestion.effort} effort
                            </span>
                            <span className="text-xs text-gray-400">
                              ${suggestion.estimated_savings.toLocaleString()} savings
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Process Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Owner:</span>
                        <span className="font-medium">{selectedProcess.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stakeholders:</span>
                        <span className="font-medium">{selectedProcess.stakeholders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Optimized:</span>
                        <span className="font-medium">{new Date(selectedProcess.improvement.last_optimized).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kaizen Events:</span>
                        <span className="font-medium">{selectedProcess.improvement.kaizen_events}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Workflow Automations */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Workflow Automations</h3>
          <div className="space-y-4">
            {workflowAutomations.map((workflow) => (
              <div key={workflow.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{workflow.name}</h4>
                    <div className="text-sm text-gray-400">{workflow.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">
                      {workflow.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Executions:</span>
                        <span>{workflow.performance.total_executions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{workflow.performance.success_rate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Duration:</span>
                        <span>{workflow.performance.average_duration}min</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Steps Progress</h5>
                    <div className="space-y-1">
                      {workflow.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(step.status)}`}></div>
                          <span className={step.status === 'completed' ? '' : 'text-gray-400'}>
                            {step.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {step.estimated_duration}min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Resources</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Human Resources:</span>
                        <span>{workflow.resources.human_resources}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Software Licenses:</span>
                        <span>{workflow.resources.software_licenses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Compute Resources:</span>
                        <span>{workflow.resources.compute_resources}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${workflow.performance.success_rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
            <div className="space-y-3">
              {kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedKPI?.id === kpi.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedKPI(kpi)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{kpi.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getRatingColor(kpi.performance.rating)}`}>
                        {kpi.performance.rating}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {kpi.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Current:</span> {kpi.measurement.current.toFixed(1)} {kpi.measurement.unit}
                    </div>
                    <div>
                      <span className="text-gray-400">Target:</span> {kpi.measurement.target} {kpi.measurement.unit}
                    </div>
                    <div>
                      <span className="text-gray-400">Trend:</span> 
                      <span className={`ml-1 ${
                        kpi.measurement.trend === 'improving' ? 'text-green-400' :
                        kpi.measurement.trend === 'declining' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {kpi.measurement.trend}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Frequency:</span> {kpi.measurement.frequency}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${Math.min(100, (kpi.measurement.current / kpi.measurement.target) * 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Owner: {kpi.ownership.owner}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {kpi.alerts.length} alerts configured
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected KPI Details */}
          {selectedKPI && (
            <div>
              <h3 className="text-lg font-semibold mb-4">KPI Details: {selectedKPI.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Score:</span>
                        <span className="font-medium">{selectedKPI.performance.score.toFixed(1)}</span>
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
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedKPI.performance.last_updated).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Measurement Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium capitalize">{selectedKPI.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Unit:</span>
                        <span className="font-medium">{selectedKPI.measurement.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Baseline:</span>
                        <span className="font-medium">{selectedKPI.measurement.baseline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Measurement Method:</span>
                        <span className="font-medium">{selectedKPI.goals[0]?.measurement_method || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Ownership</h4>
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
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Alert Configuration</h4>
                    <div className="space-y-2">
                      {selectedKPI.alerts.map((alert, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex justify-between">
                            <span>Threshold: {alert.threshold} {selectedKPI.measurement.unit}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              alert.severity === 'critical' ? 'bg-red-600' :
                              alert.severity === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Condition: {alert.condition} | Channels: {alert.notification_channels.join(', ')}
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

        {/* Continuous Improvements */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Continuous Improvements</h3>
          <div className="space-y-4">
            {continuousImprovements.map((improvement) => (
              <div key={improvement.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{improvement.name}</h4>
                    <div className="text-sm text-gray-400">{improvement.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(improvement.priority)}`}>
                      {improvement.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(improvement.status)}`}>
                      {improvement.status}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">
                      {improvement.methodology}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Goals Progress</h5>
                    <div className="space-y-1 text-sm">
                      {improvement.goals.map((goal, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400">{goal.metric}:</span>
                          <span>{goal.current_value}/{goal.target_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Progress</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion:</span>
                        <span>{improvement.progress.completion_percentage.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phases:</span>
                        <span>{improvement.progress.phases_completed}/{improvement.progress.total_phases}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Team Size:</span>
                        <span>{improvement.team.members.length + 1}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Milestones</h5>
                    <div className="space-y-1">
                      {improvement.progress.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(milestone.status)}`}></div>
                          <span className={milestone.status === 'completed' ? '' : 'text-gray-400'}>
                            {milestone.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(milestone.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {improvement.results && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-green-400">Results</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-green-400">{improvement.results.roi.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Savings:</span>
                        <span className="text-green-400">${improvement.results.cost_savings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${improvement.progress.completion_percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Operational Excellence Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Automation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.auto_optimization}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, auto_optimization: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.intelligent_routing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, intelligent_routing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Intelligent Routing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.predictive_maintenance}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, predictive_maintenance: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Predictive Maintenance</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.self_healing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, self_healing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Self Healing</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Monitoring</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.real_time_dashboards}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, real_time_dashboards: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Real-time Dashboards</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.performance_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, performance_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Performance Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.anomaly_detection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, anomaly_detection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Anomaly Detection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.predictive_analytics}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, predictive_analytics: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Predictive Analytics</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Improvement</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.improvement.continuous_improvement_program}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          improvement: { ...prev.improvement, continuous_improvement_program: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Continuous Improvement Program</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.improvement.suggestion_system}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          improvement: { ...prev.improvement, suggestion_system: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Suggestion System</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.improvement.knowledge_sharing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          improvement: { ...prev.improvement, knowledge_sharing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Knowledge Sharing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.improvement.best_practices_library}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          improvement: { ...prev.improvement, best_practices_library: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Best Practices Library</span>
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

export default OperationalExcellence;
