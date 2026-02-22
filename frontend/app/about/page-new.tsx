'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, Briefcase, Building2, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const Header: React.FC = () => (
  <header className="py-6">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-slate-800 dark:text-white">
        Moodbite
      </Link>
      <nav className="space-x-4 hidden sm:block">
        <Link href="/about" className="text-slate-600 dark:text-slate-300">About</Link>
        <Link href="/demo" className="text-slate-600 dark:text-slate-300">Demo</Link>
      </nav>
    </div>
  </header>
)

export default function AboutPage() {
  const steps = [
    {
      number: 1,
      title: "Share Your Mood",
      description: "Describe how you're feeling in natural language.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Advanced NLP models analyze your emotional state.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      title: "Get Recommendations",
      description: "Receive personalized food suggestions for your mood.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ]

  const applications = [
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Help individuals manage emotional eating patterns and develop healthier relationships with food.",
      benefits: ["Reduce emotional eating", "Improve mood awareness", "Support mental wellness"],
      gradient: "from-rose-500 to-pink-500",
      shadowColor: "shadow-rose-500/20"
    },
    {
      icon: Briefcase,
      title: "Workplace Wellness",
      description: "Corporate wellness programs can help employees manage stress and maintain energy levels.",
      benefits: ["Reduce workplace stress", "Improve productivity", "Enhance team morale"],
      gradient: "from-blue-500 to-indigo-500",
      shadowColor: "shadow-blue-500/20"
    },
    {
      icon: Building2,
      title: "Healthcare Integration",
      description: "Healthcare providers can recommend Moodbite for patients managing mood-related eating.",
      benefits: ["Support treatment plans", "Track mood patterns", "Improve patient outcomes"],
      gradient: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-500/20"
    },
    {
      icon: User,
      title: "Personal Development",
      description: "Individuals can develop better self-awareness and make conscious food choices.",
      benefits: ["Build emotional intelligence", "Create healthy habits", "Improve overall wellbeing"],
      gradient: "from-amber-500 to-orange-500",
      shadowColor: "shadow-amber-500/20"
    }
  ]

  const bgClass = "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300"

  return (
    <div className={bgClass}>
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            <span>Our Mission</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            About Moodbite
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An AI-powered platform that bridges emotional well-being and nutritional choices, 
            helping people make conscious, mood-appropriate food decisions.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Three simple steps to better food choices
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-World Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Real-World Applications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Discover how Moodbite can transform different aspects of life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl ${app.shadowColor} transition-all duration-300`}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <app.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${app.gradient} bg-clip-text text-transparent`}>
                      {app.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {app.description}
                    </p>
                    <ul className="space-y-2">
                      {app.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-200/50 dark:border-slate-700/50 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "AI", label: "Powered Analysis" },
                { value: "24/7", label: "Available" },
                { value: "100%", label: "Privacy Focused" },
                { value: "∞", label: "Possibilities" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-12 shadow-2xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transform Your Relationship with Food
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto">
                Start your journey towards mindful eating and emotional well-being today
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-colors shadow-xl"
                >
                  <span>Try Moodbite Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
