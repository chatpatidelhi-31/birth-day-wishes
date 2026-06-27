import React from 'react'
import { motion } from 'framer-motion'
import images from '../../images.json'

const reasons = [
  "Your smile", "Your kindness", "Your eyes", "Your laugh", 
  "Your care", "Your heart", "Your strength", "Your love"
]

export default function ReasonsWhy() {
  return (
    <section className="py-16 md:py-32 md:min-h-screen relative bg-transparent overflow-hidden flex flex-col items-center justify-center">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl px-4 text-center text-rose-950 mb-12 md:mb-24 font-bold leading-tight"
      >
        Reasons I Love You
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl px-4 relative z-10">
        {reasons.map((reason, index) => {
          // Calculate random floating values
          const floatY = [0, -20, 0]
          const rotateZ = [0, index % 2 === 0 ? 5 : -5, 0]
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                animate={{ y: floatY, rotate: rotateZ }}
                transition={{
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-56 h-72 relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(255,214,232,0.6)] transition-all duration-300 group border border-white/20"
              >
                {/* Background Image */}
                <img 
                  src={images[index % images.length]} 
                  alt={reason} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-950/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-heading text-cream font-medium drop-shadow-lg">
                    {reason}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
