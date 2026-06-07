import { NextRequest, NextResponse } from 'next/server';
import { AIOrchestrator } from '@/agents/orchestrator';

const orchestrator = AIOrchestrator.getInstance();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent, action, input, context } = body;

    if (!agent || !action) {
      return NextResponse.json(
        { success: false, error: 'Agent and action are required' },
        { status: 400 }
      );
    }

    const result = await orchestrator.executeAgent(agent, action, input || {}, {
      organizationId: request.headers.get('x-organization-id') || '',
      campusId: request.headers.get('x-campus-id') || undefined,
      userId: request.headers.get('x-user-id') || '',
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'AI agent execution failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentName = searchParams.get('agent');
    const limit = parseInt(searchParams.get('limit') || '50');

    const logs = await orchestrator.getAgentLogs(agentName || undefined, limit);

    return NextResponse.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}
