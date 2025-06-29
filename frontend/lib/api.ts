const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface MoodAnalysisRequest {
  text: string
  user_id?: string
}

export interface MoodAnalysisResponse {
  mood: string
  confidence: number
  food_recommendations: Array<{
    name: string
    description: string
    image: string
    category: string
    mood_benefit: string
  }>
  timestamp: string
}

export async function analyzeMood(request: MoodAnalysisRequest): Promise<MoodAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze-mood`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze mood')
  }

  return response.json()
}

export async function getHealth(): Promise<{ status: string; models_loaded: boolean }> {
  const response = await fetch(`${API_BASE_URL}/health`)
  
  if (!response.ok) {
    throw new Error('Health check failed')
  }

  return response.json()
} 