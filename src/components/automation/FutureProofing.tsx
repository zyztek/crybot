/**
 * Future-Proofing Component
 * 
 * Advanced future-proofing and emerging technologies management system
 * Features technology scouting, innovation tracking, and strategic adaptation
 */

import React, { useState, useEffect } from 'react';
import { Rocket, Brain, Zap, Shield, Globe, TrendingUp, BarChart3, PieChart, Target, Activity, Settings, Search, Filter, Plus, Minus, Edit, Trash2, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Clock, Users, Award, Lightbulb, Database, Cloud, Code, Cpu, Network, Atom, Dna, Microscope, Satellite, Compass } from 'lucide-react';

interface EmergingTechnology {
  id: string;
  name: string;
  category: 'ai_ml' | 'blockchain' | 'quantum' | 'biotech' | 'nanotech' | 'robotics' | 'iot' | 'ar_vr' | 'energy' | 'materials' | 'communication' | 'space';
  maturity_level: 'research' | 'experimental' | 'early_adopter' | 'growing' | 'mature' | 'declining';
  adoption_timeline: string;
  market_potential: number;
  disruption_level: 'low' | 'medium' | 'high' | 'transformative';
  description: string;
  key_players: string[];
  technical_requirements: {
    infrastructure: string[];
    expertise: string[];
    investment_needed: number;
    development_time: number;
  };
  opportunities: Array<{
    type: 'product' | 'service' | 'process' | 'business_model';
    description: string;
    potential_value: number;
    time_to_market: string;
  }>;
  risks: Array<{
    type: 'technical' | 'market' | 'regulatory' | 'ethical' | 'security';
    description: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
  }>;
  implementation_status: {
    current_phase: string;
    progress_percentage: number;
    next_milestones: Array<{
      name: string;
      due_date: string;
      priority: 'low' | 'medium' | 'high';
    }>;
  };
}

interface InnovationPipeline {
  id: string;
  name: string;
  description: string;
  stage: 'ideation' | 'research' | 'development' | 'testing' | 'implementation' | 'scaling';
  priority: 'low' | 'medium' | 'high' | 'critical';
  technology_focus: string[];
  business_impact: {
    revenue_potential: number;
    cost_savings: number;
    market_share_gain: number;
    competitive_advantage: 'low' | 'medium' | 'high';
  };
  resources: {
    team_size: number;
    budget_allocated: number;
    time_investment: number;
    external_partnerships: string[];
  };
  timeline: {
    start_date: string;
    estimated_completion: string;
    key_deliverables: Array<{
      name: string;
      due_date: string;
      status: 'pending' | 'in_progress' | 'completed';
    }>;
  };
  success_metrics: Array<{
    name: string;
    target_value: number;
    current_value: number;
    measurement_frequency: string;
  }>;
}

interface TechnologyScout {
  id: string;
  name: string;
  type: 'technology' | 'market' | 'competitor' | 'academic' | 'patent' | 'startup';
  frequency: 'real_time' | 'daily' | 'weekly' | 'monthly';
  sources: string[];
  keywords: string[];
  filters: {
    relevance_threshold: number;
    maturity_filter: string[];
    geography_filter: string[];
    industry_filter: string[];
  };
  automation: {
    ai_enabled: boolean;
    sentiment_analysis: boolean;
    trend_detection: boolean;
    alert_systems: boolean;
  };
  outputs: Array<{
    type: 'report' | 'alert' | 'insight' | 'recommendation';
    title: string;
    content: string;
    timestamp: string;
    relevance_score: number;
  }>;
}

interface ScenarioPlanning {
  id: string;
  name: string;
  description: string;
  time_horizon: 'short_term' | 'medium_term' | 'long_term';
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'transformative';
  drivers: Array<{
    name: string;
    type: 'technological' | 'economic' | 'social' | 'political' | 'environmental' | 'legal';
    certainty: 'low' | 'medium' | 'high';
    influence: 'low' | 'medium' | 'high';
  }>;
  implications: {
    opportunities: Array<{
      description: string;
      strategic_response: string;
      urgency: 'low' | 'medium' | 'high';
    }>;
    threats: Array<{
      description: string;
      mitigation_strategy: string;
      readiness_level: number;
    }>;
  };
  action_plan: {
    immediate_actions: Array<{
      description: string;
      owner: string;
      deadline: string;
      status: 'planned' | 'in_progress' | 'completed';
    }>;
    long_term_initiatives: Array<{
      description: string;
      timeline: string;
      investment_required: number;
      expected_roi: number;
    }>;
  };
}

