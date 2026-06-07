import { openai, OpenAIProvider } from '@ai-sdk/openai';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import type { AIAgentConfig } from '@/types';

export type AIAgentResult = {
  success: boolean;
  data?: unknown;
  error?: string;
  confidence?: number;
  reasoning?: string;
};

// ============================================================
// AI Orchestrator - Central AI Management
// ============================================================

export class AIOrchestrator {
  private static instance: AIOrchestrator;
  private agents: Map<string, BaseAgent> = new Map();
  private openaiProvider: OpenAIProvider;

  private constructor() {
    this.openaiProvider = openai(process.env.OPENAI_API_KEY || '');
  }

  static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }

  registerAgent(agent: BaseAgent): void {
    this.agents.set(agent.name, agent);
  }

  getAgent(name: string): BaseAgent | undefined {
    return this.agents.get(name);
  }

  async executeAgent(
    agentName: string,
    action: string,
    input: Record<string, unknown>,
    context?: { organizationId: string; campusId?: string; userId: string }
  ): Promise<AIAgentResult> {
    const agent = this.agents.get(agentName);
    if (!agent) {
      return { success: false, error: `Agent '${agentName}' not found` };
    }

    const startTime = Date.now();
    try {
      const result = await agent.execute(action, input, context);
      const duration = Date.now() - startTime;

      await this.logAgentExecution(agentName, action, input, result, duration, 'SUCCESS');
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      await this.logAgentExecution(agentName, action, input, null, duration, 'ERROR', errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  async executeWorkflow(
    workflowName: string,
    input: Record<string, unknown>,
    context?: { organizationId: string; campusId?: string; userId: string }
  ): Promise<AIAgentResult> {
    const workflow = await this.getWorkflow(workflowName);
    if (!workflow) {
      return { success: false, error: `Workflow '${workflowName}' not found` };
    }

    let currentInput = input;
    for (const step of workflow.steps) {
      const result = await this.executeAgent(step.agentName, step.action, currentInput, context);
      if (!result.success) {
        return { success: false, error: `Workflow failed at step '${step.name}': ${result.error}` };
      }
      currentInput = result.data as Record<string, unknown>;
    }

    return { success: true, data: currentInput };
  }

  private async getWorkflow(name: string) {
    const workflows: Record<string, { steps: Array<{ name: string; agentName: string; action: string }> }> = {
      'admission-review': {
        steps: [
          { name: 'Document Verification', agentName: 'AdmissionAgent', action: 'verifyDocuments' },
          { name: 'AI Scoring', agentName: 'AdmissionAgent', action: 'scoreApplication' },
          { name: 'Recommendation', agentName: 'AdmissionAgent', action: 'recommend' },
        ],
      },
      'attendance-analysis': {
        steps: [
          { name: 'Collect Data', agentName: 'AttendanceAgent', action: 'analyzePatterns' },
          { name: 'Risk Detection', agentName: 'AttendanceAgent', action: 'detectRisk' },
          { name: 'Notify Parents', agentName: 'ParentCommunicationAgent', action: 'sendRiskAlert' },
        ],
      },
      'performance-prediction': {
        steps: [
          { name: 'Analyze Performance', agentName: 'AcademicAgent', action: 'analyzePerformance' },
          { name: 'Predict Risk', agentName: 'AcademicAgent', action: 'predictRisk' },
          { name: 'Recommend Intervention', agentName: 'AcademicAgent', action: 'recommendIntervention' },
        ],
      },
      'library-penalty': {
        steps: [
          { name: 'Calculate Penalty', agentName: 'LibraryAgent', action: 'calculatePenalty' },
          { name: 'Apply Penalty', agentName: 'FinanceAgent', action: 'applyPenalty' },
          { name: 'Notify Student', agentName: 'ParentCommunicationAgent', action: 'sendPenaltyNotice' },
        ],
      },
      'waec-migration': {
        steps: [
          { name: 'Verify Eligibility', agentName: 'AlumniAgent', action: 'verifyEligibility' },
          { name: 'Migrate Results', agentName: 'AlumniAgent', action: 'migrateToWAEC' },
          { name: 'Update Records', agentName: 'AlumniAgent', action: 'updateRecords' },
        ],
      },
    };
    return workflows[workflowName] || null;
  }

  private async logAgentExecution(
    agentName: string,
    action: string,
    input: Record<string, unknown>,
    output: AIAgentResult | null,
    duration: number,
    status: string,
    error?: string
  ) {
    try {
      await prisma.aIAgentLog.create({
        data: {
          agentName,
          action,
          input: input as never,
          output: output as never,
          duration,
          status,
          error,
        },
      });
    } catch (err) {
      console.error('Failed to log agent execution:', err);
    }
  }

  async getAgentLogs(agentName?: string, limit = 50) {
    const where = agentName ? { agentName } : {};
    return prisma.aIAgentLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

// ============================================================
// Base Agent Class
// ============================================================

export abstract class BaseAgent {
  abstract name: string;
  abstract config: AIAgentConfig;

  protected openaiProvider = openai(process.env.OPENAI_API_KEY || '');

  abstract execute(
    action: string,
    input: Record<string, unknown>,
    context?: { organizationId: string; campusId?: string; userId: string }
  ): Promise<AIAgentResult>;

  protected async generateWithSchema<T>(
    prompt: string,
    schema: z.ZodSchema<T>,
    model?: string
  ): Promise<T> {
    const { object } = await generateObject({
      model: this.openaiProvider.chat(model || 'gpt-4o'),
      prompt,
      schema,
    });
    return object;
  }

  protected async generateTextResponse(prompt: string, model?: string): Promise<string> {
    const { text } = await generateText({
      model: this.openaiProvider.chat(model || 'gpt-4o'),
      prompt,
      maxTokens: this.config.maxTokens,
      temperature: this.config.temperature,
    });
    return text;
  }

  protected async logActivity(
    userId: string,
    action: string,
    details?: Record<string, unknown>
  ) {
    await prisma.userActivity.create({
      data: { userId, action, details: details as never },
    });
  }
}

// ============================================================
// Initialize All Agents
// ============================================================

export function initializeAgents(): AIOrchestrator {
  const orchestrator = AIOrchestrator.getInstance();
  
  // Agents will be registered here as they are created
  // import { AdmissionAgent } from './admission-agent';
  // orchestrator.registerAgent(new AdmissionAgent());
  
  return orchestrator;
}
