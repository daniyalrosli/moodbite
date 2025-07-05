import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface MoodAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export default function MoodAnalyzer({ onAnalyze, isAnalyzing }: MoodAnalyzerProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text.trim())
    }
  }

  const exampleTexts = [
    "I feel really happy today!",
    "I'm feeling a bit down and tired",
    "I'm so stressed about work",
    "I'm excited about the weekend",
    "I feel anxious about the meeting"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 p-8 transition-colors duration-300"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-3 transition-colors duration-300">How are you feeling?</h2>
        <p className="text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
          Describe your mood and we'll find the perfect food to match it
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us how you're feeling... (e.g., 'I feel tired and a bit down today')"
            className="w-full h-32 p-6 border border-slate-200 dark:border-slate-600 rounded-2xl resize-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600 transition-all bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-light"
            disabled={isAnalyzing}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white py-4 px-8 rounded-2xl font-medium hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyze My Mood
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 text-center transition-colors duration-300">Try these examples:</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {exampleTexts.map((example, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setText(example)}
              disabled={isAnalyzing}
              className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-full transition-colors disabled:opacity-50 font-light"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 