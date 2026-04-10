/**
 * Live Video System Component
 * 
 * Build live video and phone call system with voice synthesis and real-time generation
 * Enables real-time video calls, phone calls, and live streaming with AI-generated avatars
 */

import React, { useState, useEffect, useRef } from 'react';
import { Video, Phone, Mic, Camera, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Zap, MessageCircle, Volume2 } from 'lucide-react';

interface LiveSession {
  id: string;
  name: string;
  type: 'video_call' | 'phone_call' | 'live_stream' | 'video_conference' | 'webinar' | 'private_show' | 'group_call' | 'broadcast';
  status: 'preparing' | 'active' | 'connected' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  participants: {
    host: {
      personaId: string;
      avatarId: string;
      name: string;
      role: 'host' | 'moderator' | 'presenter' | 'performer';
      camera: boolean;
      microphone: boolean;
      screenShare: boolean;
    };
    guests: Array<{
      id: string;
      personaId?: string;
      name: string;
      role: 'guest' | 'viewer' | 'participant' | 'client';
      joinedAt: string;
      camera: boolean;
      microphone: boolean;
      screenShare: boolean;
      avatar?: string;
    }>;
  };
  technology: {
    videoCodec: string;
    audioCodec: string;
    resolution: string;
    frameRate: number;
    bitrate: string;
    latency: number; // ms
    protocol: 'webrtc' | 'rtmp' | 'hls' | 'sip' | 'custom';
    encryption: boolean;
    quality: 'low' | 'medium' | 'high' | 'ultra' | 'cinema';
  };
  avatar: {
    modelId: string;
    isActive: boolean;
    realism: number; // 0-100
    lipSync: boolean;
    emotionDetection: boolean;
    backgroundRemoval: boolean;
    virtualBackground: string;
    filters: string[];
    animations: string[];
  };
  voice: {
    synthesis: boolean;
    model: string;
    language: string;
    accent: string;
    tone: string;
    pitch: number;
    speed: number;
    emotion: boolean;
    realTime: boolean;
    naturalness: number; // 0-100
  };
  features: {
    recording: boolean;
    chat: boolean;
    screenShare: boolean;
    whiteboard: boolean;
    fileSharing: boolean;
    polls: boolean;
    reactions: boolean;
    breakoutRooms: boolean;
    aiAssistance: boolean;
  };
  performance: {
    uptime: number; // seconds
    videoQuality: number; // 0-100
    audioQuality: number; // 0-100
    connectionStability: number; // 0-100
    cpuUsage: number; // 0-100
    memoryUsage: number; // 0-100
    networkUsage: string;
    droppedFrames: number;
    latency: number; // ms
  };
  monetization: {
    type: 'free' | 'paid' | 'premium' | 'subscription' | 'pay_per_minute' | 'donation';
    rate: number;
    currency: string;
    duration: number; // minutes
    totalRevenue: number;
    tips: number;
    gifts: number;
  };
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  duration: number; // seconds
}

interface VideoTemplate {
  id: string;
  name: string;
  category: 'business' | 'entertainment' | 'education' | 'social' | 'adult' | 'gaming' | 'fitness' | 'custom';
  description: string;
  type: LiveSession['type'];
  preset: {
    maxParticipants: number;
    duration: number; // minutes
    quality: string;
    features: string[];
    monetization: {
      enabled: boolean;
      type: string;
      rate: number;
    };
  };
  avatar: {
    required: boolean;
    types: string[];
    realism: 'basic' | 'enhanced' | 'photorealistic' | 'ultra_realistic';
    animations: string[];
    backgrounds: string[];
  };
  popularity: number; // 0-100
  usage: number;
  rating: number; // 0-5
  createdBy: string;
  createdAt: string;
}

