export interface FoodRecommendation {
  name: string
  description: string
  image: string
  category: string
  mood_benefit: string
}

export interface MoodAnalysisResult {
  mood: string
  confidence: number
  food_recommendations: FoodRecommendation[]
  timestamp: string
}

export interface HistoryItem {
  id: string
  text: string
  mood: string
  confidence: number
  food_recommendations: FoodRecommendation[]
  timestamp: string
} 