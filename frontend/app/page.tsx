'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Clock, Target, Loader2 } from 'lucide-react'
import MoodAnalyzer from '../components/MoodAnalyzer'
import FoodRecommendations from '../components/FoodRecommendations'
import Header from '../components/Header'
import { analyzeMood, MoodAnalysisResponse } from '../lib/api'

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<MoodAnalysisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalysis = async (text: string) => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeMood({ text })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced NLP understands your emotions'
    },
    {
      icon: Target,
      title: 'Personalized',
      description: 'Tailored food suggestions for you'
    },
    {
      icon: Clock,
      title: 'Instant',
      description: 'Get recommendations in seconds'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Recommendations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-neutral-900 dark:text-white mb-4 tracking-tight"
          >
            Food that matches
            <br />
            your mood
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-12"
          >
            Tell us how you're feeling and we'll recommend the perfect food for you.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <feature.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {feature.title}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Analyzer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MoodAnalyzer onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-center"
            >
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              <FoodRecommendations result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Moodbite. 
          </p>
        </div>
      </footer>
    </div>
  )
}