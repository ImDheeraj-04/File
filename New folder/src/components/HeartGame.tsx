'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trophy, Play, RotateCcw, Sparkles } from 'lucide-react'

interface FallingHeart {
  id: number
  x: number
  speed: number
  size: number
}

const HeartGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([])
  const [highScore, setHighScore] = useState(0)

  // Generate random hearts
  const generateHeart = useCallback(() => {
    const newHeart: FallingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      speed: Math.random() * 3 + 2, // Speed between 2 and 5
      size: Math.random() * 30 + 20, // Size between 20 and 50
    }
    return newHeart
  }, [])

  // Start game
  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(30)
    setFallingHearts([])
  }

  // End game
  const endGame = () => {
    setGameState('ended')
    if (score > highScore) {
      setHighScore(score)
    }
  }

  // Catch heart
  const catchHeart = (heartId: number) => {
    if (gameState !== 'playing') return
    
    setFallingHearts(prev => prev.filter(heart => heart.id !== heartId))
    setScore(prev => prev + 1)
    
    // Visual feedback
    const heart = document.createElement('div')
    heart.innerHTML = '+1'
    heart.className = 'fixed text-green-400 font-bold text-2xl pointer-events-none z-50'
    heart.style.left = '50%'
    heart.style.top = '50%'
    heart.style.transform = 'translate(-50%, -50%)'
    document.body.appendChild(heart)
    
    setTimeout(() => heart.remove(), 1000)
  }

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame()
    }
  }, [timeLeft, gameState])

  // Generate falling hearts
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setFallingHearts(prev => {
          if (prev.length < 8) { // Max 8 hearts at once
            return [...prev, generateHeart()]
          }
          return prev
        })
      }, 800) // Generate heart every 800ms
      
      return () => clearInterval(interval)
    }
  }, [gameState, generateHeart])

  // Move hearts down
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setFallingHearts(prev => 
          prev.map(heart => ({
            ...heart,
            x: heart.x + (Math.random() - 0.5) * 2, // Slight horizontal movement
          }))
        )
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [gameState])

  // Remove hearts that fall off screen
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setFallingHearts(prev => prev.filter(heart => heart.x > 0 && heart.x < 100))
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [gameState])

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
          Catch My Heart
        </h2>
        <p className="text-xl text-white opacity-80">
          Can you catch all the falling hearts? 💕
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Game Stats */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="glass-dark px-6 py-3 rounded-full">
            <span className="text-white font-semibold">Score: {score}</span>
          </div>
          <div className="glass-dark px-6 py-3 rounded-full">
            <span className="text-white font-semibold">Time: {timeLeft}s</span>
          </div>
          <div className="glass-dark px-6 py-3 rounded-full">
            <span className="text-white font-semibold">Best: {highScore}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="heart-game-container glass-dark relative">
          {gameState === 'idle' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <Heart className="text-red-400" size={100} />
              </motion.div>
              
              <h3 className="text-3xl font-playfair text-white mb-4">
                Ready to Play?
              </h3>
              
              <p className="text-white opacity-80 mb-8">
                Catch as many hearts as you can in 30 seconds!
              </p>
              
              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-romantic-pink to-romantic-purple text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} />
                Start Game
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <div className="relative h-full">
              {/* Falling hearts */}
              <AnimatePresence>
                {fallingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ 
                      y: 400, 
                      opacity: 1,
                      x: `${heart.x}%`
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: heart.speed,
                      ease: 'linear'
                    }}
                    className="absolute cursor-pointer"
                    onClick={() => catchHeart(heart.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Heart 
                      size={heart.size} 
                      className="text-red-400 drop-shadow-lg"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.8))'
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Game instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white opacity-70 text-center">
                <p>Click the hearts to catch them!</p>
              </div>
            </div>
          )}

          {gameState === 'ended' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mb-8"
              >
                <Trophy className="text-yellow-400" size={100} />
              </motion.div>
              
              <h3 className="text-4xl font-playfair text-white mb-4">
                Game Over!
              </h3>
              
              <div className="text-6xl font-bold text-romantic-pink mb-4">
                {score}
              </div>
              
              <p className="text-white opacity-80 mb-8">
                Hearts caught! {score > highScore * 0.8 ? 'Amazing job! 🌟' : score > highScore * 0.5 ? 'Great work! 💕' : 'Good try! ❤️'}
              </p>

              {/* Special messages based on score */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 text-center"
              >
                {score >= 25 && (
                  <p className="text-2xl text-soft-pink font-bold">
                    You caught my heart! 💘
                  </p>
                )}
                {score >= 20 && score < 25 && (
                  <p className="text-xl text-soft-pink">
                    You're amazing at catching love! 💖
                  </p>
                )}
                {score >= 15 && score < 20 && (
                  <p className="text-xl text-soft-pink">
                    So many hearts caught! 💕
                  </p>
                )}
                {score < 15 && (
                  <p className="text-xl text-soft-pink">
                    Every heart counts! ❤️
                  </p>
                )}
              </motion.div>
              
              <div className="flex gap-4">
                <motion.button
                  onClick={startGame}
                  className="bg-gradient-to-r from-romantic-pink to-romantic-purple text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={20} />
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        {gameState === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="glass-dark p-6 rounded-2xl max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4">How to Play:</h4>
              <ul className="text-white opacity-80 space-y-2">
                <li>• Click on the falling hearts to catch them</li>
                <li>• Each heart caught gives you 1 point</li>
                <li>• You have 30 seconds to catch as many as possible</li>
                <li>• Try to beat your high score!</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default HeartGame
