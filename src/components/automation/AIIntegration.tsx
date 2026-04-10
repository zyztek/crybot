/**
 * AI Integration Component
 * 
 * Implement AI integration system with free models and services
 * Comprehensive AI model integration with free APIs, local models, and AI services
 */

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Cpu, Globe, Database, Cloud, Code } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'code' | 'multimodal' | 'embedding' | 'translation' | 'summarization' | 'classification';
  category: 'free' | 'freemium' | 'open_source' | 'api' | 'local' | 'cloud' | 'hybrid';
  description: string;
  capabilities: {
    textGeneration: boolean;
    imageGeneration: boolean;
    codeGeneration: boolean;
    translation: boolean;
    summarization: boolean;
    analysis: boolean;
    reasoning: boolean;
    creativity: boolean;
  };
  pricing: {
    model: 'free' | 'pay_per_use' | 'subscription' | 'credits' | 'unlimited';
    rate: number;
    currency: string;
    unit: 'request' | 'token' | 'minute' | 'hour' | 'day' | 'month';
    freeTier: {
      requestsPerDay?: number;
      tokensPerMonth?: number;
      features: string[];
    };
    paidTier?: {
      requestsPerDay?: number;
      tokensPerMonth?: number;
      features: string[];
    };
  };
  performance: {
    accuracy: number; // 0-100
    speed: number; // requests per minute
    reliability: number; // 0-100
    latency: number; // milliseconds
    quality: 'basic' | 'standard' | 'high' | 'premium';
  };
  integration: {
    apiEndpoint: string;
    authentication: 'none' | 'api_key' | 'oauth' | 'token';
    documentation: string;
    libraries: string[];
    examples: string[];
  };
  usage: {
    totalRequests: number;
    totalTokens: number;
    totalCost: number;
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
    lastUsed: string;
  };
  features: {
    contextWindow: number;
    maxTokens: number;
    languages: string[];
    formats: string[];
    customModels: boolean;
    fineTuning: boolean;
    batchProcessing: boolean;
    streaming: boolean;
  };
  limitations: {
    rateLimit: number;
    contentPolicy: string[];
    dataPrivacy: string;
    commercialUse: boolean;
    modelSize: string;
  };
  status: 'active' | 'inactive' | 'limited' | 'deprecated' | 'error';
  createdAt: string;
  lastUpdated: string;
  isActive: boolean;
}

