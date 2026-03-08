'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, Smile, Sun, Music, Coffee, Gift } from 'lucide-react'

const loveReasons = [
  {
    id: 1,
    title: 'Your Beautiful Smile',
    description: 'It lights up my entire world and makes everything better',
    icon: Smile,
    color: 'from-yellow-400 to-orange-400',
    backMessage: 'Your smile is my sunshine'
  },
  {
    id: 2,
    title: 'Your Kind Heart',
    description: 'The way you care for others and show compassion',
    icon: Heart,
    color: 'from-pink-400 to-rose-400',
    backMessage: 'Your heart is pure gold'
  },
  {
    id: 3,
    title: 'Your Beautiful Blonde Hair',
    description: 'It shines like gold and frames your perfect face',
    icon: Sparkles,
    color: 'from-amber-400 to-yellow-400',
    backMessage: 'More beautiful than sunshine'
  },
  {
    id: 4,
    title: 'The Way You Make Me Feel Safe',
    description: 'With you, I feel like I can conquer anything',
    icon: Sun,
    color: 'from-blue-400 to-cyan-400',
    backMessage: 'You are my safe harbor'
  },
  {
    id: 5,
    title: 'Your Laugh',
    description: 'The most beautiful sound in the entire world',
    icon: Music,
    color: 'from-purple-400 to-pink-400',
    backMessage: 'Music to my ears'
  },
  {
    id: 6,
    title: 'Your Intelligence',
    description: 'The way you think and see the world inspires me',
    icon: Star,
    color: 'from-indigo-400 to-purple-400',
    backMessage: 'Brilliant in every way'
  },
  {
    id: 7,
    title: 'Your Strength',
    description: 'You handle everything with such grace and power',
    icon: Sun,
    color: 'from-red-400 to-pink-400',
    backMessage: 'Stronger than you know'
  },
  {
    id: 8,
    title: 'Your Playful Side',
    description: 'The way you bring fun and joy into my life',
    icon: Sparkles,
    color: 'from-green-400 to-blue-400',
    backMessage: 'Forever young at heart'
  },
  {
    id: 9,
    title: 'Your Support',
    description: 'You always believe in me, even when I doubt myself',
    icon: Heart,
    color: 'from-teal-400 to-green-400',
    backMessage: 'My biggest supporter'
  },
  {
    id: 10,
    title: 'Your Love',
    description: 'The way you love me makes me want to be a better person',
    icon: Gift,
    color: 'from-rose-400 to-red-400',
    backMessage: 'The greatest gift of all'
  },
  {
    id: 11,
    title: 'Your Eyes',
    description: 'I get lost in them every single time',
    icon: Star,
    color: 'from-blue-500 to-purple-500',
    backMessage: 'Windows to your beautiful soul'
  },
  {
    id: 12,
    title: 'Your Voice',
    description: 'It calms my soul and makes everything okay',
    icon: Music,
    color: 'from-pink-500 to-rose-500',
    backMessage: 'The sweetest melody'
  }
]

const WhyILoveYou = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const toggleCard = (id: number) => {
    setFlippedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    )
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
          Why I Love You
        </h2>
        <p className="text-xl text-white opacity-80">
          So many reasons, but here are my favorites
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loveReasons.map((reason, index) => {
          const Icon = reason.icon
          const isFlipped = flippedCards.includes(reason.id)

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flip-card h-64"
              onClick={() => toggleCard(reason.id)}
            >
              <motion.div
                className="flip-card-inner relative w-full h-full cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div 
                  className="flip-card-front absolute inset-0 glass-dark rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${reason.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="text-white" size={32} />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {reason.title}
                  </h3>
                  
                  <p className="text-white opacity-80 text-sm">
                    {reason.description}
                  </p>
                  
                  <motion.div
                    className="mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="text-red-400" size={20} />
                  </motion.div>
                </div>

                {/* Back of card */}
                <div 
                  className="flip-card-back absolute inset-0 bg-gradient-to-br from-romantic-pink to-romantic-purple rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Heart className="text-white mb-4" size={40} />
                    <p className="text-2xl font-playfair text-white font-bold">
                      {reason.backMessage}
                    </p>
                    <p className="text-white opacity-80 mt-2 text-sm">
                      Click to flip back
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating hearts animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400 opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50
            }}
            animate={{
              y: -100,
              x: Math.random() * 200 - 100,
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            <Heart size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default WhyILoveYou
