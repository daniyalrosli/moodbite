# Moodbite 🍽️😊

An AI-powered web application that analyzes your mood and recommends the perfect food to match your emotional state.

## 🎯 Features

- **Mood Analysis**: AI-powered emotion classification from text input
- **Smart Food Recommendations**: Personalized food suggestions based on detected mood
- **Beautiful UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **Real-time Analysis**: Instant mood detection and food pairing
- **History Tracking**: Save and review your mood-food journey (optional)

## 🧱 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: FastAPI, Python 3.11+
- **AI/NLP**: Hugging Face Transformers (emotion classification)
- **Database**: MongoDB (for history tracking)
- **Styling**: Tailwind CSS with shadcn/ui components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- MongoDB (optional, for history features)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables
Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `.env` in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/moodbite
```

## 📁 Project Structure

```
moodbite/
├── frontend/          # Next.js application
├── backend/           # FastAPI server
├── models/           # AI model files
└── README.md
```

## 🎨 Mood-Food Mapping

- **Happy**: Fresh fruits, smoothies, colorful salads
- **Sad**: Comfort foods, chocolate, warm soups
- **Stressed**: Calming teas, nuts, dark chocolate
- **Tired**: Energy-boosting foods, coffee, protein-rich meals
- **Anxious**: Soothing foods, chamomile tea, bananas
- **Angry**: Cooling foods, mint, calming beverages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 