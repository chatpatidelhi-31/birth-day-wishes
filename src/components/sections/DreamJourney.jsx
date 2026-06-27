import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DreamJourney() {
  const containerRef = useRef(null)
  const moonRef = useRef(null)
  const starsRef = useRef(null)
  const cloudsRef = useRef(null)
  const coupleRef = useRef(null)
  const roadRef = useRef(null)

  useEffect(() => {
    // Parallax scrolling effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true
      }
    })

    tl.to(moonRef.current, { y: -200, scale: 1.2 }, 0)
    tl.to(starsRef.current, { y: -300 }, 0)
    tl.to(cloudsRef.current, { x: -200, y: -100 }, 0)
    tl.to(roadRef.current, { scale: 1.5, y: 100 }, 0)
    
    // Couple walks forward (scales up)
    tl.to(coupleRef.current, { scale: 1.5, y: 50 }, 0)
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="h-screen relative bg-gradient-to-b from-[#0B0C10] to-[#1F2833] overflow-hidden">
      {/* Stars Layer */}
      <div ref={starsRef} className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random(),
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Moon Layer */}
      <div 
        ref={moonRef} 
        className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-[#FFF9F2] shadow-[0_0_100px_rgba(255,249,242,0.8)] z-10"
      />

      {/* Clouds Layer */}
      <div ref={cloudsRef} className="absolute top-1/3 left-0 right-0 h-64 z-20 opacity-50 flex items-center justify-between pointer-events-none">
        <div className="w-96 h-32 bg-white/10 rounded-full blur-3xl ml-20" />
        <div className="w-96 h-32 bg-white/10 rounded-full blur-3xl mr-20" />
      </div>

      {/* Text overlay */}
      <div className="absolute top-1/4 left-0 right-0 z-30 text-center pointer-events-none px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl text-rose-950 font-heading font-light drop-shadow-lg"
        >
          Walking into the future,<br/> together.
        </motion.h2>
      </div>

      {/* Road Layer */}
      <div ref={roadRef} className="absolute bottom-0 left-0 right-0 h-1/2 z-20 origin-bottom">
        {/* Simulate road with gradient/perspective */}
        <div className="w-full h-full bg-gradient-to-t from-soft-pink to-transparent opacity-80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full border-x-4 border-dashed border-white/20" 
             style={{ transform: 'perspective(500px) rotateX(60deg)' }} />
      </div>

      {/* Couple Layer */}
      <div ref={coupleRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 origin-bottom pointer-events-none flex flex-col items-center">
        {/* Bobbing animation on the couple */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Couple Silhouette Placeholder */}
          <div className="w-32 h-48 md:w-48 md:h-64 bg-transparent border border-white/10 rounded-t-full relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-soft-pink via-black/80 to-transparent" />
            <span className="absolute bottom-4 w-full text-center text-xs text-rose-950/30 font-body">Silhouette</span>
          </div>
        </motion.div>
      </div>
      
      {/* Fireflies Layer */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047]"
            style={{
              top: `${Math.random() * 50 + 50}%`, // bottom half
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

    </section>
  )
}
