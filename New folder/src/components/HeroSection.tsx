'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, Music } from 'lucide-react'

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const loveMessages = [
    "You are my sunshine on a cloudy day",
    "Your smile lights up my world",
    "Every moment with you is a treasure",
    "You make my heart skip a beat",
    "Together we create magic"
  ]

  useEffect(() => {
    const currentMessage = loveMessages[currentTextIndex]
    if (typedText.length < currentMessage.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentMessage.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setTypedText('')
        setCurrentTextIndex((prev) => (prev + 1) % loveMessages.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [typedText, currentTextIndex])

  useEffect(() => {
    // Create floating hearts
    const createFloatingHeart = () => {
      const heart = document.createElement('div')
      heart.innerHTML = '💕'
      heart.className = 'floating-heart'
      heart.style.left = Math.random() * 100 + '%'
      heart.style.fontSize = (Math.random() * 20 + 20) + 'px'
      heart.style.color = ['#ff6b9d', '#c44569', '#ffeaa7'][Math.floor(Math.random() * 3)]
      document.body.appendChild(heart)
      
      setTimeout(() => heart.remove(), 4000)
    }

    const interval = setInterval(createFloatingHeart, 3000)
    return () => clearInterval(interval)
  }, [])

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control actual audio here
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-sky via-dream-blue to-romantic-pink opacity-50"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 glow-text"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Hermynee, My Forever Love
          <motion.span
            className="inline-block ml-4 text-red-400"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-white mb-8 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          This is Part 2 of our story...
        </motion.p>

        <motion.div
          className="text-xl md:text-2xl text-soft-pink mb-12 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {typedText}
          <motion.span
            className="inline-block w-1 h-6 bg-white ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>

        <motion.button
          onClick={toggleMusic}
          className="glass px-6 py-3 rounded-full text-white flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          <Music size={20} />
          <span>{isPlaying ? 'Pause' : 'Play'} Background Music</span>
        </motion.button>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="text-white opacity-70" size={30} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
