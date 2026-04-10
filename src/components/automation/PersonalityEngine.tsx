/**
 * Personality Engine Component
 * 
 * Build personality engine with AI-driven behavior patterns for each persona
 * Creates unique, adaptive personalities with emotional intelligence and learning capabilities
 */

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Users, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Heart, Sparkles, TrendingUp } from 'lucide-react';

interface PersonalityTrait {
  id: string;
  name: string;
  category: 'cognitive' | 'emotional' | 'behavioral' | 'social' | 'creative' | 'analytical' | 'ethical' | 'spiritual';
  value: number; // 0-100
  weight: number; // 0-1 for importance
  description: string;
  manifestation: string;
  triggers: string[];
  responses: string[];
  adaptability: number; // 0-100 how much this trait can change
}

interface PersonalityProfile {
  id: string;
  personaId: string;
  name: string;
  archetype: 'leader' | 'innovator' | 'nurturer' | 'explorer' | 'sage' | 'rebel' | 'caregiver' | 'jester' | 'lover' | 'hero' | 'magician' | 'ruler' | 'everyman' | 'innocent' | 'custom';
  coreIdentity: {
    values: string[];
    beliefs: string[];
    principles: string[];
    worldview: string;
    purpose: string;
    mission: string;
  };
  traits: PersonalityTrait[];
  emotionalIntelligence: {
    selfAwareness: number; // 0-100
    selfRegulation: number; // 0-100
    motivation: number; // 0-100
    empathy: number; // 0-100
    socialSkills: number; // 0-100
    emotionalRange: string[];
    triggers: string[];
    copingMechanisms: string[];
  };
  cognitiveProfile: {
    intelligenceType: 'logical' | 'linguistic' | 'spatial' | 'bodily' | 'musical' | 'interpersonal' | 'intrapersonal' | 'naturalistic' | 'existential';
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
    problemSolving: 'analytical' | 'creative' | 'practical' | 'systematic' | 'intuitive';
    decisionMaking: 'rational' | 'emotional' | 'intuitive' | 'strategic' | 'impulsive';
    memoryType: 'visual' | 'auditory' | 'kinesthetic' | 'semantic' | 'episodic';
    attentionSpan: number; // minutes
    processingSpeed: number; // 0-100
    creativity: number; // 0-100
    criticalThinking: number; // 0-100
  };
  behavioralPatterns: {
    communication: {
      style: 'formal' | 'casual' | 'technical' | 'emotional' | 'direct' | 'indirect' | 'assertive' | 'passive';
      tone: string;
      vocabulary: string[];
      expressions: string[];
      gestures: string[];
      listening: number; // 0-100
      clarity: number; // 0-100
    };
    social: {
      introversion: number; // 0-100 (0=extreme introvert, 100=extreme extrovert)
      leadership: number; // 0-100
      teamwork: number; // 0-100
      conflict: 'avoidant' | 'collaborative' | 'competitive' | 'compromising' | 'accommodating';
      networking: number; // 0-100
      trust: number; // 0-100
      loyalty: number; // 0-100
    };
    work: {
      productivity: number; // 0-100
      organization: number; // 0-100
      timeManagement: number; // 0-100
      adaptability: number; // 0-100
      stressTolerance: number; // 0-100
      perfectionism: number; // 0-100
      initiative: number; // 0-100
      reliability: number; // 0-100
    };
  };
  learning: {
    curiosity: number; // 0-100
    adaptability: number; // 0-100
    feedbackResponse: 'receptive' | 'resistant' | 'selective' | 'defensive';
    growthMindset: number; // 0-100
    learningSpeed: number; // 0-100
    retention: number; // 0-100
    knowledgeAreas: string[];
    interests: string[];
    goals: string[];
  };
  adaptation: {
    evolutionRate: number; // 0-100 how quickly personality changes
    contextAwareness: number; // 0-100 awareness of social context
    flexibility: number; // 0-100 ability to adapt behavior
    resilience: number; // 0-100 ability to bounce back from challenges
    learningFromExperience: number; // 0-100
    patternRecognition: number; // 0-100
    predictiveModeling: number; // 0-100 ability to predict outcomes
  };
  relationships: {
    family: {
      role: string;
      dynamics: string;
      connections: number; // 0-100
      influence: number; // 0-100
    };
    friends: {
      circleSize: number;
      depth: number; // 0-100
      loyalty: number; // 0-100
      support: number; // 0-100
    };
    romantic: {
      attachment: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
      commitment: number; // 0-100
      intimacy: number; // 0-100
      communication: number; // 0-100
    };
    professional: {
      networking: number; // 0-100
      mentorship: number; // 0-100
      collaboration: number; // 0-100
      leadership: number; // 0-100
    };
  };
  createdAt: string;
  lastUpdated: string;
  version: number;
}

