from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import dotenv
from datetime import datetime
import motor.motor_asyncio
from models.mood_analyzer import MoodAnalyzer
from models.food_recommender import FoodRecommender

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
    allow_origins=["http://localhost:3000", "https://moodbite.vercel.app"],
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

# Pydantic models
class MoodAnalysisRequest(BaseModel):
    text: str
    user_id: Optional[str] = None

class MoodAnalysisResponse(BaseModel):
    mood: str
    confidence: float
    food_recommendations: List[dict]
    timestamp: datetime

class HistoryItem(BaseModel):
    id: str
    text: str
    mood: str
    confidence: float
    food_recommendations: List[dict]
    timestamp: datetime

@app.get("/")
async def root():
    return {"message": "Welcome to Moodbite API! 🍽️😊"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": True}

@app.post("/analyze-mood", response_model=MoodAnalysisResponse)
async def analyze_mood(request: MoodAnalysisRequest):
    """
    Analyze the mood from text input and recommend foods
    """
    try:
        # Analyze mood
        mood_result = mood_analyzer.analyze(request.text)
        
        # Get food recommendations
        food_recommendations = food_recommender.get_recommendations(mood_result["mood"])
        
        # Create response
        response = MoodAnalysisResponse(
            mood=mood_result["mood"],
            confidence=mood_result["confidence"],
            food_recommendations=food_recommendations,
            timestamp=datetime.now()
        )
        
        # Save to database if user_id provided
        if request.user_id:
            await save_to_history(request.user_id, request.text, response)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/history/{user_id}", response_model=List[HistoryItem])
async def get_history(user_id: str, limit: int = 10):
    """
    Get mood analysis history for a user
    """
    try:
        cursor = db.history.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(limit)
        
        history = []
        async for document in cursor:
            document["id"] = str(document["_id"])
            history.append(HistoryItem(**document))
        
        return history
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")

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

async def save_to_history(user_id: str, text: str, response: MoodAnalysisResponse):
    """
    Save mood analysis to database
    """
    try:
        history_item = {
            "user_id": user_id,
            "text": text,
            "mood": response.mood,
            "confidence": response.confidence,
            "food_recommendations": response.food_recommendations,
            "timestamp": response.timestamp
        }
        
        await db.history.insert_one(history_item)
        
    except Exception as e:
        print(f"Failed to save to history: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 