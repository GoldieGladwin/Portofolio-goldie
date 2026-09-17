'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AosInitializer() {
  const pathname = usePathname()

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
      anchorPlacement: 'top-bottom',
      debounceDelay: 20,
      throttleDelay: 40,
    })

    // Refresh coordinates after client dynamic components (images, 3D Canvas, fonts) mount
    const timer1 = setTimeout(() => {
      AOS.refresh()
    }, 100)

    const timer2 = setTimeout(() => {
      AOS.refresh()
    }, 500)

    const handleResizeOrLoad = () => {
      AOS.refresh()
    }

    window.addEventListener('load', handleResizeOrLoad)
    window.addEventListener('resize', handleResizeOrLoad)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('load', handleResizeOrLoad)
      window.removeEventListener('resize', handleResizeOrLoad)
    }
  }, [])

  useEffect(() => {
    // Recalculate positions upon navigation
    const timer = setTimeout(() => {
      AOS.refresh()
    }, 80)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}