import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div 
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm ring-1 ring-slate-800/60 overflow-hidden shrink-0`}
      >
        {/* Subtle geometric lens mark */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-4/5 h-4/5 text-blue-400 transform -rotate-12"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 8v6M8 11h6" strokeWidth="2" className="text-white" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} leading-none text-slate-900 font-extrabold tracking-tight`}>
            Career<span className="text-blue-600">Lens</span>
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-0.5">
            Career Workspace
          </span>
        </div>
      )}
    </div>
  );
}

export function FaviconSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0f172a" />
      <circle cx="15" cy="15" r="9" stroke="#60a5fa" strokeWidth="2.8" />
      <line x1="28" y1="28" x2="21.5" y2="21.5" stroke="#60a5fa" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M15 11v8M11 15h8" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
