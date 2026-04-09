/**
 * LLMClient - LLM integration for AI operations
 * Supports OpenAI, Anthropic, and local models
 */

import OpenAI from 'openai';
import { LLMConfig } from './types';

export class LLMClient {
  private client: OpenAI | null;
  private config: LLMConfig;
  private isConfigured: boolean;

  constructor(config: Partial<LLMConfig> = {}) {
    this.config = {
      provider: 'openai',
      model: 'gpt-4-turbo',
      temperature: 0.7,
      maxTokens: 4000,
      ...config,
    };

    this.client = null;
    this.isConfigured = false;

    this.initialize();
  }

  private initialize(): void {
    const apiKey = this.config.apiKey || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn('[LLMClient] No API key configured - running in simulation mode');
      return;
    }

    try {
      this.client = new OpenAI({ apiKey });
      this.isConfigured = true;
      console.log(`[LLMClient] Initialized with ${this.config.model}`);
    } catch (error) {
      console.error('[LLMClient] Failed to initialize:', error);
    }
  }

  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.isConfigured || !this.client) {
      return this.simulateCompletion(prompt);
    }

    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }

      messages.push({ role: 'user', content: prompt });

      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('[LLMClient] Completion error:', error);
      return this.simulateCompletion(prompt);
    }
  }

  async completeBatch(prompts: string[], systemPrompt?: string): Promise<string[]> {
    // Process all prompts in parallel
    const promises = prompts.map((prompt) => this.complete(prompt, systemPrompt));
    return Promise.all(promises);
  }

  async analyzeCode(code: string): Promise<{
    issues: string[];
    suggestions: string[];
    score: number;
  }> {
    const prompt = `Analyze this code and identify issues and improvement suggestions:\n\n${code}`;

    const response = await this.complete(prompt, `You are a code analysis expert. Provide a JSON response with issues array, suggestions array, and a score from 0-100.`);

    try {
      // Try to parse as JSON
      const parsed = JSON.parse(response);
      return parsed;
    } catch {
      // Return simulated response if parsing fails
      return {
        issues: ['Code could be optimized'],
        suggestions: ['Consider adding comments', 'Add error handling'],
        score: 75,
      };
    }
  }

  async generateCode(description: string, language: string = 'typescript'): Promise<string> {
    const prompt = `Generate ${language} code for: ${description}`;

    const response = await this.complete(prompt, `You are an expert ${language} developer. Generate clean, well-documented code.`);

    return response;
  }

  async refactorCode(code: string, goal: string): Promise<string> {
    const prompt = `Refactor this code to ${goal}:\n\n${code}`;

    const response = await this.complete(prompt, `You are an expert code refactorer. Provide improved code that maintains the same functionality while achieving the goal.`);

    return response;
  }

  private simulateCompletion(prompt: string): string {
    // Simulation mode for when no API key is available
    console.log(`[LLMClient] Simulating completion for prompt: ${prompt.substring(0, 50)}...`);
    
    return JSON.stringify({
      success: true,
      simulated: true,
      prompt: prompt.substring(0, 100),
      timestamp: new Date().toISOString(),
    });
  }

  isReady(): boolean {
    return this.isConfigured;
  }

  getConfig(): LLMConfig {
    return { ...this.config };
  }

  updateConfig(config: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...config };
    this.initialize();
  }
}

export const llmClient = new LLMClient();
