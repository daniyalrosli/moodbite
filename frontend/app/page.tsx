'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Loader2, Sparkles, Zap, Shield } from 'lucide-react'
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
      title: 'AI-Powered Analysis',
      description: 'Advanced NLP technology understands your emotional state with remarkable accuracy',
      gradient: 'from-blue-500 to-indigo-600',
      shadowColor: 'shadow-blue-500/30'
    },
    {
      icon: Heart,
      title: 'Personalized Picks',
      description: 'Food suggestions tailored to your mood that support your emotional well-being',
      gradient: 'from-rose-500 to-pink-600',
      shadowColor: 'shadow-rose-500/30'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your personalized recommendations in seconds with our fast processing',
      gradient: 'from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-500/30'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Food Recommendations</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="p-4 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 rounded-2xl shadow-xl shadow-pink-500/30"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              Moodbite
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the perfect food to match your mood. 
            Our AI analyzes your emotions and suggests personalized recommendations just for you.
          </motion.p>
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
                  className="inline-flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">
                      Analyzing your mood...
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Finding the perfect food matches for you
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center mt-8"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full mb-4">
                  <span className="text-2xl">😔</span>
                </div>
                <p className="text-red-700 dark:text-red-400 font-medium mb-1">Something went wrong</p>
                <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
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

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-28 max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Why Choose Moodbite?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Experience the future of personalized food recommendations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg ${feature.shadowColor} mb-6`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
} 