interface AIRequest {
  id: string;
  modelId: string;
  modelName: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'code' | 'multimodal';
  input: {
    prompt: string;
    context?: string;
    parameters?: Record<string, any>;
    files?: string[];
  };
  output: {
    response?: string;
    data?: any;
    tokens?: number;
    processingTime?: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  performance: {
    startTime: string;
    endTime?: string;
    duration?: number;
    tokensUsed?: number;
    cost?: number;
    quality?: number;
  };
  error?: {
    code: string;
    message: string;
    retryCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface AIIntegrationConfig {
  autoMode: boolean;
  loadBalancing: boolean;
  failover: boolean;
  caching: boolean;
  optimization: boolean;
  monitoring: boolean;
  providers: {
    openai: boolean;
    google: boolean;
    anthropic: boolean;
    huggingface: boolean;
    cohere: boolean;
    stability: boolean;
    replicate: boolean;
    local: boolean;
  };
  routing: {
    strategy: 'round_robin' | 'least_cost' | 'fastest' | 'highest_quality' | 'custom';
    fallback: boolean;
    retryAttempts: number;
    timeout: number; // seconds
  };
  performance: {
    maxConcurrent: number;
    queueSize: number;
    cacheSize: number;
    cacheTTL: number; // hours
    compression: boolean;
  };
  security: {
    encryption: boolean;
    anonymization: boolean;
    audit: boolean;
    compliance: boolean;
    dataRetention: number; // days
  };
  cost: {
    budgetLimit: number;
    dailyLimit: number;
    alerts: boolean;
    optimization: boolean;
    tracking: boolean;
  };
}

const AIIntegration: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [requests, setRequests] = useState<AIRequest[]>([]);
  const [config, setConfig] = useState<AIIntegrationConfig>({
    autoMode: true,
    loadBalancing: true,
    failover: true,
    caching: true,
    optimization: true,
    monitoring: true,
    providers: {
      openai: true,
      google: true,
      anthropic: true,
      huggingface: true,
      cohere: true,
      stability: true,
      replicate: true,
      local: true
    },
    routing: {
      strategy: 'least_cost',
      fallback: true,
      retryAttempts: 3,
      timeout: 30
    },
    performance: {
      maxConcurrent: 10,
      queueSize: 100,
      cacheSize: 1000,
      cacheTTL: 24,
      compression: true
    },
    security: {
      encryption: true,
      anonymization: true,
      audit: true,
      compliance: true,
      dataRetention: 30
    },
    cost: {
      budgetLimit: 1000,
      dailyLimit: 100,
      alerts: true,
      optimization: true,
      tracking: true
    }
  });
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AIRequest | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [stats, setStats] = useState({
    totalModels: 0,
    activeModels: 0,
    totalRequests: 0,
    completedRequests: 0,
    totalCost: 0,
    averageQuality: 0,
    bestProvider: '',
    tokensProcessed: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock AI models initialization
  useEffect(() => {
    const mockModels: AIModel[] = [
      {
        id: 'model-1',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        type: 'text',
        category: 'freemium',
        description: 'Fast and efficient language model for general text generation tasks',
        capabilities: {
          textGeneration: true,
          imageGeneration: false,
          codeGeneration: true,
          translation: true,
          summarization: true,
          analysis: true,
          reasoning: true,
          creativity: true
        },
        pricing: {
          model: 'pay_per_use',
          rate: 0.002,
          currency: 'USD',
          unit: '1K tokens',
          freeTier: {
            requestsPerDay: 100,
            tokensPerMonth: 100000,
            features: ['Basic generation', 'Standard quality']
          },
          paidTier: {
            requestsPerDay: 1000,
            tokensPerMonth: 1000000,
            features: ['Priority access', 'Higher quality', 'Custom models']
          }
        },
        performance: {
          accuracy: 94.5,
          speed: 60,
          reliability: 98.2,
          latency: 800,
          quality: 'high'
        },
        integration: {
          apiEndpoint: 'https://api.openai.com/v1/chat/completions',
          authentication: 'api_key',
          documentation: 'https://platform.openai.com/docs',
          libraries: ['openai-python', 'openai-node'],
          examples: ['text-generation', 'code-completion', 'translation']
        },
        usage: {
          totalRequests: 1250,
          totalTokens: 2500000,
          totalCost: 5.00,
          averageResponseTime: 850,
          successRate: 98.2,
          errorRate: 1.8,
          lastUsed: new Date().toISOString()
        },
        features: {
          contextWindow: 16384,
          maxTokens: 4096,
          languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
          formats: ['JSON', 'Markdown', 'Plain text'],
          customModels: true,
          fineTuning: true,
          batchProcessing: true,
          streaming: true
        },
        limitations: {
          rateLimit: 3500,
          contentPolicy: ['No illegal content', 'No hate speech', 'No violence'],
          dataPrivacy: '30 days retention',
          commercialUse: true,
          modelSize: '175B parameters'
        },
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'model-2',
        name: 'Gemini Pro',
        provider: 'Google',
        type: 'multimodal',
        category: 'free',
        description: 'Multimodal AI model supporting text, images, and video processing',
        capabilities: {
          textGeneration: true,
          imageGeneration: false,
          codeGeneration: true,
          translation: true,
          summarization: true,
          analysis: true,
          reasoning: true,
          creativity: true
        },
        pricing: {
          model: 'free',
          rate: 0,
          currency: 'USD',
          unit: 'request',
          freeTier: {
            requestsPerDay: 60,
            tokensPerMonth: 1000000,
            features: ['Text generation', 'Image analysis', 'Video analysis']
          }
        },
        performance: {
          accuracy: 93.8,
          speed: 45,
          reliability: 97.5,
          latency: 1200,
          quality: 'high'
        },
        integration: {
          apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro',
          authentication: 'api_key',
          documentation: 'https://ai.google.dev/docs',
          libraries: ['google-generativeai', 'vertex-ai'],
          examples: ['multimodal-analysis', 'text-generation', 'image-understanding']
        },
        usage: {
          totalRequests: 890,
          totalTokens: 1780000,
          totalCost: 0,
          averageResponseTime: 1250,
          successRate: 97.5,
          errorRate: 2.5,
          lastUsed: new Date().toISOString()
        },
        features: {
          contextWindow: 32768,
          maxTokens: 8192,
          languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Hindi', 'Arabic'],
          formats: ['JSON', 'Markdown', 'Plain text', 'HTML'],
          customModels: false,
          fineTuning: false,
          batchProcessing: true,
          streaming: true
        },
        limitations: {
          rateLimit: 60,
          contentPolicy: ['Google AI content policies'],
          dataPrivacy: 'Google privacy policy',
          commercialUse: true,
          modelSize: 'Proprietary'
        },
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'model-3',
        name: 'Llama 2 7B',
        provider: 'Meta',
        type: 'text',
        category: 'open_source',
        description: 'Open-source language model for local deployment and customization',
        capabilities: {
          textGeneration: true,
          imageGeneration: false,
          codeGeneration: true,
          translation: true,
          summarization: true,
          analysis: true,
          reasoning: true,
          creativity: true
        },
        pricing: {
          model: 'free',
          rate: 0,
          currency: 'USD',
          unit: 'request',
          freeTier: {
            requestsPerDay: -1, // unlimited
            tokensPerMonth: -1, // unlimited
            features: ['Local deployment', 'Custom fine-tuning', 'Commercial use']
          }
        },
        performance: {
          accuracy: 89.2,
          speed: 120,
          reliability: 95.8,
          latency: 2000,
          quality: 'standard'
        },
        integration: {
          apiEndpoint: 'local',
          authentication: 'none',
          documentation: 'https://llama.meta.com/docs',
          libraries: ['transformers', 'llama-cpp', 'ollama'],
          examples: ['local-inference', 'fine-tuning', 'quantization']
        },
        usage: {
          totalRequests: 2340,
          totalTokens: 4680000,
          totalCost: 0,
          averageResponseTime: 2100,
          successRate: 95.8,
          errorRate: 4.2,
          lastUsed: new Date().toISOString()
        },
        features: {
          contextWindow: 4096,
          maxTokens: 2048,
          languages: ['English', 'Spanish', 'French', 'German'],
          formats: ['Plain text', 'JSON'],
          customModels: true,
          fineTuning: true,
          batchProcessing: true,
          streaming: false
        },
        limitations: {
          rateLimit: -1, // unlimited
          contentPolicy: ['Meta content policies'],
          dataPrivacy: 'Local processing',
          commercialUse: true,
          modelSize: '7B parameters'
        },
        status: 'active',
        createdAt: '2024-01-05T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: 'model-4',
        name: 'Stable Diffusion XL',
        provider: 'Stability AI',
        type: 'image',
        category: 'freemium',
        description: 'Advanced image generation model for creating high-quality images',
        capabilities: {
          textGeneration: false,
          imageGeneration: true,
          codeGeneration: false,
          translation: false,
          summarization: false,
          analysis: false,
          reasoning: false,
          creativity: true
        },
        pricing: {
          model: 'credits',
          rate: 1,
          currency: 'credits',
          unit: 'generation',
          freeTier: {
            requestsPerDay: 25,
            tokensPerMonth: 100,
            features: ['Standard resolution', 'Basic styles']
          },
          paidTier: {
            requestsPerDay: 500,
            tokensPerMonth: 10000,
            features: ['High resolution', 'Custom styles', 'Commercial license']
          }
        },
        performance: {
          accuracy: 91.5,
          speed: 15,
          reliability: 96.2,
          latency: 3000,
          quality: 'premium'
        },
        integration: {
          apiEndpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0',
          authentication: 'api_key',
          documentation: 'https://stability.ai/docs',
          libraries: ['stability-sdk', 'diffusers'],
          examples: ['text-to-image', 'image-to-image', 'inpainting']
        },
        usage: {
          totalRequests: 450,
          totalTokens: 450,
          totalCost: 425,
          averageResponseTime: 3200,
          successRate: 96.2,
          errorRate: 3.8,
          lastUsed: new Date().toISOString()
        },
        features: {
          contextWindow: 77,
          maxTokens: 77,
          languages: ['English', 'Spanish', 'French', 'German'],
          formats: ['PNG', 'JPEG'],
          customModels: true,
          fineTuning: true,
          batchProcessing: true,
          streaming: false
        },
        limitations: {
          rateLimit: 150,
          contentPolicy: ['No inappropriate content', 'No copyrighted characters'],
          dataPrivacy: '30 days retention',
          commercialUse: true,
          modelSize: '2.3B parameters'
        },
        status: 'active',
        createdAt: '2024-01-08T00:00:00Z',
        lastUpdated: new Date().toISOString(),
        isActive: true
      }
    ];

    setModels(mockModels);
  }, []);

  // Mock requests initialization
  useEffect(() => {
    const mockRequests: AIRequest[] = [
      {
        id: 'request-1',
        modelId: 'model-1',
        modelName: 'GPT-3.5 Turbo',
        type: 'text',
        input: {
          prompt: 'Write a professional email about project update',
          context: 'Team meeting notes and project timeline',
          parameters: { temperature: 0.7, max_tokens: 500 }
        },
        output: {
          response: 'Dear Team,\n\nI hope this email finds you well...',
          tokens: 245,
          processingTime: 850
        },
        status: 'completed',
        performance: {
          startTime: new Date(Date.now() - 3000000).toISOString(),
          endTime: new Date(Date.now() - 2991500).toISOString(),
          duration: 850,
          tokensUsed: 245,
          cost: 0.00049,
          quality: 94.5
        },
        createdAt: new Date(Date.now() - 3000000).toISOString(),
        updatedAt: new Date(Date.now() - 2991500).toISOString()
      },
      {
        id: 'request-2',
        modelId: 'model-2',
        modelName: 'Gemini Pro',
        type: 'multimodal',
        input: {
          prompt: 'Analyze this image and describe what you see',
          context: 'Product catalog analysis',
          files: ['/uploads/product_image.jpg']
        },
        output: {
          response: 'This image shows a modern smartphone...',
          tokens: 180,
          processingTime: 1200
        },
        status: 'completed',
        performance: {
          startTime: new Date(Date.now() - 1800000).toISOString(),
          endTime: new Date(Date.now() - 1798000).toISOString(),
          duration: 1200,
          tokensUsed: 180,
          cost: 0,
          quality: 93.8
        },
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date(Date.now() - 1798000).toISOString()
      }
    ];

    setRequests(mockRequests);
  }, []);

  // Auto AI operations simulation
  useEffect(() => {
    if (!config.autoMode || !isOperating) return;

    const interval = setInterval(() => {
      // Process AI requests
      models.forEach(model => {
        if (model.isActive && Math.random() > 0.7) { // 30% chance
          const success = Math.random() * 100 < model.performance.reliability;
          const tokens = Math.floor(Math.random() * 1000) + 100;
          const processingTime = model.performance.latency + (Math.random() * 500 - 250);
          const cost = (tokens / 1000) * model.pricing.rate;
          
          const newRequest: AIRequest = {
            id: `request-${Date.now()}-${Math.random()}`,
            modelId: model.id,
            modelName: model.name,
            type: model.type,
            input: {
              prompt: `Auto-generated request for ${model.name}`,
              context: 'Automated processing',
              parameters: { auto: true }
            },
            output: success ? {
              response: `Generated response from ${model.name}`,
              tokens,
              processingTime
            } : undefined,
            status: success ? 'completed' : 'failed',
            performance: {
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + processingTime).toISOString(),
              duration: processingTime,
              tokensUsed: tokens,
              cost,
              quality: success ? model.performance.accuracy : 0
            },
            error: success ? undefined : {
              code: 'PROCESSING_ERROR',
              message: 'Failed to process request',
              retryCount: 1
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date(Date.now() + processingTime).toISOString()
          };

          setRequests(prev => [...prev, newRequest]);

          // Update model usage
          setModels(prev => prev.map(m => 
            m.id === model.id 
              ? {
                  ...m,
                  usage: {
                    ...m.usage,
                    totalRequests: m.usage.totalRequests + 1,
                    totalTokens: m.usage.totalTokens + tokens,
                    totalCost: m.usage.totalCost + cost,
                    averageResponseTime: (m.usage.averageResponseTime + processingTime) / 2,
                    successRate: m.usage.totalRequests > 0 
                      ? ((m.usage.successRate * m.usage.totalRequests + (success ? 100 : 0)) / (m.usage.totalRequests + 1))
                      : success ? 100 : 0,
                    errorRate: m.usage.totalRequests > 0 
                      ? ((m.usage.errorRate * m.usage.totalRequests + (success ? 0 : 100)) / (m.usage.totalRequests + 1))
                      : success ? 0 : 100,
                    lastUsed: new Date().toISOString()
                  },
                  lastUpdated: new Date().toISOString()
                }
              : m
          ));
        }
      });

      // Auto model discovery
      if (Math.random() > 0.9) { // 10% chance
        const providers = ['OpenAI', 'Google', 'Anthropic', 'Hugging Face', 'Cohere', 'Stability AI', 'Replicate'];
        const types: AIModel['type'][] = ['text', 'image', 'audio', 'video', 'code', 'multimodal', 'embedding', 'translation', 'summarization', 'classification'];
        const categories: AIModel['category'][] = ['free', 'freemium', 'open_source', 'api', 'local'];
        
        const newModel: AIModel = {
          id: `model-${Date.now()}`,
          name: `Discovered ${types[Math.floor(Math.random() * types.length)].charAt(0).toUpperCase() + types[Math.floor(Math.random() * types.length)].slice(1)} Model`,
          provider: providers[Math.floor(Math.random() * providers.length)],
          type: types[Math.floor(Math.random() * types.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          description: 'Automatically discovered AI model',
          capabilities: {
            textGeneration: Math.random() > 0.5,
            imageGeneration: Math.random() > 0.8,
            codeGeneration: Math.random() > 0.6,
            translation: Math.random() > 0.7,
            summarization: Math.random() > 0.6,
            analysis: Math.random() > 0.5,
            reasoning: Math.random() > 0.4,
            creativity: Math.random() > 0.5
          },
          pricing: {
            model: Math.random() > 0.5 ? 'free' : 'pay_per_use',
            rate: Math.random() * 0.01,
            currency: 'USD',
            unit: 'request',
            freeTier: {
              requestsPerDay: Math.floor(Math.random() * 100) + 10,
              tokensPerMonth: Math.floor(Math.random() * 100000) + 10000,
              features: ['Basic functionality']
            }
          },
          performance: {
            accuracy: Math.random() * 20 + 80,
            speed: Math.random() * 100 + 20,
            reliability: Math.random() * 20 + 80,
            latency: Math.random() * 2000 + 500,
            quality: 'standard'
          },
          integration: {
            apiEndpoint: 'https://api.example.com/v1',
            authentication: 'api_key',
            documentation: 'https://docs.example.com',
            libraries: ['example-sdk'],
            examples: ['basic-usage']
          },
          usage: {
            totalRequests: 0,
            totalTokens: 0,
            totalCost: 0,
            averageResponseTime: 0,
            successRate: 0,
            errorRate: 0,
            lastUsed: new Date().toISOString()
          },
          features: {
            contextWindow: Math.floor(Math.random() * 16000) + 1000,
            maxTokens: Math.floor(Math.random() * 4000) + 500,
            languages: ['English'],
            formats: ['JSON', 'Plain text'],
            customModels: false,
            fineTuning: false,
            batchProcessing: true,
            streaming: false
          },
          limitations: {
            rateLimit: Math.floor(Math.random() * 1000) + 100,
            contentPolicy: ['Standard content policy'],
            dataPrivacy: 'Standard privacy policy',
            commercialUse: true,
            modelSize: 'Unknown'
          },
          status: 'active',
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          isActive: true
        };

        setModels(prev => [...prev, newModel]);
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [config.autoMode, isOperating]);

  // Update stats
  useEffect(() => {
    const activeModels = models.filter(m => m.isActive).length;
    const completedRequests = requests.filter(r => r.status === 'completed').length;
    const totalCost = models.reduce((sum, m) => sum + m.usage.totalCost, 0);
    const averageQuality = models.length > 0 
      ? models.reduce((sum, m) => sum + m.performance.accuracy, 0) / models.length 
      : 0;
    const tokensProcessed = models.reduce((sum, m) => sum + m.usage.totalTokens, 0);
    
    const providerCounts = models.reduce((acc, model) => {
      acc[model.provider] = (acc[model.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestProvider = Object.entries(providerCounts).reduce((best, [provider, count]) => 
      count > (best?.count || 0) ? { provider, count } : best, null as { provider: string; count: number } | null);

    setStats({
      totalModels: models.length,
      activeModels,
      totalRequests: requests.length,
      completedRequests,
      totalCost,
      averageQuality,
      bestProvider: bestProvider?.provider || '',
      tokensProcessed
    });
  }, [models, requests]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const executeModel = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    const newRequest: AIRequest = {
      id: `request-${Date.now()}`,
      modelId,
      modelName: model.name,
      type: model.type,
      input: {
        prompt: `Manual request to ${model.name}`,
        context: 'User initiated',
        parameters: { manual: true }
      },
      output: undefined,
      status: 'pending',
      performance: {
        startTime: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRequests(prev => [...prev, newRequest]);

    // Simulate processing
    setTimeout(() => {
      const success = Math.random() * 100 < model.performance.reliability;
      const tokens = Math.floor(Math.random() * 500) + 100;
      const processingTime = model.performance.latency + (Math.random() * 300 - 150);
      const cost = (tokens / 1000) * model.pricing.rate;

      setRequests(prev => prev.map(req => 
        req.id === newRequest.id 
          ? {
              ...req,
              output: success ? {
                response: `Manual response from ${model.name}`,
                tokens,
                processingTime
              } : undefined,
              status: success ? 'completed' : 'failed',
              performance: {
                ...req.performance,
                endTime: new Date().toISOString(),
                duration: processingTime,
                tokensUsed: tokens,
                cost,
                quality: success ? model.performance.accuracy : 0
              },
              error: success ? undefined : {
                code: 'MANUAL_ERROR',
                message: 'Manual processing failed',
                retryCount: 0
              },
              updatedAt: new Date().toISOString()
            }
          : req
      ));

      // Update model usage
      setModels(prev => prev.map(m => 
        m.id === modelId 
          ? {
              ...m,
              usage: {
                ...m.usage,
                totalRequests: m.usage.totalRequests + 1,
                totalTokens: m.usage.totalTokens + tokens,
                totalCost: m.usage.totalCost + cost,
                averageResponseTime: (m.usage.averageResponseTime + processingTime) / 2,
                successRate: m.usage.totalRequests > 0 
                  ? ((m.usage.successRate * m.usage.totalRequests + (success ? 100 : 0)) / (m.usage.totalRequests + 1))
                  : success ? 100 : 0,
                errorRate: m.usage.totalRequests > 0 
                  ? ((m.usage.errorRate * m.usage.totalRequests + (success ? 0 : 100)) / (m.usage.totalRequests + 1))
                  : success ? 0 : 100,
                lastUsed: new Date().toISOString()
              },
              lastUpdated: new Date().toISOString()
            }
          : m
      ));
    }, model.performance.latency);
  };

  const getTypeColor = (type: AIModel['type']) => {
    switch (type) {
      case 'text': return 'bg-blue-600';
      case 'image': return 'bg-purple-600';
      case 'audio': return 'bg-green-600';
      case 'video': return 'bg-orange-600';
      case 'code': return 'bg-red-600';
      case 'multimodal': return 'bg-yellow-600';
      case 'embedding': return 'bg-pink-600';
      case 'translation': return 'bg-cyan-600';
      case 'summarization': return 'bg-indigo-600';
      case 'classification': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryColor = (category: AIModel['category']) => {
    switch (category) {
      case 'free': return 'bg-green-600';
      case 'freemium': return 'bg-blue-600';
      case 'open_source': return 'bg-purple-600';
      case 'api': return 'bg-orange-600';
      case 'local': return 'bg-red-600';
      case 'cloud': return 'bg-cyan-600';
      case 'hybrid': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: AIModel['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-gray-600';
      case 'limited': return 'bg-yellow-600';
      case 'deprecated': return 'bg-red-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredModels = () => {
    return models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || model.type === filterType;
      const matchesProvider = filterProvider === 'all' || model.provider === filterProvider;
      return matchesSearch && matchesType && matchesProvider;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            AI Integration
          </h1>
          <p className="text-gray-400">
            Implement AI integration system with free models and services
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Models</div>
                <div className="text-2xl font-bold">{stats.totalModels}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeModels}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Requests</div>
                <div className="text-2xl font-bold">{stats.totalRequests}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Tokens</div>
                <div className="text-2xl font-bold">{(stats.tokensProcessed / 1000000).toFixed(1)}M</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Cost</div>
                <div className="text-2xl font-bold">${stats.totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">AI Integration Operations</h2>
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
                    Stop Integration
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Integration
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
              Best Provider: {stats.bestProvider || 'None'} | 
              Avg Quality: {stats.averageQuality.toFixed(1)}% | 
              Integration: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* AI Models */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Models</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search models..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="code">Code</option>
                <option value="multimodal">Multimodal</option>
              </select>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Providers</option>
                <option value="OpenAI">OpenAI</option>
                <option value="Google">Google</option>
                <option value="Meta">Meta</option>
                <option value="Stability AI">Stability AI</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredModels().map((model) => (
                <div
                  key={model.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModel?.id === model.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <div className="text-sm text-gray-400">{model.provider}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(model.type)}`}>
                        {model.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(model.category)}`}>
                        {model.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Accuracy:</span> {model.performance.accuracy.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Speed:</span> {model.performance.speed} req/min
                    </div>
                    <div>
                      <span className="text-gray-400">Latency:</span> {model.performance.latency}ms
                    </div>
                    <div>
                      <span className="text-gray-400">Requests:</span> {model.usage.totalRequests}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${model.performance.accuracy}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {model.pricing.model === 'free' ? 'Free' : `$${model.pricing.rate}/${model.pricing.unit}`} | 
                        {model.features.contextWindow.toLocaleString()} context
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          executeModel(model.id);
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Execute
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredModels().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No models found
              </div>
            )}
          </div>

          {/* Selected Model Details */}
          {selectedModel && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Model Details: {selectedModel.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Model Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Provider:</span>
                        <span className="font-medium">{selectedModel.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedModel.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-medium">{selectedModel.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedModel.status)}`}>
                          {selectedModel.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="font-medium">{selectedModel.performance.accuracy.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Speed:</span>
                        <span className="font-medium">{selectedModel.performance.speed} req/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reliability:</span>
                        <span className="font-medium">{selectedModel.performance.reliability.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quality:</span>
                        <span className="font-medium">{selectedModel.performance.quality}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Pricing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model:</span>
                        <span className="font-medium">{selectedModel.pricing.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate:</span>
                        <span className="font-medium">${selectedModel.pricing.rate}/{selectedModel.pricing.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Free Tier:</span>
                        <span className="font-medium">{selectedModel.pricing.freeTier.requestsPerDay === -1 ? 'Unlimited' : `${selectedModel.pricing.freeTier.requestsPerDay}/day`}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Usage</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Requests:</span>
                        <span className="font-medium">{selectedModel.usage.totalRequests.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Tokens:</span>
                        <span className="font-medium">{selectedModel.usage.totalTokens.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Cost:</span>
                        <span className="font-medium">${selectedModel.usage.totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="font-medium">{selectedModel.usage.successRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedModel.description}</p>
                </div>

                {/* Capabilities */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(selectedModel.capabilities).map(([capability, enabled]) => (
                      <div key={capability} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300">{capability.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Requests */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent AI Requests</h3>
          <div className="space-y-4">
            {requests.slice(-10).map((request) => (
              <div key={request.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{request.modelName}</h4>
                    <div className="text-sm text-gray-400">
                      {request.type} - {request.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      request.status === 'completed' ? 'bg-green-600' :
                      request.status === 'failed' ? 'bg-red-600' :
                      request.status === 'processing' ? 'bg-blue-600' :
                      'bg-gray-600'
                    }`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Tokens:</span> {request.performance.tokensUsed || 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span> {request.performance.duration ? `${request.performance.duration}ms` : 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">Cost:</span> ${request.performance.cost?.toFixed(4) || '0.0000'}
                  </div>
                  <div>
                    <span className="text-gray-400">Quality:</span> {request.performance.quality?.toFixed(1) || 'N/A'}%
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      request.status === 'completed' ? 'bg-green-500' :
                      request.status === 'failed' ? 'bg-red-500' :
                      request.status === 'processing' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}
                    style={{ width: request.status === 'completed' ? '100%' : request.status === 'processing' ? '50%' : '0%' }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {request.input.prompt.substring(0, 100)}...
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(request.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {request.output && (
                  <div className="mt-4 p-3 bg-gray-600 rounded">
                    <div className="text-sm text-gray-300">
                      {request.output.response?.substring(0, 200)}...
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No requests found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">AI Integration Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Integration Mode</h4>
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
                        checked={config.loadBalancing}
                        onChange={(e) => setConfig(prev => ({ ...prev, loadBalancing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Load Balancing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.failover}
                        onChange={(e) => setConfig(prev => ({ ...prev, failover: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Failover</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.caching}
                        onChange={(e) => setConfig(prev => ({ ...prev, caching: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Caching</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Providers</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.providers.openai}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, openai: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">OpenAI</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.providers.google}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, google: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Google</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.providers.anthropic}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, anthropic: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Anthropic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.providers.huggingface}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, huggingface: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Hugging Face</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Routing Strategy</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Strategy</label>
                      <select
                        value={config.routing.strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          routing: { ...prev.routing, strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="round_robin">Round Robin</option>
                        <option value="least_cost">Least Cost</option>
                        <option value="fastest">Fastest</option>
                        <option value="highest_quality">Highest Quality</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timeout (seconds)</label>
                      <input
                        type="number"
                        value={config.routing.timeout}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          routing: { ...prev.routing, timeout: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Concurrent</label>
                      <input
                        type="number"
                        value={config.performance.maxConcurrent}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, maxConcurrent: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cache Size</label>
                      <input
                        type="number"
                        value={config.performance.cacheSize}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, cacheSize: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="10000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Cost Management</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Limit ($)</label>
                      <input
                        type="number"
                        value={config.cost.budgetLimit}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          cost: { ...prev.cost, budgetLimit: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="10000"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Daily Limit ($)</label>
                      <input
                        type="number"
                        value={config.cost.dailyLimit}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          cost: { ...prev.cost, dailyLimit: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="1000"
                        step="0.01"
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

export default AIIntegration;
