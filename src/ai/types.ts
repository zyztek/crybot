/**
 * AI Self-Evolution System Types
 * Core type definitions for autonomous AI agent
 */

export interface AITask {
  id: string;
  type: 'analyze' | 'modify' | 'evolve' | 'optimize' | 'heal';
  priority: number;
  payload: unknown;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface CodeAnalysis {
  filePath: string;
  issues: CodeIssue[];
  suggestions: ImprovementSuggestion[];
  metrics: CodeMetrics;
}

export interface CodeIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'bug' | 'vulnerability' | 'performance' | 'style' | 'best-practice';
  message: string;
  line?: number;
  column?: number;
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  code?: string;
}

export interface CodeMetrics {
  linesOfCode: number;
  complexity: number;
  maintainability: number;
  testCoverage?: number;
}

export interface Modification {
  id: string;
  filePath: string;
  originalCode: string;
  modifiedCode: string;
  description: string;
  timestamp: Date;
  rollbackId: string;
  validated: boolean;
}

export interface EvolutionCycle {
  id: string;
  startTime: Date;
  endTime?: Date;
  tasks: AITask[];
  improvements: number;
  success: boolean;
}

export interface WorkerMessage {
  type: 'task' | 'result' | 'error' | 'heartbeat';
  payload: unknown;
  taskId?: string;
}

export interface ParallelConfig {
  concurrency: number;
  maxRetries: number;
  timeout: number;
  batchSize: number;
}

export interface EvolutionConfig {
  autoAnalyze: boolean;
  autoModify: boolean;
  autoTest: boolean;
  maxChangesPerCycle: number;
  cycleIntervalMs: number;
  sandboxMode: boolean;
}

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'local';
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string;
}

export interface SelfEvolutionState {
  isRunning: boolean;
  currentCycle?: EvolutionCycle;
  totalEvolutions: number;
  lastEvolutionTime?: Date;
  successRate: number;
}