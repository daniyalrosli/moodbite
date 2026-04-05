'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, ExternalLink, Users } from 'lucide-react'

interface SpotifyPlaylist {
  id: string
  name: string
  description?: string
  image_url?: string
  external_url: string
  total_tracks: number
  followers: number
  uri: string
}

interface PlaylistsRecommendationsProps {
  mood: string
  playlists: SpotifyPlaylist[]
}

export default function PlaylistsRecommendations({
  mood,
  playlists,
}: PlaylistsRecommendationsProps) {
  const [hoveredPlaylist, setHoveredPlaylist] = useState<string | null>(null)

  if (!playlists || playlists.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        <Music className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
        <p className="text-neutral-500 dark:text-neutral-400">
          No playlists available for this mood.
        </p>
      </div>
    )
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
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
          Curated Playlists for {mood} 🎧
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredPlaylist(playlist.id)}
            onMouseLeave={() => setHoveredPlaylist(null)}
            className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-green-500 dark:hover:border-green-500 transition-all duration-300"
          >
            {/* Playlist Image */}
            {playlist.image_url && (
              <div className="relative w-full h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={playlist.image_url}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
                {hoveredPlaylist === playlist.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <a
                      href={playlist.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
                    >
                      <span>Open in Spotify</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                )}
              </div>
            )}

            {/* Playlist Info */}
            <div className="p-5">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 mb-2">
                {playlist.name}
              </h4>

              {playlist.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                  {playlist.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                <div className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  <span>{playlist.total_tracks} songs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formatFollowers(playlist.followers)} followers</span>
                </div>
              </div>

              {/* Open Button */}
              <a
                href={playlist.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>View on Spotify</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300">
          🎵 Discover more music tailored to your mood on Spotify
        </p>
      </div>
    </motion.div>
  )
}
