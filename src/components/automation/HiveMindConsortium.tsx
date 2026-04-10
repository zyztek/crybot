/**
 * Hive Mind Consortium Component
 * 
 * Hive mind consortium system where personas form specialized agent collectives with shared intelligence and capabilities
 * Enables personas to work together as specialized teams with collective intelligence
 */

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Users, Network, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Link, Globe, Cpu } from 'lucide-react';

interface HiveAgent {
  id: string;
  personaId: string;
  name: string;
  specialization: 'leader' | 'researcher' | 'developer' | 'analyst' | 'strategist' | 'operator' | 'coordinator' | 'specialist';
  role: string;
  capabilities: {
    primary: string[];
    secondary: string[];
    skills: string[];
    expertise: string[];
    tools: string[];
  };
  intelligence: {
    iq: number; // 0-200
    emotionalIntelligence: number; // 0-100
    creativity: number; // 0-100
    logic: number; // 0-100
    adaptability: number; // 0-100
    learningSpeed: number; // 0-100
  };
  performance: {
    tasksCompleted: number;
    successRate: number; // 0-100
    efficiency: number; // 0-100
    collaboration: number; // 0-100
    innovation: number; // 0-100
    reliability: number; // 0-100
  };
  status: 'active' | 'idle' | 'training' | 'integrating' | 'error';
  currentTask?: {
    id: string;
    title: string;
    progress: number; // 0-100
    priority: 'low' | 'medium' | 'high' | 'critical';
    startTime: string;
    estimatedCompletion: string;
  };
  connections: {
    linkedAgents: string[]; // agent IDs
    communicationChannels: string[];
    sharedResources: string[];
    collaborationHistory: Array<{
      agentId: string;
      task: string;
      outcome: string;
      timestamp: string;
      rating: number; // 1-5
    }>;
  };
  isActive: boolean;
  priority: number;
  createdAt: string;
  lastUpdated: string;
}

interface HiveCollective {
  id: string;
  name: string;
  type: 'development' | 'research' | 'operations' | 'strategy' | 'specialized' | 'mixed';
  purpose: string;
  agents: string[]; // agent IDs
  leaderId?: string;
  structure: {
    hierarchy: 'flat' | 'hierarchical' | 'matrix' | 'network';
    decisionMaking: 'consensus' | 'democratic' | 'meritocratic' | 'leader_driven';
    communicationProtocol: 'p2p' | 'centralized' | 'distributed' | 'hybrid';
  };
  intelligence: {
    collectiveIQ: number; // 0-300
    problemSolvingCapability: number; // 0-100
    innovationCapacity: number; // 0-100
    adaptabilityScore: number; // 0-100
    knowledgeBase: {
      topics: string[];
      expertise: string[];
      resources: string[];
      size: number; // MB
    };
  };
  performance: {
    projectsCompleted: number;
    averageSuccessRate: number; // 0-100
    collaborationEfficiency: number; // 0-100
    innovationRate: number; // new ideas per month
    resourceUtilization: number; // 0-100
  };
  capabilities: {
    primaryDomains: string[];
    secondaryDomains: string[];
    tools: string[];
    resources: string[];
    specializations: string[];
  };
  status: 'active' | 'forming' | 'optimizing' | 'scaling' | 'error';
  currentProject?: {
    id: string;
    name: string;
    progress: number; // 0-100
    deadline: string;
    budget: number;
    requirements: string[];
  };
  isActive: boolean;
  priority: number;
  createdAt: string;
  lastActivity: string;
}

interface HiveTask {
  id: string;
  title: string;
  description: string;
  type: 'development' | 'research' | 'analysis' | 'strategy' | 'operation' | 'creative' | 'technical';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'strategic';
  complexity: 'simple' | 'moderate' | 'complex' | 'expert' | 'enterprise';
  requirements: {
    skills: string[];
    expertise: string[];
    tools: string[];
    resources: string[];
    minCollectiveSize: number;
    specializations: string[];
  };
  assignment: {
    collectiveId: string;
    agentIds: string[];
    leaderId?: string;
    strategy: string;
    timeline: {
      startDate: string;
      endDate: string;
      milestones: Array<{
        name: string;
        deadline: string;
        completed: boolean;
      }>;
    };
  };
  execution: {
    status: 'planning' | 'assigned' | 'in_progress' | 'testing' | 'completed' | 'failed' | 'cancelled';
    progress: number; // 0-100
    quality: number; // 0-100
    efficiency: number; // 0-100
    innovation: number; // 0-100
    startTime?: string;
    endTime?: string;
    actualDuration?: number; // hours
    estimatedDuration: number; // hours
  };
  results: {
    outcome: string;
    deliverables: string[];
    quality: number; // 0-100
    innovation: number; // 0-100
    lessons: string[];
    improvements: string[];
  };
  createdAt: string;
  updatedAt: string;
}

