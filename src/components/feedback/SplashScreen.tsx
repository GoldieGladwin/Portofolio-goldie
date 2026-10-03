'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';

// Flag sesi runtime halaman di browser:
// Bernilai true setelah splash pertama kali selesai atau jika dibuka di halaman admin.
// Akan ter-reset HANYA jika halaman di-refresh (F5 / full reload) atau tab baru dibuka.
let hasShownSplashInSession = false;

function isExcludedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith('/admin')) return true;
  if (pathname === '/not-found') return true;
  if (typeof window !== 'undefined') {
    const loc = window.location.pathname;
    if (loc.startsWith('/admin') || loc === '/not-found') return true;
    if (document.querySelector('[data-hide-nav="true"]')) return true;
  }
  return false;
}

export default function SplashScreen() {
  const pathname = usePathname();

  // 1. Deteksi rute admin (/admin, /admin/login, dsb) atau halaman 404
  const isExcluded = isExcludedPath(pathname);

  // 2. Jika rute dikecualikan atau sudah pernah tampil di sesi runtime ini -> jangan tampilkan
  const shouldSkip = hasShownSplashInSession || isExcluded;

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(12);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(shouldSkip);

  // Gunakan ref agar ticker animasi tidak terganggu oleh re-render
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Jika rute admin, 404, atau sudah pernah muncul -> lewati mutlak & pastikan scroll normal
    if (
      hasShownSplashInSession ||
      isExcludedPath(pathname) ||
      (typeof window !== 'undefined' && (
        window.location.pathname.startsWith('/admin') ||
        window.location.pathname === '/not-found' ||
        Boolean(document.querySelector('[data-hide-nav="true"]'))
      ))
    ) {
      hasShownSplashInSession = true;
      setIsDone(true);
      document.body.style.overflow = '';
      const stray = document.getElementById('splash-screen');
      if (stray) stray.remove();
      return;
    }

    setMounted(true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const targetDuration = 650; // Cepat, responsif & mulus (~0.65 detik)

    let animationFrameId: number | null = null;
    let openTimer: NodeJS.Timeout | null = null;
    let doneTimer: NodeJS.Timeout | null = null;
    let safetyTimer: NodeJS.Timeout | null = null;

    const triggerOpen = () => {
      if (isFinishedRef.current) return;
      isFinishedRef.current = true;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (safetyTimer) clearTimeout(safetyTimer);

      setProgress(100);
      document.body.style.overflow = originalOverflow || '';

      // Buka tirai setelah jeda singkat
      openTimer = setTimeout(() => {
        setIsOpening(true);
      }, 50);

      // Selesaikan & unmount setelah animasi tirai slide selesai
      doneTimer = setTimeout(() => {
        hasShownSplashInSession = true;
        setIsDone(true);
        try {
          if (typeof window !== 'undefined' && AOS && typeof AOS.refresh === 'function') {
            AOS.refresh();
          }
        } catch {
          // ignore
        }
      }, 650);
    };

    const tick = () => {
      if (isFinishedRef.current) return;
      const elapsed = Date.now() - startTime;
      const fraction = Math.min(elapsed / targetDuration, 1);
      const easeVal = Math.round((1 - Math.pow(1 - fraction, 3)) * 100);
      setProgress((prev) => Math.max(prev, Math.max(12, easeVal)));

      if (fraction >= 1) {
        triggerOpen();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    // Fail-safe mutlak: Maksimal 900ms WAJIB selesai & scroll dibuka
    safetyTimer = setTimeout(() => {
      triggerOpen();
    }, 900);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (openTimer) clearTimeout(openTimer);
      if (doneTimer) clearTimeout(doneTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow || '';
      hasShownSplashInSession = true;
    };
  }, [pathname]);

  // JANGAN render apa pun jika diskip, belum mounted di client, atau sudah selesai
  if (shouldSkip || !mounted || isDone) {
    return null;
  }

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* 1. TIRAI ATAS PUTIH (Slides UP) */}
      <div
        className={`fixed top-0 left-0 right-0 h-1/2 bg-white border-b border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpening ? '-translate-y-full' : 'translate-y-0'
          }`}
      />

      {/* 2. TIRAI BAWAH PUTIH (Slides DOWN) */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-1/2 bg-white border-t border-slate-200/90 shadow-[0_-15px_35px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpening ? 'translate-y-full' : 'translate-y-0'
          }`}
      />

      {/* 3. KONTEN TENGAH (Logo G.G + Loading Bar + Persentase) */}
      <div
        className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center transition-all duration-300 ease-out ${isOpening ? 'opacity-0 scale-90 blur-xs' : 'opacity-100 scale-100'
          }`}
      >
        <div className="absolute w-44 h-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="flex items-center justify-center select-none">
          <span className="font-mono font-black text-5xl sm:text-6xl text-slate-900 tracking-tight">
            G
          </span>
          <span className="font-mono font-black text-5xl sm:text-6xl text-indigo-600 px-0.5 animate-pulse">
            .
          </span>
          <span className="font-mono font-black text-5xl sm:text-6xl text-slate-900 tracking-tight">
            G
          </span>
        </div>

        <div className="mt-6 w-44 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-[1px] relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(99,102,241,0.35)] relative overflow-hidden"
            style={{ width: `${Math.max(progress, 8)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>

        <span className="mt-2.5 font-mono text-xs font-semibold text-slate-500 tracking-wider tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
}
