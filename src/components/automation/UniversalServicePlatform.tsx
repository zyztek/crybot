/**
 * Universal Service Platform Component
 * 
 * Create universal service platform enabling personas to offer any conceivable service across all industries
 * Comprehensive marketplace for all types of services with AI-powered matching and automation
 */

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Users, DollarSign, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Star, TrendingUp, Briefcase, Heart, Brain, Zap, MessageCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: 'technology' | 'creative' | 'business' | 'education' | 'healthcare' | 'entertainment' | 'legal' | 'finance' | 'consulting' | 'personal' | 'adult' | 'custom';
  subcategory: string;
  description: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number; // 0-5
  providerReviews: number;
  pricing: {
    model: 'fixed' | 'hourly' | 'project' | 'subscription' | 'commission' | 'donation' | 'custom';
    baseRate: number;
    currency: string;
    unit: 'hour' | 'project' | 'month' | 'service' | 'custom';
    minimumOrder: number;
    maximumOrder?: number;
    discounts: Array<{
      minQuantity: number;
      discount: number; // percentage
      description: string;
    }>;
  };
  deliverables: {
    items: string[];
    formats: string[];
    revisions: number;
    timeline: string;
    support: string;
    guarantees: string[];
  };
  requirements: {
    skills: string[];
    experience: string;
    tools: string[];
    availability: string;
    communication: string[];
  };
  capabilities: {
    aiAssisted: boolean;
    automated: boolean;
    scalable: boolean;
    customizable: boolean;
    realTime: boolean;
    multiLanguage: boolean;
    priority: number; // 0-100
  };
  performance: {
    completedOrders: number;
    averageRating: number; // 0-5
    responseTime: number; // hours
    completionRate: number; // 0-100
    onTimeDelivery: number; // 0-100
    repeatClients: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
  marketing: {
    tags: string[];
    keywords: string[];
    targetAudience: string[];
    featured: boolean;
    promoted: boolean;
    visibility: 'public' | 'private' | 'invite_only';
  };
  compliance: {
    verified: boolean;
    certified: boolean;
    insured: boolean;
    backgroundCheck: boolean;
    licenses: string[];
    regulations: string[];
    ageRestriction: boolean;
    contentRestrictions: string[];
  };
  availability: {
    status: 'available' | 'busy' | 'offline' | 'suspended';
    schedule: {
      timezone: string;
      workingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
      };
    };
    capacity: {
      current: number;
      maximum: number;
      queue: number;
    };
  };
  createdAt: string;
  lastUpdated: string;
  isActive: boolean;
}

