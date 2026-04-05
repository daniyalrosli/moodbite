'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Briefcase, GraduationCap, ArrowRight, Brain, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function AboutPage() {
  const useCases = [
    {
      icon: Heart,
      title: 'Personal Wellness',
      description: 'Develop healthier eating habits by understanding how food affects your mood.'
    },
    {
      icon: Users,
      title: 'Mental Health',
      description: 'Support emotional wellbeing through mindful food choices.'
    },
    {
      icon: Briefcase,
      title: 'Workplace',
      description: 'Help teams manage stress and maintain energy throughout the day.'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Explore the connection between nutrition and emotional health.'
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
            <span>About Moodbite</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 tracking-tight"
          >
            Food That Understands Your Emotions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
          >
            Moodbite combines artificial intelligence and nutritional science to recommend
            foods that match your emotional state, helping you nourish both body and mind.
          </motion.p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12">
            <div className="flex gap-4 mb-6">
              <Brain className="w-8 h-8 text-neutral-900 dark:text-white flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  Our Mission
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We believe that food is more than just sustenance—it's a powerful tool for
                  emotional wellbeing. Our mission is to help you make food choices that
                  support your mental health and emotional balance.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  By leveraging advanced AI and deep knowledge of nutrition, Moodbite creates
                  a personalized connection between your emotions and your meals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-neutral-900 dark:text-white mb-8 text-center"
          >
            Who It's For
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white mb-10 text-center">
            The Technology Behind Moodbite
          </h2>

          <div className="space-y-6">
            {[
              {
                title: 'Advanced NLP',
                description:
                  'We use state-of-the-art natural language processing to accurately detect your emotional state from text, understanding nuanced feelings and context.',
                delay: 0
              },
              {
                title: 'Nutritional Intelligence',
                description:
                  'Our food recommendations are grounded in nutritional science, selecting foods known to support specific emotional states through their chemical properties.',
                delay: 0.1
              },
              {
                title: 'Personalization',
                description:
                  'Over time, your mood history helps us understand your preferences and refine our recommendations to be more tailored to you.',
                delay: 0.2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            Ready to discover food that matches your mood?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Get Started
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