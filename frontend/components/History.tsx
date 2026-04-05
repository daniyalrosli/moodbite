'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Download, Loader2, Calendar } from 'lucide-react'
import { MoodAnalysisResponse } from '@/lib/api'

interface HistoryItem {
  id: string
  text: string
  mood: string
  confidence: number
  food_recommendations: Array<{
    name: string
  }>
  timestamp: string
}

interface HistoryProps {
  userId?: string
}

export default function History({ userId }: HistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      fetchHistory()
    }
  }, [userId])

  const fetchHistory = async () => {
    if (!userId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${userId}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch history')
      
      const data = await response.json()
      setHistory(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history')
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = async () => {
    if (!userId || !confirm('Are you sure you want to clear all history?')) return
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${userId}`,
        { method: 'DELETE' }
      )
      
      if (!response.ok) throw new Error('Failed to clear history')
      
      setHistory([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history')
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    setHistory(history.filter(item => item.id !== itemId))
  }

  const downloadHistory = () => {
    if (history.length === 0) return
    
    const csvContent = [
      ['Date', 'Text', 'Mood', 'Confidence', 'Foods'],
      ...history.map(item => [
        new Date(item.timestamp).toLocaleString(),
        item.text,
        item.mood,
        (item.confidence * 100).toFixed(0) + '%',
        item.food_recommendations.map(f => f.name).join(', ')
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'moodbite-history.csv'
    a.click()
  }

  if (!userId) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          Sign in to view your mood history
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
        <button
          onClick={fetchHistory}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          No mood analyses yet
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          Start analyzing your mood to build your history
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Mood History ({history.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={downloadHistory}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {item.mood === 'happy' ? '😊' :
                        item.mood === 'sad' ? '😢' :
                        item.mood === 'angry' ? '😠' :
                        item.mood === 'stressed' ? '😫' :
                        item.mood === 'anxious' ? '😰' :
                        item.mood === 'tired' ? '😴' :
                        item.mood === 'excited' ? '🤩' : '😌'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white capitalize">
                        {item.mood}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {item.text}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.food_recommendations.map((food, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                      >
                        {food.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {(item.confidence * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    confidence
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
