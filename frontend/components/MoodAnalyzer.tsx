import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, MessageCircle } from 'lucide-react'

interface MoodAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export default function MoodAnalyzer({ onAnalyze, isAnalyzing }: MoodAnalyzerProps) {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text.trim())
    }
  }

  const exampleTexts = [
    { text: "I feel really happy today!", emoji: "😊" },
    { text: "I'm feeling a bit down and tired", emoji: "😔" },
    { text: "I'm so stressed about work", emoji: "😰" },
    { text: "I'm excited about the weekend", emoji: "🎉" },
    { text: "I feel anxious about the meeting", emoji: "😟" }
  ]

  const characterCount = text.length
  const maxCharacters = 500

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border transition-all duration-300 ${
        isFocused 
          ? 'border-blue-300 dark:border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30' 
          : 'border-slate-200/50 dark:border-slate-700/50'
      }`}
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl pointer-events-none" />
      
      <div className="relative p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
            How are you feeling?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Share your mood and we'll find the perfect food match
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, maxCharacters))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Tell us how you're feeling today..."
              className="w-full h-36 p-5 border-2 border-slate-200 dark:border-slate-600 rounded-2xl resize-none focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-all bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-lg"
              disabled={isAnalyzing}
            />
            <div className="absolute bottom-3 right-4 text-xs text-slate-400 dark:text-slate-500">
              {characterCount}/{maxCharacters}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            whileHover={{ scale: text.trim() && !isAnalyzing ? 1.02 : 1 }}
            whileTap={{ scale: text.trim() && !isAnalyzing ? 0.98 : 1 }}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 disabled:shadow-none"
          >
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span>Analyzing your mood...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  <span>Analyze My Mood</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">
            Or try one of these examples:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {exampleTexts.map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setText(example.text)}
                disabled={isAnalyzing}
                className="group px-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl transition-all disabled:opacity-50 border border-transparent hover:border-slate-300 dark:hover:border-slate-500 shadow-sm hover:shadow"
              >
                <span className="mr-2">{example.emoji}</span>
                <span className="font-medium">{example.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 