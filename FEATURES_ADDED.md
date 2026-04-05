# 🎵 Spotify Music Recommendations Feature

## Quick Summary

The Spotify integration adds **mood-based music recommendations** to mOODBITE. After analyzing the user's mood, the app suggests:

- 🎵 **10 personalized Spotify tracks** with mood-matching audio features
- 🎧 **5 curated playlists** for the detected mood
- ▶️ **30-second previews** of each track
- ❤️ **Favorite system** to save tracks
- 📱 **Direct Spotify links** to open tracks/playlists

## Files Added/Modified

### Backend

- **new** `backend/models/spotify_recommender.py` - Spotify API integration logic
- **updated** `backend/main.py` - Added 7 new API endpoints for music features
- **updated** `backend/requirements.txt` - Added `spotipy` dependency

### Frontend

- **new** `frontend/components/MusicRecommendations.tsx` - Track display component
- **new** `frontend/components/PlaylistsRecommendations.tsx` - Playlist display component
- **updated** `frontend/lib/api.ts` - Added 6 Spotify API client functions
- **updated** `frontend/types/index.ts` - Added Spotify-related TypeScript types

### Documentation

- **new** `SPOTIFY_SETUP.md` - Complete setup and usage guide
- **new** `FEATURES_ADDED.md` - This file

## Backend API Endpoints

### Music Recommendations

```
GET /music/recommendations/{mood}?limit=10
```

Returns tracks and playlists based on mood with audio features matching.

### Playlists

```
GET /music/playlists/{mood}?limit=5
```

Returns curated Spotify playlists for the mood.

### Genres

```
GET /music/genres
```

Returns mood-to-genres mapping.

### Favorites Management

```
POST /favorites-music/{user_id}?track_id=...&track_name=...&artist=...
GET /favorites-music/{user_id}
DELETE /favorites-music/{user_id}/{track_id}
```

Manage user's favorite tracks.

## Key Features

### 🧠 Intelligent Mood-to-Music Mapping

Each mood (happy, sad, angry, anxious, stressed, tired, bored, excited) maps to:

- Specific Spotify genres
- Audio feature ranges (energy, valence, danceability, etc.)
- Targeted search queries

### 🎧 Rich Audio Features

Uses Spotify's audio features API:

- **Energy**: Intensity of the track (0-1)
- **Valence**: Musical positivity (0-1)
- **Danceability**: Suitability for dancing (0-1)
- **Acousticness**: Acoustic vs electronic (0-1)
- **Tempo**: Speed in BPM

### 🎵 User-Friendly Components

- **MusicRecommendations**: Beautiful card layout for tracks
- **PlaylistsRecommendations**: Grid layout for playlists
- Both support dark mode and animations
- Direct preview playback and Spotify links

## Setup

### 1. Get Spotify API Credentials

- Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Create a new application
- Copy Client ID and Client Secret

### 2. Configure Environment

```bash
# In backend/.env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### 3. Install Dependencies

```bash
# Spotipy is already in requirements.txt
pip install -r backend/requirements.txt
```

### 4. Run the App

```bash
docker-compose up
# or
cd backend && uvicorn main:app --reload
cd frontend && npm run dev
```

## Usage in Components

```typescript
import { getMusicRecommendations } from '@/lib/api'
import MusicRecommendations from '@/components/MusicRecommendations'

// Get recommendations
const musicData = await getMusicRecommendations('happy', 10)

// Render component
<MusicRecommendations
  mood={musicData.mood}
  tracks={musicData.tracks}
  onFavorite={handleFavorite}
/>
```

## Architecture

```
User Input (mood)
      ↓
Mood Analysis (existing)
      ↓
Spotify Recommender Service
      ├─ Map mood to features
      ├─ Query Spotify API
      └─ Return tracks & playlists
      ↓
Frontend Components
      ├─ MusicRecommendations (tracks)
      ├─ PlaylistsRecommendations (playlists)
      └─ Database (favorites)
```

## Technical Details

### Spotify Audio Features Mapping

| Mood     | Energy  | Valence | Features                  |
| -------- | ------- | ------- | ------------------------- |
| Happy    | 0.7-1.0 | 0.7-1.0 | Pop, Dance, Party         |
| Sad      | 0-0.4   | 0-0.3   | Indie, Soul, Blues        |
| Angry    | 0.8-1.0 | 0-0.4   | Rock, Metal, Hip-Hop      |
| Anxious  | 0.3-0.7 | 0.3-0.6 | Ambient, Electronic       |
| Stressed | 0-0.5   | 0.4-0.7 | Ambient, Classical, Lo-fi |
| Tired    | 0-0.4   | 0.3-0.7 | Lo-fi, Chill, Ambient     |
| Bored    | 0.5-0.8 | 0.5-0.8 | Electronic, Indie         |
| Excited  | 0.8-1.0 | 0.8-1.0 | Pop, EDM, Dance           |

### Error Handling

- If Spotify API unavailable, returns empty arrays gracefully
- No crashes if credentials missing
- Fallback to local recommendations if needed
- All errors logged for debugging

## Performance

- **API Calls**: ~2 per mood analysis (1 for recommendations, 1 for playlists)
- **Response Time**: <1s typically
- **Cache**: Spotify results not cached (fresh every time)
- **Rate Limits**: Well below Spotify's 180 requests/minute limit

## What's Next?

Potential future enhancements:

- [ ] Spotify OAuth login integration
- [ ] Create playlists directly in user's Spotify
- [ ] Integrate with user's Spotify library
- [ ] Lyrics display for tracks
- [ ] More granular mood-to-music customization
- [ ] Music history tracking
- [ ] Mood-to-workout correlation

## Troubleshooting

| Issue                | Solution                                          |
| -------------------- | ------------------------------------------------- |
| No recommendations   | Check SPOTIFY_CLIENT_ID/SECRET in .env            |
| Previews not playing | Some tracks lack previews; refresh page           |
| Rate limited         | Wait a minute; app stays below limits normally    |
| Playlists empty      | Spotify API may be down; check status.spotify.com |

## Dependencies Added

```
spotipy>=2.23.0
```

Already in `backend/requirements.txt`

## Testing

```bash
# Test endpoint directly
curl http://localhost:8000/music/recommendations/happy?limit=5

# Test with frontend
npm run dev  # Frontend on localhost:3000
```

---

**Enjoy your mood-matched music!** 🎵✨
