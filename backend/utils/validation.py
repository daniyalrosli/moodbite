"""
Input validation utilities for the backend
"""

import re
from typing import Tuple

def validate_mood_text(text: str) -> Tuple[bool, str | None]:
    """Validate mood analysis input text"""
    if not text or not isinstance(text, str):
        return False, "Text input is required"
    
    text = text.strip()
    
    if len(text) < 3:
        return False, "Text must be at least 3 characters long"
    
    if len(text) > 500:
        return False, "Text must not exceed 500 characters"
    
    # Check for mostly special characters or spam patterns
    if len(re.sub(r'[^a-zA-Z0-9\s]', '', text)) / len(text) < 0.3:
        return False, "Text contains too many special characters"
    
    return True, None

def validate_user_id(user_id: str) -> Tuple[bool, str | None]:
    """Validate user ID format"""
    if not user_id or not isinstance(user_id, str):
        return False, "User ID is required"
    
    if not re.match(r'^[a-zA-Z0-9\-_]{3,50}$', user_id):
        return False, "Invalid user ID format"
    
    return True, None

def validate_dietary_restrictions(restrictions: list) -> Tuple[bool, str | None]:
    """Validate dietary restrictions list"""
    valid_restrictions = {
        'vegan',
        'vegetarian',
        'gluten-free',
        'dairy-free',
        'nut-free',
        'shellfish-free',
        'kosher',
        'halal'
    }
    
    if not isinstance(restrictions, list):
        return False, "Restrictions must be a list"
    
    for restriction in restrictions:
        if restriction.lower() not in valid_restrictions:
            return False, f"Invalid dietary restriction: {restriction}"
    
    return True, None

def sanitize_input(text: str) -> str:
    """Sanitize user input to prevent injection attacks"""
    # Remove potential HTML/script tags
    text = re.sub(r'[<>]', '', text)
    # Limit length
    text = text[:500]
    return text.strip()
