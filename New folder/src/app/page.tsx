'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import LoveStoryTimeline from '@/components/LoveStoryTimeline'
import LoveLetter from '@/components/LoveLetter'
import MemoryGallery from '@/components/MemoryGallery'
import WhyILoveYou from '@/components/WhyILoveYou'
import LoveQuiz from '@/components/LoveQuiz'
import SecretMessage from '@/components/SecretMessage'
import HeartGame from '@/components/HeartGame'
import FinalSection from '@/components/FinalSection'

export default function Home() {
  useEffect(() => {
    // Create star background
    const createStars = () => {
      const starsContainer = document.getElementById('stars')
      if (!starsContainer) return
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 3 + 's'
        starsContainer.appendChild(star)
      }
    }

    createStars()

    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Cleanup
    return () => {
      const starsContainer = document.getElementById('stars')
      if (starsContainer) {
        starsContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <LoveStoryTimeline />
      <LoveLetter />
      <MemoryGallery />
      <WhyILoveYou />
      <LoveQuiz />
      <SecretMessage />
      <HeartGame />
      <FinalSection />
    </main>
  )
}
