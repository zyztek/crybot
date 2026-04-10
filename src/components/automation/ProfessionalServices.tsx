/**
 * Professional Services Component
 * 
 * Build professional services system for Fiverr-like platforms
 * Comprehensive freelance marketplace with AI-powered matching and automation
 */

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, DollarSign, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Zap, Star, TrendingUp, MessageSquare, Calendar, Award } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: 'writing' | 'design' | 'programming' | 'marketing' | 'video' | 'audio' | 'business' | 'data' | 'translation' | 'consulting';
  subcategory: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerLevel: 'new_seller' | 'level_one' | 'level_two' | 'top_rated' | 'top_rated_plus';
  pricing: {
    type: 'fixed' | 'hourly' | 'package' | 'subscription';
    basic: {
      price: number;
      currency: string;
      delivery: string;
      revisions: number;
      features: string[];
    };
    standard?: {
      price: number;
      currency: string;
      delivery: string;
      revisions: number;
      features: string[];
    };
    premium?: {
      price: number;
      currency: string;
      delivery: string;
      revisions: number;
      features: string[];
    };
  };
  requirements: {
    description: string;
    files: string[];
    questions: string[];
  };
  deliverables: {
    items: string[];
    formats: string[];
    fileCount: number;
    sourceFiles: boolean;
  };
  tags: string[];
  languages: string[];
  location: string;
  responseTime: number; // hours
  completionRate: number; // 0-100
  onTimeDelivery: number; // 0-100
  rating: number; // 0-5
  reviews: number;
  ordersInQueue: number;
  featured: boolean;
  pro: boolean;
  aiAssisted: boolean;
  status: 'active' | 'paused' | 'suspended' | 'deleted';
  createdAt: string;
  lastUpdated: string;
}

