import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, Heart, Sparkles, ChevronDown, ChevronUp, Star } from 'lucide-react'
import { MoodAnalysisResponse } from '../lib/api'

interface FoodRecommendationsProps {
  result: MoodAnalysisResponse
}

const getMoodEmoji = (mood: string) => {
  const emojis: { [key: string]: string } = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    stressed: '😰',
    tired: '😴',
    bored: '😐',
    excited: '🤩',
    neutral: '😐'
  }
  return emojis[mood.toLowerCase()] || '😐'
}

const getMoodGradient = (mood: string) => {
  const gradients: { [key: string]: string } = {
    happy: 'from-amber-400 to-orange-500',
    sad: 'from-blue-400 to-indigo-500',
    angry: 'from-red-400 to-rose-500',
    anxious: 'from-purple-400 to-pink-500',
    stressed: 'from-cyan-400 to-blue-500',
    tired: 'from-violet-400 to-purple-500',
    bored: 'from-slate-400 to-gray-500',
    excited: 'from-yellow-400 to-amber-500',
    neutral: 'from-slate-400 to-slate-500'
  }
  return gradients[mood.toLowerCase()] || 'from-blue-400 to-indigo-500'
}

export default function FoodRecommendations({ result }: FoodRecommendationsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <div className="space-y-8">
      {/* Mood Analysis Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300"
      >
        {/* Decorative background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getMoodGradient(result.mood)} opacity-5`} />
        
        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl mb-4"
            >
              {getMoodEmoji(result.mood)}
            </motion.div>
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${getMoodGradient(result.mood)} shadow-lg mb-4`}>
              <Sparkles className="w-5 h-5 text-white" />
              <h2 className="text-2xl font-bold text-white capitalize">
                {result.mood}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(result.confidence * 5)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {(result.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Food Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/30 mb-4"
          >
            <Utensils className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
            Perfect Foods for Your Mood
          </h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Handpicked recommendations to enhance your well-being
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.food_recommendations.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-600/50 shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-slate-900/40 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {food.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                  {food.description}
                </p>
                
                <motion.button
                  onClick={() => toggleCard(index)}
                  className="w-full"
                >
                  <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 transition-all duration-300 ${expandedCard === index ? 'ring-2 ring-blue-300 dark:ring-blue-700' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Mood Benefit</span>
                      </div>
                      {expandedCard === index ? (
                        <ChevronUp className="w-4 h-4 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <AnimatePresence>
                      {expandedCard === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-blue-600 dark:text-blue-300 mt-2 text-left leading-relaxed overflow-hidden"
                        >
                          {food.mood_benefit}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 