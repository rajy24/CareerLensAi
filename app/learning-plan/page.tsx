'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Plus,
  ExternalLink,
  Trash2,
  Filter,
  ArrowRight,
  Code2,
  Layers,
  Compass,
  X
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';
import { LearningPlanItem } from '@/lib/types';

export default function LearningPlanPage() {
  const {
    learningPlan,
    toggleLearningPlanItem,
    deleteLearningPlanItem,
    addCustomLearningPlanItem,
    latestAnalysis,
    generatePlanFromMissing,
    loadSampleData,
  } = useCareerLens();

  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New goal form state
  const [newSkill, setNewSkill] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'supplementary'>('high');
  const [newTimeframe, setNewTimeframe] = useState('1-2 weeks');
  const [newConcepts, setNewConcepts] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceUrl, setNewResourceUrl] = useState('');

  // Calculate statistics
  const totalCount = learningPlan.length;
  const completedCount = learningPlan.filter((i) => i.completed).length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const highPriorityCount = learningPlan.filter((i) => i.priority === 'high' && !i.completed).length;

  // Filter items
  const filteredPlan = learningPlan.filter((item) => {
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && item.completed) ||
      (statusFilter === 'active' && !item.completed);
    return matchesPriority && matchesStatus;
  });

  const handleCreateCustomGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    const conceptsList = newConcepts.trim()
      ? newConcepts.split(',').map((c) => c.trim()).filter(Boolean)
      : ['Core fundamentals and syntax', 'Best practice patterns', 'Real-world deployment'];

    const resourcesList = newResourceName.trim()
      ? [{ name: newResourceName.trim(), url: newResourceUrl.trim() || 'https://google.com' }]
      : [
          {
            name: `${newSkill} Documentation`,
            url: `https://www.google.com/search?q=${encodeURIComponent(newSkill + ' documentation')}`,
          },
        ];

    await addCustomLearningPlanItem({
      skill_name: newSkill.trim(),
      priority: newPriority,
      timeframe: newTimeframe || '2-3 weeks',
      concepts: conceptsList,
      mini_project: newProject.trim() || `Build a proof-of-concept application utilizing ${newSkill}.`,
      resources: resourcesList,
      completed: false,
    });

    setNewSkill('');
    setNewConcepts('');
    setNewProject('');
    setNewResourceName('');
    setNewResourceUrl('');
    setIsModalOpen(false);
  };

  const handleSyncFromAnalysis = async () => {
    if (latestAnalysis && latestAnalysis.missing_skills.length > 0) {
      await generatePlanFromMissing(latestAnalysis.missing_skills);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Prioritized Skill Progression
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Personalized Learning Roadmaps
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Targeted learning paths mapped directly from identified job requirement gaps. Master concepts systematically with curated resources and mini-projects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {latestAnalysis && latestAnalysis.missing_skills.length > 0 && (
              <button
                onClick={handleSyncFromAnalysis}
                className="px-3.5 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-medium rounded-lg shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Sync Gaps from Analysis
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs hover:shadow transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Custom Goal
            </button>
          </div>
        </div>

        {/* Progress Metric Banner */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="sm:pr-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{completionPercentage}%</span>
                <span className="text-xs text-slate-500">completed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Goals</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{totalCount}</span>
                <span className="text-xs text-slate-500">skills queued</span>
              </div>
              <p className="text-xs text-slate-400">In current roadmap</p>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">High Priority Gaps</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-600">{highPriorityCount}</span>
                <span className="text-xs text-slate-500">critical remaining</span>
              </div>
              <p className="text-xs text-slate-400">Core job requirements</p>
            </div>

            <div className="pt-3 sm:pt-0 sm:pl-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Skills</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600">{completedCount}</span>
                <span className="text-xs text-slate-500">mastered</span>
              </div>
              <p className="text-xs text-slate-400">Ready to showcase</p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Priority:
            </span>
            {(['all', 'high', 'medium', 'supplementary'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  priorityFilter === p
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p === 'all' ? 'All Priorities' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Status:</span>
            {(['all', 'active', 'completed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmaps Grid */}
        {filteredPlan.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">No learning milestones in this view</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {totalCount === 0
                  ? 'Your learning plan is currently empty. Run a Job Compatibility Analysis to automatically extract gaps, or load realistic sample data.'
                  : 'No skills match your active filter criteria. Try clearing or expanding your priority and status filters.'}
              </p>
            </div>
            {totalCount === 0 && (
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/analysis"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Analyze a Job Description
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={loadSampleData}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  Load Sample Plan
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredPlan.map((item) => {
                const isHigh = item.priority === 'high';
                const isMedium = item.priority === 'medium';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`bg-white border rounded-xl p-5 shadow-xs transition-all relative flex flex-col justify-between ${
                      item.completed
                        ? 'border-emerald-200/80 bg-emerald-50/20'
                        : isHigh
                        ? 'border-slate-200 hover:border-rose-300'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Row: Priority Badge, Timeframe & Action */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                              isHigh
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : isMedium
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {item.priority} Priority
                          </span>

                          <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {item.timeframe}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteLearningPlanItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove from plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Skill Title & Toggle */}
                      <div className="flex items-start gap-3 mb-4">
                        <button
                          onClick={() => toggleLearningPlanItem(item.id)}
                          className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                          title={item.completed ? 'Mark incomplete' : 'Mark completed'}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div>
                          <h3
                            className={`text-base font-bold transition-colors ${
                              item.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                            }`}
                          >
                            {item.skill_name}
                          </h3>
                        </div>
                      </div>

                      {/* Core Concepts */}
                      {item.concepts && item.concepts.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            Key Concepts & Milestones
                          </h4>
                          <ul className="space-y-1.5 pl-1">
                            {item.concepts.map((concept, idx) => (
                              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                <span>{concept}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Mini Project Callout */}
                      {item.mini_project && (
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 mb-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            <Code2 className="w-3.5 h-3.5 text-blue-600" />
                            Hands-On Mini Project
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{item.mini_project}</p>
                        </div>
                      )}
                    </div>

                    {/* Resources Footer */}
                    {item.resources && item.resources.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                          Resources:
                        </span>
                        {item.resources.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                          >
                            {res.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Add Custom Goal Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Add Learning Goal</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomGoal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Skill or Competency Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. Next.js, Docker, GraphQL"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Priority Level
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="supplementary">Supplementary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Estimated Timeframe
                    </label>
                    <input
                      type="text"
                      value={newTimeframe}
                      onChange={(e) => setNewTimeframe(e.target.value)}
                      placeholder="e.g. 2-3 weeks"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Key Concepts (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newConcepts}
                    onChange={(e) => setNewConcepts(e.target.value)}
                    placeholder="App Router, Server Actions, Middleware, Dynamic Routing"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Hands-on Mini Project
                  </label>
                  <textarea
                    rows={2}
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    placeholder="Describe a practical project to solidify knowledge..."
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Resource Name
                    </label>
                    <input
                      type="text"
                      value={newResourceName}
                      onChange={(e) => setNewResourceName(e.target.value)}
                      placeholder="Official Documentation"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Resource URL
                    </label>
                    <input
                      type="url"
                      value={newResourceUrl}
                      onChange={(e) => setNewResourceUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs transition-colors"
                  >
                    Add Learning Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