interface LiveVideoConfig {
  autoConnection: boolean;
  qualityOptimization: boolean;
  bandwidthManagement: boolean;
  voiceEnhancement: boolean;
  avatarIntegration: boolean;
  recording: boolean;
  streaming: {
    autoStart: boolean;
    platforms: string[];
    quality: 'auto' | 'low' | 'medium' | 'high' | 'ultra';
    bitrate: string;
    keyframeInterval: number;
    adaptiveBitrate: boolean;
  };
  voice: {
    noiseReduction: boolean;
    echoCancellation: boolean;
    autoGain: boolean;
    compression: boolean;
    enhancement: boolean;
    synthesis: boolean;
    realTime: boolean;
  };
  video: {
    autoFocus: boolean;
    lightCorrection: boolean;
    stabilization: boolean;
    backgroundBlur: boolean;
    virtualBackground: boolean;
    filters: boolean;
    enhancement: boolean;
  };
  security: {
    encryption: boolean;
    authentication: boolean;
    accessControl: boolean;
    recordingProtection: boolean;
    dataPrivacy: boolean;
    compliance: boolean;
  };
  performance: {
    maxLatency: number; // ms
    minQuality: number; // 0-100
    maxCpuUsage: number; // 0-100
    maxMemoryUsage: number; // 0-100
    adaptiveQuality: boolean;
    loadBalancing: boolean;
  };
}

