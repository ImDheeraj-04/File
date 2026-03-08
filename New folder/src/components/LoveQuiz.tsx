'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, CheckCircle, XCircle, Trophy, Sparkles } from 'lucide-react'

const quizQuestions = [
  {
    id: 1,
    question: 'Where did we first talk?',
    options: [
      'At the coffee shop',
      'Through text messages',
      'At the park',
      'During class'
    ],
    correct: 1,
    explanation: 'Our first conversation was through text messages!'
  },
  {
    id: 2,
    question: 'Who said "I love you" first?',
    options: [
      'You did',
      'I did',
      'We said it together',
      'Neither of us yet'
    ],
    correct: 1,
    explanation: 'I was the lucky one to say it first!'
  },
  {
    id: 3,
    question: 'What is your favorite thing about me?',
    options: [
      'My smile',
      'My kindness',
      'Everything',
      'My sense of humor'
    ],
    correct: 2,
    explanation: 'The correct answer is everything - I love all of you!'
  },
  {
    id: 4,
    question: 'When did we have our first date?',
    options: [
      'Last week',
      'Last month',
      'Two months ago',
      'Three months ago'
    ],
    correct: 2,
    explanation: 'Our first magical date was two months ago!'
  },
  {
    id: 5,
    question: 'What makes you happiest when we are together?',
    options: [
      'Watching movies',
      'Just being together',
      'Going on adventures',
      'Having deep conversations'
    ],
    correct: 1,
    explanation: 'Just being together is what makes our time special!'
  }
]

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correct ? score + 1 : score
    }, 0)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setShowExplanation(false)
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = (score / quizQuestions.length) * 100

    return (
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-dark rounded-3xl p-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Trophy className="text-yellow-400" size={80} />
            </motion.div>

            <h2 className="text-4xl font-playfair text-white mb-4">
              Quiz Complete!
            </h2>

            <div className="text-6xl font-bold text-romantic-pink mb-4">
              {score}/{quizQuestions.length}
            </div>

            <p className="text-xl text-white mb-8">
              You scored {percentage}%!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              {percentage === 100 && (
                <p className="text-2xl text-soft-pink font-bold">
                  Perfect! You know our love story perfectly! 💕
                </p>
              )}
              {percentage >= 80 && percentage < 100 && (
                <p className="text-xl text-soft-pink">
                  Amazing! You know our story so well! 🌟
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-xl text-soft-pink">
                  Great job! You remember many special moments! 💖
                </p>
              )}
              {percentage < 60 && (
                <p className="text-xl text-soft-pink">
                  Don't worry! Every moment with you is special regardless! ❤️
                </p>
              )}
            </motion.div>

            <motion.button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-romantic-pink to-romantic-purple text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>

            <div className="mt-8 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                >
                  <Heart className="text-red-400" size={20} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  const question = quizQuestions[currentQuestion]

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
          Love Quiz
        </h2>
        <p className="text-xl text-white opacity-80">
          How well do you know our love story?
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="glass-dark rounded-3xl p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-white mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-romantic-pink to-romantic-purple h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-playfair text-white mb-8 text-center">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index
                const isCorrect = index === question.correct
                const showCorrect = showExplanation

                return (
                  <motion.button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-2xl text-left transition-all ${
                      showExplanation
                        ? isCorrect
                          ? 'bg-green-500/30 border-2 border-green-400'
                          : isSelected
                          ? 'bg-red-500/30 border-2 border-red-400'
                          : 'bg-white/10 border-2 border-white/20'
                        : 'bg-white/10 border-2 border-white/20 hover:bg-white/20 cursor-pointer'
                    }`}
                    whileHover={!showExplanation ? { scale: 1.02 } : {}}
                    whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-white">{option}</span>
                      {showExplanation && (
                        <div>
                          {isCorrect && <CheckCircle className="text-green-400" size={24} />}
                          {isSelected && !isCorrect && <XCircle className="text-red-400" size={24} />}
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-4 bg-romantic-pink/20 rounded-2xl border border-romantic-pink/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-soft-pink" size={20} />
                    <span className="text-soft-pink font-semibold">Fun Fact:</span>
                  </div>
                  <p className="text-white">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {showExplanation && (
              <motion.button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LoveQuiz
