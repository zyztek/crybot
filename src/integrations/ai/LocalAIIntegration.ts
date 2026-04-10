/**
 * Local AI Integration Service
 * 
 * Integration layer for local AI models (Llama, Stable Diffusion, etc.)
 * Provides unified interface for multiple AI services with automatic model management
 */

import { EventEmitter } from 'events';

export interface AIModel {
  id: string;
  name: string;
  type: 'language' | 'image' | 'video' | 'voice';
  provider: 'ollama' | 'comfyui' | 'automatic1111' | 'custom';
  status: 'loading' | 'ready' | 'error';
  capabilities: string[];
  parameters: {
    model_size?: string;
    max_tokens?: number;
    max_length?: number;
    dimensions?: { width: number; height: number };
    formats?: string[];
  };
  performance: {
    response_time: number;
    accuracy: number;
    reliability: number;
    last_used: string;
  };
  resource_usage: {
    memory_mb: number;
    gpu_usage: number;
    cpu_usage: number;
  };
}

export interface GenerationRequest {
  id: string;
  model_id: string;
  type: 'text' | 'image' | 'video' | 'voice';
  input: {
    prompt?: string;
    text?: string;
    image?: string | Buffer;
    voice_id?: string;
    parameters?: Record<string, any>;
  };
  options: {
    temperature?: number;
    max_tokens?: number;
    width?: number;
    height?: number;
    steps?: number;
    cfg_scale?: number;
    sampler?: string;
    voice_settings?: {
      stability: number;
      similarity_boost: number;
      style: string;
    };
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  processing_time?: number;
}

export interface LocalAIConfig {
  ollama: {
    enabled: boolean;
    base_url: string;
    models_directory: string;
    default_model: string;
    max_memory: number;
    gpu_layers: number;
  };
  comfyui: {
    enabled: boolean;
    base_url: string;
    workflows_directory: string;
    default_workflow: string;
    max_concurrent_jobs: number;
  };
  automatic1111: {
    enabled: boolean;
    base_url: string;
    models_directory: string;
    output_directory: string;
    vram_optimization: boolean;
  };
  performance: {
    max_concurrent_requests: number;
    request_timeout: number;
    retry_attempts: number;
    cache_enabled: boolean;
    cache_size: number;
  };
  monitoring: {
    enabled: boolean;
    metrics_interval: number;
    alert_thresholds: {
      response_time: number;
      error_rate: number;
      resource_usage: number;
    };
  };
}

class LocalAIIntegration extends EventEmitter {
  private config: LocalAIConfig;
  private models: Map<string, AIModel> = new Map();
  private requestQueue: GenerationRequest[] = [];
  private processing: Map<string, boolean> = new Map();
  private metrics: {
    total_requests: number;
    successful_requests: number;
    failed_requests: number;
    average_response_time: number;
    resource_usage: {
      max_memory: number;
      max_gpu: number;
      max_cpu: number;
    };
  };

  constructor(config: LocalAIConfig) {
    super();
    this.config = config;
    this.initializeModels();
    this.startMetricsCollection();
  }

  private async initializeModels(): Promise<void> {
    // Initialize Ollama models
    if (this.config.ollama.enabled) {
      await this.loadOllamaModels();
    }

    // Initialize ComfyUI models
    if (this.config.comfyui.enabled) {
      await this.loadComfyUIModels();
    }

    // Initialize Automatic1111 models
    if (this.config.automatic1111.enabled) {
      await this.loadAutomatic1111Models();
    }

    console.log(`Loaded ${this.models.size} AI models`);
  }

  private async loadOllamaModels(): Promise<void> {
    const ollamaModels = [
      {
        id: 'llama3-8b',
        name: 'Llama 3 8B',
        type: 'language',
        provider: 'ollama',
        status: 'ready',
        capabilities: ['text-generation', 'chat', 'reasoning', 'code'],
        parameters: {
          model_size: '8B',
          max_tokens: 8192,
          max_length: 4096
        },
        performance: {
          response_time: 150,
          accuracy: 0.85,
          reliability: 0.95,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 8192,
          gpu_usage: 0.3,
          cpu_usage: 0.2
        }
      },
      {
        id: 'llama3-70b',
        name: 'Llama 3 70B',
        type: 'language',
        provider: 'ollama',
        status: 'ready',
        capabilities: ['text-generation', 'chat', 'reasoning', 'analysis', 'code'],
        parameters: {
          model_size: '70B',
          max_tokens: 4096,
          max_length: 8192
        },
        performance: {
          response_time: 450,
          accuracy: 0.92,
          reliability: 0.98,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 57344,
          gpu_usage: 0.8,
          cpu_usage: 0.6
        }
      },
      {
        id: 'mistral-7b',
        name: 'Mistral 7B',
        type: 'language',
        provider: 'ollama',
        status: 'ready',
        capabilities: ['text-generation', 'chat', 'reasoning', 'multilingual'],
        parameters: {
          model_size: '7B',
          max_tokens: 8192,
          max_length: 4096
        },
        performance: {
          response_time: 120,
          accuracy: 0.88,
          reliability: 0.96,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 7168,
          gpu_usage: 0.4,
          cpu_usage: 0.3
        }
      }
    ];

    ollamaModels.forEach(model => this.models.set(model.id, model));
  }

