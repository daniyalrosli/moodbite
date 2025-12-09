'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Shield, MessageSquare, Utensils, Sparkles, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Link from 'next/link'

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = React.useState(0)
  
  const steps = [
    {
      number: "01",
      title: "Share Your Mood",
      description: "Tell us how you're feeling using natural language. Whether you're happy, stressed, tired, or excited - just type it out in your own words.",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/30"
    },
    {
      number: "02",
      title: "AI Analyzes Your Emotions",
      description: "Our advanced NLP model processes your text, understanding the nuances of your emotional state with high accuracy.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/30"
    },
    {
      number: "03",
      title: "Get Personalized Suggestions",
      description: "Based on your mood, we recommend foods that can help enhance your well-being and match your current emotional state.",
      icon: Utensils,
      color: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-500/30"
    },
    {
      number: "04",
      title: "Enjoy & Feel Better",
      description: "Try our recommendations and experience how the right food can positively impact your mood and energy levels.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
      shadowColor: "shadow-amber-500/30"
    }
  ]

  const techStack = [
    {
      category: "Frontend",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      icon: Code,
      color: "from-blue-500 to-indigo-500"
    },
    {
      category: "Backend",
      technologies: ["FastAPI", "Python", "Pydantic", "Uvicorn"],
      icon: Database,
      color: "from-emerald-500 to-teal-500"
    },
    {
      category: "AI/ML",
      technologies: ["Hugging Face", "PyTorch", "NLP Models", "Emotion AI"],
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Infrastructure",
      technologies: ["MongoDB", "REST APIs", "CORS", "Docker"],
      icon: Shield,
      color: "from-amber-500 to-orange-500"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            How It Works
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Moodbite uses cutting-edge AI to understand your emotions and recommend the perfect food for your mood
          </p>
        </motion.div>

        {/* Interactive Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24 max-w-5xl mx-auto"
        >
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              {steps.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeStep === idx 
                      ? 'text-white' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  {activeStep === idx && (
                    <motion.div
                      layoutId="activeStepBg"
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-xl`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{step.number}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-10">
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${steps[activeStep].color} rounded-full`}
                initial={{ width: '25%' }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Step Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-10 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`flex-shrink-0 w-24 h-24 bg-gradient-to-br ${steps[activeStep].color} rounded-3xl flex items-center justify-center shadow-xl ${steps[activeStep].shadowColor}`}
              >
                {React.createElement(steps[activeStep].icon, { className: "w-12 h-12 text-white" })}
              </motion.div>
              
              <div className="flex-1 text-center md:text-left">
                <span className={`inline-block text-sm font-bold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent mb-2`}>
                  STEP {steps[activeStep].number}
                </span>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  {steps[activeStep].title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-between mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`px-6 py-3 rounded-xl font-medium bg-gradient-to-r ${steps[activeStep].color} text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg ${steps[activeStep].shadowColor}`}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24 max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Powered by the latest frameworks and AI technology for the best experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center shadow-lg mb-4`}>
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">
                  {tech.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.technologies.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience the Magic?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto">
                Start analyzing your mood and discover personalized food recommendations
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-colors shadow-xl"
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
