/**
 * Earn to Learn Component
 * 
 * Create earn-to-learn and airdrop automation system
 * Comprehensive platform for learning while earning through educational content and airdrops
 */

import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, DollarSign, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Zap, Award, BookOpen, Gift, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'blockchain' | 'crypto' | 'defi' | 'nft' | 'web3' | 'programming' | 'trading' | 'security' | 'business' | 'marketing';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  provider: string;
  instructor: string;
  duration: number; // minutes
  lessons: number;
  modules: number;
  prerequisites: string[];
  learning: {
    video: boolean;
    text: boolean;
    interactive: boolean;
    quizzes: boolean;
    projects: boolean;
    certification: boolean;
  };
  rewards: {
    type: 'tokens' | 'nft' | 'certificate' | 'badge' | 'airdrop' | 'cash' | 'points';
    amount: number;
    currency: string;
    bonus: number;
    milestones: Array<{
      percentage: number;
      reward: number;
      description: string;
    }>;
  };
  pricing: {
    model: 'free' | 'paid' | 'freemium' | 'subscription';
    basePrice: number;
    currency: string;
    discounts: Array<{
      condition: string;
      discount: number;
      description: string;
    }>;
  };
  enrollment: {
    total: number;
    active: number;
    completed: number;
    completionRate: number;
    averageRating: number;
    reviews: number;
  };
  content: {
    totalVideos: number;
    totalArticles: number;
    totalQuizzes: number;
    totalProjects: number;
    resources: string[];
  };
  requirements: {
    skills: string[];
    tools: string[];
    time: number; // hours per week
  };
  tags: string[];
  featured: boolean;
  trending: boolean;
  new: boolean;
  status: 'active' | 'inactive' | 'archived' | 'draft';
  createdAt: string;
  lastUpdated: string;
}

interface Airdrop {
  id: string;
  name: string;
  description: string;
  project: string;
  category: 'defi' | 'nft' | 'gaming' | 'infrastructure' | 'dao' | 'social' | 'exchange' | 'layer2';
  type: 'token' | 'nft' | 'nft_token' | 'governance' | 'utility' | 'stablecoin';
  status: 'upcoming' | 'active' | 'ended' | 'cancelled';
  timeline: {
    announcement: string;
    start: string;
    end: string;
    distribution: string;
  };
  eligibility: {
    requirements: string[];
    minimumHold: number;
    minimumTransactions: number;
    minimumValue: number;
    regions: string[];
    excluded: string[];
  };
  rewards: {
    totalAmount: number;
    currency: string;
    participants: number;
    averageReward: number;
    maxReward: number;
    distribution: 'equal' | 'tiered' | 'random' | 'merit';
  };
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    type: 'social' | 'transaction' | 'holding' | 'staking' | 'liquidity' | 'governance' | 'testing' | 'referral';
    points: number;
    completed: boolean;
    verified: boolean;
    deadline: string;
  }>;
  verification: {
    method: 'automatic' | 'manual' | 'snapshot' | 'onchain';
    requirements: string[];
    processing: number; // days
  };
  risk: {
    level: 'low' | 'medium' | 'high' | 'extreme';
    factors: string[];
    warnings: string[];
  };
  tags: string[];
  featured: boolean;
  trending: boolean;
  hot: boolean;
  createdAt: string;
  lastUpdated: string;
}

interface LearningProgress {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'paused' | 'dropped';
  progress: {
    percentage: number;
    lessonsCompleted: number;
    totalLessons: number;
    modulesCompleted: number;
    totalModules: number;
    timeSpent: number; // minutes
    timeRemaining: number; // minutes
  };
  rewards: {
    earned: number;
    pending: number;
    claimed: number;
    milestones: Array<{
      percentage: number;
      reward: number;
      claimed: boolean;
      claimedAt?: string;
    }>;
  };
  activities: Array<{
    type: 'lesson_started' | 'lesson_completed' | 'quiz_completed' | 'project_submitted' | 'certificate_earned';
    timestamp: string;
    details: string;
    points: number;
  }>;
  streak: {
    current: number;
    longest: number;
    lastActivity: string;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earnedAt: string;
    points: number;
  }>;
  startedAt: string;
  lastActivity: string;
  estimatedCompletion: string;
}

