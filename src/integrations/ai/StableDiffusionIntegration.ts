/**
 * Stable Diffusion Integration Service
 * 
 * Integration layer for Stable Diffusion image generation
 * Supports multiple models, custom workflows, and performance optimization
 */

import { EventEmitter } from 'events';

export interface StableDiffusionModel {
  id: string;
  name: string;
  type: 'sd15' | 'sd21' | 'sdxl' | 'sdxl-turbo' | 'custom';
  status: 'loading' | 'ready' | 'error';
  capabilities: string[];
  parameters: {
    dimensions: { min: { width: number; height: number }; max: { width: number; height: number } };
    steps: { min: number; max: number; default: number };
    cfg_scale: { min: number; max: number; default: number };
    samplers: string[];
    schedulers: string[];
  };
  performance: {
    generation_time: number;
    quality_score: number;
    success_rate: number;
    last_used: string;
  };
  resource_usage: {
    vram_mb: number;
    gpu_utilization: number;
    processing_time: number;
  };
}

export interface GenerationJob {
  id: string;
  model_id: string;
  prompt: string;
  negative_prompt?: string;
  width: number;
  height: number;
  steps: number;
  cfg_scale: number;
  sampler: string;
  scheduler: string;
  seed: number;
  batch_size: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  started_at?: string;
  completed_at?: string;
  result?: {
    images: Array<{
      url: string;
      path: string;
      size: number;
      seed: number;
    }>;
  };
  error?: string;
  processing_time?: number;
}

export interface StableDiffusionConfig {
  api_endpoint: string;
  default_model: string;
  max_concurrent_jobs: number;
  default_parameters: {
    width: number;
    height: number;
    steps: number;
    cfg_scale: number;
    sampler: string;
    scheduler: string;
  };
  performance: {
    enable_optimization: boolean;
    cache_size: number;
    timeout_seconds: number;
    retry_attempts: number;
  };
  safety: {
    enable_filtering: boolean;
    content_filter_level: 'strict' | 'moderate' | 'permissive';
    custom_filters: string[];
  };
  storage: {
    output_directory: string;
    temp_directory: string;
    auto_cleanup: boolean;
    max_storage_gb: number;
  };
}

class StableDiffusionIntegration extends EventEmitter {
  private config: StableDiffusionConfig;
  private models: Map<string, StableDiffusionModel> = new Map();
  private jobQueue: GenerationJob[] = [];
  private processing: Map<string, boolean> = new Map();
  private metrics: {
    total_jobs: number;
    successful_jobs: number;
    failed_jobs: number;
    average_generation_time: number;
    total_images_generated: number;
    resource_usage: {
      max_vram: number;
      max_gpu_utilization: number;
      total_processing_time: number;
    };
  };

  constructor(config: StableDiffusionConfig) {
    super();
    this.config = config;
    this.initializeModels();
    this.startMetricsCollection();
  }

