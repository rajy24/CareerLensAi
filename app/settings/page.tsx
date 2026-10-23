'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings,
  User,
  Database,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  LogOut,
  ShieldCheck,
  Server
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';

export default function SettingsPage() {
  const router = useRouter();
  const {
    user,
    profile,
    updateProfile,
    isSupabaseActive,
    isDemoMode,
    loadSampleData,
    resetAllData,
    signOutUser,
    resumes,
    analyses,
    learningPlan,
    applications,
  } = useCareerLens();

  const [fullName, setFullName] = useState(profile.full_name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [targetRole, setTargetRole] = useState(profile.target_role || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      full_name: fullName.trim(),
      email: email.trim(),
      headline: headline.trim(),
      target_role: targetRole.trim(),
      bio: bio.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Export all user data as JSON
  const handleExportData = () => {
    const backupData = {
      exported_at: new Date().toISOString(),
      profile,
      resumes,
      analyses,
      learningPlan,
      applications,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `careerlens-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    resetAllData();
    setResetConfirmOpen(false);
    router.push('/dashboard');
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/auth/signin');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
            <Settings className="w-3.5 h-3.5 text-blue-600" />
            Account & Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Settings & Data Management
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Manage your personal profile, review storage infrastructure, and export or reset your career workspace.
          </p>
        </div>

        {/* Profile Settings Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Personal & Career Profile</h2>
            </div>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Profile updated successfully
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Junior Frontend Engineer"
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Role Category
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Frontend, Backend, Full Stack"
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Bio & Career Summary
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of your background, core strengths, and goals..."
                className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs hover:shadow transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Backend Infrastructure & Storage Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Backend & Persistence Architecture</h2>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                isSupabaseActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}
            >
              {isSupabaseActive ? 'Supabase Cloud Connected' : 'Local Storage Engine (Active)'}
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            {isSupabaseActive ? (
              <div className="flex items-start gap-2.5 text-emerald-900 bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Production PostgreSQL with Row-Level Security (RLS)</span>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Your records are securely stored in Supabase PostgreSQL tables with user-isolated RLS policies. Résumés are protected in private storage buckets.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-slate-800 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Self-Contained Client Persistence Mode</span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Running in reliable offline/demo mode without requiring external API keys. All state is persisted across browser refreshes in encrypted local storage.
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">
                    To connect Supabase Cloud: Set <code className="bg-white px-1 py-0.5 border border-slate-200 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-white px-1 py-0.5 border border-slate-200 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="bg-white px-1 py-0.5 border border-slate-200 rounded">.env.local</code>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Portability & Safety Controls */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Data Portability & Management</h2>
            <p className="text-xs text-slate-500 mt-0.5">Export your records or reset your workspace to clean defaults.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export JSON */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-blue-600" />
                  Export All Records
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Download a complete backup of your profile, analyses, learning plan, and job applications as a JSON file.
                </p>
              </div>
              <button
                onClick={handleExportData}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Export JSON Archive
              </button>
            </div>

            {/* Load Demo Data */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                  Load Sample Dataset
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Populate your workspace with verified sample applications, skill roadmaps, and analysis scores for testing.
                </p>
              </div>
              <button
                onClick={() => {
                  loadSampleData();
                  alert('Demo dataset loaded successfully!');
                }}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
              >
                Load Demo Dataset
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                Reset Workspace
              </span>
              <span className="text-xs text-slate-500">
                Clear all saved applications, analyses, and learning goals from your browser.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>

              <button
                onClick={() => setResetConfirmOpen(true)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Workspace
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {resetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">Reset All Data?</h3>
                <p className="text-xs text-slate-500">
                  This action will permanently delete all stored applications, custom learning roadmaps, and analysis history from this browser.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setResetConfirmOpen(false)}
                  className="py-2 px-3 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="py-2 px-3 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
