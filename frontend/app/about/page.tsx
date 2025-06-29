'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Header from '../../components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light text-slate-800 mb-6">
            About Moodbite
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            An AI-powered platform that bridges emotional well-being and nutritional choices, 
            helping people make conscious, mood-appropriate food decisions.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-3">Share Your Mood</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Describe how you're feeling in natural language.
              </p>
            </div>

            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-3">AI Analysis</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Advanced NLP models analyze your emotional state.
              </p>
            </div>

            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-3">Get Recommendations</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Receive personalized food suggestions for your mood.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real-World Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light text-center mb-12 text-slate-800">Real-World Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <h3 className="text-xl font-medium mb-4 text-blue-600">Mental Health Support</h3>
              <p className="text-slate-600 mb-4 font-light leading-relaxed">
                Help individuals manage emotional eating patterns and develop healthier relationships with food.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 font-light">
                <li>• Reduce emotional eating</li>
                <li>• Improve mood awareness</li>
                <li>• Support mental wellness</li>
              </ul>
            </div>

            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <h3 className="text-xl font-medium mb-4 text-indigo-600">Workplace Wellness</h3>
              <p className="text-slate-600 mb-4 font-light leading-relaxed">
                Corporate wellness programs can help employees manage stress and maintain energy levels.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 font-light">
                <li>• Reduce workplace stress</li>
                <li>• Improve productivity</li>
                <li>• Enhance team morale</li>
              </ul>
            </div>

            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <h3 className="text-xl font-medium mb-4 text-purple-600">Healthcare Integration</h3>
              <p className="text-slate-600 mb-4 font-light leading-relaxed">
                Healthcare providers can recommend Moodbite for patients managing mood-related eating.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 font-light">
                <li>• Support treatment plans</li>
                <li>• Track mood patterns</li>
                <li>• Improve patient outcomes</li>
              </ul>
            </div>

            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
              <h3 className="text-xl font-medium mb-4 text-pink-600">Personal Development</h3>
              <p className="text-slate-600 mb-4 font-light leading-relaxed">
                Individuals can develop better self-awareness and make conscious food choices.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 font-light">
                <li>• Build emotional intelligence</li>
                <li>• Create healthy habits</li>
                <li>• Improve overall wellbeing</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl text-white shadow-sm"
        >
          <h2 className="text-3xl font-light mb-4">Ready to Transform Your Relationship with Food?</h2>
          <p className="text-xl mb-6 opacity-90 font-light">
            Start your journey towards mindful eating and emotional well-being today.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            Try Moodbite Now
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}