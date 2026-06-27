import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Heart } from 'lucide-react'
import images from '../../images.json'

export default function FinalSurprise() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  return (
    <section className="py-16 md:py-32 md:min-h-screen relative bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      {!showPhoto && (
        <div className="z-10 flex flex-col items-center">
          
          <motion.div
            initial={{ scale: 1 }}
            animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`cursor-pointer group relative ${isOpen ? 'pointer-events-none' : ''}`}
            onClick={handleOpen}
          >
            {/* Pulsing glow behind box */}
            <div className="absolute inset-0 bg-rose-gold/30 rounded-full blur-3xl group-hover:bg-rose-gold/50 transition-all duration-500 animate-pulse" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative glass p-12 rounded-3xl border border-rose-gold/40 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]"
            >
              <Gift size={80} className="text-rose-gold mb-4" strokeWidth={1} />
              <p className="text-rose-950 font-heading text-xl">Click to open your gift</p>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto"
              >
                {/* Golden Light Ray */}
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#d4af37_50%,#000000_100%)] opacity-20 mix-blend-screen animate-spin-slow pointer-events-none" />

                {/* Floating Hearts */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-soft-pink"
                    initial={{ y: 200, opacity: 0, scale: 0 }}
                    animate={{ 
                      y: -window.innerHeight, 
                      opacity: [0, 1, 0],
                      scale: Math.random() * 2 + 1,
                      x: Math.random() * 400 - 200
                    }}
                    transition={{
                      duration: Math.random() * 3 + 4,
                      delay: 1 + Math.random() * 2,
                      repeat: Infinity
                    }}
                  >
                    <Heart fill="currentColor" />
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 2 }}
                  className="text-center px-4"
                >
                  <h2 className="text-3xl md:text-5xl text-rose-950 font-heading font-light mb-6 leading-tight">
                    "You are the most beautiful<br />chapter of my life."
                  </h2>
                  <h1 className="text-5xl md:text-7xl text-gradient font-bold mb-12 font-heading">
                    I Love You Forever ❤️
                  </h1>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPhoto(true)}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-rose-950 px-8 py-4 rounded-full text-lg font-body uppercase tracking-widest transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    One Last Surprise
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Fullscreen Photo */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, filter: 'brightness(0)' }}
            animate={{ opacity: 1, filter: 'brightness(1)' }}
            transition={{ duration: 3 }}
            className="fixed inset-0 z-50 bg-transparent flex items-center justify-center cursor-pointer"
            onClick={() => setShowPhoto(false)} // Click to close
          >
            <img 
              src={encodeURI(images[images.length - 1])} 
              alt="Us" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soft-pink/80 via-transparent to-transparent pointer-events-none" />
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 2 }}
              className="absolute bottom-12 text-center text-rose-950 font-heading text-4xl"
            >
              Happy 26th Birthday Poojitha!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
