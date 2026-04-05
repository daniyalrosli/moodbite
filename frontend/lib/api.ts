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

// Mood keywords for client-side detection
const moodKeywords: Record<string, string[]> = {
  happy: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'good', 'awesome', 'blessed', 'grateful', 'cheerful', 'delighted', 'thrilled', 'ecstatic', 'elated'],
  sad: ['sad', 'down', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'lonely', 'disappointed', 'hopeless', 'gloomy', 'melancholy', 'blue', 'upset', 'crying'],
  stressed: ['stressed', 'overwhelmed', 'pressure', 'deadline', 'busy', 'overworked', 'burnout', 'exhausted', 'swamped', 'hectic', 'frantic', 'tense'],
  anxious: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'scared', 'uneasy', 'restless', 'apprehensive', 'dread', 'uncertain', 'overthinking'],
  tired: ['tired', 'exhausted', 'sleepy', 'fatigued', 'drained', 'worn out', 'weary', 'low energy', 'sluggish', 'lethargic', 'drowsy'],
  angry: ['angry', 'furious', 'mad', 'irritated', 'annoyed', 'frustrated', 'rage', 'pissed', 'hostile', 'agitated', 'bitter', 'resentful'],
  bored: ['bored', 'boring', 'nothing to do', 'uninterested', 'dull', 'monotonous', 'restless', 'uninspired'],
  excited: ['excited', 'thrilled', 'pumped', 'eager', 'enthusiastic', 'hyped', 'looking forward', 'cant wait', 'stoked']
}

