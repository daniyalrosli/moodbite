from typing import List, Dict, Any
import random

class FoodRecommender:
    def __init__(self):
        """
        Initialize the food recommender with mood-food mappings
        """
        self.mood_food_mapping = {
            "happy": [
                {
                    "name": "Fresh Fruit Smoothie Bowl",
                    "description": "A vibrant, colorful smoothie bowl with berries, banana, and granola",
                    "image": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Enhances your positive energy with natural sweetness and vitamins"
                },
                {
                    "name": "Colorful Mediterranean Salad",
                    "description": "Fresh vegetables, olives, and feta cheese with olive oil dressing",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "lunch",
                    "mood_benefit": "Light and refreshing, perfect for maintaining your happy mood"
                },
                {
                    "name": "Dark Chocolate Covered Strawberries",
                    "description": "Sweet strawberries dipped in rich dark chocolate",
                    "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
                    "category": "dessert",
                    "mood_benefit": "A delightful treat that boosts serotonin and endorphins"
                }
            ],
            "sad": [
                {
                    "name": "Warm Chicken Noodle Soup",
                    "description": "Homestyle soup with tender chicken, vegetables, and comforting noodles",
                    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
                    "category": "soup",
                    "mood_benefit": "Comforting and warming, like a hug in a bowl"
                },
                {
                    "name": "Grilled Cheese with Tomato Soup",
                    "description": "Crispy grilled cheese sandwich with creamy tomato soup",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "comfort",
                    "mood_benefit": "Classic comfort food that brings warmth and nostalgia"
                },
                {
                    "name": "Hot Chocolate with Marshmallows",
                    "description": "Rich, creamy hot chocolate topped with fluffy marshmallows",
                    "image": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400",
                    "category": "beverage",
                    "mood_benefit": "Warming and sweet, helps boost mood with cocoa's natural compounds"
                }
            ],
            "angry": [
                {
                    "name": "Cooling Cucumber Mint Water",
                    "description": "Refreshing water infused with cucumber and mint",
                    "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
                    "category": "beverage",
                    "mood_benefit": "Cooling and calming, helps reduce anger and frustration"
                },
                {
                    "name": "Chamomile Tea with Honey",
                    "description": "Soothing herbal tea with natural honey",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "tea",
                    "mood_benefit": "Naturally calming properties help soothe anger and promote relaxation"
                },
                {
                    "name": "Fresh Fruit Popsicles",
                    "description": "Homemade popsicles made with real fruit",
                    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
                    "category": "dessert",
                    "mood_benefit": "Cooling and refreshing, helps calm heated emotions"
                }
            ],
            "anxious": [
                {
                    "name": "Calming Lavender Chamomile Tea",
                    "description": "Herbal tea blend with lavender and chamomile",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "tea",
                    "mood_benefit": "Lavender and chamomile have natural calming properties"
                },
                {
                    "name": "Banana with Almond Butter",
                    "description": "Sliced banana topped with creamy almond butter",
                    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                    "category": "snack",
                    "mood_benefit": "Bananas contain tryptophan and magnesium, natural anxiety relievers"
                },
                {
                    "name": "Oatmeal with Berries",
                    "description": "Warm oatmeal topped with fresh berries and honey",
                    "image": "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Complex carbs help stabilize blood sugar and reduce anxiety"
                }
            ],
            "stressed": [
                {
                    "name": "Green Tea with Lemon",
                    "description": "Antioxidant-rich green tea with fresh lemon",
                    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
                    "category": "tea",
                    "mood_benefit": "L-theanine in green tea promotes relaxation without drowsiness"
                },
                {
                    "name": "Dark Chocolate Covered Almonds",
                    "description": "Almonds coated in rich dark chocolate",
                    "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
                    "category": "snack",
                    "mood_benefit": "Dark chocolate and almonds contain stress-reducing compounds"
                },
                {
                    "name": "Avocado Toast",
                    "description": "Whole grain toast with mashed avocado and sea salt",
                    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Healthy fats and complex carbs help manage stress hormones"
                }
            ],
            "tired": [
                {
                    "name": "Energy-Boosting Smoothie",
                    "description": "Banana, spinach, and protein powder smoothie",
                    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
                    "category": "beverage",
                    "mood_benefit": "Natural energy boost without the crash of caffeine"
                },
                {
                    "name": "Greek Yogurt with Granola",
                    "description": "Protein-rich yogurt with crunchy granola and honey",
                    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Protein and complex carbs provide sustained energy"
                },
                {
                    "name": "Quinoa Bowl with Vegetables",
                    "description": "Nutritious quinoa with roasted vegetables and tahini dressing",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "lunch",
                    "mood_benefit": "Complete protein and nutrients help combat fatigue"
                }
            ],
            "bored": [
                {
                    "name": "Fun Rainbow Fruit Salad",
                    "description": "Colorful mix of seasonal fruits in creative presentation",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "snack",
                    "mood_benefit": "Vibrant colors and variety stimulate the senses"
                },
                {
                    "name": "Interactive Sushi Roll Making",
                    "description": "DIY sushi with fresh ingredients and creative combinations",
                    "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
                    "category": "dinner",
                    "mood_benefit": "Engaging activity that makes eating fun and interactive"
                },
                {
                    "name": "Artistic Toast Creations",
                    "description": "Decorated toast with various toppings and designs",
                    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Creative food presentation adds excitement to meals"
                }
            ],
            "excited": [
                {
                    "name": "Celebratory Chocolate Cake",
                    "description": "Rich chocolate cake with festive decorations",
                    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                    "category": "dessert",
                    "mood_benefit": "Perfect treat to match your high energy and excitement"
                },
                {
                    "name": "Energizing Acai Bowl",
                    "description": "Vibrant acai bowl with granola, fruits, and coconut",
                    "image": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Antioxidant-rich superfood that matches your vibrant energy"
                },
                {
                    "name": "Spicy Tacos with Fresh Salsa",
                    "description": "Flavorful tacos with homemade salsa and fresh ingredients",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "dinner",
                    "mood_benefit": "Bold flavors and spices match your enthusiastic mood"
                }
            ],
            "neutral": [
                {
                    "name": "Balanced Buddha Bowl",
                    "description": "Quinoa, roasted vegetables, and protein with tahini dressing",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "lunch",
                    "mood_benefit": "Well-balanced meal to maintain your steady mood"
                },
                {
                    "name": "Herbal Tea Selection",
                    "description": "Assortment of calming herbal teas",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "beverage",
                    "mood_benefit": "Gentle and soothing, perfect for a calm state of mind"
                },
                {
                    "name": "Simple Grilled Chicken Salad",
                    "description": "Fresh greens with grilled chicken and light vinaigrette",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "lunch",
                    "mood_benefit": "Light and nutritious, maintains your balanced state"
                }
            ]
        }
    
    def get_recommendations(self, mood: str, count: int = 3) -> List[Dict[str, Any]]:
        """
        Get food recommendations based on mood
        
        Args:
            mood (str): The detected mood
            count (int): Number of recommendations to return
            
        Returns:
            List of food recommendation dictionaries
        """
        # Normalize mood to lowercase
        mood = mood.lower()
        
        # Get recommendations for the mood
        if mood in self.mood_food_mapping:
            recommendations = self.mood_food_mapping[mood]
        else:
            # Fallback to neutral recommendations
            recommendations = self.mood_food_mapping["neutral"]
        
        # Randomly select recommendations (avoid duplicates)
        selected = random.sample(recommendations, min(count, len(recommendations)))
        
        return selected
    
    def get_all_moods(self) -> List[str]:
        """
        Get list of all supported moods
        """
        return list(self.mood_food_mapping.keys())
    
    def get_food_categories(self) -> List[str]:
        """
        Get list of all food categories
        """
        categories = set()
        for mood_foods in self.mood_food_mapping.values():
            for food in mood_foods:
                categories.add(food["category"])
        return list(categories) 