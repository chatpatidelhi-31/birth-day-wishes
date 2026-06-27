import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function SurpriseCountdown() {
  // Set target date to 10 seconds from now for demo purposes.
  // In reality, this should be the exact birthday date.
  const [targetDate] = useState(() => new Date(Date.now() + 10000).getTime())
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isZero, setIsZero] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!isZero) {
          setIsZero(true)
          fireworks()
        }
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, isZero])

  const fireworks = () => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)
  }

  return (
    <section className={`py-16 md:py-32 md:min-h-screen relative flex flex-col items-center justify-center transition-colors duration-1000 ${isZero ? 'bg-white/30' : 'bg-transparent'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={`text-4xl md:text-6xl text-center mb-16 font-bold font-heading ${isZero ? 'text-rose-gold text-shadow-glow' : 'text-rose-950'}`}
      >
        {isZero ? "Happy Birthday!" : "The Surprise Begins In..."}
      </motion.h2>

      <div className="flex gap-4 md:gap-8 z-10">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="glass-card w-20 h-24 md:w-32 md:h-40 flex items-center justify-center mb-4 border border-white/20">
              <span className="text-4xl md:text-6xl text-rose-950 font-bold font-body">{String(value).padStart(2, '0')}</span>
            </div>
            <span className="text-gray-400 uppercase tracking-widest text-xs md:text-sm">{unit}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isZero && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-gold/20 via-transparent to-transparent opacity-50 mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </section>
  )
}