interface Order {
  id: string;
  serviceId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'disputed' | 'revision_requested';
  package: 'basic' | 'standard' | 'premium';
  requirements: {
    description: string;
    files: string[];
    answers: Record<string, string>;
  };
  pricing: {
    total: number;
    currency: string;
    serviceFee: number;
    sellerEarnings: number;
  };
  timeline: {
    ordered: string;
    accepted?: string;
    started?: string;
    delivered?: string;
    completed?: string;
    deadline: string;
  };
  communication: {
    messages: number;
    lastMessage: string;
    responseTime: number;
  };
  deliverables: {
    files: string[];
    revisions: number;
    revisionRequests: number;
  };
  review?: {
    rating: number;
    comment: string;
    timestamp: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  email: string;
  location: string;
  languages: string[];
  description: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
  certifications: string[];
  portfolio: string[];
  level: 'new_seller' | 'level_one' | 'level_two' | 'top_rated' | 'top_rated_plus';
  stats: {
    totalOrders: number;
    totalEarnings: number;
    averageRating: number;
    responseTime: number;
    completionRate: number;
    onTimeDelivery: number;
    repeatClients: number;
  };
  verification: {
    identity: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    professional: boolean;
  };
  availability: {
    status: 'available' | 'busy' | 'away';
    maxOrders: number;
    currentOrders: number;
    responseTime: number;
  };
  pricing: {
    hourlyRate: number;
    minimumOrder: number;
    currency: string;
  };
  joinedAt: string;
  lastActive: string;
  isActive: boolean;
}

interface ProfessionalServicesConfig {
  autoMatching: boolean;
  aiRecommendations: boolean;
  qualityControl: boolean;
  disputeResolution: boolean;
  escrowProtection: boolean;
  sellerVerification: boolean;
  buyerProtection: boolean;
  marketplace: {
    featuredServices: boolean;
    topRatedSellers: boolean;
    proServices: boolean;
    newServices: boolean;
    categoryHighlighting: boolean;
  };
  automation: {
    orderProcessing: boolean;
    paymentProcessing: boolean;
    communication: boolean;
    delivery: boolean;
    review: boolean;
    dispute: boolean;
  };
  ai: {
    matching: boolean;
    recommendations: boolean;
    pricing: boolean;
    quality: boolean;
    fraud: boolean;
    optimization: boolean;
  };
  fees: {
    serviceFee: number; // percentage
    proFee: number; // percentage
    processingFee: number; // fixed amount
    currency: string;
  };
}

const ProfessionalServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [config, setConfig] = useState<ProfessionalServicesConfig>({
    autoMatching: true,
    aiRecommendations: true,
    qualityControl: true,
    disputeResolution: true,
    escrowProtection: true,
    sellerVerification: true,
    buyerProtection: true,
    marketplace: {
      featuredServices: true,
      topRatedSellers: true,
      proServices: true,
      newServices: true,
      categoryHighlighting: true
    },
    automation: {
      orderProcessing: true,
      paymentProcessing: true,
      communication: true,
      delivery: true,
      review: true,
      dispute: true
    },
    ai: {
      matching: true,
      recommendations: true,
      pricing: true,
      quality: true,
      fraud: true,
      optimization: true
    },
    fees: {
      serviceFee: 20,
      proFee: 10,
      processingFee: 2,
      currency: 'USD'
    }
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalSellers: 0,
    activeSellers: 0,
    totalOrders: 0,
    completedOrders: 0,
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
        title: 'Professional Logo Design',
        description: 'Create stunning, unique logos for your brand with unlimited revisions',
        category: 'design',
        subcategory: 'logo_design',
        sellerId: 'seller-1',
        sellerName: 'DesignMaster Pro',
        sellerAvatar: '/avatars/design_master.jpg',
        sellerLevel: 'top_rated',
        pricing: {
          type: 'package',
          basic: {
            price: 25,
            currency: 'USD',
            delivery: '3 days',
            revisions: 2,
            features: ['1 concept', 'JPG file', 'Copyright transfer']
          },
          standard: {
            price: 75,
            currency: 'USD',
            delivery: '2 days',
            revisions: 5,
            features: ['3 concepts', 'PNG, JPG files', 'Source file', 'Copyright transfer', 'Priority support']
          },
          premium: {
            price: 150,
            currency: 'USD',
            delivery: '1 day',
            revisions: 'unlimited',
            features: ['5 concepts', 'All file formats', 'Source files', 'Copyright transfer', '24/7 support', 'Social media kit']
          }
        },
        requirements: {
          description: 'Please provide your brand name, industry, color preferences, and any design inspiration',
          files: ['Brand guidelines', 'Inspiration images'],
          questions: ['What is your brand name?', 'What industry are you in?', 'Do you have specific colors in mind?']
        },
        deliverables: {
          items: ['Logo files', 'Brand guidelines', 'Social media versions'],
          formats: ['PNG', 'JPG', 'SVG', 'AI', 'PSD'],
          fileCount: 5,
          sourceFiles: true
        },
        tags: ['logo', 'branding', 'design', 'graphic', 'professional'],
        languages: ['English', 'Spanish'],
        location: 'United States',
        responseTime: 1,
        completionRate: 98.5,
        onTimeDelivery: 96.2,
        rating: 4.9,
        reviews: 234,
        ordersInQueue: 3,
        featured: true,
        pro: true,
        aiAssisted: true,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'service-2',
        title: 'Content Writing & SEO Optimization',
        description: 'High-quality SEO-optimized content that ranks and converts',
        category: 'writing',
        subcategory: 'seo_content',
        sellerId: 'seller-2',
        sellerName: 'ContentExpert',
        sellerAvatar: '/avatars/content_expert.jpg',
        sellerLevel: 'level_two',
        pricing: {
          type: 'fixed',
          basic: {
            price: 50,
            currency: 'USD',
            delivery: '5 days',
            revisions: 2,
            features: ['1000 words', 'SEO optimized', 'Grammar check', 'Keyword research']
          },
          standard: {
            price: 100,
            currency: 'USD',
            delivery: '3 days',
            revisions: 3,
            features: ['2000 words', 'SEO optimized', 'Grammar check', 'Keyword research', 'Meta descriptions', 'Internal linking']
          },
          premium: {
            price: 200,
            currency: 'USD',
            delivery: '2 days',
            revisions: 5,
            features: ['4000 words', 'SEO optimized', 'Grammar check', 'Keyword research', 'Meta descriptions', 'Internal linking', 'Content strategy', 'Performance tracking']
          }
        },
        requirements: {
          description: 'Provide topic, target audience, keywords, and any specific requirements',
          files: ['Brand guidelines', 'Keyword list'],
          questions: ['What is the main topic?', 'Who is your target audience?', 'Do you have target keywords?']
        },
        deliverables: {
          items: ['Written content', 'SEO analysis', 'Keyword report'],
          formats: ['DOCX', 'PDF', 'TXT'],
          fileCount: 3,
          sourceFiles: true
        },
        tags: ['writing', 'seo', 'content', 'blog', 'articles'],
        languages: ['English'],
        location: 'United Kingdom',
        responseTime: 2,
        completionRate: 97.2,
        onTimeDelivery: 94.8,
        rating: 4.8,
        reviews: 189,
        ordersInQueue: 5,
        featured: true,
        pro: false,
        aiAssisted: true,
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'service-3',
        title: 'Web Development - React & Node.js',
        description: 'Full-stack web applications with modern technologies',
        category: 'programming',
        subcategory: 'web_development',
        sellerId: 'seller-3',
        sellerName: 'CodeMaster',
        sellerAvatar: '/avatars/code_master.jpg',
        sellerLevel: 'top_rated_plus',
        pricing: {
          type: 'fixed',
          basic: {
            price: 500,
            currency: 'USD',
            delivery: '7 days',
            revisions: 2,
            features: ['Landing page', 'Responsive design', 'Contact form', 'Basic SEO']
          },
          standard: {
            price: 1500,
            currency: 'USD',
            delivery: '14 days',
            revisions: 5,
            features: ['Full website', 'CMS integration', 'Database setup', 'API integration', 'Advanced SEO', 'Performance optimization']
          },
          premium: {
            price: 3000,
            currency: 'USD',
            delivery: '21 days',
            revisions: 'unlimited',
            features: ['Web application', 'Custom CMS', 'Database design', 'API development', 'Advanced SEO', 'Performance optimization', 'Security audit', 'Deployment', '3 months support']
          }
        },
        requirements: {
          description: 'Detailed project requirements, design mockups, and functionality specifications',
          files: ['Design files', 'Requirements document'],
          questions: ['What type of website do you need?', 'Do you have design mockups?', 'What features are required?']
        },
        deliverables: {
          items: ['Source code', 'Database setup', 'Documentation', 'Deployment files'],
          formats: ['HTML', 'CSS', 'JS', 'React', 'Node.js', 'SQL'],
          fileCount: 20,
          sourceFiles: true
        },
        tags: ['web', 'development', 'react', 'nodejs', 'fullstack'],
        languages: ['English', 'French', 'German'],
        location: 'Germany',
        responseTime: 1,
        completionRate: 99.1,
        onTimeDelivery: 97.8,
        rating: 5.0,
        reviews: 156,
        ordersInQueue: 2,
        featured: true,
        pro: true,
        aiAssisted: true,
        status: 'active',
        createdAt: '2024-01-05T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setServices(mockServices);
  }, []);