const LiveVideoSystem: React.FC = () => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [config, setConfig] = useState<LiveVideoConfig>({
    autoConnection: true,
    qualityOptimization: true,
    bandwidthManagement: true,
    voiceEnhancement: true,
    avatarIntegration: true,
    recording: true,
    streaming: {
      autoStart: true,
      platforms: ['Twitch', 'YouTube', 'OnlyFans', 'Fansly'],
      quality: 'auto',
      bitrate: '5000kbps',
      keyframeInterval: 2,
      adaptiveBitrate: true
    },
    voice: {
      noiseReduction: true,
      echoCancellation: true,
      autoGain: true,
      compression: true,
      enhancement: true,
      synthesis: true,
      realTime: true
    },
    video: {
      autoFocus: true,
      lightCorrection: true,
      stabilization: true,
      backgroundBlur: true,
      virtualBackground: true,
      filters: true,
      enhancement: true
    },
    security: {
      encryption: true,
      authentication: true,
      accessControl: true,
      recordingProtection: true,
      dataPrivacy: true,
      compliance: true
    },
    performance: {
      maxLatency: 100,
      minQuality: 85,
      maxCpuUsage: 80,
      maxMemoryUsage: 70,
      adaptiveQuality: true,
      loadBalancing: true
    }
  });
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    totalParticipants: 0,
    averageQuality: 0,
    totalRevenue: 0,
    totalDuration: 0,
    bestTemplate: '',
    uptime: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock live sessions initialization
  useEffect(() => {
    const mockSessions: LiveSession[] = [
      {
        id: 'session-1',
        name: 'Luna Live Stream - Private Show',
        type: 'private_show',
        status: 'active',
        participants: {
          host: {
            personaId: 'persona-1',
            avatarId: 'avatar-1',
            name: 'Luna Star',
            role: 'performer',
            camera: true,
            microphone: true,
            screenShare: false
          },
          guests: [
            {
              id: 'guest-1',
              name: 'John Doe',
              role: 'client',
              joinedAt: new Date(Date.now() - 1800000).toISOString(),
              camera: false,
              microphone: false,
              screenShare: false
            },
            {
              id: 'guest-2',
              name: 'Jane Smith',
              role: 'client',
              joinedAt: new Date(Date.now() - 900000).toISOString(),
              camera: false,
              microphone: false,
              screenShare: false
            }
          ]
        },
        technology: {
          videoCodec: 'H.264',
          audioCodec: 'AAC',
          resolution: '1920x1080',
          frameRate: 60,
          bitrate: '8000kbps',
          latency: 45,
          protocol: 'webrtc',
          encryption: true,
          quality: 'ultra'
        },
        avatar: {
          modelId: 'model-1',
          isActive: true,
          realism: 96.5,
          lipSync: true,
          emotionDetection: true,
          backgroundRemoval: true,
          virtualBackground: 'luxury_bedroom',
          filters: ['beauty', 'smooth', 'enhance'],
          animations: ['dance', 'seductive', 'playful']
        },
        voice: {
          synthesis: true,
          model: 'neural_voice_v3',
          language: 'English',
          accent: 'neutral',
          tone: 'seductive',
          pitch: 1.0,
          speed: 1.0,
          emotion: true,
          realTime: true,
          naturalness: 94.2
        },
        features: {
          recording: true,
          chat: true,
          screenShare: false,
          whiteboard: false,
          fileSharing: false,
          polls: false,
          reactions: true,
          breakoutRooms: false,
          aiAssistance: true
        },
        performance: {
          uptime: 1800,
          videoQuality: 96.5,
          audioQuality: 94.2,
          connectionStability: 98.1,
          cpuUsage: 45.2,
          memoryUsage: 38.7,
          networkUsage: '8.5Mbps',
          droppedFrames: 2,
          latency: 45
        },
        monetization: {
          type: 'pay_per_minute',
          rate: 4.99,
          currency: 'USD',
          duration: 30,
          totalRevenue: 149.70,
          tips: 25.00,
          gifts: 15.00
        },
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        startedAt: new Date(Date.now() - 1800000).toISOString(),
        duration: 1800
      },
      {
        id: 'session-2',
        name: 'Business Video Conference - Team Meeting',
        type: 'video_conference',
        status: 'active',
        participants: {
          host: {
            personaId: 'persona-2',
            avatarId: 'avatar-2',
            name: 'Marcus Chen',
            role: 'host',
            camera: true,
            microphone: true,
            screenShare: true
          },
          guests: [
            {
              id: 'guest-3',
              personaId: 'persona-3',
              name: 'Sarah Johnson',
              role: 'participant',
              joinedAt: new Date(Date.now() - 1200000).toISOString(),
              camera: true,
              microphone: true,
              screenShare: false
            },
            {
              id: 'guest-4',
              personaId: 'persona-4',
              name: 'Mike Wilson',
              role: 'participant',
              joinedAt: new Date(Date.now() - 600000).toISOString(),
              camera: true,
              microphone: false,
              screenShare: false
            }
          ]
        },
        technology: {
          videoCodec: 'H.264',
          audioCodec: 'Opus',
          resolution: '1280x720',
          frameRate: 30,
          bitrate: '2000kbps',
          latency: 35,
          protocol: 'webrtc',
          encryption: true,
          quality: 'high'
        },
        avatar: {
          modelId: 'model-2',
          isActive: true,
          realism: 89.2,
          lipSync: true,
          emotionDetection: true,
          backgroundRemoval: true,
          virtualBackground: 'office_background',
          filters: ['professional', 'sharp'],
          animations: ['professional', 'engaged']
        },
        voice: {
          synthesis: true,
          model: 'business_voice_v2',
          language: 'English',
          accent: 'professional',
          tone: 'professional',
          pitch: 1.0,
          speed: 1.0,
          emotion: false,
          realTime: true,
          naturalness: 87.5
        },
        features: {
          recording: true,
          chat: true,
          screenShare: true,
          whiteboard: true,
          fileSharing: true,
          polls: true,
          reactions: false,
          breakoutRooms: true,
          aiAssistance: true
        },
        performance: {
          uptime: 1200,
          videoQuality: 89.2,
          audioQuality: 87.5,
          connectionStability: 95.3,
          cpuUsage: 32.1,
          memoryUsage: 28.4,
          networkUsage: '2.1Mbps',
          droppedFrames: 1,
          latency: 35
        },
        monetization: {
          type: 'free',
          rate: 0,
          currency: 'USD',
          duration: 60,
          totalRevenue: 0,
          tips: 0,
          gifts: 0
        },
        createdAt: new Date(Date.now() - 1200000).toISOString(),
        startedAt: new Date(Date.now() - 1200000).toISOString(),
        duration: 1200
      }
    ];

    setSessions(mockSessions);
  }, []);

  // Mock templates initialization
  useEffect(() => {
    const mockTemplates: VideoTemplate[] = [
      {
        id: 'template-1',
        name: 'Private Show Template',
        category: 'adult',
        description: 'Optimized template for private adult shows with avatar integration',
        type: 'private_show',
        preset: {
          maxParticipants: 1,
          duration: 30,
          quality: '1920x1080',
          features: ['recording', 'chat', 'reactions', 'ai_assistance'],
          monetization: {
            enabled: true,
            type: 'pay_per_minute',
            rate: 4.99
          }
        },
        avatar: {
          required: true,
          types: ['deepfake', 'photorealistic'],
          realism: 'ultra_realistic',
          animations: ['seductive', 'playful', 'dance'],
          backgrounds: ['luxury_bedroom', 'studio', 'beach']
        },
        popularity: 92.5,
        usage: 1250,
        rating: 4.8,
        createdBy: 'Adult Entertainment Studios',
        createdAt: '2024-01-05T00:00:00Z'
      },
      {
        id: 'template-2',
        name: 'Business Meeting Template',
        category: 'business',
        description: 'Professional template for business meetings and conferences',
        type: 'video_conference',
        preset: {
          maxParticipants: 10,
          duration: 60,
          quality: '1280x720',
          features: ['recording', 'chat', 'screen_share', 'whiteboard', 'file_sharing', 'polls'],
          monetization: {
            enabled: false,
            type: 'free',
            rate: 0
          }
        },
        avatar: {
          required: false,
          types: ['3d_model', 'professional'],
          realism: 'enhanced',
          animations: ['professional', 'engaged', 'presenting'],
          backgrounds: ['office_background', 'modern_office', 'neutral']
        },
        popularity: 78.3,
        usage: 890,
        rating: 4.5,
        createdBy: 'Business Solutions Inc',
        createdAt: '2024-01-08T00:00:00Z'
      }
    ];

    setTemplates(mockTemplates);
  }, []);

  // Auto session updates simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Update active sessions
      setSessions(prev => prev.map(session => {
        if (session.status === 'active' || session.status === 'in_progress') {
          const newDuration = session.duration + 30; // Add 30 seconds
          const newUptime = session.performance.uptime + 30;
          
          // Update performance metrics
          const videoQuality = Math.max(85, Math.min(100, session.performance.videoQuality + (Math.random() * 4 - 2)));
          const audioQuality = Math.max(80, Math.min(100, session.performance.audioQuality + (Math.random() * 4 - 2)));
          const cpuUsage = Math.max(20, Math.min(80, session.performance.cpuUsage + (Math.random() * 10 - 5)));
          
          // Update revenue for paid sessions
          let newRevenue = session.monetization.totalRevenue;
          if (session.monetization.type === 'pay_per_minute') {
            newRevenue += (session.monetization.rate / 60) * 0.5; // 30 seconds worth
          }
          
          return {
            ...session,
            duration: newDuration,
            performance: {
              ...session.performance,
              uptime: newUptime,
              videoQuality,
              audioQuality,
              cpuUsage,
              latency: Math.max(20, Math.min(100, session.performance.latency + (Math.random() * 10 - 5)))
            },
            monetization: {
              ...session.monetization,
              totalRevenue: newRevenue,
              duration: session.monetization.duration + 0.5
            }
          };
        }
        return session;
      }));

      // Simulate new guest joins
      setSessions(prev => prev.map(session => {
        if (session.status === 'active' && Math.random() > 0.9) { // 10% chance
          const newGuest = {
            id: `guest-${Date.now()}`,
            name: `Guest ${session.participants.guests.length + 1}`,
            role: session.type === 'private_show' ? 'client' : 'participant',
            joinedAt: new Date().toISOString(),
            camera: false,
            microphone: false,
            screenShare: false
          };
          
          return {
            ...session,
            participants: {
              ...session.participants,
              guests: [...session.participants.guests, newGuest]
            }
          };
        }
        return session;
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isOperating]);

  // Auto session creation simulation
  useEffect(() => {
    if (!config.autoConnection || !isOperating) return;

    const interval = setInterval(() => {
      // Create new sessions
      if (Math.random() > 0.8) { // 20% chance
        const types: LiveSession['type'][] = ['video_call', 'phone_call', 'live_stream', 'private_show'];
        const newSession: LiveSession = {
          id: `session-${Date.now()}`,
          name: `Auto Session ${sessions.length + 1}`,
          type: types[Math.floor(Math.random() * types.length)],
          status: 'preparing',
          participants: {
            host: {
              personaId: `persona-${Date.now()}`,
              avatarId: `avatar-${Date.now()}`,
              name: 'Auto Host',
              role: 'host',
              camera: true,
              microphone: true,
              screenShare: false
            },
            guests: []
          },
          technology: {
            videoCodec: 'H.264',
            audioCodec: 'AAC',
            resolution: '1280x720',
            frameRate: 30,
            bitrate: '2000kbps',
            latency: 50,
            protocol: 'webrtc',
            encryption: true,
            quality: 'high'
          },
          avatar: {
            modelId: `model-${Date.now()}`,
            isActive: true,
            realism: Math.random() * 20 + 80,
            lipSync: true,
            emotionDetection: true,
            backgroundRemoval: true,
            virtualBackground: 'virtual_office',
            filters: ['basic'],
            animations: ['professional']
          },
          voice: {
            synthesis: true,
            model: 'auto_voice_v1',
            language: 'English',
            accent: 'neutral',
            tone: 'friendly',
            pitch: 1.0,
            speed: 1.0,
            emotion: true,
            realTime: true,
            naturalness: Math.random() * 15 + 80
          },
          features: {
            recording: true,
            chat: true,
            screenShare: false,
            whiteboard: false,
            fileSharing: false,
            polls: false,
            reactions: true,
            breakoutRooms: false,
            aiAssistance: true
          },
          performance: {
            uptime: 0,
            videoQuality: 90,
            audioQuality: 88,
            connectionStability: 95,
            cpuUsage: 30,
            memoryUsage: 25,
            networkUsage: '2.0Mbps',
            droppedFrames: 0,
            latency: 50
          },
          monetization: {
            type: Math.random() > 0.5 ? 'pay_per_minute' : 'free',
            rate: Math.random() * 5 + 1,
            currency: 'USD',
            duration: 30,
            totalRevenue: 0,
            tips: 0,
            gifts: 0
          },
          createdAt: new Date().toISOString(),
          duration: 0
        };

        setSessions(prev => [...prev, newSession]);

        // Simulate session start
        setTimeout(() => {
          setSessions(prev => prev.map(s => 
            s.id === newSession.id 
              ? {
                  ...s,
                  status: 'active',
                  startedAt: new Date().toISOString()
                }
              : s
          ));
        }, 5000); // 5 seconds preparation
      }
    }, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, [config.autoConnection, isOperating]);

  // Update stats
  useEffect(() => {
    const activeSessions = sessions.filter(s => s.status === 'active' || s.status === 'in_progress').length;
    const totalParticipants = sessions.reduce((sum, s) => sum + 1 + s.participants.guests.length, 0);
    const averageQuality = sessions.length > 0 
      ? sessions.reduce((sum, s) => sum + (s.performance.videoQuality + s.performance.audioQuality) / 2, 0) / sessions.length 
      : 0;
    const totalRevenue = sessions.reduce((sum, s) => sum + s.monetization.totalRevenue, 0);
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const uptime = sessions.reduce((sum, s) => sum + s.performance.uptime, 0);
    
    const templateCounts = templates.reduce((acc, template) => {
      acc[template.name] = (acc[template.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestTemplate = Object.entries(templateCounts).reduce((best, [template, count]) => 
      count > (best?.count || 0) ? { template, count } : best, null as { template: string; count: number } | null);

    setStats({
      totalSessions: sessions.length,
      activeSessions,
      totalParticipants,
      averageQuality,
      totalRevenue,
      totalDuration,
      bestTemplate: bestTemplate?.template || '',
      uptime
    });
  }, [sessions, templates]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const startSession = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    const newSession: LiveSession = {
      id: `session-${Date.now()}`,
      name: `${template.name} - ${new Date().toLocaleTimeString()}`,
      type: template.type,
      status: 'preparing',
      participants: {
        host: {
          personaId: `persona-${Date.now()}`,
          avatarId: `avatar-${Date.now()}`,
          name: 'Session Host',
          role: 'host',
          camera: true,
          microphone: true,
          screenShare: template.preset.features.includes('screen_share')
        },
        guests: []
      },
      technology: {
        videoCodec: 'H.264',
        audioCodec: 'AAC',
        resolution: template.preset.quality,
        frameRate: 30,
        bitrate: '2000kbps',
        latency: 50,
        protocol: 'webrtc',
        encryption: true,
        quality: 'high'
      },
      avatar: {
        modelId: `model-${Date.now()}`,
        isActive: template.avatar.required,
        realism: template.avatar.realism === 'ultra_realistic' ? 96 : 
                template.avatar.realism === 'photorealistic' ? 90 : 
                template.avatar.realism === 'enhanced' ? 80 : 70,
        lipSync: true,
        emotionDetection: true,
        backgroundRemoval: true,
        virtualBackground: template.avatar.backgrounds[0],
        filters: ['basic'],
        animations: template.avatar.animations.slice(0, 2)
      },
      voice: {
        synthesis: true,
        model: 'session_voice_v1',
        language: 'English',
        accent: 'neutral',
        tone: 'friendly',
        pitch: 1.0,
        speed: 1.0,
        emotion: true,
        realTime: true,
        naturalness: 85
      },
      features: {
        recording: template.preset.features.includes('recording'),
        chat: template.preset.features.includes('chat'),
        screenShare: template.preset.features.includes('screen_share'),
        whiteboard: template.preset.features.includes('whiteboard'),
        fileSharing: template.preset.features.includes('file_sharing'),
        polls: template.preset.features.includes('polls'),
        reactions: template.preset.features.includes('reactions'),
        breakoutRooms: template.preset.features.includes('breakout_rooms'),
        aiAssistance: template.preset.features.includes('ai_assistance')
      },
      performance: {
        uptime: 0,
        videoQuality: 90,
        audioQuality: 88,
        connectionStability: 95,
        cpuUsage: 30,
        memoryUsage: 25,
        networkUsage: '2.0Mbps',
        droppedFrames: 0,
        latency: 50
      },
      monetization: {
        type: template.monetization.type as any,
        rate: template.monetization.rate,
        currency: 'USD',
        duration: template.preset.duration,
        totalRevenue: 0,
        tips: 0,
        gifts: 0
      },
      createdAt: new Date().toISOString(),
      duration: 0
    };

    setSessions(prev => [...prev, newSession]);

    // Simulate session start
    setTimeout(() => {
      setSessions(prev => prev.map(s => 
        s.id === newSession.id 
          ? {
              ...s,
              status: 'active',
              startedAt: new Date().toISOString()
            }
          : s
      ));
    }, 3000); // 3 seconds preparation
  };

  const endSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? {
            ...session,
            status: 'completed',
            endedAt: new Date().toISOString()
          }
        : session
    ));
  };

  const getTypeColor = (type: LiveSession['type']) => {
    switch (type) {
      case 'video_call': return 'bg-blue-600';
      case 'phone_call': return 'bg-green-600';
      case 'live_stream': return 'bg-purple-600';
      case 'video_conference': return 'bg-orange-600';
      case 'webinar': return 'bg-yellow-600';
      case 'private_show': return 'bg-pink-600';
      case 'group_call': return 'bg-cyan-600';
      case 'broadcast': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: LiveSession['status']) => {
    switch (status) {
      case 'preparing': return 'bg-blue-600';
      case 'active': return 'bg-green-600';
      case 'connected': return 'bg-purple-600';
      case 'in_progress': return 'bg-yellow-600';
      case 'completed': return 'bg-gray-600';
      case 'failed': return 'bg-red-600';
      case 'cancelled': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredSessions = () => {
    return sessions.filter(session => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.participants.host.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || session.type === filterType;
      const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Video className="w-8 h-8 text-purple-400" />
            Live Video System
          </h1>
          <p className="text-gray-400">
            Build live video and phone call system with voice synthesis and real-time generation
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Sessions</div>
                <div className="text-2xl font-bold">{stats.totalSessions}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeSessions}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Participants</div>
                <div className="text-2xl font-bold">{stats.totalParticipants}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Quality</div>
                <div className="text-2xl font-bold">{stats.averageQuality.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Revenue</div>
                <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Live Video Operations</h2>
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
                    Stop System
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start System
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
              Best Template: {stats.bestTemplate || 'None'} | 
              Total Duration: {(stats.totalDuration / 3600).toFixed(1)}h | 
              System: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Live Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Live Sessions</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="video_call">Video Call</option>
                <option value="phone_call">Phone Call</option>
                <option value="live_stream">Live Stream</option>
                <option value="private_show">Private Show</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="preparing">Preparing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredSessions().map((session) => (
                <div
                  key={session.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSession?.id === session.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 
                        session.status === 'preparing' ? 'bg-blue-500' : 
                        session.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="font-semibold">{session.name}</h4>
                        <div className="text-sm text-gray-400">{session.type.replace('_', ' ')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(session.type)}`}>
                        {session.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(session.status)}`}>
                        {session.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Host:</span> {session.participants.host.name}
                    </div>
                    <div>
                      <span className="text-gray-400">Guests:</span> {session.participants.guests.length}
                    </div>
                    <div>
                      <span className="text-gray-400">Quality:</span> {session.performance.videoQuality.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span> {Math.floor(session.duration / 60)}m
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${session.performance.videoQuality}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Revenue: ${session.monetization.totalRevenue.toFixed(2)} | 
                        Latency: {session.performance.latency}ms
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.status === 'active' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            endSession(session.id);
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                        >
                          End
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredSessions().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No sessions found
              </div>
            )}
          </div>

          {/* Selected Session Details */}
          {selectedSession && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Session Details: {selectedSession.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Session Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedSession.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedSession.status)}`}>
                          {selectedSession.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium">{Math.floor(selectedSession.duration / 60)}m {selectedSession.duration % 60}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className="font-medium">
                          {selectedSession.startedAt ? new Date(selectedSession.startedAt).toLocaleTimeString() : 'Not started'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Video Quality:</span>
                        <span className="font-medium">{selectedSession.performance.videoQuality.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Audio Quality:</span>
                        <span className="font-medium">{selectedSession.performance.audioQuality.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Latency:</span>
                        <span className="font-medium">{selectedSession.performance.latency}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Usage:</span>
                        <span className="font-medium">{selectedSession.performance.cpuUsage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Technology</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resolution:</span>
                        <span className="font-medium">{selectedSession.technology.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Frame Rate:</span>
                        <span className="font-medium">{selectedSession.technology.frameRate}fps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Protocol:</span>
                        <span className="font-medium">{selectedSession.technology.protocol.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Encryption:</span>
                        <span className="font-medium">{selectedSession.technology.encryption ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Monetization</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedSession.monetization.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate:</span>
                        <span className="font-medium">${selectedSession.monetization.rate}/{selectedSession.monetization.type === 'pay_per_minute' ? 'min' : 'session'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="font-medium">${selectedSession.monetization.totalRevenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tips:</span>
                        <span className="font-medium">${selectedSession.monetization.tips.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Participants</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{selectedSession.participants.host.name}</span>
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">Host</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedSession.participants.host.camera && <Camera className="w-4 h-4 text-green-400" />}
                        {selectedSession.participants.host.microphone && <Mic className="w-4 h-4 text-green-400" />}
                        {selectedSession.participants.host.screenShare && <Monitor className="w-4 h-4 text-blue-400" />}
                      </div>
                    </div>
                    {selectedSession.participants.guests.map((guest) => (
                      <div key={guest.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{guest.name}</span>
                          <span className="px-2 py-1 bg-gray-600 rounded text-xs">{guest.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {guest.camera && <Camera className="w-4 h-4 text-green-400" />}
                          {guest.microphone && <Mic className="w-4 h-4 text-green-400" />}
                          {guest.screenShare && <Monitor className="w-4 h-4 text-blue-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Templates */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Video Templates</h3>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <div className="text-sm text-gray-400">{template.category} - {template.type.replace('_', ' ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      template.category === 'adult' ? 'bg-pink-600' : 
                      template.category === 'business' ? 'bg-blue-600' : 
                      template.category === 'entertainment' ? 'bg-purple-600' : 'bg-gray-600'
                    }`}>
                      {template.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${template.monetization.rate}/{template.monetization.type === 'pay_per_minute' ? 'min' : 'session'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Popularity:</span> {template.popularity.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Usage:</span> {template.usage.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Rating:</span> {template.rating.toFixed(1)}/5.0
                  </div>
                  <div>
                    <span className="text-gray-400">Max Participants:</span> {template.preset.maxParticipants}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${template.popularity}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {template.preset.features.slice(0, 3).join(', ')} | 
                      {template.avatar.realism} realism
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startSession(template.id)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {templates.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No templates found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Live Video Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">System Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoConnection}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoConnection: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Connection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.qualityOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, qualityOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Quality Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.bandwidthManagement}
                        onChange={(e) => setConfig(prev => ({ ...prev, bandwidthManagement: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Bandwidth Management</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.voiceEnhancement}
                        onChange={(e) => setConfig(prev => ({ ...prev, voiceEnhancement: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Voice Enhancement</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Streaming Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Quality</label>
                      <select
                        value={config.streaming.quality}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          streaming: { ...prev.streaming, quality: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="auto">Auto</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="ultra">Ultra</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bitrate</label>
                      <select
                        value={config.streaming.bitrate}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          streaming: { ...prev.streaming, bitrate: e.target.value }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="1000kbps">1000kbps</option>
                        <option value="2000kbps">2000kbps</option>
                        <option value="5000kbps">5000kbps</option>
                        <option value="8000kbps">8000kbps</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Voice Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.voice.noiseReduction}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          voice: { ...prev.voice, noiseReduction: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Noise Reduction</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.voice.echoCancellation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          voice: { ...prev.voice, echoCancellation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Echo Cancellation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.voice.synthesis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          voice: { ...prev.voice, synthesis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Voice Synthesis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.voice.realTime}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          voice: { ...prev.voice, realTime: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Real-Time</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Video Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.video.autoFocus}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          video: { ...prev.video, autoFocus: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Focus</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.video.lightCorrection}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          video: { ...prev.video, lightCorrection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Light Correction</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.video.virtualBackground}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          video: { ...prev.video, virtualBackground: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Virtual Background</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.video.enhancement}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          video: { ...prev.video, enhancement: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Enhancement</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Latency (ms)</label>
                      <input
                        type="number"
                        value={config.performance.maxLatency}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, maxLatency: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="10"
                        max="500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Min Quality (%)</label>
                      <input
                        type="number"
                        value={config.performance.minQuality}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, minQuality: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="50"
                        max="100"
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

export default LiveVideoSystem;
