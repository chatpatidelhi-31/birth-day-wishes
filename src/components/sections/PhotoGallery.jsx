import React from 'react'
import { motion } from 'framer-motion'
import images from '../../images.json'

// Generate gallery from images, limited to 12 images
const photos = images.slice(0, 12).map((src, i) => ({
  id: i,
  src: encodeURI(src),
  alt: `Memory ${i}`
}))

export default function PhotoGallery() {
  return (
    <section className="py-16 md:py-32 md:min-h-screen relative bg-[#0a0508]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-6xl text-center text-rose-100 mb-12 md:mb-24 font-bold font-heading leading-tight px-4"
        >
          Gallery of Us
        </motion.h2>

        {/* CSS Columns Masonry */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6 }}
              className="break-inside-avoid"
            >
              <div className="relative group overflow-hidden rounded-xl bg-gray-900 cursor-pointer">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  loading="lazy" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-transparent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-rose-950 font-heading italic text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Forever
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
