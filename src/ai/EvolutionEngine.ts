/**
 * EvolutionEngine - Manages self-improvement cycles
 * Tracks learning and adapts based on results
 */

import { EvolutionCycle, AITask } from './types';

interface LearningData {
  successfulPatterns: Map<string, number>;
  failedPatterns: Map<string, number>;
  cycleHistory: EvolutionCycle[];
}

export class EvolutionEngine {
  private learningData: LearningData;
  private maxHistorySize: number;

  constructor(maxHistorySize: number = 100) {
    this.maxHistorySize = maxHistorySize;
    this.learningData = {
      successfulPatterns: new Map(),
      failedPatterns: new Map(),
      cycleHistory: [],
    };
  }

  async recordCycle(cycle: EvolutionCycle): Promise<void> {
    // Add to history
    this.learningData.cycleHistory.push(cycle);

    // Trim history if needed
    if (this.learningData.cycleHistory.length > this.maxHistorySize) {
      this.learningData.cycleHistory.shift();
    }

    // Learn from this cycle
    if (cycle.success) {
      this.learnFromSuccess(cycle);
    } else {
      this.learnFromFailure(cycle);
    }

    console.log(
      `[EvolutionEngine] Recorded cycle ${cycle.id}: success=${cycle.success}, improvements=${cycle.improvements}`
    );
  }

  private learnFromSuccess(cycle: EvolutionCycle): void {
    // Increment successful pattern counts
    for (const task of cycle.tasks) {
      const key = `${task.type}`;
      const count = this.learningData.successfulPatterns.get(key) || 0;
      this.learningData.successfulPatterns.set(key, count + 1);
    }
  }

  private learnFromFailure(cycle: EvolutionCycle): void {
    // Track failed patterns
    for (const task of cycle.tasks) {
      const key = `${task.type}`;
      const count = this.learningData.failedPatterns.get(key) || 0;
      this.learningData.failedPatterns.set(key, count + 1);
    }
  }

  getSuccessRate(): number {
    const total = this.learningData.cycleHistory.length;
    if (total === 0) return 0;

    const successful = this.learningData.cycleHistory.filter((c) => c.success).length;
    return successful / total;
  }

  getMostSuccessfulTaskType(): string | null {
    let maxCount = 0;
    let bestType: string | null = null;

    for (const [type, count] of this.learningData.successfulPatterns) {
      if (count > maxCount) {
        maxCount = count;
        bestType = type;
      }
    }

    return bestType;
  }

  getMostFailedTaskType(): string | null {
    let maxCount = 0;
    let worstType: string | null = null;

    for (const [type, count] of this.learningData.failedPatterns) {
      if (count > maxCount) {
        maxCount = count;
        worstType = type;
      }
    }

    return worstType;
  }

  getCycleHistory(limit?: number): EvolutionCycle[] {
    if (limit) {
      return this.learningData.cycleHistory.slice(-limit);
    }
    return [...this.learningData.cycleHistory];
  }

  getLearningInsights(): {
    successRate: number;
    bestTaskType: string | null;
    worstTaskType: string | null;
    totalCycles: number;
    totalImprovements: number;
  } {
    return {
      successRate: this.getSuccessRate(),
      bestTaskType: this.getMostSuccessfulTaskType(),
      worstTaskType: this.getMostFailedTaskType(),
      totalCycles: this.learningData.cycleHistory.length,
      totalImprovements: this.learningData.cycleHistory.reduce(
        (sum, c) => sum + c.improvements,
        0
      ),
    };
  }

  async optimizeStrategy(): Promise<void> {
    // Adjust task priorities based on learning
    const insights = this.getLearningInsights();
    
    console.log(`[EvolutionEngine] Optimization insights:`, insights);
    
    // In a real implementation, this would:
    // 1. Adjust task priorities
    // 2. Modify retry strategies
    // 3. Tune concurrency settings
  }

  reset(): void {
    this.learningData = {
      successfulPatterns: new Map(),
      failedPatterns: new Map(),
      cycleHistory: [],
    };
  }
}