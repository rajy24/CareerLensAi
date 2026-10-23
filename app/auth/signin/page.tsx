'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, HardDrive, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useCareerLens } from '@/lib/context';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function SignInPage() {
  const router = useRouter();
  const { loadSampleData } = useCareerLens();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSupabase = isSupabaseConfigured();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabase) {
        const client = createClient();
        if (client) {
          const { error } = await client.auth.signInWithPassword({ email, password });
          if (error) throw error;
        }
      }
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loadSampleData();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-6">
          <Logo size="lg" />
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign in to your workspace
        </h2>
        <p className="mt-2 text-xs text-slate-600">
          Or{' '}
          <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-xs disabled:opacity-60"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* One-Click Guest / Demo Mode Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors shadow-xs"
            >
              <HardDrive className="w-4 h-4 text-blue-600" />
              <span>Continue as Local Guest / Load Demo</span>
            </button>
          </div>

          {/* Auth provider disclosure */}
          <div className="mt-6 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
            {isSupabase ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by Supabase Auth with Row Level Security.</span>
              </>
            ) : (
              <>
                <HardDrive className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Local Mode active. Credentials will persist in your browser.</span>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
