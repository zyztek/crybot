/**
 * Account Warming System Component
 *
 * Advanced account warming system with human-like social interactions
 * Simulates real user behavior across social networks and platforms
 */

import { Activity, Calendar, Heart, Pause, Play, Search, Settings, TrendingUp, Users, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SocialPlatform {
  id: string;
  name: string;
  type: 'social' | 'professional' | 'gaming' | 'forum' | 'content' | 'communication';
  url: string;
  features: {
    posting: boolean;
    commenting: boolean;
    liking: boolean;
    sharing: boolean;
    following: boolean;
    messaging: boolean;
    groups: boolean;
    stories: boolean;
  };
  behavior: {
    minPostsPerDay: number;
    maxPostsPerDay: number;
    minCommentsPerDay: number;
    maxCommentsPerDay: number;
    minLikesPerDay: number;
    maxLikesPerDay: number;
    postingHours: Array<number>;
    activeDays: Array<number>;
  };
  warming: {
    initialFollowers: number;
    targetFollowers: number;
    initialPosts: number;
    targetPosts: number;
    warmupPeriod: number; // days
    engagementRate: number; // target percentage
  };
  isActive: boolean;
  priority: number;
}

interface WarmingActivity {
  id: string;
  personaId: string;
  platformId: string;
  type: 'post' | 'comment' | 'like' | 'share' | 'follow' | 'message' | 'story' | 'group_join';
  content: {
    text?: string;
    media?: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
  };
  target?: {
    userId?: string;
    postId?: string;
    groupId?: string;
  };
  timing: {
    scheduledFor: string;
    executedAt?: string;
    delay: number; // minutes
    randomOffset: number; // minutes
  };
  behavior: {
    humanization: {
      typos: boolean;
      delays: boolean;
      variations: boolean;
      emotions: boolean;
    };
    engagement: {
      expectedLikes: number;
      expectedComments: number;
      expectedShares: number;
    };
  };
  status: 'scheduled' | 'executing' | 'completed' | 'failed' | 'cancelled';
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
  };
  createdAt: string;
}

interface WarmingSchedule {
  id: string;
  personaId: string;
  name: string;
  platforms: Array<{
    platformId: string;
    enabled: boolean;
    activities: Array<{
      type: WarmingActivity['type'];
      frequency: number; // per day
      timeWindows: Array<{
        start: string;
        end: string;
        priority: number;
      }>;
      contentThemes: string[];
      targetHashtags: string[];
    }>;
  }>;
  duration: {
    startDate: string;
    endDate: string;
    totalDays: number;
  };
  goals: {
    followerGrowth: number;
    engagementRate: number;
    postCount: number;
    activityConsistency: number;
  };
  isActive: boolean;
  progress: {
    currentDay: number;
    followersGained: number;
    postsCreated: number;
    engagementAchieved: number;
    consistencyScore: number;
  };
}

interface WarmingConfig {
  autoScheduling: boolean;
  humanization: boolean;
  contentGeneration: boolean;
  engagementTracking: boolean;
  adaptiveTiming: boolean;
  crossPlatform: boolean;
  safetyLimits: {
    maxDailyActivities: number;
    maxHourlyActivities: number;
    minDelayBetween: number; // minutes
    maxDelayBetween: number; // minutes
  };
  content: {
    useTemplates: boolean;
    generateVariations: boolean;
    includeMedia: boolean;
    useHashtags: boolean;
    targetLanguages: string[];
  };
  behavior: {
    simulateOffline: boolean;
    randomizePatterns: boolean;
    emotionalRange: boolean;
    personalityConsistency: boolean;
  };
}

