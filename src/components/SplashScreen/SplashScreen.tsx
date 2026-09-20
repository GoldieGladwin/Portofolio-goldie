'use client'

import React, { useEffect, useState } from 'react'
import AOS from 'aos'

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [isOpening, setIsOpening] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Kunci scroll saat splash screen sedang loading
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    const targetDuration = 1100 // Durasi loading mulus (~1.1 detik)

    let animationFrameId: number
    let openTimer: NodeJS.Timeout
    let doneTimer: NodeJS.Timeout

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const fraction = Math.min(elapsed / targetDuration, 1)

      // Easing out cubic agar persentase mengalir natural dan mulus
      const currentVal = Math.round((1 - Math.pow(1 - fraction, 3)) * 100)
      setProgress(currentVal)

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress)
      } else {
        // Ketika mencapai 100%, jeda sejenak (150ms) lalu picu animasi tirai ditarik atas & bawah
        openTimer = setTimeout(() => {
          setIsOpening(true)
          // Kembalikan kemampuan scroll pengguna
          document.body.style.overflow = originalOverflow || ''
        }, 150)

        // Setelah animasi tirai atas-bawah selesai (700ms), unmount komponen
        doneTimer = setTimeout(() => {
          setIsDone(true)
          if (typeof window !== 'undefined') {
            AOS.refresh()
          }
        }, 850)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(openTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = originalOverflow || ''
    }
  }, [])

  if (isDone) return null

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. TIRAI ATAS PUTIH (Slides UP: -translate-y-full)                        */}
      {/* ========================================================================= */}
      <div
        className={`fixed top-0 left-0 right-0 h-1/2 bg-white border-b border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* ========================================================================= */}
      {/* 2. TIRAI BAWAH PUTIH (Slides DOWN: translate-y-full)                      */}
      {/* ========================================================================= */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-1/2 bg-white border-t border-slate-200/90 shadow-[0_-15px_35px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* ========================================================================= */}
      {/* 3. KONTEN TENGAH (Simple tulisan G.G + Loading Bar di tema putih)         */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center transition-all duration-300 ease-out ${
          isOpening ? 'opacity-0 scale-90 blur-xs' : 'opacity-100 scale-100'
        }`}
      >
        {/* Glow Halus Lembut di Belakang G.G */}
        <div className="absolute w-44 h-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Tulisan Simple G.G */}
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

        {/* Loading Bar Horizontal di Bawahnya */}
        <div className="mt-6 w-44 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(99,102,241,0.35)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Persentase Angka Minimalis */}
        <span className="mt-2.5 font-mono text-xs font-semibold text-slate-500 tracking-wider tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  )
}
