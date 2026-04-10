/**
 * Anti-Detection System Component
 * 
 * Advanced anti-detection system with real-time monitoring and adaptive behavior
 * Implements multiple detection bypass techniques and human simulation
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Eye, AlertTriangle, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, Activity, Brain, User, Monitor } from 'lucide-react';

interface DetectionMethod {
  id: string;
  name: string;
  type: 'behavioral' | 'technical' | 'biometric' | 'network' | 'content' | 'temporal';
  description: string;
  indicators: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  countermeasures: string[];
  effectiveness: number; // 0-100
  isActive: boolean;
}

interface DetectionEvent {
  id: string;
  methodId: string;
  personaId: string;
  platform: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-100
  description: string;
  indicators: string[];
  response: {
    action: 'ignore' | 'adapt' | 'rotate' | 'pause' | 'evade';
    executed: boolean;
    result: 'success' | 'failed' | 'partial';
    details?: string;
  };
  timestamp: string;
  resolved: boolean;
  resolutionTime?: number; // seconds
}

interface AntiDetectionConfig {
  realTimeMonitoring: boolean;
  adaptiveBehavior: boolean;
  proactiveEvasion: boolean;
  riskThreshold: number; // 0-100
  responseDelay: number; // milliseconds
  rotationFrequency: number; // minutes
  behaviorRandomization: boolean;
  networkObfuscation: boolean;
  contentVariation: boolean;
  temporalPatterns: boolean;
  biometricSimulation: boolean;
  learningEnabled: boolean;
  autoOptimization: boolean;
}

interface PersonaBehavior {
  id: string;
  personaId: string;
  patterns: {
    typingSpeed: { min: number; max: number; variance: number };
    mouseMovement: { speed: number; acceleration: number; randomness: number };
    clickPatterns: { interval: number; pressure: number; accuracy: number };
    scrollBehavior: { speed: number; smoothness: number; pauses: number };
    sessionDuration: { min: number; max: number; frequency: number };
    activitySchedule: Array<{
      hour: number;
      activity: string;
      duration: number;
      intensity: number;
    }>;
  };
  adaptations: {
    currentRisk: number;
    lastAdaptation: string;
    adaptationHistory: Array<{
      timestamp: string;
      trigger: string;
      action: string;
      result: string;
    }>;
  };
  performance: {
    detectionAvoidance: number; // 0-100
    humanLikeness: number; // 0-100
    consistencyScore: number; // 0-100
    adaptationSpeed: number; // 0-100
  };
}

const AntiDetectionSystem: React.FC = () => {
  const [detectionMethods, setDetectionMethods] = useState<DetectionMethod[]>([]);
  const [detectionEvents, setDetectionEvents] = useState<DetectionEvent[]>([]);
  const [personaBehaviors, setPersonaBehaviors] = useState<PersonaBehavior[]>([]);
  const [config, setConfig] = useState<AntiDetectionConfig>({
    realTimeMonitoring: true,
    adaptiveBehavior: true,
    proactiveEvasion: true,
    riskThreshold: 75,
    responseDelay: 500,
    rotationFrequency: 30,
    behaviorRandomization: true,
    networkObfuscation: true,
    contentVariation: true,
    temporalPatterns: true,
    biometricSimulation: true,
    learningEnabled: true,
    autoOptimization: true
  });
  const [selectedEvent, setSelectedEvent] = useState<DetectionEvent | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<DetectionMethod | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [stats, setStats] = useState({
    totalEvents: 0,
    criticalEvents: 0,
    resolvedEvents: 0,
    averageResponseTime: 0,
    detectionAvoidance: 0,
    activeMethods: 0,
    adaptationSuccess: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock detection methods initialization
  useEffect(() => {
    const mockMethods: DetectionMethod[] = [
      {
        id: '1',
        name: 'Bot Pattern Detection',
        type: 'behavioral',
        description: 'Detects automated behavior patterns like consistent timing and perfect accuracy',
        indicators: ['consistent_click_intervals', 'perfect_accuracy', 'no_human_errors', 'linear_mouse_movement'],
        severity: 'high',
        countermeasures: ['randomize_timing', 'add_human_errors', 'vary_mouse_patterns', 'simulate_fatigue'],
        effectiveness: 92,
        isActive: true
      },
      {
        id: '2',
        name: 'Fingerprint Analysis',
        type: 'technical',
        description: 'Analyzes browser and device fingerprints for consistency',
        indicators: ['consistent_canvas_hash', 'stable_webgl_params', 'unchanged_fonts', 'static_timezone'],
        severity: 'medium',
        countermeasures: ['rotate_fingerprints', 'randomize_parameters', 'vary_timezones', 'simulate_device_changes'],
        effectiveness: 88,
        isActive: true
      },
      {
        id: '3',
        name: 'Network Pattern Analysis',
        type: 'network',
        description: 'Monitors network traffic patterns and IP geolocation',
        indicators: ['consistent_ip_location', 'regular_request_intervals', 'same_user_agent', 'stable_headers'],
        severity: 'medium',
        countermeasures: ['rotate_proxies', 'vary_user_agents', 'randomize_headers', 'simulate_network_jitter'],
        effectiveness: 85,
        isActive: true
      },
      {
        id: '4',
        name: 'Content Analysis',
        type: 'content',
        description: 'Analyzes generated content for AI patterns and repetition',
        indicators: ['repetitive_phrases', 'perfect_grammar', 'consistent_tone', 'lack_of_personality'],
        severity: 'low',
        countermeasures: ['vary_writing_style', 'add_typos', 'include_personal_touches', 'emulate_mood_changes'],
        effectiveness: 78,
        isActive: true
      },
      {
        id: '5',
        name: 'Temporal Pattern Detection',
        type: 'temporal',
        description: 'Detects unusual timing patterns and activity schedules',
        indicators: ['24/7_activity', 'consistent_login_times', 'regular_posting_schedule', 'no_breaks'],
        severity: 'high',
        countermeasures: ['simulate_sleep_schedule', 'vary_activity_times', 'add_random_breaks', 'weekend_variation'],
        effectiveness: 90,
        isActive: true
      },
      {
        id: '6',
        name: 'Biometric Analysis',
        type: 'biometric',
        description: 'Analyzes biometric patterns for consistency',
        indicators: ['consistent_typing_rhythm', 'stable_mouse_pressure', 'regular_scroll_speed', 'fixed_click_duration'],
        severity: 'medium',
        countermeasures: ['vary_typing_speed', 'randomize_mouse_pressure', 'simulate_fatigue', 'add_human_delays'],
        effectiveness: 86,
        isActive: true
      }
    ];

    setDetectionMethods(mockMethods);
  }, []);

  // Mock persona behaviors initialization
  useEffect(() => {
    const mockBehaviors: PersonaBehavior[] = [
      {
        id: 'behavior-1',
        personaId: 'persona-1',
        patterns: {
          typingSpeed: { min: 45, max: 85, variance: 15 },
          mouseMovement: { speed: 2.5, acceleration: 0.8, randomness: 0.3 },
          clickPatterns: { interval: 800, pressure: 0.7, accuracy: 0.92 },
          scrollBehavior: { speed: 3.2, smoothness: 0.8, pauses: 2 },
          sessionDuration: { min: 30, max: 180, frequency: 4 },
          activitySchedule: [
            { hour: 9, activity: 'login', duration: 15, intensity: 0.3 },
            { hour: 10, activity: 'browse', duration: 45, intensity: 0.6 },
            { hour: 14, activity: 'work', duration: 90, intensity: 0.8 },
            { hour: 19, activity: 'social', duration: 60, intensity: 0.5 },
            { hour: 21, activity: 'entertainment', duration: 45, intensity: 0.4 }
          ]
        },
        adaptations: {
          currentRisk: 25,
          lastAdaptation: 'Increased typing variance',
          adaptationHistory: [
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              trigger: 'Bot pattern detected',
              action: 'Randomized click intervals',
              result: 'Success - risk reduced'
            }
          ]
        },
        performance: {
          detectionAvoidance: 94.2,
          humanLikeness: 87.5,
          consistencyScore: 91.3,
          adaptationSpeed: 88.7
        }
      },
      {
        id: 'behavior-2',
        personaId: 'persona-2',
        patterns: {
          typingSpeed: { min: 55, max: 95, variance: 20 },
          mouseMovement: { speed: 3.1, acceleration: 1.2, randomness: 0.4 },
          clickPatterns: { interval: 650, pressure: 0.8, accuracy: 0.88 },
          scrollBehavior: { speed: 2.8, smoothness: 0.9, pauses: 3 },
          sessionDuration: { min: 45, max: 240, frequency: 3 },
          activitySchedule: [
            { hour: 8, activity: 'login', duration: 10, intensity: 0.2 },
            { hour: 11, activity: 'browse', duration: 60, intensity: 0.5 },
            { hour: 15, activity: 'work', duration: 120, intensity: 0.7 },
            { hour: 20, activity: 'social', duration: 90, intensity: 0.6 }
          ]
        },
        adaptations: {
          currentRisk: 32,
          lastAdaptation: 'Adjusted mouse movement patterns',
          adaptationHistory: [
            {
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              trigger: 'Fingerprint analysis',
              action: 'Rotated canvas parameters',
              result: 'Success - fingerprint changed'
            }
          ]
        },
        performance: {
          detectionAvoidance: 91.8,
          humanLikeness: 89.2,
          consistencyScore: 88.5,
          adaptationSpeed: 85.3
        }
      }
    ];

    setPersonaBehaviors(mockBehaviors);
  }, []);

  // Real-time monitoring simulation
  useEffect(() => {
    if (!config.realTimeMonitoring) return;

    const interval = setInterval(() => {
      // Simulate detection events
      if (Math.random() > 0.9) { // 10% chance per interval
        const activeMethods = detectionMethods.filter(m => m.isActive);
        const randomMethod = activeMethods[Math.floor(Math.random() * activeMethods.length)];
        const platforms = ['FreeBitcoin', 'Cointiply', 'FireFaucet', 'CoinEarn', 'CryptoBrowser'];
        const personas = ['persona-1', 'persona-2'];
        
        const newEvent: DetectionEvent = {
          id: `event-${Date.now()}`,
          methodId: randomMethod.id,
          personaId: personas[Math.floor(Math.random() * personas.length)],
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          confidence: Math.random() * 40 + 60, // 60-100
          description: `${randomMethod.name} triggered on ${platforms[Math.floor(Math.random() * platforms.length)]}`,
          indicators: randomMethod.indicators.slice(0, Math.floor(Math.random() * 3) + 1),
          response: {
            action: Math.random() > 0.3 ? 'adapt' : Math.random() > 0.5 ? 'rotate' : 'evade',
            executed: true,
            result: Math.random() > 0.15 ? 'success' : 'failed'
          },
          timestamp: new Date().toISOString(),
          resolved: false
        };

        setDetectionEvents(prev => [...prev, newEvent]);

        // Simulate resolution
        setTimeout(() => {
          setDetectionEvents(prev => prev.map(event => 
            event.id === newEvent.id 
              ? {
                  ...event,
                  resolved: true,
                  resolutionTime: Math.random() * 5000 + 1000
                }
              : event
          ));
        }, Math.random() * 8000 + 2000);
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [config.realTimeMonitoring, detectionMethods]);

  // Adaptive behavior simulation
  useEffect(() => {
    if (!config.adaptiveBehavior) return;

    const interval = setInterval(() => {
      // Simulate behavior adaptation
      setPersonaBehaviors(prev => prev.map(behavior => {
        const riskChange = (Math.random() - 0.5) * 10; // -5 to +5
        const newRisk = Math.max(0, Math.min(100, behavior.adaptations.currentRisk + riskChange));
        
        if (Math.abs(riskChange) > 3) { // Significant change
          return {
            ...behavior,
            adaptations: {
              ...behavior.adaptations,
              currentRisk: newRisk,
              lastAdaptation: riskChange > 0 ? 'Risk increased - applying countermeasures' : 'Risk decreased - optimizing performance',
              adaptationHistory: [
                ...behavior.adaptations.adaptationHistory,
                {
                  timestamp: new Date().toISOString(),
                  trigger: 'Risk level change',
                  action: riskChange > 0 ? 'Enhanced randomization' : 'Performance optimization',
                  result: riskChange > 0 ? 'Applied' : 'Optimized'
                }
              ].slice(-5) // Keep last 5 adaptations
            },
            performance: {
              ...behavior.performance,
              detectionAvoidance: Math.max(0, Math.min(100, behavior.performance.detectionAvoidance + (Math.random() - 0.5) * 2)),
              humanLikeness: Math.max(0, Math.min(100, behavior.performance.humanLikeness + (Math.random() - 0.5) * 1.5)),
              adaptationSpeed: Math.max(0, Math.min(100, behavior.performance.adaptationSpeed + (Math.random() - 0.5) * 1))
            }
          };
        }
        
        return behavior;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.adaptiveBehavior]);

  // Update stats
  useEffect(() => {
    const criticalEvents = detectionEvents.filter(e => e.severity === 'critical').length;
    const resolvedEvents = detectionEvents.filter(e => e.resolved).length;
    const averageResponseTime = detectionEvents.filter(e => e.resolutionTime).length > 0
      ? detectionEvents.reduce((sum, e) => sum + (e.resolutionTime || 0), 0) / detectionEvents.filter(e => e.resolutionTime).length
      : 0;
    const detectionAvoidance = personaBehaviors.length > 0
      ? personaBehaviors.reduce((sum, b) => sum + b.performance.detectionAvoidance, 0) / personaBehaviors.length
      : 0;
    const activeMethods = detectionMethods.filter(m => m.isActive).length;
    const adaptationSuccess = personaBehaviors.reduce((sum, b) => sum + b.performance.adaptationSpeed, 0) / personaBehaviors.length;

    setStats({
      totalEvents: detectionEvents.length,
      criticalEvents,
      resolvedEvents,
      averageResponseTime,
      detectionAvoidance,
      activeMethods,
      adaptationSuccess
    });
  }, [detectionEvents, personaBehaviors, detectionMethods]);

  const executeCountermeasure = (eventId: string) => {
    setDetectionEvents(prev => prev.map(event => 
      event.id === eventId 
        ? {
            ...event,
            response: {
              ...event.response,
              executed: true,
              result: Math.random() > 0.2 ? 'success' : 'failed'
            }
          }
        : event
    ));

    // Simulate resolution
    setTimeout(() => {
      setDetectionEvents(prev => prev.map(event => 
        event.id === eventId 
          ? {
              ...event,
              resolved: true,
              resolutionTime: Math.random() * 3000 + 1000
            }
          : event
      ));
    }, Math.random() * 5000 + 2000);
  };

  const getSeverityColor = (severity: DetectionEvent['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getMethodTypeColor = (type: DetectionMethod['type']) => {
    switch (type) {
      case 'behavioral': return 'bg-blue-600';
      case 'technical': return 'bg-purple-600';
      case 'biometric': return 'bg-green-600';
      case 'network': return 'bg-orange-600';
      case 'content': return 'bg-pink-600';
      case 'temporal': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredEvents = () => {
    return detectionEvents.filter(event => {
      const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = filterPlatform === 'all' || event.platform === filterPlatform;
      const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
      return matchesSearch && matchesPlatform && matchesSeverity;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            Anti-Detection System
          </h1>
          <p className="text-gray-400">
            Advanced anti-detection system with real-time monitoring and adaptive behavior
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Events</div>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Critical Events</div>
                <div className="text-2xl font-bold">{stats.criticalEvents}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Resolved</div>
                <div className="text-2xl font-bold">{stats.resolvedEvents}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avoidance Rate</div>
                <div className="text-2xl font-bold">{stats.detectionAvoidance.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Adaptation Success</div>
                <div className="text-2xl font-bold">{stats.adaptationSuccess.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Detection Management</h2>
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
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              Active Methods: {stats.activeMethods} | 
              Avg Response: {stats.averageResponseTime.toFixed(0)}ms | 
              Real-time: {config.realTimeMonitoring ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Detection Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Detection Methods</h3>
            <div className="space-y-3">
              {detectionMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod?.id === method.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${method.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <h4 className="font-semibold">{method.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getMethodTypeColor(method.type)}`}>
                        {method.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        method.severity === 'critical' ? 'bg-red-600' :
                        method.severity === 'high' ? 'bg-orange-600' :
                        method.severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {method.severity}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 mb-3">
                    {method.description}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Effectiveness:</span> {method.effectiveness}%
                    </div>
                    <div>
                      <span className="text-gray-400">Indicators:</span> {method.indicators.length}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {method.countermeasures.length} countermeasures
                      </span>
                    </div>
                    <div className="text-gray-400">
                      {method.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection Events */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Detection Events</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Platforms</option>
                <option value="FreeBitcoin">FreeBitcoin</option>
                <option value="Cointiply">Cointiply</option>
                <option value="FireFaucet">FireFaucet</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {getFilteredEvents().map((event) => {
                const method = detectionMethods.find(m => m.id === event.methodId);
                return (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedEvent?.id === event.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(event.severity)}`}>
                          {event.severity.toUpperCase()}
                        </span>
                        <div>
                          <h4 className="font-semibold">{method?.name || 'Unknown Method'}</h4>
                          <div className="text-sm text-gray-400">{event.platform}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {event.confidence.toFixed(1)}% confidence
                        </span>
                        {event.resolved && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-3">
                      {event.description}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Indicators:</span> {event.indicators.join(', ')}
                      </div>
                      <div>
                        <span className="text-gray-400">Response:</span> {event.response.action}
                      </div>
                      <div>
                        <span className="text-gray-400">Result:</span> 
                        <span className={event.response.result === 'success' ? 'text-green-400' : 'text-red-400'}>
                          {event.response.result}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time:</span> {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {event.personaId}
                        </span>
                        {event.resolutionTime && (
                          <span className="text-gray-400">
                            Resolved in {event.resolutionTime.toFixed(0)}ms
                          </span>
                        )}
                      </div>
                      {!event.resolved && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            executeCountermeasure(event.id);
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                        >
                          Execute Countermeasure
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {getFilteredEvents().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No detection events found
              </div>
            )}
          </div>
        </div>

        {/* Persona Behaviors */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Persona Behaviors & Adaptations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personaBehaviors.map((behavior) => (
              <div key={behavior.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{behavior.personaId}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-600 rounded text-xs">
                      Risk: {behavior.adaptations.currentRisk.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Detection Avoidance:</span> 
                    <span className={behavior.performance.detectionAvoidance > 90 ? 'text-green-400' : 'text-yellow-400'}>
                      {behavior.performance.detectionAvoidance.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Human Likeness:</span> 
                    <span className={behavior.performance.humanLikeness > 85 ? 'text-green-400' : 'text-yellow-400'}>
                      {behavior.performance.humanLikeness.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Consistency:</span> {behavior.performance.consistencyScore.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Adaptation Speed:</span> {behavior.performance.adaptationSpeed.toFixed(1)}%
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-purple-400 mb-2">Recent Adaptations</h5>
                  <div className="space-y-2">
                    {behavior.adaptations.adaptationHistory.slice(-3).map((adaptation, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-800 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400">
                            {new Date(adaptation.timestamp).toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            adaptation.result === 'Success' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {adaptation.result}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Trigger:</span> {adaptation.trigger}
                        </div>
                        <div>
                          <span className="text-gray-400">Action:</span> {adaptation.action}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-purple-400 mb-2">Behavior Patterns</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Typing Speed:</span> {behavior.patterns.typingSpeed.min}-{behavior.patterns.typingSpeed.max} WPM
                    </div>
                    <div>
                      <span className="text-gray-400">Session Duration:</span> {behavior.patterns.sessionDuration.min}-{behavior.patterns.sessionDuration.max} min
                    </div>
                    <div>
                      <span className="text-gray-400">Mouse Speed:</span> {behavior.patterns.mouseMovement.speed} px/s
                    </div>
                    <div>
                      <span className="text-gray-400">Click Accuracy:</span> {(behavior.patterns.clickPatterns.accuracy * 100).toFixed(1)}%
                    </div>
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
              <h2 className="text-2xl font-bold mb-6">Anti-Detection Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Risk Threshold (%)</label>
                    <input
                      type="number"
                      value={config.riskThreshold}
                      onChange={(e) => setConfig(prev => ({ ...prev, riskThreshold: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Response Delay (ms)</label>
                    <input
                      type="number"
                      value={config.responseDelay}
                      onChange={(e) => setConfig(prev => ({ ...prev, responseDelay: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rotation Frequency (min)</label>
                    <input
                      type="number"
                      value={config.rotationFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, rotationFrequency: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="1440"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Detection Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.realTimeMonitoring}
                        onChange={(e) => setConfig(prev => ({ ...prev, realTimeMonitoring: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Real-time Monitoring</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptiveBehavior}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptiveBehavior: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Adaptive Behavior</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.proactiveEvasion}
                        onChange={(e) => setConfig(prev => ({ ...prev, proactiveEvasion: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Proactive Evasion</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learningEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, learningEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Learning Enabled</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Evasion Techniques</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behaviorRandomization}
                        onChange={(e) => setConfig(prev => ({ ...prev, behaviorRandomization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Behavior Randomization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.networkObfuscation}
                        onChange={(e) => setConfig(prev => ({ ...prev, networkObfuscation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Network Obfuscation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentVariation}
                        onChange={(e) => setConfig(prev => ({ ...prev, contentVariation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Content Variation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.temporalPatterns}
                        onChange={(e) => setConfig(prev => ({ ...prev, temporalPatterns: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Temporal Patterns</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.biometricSimulation}
                        onChange={(e) => setConfig(prev => ({ ...prev, biometricSimulation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Biometric Simulation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Optimization</span>
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

export default AntiDetectionSystem;
