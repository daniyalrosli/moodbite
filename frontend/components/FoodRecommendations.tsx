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
        className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 p-8"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
            <span className="text-4xl">{getMoodEmoji(result.mood)}</span>
            <h2 className="text-3xl font-light text-slate-800 capitalize">
              {result.mood}
            </h2>
          </div>
          <p className="text-slate-600 font-light">
            Confidence: <span className="font-medium text-blue-600">{(result.confidence * 100).toFixed(1)}%</span>
          </p>
        </div>
      </motion.div>

      {/* Food Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-slate-800 mb-3">Recommended Foods</h2>
          <p className="text-slate-600 font-light">
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
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-md transition-all"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="font-medium text-lg text-slate-800 mb-3">
                {food.name}
              </h3>
              <p className="text-slate-600 text-sm mb-4 font-light leading-relaxed">
                {food.description}
              </p>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 font-light leading-relaxed">
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