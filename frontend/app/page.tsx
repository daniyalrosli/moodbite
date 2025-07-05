'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="p-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full shadow-sm">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-slate-800 dark:text-white transition-colors duration-300">
              Moodbite
            </h1>
          </motion.div>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-300">
            Discover the perfect food to match your mood. 
            Our AI analyzes your emotions and suggests personalized recommendations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <MoodAnalyzer onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-flex items-center gap-4 mb-6"
                >
                  <Loader2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                  <span className="text-lg font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300">
                    Analyzing your mood...
                  </span>
                </motion.div>
                <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                  Our AI is processing your emotions and finding the perfect food matches
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-8 text-center mt-8 transition-colors duration-300"
              >
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">Something went wrong</p>
                <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12"
              >
                <FoodRecommendations result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Simple Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-24 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <Heart className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-3 transition-colors duration-300">Mood Analysis</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Advanced AI technology understands your emotional state with high accuracy
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <Heart className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-3 transition-colors duration-300">Smart Recommendations</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Personalized food suggestions that match your mood and support your wellbeing
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <Heart className="w-8 h-8 text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-3 transition-colors duration-300">Instant Results</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Get your personalized recommendations in seconds with our fast AI processing
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 