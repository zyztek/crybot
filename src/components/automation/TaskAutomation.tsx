/**
 * Task Automation Component
 * 
 * Create task automation system for surveys, PTC, videos, and games
 * Comprehensive automation for various online earning activities
 */

import React, { useState, useEffect, useRef } from 'react';
import { CheckSquare, DollarSign, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Zap, Play, Pause, BarChart3, TrendingUp } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  type: 'survey' | 'ptc' | 'video' | 'game' | 'captcha' | 'offer' | 'app_install' | 'social_task' | 'micro_task' | 'crowdsource';
  category: 'market_research' | 'advertising' | 'entertainment' | 'gaming' | 'social_media' | 'crowdsourcing' | 'testing' | 'data_collection';
  platform: string;
  description: string;
  requirements: {
    time: number; // minutes
    skills: string[];
    tools: string[];
    device: 'desktop' | 'mobile' | 'both';
    location: string[];
    age: number;
    language: string[];
  };
  compensation: {
    type: 'fixed' | 'variable' | 'bonus' | 'commission' | 'points' | 'crypto' | 'gift_card';
    amount: number;
    currency: string;
    bonus: number;
    frequency: 'one_time' | 'recurring' | 'daily' | 'weekly' | 'monthly';
  };
  automation: {
    enabled: boolean;
    successRate: number; // 0-100
    averageTime: number; // minutes
    dailyLimit: number;
    currentProgress: number;
    autoRetry: boolean;
    skipVerification: boolean;
    useProxy: boolean;
    randomDelays: boolean;
  };
  performance: {
    totalCompleted: number;
    totalEarned: number;
    averageEarning: number;
    completionRate: number; // 0-100
    verificationRate: number; // 0-100
    timeSpent: number; // hours
    efficiency: number; // 0-100
  };
  scheduling: {
    isActive: boolean;
    frequency: 'immediate' | 'scheduled' | 'continuous' | 'batch';
    times: string[];
    timezone: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    maxConcurrent: number;
  };
  status: 'active' | 'paused' | 'completed' | 'failed' | 'pending' | 'disabled';
  createdAt: string;
  lastRun: string;
  nextRun: string;
}

