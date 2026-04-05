'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Loader2, BarChart3 } from 'lucide-react'

interface StatItem {
  mood: string
  count: number
  percentage: number
}

interface StatsProps {
  userId?: string
}

export default function MoodStats({ userId }: StatsProps) {
  const [stats, setStats] = useState<StatItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalAnalyses, setTotalAnalyses] = useState(0)
  const [avgConfidence, setAvgConfidence] = useState(0)

  useEffect(() => {
    if (userId) {
      fetchStats()
    }
  }, [userId])

  const fetchStats = async () => {
    if (!userId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${userId}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch stats')
      
      const data = await response.json()
      
      // Transform mood distribution to StatItem
      const moodEntries = Object.entries(data.mood_distribution || {})
      const total = moodEntries.reduce((sum, [_, count]) => sum + (count as number), 0)
      
      const statsArray = moodEntries
        .map(([mood, count]) => ({
          mood: mood as string,
          count: count as number,
          percentage: total > 0 ? ((count as number) / total) * 100 : 0
        }))
        .sort((a, b) => b.count - a.count)
      
      setStats(statsArray)
      setTotalAnalyses(data.total_analyses)
      setAvgConfidence(data.average_confidence)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      stressed: '😫',
      nervous: '😨',
      anxious: '😰',
      bored: '😐',
      excited: '🤩',
      neutral: '😌',
      tired: '😴'
    }
    return emojis[mood] || '😌'
  }

  if (!userId) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          Sign in to view your mood statistics
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  if (totalAnalyses === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400">
          No mood data yet
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Total Analyses
          </p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {totalAnalyses}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Average Confidence
          </p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {(avgConfidence * 100).toFixed(0)}%
          </p>
        </motion.div>
      </div>

      {/* Mood Distribution */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Mood Breakdown
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.mood}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{getMoodEmoji(stat.mood)}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-neutral-900 dark:text-white capitalize">
                        {stat.mood}
                      </span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {stat.count} ({stat.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
