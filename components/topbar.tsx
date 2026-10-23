'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Plus, 
  Target, 
  User, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { Logo } from './logo';
import { useCareerLens } from '@/lib/context';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

const titles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Overview', subtitle: 'Your career, with a clearer direction.' },
  '/resume': { title: 'Résumé Review', subtitle: 'Extract skills, evaluate experience, and refine your profile.' },
  '/analysis': { title: 'Job Analysis', subtitle: 'Evaluate compatibility and discover actionable skill gaps.' },
  '/learning-plan': { title: 'Learning Plan', subtitle: 'Prioritized milestones to bridge detected qualifications.' },
  '/interview': { title: 'Interview Practice', subtitle: 'Curated technical and behavioral questions by target role.' },
  '/applications': { title: 'Application Pipeline', subtitle: 'Track active submissions, interview stages, and offers.' },
  '/analytics': { title: 'Progress Analytics', subtitle: 'Real-time performance metrics derived from saved records.' },
  '/settings': { title: 'Settings & Privacy', subtitle: 'Account management, database status, and data export.' },
};

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const pathname = usePathname();
  const { profile, user, signOutUser, isDemoMode } = useCareerLens();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const currentMeta = titles[pathname] || { title: 'Career Workspace', subtitle: 'Career readiness platform' };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left Context & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-slate-500 hidden md:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls & User Profile */}
      <div className="flex items-center gap-3">
        <Link
          href="/analysis"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <Target className="w-3.5 h-3.5 text-blue-600" />
          <span>Analyze Job</span>
        </Link>

        <Link
          href="/applications?action=new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Application</span>
        </Link>

        {/* User Pill / Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 uppercase">
              {profile.full_name ? profile.full_name.charAt(0) : 'U'}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-none">
                {profile.full_name || 'Account'}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {isDemoMode ? 'Demo User' : (user ? 'Signed In' : 'Local User')}
              </span>
            </div>
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95"
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{profile.full_name}</p>
                <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
              </div>

              <Link
                href="/settings"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Account Profile</span>
              </Link>

              <Link
                href="/analytics"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Progress Analytics</span>
              </Link>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  signOutUser();
                }}
                className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out / Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