interface TaskResult {
  id: string;
  taskId: string;
  personaId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'verified' | 'rejected';
  startTime: string;
  endTime?: string;
  duration?: number; // seconds
  earnings: number;
  currency: string;
  verification: {
    required: boolean;
    status: 'pending' | 'passed' | 'failed' | 'skipped';
    attempts: number;
    method: 'auto' | 'manual' | 'hybrid';
  };
  details: {
    platform: string;
    taskId: string;
    responses: any;
    screenshots: string[];
    logs: string[];
  };
  error?: {
    code: string;
    message: string;
    retryCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface TaskAutomationConfig {
  autoMode: boolean;
  batchProcessing: boolean;
  parallelExecution: boolean;
  errorHandling: 'retry' | 'skip' | 'stop' | 'notify';
  verification: {
    autoVerification: boolean;
    screenshotCapture: boolean;
    logRetention: number; // days
    successThreshold: number; // 0-100
  };
  performance: {
    maxConcurrentTasks: number;
    timeoutDuration: number; // minutes
    retryAttempts: number;
    delayBetween: number; // seconds
    randomization: boolean;
  };
  optimization: {
    taskSelection: 'highest_earning' | 'fastest' | 'highest_success' | 'balanced';
    personaRotation: boolean;
    proxyRotation: boolean;
    scheduleOptimization: boolean;
  };
  monitoring: {
    realTimeUpdates: boolean;
    performanceTracking: boolean;
    errorLogging: boolean;
    earningsReporting: boolean;
    alerts: boolean;
  };
}

const TaskAutomation: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [results, setResults] = useState<TaskResult[]>([]);
  const [config, setConfig] = useState<TaskAutomationConfig>({
    autoMode: true,
    batchProcessing: true,
    parallelExecution: true,
    errorHandling: 'retry',
    verification: {
      autoVerification: true,
      screenshotCapture: true,
      logRetention: 30,
      successThreshold: 85
    },
    performance: {
      maxConcurrentTasks: 5,
      timeoutDuration: 30,
      retryAttempts: 3,
      delayBetween: 5,
      randomization: true
    },
    optimization: {
      taskSelection: 'balanced',
      personaRotation: true,
      proxyRotation: true,
      scheduleOptimization: true
    },
    monitoring: {
      realTimeUpdates: true,
      performanceTracking: true,
      errorLogging: true,
      earningsReporting: true,
      alerts: true
    }
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedResult, setSelectedResult] = useState<TaskResult | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalTasks: 0,
    activeTasks: 0,
    totalCompleted: 0,
    totalEarned: 0,
    averageEarning: 0,
    successRate: 0,
    bestPlatform: '',
    timeSpent: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock tasks initialization
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: 'task-1',
        name: 'Consumer Behavior Survey',
        type: 'survey',
        category: 'market_research',
        platform: 'SurveyJunkie',
        description: 'Complete consumer behavior survey about shopping habits and preferences',
        requirements: {
          time: 15,
          skills: ['Reading comprehension', 'Attention to detail'],
          tools: ['Web browser'],
          device: 'both',
          location: ['US', 'CA', 'UK'],
          age: 18,
          language: ['English']
        },
        compensation: {
          type: 'fixed',
          amount: 2.50,
          currency: 'USD',
          bonus: 0.50,
          frequency: 'one_time'
        },
        automation: {
          enabled: true,
          successRate: 92.5,
          averageTime: 12,
          dailyLimit: 10,
          currentProgress: 0,
          autoRetry: true,
          skipVerification: false,
          useProxy: true,
          randomDelays: true
        },
        performance: {
          totalCompleted: 156,
          totalEarned: 468.00,
          averageEarning: 3.00,
          completionRate: 92.5,
          verificationRate: 88.2,
          timeSpent: 31.2,
          efficiency: 85.7
        },
        scheduling: {
          isActive: true,
          frequency: 'continuous',
          times: ['09:00', '12:00', '15:00', '18:00', '21:00'],
          timezone: 'EST',
          priority: 'medium',
          maxConcurrent: 2
        },
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastRun: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString()
      },
      {
        id: 'task-2',
        name: 'PTC Ad Viewing',
        type: 'ptc',
        category: 'advertising',
        platform: 'NeoBux',
        description: 'View advertisements and complete verification tasks',
        requirements: {
          time: 2,
          skills: ['Basic computer skills'],
          tools: ['Web browser'],
          device: 'desktop',
          location: ['Global'],
          age: 18,
          language: ['English']
        },
        compensation: {
          type: 'fixed',
          amount: 0.02,
          currency: 'USD',
          bonus: 0.00,
          frequency: 'daily'
        },
        automation: {
          enabled: true,
          successRate: 98.2,
          averageTime: 1.5,
          dailyLimit: 100,
          currentProgress: 0,
          autoRetry: true,
          skipVerification: true,
          useProxy: true,
          randomDelays: true
        },
        performance: {
          totalCompleted: 2450,
          totalEarned: 49.00,
          averageEarning: 0.02,
          completionRate: 98.2,
          verificationRate: 99.1,
          timeSpent: 61.3,
          efficiency: 95.8
        },
        scheduling: {
          isActive: true,
          frequency: 'continuous',
          times: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
          timezone: 'EST',
          priority: 'low',
          maxConcurrent: 5
        },
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        lastRun: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 900000).toISOString()
      },
      {
        id: 'task-3',
        name: 'Video Watching Campaign',
        type: 'video',
        category: 'advertising',
        platform: 'Swagbucks',
        description: 'Watch promotional videos and complete engagement tasks',
        requirements: {
          time: 5,
          skills: ['Video playback', 'Basic interaction'],
          tools: ['Video player', 'Web browser'],
          device: 'both',
          location: ['US', 'CA', 'UK', 'AU'],
          age: 18,
          language: ['English']
        },
        compensation: {
          type: 'points',
          amount: 50,
          currency: 'SB',
          bonus: 10,
          frequency: 'daily'
        },
        automation: {
          enabled: true,
          successRate: 94.7,
          averageTime: 4.2,
          dailyLimit: 20,
          currentProgress: 0,
          autoRetry: true,
          skipVerification: false,
          useProxy: true,
          randomDelays: true
        },
        performance: {
          totalCompleted: 890,
          totalEarned: 44500,
          averageEarning: 50,
          completionRate: 94.7,
          verificationRate: 91.3,
          timeSpent: 62.3,
          efficiency: 89.2
        },
        scheduling: {
          isActive: true,
          frequency: 'batch',
          times: ['10:00', '14:00', '18:00', '22:00'],
          timezone: 'EST',
          priority: 'medium',
          maxConcurrent: 3
        },
        status: 'active',
        createdAt: '2024-01-12T00:00:00Z',
        lastRun: new Date(Date.now() - 7200000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString()
      },
      {
        id: 'task-4',
        name: 'Mobile Game Testing',
        type: 'game',
        category: 'gaming',
        platform: 'Mistplay',
        description: 'Play mobile games and achieve specific objectives',
        requirements: {
          time: 20,
          skills: ['Gaming', 'Mobile device operation'],
          tools: ['Mobile device', 'Game app'],
          device: 'mobile',
          location: ['Global'],
          age: 13,
          language: ['English', 'Spanish', 'French']
        },
        compensation: {
          type: 'points',
          amount: 100,
          currency: 'Units',
          bonus: 25,
          frequency: 'daily'
        },
        automation: {
          enabled: true,
          successRate: 87.3,
          averageTime: 18.5,
          dailyLimit: 5,
          currentProgress: 0,
          autoRetry: true,
          skipVerification: false,
          useProxy: false,
          randomDelays: true
        },
        performance: {
          totalCompleted: 234,
          totalEarned: 23400,
          averageEarning: 100,
          completionRate: 87.3,
          verificationRate: 82.1,
          timeSpent: 72.1,
          efficiency: 78.5
        },
        scheduling: {
          isActive: true,
          frequency: 'scheduled',
          times: ['19:00', '20:00', '21:00'],
          timezone: 'EST',
          priority: 'low',
          maxConcurrent: 1
        },
        status: 'active',
        createdAt: '2024-01-08T00:00:00Z',
        lastRun: new Date(Date.now() - 14400000).toISOString(),
        nextRun: new Date(Date.now() + 7200000).toISOString()
      }
    ];

