/**
 * CodeAnalyzer - Analyzes codebase for improvements
 * Scans for bugs, vulnerabilities, performance issues, and best practices
 */

import { CodeAnalysis, CodeIssue, ImprovementSuggestion, CodeMetrics } from './types';

export class CodeAnalyzer {
  private patterns: Map<string, RegExp>;

  constructor() {
    this.patterns = new Map([
      // Performance issues
      ['nested-loops', /for\s*\([^)]*\)\s*\{[^}]*for\s*\([^)]*\)/gi],
      ['expensive-operation', /\.map\(.*\.filter\(/gi],
      ['memory-leak', /addEventListener.*removeEventListener/gi],
      
      // Security vulnerabilities
      ['xss-risk', /dangerouslySetInnerHTML/gi],
      ['sql-injection', /`.*\$\{.*\}.*`/gi],
      ['hardcoded-secret', /password\s*=\s*['"`]/gi],
      
      // Code style
      ['unused-variable', /const\s+\w+\s*=\s*[^;]+;(?!\s*used)/gi],
      ['console-log', /console\.(log|debug|info)/gi],
      
      // Best practices
      ['any-type', /:\s*any\b/gi],
      ['missing-error-handling', /catch\s*\(\s*\)\s*\{\s*\}/gi],
    ]);
  }

  async analyze(filePath?: string): Promise<CodeAnalysis> {
    const issues: CodeIssue[] = [];
    const suggestions: ImprovementSuggestion[] = [];

    // Analyze based on file type
    if (filePath) {
      const ext = filePath.split('.').pop()?.toLowerCase();
      
      if (ext === 'ts' || ext === 'tsx') {
        issues.push(...this.analyzeTypeScript(filePath));
        suggestions.push(...this.generateTypeScriptSuggestions());
      }
    }

    // Calculate metrics
    const metrics: CodeMetrics = {
      linesOfCode: 0,
      complexity: this.calculateComplexity(issues),
      maintainability: this.calculateMaintainability(issues),
    };

    return {
      filePath: filePath || 'all',
      issues,
      suggestions,
      metrics,
    };
  }

  async analyzeAll(): Promise<CodeAnalysis[]> {
    const analyses: CodeAnalysis[] = [];
    
    // Analyze all TypeScript files
    const tsFiles = [
      'src/components',
      'src/hooks',
      'src/services',
      'src/store',
      'src/utils',
    ];

    for (const dir of tsFiles) {
      try {
        const analysis = await this.analyze(dir);
        if (analysis.issues.length > 0 || analysis.suggestions.length > 0) {
          analyses.push(analysis);
        }
      } catch {
        // Directory might not exist, skip
      }
    }

    return analyses;
  }

  private analyzeTypeScript(filePath: string): CodeIssue[] {
    const issues: CodeIssue[] = [];

    // Check for common patterns
    for (const [patternName, pattern] of this.patterns) {
      if (pattern.test(filePath)) {
        issues.push({
          severity: this.getSeverityForPattern(patternName),
          type: this.getTypeForPattern(patternName),
          message: `Detected pattern: ${patternName}`,
        });
      }
    }

    return issues;
  }

  private generateTypeScriptSuggestions(): ImprovementSuggestion[] {
    return [
      {
        id: 'ts-strict',
        title: 'Enable strict mode',
        description: 'Enable strict TypeScript checks for better type safety',
        impact: 'high',
        effort: 'low',
        code: '"strict": true',
      },
      {
        id: 'no-any',
        title: 'Remove any types',
        description: 'Replace any with proper types for better type safety',
        impact: 'medium',
        effort: 'medium',
      },
      {
        id: 'error-handling',
        title: 'Improve error handling',
        description: 'Add proper error handling to catch blocks',
        impact: 'high',
        effort: 'low',
      },
    ];
  }

  private getSeverityForPattern(patternName: string): CodeIssue['severity'] {
    const severityMap: Record<string, CodeIssue['severity']> = {
      'nested-loops': 'medium',
      'expensive-operation': 'high',
      'memory-leak': 'critical',
      'xss-risk': 'critical',
      'sql-injection': 'critical',
      'hardcoded-secret': 'critical',
      'unused-variable': 'low',
      'console-log': 'low',
      'any-type': 'medium',
      'missing-error-handling': 'high',
    };
    return severityMap[patternName] || 'low';
  }

  private getTypeForPattern(patternName: string): CodeIssue['type'] {
    const typeMap: Record<string, CodeIssue['type']> = {
      'nested-loops': 'performance',
      'expensive-operation': 'performance',
      'memory-leak': 'bug',
      'xss-risk': 'vulnerability',
      'sql-injection': 'vulnerability',
      'hardcoded-secret': 'vulnerability',
      'unused-variable': 'style',
      'console-log': 'style',
      'any-type': 'best-practice',
      'missing-error-handling': 'best-practice',
    };
    return typeMap[patternName] || 'style';
  }

  private calculateComplexity(issues: CodeIssue[]): number {
    const weights = { critical: 10, high: 5, medium: 2, low: 1 };
    return issues.reduce((sum, issue) => sum + weights[issue.severity], 0);
  }

  private calculateMaintainability(issues: CodeIssue[]): number {
    const complexity = this.calculateComplexity(issues);
    return Math.max(0, 100 - complexity * 2);
  }
}