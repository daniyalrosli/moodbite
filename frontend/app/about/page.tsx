'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Briefcase, GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Header: React.FC = () => (
  <header className="container mx-auto px-4 py-6">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Moodbite</h1>
      <nav>
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:underline">Home</Link>
      </nav>
    </div>
  </header>
)

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
      title: 'Research',
      description: 'Explore the connection between nutrition and emotional health.'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 tracking-tight"
          >
            About Moodbite
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
          >
            Moodbite is an AI-powered platform that helps you discover the connection 
            between your emotions and food. We believe that what you eat can positively 
            influence how you feel.
          </motion.p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="p-8 md:p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              To bridge the gap between emotional well-being and nutrition. 
              By understanding how you feel, we can suggest foods that not only 
              satisfy your cravings but also support your mental and physical health.
            </p>
          </div>
        </motion.div>

        {/* Use Cases */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-8 text-center">
            Who It's For
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
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