    setTasks(mockTasks);
  }, []);

  // Mock results initialization
  useEffect(() => {
    const mockResults: TaskResult[] = [
      {
        id: 'result-1',
        taskId: 'task-1',
        personaId: 'persona-1',
        status: 'completed',
        startTime: new Date(Date.now() - 900000).toISOString(),
        endTime: new Date(Date.now() - 720000).toISOString(),
        duration: 180,
        earnings: 3.00,
        currency: 'USD',
        verification: {
          required: true,
          status: 'passed',
          attempts: 1,
          method: 'auto'
        },
        details: {
          platform: 'SurveyJunkie',
          taskId: 'SJ-2024-001',
          responses: { 'q1': 'A', 'q2': 'B', 'q3': 'C' },
          screenshots: ['/screenshots/survey_1.png'],
          logs: ['Survey started', 'Questions answered', 'Verification passed']
        },
        createdAt: new Date(Date.now() - 900000).toISOString(),
        updatedAt: new Date(Date.now() - 720000).toISOString()
      },
      {
        id: 'result-2',
        taskId: 'task-2',
        personaId: 'persona-2',
        status: 'completed',
        startTime: new Date(Date.now() - 300000).toISOString(),
        endTime: new Date(Date.now() - 270000).toISOString(),
        duration: 30,
        earnings: 0.02,
        currency: 'USD',
        verification: {
          required: true,
          status: 'passed',
          attempts: 1,
          method: 'auto'
        },
        details: {
          platform: 'NeoBux',
          taskId: 'NB-2024-002',
          responses: {},
          screenshots: ['/screenshots/ptc_1.png'],
          logs: ['Ad loaded', 'Ad viewed', 'Verification completed']
        },
        createdAt: new Date(Date.now() - 300000).toISOString(),
        updatedAt: new Date(Date.now() - 270000).toISOString()
      }
    ];

    setResults(mockResults);
  }, []);

  // Auto task execution simulation
  useEffect(() => {
    if (!config.autoMode || !isOperating) return;

    const interval = setInterval(() => {
      // Execute active tasks
      tasks.forEach(task => {
        if (task.status === 'active' && task.automation.enabled) {
          const shouldExecute = Math.random() > 0.7; // 30% chance
          
          if (shouldExecute) {
            const success = Math.random() * 100 < task.automation.successRate;
            const duration = task.automation.averageTime * 60 + (Math.random() - 0.5) * 60;
            const earnings = task.compensation.amount + (Math.random() > 0.5 ? task.compensation.bonus : 0);
            
            const newResult: TaskResult = {
              id: `result-${Date.now()}-${Math.random()}`,
              taskId: task.id,
              personaId: `persona-${Math.floor(Math.random() * 5) + 1}`,
              status: success ? 'completed' : 'failed',
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + duration * 1000).toISOString(),
              duration,
              earnings: success ? earnings : 0,
              currency: task.compensation.currency,
              verification: {
                required: true,
                status: success ? (Math.random() > 0.2 ? 'passed' : 'failed') : 'failed',
                attempts: 1,
                method: 'auto'
              },
              details: {
                platform: task.platform,
                taskId: `${task.platform}-${Date.now()}`,
                responses: success ? { 'auto': 'completed' } : {},
                screenshots: success ? [`/screenshots/${task.type}_${Date.now()}.png`] : [],
                logs: ['Task started', success ? 'Task completed' : 'Task failed']
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            setResults(prev => [...prev, newResult]);

            // Update task performance
            setTasks(prev => prev.map(t => 
              t.id === task.id 
                ? {
                    ...t,
                    performance: {
                      ...t.performance,
                      totalCompleted: t.performance.totalCompleted + (success ? 1 : 0),
                      totalEarned: t.performance.totalEarned + (success ? earnings : 0),
                      completionRate: t.performance.totalCompleted > 0 
                        ? ((t.performance.totalCompleted + (success ? 1 : 0)) / (t.performance.totalCompleted + 1)) * 100 
                        : 0,
                      timeSpent: t.performance.timeSpent + (duration / 3600),
                      efficiency: Math.min(100, t.performance.efficiency + (Math.random() * 2 - 1))
                    },
                    lastRun: new Date().toISOString(),
                    nextRun: new Date(Date.now() + Math.random() * 3600000 + 1800000).toISOString()
                  }
                : t
            ));
          }
        }
      });

      // Update task progress
      setTasks(prev => prev.map(task => {
        if (task.status === 'active' && task.automation.enabled) {
          const progressIncrement = Math.random() * 10 + 5;
          const newProgress = Math.min(task.automation.dailyLimit, task.automation.currentProgress + progressIncrement);
          
          return {
            ...task,
            automation: {
              ...task.automation,
              currentProgress: newProgress
            }
          };
        }
        return task;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.autoMode, isOperating]);

  // Auto task creation simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Create new tasks
      if (Math.random() > 0.85) { // 15% chance
        const types: Task['type'][] = ['survey', 'ptc', 'video', 'game', 'captcha', 'offer', 'app_install', 'social_task'];
        const categories: Task['category'][] = ['market_research', 'advertising', 'entertainment', 'gaming', 'social_media'];
        const platforms = ['SurveyJunkie', 'NeoBux', 'Swagbucks', 'Mistplay', 'Amazon Mechanical Turk', 'ClickWorker', 'Appen'];
        
        const newTask: Task = {
          id: `task-${Date.now()}`,
          name: `Auto-Generated ${types[Math.floor(Math.random() * types.length)].charAt(0).toUpperCase() + types[Math.floor(Math.random() * types.length)].slice(1)} Task`,
          type: types[Math.floor(Math.random() * types.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          description: 'Automatically discovered task for execution',
          requirements: {
            time: Math.floor(Math.random() * 20) + 5,
            skills: ['Basic skills'],
            tools: ['Web browser'],
            device: 'both',
            location: ['Global'],
            age: 18,
            language: ['English']
          },
          compensation: {
            type: 'fixed',
            amount: Math.random() * 5 + 0.5,
            currency: 'USD',
            bonus: Math.random() * 2,
            frequency: 'one_time'
          },
          automation: {
            enabled: true,
            successRate: Math.random() * 20 + 80,
            averageTime: Math.random() * 10 + 5,
            dailyLimit: Math.floor(Math.random() * 20) + 5,
            currentProgress: 0,
            autoRetry: true,
            skipVerification: false,
            useProxy: true,
            randomDelays: true
          },
          performance: {
            totalCompleted: 0,
            totalEarned: 0,
            averageEarning: 0,
            completionRate: 0,
            verificationRate: 0,
            timeSpent: 0,
            efficiency: 85
          },
          scheduling: {
            isActive: true,
            frequency: 'continuous',
            times: ['09:00', '12:00', '15:00', '18:00', '21:00'],
            timezone: 'EST',
            priority: 'medium',
            maxConcurrent: 2
          },
          status: 'active',
          createdAt: new Date().toISOString(),
          lastRun: new Date().toISOString(),
          nextRun: new Date(Date.now() + Math.random() * 3600000 + 1800000).toISOString()
        };

        setTasks(prev => [...prev, newTask]);
      }
    }, 180000); // Every 3 minutes

    return () => clearInterval(interval);
  }, [isOperating]);

  // Update stats
  useEffect(() => {
    const activeTasks = tasks.filter(t => t.status === 'active').length;
    const totalCompleted = tasks.reduce((sum, t) => sum + t.performance.totalCompleted, 0);
    const totalEarned = tasks.reduce((sum, t) => sum + t.performance.totalEarned, 0);
    const averageEarning = totalCompleted > 0 ? totalEarned / totalCompleted : 0;
    const successRate = tasks.length > 0 
      ? tasks.reduce((sum, t) => sum + t.performance.completionRate, 0) / tasks.length 
      : 0;
    const timeSpent = tasks.reduce((sum, t) => sum + t.performance.timeSpent, 0);
    
    const platformCounts = tasks.reduce((acc, task) => {
      acc[task.platform] = (acc[task.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestPlatform = Object.entries(platformCounts).reduce((best, [platform, count]) => 
      count > (best?.count || 0) ? { platform, count } : best, null as { platform: string; count: number } | null);

    setStats({
      totalTasks: tasks.length,
      activeTasks,
      totalCompleted,
      totalEarned,
      averageEarning,
      successRate,
      bestPlatform: bestPlatform?.platform || '',
      timeSpent
    });
  }, [tasks]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const executeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? {
            ...t,
            status: 'active',
            lastRun: new Date().toISOString()
          }
        : t
    ));

    // Simulate task execution
    setTimeout(() => {
      const success = Math.random() * 100 < task.automation.successRate;
      const duration = task.automation.averageTime * 60;
      const earnings = task.compensation.amount + (Math.random() > 0.5 ? task.compensation.bonus : 0);
      
      const newResult: TaskResult = {
        id: `result-${Date.now()}`,
        taskId,
        personaId: `persona-${Math.floor(Math.random() * 5) + 1}`,
        status: success ? 'completed' : 'failed',
        startTime: new Date(Date.now() - duration * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration,
        earnings: success ? earnings : 0,
        currency: task.compensation.currency,
        verification: {
          required: true,
          status: success ? 'passed' : 'failed',
          attempts: 1,
          method: 'auto'
        },
        details: {
          platform: task.platform,
          taskId: `${task.platform}-${Date.now()}`,
          responses: success ? { 'manual': 'completed' } : {},
          screenshots: success ? [`/screenshots/${task.type}_${Date.now()}.png`] : [],
          logs: ['Manual task started', success ? 'Task completed' : 'Task failed']
        },
        createdAt: new Date(Date.now() - duration * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      };

      setResults(prev => [...prev, newResult]);

      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? {
              ...t,
              status: 'active',
              performance: {
                ...t.performance,
                totalCompleted: t.performance.totalCompleted + (success ? 1 : 0),
                totalEarned: t.performance.totalEarned + (success ? earnings : 0),
                completionRate: t.performance.totalCompleted > 0 
                  ? ((t.performance.totalCompleted + (success ? 1 : 0)) / (t.performance.totalCompleted + 1)) * 100 
                  : 0,
                timeSpent: t.performance.timeSpent + (duration / 3600)
              },
              lastRun: new Date().toISOString(),
              nextRun: new Date(Date.now() + Math.random() * 3600000 + 1800000).toISOString()
            }
          : t
      ));
    }, task.automation.averageTime * 60000);
  };

  const pauseTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? {
            ...task,
            status: 'paused'
          }
        : task
    ));
  };

  const resumeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? {
            ...task,
            status: 'active'
          }
        : task
    ));
  };

  const getTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'survey': return 'bg-blue-600';
      case 'ptc': return 'bg-green-600';
      case 'video': return 'bg-purple-600';
      case 'game': return 'bg-orange-600';
      case 'captcha': return 'bg-yellow-600';
      case 'offer': return 'bg-red-600';
      case 'app_install': return 'bg-pink-600';
      case 'social_task': return 'bg-cyan-600';
      case 'micro_task': return 'bg-indigo-600';
      case 'crowdsource': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'completed': return 'bg-blue-600';
      case 'failed': return 'bg-red-600';
      case 'pending': return 'bg-orange-600';
      case 'disabled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || task.type === filterType;
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-purple-400" />
            Task Automation
          </h1>
          <p className="text-gray-400">
            Create task automation system for surveys, PTC, videos, and games
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Tasks</div>
                <div className="text-2xl font-bold">{stats.totalTasks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeTasks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-2xl font-bold">{stats.totalCompleted}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Earned</div>
                <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Task Automation Operations</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleOperation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isOperating
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isOperating ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Automation
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Automation
                  </>
                )}
              </button>
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
              Best Platform: {stats.bestPlatform || 'None'} | 
              Time Spent: {stats.timeSpent.toFixed(1)}h | 
              Automation: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tasks</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="survey">Survey</option>
                <option value="ptc">PTC</option>
                <option value="video">Video</option>
                <option value="game">Game</option>
                <option value="captcha">Captcha</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredTasks().map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTask?.id === task.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'active' ? 'bg-green-500' : 
                        task.status === 'paused' ? 'bg-yellow-500' : 
                        task.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <h4 className="font-semibold">{task.name}</h4>
                        <div className="text-sm text-gray-400">{task.platform} - {task.type.replace('_', ' ')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(task.type)}`}>
                        {task.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Earning:</span> ${task.compensation.amount}
                    </div>
                    <div>
                      <span className="text-gray-400">Time:</span> {task.requirements.time}min
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {task.automation.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Completed:</span> {task.performance.totalCompleted}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${task.automation.successRate}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Progress: {task.automation.currentProgress}/{task.automation.dailyLimit} | 
                        Next: {new Date(task.nextRun).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'active' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            pauseTask(task.id);
                          }}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
                        >
                          Pause
                        </button>
                      ) : task.status === 'paused' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resumeTask(task.id);
                          }}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                        >
                          Resume
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            executeTask(task.id);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                        >
                          Execute
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredTasks().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No tasks found
              </div>
            )}
          </div>

          {/* Selected Task Details */}
          {selectedTask && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Task Details: {selectedTask.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Task Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Platform:</span>
                        <span className="font-medium">{selectedTask.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedTask.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-medium">{selectedTask.category.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedTask.status)}`}>
                          {selectedTask.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Compensation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="font-medium">${selectedTask.compensation.amount} {selectedTask.compensation.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bonus:</span>
                        <span className="font-medium">${selectedTask.compensation.bonus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Frequency:</span>
                        <span className="font-medium">{selectedTask.compensation.frequency.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedTask.compensation.type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completed:</span>
                        <span className="font-medium">{selectedTask.performance.totalCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Earned:</span>
                        <span className="font-medium">${selectedTask.performance.totalEarned.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Rate:</span>
                        <span className="font-medium">{selectedTask.performance.completionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="font-medium">{selectedTask.performance.efficiency.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Automation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Enabled:</span>
                        <span className="font-medium">{selectedTask.automation.enabled ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="font-medium">{selectedTask.automation.successRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Time:</span>
                        <span className="font-medium">{selectedTask.automation.averageTime}min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Limit:</span>
                        <span className="font-medium">{selectedTask.automation.dailyLimit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedTask.description}</p>
                </div>

                {/* Requirements */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Requirements</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Time:</span> {selectedTask.requirements.time} minutes
                    </div>
                    <div>
                      <span className="text-gray-400">Device:</span> {selectedTask.requirements.device}
                    </div>
                    <div>
                      <span className="text-gray-400">Age:</span> {selectedTask.requirements.age}+
                    </div>
                    <div>
                      <span className="text-gray-400">Language:</span> {selectedTask.requirements.language.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task Results */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Results</h3>
          <div className="space-y-4">
            {results.slice(-10).map((result) => (
              <div key={result.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Task Result</h4>
                    <div className="text-sm text-gray-400">
                      {result.taskId} - {result.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.status === 'completed' ? 'bg-green-600' :
                      result.status === 'failed' ? 'bg-red-600' :
                      result.status === 'verified' ? 'bg-blue-600' :
                      'bg-gray-600'
                    }`}>
                      {result.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${result.earnings.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Platform:</span> {result.details.platform}
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span> {result.duration ? `${result.duration}s` : 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">Verification:</span> {result.verification.status}
                  </div>
                  <div>
                    <span className="text-gray-400">Method:</span> {result.verification.method}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      result.status === 'completed' ? 'bg-green-500' :
                      result.status === 'failed' ? 'bg-red-500' :
                      result.status === 'verified' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}
                    style={{ width: result.status === 'completed' ? '100%' : '0%' }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {result.details.logs.slice(0, 2).join(' | ')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(result.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {results.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No results found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Task Automation Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Automation Mode</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoMode: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Mode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.batchProcessing}
                        onChange={(e) => setConfig(prev => ({ ...prev, batchProcessing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Batch Processing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.parallelExecution}
                        onChange={(e) => setConfig(prev => ({ ...prev, parallelExecution: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Parallel Execution</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Verification</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.verification.autoVerification}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, autoVerification: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Verification</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.verification.screenshotCapture}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, screenshotCapture: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Screenshot Capture</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Log Retention (days)</label>
                      <input
                        type="number"
                        value={config.verification.logRetention}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, logRetention: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="365"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Success Threshold (%)</label>
                      <input
                        type="number"
                        value={config.verification.successThreshold}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, successThreshold: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Concurrent Tasks</label>
                      <input
                        type="number"
                        value={config.performance.maxConcurrentTasks}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, maxConcurrentTasks: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timeout (minutes)</label>
                      <input
                        type="number"
                        value={config.performance.timeoutDuration}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, timeoutDuration: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="120"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Optimization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Task Selection</label>
                      <select
                        value={config.optimization.taskSelection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          optimization: { ...prev.optimization, taskSelection: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="highest_earning">Highest Earning</option>
                        <option value="fastest">Fastest</option>
                        <option value="highest_success">Highest Success</option>
                        <option value="balanced">Balanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Delay Between (seconds)</label>
                      <input
                        type="number"
                        value={config.performance.delayBetween}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, delayBetween: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="60"
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

export default TaskAutomation;
