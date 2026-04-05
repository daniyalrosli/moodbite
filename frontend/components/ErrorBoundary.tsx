'use client'

import React, { ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.resetError}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
