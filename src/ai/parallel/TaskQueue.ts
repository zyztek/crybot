/**
 * TaskQueue - Concurrent task execution at 25x speed
 * Uses p-queue for parallel processing
 */

import PQueue from 'p-queue';
import { AITask, ParallelConfig } from '../types';

export class TaskQueue {
  private queue: PQueue;
  private config: ParallelConfig;

  constructor(config: Partial<ParallelConfig> = {}) {
    this.config = {
      concurrency: 25,
      maxRetries: 3,
      timeout: 30000,
      batchSize: 25,
      ...config,
    };

    this.queue = new PQueue({
      concurrency: this.config.concurrency,
      autoStart: true,
    });
  }

  async add(task: AITask): Promise<unknown> {
    return this.queue.add(async () => {
      task.status = 'running';
      task.startedAt = new Date();

      try {
        const result = await this.executeWithTimeout(task);
        task.status = 'completed';
        task.result = result;
        task.completedAt = new Date();
        return result;
      } catch (error) {
        task.status = 'failed';
        task.error = error instanceof Error ? error.message : String(error);
        task.completedAt = new Date();
        throw error;
      }
    });
  }

  async addAll(tasks: AITask[]): Promise<unknown[]> {
    return this.queue.addAll(
      tasks.map((task) => async () => {
        task.status = 'running';
        task.startedAt = new Date();

        try {
          const result = await this.executeWithTimeout(task);
          task.status = 'completed';
          task.result = result;
          task.completedAt = new Date();
          return result;
        } catch (error) {
          task.status = 'failed';
          task.error = error instanceof Error ? error.message : String(error);
          task.completedAt = new Date();
          throw error;
        }
      })
    );
  }

  private async executeWithTimeout(task: AITask): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Task ${task.id} timed out after ${this.config.timeout}ms`));
      }, this.config.timeout);

      // Execute the task
      Promise.resolve(task.payload)
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  async onIdle(): Promise<void> {
    return this.queue.onIdle();
  }

  async onEmpty(): Promise<void> {
    return this.queue.onEmpty();
  }

  getSize(): number {
    return this.queue.size;
  }

  getPending(): number {
    return this.queue.pending;
  }

  isIdle(): boolean {
    return this.queue.size === 0 && this.queue.pending === 0;
  }

  pause(): void {
    this.queue.pause();
  }

  start(): void {
    this.queue.start();
  }

  clear(): void {
    this.queue.clear();
  }

  updateConfig(config: Partial<ParallelConfig>): void {
    this.config = { ...this.config, ...config };
    this.queue.concurrency = this.config.concurrency;
  }

  getConfig(): ParallelConfig {
    return { ...this.config };
  }
}