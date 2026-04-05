# 🎵 Spotify Integration Guide

## Overview

mOODBITE now features **Spotify Web API integration** for mood-based music recommendations! The app can generate personalized playlists and track recommendations tailored to your emotional state.

## Features

### 🎧 Music Recommendations

- **Mood-based Track Recommendations**: Get 10 Spotify tracks personalized to your detected mood
- **Audio Features Matching**: Recommendations use mood-specific audio features (energy, valence, danceability, etc.)
- **Playlist Curation**: Discover curated Spotify playlists that match your mood
- **Genre Matching**: Different moods map to different music genres

### 🎵 Supported Features

- Preview 30-second track samples directly in the app
- One-click access to full tracks on Spotify
- Save favorite tracks to your collection
- Full track information (artist, duration, album art)
- Follower counts and track statistics

## Setup Instructions

### 1. Create Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (create one if needed - it's free!)
3. Accept the terms and create a new application
4. Accept the terms again and give your app a name (e.g., "mOODBITE Music")

### 2. Get API Credentials

Once your app is created:

1. You'll see your **Client ID**
2. Click "Show Client Secret" to get your **Client Secret**
3. Copy both values securely

### 3. Configure Environment Variables

#### Backend (.env)

```bash
# In backend/.env, add:
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
MONGODB_URI=your_mongodb_connection_string
```

#### Local Development

```bash
# Copy the example file
cp backend/.env.example backend/.env

# Edit backend/.env with your Spotify credentials
```

### 4. Install Dependencies

```bash
# Backend
cd backend
pip install -r requirements.txt  # spotipy is now included

# Frontend (no additional packages needed)
cd ../frontend
npm install  # Already installed
```

### 5. Run the Application

```bash
# Using Docker Compose (recommended)
docker-compose up

# Or manually:
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## API Endpoints

### Get Music Recommendations

```bash
GET /music/recommendations/{mood}?limit=10
```

**Response:**

```json
{
  "mood": "happy",
  "tracks": [
    {
      "id": "spotify_track_id",
      "name": "Track Name",
      "artist": "Artist Name",
      "image_url": "https://...",
      "preview_url": "https://...",
      "external_url": "https://open.spotify.com/track/...",
      "duration_ms": 180000,
      "explicit": false
    }
  ],
  "playlists": [
    {
      "id": "spotify_playlist_id",
      "name": "Happy Hits",
      "description": "Feel good music",
      "image_url": "https://...",
      "total_tracks": 50,
      "followers": 1000000,
      "external_url": "https://open.spotify.com/playlist/..."
    }
  ],
  "timestamp": "2024-04-04T10:30:00.000Z"
}
```

### Get Playlists for Mood

```bash
GET /music/playlists/{mood}?limit=5
```

### Get Music Genres

```bash
GET /music/genres
```

Returns mapping of moods to Spotify genres and audio features.

### Favorites Management

```bash
# Save favorite track
POST /favorites-music/{user_id}?track_id=...&track_name=...&artist=...

# Get favorite tracks
GET /favorites-music/{user_id}

