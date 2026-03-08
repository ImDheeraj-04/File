'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar, MessageCircle, Laugh, Sparkles } from 'lucide-react'

const timelineEvents = [
  {
    id: 1,
    date: 'The Day We Met',
    icon: Calendar,
    message: 'The moment our paths crossed and everything changed',
    color: 'from-pink-400 to-rose-400'
  },
  {
    id: 2,
    date: 'Our First Conversation',
    icon: MessageCircle,
    message: 'Words flowed like poetry, and I knew you were special',
    color: 'from-purple-400 to-pink-400'
  },
  {
    id: 3,
    date: 'First Time We Laughed Together',
    icon: Laugh,
    message: 'Your laughter became my favorite melody',
    color: 'from-blue-400 to-purple-400'
  },
  {
    id: 4,
    date: 'The Moment I Realized I Loved You',
    icon: Sparkles,
    message: 'My heart whispered your name, and I knew it was forever',
    color: 'from-rose-400 to-red-400'
  }
]

const LoveStoryTimeline = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

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
          Our Love Story
        </h2>
        <p className="text-xl text-white opacity-80">
          Every moment with you is a beautiful chapter
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-romantic-pink to-romantic-purple"></div>
          
          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            const isLeft = index % 2 === 0
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  isLeft ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-romantic-pink z-10"
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Card */}
                <motion.div
                  className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
                  onHoverStart={() => setFlippedCard(event.id)}
                  onHoverEnd={() => setFlippedCard(null)}
                >
                  <motion.div
                    className="glass-dark p-8 rounded-2xl cursor-pointer"
                    whileHover={{ scale: 1.05, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {event.date}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotateY: flippedCard === event.id ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div style={{ backfaceVisibility: 'hidden' }}>
                        <p className="text-white opacity-90 text-lg">
                          {event.message}
                        </p>
                      </div>
                      
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="text-center">
                          <Heart className="text-red-400 mx-auto mb-2" size={40} />
                          <p className="text-white font-semibold">
                            Forever cherished 💕
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LoveStoryTimeline
