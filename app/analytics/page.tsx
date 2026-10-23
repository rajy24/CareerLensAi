'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';

export default function AnalyticsPage() {
  const {
    analytics,
    profile,
    applications,
    learningPlan,
    analyses,
    latestAnalysis,
    practicedQuestions,
    loadSampleData,
  } = useCareerLens();

  const totalApps = applications.length;
  const appliedCount = applications.filter((a) => a.status === 'Applied').length;
  const interviewingCount = applications.filter((a) => a.status === 'Interviewing').length;
  const offerCount = applications.filter((a) => a.status === 'Offer').length;

  const totalLearning = learningPlan.length;
  const completedLearning = learningPlan.filter((i) => i.completed).length;
  const learningPercentage = totalLearning > 0 ? Math.round((completedLearning / totalLearning) * 100) : 0;

  // Funnel conversion rates
  const interviewConversion = appliedCount > 0 ? Math.round((interviewingCount / (appliedCount + interviewingCount + offerCount)) * 100) : 0;
  const offerConversion = (interviewingCount + offerCount) > 0 ? Math.round((offerCount / (interviewingCount + offerCount)) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              Career Progress Telemetry
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Progress & Readiness Analytics
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Real-time metrics synthesizing job matching fidelity, learning velocity, interview drills, and application pipeline conversions.
            </p>
          </div>

          {totalApps === 0 && (
            <button
              onClick={loadSampleData}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-2xs transition-colors"
            >
              Load Demo Dataset
            </button>
          )}
        </div>

        {/* 4 Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Target Role Match */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Latest Match</span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {latestAnalysis?.match_percentage !== null && latestAnalysis?.match_percentage !== undefined
                  ? `${latestAnalysis.match_percentage}%`
                  : 'N/A'}
              </span>
              <span className="text-xs text-slate-400">weighted match</span>
            </div>
            <p className="text-xs text-slate-500">
              {latestAnalysis ? latestAnalysis.job_title : 'No job evaluated yet'}
            </p>
          </div>

          {/* Profile Competencies */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Skills</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{profile.skills.length}</span>
              <span className="text-xs text-slate-400">active skills</span>
            </div>
            <p className="text-xs text-slate-500">In profile & verified résumé</p>
          </div>

          {/* Learning Velocity */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Learning Velocity</span>
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{learningPercentage}%</span>
              <span className="text-xs text-slate-400">{completedLearning}/{totalLearning} mastered</span>
            </div>
            <p className="text-xs text-slate-500">Milestones completed</p>
          </div>

          {/* Interview Drills */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interview Drills</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{practicedQuestions.size}</span>
              <span className="text-xs text-slate-400">drills logged</span>
            </div>
            <p className="text-xs text-slate-500">Technical & behavioral questions</p>
          </div>
        </div>

        {/* Funnel & Conversion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Application Conversion Funnel */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Job Search Conversion Funnel</h2>
                <p className="text-xs text-slate-500">Progression from initial submission to final offer.</p>
              </div>
              <span className="text-xs font-medium text-slate-400">{totalApps} total records</span>
            </div>

            <div className="space-y-4 py-2">
              {/* Stage 1: Applications Submitted */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>1. Submitted Applications</span>
                  <span>{appliedCount + interviewingCount + offerCount}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                  <div className="bg-blue-600 h-full w-full" />
                </div>
              </div>

              {/* Stage 2: Interview Loops */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>2. Advanced to Interviews</span>
                  <span>
                    {interviewingCount + offerCount}{' '}
                    <span className="text-slate-400 font-normal">({interviewConversion}% conversion)</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${Math.max(10, interviewConversion)}%` }}
                  />
                </div>
              </div>

              {/* Stage 3: Offers */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>3. Offers Received</span>
                  <span>
                    {offerCount}{' '}
                    <span className="text-slate-400 font-normal">({offerConversion}% close rate)</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${Math.max(5, offerConversion)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Benchmark: Top 10% candidate search velocity</span>
              <Link href="/applications" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Manage Pipeline <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Skill Readiness Breakdown */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Skill Competency Ratio</h2>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>

              {latestAnalysis ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Target Role:</span>
                      <span className="font-semibold text-slate-900">{latestAnalysis.job_title}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Total JD Skills Detected:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {latestAnalysis.detected_jd_skills.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Required Competencies:</span>
                      <span className="font-mono text-blue-600 font-semibold">
                        {latestAnalysis.required_skills.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Preferred Competencies:</span>
                      <span className="font-mono text-slate-600 font-semibold">
                        {latestAnalysis.preferred_skills.length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Match Ratio:</span>
                      <span className="font-bold text-emerald-600">
                        {latestAnalysis.matched_skills.length} matched / {latestAnalysis.missing_skills.length} gaps
                      </span>
                    </div>
                    <div className="w-full bg-rose-100 rounded-full h-2.5 overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full"
                        style={{
                          width: `${
                            latestAnalysis.detected_jd_skills.length > 0
                              ? (latestAnalysis.matched_skills.length / latestAnalysis.detected_jd_skills.length) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Run a Job Compatibility Analysis to populate your competency ratio.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/analysis"
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Launch New Analysis
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Recent Career Milestones
            </h2>
            <span className="text-xs text-slate-400">Audit trail</span>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/60 border border-slate-100">
                <Briefcase className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-slate-900">{app.company}</span>
                  <span className="text-slate-600"> — {app.role}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Stage updated to <span className="font-medium text-slate-700">{app.status}</span> • {app.date_applied || 'Recent'}
                  </div>
                </div>
              </div>
            ))}

            {learningPlan.filter((i) => i.completed).slice(0, 2).map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-emerald-950">Mastered Skill: {item.skill_name}</span>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Completed practical learning milestone and hands-on project.
                  </div>
                </div>
              </div>
            ))}

            {applications.length === 0 && learningPlan.length === 0 && (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                No activity recorded yet. Start tracking applications or completing learning milestones.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
