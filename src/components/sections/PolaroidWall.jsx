import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import images from '../../images.json'

const photos = [
  { id: 1, img: encodeURI(images[10 % images.length]), caption: 'Our first date' },
  { id: 2, img: encodeURI(images[11 % images.length]), caption: 'Late night drives' },
  { id: 3, img: encodeURI(images[12 % images.length]), caption: 'Beach day' },
  { id: 4, img: encodeURI(images[13 % images.length]), caption: 'Your beautiful smile' },
  { id: 5, img: encodeURI(images[14 % images.length]), caption: 'That one vacation' },
  { id: 6, img: encodeURI(images[15 % images.length]), caption: 'Just us' },
]

export default function PolaroidWall() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section className="py-16 md:py-32 md:min-h-screen relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl text-center text-rose-950 mb-12 md:mb-24 font-bold leading-tight px-4"
        >
          Memory Wall
        </motion.h2>

        {/* Fairy lights string SVG background */}
        <div className="absolute top-40 left-0 right-0 h-20 opacity-50 pointer-events-none">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full stroke-yellow-500/30" fill="none" strokeWidth="2">
            <path d="M0,50 Q250,100 500,50 T1000,50" />
          </svg>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
          {photos.map((photo, index) => {
            const rotateInit = index % 2 === 0 ? -3 : 4
            
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* String from top */}
                <div className="absolute -top-12 left-1/2 w-[1px] h-12 bg-white/20 transform -translate-x-1/2" />
                {/* Pin */}
                <div className="absolute -top-1 left-1/2 w-3 h-3 bg-rose-gold rounded-full transform -translate-x-1/2 shadow-[0_0_10px_#D4AF37] z-10" />
                
                <motion.div
                  layoutId={`photo-${photo.id}`}
                  onClick={() => setSelectedPhoto(photo)}
                  animate={{ rotate: [rotateInit - 2, rotateInit + 2, rotateInit - 2] }}
                  transition={{
                    duration: 4 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-white p-4 pb-12 shadow-xl cursor-pointer transform-origin-top hover:z-20 w-64"
                >
                  <img src={photo.img} alt={photo.caption} className="w-full aspect-[4/5] object-cover bg-gray-200" />
                  <p className="absolute bottom-4 left-0 right-0 text-center font-heading text-black text-lg">
                    {photo.caption}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent/60 p-4 cursor-pointer"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="bg-white p-6 pb-20 shadow-2xl relative w-full max-w-lg cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-transparent/50 text-rose-950 rounded-full p-2 hover:bg-transparent transition-colors"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedPhoto.img} 
                alt={selectedPhoto.caption} 
                className="w-full object-contain max-h-[70vh] bg-gray-200"
              />
              <p className="absolute bottom-6 left-0 right-0 text-center font-heading text-black text-3xl">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
