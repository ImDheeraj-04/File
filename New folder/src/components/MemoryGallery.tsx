'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Camera, X, ArrowLeft, ArrowRight } from 'lucide-react'

const memories = [
  {
    id: 1,
    title: 'Our First Date',
    caption: 'Nervous smiles and endless laughter',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ffeaa7" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23ff6b9d" font-family="cursive" font-size="24"%3EFirst Date Magic%3C/text%3E%3C/svg%3E'
  },
  {
    id: 2,
    title: 'Sunset Walks',
    caption: 'Every sunset with you is golden',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="sunset" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ff6b9d"/%3E%3Cstop offset="100%25" style="stop-color:%23ffeaa7"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23sunset)" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="cursive" font-size="24"%3ESunset Moments%3C/text%3E%3C/svg%3E'
  },
  {
    id: 3,
    title: 'Coffee Shop Dates',
    caption: 'Love brewed perfectly',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23dfe6e9" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="60" fill="%23636e72"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="cursive" font-size="20"%3ECoffee & Love%3C/text%3E%3C/svg%3E'
  },
  {
    id: 4,
    title: 'Adventure Together',
    caption: 'Every day is an adventure with you',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%2374b9ff" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="cursive" font-size="24"%3EAdventure Awaits%3C/text%3E%3C/svg%3E'
  },
  {
    id: 5,
    title: 'Movie Nights',
    caption: 'Cuddled up and perfect',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%232d3436" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23ffeaa7" font-family="cursive" font-size="24"%3EMovie Magic%3C/text%3E%3C/svg%3E'
  },
  {
    id: 6,
    title: 'Special Moments',
    caption: 'Every second counts',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23a29bfe" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="cursive" font-size="24"%3EPrecious Times%3C/text%3E%3C/svg%3E'
  }
]

const MemoryGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openMemory = (id: number) => {
    setSelectedMemory(id)
    setCurrentImageIndex(memories.findIndex(m => m.id === id))
  }

  const closeMemory = () => {
    setSelectedMemory(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % memories.length)
    setSelectedMemory(memories[(currentImageIndex + 1) % memories.length].id)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + memories.length) % memories.length)
    setSelectedMemory(memories[(currentImageIndex - 1 + memories.length) % memories.length].id)
  }

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
          Memory Gallery
        </h2>
        <p className="text-xl text-white opacity-80">
          Capturing our beautiful moments together
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => openMemory(memory.id)}
          >
            <div className="polaroid transform transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
              <div className="relative overflow-hidden rounded-t">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Camera size={20} className="mb-2" />
                    <p className="text-sm">Click to view</p>
                  </div>
                </div>
              </div>
              <div className="text-center py-4">
                <h3 className="font-playfair text-xl text-gray-800 mb-2">
                  {memory.title}
                </h3>
                <p className="text-sm text-gray-600 italic">
                  {memory.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeMemory}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeMemory}
                className="absolute -top-12 right-0 text-white hover:text-romantic-pink transition-colors"
              >
                <X size={32} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <ArrowRight size={24} />
              </button>

              {/* Image */}
              <div className="bg-white rounded-2xl overflow-hidden">
                <img
                  src={memories[currentImageIndex].image}
                  alt={memories[currentImageIndex].title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-3xl font-playfair text-gray-800 mb-4">
                    {memories[currentImageIndex].title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {memories[currentImageIndex].caption}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="text-red-500" size={20} />
                    <p className="text-gray-700 italic">
                      This memory will forever be cherished in my heart
                    </p>
                    <Heart className="text-red-500" size={20} />
                  </div>
                </div>
              </div>

              {/* Floating hearts */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-red-400"
                  initial={{ 
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    opacity: 0
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  <Heart size={20} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MemoryGallery