interface EarnToLearnConfig {
  autoMode: boolean;
  smartRecommendations: boolean;
  progressTracking: boolean;
  rewardOptimization: boolean;
  airdropHunting: boolean;
  learning: {
    adaptiveDifficulty: boolean;
    personalizedPath: boolean;
    spacedRepetition: boolean;
    gamification: boolean;
    socialLearning: boolean;
  };
  automation: {
    courseEnrollment: boolean;
    lessonCompletion: boolean;
    quizTaking: boolean;
    projectSubmission: boolean;
    airdropParticipation: boolean;
  };
  optimization: {
    timeManagement: boolean;
    rewardMaximization: boolean;
    skillDevelopment: boolean;
    careerAlignment: boolean;
  };
  notifications: {
    newCourses: boolean;
    airdropAlerts: boolean;
    progressUpdates: boolean;
    rewardClaims: boolean;
    deadlineReminders: boolean;
  };
}

const EarnToLearn: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [config, setConfig] = useState<EarnToLearnConfig>({
    autoMode: true,
    smartRecommendations: true,
    progressTracking: true,
    rewardOptimization: true,
    airdropHunting: true,
    learning: {
      adaptiveDifficulty: true,
      personalizedPath: true,
      spacedRepetition: true,
      gamification: true,
      socialLearning: true
    },
    automation: {
      courseEnrollment: true,
      lessonCompletion: true,
      quizTaking: true,
      projectSubmission: true,
      airdropParticipation: true
    },
    optimization: {
      timeManagement: true,
      rewardMaximization: true,
      skillDevelopment: true,
      careerAlignment: true
    },
    notifications: {
      newCourses: true,
      airdropAlerts: true,
      progressUpdates: true,
      rewardClaims: true,
      deadlineReminders: true
    }
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [selectedProgress, setSelectedProgress] = useState<LearningProgress | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    totalAirdrops: 0,
    activeAirdrops: 0,
    totalEarned: 0,
    totalRewards: 0,
    averageProgress: 0,
    bestCategory: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock courses initialization
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: 'course-1',
        title: 'Blockchain Fundamentals Mastery',
        description: 'Complete guide to blockchain technology, from basics to advanced concepts',
        category: 'blockchain',
        level: 'beginner',
        provider: 'Crypto Academy',
        instructor: 'Dr. Sarah Chen',
        duration: 480, // 8 hours
        lessons: 24,
        modules: 6,
        prerequisites: ['Basic computer skills'],
        learning: {
          video: true,
          text: true,
          interactive: true,
          quizzes: true,
          projects: true,
          certification: true
        },
        rewards: {
          type: 'tokens',
          amount: 100,
          currency: 'USDT',
          bonus: 25,
          milestones: [
            { percentage: 25, reward: 25, description: 'Complete first module' },
            { percentage: 50, reward: 50, description: 'Complete half the course' },
            { percentage: 75, reward: 75, description: 'Complete 75% of course' },
            { percentage: 100, reward: 125, description: 'Complete entire course' }
          ]
        },
        pricing: {
          model: 'freemium',
          basePrice: 0,
          currency: 'USD',
          discounts: [
            { condition: 'early_enrollment', discount: 20, description: 'Early bird discount' },
            { condition: 'bulk_enrollment', discount: 15, description: 'Multiple course discount' }
          ]
        },
        enrollment: {
          total: 15420,
          active: 8930,
          completed: 6490,
          completionRate: 42.1,
          averageRating: 4.8,
          reviews: 2341
        },
        content: {
          totalVideos: 48,
          totalArticles: 24,
          totalQuizzes: 12,
          totalProjects: 2,
          resources: ['PDF guides', 'Code examples', 'Community forum']
        },
        requirements: {
          skills: ['Basic computer literacy'],
          tools: ['Web browser', 'Note-taking app'],
          time: 5
        },
        tags: ['blockchain', 'cryptocurrency', 'decentralized', 'technology'],
        featured: true,
        trending: true,
        new: false,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'course-2',
        title: 'DeFi Yield Farming Strategies',
        description: 'Advanced strategies for maximizing returns in decentralized finance',
        category: 'defi',
        level: 'intermediate',
        provider: 'DeFi Masterclass',
        instructor: 'Alex Thompson',
        duration: 600, // 10 hours
        lessons: 30,
        modules: 8,
        prerequisites: ['Blockchain basics', 'Crypto wallet experience'],
        learning: {
          video: true,
          text: true,
          interactive: true,
          quizzes: true,
          projects: true,
          certification: true
        },
        rewards: {
          type: 'tokens',
          amount: 150,
          currency: 'ETH',
          bonus: 50,
          milestones: [
            { percentage: 25, reward: 37.5, description: 'Complete DeFi basics' },
            { percentage: 50, reward: 75, description: 'Master yield strategies' },
            { percentage: 75, reward: 112.5, description: 'Advanced techniques' },
            { percentage: 100, reward: 200, description: 'DeFi expert certification' }
          ]
        },
        pricing: {
          model: 'freemium',
          basePrice: 29.99,
          currency: 'USD',
          discounts: [
            { condition: 'member_discount', discount: 25, description: 'Member discount' },
            { condition: 'bundle_discount', discount: 30, description: 'Course bundle discount' }
          ]
        },
        enrollment: {
          total: 8930,
          active: 5670,
          completed: 3260,
          completionRate: 36.5,
          averageRating: 4.9,
          reviews: 1876
        },
        content: {
          totalVideos: 60,
          totalArticles: 30,
          totalQuizzes: 15,
          totalProjects: 3,
          resources: ['Trading tools', 'Strategy templates', 'Risk calculators']
        },
        requirements: {
          skills: ['Trading basics', 'Risk management'],
          tools: ['MetaMask', 'DeFi platforms'],
          time: 8
        },
        tags: ['defi', 'yield farming', 'liquidity', 'staking', 'passive income'],
        featured: true,
        trending: true,
        new: false,
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'course-3',
        title: 'NFT Creation and Trading',
        description: 'Complete guide to creating, minting, and trading NFTs successfully',
        category: 'nft',
        level: 'beginner',
        provider: 'NFT Academy',
        instructor: 'Maria Rodriguez',
        duration: 360, // 6 hours
        lessons: 18,
        modules: 5,
        prerequisites: ['Basic crypto knowledge'],
        learning: {
          video: true,
          text: true,
          interactive: true,
          quizzes: true,
          projects: true,
          certification: true
        },
        rewards: {
          type: 'nft',
          amount: 1,
          currency: 'NFT',
          bonus: 0,
          milestones: [
            { percentage: 25, reward: 0, description: 'Create first NFT' },
            { percentage: 50, reward: 0, description: 'Mint on marketplace' },
            { percentage: 75, reward: 0, description: 'Complete first sale' },
            { percentage: 100, reward: 1, description: 'NFT artist certification' }
          ]
        },
        pricing: {
          model: 'free',
          basePrice: 0,
          currency: 'USD',
          discounts: []
        },
        enrollment: {
          total: 12450,
          active: 7890,
          completed: 4560,
          completionRate: 36.6,
          averageRating: 4.7,
          reviews: 1543
        },
        content: {
          totalVideos: 36,
          totalArticles: 18,
          totalQuizzes: 9,
          totalProjects: 2,
          resources: ['Art tools', 'Marketplace guides', 'Community']
        },
        requirements: {
          skills: ['Digital art', 'Creative thinking'],
          tools: ['Digital art software', 'Crypto wallet'],
          time: 6
        },
        tags: ['nft', 'digital art', 'minting', 'trading', 'marketplace'],
        featured: true,
        trending: false,
        new: true,
        status: 'active',
        createdAt: '2024-01-20T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setCourses(mockCourses);
  }, []);

  // Mock airdrops initialization
  useEffect(() => {
    const mockAirdrops: Airdrop[] = [
      {
        id: 'airdrop-1',
        name: 'Ethereum Layer 2 Token Distribution',
        description: 'Major L2 protocol distributing tokens to early users and ecosystem contributors',
        project: 'Optimism',
        category: 'layer2',
        type: 'governance',
        status: 'active',
        timeline: {
          announcement: '2024-01-15T00:00:00Z',
          start: '2024-02-01T00:00:00Z',
          end: '2024-02-28T00:00:00Z',
          distribution: '2024-03-15T00:00:00Z'
        },
        eligibility: {
          requirements: ['Bridge assets to L2', 'Make at least 5 transactions', 'Hold minimum $100'],
          minimumHold: 100,
          minimumTransactions: 5,
          minimumValue: 100,
          regions: ['Global', 'excluding US sanctions'],
          excluded: ['US', 'North Korea', 'Iran']
        },
        rewards: {
          totalAmount: 10000000,
          currency: 'OP',
          participants: 50000,
          averageReward: 200,
          maxReward: 10000,
          distribution: 'tiered'
        },
        tasks: [
          {
            id: 'task-1',
            title: 'Bridge Assets',
            description: 'Bridge at least $100 to the L2 network',
            type: 'transaction',
            points: 30,
            completed: true,
            verified: true,
            deadline: '2024-02-28T00:00:00Z'
          },
          {
            id: 'task-2',
            title: 'Make Transactions',
            description: 'Complete at least 5 transactions on L2',
            type: 'transaction',
            points: 40,
            completed: true,
            verified: true,
            deadline: '2024-02-28T00:00:00Z'
          },
          {
            id: 'task-3',
            title: 'Hold Assets',
            description: 'Hold assets for minimum 30 days',
            type: 'holding',
            points: 30,
            completed: false,
            verified: false,
            deadline: '2024-03-01T00:00:00Z'
          }
        ],
        verification: {
          method: 'snapshot',
          requirements: ['Wallet connection', 'Transaction history'],
          processing: 7
        },
        risk: {
          level: 'low',
          factors: ['Established project', 'Clear tokenomics', 'Strong team'],
          warnings: ['Market volatility risk', 'Regulatory uncertainty']
        },
        tags: ['layer2', 'ethereum', 'scaling', 'governance'],
        featured: true,
        trending: true,
        hot: true,
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'airdrop-2',
        name: 'DeFi Protocol Governance Token',
        description: 'New DeFi platform distributing governance tokens to early liquidity providers',
        project: 'DeFi Protocol X',
        category: 'defi',
        type: 'governance',
        status: 'upcoming',
        timeline: {
          announcement: '2024-02-01T00:00:00Z',
          start: '2024-02-15T00:00:00Z',
          end: '2024-03-15T00:00:00Z',
          distribution: '2024-03-30T00:00:00Z'
        },
        eligibility: {
          requirements: ['Provide liquidity', 'Stake tokens', 'Vote in governance'],
          minimumHold: 500,
          minimumTransactions: 10,
          minimumValue: 500,
          regions: ['Global'],
          excluded: []
        },
        rewards: {
          totalAmount: 5000000,
          currency: 'DPX',
          participants: 25000,
          averageReward: 200,
          maxReward: 5000,
          distribution: 'merit'
        },
        tasks: [
          {
            id: 'task-1',
            title: 'Provide Liquidity',
            description: 'Provide minimum $500 liquidity to any pool',
            type: 'liquidity',
            points: 40,
            completed: false,
            verified: false,
            deadline: '2024-03-15T00:00:00Z'
          },
          {
            id: 'task-2',
            title: 'Stake Tokens',
            description: 'Stake tokens for minimum 30 days',
            type: 'staking',
            points: 30,
            completed: false,
            verified: false,
            deadline: '2024-03-15T00:00:00Z'
          },
          {
            id: 'task-3',
            title: 'Governance Participation',
            description: 'Vote in at least 3 governance proposals',
            type: 'governance',
            points: 30,
            completed: false,
            verified: false,
            deadline: '2024-03-15T00:00:00Z'
          }
        ],
        verification: {
          method: 'automatic',
          requirements: ['Smart contract interaction', 'On-chain data'],
          processing: 3
        },
        risk: {
          level: 'medium',
          factors: ['New project', 'Unproven tokenomics', 'Competition'],
          warnings: ['Smart contract risk', 'Market risk', 'Regulatory risk']
        },
        tags: ['defi', 'governance', 'liquidity', 'staking', 'yield'],
        featured: true,
        trending: false,
        hot: false,
        createdAt: '2024-02-01T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setAirdrops(mockAirdrops);
  }, []);

  // Mock progress initialization
  useEffect(() => {
    const mockProgress: LearningProgress[] = [
      {
        id: 'progress-1',
        userId: 'user-1',
        courseId: 'course-1',
        courseTitle: 'Blockchain Fundamentals Mastery',
        status: 'in_progress',
        progress: {
          percentage: 65,
          lessonsCompleted: 16,
          totalLessons: 24,
          modulesCompleted: 4,
          totalModules: 6,
          timeSpent: 312,
          timeRemaining: 168
        },
        rewards: {
          earned: 75,
          pending: 25,
          claimed: 50,
          milestones: [
            { percentage: 25, reward: 25, claimed: true, claimedAt: '2024-01-20T00:00:00Z' },
            { percentage: 50, reward: 50, claimed: true, claimedAt: '2024-01-25T00:00:00Z' },
            { percentage: 75, reward: 75, claimed: false },
            { percentage: 100, reward: 125, claimed: false }
          ]
        },
        activities: [
          {
            type: 'lesson_completed',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            details: 'Completed lesson: Smart Contracts Basics',
            points: 5
          },
          {
            type: 'quiz_completed',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            details: 'Completed quiz: Cryptography Fundamentals',
            points: 10
          }
        ],
        streak: {
          current: 7,
          longest: 14,
          lastActivity: new Date().toISOString()
        },
        achievements: [
          {
            id: 'achievement-1',
            title: 'Quick Learner',
            description: 'Complete 5 lessons in one day',
            earnedAt: '2024-01-22T00:00:00Z',
            points: 25
          }
        ],
        startedAt: '2024-01-15T00:00:00Z',
        lastActivity: new Date().toISOString(),
        estimatedCompletion: '2024-02-10T00:00:00Z'
      },
      {
        id: 'progress-2',
        userId: 'user-1',
        courseId: 'course-2',
        courseTitle: 'DeFi Yield Farming Strategies',
        status: 'in_progress',
        progress: {
          percentage: 30,
          lessonsCompleted: 9,
          totalLessons: 30,
          modulesCompleted: 2,
          totalModules: 8,
          timeSpent: 180,
          timeRemaining: 420
        },
        rewards: {
          earned: 37.5,
          pending: 12.5,
          claimed: 25,
          milestones: [
            { percentage: 25, reward: 37.5, claimed: true, claimedAt: '2024-01-28T00:00:00Z' },
            { percentage: 50, reward: 75, claimed: false },
            { percentage: 75, reward: 112.5, claimed: false },
            { percentage: 100, reward: 200, claimed: false }
          ]
        },
        activities: [
          {
            type: 'lesson_started',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            details: 'Started lesson: Yield Farming Basics',
            points: 2
          }
        ],
        streak: {
          current: 3,
          longest: 8,
          lastActivity: new Date(Date.now() - 1800000).toISOString()
        },
        achievements: [],
        startedAt: '2024-01-20T00:00:00Z',
        lastActivity: new Date(Date.now() - 1800000).toISOString(),
        estimatedCompletion: '2024-03-15T00:00:00Z'
      }
    ];

    setProgress(mockProgress);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!config.autoMode || !isOperating) return;

    const interval = setInterval(() => {
      // Update learning progress
      setProgress(prev => prev.map(p => {
        if (p.status === 'in_progress' && Math.random() > 0.7) { // 30% chance
          const progressIncrement = Math.random() * 5 + 2;
          const newPercentage = Math.min(100, p.progress.percentage + progressIncrement);
          const lessonsIncrement = Math.floor(Math.random() * 2) + 1;
          const newLessonsCompleted = Math.min(p.progress.totalLessons, p.progress.lessonsCompleted + lessonsIncrement);
          const timeIncrement = Math.random() * 30 + 15;
          const newTimeSpent = p.progress.timeSpent + timeIncrement;
          
          // Check for milestone rewards
          const newMilestones = p.rewards.milestones.map(milestone => {
            if (!milestone.claimed && newPercentage >= milestone.percentage) {
              return {
                ...milestone,
                claimed: true,
                claimedAt: new Date().toISOString()
              };
            }
            return milestone;
          });

          const earnedReward = newMilestones.filter(m => m.claimed && !p.rewards.milestones.find(pm => pm.percentage === m.percentage)?.claimed)
            .reduce((sum, m) => sum + m.reward, 0);

          return {
            ...p,
            progress: {
              ...p.progress,
              percentage: newPercentage,
              lessonsCompleted: newLessonsCompleted,
              timeSpent: newTimeSpent,
              timeRemaining: Math.max(0, p.progress.timeRemaining - timeIncrement)
            },
            rewards: {
              ...p.rewards,
              earned: p.rewards.earned + earnedReward,
              pending: p.rewards.pending - earnedReward,
              claimed: p.rewards.claimed + earnedReward,
              milestones: newMilestones
            },
            lastActivity: new Date().toISOString(),
            status: newPercentage >= 100 ? 'completed' : 'in_progress'
          };
        }
        return p;
      }));

      // Update airdrop tasks
      setAirdrops(prev => prev.map(airdrop => {
        if (airdrop.status === 'active' && Math.random() > 0.8) { // 20% chance
          const updatedTasks = airdrop.tasks.map(task => {
            if (!task.completed && Math.random() > 0.5) { // 50% chance
              return {
                ...task,
                completed: true,
                verified: Math.random() > 0.3 // 70% chance of verification
              };
            }
            return task;
          });

          return {
            ...airdrop,
            tasks: updatedTasks,
            lastUpdated: new Date().toISOString()
          };
        }
        return airdrop;
      }));

      // Auto course enrollment
      if (config.automation.courseEnrollment && Math.random() > 0.9) { // 10% chance
        const availableCourses = courses.filter(c => c.status === 'active');
        const enrolledCourseIds = progress.map(p => p.courseId);
        const availableForEnrollment = availableCourses.filter(c => !enrolledCourseIds.includes(c.id));

        if (availableForEnrollment.length > 0) {
          const courseToEnroll = availableForEnrollment[Math.floor(Math.random() * availableForEnrollment.length)];
          
          const newProgress: LearningProgress = {
            id: `progress-${Date.now()}`,
            userId: 'user-1',
            courseId: courseToEnroll.id,
            courseTitle: courseToEnroll.title,
            status: 'in_progress',
            progress: {
              percentage: 0,
              lessonsCompleted: 0,
              totalLessons: courseToEnroll.lessons,
              modulesCompleted: 0,
              totalModules: courseToEnroll.modules,
              timeSpent: 0,
              timeRemaining: courseToEnroll.duration
            },
            rewards: {
              earned: 0,
              pending: courseToEnroll.rewards.amount,
              claimed: 0,
              milestones: courseToEnroll.rewards.milestones.map(m => ({ ...m, claimed: false }))
            },
            activities: [{
              type: 'lesson_started',
              timestamp: new Date().toISOString(),
              details: `Enrolled in ${courseToEnroll.title}`,
              points: 0
            }],
            streak: {
              current: 1,
              longest: 1,
              lastActivity: new Date().toISOString()
            },
            achievements: [],
            startedAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            estimatedCompletion: new Date(Date.now() + courseToEnroll.duration * 60000).toISOString()
          };

          setProgress(prev => [...prev, newProgress]);
        }
      }

      // Auto airdrop participation
      if (config.automation.airdropParticipation && Math.random() > 0.85) { // 15% chance
        const activeAirdrops = airdrops.filter(a => a.status === 'active' || a.status === 'upcoming');
        
        activeAirdrops.forEach(airdrop => {
          const incompleteTasks = airdrop.tasks.filter(t => !t.completed);
          if (incompleteTasks.length > 0 && Math.random() > 0.7) { // 30% chance
            const taskToComplete = incompleteTasks[Math.floor(Math.random() * incompleteTasks.length)];
            
            setAirdrops(prev => prev.map(a => 
              a.id === airdrop.id 
                ? {
                    ...a,
                    tasks: a.tasks.map(t => 
                      t.id === taskToComplete.id 
                        ? { ...t, completed: true, verified: Math.random() > 0.4 }
                        : t
                    )
                  }
                : a
            ));
          }
        });
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.autoMode, isOperating, config.automation]);

  // Update stats
  useEffect(() => {
    const activeCourses = courses.filter(c => c.status === 'active').length;
    const completedCourses = progress.filter(p => p.status === 'completed').length;
    const activeAirdrops = airdrops.filter(a => a.status === 'active').length;
    const totalEarned = progress.reduce((sum, p) => sum + p.rewards.earned, 0);
    const totalRewards = progress.reduce((sum, p) => sum + p.rewards.pending, 0) + totalEarned;
    const averageProgress = progress.length > 0 
      ? progress.reduce((sum, p) => sum + p.progress.percentage, 0) / progress.length 
      : 0;
    
    const categoryCounts = courses.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestCategory = Object.entries(categoryCounts).reduce((best, [category, count]) => 
      count > (best?.count || 0) ? { category, count } : best, null as { category: string; count: number } | null);

    setStats({
      totalCourses: courses.length,
      activeCourses,
      completedCourses,
      totalAirdrops: airdrops.length,
      activeAirdrops,
      totalEarned,
      totalRewards,
      averageProgress,
      bestCategory: bestCategory?.category || ''
    });
  }, [courses, airdrops, progress]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const enrollInCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const existingProgress = progress.find(p => p.courseId === courseId);
    if (existingProgress) return;

    const newProgress: LearningProgress = {
      id: `progress-${Date.now()}`,
      userId: 'user-1',
      courseId,
      courseTitle: course.title,
      status: 'in_progress',
      progress: {
        percentage: 0,
        lessonsCompleted: 0,
        totalLessons: course.lessons,
        modulesCompleted: 0,
        totalModules: course.modules,
        timeSpent: 0,
        timeRemaining: course.duration
      },
      rewards: {
        earned: 0,
        pending: course.rewards.amount,
        claimed: 0,
        milestones: course.rewards.milestones.map(m => ({ ...m, claimed: false }))
      },
      activities: [{
        type: 'lesson_started',
        timestamp: new Date().toISOString(),
        details: `Enrolled in ${course.title}`,
        points: 0
      }],
      streak: {
        current: 1,
        longest: 1,
        lastActivity: new Date().toISOString()
      },
      achievements: [],
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + course.duration * 60000).toISOString()
    };

    setProgress(prev => [...prev, newProgress]);
  };

  const participateInAirdrop = (airdropId: string) => {
    const airdrop = airdrops.find(a => a.id === airdropId);
    if (!airdrop) return;

    // Mark first task as in progress
    setAirdrops(prev => prev.map(a => 
      a.id === airdropId 
        ? {
            ...a,
            tasks: a.tasks.map((t, index) => 
              index === 0 
                ? { ...t, completed: false, verified: false }
                : t
            )
          }
        : a
    ));
  };

  const getCategoryColor = (category: Course['category'] | Airdrop['category']) => {
    switch (category) {
      case 'blockchain': return 'bg-blue-600';
      case 'crypto': return 'bg-orange-600';
      case 'defi': return 'bg-green-600';
      case 'nft': return 'bg-purple-600';
      case 'web3': return 'bg-red-600';
      case 'programming': return 'bg-yellow-600';
      case 'trading': return 'bg-pink-600';
      case 'security': return 'bg-cyan-600';
      case 'business': return 'bg-indigo-600';
      case 'marketing': return 'bg-gray-600';
      case 'gaming': return 'bg-purple-600';
      case 'infrastructure': return 'bg-blue-600';
      case 'dao': return 'bg-green-600';
      case 'social': return 'bg-orange-600';
      case 'exchange': return 'bg-red-600';
      case 'layer2': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-blue-600';
      case 'advanced': return 'bg-purple-600';
      case 'expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: Course['status'] | Airdrop['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-gray-600';
      case 'archived': return 'bg-red-600';
      case 'draft': return 'bg-yellow-600';
      case 'upcoming': return 'bg-blue-600';
      case 'ended': return 'bg-gray-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
      const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            Earn to Learn
          </h1>
          <p className="text-gray-400">
            Create earn-to-learn and airdrop automation system
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Courses</div>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Learning</div>
                <div className="text-2xl font-bold">{progress.filter(p => p.status === 'in_progress').length}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Airdrops</div>
                <div className="text-2xl font-bold">{stats.activeAirdrops}</div>
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
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Progress</div>
                <div className="text-2xl font-bold">{stats.averageProgress.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Earn to Learn Operations</h2>
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
                    Stop Learning
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Learning
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
              Best Category: {stats.bestCategory || 'None'} | 
              Completed: {stats.completedCourses} | 
              Automation: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="blockchain">Blockchain</option>
                <option value="defi">DeFi</option>
                <option value="nft">NFT</option>
                <option value="web3">Web3</option>
              </select>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredCourses().map((course) => {
                const courseProgress = progress.find(p => p.courseId === course.id);
                const isEnrolled = !!courseProgress;
                
                return (
                  <div
                    key={course.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCourse?.id === course.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(course.status)}`}></div>
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <div className="text-sm text-gray-400">{course.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                        {course.featured && <span className="px-2 py-1 rounded text-xs bg-yellow-600">Featured</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Duration:</span> {course.duration}min
                      </div>
                      <div>
                        <span className="text-gray-400">Lessons:</span> {course.lessons}
                      </div>
                      <div>
                        <span className="text-gray-400">Reward:</span> {course.rewards.amount} {course.rewards.currency}
                      </div>
                      <div>
                        <span className="text-gray-400">Rating:</span> {course.enrollment.averageRating.toFixed(1)}/5.0
                      </div>
                    </div>

                    {isEnrolled && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress:</span>
                          <span>{courseProgress.progress.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${courseProgress.progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {course.enrollment.total.toLocaleString()} enrolled | 
                          {course.enrollment.completionRate.toFixed(1)}% completion
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isEnrolled && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              enrollInCourse(course.id);
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                          >
                            Enroll
                          </button>
                        )}
                        {isEnrolled && courseProgress.status === 'in_progress' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Continue learning
                            }}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {getFilteredCourses().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No courses found
              </div>
            )}
          </div>

          {/* Selected Course Details */}
          {selectedCourse && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Course Details: {selectedCourse.title}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Course Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Provider:</span>
                        <span className="font-medium">{selectedCourse.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Instructor:</span>
                        <span className="font-medium">{selectedCourse.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getLevelColor(selectedCourse.level)}`}>
                          {selectedCourse.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium">{selectedCourse.duration} minutes</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Rewards</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedCourse.rewards.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="font-medium">{selectedCourse.rewards.amount} {selectedCourse.rewards.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bonus:</span>
                        <span className="font-medium">+{selectedCourse.rewards.bonus} {selectedCourse.rewards.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Milestones:</span>
                        <span className="font-medium">{selectedCourse.rewards.milestones.length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Learning</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedCourse.learning.video ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300">Video</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedCourse.learning.text ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300">Text</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedCourse.learning.interactive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300">Interactive</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedCourse.learning.quizzes ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300">Quizzes</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Enrollment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total:</span>
                        <span className="font-medium">{selectedCourse.enrollment.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active:</span>
                        <span className="font-medium">{selectedCourse.enrollment.active.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completed:</span>
                        <span className="font-medium">{selectedCourse.enrollment.completed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="font-medium">{selectedCourse.enrollment.averageRating.toFixed(1)}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedCourse.description}</p>
                </div>

                {/* Prerequisites */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Prerequisites</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.prerequisites.map((prereq, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Airdrops */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Airdrops</h3>
          <div className="space-y-4">
            {airdrops.map((airdrop) => (
              <div key={airdrop.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{airdrop.name}</h4>
                    <div className="text-sm text-gray-400">{airdrop.project} - {airdrop.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(airdrop.category)}`}>
                      {airdrop.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(airdrop.status)}`}>
                      {airdrop.status}
                    </span>
                    {airdrop.hot && <span className="px-2 py-1 rounded text-xs bg-red-600">HOT</span>}
                    {airdrop.featured && <span className="px-2 py-1 rounded text-xs bg-yellow-600">Featured</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Total Amount:</span> {airdrop.rewards.totalAmount.toLocaleString()} {airdrop.rewards.currency}
                  </div>
                  <div>
                    <span className="text-gray-400">Participants:</span> {airdrop.rewards.participants.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Average Reward:</span> {airdrop.rewards.averageReward} {airdrop.rewards.currency}
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Level:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      airdrop.risk.level === 'low' ? 'bg-green-600' :
                      airdrop.risk.level === 'medium' ? 'bg-yellow-600' :
                      airdrop.risk.level === 'high' ? 'bg-orange-600' :
                      'bg-red-600'
                    }`}>
                      {airdrop.risk.level}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Tasks Progress:</span>
                    <span>{airdrop.tasks.filter(t => t.completed).length}/{airdrop.tasks.length} completed</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${(airdrop.tasks.filter(t => t.completed).length / airdrop.tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Ends: {new Date(airdrop.timeline.end).toLocaleDateString()} | 
                      Distribution: {new Date(airdrop.timeline.distribution).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(airdrop.status === 'active' || airdrop.status === 'upcoming') && (
                      <button
                        onClick={() => participateInAirdrop(airdrop.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Participate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {airdrops.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No airdrops found
            </div>
          )}
        </div>

        {/* Learning Progress */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
          <div className="space-y-4">
            {progress.map((prog) => (
              <div key={prog.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{prog.courseTitle}</h4>
                    <div className="text-sm text-gray-400">{prog.status.replace('_', ' ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      prog.status === 'completed' ? 'bg-green-600' :
                      prog.status === 'in_progress' ? 'bg-blue-600' :
                      prog.status === 'paused' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}>
                      {prog.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-400">
                      {prog.rewards.earned} / {prog.rewards.earned + prog.rewards.pending} earned
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Progress:</span> {prog.progress.percentage.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Lessons:</span> {prog.progress.lessonsCompleted}/{prog.progress.totalLessons}
                  </div>
                  <div>
                    <span className="text-gray-400">Time Spent:</span> {Math.floor(prog.progress.timeSpent / 60)}h {prog.progress.timeSpent % 60}m
                  </div>
                  <div>
                    <span className="text-gray-400">Streak:</span> {prog.streak.current} days
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${prog.progress.percentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Started: {new Date(prog.startedAt).toLocaleDateString()} | 
                      Est. completion: {new Date(prog.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last activity: {new Date(prog.lastActivity).toLocaleTimeString()}
                  </div>
                </div>

                {prog.achievements.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-2">Achievements:</div>
                    <div className="flex flex-wrap gap-2">
                      {prog.achievements.map((achievement, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-600 rounded text-xs">
                          {achievement.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {progress.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No learning progress found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Earn to Learn Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Learning Mode</h4>
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
                        checked={config.smartRecommendations}
                        onChange={(e) => setConfig(prev => ({ ...prev, smartRecommendations: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Smart Recommendations</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.progressTracking}
                        onChange={(e) => setConfig(prev => ({ ...prev, progressTracking: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Progress Tracking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.rewardOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, rewardOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Reward Optimization</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Automation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.courseEnrollment}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, courseEnrollment: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Course Enrollment</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.lessonCompletion}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, lessonCompletion: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Lesson Completion</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.airdropParticipation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, airdropParticipation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Airdrop Participation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.quizTaking}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, quizTaking: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Quiz Taking</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Learning Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning.adaptiveDifficulty}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          learning: { ...prev.learning, adaptiveDifficulty: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Adaptive Difficulty</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning.personalizedPath}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          learning: { ...prev.learning, personalizedPath: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Personalized Path</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning.gamification}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          learning: { ...prev.learning, gamification: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Gamification</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning.socialLearning}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          learning: { ...prev.learning, socialLearning: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Social Learning</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Notifications</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.newCourses}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, newCourses: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">New Courses</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.airdropAlerts}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, airdropAlerts: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Airdrop Alerts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.progressUpdates}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, progressUpdates: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Progress Updates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.rewardClaims}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, rewardClaims: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Reward Claims</span>
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

export default EarnToLearn;
