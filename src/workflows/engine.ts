import prisma from '@/lib/prisma';
import { AIOrchestrator } from '@/agents/orchestrator';
import type { AIWorkflowStep } from '@/types';

// ============================================================
// Workflow Engine - Manages Complex AI Workflows
// ============================================================

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggerEvent: string;
  isActive: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  agentName: string;
  action: string;
  inputMapping: Record<string, string>;
  outputMapping: Record<string, string>;
  condition?: string;
  nextStepId?: string;
  errorHandling: 'STOP' | 'CONTINUE' | 'RETRY';
  maxRetries: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  currentStepId: string | null;
  context: Record<string, unknown>;
  results: WorkflowStepResult[];
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface WorkflowStepResult {
  stepId: string;
  stepName: string;
  agentName: string;
  action: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  duration: number;
  error?: string;
}

export class WorkflowEngine {
  private static instance: WorkflowEngine;
  private orchestrator: AIOrchestrator;
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();

  private constructor() {
    this.orchestrator = AIOrchestrator.getInstance();
    this.registerBuiltinWorkflows();
  }

  static getInstance(): WorkflowEngine {
    if (!WorkflowEngine.instance) {
      WorkflowEngine.instance = new WorkflowEngine();
    }
    return WorkflowEngine.instance;
  }