  // Mock sellers initialization
  useEffect(() => {
    const mockSellers: Seller[] = [
      {
        id: 'seller-1',
        username: 'designmasterpro',
        displayName: 'DesignMaster Pro',
        avatar: '/avatars/design_master.jpg',
        email: 'contact@designmasterpro.com',
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        description: 'Professional graphic designer with 10+ years of experience in branding and logo design',
        skills: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Adobe Creative Suite', 'Figma'],
        education: [
          { degree: 'Bachelor of Fine Arts', institution: 'Parsons School of Design', year: '2012' }
        ],
        experience: [
          { title: 'Senior Graphic Designer', company: 'Creative Agency', duration: '2018-Present' },
          { title: 'Graphic Designer', company: 'Design Studio', duration: '2014-2018' }
        ],
        certifications: ['Adobe Certified Expert', 'Google UX Design Certificate'],
        portfolio: ['https://designmasterpro.com/portfolio'],
        level: 'top_rated',
        stats: {
          totalOrders: 234,
          totalEarnings: 45600,
          averageRating: 4.9,
          responseTime: 1,
          completionRate: 98.5,
          onTimeDelivery: 96.2,
          repeatClients: 67
        },
        verification: {
          identity: true,
          email: true,
          phone: true,
          address: true,
          professional: true
        },
        availability: {
          status: 'available',
          maxOrders: 10,
          currentOrders: 3,
          responseTime: 1
        },
        pricing: {
          hourlyRate: 75,
          minimumOrder: 25,
          currency: 'USD'
        },
        joinedAt: '2020-01-15T00:00:00Z',
        lastActive: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'seller-2',
        username: 'contentexpert',
        displayName: 'ContentExpert',
        avatar: '/avatars/content_expert.jpg',
        email: 'hello@contentexpert.com',
        location: 'London, UK',
        languages: ['English'],
        description: 'Professional content writer and SEO specialist with expertise in digital marketing',
        skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing', 'Article Writing'],
        education: [
          { degree: 'Bachelor of Arts in English', institution: 'Oxford University', year: '2015' }
        ],
        experience: [
          { title: 'Content Manager', company: 'Marketing Agency', duration: '2019-Present' },
          { title: 'Content Writer', company: 'Digital Media', duration: '2016-2019' }
        ],
        certifications: ['Google SEO Certification', 'HubSpot Content Marketing'],
        portfolio: ['https://contentexpert.com/portfolio'],
        level: 'level_two',
        stats: {
          totalOrders: 189,
          totalEarnings: 23400,
          averageRating: 4.8,
          responseTime: 2,
          completionRate: 97.2,
          onTimeDelivery: 94.8,
          repeatClients: 45
        },
        verification: {
          identity: true,
          email: true,
          phone: true,
          address: true,
          professional: false
        },
        availability: {
          status: 'available',
          maxOrders: 15,
          currentOrders: 5,
          responseTime: 2
        },
        pricing: {
          hourlyRate: 50,
          minimumOrder: 50,
          currency: 'USD'
        },
        joinedAt: '2021-03-10T00:00:00Z',
        lastActive: new Date().toISOString(),
        isActive: true
      }
    ];

    setSellers(mockSellers);
  }, []);

