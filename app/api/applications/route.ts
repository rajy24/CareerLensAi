import { NextRequest, NextResponse } from 'next/server';
import { JobApplication } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, companyName, role, roleTitle, status, date_applied, applicationDate, job_url, jobUrl, notes, follow_up_date, nextFollowUp, salary_range, salary } = body;

    const finalCompany = (company || companyName || '').trim();
    const finalRole = (role || roleTitle || '').trim();

    if (!finalCompany || !finalRole) {
      return NextResponse.json(
        { error: 'Company name and role title are required.' },
        { status: 400 }
      );
    }

    const application: JobApplication = {
      id: body.id || `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      company: finalCompany,
      role: finalRole,
      status: status || 'Applied',
      date_applied: date_applied || applicationDate || new Date().toISOString().split('T')[0],
      job_url: job_url || jobUrl || '',
      notes: notes || '',
      follow_up_date: follow_up_date || nextFollowUp || '',
      salary_range: salary_range || salary || '',
      created_at: body.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to process application.' },
      { status: 500 }
    );
  }
}
