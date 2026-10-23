'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Compass, 
  MessagesSquare, 
  Briefcase, 
  BarChart3, 
  Settings,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { Logo } from './logo';
import { useCareerLens } from '@/lib/context';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Résumé Review', href: '/resume', icon: FileText },
  { name: 'Job Analysis', href: '/analysis', icon: Target },
  { name: 'Learning Plan', href: '/learning-plan', icon: Compass },
  { name: 'Interview Prep', href: '/interview', icon: MessagesSquare },
  { name: 'Applications', href: '/applications', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { 
    isSupabaseActive, 
    isDemoMode, 
    loadSampleData, 
    resetAllData, 
    learningPlan, 
    applications 
  } = useCareerLens();

  const openGapsCount = learningPlan.filter(i => !i.completed).length;
  const activeAppsCount = applications.filter(a => a.status === 'Applied' || a.status === 'Interviewing').length;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard" className="transition-opacity hover:opacity-90">
          <Logo size="md" />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Workspace
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>

              {/* Badges */}
              {item.name === 'Learning Plan' && openGapsCount > 0 && (
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {openGapsCount}
                </span>
              )}
              {item.name === 'Applications' && activeAppsCount > 0 && (
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {activeAppsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Database & Mode Status Pill */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-3">
        <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-500 rounded bg-white border border-slate-200">
          <div className="flex items-center gap-1.5">
            {isSupabaseActive ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-slate-700">Supabase Connected</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-medium text-slate-700">Local / Demo Mode</span>
              </>
            )}
          </div>
          {isDemoMode && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded">
              Demo Active
            </span>
          )}
        </div>

        {/* Demo Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={loadSampleData}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-semibold rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-xs"
            title="Load realistic sample profile, applications, and job analyses"
          >
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Load Demo</span>
          </button>
          <button
            onClick={() => {
              if (confirm('Reset all workspace data? Your profile, job matches, and applications will be cleared.')) {
                resetAllData();
              }
            }}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-semibold rounded bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-200 transition-colors shadow-xs"
            title="Clear all stored records and reset workspace"
          >
            <RotateCcw className="w-3 h-3 text-slate-400 hover:text-red-600" />
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
