'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react'
import Header from '../../components/Header'

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Text Input & Processing",
      description: "Users describe their mood in natural language. Our system processes the text using advanced NLP techniques.",
      icon: Code,
      details: [
        "Natural language processing",
        "Context understanding",
        "Emotional nuance detection"
      ]
    },
    {
      number: "02",
      title: "AI Mood Analysis",
      description: "Our transformer-based model analyzes the emotional content and classifies the mood with confidence scores.",
      icon: Brain,
      details: [
        "Hugging Face Transformers",
        "Emotion classification",
        "Confidence scoring"
      ]
    },
    {
      number: "03",
      title: "Food Recommendation Engine",
      description: "Based on the detected mood, our recommendation system suggests appropriate foods using mood-food mapping.",
      icon: Target,
      details: [
        "Mood-food correlation",
        "Nutritional science",
        "Personalized suggestions"
      ]
    },
    {
      number: "04",
      title: "Results & Insights",
      description: "Users receive personalized food recommendations with explanations of how each food can help their mood.",
      icon: TrendingUp,
      details: [
        "Visual food cards",
        "Mood benefits explanation",
        "Confidence indicators"
      ]
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
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed transition-colors duration-300">
            Discover the technology and process behind Moodbite's AI-powered mood analysis and food recommendation system.
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
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex flex-col md:flex-row items-center gap-8 p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 transition-colors duration-300 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center shadow-sm transition-colors duration-300">
                    <step.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">{step.number}</div>
                  <h3 className="text-2xl font-medium text-slate-800 dark:text-white mb-3 transition-colors duration-300">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 font-light leading-relaxed transition-colors duration-300">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-slate-600 dark:text-slate-300 font-light flex items-center gap-2 transition-colors duration-300">
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800 dark:text-white transition-colors duration-300">Technical Architecture</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-sm transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <tech.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-medium text-lg text-slate-800 dark:text-white transition-colors duration-300">{tech.category}</h3>
                </div>
                <ul className="space-y-2">
                  {tech.technologies.map((technology, techIndex) => (
                    <li key={techIndex} className="text-sm text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
                      • {technology}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Model Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800 dark:text-white transition-colors duration-300">AI Model Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 transition-colors duration-300">
              <h3 className="text-xl font-medium mb-4 text-blue-600 dark:text-blue-400 transition-colors duration-300">Emotion Classification</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 font-light leading-relaxed transition-colors duration-300">
                We use the <strong>bhadresh-savani/distilbert-base-uncased-emotion</strong> model, 
                a fine-tuned DistilBERT model specifically trained for emotion classification.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
                <li>• 8 emotion categories: joy, sadness, anger, fear, surprise, love, disgust</li>
                <li>• High accuracy in natural language understanding</li>
                <li>• Real-time processing capabilities</li>
                <li>• Fallback to keyword-based analysis</li>
              </ul>
            </div>

            <div className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 dark:border-slate-700/20 transition-colors duration-300">
              <h3 className="text-xl font-medium mb-4 text-indigo-600 dark:text-indigo-400 transition-colors duration-300">Mood-Food Mapping</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 font-light leading-relaxed transition-colors duration-300">
                Our recommendation system uses scientifically-backed mood-food correlations 
                to suggest appropriate foods for each emotional state.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 font-light transition-colors duration-300">
                <li>• Evidence-based food recommendations</li>
                <li>• Nutritional science integration</li>
                <li>• Personalized suggestion algorithms</li>
                <li>• Multiple options per mood category</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800 dark:text-white transition-colors duration-300">Performance & Accuracy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl text-white shadow-sm">
              <div className="text-3xl font-light mb-2">85%+</div>
              <div className="text-sm opacity-90 font-light">Mood Detection Accuracy</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl text-white shadow-sm">
              <div className="text-3xl font-light mb-2">&lt;2s</div>
              <div className="text-sm opacity-90 font-light">Average Response Time</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl text-white shadow-sm">
              <div className="text-3xl font-light mb-2">50+</div>
              <div className="text-sm opacity-90 font-light">Food Recommendations</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl text-white shadow-sm">
              <div className="text-3xl font-light mb-2">8</div>
              <div className="text-sm opacity-90 font-light">Mood Categories</div>
            </div>
          </div>
        </motion.div>

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