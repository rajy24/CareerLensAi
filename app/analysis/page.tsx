'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Plus, 
  X, 
  RotateCcw,
  HelpCircle,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';
import { SAMPLE_JDS } from '@/lib/sample-jds';
import { JobAnalysisResult } from '@/lib/types';

export default function AnalysisPage() {
  const { 
    profile, 
    updateProfile, 
    runAnalysis, 
    analyses, 
    generatePlanFromMissing, 
    saveApplication 
  } = useCareerLens();

  const [jobTitle, setJobTitle] = useState('Frontend Engineer');
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [selectedSample, setSelectedSample] = useState<string>('frontend');
  const [jobText, setJobText] = useState(SAMPLE_JDS.frontend.text);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<JobAnalysisResult | null>(
    analyses.length > 0 ? analyses[0] : null
  );
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [addedToPlanSuccess, setAddedToPlanSuccess] = useState(false);
  const [addedToAppsSuccess, setAddedToAppsSuccess] = useState(false);

  // Handle sample selection
  const handleSampleChange = (key: string) => {
    setSelectedSample(key);
    if (SAMPLE_JDS[key]) {
      setJobTitle(SAMPLE_JDS[key].title);
      setJobText(SAMPLE_JDS[key].text);
    }
  };

  // Add skill to user profile
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const skill = newSkillInput.trim();
    if (!profile.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      updateProfile({ skills: [...profile.skills, skill] });
    }
    setNewSkillInput('');
  };

  // Remove skill from user profile
  const handleRemoveSkill = (skillToRemove: string) => {
    updateProfile({
      skills: profile.skills.filter(s => s.toLowerCase() !== skillToRemove.toLowerCase())
    });
  };

  // Run analysis
  const handleRunAnalysis = async () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);
    setAddedToPlanSuccess(false);
    setAddedToAppsSuccess(false);

    try {
      // Simulate brief thinking animation for polish
      await new Promise(r => setTimeout(r, 450));
      const result = await runAnalysis(jobText, jobTitle || 'Target Role', companyName || 'Company');
      setCurrentResult(result);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // One-click add missing skills to learning plan
  const handleAddToLearningPlan = async () => {
    if (!currentResult || currentResult.missing_skills.length === 0) return;
    await generatePlanFromMissing(currentResult.missing_skills);
    setAddedToPlanSuccess(true);
  };

  // One-click track in applications
  const handleTrackApplication = async () => {
    if (!currentResult) return;
    await saveApplication({
      company: companyName || 'Target Company',
      role: jobTitle || 'Target Role',
      status: 'Applied',
      date_applied: new Date().toISOString().split('T')[0],
      notes: `Compatibility Score: ${currentResult.match_percentage ?? 'N/A'}%. Missing skills: ${currentResult.missing_skills.join(', ')}`,
    });
    setAddedToAppsSuccess(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Deterministic Competency Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Job Compatibility Analysis
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Audit your competencies against any target job description. Identify exact keyword matches, critical requirements, and high-priority skill gaps.
          </p>
        </div>

        {/* Two-Column Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Your Skills & Target Context */}
          <div className="lg:col-span-5 space-y-6">
            {/* Target Job Info Card */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Target Role Info</span>
                <span className="text-xs font-normal text-slate-500 lowercase">Editable</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Load Sample Job Description
                  </label>
                  <select
                    value={selectedSample}
                    onChange={(e) => handleSampleChange(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  >
                    <option value="frontend">Junior Frontend Developer (React)</option>
                    <option value="backend">Junior Backend Engineer (Python / Node.js)</option>
                    <option value="fullstack">Entry-Level Full Stack Engineer</option>
                    <option value="data">Junior Data Analyst</option>
                    <option value="cloud">Junior Cloud / DevOps Engineer</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Role Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Frontend Engineer"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Profile Card */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Your Verified Skills ({profile.skills.length})
                </h2>
                <Link
                  href="/resume"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Upload Résumé
                </Link>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Skills extracted from your profile and résumé. Click to remove or add missing competencies below.
              </p>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-1.5 mb-4 max-h-48 overflow-y-auto p-1 border border-slate-100 rounded-lg bg-slate-50/50">
                {profile.skills.length === 0 ? (
                  <p className="text-xs text-slate-400 italic p-2">No skills registered yet. Add some below or upload a résumé.</p>
                ) : (
                  profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                        title={`Remove ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Add skill (e.g. Docker, TypeScript)"
                  className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Job Description Textarea & Trigger */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Target Job Description
                </label>
                <button
                  onClick={() => setJobText('')}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              </div>

              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste complete job description, requirements, or qualifications section here..."
                rows={12}
                className="w-full text-xs sm:text-sm font-mono text-slate-800 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-y transition-colors leading-relaxed"
              />

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  <span>Matches against 150+ tech aliases and canonical skills</span>
                </div>

                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing || !jobText.trim()}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-xs hover:shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Competencies...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      Run Compatibility Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results View */}
        <AnimatePresence>
          {currentResult && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 pt-4 border-t border-slate-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Analysis Report: {currentResult.job_title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Evaluated for {currentResult.company_name} • Generated {new Date(currentResult.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <button
                  onClick={() => setShowFormulaModal(!showFormulaModal)}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  How is this calculated?
                </button>
              </div>

              {/* Zero-Denominator Guard Display */}
              {currentResult.match_percentage === null ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-base">{currentResult.readiness_headline}</h3>
                      <p className="text-sm text-amber-800 mt-1">{currentResult.readiness_description}</p>
                      <p className="text-xs text-amber-700 mt-3 font-mono">
                        Note: We avoid displaying false 0% or phantom gaps when no recognizable tech competencies are found in the provided text.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Overall Score Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase">Match Score</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          currentResult.match_percentage >= 75
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : currentResult.match_percentage >= 50
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {currentResult.readiness_level}
                        </span>
                      </div>
                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                          {currentResult.match_percentage}%
                        </span>
                        <span className="text-xs text-slate-400">weighted match</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${
                            currentResult.match_percentage >= 75
                              ? 'bg-emerald-500'
                              : currentResult.match_percentage >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${currentResult.match_percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Matched Count */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Matched Skills</span>
                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-emerald-600">
                          {currentResult.matched_skills.length}
                        </span>
                        <span className="text-xs text-slate-500">
                          / {currentResult.detected_jd_skills.length} in JD
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Verified against your profile</p>
                    </div>

                    {/* Missing Count */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Identified Gaps</span>
                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-amber-600">
                          {currentResult.missing_skills.length}
                        </span>
                        <span className="text-xs text-slate-500">skills missing</span>
                      </div>
                      <p className="text-xs text-slate-500">Recommended for roadmap</p>
                    </div>

                    {/* Core Requirements */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Required Competencies</span>
                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-blue-600">
                          {currentResult.required_skills.filter(s => currentResult.matched_skills.includes(s)).length}
                        </span>
                        <span className="text-xs text-slate-500">
                          / {currentResult.required_skills.length} required
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Minimum qualifications met</p>
                    </div>
                  </div>

                  {/* Formula Breakdown Panel (Collapsible) */}
                  {showFormulaModal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-slate-900 text-slate-100 rounded-xl p-5 font-mono text-xs space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-semibold text-slate-300">Deterministic Mathematical Formulation</span>
                        <button onClick={() => setShowFormulaModal(false)} className="text-slate-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-slate-300">{currentResult.math_explanation.formula_str}</p>
                      <p className="text-emerald-400">{currentResult.math_explanation.calculation_str}</p>
                      <p className="text-slate-400 font-sans text-xs">
                        This formula evaluates required core skills with high weighting and preferred bonus qualifications with auxiliary weighting to mirror actual candidate screening algorithms.
                      </p>
                    </motion.div>
                  )}

                  {/* Two-Column Competency Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matched Skills Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-semibold text-slate-900 text-sm">
                            Matched Competencies ({currentResult.matched_skills.length})
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400">Present in profile</span>
                      </div>

                      {currentResult.matched_skills.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-4">No overlapping skills found for this role description.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentResult.matched_skills.map((skill) => {
                            const isReq = currentResult.required_skills.includes(skill);
                            return (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                {skill}
                                {isReq && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-200/70 text-emerald-900 px-1.5 py-0.2 rounded">
                                    Required
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Missing Skills Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-amber-600" />
                          <h3 className="font-semibold text-slate-900 text-sm">
                            Missing Competency Gaps ({currentResult.missing_skills.length})
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400">Prioritized for growth</span>
                      </div>

                      {currentResult.missing_skills.length === 0 ? (
                        <div className="text-center py-6 text-emerald-700 bg-emerald-50/50 rounded-lg border border-emerald-100">
                          <p className="font-medium text-sm">Outstanding! 100% skill coverage.</p>
                          <p className="text-xs text-emerald-600 mt-1">You match all recognized competencies in this role description.</p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentResult.missing_skills.map((skill) => {
                            const isReq = currentResult.required_skills.includes(skill);
                            return (
                              <span
                                key={skill}
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border ${
                                  isReq
                                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                                    : 'bg-amber-50 border-amber-200 text-amber-800'
                                }`}
                              >
                                <AlertCircle className={`w-3.5 h-3.5 ${isReq ? 'text-rose-500' : 'text-amber-500'}`} />
                                {skill}
                                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                                  isReq ? 'bg-rose-200/70 text-rose-900' : 'bg-amber-200/70 text-amber-900'
                                }`}>
                                  {isReq ? 'High Priority' : 'Preferred'}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Next Steps & Preparation</h4>
                        <p className="text-xs text-slate-500">Transform these gaps into structured learning milestones and interview practice.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {currentResult.missing_skills.length > 0 && (
                        <button
                          onClick={handleAddToLearningPlan}
                          disabled={addedToPlanSuccess}
                          className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-medium rounded-lg shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                        >
                          {addedToPlanSuccess ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Added to Learning Plan
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-4 h-4 text-blue-600" />
                              Add Gaps to Learning Plan
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={handleTrackApplication}
                        disabled={addedToAppsSuccess}
                        className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-medium rounded-lg shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                      >
                        {addedToAppsSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Tracked in Applications
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-4 h-4 text-slate-600" />
                            Track Application
                          </>
                        )}
                      </button>

                      <Link
                        href={`/interview?role=${selectedSample || 'frontend'}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs hover:shadow transition-colors flex items-center gap-1.5"
                      >
                        Practise Interview Questions
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previous Analysis History */}
        {analyses.length > 1 && (
          <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-800">
                  Previous Analyses History ({analyses.length})
                </span>
              </div>
              {historyOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {historyOpen && (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {analyses.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => {
                      setCurrentResult(item);
                      setJobTitle(item.job_title);
                      setCompanyName(item.company_name);
                      setJobText(item.job_text);
                    }}
                    className="p-4 hover:bg-slate-50/70 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-slate-900">{item.job_title}</h4>
                        <span className="text-xs text-slate-400">• {item.company_name}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.matched_skills.length} matched / {item.detected_jd_skills.length} JD skills • {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        (item.match_percentage ?? 0) >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.match_percentage !== null ? `${item.match_percentage}%` : 'N/A'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
