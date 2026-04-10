/**
 * Automation Enhancement Component
 * 
 * Advanced machine learning integration for automation systems
 * Features predictive analytics, intelligent scheduling, and adaptive optimization
 */

import React, { useState, useEffect } from 'react';
import { Brain, Zap, Activity, TrendingUp, Settings, Search, Filter, Calendar, Clock, Target, BarChart3, PieChart, AlertTriangle, CheckCircle, XCircle, Cpu, Database, Network, Shield, Lightbulb, Rocket, Award, Globe, Users } from 'lucide-react';

interface MLModel {
  id: string;
  name: string;
  type: 'prediction' | 'classification' | 'clustering' | 'optimization' | 'anomaly_detection';
  status: 'training' | 'ready' | 'testing' | 'error';
  accuracy: number;
  confidence: number;
  performance: {
    training_time: number;
    inference_time: number;
    memory_usage: number;
    cpu_usage: number;
  };
  capabilities: string[];
  last_updated: string;
}

interface AutomationTask {
  id: string;
  name: string;
  type: 'scraping' | 'automation' | 'monitoring' | 'analysis' | 'optimization';
  status: 'pending' | 'running' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  ml_enhanced: boolean;
  performance: {
    success_rate: number;
    execution_time: number;
    resource_usage: number;
    error_rate: number;
  };
  schedule: {
    frequency: 'once' | 'hourly' | 'daily' | 'weekly' | 'monthly';
    next_run: string;
    last_run?: string;
  };
  ml_predictions: {
    success_probability: number;
    estimated_duration: number;
    resource_requirements: number;
    risk_factors: string[];
  };
}

interface PredictiveAnalytics {
  id: string;
  name: string;
  type: 'revenue' | 'traffic' | 'performance' | 'errors' | 'resource_usage';
  model_id: string;
  status: 'active' | 'inactive' | 'training';
  predictions: Array<{
    timestamp: string;
    predicted_value: number;
    confidence: number;
    actual_value?: number;
    accuracy?: number;
  }>;
  metrics: {
    mae: number; // Mean Absolute Error
    rmse: number; // Root Mean Square Error
    r2_score: number; // R-squared
    accuracy: number;
  };
  alerts: Array<{
    level: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: string;
    threshold: number;
    current_value: number;
  }>;
}

interface IntelligentScheduling {
  id: string;
  task_id: string;
  algorithm: 'priority_based' | 'resource_optimized' | 'ml_predicted' | 'adaptive';
  optimization_goals: string[];
  constraints: {
    max_concurrent_tasks: number;
    resource_limits: {
      cpu: number;
      memory: number;
      network: number;
    };
    time_windows: Array<{
      start: string;
      end: string;
      weight: number;
    }>;
  };
  schedule: Array<{
    task_id: string;
    scheduled_time: string;
    estimated_duration: number;
    priority: number;
    resources_allocated: {
      cpu: number;
      memory: number;
      network: number;
    };
  }>;
  performance: {
    on_time_completion: number;
    resource_utilization: number;
    throughput: number;
    efficiency: number;
  };
}

interface AutomationEnhancementConfig {
  ml_models: {
    auto_training: boolean;
    model_retention_days: number;
    accuracy_threshold: number;
    retraining_frequency: string;
  };
  predictive_analytics: {
    enabled: boolean;
    forecast_horizon: number;
    update_frequency: string;
    alert_thresholds: {
      performance: number;
      errors: number;
      resource_usage: number;
    };
  };
  intelligent_scheduling: {
    enabled: boolean;
    optimization_algorithm: string;
    real_time_adjustment: boolean;
    load_balancing: boolean;
  };
  monitoring: {
    real_time_metrics: boolean;
    performance_tracking: boolean;
    anomaly_detection: boolean;
    alert_system: boolean;
  };
}

