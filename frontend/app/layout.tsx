import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moodbite - AI-Powered Mood Analysis & Food Recommendations',
  description: 'Analyze your mood and get personalized food recommendations that match your emotional state.',
  keywords: 'mood analysis, food recommendations, AI, emotional eating, wellness',
  authors: [{ name: 'Moodbite Team' }],
  openGraph: {
    title: 'Moodbite - AI-Powered Mood Analysis & Food Recommendations',
    description: 'Analyze your mood and get personalized food recommendations that match your emotional state.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
} 