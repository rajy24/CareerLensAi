import { NextRequest, NextResponse } from 'next/server';
import { analyzeJobCompatibility, extractSkills } from '@/lib/analyzer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, userSkills, roleTitle, companyName } = body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'A valid job description text is required for analysis.' },
        { status: 400 }
      );
    }

    const skillsArray = Array.isArray(userSkills)
      ? userSkills
      : typeof userSkills === 'string'
      ? extractSkills(userSkills)
      : [];

    const analysis = analyzeJobCompatibility(
      skillsArray,
      jobDescription,
      roleTitle || 'Target Role',
      companyName || 'Target Company'
    );

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('API /api/analyze error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing job description.' },
      { status: 500 }
    );
  }
}
