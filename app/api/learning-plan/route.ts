import { NextRequest, NextResponse } from 'next/server';
import { SKILL_ROADMAPS } from '@/lib/roadmaps-data';
import { LearningPlanItem, PriorityLevel } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skills } = body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'An array of skills is required to generate a learning plan.' },
        { status: 400 }
      );
    }

    const items: LearningPlanItem[] = [];

    skills.forEach((skillName: string, index: number) => {
      const lower = skillName.toLowerCase();
      const roadmapKey = Object.keys(SKILL_ROADMAPS).find(
        (key) => key.toLowerCase() === lower
      );

      const roadmap = roadmapKey ? SKILL_ROADMAPS[roadmapKey] : null;

      let priority: PriorityLevel = 'medium';
      if (roadmap?.priority) {
        priority = roadmap.priority;
      } else if (index < 2) {
        priority = 'high';
      } else if (index >= 4) {
        priority = 'supplementary';
      }

      items.push({
        id: `plan-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
        skill_name: skillName,
        priority,
        timeframe: roadmap?.timeframe || '1-2 weeks (6-8 hrs)',
        concepts: roadmap?.concepts || [
          'Core syntax and fundamentals',
          'Standard design patterns',
          'Testing and debugging techniques',
          'Production project integration',
        ],
        mini_project: roadmap?.miniProject || `Build a functional proof-of-concept module demonstrating ${skillName} in practice.`,
        resources: roadmap?.resources || [
          {
            name: `${skillName} Official Documentation`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' official documentation')}`,
          },
        ],
        completed: false,
        created_at: new Date().toISOString(),
      });
    });

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (err: any) {
    console.error('API /api/learning-plan error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate learning plan.' },
      { status: 500 }
    );
  }
}
