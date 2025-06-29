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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
            <h1 className="text-5xl md:text-7xl font-light text-slate-800">
              Moodbite
            </h1>
          </motion.div>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
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
                  <Loader2 className="w-8 h-8 text-slate-400" />
                  <span className="text-lg font-medium text-slate-600">
                    Analyzing your mood...
                  </span>
                </motion.div>
                <p className="text-slate-500 text-sm">
                  Our AI is processing your emotions and finding the perfect food matches
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center mt-8"
              >
                <p className="text-red-600 font-medium mb-2">Something went wrong</p>
                <p className="text-red-500 text-sm">{error}</p>
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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-3">Mood Analysis</h3>
            <p className="text-slate-600 leading-relaxed">
              Advanced AI technology understands your emotional state with high accuracy
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-3">Smart Recommendations</h3>
            <p className="text-slate-600 leading-relaxed">
              Personalized food suggestions that match your mood and support your wellbeing
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-3">Instant Results</h3>
            <p className="text-slate-600 leading-relaxed">
              Get your personalized recommendations in seconds with our fast AI processing
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 