  private registerBuiltinWorkflows(): void {
    // Admission Review Workflow
    this.registerWorkflow({
      id: 'admission-review',
      name: 'Admission Review Workflow',
      description: 'Automated admission application review and recommendation',
      triggerEvent: 'ADMISSION_APPLICATION',
      isActive: true,
      steps: [
        {
          id: 'verify-docs',
          name: 'Document Verification',
          agentName: 'AdmissionAgent',
          action: 'verifyDocuments',
          inputMapping: { documents: 'documents' },
          outputMapping: { verification: 'verification' },
          nextStepId: 'score-app',
          errorHandling: 'STOP',
          maxRetries: 1,
        },
        {
          id: 'score-app',
          name: 'Application Scoring',
          agentName: 'AdmissionAgent',
          action: 'scoreApplication',
          inputMapping: { firstName: 'firstName', lastName: 'lastName', previousSchool: 'previousSchool', desiredClass: 'desiredClass', documents: 'documents' },
          outputMapping: { score: 'aiScore', reasoning: 'aiReasoning' },
          nextStepId: 'recommend',
          errorHandling: 'CONTINUE',
          maxRetries: 2,
        },
        {
          id: 'recommend',
          name: 'AI Recommendation',
          agentName: 'AdmissionAgent',
          action: 'recommend',
          inputMapping: { admissionId: 'admissionId' },
          outputMapping: { recommendation: 'aiRecommendation', status: 'newStatus' },
          errorHandling: 'STOP',
          maxRetries: 1,
        },
      ],
    });

    // Attendance Analysis Workflow
    this.registerWorkflow({
      id: 'attendance-analysis',
      name: 'Attendance Analysis Workflow',
      description: 'Analyze attendance patterns and trigger parent notifications',
      triggerEvent: 'DAILY_ATTENDANCE',
      isActive: true,
      steps: [
        {
          id: 'analyze',
          name: 'Pattern Analysis',
          agentName: 'AttendanceAgent',
          action: 'analyzePatterns',
          inputMapping: { studentId: 'studentId', classId: 'classId', termId: 'termId' },
          outputMapping: { patterns: 'attendancePatterns', riskScore: 'riskScore' },
          nextStepId: 'detect-risk',
          errorHandling: 'CONTINUE',
          maxRetries: 1,
        },
        {
          id: 'detect-risk',
          name: 'Risk Detection',
          agentName: 'AttendanceAgent',
          action: 'detectRisk',
          inputMapping: { classId: 'classId', termId: 'termId' },
          outputMapping: { riskStudents: 'atRiskStudents' },
          condition: 'riskScore > 70',
          nextStepId: 'notify-parents',
          errorHandling: 'CONTINUE',
          maxRetries: 1,
        },
        {
          id: 'notify-parents',
          name: 'Parent Notification',
          agentName: 'ParentCommunicationAgent',
          action: 'sendRiskAlert',
          inputMapping: { studentId: 'studentId', riskType: 'ATTENDANCE', riskData: 'attendancePatterns' },
          outputMapping: { notificationResult: 'notificationResult' },
          errorHandling: 'CONTINUE',
          maxRetries: 2,
        },
      ],
    });

    // Performance Prediction Workflow
    this.registerWorkflow({
      id: 'performance-prediction',
      name: 'Performance Prediction Workflow',
      description: 'Analyze student performance and predict risks',
      triggerEvent: 'TERM_ASSESSMENT',
      isActive: true,
      steps: [
        {
          id: 'analyze-perf',
          name: 'Performance Analysis',
          agentName: 'AcademicAgent',
          action: 'analyzePerformance',
          inputMapping: { studentId: 'studentId', termId: 'termId' },
          outputMapping: { analysis: 'performanceAnalysis', riskLevel: 'riskLevel' },
          nextStepId: 'predict-risk',
          errorHandling: 'STOP',
          maxRetries: 1,
        },
        {
          id: 'predict-risk',
          name: 'Risk Prediction',
          agentName: 'AcademicAgent',
          action: 'predictRisk',
          inputMapping: { classId: 'classId', termId: 'termId' },
          outputMapping: { predictions: 'riskPredictions' },
          nextStepId: 'recommend-intervention',
          errorHandling: 'CONTINUE',
          maxRetries: 1,
        },
        {
          id: 'recommend-intervention',
          name: 'Intervention Recommendation',
          agentName: 'AcademicAgent',
          action: 'recommendIntervention',
          inputMapping: { studentId: 'studentId', riskData: 'performanceAnalysis' },
          outputMapping: { interventions: 'recommendedInterventions' },
          condition: 'riskLevel == "HIGH"',
          errorHandling: 'CONTINUE',
          maxRetries: 1,
        },
      ],
    });

    // Library Penalty Workflow
    this.registerWorkflow({
      id: 'library-penalty',
      name: 'Library Penalty Workflow',
      description: 'Calculate and apply library penalties',
      triggerEvent: 'BOOK_OVERDUE',
      isActive: true,
      steps: [
        {
          id: 'calc-penalty',
          name: 'Calculate Penalty',
          agentName: 'LibraryAgent',
          action: 'calculatePenalty',
          inputMapping: { transactionId: 'transactionId' },
          outputMapping: { penalty: 'penaltyAmount', overdueDays: 'overdueDays' },
          nextStepId: 'apply-penalty',
          errorHandling: 'STOP',
          maxRetries: 1,
        },
        {
          id: 'apply-penalty',
          name: 'Apply Financial Penalty',
          agentName: 'FinanceAgent',
          action: 'applyPenalty',
          inputMapping: { paymentId: 'paymentId', penaltyAmount: 'penaltyAmount', reason: 'Library overdue penalty' },
          outputMapping: { applied: 'penaltyApplied' },
          nextStepId: 'notify',
          errorHandling: 'STOP',
          maxRetries: 1,
        },
        {
          id: 'notify',
          name: 'Notify Student',
          agentName: 'ParentCommunicationAgent',
          action: 'sendPenaltyNotice',
          inputMapping: { studentId: 'studentId', penaltyDetails: 'penaltyDetails' },
          outputMapping: { notified: 'studentNotified' },
          errorHandling: 'CONTINUE',
          maxRetries: 2,
        },
      ],
    });

    // WAEC Migration Workflow
    this.registerWorkflow({
      id: 'waec-migration',
      name: 'WAEC Migration Workflow',
      description: 'Migrate alumni records to WAEC format',
      triggerEvent: 'GRADUATION',
      isActive: true,
      steps: [
        {
          id: 'verify-eligibility',
          name: 'Verify Eligibility',
          agentName: 'AlumniAgent',
          action: 'verifyEligibility',
          inputMapping: { alumniId: 'alumniId' },
          outputMapping: { eligibility: 'eligibilityCheck' },
          nextStepId: 'migrate',
          condition: 'eligibility.eligible == true',
          errorHandling: 'STOP',
          maxRetries: 1,
        },
        {
          id: 'migrate',
          name: 'Migrate to WAEC',
          agentName: 'AlumniAgent',
          action: 'migrateToWAEC',
          inputMapping: { alumniId: 'alumniId' },
          outputMapping: { migrationResult: 'waecMigration' },
          nextStepId: 'update-records',
          errorHandling: 'STOP',
          maxRetries: 2,
        },
        {
          id: 'update-records',
          name: 'Update Alumni Records',
          agentName: 'AlumniAgent',
          action: 'updateRecords',
          inputMapping: { alumniId: 'alumniId', updates: 'waecMigration' },
          outputMapping: { updated: 'recordsUpdated' },
          errorHandling: 'CONTINUE',
          maxRetries: 1,
        },
      ],
    });
  }

