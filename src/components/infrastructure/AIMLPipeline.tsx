import React, { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp, Database, Activity, Cpu, Settings, CheckCircle, AlertTriangle, Clock, BarChart3, Target, Lightbulb } from 'lucide-react';

interface MLModel {
  id: string;
  name: string;
  type: 'price-prediction' | 'risk-assessment' | 'sentiment-analysis' | 'portfolio-optimization' | 'anomaly-detection';
  status: 'training' | 'active' | 'inactive' | 'error';
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingData: string;
  lastTrained: string;
  predictions: number;
  latency: number;
  features: string[];
}

interface DataPipeline {
  id: string;
  name: string;
  source: string;
  status: 'running' | 'stopped' | 'error';
  throughput: number;
  latency: number;
  recordsProcessed: number;
  errorRate: number;
  lastRun: string;
  schedule: string;
}

interface FeatureEngineering {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  features: number;
  importance: number;
  correlation: number;
}

interface ModelDeployment {
  modelId: string;
  environment: 'development' | 'staging' | 'production';
  status: 'deployed' | 'failed' | 'pending';
  endpoint: string;
  requests: number;
  avgLatency: number;
  errorRate: number;
  deployedAt: string;
}

export const AIMLPipeline: React.FC = () => {
  const [models, setModels] = useState<MLModel[]>([]);
  const [pipelines, setPipelines] = useState<DataPipeline[]>([]);
  const [featureEngineering, setFeatureEngineering] = useState<FeatureEngineering[]>([]);
  const [deployments, setDeployments] = useState<ModelDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'models' | 'pipelines' | 'features' | 'deployments'>('models');

  useEffect(() => {
    const fetchMLData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockModels: MLModel[] = [
          {
            id: 'model-1',
            name: 'Bitcoin Price Predictor',
            type: 'price-prediction',
            status: 'active',
            version: '3.2.1',
            accuracy: 0.94,
            precision: 0.92,
            recall: 0.89,
            f1Score: 0.905,
            trainingData: '2.5M records',
            lastTrained: '2024-01-14T08:30:00Z',
            predictions: 1250000,
            latency: 45,
            features: ['price', 'volume', 'market_cap', 'social_sentiment', 'technical_indicators']
          },
          {
            id: 'model-2',
            name: 'Risk Assessment Engine',
            type: 'risk-assessment',
            status: 'active',
            version: '2.8.3',
            accuracy: 0.91,
            precision: 0.88,
            recall: 0.93,
            f1Score: 0.905,
            trainingData: '1.8M records',
            lastTrained: '2024-01-13T15:45:00Z',
            predictions: 890000,
            latency: 38,
            features: ['portfolio_composition', 'market_volatility', 'correlation_matrix', 'liquidity_metrics']
          },
          {
            id: 'model-3',
            name: 'Sentiment Analysis Model',
            type: 'sentiment-analysis',
            status: 'training',
            version: '1.5.0',
            accuracy: 0.87,
            precision: 0.85,
            recall: 0.82,
            f1Score: 0.835,
            trainingData: '5.2M records',
            lastTrained: '2024-01-15T06:00:00Z',
            predictions: 0,
            latency: 0,
            features: ['news_text', 'social_media_posts', 'forum_comments', 'technical_analysis']
          },
          {
            id: 'model-4',
            name: 'Portfolio Optimizer',
            type: 'portfolio-optimization',
            status: 'active',
            version: '4.1.0',
            accuracy: 0.89,
            precision: 0.91,
            recall: 0.86,
            f1Score: 0.885,
            trainingData: '980K records',
            lastTrained: '2024-01-12T11:20:00Z',
            predictions: 450000,
            latency: 125,
            features: ['expected_returns', 'risk_metrics', 'correlation_matrix', 'constraints', 'market_conditions']
          },
          {
            id: 'model-5',
            name: 'Anomaly Detection',
            type: 'anomaly-detection',
            status: 'error',
            version: '1.2.0',
            accuracy: 0.78,
            precision: 0.75,
            recall: 0.82,
            f1Score: 0.785,
            trainingData: '3.1M records',
            lastTrained: '2024-01-10T14:15:00Z',
            predictions: 0,
            latency: 0,
            features: ['trading_patterns', 'volume_anomalies', 'price_movements', 'order_flow']
          }
        ];

        const mockPipelines: DataPipeline[] = [
          {
            id: 'pipeline-1',
            name: 'Market Data Ingestion',
            source: 'Exchange APIs',
            status: 'running',
            throughput: 12500,
            latency: 25,
            recordsProcessed: 45000000,
            errorRate: 0.002,
            lastRun: '2024-01-15T10:30:00Z',
            schedule: 'Continuous'
          },
          {
            id: 'pipeline-2',
            name: 'Social Media Processing',
            source: 'Twitter, Reddit, Telegram',
            status: 'running',
            throughput: 8900,
            latency: 45,
            recordsProcessed: 12500000,
            errorRate: 0.005,
            lastRun: '2024-01-15T10:29:00Z',
            schedule: 'Continuous'
          },
          {
            id: 'pipeline-3',
            name: 'Feature Engineering',
            source: 'Market Data Pipeline',
            status: 'running',
            throughput: 15600,
            latency: 35,
            recordsProcessed: 78000000,
            errorRate: 0.001,
            lastRun: '2024-01-15T10:28:00Z',
            schedule: 'Continuous'
          },
          {
            id: 'pipeline-4',
            name: 'Model Training Pipeline',
            source: 'Feature Store',
            status: 'stopped',
            throughput: 0,
            latency: 0,
            recordsProcessed: 0,
            errorRate: 0,
            lastRun: '2024-01-14T22:00:00Z',
            schedule: 'Daily'
          }
        ];

        const mockFeatureEngineering: FeatureEngineering[] = [
          {
            name: 'Technical Indicators',
            description: 'RSI, MACD, Bollinger Bands, Moving Averages',
            status: 'active',
            features: 45,
            importance: 0.85,
            correlation: 0.72
          },
          {
            name: 'Market Sentiment',
            description: 'Social media sentiment analysis and news sentiment',
            status: 'active',
            features: 28,
            importance: 0.78,
            correlation: 0.65
          },
          {
            name: 'Volume Analysis',
            description: 'Trading volume patterns and order flow analysis',
            status: 'active',
            features: 32,
            importance: 0.71,
            correlation: 0.58
          },
          {
            name: 'Volatility Metrics',
            description: 'Historical volatility, implied volatility, volatility surfaces',
            status: 'active',
            features: 18,
            importance: 0.69,
            correlation: 0.61
          },
          {
            name: 'Correlation Analysis',
            description: 'Asset correlation matrices and clustering',
            status: 'inactive',
            features: 24,
            importance: 0.62,
            correlation: 0.54
          }
        ];

        const mockDeployments: ModelDeployment[] = [
          {
            modelId: 'model-1',
            environment: 'production',
            status: 'deployed',
            endpoint: 'https://ml.crybot.com/api/v1/price-predictor',
            requests: 1250000,
            avgLatency: 45,
            errorRate: 0.001,
            deployedAt: '2024-01-14T09:00:00Z'
          },
          {
            modelId: 'model-2',
            environment: 'production',
            status: 'deployed',
            endpoint: 'https://ml.crybot.com/api/v1/risk-assessor',
            requests: 890000,
            avgLatency: 38,
            errorRate: 0.002,
            deployedAt: '2024-01-13T16:00:00Z'
          },
          {
            modelId: 'model-4',
            environment: 'production',
            status: 'deployed',
            endpoint: 'https://ml.crybot.com/api/v1/portfolio-optimizer',
            requests: 450000,
            avgLatency: 125,
            errorRate: 0.003,
            deployedAt: '2024-01-12T12:00:00Z'
          },
          {
            modelId: 'model-3',
            environment: 'staging',
            status: 'pending',
            endpoint: 'https://ml-staging.crybot.com/api/v1/sentiment-analyzer',
            requests: 0,
            avgLatency: 0,
            errorRate: 0,
            deployedAt: '2024-01-15T11:00:00Z'
          }
        ];

        setModels(mockModels);
        setPipelines(mockPipelines);
        setFeatureEngineering(mockFeatureEngineering);
        setDeployments(mockDeployments);
      } catch (error) {
        console.error('Error fetching ML data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMLData();
  }, []);

  const getStatusColor = (status: MLModel['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: MLModel['type']) => {
    switch (type) {
      case 'price-prediction': return 'bg-blue-100 text-blue-800';
      case 'risk-assessment': return 'bg-red-100 text-red-800';
      case 'sentiment-analysis': return 'bg-purple-100 text-purple-800';
      case 'portfolio-optimization': return 'bg-green-100 text-green-800';
      case 'anomaly-detection': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPipelineStatusColor = (status: DataPipeline['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnvironmentColor = (environment: ModelDeployment['environment']) => {
    switch (environment) {
      case 'production': return 'bg-green-100 text-green-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 0.9) return 'text-green-600';
    if (value >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold">AI/ML Pipeline</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {models.filter(m => m.status === 'active').length} models active
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <Zap className="w-4 h-4" />
            <span>Train Model</span>
          </button>
        </div>
      </div>

      {/* ML Pipeline Overview */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Machine Learning Pipeline</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-90">Active Models</p>
                <p className="font-medium">{models.filter(m => m.status === 'active').length}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Predictions</p>
                <p className="font-medium">
                  {models.reduce((sum, m) => sum + m.predictions, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Avg Accuracy</p>
                <p className="font-medium">
                  {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Data Processed</p>
                <p className="font-medium">
                  {(pipelines.reduce((sum, p) => sum + p.recordsProcessed, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
          <BarChart3 className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ML Models</p>
              <p className="text-2xl font-bold">{models.length}</p>
            </div>
            <Brain className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Data Pipelines</p>
              <p className="text-2xl font-bold">{pipelines.length}</p>
            </div>
            <Database className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Features</p>
              <p className="text-2xl font-bold">
                {featureEngineering.reduce((sum, f) => sum + f.features, 0)}
              </p>
            </div>
            <Target className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deployments</p>
              <p className="text-2xl font-bold">{deployments.length}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['models', 'pipelines', 'features', 'deployments'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'models' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {models.filter(m => m.status === 'error').length}
                </span>
              )}
              {tab === 'pipelines' && (
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {pipelines.filter(p => p.status === 'stopped').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Models Tab */}
        {activeTab === 'models' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {models.map(model => (
                <div key={model.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        model.status === 'active' ? 'bg-purple-100 text-purple-600' : 
                        model.status === 'training' ? 'bg-blue-100 text-blue-600' : 
                        model.status === 'error' ? 'bg-red-100 text-red-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <p className="text-sm text-gray-600">Version {model.version}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(model.type)}`}>
                      {model.type}
                    </span>
                    <span className="text-xs text-gray-600">{model.trainingData}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Accuracy</p>
                      <p className={`text-sm font-medium ${getMetricColor(model.accuracy)}`}>
                        {(model.accuracy * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Precision</p>
                      <p className={`text-sm font-medium ${getMetricColor(model.precision)}`}>
                        {(model.precision * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Recall</p>
                      <p className={`text-sm font-medium ${getMetricColor(model.recall)}`}>
                        {(model.recall * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">F1 Score</p>
                      <p className={`text-sm font-medium ${getMetricColor(model.f1Score)}`}>
                        {(model.f1Score * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Predictions: {model.predictions.toLocaleString()}</span>
                    <span>Latency: {model.latency}ms</span>
                    <span>Last trained: {new Date(model.lastTrained).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Pipelines Tab */}
        {activeTab === 'pipelines' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pipelines.map(pipeline => (
                <div key={pipeline.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        pipeline.status === 'running' ? 'bg-green-100 text-green-600' : 
                        pipeline.status === 'error' ? 'bg-red-100 text-red-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{pipeline.name}</h4>
                        <p className="text-sm text-gray-600">{pipeline.source}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPipelineStatusColor(pipeline.status)}`}>
                      {pipeline.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Throughput</p>
                      <p className="text-sm font-medium">{pipeline.throughput.toLocaleString()} rec/sec</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Latency</p>
                      <p className="text-sm font-medium">{pipeline.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Records Processed</p>
                      <p className="text-sm font-medium">{(pipeline.recordsProcessed / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Error Rate</p>
                      <p className="text-sm font-medium">{(pipeline.errorRate * 100).toFixed(3)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Schedule: {pipeline.schedule}</span>
                    <span>Last run: {new Date(pipeline.lastRun).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Engineering Tab */}
        {activeTab === 'features' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureEngineering.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        feature.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      feature.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Features</span>
                      <span className="text-sm font-medium">{feature.features}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Importance</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${feature.importance * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{(feature.importance * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Correlation</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${feature.correlation * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{(feature.correlation * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {deployments.map(deployment => {
                const model = models.find(m => m.id === deployment.modelId);
                return (
                  <div key={deployment.modelId} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${
                          deployment.status === 'deployed' ? 'bg-green-100 text-green-600' : 
                          deployment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-red-100 text-red-600'
                        }`}>
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{model?.name}</h4>
                          <p className="text-sm text-gray-600 font-mono">{deployment.endpoint}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEnvironmentColor(deployment.environment)}`}>
                        {deployment.environment}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-600">Requests</p>
                        <p className="text-sm font-medium">{deployment.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Avg Latency</p>
                        <p className="text-sm font-medium">{deployment.avgLatency}ms</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Error Rate</p>
                        <p className="text-sm font-medium">{(deployment.errorRate * 100).toFixed(3)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Deployed</p>
                        <p className="text-sm font-medium">{new Date(deployment.deployedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className={`px-2 py-1 rounded-full ${
                        deployment.status === 'deployed' ? 'bg-green-100 text-green-800' : 
                        deployment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {deployment.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ML Pipeline Flow */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">ML Pipeline Flow</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-2">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium">Data Ingestion</h4>
                <p className="text-sm text-gray-600">Real-time data from exchanges, social media</p>
              </div>
            </div>
            
            <div className="text-2xl text-gray-400">{'>'}</div>
            
            <div className="flex-1 text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-2">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium">Feature Engineering</h4>
                <p className="text-sm text-gray-600">Transform raw data into ML features</p>
              </div>
            </div>
            
            <div className="text-2xl text-gray-400">{'>'}</div>
            
            <div className="flex-1 text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-2">
                <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium">Model Training</h4>
                <p className="text-sm text-gray-600">Train and validate ML models</p>
              </div>
            </div>
            
            <div className="text-2xl text-gray-400">{'>'}</div>
            
            <div className="flex-1 text-center">
              <div className="bg-orange-100 rounded-lg p-4 mb-2">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-medium">Deployment</h4>
                <p className="text-sm text-gray-600">Deploy models to production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
