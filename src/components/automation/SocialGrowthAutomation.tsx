/**
 * Social Growth Automation Component
 *
 * Zefoy-style social growth automation across all platforms
 * Automated engagement, follower growth, and social media optimization
 */

import { Activity, Heart, Pause, Play, Rocket, Search, Settings, Target, TrendingUp, Users, XCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SocialPlatform {
  id: string;
  name: string;
  type: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'reddit' | 'pinterest' | 'telegram' | 'discord';
  url: string;
  apiEndpoint: string;
  features: {
    likes: boolean;
    comments: boolean;
    shares: boolean;
    follows: boolean;
    stories: boolean;
    messages: boolean;
    posts: boolean;
    live: boolean;
  };
  limits: {
    dailyLikes: number;
    dailyComments: number;
    dailyShares: number;
    dailyFollows: number;
    hourlyLimit: number;
    minimumDelay: number; // seconds
    maximumDelay: number; // seconds
  };
  growth: {
    averageFollowersPerDay: number;
    averageEngagementRate: number;
    bestPostingTimes: Array<number>;
    optimalHashtags: string[];
    contentTypes: Array<string>;
  };
  isActive: boolean;
  priority: number;
}

interface GrowthTask {
  id: string;
  personaId: string;
  platformId: string;
  type: 'like' | 'comment' | 'share' | 'follow' | 'unfollow' | 'story_view' | 'message' | 'post_engagement';
  target: {
    userId?: string;
    postId?: string;
    hashtag?: string;
    location?: string;
    username?: string;
  };
  content: {
    text?: string;
    hashtags?: string[];
    mentions?: string[];
    media?: string;
  };
  timing: {
    scheduledFor: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    randomDelay: number; // seconds
  };
  behavior: {
    humanization: {
      typingPattern: 'fast' | 'normal' | 'slow';
      errorRate: number; // 0-1
      pauseFrequency: number; // seconds
      emotionalTone: 'neutral' | 'positive' | 'enthusiastic' | 'professional';
    };
    targeting: {
      relevanceScore: number; // 0-100
      engagementLikelihood: number; // 0-100
      followBackProbability: number; // 0-100
    };
  };
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'cancelled';
  result?: {
    success: boolean;
    engagement?: {
      likes: number;
      comments: number;
      shares: number;
      views?: number;
    };
    error?: string;
    executionTime: number; // seconds
    response?: string;
  };
  createdAt: string;
  completedAt?: string;
}

interface GrowthCampaign {
  id: string;
  name: string;
  personaId: string;
  platforms: Array<{
    platformId: string;
    enabled: boolean;
    goals: {
      followerGrowth: number;
      engagementRate: number;
      postFrequency: number;
      hashtagReach: number;
    };
    strategy: {
      targetAudience: string[];
      contentPillars: string[];
      postingSchedule: Array<{
        day: number;
        time: string;
        contentType: string;
      }>;
      engagementTactics: string[];
    };
  }>;
  duration: {
    startDate: string;
    endDate: string;
    totalDays: number;
  };
  budget: {
    dailyLimit: number;
    totalBudget: number;
    spent: number;
    remaining: number;
  };
  performance: {
    currentFollowers: number;
    targetFollowers: number;
    currentEngagement: number;
    targetEngagement: number;
    postsCreated: number;
    totalEngagement: number;
    bestPerformingPlatform?: string;
    roi: number; // return on investment
  };
  isActive: boolean;
  createdAt: string;
  lastActivity: string;
}

interface GrowthConfig {
  automationEnabled: boolean;
  humanizationLevel: number; // 0-100
  safetyMode: boolean;
  growthOptimization: boolean;
  crossPlatform: boolean;
  contentGeneration: boolean;
  engagementAutomation: boolean;
  followerGrowth: boolean;
  analytics: {
    realTimeTracking: boolean;
    performanceMetrics: boolean;
    competitorAnalysis: boolean;
    trendDetection: boolean;
  };
  behavior: {
    randomizeTiming: boolean;
    varyPatterns: boolean;
    emotionalRange: boolean;
    personalityConsistency: boolean;
    sleepSimulation: boolean;
  };
  safety: {
    rateLimiting: boolean;
    proxyRotation: boolean;
    deviceRotation: boolean;
    accountWarming: boolean;
    riskAssessment: boolean;
  };
}

const SocialGrowthAutomation: React.FC = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [tasks, setTasks] = useState<GrowthTask[]>([]);
  const [campaigns, setCampaigns] = useState<GrowthCampaign[]>([]);
  const [config, setConfig] = useState<GrowthConfig>({
    automationEnabled: true,
    humanizationLevel: 85,
    safetyMode: true,
    growthOptimization: true,
    crossPlatform: true,
    contentGeneration: true,
    engagementAutomation: true,
    followerGrowth: true,
    analytics: {
      realTimeTracking: true,
      performanceMetrics: true,
      competitorAnalysis: true,
      trendDetection: true
    },
    behavior: {
      randomizeTiming: true,
      varyPatterns: true,
      emotionalRange: true,
      personalityConsistency: true,
      sleepSimulation: true
    },
    safety: {
      rateLimiting: true,
      proxyRotation: true,
      deviceRotation: true,
      accountWarming: true,
      riskAssessment: true
    }
  });
  const [selectedCampaign, setSelectedCampaign] = useState<GrowthCampaign | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    activeCampaigns: 0,
    totalFollowers: 0,
    followerGrowth: 0,
    engagementRate: 0,
    bestPlatform: '',
    averageTime: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock social platforms initialization
  useEffect(() => {
    const mockPlatforms: SocialPlatform[] = [
      {
        id: '1',
        name: 'Instagram',
        type: 'instagram',
        url: 'https://instagram.com',
        apiEndpoint: 'https://api.instagram.com',
        features: {
          likes: true,
          comments: true,
          shares: true,
          follows: true,
          stories: true,
          messages: true,
          posts: true,
          live: false
        },
        limits: {
          dailyLikes: 1000,
          dailyComments: 200,
          dailyShares: 50,
          dailyFollows: 200,
          hourlyLimit: 60,
          minimumDelay: 30,
          maximumDelay: 120
        },
        growth: {
          averageFollowersPerDay: 50,
          averageEngagementRate: 4.5,
          bestPostingTimes: [8, 12, 18, 21],
          optimalHashtags: ['#instagood', '#photooftheday', '#love', '#beautiful', '#fashion'],
          contentTypes: ['photo', 'video', 'story', 'reel']
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Twitter',
        type: 'twitter',
        url: 'https://twitter.com',
        apiEndpoint: 'https://api.twitter.com',
        features: {
          likes: true,
          comments: true,
          shares: true,
          follows: true,
          stories: false,
          messages: true,
          posts: true,
          live: true
        },
        limits: {
          dailyLikes: 500,
          dailyComments: 300,
          dailyShares: 100,
          dailyFollows: 400,
          hourlyLimit: 100,
          minimumDelay: 15,
          maximumDelay: 90
        },
        growth: {
          averageFollowersPerDay: 75,
          averageEngagementRate: 2.8,
          bestPostingTimes: [9, 12, 15, 18, 21],
          optimalHashtags: ['#trending', '#viral', '#news', '#tech', '#crypto'],
          contentTypes: ['tweet', 'retweet', 'thread', 'media']
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'TikTok',
        type: 'tiktok',
        url: 'https://tiktok.com',
        apiEndpoint: 'https://api.tiktok.com',
        features: {
          likes: true,
          comments: true,
          shares: true,
          follows: true,
          stories: false,
          messages: true,
          posts: true,
          live: true
        },
        limits: {
          dailyLikes: 2000,
          dailyComments: 500,
          dailyShares: 200,
          dailyFollows: 500,
          hourlyLimit: 150,
          minimumDelay: 10,
          maximumDelay: 60
        },
        growth: {
          averageFollowersPerDay: 150,
          averageEngagementRate: 8.5,
          bestPostingTimes: [12, 15, 18, 20, 22],
          optimalHashtags: ['#fyp', '#foryou', '#viral', '#trending', '#dance'],
          contentTypes: ['video', 'duet', 'stitch', 'live']
        },
        isActive: true,
        priority: 3
      },
      {
        id: '4',
        name: 'YouTube',
        type: 'youtube',
        url: 'https://youtube.com',
        apiEndpoint: 'https://api.youtube.com',
        features: {
          likes: true,
          comments: true,
          shares: true,
          follows: true,
          stories: false,
          messages: false,
          posts: true,
          live: true
        },
        limits: {
          dailyLikes: 300,
          dailyComments: 100,
          dailyShares: 50,
          dailyFollows: 100,
          hourlyLimit: 40,
          minimumDelay: 45,
          maximumDelay: 180
        },
        growth: {
          averageFollowersPerDay: 25,
          averageEngagementRate: 3.2,
          bestPostingTimes: [10, 14, 18, 20],
          optimalHashtags: ['#youtube', '#viral', '#trending', '#subscribe', '#newvideo'],
          contentTypes: ['video', 'short', 'live', 'premiere']
        },
        isActive: true,
        priority: 4
      }
    ];

    setPlatforms(mockPlatforms);
  }, []);

  // Mock campaigns initialization
  useEffect(() => {
    const mockCampaigns: GrowthCampaign[] = [
      {
        id: 'campaign-1',
        name: 'Crypto Influencer Growth',
        personaId: 'persona-1',
        platforms: [
          {
            platformId: '1',
            enabled: true,
            goals: {
              followerGrowth: 1000,
              engagementRate: 5.0,
              postFrequency: 3,
              hashtagReach: 50000
            },
            strategy: {
              targetAudience: ['crypto enthusiasts', 'traders', 'investors', 'tech enthusiasts'],
              contentPillars: ['market analysis', 'trading tips', 'crypto news', 'investment strategies'],
              postingSchedule: [
                { day: 1, time: '09:00', contentType: 'market_analysis' },
                { day: 2, time: '18:00', contentType: 'trading_tips' },
                { day: 3, time: '12:00', contentType: 'crypto_news' },
                { day: 4, time: '21:00', contentType: 'investment_strategies' }
              ],
              engagementTactics: ['comment on trending posts', 'engage with crypto influencers', 'use viral hashtags', 'create interactive polls']
            }
          },
          {
            platformId: '2',
            enabled: true,
            goals: {
              followerGrowth: 1500,
              engagementRate: 3.5,
              postFrequency: 5,
              hashtagReach: 100000
            },
            strategy: {
              targetAudience: ['crypto community', 'developers', 'analysts', 'entrepreneurs'],
              contentPillars: ['technical analysis', 'project reviews', 'market predictions', 'industry insights'],
              postingSchedule: [
                { day: 1, time: '08:00', contentType: 'technical_analysis' },
                { day: 2, time: '14:00', contentType: 'project_reviews' },
                { day: 3, time: '16:00', contentType: 'market_predictions' },
                { day: 4, time: '20:00', contentType: 'industry_insights' },
                { day: 5, time: '12:00', contentType: 'community_qa' }
              ],
              engagementTactics: ['participate in crypto discussions', 'share breaking news', 'create threads', 'host AMAs']
            }
          }
        ],
        duration: {
          startDate: '2024-01-01',
          endDate: '2024-03-01',
          totalDays: 60
        },
        budget: {
          dailyLimit: 50,
          totalBudget: 3000,
          spent: 1250,
          remaining: 1750
        },
        performance: {
          currentFollowers: 850,
          targetFollowers: 2500,
          currentEngagement: 4.2,
          targetEngagement: 4.25,
          postsCreated: 45,
          totalEngagement: 3780,
          bestPerformingPlatform: 'Twitter',
          roi: 156.5
        },
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      }
    ];

    setCampaigns(mockCampaigns);
  }, []);

  // Mock tasks initialization
  useEffect(() => {
    const mockTasks: GrowthTask[] = [
      {
        id: 'task-1',
        personaId: 'persona-1',
        platformId: '1',
        type: 'like',
        target: {
          postId: 'post_12345',
          username: 'crypto_influencer'
        },
        timing: {
          scheduledFor: new Date(Date.now() + 300000).toISOString(),
          priority: 'medium',
          randomDelay: 45
        },
        behavior: {
          humanization: {
            typingPattern: 'normal',
            errorRate: 0.05,
            pauseFrequency: 2,
            emotionalTone: 'positive'
          },
          targeting: {
            relevanceScore: 85,
            engagementLikelihood: 75,
            followBackProbability: 60
          }
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 'task-2',
        personaId: 'persona-1',
        platformId: '2',
        type: 'comment',
        target: {
          postId: 'tweet_67890',
          username: 'crypto_analyst'
        },
        content: {
          text: 'Great analysis! I\'ve been watching this pattern too. The support level at $42k seems crucial for the next move. What\'s your take on the upcoming halving?',
          hashtags: ['#crypto', '#bitcoin', '#trading'],
          mentions: ['@crypto_analyst']
        },
        timing: {
          scheduledFor: new Date(Date.now() + 600000).toISOString(),
          priority: 'high',
          randomDelay: 120
        },
        behavior: {
          humanization: {
            typingPattern: 'normal',
            errorRate: 0.02,
            pauseFrequency: 3,
            emotionalTone: 'professional'
          },
          targeting: {
            relevanceScore: 92,
            engagementLikelihood: 85,
            followBackProbability: 70
          }
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];

    setTasks(mockTasks);
  }, []);

  // Auto task generation and execution
  useEffect(() => {
    if (!config.automationEnabled || !isRunning) return;

    const interval = setInterval(() => {
      campaigns.forEach(campaign => {
        if (!campaign.isActive) return;

        campaign.platforms.forEach(platform => {
          if (!platform.enabled) return;

          const platformData = platforms.find(p => p.id === platform.platformId);
          if (!platformData || !platformData.isActive) return;

          // Generate new tasks based on campaign strategy
          if (Math.random() > 0.7) { // 30% chance
            const taskTypes: GrowthTask['type'][] = ['like', 'comment', 'share', 'follow'];
            const selectedType = taskTypes[Math.floor(Math.random() * taskTypes.length)];

            const newTask: GrowthTask = {
              id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              personaId: campaign.personaId,
              platformId: platform.platformId,
              type: selectedType,
              target: {
                postId: `post_${Math.random().toString(36).substr(2, 8)}`,
                username: `user_${Math.random().toString(36).substr(2, 6)}`
              },
              content: selectedType === 'comment' ? {
                text: generateComment(platform.strategy.contentPillars, config.behavior.emotionalRange),
                hashtags: platform.strategy.targetAudience.map(audience => `#${audience.replace(/\s+/g, '')}`),
                mentions: [`@${Math.random().toString(36).substr(2, 6)}`]
              } : undefined,
              timing: {
                scheduledFor: new Date(Date.now() + Math.random() * 3600000).toISOString(),
                priority: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
                randomDelay: platformData.limits.minimumDelay + Math.random() * (platformData.limits.maximumDelay - platformData.limits.minimumDelay)
              },
              behavior: {
                humanization: {
                  typingPattern: config.humanizationLevel > 70 ? 'normal' : Math.random() > 0.5 ? 'fast' : 'slow',
                  errorRate: (100 - config.humanizationLevel) / 1000, // Lower humanization = fewer errors
                  pauseFrequency: config.humanizationLevel > 80 ? 2 : 1,
                  emotionalTone: config.behavior.emotionalRange ?
                    ['positive', 'enthusiastic', 'professional', 'neutral'][Math.floor(Math.random() * 4)] as any :
                    'neutral'
                },
                targeting: {
                  relevanceScore: 70 + Math.random() * 30,
                  engagementLikelihood: 60 + Math.random() * 40,
                  followBackProbability: 40 + Math.random() * 60
                }
              },
              status: 'pending',
              createdAt: new Date().toISOString()
            };

            setTasks(prev => [...prev, newTask]);
          }
        });
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.automationEnabled, isRunning, campaigns, platforms, config]);

  // Task execution simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTasks(prev => prev.map(task => {
        if (task.status === 'pending' && new Date(task.timing.scheduledFor) <= new Date()) {
          // Execute task
          return {
            ...task,
            status: 'executing'
          };
        }

        if (task.status === 'executing') {
          // Complete execution after random time
          setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            const executionTime = task.behavior.humanization.typingPattern === 'fast' ? 5 :
                                 task.behavior.humanization.typingPattern === 'slow' ? 20 : 10;

            const engagement = success ? {
              likes: Math.floor(Math.random() * 10) + 1,
              comments: Math.floor(Math.random() * 3),
              shares: Math.floor(Math.random() * 2)
            } : undefined;

            setTasks(prev => prev.map(t =>
              t.id === task.id
                ? {
                    ...t,
                    status: success ? 'completed' : 'failed',
                    result: {
                      success,
                      engagement,
                      error: success ? undefined : 'Rate limit exceeded',
                      executionTime,
                      response: success ? 'Task completed successfully' : undefined
                    },
                    completedAt: new Date().toISOString()
                  }
                : t
            ));

            // Update campaign performance
            if (success) {
              setCampaigns(prev => prev.map(campaign =>
                campaign.personaId === task.personaId
                  ? {
                      ...campaign,
                      performance: {
                        ...campaign.performance,
                        totalEngagement: campaign.performance.totalEngagement + (engagement?.likes || 0),
                        postsCreated: campaign.performance.postsCreated + (task.type === 'post_engagement' ? 1 : 0)
                      },
                      lastActivity: new Date().toISOString()
                    }
                  : campaign
              ));
            }
          }, executionTime * 1000);
        }

        return task;
      }));
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  // Update stats
  useEffect(() => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const failedTasks = tasks.filter(t => t.status === 'failed').length;
    const activeCampaigns = campaigns.filter(c => c.isActive).length;
    const totalFollowers = campaigns.reduce((sum, c) => sum + c.performance.currentFollowers, 0);
    const targetFollowers = campaigns.reduce((sum, c) => sum + c.performance.targetFollowers, 0);
    const followerGrowth = targetFollowers > 0 ? (totalFollowers / targetFollowers) * 100 : 0;
    const averageEngagement = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.performance.currentEngagement, 0) / campaigns.length
      : 0;
    const averageTime = tasks.filter(t => t.result?.executionTime).length > 0
      ? tasks.reduce((sum, t) => sum + (t.result?.executionTime || 0), 0) / tasks.filter(t => t.result?.executionTime).length
      : 0;

    const bestPlatform = campaigns.reduce((best, campaign) => {
      const platform = campaign.performance.bestPerformingPlatform;
      if (!best || platform === best.platform) {
        return { platform: platform || '', count: (best.platform === platform ? best.count + 1 : 1) };
      }
      return best;
    }, { platform: '', count: 0 });

    setStats({
      totalTasks: tasks.length,
      completedTasks,
      failedTasks,
      activeCampaigns,
      totalFollowers,
      followerGrowth,
      engagementRate: averageEngagement,
      bestPlatform: bestPlatform.platform,
      averageTime
    });
  const generateComment = (contentPillars: string[], emotionalRange: boolean): string => {
    const templates = [
      `Great insights on ${contentPillars[0]}! This really resonates with what I've been seeing in the market.`,
      `Interesting perspective on ${contentPillars[1]}. Have you considered to latest developments?`,
      `This ${contentPillars[2]} analysis is spot on. The data definitely supports your conclusions.`,
      `Love your take on ${contentPillars[3]}. Would love to hear more about your methodology.`,
      `Excellent breakdown of ${contentPillars[0]}. This is exactly what the community needs to see!`
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];

    if (emotionalRange && Math.random() > 0.7) {
      const emotions = ['Amazing!', 'Fantastic!', 'Incredible!', 'Outstanding!', 'Brilliant!'];
      return `${emotions[Math.floor(Math.random() * emotions.length)]} ${template}`;
    }

    return template;
  };

  }, [tasks, campaigns]);
    const templates = [
      `Great insights on ${contentPillars[0]}! This really resonates with what I've been seeing in the market.`,
      `Interesting perspective on ${contentPillars[1]}. Have you considered the latest developments?`,
      `This ${contentPillars[2]} analysis is spot on. The data definitely supports your conclusions.`,
      `Love your take on ${contentPillars[3]}. Would love to hear more about your methodology.`,
      `Excellent breakdown of ${contentPillars[0]}. This is exactly what the community needs to see!`
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];

    if (emotionalRange && Math.random() > 0.7) {
      const emotions = ['Amazing!', 'Fantastic!', 'Incredible!', 'Outstanding!', 'Brilliant!'];
      return `${emotions[Math.floor(Math.random() * emotions.length)]} ${template}`;
    }

    return template;
  };

  const toggleAutomation = () => {
    setIsRunning(!isRunning);
  };

  const createCampaign = () => {
    const newCampaign: GrowthCampaign = {
      id: `campaign-${Date.now()}`,
      name: `Growth Campaign ${campaigns.length + 1}`,
      personaId: 'persona-1',
      platforms: [
        {
          platformId: '1',
          enabled: true,
          goals: {
            followerGrowth: 500,
            engagementRate: 4.0,
            postFrequency: 2,
            hashtagReach: 25000
          },
          strategy: {
            targetAudience: ['general', 'lifestyle', 'entertainment'],
            contentPillars: ['daily life', 'hobbies', 'interests', 'personal growth'],
            postingSchedule: [
              { day: 1, time: '12:00', contentType: 'lifestyle' },
              { day: 3, time: '18:00', contentType: 'hobbies' },
              { day: 5, time: '20:00', contentType: 'personal_growth' }
            ],
            engagementTactics: ['like trending content', 'comment on popular posts', 'use viral hashtags']
          }
        }
      ],
      duration: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        totalDays: 30
      },
      budget: {
        dailyLimit: 25,
        totalBudget: 750,
        spent: 0,
        remaining: 750
      },
      performance: {
        currentFollowers: 0,
        targetFollowers: 500,
        currentEngagement: 0,
        targetEngagement: 4.0,
        postsCreated: 0,
        totalEngagement: 0,
        roi: 0
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setCampaigns(prev => [...prev, newCampaign]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const getPlatformTypeColor = (type: SocialPlatform['type']) => {
    switch (type) {
      case 'instagram': return 'bg-pink-600';
      case 'twitter': return 'bg-blue-600';
      case 'tiktok': return 'bg-black';
      case 'youtube': return 'bg-red-600';
      case 'facebook': return 'bg-blue-800';
      case 'linkedin': return 'bg-blue-700';
      case 'reddit': return 'bg-orange-600';
      case 'pinterest': return 'bg-red-700';
      case 'telegram': return 'bg-blue-500';
      case 'discord': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getTaskTypeColor = (type: GrowthTask['type']) => {
    switch (type) {
      case 'like': return 'bg-red-600';
      case 'comment': return 'bg-blue-600';
      case 'share': return 'bg-green-600';
      case 'follow': return 'bg-purple-600';
      case 'unfollow': return 'bg-gray-600';
      case 'story_view': return 'bg-pink-600';
      case 'message': return 'bg-orange-600';
      case 'post_engagement': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: GrowthTask['timing']['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-purple-400" />
            Social Growth Automation
          </h1>
          <p className="text-gray-400">
            Zefoy-style social growth automation across all platforms with intelligent engagement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Followers</div>
                <div className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Growth Rate</div>
                <div className="text-2xl font-bold">{stats.followerGrowth.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Engagement Rate</div>
                <div className="text-2xl font-bold">{stats.engagementRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Completed Tasks</div>
                <div className="text-2xl font-bold">{stats.completedTasks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Active Campaigns</div>
                <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Growth Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleAutomation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
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
                onClick={createCampaign}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Target className="w-4 h-4" />
                Create Campaign
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
              Avg Time: {stats.averageTime.toFixed(1)}s |
              Humanization: {config.humanizationLevel}%
            </span>
          </div>
        </div>

        {/* Platforms and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Platforms</h3>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatform?.id === platform.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${platform.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <h4 className="font-semibold">{platform.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPlatformTypeColor(platform.type)}`}>
                        {platform.type}
                      </span>
                      <span className="text-xs text-gray-400">Priority: {platform.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Daily Likes:</span> {platform.limits.dailyLikes}
                    </div>
                    <div>
                      <span className="text-gray-400">Daily Comments:</span> {platform.limits.dailyComments}
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Growth:</span> {platform.growth.averageFollowersPerDay}/day
                    </div>
                    <div>
                      <span className="text-gray-400">Engagement:</span> {platform.growth.averageEngagementRate}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {platform.features.likes && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Likes</span>
                      )}
                      {platform.features.comments && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Comments</span>
                      )}
                      {platform.features.follows && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Follows</span>
                      )}
                      {platform.features.stories && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Stories</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {platform.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Growth Tasks</h3>
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
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="executing">Executing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tasks.slice(0, 20).map((task) => {
                const platform = platforms.find(p => p.id === task.platformId);
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCampaign?.id === task.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${getTaskTypeColor(task.type)}`}>
                          {task.type.toUpperCase()}
                        </span>
                        <div>
                          <h4 className="font-semibold">{platform?.name}</h4>
                          <div className="text-sm text-gray-400">{task.personaId}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.timing.priority)}`}>
                          {task.timing.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.status === 'completed' ? 'bg-green-600' :
                          task.status === 'executing' ? 'bg-blue-600' :
                          task.status === 'failed' ? 'bg-red-600' :
                          task.status === 'pending' ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}>
                          {task.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Delete Task"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-3">
                      Target: {task.target.username || task.target.postId || 'Unknown'}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Scheduled:</span> {new Date(task.timing.scheduledFor).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-gray-400">Delay:</span> {task.timing.randomDelay}s
                      </div>
                      <div>
                        <span className="text-gray-400">Relevance:</span> {task.behavior.targeting.relevanceScore}%
                      </div>
                      <div>
                        <span className="text-gray-400">Engagement:</span> {task.behavior.targeting.engagementLikelihood}%
                      </div>
                    </div>

                    {task.content?.text && (
                      <div className="text-sm text-gray-400 mb-3">
                        Content: {task.content.text.substring(0, 100)}{task.content.text.length > 100 ? '...' : ''}
                      </div>
                    )}

                    {task.result && (
                      <div className="p-2 bg-gray-800 rounded text-sm">
                        <div className={`font-medium ${task.result.success ? 'text-green-400' : 'text-red-400'}`}>
                          {task.result.success ? 'Success' : 'Failed'}
                        </div>
                        <div className="text-gray-400">
                          Execution Time: {task.result.executionTime}s
                        </div>
                        {task.result.engagement && (
                          <div className="text-gray-400">
                            Engagement: {task.result.engagement.likes} likes, {task.result.engagement.comments} comments
                          </div>
                        )}
                        {task.result.error && (
                          <div className="text-red-400">
                            Error: {task.result.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No tasks found
              </div>
            )}
          </div>
        </div>

        {/* Growth Campaigns */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Growth Campaigns</h3>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{campaign.name}</h4>
                    <div className="text-sm text-gray-400">{campaign.personaId}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${campaign.isActive ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {campaign.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-400">
                      ROI: {campaign.performance.roi.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Duration:</span> {campaign.duration.totalDays} days
                  </div>
                  <div>
                    <span className="text-gray-400">Budget:</span> ${campaign.budget.spent}/${campaign.budget.totalBudget}
                  </div>
                  <div>
                    <span className="text-gray-400">Followers:</span> {campaign.performance.currentFollowers}/{campaign.performance.targetFollowers}
                  </div>
                  <div>
                    <span className="text-gray-400">Engagement:</span> {campaign.performance.currentEngagement.toFixed(1)}%
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(campaign.performance.currentFollowers / campaign.performance.targetFollowers) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Platforms:</span> {campaign.platforms.filter(p => p.enabled).length}
                  </div>
                  <div>
                    <span className="text-gray-400">Posts:</span> {campaign.performance.postsCreated}
                  </div>
                  <div>
                    <span className="text-gray-400">Total Engagement:</span> {campaign.performance.totalEngagement}
                  </div>
                  <div>
                    <span className="text-gray-400">Best Platform:</span> {campaign.performance.bestPerformingPlatform || 'None'}
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
              <h2 className="text-2xl font-bold mb-6">Growth Automation Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Humanization Level (%)</label>
                    <input
                      type="number"
                      value={config.humanizationLevel}
                      onChange={(e) => setConfig(prev => ({ ...prev, humanizationLevel: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automationEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, automationEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Automation Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.growthOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, growthOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Growth Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.crossPlatform}
                        onChange={(e) => setConfig(prev => ({ ...prev, crossPlatform: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Cross-Platform</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentGeneration}
                        onChange={(e) => setConfig(prev => ({ ...prev, contentGeneration: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Content Generation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.engagementAutomation}
                        onChange={(e) => setConfig(prev => ({ ...prev, engagementAutomation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Engagement Automation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.followerGrowth}
                        onChange={(e) => setConfig(prev => ({ ...prev, followerGrowth: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Follower Growth</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Behavior</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.randomizeTiming}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, randomizeTiming: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Randomize Timing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.varyPatterns}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, varyPatterns: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Vary Patterns</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.emotionalRange}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, emotionalRange: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Emotional Range</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.sleepSimulation}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, sleepSimulation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Sleep Simulation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Safety</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.safety.rateLimiting}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          safety: { ...prev.safety, rateLimiting: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Rate Limiting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.safety.proxyRotation}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          safety: { ...prev.safety, proxyRotation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Proxy Rotation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.safety.accountWarming}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          safety: { ...prev.safety, accountWarming: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Account Warming</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.safety.riskAssessment}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          safety: { ...prev.safety, riskAssessment: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Risk Assessment</span>
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

export default SocialGrowthAutomation;
