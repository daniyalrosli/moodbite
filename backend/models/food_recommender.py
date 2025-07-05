from typing import List, Dict, Any
import random

class FoodRecommender:
    def __init__(self):
        """
        Initialize the food recommender with mood-food mappings using Malaysian cuisine
        """
        self.mood_food_mapping = {
            "happy": [
                {
                    "name": "Nasi Lemak",
                    "description": "Fragrant coconut rice with sambal, crispy anchovies, and boiled egg",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Malaysia's national dish brings joy and comfort with its rich flavors"
                },
                {
                    "name": "Cendol",
                    "description": "Sweet dessert with green rice flour jelly, coconut milk, and palm sugar",
                    "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
                    "category": "dessert",
                    "mood_benefit": "Refreshing and sweet, perfect for celebrating happy moments"
                },
                {
                    "name": "Satay",
                    "description": "Grilled meat skewers with peanut sauce and cucumber onion relish",
                    "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
                    "category": "appetizer",
                    "mood_benefit": "Social food that brings people together and spreads joy"
                }
            ],
            "sad": [
                {
                    "name": "Bubur Lambuk",
                    "description": "Comforting rice porridge with meat, vegetables, and aromatic spices",
                    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
                    "category": "comfort",
                    "mood_benefit": "Warm and nourishing, like a hug from Malaysian grandmother"
                },
                {
                    "name": "Teh Tarik",
                    "description": "Pulled tea with condensed milk, smooth and comforting",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "beverage",
                    "mood_benefit": "Soothing and sweet, helps lift spirits with its creamy warmth"
                },
                {
                    "name": "Kuih Lapis",
                    "description": "Layered steamed cake with coconut milk and pandan flavor",
                    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                    "category": "dessert",
                    "mood_benefit": "Soft and sweet, provides comfort and gentle energy"
                }
            ],
            "angry": [
                {
                    "name": "Air Bandung",
                    "description": "Cooling rose syrup drink with milk, refreshing and calming",
                    "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
                    "category": "beverage",
                    "mood_benefit": "Cooling and sweet, helps calm heated emotions"
                },
                {
                    "name": "Cucur Udang",
                    "description": "Crispy prawn fritters with cooling cucumber and chili sauce",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "snack",
                    "mood_benefit": "Crunchy texture helps release tension, cooling accompaniments soothe"
                },
                {
                    "name": "Ais Kacang",
                    "description": "Shaved ice dessert with red beans, sweet corn, and rose syrup",
                    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
                    "category": "dessert",
                    "mood_benefit": "Cooling and refreshing, perfect for calming anger"
                }
            ],
            "anxious": [
                {
                    "name": "Teh O Ais",
                    "description": "Iced tea without milk, light and calming",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "beverage",
                    "mood_benefit": "Light and refreshing, helps reduce anxiety without heaviness"
                },
                {
                    "name": "Pisang Goreng",
                    "description": "Crispy fried bananas, simple and comforting",
                    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                    "category": "snack",
                    "mood_benefit": "Familiar comfort food that provides gentle energy"
                },
                {
                    "name": "Bubur Cha Cha",
                    "description": "Sweet potato and yam dessert soup with coconut milk",
                    "image": "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400",
                    "category": "dessert",
                    "mood_benefit": "Warm and grounding, helps stabilize mood with natural sweetness"
                }
            ],
            "stressed": [
                {
                    "name": "Teh Halia",
                    "description": "Ginger tea, warming and stress-relieving",
                    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
                    "category": "tea",
                    "mood_benefit": "Ginger's natural properties help reduce stress and promote calm"
                },
                {
                    "name": "Kuih Dadar",
                    "description": "Pandan crepes filled with coconut and palm sugar",
                    "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
                    "category": "dessert",
                    "mood_benefit": "Pandan's natural aroma has calming effects on the mind"
                },
                {
                    "name": "Roti Canai",
                    "description": "Flaky flatbread with curry sauce, simple and satisfying",
                    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
                    "category": "breakfast",
                    "mood_benefit": "Comforting and familiar, helps ground stressed emotions"
                }
            ],
            "tired": [
                {
                    "name": "Kopi Tarik",
                    "description": "Pulled coffee with condensed milk, energizing Malaysian style",
                    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
                    "category": "beverage",
                    "mood_benefit": "Strong coffee with smooth milk provides natural energy boost"
                },
                {
                    "name": "Mee Goreng",
                    "description": "Stir-fried noodles with vegetables, egg, and spicy sauce",
                    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
                    "category": "lunch",
                    "mood_benefit": "Spicy and flavorful, helps wake up tired senses"
                },
                {
                    "name": "Rendang",
                    "description": "Slow-cooked beef in coconut milk and spices, rich and nourishing",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "dinner",
                    "mood_benefit": "Protein-rich and flavorful, provides sustained energy"
                }
            ],
            "bored": [
                {
                    "name": "Rojak",
                    "description": "Mixed fruit and vegetable salad with sweet-spicy sauce",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "appetizer",
                    "mood_benefit": "Colorful and varied textures stimulate the senses"
                },
                {
                    "name": "Char Kuey Teow",
                    "description": "Stir-fried flat rice noodles with prawns, egg, and bean sprouts",
                    "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
                    "category": "dinner",
                    "mood_benefit": "Exciting flavors and textures make eating an adventure"
                },
                {
                    "name": "Popiah",
                    "description": "Fresh spring rolls with vegetables and sweet sauce",
                    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
                    "category": "appetizer",
                    "mood_benefit": "Interactive food that requires attention and engagement"
                }
            ],
            "excited": [
                {
                    "name": "Durian",
                    "description": "King of fruits with rich, creamy texture and strong aroma",
                    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                    "category": "fruit",
                    "mood_benefit": "Bold and unique flavor matches your enthusiastic energy"
                },
                {
                    "name": "Laksa",
                    "description": "Spicy noodle soup with coconut milk, prawns, and aromatic herbs",
                    "image": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
                    "category": "soup",
                    "mood_benefit": "Bold flavors and spices match your vibrant excitement"
                },
                {
                    "name": "Sambal Udang",
                    "description": "Spicy prawns in chili sauce, fiery and exciting",
                    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    "category": "main",
                    "mood_benefit": "Intense flavors and heat match your high energy"
                }
            ],
            "neutral": [
                {
                    "name": "Nasi Campur",
                    "description": "Mixed rice with various side dishes, balanced and complete",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "lunch",
                    "mood_benefit": "Well-balanced meal to maintain your steady mood"
                },
                {
                    "name": "Teh O",
                    "description": "Plain tea without milk, simple and grounding",
                    "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    "category": "beverage",
                    "mood_benefit": "Simple and soothing, perfect for a calm state of mind"
                },
                {
                    "name": "Ikan Bakar",
                    "description": "Grilled fish with simple herbs and spices",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    "category": "main",
                    "mood_benefit": "Light and nutritious, maintains your balanced state"
                }
            ]
        }
    
    def get_recommendations(self, mood: str, count: int = 3) -> List[Dict[str, Any]]:
        """
        Get Malaysian food recommendations based on mood
        
        Args:
            mood (str): The detected mood
            count (int): Number of recommendations to return
            
        Returns:
            List of Malaysian food recommendation dictionaries
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
        Get list of all Malaysian food categories
        """
        categories = set()
        for mood_foods in self.mood_food_mapping.values():
            for food in mood_foods:
                categories.add(food["category"])
        return list(categories) 