// Food recommendations by mood
const foodByMood: Record<string, MoodAnalysisResponse['food_recommendations']> = {
  happy: [
    { name: 'Fresh Fruit Bowl', description: 'A colorful mix of seasonal fruits to celebrate your good mood', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400', category: 'healthy', mood_benefit: 'Vitamins and natural sugars keep your energy and mood elevated' },
    { name: 'Dark Chocolate', description: 'Rich, indulgent dark chocolate for a sweet treat', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', category: 'treat', mood_benefit: 'Releases endorphins and enhances feelings of happiness' },
    { name: 'Smoothie Bowl', description: 'Vibrant acai or berry smoothie bowl with toppings', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', category: 'healthy', mood_benefit: 'Antioxidants support brain health and sustained happiness' }
  ],
  sad: [
    { name: 'Warm Soup', description: 'Comforting chicken soup or tomato bisque', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'comfort', mood_benefit: 'Warm foods provide comfort and can boost serotonin levels' },
    { name: 'Mac and Cheese', description: 'Creamy, cheesy comfort in every bite', image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400', category: 'comfort', mood_benefit: 'Comfort foods trigger positive memories and feelings of security' },
    { name: 'Salmon', description: 'Omega-3 rich salmon with vegetables', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', category: 'healthy', mood_benefit: 'Omega-3 fatty acids help combat depression and improve mood' }
  ],
  stressed: [
    { name: 'Green Tea', description: 'Calming matcha or green tea latte', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400', category: 'beverage', mood_benefit: 'L-theanine promotes relaxation without drowsiness' },
    { name: 'Avocado Toast', description: 'Whole grain toast with fresh avocado', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400', category: 'healthy', mood_benefit: 'B vitamins and healthy fats reduce stress hormones' },
    { name: 'Nuts & Seeds', description: 'Mixed almonds, walnuts, and pumpkin seeds', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', category: 'snack', mood_benefit: 'Magnesium helps relax muscles and calm the nervous system' }
  ],
  anxious: [
    { name: 'Chamomile Tea', description: 'Soothing chamomile with honey', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400', category: 'beverage', mood_benefit: 'Natural calming properties reduce anxiety symptoms' },
    { name: 'Oatmeal', description: 'Warm oatmeal with berries and honey', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400', category: 'comfort', mood_benefit: 'Complex carbs boost serotonin for a calming effect' },
    { name: 'Yogurt Parfait', description: 'Greek yogurt with granola and fruits', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', category: 'healthy', mood_benefit: 'Probiotics support gut-brain connection and reduce anxiety' }
  ],
  tired: [
    { name: 'Coffee', description: 'Fresh brewed coffee or espresso', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', category: 'beverage', mood_benefit: 'Caffeine blocks adenosine and increases alertness' },
    { name: 'Banana', description: 'Fresh banana or banana smoothie', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', category: 'healthy', mood_benefit: 'Natural sugars and potassium provide quick energy boost' },
    { name: 'Eggs', description: 'Protein-packed eggs any style', image: 'https://images.unsplash.com/photo-1551185618-782b28cb7820?w=400', category: 'protein', mood_benefit: 'High protein stabilizes blood sugar and maintains energy' }
  ],
  angry: [
    { name: 'Crunchy Snacks', description: 'Carrots, celery, or crispy chips', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400', category: 'snack', mood_benefit: 'Crunching helps release tension and frustration' },
    { name: 'Spicy Food', description: 'Spicy tacos or hot wings', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', category: 'spicy', mood_benefit: 'Capsaicin releases endorphins that improve mood' },
    { name: 'Ice Cream', description: 'Cool, creamy ice cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', category: 'treat', mood_benefit: 'Cold treats help cool down heated emotions' }
  ],
  bored: [
    { name: 'Cooking Project', description: 'Try making homemade pizza or pasta', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', category: 'activity', mood_benefit: 'Cooking engages creativity and gives a sense of accomplishment' },
    { name: 'Exotic Fruit', description: 'Try dragon fruit, passion fruit, or mango', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400', category: 'healthy', mood_benefit: 'New flavors stimulate the senses and spark interest' },
    { name: 'Fancy Beverage', description: 'Make a mocktail or specialty coffee', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', category: 'beverage', mood_benefit: 'Creating something special adds excitement to your day' }
  ],
  excited: [
    { name: 'Celebration Cake', description: 'Slice of your favorite cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', category: 'treat', mood_benefit: 'Sweet treats enhance celebratory feelings' },
    { name: 'Champagne or Sparkling', description: 'Bubbly drink to match your mood', image: 'https://images.unsplash.com/photo-1546171753-e89e0a9c95f2?w=400', category: 'beverage', mood_benefit: 'Bubbles literally lift your spirits higher' },
    { name: 'Sushi', description: 'Fresh sushi platter for a special treat', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', category: 'special', mood_benefit: 'Special foods make exciting moments even more memorable' }
  ],
  neutral: [
    { name: 'Balanced Meal', description: 'Grilled chicken with vegetables and rice', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', category: 'healthy', mood_benefit: 'Balanced nutrition maintains stable mood and energy' },
    { name: 'Fresh Salad', description: 'Colorful garden salad with vinaigrette', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', category: 'healthy', mood_benefit: 'Light, fresh foods keep you feeling good' },
    { name: 'Sandwich', description: 'Classic deli sandwich on fresh bread', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', category: 'classic', mood_benefit: 'Familiar favorites provide comfort and satisfaction' }
  ]
}

// Client-side mood detection
function detectMood(text: string): { mood: string; confidence: number } {
  const lowerText = text.toLowerCase()
  const scores: Record<string, number> = {}
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    scores[mood] = 0
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        scores[mood]++
      }
    }
  }
  
  const maxMood = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)
  
  if (maxMood[1] === 0) {
    return { mood: 'neutral', confidence: 0.6 }
  }
  
  const confidence = Math.min(0.95, 0.6 + (maxMood[1] * 0.1))
  return { mood: maxMood[0], confidence }
}

// Client-side analysis fallback
function analyzeLocally(text: string): MoodAnalysisResponse {
  const { mood, confidence } = detectMood(text)
  const recommendations = foodByMood[mood] || foodByMood.neutral
  
  return {
    mood,
    confidence,
    food_recommendations: recommendations,
    timestamp: new Date().toISOString()
  }
}

export async function analyzeMood(request: MoodAnalysisRequest): Promise<MoodAnalysisResponse> {
  // Try backend first, fall back to client-side
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/analyze-mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Backend error')
    }

    return response.json()
  } catch (error) {
    // Fall back to client-side analysis
    console.log('Using client-side mood analysis')
    return analyzeLocally(request.text)
  }
}

export async function getHealth(): Promise<{ status: string; models_loaded: boolean }> {
  const response = await fetch(`${API_BASE_URL}/health`)
  
  if (!response.ok) {
    throw new Error('Health check failed')
  }

  return response.json()
}

// Spotify Music API Integration
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

export interface MusicRecommendationResponse {
  mood: string
  tracks: SpotifyTrack[]
  playlists: SpotifyPlaylist[]
  timestamp: string
}

export async function getMusicRecommendations(
  mood: string,
  limit: number = 10
): Promise<MusicRecommendationResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/music/recommendations/${encodeURIComponent(mood)}?limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch music recommendations')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching music recommendations:', error)
    // Return empty response instead of crashing
    return {
      mood,
      tracks: [],
      playlists: [],
      timestamp: new Date().toISOString()
    }
  }
}

export async function getPlaylistsForMood(
  mood: string,
  limit: number = 5
): Promise<{ mood: string; playlists: SpotifyPlaylist[]; count: number }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/music/playlists/${encodeURIComponent(mood)}?limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch playlists')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return {
      mood,
      playlists: [],
      count: 0
    }
  }
}

export async function getMusicGenres(): Promise<{
  mood_genres: Record<string, { genres: string[]; description: string }>
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/music/genres`)

    if (!response.ok) {
      throw new Error('Failed to fetch genres')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching genres:', error)
    return { mood_genres: {} }
  }
}

export async function saveFavoriteTrack(
  userId: string,
  trackId: string,
  trackName: string,
  artist: string
): Promise<{ message: string; id: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/favorites-music/${encodeURIComponent(userId)}?track_id=${encodeURIComponent(trackId)}&track_name=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artist)}`,
      { method: 'POST' }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to save favorite')
    }

    return response.json()
  } catch (error) {
    console.error('Error saving favorite track:', error)
    throw error
  }
}

export async function removeFavoriteTrack(
  userId: string,
  trackId: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/favorites-music/${encodeURIComponent(userId)}/${encodeURIComponent(trackId)}`,
      { method: 'DELETE' }
    )

    if (!response.ok) {
      throw new Error('Failed to remove favorite')
    }

    return response.json()
  } catch (error) {
    console.error('Error removing favorite track:', error)
    throw error
  }
}

export async function getFavoriteTracks(
  userId: string
): Promise<{ tracks: Array<{ id: string; track_id: string; track_name: string; artist: string; added_at: string }>; count: number }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/favorites-music/${encodeURIComponent(userId)}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch favorite tracks')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching favorite tracks:', error)
    return { tracks: [], count: 0 }
  }
}