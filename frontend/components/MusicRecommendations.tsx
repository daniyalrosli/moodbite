'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Heart, ExternalLink, Play } from 'lucide-react'

interface SpotifyTrack {
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

interface MusicRecommendationsProps {
  mood: string
  tracks: SpotifyTrack[]
  onFavorite?: (trackId: string, trackName: string, artist: string) => void
}

export default function MusicRecommendations({
  mood,
  tracks,
  onFavorite,
}: MusicRecommendationsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)

  const handleFavorite = (track: SpotifyTrack) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(track.id)) {
      newFavorites.delete(track.id)
    } else {
      newFavorites.add(track.id)
    }
    setFavorites(newFavorites)

    if (onFavorite) {
      onFavorite(track.id, track.name, track.artist)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        <Music className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
        <p className="text-neutral-500 dark:text-neutral-400">
          No music recommendations available for this mood.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Music className="w-6 h-6 text-green-500" />
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Music for Your {mood} Mood 🎵
        </h3>
      </div>

      <div className="grid gap-4">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-green-500 dark:hover:border-green-500 transition-colors"
          >
            <div className="flex gap-4 items-start">
              {/* Album Art */}
              {track.image_url && (
                <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden">
                  <img
                    src={track.image_url}
                    alt={track.name}
                    className="w-full h-full object-cover"
                  />
                  {track.preview_url && (
                    <button
                      onClick={() =>
                        setPlayingTrackId(
                          playingTrackId === track.id ? null : track.id
                        )
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-6 h-6 text-white fill-white" />
                    </button>
                  )}
                </div>
              )}

              {/* Track Info */}
              <div className="flex-grow min-w-0">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                  {track.name}
                  {track.explicit && (
                    <span className="ml-2 text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                      E
                    </span>
                  )}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {track.artist}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  {formatDuration(track.duration_ms)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleFavorite(track)}
                  className={`p-2 rounded-lg transition-colors ${
                    favorites.has(track.id)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                  title="Add to favorites"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={favorites.has(track.id) ? 'currentColor' : 'none'}
                  />
                </button>

                <a
                  href={track.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  title="Open in Spotify"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Audio Player Preview */}
            {playingTrackId === track.id && track.preview_url && (
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <audio
                  src={track.preview_url}
                  controls
                  autoPlay
                  className="w-full h-8"
                  style={{
                    accentColor: '#10b981', // Green Spotify color
                  }}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                  Preview (30 seconds)
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300">
          💡 Powered by Spotify • Click the Spotify icon to open directly
        </p>
      </div>
    </motion.div>
  )
}