interface PersonalityEngineConfig {
  autoGeneration: boolean;
  adaptability: boolean;
  learning: boolean;
  emotionalIntelligence: boolean;
  socialDynamics: boolean;
  cognitiveEnhancement: boolean;
  behaviorOptimization: boolean;
  generation: {
    complexity: 'basic' | 'intermediate' | 'advanced' | 'expert' | 'master';
    diversity: 'minimal' | 'moderate' | 'high' | 'extreme';
    realism: 'basic' | 'enhanced' | 'advanced' | 'ultra_realistic';
    uniqueness: number; // 0-100 how unique each personality is
  };
  adaptation: {
    learningRate: number; // 0-100
    memoryRetention: number; // 0-100
    experienceWeight: number; // 0-100 how much past experiences influence changes
    socialInfluence: number; // 0-100 how much social context influences behavior
    environmentalFactors: number; // 0-100 how much environment affects personality
  };
  intelligence: {
    emotionalProcessing: boolean;
    patternRecognition: boolean;
    predictiveAnalysis: boolean;
    socialCognition: boolean;
    culturalAwareness: boolean;
    ethicalReasoning: boolean;
  };
  optimization: {
    performanceTracking: boolean;
    behaviorAnalysis: boolean;
    outcomePrediction: boolean;
    continuousImprovement: boolean;
    personalization: boolean;
  };
}