  // Mock orders initialization
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        serviceId: 'service-1',
        buyerId: 'buyer-1',
        buyerName: 'Tech Startup Inc',
        buyerAvatar: '/avatars/tech_startup.jpg',
        sellerId: 'seller-1',
        sellerName: 'DesignMaster Pro',
        status: 'in_progress',
        package: 'premium',
        requirements: {
          description: 'Need a modern tech logo for our AI startup',
          files: ['/uploads/tech_requirements.pdf'],
          answers: {
            'What is your brand name?': 'TechAI Solutions',
            'What industry are you in?': 'Artificial Intelligence',
            'Do you have specific colors in mind?': 'Blue and white theme'
          }
        },
        pricing: {
          total: 150,
          currency: 'USD',
          serviceFee: 30,
          sellerEarnings: 120
        },
        timeline: {
          ordered: new Date(Date.now() - 86400000).toISOString(),
          accepted: new Date(Date.now() - 72000000).toISOString(),
          started: new Date(Date.now() - 36000000).toISOString(),
          deadline: new Date(Date.now() + 86400000).toISOString()
        },
        communication: {
          messages: 8,
          lastMessage: 'Working on the 3rd concept, will send preview soon',
          responseTime: 2
        },
        deliverables: {
          files: [],
          revisions: 0,
          revisionRequests: 0
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'order-2',
        serviceId: 'service-2',
        buyerId: 'buyer-2',
        buyerName: 'E-commerce Store',
        buyerAvatar: '/avatars/ecommerce_store.jpg',
        sellerId: 'seller-2',
        sellerName: 'ContentExpert',
        status: 'completed',
        package: 'standard',
        requirements: {
          description: '10 product descriptions for our online store',
          files: ['/uploads/product_list.xlsx'],
          answers: {
            'What is the main topic?': 'Product descriptions',
            'Who is your target audience?': 'Online shoppers',
            'Do you have target keywords?': 'Provided in file'
          }
        },
        pricing: {
          total: 100,
          currency: 'USD',
          serviceFee: 20,
          sellerEarnings: 80
        },
        timeline: {
          ordered: new Date(Date.now() - 604800000).toISOString(),
          accepted: new Date(Date.now() - 518400000).toISOString(),
          started: new Date(Date.now() - 432000000).toISOString(),
          delivered: new Date(Date.now() - 86400000).toISOString(),
          completed: new Date(Date.now() - 43200000).toISOString(),
          deadline: new Date(Date.now() - 86400000).toISOString()
        },
        communication: {
          messages: 12,
          lastMessage: 'Thank you for the great work!',
          responseTime: 3
        },
        deliverables: {
          files: ['/uploads/product_descriptions.docx', '/uploads/seo_report.pdf'],
          revisions: 1,
          revisionRequests: 1
        },
        review: {
          rating: 5.0,
          comment: 'Excellent work! Fast delivery and high-quality content.',
          timestamp: new Date(Date.now() - 43200000).toISOString()
        },
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString()
      }
    ];

    setOrders(mockOrders);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Update service performance
      setServices(prev => prev.map(service => {
        if (Math.random() > 0.8) { // 20% chance of update
          const newReviews = Math.floor(Math.random() * 3) + 1;
          const newRating = Math.max(4.0, Math.min(5.0, service.rating + (Math.random() * 0.2 - 0.1)));
          
          return {
            ...service,
            reviews: service.reviews + newReviews,
            rating: newRating,
            completionRate: Math.min(100, service.completionRate + Math.random() * 2),
            onTimeDelivery: Math.min(100, service.onTimeDelivery + Math.random() * 2),
            lastUpdated: new Date().toISOString()
          };
        }
        return service;
      }));

      // Update order progress
      setOrders(prev => prev.map(order => {
        if (order.status === 'in_progress') {
          const progressIncrement = Math.random() * 20 + 10;
          
          // Simulate order completion
          if (Math.random() > 0.9) { // 10% chance
            return {
              ...order,
              status: 'delivered',
              timeline: {
                ...order.timeline,
                delivered: new Date().toISOString()
              },
              updatedAt: new Date().toISOString()
            };
          }
        }
        return order;
      }));

      // Auto new service creation
      if (Math.random() > 0.95) { // 5% chance
        const categories: Service['category'][] = ['writing', 'design', 'programming', 'marketing', 'video', 'audio', 'business', 'data', 'translation', 'consulting'];
        const newService: Service = {
          id: `service-${Date.now()}`,
          title: `AI-Enhanced ${categories[Math.floor(Math.random() * categories.length)].charAt(0).toUpperCase() + categories[Math.floor(Math.random() * categories.length)].slice(1)} Service`,
          description: 'Professional service with AI assistance for optimal results',
          category: categories[Math.floor(Math.random() * categories.length)],
          subcategory: 'ai_enhanced',
          sellerId: `seller-${Math.floor(Math.random() * 3) + 1}`,
          sellerName: 'AI Professional',
          sellerAvatar: '/avatars/ai_professional.jpg',
          sellerLevel: 'level_one',
          pricing: {
            type: 'fixed',
            basic: {
              price: Math.floor(Math.random() * 200) + 25,
              currency: 'USD',
              delivery: `${Math.floor(Math.random() * 7) + 1} days`,
              revisions: Math.floor(Math.random() * 3) + 1,
              features: ['Professional quality', 'Fast delivery', 'Revisions included']
            }
          },
          requirements: {
            description: 'Provide your requirements and specifications',
            files: [],
            questions: ['What are your specific requirements?']
          },
          deliverables: {
            items: ['Professional deliverables'],
            formats: ['Digital files'],
            fileCount: Math.floor(Math.random() * 5) + 1,
            sourceFiles: false
          },
          tags: ['ai', 'professional', 'quality'],
          languages: ['English'],
          location: 'Global',
          responseTime: Math.floor(Math.random() * 24) + 1,
          completionRate: 95,
          onTimeDelivery: 90,
          rating: 4.5,
          reviews: 0,
          ordersInQueue: 0,
          featured: false,
          pro: false,
          aiAssisted: true,
          status: 'active',
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };

        setServices(prev => [...prev, newService]);
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [isOperating]);

  // Update stats
  useEffect(() => {
    const activeServices = services.filter(s => s.status === 'active').length;
    const activeSellers = sellers.filter(s => s.isActive).length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.total, 0);
    const averageRating = services.length > 0 
      ? services.reduce((sum, s) => sum + s.rating, 0) / services.length 
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
      totalSellers: sellers.length,
      activeSellers,
      totalOrders: orders.length,
      completedOrders,
      totalRevenue,
      averageRating,
      bestCategory: bestCategory?.category || ''
    });
  }, [services, sellers, orders]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const createOrder = (serviceId: string, packageType: 'basic' | 'standard' | 'premium') => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const packagePricing = service.pricing[packageType];
    const serviceFee = (packagePricing.price * config.fees.serviceFee) / 100;
    const processingFee = config.fees.processingFee;
    const total = packagePricing.price + serviceFee + processingFee;
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      serviceId,
      buyerId: `buyer-${Date.now()}`,
      buyerName: 'New Buyer',
      buyerAvatar: '/avatars/new_buyer.jpg',
      sellerId: service.sellerId,
      sellerName: service.sellerName,
      status: 'pending',
      package: packageType,
      requirements: {
        description: 'New order requirements',
        files: [],
        answers: {}
      },
      pricing: {
        total,
        currency: service.pricing.basic.currency,
        serviceFee,
        sellerEarnings: packagePricing.price,
      },
      timeline: {
        ordered: new Date().toISOString(),
        deadline: new Date(Date.now() + (parseInt(packagePricing.delivery.split(' ')[0]) * 24 * 60 * 60 * 1000)).toISOString()
      },
      communication: {
        messages: 0,
        lastMessage: '',
        responseTime: 0
      },
      deliverables: {
        files: [],
        revisions: 0,
        revisionRequests: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [...prev, newOrder]);

    // Simulate order acceptance
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id 
          ? {
              ...order,
              status: 'accepted',
              timeline: {
                ...order.timeline,
                accepted: new Date().toISOString()
              }
            }
          : order
      ));
    }, 30000); // 30 seconds
  };

  const getCategoryColor = (category: Service['category']) => {
    switch (category) {
      case 'writing': return 'bg-blue-600';
      case 'design': return 'bg-purple-600';
      case 'programming': return 'bg-green-600';
      case 'marketing': return 'bg-orange-600';
      case 'video': return 'bg-red-600';
      case 'audio': return 'bg-yellow-600';
      case 'business': return 'bg-pink-600';
      case 'data': return 'bg-cyan-600';
      case 'translation': return 'bg-indigo-600';
      case 'consulting': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getLevelColor = (level: Service['sellerLevel']) => {
    switch (level) {
      case 'new_seller': return 'bg-gray-600';
      case 'level_one': return 'bg-green-600';
      case 'level_two': return 'bg-blue-600';
      case 'top_rated': return 'bg-purple-600';
      case 'top_rated_plus': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'suspended': return 'bg-red-600';
      case 'deleted': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredServices = () => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
      const matchesLevel = filterLevel === 'all' || service.sellerLevel === filterLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-purple-400" />
            Professional Services
          </h1>
          <p className="text-gray-400">
            Build professional services system for Fiverr-like platforms
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
                <div className="text-sm text-gray-400">Active Sellers</div>
                <div className="text-2xl font-bold">{stats.activeSellers}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Total Orders</div>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
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
            <h2 className="text-xl font-semibold">Professional Services Operations</h2>
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
              Completed Orders: {stats.completedOrders} | 
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
                <option value="writing">Writing</option>
                <option value="design">Design</option>
                <option value="programming">Programming</option>
                <option value="marketing">Marketing</option>
              </select>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Levels</option>
                <option value="new_seller">New Seller</option>
                <option value="level_one">Level One</option>
                <option value="level_two">Level Two</option>
                <option value="top_rated">Top Rated</option>
                <option value="top_rated_plus">Top Rated Plus</option>
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
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{service.title}</h4>
                        <div className="text-sm text-gray-400">{service.sellerName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getLevelColor(service.sellerLevel)}`}>
                        {service.sellerLevel.replace('_', ' ')}
                      </span>
                      {service.pro && <span className="px-2 py-1 rounded text-xs bg-orange-600">PRO</span>}
                      {service.aiAssisted && <span className="px-2 py-1 rounded text-xs bg-blue-600">AI</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Starting at:</span> ${service.pricing.basic.price}
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span> {service.rating.toFixed(1)}/5.0
                    </div>
                    <div>
                      <span className="text-gray-400">Reviews:</span> {service.reviews}
                    </div>
                    <div>
                      <span className="text-gray-400">Delivery:</span> {service.pricing.basic.delivery}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${(service.rating / 5) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {service.ordersInQueue} in queue | {service.responseTime}h response
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          createOrder(service.id, 'basic');
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Order Basic
                      </button>
                      {service.pricing.standard && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            createOrder(service.id, 'standard');
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                        >
                          Order Standard
                        </button>
                      )}
                      {service.pricing.premium && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            createOrder(service.id, 'premium');
                          }}
                          className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                        >
                          Order Premium
                        </button>
                      )}
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
              <h3 className="text-lg font-semibold mb-4">Service Details: {selectedService.title}</h3>
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
                        <span className="text-gray-400">Seller:</span>
                        <span className="font-medium">{selectedService.sellerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getLevelColor(selectedService.sellerLevel)}`}>
                          {selectedService.sellerLevel.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="font-medium">{selectedService.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="font-medium">{selectedService.rating.toFixed(1)}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reviews:</span>
                        <span className="font-medium">{selectedService.reviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Rate:</span>
                        <span className="font-medium">{selectedService.completionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">On-Time Delivery:</span>
                        <span className="font-medium">{selectedService.onTimeDelivery.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Basic Package</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="font-medium">${selectedService.pricing.basic.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery:</span>
                        <span className="font-medium">{selectedService.pricing.basic.delivery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revisions:</span>
                        <span className="font-medium">{selectedService.pricing.basic.revisions}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Features</h4>
                    <div className="space-y-1">
                      {selectedService.pricing.basic.features.map((feature, index) => (
                        <div key={index} className="text-sm text-gray-300">
                          <span className="text-purple-400">+</span> {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedService.description}</p>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tags.map((tag, index) => (
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

        {/* Orders */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {orders.slice(-10).map((order) => (
              <div key={order.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{order.buyerName}</h4>
                    <div className="text-sm text-gray-400">
                      {order.sellerName} - {order.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-600' :
                      order.status === 'in_progress' ? 'bg-blue-600' :
                      order.status === 'delivered' ? 'bg-purple-600' :
                      order.status === 'pending' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${order.pricing.total}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Package:</span> {order.package}
                  </div>
                  <div>
                    <span className="text-gray-400">Deadline:</span> {new Date(order.timeline.deadline).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Messages:</span> {order.communication.messages}
                  </div>
                  <div>
                    <span className="text-gray-400">Revisions:</span> {order.deliverables.revisions}/{order.deliverables.revisionRequests}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      order.status === 'completed' ? 'bg-green-500' :
                      order.status === 'in_progress' ? 'bg-blue-500' :
                      order.status === 'delivered' ? 'bg-purple-500' :
                      order.status === 'pending' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}
                    style={{ width: order.status === 'completed' ? '100%' : order.status === 'in_progress' ? '60%' : order.status === 'delivered' ? '90%' : '20%' }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {order.requirements.description.substring(0, 100)}...
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {order.review && (
                  <div className="mt-4 p-3 bg-gray-600 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{order.review.rating}/5.0</span>
                    </div>
                    <p className="text-sm text-gray-300">{order.review.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No orders found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Professional Services Settings</h2>
              
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
                        checked={config.escrowProtection}
                        onChange={(e) => setConfig(prev => ({ ...prev, escrowProtection: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Escrow Protection</span>
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
                        checked={config.marketplace.topRatedSellers}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, topRatedSellers: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Top Rated Sellers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketplace.proServices}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          marketplace: { ...prev.marketplace, proServices: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Pro Services</span>
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
                  <h4 className="font-medium text-purple-400">Fees</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Fee (%)</label>
                      <input
                        type="number"
                        value={config.fees.serviceFee}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          fees: { ...prev.fees, serviceFee: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pro Fee (%)</label>
                      <input
                        type="number"
                        value={config.fees.proFee}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          fees: { ...prev.fees, proFee: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Processing Fee ($)</label>
                      <input
                        type="number"
                        value={config.fees.processingFee}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          fees: { ...prev.fees, processingFee: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="10"
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

export default ProfessionalServices;
