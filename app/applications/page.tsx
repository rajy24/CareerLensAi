'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  DollarSign
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { useCareerLens } from '@/lib/context';
import { JobApplication, ApplicationStatus } from '@/lib/types';

export default function ApplicationsPage() {
  const {
    applications,
    saveApplication,
    deleteApplication,
    updateApplicationStatus,
    loadSampleData,
  } = useCareerLens();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Form states
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);
  const [followUpDate, setFollowUpDate] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [notes, setNotes] = useState('');
  const [skills, setSkills] = useState('');

  // Status metrics
  const totalApps = applications.length;
  const appliedCount = applications.filter((a) => a.status === 'Applied').length;
  const interviewingCount = applications.filter((a) => a.status === 'Interviewing').length;
  const offerCount = applications.filter((a) => a.status === 'Offer').length;

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.notes && app.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (appToEdit?: JobApplication) => {
    if (appToEdit) {
      setEditingApp(appToEdit);
      setCompany(appToEdit.company);
      setRole(appToEdit.role);
      setStatus(appToEdit.status);
      setDateApplied(appToEdit.date_applied || new Date().toISOString().split('T')[0]);
      setFollowUpDate(appToEdit.follow_up_date || '');
      setJobUrl(appToEdit.job_url || '');
      setSalaryRange(appToEdit.salary_range || '');
      setNotes(appToEdit.notes || '');
      setSkills(appToEdit.skills || '');
    } else {
      setEditingApp(null);
      setCompany('');
      setRole('');
      setStatus('Applied');
      setDateApplied(new Date().toISOString().split('T')[0]);
      setFollowUpDate('');
      setJobUrl('');
      setSalaryRange('');
      setNotes('');
      setSkills('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    await saveApplication(
      {
        company: company.trim(),
        role: role.trim(),
        status,
        date_applied: dateApplied,
        follow_up_date: followUpDate,
        job_url: jobUrl.trim(),
        salary_range: salaryRange.trim(),
        notes: notes.trim(),
        skills: skills.trim(),
      },
      editingApp ? editingApp.id : undefined
    );

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the application for ${name}?`)) {
      await deleteApplication(id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Pipeline Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Job Application Tracker
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Track candidate pipeline stages, interview dates, follow-up deadlines, and compensation details in one organized dashboard.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs hover:shadow transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          </div>
        </div>

        {/* Status Pipeline Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pipeline</span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{totalApps}</span>
              <span className="text-xs text-slate-500">records</span>
            </div>
            <p className="text-xs text-slate-400">All opportunities tracked</p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Review</span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-blue-600">{appliedCount}</span>
              <span className="text-xs text-slate-500">submitted</span>
            </div>
            <p className="text-xs text-slate-400">Awaiting recruiter contact</p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interviewing</span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-600">{interviewingCount}</span>
              <span className="text-xs text-slate-500">active loops</span>
            </div>
            <p className="text-xs text-slate-400">In technical/HR screens</p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Offers Received</span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600">{offerCount}</span>
              <span className="text-xs text-slate-500">offers</span>
            </div>
            <p className="text-xs text-slate-400">Ready for evaluation</p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company, role, or notes..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
            >
              <option value="all">All Stages</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Wishlist">Wishlist</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Table / Cards */}
        {filteredApps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">No applications found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {totalApps === 0
                  ? 'Your job tracking workspace is currently empty. Add your first job application or load realistic demo data.'
                  : 'No applications match your active search or filter selection.'}
              </p>
            </div>
            {totalApps === 0 && (
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleOpenModal()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add First Application
                </button>
                <button
                  onClick={loadSampleData}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  Load Demo Pipeline
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Company & Role</th>
                    <th className="px-4 py-3.5">Stage</th>
                    <th className="px-4 py-3.5">Date Applied</th>
                    <th className="px-4 py-3.5">Follow-Up</th>
                    <th className="px-4 py-3.5">Compensation</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => {
                    const isInterviewing = app.status === 'Interviewing';
                    const isOffer = app.status === 'Offer';
                    const isRejected = app.status === 'Rejected';

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            <span>{app.company}</span>
                            {app.job_url && (
                              <a
                                href={app.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                title="Open Job Listing"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {app.is_sample && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                                Sample
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{app.role}</div>
                          {app.notes && (
                            <p className="text-[11px] text-slate-400 mt-1 max-w-sm truncate" title={app.notes}>
                              {app.notes}
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                              isOffer
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : isInterviewing
                                ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                                : isRejected
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-blue-50 text-blue-800 border-blue-300'
                            }`}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Wishlist">Wishlist</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600 font-mono">
                          {app.date_applied || '—'}
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600">
                          {app.follow_up_date ? (
                            <span className="inline-flex items-center gap-1 font-mono text-slate-700">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {app.follow_up_date}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600 font-mono">
                          {app.salary_range || '—'}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenModal(app)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                              title="Edit application"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id, `${app.role} at ${app.company}`)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                              title="Delete application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingApp ? 'Edit Application' : 'Track New Application'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Stripe, Linear"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Role Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Junior Frontend Dev"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Status Stage
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Wishlist">Wishlist</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Date Applied
                    </label>
                    <input
                      type="date"
                      value={dateApplied}
                      onChange={(e) => setDateApplied(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Follow-up Reminder Date
                    </label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Compensation / Salary
                    </label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="e.g. $85k - $95k"
                      className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Job Posting URL
                  </label>
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="https://company.com/careers/..."
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Application Notes & Next Steps
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Interview details, recruiter contact, specific topics to review..."
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
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
                    {editingApp ? 'Update Application' : 'Save Application'}
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
