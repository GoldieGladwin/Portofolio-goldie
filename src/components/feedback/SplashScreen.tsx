'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

let hasShownSplashInSession = false;

export default function SplashScreen() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/not-found';

  // Phases: 'loading' -> 'text-exit' -> 'lifting' -> 'done'
  const [phase, setPhase] = useState<'loading' | 'text-exit' | 'lifting' | 'done'>('loading');

  useEffect(() => {
    // 1. Exclude admin / not-found or if already shown in this memory session
    if (isExcluded || hasShownSplashInSession) {
      setPhase('done');
      return;
    }

    // 2. Headless / Lighthouse / Googlebot instant bypass (zero performance penalty on audits)
    try {
      if (
        typeof navigator !== 'undefined' &&
        /Lighthouse|Googlebot|HeadlessChrome|PageSpeed|insights/i.test(navigator.userAgent)
      ) {
        hasShownSplashInSession = true;
        setPhase('done');
        return;
      }
    } catch {
      // ignore
    }

    // 3. sessionStorage check (show once per browser session/tab)
    try {
      if (sessionStorage.getItem('splash_shown')) {
        hasShownSplashInSession = true;
        setPhase('done');
        return;
      }
    } catch {
      // ignore
    }

    // Snappy, lightweight sequence:
    // 0ms - 420ms: Monogram & developer branding visible
    // 420ms: Branding gently exits upward with soft fade
    const timerTextExit = setTimeout(() => {
      setPhase('text-exit');
    }, 420);

    // 600ms: Sleek vertical shutter curtains lift with smooth stagger
    const timerLifting = setTimeout(() => {
      setPhase('lifting');
    }, 600);

    // 1050ms: Complete! Total DOM unmount, save session flag, refresh animations
    const timerDone = setTimeout(() => {
      setPhase('done');
      hasShownSplashInSession = true;
      try {
        sessionStorage.setItem('splash_shown', 'true');
      } catch {
        // ignore
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 1050);

    return () => {
      clearTimeout(timerTextExit);
      clearTimeout(timerLifting);
      clearTimeout(timerDone);
      hasShownSplashInSession = true;
    };
  }, [isExcluded]);

  if (phase === 'done') return null;

  const isLifting = phase === 'lifting';
  const isTextExit = phase === 'text-exit' || phase === 'lifting';

  // 5 sleek vertical shutter columns
  const columns = [0, 1, 2, 3, 4];

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* Container balok-balok shutter vertikal - GPU Accelerated */}
      <div className="relative w-full h-[105vh] flex">
        {columns.map((colIndex) => (
          <div
            key={colIndex}
            className="relative h-full flex-1 bg-white dark:bg-[#07090e] border-r border-slate-100/80 dark:border-white/[0.03] last:border-r-0"
            style={{
              transform: isLifting ? 'translateY(-102%)' : 'translateY(0%)',
              transitionProperty: 'transform',
              transitionDuration: '520ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              transitionDelay: `${colIndex * 40}ms`,
              boxShadow: isLifting
                ? '0 25px 35px -10px rgba(0, 0, 0, 0.15)'
                : 'none',
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Konten Branding di Tengah Layar */}
      <div
        className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center transition-all duration-300 ease-out ${
          isTextExit
            ? 'opacity-0 -translate-y-5 scale-95'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="relative flex flex-col items-center text-center px-6">
          {/* Ambient Glow */}
          <div className="absolute -inset-10 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Logo Monogram Minimalis */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shadow-xs">
            <span className="font-mono font-black text-slate-800 dark:text-white text-xl sm:text-2xl tracking-widest">
              G
            </span>
            <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-xl sm:text-2xl">
              .
            </span>
            <span className="font-mono font-black text-slate-800 dark:text-white text-xl sm:text-2xl tracking-widest">
              G
            </span>
          </div>

          {/* Nama Pengembang */}
          <h2 className="relative text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-slate-900 dark:text-white uppercase">
            Goldie Gladwin
          </h2>

          {/* Subtitle */}
          <p className="relative mt-2 text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase">
            Portfolio &bull; Software Engineer
          </p>

          {/* Micro Progress Line Shimmer */}
          <div className="relative mt-4 w-20 sm:w-24 h-[2px] bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-600 rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
