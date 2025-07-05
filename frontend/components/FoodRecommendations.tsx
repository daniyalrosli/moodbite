import React from 'react'
import { motion } from 'framer-motion'
import { Utensils, Heart } from 'lucide-react'
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

export default function FoodRecommendations({ result }: FoodRecommendationsProps) {
  return (
    <div className="space-y-8">
      {/* Mood Analysis Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 p-8 transition-colors duration-300"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 mb-6 transition-colors duration-300">
            <span className="text-4xl">{getMoodEmoji(result.mood)}</span>
            <h2 className="text-3xl font-light text-slate-800 dark:text-white capitalize transition-colors duration-300">
              {result.mood}
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
            Confidence: <span className="font-medium text-blue-600 dark:text-blue-400">{(result.confidence * 100).toFixed(1)}%</span>
          </p>
        </div>
      </motion.div>

      {/* Food Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 p-8 transition-colors duration-300"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-3 transition-colors duration-300">Recommended Foods</h2>
          <p className="text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
            Here are some foods that might help with your current mood
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.food_recommendations.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 hover:shadow-md transition-all"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="font-medium text-lg text-slate-800 dark:text-white mb-3 transition-colors duration-300">
                {food.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 font-light leading-relaxed transition-colors duration-300">
                {food.description}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-light leading-relaxed transition-colors duration-300">
                    {food.mood_benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 