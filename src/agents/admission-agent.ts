import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { generateAdmissionNumber, calculateGrade } from '@/lib/utils';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { logNotification } from '@/lib/sms';

const AdmissionReviewSchema = z.object({
  score: z.number().min(0).max(100),
  recommendation: z.enum(['APPROVE', 'REJECT', 'WAITLIST', 'REVIEW']),
  reasoning: z.string(),
  strengths: z.array(z.string()),
  concerns: z.array(z.string()),
  suggestedClass: z.string().optional(),
  confidence: z.number().min(0).max(1),
});

export class AdmissionAgent extends BaseAgent {
  name = 'AdmissionAgent';
  config = {
    name: 'Admission Agent',
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 2000,
    systemPrompt: `You are an AI admission officer for a school management system.
    Your role is to review applications, evaluate candidates, and provide recommendations.
    Consider factors like academic history, age appropriateness, available space, and school fit.
    Always provide a detailed reasoning for your decisions.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?): Promise<AIAgentResult> {
    switch (action) {
      case 'reviewApplication':
        return this.reviewApplication(input);
      case 'scoreApplication':
        return this.scoreApplication(input);
      case 'recommend':
        return this.recommend(input);
      case 'verifyDocuments':
        return this.verifyDocuments(input);
      case 'bulkReview':
        return this.bulkReview(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async reviewApplication(input: Record<string, unknown>): Promise<AIAgentResult> {
    const admissionId = input.admissionId as string;
    
    const admission = await prisma.admission.findUnique({
      where: { id: admissionId },
      include: { campus: true },
    });

    if (!admission) {
      return { success: false, error: 'Admission not found' };
    }

    const prompt = `Review this student admission application:
    
    Student: ${admission.firstName} ${admission.lastName}
    DOB: ${admission.dateOfBirth}
    Gender: ${admission.gender}
    Previous School: ${admission.previousSchool || 'N/A'}
    Previous Class: ${admission.previousClass || 'N/A'}
    Desired Class: ${admission.desiredClass}
    Parent: ${admission.parentName}
    
    Documents: ${JSON.stringify(admission.documents || {})}
    
    Campus Level: ${admission.campus.level.join(', ')}
    
    Evaluate this application and provide:
    1. A score (0-100) based on completeness and fit
    2. A recommendation (APPROVE, REJECT, WAITLIST, or REVIEW)
    3. Detailed reasoning
    4. Key strengths
    5. Any concerns
    6. Suggested class if applicable`;

    const result = await this.generateWithSchema(prompt, AdmissionReviewSchema);

    // Update admission with AI results
    await prisma.admission.update({
      where: { id: admissionId },
      data: {
        aiScore: result.score,
        aiRecommendation: result.recommendation,
        status: result.recommendation === 'APPROVE' ? 'RECOMMENDED' : 
                result.recommendation === 'REJECT' ? 'REJECTED' : 'UNDER_REVIEW',
      },
    });

    return {
      success: true,
      data: {
        admissionId,
        ...result,
      },
      confidence: result.confidence,
      reasoning: result.reasoning,
    };
  }

  async scoreApplication(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { firstName, lastName, previousSchool, previousClass, desiredClass, documents } = input;

    const prompt = `Score this admission application:
    Student: ${firstName} ${lastName}
    Previous School: ${previousSchool || 'N/A'}
    Previous Class: ${previousClass || 'N/A'}
    Desired Class: ${desiredClass}
    Documents: ${JSON.stringify(documents || {})}
    
    Score based on: completeness (30%), academic fit (30%), age appropriateness (20%), documentation quality (20%)`;

    const result = await this.generateWithSchema(prompt, AdmissionReviewSchema);

    return {
      success: true,
      data: {
        score: result.score,
        reasoning: result.reasoning,
      },
    };
  }

  async recommend(input: Record<string, unknown>): Promise<AIAgentResult> {
    const admissionId = input.admissionId as string;
    
    const admission = await prisma.admission.findUnique({
      where: { id: admissionId },
    });

    if (!admission) {
      return { success: false, error: 'Admission not found' };
    }

    const recommendation = admission.aiRecommendation || 'REVIEW';
    const status = recommendation === 'APPROVE' ? 'RECOMMENDED' : 
                   recommendation === 'REJECT' ? 'REJECTED' : 'UNDER_REVIEW';

    await prisma.admission.update({
      where: { id: admissionId },
      data: { status: status as never },
    });

    // Notify admin
    if (admission.parentEmail) {
      await sendEmail({
        to: admission.parentEmail,
        subject: `Application ${status} - ${admission.firstName} ${admission.lastName}`,
        html: buildEmailTemplate(
          `Application ${status}`,
          `<p>Dear ${admission.parentName},</p>
           <p>The application for <strong>${admission.firstName} ${admission.lastName}</strong> has been ${status.toLowerCase()}.</p>
           <p>Application Number: ${admission.applicationNumber}</p>
           <p>Status: <strong>${status}</strong></p>
           <p>We will notify you of the next steps.</p>`
        ),
      });
    }

    return {
      success: true,
      data: { admissionId, status },
    };
  }

  async verifyDocuments(input: Record<string, unknown>): Promise<AIAgentResult> {
    const documents = input.documents as Record<string, string> || {};
    
    const requiredDocs = ['birthCertificate', 'previousSchoolReport', 'passportPhoto'];
    const providedDocs = Object.keys(documents);
    const missingDocs = requiredDocs.filter(doc => !providedDocs.includes(doc));

    return {
      success: true,
      data: {
        verified: missingDocs.length === 0,
        providedDocs,
        missingDocs,
        completeness: ((requiredDocs.length - missingDocs.length) / requiredDocs.length) * 100,
      },
    };
  }

  async bulkReview(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;
    const limit = (input.limit as number) || 50;

    const pendingAdmissions = await prisma.admission.findMany({
      where: {
        campusId,
        status: 'APPLIED',
      },
      take: limit,
    });

    const results = [];
    for (const admission of pendingAdmissions) {
      const result = await this.reviewApplication({ admissionId: admission.id });
      results.push({
        admissionId: admission.id,
        studentName: `${admission.firstName} ${admission.lastName}`,
        ...result,
      });
    }

    return {
      success: true,
      data: {
        reviewed: results.length,
        approved: results.filter(r => r.data && (r.data as Record<string, unknown>).recommendation === 'APPROVE').length,
        rejected: results.filter(r => r.data && (r.data as Record<string, unknown>).recommendation === 'REJECT').length,
        results,
      },
    };
  }
}