  private async initializeModels(): Promise<void> {
    const defaultModels: StableDiffusionModel[] = [
      {
        id: 'sd15',
        name: 'Stable Diffusion 1.5',
        type: 'sd15',
        status: 'ready',
        capabilities: ['text-to-image', 'img2img', 'inpainting', 'outpainting'],
        parameters: {
          dimensions: { min: { width: 256, height: 256 }, max: { width: 1024, height: 1024 } },
          steps: { min: 10, max: 100, default: 20 },
          cfg_scale: { min: 1, max: 20, default: 7 },
          samplers: ['Euler a', 'Euler', 'LMS', 'DPM2', 'DPM++ 2M Karras', 'DDIM'],
          schedulers: ['KLMS', 'DEIS', 'DDIM', 'DPM2', 'DPM++ 2M Karras']
        },
        performance: {
          generation_time: 3.5,
          quality_score: 0.75,
          success_rate: 0.95,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          vram_mb: 4096,
          gpu_utilization: 0.8,
          processing_time: 3.5
        }
      },
      {
        id: 'sd21',
        name: 'Stable Diffusion 2.1',
        type: 'sd21',
        status: 'ready',
        capabilities: ['text-to-image', 'img2img', 'inpainting', 'outpainting', 'depth-to-image'],
        parameters: {
          dimensions: { min: { width: 256, height: 256 }, max: { width: 1024, height: 1024 } },
          steps: { min: 10, max: 100, default: 25 },
          cfg_scale: { min: 1, max: 20, default: 7 },
          samplers: ['Euler a', 'Euler', 'LMS', 'DPM2', 'DPM++ 2M Karras', 'DDIM', 'UniPC'],
          schedulers: ['KLMS', 'DEIS', 'DDIM', 'DPM2', 'DPM++ 2M Karras', 'UniPC']
        },
        performance: {
          generation_time: 5.2,
          quality_score: 0.85,
          success_rate: 0.97,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          vram_mb: 6144,
          gpu_utilization: 0.9,
          processing_time: 5.2
        }
      },
      {
        id: 'sdxl',
        name: 'Stable Diffusion XL',
        type: 'sdxl',
        status: 'ready',
        capabilities: ['text-to-image', 'img2img', 'inpainting', 'outpainting'],
        parameters: {
          dimensions: { min: { width: 512, height: 512 }, max: { width: 1536, height: 1536 } },
          steps: { min: 15, max: 150, default: 30 },
          cfg_scale: { min: 1, max: 20, default: 8 },
          samplers: ['Euler a', 'Euler', 'LMS', 'DPM2', 'DPM++ 2M Karras', 'DDIM', 'UniPC'],
          schedulers: ['KLMS', 'DEIS', 'DDIM', 'DPM2', 'DPM++ 2M Karras', 'UniPC']
        },
        performance: {
          generation_time: 8.5,
          quality_score: 0.92,
          success_rate: 0.98,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          vram_mb: 8192,
          gpu_utilization: 0.95,
          processing_time: 8.5
        }
      },
      {
        id: 'sdxl-turbo',
        name: 'Stable Diffusion XL Turbo',
        type: 'sdxl-turbo',
        status: 'ready',
        capabilities: ['text-to-image', 'img2img'],
        parameters: {
          dimensions: { min: { width: 512, height: 512 }, max: { width: 1024, height: 1024 } },
          steps: { min: 4, max: 50, default: 8 },
          cfg_scale: { min: 1, max: 20, default: 1 },
          samplers: ['Euler a', 'Euler', 'LCM'],
          schedulers: ['SDXL', 'DEIS']
        },
        performance: {
          generation_time: 1.2,
          quality_score: 0.88,
          success_rate: 0.96,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          vram_mb: 4096,
          gpu_utilization: 0.7,
          processing_time: 1.2
        }
      }
    ];

    defaultModels.forEach(model => this.models.set(model.id, model));
  }

  private startMetricsCollection(): void {
    setInterval(() => {
      this.collectMetrics();
    }, 30000); // Every 30 seconds
  }

