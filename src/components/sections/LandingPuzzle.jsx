import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import images from '../../images.json'

// 11x11 Grid mapped to form a heart
const gridRows = 11
const gridCols = 11
const heartMap = [
  " . . # # . . . # # . . ",
  " . # # # # . # # # # . ",
  " # # # # # # # # # # # ",
  " # # # # # # # # # # # ",
  " # # # # # # # # # # # ",
  " . # # # # # # # # # . ",
  " . . # # # # # # # . . ",
  " . . . # # # # # . . . ",
  " . . . . # # # . . . . ",
  " . . . . . # . . . . . ",
  " . . . . . . . . . . . ",
]

const getHeartCoordinates = () => {
  const coords = []
  heartMap.forEach((rowStr, rowIndex) => {
    const cols = rowStr.trim().split(" ")
    cols.forEach((cell, colIndex) => {
      if (cell === "#") {
        coords.push({ row: rowIndex, col: colIndex })
      }
    })
  })
  return coords
}

const heartCoords = getHeartCoordinates()

const nicknames = [
  { name: "Bujji Talli", emoji: "💖" },
  { name: "Chinni Talli", emoji: "🌸" },
  { name: "Cutepie", emoji: "🥺" },
  { name: "Buggal Pilla", emoji: "😚" },
  { name: "Laddu", emoji: "🥰" },
  { name: "Teddy", emoji: "🧸" }
]

export default function LandingPuzzle() {
  const containerRef = useRef(null)
  const [nameIndex, setNameIndex] = useState(0)

  useEffect(() => {
    // GSAP Timeline for the sequence
    const tl = gsap.timeline()

    // 1. Wait 2 seconds
    tl.to({}, { duration: 2 })

    // 2. Photos falling down
    const photos = document.querySelectorAll('.puzzle-piece')
    
    tl.fromTo(photos, 
      { 
        y: () => -window.innerHeight - Math.random() * 500,
        x: () => (Math.random() - 0.5) * window.innerWidth,
        rotationZ: () => Math.random() * 360 - 180,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5
      },
      {
        y: 0,
        x: 0,
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        duration: 3,
        stagger: 0.05,
        ease: "power3.out"
      }
    )

    // 3. Zoom out the heart slightly
    tl.to('.puzzle-container', {
      scale: 0.85,
      duration: 2,
      ease: "power2.inOut"
    }, "+=0.5")

    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setNameIndex(prev => (prev + 1) % nicknames.length)
      }, 2500) // Change nickname every 2.5 seconds
    }, 5500)
    
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="min-h-screen relative flex flex-col items-center pt-10 pb-20 bg-transparent overflow-x-hidden" ref={containerRef}>
      {/* Background Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random()
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Heart Puzzle */}
      <div className="relative z-10 puzzle-container mb-4 mt-8 flex-shrink-0" style={{ width: 'min(90vw, 550px)', aspectRatio: '1/1' }}>
        <div className="relative w-full h-full">
          {heartCoords.map((coord, i) => {
            const pieceSize = 100 / gridCols
            return (
              <div
                key={i}
                className="puzzle-piece absolute bg-white/20 shadow-lg border border-white/30 rounded-sm overflow-hidden"
                style={{
                  width: `${pieceSize}%`,
                  height: `${pieceSize}%`,
                  left: `${coord.col * pieceSize}%`,
                  top: `${coord.row * pieceSize}%`,
                  backgroundImage: `url('${encodeURI(images[i % images.length])}')`,
                  backgroundSize: 'cover'
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Cinematic Text Below the Images */}
      <div className="relative z-20 w-full px-4 flex flex-col items-center min-h-[300px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 5.5 }}
          className="glass p-8 md:p-12 rounded-3xl w-full max-w-2xl text-center shadow-2xl backdrop-blur-xl border border-white/40 bg-white/20"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 6.5 }}
            className="mb-8"
          >
            <p className="text-3xl md:text-4xl font-handwriting text-rose-950 leading-loose">
              "Every picture holds a memory.<br />
              Every memory holds a smile.<br />
              Every smile begins with You."
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 8.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl md:text-5xl text-rose-950 font-bold mb-4 font-heading">
              Happy 26th Birthday
            </h1>
            
            {/* Scrolling Nicknames Container */}
            <div className="h-32 md:h-40 relative w-full flex justify-center items-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={nameIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-handwriting absolute px-4 py-6 flex items-center gap-4"
                >
                  <span className="text-gradient leading-relaxed drop-shadow-lg">
                    {nicknames[nameIndex].name}
                  </span>
                  <span className="text-5xl drop-shadow-lg text-rose-950">
                    {nicknames[nameIndex].emoji}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