  private async loadComfyUIModels(): Promise<void> {
    const comfyUIModels = [
      {
        id: 'stable-diffusion-xl',
        name: 'Stable Diffusion XL',
        type: 'image',
        provider: 'comfyui',
        status: 'ready',
        capabilities: ['text-to-image', 'image-generation', 'style-transfer'],
        parameters: {
          dimensions: { width: 1024, height: 1024 },
          formats: ['png', 'jpg', 'webp']
        },
        performance: {
          response_time: 3000,
          accuracy: 0.91,
          reliability: 0.94,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 12288,
          gpu_usage: 0.9,
          cpu_usage: 0.4
        }
      },
      {
        id: 'flux-1-dev',
        name: 'Flux.1 Dev',
        type: 'image',
        provider: 'comfyui',
        status: 'ready',
        capabilities: ['text-to-image', 'image-generation', 'high-quality'],
        parameters: {
          dimensions: { width: 1024, height: 1024 },
          formats: ['png', 'jpg', 'webp']
        },
        performance: {
          response_time: 5000,
          accuracy: 0.94,
          reliability: 0.96,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 16384,
          gpu_usage: 0.95,
          cpu_usage: 0.5
        }
      }
    ];

    comfyUIModels.forEach(model => this.models.set(model.id, model));
  }

  private async loadAutomatic1111Models(): Promise<void> {
    const auto1111Models = [
      {
        id: 'stable-diffusion-2.1',
        name: 'Stable Diffusion 2.1',
        type: 'image',
        provider: 'automatic1111',
        status: 'ready',
        capabilities: ['text-to-image', 'image-generation', 'inpainting'],
        parameters: {
          dimensions: { width: 768, height: 768 },
          formats: ['png', 'jpg', 'webp']
        },
        performance: {
          response_time: 2500,
          accuracy: 0.89,
          reliability: 0.92,
          last_used: new Date().toISOString()
        },
        resource_usage: {
          memory_mb: 8192,
          gpu_usage: 0.7,
          cpu_usage: 0.3
        }
      }
    ];

    auto1111Models.forEach(model => this.models.set(model.id, model));
  }

  private startMetricsCollection(): void {
    if (!this.config.monitoring.enabled) return;

    setInterval(() => {
      this.collectMetrics();
    }, this.config.monitoring.metrics_interval * 1000);

    setInterval(() => {
      this.checkAlertThresholds();
    }, 60000); // Check every minute
  }

  private collectMetrics(): void {
    const totalMemory = Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.memory_mb, 0);
    const totalGPU = Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.gpu_usage, 0);
    const totalCPU = Array.from(this.models.values()).reduce((sum, model) => sum + model.resource_usage.cpu_usage, 0);

