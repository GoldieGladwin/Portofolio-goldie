'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'

export default function SplashScreen() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  const [progress, setProgress] = useState(0)
  const [isOpening, setIsOpening] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Lewati splash screen di route admin
    if (isAdmin) {
      return
    }

    // Langsung beri progress awal agar tidak kelihatan freeze di 0%
    setProgress(12)

    // Kunci scroll sementara saat splash screen loading
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const startTime = Date.now()
    const targetDuration = 800 // Durasi cepat & snappy (~0.8 detik)

    let animationFrameId: number | null = null
    let intervalId: NodeJS.Timeout | null = null
    let openTimer: NodeJS.Timeout | null = null
    let doneTimer: NodeJS.Timeout | null = null
    let safetyTimer: NodeJS.Timeout | null = null
    let isFinished = false

    const triggerOpen = () => {
      if (isFinished) return
      isFinished = true

      if (intervalId) clearInterval(intervalId)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (safetyTimer) clearTimeout(safetyTimer)

      setProgress(100)

      // Beri tanda data-opened pada elemen splash agar fail-safe script tahu sudah beres
      const el = document.getElementById('splash-screen')
      if (el) el.setAttribute('data-opened', 'true')

      // Jeda sangat singkat (100ms) lalu buka tirai atas & bawah
      openTimer = setTimeout(() => {
        setIsOpening(true)
        document.body.style.overflow = originalOverflow || ''
      }, 100)

      // Setelah animasi tirai selesai (650ms), unmount komponen & refresh AOS
      doneTimer = setTimeout(() => {
        setIsDone(true)
        try {
          if (typeof window !== 'undefined' && AOS && typeof AOS.refresh === 'function') {
            AOS.refresh()
          }
        } catch {
          // Abaikan jika AOS belum terinisialisasi
        }
      }, 750)
    }

    // Update persentase berbasis waktu nyata Date.now()
    const tick = () => {
      if (isFinished) return
      const elapsed = Date.now() - startTime
      const fraction = Math.min(elapsed / targetDuration, 1)

      // Easing out cubic agar laju persentase alami dan mulus
      const easeVal = Math.round((1 - Math.pow(1 - fraction, 3)) * 100)
      const currentVal = Math.max(12, easeVal)
      setProgress((prev) => Math.max(prev, currentVal))

      if (fraction >= 1) {
        triggerOpen()
      } else {
        animationFrameId = requestAnimationFrame(tick)
      }
    }

    // Jalankan ticker RAF
    animationFrameId = requestAnimationFrame(tick)

    // Interval backup (setiap 25ms) agar tetap jalan jika RAF di-throttle browser
    intervalId = setInterval(() => {
      if (isFinished) return
      const elapsed = Date.now() - startTime
      if (elapsed >= targetDuration) {
        triggerOpen()
      } else {
        const fraction = elapsed / targetDuration
        const easeVal = Math.round((1 - Math.pow(1 - fraction, 3)) * 100)
        setProgress((prev) => Math.max(prev, Math.max(12, easeVal)))
      }
    }, 25)

    // FAIL-SAFE MUTLAK: Maksimal 1.3 detik splash screen WAJIB terbuka & scroll dibuka
    safetyTimer = setTimeout(() => {
      triggerOpen()
    }, 1300)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (intervalId) clearInterval(intervalId)
      if (openTimer) clearTimeout(openTimer)
      if (doneTimer) clearTimeout(doneTimer)
      if (safetyTimer) clearTimeout(safetyTimer)
      document.body.style.overflow = originalOverflow || ''
    }
  }, [isAdmin])

  // Jika di halaman admin atau sudah selesai animasi, unmount sepenuhnya
  if (isAdmin || isDone) return null

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
      {/* 3. KONTEN TENGAH (Logo G.G + Loading Bar + Persentase)                   */}
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
        <div className="mt-6 w-44 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-[1px] relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(99,102,241,0.35)] relative overflow-hidden"
            style={{ width: `${Math.max(progress, 8)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Persentase Angka Minimalis */}
        <span className="mt-2.5 font-mono text-xs font-semibold text-slate-500 tracking-wider tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  )
}

