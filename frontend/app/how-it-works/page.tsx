'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Brain, Utensils, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Share Your Mood',
      description: "Tell us how you're feeling using natural language. Be as detailed or brief as you like. Just type what's on your mind."
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced NLP model processes your text to understand your emotional state accurately, identifying key emotions and nuances.'
    },
    {
      number: '03',
      icon: Utensils,
      title: 'Get Recommendations',
      description: 'Receive personalized food suggestions that can help enhance your current mood using nutritional science.'
    }
  ]

  const techItems = [
    {
      label: 'Frontend',
      items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      label: 'Backend',
      items: ['FastAPI', 'Python', 'MongoDB', 'Async/Await']
    },
    {
      label: 'AI/ML',
      items: ['Hugging Face', 'Transformers', 'DistilBERT', 'NLP']
    }
  ]

  const features = [
    {
      title: 'Real-time Detection',
      description: 'Instant mood analysis powered by transformer-based neural networks'
    },
    {
      title: 'Personalized Results',
      description: 'Recommendations tailored to your emotional state and preferences'
    },
    {
      title: 'Save & Track',
      description: 'Keep track of your mood patterns and food preferences over time'
    },
    {
      title: 'Science-Backed',
      description: 'Recommendations grounded in nutritional psychology research'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>How It Works</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6"
          >
            Three Simple Steps to Better Food Choices
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 dark:text-neutral-400"
          >
            Our AI understands your emotions and recommends foods that can naturally support your mood and wellbeing.
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
              {/* Timeline connector */}
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

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-neutral-900 dark:text-white mb-10 text-center"
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mb-20"
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
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Try Moodbite Now
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