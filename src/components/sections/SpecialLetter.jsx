import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const paragraphs = [
  "My Dearest Poojitha,",
  "Every moment with you feels like a dream I never want to wake up from. You are the light of my life, my biggest supporter, and my best friend.",
  "As you turn 26, I just wanted to remind you how deeply and endlessly I love you. Here's to a lifetime of birthdays together.",
  "Yours forever, ❤️"
]

export default function SpecialLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Delay text appearance until envelope fades out
      setTimeout(() => setShowText(true), 800)
    } else {
      setShowText(false)
    }
  }, [isOpen])

  return (
    <section className="py-12 md:py-20 md:min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Removed Soft Background Orbs for Performance */}

      <div className="text-center mb-16 z-10 pointer-events-none relative">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold font-heading mb-4 text-gradient drop-shadow-sm"
        >
          A Special Letter
        </motion.h2>
        <p className="text-rose-950/70 font-body text-lg uppercase tracking-widest transition-opacity duration-500" style={{ opacity: isOpen ? 0 : 1 }}>
          Click the seal to open
        </p>
      </div>

      <div className="relative w-full max-w-2xl min-h-[500px] flex items-center justify-center perspective-1000 z-10">
        
        {/* The Interactive Container */}
        <div className="relative w-80 md:w-96 flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(true)}>
          
          {/* Envelope Wrapper - fades out when opened */}
          <motion.div 
            animate={{ 
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute w-full h-60 z-20 ${isOpen ? 'pointer-events-none' : ''}`}
          >
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#F5E6D3] rounded-lg shadow-xl" />
            
            {/* Envelope Left & Right Flaps */}
            <div 
              className="absolute inset-0 bg-[#EFE3CF] rounded-b-lg"
              style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div 
              className="absolute inset-0 bg-[#FFF3E0] rounded-b-lg"
              style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
            >
              <div className="absolute inset-0 border-t border-black/5" />
            </div>

            {/* Envelope Top Flap - Animates open as it fades out */}
            <motion.div
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full origin-top"
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                backgroundColor: '#Fdf7ef',
                backfaceVisibility: 'hidden',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              }}
            />

            {/* Wax Seal */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#7A1D2B] rounded-full z-40 shadow-lg flex items-center justify-center border-2 border-[#59141f]">
              <div className="w-10 h-10 border border-[#9b2537] rounded-full flex items-center justify-center">
                <span className="font-heading text-rose-gold text-xl drop-shadow-md">P</span>
              </div>
            </div>
          </motion.div>

          {/* The Letter Paper */}
          <motion.div
            animate={{ 
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1.1 : 0.8,
              y: isOpen ? 0 : 20,
              zIndex: isOpen ? 30 : 10
            }}
            transition={{ duration: 1, delay: isOpen ? 0.3 : 0, ease: "easeOut" }}
            className={`relative w-full md:w-[120%] bg-[#FFFCF8] rounded-md shadow-2xl p-8 md:p-12 flex flex-col pointer-events-none`}
            style={{
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
            }}
          >
            <AnimatePresence>
              {showText && (
                <motion.div 
                  className="font-handwriting text-3xl md:text-4xl text-[#4A152B] leading-relaxed flex flex-col gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.8 } }
                  }}
                >
                  {paragraphs.map((text, i) => (
                    <motion.p
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2 } }
                      }}
                      className={i === 0 || i === 3 ? "text-4xl md:text-5xl" : ""}
                    >
                      {text}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
