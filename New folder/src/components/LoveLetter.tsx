'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Pen, Mail } from 'lucide-react'

const LoveLetter = () => {
  const [typedText, setTypedText] = useState('')
  const [showLetter, setShowLetter] = useState(false)
  
  const letterContent = `My dearest Hermynee,

I wanted to create something special just for you, something that could capture even a fraction of what you mean to me. You walked into my life like a beautiful dream, and every day since has been more magical than the last.

Your smile is my favorite sight in the world. Your laugh is the melody that my heart dances to. Your kindness is the warmth that comforts my soul. When I'm with you, I feel like I can conquer the world, because I know I have the most amazing person by my side.

Do you remember the little moments? The way you look at me when you think I'm not watching. The way your hand fits perfectly in mine. The way you make even the simplest days feel extraordinary. These are the treasures I hold close to my heart.

You are not just my girlfriend; you are my best friend, my confidant, my partner in crime, and my forever love. You've taught me what true love means, shown me patience I never knew I had, and given me a happiness I never thought possible.

This website is Part 2 of our story, but our real story is still being written, one beautiful day at a time. I can't wait to see all the chapters we'll create together.

I love you more than words can express, more than actions can show, and more than time can measure.

Forever yours,
Your loving boyfriend`

  useEffect(() => {
    if (showLetter && typedText.length < letterContent.length) {
      const timeout = setTimeout(() => {
        setTypedText(letterContent.slice(0, typedText.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [typedText, showLetter, letterContent])

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
          A Love Letter
        </h2>
        <p className="text-xl text-white opacity-80">
          Words from my heart to yours
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Envelope */}
          {!showLetter && (
            <motion.div
              className="glass-dark p-12 rounded-3xl cursor-pointer"
              onClick={() => setShowLetter(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="text-romantic-pink mx-auto mb-6" size={80} />
                </motion.div>
                <h3 className="text-3xl font-playfair text-white mb-4">
                  Click to Open Your Letter
                </h3>
                <p className="text-white opacity-80">
                  A special message awaits you inside
                </p>
              </div>
            </motion.div>
          )}

          {/* Letter */}
          {showLetter && (
            <motion.div
              className="bg-white rounded-3xl p-12 shadow-2xl relative"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Paper texture effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-50 to-transparent opacity-30 rounded-3xl"></div>
              
              {/* Letter header */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <Pen className="text-romantic-purple" size={24} />
                <h3 className="text-2xl font-playfair text-gray-800">
                  My Dearest Hermynee
                </h3>
              </div>

              {/* Letter content with typewriter effect */}
              <div className="relative z-10">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                  {typedText}
                  <motion.span
                    className="inline-block w-1 h-5 bg-romantic-purple ml-1"
                    animate={{ opacity: typedText.length < letterContent.length ? [1, 0, 1] : 0 }}
                    transition={{ duration: 0.5, repeat: typedText.length < letterContent.length ? Infinity : 0 }}
                  />
                </div>
              </div>

              {/* Signature */}
              {typedText.length === letterContent.length && (
                <motion.div
                  className="mt-8 text-center relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Heart className="text-red-500" size={20} />
                    <span className="text-xl font-playfair text-gray-800 italic">
                      Forever yours
                    </span>
                    <Heart className="text-red-500" size={20} />
                  </div>
                  <div className="text-2xl font-playfair text-romantic-purple">
                    Your loving boyfriend
                  </div>
                </motion.div>
              )}

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-romantic-pink opacity-20">
                <Heart size={40} />
              </div>
              <div className="absolute bottom-4 left-4 text-romantic-purple opacity-20">
                <Heart size={30} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LoveLetter