interface FutureProofingConfig {
  scouting: {
    automated_monitoring: boolean;
    academic_partnerships: boolean;
    startup_tracking: boolean;
    patent_monitoring: boolean;
  };
  innovation: {
    r_d_investment: number;
    innovation_labs: boolean;
    hackathons: boolean;
    incubator_programs: boolean;
  };
  adaptation: {
    agile_development: boolean;
    rapid_prototyping: boolean;
    pilot_programs: boolean;
    feedback_loops: boolean;
  };
  governance: {
    technology_roadmap: boolean;
    innovation_committee: boolean;
    budget_allocation: boolean;
    risk_assessment: boolean;
  };
}

const FutureProofing: React.FC = () => {
  const [emergingTechnologies, setEmergingTechnologies] = useState<EmergingTechnology[]>([
    {
      id: 'tech-1',
      name: 'Quantum Computing',
      category: 'quantum',
      maturity_level: 'experimental',
      adoption_timeline: '5-10 years',
      market_potential: 15000000000,
      disruption_level: 'transformative',
      description: 'Quantum computing promises exponential speedup for certain computational problems, particularly in cryptography, optimization, and simulation.',
      key_players: ['IBM', 'Google', 'Microsoft', 'Amazon', 'Intel'],
      technical_requirements: {
        infrastructure: ['Quantum processors', 'Cryogenic systems', 'Specialized hardware'],
        expertise: ['Quantum physics', 'Algorithm design', 'Error correction'],
        investment_needed: 50000000,
        development_time: 60
      },
      opportunities: [
        {
          type: 'service',
          description: 'Quantum-as-a-service for optimization problems',
          potential_value: 2500000000,
          time_to_market: '3-5 years'
        },
        {
          type: 'product',
          description: 'Quantum-resistant encryption solutions',
          potential_value: 1500000000,
          time_to_market: '2-3 years'
        }
      ],
      risks: [
        {
          type: 'technical',
          description: 'Quantum decoherence and error rates',
          probability: 'high',
          impact: 'high'
        },
        {
          type: 'ethical',
          description: 'Breaking current encryption standards',
          probability: 'medium',
          impact: 'transformative'
        }
      ],
      implementation_status: {
        current_phase: 'Research & Development',
        progress_percentage: 25,
        next_milestones: [
          { name: 'Quantum algorithm development', due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high' },
          { name: 'Hardware partnership', due_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium' }
        ]
      }
    },
    {
      id: 'tech-2',
      name: 'Generative AI Models',
      category: 'ai_ml',
      maturity_level: 'growing',
      adoption_timeline: '1-3 years',
      market_potential: 85000000000,
      disruption_level: 'high',
      description: 'Advanced AI models capable of generating text, images, code, and other content with human-like quality and creativity.',
      key_players: ['OpenAI', 'Google', 'Anthropic', 'Meta', 'Stability AI'],
      technical_requirements: {
        infrastructure: ['GPU clusters', 'Large-scale storage', 'High-speed networking'],
        expertise: ['Machine learning', 'Deep learning', 'Natural language processing'],
        investment_needed: 10000000,
        development_time: 24
      },
      opportunities: [
        {
          type: 'product',
          description: 'AI-powered content generation platform',
          potential_value: 5000000000,
          time_to_market: '1-2 years'
        },
        {
          type: 'service',
          description: 'Custom AI model training and deployment',
          potential_value: 2000000000,
          time_to_market: '6-12 months'
        }
      ],
      risks: [
        {
          type: 'ethical',
          description: 'Copyright and intellectual property issues',
          probability: 'high',
          impact: 'high'
        },
        {
          type: 'security',
          description: 'Model poisoning and adversarial attacks',
          probability: 'medium',
          impact: 'medium'
        }
      ],
      implementation_status: {
        current_phase: 'Pilot Implementation',
        progress_percentage: 65,
        next_milestones: [
          { name: 'Production deployment', due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high' },
          { name: 'Integration with existing systems', due_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium' }
        ]
      }
    },
    {
      id: 'tech-3',
      name: 'Blockchain 3.0',
      category: 'blockchain',
      maturity_level: 'early_adopter',
      adoption_timeline: '2-4 years',
      market_potential: 45000000000,
      disruption_level: 'high',
      description: 'Next-generation blockchain technology with improved scalability, privacy, and interoperability features.',
      key_players: ['Ethereum Foundation', 'Polkadot', 'Solana', 'Avalanche', 'Cardano'],
      technical_requirements: {
        infrastructure: ['Distributed nodes', 'Smart contract platforms', 'Cross-chain bridges'],
        expertise: ['Cryptography', 'Distributed systems', 'Smart contract development'],
        investment_needed: 15000000,
        development_time: 36
      },
      opportunities: [
        {
          type: 'product',
          description: 'DeFi 2.0 platform with advanced features',
          potential_value: 3000000000,
          time_to_market: '2-3 years'
        },
        {
          type: 'service',
          description: 'Enterprise blockchain solutions',
          potential_value: 1500000000,
          time_to_market: '1-2 years'
        }
      ],
      risks: [
        {
          type: 'regulatory',
          description: 'Uncertain regulatory environment',
          probability: 'medium',
          impact: 'high'
        },
        {
          type: 'technical',
          description: 'Scalability and performance challenges',
          probability: 'medium',
          impact: 'medium'
        }
      ],
      implementation_status: {
        current_phase: 'Development',
        progress_percentage: 45,
        next_milestones: [
          { name: 'Testnet deployment', due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high' },
          { name: 'Security audit', due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high' }
        ]
      }
    },
    {
      id: 'tech-4',
      name: 'Augmented Reality Glasses',
      category: 'ar_vr',
      maturity_level: 'early_adopter',
      adoption_timeline: '3-5 years',
      market_potential: 120000000000,
      disruption_level: 'high',
      description: 'Lightweight, all-day wearable AR glasses that overlay digital information onto the physical world.',
      key_players: ['Apple', 'Meta', 'Microsoft', 'Google', 'Magic Leap'],
      technical_requirements: {
        infrastructure: ['Optical displays', 'Battery technology', 'Processing units'],
        expertise: ['Computer vision', 'User interface design', 'Hardware engineering'],
        investment_needed: 25000000,
        development_time: 48
      },
      opportunities: [
        {
          type: 'product',
          description: 'AR-enabled trading interface',
          potential_value: 500000000,
          time_to_market: '3-4 years'
        },
        {
          type: 'service',
          description: 'AR data visualization platform',
          potential_value: 300000000,
          time_to_market: '2-3 years'
        }
      ],
      risks: [
        {
          type: 'technical',
          description: 'Battery life and processing power limitations',
          probability: 'high',
          impact: 'high'
        },
        {
          type: 'social',
          description: 'Privacy and social acceptance concerns',
          probability: 'medium',
          impact: 'medium'
        }
      ],
      implementation_status: {
        current_phase: 'Research',
        progress_percentage: 15,
        next_milestones: [
          { name: 'Prototype development', due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium' },
          { name: 'User experience testing', due_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium' }
        ]
      }
    }
  ]);

  const [innovationPipeline, setInnovationPipeline] = useState<InnovationPipeline[]>([
    {
      id: 'pipeline-1',
      name: 'AI-Driven Predictive Analytics',
      description: 'Advanced machine learning models for market prediction and risk assessment',
      stage: 'development',
      priority: 'high',
      technology_focus: ['Deep Learning', 'Neural Networks', 'Time Series Analysis'],
      business_impact: {
        revenue_potential: 25000000,
        cost_savings: 5000000,
        market_share_gain: 5.2,
        competitive_advantage: 'high'
      },
      resources: {
        team_size: 8,
        budget_allocated: 2000000,
        time_investment: 18,
        external_partnerships: ['AI Research Lab', 'University Partnership']
      },
      timeline: {
        start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000).toISOString(),
        key_deliverables: [
          { name: 'Model architecture', due_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'completed' },
          { name: 'Training dataset', due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'in_progress' },
          { name: 'Beta testing', due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ]
      },
      success_metrics: [
        { name: 'Prediction accuracy', target_value: 85, current_value: 72, measurement_frequency: 'weekly' },
        { name: 'Processing speed', target_value: 100, current_value: 85, measurement_frequency: 'daily' }
      ]
    },
    {
      id: 'pipeline-2',
      name: 'Quantum-Resistant Security',
      description: 'Post-quantum cryptographic algorithms for future-proof security',
      stage: 'research',
      priority: 'medium',
      technology_focus: ['Quantum Cryptography', 'Lattice-based Algorithms', 'Hash-based Signatures'],
      business_impact: {
        revenue_potential: 8000000,
        cost_savings: 2000000,
        market_share_gain: 2.1,
        competitive_advantage: 'medium'
      },
      resources: {
        team_size: 4,
        budget_allocated: 800000,
        time_investment: 24,
        external_partnerships: ['Quantum Computing Institute', 'Security Research Firm']
      },
      timeline: {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: new Date(Date.now() + 690 * 24 * 60 * 60 * 1000).toISOString(),
        key_deliverables: [
          { name: 'Algorithm selection', due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' },
          { name: 'Prototype implementation', due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ]
      },
      success_metrics: [
        { name: 'Security level', target_value: 256, current_value: 128, measurement_frequency: 'monthly' },
        { name: 'Performance overhead', target_value: 20, current_value: 45, measurement_frequency: 'weekly' }
      ]
    }
  ]);

  const [technologyScouts, setTechnologyScouts] = useState<TechnologyScout[]>([
    {
      id: 'scout-1',
      name: 'AI Technology Monitor',
      type: 'technology',
      frequency: 'daily',
      sources: ['arXiv', 'TechCrunch', 'VentureBeat', 'AI Conference Proceedings'],
      keywords: ['artificial intelligence', 'machine learning', 'neural networks', 'deep learning', 'generative AI'],
      filters: {
        relevance_threshold: 0.7,
        maturity_filter: ['experimental', 'early_adopter', 'growing'],
        geography_filter: ['Global', 'North America', 'Europe', 'Asia'],
        industry_filter: ['Technology', 'Finance', 'Healthcare']
      },
      automation: {
        ai_enabled: true,
        sentiment_analysis: true,
        trend_detection: true,
        alert_systems: true
      },
      outputs: [
        {
          type: 'alert',
          title: 'Breakthrough in Transformer Architecture',
          content: 'New transformer variant shows 40% improvement in efficiency for large language models',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          relevance_score: 0.92
        },
        {
          type: 'insight',
          title: 'OpenAI Announces GPT-5 Development',
          content: 'Next generation language model in development with improved reasoning capabilities',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          relevance_score: 0.88
        }
      ]
    },
    {
      id: 'scout-2',
      name: 'Startup Investment Tracker',
      type: 'startup',
      frequency: 'weekly',
      sources: ['Crunchbase', 'PitchBook', 'AngelList', 'YC Demo Day'],
      keywords: ['blockchain', 'fintech', 'crypto', 'defi', 'web3', 'quantum computing'],
      filters: {
        relevance_threshold: 0.6,
        maturity_filter: ['research', 'experimental', 'early_adopter'],
        geography_filter: ['Global', 'Silicon Valley', 'New York', 'London', 'Singapore'],
        industry_filter: ['FinTech', 'Blockchain', 'AI', 'Quantum Computing']
      },
      automation: {
        ai_enabled: true,
        sentiment_analysis: false,
        trend_detection: true,
        alert_systems: true
      },
      outputs: [
        {
          type: 'report',
          title: 'Q3 2024 Startup Funding Analysis',
          content: 'Blockchain startups raised $2.3B in Q3, with focus on DeFi and infrastructure',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          relevance_score: 0.75
        }
      ]
    }
  ]);

  const [scenarioPlanning, setScenarioPlanning] = useState<ScenarioPlanning[]>([
    {
      id: 'scenario-1',
      name: 'Quantum Supremacy',
      description: 'Quantum computers become capable of breaking current encryption standards',
      time_horizon: 'medium_term',
      probability: 'medium',
      impact: 'transformative',
      drivers: [
        {
          name: 'Quantum computing advancement',
          type: 'technological',
          certainty: 'medium',
          influence: 'high'
        },
        {
          name: 'Investment in quantum research',
          type: 'economic',
          certainty: 'high',
          influence: 'medium'
        }
      ],
      implications: {
        opportunities: [
          {
            description: 'First-mover advantage in quantum-resistant solutions',
            strategic_response: 'Develop and market quantum-resistant encryption',
            urgency: 'high'
          },
          {
            description: 'Quantum computing services market',
            strategic_response: 'Build quantum computing expertise and partnerships',
            urgency: 'medium'
          }
        ],
        threats: [
          {
            description: 'Current encryption becomes obsolete',
            mitigation_strategy: 'Implement quantum-resistant cryptography',
            readiness_level: 25
          },
          {
            description: 'Competitive disadvantage if unprepared',
            mitigation_strategy: 'Establish quantum research team',
            readiness_level: 40
          }
        ]
      },
      action_plan: {
        immediate_actions: [
          {
            description: 'Form quantum computing task force',
            owner: 'CTO',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'planned'
          },
          {
            description: 'Audit current encryption vulnerabilities',
            owner: 'Security Team',
            deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'planned'
          }
        ],
        long_term_initiatives: [
          {
            description: 'Develop quantum-resistant encryption suite',
            timeline: '2-3 years',
            investment_required: 5000000,
            expected_roi: 250
          }
        ]
      }
    },
    {
      id: 'scenario-2',
      name: 'AI Regulation Impact',
      description: 'Comprehensive AI regulation affects development and deployment',
      time_horizon: 'short_term',
      probability: 'high',
      impact: 'high',
      drivers: [
        {
          name: 'Government AI regulation',
          type: 'legal',
          certainty: 'high',
          influence: 'high'
        },
        {
          name: 'Public concern about AI safety',
          type: 'social',
          certainty: 'medium',
          influence: 'medium'
        }
      ],
      implications: {
        opportunities: [
          {
            description: 'Compliance-as-a-service for AI companies',
            strategic_response: 'Develop AI compliance framework and tools',
            urgency: 'medium'
          }
        ],
        threats: [
          {
            description: 'Increased development costs and delays',
            mitigation_strategy: 'Build compliance into development process',
            readiness_level: 60
          },
          {
            description: 'Limited access to cutting-edge AI models',
            mitigation_strategy: 'Establish partnerships with regulated AI providers',
            readiness_level: 35
          }
        ]
      },
      action_plan: {
        immediate_actions: [
          {
            description: 'Monitor regulatory developments',
            owner: 'Legal Team',
            deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in_progress'
          }
        ],
        long_term_initiatives: [
          {
            description: 'AI ethics and compliance program',
            timeline: '1-2 years',
            investment_required: 2000000,
            expected_roi: 150
          }
        ]
      }
    }
  ]);

  const [config, setConfig] = useState<FutureProofingConfig>({
    scouting: {
      automated_monitoring: true,
      academic_partnerships: true,
      startup_tracking: true,
      patent_monitoring: false
    },
    innovation: {
      r_d_investment: 15,
      innovation_labs: true,
      hackathons: true,
      incubator_programs: false
    },
    adaptation: {
      agile_development: true,
      rapid_prototyping: true,
      pilot_programs: true,
      feedback_loops: true
    },
    governance: {
      technology_roadmap: true,
      innovation_committee: true,
      budget_allocation: true,
      risk_assessment: true
    }
  });

  const [selectedTechnology, setSelectedTechnology] = useState<EmergingTechnology | null>(null);
  const [selectedInnovation, setSelectedInnovation] = useState<InnovationPipeline | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPlanning | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update emerging technologies
      setEmergingTechnologies(prev => prev.map(tech => ({
        ...tech,
        implementation_status: {
          ...tech.implementation_status,
          progress_percentage: Math.min(100, tech.implementation_status.progress_percentage + Math.random() * 2)
        }
      })));

      // Update innovation pipeline
      setInnovationPipeline(prev => prev.map(innovation => ({
        ...innovation,
        success_metrics: innovation.success_metrics.map(metric => ({
          ...metric,
          current_value: Math.min(metric.target_value, metric.current_value + (Math.random() * 2) - 0.5)
        }))
      })));

      // Update technology scouts
      setTechnologyScouts(prev => prev.map(scout => ({
        ...scout,
        outputs: [
          ...scout.outputs.slice(-5),
          {
            type: 'alert' as const,
            title: `New development in ${scout.keywords[Math.floor(Math.random() * scout.keywords.length)]}`,
            content: 'Significant advancement detected in monitored technology area',
            timestamp: new Date().toISOString(),
            relevance_score: 0.7 + Math.random() * 0.3
          }
        ]
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: EmergingTechnology['category']) => {
    switch (category) {
      case 'ai_ml': return <Brain className="w-4 h-4" />;
      case 'blockchain': return <Network className="w-4 h-4" />;
      case 'quantum': return <Atom className="w-4 h-4" />;
      case 'biotech': return <Dna className="w-4 h-4" />;
      case 'nanotech': return <Microscope className="w-4 h-4" />;
      case 'robotics': return <Cpu className="w-4 h-4" />;
      case 'iot': return <Globe className="w-4 h-4" />;
      case 'ar_vr': return <Eye className="w-4 h-4" />;
      case 'energy': return <Zap className="w-4 h-4" />;
      case 'materials': return <Shield className="w-4 h-4" />;
      case 'communication': return <Satellite className="w-4 h-4" />;
      case 'space': return <Rocket className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getMaturityColor = (maturity: EmergingTechnology['maturity_level']) => {
    switch (maturity) {
      case 'research': return 'bg-purple-600';
      case 'experimental': return 'bg-blue-600';
      case 'early_adopter': return 'bg-green-600';
      case 'growing': return 'bg-yellow-600';
      case 'mature': return 'bg-orange-600';
      case 'declining': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getDisruptionColor = (disruption: EmergingTechnology['disruption_level']) => {
    switch (disruption) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'transformative': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStageColor = (stage: InnovationPipeline['stage']) => {
    switch (stage) {
      case 'ideation': return 'bg-purple-600';
      case 'research': return 'bg-blue-600';
      case 'development': return 'bg-yellow-600';
      case 'testing': return 'bg-orange-600';
      case 'implementation': return 'bg-green-600';
      case 'scaling': return 'bg-red-600';
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

  const getFilteredTechnologies = () => {
    return emergingTechnologies.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tech.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tech.category === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-blue-400" />
            Future-Proofing
          </h1>
          <p className="text-gray-400">
            Advanced future-proofing and emerging technologies management system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Emerging Tech</div>
                <div className="text-2xl font-bold">{emergingTechnologies.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Innovations</div>
                <div className="text-2xl font-bold">{innovationPipeline.filter(i => i.stage === 'development' || i.stage === 'testing').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Scout Reports</div>
                <div className="text-2xl font-bold">{technologyScouts.reduce((sum, scout) => sum + scout.outputs.length, 0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Scenarios</div>
                <div className="text-2xl font-bold">{scenarioPlanning.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Future-Proofing Control Center</h2>
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
              <div className="text-2xl font-bold text-purple-400">{emergingTechnologies.filter(t => t.maturity_level === 'growing' || t.maturity_level === 'mature').length}</div>
              <div className="text-sm text-gray-400">Mature Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{(innovationPipeline.reduce((sum, i) => sum + i.business_impact.revenue_potential, 0) / 1000000).toFixed(0)}M</div>
              <div className="text-sm text-gray-400">Revenue Potential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{(emergingTechnologies.reduce((sum, t) => sum + t.market_potential, 0) / 1000000000).toFixed(0)}B</div>
              <div className="text-sm text-gray-400">Market Opportunity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{scenarioPlanning.filter(s => s.probability === 'high').length}</div>
              <div className="text-sm text-gray-400">High Probability Scenarios</div>
            </div>
          </div>
        </div>

        {/* Emerging Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Emerging Technologies</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search technologies..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="ai_ml">AI/ML</option>
                <option value="blockchain">Blockchain</option>
                <option value="quantum">Quantum</option>
                <option value="ar_vr">AR/VR</option>
                <option value="iot">IoT</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredTechnologies().map((tech) => (
                <div
                  key={tech.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTechnology?.id === tech.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedTechnology(tech)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(tech.category)}
                      <div>
                        <h4 className="font-semibold">{tech.name}</h4>
                        <div className="text-sm text-gray-400">{tech.adoption_timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getMaturityColor(tech.maturity_level)}`}>
                        {tech.maturity_level.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getDisruptionColor(tech.disruption_level)}`}>
                        {tech.disruption_level.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Market Potential:</span> ${(tech.market_potential / 1000000000).toFixed(1)}B
                    </div>
                    <div>
                      <span className="text-gray-400">Progress:</span> {tech.implementation_status.progress_percentage.toFixed(0)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Key Players:</span> {tech.key_players.length}
                    </div>
                    <div>
                      <span className="text-gray-400">Opportunities:</span> {tech.opportunities.length}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${tech.implementation_status.progress_percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        ${tech.technical_requirements.investment_needed.toLocaleString()} investment
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {tech.technical_requirements.development_time} months dev time
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredTechnologies().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No technologies found
              </div>
            )}
          </div>

          {/* Selected Technology Details */}
          {selectedTechnology && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology Details: {selectedTechnology.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-300">{selectedTechnology.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Market Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Potential:</span>
                        <span className="font-medium">${(selectedTechnology.market_potential / 1000000000).toFixed(1)}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Adoption Timeline:</span>
                        <span className="font-medium">{selectedTechnology.adoption_timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Disruption Level:</span>
                        <span className="font-medium capitalize">{selectedTechnology.disruption_level.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Technical Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investment Needed:</span>
                        <span className="font-medium">${selectedTechnology.technical_requirements.investment_needed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Development Time:</span>
                        <span className="font-medium">{selectedTechnology.technical_requirements.development_time} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Infrastructure:</span>
                        <span className="font-medium">{selectedTechnology.technical_requirements.infrastructure.length} components</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Key Players</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechnology.key_players.map((player, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {player}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Implementation Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Phase:</span>
                        <span className="font-medium">{selectedTechnology.implementation_status.current_phase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span className="font-medium">{selectedTechnology.implementation_status.progress_percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Opportunities</h4>
                    <div className="space-y-2">
                      {selectedTechnology.opportunities.map((opportunity, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="font-medium capitalize">{opportunity.type}:</div>
                          <div className="text-xs text-gray-400 mt-1">{opportunity.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Value: ${(opportunity.potential_value / 1000000).toFixed(0)}M | Time: {opportunity.time_to_market}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Risks</h4>
                    <div className="space-y-2">
                      {selectedTechnology.risks.map((risk, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium capitalize">{risk.type}:</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              risk.impact === 'high' ? 'bg-red-600' :
                              risk.impact === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                            }`}>
                              {risk.probability}/{risk.impact}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{risk.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Innovation Pipeline */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Innovation Pipeline</h3>
          <div className="space-y-4">
            {innovationPipeline.map((innovation) => (
              <div key={innovation.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{innovation.name}</h4>
                    <div className="text-sm text-gray-400">{innovation.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(innovation.priority)}`}>
                      {innovation.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStageColor(innovation.stage)}`}>
                      {innovation.stage}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Business Impact</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue Potential:</span>
                        <span>${(innovation.business_impact.revenue_potential / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost Savings:</span>
                        <span>${(innovation.business_impact.cost_savings / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Share Gain:</span>
                        <span>{innovation.business_impact.market_share_gain.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Resources</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Team Size:</span>
                        <span>{innovation.resources.team_size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Budget:</span>
                        <span>${(innovation.resources.budget_allocated / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Investment:</span>
                        <span>{innovation.resources.time_investment} months</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Success Metrics</h5>
                    <div className="space-y-1">
                      {innovation.success_metrics.map((metric, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">{metric.name}:</span>
                            <span>{metric.current_value.toFixed(1)}/{metric.target_value}</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-green-500"
                              style={{ width: `${(metric.current_value / metric.target_value) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Key Deliverables</h5>
                  <div className="space-y-1">
                    {innovation.timeline.key_deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          deliverable.status === 'completed' ? 'bg-green-400' :
                          deliverable.status === 'in_progress' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={deliverable.status === 'completed' ? '' : 'text-gray-400'}>
                          {deliverable.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(deliverable.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Scouts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Technology Scouts</h3>
            <div className="space-y-3">
              {technologyScouts.map((scout) => (
                <div key={scout.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{scout.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        scout.type === 'technology' ? 'bg-blue-600' :
                        scout.type === 'market' ? 'bg-green-600' :
                        scout.type === 'startup' ? 'bg-purple-600' : 'bg-orange-600'
                      }`}>
                        {scout.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {scout.frequency}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Sources:</span> {scout.sources.length}
                    </div>
                    <div>
                      <span className="text-gray-400">Keywords:</span> {scout.keywords.length}
                    </div>
                    <div>
                      <span className="text-gray-400">AI Enabled:</span> {scout.automation.ai_enabled ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="text-gray-400">Relevance Threshold:</span> {scout.filters.relevance_threshold.toFixed(1)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-medium text-sm mb-2">Recent Outputs</h5>
                    <div className="space-y-2">
                      {scout.outputs.slice(-3).map((output, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs ${
                              output.type === 'alert' ? 'bg-red-600' :
                              output.type === 'report' ? 'bg-blue-600' :
                              output.type === 'insight' ? 'bg-green-600' : 'bg-purple-600'
                            }`}>
                              {output.type}
                            </span>
                            <span className="text-xs text-gray-400">
                              {output.relevance_score.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{output.title}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(output.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Planning */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Scenario Planning</h3>
            <div className="space-y-3">
              {scenarioPlanning.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 bg-gray-800 rounded-lg cursor-pointer transition-all ${
                    selectedScenario?.id === scenario.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{scenario.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        scenario.time_horizon === 'short_term' ? 'bg-green-600' :
                        scenario.time_horizon === 'medium_term' ? 'bg-yellow-600' : 'bg-orange-600'
                      }`}>
                        {scenario.time_horizon.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        scenario.probability === 'high' ? 'bg-red-600' :
                        scenario.probability === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {scenario.probability}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-300 mb-3">
                    {scenario.description}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Impact:</span> <span className="capitalize">{scenario.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Drivers:</span> {scenario.drivers.length}
                    </div>
                    <div>
                      <span className="text-gray-400">Opportunities:</span> {scenario.implications.opportunities.length}
                    </div>
                    <div>
                      <span className="text-gray-400">Threats:</span> {scenario.implications.threats.length}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {scenario.action_plan.immediate_actions.length} immediate actions
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {scenario.action_plan.long_term_initiatives.length} long-term initiatives
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Scenario Details */}
        {selectedScenario && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Scenario Details: {selectedScenario.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Scenario Drivers</h4>
                <div className="space-y-2">
                  {selectedScenario.drivers.map((driver, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{driver.name}</span>
                        <span className="text-xs text-gray-400 capitalize">{driver.type}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Certainty: {driver.certainty} | Influence: {driver.influence}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-blue-400 mb-2">Action Plan</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-green-400 mb-1">Immediate Actions</h5>
                    <div className="space-y-1">
                      {selectedScenario.action_plan.immediate_actions.map((action, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span>{action.description}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              action.status === 'completed' ? 'bg-green-600' :
                              action.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-600'
                            }`}>
                              {action.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Owner: {action.owner} | Due: {new Date(action.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-orange-400 mb-1">Long-term Initiatives</h5>
                    <div className="space-y-1">
                      {selectedScenario.action_plan.long_term_initiatives.map((initiative, index) => (
                        <div key={index} className="text-sm">
                          <div>{initiative.description}</div>
                          <div className="text-xs text-gray-400">
                            Timeline: {initiative.timeline} | Investment: ${(initiative.investment_required / 1000000).toFixed(1)}M | ROI: {initiative.expected_roi.toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Future-Proofing Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Technology Scouting</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scouting.automated_monitoring}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          scouting: { ...prev.scouting, automated_monitoring: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Automated Monitoring</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scouting.academic_partnerships}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          scouting: { ...prev.scouting, academic_partnerships: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Academic Partnerships</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scouting.startup_tracking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          scouting: { ...prev.scouting, startup_tracking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Startup Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scouting.patent_monitoring}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          scouting: { ...prev.scouting, patent_monitoring: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Patent Monitoring</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Innovation Programs</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.innovation.innovation_labs}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          innovation: { ...prev.innovation, innovation_labs: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Innovation Labs</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.innovation.hackathons}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          innovation: { ...prev.innovation, hackathons: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Hackathons</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.innovation.incubator_programs}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          innovation: { ...prev.innovation, incubator_programs: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Incubator Programs</span>
                    </label>
                    <div>
                      <label className="text-sm text-gray-400">R&D Investment %</label>
                      <input
                        type="number"
                        value={config.innovation.r_d_investment}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          innovation: { ...prev.innovation, r_d_investment: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Adaptation Strategy</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptation.agile_development}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, agile_development: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Agile Development</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptation.rapid_prototyping}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, rapid_prototyping: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Rapid Prototyping</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptation.pilot_programs}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, pilot_programs: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Pilot Programs</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptation.feedback_loops}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, feedback_loops: e.target.checked }
                        }))}
                        className="w-3 h-3 text-blue-600 rounded"
                      />
                      <span className="text-sm">Feedback Loops</span>
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

export default FutureProofing;
