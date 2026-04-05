# 🎵 Spotify Integration - Implementation Guide

## Overview

This guide shows you how to integrate the new Spotify music recommendation components into your existing mOODBITE application pages and flows.

## Quick Start - Add Music to Home Page

### 1. Update the Home Page (`frontend/app/page.tsx`)

Add music recommendations alongside food recommendations:

```typescript
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoodAnalyzer from '../components/MoodAnalyzer'
import FoodRecommendations from '../components/FoodRecommendations'
import MusicRecommendations from '../components/MusicRecommendations'
import PlaylistsRecommendations from '../components/PlaylistsRecommendations'
import Header from '../components/Header'
import { analyzeMood, getMusicRecommendations, MoodAnalysisResponse, MusicRecommendationResponse } from '../lib/api'

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<MoodAnalysisResponse | null>(null)
  const [musicResult, setMusicResult] = useState<MusicRecommendationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalysis = async (text: string) => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)
    setMusicResult(null)

    try {
      // Analyze mood and get food recommendations
      const data = await analyzeMood({ text })
      setResult(data)

      // Get music recommendations based on detected mood
      const musicData = await getMusicRecommendations(data.mood, 10)
      setMusicResult(musicData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* ... existing hero section ... */}

        {/* Results Section */}
        <AnimatePresence>
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 py-12"
            >
              {/* Food Recommendations */}
              <FoodRecommendations result={result} />

              {/* Music Recommendations */}
              {musicResult && musicResult.tracks.length > 0 && (
                <>
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12" />
                  <MusicRecommendations
                    mood={musicResult.mood}
                    tracks={musicResult.tracks}
                  />

                  <PlaylistsRecommendations
                    mood={musicResult.mood}
                    playlists={musicResult.playlists}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ... rest of component ... */}
      </main>
    </div>
  )
}
```

## 2. Add Music to Results Page (if separate)

If you have a dedicated results page:

```typescript
import MusicRecommendations from '@/components/MusicRecommendations'
import PlaylistsRecommendations from '@/components/PlaylistsRecommendations'
import { getMusicRecommendations } from '@/lib/api'

export default async function ResultsPage({ params }: { params: { mood: string } }) {
  const musicData = await getMusicRecommendations(params.mood)

  return (
    <div className="space-y-12">
      {musicData.tracks.length > 0 && (
        <MusicRecommendations mood={musicData.mood} tracks={musicData.tracks} />
      )}

      {musicData.playlists.length > 0 && (
        <PlaylistsRecommendations mood={musicData.mood} playlists={musicData.playlists} />
      )}
    </div>
  )
}
```

## 3. Add Music Favorites Feature

Create a new "My Favorite Music" page:

```typescript
'use client'

import React, { useEffect, useState } from 'react'
import { getFavoriteTracks, removeFavoriteTrack } from '@/lib/api'
import { Music, Trash2, ExternalLink } from 'lucide-react'

interface FavoriteMusicPageProps {
  userId: string
}

export default function FavoriteMusicPage({ userId }: FavoriteMusicPageProps) {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const data = await getFavoriteTracks(userId)
      setFavorites(data.tracks)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (trackId: string) => {
    try {
      await removeFavoriteTrack(userId, trackId)
      setFavorites(favorites.filter((t) => t.track_id !== trackId))
    } catch (error) {
      console.error('Failed to remove favorite', error)
    }
  }

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Music className="w-6 h-6 text-green-500" />
        <h1 className="text-3xl font-bold">Your Favorite Tracks</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center p-8 text-neutral-500">
          No favorite tracks yet. Start analyzing your mood and save your favorite tracks!
        </div>
      ) : (
        <div className="grid gap-4">
          {favorites.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{track.track_name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {track.artist}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Saved: {new Date(track.added_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://open.spotify.com/track/${track.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  onClick={() => handleRemove(track.track_id)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## 4. Add Music Section to Navigation

Update your Header/Navigation to include Music section:

```typescript
const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Favorite Music", href: "/favorites-music" }, // NEW
];
```

## 5. Create a Music Page (Optional)

For a dedicated music discovery page:

```typescript
'use client'

import React, { useState } from 'react'
import { getMusicGenres, getPlaylistsForMood } from '@/lib/api'
import PlaylistsRecommendations from '@/components/PlaylistsRecommendations'
import { Music } from 'lucide-react'

