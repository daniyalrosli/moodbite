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

// Spotify Types
export interface SpotifyTrack {
  id: string
  name: string
  artist: string
  image_url?: string
  preview_url?: string
  external_url: string
  uri: string
  duration_ms: number
  explicit: boolean
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description?: string
  image_url?: string
  external_url: string
  total_tracks: number
  followers: number
  uri: string
}

export interface MusicRecommendation {
  mood: string
  tracks: SpotifyTrack[]
  playlists: SpotifyPlaylist[]
  timestamp: string
}

export interface FavoriteMusicTrack {
  id: string
  track_id: string
  track_name: string
  artist: string
  added_at: string
} 