import React, { useEffect, useRef, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'

import LandingPuzzle from './components/sections/LandingPuzzle'

// Lazy load heavy components
const ReasonsWhy = lazy(() => import('./components/sections/ReasonsWhy'))
const LoveNotesCalendar = lazy(() => import('./components/sections/LoveNotesCalendar'))
const PolaroidWall = lazy(() => import('./components/sections/PolaroidWall'))
const DreamJourney = lazy(() => import('./components/sections/DreamJourney'))
const BirthdayCake3D = lazy(() => import('./components/sections/BirthdayCake3D'))
const SpecialLetter = lazy(() => import('./components/sections/SpecialLetter'))
const PhotoGallery = lazy(() => import('./components/sections/PhotoGallery'))
const FinalSurprise = lazy(() => import('./components/sections/FinalSurprise'))

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 0.5, // Reduced from 1.2s for faster scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.5, // Increased for faster mouse wheel scrolling
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-transparent text-rose-950 min-h-screen w-full relative overflow-x-hidden selection:bg-rose-gold selection:text-black">
      <AnimatePresence>
        <LandingPuzzle />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#0a0508] text-rose-300 font-heading">
            <div className="animate-pulse text-2xl">Loading magical moments...</div>
          </div>
        }>
          <ReasonsWhy />
          <LoveNotesCalendar />
          <PolaroidWall />
          <DreamJourney />
          <BirthdayCake3D />
          <SpecialLetter />
          <PhotoGallery />
          <FinalSurprise />
        </Suspense>
      </AnimatePresence>
    </div>
  )
}

export default App