# Remove favorite track
DELETE /favorites-music/{user_id}/{track_id}
```

## Mood-to-Music Mapping

### Happy 😊

- **Genres**: Pop, Dance, Party
- **Features**: High energy, high valence (positivity), danceability
- **Vibe**: Uplifting, celebratory, energetic

### Sad 😢

- **Genres**: Indie, Soul, Blues
- **Features**: Low energy, low valence, high acousticness
- **Vibe**: Emotional, melancholic, introspective

### Angry 😠

- **Genres**: Rock, Metal, Hip-Hop
- **Features**: High energy, aggressive, powerful
- **Vibe**: Intense, cathartic, powerful

### Anxious 😰

- **Genres**: Ambient, Electronic, Indie
- **Features**: Medium energy, soothing, atmospheric
- **Vibe**: Calming, grounding, peaceful

### Stressed 😫

- **Genres**: Ambient, Classical, Lo-fi
- **Features**: Low energy, instrumental, relaxing
- **Vibe**: Meditative, stress-relieving, calming

### Tired 😴

- **Genres**: Lo-fi, Chill, Ambient
- **Features**: Low energy, soft, slow tempo
- **Vibe**: Soothing, gentle, sleep-friendly

### Bored 😐

- **Genres**: Electronic, Indie, Alternative
- **Features**: Medium-high energy, interesting, engaging
- **Vibe**: Fun, stimulating, upbeat

### Excited 🤩

- **Genres**: Pop, EDM, Dance
- **Features**: Very high energy, high valence, fast tempo
- **Vibe**: Pumped up, celebratory, euphoric

## Frontend Integration

### Using Music Recommendations in Components

```typescript
import { getMusicRecommendations } from '@/lib/api'
import MusicRecommendations from '@/components/MusicRecommendations'

// In your component:
const { data: musicData, loading } = await getMusicRecommendations('happy', 10)

<MusicRecommendations
  mood="happy"
  tracks={musicData.tracks}
  onFavorite={(trackId, trackName, artist) => {
    saveFavoriteTrack(userId, trackId, trackName, artist)
  }}
/>
```

### Using Playlists Component

```typescript
import { getPlaylistsForMood } from '@/lib/api'
import PlaylistsRecommendations from '@/components/PlaylistsRecommendations'

const { playlists } = await getPlaylistsForMood('happy', 5)

<PlaylistsRecommendations mood="happy" playlists={playlists} />
```

## Spotify Audio Features Explained

- **Energy** (0-1): Intensity and activity. High energy = fast, loud, noisy
- **Valence** (0-1): Musical positivity. High valence = happy, cheerful
- **Danceability** (0-1): How suitable for dancing
- **Acousticness** (0-1): Likelihood of being acoustic vs electronic
- **Instrumentalness** (0-1): How instrumental (lack of vocals)
- **Tempo** (BPM): Speed of the track

## Troubleshooting

### "No music recommendations available"

- Ensure `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are set
- Restart the backend server after setting env variables
- Check backend logs for authentication errors
- Visit Spotify Dashboard to verify credentials

### Playlists not loading

- Spotify API might be rate-limited (max 180 requests per minute)
- Wait a moment and retry
- Check your internet connection

### Preview not playing

- Some tracks don't have preview URLs available
- Preview URLs expire after 1 hour - refresh the page
- Browser might have mixed content issues if over HTTPS

## Rate Limiting

Spotify API has these limits:

- **Playlists Search**: 180 requests per minute
- **Recommendations**: 180 requests per minute
- **Preview URLs**: Valid for 1 hour

The app is designed to stay well below these limits.

## Privacy & Spotify Terms

- The app uses **Client Credentials flow** (no login required from users)
- Track recommendations are server-side, users can't see your API credentials
- Favorites are stored in your MongoDB database, not shared with Spotify
- Complies with Spotify API terms of service

## Future Enhancements

- [ ] User authentication to save Spotify library integration
- [ ] Create playlists directly in Spotify from app
- [ ] Integration with user's Spotify history
- [ ] Personalized recommendations based on user's top tracks
- [ ] Lyrics display for recommended tracks
- [ ] Mood-based Spotify queue building
- [ ] Social sharing of playlists

## Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Spotipy Python Library](https://spotipy.readthedocs.io/)
- [Spotify API Rate Limits](https://developer.spotify.com/documentation/web-api/concepts/rate-limits)
- [Audio Features Guide](https://developer.spotify.com/documentation/web-api/reference/get-audio-features)

## Support

If you encounter issues:

1. Check the backend logs for Spotify API errors
2. Verify your API credentials are correct
3. Ensure you're within rate limits
4. Check Spotify's status page for outages

---

**Happy listening!** 🎵✨
