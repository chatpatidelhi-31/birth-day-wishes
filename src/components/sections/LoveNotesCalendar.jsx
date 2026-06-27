import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const loveMessages = [
  "You make every day brighter.",
  "I fall for you more every single day.",
  "Your smile is my favorite thing in the world.",
  "I'm so lucky to have you.",
  "You are my greatest adventure.",
  "Thank you for being you.",
  "I love the way you laugh.",
  "You are my forever."
]

export default function LoveNotesCalendar() {
  const [selectedDay, setSelectedDay] = useState(null)
  
  // Generate 365 days
  const days = Array.from({ length: 365 }, (_, i) => i + 1)

  const handleDayClick = (day) => {
    setSelectedDay(day)
  }

  const closeMessage = () => {
    setSelectedDay(null)
  }

  return (
    <section className="py-16 md:py-32 md:min-h-screen relative bg-[#1a0f14] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl text-center text-rose-100 mb-12 md:mb-24 font-bold leading-tight px-4"
        >
          365 Reasons
        </motion.h2>
        
        <p className="text-center text-rose-950 text-lg mb-12">Pick a day, any day...</p>

        {/* 365 Grid */}
        <div className="grid grid-cols-10 md:grid-cols-20 lg:grid-cols-25 gap-2 justify-center">
          {days.map((day, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 30) * 0.02 }}
              onClick={() => handleDayClick(day)}
              className="glass-card aspect-square flex items-center justify-center cursor-pointer hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              <span className="text-xs text-soft-pink font-medium opacity-50">{day}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unfolding Paper Modal */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent/80 backdrop-blur-sm p-4"
            onClick={closeMessage}
          >
            <motion.div
              initial={{ rotateX: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              exit={{ rotateX: -90, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                bounce: 0.4 
              }}
              className="relative w-full max-w-md bg-[#FFF9F2] text-black p-12 rounded-lg shadow-2xl origin-top"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
              }}
            >
              <button 
                onClick={closeMessage}
                className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="font-heading text-center">
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Day {selectedDay}</p>
                <p className="text-3xl font-medium leading-relaxed italic text-gray-800">
                  "{loveMessages[selectedDay % loveMessages.length]}"
                </p>
                <div className="mt-8 pt-8 border-t border-gray-300">
                  <p className="text-xl text-rose-800">❤️</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
