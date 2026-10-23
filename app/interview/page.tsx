'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  CheckCircle2,
  Circle,
  Code2,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  Copy,
  Check,
  Award,
  Layers,
  BookOpen
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';
import { INTERVIEW_QUESTIONS } from '@/lib/interview-data';
import { InterviewQuestion } from '@/lib/types';

export default function InterviewPracticePage() {
  const { practicedQuestions, toggleQuestionPracticed } = useCareerLens();

  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Practise answer state
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter questions
  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesRole = selectedRole === 'all' || q.role === selectedRole;
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.keyPoints && q.keyPoints.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesRole && matchesCat && matchesSearch;
  });

  const totalQuestions = INTERVIEW_QUESTIONS.length;
  const practicedCount = practicedQuestions.size;
  const progressPercent = Math.round((practicedCount / totalQuestions) * 100);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEvaluateAnswer = async (q: InterviewQuestion) => {
    const answer = userAnswers[q.id];
    if (!answer || !answer.trim()) return;

    setEvaluatingId(q.id);
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, userAnswer: answer }),
      });
      const data = await res.json();
      if (data.success) {
        setEvaluations((prev) => ({ ...prev, [q.id]: data }));
        // Automatically mark as practiced if coverage >= 40%
        if (data.coveragePercentage >= 40 && !practicedQuestions.has(q.id)) {
          toggleQuestionPracticed(q.id);
        }
      }
    } catch (err) {
      console.error('Answer evaluation error:', err);
    } finally {
      setEvaluatingId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            Interview Readiness Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Role-Specific Interview Practice
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Prepare for technical screens, architectural deep-dives, and behavioral loops with curated questions, model answers, and automated feedback.
          </p>
        </div>

        {/* Progress & Stat Banner */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interview Coverage</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{progressPercent}%</span>
                <span className="text-xs text-slate-500">practiced</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Drills</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600">{practicedCount}</span>
                <span className="text-xs text-slate-500">/ {totalQuestions} questions</span>
              </div>
              <p className="text-xs text-slate-400">Mastered and reviewed</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Question Bank</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-blue-600">{filteredQuestions.length}</span>
                <span className="text-xs text-slate-500">matching active filters</span>
              </div>
              <p className="text-xs text-slate-400">Technical, coding, & HR</p>
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or concept..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            {/* Role Filter */}
            <div className="sm:col-span-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
              >
                <option value="all">All Role Tracks</option>
                <option value="frontend">Frontend Engineering</option>
                <option value="backend">Backend Engineering</option>
                <option value="fullstack">Full Stack Engineering</option>
                <option value="data">Data Analytics</option>
                <option value="cloud">Cloud & DevOps</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
              >
                <option value="all">All Question Types</option>
                <option value="technical">Technical Concepts</option>
                <option value="coding">Coding & Algorithms</option>
                <option value="hr">Behavioral & HR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto space-y-3">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900">No questions found</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              No questions matched your search query or filter selection. Try resetting filters to explore the full question bank.
            </p>
            <button
              onClick={() => {
                setSelectedRole('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isPracticed = practicedQuestions.has(q.id);
              const isExpanded = expandedId === q.id;
              const isPracticing = activePracticeId === q.id;
              const evalResult = evaluations[q.id];

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
                    isPracticed ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'
                  }`}
                >
                  {/* Question Header Row */}
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        onClick={() => toggleQuestionPracticed(q.id)}
                        className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                        title={isPracticed ? 'Mark unpracticed' : 'Mark practiced'}
                      >
                        {isPracticed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                            {q.role}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                            {q.category}
                          </span>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              q.difficulty === 'easy'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : q.difficulty === 'medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-slate-900 leading-snug">
                          {q.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActivePracticeId(isPracticing ? null : q.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                          isPracticing
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Practise Answer
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : q.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title={isExpanded ? 'Collapse' : 'Show Model Answer'}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Practice Workbench (If Active) */}
                  <AnimatePresence>
                    {isPracticing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-200 bg-slate-50/70 p-5 space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Draft Your Answer
                          </label>
                          <textarea
                            rows={4}
                            value={userAnswers[q.id] || ''}
                            onChange={(e) =>
                              setUserAnswers({ ...userAnswers, [q.id]: e.target.value })
                            }
                            placeholder="Type how you would respond in an actual interview screen..."
                            className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Evaluates key architectural coverage, conciseness, and precision.
                          </span>

                          <button
                            onClick={() => handleEvaluateAnswer(q)}
                            disabled={evaluatingId === q.id || !userAnswers[q.id]?.trim()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-2xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {evaluatingId === q.id ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Evaluating...
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                Evaluate Response
                              </>
                            )}
                          </button>
                        </div>

                        {/* Evaluation Result Feedback */}
                        {evalResult && (
                          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-bold text-slate-900">
                                  Evaluation Rubric
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-blue-600">
                                {evalResult.coveragePercentage}% Concepts Covered
                              </span>
                            </div>

                            <p className="text-xs text-slate-700 font-medium">
                              {evalResult.feedback}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                              <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg text-emerald-900">
                                <span className="font-semibold block mb-1">
                                  Covered Points ({evalResult.coveredPoints.length}):
                                </span>
                                <ul className="list-disc pl-4 space-y-0.5">
                                  {evalResult.coveredPoints.map((cp: string, idx: number) => (
                                    <li key={idx}>{cp}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-lg text-amber-900">
                                <span className="font-semibold block mb-1">
                                  Missed Opportunities ({evalResult.missedPoints.length}):
                                </span>
                                <ul className="list-disc pl-4 space-y-0.5">
                                  {evalResult.missedPoints.map((mp: string, idx: number) => (
                                    <li key={idx}>{mp}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Model Answer & Guidance Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4"
                      >
                        {/* Model Answer Overview */}
                        <div>
                          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Model Explanation
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                            {q.answer}
                          </p>
                        </div>

                        {/* Key Evaluation Points */}
                        {q.keyPoints && q.keyPoints.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                              What Interviewers Look For
                            </h4>
                            <ul className="space-y-1.5 pl-1">
                              {q.keyPoints.map((kp, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Code Snippet */}
                        {q.codeSnippet && (
                          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 text-slate-100">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                              <span>Implementation Pattern</span>
                              <button
                                onClick={() => handleCopyCode(q.id, q.codeSnippet!)}
                                className="hover:text-white transition-colors flex items-center gap-1"
                              >
                                {copiedId === q.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-400 leading-relaxed">
                              {q.codeSnippet}
                            </pre>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
