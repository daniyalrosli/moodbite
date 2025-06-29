from transformers import pipeline
import torch
import numpy as np
from typing import Dict, Any

class MoodAnalyzer:
    def __init__(self):
        """
        Initialize the mood analyzer with a pre-trained emotion classification model
        """
        try:
            # Use a pre-trained emotion classification model
            self.classifier = pipeline(
                "text-classification",
                model="bhadresh-savani/distilbert-base-uncased-emotion",
                return_all_scores=True
            )
            
            # Map model emotions to our mood categories
            self.emotion_mapping = {
                "joy": "happy",
                "sadness": "sad", 
                "anger": "angry",
                "fear": "anxious",
                "surprise": "excited",
                "love": "happy",
                "disgust": "angry"
            }
            
            print("✅ Mood analyzer initialized successfully")
            
        except Exception as e:
            print(f"❌ Failed to initialize mood analyzer: {e}")
            # Fallback to simple keyword-based analysis
            self.classifier = None
            self.use_fallback = True
    
    def analyze(self, text: str) -> Dict[str, Any]:
        """
        Analyze the mood from text input
        
        Args:
            text (str): Input text to analyze
            
        Returns:
            Dict containing mood and confidence score
        """
        if not text.strip():
            return {"mood": "neutral", "confidence": 0.0}
        
        try:
            if self.classifier and not self.use_fallback:
                return self._analyze_with_model(text)
            else:
                return self._analyze_with_keywords(text)
                
        except Exception as e:
            print(f"Analysis failed, using fallback: {e}")
            return self._analyze_with_keywords(text)
    
    def _analyze_with_model(self, text: str) -> Dict[str, Any]:
        """
        Analyze using the pre-trained model
        """
        results = self.classifier(text)
        
        # Get the highest scoring emotion
        scores = results[0]
        best_score = max(scores, key=lambda x: x['score'])
        
        # Map to our mood categories
        emotion = best_score['label'].lower()
        mood = self.emotion_mapping.get(emotion, "neutral")
        confidence = best_score['score']
        
        return {
            "mood": mood,
            "confidence": confidence,
            "raw_emotion": emotion
        }
    
    def _analyze_with_keywords(self, text: str) -> Dict[str, Any]:
        """
        Fallback keyword-based mood analysis
        """
        text_lower = text.lower()
        
        # Define keyword patterns for each mood
        mood_keywords = {
            "happy": ["happy", "joy", "excited", "great", "wonderful", "amazing", "fantastic", "love", "good", "nice"],
            "sad": ["sad", "depressed", "down", "blue", "miserable", "unhappy", "crying", "tears", "lonely"],
            "angry": ["angry", "mad", "furious", "irritated", "annoyed", "frustrated", "hate", "disgust"],
            "anxious": ["anxious", "worried", "nervous", "scared", "afraid", "fear", "panic", "stress"],
            "stressed": ["stressed", "overwhelmed", "pressure", "tension", "burnout", "exhausted"],
            "tired": ["tired", "exhausted", "fatigued", "sleepy", "drained", "worn out", "lethargic"],
            "bored": ["bored", "boring", "dull", "uninterested", "monotony", "tedious"],
            "excited": ["excited", "thrilled", "pumped", "energized", "enthusiastic", "eager"]
        }
        
        # Count keyword matches for each mood
        mood_scores = {}
        for mood, keywords in mood_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            mood_scores[mood] = score
        
        # Find the mood with highest score
        if max(mood_scores.values()) == 0:
            return {"mood": "neutral", "confidence": 0.5}
        
        best_mood = max(mood_scores, key=mood_scores.get)
        confidence = min(0.9, mood_scores[best_mood] * 0.2)  # Scale confidence
        
        return {
            "mood": best_mood,
            "confidence": confidence,
            "method": "keyword_based"
        } 