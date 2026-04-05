'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { validateMoodInput, sanitizeInput } from '@/lib/validation'

interface MoodAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export default function MoodAnalyzer({ onAnalyze, isAnalyzing }: MoodAnalyzerProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    const validation = validateMoodInput(text)
    if (!validation.valid) {
      setError(validation.error || 'Invalid input')
      return
    }
    
    if (!isAnalyzing) {
      const sanitized = sanitizeInput(text)
      onAnalyze(sanitized)
    }
  }

  const suggestions = [
    "I'm feeling happy and energetic",
    "Stressed about deadlines",
    "A bit tired today",
    "Feeling anxious",
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setError(null)
            }}
            placeholder="How are you feeling right now?"
            rows={4}
            disabled={isAnalyzing}
            className="w-full px-4 py-4 text-base bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 focus:border-neutral-300 dark:focus:border-neutral-700 transition-all disabled:opacity-60"
          />
          <div className="absolute bottom-3 right-3 text-xs text-neutral-400">
            {text.length}/500
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={!text.trim() || isAnalyzing}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze Mood</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-3 text-center">
          Try an example
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setText(suggestion)}
              disabled={isAnalyzing}
              className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}