'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Star, Infinity } from 'lucide-react'

const FinalSection = () => {
  const [glowIntensity, setGlowIntensity] = useState(0.5)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(Math.sin(Date.now() * 0.001) * 0.5 + 0.5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-sky via-romantic-purple to-romantic-pink opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0
            }}
            animate={{
              y: [null, '-20vh'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            <Star 
              className="text-white" 
              size={Math.random() * 15 + 5}
              style={{ filter: `brightness(${glowIntensity * 2})` }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center relative z-10 max-w-6xl mx-auto"
      >
        {/* Main message */}
        <motion.div
          className="mb-16"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-8">
            Hermynee, this is only Part 2.
          </h1>
          
          <motion.h2
            className="text-5xl md:text-7xl font-playfair font-bold text-soft-pink mb-12"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Our real story is still being written.
          </motion.h2>
        </motion.div>

        {/* Glowing heart */}
        <motion.div
          className="relative inline-block mb-16"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-red-400 rounded-full blur-3xl"
            animate={{ 
              opacity: glowIntensity,
              scale: 1 + glowIntensity * 0.3
            }}
            style={{
              width: '200px',
              height: '200px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <Heart 
            className="text-red-400 relative z-10"
            size={200}
            style={{
              filter: `drop-shadow(0 0 ${glowIntensity * 40}px rgba(255, 107, 157, ${glowIntensity}))`
            }}
          />
        </motion.div>

        {/* Promise message */}
        <motion.div
          className="glass-dark p-12 rounded-3xl max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <motion.p
              className="text-2xl text-white font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Every day with you is a new chapter in our beautiful story.
            </motion.p>
            
            <motion.p
              className="text-2xl text-white font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              We've laughed together, cried together, and grown together.
            </motion.p>
            
            <motion.p
              className="text-2xl text-white font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              And the best part? We're just getting started.
            </motion.p>
          </div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <Infinity className="text-romantic-pink" size={40} />
            <p className="text-3xl font-playfair text-romantic-pink font-bold">
              Forever & Always
            </p>
            <Infinity className="text-romantic-pink" size={40} />
          </motion.div>
        </motion.div>

        {/* Interactive elements */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Heart, text: "Endless Love", color: "text-red-400" },
            { icon: Sparkles, text: "Magic Moments", color: "text-yellow-400" },
            { icon: Star, text: "Bright Future", color: "text-blue-400" }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="glass p-8 rounded-2xl text-center"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <Icon className={`${item.color} mx-auto mb-4`} size={50} />
                </motion.div>
                <p className="text-white font-semibold text-lg">{item.text}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-4xl md:text-5xl font-playfair text-white mb-8">
            Thank you for being my everything.
          </p>
          
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="text-red-400" size={30} />
            <p className="text-2xl text-romantic-pink font-bold">
              I love you more than words can say
            </p>
            <Heart className="text-red-400" size={30} />
          </motion.div>
        </motion.div>

        {/* Floating hearts at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <Heart className="text-red-300" size={30} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default FinalSection