const AccountWarmingSystem: React.FC = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [activities, setActivities] = useState<WarmingActivity[]>([]);
  const [schedules, setSchedules] = useState<WarmingSchedule[]>([]);
  const [config, setConfig] = useState<WarmingConfig>({
    autoScheduling: true,
    humanization: true,
    contentGeneration: true,
    engagementTracking: true,
    adaptiveTiming: true,
    crossPlatform: true,
    safetyLimits: {
      maxDailyActivities: 50,
      maxHourlyActivities: 10,
      minDelayBetween: 5,
      maxDelayBetween: 45
    },
    content: {
      useTemplates: true,
      generateVariations: true,
      includeMedia: true,
      useHashtags: true,
      targetLanguages: ['en', 'es', 'fr', 'de']
    },
    behavior: {
      simulateOffline: true,
      randomizePatterns: true,
      emotionalRange: true,
      personalityConsistency: true
    }
  });
  const [selectedSchedule, setSelectedSchedule] = useState<WarmingSchedule | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalActivities: 0,
    completedActivities: 0,
    failedActivities: 0,
    averageEngagement: 0,
    followerGrowth: 0,
    warmingProgress: 0,
    activePlatforms: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock social platforms initialization
  useEffect(() => {
    const mockPlatforms: SocialPlatform[] = [
      {
        id: '1',
        name: 'Twitter',
        type: 'social',
        url: 'https://twitter.com',
        features: {
          posting: true,
          commenting: true,
          liking: true,
          sharing: true,
          following: true,
          messaging: true,
          groups: false,
          stories: false
        },
        behavior: {
          minPostsPerDay: 2,
          maxPostsPerDay: 5,
          minCommentsPerDay: 5,
          maxCommentsPerDay: 15,
          minLikesPerDay: 10,
          maxLikesPerDay: 30,
          postingHours: [8, 9, 10, 12, 14, 16, 18, 20, 21, 22],
          activeDays: [1, 2, 3, 4, 5]
        },
        warming: {
          initialFollowers: 50,
          targetFollowers: 500,
          initialPosts: 10,
          targetPosts: 100,
          warmupPeriod: 30,
          engagementRate: 3.5
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Instagram',
        type: 'social',
        url: 'https://instagram.com',
        features: {
          posting: true,
          commenting: true,
          liking: true,
          sharing: true,
          following: true,
          messaging: true,
          groups: false,
          stories: true
        },
        behavior: {
          minPostsPerDay: 1,
          maxPostsPerDay: 3,
          minCommentsPerDay: 3,
          maxCommentsPerDay: 10,
          minLikesPerDay: 15,
          maxLikesPerDay: 50,
          postingHours: [7, 8, 12, 13, 17, 18, 19, 20],
          activeDays: [1, 2, 3, 4, 5, 6, 7]
        },
        warming: {
          initialFollowers: 25,
          targetFollowers: 1000,
          initialPosts: 5,
          targetPosts: 50,
          warmupPeriod: 45,
          engagementRate: 4.2
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'LinkedIn',
        type: 'professional',
        url: 'https://linkedin.com',
        features: {
          posting: true,
          commenting: true,
          liking: true,
          sharing: true,
          following: true,
          messaging: true,
          groups: true,
          stories: false
        },
        behavior: {
          minPostsPerDay: 1,
          maxPostsPerDay: 2,
          minCommentsPerDay: 2,
          maxCommentsPerDay: 5,
          minLikesPerDay: 5,
          maxLikesPerDay: 15,
          postingHours: [9, 10, 11, 14, 15, 16, 17],
          activeDays: [1, 2, 3, 4, 5]
        },
        warming: {
          initialFollowers: 100,
          targetFollowers: 500,
          initialPosts: 3,
          targetPosts: 30,
          warmupPeriod: 60,
          engagementRate: 2.8
        },
        isActive: true,
        priority: 3
      },
      {
        id: '4',
        name: 'Reddit',
        type: 'forum',
        url: 'https://reddit.com',
        features: {
          posting: true,
          commenting: true,
          liking: true,
          sharing: false,
          following: false,
          messaging: false,
          groups: true,
          stories: false
        },
        behavior: {
          minPostsPerDay: 1,
          maxPostsPerDay: 3,
          minCommentsPerDay: 5,
          maxCommentsPerDay: 20,
          minLikesPerDay: 10,
          maxLikesPerDay: 40,
          postingHours: [10, 11, 14, 15, 19, 20, 21, 22],
          activeDays: [1, 2, 3, 4, 5, 6, 7]
        },
        warming: {
          initialFollowers: 10,
          targetFollowers: 200,
          initialPosts: 2,
          targetPosts: 40,
          warmupPeriod: 30,
          engagementRate: 5.1
        },
        isActive: true,
        priority: 4
      }
    ];

    setPlatforms(mockPlatforms);
  }, []);

  // Mock warming schedules initialization
  useEffect(() => {
    const mockSchedules: WarmingSchedule[] = [
      {
        id: 'schedule-1',
        personaId: 'persona-1',
        name: 'Crypto Enthusiast Warming',
        platforms: [
          {
            platformId: '1',
            enabled: true,
            activities: [
              {
                type: 'post',
                frequency: 3,
                timeWindows: [
                  { start: '09:00', end: '10:00', priority: 1 },
                  { start: '14:00', end: '15:00', priority: 2 },
                  { start: '20:00', end: '21:00', priority: 1 }
                ],
                contentThemes: ['crypto', 'blockchain', 'trading', 'market analysis'],
                targetHashtags: ['#crypto', '#bitcoin', '#ethereum', '#trading', '#defi']
              },
              {
                type: 'comment',
                frequency: 8,
                timeWindows: [
                  { start: '10:00', end: '11:00', priority: 2 },
                  { start: '15:00', end: '16:00', priority: 1 }
                ],
                contentThemes: ['crypto discussion', 'market trends', 'technical analysis'],
                targetHashtags: []
              },
              {
                type: 'like',
                frequency: 25,
                timeWindows: [
                  { start: '09:00', end: '22:00', priority: 3 }
                ],
                contentThemes: [],
                targetHashtags: []
              }
            ]
          },
          {
            platformId: '2',
            enabled: true,
            activities: [
              {
                type: 'post',
                frequency: 2,
                timeWindows: [
                  { start: '08:00', end: '09:00', priority: 1 },
                  { start: '18:00', end: '19:00', priority: 1 }
                ],
                contentThemes: ['crypto lifestyle', 'trading setup', 'portfolio updates'],
                targetHashtags: ['#cryptolife', '#trader', '#portfolio', '#crypto']
              }
            ]
          }
        ],
        duration: {
          startDate: '2024-01-01',
          endDate: '2024-03-01',
          totalDays: 60
        },
        goals: {
          followerGrowth: 400,
          engagementRate: 3.5,
          postCount: 150,
          activityConsistency: 85
        },
        isActive: true,
        progress: {
          currentDay: 15,
          followersGained: 125,
          postsCreated: 45,
          engagementAchieved: 3.2,
          consistencyScore: 88
        }
      }
    ];

    setSchedules(mockSchedules);
  }, []);

  // Mock activities initialization
  useEffect(() => {
    const mockActivities: WarmingActivity[] = [
      {
        id: 'activity-1',
        personaId: 'persona-1',
        platformId: '1',
        type: 'post',
        content: {
          text: 'Just discovered an amazing DeFi protocol with impressive yields! The future of finance is here 🚀 #DeFi #Crypto #YieldFarming',
          hashtags: ['#DeFi', '#Crypto', '#YieldFarming'],
          links: ['https://defiprotocol.example.com']
        },
        timing: {
          scheduledFor: new Date(Date.now() + 3600000).toISOString(),
          delay: 15,
          randomOffset: 5
        },
        behavior: {
          humanization: {
            typos: false,
            delays: true,
            variations: true,
            emotions: true
          },
          engagement: {
            expectedLikes: 15,
            expectedComments: 3,
            expectedShares: 2
          }
        },
        status: 'scheduled',
        createdAt: new Date().toISOString()
      },
      {
        id: 'activity-2',
        personaId: 'persona-1',
        platformId: '1',
        type: 'comment',
        content: {
          text: 'Great analysis! I\'ve been watching this pattern too. The support level at $42k seems crucial for the next move.',
          mentions: ['@crypto_analyst']
        },
        target: {
          postId: 'post-12345'
        },
        timing: {
          scheduledFor: new Date(Date.now() + 1800000).toISOString(),
          delay: 8,
          randomOffset: 3
        },
        behavior: {
          humanization: {
            typos: false,
            delays: true,
            variations: true,
            emotions: false
          },
          engagement: {
            expectedLikes: 5,
            expectedComments: 1,
            expectedShares: 0
          }
        },
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }
    ];

    setActivities(mockActivities);
  }, []);

  // Auto scheduling simulation
  useEffect(() => {
    if (!config.autoScheduling || !isRunning) return;

    const interval = setInterval(() => {
      // Generate new activities based on schedules
      schedules.forEach(schedule => {
        if (!schedule.isActive) return;

        schedule.platforms.forEach(platform => {
          if (!platform.enabled) return;

          platform.activities.forEach(activityConfig => {
            if (Math.random() > 0.3) return; // 70% chance to generate

            const platformData = platforms.find(p => p.id === platform.platformId);
            if (!platformData) return;
  // Activity execution simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.status === 'scheduled' && new Date(activity.timing.scheduledFor) <= new Date()) {
          // Execute activity
          const success = Math.random() > 0.1; // 90% success rate

          return {
            ...activity,
            status: 'executing',
            timing: {
              ...activity.timing,
              executedAt: new Date().toISOString()
            }
          };
        }

        if (activity.status === 'executing') {
          // Complete execution after random time
          setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            const engagement = success ? {
              likes: Math.floor(Math.random() * activity.behavior.engagement.expectedLikes * 1.5),
              comments: Math.floor(Math.random() * activity.behavior.engagement.expectedComments * 1.2),
              shares: Math.floor(Math.random() * activity.behavior.engagement.expectedShares * 1.3)
            } : undefined;

            setActivities(prev => prev.map(a =>
              a.id === activity.id
                ? {
                    ...a,
                    status: success ? 'completed' : 'failed',
                    result: {
                      success,
                      engagement,
                      error: success ? undefined : 'Platform error occurred',
                      executionTime: Math.random() * 10 + 2
                    }
                  }
                : a
            ));

            // Update schedule progress
            if (success) {
              setSchedules(prev => prev.map(schedule =>
                schedule.personaId === activity.personaId
                  ? {
                      ...schedule,
                      progress: {
                        ...schedule.progress,
                        postsCreated: schedule.progress.postsCreated + (activity.type === 'post' ? 1 : 0),
                        engagementAchieved: schedule.progress.engagementAchieved + (engagement?.likes || 0) * 0.1
                      }
                    }
                  : schedule
              ));
            }
          }, Math.random() * 5000 + 2000);
        }

        return activity;
      }));
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  // Update stats
  useEffect(() => {
    const completedActivities = activities.filter(a => a.status === 'completed').length;
    const failedActivities = activities.filter(a => a.status === 'failed').length;
    const averageEngagement = activities.filter(a => a.result?.engagement).length > 0
      ? activities.reduce((sum, a) => sum + (a.result?.engagement?.likes || 0), 0) / activities.filter(a => a.result?.engagement).length
      : 0;
    const followerGrowth = schedules.reduce((sum, s) => sum + s.progress.followersGained, 0);
    const warmingProgress = schedules.length > 0
      ? schedules.reduce((sum, s) => sum + (s.progress.currentDay / s.duration.totalDays), 0) / schedules.length * 100
      : 0;
    const activePlatforms = platforms.filter(p => p.isActive).length;

    setStats({
      totalActivities: activities.length,
      completedActivities,
      failedActivities,
      averageEngagement,
      followerGrowth,
      warmingProgress,
      activePlatforms
    });
  }, [activities, schedules, platforms]);

  const generateContent = (type: WarmingActivity['type'], themes: string[], hashtags: string[]) => {
    const contentTemplates = {
      post: [
        `Just checking out the latest trends in ${themes[0]}. What are your thoughts? ${hashtags[0]}`,
        `Amazing developments in the ${themes[1]} space today! ${hashtags[1]}`,
        `The future of ${themes[0]} is looking bright. Can't wait to see what happens next! ${hashtags[0]}`,
        `Working on something exciting related to ${themes[1]}. Stay tuned! ${hashtags[1]}`
      ],
      comment: [
        `Great point about ${themes[0]}! I've been thinking the same thing.`,
        `Interesting perspective on ${themes[1]}. Have you considered the latest developments?`,
        `This reminds me of what I've been seeing in the ${themes[0]} community.`,
        `Completely agree! The ${themes[1]} space is evolving so fast.`
      ],
      like: [],
      share: [],
      follow: [],
      message: [],
      story: [],
      group_join: []
    };

    const template = contentTemplates[type]?.[Math.floor(Math.random() * contentTemplates[type].length)] || '';

    // Add humanization
    let humanizedContent = template;
    if (config.humanization && Math.random() > 0.8) {
      // Add occasional typo
      humanizedContent = humanizedContent.replace(/\b(the)\b/gi, 'teh').replace(/\b(and)\b/gi, 'adn');
    }

    return {
      text: humanizedContent,
      hashtags: type === 'post' ? hashtags : [],
      mentions: type === 'comment' ? [`@user_${Math.floor(Math.random() * 1000)}`] : []
    };
  };

  const toggleWarming = () => {
    setIsRunning(!isRunning);
  };

  const createSchedule = () => {
    const newSchedule: WarmingSchedule = {
      id: `schedule-${Date.now()}`,
      personaId: 'persona-1',
      name: `New Warming Schedule ${schedules.length + 1}`,
      platforms: [
        {
          platformId: '1',
          enabled: true,
          activities: [
            {
              type: 'post',
              frequency: 2,
              timeWindows: [
                { start: '09:00', end: '10:00', priority: 1 },
                { start: '18:00', end: '19:00', priority: 1 }
              ],
              contentThemes: ['general', 'lifestyle'],
              targetHashtags: ['#lifestyle', '#daily']
            }
          ]
        }
      ],
      duration: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        totalDays: 30
      },
      goals: {
        followerGrowth: 100,
        engagementRate: 2.5,
        postCount: 60,
        activityConsistency: 80
      },
      isActive: true,
      progress: {
        currentDay: 0,
        followersGained: 0,
        postsCreated: 0,
        engagementAchieved: 0,
        consistencyScore: 0
      }
    };

    setSchedules(prev => [...prev, newSchedule]);
  };

  const deleteActivity = (activityId: string) => {
    setActivities(prev => prev.filter(a => a.id !== activityId));
  };

  const getPlatformTypeColor = (type: SocialPlatform['type']) => {
    switch (type) {
      case 'social': return 'bg-blue-600';
      case 'professional': return 'bg-purple-600';
      case 'gaming': return 'bg-green-600';
      case 'forum': return 'bg-orange-600';
      case 'content': return 'bg-pink-600';
      case 'communication': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getActivityTypeColor = (type: WarmingActivity['type']) => {
    switch (type) {
      case 'post': return 'bg-blue-600';
      case 'comment': return 'bg-green-600';
      case 'like': return 'bg-red-600';
      case 'share': return 'bg-purple-600';
      case 'follow': return 'bg-yellow-600';
      case 'message': return 'bg-orange-600';
      case 'story': return 'bg-pink-600';
      case 'group_join': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: WarmingActivity['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-600';
      case 'executing': return 'bg-blue-600';
      case 'completed': return 'bg-green-600';
      case 'failed': return 'bg-red-600';
      case 'cancelled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredActivities = () => {
    return activities.filter(activity => {
      const matchesSearch = activity.content.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = filterPlatform === 'all' || activity.platformId === filterPlatform;
      const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Account Warming System
          </h1>
          <p className="text-gray-400">
            Advanced account warming system with human-like social interactions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Activities</div>
                <div className="text-2xl font-bold">{stats.totalActivities}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-2xl font-bold">{stats.completedActivities}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Engagement</div>
                <div className="text-2xl font-bold">{stats.averageEngagement.toFixed(1)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Follower Growth</div>
                <div className="text-2xl font-bold">{stats.followerGrowth}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Warming Progress</div>
                <div className="text-2xl font-bold">{stats.warmingProgress.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Warming Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleWarming}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Warming
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Warming
                  </>
                )}
              </button>
              <button
                onClick={createSchedule}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Create Schedule
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
              Active Platforms: {stats.activePlatforms} |
              Progress: {stats.warmingProgress.toFixed(1)}% |
              Auto Scheduling: {config.autoScheduling ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Platforms and Activities */}
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
                      <span className="text-gray-400">Posts/Day:</span> {platform.behavior.minPostsPerDay}-{platform.behavior.maxPostsPerDay}
                    </div>
                    <div>
                      <span className="text-gray-400">Target Followers:</span> {platform.warming.targetFollowers}
                    </div>
                    <div>
                      <span className="text-gray-400">Warmup Period:</span> {platform.warming.warmupPeriod} days
                    </div>
                    <div>
                      <span className="text-gray-400">Engagement Rate:</span> {platform.warming.engagementRate}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {platform.features.posting && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Posting</span>
                      )}
                      {platform.features.commenting && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Comments</span>
                      )}
                      {platform.features.liking && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Likes</span>
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
            <h3 className="text-lg font-semibold mb-4">Warming Activities</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search activities..."
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
                <option value="scheduled">Scheduled</option>
                <option value="executing">Executing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {getFilteredActivities().map((activity) => {
                const platform = platforms.find(p => p.id === activity.platformId);
                return (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSchedule?.id === activity.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${getActivityTypeColor(activity.type)}`}>
                          {activity.type.toUpperCase()}
                        </span>
                        <div>
                          <h4 className="font-semibold">{platform?.name}</h4>
                          <div className="text-sm text-gray-400">{activity.personaId}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => deleteActivity(activity.id)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Delete"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-3">
                      {activity.content.text?.substring(0, 100)}{activity.content.text && activity.content.text.length > 100 ? '...' : ''}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Scheduled:</span> {new Date(activity.timing.scheduledFor).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-gray-400">Delay:</span> {activity.timing.delay}min
                      </div>
                      <div>
                        <span className="text-gray-400">Expected Likes:</span> {activity.behavior.engagement.expectedLikes}
                      </div>
                      <div>
                        <span className="text-gray-400">Humanization:</span> {activity.behavior.humanization.delays ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>

                    {activity.result && (
                      <div className="p-2 bg-gray-800 rounded text-sm">
                        <div className={`font-medium ${activity.result.success ? 'text-green-400' : 'text-red-400'}`}>
                          {activity.result.success ? '✓ Success' : '✗ Failed'}
                        </div>
                        <div className="text-gray-400">
                          Execution Time: {activity.result.executionTime.toFixed(1)}s
                        </div>
                        {activity.result.engagement && (
                          <div className="text-gray-400">
                            Engagement: {activity.result.engagement.likes} likes, {activity.result.engagement.comments} comments
                          </div>
                        )}
                        {activity.result.error && (
                          <div className="text-red-400">
                            Error: {activity.result.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {getFilteredActivities().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No activities found
              </div>
            )}
          </div>
        </div>

        {/* Warming Schedules */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Warming Schedules</h3>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{schedule.name}</h4>
                    <div className="text-sm text-gray-400">{schedule.personaId}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${schedule.isActive ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {schedule.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-400">
                      Day {schedule.progress.currentDay}/{schedule.duration.totalDays}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Duration:</span> {schedule.duration.totalDays} days
                  </div>
                  <div>
                    <span className="text-gray-400">Progress:</span> {((schedule.progress.currentDay / schedule.duration.totalDays) * 100).toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Followers Gained:</span> {schedule.progress.followersGained}/{schedule.goals.followerGrowth}
                  </div>
                  <div>
                    <span className="text-gray-400">Posts Created:</span> {schedule.progress.postsCreated}/{schedule.goals.postCount}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(schedule.progress.currentDay / schedule.duration.totalDays) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Engagement:</span>
                    <span className={schedule.progress.engagementAchieved >= schedule.goals.engagementRate ? 'text-green-400' : 'text-yellow-400'}>
                      {schedule.progress.engagementAchieved.toFixed(1)}%/{schedule.goals.engagementRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Consistency:</span> {schedule.progress.consistencyScore}%
                  </div>
                  <div>
                    <span className="text-gray-400">Platforms:</span> {schedule.platforms.filter(p => p.enabled).length}
                  </div>
                  <div>
                    <span className="text-gray-400">Activities:</span> {schedule.platforms.reduce((sum, p) => sum + p.activities.length, 0)}
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
              <h2 className="text-2xl font-bold mb-6">Warming System Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Daily Activities</label>
                    <input
                      type="number"
                      value={config.safetyLimits.maxDailyActivities}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        safetyLimits: { ...prev.safetyLimits, maxDailyActivities: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Hourly Activities</label>
                    <input
                      type="number"
                      value={config.safetyLimits.maxHourlyActivities}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        safetyLimits: { ...prev.safetyLimits, maxHourlyActivities: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoScheduling}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoScheduling: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Scheduling</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.humanization}
                        onChange={(e) => setConfig(prev => ({ ...prev, humanization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Humanization</span>
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
                        checked={config.adaptiveTiming}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptiveTiming: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Adaptive Timing</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Behavior</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.simulateOffline}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, simulateOffline: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Simulate Offline</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.behavior.randomizePatterns}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, randomizePatterns: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Randomize Patterns</span>
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
                        checked={config.behavior.personalityConsistency}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          behavior: { ...prev.behavior, personalityConsistency: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Personality Consistency</span>
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

export default AccountWarmingSystem;
