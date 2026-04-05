from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import dotenv
from datetime import datetime
import motor.motor_asyncio
from models.mood_analyzer import MoodAnalyzer
from models.food_recommender import FoodRecommender
from models.spotify_recommender import SpotifyRecommender
import logging
import uuid

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
dotenv.load_dotenv()

app = FastAPI(
    title="Moodbite API",
    description="AI-powered mood analysis and food recommendation system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "https://moodbite.vercel.app",
        "https://moodbitee.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/moodbite")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client.moodbite

# Initialize AI models
mood_analyzer = MoodAnalyzer()
food_recommender = FoodRecommender()
spotify_recommender = SpotifyRecommender()

# Pydantic models
class MoodAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    user_id: Optional[str] = None

class FoodRecommendationItem(BaseModel):
    name: str
    description: str
    image: str
    category: str
    mood_benefit: str

class MoodAnalysisResponse(BaseModel):
    mood: str
    confidence: float
    food_recommendations: List[FoodRecommendationItem]
    timestamp: datetime

class HistoryItem(BaseModel):
    id: str
    text: str
    mood: str
    confidence: float
    food_recommendations: List[FoodRecommendationItem]
    timestamp: datetime

class FavoriteItem(BaseModel):
    user_id: str
    food_name: str
    food_data: FoodRecommendationItem
    added_at: datetime

class UserPreferences(BaseModel):
    user_id: str
    dietary_restrictions: Optional[List[str]] = []
    favorite_moods: Optional[List[str]] = []
    updated_at: datetime

class SpotifyTrack(BaseModel):
    id: str
    name: str
    artist: str
    image_url: Optional[str] = None
    preview_url: Optional[str] = None
    external_url: str
    uri: str
    duration_ms: int
    explicit: bool

