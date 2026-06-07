import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';

const ExamAnalysisSchema = z.object({
  averageScore: z.number(),
  passRate: z.number(),
  highestScore: z.number(),
  lowestScore: z.number(),
  gradeDistribution: z.record(z.string()),
  difficultyLevel: z.enum(['EASY', 'MEDIUM', 'HARD', 'VERY_HARD']),
  questionAnalysis: z.array(z.object({
    question: z.string(),
    correctRate: z.number(),
    difficulty: z.string(),
  })),
  recommendations: z.array(z.string()),
});

export class CBTAgent extends BaseAgent {
  name = 'CBTAgent';
  config = {
    name: 'CBT Agent',
    model: 'gpt-4o',
    temperature: 0.2,
    maxTokens: 2000,
    systemPrompt: `You are an AI CBT (Computer-Based Testing) management agent.
    Create exams, manage scheduling, analyze results, and generate insights.
    Focus on fair assessment and identifying learning gaps.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'createExam':
        return this.createExam(input);
      case 'addQuestion':
        return this.addQuestion(input);
      case 'submitExam':
        return this.submitExam(input);
      case 'analyzeExam':
        return this.analyzeExam(input);
      case 'scheduleExam':
        return this.scheduleExam(input);
      case 'generateQuestions':
        return this.generateQuestions(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async createExam(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { subjectId, title, description, duration, totalMarks, passMark, startTime, endTime, createdBy } = input as {
      subjectId: string;
      title: string;
      description?: string;
      duration: number;
      totalMarks: number;
      passMark: number;
      startTime: Date;
      endTime: Date;
      createdBy: string;
    };

    const exam = await prisma.cBTExam.create({
      data: {
        subjectId,
        title,
        description,
        duration,
        totalMarks,
        passMark,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        createdBy,
      },
    });

    return {
      success: true,
      data: exam,
    };
  }

  async addQuestion(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { examId, question, type, options, correctAnswer, marks, order } = input as {
      examId: string;
      question: string;
      type: string;
      options?: Record<string, string>;
      correctAnswer: string;
      marks: number;
      order: number;
    };

    const examQuestion = await prisma.cBTQuestion.create({
      data: {
        examId,
        question,
        type,
        options: options as never,
        correctAnswer,
        marks,
        order,
      },
    });

    return {
      success: true,
      data: examQuestion,
    };
  }

  async submitExam(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { examId, studentId, answers, timeSpent } = input as {
      examId: string;
      studentId: string;
      answers: Record<string, string>;
      timeSpent: number;
    };

    const exam = await prisma.cBTExam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) {
      return { success: false, error: 'Exam not found' };
    }

    let score = 0;
    const questionResults: Array<{ questionId: string; correct: boolean; marks: number }> = [];

    for (const question of exam.questions) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase();
      if (isCorrect) {
        score += question.marks;
      }
      questionResults.push({
        questionId: question.id,
        correct: isCorrect,
        marks: isCorrect ? question.marks : 0,
      });
    }

    const percentage = (score / exam.totalMarks) * 100;
    const grade = this.calculateGrade(percentage);
    const passed = score >= exam.passMark;

    const result = await prisma.cBTExamResult.create({
      data: {
        examId,
        studentId,
        score,
        grade,
        timeSpent,
      },
    });

    return {
      success: true,
      data: {
        resultId: result.id,
        score,
        totalMarks: exam.totalMarks,
        percentage,
        grade,
        passed,
        timeSpent,
        questionResults,
      },
    };
  }

  async analyzeExam(input: Record<string, unknown>): Promise<AIAgentResult> {
    const examId = input.examId as string;

    const exam = await prisma.cBTExam.findUnique({
      where: { id: examId },
      include: {
        questions: true,
        results: true,
      },
    });

    if (!exam) {
      return { success: false, error: 'Exam not found' };
    }

    const scores = exam.results.map(r => r.score);
    const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const passRate = scores.filter(s => s >= exam.passMark).length / scores.length * 100;
    const highest = Math.max(...scores, 0);
    const lowest = Math.min(...scores, 0);

    const prompt = `Analyze CBT exam results:
    Exam: ${exam.title}
    Total Students: ${scores.length}
    Average Score: ${average.toFixed(1)}
    Pass Rate: ${passRate.toFixed(1)}%
    Highest: ${highest}
    Lowest: ${lowest}
    
    Provide detailed analysis including difficulty assessment and recommendations.`;

    const result = await this.generateWithSchema(prompt, ExamAnalysisSchema);

    return {
      success: true,
      data: {
        examId,
        examTitle: exam.title,
        totalStudents: scores.length,
        averageScore: average,
        passRate,
        highestScore: highest,
        lowestScore: lowest,
        ...result,
      },
    };
  }

  async scheduleExam(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { teacherId, examId, scheduledAt } = input as {
      teacherId: string;
      examId: string;
      scheduledAt: Date;
    };

    const scheduler = await prisma.cBTExamScheduler.create({
      data: {
        teacherId,
        examId,
        scheduledAt: new Date(scheduledAt),
      },
    });

    return {
      success: true,
      data: scheduler,
    };
  }

  async generateQuestions(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { subject, topic, difficulty, count } = input as {
      subject: string;
      topic: string;
      difficulty: string;
      count: number;
    };

    const prompt = `Generate ${count} ${difficulty} level multiple choice questions for:
    Subject: ${subject}
    Topic: ${topic}
    
    For each question provide:
    - The question text
    - 4 options (A, B, C, D)
    - The correct answer
    - Explanation
    - Marks (1-5)`;

    const text = await this.generateTextResponse(prompt);

    return {
      success: true,
      data: {
        subject,
        topic,
        difficulty,
        questions: text,
      },
    };
  }

  private calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    if (percentage >= 40) return 'E';
    return 'F';
  }
}
