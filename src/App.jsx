import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'

import LandingPuzzle from './components/sections/LandingPuzzle'
import ReasonsWhy from './components/sections/ReasonsWhy'
import LoveNotesCalendar from './components/sections/LoveNotesCalendar'
import PolaroidWall from './components/sections/PolaroidWall'
import DreamJourney from './components/sections/DreamJourney'
import BirthdayCake3D from './components/sections/BirthdayCake3D'
import SpecialLetter from './components/sections/SpecialLetter'
import PhotoGallery from './components/sections/PhotoGallery'
import SurpriseCountdown from './components/sections/SurpriseCountdown'
import FinalSurprise from './components/sections/FinalSurprise'

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
        <ReasonsWhy />
        <LoveNotesCalendar />
        <PolaroidWall />
        <DreamJourney />
        <BirthdayCake3D />
        <SpecialLetter />
        <PhotoGallery />
        <SurpriseCountdown />
        <FinalSurprise />
      </AnimatePresence>
    </div>
  )
}

export default App