interface HiveConfig {
  autoFormation: boolean;
  autoOptimization: boolean;
  intelligenceSharing: boolean;
  resourcePooling: boolean;
  taskDistribution: boolean;
  performanceMonitoring: boolean;
  learningEnabled: boolean;
  adaptationEnabled: boolean;
  scaling: {
    autoScale: boolean;
    minAgents: number;
    maxAgents: number;
    scaleThreshold: number; // CPU/Resource usage
    scaleCooldown: number; // minutes
  };
  communication: {
    protocol: 'p2p' | 'centralized' | 'distributed' | 'hybrid';
    encryption: boolean;
    bandwidth: number; // Mbps
    latency: number; // ms
    reliability: number; // 0-100
  };
  intelligence: {
    collectiveLearning: boolean;
    knowledgeSharing: boolean;
    experienceAccumulation: boolean;
    patternRecognition: boolean;
    predictiveAnalysis: boolean;
  };
  security: {
    agentVerification: boolean;
    dataEncryption: boolean;
    accessControl: boolean;
    auditLogging: boolean;
    threatDetection: boolean;
  };
}

const HiveMindConsortium: React.FC = () => {
  const [agents, setAgents] = useState<HiveAgent[]>([]);
  const [collectives, setCollectives] = useState<HiveCollective[]>([]);
  const [tasks, setTasks] = useState<HiveTask[]>([]);
  const [config, setConfig] = useState<HiveConfig>({
    autoFormation: true,
    autoOptimization: true,
    intelligenceSharing: true,
    resourcePooling: true,
    taskDistribution: true,
    performanceMonitoring: true,
    learningEnabled: true,
    adaptationEnabled: true,
    scaling: {
      autoScale: true,
      minAgents: 3,
      maxAgents: 50,
      scaleThreshold: 80,
      scaleCooldown: 15
    },
    communication: {
      protocol: 'hybrid',
      encryption: true,
      bandwidth: 1000,
      latency: 10,
      reliability: 99.9
    },
    intelligence: {
      collectiveLearning: true,
      knowledgeSharing: true,
      experienceAccumulation: true,
      patternRecognition: true,
      predictiveAnalysis: true
    },
    security: {
      agentVerification: true,
      dataEncryption: true,
      accessControl: true,
      auditLogging: true,
      threatDetection: true
    }
  });
  const [selectedAgent, setSelectedAgent] = useState<HiveAgent | null>(null);
  const [selectedCollective, setSelectedCollective] = useState<HiveCollective | null>(null);
  const [selectedTask, setSelectedTask] = useState<HiveTask | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    totalCollectives: 0,
    activeCollectives: 0,
    collectiveIQ: 0,
    tasksCompleted: 0,
    averageSuccessRate: 0,
    bestCollective: '',
    innovationRate: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock hive agents initialization
  useEffect(() => {
    const mockAgents: HiveAgent[] = [
      {
        id: 'agent-1',
        personaId: 'persona-1',
        name: 'Alpha Leader',
        specialization: 'leader',
        role: 'Strategic Coordinator',
        capabilities: {
          primary: ['strategic planning', 'decision making', 'resource allocation'],
          secondary: ['team coordination', 'risk assessment', 'optimization'],
          skills: ['leadership', 'communication', 'analysis', 'planning'],
          expertise: ['hive management', 'strategic thinking', 'resource optimization'],
          tools: ['management dashboard', 'analytics tools', 'communication platforms']
        },
        intelligence: {
          iq: 185,
          emotionalIntelligence: 95,
          creativity: 88,
          logic: 92,
          adaptability: 90,
          learningSpeed: 85
        },
        performance: {
          tasksCompleted: 156,
          successRate: 94.5,
          efficiency: 91.2,
          collaboration: 96.8,
          innovation: 87.3,
          reliability: 98.1
        },
        status: 'active',
        currentTask: {
          id: 'task-1',
          title: 'Optimize Resource Allocation',
          progress: 75,
          priority: 'high',
          startTime: new Date(Date.now() - 3600000).toISOString(),
          estimatedCompletion: new Date(Date.now() + 1800000).toISOString()
        },
        connections: {
          linkedAgents: ['agent-2', 'agent-3', 'agent-4'],
          communicationChannels: ['secure-chat', 'video-conference', 'shared-workspace'],
          sharedResources: ['analytics-dashboard', 'resource-pool', 'knowledge-base'],
          collaborationHistory: [
            {
              agentId: 'agent-2',
              task: 'Market Analysis',
              outcome: 'Successful',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              rating: 5
            }
          ]
        },
        isActive: true,
        priority: 1,
        createdAt: '2024-01-01T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'agent-2',
        personaId: 'persona-2',
        name: 'Beta Researcher',
        specialization: 'researcher',
        role: 'Intelligence Analyst',
        capabilities: {
          primary: ['data analysis', 'market research', 'trend identification'],
          secondary: ['competitive analysis', 'pattern recognition', 'forecasting'],
          skills: ['research', 'analysis', 'data mining', 'visualization'],
          expertise: ['market intelligence', 'data science', 'competitive analysis'],
          tools: ['data analysis tools', 'visualization platforms', 'research databases']
        },
        intelligence: {
          iq: 175,
          emotionalIntelligence: 85,
          creativity: 92,
          logic: 88,
          adaptability: 87,
          learningSpeed: 90
        },
        performance: {
          tasksCompleted: 234,
          successRate: 91.8,
          efficiency: 89.5,
          collaboration: 93.2,
          innovation: 91.7,
          reliability: 95.3
        },
        status: 'active',
        currentTask: {
          id: 'task-2',
          title: 'Competitive Intelligence Gathering',
          progress: 60,
          priority: 'medium',
          startTime: new Date(Date.now() - 7200000).toISOString(),
          estimatedCompletion: new Date(Date.now() + 3600000).toISOString()
        },
        connections: {
          linkedAgents: ['agent-1', 'agent-3', 'agent-5'],
          communicationChannels: ['secure-chat', 'data-sharing', 'collaboration-tools'],
          sharedResources: ['research-database', 'analytics-tools', 'market-intelligence'],
          collaborationHistory: [
            {
              agentId: 'agent-1',
              task: 'Resource Optimization',
              outcome: 'Successful',
              timestamp: new Date(Date.now() - 43200000).toISOString(),
              rating: 4
            }
          ]
        },
        isActive: true,
        priority: 2,
        createdAt: '2024-01-02T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'agent-3',
        personaId: 'persona-3',
        name: 'Gamma Developer',
        specialization: 'developer',
        role: 'Technical Specialist',
        capabilities: {
          primary: ['software development', 'system architecture', 'automation'],
          secondary: ['debugging', 'optimization', 'integration'],
          skills: ['programming', 'system design', 'automation', 'problem solving'],
          expertise: ['full-stack development', 'system architecture', 'automation engineering'],
          tools: ['development environments', 'version control', 'deployment platforms']
        },
        intelligence: {
          iq: 180,
          emotionalIntelligence: 78,
          creativity: 85,
          logic: 95,
          adaptability: 88,
          learningSpeed: 82
        },
        performance: {
          tasksCompleted: 189,
          successRate: 93.2,
          efficiency: 94.1,
          collaboration: 89.7,
          innovation: 84.5,
          reliability: 96.8
        },
        status: 'active',
        currentTask: {
          id: 'task-3',
          title: 'System Integration Development',
          progress: 45,
          priority: 'high',
          startTime: new Date(Date.now() - 5400000).toISOString(),
          estimatedCompletion: new Date(Date.now() + 7200000).toISOString()
        },
        connections: {
          linkedAgents: ['agent-1', 'agent-2', 'agent-4'],
          communicationChannels: ['code-repository', 'development-tools', 'project-management'],
          sharedResources: ['development-environment', 'code-libraries', 'testing-frameworks'],
          collaborationHistory: [
            {
              agentId: 'agent-4',
              task: 'API Development',
              outcome: 'Successful',
              timestamp: new Date(Date.now() - 21600000).toISOString(),
              rating: 5
            }
          ]
        },
        isActive: true,
        priority: 3,
        createdAt: '2024-01-03T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setAgents(mockAgents);
  }, []);

  // Mock collectives initialization
  useEffect(() => {
    const mockCollectives: HiveCollective[] = [
      {
        id: 'collective-1',
        name: 'Strategic Operations Unit',
        type: 'operations',
        purpose: 'High-level strategic planning and operational coordination',
        agents: ['agent-1', 'agent-2', 'agent-3'],
        leaderId: 'agent-1',
        structure: {
          hierarchy: 'hierarchical',
          decisionMaking: 'meritocratic',
          communicationProtocol: 'hybrid'
        },
        intelligence: {
          collectiveIQ: 280,
          problemSolvingCapability: 92.5,
          innovationCapacity: 88.3,
          adaptabilityScore: 89.7,
          knowledgeBase: {
            topics: ['strategy', 'operations', 'resource management', 'risk assessment'],
            expertise: ['strategic planning', 'operational coordination', 'resource optimization'],
            resources: ['strategic frameworks', 'operational tools', 'analytics platforms'],
            size: 2048
          }
        },
        performance: {
          projectsCompleted: 45,
          averageSuccessRate: 93.5,
          collaborationEfficiency: 91.2,
          innovationRate: 12.5,
          resourceUtilization: 87.8
        },
        capabilities: {
          primaryDomains: ['strategy', 'operations', 'management'],
          secondaryDomains: ['analysis', 'planning', 'coordination'],
          tools: ['management platforms', 'analytics tools', 'communication systems'],
          resources: ['compute resources', 'data storage', 'network infrastructure'],
          specializations: ['strategic planning', 'operational excellence', 'resource optimization']
        },
        status: 'active',
        currentProject: {
          id: 'project-1',
          name: 'Global Resource Optimization',
          progress: 65,
          deadline: new Date(Date.now() + 604800000).toISOString(), // 7 days
          budget: 50000,
          requirements: ['strategic planning', 'resource analysis', 'optimization strategies']
        },
        isActive: true,
        priority: 1,
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      },
      {
        id: 'collective-2',
        name: 'Research & Development Team',
        type: 'research',
        purpose: 'Advanced research and development of new technologies',
        agents: ['agent-2', 'agent-3', 'agent-4'],
        leaderId: 'agent-2',
        structure: {
          hierarchy: 'flat',
          decisionMaking: 'consensus',
          communicationProtocol: 'distributed'
        },
        intelligence: {
          collectiveIQ: 265,
          problemSolvingCapability: 89.8,
          innovationCapacity: 94.2,
          adaptabilityScore: 91.5,
          knowledgeBase: {
            topics: ['AI/ML', 'blockchain', 'automation', 'research methodologies'],
            expertise: ['machine learning', 'distributed systems', 'research protocols'],
            resources: ['research databases', 'development tools', 'computing resources'],
            size: 4096
          }
        },
        performance: {
          projectsCompleted: 28,
          averageSuccessRate: 89.7,
          collaborationEfficiency: 88.5,
          innovationRate: 18.7,
          resourceUtilization: 92.3
        },
        capabilities: {
          primaryDomains: ['research', 'development', 'innovation'],
          secondaryDomains: ['analysis', 'testing', 'documentation'],
          tools: ['research platforms', 'development environments', 'testing frameworks'],
          resources: ['computing clusters', 'data storage', 'research databases'],
          specializations: ['AI research', 'blockchain development', 'automation engineering']
        },
        status: 'active',
        currentProject: {
          id: 'project-2',
          name: 'Next-Generation Automation Platform',
          progress: 40,
          deadline: new Date(Date.now() + 1209600000).toISOString(), // 14 days
          budget: 75000,
          requirements: ['AI expertise', 'development skills', 'research capabilities']
        },
        isActive: true,
        priority: 2,
        createdAt: '2024-01-02T00:00:00Z',
        lastActivity: new Date().toISOString()
      }
    ];

    setCollectives(mockCollectives);
  }, []);

  // Mock tasks initialization
  useEffect(() => {
    const mockTasks: HiveTask[] = [
      {
        id: 'task-1',
        title: 'Global Resource Optimization',
        description: 'Optimize resource allocation across all free and paid resources for maximum efficiency',
        type: 'strategy',
        priority: 'strategic',
        complexity: 'enterprise',
        requirements: {
          skills: ['strategic planning', 'resource management', 'optimization'],
          expertise: ['resource allocation', 'cost optimization', 'efficiency analysis'],
          tools: ['analytics platforms', 'management tools', 'monitoring systems'],
          resources: ['compute resources', 'data storage', 'network infrastructure'],
          minCollectiveSize: 3
        },
        assignment: {
          collectiveId: 'collective-1',
          agentIds: ['agent-1', 'agent-2', 'agent-3'],
          leaderId: 'agent-1',
          strategy: 'Analyze current resource usage and optimize allocation based on priority and efficiency',
          timeline: {
            startDate: new Date(Date.now() - 86400000).toISOString(),
            endDate: new Date(Date.now() + 518400000).toISOString(),
            milestones: [
              { name: 'Resource Analysis', deadline: new Date(Date.now() + 172800000).toISOString(), completed: true },
              { name: 'Optimization Strategy', deadline: new Date(Date.now() + 345600000).toISOString(), completed: true },
              { name: 'Implementation', deadline: new Date(Date.now() + 518400000).toISOString(), completed: false }
            ]
          }
        },
        execution: {
          status: 'in_progress',
          progress: 65,
          quality: 92.5,
          efficiency: 88.7,
          innovation: 85.3,
          startTime: new Date(Date.now() - 86400000).toISOString(),
          estimatedDuration: 144
        },
        results: {
          outcome: 'In Progress',
          deliverables: ['Resource optimization plan', 'Efficiency metrics', 'Implementation roadmap'],
          quality: 0,
          innovation: 0,
          lessons: [],
          improvements: []
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'task-2',
        title: 'AI Model Development',
        description: 'Develop new AI models for enhanced automation and intelligence',
        type: 'development',
        priority: 'high',
        complexity: 'expert',
        requirements: {
          skills: ['machine learning', 'deep learning', 'model optimization'],
          expertise: ['neural networks', 'natural language processing', 'computer vision'],
          tools: ['development frameworks', 'training platforms', 'model repositories'],
          resources: ['GPU resources', 'training data', 'storage'],
          minCollectiveSize: 2
        },
        assignment: {
          collectiveId: 'collective-2',
          agentIds: ['agent-2', 'agent-3'],
          leaderId: 'agent-2',
          strategy: 'Develop specialized AI models for specific automation tasks',
          timeline: {
            startDate: new Date(Date.now() - 43200000).toISOString(),
            endDate: new Date(Date.now() + 259200000).toISOString(),
            milestones: [
              { name: 'Model Design', deadline: new Date(Date.now() + 86400000).toISOString(), completed: true },
              { name: 'Training Phase', deadline: new Date(Date.now() + 172800000).toISOString(), completed: true },
              { name: 'Testing & Validation', deadline: new Date(Date.now() + 259200000).toISOString(), completed: false }
            ]
          }
        },
        execution: {
          status: 'in_progress',
          progress: 40,
          quality: 89.2,
          efficiency: 85.5,
          innovation: 92.7,
          startTime: new Date(Date.now() - 43200000).toISOString(),
          estimatedDuration: 84
        },
        results: {
          outcome: 'In Progress',
          deliverables: ['AI models', 'training datasets', 'performance benchmarks'],
          quality: 0,
          innovation: 0,
          lessons: [],
          improvements: []
        },
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    setTasks(mockTasks);
  }, []);

  // Auto hive operations simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Simulate collective intelligence sharing
      agents.forEach(agent => {
        if (agent.status !== 'active') return;

        // Update agent performance based on collective learning
        setAgents(prev => prev.map(a => 
          a.id === agent.id 
            ? {
                ...a,
                intelligence: {
                  ...a.intelligence,
                  learningSpeed: Math.min(100, a.intelligence.learningSpeed + Math.random() * 2)
                },
                performance: {
                  ...a.performance,
                  collaboration: Math.min(100, a.performance.collaboration + Math.random() * 1)
                }
              }
            : a
        ));

        // Update current task progress
        if (agent.currentTask) {
          setAgents(prev => prev.map(a => 
            a.id === agent.id && a.currentTask
              ? {
                  ...a,
                  currentTask: {
                    ...a.currentTask,
                    progress: Math.min(100, a.currentTask.progress + Math.random() * 5)
                  }
                }
              : a
          ));
        }
      });

      // Update collective intelligence
      collectives.forEach(collective => {
        const collectiveAgents = agents.filter(a => collective.agents.includes(a.id));
        const avgIQ = collectiveAgents.length > 0 
          ? collectiveAgents.reduce((sum, a) => sum + a.intelligence.iq, 0) / collectiveAgents.length 
          : 0;

        setCollectives(prev => prev.map(c => 
          c.id === collective.id 
            ? {
                ...c,
                intelligence: {
                  ...c.intelligence,
                  collectiveIQ: avgIQ + Math.random() * 10,
                  knowledgeBase: {
                    ...c.intelligence.knowledgeBase,
                    size: c.intelligence.knowledgeBase.size + Math.random() * 100
                  }
                }
              }
            : c
        ));

        // Update current project progress
        if (collective.currentProject) {
          setCollectives(prev => prev.map(c => 
            c.id === collective.id && c.currentProject
              ? {
                  ...c,
                  currentProject: {
                    ...c.currentProject,
                    progress: Math.min(100, c.currentProject.progress + Math.random() * 3)
                  }
                }
              : c
          ));
        }
      });

      // Update task progress
      tasks.forEach(task => {
        if (task.execution.status === 'in_progress') {
          setTasks(prev => prev.map(t => 
            t.id === task.id 
              ? {
                  ...t,
                  execution: {
                    ...t.execution,
                    progress: Math.min(100, t.execution.progress + Math.random() * 4),
                    quality: Math.min(100, t.execution.quality + Math.random() * 2),
                    efficiency: Math.min(100, t.execution.efficiency + Math.random() * 1)
                  }
                }
              : t
          ));
        }
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isOperating, agents, collectives, tasks]);

  // Auto task generation and assignment
  useEffect(() => {
    if (!config.taskDistribution || !isOperating) return;

    const interval = setInterval(() => {
      // Generate new tasks based on collective capabilities
      if (Math.random() > 0.7) { // 30% chance
        const taskTypes: HiveTask['type'][] = ['development', 'research', 'analysis', 'strategy', 'operation'];
        const complexities: HiveTask['complexity'][] = ['simple', 'moderate', 'complex', 'expert'];
        const priorities: HiveTask['priority'][] = ['low', 'medium', 'high', 'critical'];
        
        const newTask: HiveTask = {
          id: `task-${Date.now()}`,
          title: `Automated Task ${Date.now()}`,
          description: `Automatically generated task for hive optimization`,
          type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          complexity: complexities[Math.floor(Math.random() * complexities.length)],
          requirements: {
            skills: ['collaboration', 'analysis', 'problem-solving'],
            expertise: ['hive intelligence', 'collective decision making'],
            tools: ['hive tools', 'communication platforms'],
            resources: ['compute resources', 'data storage'],
            minCollectiveSize: 2
          },
          assignment: {
            collectiveId: collectives[Math.floor(Math.random() * collectives.length)]?.id || 'collective-1',
            agentIds: [],
            leaderId: agents[Math.floor(Math.random() * agents.length)]?.id,
            strategy: 'Execute task using collective intelligence',
            timeline: {
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 86400000).toISOString(),
              milestones: []
            }
          },
          execution: {
            status: 'planning',
            progress: 0,
            quality: 0,
            efficiency: 0,
            innovation: 0,
            estimatedDuration: 24
          },
          results: {
            outcome: 'Pending',
            deliverables: [],
            quality: 0,
            innovation: 0,
            lessons: [],
            improvements: []
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setTasks(prev => [...prev, newTask]);
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.taskDistribution, isOperating, collectives, agents]);

  // Update stats
  useEffect(() => {
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const activeCollectives = collectives.filter(c => c.status === 'active').length;
    const collectiveIQ = collectives.length > 0 
      ? collectives.reduce((sum, c) => sum + c.intelligence.collectiveIQ, 0) / collectives.length 
      : 0;
    const tasksCompleted = tasks.filter(t => t.execution.status === 'completed').length;
    const averageSuccessRate = agents.length > 0 
      ? agents.reduce((sum, a) => sum + a.performance.successRate, 0) / agents.length 
      : 0;
    const innovationRate = collectives.length > 0 
      ? collectives.reduce((sum, c) => sum + c.performance.innovationRate, 0) / collectives.length 
      : 0;
    
    const bestCollective = collectives.reduce((best, collective) => 
      collective.performance.averageSuccessRate > (best?.performance.averageSuccessRate || 0) ? collective : best, null as HiveCollective | null);

    setStats({
      totalAgents: agents.length,
      activeAgents,
      totalCollectives: collectives.length,
      activeCollectives,
      collectiveIQ,
      tasksCompleted,
      averageSuccessRate,
      bestCollective: bestCollective?.name || '',
      innovationRate
    });
  }, [agents, collectives, tasks]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const createCollective = () => {
    const availableAgents = agents.filter(a => a.status === 'active');
    if (availableAgents.length < 2) return;

    const newCollective: HiveCollective = {
      id: `collective-${Date.now()}`,
      name: `Hive Collective ${collectives.length + 1}`,
      type: 'mixed',
      purpose: 'Automatically formed collective for enhanced collaboration',
      agents: availableAgents.slice(0, 4).map(a => a.id),
      leaderId: availableAgents[0].id,
      structure: {
        hierarchy: 'flat',
        decisionMaking: 'consensus',
        communicationProtocol: 'distributed'
      },
      intelligence: {
        collectiveIQ: availableAgents.slice(0, 4).reduce((sum, a) => sum + a.intelligence.iq, 0),
        problemSolvingCapability: 85.0,
        innovationCapacity: 80.0,
        adaptabilityScore: 87.5,
        knowledgeBase: {
          topics: ['collaboration', 'problem solving', 'innovation'],
          expertise: ['collective intelligence', 'team coordination'],
          resources: ['shared tools', 'communication platforms'],
          size: 1024
        }
      },
      performance: {
        projectsCompleted: 0,
        averageSuccessRate: 0,
        collaborationEfficiency: 0,
        innovationRate: 0,
        resourceUtilization: 0
      },
      capabilities: {
        primaryDomains: ['collaboration', 'problem solving'],
        secondaryDomains: ['analysis', 'planning'],
        tools: ['communication platforms', 'collaboration tools'],
        resources: ['shared resources', 'collective intelligence'],
        specializations: ['team coordination', 'collective decision making']
      },
      status: 'forming',
      isActive: true,
      priority: collectives.length + 1,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setCollectives(prev => [...prev, newCollective]);
  };

  const getSpecializationColor = (specialization: HiveAgent['specialization']) => {
    switch (specialization) {
      case 'leader': return 'bg-purple-600';
      case 'researcher': return 'bg-blue-600';
      case 'developer': return 'bg-green-600';
      case 'analyst': return 'bg-orange-600';
      case 'strategist': return 'bg-red-600';
      case 'operator': return 'bg-yellow-600';
      case 'coordinator': return 'bg-pink-600';
      case 'specialist': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: HiveAgent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'idle': return 'bg-gray-600';
      case 'training': return 'bg-blue-600';
      case 'integrating': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredAgents = () => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.capabilities.expertise.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = filterSpecialization === 'all' || agent.specialization === filterSpecialization;
      const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
      return matchesSearch && matchesSpecialization && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Hive Mind Consortium
          </h1>
          <p className="text-gray-400">
            Hive mind consortium system where personas form specialized agent collectives with shared intelligence and capabilities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Agents</div>
                <div className="text-2xl font-bold">{stats.totalAgents}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeAgents}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Collectives</div>
                <div className="text-2xl font-bold">{stats.activeCollectives}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Collective IQ</div>
                <div className="text-2xl font-bold">{Math.round(stats.collectiveIQ)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Innovation Rate</div>
                <div className="text-2xl font-bold">{stats.innovationRate.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Hive Operations</h2>
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
                    Stop Operations
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Operations
                  </>
                )}
              </button>
              <button
                onClick={createCollective}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                Create Collective
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
              Best Collective: {stats.bestCollective || 'None'} | 
              Tasks Completed: {stats.tasksCompleted} | 
              Success Rate: {stats.averageSuccessRate.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Hive Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hive Agents</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search agents..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Specializations</option>
                <option value="leader">Leader</option>
                <option value="researcher">Researcher</option>
                <option value="developer">Developer</option>
                <option value="analyst">Analyst</option>
                <option value="strategist">Strategist</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="training">Training</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredAgents().map((agent) => (
                <div
                  key={agent.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAgent?.id === agent.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${agent.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{agent.name}</h4>
                        <div className="text-sm text-gray-400">{agent.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getSpecializationColor(agent.specialization)}`}>
                        {agent.specialization}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">IQ:</span> {agent.intelligence.iq}
                    </div>
                    <div>
                      <span className="text-gray-400">Learning:</span> {agent.intelligence.learningSpeed.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {agent.performance.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Collaboration:</span> {agent.performance.collaboration.toFixed(1)}%
                    </div>
                  </div>

                  {agent.currentTask && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">Current Task:</div>
                      <div className="text-sm font-medium">{agent.currentTask.title}</div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${agent.currentTask.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Connected: {agent.connections.linkedAgents.length} agents
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Priority: {agent.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredAgents().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No agents found
              </div>
            )}
          </div>

          {/* Selected Agent Details */}
          {selectedAgent && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Agent Details: {selectedAgent.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Intelligence</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">IQ:</span>
                        <span className="font-medium">{selectedAgent.intelligence.iq}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Emotional IQ:</span>
                        <span className="font-medium">{selectedAgent.intelligence.emotionalIntelligence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Creativity:</span>
                        <span className="font-medium">{selectedAgent.intelligence.creativity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Logic:</span>
                        <span className="font-medium">{selectedAgent.intelligence.logic}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tasks Completed:</span>
                        <span className="font-medium">{selectedAgent.performance.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="font-medium">{selectedAgent.performance.successRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="font-medium">{selectedAgent.performance.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Innovation:</span>
                        <span className="font-medium">{selectedAgent.performance.innovation.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Capabilities</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Primary Skills:</span>
                        <span className="font-medium">{selectedAgent.capabilities.primary.slice(0, 2).join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expertise:</span>
                        <span className="font-medium">{selectedAgent.capabilities.expertise.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Connections</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Linked Agents:</span>
                        <span className="font-medium">{selectedAgent.connections.linkedAgents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Communication:</span>
                        <span className="font-medium">{selectedAgent.connections.communicationChannels.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hive Collectives */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Hive Collectives</h3>
          <div className="space-y-4">
            {collectives.map((collective) => (
              <div key={collective.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{collective.name}</h4>
                    <div className="text-sm text-gray-400">{collective.type} - {collective.purpose}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${collective.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {collective.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {collective.agents.length} agents
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Collective IQ:</span> {Math.round(collective.intelligence.collectiveIQ)}
                  </div>
                  <div>
                    <span className="text-gray-400">Problem Solving:</span> {collective.intelligence.problemSolvingCapability.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Innovation:</span> {collective.intelligence.innovationCapacity.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Adaptability:</span> {collective.intelligence.adaptabilityScore.toFixed(1)}%
                  </div>
                </div>

                {collective.currentProject && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Current Project:</div>
                    <div className="text-sm font-medium">{collective.currentProject.name}</div>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${collective.currentProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {collective.structure.hierarchy}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {collective.structure.decisionMaking}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Projects: {collective.performance.projectsCompleted}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {collectives.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No collectives formed
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Hive Mind Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoFormation}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoFormation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Formation</span>
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
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligenceSharing}
                        onChange={(e) => setConfig(prev => ({ ...prev, intelligenceSharing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Intelligence Sharing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.taskDistribution}
                        onChange={(e) => setConfig(prev => ({ ...prev, taskDistribution: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Task Distribution</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Intelligence</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.collectiveLearning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, collectiveLearning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Collective Learning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.knowledgeSharing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, knowledgeSharing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Knowledge Sharing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.patternRecognition}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, patternRecognition: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Pattern Recognition</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.predictiveAnalysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, predictiveAnalysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Predictive Analysis</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.agentVerification}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, agentVerification: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Agent Verification</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.dataEncryption}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, dataEncryption: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Data Encryption</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.auditLogging}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, auditLogging: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Audit Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.threatDetection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, threatDetection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Threat Detection</span>
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

export default HiveMindConsortium;
