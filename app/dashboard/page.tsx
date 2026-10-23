'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Target, 
  Compass, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';

export default function DashboardPage() {
  const { 
    profile, 
    analytics, 
    latestAnalysis, 
    applications, 
    learningPlan 
  } = useCareerLens();

  const nextLearningItem = learningPlan.find(item => !item.completed);
  const recentApplications = applications.slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Hero Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Workspace Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {profile.full_name?.split(' ')[0] || 'there'}.
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Target role: <strong className="text-slate-800">{profile.target_role || 'Software Engineer'}</strong>. Here is your current readiness snapshot, missing skill priorities, and active application pipeline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <Link
              href="/analysis"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Target className="w-4 h-4" />
              <span>Analyze New Job Posting</span>
            </Link>
            <Link
              href="/applications"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>Manage Applications</span>
            </Link>
          </div>
        </div>

        {/* 4-Card Restrained Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Match Score */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Latest Match Score
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {analytics.latest_match_percentage !== null ? `${analytics.latest_match_percentage}%` : '--%'}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 truncate">
              {latestAnalysis ? latestAnalysis.job_title : 'No analysis run yet'}
            </p>
          </div>

          {/* Card 2: Profile Skills */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Profile Skills
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {analytics.skills_in_profile}
              </span>
              <span className="text-xs text-slate-500 font-medium">competencies</span>
            </div>
            <Link href="/resume" className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700">
              Review skills &rarr;
            </Link>
          </div>

          {/* Card 3: Identified Gaps */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Identified Gaps
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {analytics.identified_gaps}
              </span>
              <span className="text-xs text-slate-500 font-medium">to prioritize</span>
            </div>
            <Link href="/learning-plan" className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700">
              View learning plan &rarr;
            </Link>
          </div>

          {/* Card 4: Active Pipeline */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Pipeline
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {analytics.active_applications}
              </span>
              <span className="text-xs text-slate-500 font-medium">in progress</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {analytics.offers_count > 0 ? `${analytics.offers_count} offer(s) received` : '0 offers currently'}
            </p>
          </div>
        </div>

        {/* Dual Focus Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel 1: Recent Compatibility Evaluation */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Latest Job Compatibility</h3>
                  <p className="text-xs text-slate-500">Result of your most recent job description analysis</p>
                </div>
                <Link
                  href="/analysis"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Full Analysis &rarr;
                </Link>
              </div>

              {latestAnalysis ? (
                <div className="pt-4 space-y-4">
                  {/* Zero-denominator guard in dashboard */}
                  {latestAnalysis.match_percentage === null ? (
                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800 text-xs font-bold">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <span>Detailed Job Text Needed</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The last analyzed posting contained no recognizable technical competency keywords. Paste a detailed job post to compute compatibility.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            latestAnalysis.match_percentage >= 75 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : latestAnalysis.match_percentage >= 50
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {latestAnalysis.readiness_level}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">
                            {latestAnalysis.job_title} at {latestAnalysis.company_name}
                          </h4>
                        </div>
                        <div className="text-2xl font-extrabold text-blue-600">
                          {latestAnalysis.match_percentage}%
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {latestAnalysis.readiness_description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {latestAnalysis.matched_skills.slice(0, 4).map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                            ✓ {skill}
                          </span>
                        ))}
                        {latestAnalysis.missing_skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                            • Gap: {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <p className="text-xs">No job descriptions analyzed yet.</p>
                  <Link
                    href="/analysis"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100 transition-colors"
                  >
                    <span>Run First Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom Next Step Link */}
            {nextLearningItem && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  Next Goal: <strong>{nextLearningItem.skill_name.toUpperCase()}</strong>
                </span>
                <Link href="/learning-plan" className="font-semibold text-blue-600 hover:text-blue-700">
                  Study plan &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Panel 2: Application Pipeline Snapshot */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Application Pipeline</h3>
                  <p className="text-xs text-slate-500">Active submissions and interview stages</p>
                </div>
                <Link
                  href="/applications"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All ({applications.length}) &rarr;
                </Link>
              </div>

              {recentApplications.length > 0 ? (
                <div className="pt-3 divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <strong className="text-slate-900 block font-semibold">{app.company}</strong>
                        <span className="text-slate-500">{app.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Interviewing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          app.status === 'Offer' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          app.status === 'Applied' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          app.status === 'Wishlist' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <p className="text-xs">No active job applications recorded yet.</p>
                  <Link
                    href="/applications"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100 transition-colors"
                  >
                    <span>Record First Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{analytics.total_applications} total tracked records</span>
              <Link href="/applications" className="font-semibold text-blue-600 hover:text-blue-700">
                Open pipeline &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
