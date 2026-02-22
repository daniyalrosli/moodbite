'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Brain, Utensils, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Header: React.FC = () => (
  <header className="py-6">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Moodbite</h1>
      <nav>
        <Link href="/" className="text-sm text-neutral-600 dark:text-neutral-400">
          Home
        </Link>
      </nav>
    </div>
  </header>
)

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Share Your Mood',
      description: 'Tell us how you\'re feeling using natural language. Be as detailed or brief as you like.'
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced NLP model processes your text to understand your emotional state accurately.'
    },
    {
      number: '03',
      icon: Utensils,
      title: 'Get Recommendations',
      description: 'Receive personalized food suggestions that can help enhance your current mood.'
    }
  ]

  const techItems = [
    { label: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
    { label: 'Backend', items: ['FastAPI', 'Python', 'MongoDB'] },
    { label: 'AI/ML', items: ['Hugging Face', 'NLP Models', 'Emotion AI'] }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4 tracking-tight"
          >
            How It Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 max-w-md mx-auto"
          >
            Three simple steps to discover food that matches your mood.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Timeline */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-[calc(100%-3.5rem)] bg-neutral-200 dark:bg-neutral-800" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center">
                <step.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">
                  Step {step.number}
                </span>
                <h3 className="text-xl font-medium text-neutral-900 dark:text-white mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6 text-center">
            Built With
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {techItems.map((tech, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
              >
                <p className="text-xs font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-3">
                  {tech.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Try It Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Moodbite. Built with AI.
          </p>
        </div>
      </footer>
    </div>
  )
}
