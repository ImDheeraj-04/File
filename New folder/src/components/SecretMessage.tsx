'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, Heart, Key, Sparkles } from 'lucide-react'

const SecretMessage = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showError, setShowError] = useState(false)

  // The password is the anniversary date - you can change this
  const correctPassword = '2023-12-25' // Example: December 25, 2023

  const handleUnlock = () => {
    if (password === correctPassword) {
      setIsUnlocked(true)
      setShowError(false)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }

  const resetSecret = () => {
    setIsUnlocked(false)
    setPassword('')
    setShowPasswordInput(false)
    setShowError(false)
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
          Secret Message
        </h2>
        <p className="text-xl text-white opacity-80">
          A special message just for you
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {!showPasswordInput && !isUnlocked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => setShowPasswordInput(true)}
              className="glass-dark p-12 rounded-3xl w-full group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <Lock className="text-romantic-pink mb-6" size={80} />
                <h3 className="text-3xl font-playfair text-white mb-4 group-hover:text-romantic-pink transition-colors">
                  Open Secret Message
                </h3>
                <p className="text-white opacity-80">
                  Click to unlock a special surprise
                </p>
                <Key className="text-soft-pink mt-4" size={24} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {showPasswordInput && !isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-dark p-12 rounded-3xl"
          >
            <div className="max-w-md mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <Lock className="text-romantic-pink" size={60} />
              </motion.div>

              <h3 className="text-2xl font-playfair text-white mb-6 text-center">
                Enter the Password
              </h3>

              <p className="text-white opacity-80 mb-8 text-center">
                Hint: Our anniversary date (YYYY-MM-DD)
              </p>

              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                  placeholder="Enter password..."
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-romantic-pink transition-colors"
                />

                <AnimatePresence>
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-center"
                    >
                      Incorrect password. Try again! 💕
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleUnlock}
                    className="flex-1 bg-gradient-to-r from-romantic-pink to-romantic-purple text-white py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Unlock className="inline mr-2" size={20} />
                    Unlock
                  </motion.button>

                  <motion.button
                    onClick={resetSecret}
                    className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 1 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-gradient-to-br from-romantic-pink via-romantic-purple to-dream-blue p-16 rounded-3xl relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white opacity-20"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        scale: 0
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                    >
                      <Heart size={Math.random() * 30 + 10} />
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                  >
                    <Unlock className="text-white mx-auto mb-6" size={80} />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-4xl md:text-5xl font-playfair text-white font-bold mb-8"
                  >
                    You are the best thing that ever happened to me.
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="space-y-6 text-white text-lg"
                  >
                    <p className="max-w-2xl mx-auto">
                      Every day with you feels like a beautiful dream that I never want to wake up from. 
                      You've brought more love, joy, and happiness into my life than I ever thought possible.
                    </p>
                    
                    <p className="max-w-2xl mx-auto">
                      Your smile is my favorite sight, your laugh is my favorite sound, and your love is my 
                      greatest treasure. I am so grateful for every moment we share together.
                    </p>

                    <p className="max-w-2xl mx-auto font-semibold text-xl">
                      Thank you for being you, and for loving me the way you do.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="mt-12"
                  >
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <Sparkles className="text-soft-pink" size={30} />
                      <Heart className="text-red-400 animate-pulse" size={50} />
                      <Sparkles className="text-soft-pink" size={30} />
                    </div>

                    <p className="text-2xl font-playfair text-white italic">
                      Forever yours, always and forever 💕
                    </p>
                  </motion.div>

                  <motion.button
                    onClick={resetSecret}
                    className="mt-12 px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lock Message Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SecretMessage
