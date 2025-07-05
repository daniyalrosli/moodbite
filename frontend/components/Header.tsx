'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/lib/theme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-b border-white/20 dark:border-slate-700/20 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl shadow-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-light text-slate-800 dark:text-white transition-colors duration-300">
                Moodbite
              </h1>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-light"
              >
                Home
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-light"
              >
                How It Works
              </Link>
              <Link 
                href="/about" 
                className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-light"
              >
                About
              </Link>
            </nav>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            
            <a
              href="https://github.com/yourusername/moodbite"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  )
} 