class SpotifyPlaylist(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    external_url: str
    total_tracks: int
    followers: int
    uri: str

class MusicRecommendationResponse(BaseModel):
    mood: str
    tracks: List[SpotifyTrack]
    playlists: List[SpotifyPlaylist]
    timestamp: datetime

@app.get("/")
async def root():
    return {
        "message": "Welcome to Moodbite API! 🍽️😊",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": True}

@app.post("/analyze-mood", response_model=MoodAnalysisResponse)
async def analyze_mood(request: MoodAnalysisRequest):
    """
    Analyze the mood from text input and recommend foods
    """
    try:
        logger.info(f"Analyzing mood for text: {request.text[:50]}...")
        
        # Analyze mood
        mood_result = mood_analyzer.analyze(request.text)
        
        # Get food recommendations
        food_recommendations = food_recommender.get_recommendations(mood_result["mood"])
        
        # Create response
        response = MoodAnalysisResponse(
            mood=mood_result["mood"],
            confidence=mood_result["confidence"],
            food_recommendations=[FoodRecommendationItem(**rec) for rec in food_recommendations],
            timestamp=datetime.utcnow()
        )
        
        # Save to database if user_id provided
        if request.user_id:
            await save_to_history(request.user_id, request.text, response)
        
        return response
        
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/history/{user_id}", response_model=List[HistoryItem])
async def get_history(user_id: str, limit: int = 20):
    """
    Get mood analysis history for a user
    """
    try:
        logger.info(f"Fetching history for user: {user_id}")
        
        cursor = db.history.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(limit)
        
        history = []
        async for document in cursor:
            document["id"] = str(document["_id"])
            del document["_id"]
            del document["user_id"]
            history.append(HistoryItem(**document))
        
        return history
        
    except Exception as e:
        logger.error(f"Failed to fetch history: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")

@app.delete("/history/{user_id}")
async def clear_history(user_id: str):
    """
    Clear all history for a user
    """
    try:
        logger.info(f"Clearing history for user: {user_id}")
        
        result = await db.history.delete_many({"user_id": user_id})
        
        return {"deleted_count": result.deleted_count}
        
    except Exception as e:
        logger.error(f"Failed to clear history: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to clear history: {str(e)}")

@app.post("/favorites/{user_id}")
async def add_favorite(user_id: str, food_name: str):
    """
    Add a food to user's favorites
    """
    try:
        logger.info(f"Adding favorite for user: {user_id}, food: {food_name}")
        
        favorite = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "food_name": food_name,
            "added_at": datetime.utcnow()
        }
        
        # Check if already favorited
        existing = await db.favorites.find_one({
            "user_id": user_id,
            "food_name": food_name
        })
        
        if existing:
            raise HTTPException(status_code=400, detail="Already in favorites")
        
        await db.favorites.insert_one(favorite)
        
        return {"message": "Added to favorites", "id": favorite["_id"]}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to add favorite: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add favorite: {str(e)}")

@app.get("/favorites/{user_id}")
async def get_favorites(user_id: str):
    """
    Get user's favorite foods
    """
    try:
        logger.info(f"Fetching favorites for user: {user_id}")
        
        cursor = db.favorites.find({"user_id": user_id})
        
        favorites = []
        async for document in cursor:
            document["id"] = str(document["_id"])
            del document["_id"]
            del document["user_id"]
            favorites.append(document)
        
        return favorites
        
    except Exception as e:
        logger.error(f"Failed to fetch favorites: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch favorites: {str(e)}")

@app.delete("/favorites/{user_id}/{food_name}")
async def remove_favorite(user_id: str, food_name: str):
    """
    Remove a food from favorites
    """
    try:
        logger.info(f"Removing favorite for user: {user_id}, food: {food_name}")
        
        result = await db.favorites.delete_one({
            "user_id": user_id,
            "food_name": food_name
        })
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Favorite not found")
        
        return {"message": "Removed from favorites"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to remove favorite: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to remove favorite: {str(e)}")

@app.post("/preferences/{user_id}")
async def update_preferences(user_id: str, preferences: UserPreferences):
    """
    Update user preferences (dietary restrictions, etc.)
    """
    try:
        logger.info(f"Updating preferences for user: {user_id}")
        
        prefs_data = {
            "user_id": user_id,
            "dietary_restrictions": preferences.dietary_restrictions or [],
            "favorite_moods": preferences.favorite_moods or [],
            "updated_at": datetime.utcnow()
        }
        
        await db.preferences.replace_one(
            {"user_id": user_id},
            prefs_data,
            upsert=True
        )
        
        return {"message": "Preferences updated"}
        
    except Exception as e:
        logger.error(f"Failed to update preferences: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update preferences: {str(e)}")

@app.get("/preferences/{user_id}")
async def get_preferences(user_id: str):
    """
    Get user preferences
    """
    try:
        logger.info(f"Fetching preferences for user: {user_id}")
        
        preferences = await db.preferences.find_one({"user_id": user_id})
        
        if not preferences:
            return {
                "user_id": user_id,
                "dietary_restrictions": [],
                "favorite_moods": [],
                "updated_at": None
            }
        
        del preferences["_id"]
        return preferences
        
    except Exception as e:
        logger.error(f"Failed to fetch preferences: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch preferences: {str(e)}")

@app.get("/moods")
async def get_supported_moods():
    """
    Get list of supported moods
    """
    return {
        "moods": [
            "happy", "sad", "angry", "anxious", 
            "stressed", "bored", "tired", "excited"
        ]
    }

@app.get("/stats/{user_id}")
async def get_user_stats(user_id: str):
    """
    Get mood analysis statistics for a user
    """
    try:
        logger.info(f"Fetching stats for user: {user_id}")
        
        # Get total analyses
        total_analyses = await db.history.count_documents({"user_id": user_id})
        
        # Get mood distribution
        mood_distribution = await db.history.aggregate([
            {"$match": {"user_id": user_id}},
            {"$group": {"_id": "$mood", "count": {"$sum": 1}}}
        ]).to_list(None)
        
        # Get average confidence
        avg_confidence = await db.history.aggregate([
            {"$match": {"user_id": user_id}},
            {"$group": {"_id": None, "avg": {"$avg": "$confidence"}}}
        ]).to_list(None)
        
        return {
            "user_id": user_id,
            "total_analyses": total_analyses,
            "mood_distribution": {item["_id"]: item["count"] for item in mood_distribution},
            "average_confidence": avg_confidence[0]["avg"] if avg_confidence else 0
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")

@app.get("/music/playlists/{mood}")
async def get_mood_playlists(mood: str, limit: int = 5):
    """
    Get Spotify playlists for a specific mood
    """
    try:
        logger.info(f"Fetching playlists for mood: {mood}")
        
        playlists = spotify_recommender.get_playlists_for_mood(mood, limit=limit)
        
        if not playlists:
            return {
                "mood": mood,
                "playlists": [],
                "message": "No Spotify playlists found. Spotify API key not configured or no results."
            }
        
        return {
            "mood": mood,
            "playlists": [SpotifyPlaylist(**p) for p in playlists],
            "count": len(playlists)
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch playlists: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch playlists: {str(e)}")

@app.get("/music/recommendations/{mood}", response_model=MusicRecommendationResponse)
async def get_mood_music_recommendations(mood: str, limit: int = 10):
    """
    Get Spotify track recommendations based on mood
    Uses mood-specific audio features and genres
    """
    try:
        logger.info(f"Fetching music recommendations for mood: {mood}")
        
        # Get track recommendations
        tracks = spotify_recommender.get_recommendations_for_mood(mood, limit=limit)
        
        # Get playlist recommendations
        playlists = spotify_recommender.get_playlists_for_mood(mood, limit=3)
        
        response = MusicRecommendationResponse(
            mood=mood,
            tracks=[SpotifyTrack(**t) for t in tracks],
            playlists=[SpotifyPlaylist(**p) for p in playlists],
            timestamp=datetime.utcnow()
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Failed to fetch music recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch music recommendations: {str(e)}")

@app.get("/music/genres")
async def get_music_genres():
    """
    Get available music genres for different moods
    """
    try:
        mood_genres = {}
        for mood, features in spotify_recommender.MOOD_FEATURES.items():
            mood_genres[mood] = {
                'genres': features['seed_genres'],
                'description': features['query']
            }
        
        return {"mood_genres": mood_genres}
        
    except Exception as e:
        logger.error(f"Failed to fetch genres: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch genres: {str(e)}")

@app.post("/favorites-music/{user_id}")
async def save_favorite_track(user_id: str, track_id: str, track_name: str, artist: str):
    """
    Save a favorite Spotify track for a user
    """
    try:
        logger.info(f"Saving favorite track for user: {user_id}, track: {track_id}")
        
        favorite = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "track_id": track_id,
            "track_name": track_name,
            "artist": artist,
            "added_at": datetime.utcnow()
        }
        
        # Check if already favorited
        existing = await db.favorite_tracks.find_one({
            "user_id": user_id,
            "track_id": track_id
        })
        
        if existing:
            raise HTTPException(status_code=400, detail="Already in favorites")
        
        await db.favorite_tracks.insert_one(favorite)
        
        return {"message": "Track added to favorites", "id": favorite["_id"]}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to save favorite track: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to save favorite track: {str(e)}")

@app.get("/favorites-music/{user_id}")
async def get_favorite_tracks(user_id: str):
    """
    Get user's favorite Spotify tracks
    """
    try:
        logger.info(f"Fetching favorite tracks for user: {user_id}")
        
        cursor = db.favorite_tracks.find({"user_id": user_id}).sort("added_at", -1)
        
        favorites = []
        async for document in cursor:
            document["id"] = str(document["_id"])
            del document["_id"]
            del document["user_id"]
            favorites.append(document)
        
        return {"tracks": favorites, "count": len(favorites)}
        
    except Exception as e:
        logger.error(f"Failed to fetch favorite tracks: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch favorite tracks: {str(e)}")

@app.delete("/favorites-music/{user_id}/{track_id}")
async def remove_favorite_track(user_id: str, track_id: str):
    """
    Remove a track from user's favorites
    """
    try:
        logger.info(f"Removing favorite track for user: {user_id}, track: {track_id}")
        
        result = await db.favorite_tracks.delete_one({
            "user_id": user_id,
            "track_id": track_id
        })
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Track not found in favorites")
        
        return {"message": "Track removed from favorites"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to remove favorite track: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to remove favorite track: {str(e)}")

async def save_to_history(user_id: str, text: str, response: MoodAnalysisResponse):
    """
    Save mood analysis to database
    """
    try:
        history_item = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "text": text,
            "mood": response.mood,
            "confidence": response.confidence,
            "food_recommendations": [rec.dict() for rec in response.food_recommendations],
            "timestamp": response.timestamp
        }
        
        await db.history.insert_one(history_item)
        logger.info(f"Saved history for user: {user_id}")
        
    except Exception as e:
        logger.error(f"Failed to save to history: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 