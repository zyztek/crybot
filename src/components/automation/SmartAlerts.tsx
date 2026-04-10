import React, { useState, useEffect } from 'react';
import { Bell, TrendingUp, AlertTriangle, DollarSign, Activity, Settings, Plus, Edit, Trash2, Play, Pause, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  name: string;
  description: string;
  type: 'price' | 'volume' | 'sentiment' | 'portfolio' | 'technical' | 'social';
  condition: 'above' | 'below' | 'change' | 'crosses' | 'volume_spike' | 'sentiment_shift';
  asset: string;
  value: number;
  currentValue: number;
  threshold: number;
  isActive: boolean;
  channels: ('email' | 'push' | 'sms' | 'webhook')[];
  frequency: 'once' | 'hourly' | 'daily';
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  aiOptimized: boolean;
}

interface AlertHistory {
  id: string;
  alertId: string;
  alertName: string;
  triggeredAt: string;
  value: number;
  threshold: number;
  message: string;
  channel: string;
  acknowledged: boolean;
}

interface AlertTemplate {
  id: string;
  name: string;
  description: string;
  type: Alert['type'];
  condition: Alert['condition'];
  popular: boolean;
}

export const SmartAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertHistory, setAlertHistory] = useState<AlertHistory[]>([]);
  const [templates, setTemplates] = useState<AlertTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [activeTab, setActiveTab] = useState<'alerts' | 'history' | 'templates'>('alerts');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchAlertData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockAlerts: Alert[] = [
          {
            id: 'alert-1',
            name: 'Bitcoin Price Alert',
            description: 'Alert when Bitcoin crosses $50,000',
            type: 'price',
            condition: 'crosses',
            asset: 'BTC',
            value: 50000,
            currentValue: 48750,
            threshold: 50000,
            isActive: true,
            channels: ['email', 'push'],
            frequency: 'once',
            createdAt: '2024-01-15T10:30:00Z',
            triggerCount: 3,
            priority: 'high',
            aiOptimized: true
          },
          {
            id: 'alert-2',
            name: 'Ethereum Volume Spike',
            description: 'Alert on unusual volume increase',
            type: 'volume',
            condition: 'volume_spike',
            asset: 'ETH',
            value: 1000000,
            currentValue: 850000,
            threshold: 1000000,
            isActive: true,
            channels: ['push', 'sms'],
            frequency: 'hourly',
            createdAt: '2024-01-14T15:45:00Z',
            lastTriggered: '2024-01-15T09:20:00Z',
            triggerCount: 7,
            priority: 'medium',
            aiOptimized: true
          },
          {
            id: 'alert-3',
            name: 'Portfolio Drop Alert',
            description: 'Alert when portfolio drops 10%',
            type: 'portfolio',
            condition: 'change',
            asset: 'portfolio',
            value: -10,
            currentValue: -5.2,
            threshold: -10,
            isActive: false,
            channels: ['email'],
            frequency: 'once',
            createdAt: '2024-01-13T09:20:00Z',
            triggerCount: 0,
            priority: 'critical',
            aiOptimized: false
          },
          {
            id: 'alert-4',
            name: 'Solana Sentiment Shift',
            description: 'AI-powered sentiment analysis alert',
            type: 'sentiment',
            condition: 'sentiment_shift',
            asset: 'SOL',
            value: 0.7,
            currentValue: 0.65,
            threshold: 0.8,
            isActive: true,
            channels: ['email', 'push', 'webhook'],
            frequency: 'daily',
            createdAt: '2024-01-12T14:10:00Z',
            lastTriggered: '2024-01-14T11:30:00Z',
            triggerCount: 2,
            priority: 'medium',
            aiOptimized: true
          }
        ];

        const mockHistory: AlertHistory[] = [
          {
            id: 'history-1',
            alertId: 'alert-1',
            alertName: 'Bitcoin Price Alert',
            triggeredAt: '2024-01-15T09:20:00Z',
            value: 50250,
            threshold: 50000,
            message: 'Bitcoin crossed $50,000 threshold',
            channel: 'push',
            acknowledged: true
          },
          {
            id: 'history-2',
            alertId: 'alert-2',
            alertName: 'Ethereum Volume Spike',
            triggeredAt: '2024-01-15T08:45:00Z',
            value: 1200000,
            threshold: 1000000,
            message: 'Ethereum volume spiked 20% above normal',
            channel: 'sms',
            acknowledged: false
          },
          {
            id: 'history-3',
            alertId: 'alert-4',
            alertName: 'Solana Sentiment Shift',
            triggeredAt: '2024-01-14T11:30:00Z',
            value: 0.85,
            threshold: 0.8,
            message: 'Positive sentiment shift detected for Solana',
            channel: 'email',
            acknowledged: true
          }
        ];

        const mockTemplates: AlertTemplate[] = [
          {
            id: 'template-1',
            name: 'Price Breakout',
            description: 'Alert when price breaks resistance/support',
            type: 'price',
            condition: 'crosses',
            popular: true
          },
          {
            id: 'template-2',
            name: 'Volume Anomaly',
            description: 'Detect unusual trading volume',
            type: 'volume',
            condition: 'volume_spike',
            popular: true
          },
          {
            id: 'template-3',
            name: 'RSI Overbought/Oversold',
            description: 'Technical indicator alerts',
            type: 'technical',
            condition: 'crosses',
            popular: false
          },
          {
            id: 'template-4',
            name: 'Portfolio Rebalance',
            description: 'Alert when rebalancing is needed',
            type: 'portfolio',
            condition: 'change',
            popular: true
          },
          {
            id: 'template-5',
            name: 'Social Sentiment',
            description: 'AI-powered sentiment analysis',
            type: 'sentiment',
            condition: 'sentiment_shift',
            popular: false
          }
        ];

        setAlerts(mockAlerts);
        setAlertHistory(mockHistory);
        setTemplates(mockTemplates);
      } catch (error) {
        console.error('Error fetching alert data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertData();
  }, []);

  const handleToggleAlert = async (alertId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, isActive: !alert.isActive }
          : alert
      ));
    } catch (error) {
      console.error('Error toggling alert:', error);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const handleAcknowledgeHistory = async (historyId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlertHistory(prev => prev.map(item => 
        item.id === historyId 
          ? { ...item, acknowledged: true }
          : item
      ));
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'price': return <DollarSign className="w-5 h-5" />;
      case 'volume': return <Activity className="w-5 h-5" />;
      case 'sentiment': return <TrendingUp className="w-5 h-5" />;
      case 'portfolio': return <Settings className="w-5 h-5" />;
      case 'technical': return <AlertTriangle className="w-5 h-5" />;
      case 'social': return <Bell className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filterType === 'all' || alert.type === filterType
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Smart Alerts</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {alerts.filter(a => a.isActive).length} active alerts
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold">{alerts.length}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">{alerts.filter(a => a.isActive).length}</p>
            </div>
            <Play className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Triggered Today</p>
              <p className="text-2xl font-bold">
                {alertHistory.filter(h => 
                  new Date(h.triggeredAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI Optimized</p>
              <p className="text-2xl font-bold">{alerts.filter(a => a.aiOptimized).length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['alerts', 'history', 'templates'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'history' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {alertHistory.filter(h => !h.acknowledged).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="p-6">
            {/* Filter */}
            <div className="mb-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="price">Price</option>
                <option value="volume">Volume</option>
                <option value="sentiment">Sentiment</option>
                <option value="portfolio">Portfolio</option>
                <option value="technical">Technical</option>
                <option value="social">Social</option>
              </select>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map(alert => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        alert.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{alert.name}</h4>
                          {alert.aiOptimized && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              AI Optimized
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(alert.priority)}`}>
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Asset:</span>
                            <span className="ml-2 font-medium">{alert.asset}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Current:</span>
                            <span className="ml-2 font-medium">{alert.currentValue}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Threshold:</span>
                            <span className="ml-2 font-medium">{alert.threshold}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Triggers:</span>
                            <span className="ml-2 font-medium">{alert.triggerCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Channels: {alert.channels.join(', ')}</span>
                          <span>Frequency: {alert.frequency}</span>
                          {alert.lastTriggered && (
                            <span>Last: {new Date(alert.lastTriggered).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          alert.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {alert.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditingAlert(alert)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="p-6">
            <div className="space-y-4">
              {alertHistory.map(history => (
                <div key={history.id} className={`border rounded-lg p-4 ${
                  !history.acknowledged ? 'bg-red-50 border-red-200' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{history.alertName}</h4>
                        {!history.acknowledged && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{history.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Value: {history.value}</span>
                        <span>Threshold: {history.threshold}</span>
                        <span>Channel: {history.channel}</span>
                        <span>Time: {new Date(history.triggeredAt).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {!history.acknowledged && (
                      <button
                        onClick={() => handleAcknowledgeHistory(history.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <div key={template.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{template.name}</h4>
                    {template.popular && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {template.type} • {template.condition}
                    </span>
                    <button
                      onClick={() => {
                        // Create alert from template logic
                        console.log('Create alert from template:', template.id);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