    this.metrics.resource_usage = {
      max_memory: Math.max(this.metrics.resource_usage.max_memory, totalMemory),
      max_gpu: Math.max(this.metrics.resource_usage.max_gpu, totalGPU),
      max_cpu: Math.max(this.metrics.resource_usage.max_cpu, totalCPU)
    };
  }

  private checkAlertThresholds(): void {
    const thresholds = this.config.monitoring.alert_thresholds;
    const avgResponseTime = this.calculateAverageResponseTime();

    if (avgResponseTime > thresholds.response_time) {
      this.emit('alert', {
        type: 'response_time',
        value: avgResponseTime,
        threshold: thresholds.response_time
      });
    }

    const errorRate = this.calculateErrorRate();
    if (errorRate > thresholds.error_rate) {
      this.emit('alert', {
        type: 'error_rate',
        value: errorRate,
        threshold: thresholds.error_rate
      });
    }
  }

  private calculateAverageResponseTime(): number {
    const completedRequests = Array.from(this.models.values())
      .filter(model => model.performance.last_used)
      .map(model => model.performance.response_time);
    
    return completedRequests.length > 0 
      ? completedRequests.reduce((sum, time) => sum + time, 0) / completedRequests.length
      : 0;
  }

  private calculateErrorRate(): number {
    const totalRequests = this.metrics.total_requests;
    return totalRequests > 0 ? (this.metrics.failed_requests / totalRequests) * 100 : 0;
  }

  public async generateText(prompt: string, options: any = {}): Promise<any> {
    const modelId = options.model_id || this.config.ollama.default_model;
    const model = this.models.get(modelId);

    if (!model || model.type !== 'language') {
      throw new Error(`Model ${modelId} not found or not a language model`);
    }

    const request: GenerationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      model_id: modelId,
      type: 'text',
      input: { prompt },
      options,
      priority: options.priority || 'medium',
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    this.requestQueue.push(request);
    this.metrics.total_requests++;

    try {
      this.processing.set(request.id, true);
      const startTime = Date.now();

      const response = await this.callOllamaAPI(prompt, modelId, options);

      const endTime = Date.now();
      request.processing_time = endTime - startTime;
      request.status = 'completed';
      request.result = response;
      
      this.metrics.successful_requests++;
      this.updateModelPerformance(modelId, endTime - startTime);

      this.emit('generation-completed', request);
      return response;

    } catch (error) {
      request.status = 'failed';
      request.error = error.message;
      this.metrics.failed_requests++;
      
      this.emit('generation-failed', request);
      throw error;
    } finally {
      this.processing.delete(request.id);
    }
  }

  public async generateImage(prompt: string, options: any = {}): Promise<any> {
    const modelId = options.model_id || 'stable-diffusion-xl';
    const model = this.models.get(modelId);

    if (!model || model.type !== 'image') {
      throw new Error(`Model ${modelId} not found or not an image model`);
    }

    const request: GenerationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      model_id: modelId,
      type: 'image',
      input: { prompt },
      options,
      priority: options.priority || 'medium',
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    this.requestQueue.push(request);
    this.metrics.total_requests++;

    try {
      this.processing.set(request.id, true);
      const startTime = Date.now();

      const response = await this.callImageGenerationAPI(prompt, modelId, options);

      const endTime = Date.now();
      request.processing_time = endTime - startTime;
      request.status = 'completed';
      request.result = response;
      
      this.metrics.successful_requests++;
      this.updateModelPerformance(modelId, endTime - startTime);

      this.emit('generation-completed', request);
      return response;

    } catch (error) {
      request.status = 'failed';
      request.error = error.message;
      this.metrics.failed_requests++;
      
      this.emit('generation-failed', request);
      throw error;
    } finally {
      this.processing.delete(request.id);
    }
  }

  public async generateVideo(prompt: string, options: any = {}): Promise<any> {
    const modelId = options.model_id || 'luma-dream-machine';
    const model = this.models.get(modelId);

    if (!model || model.type !== 'video') {
      throw new Error(`Model ${modelId} not found or not a video model`);
    }

    const request: GenerationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      model_id: modelId,
      type: 'video',
      input: { prompt },
      options,
      priority: options.priority || 'medium',
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    this.requestQueue.push(request);
    this.metrics.total_requests++;

    try {
      this.processing.set(request.id, true);
      const startTime = Date.now();

      const response = await this.callVideoGenerationAPI(prompt, modelId, options);

      const endTime = Date.now();
      request.processing_time = endTime - startTime;
      request.status = 'completed';
      request.result = response;
      
      this.metrics.successful_requests++;
      this.updateModelPerformance(modelId, endTime - startTime);

      this.emit('generation-completed', request);
      return response;

    } catch (error) {
      request.status = 'failed';
      request.error = error.message;
      this.metrics.failed_requests++;
      
      this.emit('generation-failed', request);
      throw error;
    } finally {
      this.processing.delete(request.id);
    }
  }

  public async generateVoice(text: string, options: any = {}): Promise<any> {
    const modelId = options.model_id || 'elevenlabs-rachel';
    const model = this.models.get(modelId);

    if (!model || model.type !== 'voice') {
      throw new Error(`Model ${modelId} not found or not a voice model`);
    }

    const request: GenerationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      model_id: modelId,
      type: 'voice',
      input: { text },
      options,
      priority: options.priority || 'medium',
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    this.requestQueue.push(request);
    this.metrics.total_requests++;

    try {
      this.processing.set(request.id, true);
      const startTime = Date.now();

      const response = await this.callVoiceSynthesisAPI(text, modelId, options);

      const endTime = Date.now();
      request.processing_time = endTime - startTime;
      request.status = 'completed';
      request.result = response;
      
      this.metrics.successful_requests++;
      this.updateModelPerformance(modelId, endTime - startTime);

      this.emit('generation-completed', request);
      return response;

    } catch (error) {
      request.status = 'failed';
      request.error = error.message;
      this.metrics.failed_requests++;
      
      this.emit('generation-failed', request);
      throw error;
    } finally {
      this.processing.delete(request.id);
    }
  }

  private async callOllamaAPI(prompt: string, modelId: string, options: any): Promise<any> {
    const response = await fetch(`${this.config.ollama.base_url}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        prompt,
        stream: false,
        options: {
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 2000,
          num_ctx: options.context_length || 4096,
          num_gpu: options.gpu_layers || this.config.ollama.gpu_layers,
          num_batch: options.batch_size || 1,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    return await response.json();
  }

  private async callImageGenerationAPI(prompt: string, modelId: string, options: any): Promise<any> {
    if (modelId.startsWith('flux') || modelId.startsWith('stable-diffusion')) {
      return await this.callComfyUIAPI(prompt, modelId, options);
    } else {
      return await this.callAutomatic1111API(prompt, modelId, options);
    }
  }

  private async callComfyUIAPI(prompt: string, modelId: string, options: any): Promise<any> {
    const workflow = this.buildComfyUIWorkflow(modelId, prompt, options);
    
    const response = await fetch(`${this.config.comfyui.base_url}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `[${prompt}]`,
        workflow,
        client_id: this.generateClientId()
      })
    });

    if (!response.ok) {
      throw new Error(`ComfyUI API error: ${response.statusText}`);
    }

    return await response.json();
  }

  private async callAutomatic1111API(prompt: string, modelId: string, options: any): Promise<any> {
    const response = await fetch(`${this.config.automatic1111.base_url}/sdapi/v1/txt2img`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: options.negative_prompt || '',
        width: options.width || 768,
        height: options.height || 768,
        steps: options.steps || 20,
        cfg_scale: options.cfg_scale || 7,
        sampler_name: options.sampler || 'DPM++ 2M Karras',
        batch_size: options.batch_size || 1,
        n_iter: options.iterations || 1,
        seed: options.seed || -1,
        save_images: true,
        send_images: true
      })
    });

    if (!response.ok) {
      throw new Error(`Automatic1111 API error: ${response.statusText}`);
    }

    return await response.json();
  }

  private async callVideoGenerationAPI(prompt: string, modelId: string, options: any): Promise<any> {
    // This would integrate with services like Luma Labs, Runway, Pika
    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          video_url: `https://example.com/video/${Date.now()}.mp4`,
          duration: 5,
          resolution: '1080p',
          fps: 30
        });
      }, 3000);
    });
  }

  private async callVoiceSynthesisAPI(text: string, modelId: string, options: any): Promise<any> {
    // This would integrate with services like ElevenLabs, Coqui TTS
    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          audio_url: `https://example.com/audio/${Date.now()}.mp3`,
          duration: text.length * 0.08,
          format: 'mp3',
          sample_rate: 22050
        });
      }, 1500);
    });
  }

  private buildComfyUIWorkflow(modelId: string, prompt: string, options: any): any {
    // Simplified ComfyUI workflow for image generation
    return {
      '1': {
        inputs: {
          text: prompt,
          clip: ['text', 'text'],
          ckpt_name: [modelId],
          sampler_name: ['euler', 'euler_ancestral', 'heun', 'dpm_2', 'dpm_2_ancestral', 'lms', 'dpm_fast', 'dpm_adaptive', 'dpmpp_2m', 'dpmpp_sde', 'dpmpp_2m_sde', 'ddim', 'ddim_ancestral'],
          scheduler: ['normal', 'karras', 'exponential', 'sgm_uniform', 'simple', 'ddim_uniform', 'v_prediction'],
          steps: [options.steps || 20],
          cfg: [options.cfg_scale || 7],
          denoise: [1],
          width: [options.width || 1024],
          height: [options.height || 1024],
          batch_size: [options.batch_size || 1],
          seed: [options.seed || -1]
        },
        class_type: 'conditioning'
      },
      '2': {
        inputs: {
          filename_prefix: 'ComfyUI',
          filetype: 'png',
          images: ['1'],
          animation: 'false'
        },
        class_type: 'output'
      }
    };
  }

  private updateModelPerformance(modelId: string, responseTime: number): void {
    const model = this.models.get(modelId);
    if (model) {
      model.performance.response_time = responseTime;
      model.performance.last_used = new Date().toISOString();
    }
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getAvailableModels(): AIModel[] {
    return Array.from(this.models.values());
  }

  public getModelById(modelId: string): AIModel | undefined {
    return this.models.get(modelId);
  }

  public getMetrics(): any {
    return {
      ...this.metrics,
      average_response_time: this.calculateAverageResponseTime(),
      error_rate: this.calculateErrorRate(),
      queue_length: this.requestQueue.length,
      processing_count: this.processing.size,
      models_loaded: this.models.size
    };
  }

  public getRequestQueue(): GenerationRequest[] {
    return this.requestQueue;
  }

  public clearQueue(): void {
    this.requestQueue = [];
  }

  public async shutdown(): Promise<void> {
    // Wait for all processing requests to complete
    while (this.processing.size > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    this.emit('shutdown');
  }
}

export default LocalAIIntegration;