  registerWorkflow(workflow: WorkflowDefinition): void {
    this.workflows.set(workflow.id, workflow);
  }

  getWorkflow(id: string): WorkflowDefinition | undefined {
    return this.workflows.get(id);
  }

  async executeWorkflow(
    workflowId: string,
    input: Record<string, unknown>,
    context?: { organizationId: string; campusId?: string; userId: string }
  ): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow '${workflowId}' not found`);
    }

    if (!workflow.isActive) {
      throw new Error(`Workflow '${workflowId}' is not active`);
    }

    const executionId = `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      status: 'RUNNING',
      currentStepId: workflow.steps[0]?.id || null,
      context: { ...input },
      results: [],
      startedAt: new Date(),
    };

    this.executions.set(executionId, execution);

    try {
      for (const step of workflow.steps) {
        execution.currentStepId = step.id;

        // Check condition
        if (step.condition && !this.evaluateCondition(step.condition, execution.context)) {
          execution.results.push({
            stepId: step.id,
            stepName: step.name,
            agentName: step.agentName,
            action: step.action,
            input: {},
            output: {},
            status: 'SKIPPED',
            duration: 0,
          });
          continue;
        }

        // Map input
        const stepInput = this.mapInput(step.inputMapping, execution.context);

        // Execute step
        let retries = 0;
        let stepResult: WorkflowStepResult | null = null;

        while (retries <= step.maxRetries) {
          const startTime = Date.now();
          try {
            const result = await this.orchestrator.executeAgent(
              step.agentName,
              step.action,
              stepInput,
              context
            );

            stepResult = {
              stepId: step.id,
              stepName: step.name,
              agentName: step.agentName,
              action: step.action,
              input: stepInput,
              output: (result.data as Record<string, unknown>) || {},
              status: result.success ? 'SUCCESS' : 'FAILED',
              duration: Date.now() - startTime,
              error: result.error,
            };

            if (result.success) {
              // Map output to context
              const outputMapping = this.mapOutput(step.outputMapping, stepResult.output);
              Object.assign(execution.context, outputMapping);
              break;
            } else if (step.errorHandling === 'RETRY') {
              retries++;
              continue;
            } else if (step.errorHandling === 'STOP') {
              throw new Error(result.error);
            }
          } catch (error) {
            if (step.errorHandling === 'RETRY' && retries < step.maxRetries) {
              retries++;
              continue;
            }
            stepResult = {
              stepId: step.id,
              stepName: step.name,
              agentName: step.agentName,
              action: step.action,
              input: stepInput,
              output: {},
              status: 'FAILED',
              duration: Date.now() - startTime,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
            if (step.errorHandling === 'STOP') throw error;
          }
        }

        if (stepResult) {
          execution.results.push(stepResult);
        }
      }

      execution.status = 'COMPLETED';
      execution.completedAt = new Date();
    } catch (error) {
      execution.status = 'FAILED';
      execution.error = error instanceof Error ? error.message : 'Unknown error';
      execution.completedAt = new Date();
    }

    return execution;
  }

  async getExecution(id: string): Promise<WorkflowExecution | undefined> {
    return this.executions.get(id);
  }

  async getExecutionsByWorkflow(workflowId: string): Promise<WorkflowExecution[]> {
    return Array.from(this.executions.values()).filter(e => e.workflowId === workflowId);
  }

  private evaluateCondition(condition: string, context: Record<string, unknown>): boolean {
    try {
      const evaluator = new Function('context', `with(context) { return ${condition}; }`);
      return evaluator(context);
    } catch {
      return true;
    }
  }

  private mapInput(mapping: Record<string, string>, context: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, path] of Object.entries(mapping)) {
      result[key] = this.getNestedValue(context, path);
    }
    return result;
  }

  private mapOutput(mapping: Record<string, string>, output: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [contextKey, outputKey] of Object.entries(mapping)) {
      result[contextKey] = output[outputKey];
    }
    return result;
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
      return (current as Record<string, unknown>)?.[key];
    }, obj);
  }
}
