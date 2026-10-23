import { NextRequest, NextResponse } from 'next/server';
import { INTERVIEW_QUESTIONS } from '@/lib/interview-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();

    let filtered = INTERVIEW_QUESTIONS;

    if (role && role !== 'all') {
      filtered = filtered.filter((q) => q.role === role);
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((q) => q.category === category);
    }

    if (search) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(search) ||
          q.answer.toLowerCase().includes(search) ||
          (q.keyPoints && q.keyPoints.some((kp) => kp.toLowerCase().includes(search)))
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch interview questions.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, userAnswer } = body;

    if (!questionId || !userAnswer || typeof userAnswer !== 'string') {
      return NextResponse.json(
        { error: 'questionId and a valid userAnswer string are required.' },
        { status: 400 }
      );
    }

    const question = INTERVIEW_QUESTIONS.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found.' },
        { status: 404 }
      );
    }

    // Transparent evaluation rubric:
    // Check coverage of key points and vocabulary
    const userLower = userAnswer.toLowerCase();
    const coveredPoints: string[] = [];
    const missedPoints: string[] = [];
    const keyPoints = question.keyPoints || [];

    keyPoints.forEach((kp) => {
      // Extract keywords (words with 4+ chars)
      const keywords = kp
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);

      const matchCount = keywords.filter((kw) => userLower.includes(kw)).length;
      // If at least 35% of keywords matched or exact snippet matches
      if (matchCount >= Math.max(1, Math.floor(keywords.length * 0.35))) {
        coveredPoints.push(kp);
      } else {
        missedPoints.push(kp);
      }
    });

    const wordCount = userAnswer.trim().split(/\s+/).length;
    let lengthRating = 'Good';
    if (wordCount < 25) lengthRating = 'Brief (Consider expanding your response)';
    else if (wordCount > 300) lengthRating = 'Detailed (Be mindful of interview conciseness)';

    const coveragePercentage = keyPoints.length > 0
      ? Math.round((coveredPoints.length / keyPoints.length) * 100)
      : 100;

    return NextResponse.json({
      success: true,
      questionId,
      coveragePercentage,
      wordCount,
      lengthRating,
      coveredPoints,
      missedPoints,
      feedback:
        coveragePercentage >= 75
          ? 'Strong response! You clearly hit the core architectural principles.'
          : coveragePercentage >= 40
          ? 'Solid foundation. Make sure to articulate the remaining technical nuances.'
          : 'Promising start. Focus on addressing the foundational concepts listed in the key points.',
      referenceKeyPoints: keyPoints,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to evaluate interview response.' },
      { status: 500 }
    );
  }
}