const AutomationEnhancement: React.FC = () => {
  const [mlModels, setMLModels] = useState<MLModel[]>([
    {
      id: 'model-1',
      name: 'Task Success Predictor',
      type: 'prediction',
      status: 'ready',
      accuracy: 0.94,
      confidence: 0.91,
      performance: {
        training_time: 1800,
        inference_time: 45,
        memory_usage: 512,
        cpu_usage: 0.3
      },
      capabilities: ['success_probability', 'duration_estimation', 'risk_assessment'],
      last_updated: new Date().toISOString()
    },
    {
      id: 'model-2',
      name: 'Resource Optimizer',
      type: 'optimization',
      status: 'ready',
      accuracy: 0.89,
      confidence: 0.87,
      performance: {
        training_time: 2400,
        inference_time: 60,
        memory_usage: 768,
        cpu_usage: 0.4
      },
      capabilities: ['resource_allocation', 'load_balancing', 'efficiency_optimization'],
      last_updated: new Date().toISOString()
    },
    {
      id: 'model-3',
      name: 'Anomaly Detector',
      type: 'anomaly_detection',
      status: 'ready',
      accuracy: 0.96,
      confidence: 0.94,
      performance: {
        training_time: 3600,
        inference_time: 30,
        memory_usage: 1024,
        cpu_usage: 0.5
      },
      capabilities: ['error_prediction', 'performance_anomaly', 'security_threats'],
      last_updated: new Date().toISOString()
    }
  ]);

  const [automationTasks, setAutomationTasks] = useState<AutomationTask[]>([
    {
      id: 'task-1',
      name: 'Web Scraping Automation',
      type: 'scraping',
      status: 'running',
      priority: 'high',
      ml_enhanced: true,
      performance: {
        success_rate: 0.94,
        execution_time: 120,
        resource_usage: 0.6,
        error_rate: 0.02
      },
      schedule: {
        frequency: 'hourly',
        next_run: new Date(Date.now() + 3600000).toISOString(),
        last_run: new Date(Date.now() - 1800000).toISOString()
      },
      ml_predictions: {
        success_probability: 0.96,
        estimated_duration: 115,
        resource_requirements: 0.58,
        risk_factors: ['rate_limiting', 'captcha_detection']
      }
    },
    {
      id: 'task-2',
      name: 'Performance Monitoring',
      type: 'monitoring',
      status: 'completed',
      priority: 'medium',
      ml_enhanced: true,
      performance: {
        success_rate: 0.98,
        execution_time: 30,
        resource_usage: 0.2,
        error_rate: 0.01
      },
      schedule: {
        frequency: 'daily',
        next_run: new Date(Date.now() + 86400000).toISOString(),
        last_run: new Date(Date.now() - 7200000).toISOString()
      },
      ml_predictions: {
        success_probability: 0.99,
        estimated_duration: 28,
        resource_requirements: 0.18,
        risk_factors: []
      }
    },
    {
      id: 'task-3',
      name: 'Data Analysis Pipeline',
      type: 'analysis',
      status: 'pending',
      priority: 'medium',
      ml_enhanced: true,
      performance: {
        success_rate: 0.91,
        execution_time: 300,
        resource_usage: 0.8,
        error_rate: 0.03
      },
      schedule: {
        frequency: 'weekly',
        next_run: new Date(Date.now() + 604800000).toISOString(),
        last_run: new Date(Date.now() - 259200000).toISOString()
      },
      ml_predictions: {
        success_probability: 0.93,
        estimated_duration: 285,
        resource_requirements: 0.75,
        risk_factors: ['data_quality', 'processing_time']
      }
    }
  ]);

  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics[]>([
    {
      id: 'analytics-1',
      name: 'Revenue Forecast',
      type: 'revenue',
      model_id: 'model-1',
      status: 'active',
      predictions: [
        { timestamp: new Date(Date.now() - 86400000).toISOString(), predicted_value: 12500, confidence: 0.89, actual_value: 12345, accuracy: 0.98 },
        { timestamp: new Date(Date.now()).toISOString(), predicted_value: 12800, confidence: 0.91 },
        { timestamp: new Date(Date.now() + 86400000).toISOString(), predicted_value: 13100, confidence: 0.88 },
        { timestamp: new Date(Date.now() + 172800000).toISOString(), predicted_value: 13400, confidence: 0.87 },
        { timestamp: new Date(Date.now() + 259200000).toISOString(), predicted_value: 13700, confidence: 0.86 }
      ],
      metrics: {
        mae: 156.7,
        rmse: 234.5,
        r2_score: 0.94,
        accuracy: 0.96
      },
      alerts: [
        { level: 'warning', message: 'Revenue growth slower than expected', timestamp: new Date(Date.now() - 3600000).toISOString(), threshold: 0.05, current_value: 0.03 }
      ]
    },
    {
      id: 'analytics-2',
      name: 'Performance Prediction',
      type: 'performance',
      model_id: 'model-2',
      status: 'active',
      predictions: [
        { timestamp: new Date(Date.now() - 86400000).toISOString(), predicted_value: 0.92, confidence: 0.94, actual_value: 0.91, accuracy: 0.99 },
        { timestamp: new Date(Date.now()).toISOString(), predicted_value: 0.93, confidence: 0.93 },
        { timestamp: new Date(Date.now() + 86400000).toISOString(), predicted_value: 0.94, confidence: 0.92 },
        { timestamp: new Date(Date.now() + 172800000).toISOString(), predicted_value: 0.93, confidence: 0.91 },
        { timestamp: new Date(Date.now() + 259200000).toISOString(), predicted_value: 0.95, confidence: 0.90 }
      ],
      metrics: {
        mae: 0.012,
        rmse: 0.018,
        r2_score: 0.91,
        accuracy: 0.94
      },
      alerts: []
    }
  ]);

  const [intelligentScheduling, setIntelligentScheduling] = useState<IntelligentScheduling>({
    id: 'schedule-1',
    task_id: 'all',
    algorithm: 'ml_predicted',
    optimization_goals: ['maximize_throughput', 'minimize_resource_usage', 'meet_deadlines'],
    constraints: {
      max_concurrent_tasks: 5,
      resource_limits: {
        cpu: 80,
        memory: 70,
        network: 60
      },
      time_windows: [
        { start: '00:00', end: '06:00', weight: 0.5 },
        { start: '06:00', end: '12:00', weight: 1.0 },
        { start: '12:00', end: '18:00', weight: 1.2 },
        { start: '18:00', end: '24:00', weight: 0.8 }
      ]
    },
    schedule: [
      {
        task_id: 'task-1',
        scheduled_time: new Date(Date.now() + 3600000).toISOString(),
        estimated_duration: 115,
        priority: 3,
        resources_allocated: {
          cpu: 25,
          memory: 30,
          network: 20
        }
      },
      {
        task_id: 'task-2',
        scheduled_time: new Date(Date.now() + 7200000).toISOString(),
        estimated_duration: 28,
        priority: 2,
        resources_allocated: {
          cpu: 10,
          memory: 15,
          network: 5
        }
      }
    ],
    performance: {
      on_time_completion: 0.94,
      resource_utilization: 0.76,
      throughput: 0.88,
      efficiency: 0.91
    }
  });

  const [config, setConfig] = useState<AutomationEnhancementConfig>({
    ml_models: {
      auto_training: true,
      model_retention_days: 30,
      accuracy_threshold: 0.85,
      retraining_frequency: 'weekly'
    },
    predictive_analytics: {
      enabled: true,
      forecast_horizon: 7,
      update_frequency: 'hourly',
      alert_thresholds: {
        performance: 0.8,
        errors: 0.05,
        resource_usage: 0.9
      }
    },
    intelligent_scheduling: {
      enabled: true,
      optimization_algorithm: 'genetic',
      real_time_adjustment: true,
      load_balancing: true
    },
    monitoring: {
      real_time_metrics: true,
      performance_tracking: true,
      anomaly_detection: true,
      alert_system: true
    }
  });

  const [selectedModel, setSelectedModel] = useState<MLModel | null>(null);
  const [selectedTask, setSelectedTask] = useState<AutomationTask | null>(null);
  const [selectedAnalytics, setSelectedAnalytics] = useState<PredictiveAnalytics | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update ML model performance
      setMLModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.min(0.99, model.accuracy + (Math.random() * 0.02) - 0.01),
        confidence: Math.min(0.99, model.confidence + (Math.random() * 0.02) - 0.01),
        last_updated: new Date().toISOString()
      })));

      // Update task performance
      setAutomationTasks(prev => prev.map(task => {
        if (task.status === 'running') {
          return {
            ...task,
            performance: {
              ...task.performance,
              success_rate: Math.min(0.99, task.performance.success_rate + (Math.random() * 0.02) - 0.01),
              execution_time: task.performance.execution_time + (Math.random() * 10) - 5,
              resource_usage: Math.min(0.95, task.performance.resource_usage + (Math.random() * 0.05) - 0.025)
            }
          };
        }
        return task;
      }));

      // Update predictive analytics
      setPredictiveAnalytics(prev => prev.map(analytics => ({
        ...analytics,
        predictions: analytics.predictions.map((prediction, index) => {
          if (index === 0) {
            // Update the latest prediction with actual value
            return {
              ...prediction,
              actual_value: prediction.predicted_value * (0.95 + Math.random() * 0.1),
              accuracy: 0.9 + Math.random() * 0.09
            };
          }
          return prediction;
        })
      })));

      // Update scheduling performance
      setIntelligentScheduling(prev => ({
        ...prev,
        performance: {
          on_time_completion: Math.min(0.99, prev.performance.on_time_completion + (Math.random() * 0.02) - 0.01),
          resource_utilization: Math.min(0.95, prev.performance.resource_utilization + (Math.random() * 0.03) - 0.015),
          throughput: Math.min(0.99, prev.performance.throughput + (Math.random() * 0.02) - 0.01),
          efficiency: Math.min(0.99, prev.performance.efficiency + (Math.random() * 0.02) - 0.01)
        }
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getModelTypeColor = (type: MLModel['type']) => {
    switch (type) {
      case 'prediction': return 'bg-blue-600';
      case 'classification': return 'bg-green-600';
      case 'clustering': return 'bg-purple-600';
      case 'optimization': return 'bg-orange-600';
      case 'anomaly_detection': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': case 'active': case 'completed': return 'bg-green-600';
      case 'training': case 'running': case 'testing': return 'bg-yellow-600';
      case 'error': case 'failed': return 'bg-red-600';
      case 'pending': case 'inactive': return 'bg-gray-600';
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

  const getFilteredModels = () => {
    return mlModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || model.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Automation Enhancement
          </h1>
          <p className="text-gray-400">
            Advanced machine learning integration for automation systems
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">ML Models</div>
                <div className="text-2xl font-bold">{mlModels.filter(m => m.status === 'ready').length}/{mlModels.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Tasks</div>
                <div className="text-2xl font-bold">{automationTasks.filter(t => t.status === 'running').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Accuracy</div>
                <div className="text-2xl font-bold">
                  {(mlModels.reduce((sum, m) => sum + m.accuracy, 0) / mlModels.length * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Efficiency</div>
                <div className="text-2xl font-bold">{(intelligentScheduling.performance.efficiency * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">ML Enhancement Control Center</h2>
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
              <div className="text-2xl font-bold text-blue-400">{mlModels.length}</div>
              <div className="text-sm text-gray-400">Total Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{automationTasks.filter(t => t.ml_enhanced).length}</div>
              <div className="text-sm text-gray-400">ML-Enhanced Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{predictiveAnalytics.length}</div>
              <div className="text-sm text-gray-400">Analytics Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{(intelligentScheduling.performance.throughput * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Throughput</div>
            </div>
          </div>
        </div>

        {/* ML Models */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Machine Learning Models</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search models..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="prediction">Prediction</option>
                <option value="classification">Classification</option>
                <option value="clustering">Clustering</option>
                <option value="optimization">Optimization</option>
                <option value="anomaly_detection">Anomaly Detection</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredModels().map((model) => (
                <div
                  key={model.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModel?.id === model.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <div className="text-sm text-gray-400">Type: {model.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getModelTypeColor(model.type)}`}>
                        {model.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Accuracy:</span> {(model.accuracy * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Confidence:</span> {(model.confidence * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Inference:</span> {model.performance.inference_time}ms
                    </div>
                    <div>
                      <span className="text-gray-400">Memory:</span> {model.performance.memory_usage}MB
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${model.accuracy * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Updated: {new Date(model.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        CPU: {(model.performance.cpu_usage * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredModels().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No models found
              </div>
            )}
          </div>

          {/* Selected Model Details */}
          {selectedModel && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Model Details: {selectedModel.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="font-medium">{(selectedModel.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="font-medium">{(selectedModel.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Training Time:</span>
                        <span className="font-medium">{selectedModel.performance.training_time}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Inference Time:</span>
                        <span className="font-medium">{selectedModel.performance.inference_time}ms</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Resource Usage</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory:</span>
                        <span className="font-medium">{selectedModel.performance.memory_usage}MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Usage:</span>
                        <span className="font-medium">{(selectedModel.performance.cpu_usage * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-medium capitalize">{selectedModel.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium capitalize">{selectedModel.type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.capabilities.map((capability, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Last Updated</h4>
                    <div className="text-sm">
                      {new Date(selectedModel.last_updated).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Automation Tasks */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">ML-Enhanced Automation Tasks</h3>
          <div className="space-y-4">
            {automationTasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{task.name}</h4>
                    <div className="text-sm text-gray-400">{task.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.ml_enhanced && (
                      <span className="px-2 py-1 rounded text-xs bg-purple-600">
                        ML Enhanced
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Performance</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{(task.performance.success_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Execution Time:</span>
                        <span>{task.performance.execution_time}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resource Usage:</span>
                        <span>{(task.performance.resource_usage * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">ML Predictions</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Probability:</span>
                        <span className="text-green-400">{(task.ml_predictions.success_probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estimated Duration:</span>
                        <span>{task.ml_predictions.estimated_duration}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resource Requirements:</span>
                        <span>{(task.ml_predictions.resource_requirements * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Schedule</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Frequency:</span>
                        <span className="capitalize">{task.schedule.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Run:</span>
                        <span>{new Date(task.schedule.next_run).toLocaleString()}</span>
                      </div>
                      {task.schedule.last_run && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Run:</span>
                          <span>{new Date(task.schedule.last_run).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {task.ml_predictions.risk_factors.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2 text-orange-400">Risk Factors</h5>
                    <div className="flex flex-wrap gap-2">
                      {task.ml_predictions.risk_factors.map((risk, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-900 rounded text-xs">
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Predictive Analytics</h3>
            <div className="space-y-3">
              {predictiveAnalytics.map((analytics) => (
                <div
                  key={analytics.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnalytics?.id === analytics.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedAnalytics(analytics)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{analytics.name}</h4>
                      <div className="text-sm text-gray-400">Type: {analytics.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(analytics.status)}`}>
                        {analytics.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        Model: {analytics.model_id}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Accuracy:</span> {(analytics.metrics.accuracy * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">R² Score:</span> {(analytics.metrics.r2_score * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">MAE:</span> {analytics.metrics.mae.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-400">RMSE:</span> {analytics.metrics.rmse.toFixed(2)}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${analytics.metrics.accuracy * 100}%` }}
                    ></div>
                  </div>

                  {analytics.alerts.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400">
                          {analytics.alerts.length} alert{analytics.alerts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Analytics Details */}
          {selectedAnalytics && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Analytics Details: {selectedAnalytics.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Model Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="font-medium">{(selectedAnalytics.metrics.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">R² Score:</span>
                        <span className="font-medium">{(selectedAnalytics.metrics.r2_score * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">MAE:</span>
                        <span className="font-medium">{selectedAnalytics.metrics.mae.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">RMSE:</span>
                        <span className="font-medium">{selectedAnalytics.metrics.rmse.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Recent Predictions</h4>
                    <div className="space-y-2 text-sm">
                      {selectedAnalytics.predictions.slice(0, 3).map((prediction, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400">
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </span>
                          <span className="font-medium">
                            {prediction.actual_value ? 
                              `${prediction.actual_value.toFixed(2)} (pred: ${prediction.predicted_value.toFixed(2)})` :
                              `${prediction.predicted_value.toFixed(2)} (pred)`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedAnalytics.alerts.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-blue-400 mb-2">Active Alerts</h4>
                    <div className="space-y-2">
                      {selectedAnalytics.alerts.map((alert, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs ${
                              alert.level === 'critical' ? 'bg-red-600' : 
                              alert.level === 'warning' ? 'bg-orange-600' : 'bg-blue-600'
                            }`}>
                              {alert.level}
                            </span>
                            <span className="text-gray-400">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1">{alert.message}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Current: {alert.current_value} | Threshold: {alert.threshold}
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

        {/* Intelligent Scheduling */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Intelligent Scheduling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Scheduling Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-Time Completion</span>
                    <span>{(intelligentScheduling.performance.on_time_completion * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${intelligentScheduling.performance.on_time_completion * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resource Utilization</span>
                    <span>{(intelligentScheduling.performance.resource_utilization * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${intelligentScheduling.performance.resource_utilization * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Throughput</span>
                    <span>{(intelligentScheduling.performance.throughput * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${intelligentScheduling.performance.throughput * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Efficiency</span>
                    <span>{(intelligentScheduling.performance.efficiency * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-orange-500"
                      style={{ width: `${intelligentScheduling.performance.efficiency * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-blue-400 mb-2">Scheduled Tasks</h4>
              <div className="space-y-2">
                {intelligentScheduling.schedule.map((scheduledTask) => (
                  <div key={scheduledTask.task_id} className="p-3 bg-gray-700 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{scheduledTask.task_id}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(scheduledTask.scheduled_time).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span> {scheduledTask.estimated_duration}s
                      </div>
                      <div>
                        <span className="text-gray-400">Priority:</span> {scheduledTask.priority}
                      </div>
                      <div>
                        <span className="text-gray-400">CPU:</span> {scheduledTask.resources_allocated.cpu}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">ML Enhancement Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">ML Models Configuration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.ml_models.auto_training}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ml_models: { ...prev.ml_models, auto_training: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Auto Training</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.predictive_analytics.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          predictive_analytics: { ...prev.predictive_analytics, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Predictive Analytics</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligent_scheduling.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligent_scheduling: { ...prev.intelligent_scheduling, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Intelligent Scheduling</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.monitoring.anomaly_detection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          monitoring: { ...prev.monitoring, anomaly_detection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Anomaly Detection</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Performance Thresholds</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Accuracy Threshold</label>
                      <input
                        type="number"
                        value={config.ml_models.accuracy_threshold}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ml_models: { ...prev.ml_models, accuracy_threshold: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                        max="1"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Forecast Horizon (days)</label>
                      <input
                        type="number"
                        value={config.predictive_analytics.forecast_horizon}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          predictive_analytics: { ...prev.predictive_analytics, forecast_horizon: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="1"
                        max="30"
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

export default AutomationEnhancement;