interface ServiceRequest {
  id: string;
  serviceId: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: {
    min: number;
    max: number;
    currency: string;
    flexible: boolean;
  };
  timeline: {
    start: string;
    deadline: string;
    urgency: 'flexible' | 'moderate' | 'strict' | 'asap';
  };
  requirements: {
    description: string;
    specifications: string[];
    deliverables: string[];
    specialInstructions: string;
  };
  communication: {
    preferred: string[];
    language: string;
    timezone: string;
    availability: string;
  };
  pricing: {
    agreedRate: number;
    currency: string;
    paymentTerms: string;
    milestones: Array<{
      description: string;
      amount: number;
      dueDate: string;
      completed: boolean;
    }>;
  };
  progress: {
    percentage: number; // 0-100
    currentPhase: string;
    lastUpdate: string;
    estimatedCompletion: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ServiceProvider {
  id: string;
  personaId: string;
  name: string;
  avatar: string;
  type: 'individual' | 'team' | 'agency' | 'enterprise' | 'ai_agent';
  specialization: string[];
  expertise: Array<{
    area: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
    years: number;
    certifications: string[];
  }>;
  services: string[]; // service IDs
  reputation: {
    rating: number; // 0-5
    reviews: number;
    completedJobs: number;
    successRate: number; // 0-100
    responseRate: number; // 0-100
    onTimeRate: number; // 0-100
    clientRetention: number; // 0-100
  };
  business: {
    established: string;
    location: string;
    languages: string[];
    timezone: string;
    teamSize: number;
    revenue: number;
    growth: number; // 0-100
  };
  capabilities: {
    aiPowered: boolean;
    automatedWorkflows: boolean;
    scalability: number; // 0-100
    customization: number; // 0-100
    qualityAssurance: boolean;
    projectManagement: boolean;
  };
  compliance: {
    verified: boolean;
    insured: boolean;
    licensed: boolean;
    certified: boolean;
    backgroundCheck: boolean;
    dataProtection: boolean;
  };
  pricing: {
    model: string;
    rates: Array<{
      serviceType: string;
      rate: number;
      unit: string;
      minimum: number;
    }>;
    discounts: Array<{
      type: string;
      value: number;
      conditions: string;
    }>;
  };
  availability: {
    status: 'available' | 'busy' | 'offline';
    capacity: number;
    responseTime: number; // hours
    schedule: Record<string, string>;
  };
  createdAt: string;
  lastActive: string;
  isActive: boolean;
}

interface UniversalServiceConfig {
  autoMatching: boolean;
  aiRecommendations: boolean;
  qualityControl: boolean;
  disputeResolution: boolean;
  escrowService: boolean;
  insurance: boolean;
  verification: boolean;
  marketplace: {
    featuredServices: boolean;
    promotedProviders: boolean;
    trendingServices: boolean;
    newServices: boolean;
    categoryHighlighting: boolean;
  };
  automation: {
    orderProcessing: boolean;
    paymentProcessing: boolean;
    communication: boolean;
    scheduling: boolean;
    reporting: boolean;
    feedback: boolean;
  };
  ai: {
    matching: boolean;
    recommendations: boolean;
    pricing: boolean;
    quality: boolean;
    fraud: boolean;
    optimization: boolean;
  };
  compliance: {
    verification: boolean;
    monitoring: boolean;
    reporting: boolean;
    enforcement: boolean;
    penalties: boolean;
  };
}

const UniversalServicePlatform: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [config, setConfig] = useState<UniversalServiceConfig>({
    autoMatching: true,
    aiRecommendations: true,
    qualityControl: true,
    disputeResolution: true,
    escrowService: true,
    insurance: true,
    verification: true,
    marketplace: {
      featuredServices: true,
      promotedProviders: true,
      trendingServices: true,
      newServices: true,
      categoryHighlighting: true
    },
    automation: {
      orderProcessing: true,
      paymentProcessing: true,
      communication: true,
      scheduling: true,
      reporting: true,
      feedback: true
    },
    ai: {
      matching: true,
      recommendations: true,
      pricing: true,
      quality: true,
      fraud: true,
      optimization: true
    },
    compliance: {
      verification: true,
      monitoring: true,
      reporting: true,
      enforcement: true,
      penalties: true
    }
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalProviders: 0,
    activeProviders: 0,
    totalRequests: 0,
    completedRequests: 0,
    totalRevenue: 0,
    averageRating: 0,
    bestCategory: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock services initialization
  useEffect(() => {
    const mockServices: Service[] = [
      {
        id: 'service-1',
        name: 'AI-Powered Content Creation',
        category: 'creative',
        subcategory: 'content_writing',
        description: 'High-quality content creation using advanced AI with human oversight and editing',
        providerId: 'provider-1',
        providerName: 'Content Masters',
        providerAvatar: '/avatars/content_masters.jpg',
        providerRating: 4.8,
        providerReviews: 156,
        pricing: {
          model: 'hourly',
          baseRate: 45,
          currency: 'USD',
          unit: 'hour',
          minimumOrder: 2,
          discounts: [
            { minQuantity: 10, discount: 10, description: 'Bulk discount - 10+ hours' },
            { minQuantity: 20, discount: 15, description: 'Volume discount - 20+ hours' }
          ]
        },
        deliverables: {
          items: ['Articles', 'Blog posts', 'Social media content', 'Marketing copy', 'Technical documentation'],
          formats: ['PDF', 'Word', 'HTML', 'Markdown'],
          revisions: 3,
          timeline: '2-5 business days',
          support: '30 days post-delivery',
          guarantees: ['Satisfaction guaranteed', 'Plagiarism-free', 'SEO optimized']
        },
        requirements: {
          skills: ['Writing', 'Editing', 'SEO', 'Content strategy'],
          experience: '3+ years in content creation',
          tools: ['AI writing tools', 'Grammarly', 'SEO tools'],
          availability: 'Monday-Friday, 9AM-6PM EST',
          communication: ['Email', 'Chat', 'Video call']
        },
        capabilities: {
          aiAssisted: true,
          automated: true,
          scalable: true,
          customizable: true,
          realTime: true,
          multiLanguage: true,
          priority: 85
        },
        performance: {
          completedOrders: 234,
          averageRating: 4.8,
          responseTime: 2,
          completionRate: 96.5,
          onTimeDelivery: 94.2,
          repeatClients: 67,
          totalRevenue: 45600,
          averageOrderValue: 195
        },
        marketing: {
          tags: ['AI', 'content', 'writing', 'SEO', 'marketing'],
          keywords: ['content creation', 'AI writing', 'blog posts', 'articles', 'copywriting'],
          targetAudience: ['Businesses', 'Marketing teams', 'Bloggers', 'E-commerce'],
          featured: true,
          promoted: true,
          visibility: 'public'
        },
        compliance: {
          verified: true,
          certified: true,
          insured: true,
          backgroundCheck: true,
          licenses: ['Business License', 'Content Creation Certification'],
          regulations: ['Copyright law', 'Content standards'],
          ageRestriction: false,
          contentRestrictions: ['no illegal content', 'no hate speech']
        },
        availability: {
          status: 'available',
          schedule: {
            timezone: 'EST',
            workingHours: {
              monday: '9AM-6PM',
              tuesday: '9AM-6PM',
              wednesday: '9AM-6PM',
              thursday: '9AM-6PM',
              friday: '9AM-6PM',
              saturday: '10AM-4PM',
              sunday: 'Closed'
            }
          },
          capacity: {
            current: 15,
            maximum: 25,
            queue: 3
          }
        },
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'service-2',
        name: 'Advanced Web Development',
        category: 'technology',
        subcategory: 'web_development',
        description: 'Custom web applications with modern frameworks and AI-powered optimization',
        providerId: 'provider-2',
        providerName: 'Tech Solutions Pro',
        providerAvatar: '/avatars/tech_solutions.jpg',
        providerRating: 4.9,
        providerReviews: 89,
        pricing: {
          model: 'project',
          baseRate: 2500,
          currency: 'USD',
          unit: 'project',
          minimumOrder: 1,
          maximumOrder: 5,
          discounts: [
            { minQuantity: 2, discount: 5, description: 'Multi-project discount' },
            { minQuantity: 3, discount: 10, description: 'Enterprise discount' }
          ]
        },
        deliverables: {
          items: ['Web application', 'Mobile responsive design', 'API integration', 'Database setup', 'Deployment'],
          formats: ['Live application', 'Source code', 'Documentation'],
          revisions: 5,
          timeline: '4-8 weeks',
          support: '90 days post-launch',
          guarantees: ['Bug-free delivery', 'Performance optimization', 'Security audit']
        },
        requirements: {
          skills: ['JavaScript', 'React', 'Node.js', 'Database design'],
          experience: '5+ years in web development',
          tools: ['VS Code', 'Git', 'AWS', 'Docker'],
          availability: '24/7 support',
          communication: ['Slack', 'Email', 'Video call', 'Project management tools']
        },
        capabilities: {
          aiAssisted: true,
          automated: true,
          scalable: true,
          customizable: true,
          realTime: true,
          multiLanguage: true,
          priority: 90
        },
        performance: {
          completedOrders: 67,
          averageRating: 4.9,
          responseTime: 1,
          completionRate: 98.5,
          onTimeDelivery: 96.8,
          repeatClients: 45,
          totalRevenue: 167500,
          averageOrderValue: 2500
        },
        marketing: {
          tags: ['web development', 'React', 'Node.js', 'AI', 'custom applications'],
          keywords: ['web development', 'custom applications', 'React development', 'full-stack'],
          targetAudience: ['Startups', 'Enterprises', 'E-commerce', 'SaaS companies'],
          featured: true,
          promoted: true,
          visibility: 'public'
        },
        compliance: {
          verified: true,
          certified: true,
          insured: true,
          backgroundCheck: true,
          licenses: ['Software Development License', 'Security Certification'],
          regulations: ['GDPR compliance', 'Security standards'],
          ageRestriction: false,
          contentRestrictions: ['no malicious code', 'no illegal applications']
        },
        availability: {
          status: 'available',
          schedule: {
            timezone: 'PST',
            workingHours: {
              monday: '9AM-6PM',
              tuesday: '9AM-6PM',
              wednesday: '9AM-6PM',
              thursday: '9AM-6PM',
              friday: '9AM-6PM',
              saturday: '10AM-2PM',
              sunday: 'Closed'
            }
          },
          capacity: {
            current: 3,
            maximum: 8,
            queue: 2
          }
        },
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      }
    ];

    setServices(mockServices);
  }, []);

  // Mock providers initialization
  useEffect(() => {
    const mockProviders: ServiceProvider[] = [
      {
        id: 'provider-1',
        personaId: 'persona-1',
        name: 'Content Masters',
        avatar: '/avatars/content_masters.jpg',
        type: 'agency',
        specialization: ['Content Writing', 'SEO', 'Marketing', 'AI Content'],
        expertise: [
          {
            area: 'Content Writing',
            level: 'expert',
            years: 8,
            certifications: ['Content Marketing Certification', 'SEO Expert']
          },
          {
            area: 'AI Content Generation',
            level: 'master',
            years: 3,
            certifications: ['AI Content Specialist', 'Machine Learning Basics']
          }
        ],
        services: ['service-1'],
        reputation: {
          rating: 4.8,
          reviews: 156,
          completedJobs: 234,
          successRate: 96.5,
          responseRate: 98.2,
          onTimeRate: 94.2,
          clientRetention: 78.5
        },
        business: {
          established: '2016',
          location: 'New York, USA',
          languages: ['English', 'Spanish', 'French'],
          timezone: 'EST',
          teamSize: 12,
          revenue: 45600,
          growth: 85.2
        },
        capabilities: {
          aiPowered: true,
          automatedWorkflows: true,
          scalability: 90,
          customization: 85,
          qualityAssurance: true,
          projectManagement: true
        },
        compliance: {
          verified: true,
          insured: true,
          licensed: true,
          certified: true,
          backgroundCheck: true,
          dataProtection: true
        },
        pricing: {
          model: 'hourly + project',
          rates: [
            { serviceType: 'Content Writing', rate: 45, unit: 'hour', minimum: 2 },
            { serviceType: 'AI Content', rate: 35, unit: 'hour', minimum: 1 }
          ],
          discounts: [
            { type: 'bulk', value: 10, conditions: '10+ hours' },
            { type: 'retainer', value: 15, conditions: 'Monthly retainer' }
          ]
        },
        availability: {
          status: 'available',
          capacity: 15,
          responseTime: 2,
          schedule: {
            '9AM-6PM': 'Monday-Friday',
            '10AM-4PM': 'Saturday',
            'Closed': 'Sunday'
          }
        },
        createdAt: '2016-01-15T00:00:00Z',
        lastActive: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'provider-2',
        personaId: 'persona-2',
        name: 'Tech Solutions Pro',
        avatar: '/avatars/tech_solutions.jpg',
        type: 'agency',
        specialization: ['Web Development', 'Mobile Apps', 'AI Integration', 'Cloud Services'],
        expertise: [
          {
            area: 'Web Development',
            level: 'expert',
            years: 10,
            certifications: ['Full Stack Developer', 'Cloud Architect']
          },
          {
            area: 'AI Integration',
            level: 'advanced',
            years: 5,
            certifications: ['AI Engineer', 'Machine Learning']
          }
        ],
        services: ['service-2'],
        reputation: {
          rating: 4.9,
          reviews: 89,
          completedJobs: 67,
          successRate: 98.5,
          responseRate: 99.1,
          onTimeRate: 96.8,
          clientRetention: 82.3
        },
        business: {
          established: '2014',
          location: 'San Francisco, USA',
          languages: ['English', 'Chinese', 'Japanese'],
          timezone: 'PST',
          teamSize: 8,
          revenue: 167500,
          growth: 92.7
        },
        capabilities: {
          aiPowered: true,
          automatedWorkflows: true,
          scalability: 95,
          customization: 90,
          qualityAssurance: true,
          projectManagement: true
        },
        compliance: {
          verified: true,
          insured: true,
          licensed: true,
          certified: true,
          backgroundCheck: true,
          dataProtection: true
        },
        pricing: {
          model: 'project',
          rates: [
            { serviceType: 'Web Development', rate: 2500, unit: 'project', minimum: 1 },
            { serviceType: 'AI Integration', rate: 1500, unit: 'project', minimum: 1 }
          ],
          discounts: [
            { type: 'multi-project', value: 5, conditions: '2+ projects' },
            { type: 'enterprise', value: 10, conditions: 'Large scale projects' }
          ]
        },
        availability: {
          status: 'available',
          capacity: 3,
          responseTime: 1,
          schedule: {
            '9AM-6PM': 'Monday-Friday',
            '10AM-2PM': 'Saturday',
            'Closed': 'Sunday'
          }
        },
        createdAt: '2014-01-10T00:00:00Z',
        lastActive: new Date().toISOString(),
        isActive: true
      }
    ];

    setProviders(mockProviders);
  }, []);

  // Mock service requests initialization
  useEffect(() => {
    const mockRequests: ServiceRequest[] = [
      {
        id: 'request-1',
        serviceId: 'service-1',
        clientId: 'client-1',
        clientName: 'Global Marketing Inc',
        clientAvatar: '/avatars/global_marketing.jpg',
        status: 'in_progress',
        priority: 'high',
        budget: {
          min: 800,
          max: 1200,
          currency: 'USD',
          flexible: true
        },
        timeline: {
          start: new Date(Date.now() - 86400000).toISOString(),
          deadline: new Date(Date.now() + 604800000).toISOString(),
          urgency: 'moderate'
        },
        requirements: {
          description: 'Need 20 blog posts about digital marketing trends with SEO optimization',
          specifications: ['1000+ words each', 'SEO optimized', 'Original content', 'Marketing focus'],
          deliverables: ['20 blog posts', 'SEO reports', 'Keyword analysis'],
          specialInstructions: 'Focus on B2B marketing trends and include case studies'
        },
        communication: {
          preferred: ['Email', 'Video call'],
          language: 'English',
          timezone: 'EST',
          availability: 'Business hours'
        },
        pricing: {
          agreedRate: 45,
          currency: 'USD',
          paymentTerms: '50% upfront, 50% on completion',
          milestones: [
            { description: 'First 5 articles', amount: 450, dueDate: new Date(Date.now() + 172800000).toISOString(), completed: true },
            { description: 'Next 10 articles', amount: 900, dueDate: new Date(Date.now() + 432000000).toISOString(), completed: false },
            { description: 'Final 5 articles', amount: 450, dueDate: new Date(Date.now() + 604800000).toISOString(), completed: false }
          ]
        },
        progress: {
          percentage: 25,
          currentPhase: 'Content creation phase 2',
          lastUpdate: new Date().toISOString(),
          estimatedCompletion: new Date(Date.now() + 518400000).toISOString()
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'request-2',
        serviceId: 'service-2',
        clientId: 'client-2',
        clientName: 'StartupXYZ',
        clientAvatar: '/avatars/startup_xyz.jpg',
        status: 'pending',
        priority: 'urgent',
        budget: {
          min: 3000,
          max: 5000,
          currency: 'USD',
          flexible: false
        },
        timeline: {
          start: new Date().toISOString(),
          deadline: new Date(Date.now() + 2592000000).toISOString(),
          urgency: 'strict'
        },
        requirements: {
          description: 'E-commerce platform with AI-powered recommendations and inventory management',
          specifications: ['React frontend', 'Node.js backend', 'AI recommendations', 'Payment integration'],
          deliverables: ['Complete e-commerce platform', 'Admin dashboard', 'Mobile responsive', 'API documentation'],
          specialInstructions: 'Must handle 10,000+ concurrent users, include advanced analytics'
        },
        communication: {
          preferred: ['Slack', 'Video call'],
          language: 'English',
          timezone: 'PST',
          availability: '24/7 for urgent issues'
        },
        pricing: {
          agreedRate: 0,
          currency: 'USD',
          paymentTerms: 'To be negotiated',
          milestones: []
        },
        progress: {
          percentage: 0,
          currentPhase: 'Proposal phase',
          lastUpdate: new Date().toISOString(),
          estimatedCompletion: new Date(Date.now() + 2592000000).toISOString()
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    setRequests(mockRequests);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Update service performance
      setServices(prev => prev.map(service => {
        if (Math.random() > 0.7) { // 30% chance of update
          const newOrders = Math.floor(Math.random() * 3) + 1;
          const newRevenue = newOrders * service.pricing.baseRate;
          const newRating = Math.max(4.0, Math.min(5.0, service.performance.averageRating + (Math.random() * 0.2 - 0.1)));
          
          return {
            ...service,
            performance: {
              ...service.performance,
              completedOrders: service.performance.completedOrders + newOrders,
              totalRevenue: service.performance.totalRevenue + newRevenue,
              averageRating: newRating,
              repeatClients: service.performance.repeatClients + Math.floor(Math.random() * 2)
            },
            lastUpdated: new Date().toISOString()
          };
        }
        return service;
      }));

      // Update request progress
      setRequests(prev => prev.map(request => {
        if (request.status === 'in_progress') {
          const progressIncrement = Math.random() * 10 + 5;
          const newProgress = Math.min(100, request.progress.percentage + progressIncrement);
          
          return {
            ...request,
            progress: {
              ...request.progress,
              percentage: newProgress,
              lastUpdate: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
          };
        }
        return request;
      }));

      // Auto-match requests to services
      if (config.autoMatching) {
        setRequests(prev => prev.map(request => {
          if (request.status === 'pending' && Math.random() > 0.8) { // 20% chance
            return {
              ...request,
              status: 'accepted',
              progress: {
                ...request.progress,
                percentage: 5,
                currentPhase: 'Planning phase'
              }
            };
          }
          return request;
        }));
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [isOperating, config.autoMatching]);

  // Auto new service creation simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Create new services
      if (Math.random() > 0.9) { // 10% chance
        const categories: Service['category'][] = ['technology', 'creative', 'business', 'education', 'healthcare', 'entertainment', 'legal', 'finance', 'consulting', 'personal'];
        const newService: Service = {
          id: `service-${Date.now()}`,
          name: `AI-Enhanced ${categories[Math.floor(Math.random() * categories.length)]} Service`,
          category: categories[Math.floor(Math.random() * categories.length)],
          subcategory: 'ai_enhanced',
          description: 'Advanced AI-powered service with automation and customization',
          providerId: `provider-${Math.floor(Math.random() * 2) + 1}`,
          providerName: 'AI Service Provider',
          providerAvatar: '/avatars/ai_provider.jpg',
          providerRating: 4.7,
          providerReviews: Math.floor(Math.random() * 50) + 10,
          pricing: {
            model: 'hourly',
            baseRate: Math.floor(Math.random() * 100) + 25,
            currency: 'USD',
            unit: 'hour',
            minimumOrder: 1
          },
          deliverables: {
            items: ['AI-generated deliverables', 'Automated reports', 'Real-time analytics'],
            formats: ['Digital', 'PDF', 'API'],
            revisions: 2,
            timeline: '1-3 business days',
            support: '30 days',
            guarantees: ['Quality assured', 'AI-powered optimization']
          },
          requirements: {
            skills: ['AI expertise', 'Domain knowledge'],
            experience: '2+ years',
            tools: ['AI platforms', 'Automation tools'],
            availability: 'Flexible',
            communication: ['Chat', 'Email', 'Video']
          },
          capabilities: {
            aiAssisted: true,
            automated: true,
            scalable: true,
            customizable: true,
            realTime: true,
            multiLanguage: true,
            priority: Math.floor(Math.random() * 30) + 70
          },
          performance: {
            completedOrders: 0,
            averageRating: 4.7,
            responseTime: 1,
            completionRate: 95,
            onTimeDelivery: 93,
            repeatClients: 0,
            totalRevenue: 0,
            averageOrderValue: 0
          },
          marketing: {
            tags: ['AI', 'automation', 'innovation'],
            keywords: ['AI service', 'automation', 'efficiency'],
            targetAudience: ['Businesses', 'Professionals'],
            featured: false,
            promoted: false,
            visibility: 'public'
          },
          compliance: {
            verified: true,
            certified: true,
            insured: true,
            backgroundCheck: true,
            licenses: ['Service License'],
            regulations: ['Industry standards'],
            ageRestriction: false,
            contentRestrictions: ['no illegal content']
          },
          availability: {
            status: 'available',
            schedule: {
              timezone: 'EST',
              workingHours: {
                monday: '9AM-6PM',
                tuesday: '9AM-6PM',
                wednesday: '9AM-6PM',
                thursday: '9AM-6PM',
                friday: '9AM-6PM',
                saturday: '10AM-4PM',
                sunday: 'Closed'
              }
            },
            capacity: {
              current: 0,
              maximum: 10,
              queue: 0
            }
          },
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          isActive: true
        };

        setServices(prev => [...prev, newService]);
      }
    }, 180000); // Every 3 minutes

    return () => clearInterval(interval);
  }, [isOperating]);

  // Update stats
  useEffect(() => {
    const activeServices = services.filter(s => s.isActive).length;
    const activeProviders = providers.filter(p => p.isActive).length;
    const completedRequests = requests.filter(r => r.status === 'completed').length;
    const totalRevenue = services.reduce((sum, s) => sum + s.performance.totalRevenue, 0);
    const averageRating = services.length > 0 
      ? services.reduce((sum, s) => sum + s.performance.averageRating, 0) / services.length 
      : 0;
    
    const categoryCounts = services.reduce((acc, service) => {
      acc[service.category] = (acc[service.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestCategory = Object.entries(categoryCounts).reduce((best, [category, count]) => 
      count > (best?.count || 0) ? { category, count } : best, null as { category: string; count: number } | null);

    setStats({
      totalServices: services.length,
      activeServices,
      totalProviders: providers.length,
      activeProviders,
      totalRequests: requests.length,
      completedRequests,
      totalRevenue,
      averageRating,
      bestCategory: bestCategory?.category || ''
    });
  }, [services, providers, requests]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const createService = () => {
    const categories: Service['category'][] = ['technology', 'creative', 'business', 'education', 'healthcare', 'entertainment', 'legal', 'finance', 'consulting', 'personal'];
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: `New Service ${services.length + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      subcategory: 'custom',
      description: 'Custom service created through the universal platform',
      providerId: `provider-${Date.now()}`,
      providerName: 'New Provider',
      providerAvatar: '/avatars/new_provider.jpg',
      providerRating: 4.5,
      providerReviews: 0,
      pricing: {
        model: 'hourly',
        baseRate: Math.floor(Math.random() * 100) + 25,
        currency: 'USD',
        unit: 'hour',
        minimumOrder: 1
      },
      deliverables: {
        items: ['Custom deliverables'],
        formats: ['Digital'],
        revisions: 2,
        timeline: '1-2 weeks',
        support: '30 days',
        guarantees: ['Satisfaction guaranteed']
      },
      requirements: {
        skills: ['Custom skills'],
        experience: 'Professional',
        tools: ['Standard tools'],
        availability: 'Flexible',
        communication: ['Email', 'Chat']
      },
      capabilities: {
        aiAssisted: true,
        automated: true,
        scalable: true,
        customizable: true,
        realTime: true,
        multiLanguage: true,
        priority: 75
      },
      performance: {
        completedOrders: 0,
        averageRating: 4.5,
        responseTime: 2,
        completionRate: 95,
        onTimeDelivery: 90,
        repeatClients: 0,
        totalRevenue: 0,
        averageOrderValue: 0
      },
      marketing: {
        tags: ['custom', 'new'],
        keywords: ['custom service'],
        targetAudience: ['General'],
        featured: false,
        promoted: false,
        visibility: 'public'
      },
      compliance: {
        verified: true,
        certified: true,
        insured: true,
        backgroundCheck: true,
        licenses: ['Service License'],
        regulations: ['Standard regulations'],
        ageRestriction: false,
        contentRestrictions: ['no illegal content']
      },
      availability: {
        status: 'available',
        schedule: {
          timezone: 'EST',
          workingHours: {
            monday: '9AM-6PM',
            tuesday: '9AM-6PM',
            wednesday: '9AM-6PM',
            thursday: '9AM-6PM',
            friday: '9AM-6PM',
            saturday: '10AM-4PM',
            sunday: 'Closed'
          }
        },
        capacity: {
          current: 0,
          maximum: 10,
          queue: 0
        }
      },
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      isActive: true
    };

    setServices(prev => [...prev, newService]);
  };

  const getCategoryColor = (category: Service['category']) => {
    switch (category) {
      case 'technology': return 'bg-blue-600';
      case 'creative': return 'bg-purple-600';
      case 'business': return 'bg-green-600';
      case 'education': return 'bg-orange-600';
      case 'healthcare': return 'bg-red-600';
      case 'entertainment': return 'bg-yellow-600';
      case 'legal': return 'bg-pink-600';
      case 'finance': return 'bg-cyan-600';
      case 'consulting': return 'bg-indigo-600';
      case 'personal': return 'bg-gray-600';
      case 'adult': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: Service['availability']['status']) => {
    switch (status) {
      case 'available': return 'bg-green-600';
      case 'busy': return 'bg-yellow-600';
      case 'offline': return 'bg-gray-600';
      case 'suspended': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredServices = () => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.providerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || service.availability.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-purple-400" />
            Universal Service Platform
          </h1>
          <p className="text-gray-400">
            Create universal service platform enabling personas to offer any conceivable service across all industries
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Services</div>
                <div className="text-2xl font-bold">{stats.totalServices}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Providers</div>
                <div className="text-2xl font-bold">{stats.activeProviders}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Total Requests</div>
                <div className="text-2xl font-bold">{stats.totalRequests}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Rating</div>
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Service Platform Operations</h2>
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
                    Stop Platform
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Platform
                  </>
                )}
              </button>
              <button
                onClick={createService}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Create Service
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
              Completed Requests: {stats.completedRequests} | 
              Platform: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search services..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="creative">Creative</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredServices().map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedService?.id === service.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(service.availability.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <div className="text-sm text-gray-400">{service.providerName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(service.availability.status)}`}>
                        {service.availability.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Pricing:</span> ${service.pricing.baseRate}/{service.pricing.unit}
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span> {service.performance.averageRating.toFixed(1)}/5.0
                    </div>
                    <div>
                      <span className="text-gray-400">Orders:</span> {service.performance.completedOrders}
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span> ${service.performance.totalRevenue.toLocaleString()}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${(service.performance.averageRating / 5) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {service.capabilities.aiAssisted && <Brain className="w-3 h-3 inline mr-1" />}
                        {service.capabilities.automated && <Zap className="w-3 h-3 inline mr-1" />}
                        {service.capabilities.aiAssisted ? 'AI-Powered' : 'Manual'} | 
                        {service.capabilities.scalable ? 'Scalable' : 'Limited'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {service.availability.capacity.current}/{service.availability.capacity.maximum} active
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredServices().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No services found
              </div>
            )}
          </div>

          {/* Selected Service Details */}
          {selectedService && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Details: {selectedService.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Service Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-medium">{selectedService.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Provider:</span>
                        <span className="font-medium">{selectedService.providerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pricing:</span>
                        <span className="font-medium">${selectedService.pricing.baseRate}/{selectedService.pricing.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="font-medium">{selectedService.deliverables.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completed Orders:</span>
                        <span className="font-medium">{selectedService.performance.completedOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Rating:</span>
                        <span className="font-medium">{selectedService.performance.averageRating.toFixed(1)}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Rate:</span>
                        <span className="font-medium">{selectedService.performance.completionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Revenue:</span>
                        <span className="font-medium">${selectedService.performance.totalRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Capabilities</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Assisted:</span>
                        <span className="font-medium">{selectedService.capabilities.aiAssisted ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Automated:</span>
                        <span className="font-medium">{selectedService.capabilities.automated ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scalable:</span>
                        <span className="font-medium">{selectedService.capabilities.scalable ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Real-Time:</span>
                        <span className="font-medium">{selectedService.capabilities.realTime ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Availability</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedService.availability.status)}`}>
                          {selectedService.availability.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="font-medium">{selectedService.availability.capacity.current}/{selectedService.availability.capacity.maximum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Queue:</span>
                        <span className="font-medium">{selectedService.availability.capacity.queue} pending</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timezone:</span>
                        <span className="font-medium">{selectedService.availability.schedule.timezone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedService.description}</p>
                </div>

                {/* Deliverables */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.deliverables.items.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Service Requests */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Service Requests</h3>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{request.clientName}</h4>
                    <div className="text-sm text-gray-400">{request.serviceId} - {request.status.replace('_', ' ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      request.priority === 'urgent' ? 'bg-red-600' :
                      request.priority === 'high' ? 'bg-orange-600' :
                      request.priority === 'medium' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}>
                      {request.priority}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${request.budget.min}-${request.budget.max}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Timeline:</span> {new Date(request.timeline.deadline).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Urgency:</span> {request.timeline.urgency}
                  </div>
                  <div>
                    <span className="text-gray-400">Progress:</span> {request.progress.percentage.toFixed(0)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Phase:</span> {request.progress.currentPhase}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${request.progress.percentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {request.requirements.description.substring(0, 100)}... | 
                      {request.requirements.specifications.length} specifications
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No service requests found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Universal Service Platform Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Platform Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoMatching}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoMatching: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Matching</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.aiRecommendations}
                        onChange={(e) => setConfig(prev => ({ ...prev, aiRecommendations: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">AI Recommendations</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.qualityControl}
                        onChange={(e) => setConfig(prev => ({ ...prev, qualityControl: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Quality Control</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.disputeResolution}
                        onChange={(e) => setConfig(prev => ({ ...prev, disputeResolution: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Dispute Resolution</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Marketplace Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketplace.featuredServices}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, featuredServices: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Featured Services</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketplace.promotedProviders}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, promotedProviders: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Promoted Providers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketplace.trendingServices}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, trendingServices: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Trending Services</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketplace.categoryHighlighting}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, categoryHighlighting: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Category Highlighting</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Automation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.orderProcessing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, orderProcessing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Order Processing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.paymentProcessing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, paymentProcessing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Payment Processing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.communication}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, communication: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Communication</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.automation.scheduling}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          automation: { ...prev.automation, scheduling: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Scheduling</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">AI Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.ai.matching}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ai: { ...prev.ai, matching: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">AI Matching</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.ai.pricing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ai: { ...prev.ai, pricing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">AI Pricing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.ai.quality}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ai: { ...prev.ai, quality: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">AI Quality Control</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.ai.fraud}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          ai: { ...prev.ai, fraud: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Fraud Detection</span>
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

export default UniversalServicePlatform;