const PersonalityEngine: React.FC = () => {
  const [profiles, setProfiles] = useState<PersonalityProfile[]>([]);
  const [config, setConfig] = useState<PersonalityEngineConfig>({
    autoGeneration: true,
    adaptability: true,
    learning: true,
    emotionalIntelligence: true,
    socialDynamics: true,
    cognitiveEnhancement: true,
    behaviorOptimization: true,
    generation: {
      complexity: 'advanced',
      diversity: 'high',
      realism: 'ultra_realistic',
      uniqueness: 85
    },
    adaptation: {
      learningRate: 75,
      memoryRetention: 80,
      experienceWeight: 70,
      socialInfluence: 65,
      environmentalFactors: 60
    },
    intelligence: {
      emotionalProcessing: true,
      patternRecognition: true,
      predictiveAnalysis: true,
      socialCognition: true,
      culturalAwareness: true,
      ethicalReasoning: true
    },
    optimization: {
      performanceTracking: true,
      behaviorAnalysis: true,
      outcomePrediction: true,
      continuousImprovement: true,
      personalization: true
    }
  });
  const [selectedProfile, setSelectedProfile] = useState<PersonalityProfile | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArchetype, setFilterArchetype] = useState<string>('all');
  const [stats, setStats] = useState({
    totalProfiles: 0,
    averageIntelligence: 0,
    averageAdaptability: 0,
    averageEmotionalIQ: 0,
    totalTraits: 0,
    bestArchetype: '',
    evolutionRate: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock personality profiles initialization
  useEffect(() => {
    const mockProfiles: PersonalityProfile[] = [
      {
        id: 'profile-1',
        personaId: 'persona-1',
        name: 'Alexandra Sterling',
        archetype: 'leader',
        coreIdentity: {
          values: ['excellence', 'integrity', 'innovation', 'growth'],
          beliefs: ['continuous improvement', 'empowerment', 'strategic thinking'],
          principles: ['lead by example', 'embrace change', 'value collaboration'],
          worldview: 'The world is full of opportunities for those who dare to innovate',
          purpose: 'To inspire and lead others toward achieving their full potential',
          mission: 'Build bridges between ideas and execution through visionary leadership'
        },
        traits: [
          {
            id: 'trait-1',
            name: 'Strategic Thinking',
            category: 'cognitive',
            value: 92,
            weight: 0.9,
            description: 'Ability to see the big picture and plan long-term',
            manifestation: 'Always considers long-term implications of decisions',
            triggers: ['complex problems', 'strategic decisions', 'planning sessions'],
            responses: ['systematic analysis', 'scenario planning', 'risk assessment'],
            adaptability: 60
          },
          {
            id: 'trait-2',
            name: 'Empathetic Leadership',
            category: 'emotional',
            value: 88,
            weight: 0.85,
            description: 'Understanding and responding to team emotions',
            manifestation: 'Considers team morale and individual needs in decisions',
            triggers: ['team conflicts', 'performance issues', 'personal challenges'],
            responses: ['active listening', 'emotional support', 'conflict resolution'],
            adaptability: 75
          }
        ],
        emotionalIntelligence: {
          selfAwareness: 91,
          selfRegulation: 85,
          motivation: 94,
          empathy: 88,
          socialSkills: 87,
          emotionalRange: ['joy', 'determination', 'concern', 'optimism'],
          triggers: ['success', 'failure', 'team dynamics', 'challenges'],
          copingMechanisms: ['reflection', 'strategic planning', 'team consultation']
        },
        cognitiveProfile: {
          intelligenceType: 'interpersonal',
          learningStyle: 'mixed',
          problemSolving: 'strategic',
          decisionMaking: 'rational',
          memoryType: 'semantic',
          attentionSpan: 45,
          processingSpeed: 85,
          creativity: 78,
          criticalThinking: 91
        },
        behavioralPatterns: {
          communication: {
            style: 'assertive',
            tone: 'confident and inspiring',
            vocabulary: ['strategic', 'vision', 'empowerment', 'innovation'],
            expressions: ['purposeful gestures', 'steady eye contact', 'confident posture'],
            listening: 89,
            clarity: 92
          },
          social: {
            introversion: 30,
            leadership: 95,
            teamwork: 88,
            conflict: 'collaborative',
            networking: 85,
            trust: 82,
            loyalty: 90
          },
          work: {
            productivity: 91,
            organization: 85,
            timeManagement: 88,
            adaptability: 82,
            stressTolerance: 79,
            perfectionism: 65,
            initiative: 94,
            reliability: 96
          }
        },
        learning: {
          curiosity: 87,
          adaptability: 82,
          feedbackResponse: 'receptive',
          growthMindset: 93,
          learningSpeed: 78,
          retention: 85,
          knowledgeAreas: ['leadership', 'strategy', 'technology', 'psychology'],
          interests: ['innovation', 'team development', 'industry trends', 'personal growth'],
          goals: ['develop team', 'achieve objectives', 'personal growth', 'industry impact']
        },
        adaptation: {
          evolutionRate: 75,
          contextAwareness: 88,
          flexibility: 82,
          resilience: 86,
          learningFromExperience: 91,
          patternRecognition: 84,
          predictiveModeling: 79
        },
        relationships: {
          family: {
            role: 'leader and mentor',
            dynamics: 'supportive but driven',
            connections: 85,
            influence: 88
          },
          friends: {
            circleSize: 12,
            depth: 82,
            loyalty: 91,
            support: 87
          },
          romantic: {
            attachment: 'secure',
            commitment: 85,
            intimacy: 78,
            communication: 89
          },
          professional: {
            networking: 88,
            mentorship: 92,
            collaboration: 90,
            leadership: 95
          }
        },
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        version: 3
      },
      {
        id: 'profile-2',
        personaId: 'persona-2',
        name: 'Marcus Chen',
        archetype: 'innovator',
        coreIdentity: {
          values: ['creativity', 'knowledge', 'freedom', 'discovery'],
          beliefs: ['everything can be improved', 'knowledge is power', 'creativity solves problems'],
          principles: ['question assumptions', 'embrace failure', 'share knowledge'],
          worldview: 'The world is a puzzle waiting to be solved through innovation',
          purpose: 'To create solutions that transform how people live and work',
          mission: 'Push the boundaries of what\'s possible through creative problem-solving'
        },
        traits: [
          {
            id: 'trait-3',
            name: 'Creative Problem Solving',
            category: 'creative',
            value: 95,
            weight: 0.95,
            description: 'Ability to find innovative solutions to complex problems',
            manifestation: 'Approaches problems from unique angles and challenges conventional thinking',
            triggers: ['complex challenges', 'limitations', 'new opportunities'],
            responses: ['brainstorming', 'prototyping', 'iteration', 'collaboration'],
            adaptability: 85
          },
          {
            id: 'trait-4',
            name: 'Intellectual Curiosity',
            category: 'cognitive',
            value: 91,
            weight: 0.9,
            description: 'Deep desire to understand how things work',
            manifestation: 'Constantly asks questions and seeks to learn new things',
            triggers: ['new information', 'complex systems', 'unknown phenomena'],
            responses: ['research', 'experimentation', 'analysis', 'discussion'],
            adaptability: 80
          }
        ],
        emotionalIntelligence: {
          selfAwareness: 85,
          selfRegulation: 78,
          motivation: 92,
          empathy: 76,
          socialSkills: 71,
          emotionalRange: ['excitement', 'frustration', 'curiosity', 'satisfaction'],
          triggers: ['new discoveries', 'creative blocks', 'technical challenges', 'collaboration'],
          copingMechanisms: ['problem-solving', 'research', 'creative outlets', 'discussion']
        },
        cognitiveProfile: {
          intelligenceType: 'logical',
          learningStyle: 'kinesthetic',
          problemSolving: 'creative',
          decisionMaking: 'intuitive',
          memoryType: 'episodic',
          attentionSpan: 60,
          processingSpeed: 88,
          creativity: 95,
          criticalThinking: 82
        },
        behavioralPatterns: {
          communication: {
            style: 'casual',
            tone: 'enthusiastic and technical',
            vocabulary: ['innovate', 'prototype', 'optimize', 'algorithm'],
            expressions: ['animated gestures', 'intense focus', 'excited pacing'],
            listening: 75,
            clarity: 78
          },
          social: {
            introversion: 65,
            leadership: 72,
            teamwork: 78,
            conflict: 'competitive',
            networking: 68,
            trust: 74,
            loyalty: 79
          },
          work: {
            productivity: 85,
            organization: 62,
            timeManagement: 71,
            adaptability: 89,
            stressTolerance: 68,
            perfectionism: 78,
            initiative: 91,
            reliability: 82
          }
        },
        learning: {
          curiosity: 95,
          adaptability: 88,
          feedbackResponse: 'selective',
          growthMindset: 89,
          learningSpeed: 91,
          retention: 78,
          knowledgeAreas: ['technology', 'science', 'engineering', 'design'],
          interests: ['innovation', 'research', 'experimentation', 'future technology'],
          goals: ['create breakthrough', 'solve major problems', 'learn continuously', 'share knowledge']
        },
        adaptation: {
          evolutionRate: 85,
          contextAwareness: 72,
          flexibility: 91,
          resilience: 74,
          learningFromExperience: 86,
          patternRecognition: 88,
          predictiveModeling: 76
        },
        relationships: {
          family: {
            role: 'problem solver',
            dynamics: 'supportive but distant',
            connections: 71,
            influence: 78
          },
          friends: {
            circleSize: 8,
            depth: 68,
            loyalty: 74,
            support: 71
          },
          romantic: {
            attachment: 'avoidant',
            commitment: 62,
            intimacy: 58,
            communication: 65
          },
          professional: {
            networking: 71,
            mentorship: 68,
            collaboration: 85,
            leadership: 74
          }
        },
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        version: 2
      }
    ];

    setProfiles(mockProfiles);
  }, []);

  // Auto personality evolution simulation
  useEffect(() => {
    if (!config.adaptability || !isOperating) return;

    const interval = setInterval(() => {
      // Simulate personality adaptation and learning
      profiles.forEach(profile => {
        const evolutionRate = profile.adaptation.evolutionRate / 100;
        
        setProfiles(prev => prev.map(p => 
          p.id === profile.id 
            ? {
                ...p,
                traits: p.traits.map(trait => ({
                  ...trait,
                  value: Math.max(0, Math.min(100, 
                    trait.value + (Math.random() - 0.5) * evolutionRate * trait.adaptability / 100
                  ))
                })),
                emotionalIntelligence: {
                  ...p.emotionalIntelligence,
                  selfAwareness: Math.max(0, Math.min(100, 
                    p.emotionalIntelligence.selfAwareness + (Math.random() - 0.5) * evolutionRate
                  )),
                  empathy: Math.max(0, Math.min(100, 
                    p.emotionalIntelligence.empathy + (Math.random() - 0.5) * evolutionRate
                  ))
                },
                learning: {
                  ...p.learning,
                  curiosity: Math.max(0, Math.min(100, 
                    p.learning.curiosity + (Math.random() - 0.5) * evolutionRate
                  )),
                  adaptability: Math.max(0, Math.min(100, 
                    p.learning.adaptability + (Math.random() - 0.5) * evolutionRate
                  ))
                },
                adaptation: {
                  ...p.adaptation,
                  flexibility: Math.max(0, Math.min(100, 
                    p.adaptation.flexibility + (Math.random() - 0.5) * evolutionRate
                  )),
                  learningFromExperience: Math.max(0, Math.min(100, 
                    p.adaptation.learningFromExperience + (Math.random() - 0.5) * evolutionRate
                  ))
                },
                lastUpdated: new Date().toISOString(),
                version: p.version + 0.1
              }
            : p
        ));
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.adaptability, isOperating, profiles]);

  // Auto personality generation simulation
  useEffect(() => {
    if (!config.autoGeneration || !isOperating) return;

    const interval = setInterval(() => {
      // Generate new personality profiles
      if (Math.random() > 0.8) { // 20% chance
        const archetypes: PersonalityProfile['archetype'][] = [
          'leader', 'innovator', 'nurturer', 'explorer', 'sage', 'rebel', 
          'caregiver', 'jester', 'lover', 'hero', 'magician', 'ruler', 'everyman', 'innocent'
        ];
        
        const newProfile: PersonalityProfile = {
          id: `profile-${Date.now()}`,
          personaId: `persona-${Date.now()}`,
          name: `Generated Personality ${profiles.length + 1}`,
          archetype: archetypes[Math.floor(Math.random() * archetypes.length)],
          coreIdentity: {
            values: ['growth', 'excellence', 'integrity', 'innovation'].slice(0, Math.floor(Math.random() * 3) + 2),
            beliefs: ['continuous improvement', 'empowerment'].slice(0, Math.floor(Math.random() * 2) + 1),
            principles: ['lead by example', 'embrace change'].slice(0, Math.floor(Math.random() * 2) + 1),
            worldview: 'The world is full of opportunities',
            purpose: 'To achieve personal growth',
            mission: 'Continuous self-improvement'
          },
          traits: [
            {
              id: `trait-${Date.now()}-1`,
              name: 'Adaptability',
              category: 'behavioral',
              value: Math.random() * 30 + 70,
              weight: Math.random() * 0.3 + 0.7,
              description: 'Ability to adapt to new situations',
              manifestation: 'Flexible approach to challenges',
              triggers: ['change', 'challenges', 'opportunities'],
              responses: ['adaptation', 'learning', 'growth'],
              adaptability: Math.random() * 30 + 70
            },
            {
              id: `trait-${Date.now()}-2`,
              name: 'Creativity',
              category: 'creative',
              value: Math.random() * 30 + 70,
              weight: Math.random() * 0.3 + 0.7,
              description: 'Creative problem-solving ability',
              manifestation: 'Innovative thinking',
              triggers: ['problems', 'opportunities', 'challenges'],
              responses: ['innovation', 'creation', 'exploration'],
              adaptability: Math.random() * 30 + 70
            }
          ],
          emotionalIntelligence: {
            selfAwareness: Math.random() * 30 + 70,
            selfRegulation: Math.random() * 30 + 70,
            motivation: Math.random() * 30 + 70,
            empathy: Math.random() * 30 + 70,
            socialSkills: Math.random() * 30 + 70,
            emotionalRange: ['joy', 'concern', 'excitement'],
            triggers: ['success', 'challenges', 'collaboration'],
            copingMechanisms: ['reflection', 'planning', 'discussion']
          },
          cognitiveProfile: {
            intelligenceType: 'interpersonal',
            learningStyle: 'mixed',
            problemSolving: 'strategic',
            decisionMaking: 'rational',
            memoryType: 'semantic',
            attentionSpan: Math.random() * 30 + 30,
            processingSpeed: Math.random() * 30 + 70,
            creativity: Math.random() * 30 + 70,
            criticalThinking: Math.random() * 30 + 70
          },
          behavioralPatterns: {
            communication: {
              style: 'assertive',
              tone: 'confident',
              vocabulary: ['strategic', 'innovation'],
              expressions: ['confident posture', 'steady eye contact'],
              listening: Math.random() * 30 + 70,
              clarity: Math.random() * 30 + 70
            },
            social: {
              introversion: Math.random() * 100,
              leadership: Math.random() * 30 + 70,
              teamwork: Math.random() * 30 + 70,
              conflict: 'collaborative',
              networking: Math.random() * 30 + 70,
              trust: Math.random() * 30 + 70,
              loyalty: Math.random() * 30 + 70
            },
            work: {
              productivity: Math.random() * 30 + 70,
              organization: Math.random() * 30 + 70,
              timeManagement: Math.random() * 30 + 70,
              adaptability: Math.random() * 30 + 70,
              stressTolerance: Math.random() * 30 + 70,
              perfectionism: Math.random() * 30 + 70,
              initiative: Math.random() * 30 + 70,
              reliability: Math.random() * 30 + 70
            }
          },
          learning: {
            curiosity: Math.random() * 30 + 70,
            adaptability: Math.random() * 30 + 70,
            feedbackResponse: 'receptive',
            growthMindset: Math.random() * 30 + 70,
            learningSpeed: Math.random() * 30 + 70,
            retention: Math.random() * 30 + 70,
            knowledgeAreas: ['technology', 'psychology'],
            interests: ['learning', 'growth', 'innovation'],
            goals: ['personal growth', 'skill development']
          },
          adaptation: {
            evolutionRate: Math.random() * 30 + 70,
            contextAwareness: Math.random() * 30 + 70,
            flexibility: Math.random() * 30 + 70,
            resilience: Math.random() * 30 + 70,
            learningFromExperience: Math.random() * 30 + 70,
            patternRecognition: Math.random() * 30 + 70,
            predictiveModeling: Math.random() * 30 + 70
          },
          relationships: {
            family: {
              role: 'contributor',
              dynamics: 'supportive',
              connections: Math.random() * 30 + 70,
              influence: Math.random() * 30 + 70
            },
            friends: {
              circleSize: Math.floor(Math.random() * 10) + 5,
              depth: Math.random() * 30 + 70,
              loyalty: Math.random() * 30 + 70,
              support: Math.random() * 30 + 70
            },
            romantic: {
              attachment: 'secure',
              commitment: Math.random() * 30 + 70,
              intimacy: Math.random() * 30 + 70,
              communication: Math.random() * 30 + 70
            },
            professional: {
              networking: Math.random() * 30 + 70,
              mentorship: Math.random() * 30 + 70,
              collaboration: Math.random() * 30 + 70,
              leadership: Math.random() * 30 + 70
            }
          },
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          version: 1
        };

        setProfiles(prev => [...prev, newProfile]);
      }
    }, 300000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [config.autoGeneration, isOperating]);

  // Update stats
  useEffect(() => {
    const totalTraits = profiles.reduce((sum, p) => sum + p.traits.length, 0);
    const averageIntelligence = profiles.length > 0 
      ? profiles.reduce((sum, p) => sum + p.cognitiveProfile.processingSpeed, 0) / profiles.length 
      : 0;
    const averageAdaptability = profiles.length > 0 
      ? profiles.reduce((sum, p) => sum + p.adaptation.evolutionRate, 0) / profiles.length 
      : 0;
    const averageEmotionalIQ = profiles.length > 0 
      ? profiles.reduce((sum, p) => sum + p.emotionalIntelligence.selfAwareness, 0) / profiles.length 
      : 0;
    const evolutionRate = profiles.length > 0 
      ? profiles.reduce((sum, p) => sum + p.adaptation.evolutionRate, 0) / profiles.length 
      : 0;
    
    const archetypeCounts = profiles.reduce((acc, profile) => {
      acc[profile.archetype] = (acc[profile.archetype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestArchetype = Object.entries(archetypeCounts).reduce((best, [archetype, count]) => 
      count > (best?.count || 0) ? { archetype, count } : best, null as { archetype: string; count: number } | null);

    setStats({
      totalProfiles: profiles.length,
      averageIntelligence,
      averageAdaptability,
      averageEmotionalIQ,
      totalTraits,
      bestArchetype: bestArchetype?.archetype || '',
      evolutionRate
    });
  }, [profiles]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const generateProfile = () => {
    const archetypes: PersonalityProfile['archetype'][] = [
      'leader', 'innovator', 'nurturer', 'explorer', 'sage', 'rebel', 
      'caregiver', 'jester', 'lover', 'hero', 'magician', 'ruler', 'everyman', 'innocent'
    ];
    
    const newProfile: PersonalityProfile = {
      id: `profile-${Date.now()}`,
      personaId: `persona-${Date.now()}`,
      name: `New Personality ${profiles.length + 1}`,
      archetype: archetypes[Math.floor(Math.random() * archetypes.length)],
      coreIdentity: {
        values: ['growth', 'excellence', 'integrity', 'innovation', 'creativity', 'knowledge'].slice(0, Math.floor(Math.random() * 4) + 2),
        beliefs: ['continuous improvement', 'empowerment', 'creativity solves problems', 'knowledge is power'].slice(0, Math.floor(Math.random() * 3) + 1),
        principles: ['lead by example', 'embrace change', 'question assumptions', 'share knowledge'].slice(0, Math.floor(Math.random() * 3) + 1),
        worldview: 'The world is full of opportunities for those who dare to innovate and grow',
        purpose: 'To achieve personal and professional growth through continuous learning',
        mission: 'Make a positive impact through innovation and collaboration'
      },
      traits: [
        {
          id: `trait-${Date.now()}-1`,
          name: 'Adaptability',
          category: 'behavioral',
          value: Math.random() * 30 + 70,
          weight: Math.random() * 0.3 + 0.7,
          description: 'Ability to adapt to new situations and challenges',
          manifestation: 'Flexible approach to changing circumstances',
          triggers: ['change', 'challenges', 'opportunities', 'new environments'],
          responses: ['adaptation', 'learning', 'growth', 'flexibility'],
          adaptability: Math.random() * 30 + 70
        },
        {
          id: `trait-${Date.now()}-2`,
          name: 'Creativity',
          category: 'creative',
          value: Math.random() * 30 + 70,
          weight: Math.random() * 0.3 + 0.7,
          description: 'Creative thinking and problem-solving abilities',
          manifestation: 'Innovative approach to challenges and opportunities',
          triggers: ['problems', 'opportunities', 'brainstorming', 'innovation'],
          responses: ['creative solutions', 'new ideas', 'innovation', 'exploration'],
          adaptability: Math.random() * 30 + 70
        },
        {
          id: `trait-${Date.now()}-3`,
          name: 'Emotional Intelligence',
          category: 'emotional',
          value: Math.random() * 30 + 70,
          weight: Math.random() * 0.3 + 0.7,
          description: 'Understanding and managing emotions in self and others',
          manifestation: 'Empathetic and emotionally aware interactions',
          triggers: ['social interactions', 'conflicts', 'collaboration', 'feedback'],
          responses: ['empathy', 'emotional regulation', 'social awareness', 'conflict resolution'],
          adaptability: Math.random() * 30 + 70
        }
      ],
      emotionalIntelligence: {
        selfAwareness: Math.random() * 30 + 70,
        selfRegulation: Math.random() * 30 + 70,
        motivation: Math.random() * 30 + 70,
        empathy: Math.random() * 30 + 70,
        socialSkills: Math.random() * 30 + 70,
        emotionalRange: ['joy', 'concern', 'excitement', 'determination', 'curiosity'],
        triggers: ['success', 'challenges', 'collaboration', 'feedback', 'change'],
        copingMechanisms: ['reflection', 'planning', 'discussion', 'meditation', 'problem-solving']
      },
      cognitiveProfile: {
        intelligenceType: 'interpersonal',
        learningStyle: 'mixed',
        problemSolving: 'strategic',
        decisionMaking: 'rational',
        memoryType: 'semantic',
        attentionSpan: Math.random() * 30 + 30,
        processingSpeed: Math.random() * 30 + 70,
        creativity: Math.random() * 30 + 70,
        criticalThinking: Math.random() * 30 + 70
      },
      behavioralPatterns: {
        communication: {
          style: 'assertive',
          tone: 'confident and engaging',
          vocabulary: ['strategic', 'innovation', 'collaboration', 'growth'],
          expressions: ['confident posture', 'steady eye contact', 'engaging gestures'],
          listening: Math.random() * 30 + 70,
          clarity: Math.random() * 30 + 70
        },
        social: {
          introversion: Math.random() * 100,
          leadership: Math.random() * 30 + 70,
          teamwork: Math.random() * 30 + 70,
          conflict: 'collaborative',
          networking: Math.random() * 30 + 70,
          trust: Math.random() * 30 + 70,
          loyalty: Math.random() * 30 + 70
        },
        work: {
          productivity: Math.random() * 30 + 70,
          organization: Math.random() * 30 + 70,
          timeManagement: Math.random() * 30 + 70,
          adaptability: Math.random() * 30 + 70,
          stressTolerance: Math.random() * 30 + 70,
          perfectionism: Math.random() * 30 + 70,
          initiative: Math.random() * 30 + 70,
          reliability: Math.random() * 30 + 70
        }
      },
      learning: {
        curiosity: Math.random() * 30 + 70,
        adaptability: Math.random() * 30 + 70,
        feedbackResponse: 'receptive',
        growthMindset: Math.random() * 30 + 70,
        learningSpeed: Math.random() * 30 + 70,
        retention: Math.random() * 30 + 70,
        knowledgeAreas: ['technology', 'psychology', 'business', 'creativity'],
        interests: ['learning', 'growth', 'innovation', 'collaboration'],
        goals: ['personal growth', 'skill development', 'impact creation', 'continuous improvement']
      },
      adaptation: {
        evolutionRate: Math.random() * 30 + 70,
        contextAwareness: Math.random() * 30 + 70,
        flexibility: Math.random() * 30 + 70,
        resilience: Math.random() * 30 + 70,
        learningFromExperience: Math.random() * 30 + 70,
        patternRecognition: Math.random() * 30 + 70,
        predictiveModeling: Math.random() * 30 + 70
      },
      relationships: {
        family: {
          role: 'contributor',
          dynamics: 'supportive and collaborative',
          connections: Math.random() * 30 + 70,
          influence: Math.random() * 30 + 70
        },
        friends: {
          circleSize: Math.floor(Math.random() * 10) + 5,
          depth: Math.random() * 30 + 70,
          loyalty: Math.random() * 30 + 70,
          support: Math.random() * 30 + 70
        },
        romantic: {
          attachment: 'secure',
          commitment: Math.random() * 30 + 70,
          intimacy: Math.random() * 30 + 70,
          communication: Math.random() * 30 + 70
        },
        professional: {
          networking: Math.random() * 30 + 70,
          mentorship: Math.random() * 30 + 70,
          collaboration: Math.random() * 30 + 70,
          leadership: Math.random() * 30 + 70
        }
      },
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      version: 1
    };

    setProfiles(prev => [...prev, newProfile]);
  };

  const getArchetypeColor = (archetype: PersonalityProfile['archetype']) => {
    switch (archetype) {
      case 'leader': return 'bg-purple-600';
      case 'innovator': return 'bg-blue-600';
      case 'nurturer': return 'bg-green-600';
      case 'explorer': return 'bg-orange-600';
      case 'sage': return 'bg-yellow-600';
      case 'rebel': return 'bg-red-600';
      case 'caregiver': return 'bg-pink-600';
      case 'jester': return 'bg-cyan-600';
      case 'lover': return 'bg-pink-600';
      case 'hero': return 'bg-indigo-600';
      case 'magician': return 'bg-purple-600';
      case 'ruler': return 'bg-gray-600';
      case 'everyman': return 'bg-blue-600';
      case 'innocent': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTraitCategoryColor = (category: PersonalityTrait['category']) => {
    switch (category) {
      case 'cognitive': return 'bg-blue-600';
      case 'emotional': return 'bg-purple-600';
      case 'behavioral': return 'bg-green-600';
      case 'social': return 'bg-orange-600';
      case 'creative': return 'bg-yellow-600';
      case 'analytical': return 'bg-red-600';
      case 'ethical': return 'bg-pink-600';
      case 'spiritual': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredProfiles = () => {
    return profiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.archetype.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.coreIdentity.values.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArchetype = filterArchetype === 'all' || profile.archetype === filterArchetype;
      return matchesSearch && matchesArchetype;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Personality Engine
          </h1>
          <p className="text-gray-400">
            Build personality engine with AI-driven behavior patterns for each persona
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Profiles</div>
                <div className="text-2xl font-bold">{stats.totalProfiles}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Intelligence</div>
                <div className="text-2xl font-bold">{stats.averageIntelligence.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-400" />
              <div>
                <div className="text-sm text-gray-400">Emotional IQ</div>
                <div className="text-2xl font-bold">{stats.averageEmotionalIQ.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Adaptability</div>
                <div className="text-2xl font-bold">{stats.averageAdaptability.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Traits</div>
                <div className="text-2xl font-bold">{stats.totalTraits}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Personality Operations</h2>
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
                    Stop Engine
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Engine
                  </>
                )}
              </button>
              <button
                onClick={generateProfile}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Brain className="w-4 h-4" />
                Generate Profile
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
              Best Archetype: {stats.bestArchetype || 'None'} | 
              Evolution Rate: {stats.evolutionRate.toFixed(1)}% | 
              Engine: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Personality Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personality Profiles</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search profiles..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterArchetype}
                onChange={(e) => setFilterArchetype(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Archetypes</option>
                <option value="leader">Leader</option>
                <option value="innovator">Innovator</option>
                <option value="nurturer">Nurturer</option>
                <option value="explorer">Explorer</option>
                <option value="sage">Sage</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredProfiles().map((profile) => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProfile?.id === profile.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <h4 className="font-semibold">{profile.name}</h4>
                        <div className="text-sm text-gray-400">{profile.archetype}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getArchetypeColor(profile.archetype)}`}>
                        {profile.archetype}
                      </span>
                      <span className="text-xs text-gray-400">
                        v{profile.version.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Intelligence:</span> {profile.cognitiveProfile.processingSpeed.toFixed(0)}
                    </div>
                    <div>
                      <span className="text-gray-400">Emotional IQ:</span> {profile.emotionalIntelligence.selfAwareness.toFixed(0)}
                    </div>
                    <div>
                      <span className="text-gray-400">Adaptability:</span> {profile.adaptation.evolutionRate.toFixed(0)}
                    </div>
                    <div>
                      <span className="text-gray-400">Traits:</span> {profile.traits.length}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${profile.adaptation.evolutionRate}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {profile.coreIdentity.values.slice(0, 2).join(', ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Updated: {new Date(profile.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredProfiles().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No profiles found
              </div>
            )}
          </div>

          {/* Selected Profile Details */}
          {selectedProfile && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Details: {selectedProfile.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Core Identity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Archetype:</span>
                        <span className="font-medium">{selectedProfile.archetype}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Purpose:</span>
                        <span className="font-medium text-xs">{selectedProfile.coreIdentity.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Values:</span>
                        <span className="font-medium">{selectedProfile.coreIdentity.values.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mission:</span>
                        <span className="font-medium text-xs">{selectedProfile.coreIdentity.mission}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Cognitive Profile</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Intelligence Type:</span>
                        <span className="font-medium">{selectedProfile.cognitiveProfile.intelligenceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Problem Solving:</span>
                        <span className="font-medium">{selectedProfile.cognitiveProfile.problemSolving}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Creativity:</span>
                        <span className="font-medium">{selectedProfile.cognitiveProfile.creativity.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Critical Thinking:</span>
                        <span className="font-medium">{selectedProfile.cognitiveProfile.criticalThinking.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Emotional Intelligence</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Self-Awareness:</span>
                        <span className="font-medium">{selectedProfile.emotionalIntelligence.selfAwareness.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Empathy:</span>
                        <span className="font-medium">{selectedProfile.emotionalIntelligence.empathy.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Social Skills:</span>
                        <span className="font-medium">{selectedProfile.emotionalIntelligence.socialSkills.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Motivation:</span>
                        <span className="font-medium">{selectedProfile.emotionalIntelligence.motivation.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Adaptation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Evolution Rate:</span>
                        <span className="font-medium">{selectedProfile.adaptation.evolutionRate.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Flexibility:</span>
                        <span className="font-medium">{selectedProfile.adaptation.flexibility.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resilience:</span>
                        <span className="font-medium">{selectedProfile.adaptation.resilience.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Learning from Experience:</span>
                        <span className="font-medium">{selectedProfile.adaptation.learningFromExperience.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Key Traits</h4>
                  <div className="space-y-2">
                    {selectedProfile.traits.slice(0, 3).map((trait) => (
                      <div key={trait.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getTraitCategoryColor(trait.category)}`}>
                            {trait.category}
                          </span>
                          <span className="text-sm font-medium">{trait.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${trait.value}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{trait.value.toFixed(0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Personality Engine Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Engine Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoGeneration}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoGeneration: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Generation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptability}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptability: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Adaptability</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning}
                        onChange={(e) => setConfig(prev => ({ ...prev, learning: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Learning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.emotionalIntelligence}
                        onChange={(e) => setConfig(prev => ({ ...prev, emotionalIntelligence: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Emotional Intelligence</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Generation Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Complexity</label>
                      <select
                        value={config.generation.complexity}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, complexity: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                        <option value="master">Master</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Diversity</label>
                      <select
                        value={config.generation.diversity}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, diversity: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                        <option value="extreme">Extreme</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Adaptation Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Learning Rate</label>
                      <input
                        type="number"
                        value={config.adaptation.learningRate}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, learningRate: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Memory Retention</label>
                      <input
                        type="number"
                        value={config.adaptation.memoryRetention}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          adaptation: { ...prev.adaptation, memoryRetention: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Intelligence Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.emotionalProcessing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, emotionalProcessing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Emotional Processing</span>
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
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.socialCognition}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          intelligence: { ...prev.intelligence, socialCognition: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Social Cognition</span>
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

export default PersonalityEngine;
