'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Check, 
  Plus, 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileCheck,
  AlertCircle 
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';

export default function ResumePage() {
  const { 
    profile, 
    resumes, 
    processResumeText, 
    updateProfile, 
    addSkills, 
    removeSkill 
  } = useCareerLens();

  const [pasteText, setPasteText] = useState('');
  const [fileName, setFileName] = useState('My_Resume.txt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Profile fields state
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [targetRole, setTargetRole] = useState(profile.target_role || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (text) {
        setIsProcessing(true);
        try {
          const res = await processResumeText(file.name, text);
          setSuccessToast(`Extracted ${res.detected_skills.length} skills from ${file.name}`);
        } catch {
          // Fallback
        } finally {
          setIsProcessing(false);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleProcessPastedText = async () => {
    if (!pasteText.trim()) return;
    setIsProcessing(true);
    try {
      const res = await processResumeText(fileName || 'Pasted_Resume.txt', pasteText);
      setSuccessToast(`Extracted ${res.detected_skills.length} skills from résumé text`);
      setPasteText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddCustomSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    await addSkills(customSkillInput);
    setCustomSkillInput('');
    setSuccessToast('Added skill to your profile');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateProfile({
        full_name: fullName,
        headline,
        target_role: targetRole,
        bio,
      });
      setSuccessToast('Profile details updated successfully');
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Section Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Résumé Review &amp; Profile Skills
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Upload or paste your résumé to automatically detect competencies, audit your strengths, and sync with your target profile.
          </p>
        </div>

        {successToast && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast('')} className="text-emerald-700 hover:text-emerald-950 font-bold">
              &times;
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Résumé Upload & Extraction (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">1. Upload or Paste Résumé Text</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Text &bull; TXT &bull; Markdown</span>
              </div>

              {/* File Dropzone */}
              <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 block">
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700">Click to upload résumé file</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Supports text and plain document files</span>
                <input 
                  type="file" 
                  accept=".txt,.md,.rtf" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>

              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400 font-medium">Or paste résumé content</span>
              </div>

              {/* Paste Area */}
              <div>
                <textarea
                  rows={8}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste your résumé summary, project descriptions, or technical competencies here..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800 placeholder:text-slate-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPasteText(`Software Engineer with 2 years of experience building modern web applications.
Core Competencies:
- JavaScript (ES6+), TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS
- Node.js, Express, REST APIs, GraphQL, Python
- PostgreSQL, MySQL, MongoDB, Redis
- Git, GitHub, Docker, CI/CD, AWS (S3, EC2)
- Unit testing with Jest and Cypress, Agile development`);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Load Sample Résumé Text
                </button>

                <button
                  onClick={handleProcessPastedText}
                  disabled={isProcessing || !pasteText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs disabled:opacity-40 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Extracting...' : 'Extract & Sync Skills'}</span>
                </button>
              </div>
            </div>

            {/* Previously Extracted Résumés */}
            {resumes.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Extracted Résumé Documents</h3>
                <div className="space-y-2">
                  {resumes.map((r) => (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <div>
                          <strong className="text-slate-800 font-semibold block">{r.file_name}</strong>
                          <span className="text-slate-500 text-[11px]">
                            {r.detected_skills.length} competencies extracted &bull; {new Date(r.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Detected Competencies & Profile Sync (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Profile Skills Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">2. Active Profile Skills</h3>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {profile.skills.length} skills
                </span>
              </div>

              {/* Add Custom Skill Form */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="e.g. Docker, TypeScript, SQL"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Add
                </button>
              </form>

              {/* Skills Tags Container */}
              <div className="flex flex-wrap gap-1.5 min-h-[140px] max-h-[300px] overflow-y-auto p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs group"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-red-600 transition-colors ml-0.5"
                        title={`Remove ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 m-auto text-center">
                    No skills in profile yet. Upload a résumé or type skills above.
                  </p>
                )}
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                3. Profile Information
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Professional Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Role</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bio / Summary</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  {isSavingProfile ? 'Saving...' : 'Save Profile Details'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
