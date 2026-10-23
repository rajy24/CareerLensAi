'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Target, 
  FileCheck, 
  Compass, 
  MessagesSquare, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { useCareerLens } from '@/lib/context';

export default function LandingPage() {
  const { loadSampleData } = useCareerLens();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Public Navigation */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#methodology" className="hover:text-slate-900 transition-colors">How Matching Works</a>
          <a href="#interview" className="hover:text-slate-900 transition-colors">Interview Prep</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            onClick={() => loadSampleData()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Independent Career Planning &amp; Readiness Workspace</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Your career, with a <span className="text-blue-600">clearer direction</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Evaluate job descriptions, pinpoint exact technical skill gaps with transparent scoring, structure interview preparation, and manage your job applications in one focused workspace.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow"
          >
            <span>Open Workspace (Free)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            onClick={() => loadSampleData()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Explore Demo Data</span>
          </Link>
        </div>

        {/* Trust & Privacy Footnote */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Free &bull; Zero Paid APIs
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Private &bull; LocalStorage &amp; Supabase RLS
          </span>
        </div>
      </section>

      {/* Product Workflow / Feature Cards */}
      <section id="features" className="py-16 bg-white border-y border-slate-200 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">Engineered for Focus</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Everything early-career engineers need to succeed
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              No generic chatbot outputs or black-box applicant tracking algorithms. CareerLens provides explainable, reproducible career tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Résumé Skill Extraction</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Upload text or PDF summaries to parse technical competencies across languages, frameworks, cloud tooling, and databases into your profile.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Token-boundary parsing &rarr;
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Transparent Job Matching</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Compare your skillset with any job posting. View matched requirements, identified gaps, and exact arithmetic breakdown with zero false negatives.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Set-intersection score &rarr;
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Prioritized Learning Plans</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Transform missing skills into structured study milestones. High, medium, and supplementary tiers with suggested projects and official docs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Actionable milestones &rarr;
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <MessagesSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Interview Preparation</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Targeted interview questions across Technical Concepts, Coding &amp; DSA, and Behavioral rounds using the structured STAR framework.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Role-specific guides &rarr;
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Application Pipeline</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Track company, role, stage, application dates, URLs, and follow-up deadlines in a responsive table with fast search and live status filters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Full CRUD pipeline &rarr;
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Progress Analytics</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Real-time analytics showing pipeline distribution, learning plan completion percentage, and interview preparation coverage.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600">
                Data-driven insights &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">Our Matching Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Deterministic, explainable career analytics
            </h2>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Many modern career tools produce vague percentages like &ldquo;67% match&rdquo; without explaining how that number was calculated. CareerLens uses transparent set-based mathematics:
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-1.5">
              <p className="font-bold text-blue-700">Formula:</p>
              <p>Match Percentage = ( Matched Skills / Total Detected JD Requirements ) &times; 100%</p>
              <p className="text-slate-500 text-[11px] font-sans pt-1">
                Zero-Denominator Guard: When no technical requirements are detected in the job text, CareerLens displays an informative notice rather than a false 0% score.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
              >
                <span>Try the Analyzer Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-10 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <Logo size="sm" />
          <p>&copy; {new Date().getFullYear()} CareerLens. Designed for clarity, focus, and career readiness.</p>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="hover:text-slate-900 transition-colors">Sign In</Link>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">App</Link>
            <Link href="/settings" className="hover:text-slate-900 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
