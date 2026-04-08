/**
 * AgentCore - Main AI Agent Orchestrator
 * Coordinates all AI operations for self-evolution
 */

import { AITask, EvolutionConfig, SelfEvolutionState, EvolutionCycle } from './types';
import { CodeAnalyzer } from './CodeAnalyzer';
import { SelfModifier } from './SelfModifier';
import { EvolutionEngine } from './EvolutionEngine';
import { TaskQueue } from './parallel/TaskQueue';
import { WorkerPool } from './parallel/WorkerPool';
import { BatchProcessor } from './parallel/BatchProcessor';

export class AgentCore {
  private static instance: AgentCore;
  private codeAnalyzer: CodeAnalyzer;
  private selfModifier: SelfModifier;
  private evolutionEngine: EvolutionEngine;
  private taskQueue: TaskQueue;
  private workerPool: WorkerPool;
  private batchProcessor: BatchProcessor;
  private state: SelfEvolutionState;
  private config: EvolutionConfig;
  private cycleInterval?: ReturnType<typeof setInterval>;

  private constructor() {
    this.config = {
      autoAnalyze: true,
      autoModify: true,
      autoTest: true,
      maxChangesPerCycle: 10,
      cycleIntervalMs: 60000, // 1 minute
      sandboxMode: false,
    };

    this.state = {
      isRunning: false,
      totalEvolutions: 0,
      successRate: 0,
    };

    this.codeAnalyzer = new CodeAnalyzer();
    this.selfModifier = new SelfModifier();
    this.evolutionEngine = new EvolutionEngine();
    this.taskQueue = new TaskQueue({ concurrency: 25 });
    this.workerPool = new WorkerPool(25);
    this.batchProcessor = new BatchProcessor(25);
  }

  static getInstance(): AgentCore {
    if (!AgentCore.instance) {
      AgentCore.instance = new AgentCore();
    }
    return AgentCore.instance;
  }

  async start(): Promise<void> {
    if (this.state.isRunning) {
      console.warn('[AgentCore] Already running');
      return;
    }

    console.log('[AgentCore] Starting AI Self-Evolution System...');
    this.state.isRunning = true;

    // Start evolution cycles
    this.cycleInterval = setInterval(
      () => this.runEvolutionCycle(),
      this.config.cycleIntervalMs
    );

    // Run initial analysis
    await this.runEvolutionCycle();
  }

  stop(): void {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
      this.cycleInterval = undefined;
    }
    this.state.isRunning = false;
    console.log('[AgentCore] Stopped');
  }

  async runEvolutionCycle(): Promise<EvolutionCycle> {
    const cycle: EvolutionCycle = {
      id: `cycle-${Date.now()}`,
      startTime: new Date(),
      tasks: [],
      improvements: 0,
      success: false,
    };

    console.log(`[AgentCore] Starting evolution cycle ${cycle.id}`);

    try {
      // Phase 1: Analyze codebase in parallel
      const analysisTasks = await this.codeAnalyzer.analyzeAll();

      // Phase 2: Process improvements in parallel (25x speed)
      const improvementTasks = await this.batchProcessor.processBatch(
        analysisTasks,
        async (analysis) => {
          if (!this.config.autoModify) return null;
          return this.selfModifier.generateImprovements(analysis);
        }
      );

      // Phase 3: Apply modifications with validation
      const validModifications = improvementTasks
        .filter((mod) => mod && this.config.autoTest)
        .slice(0, this.config.maxChangesPerCycle);

      for (const modification of validModifications) {
        const success = await this.selfModifier.applyModification(modification);
        if (success) {
          cycle.improvements++;
        }
      }

      // Phase 4: Learn from this cycle
      await this.evolutionEngine.recordCycle(cycle);

      cycle.success = true;
      cycle.endTime = new Date();
      this.state.totalEvolutions++;
      this.state.lastEvolutionTime = new Date();

      console.log(
        `[AgentCore] Cycle ${cycle.id} completed: ${cycle.improvements} improvements`
      );
    } catch (error) {
      console.error(`[AgentCore] Cycle ${cycle.id} failed:`, error);
      cycle.success = false;
      cycle.endTime = new Date();
    }

    return cycle;
  }

  async analyzeCode(filePath?: string): Promise<ReturnType<CodeAnalyzer['analyze']>> {
    return this.codeAnalyzer.analyze(filePath);
  }

  async modifyCode(filePath: string, modification: Parameters<typeof this.selfModifier.applyModification>[0]): Promise<boolean> {
    return this.selfModifier.applyModification(modification);
  }

  async queueTask(task: AITask): Promise<void> {
    await this.taskQueue.add(task);
  }

  async processTasksParallel<T>(tasks: AITask[], processor: (task: AITask) => Promise<T>): Promise<T[]> {
    return this.batchProcessor.processBatch(tasks, processor);
  }

  getState(): SelfEvolutionState {
    return { ...this.state };
  }

  updateConfig(config: Partial<EvolutionConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): EvolutionConfig {
    return { ...this.config };
  }

  async rollback(modificationId: string): Promise<boolean> {
    return this.selfModifier.rollback(modificationId);
  }

  getWorkerPool(): WorkerPool {
    return this.workerPool;
  }

  getTaskQueue(): TaskQueue {
    return this.taskQueue;
  }
}

export const agentCore = AgentCore.getInstance();