  private collectMetrics(): void {
    const totalVRAM = Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.vram_mb, 0);
    const totalGPUUtilization = Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.gpu_utilization, 0);

    this.metrics.resource_usage = {
      max_vram: Math.max(this.metrics.resource_usage.max_vram, totalVRAM),
      max_gpu_utilization: Math.max(this.metrics.resource_usage.max_gpu_utilization, totalGPUUtilization),
      total_processing_time: this.metrics.resource_usage.total_processing_time + Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.processing_time, 0)
    };
  }

  public async generateImage(prompt: string, options: any = {}): Promise<any> {
    const modelId = options.model_id || this.config.default_model;
    const model = this.models.get(modelId);

    if (!model || model.status !== 'ready') {
      throw new Error(`Model ${modelId} not found or not ready`);
    }

    const job: GenerationJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      model_id: modelId,
      prompt,
      negative_prompt: options.negative_prompt,
      width: options.width || this.config.default_parameters.width,
      height: options.height || this.config.default_parameters.height,
      steps: options.steps || this.config.default_parameters.steps,
      cfg_scale: options.cfg_scale || this.config.default_parameters.cfg_scale,
      sampler: options.sampler || this.config.default_parameters.sampler,
      scheduler: options.scheduler || this.config.default_parameters.scheduler,
      seed: options.seed || -1,
      batch_size: options.batch_size || 1,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    this.jobQueue.push(job);
    this.metrics.total_jobs++;

    try {
      this.processing.set(job.id, true);
      const startTime = Date.now();

      const result = await this.callStableDiffusionAPI(prompt, modelId, options);

      const endTime = Date.now();
      job.status = 'completed';
      job.started_at = new Date(startTime).toISOString();
      job.completed_at = new Date(endTime).toISOString();
      job.processing_time = endTime - startTime;
      job.result = result;

      this.metrics.successful_jobs++;
      this.metrics.total_images_generated += (result.images?.length || 1);
      this.updateModelPerformance(modelId, endTime - startTime);

      this.emit('generation-completed', job);
      return result;

    } catch (error) {
      job.status = 'failed';
      job.error = error.message;
      this.metrics.failed_jobs++;

      this.emit('generation-failed', job);
      throw error;
    } finally {
      this.processing.delete(job.id);
    }
  }

  private async callStableDiffusionAPI(prompt: string, modelId: string, options: any): Promise<any> {
    const model = this.models.get(modelId);
    
    // Mock API call - replace with actual Stable Diffusion API
    const response = await fetch(this.config.api_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STABLE_DIFFUSION_API_KEY || 'mock-key'}`
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: options.negative_prompt,
        width: options.width || this.config.default_parameters.width,
        height: options.height || this.config.default_parameters.height,
        steps: options.steps || this.config.default_parameters.steps,
        cfg_scale: options.cfg_scale || this.config.default_parameters.cfg_scale,
        sampler_name: options.sampler || this.config.default_parameters.sampler,
        scheduler: options.scheduler || this.config.default_parameters.scheduler,
        seed: options.seed || -1,
        batch_size: options.batch_size || 1,
        save_images: true,
        send_images: true
      })
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API error: ${response.statusText}`);
    }

    return await response.json();
  }

  private updateModelPerformance(modelId: string, processingTime: number): void {
    const model = this.models.get(modelId);
    if (model) {
      model.performance.generation_time = processingTime;
      model.performance.last_used = new Date().toISOString();
    }
  }

  public getAvailableModels(): StableDiffusionModel[] {
    return Array.from(this.models.values());
  }

  public getModelById(modelId: string): StableDiffusionModel | undefined {
    return this.models.get(modelId);
  }

  public getJobQueue(): GenerationJob[] {
    return this.jobQueue;
  }

  public getMetrics(): any {
    return {
      ...this.metrics,
      average_generation_time: this.metrics.total_jobs > 0 ? this.metrics.resource_usage.total_processing_time / this.metrics.total_jobs : 0,
      success_rate: this.metrics.total_jobs > 0 ? (this.metrics.successful_jobs / this.metrics.total_jobs) * 100 : 0,
      queue_length: this.jobQueue.length,
      processing_count: this.processing.size,
      models_loaded: this.models.size
    };
  }

  public clearQueue(): void {
    this.jobQueue = [];
  }

  public async loadCustomModel(modelPath: string, modelConfig: any): Promise<void> {
    const customModel: StableDiffusionModel = {
      id: `custom_${Date.now()}`,
      name: modelConfig.name || 'Custom Model',
      type: 'custom',
      status: 'loading',
      capabilities: modelConfig.capabilities || ['text-to-image'],
      parameters: modelConfig.parameters || {
        dimensions: { min: { width: 256, height: 256 }, max: { width: 1024, height: 1024 } },
        steps: { min: 10, max: 100, default: 20 },
        cfg_scale: { min: 1, max: 20, default: 7 },
        samplers: ['Euler a', 'Euler', 'LMS'],
        schedulers: ['KLMS', 'DEIS']
      },
      performance: {
        generation_time: 0,
        quality_score: 0,
        success_rate: 0,
        last_used: new Date().toISOString()
      },
      resource_usage: {
        vram_mb: 0,
        gpu_utilization: 0,
        processing_time: 0
      }
    };

    try {
      // Load model from file system
      const modelData = await this.loadModelFromFile(modelPath);
      if (modelData) {
        customModel.status = 'ready';
        customModel.performance = {
          generation_time: modelData.averageGenerationTime || 5,
          quality_score: modelData.qualityScore || 0.8,
          success_rate: modelData.successRate || 0.9,
          last_used: new Date().toISOString()
        };
        customModel.resource_usage = {
          vram_mb: modelData.vramUsage || 6144,
          gpu_utilization: modelData.gpuUtilization || 0.8,
          processing_time: modelData.averageGenerationTime || 5
        };
      }

      this.models.set(customModel.id, customModel);
      this.emit('model-loaded', customModel);

    } catch (error) {
      customModel.status = 'error';
      this.emit('model-load-error', { modelId: customModel.id, error: error.message });
    }
  }

  private async loadModelFromFile(modelPath: string): Promise<any> {
    // Mock implementation - replace with actual file loading
    return {
      averageGenerationTime: 4.2,
      qualityScore: 0.85,
      successRate: 0.92,
      vramUsage: 7168,
      gpuUtilization: 0.85
    };
  }

  public async optimizePerformance(): Promise<void> {
    // Analyze current performance and suggest optimizations
    const models = Array.from(this.models.values());
    const lowPerformingModels = models.filter(model => 
      model.performance.success_rate < 0.8 || 
      model.performance.generation_time > 10
    );

    for (const model of lowPerformingModels) {
      // Suggest optimizations
      if (model.performance.generation_time > 10) {
        this.emit('optimization-suggestion', {
          modelId: model.id,
          suggestion: 'Reduce steps or use smaller dimensions for faster generation',
          type: 'performance'
        });
      }

      if (model.performance.success_rate < 0.8) {
        this.emit('optimization-suggestion', {
          modelId: model.id,
          suggestion: 'Adjust CFG scale or try different sampler',
          type: 'quality'
        });
      }
    }
  }

  public async shutdown(): Promise<void> {
    // Wait for all processing jobs to complete
    while (this.processing.size > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.emit('shutdown');
  }
}

export default StableDiffusionIntegration;
