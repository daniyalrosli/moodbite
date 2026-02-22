'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MoodAnalysisResponse } from '../lib/api'

interface FoodRecommendationsProps {
  result: MoodAnalysisResponse
}

const getMoodEmoji = (mood: string) => {
  const emojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    stressed: '😫',
    tired: '😴',
    bored: '😐',
    excited: '🤩',
    neutral: '😌'
  }
  return emojis[mood.toLowerCase()] || '😌'
}

export default function FoodRecommendations({ result }: FoodRecommendationsProps) {
  const confidence = Math.round(result.confidence * 100)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Mood Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {getMoodEmoji(result.mood)}
        </motion.div>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white capitalize mb-2">
          {result.mood}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {confidence}% confidence
        </p>
      </motion.div>

      {/* Food Recommendations */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
          Recommended for you
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.food_recommendations.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-1">
                  {food.name}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                  {food.description}
                </p>
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-1">
                    Why it helps
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {food.mood_benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}