export default function MusicPage() {
  const [selectedMood, setSelectedMood] = useState('happy')
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const moods = [
    'happy',
    'sad',
    'angry',
    'anxious',
    'stressed',
    'tired',
    'bored',
    'excited'
  ]

  const handleMoodChange = async (mood: string) => {
    setSelectedMood(mood)
    setLoading(true)

    try {
      const data = await getPlaylistsForMood(mood, 6)
      setPlaylists(data.playlists)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Music className="w-8 h-8 text-green-500" />
          <h1 className="text-4xl font-bold">Music Discovery</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Choose your mood:</h2>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodChange(mood)}
                className={`px-4 py-2 rounded-full transition-colors capitalize ${
                  selectedMood === mood
                    ? 'bg-green-500 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="text-center">Loading playlists...</div>}

        {playlists.length > 0 && (
          <PlaylistsRecommendations mood={selectedMood} playlists={playlists} />
        )}
      </div>
    </div>
  )
}
```

## API Hook for Reusability

Create a custom hook for music recommendations:

```typescript
// frontend/lib/hooks/useMusicRecommendations.ts

import { useState, useCallback } from "react";
import {
  getMusicRecommendations,
  getPlaylistsForMood,
  saveFavoriteTrack,
  removeFavoriteTrack,
  getFavoriteTracks,
  MusicRecommendationResponse,
} from "@/lib/api";

export function useMusicRecommendations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [musicData, setMusicData] =
    useState<MusicRecommendationResponse | null>(null);

  const fetchRecommendations = useCallback(async (mood: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMusicRecommendations(mood);
      setMusicData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(
    async (
      userId: string,
      trackId: string,
      trackName: string,
      artist: string,
    ) => {
      try {
        await saveFavoriteTrack(userId, trackId, trackName, artist);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save favorite",
        );
      }
    },
    [],
  );

  const removeFavorite = useCallback(
    async (userId: string, trackId: string) => {
      try {
        await removeFavoriteTrack(userId, trackId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to remove favorite",
        );
      }
    },
    [],
  );

  return {
    musicData,
    loading,
    error,
    fetchRecommendations,
    addFavorite,
    removeFavorite,
  };
}
```

Usage:

```typescript
import { useMusicRecommendations } from '@/lib/hooks/useMusicRecommendations'

export default function MyComponent() {
  const { musicData, loading, fetchRecommendations, addFavorite } = useMusicRecommendations()

  useEffect(() => {
    fetchRecommendations('happy')
  }, [])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {musicData && (
        <MusicRecommendations
          mood={musicData.mood}
          tracks={musicData.tracks}
          onFavorite={addFavorite}
        />
      )}
    </div>
  )
}
```

## Styling Customization

### Match Your Theme

The components use Tailwind CSS. To customize colors:

```typescript
// In MusicRecommendations.tsx, change these classes:
// bg-green-100 → bg-blue-100
// text-green-600 → text-blue-600
// border-green-500 → border-blue-500
```

### Dark Mode

Both components automatically support dark mode with:

```typescript
dark: bg - neutral - 900;
dark: text - white;
dark: border - neutral - 800;
```

## Performance Tips

### 1. Lazy Load Music Component

```typescript
import dynamic from 'next/dynamic'

const MusicRecommendations = dynamic(
  () => import('@/components/MusicRecommendations'),
  { loading: () => <div>Loading music...</div> }
)
```

### 2. Memoize Components

```typescript
const MusicRecommendations = React.memo(function MusicRecommendations({
  mood,
  tracks,
  onFavorite,
}: Props) {
  // component code
});
```

### 3. Cache Results

```typescript
// In your API/state management
const [musicCache, setMusicCache] = useState<
  Record<string, MusicRecommendationResponse>
>({});

const getRecommendations = async (mood: string) => {
  if (musicCache[mood]) return musicCache[mood];

  const data = await getMusicRecommendations(mood);
  setMusicCache({ ...musicCache, [mood]: data });
  return data;
};
```

## Error Handling

The components handle errors gracefully:

```typescript
// In components, errors are caught and empty state shown
{!tracks || tracks.length === 0 ? (
  <div className="text-center">
    <Music className="w-12 h-12 mx-auto text-neutral-400" />
    <p className="text-neutral-500">
      No music recommendations available.
    </p>
  </div>
) : (
  // render tracks
)}
```

## Database Schema for Favorites

MongoDB stores favorite tracks like this:

```javascript
{
  _id: "unique-id",
  user_id: "user-123",
  track_id: "spotify-track-id",
  track_name: "Track Name",
  artist: "Artist Name",
  added_at: ISODate("2024-04-04T10:30:00.000Z")
}
```

## Testing the Integration

```bash
# Test the API directly
curl http://localhost:8000/music/recommendations/happy

# Test in frontend
# 1. Navigate to your app
# 2. Analyze a mood
# 3. Music recommendations should appear below food recommendations
# 4. Click heart icon to save favorites
# 5. Click Spotify icon to open track
```

## Troubleshooting Integration Issues

| Issue                | Solution                                    |
| -------------------- | ------------------------------------------- |
| Music not showing    | Check Spotify credentials in .env           |
| Slow loading         | Music loads async after mood; wait a moment |
| Styling off          | Check Tailwind is configured correctly      |
| Icons missing        | Ensure lucide-react is installed            |
| Components not found | Check import paths are correct              |

## Next Steps

1. ✅ Set up Spotify credentials
2. ✅ Install dependencies
3. ✅ Choose integration location (home page, dedicated page, etc.)
4. ✅ Update components/pages
5. ✅ Test with different moods
6. ✅ Deploy to production

---

Start with the home page integration and expand from there! 🎵
