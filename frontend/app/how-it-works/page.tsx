'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react'
import Header from '../../components/Header'

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    {
      number: "01",
      title: "Share Your Mood",
      description: "Tell us how you feel in a few words.",
      icon: Code,
    },
    {
      number: "02",
      title: "Get Your Mood Analyzed",
      description: "Our AI quickly understands your mood.",
      icon: Brain,
    },
    {
      number: "03",
      title: "See Food Suggestions",
      description: "We recommend foods that match your mood.",
      icon: Target,
    },
    {
      number: "04",
      title: "Enjoy & Feel Better!",
      description: "Try the foods and see how you feel.",
      icon: TrendingUp,
    }
  ]

  const techStack = [
    {
      category: "Frontend",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      icon: Code
    },
    {
      category: "Backend",
      technologies: ["FastAPI", "Python", "Pydantic", "Motor (MongoDB)", "Uvicorn"],
      icon: Database
    },
    {
      category: "AI/ML",
      technologies: ["Hugging Face Transformers", "PyTorch", "NLP Models", "Emotion Classification"],
      icon: Brain
    },
    {
      category: "Infrastructure",
      technologies: ["MongoDB", "RESTful APIs", "CORS", "Environment Variables"],
      icon: Shield
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light text-slate-800 dark:text-white mb-6 transition-colors duration-300">
            How It Works
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-300">
            Moodbite makes it easy to get food suggestions based on your mood. Just tell us how you feel, and we’ll do the rest!
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800 dark:text-white transition-colors duration-300">The Process</h2>
          <div className="space-y-8">
            {/* Interactive Stepper */}
            <div className="flex justify-center mb-8">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  className={`mx-2 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors duration-200
                    ${activeStep === idx ? 'bg-blue-600 text-white border-blue-600 scale-110' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50 hover:scale-105'}`}
                  onClick={() => setActiveStep(idx)}
                  aria-label={`Go to step ${step.number}`}
                >
                  {step.number}
                </button>
              ))}
            </div>
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-8">
              <div className="h-2 bg-blue-100 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            {/* Animated Step Card */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-lg border border-blue-100 dark:border-blue-900 transition-colors duration-300 hover:shadow-xl"
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center shadow-sm transition-colors duration-300">
                  {React.createElement(steps[activeStep].icon, { className: "w-12 h-12 text-blue-600 dark:text-blue-400" })}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">{steps[activeStep].number}</div>
                <h3 className="text-2xl font-medium text-slate-800 dark:text-white mb-3 transition-colors duration-300">{steps[activeStep].title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 font-light leading-relaxed transition-colors duration-300">{steps[activeStep].description}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Architecture */}
  {/* ...existing code... */}

        {/* AI Model Details */}
  {/* ...existing code... */}

        {/* Performance Metrics */}
  {/* ...existing code... */}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center p-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl text-white shadow-sm"
        >
          <h2 className="text-3xl font-light mb-4">Ready to Experience the Magic?</h2>
          <p className="text-xl mb-6 opacity-90 font-light">
            Try our AI-powered mood analysis and discover personalized food recommendations.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            Start Analyzing Your Mood
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
} 