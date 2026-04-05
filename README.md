# Moodbite 🍽️😊

An AI-powered web application that analyzes your mood and recommends the perfect food to match your emotional state.

## 🎯 Features

- **🧠 Mood Analysis**: Advanced AI-powered emotion classification from text input
- **🍽️ Smart Food Recommendations**: Personalized food suggestions based on detected mood
- **🎵 Spotify Music Recommendations**: Mood-based playlists and track suggestions powered by Spotify Web API
- **✨ Beautiful UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **⚡ Real-time Analysis**: Instant mood detection and recommendations
- **📊 History Tracking**: Save and review your mood-food journey
- **❤️ Favorites System**: Bookmark your favorite food and music recommendations
- **📈 Statistics**: Track mood patterns and trends over time
- **🔐 Input Validation**: Secure input handling and validation
- **🐳 Containerized**: Docker and Docker Compose support for easy deployment
- **🚀 CI/CD Pipeline**: Automated testing and building with GitHub Actions

## 🧱 Tech Stack

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: Custom, shadcn/ui inspired

### Backend

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: MongoDB (async with Motor)
- **Async**: Built on asyncio

### AI/ML

- **NLP**: Hugging Face Transformers
- **Models**: DistilBERT emotion classification
- **Fallback**: Keyword-based mood analysis

### Deployment

- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway
- **Database**: MongoDB Atlas
- **Containerization**: Docker, Docker Compose

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **Python**: 3.11 or higher
- **MongoDB**: 5.0 or higher (or use MongoDB Atlas)
- **Docker** (optional): For containerized setup

### Local Development

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

#### Frontend Setup

```bash
cd frontend
npm install
cp ../.env.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`

### Docker Setup (Recommended)

```bash
docker-compose up -d
```

This starts:

- Frontend on `http://localhost:3000`
- Backend on `http://localhost:8000`
- MongoDB on `localhost:27017`

## 📁 Project Structure

```
moodbite/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── models/
│   │   ├── mood_analyzer.py    # Emotion classification
│   │   └── food_recommender.py # Food recommendation logic
│   ├── utils/
│   │   └── validation.py       # Input validation
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx       # About page
│   │   └── how-it-works/page.tsx
│   ├── components/
│   │   ├── MoodAnalyzer.tsx
│   │   ├── FoodRecommendations.tsx
│   │   ├── History.tsx
│   │   ├── MoodStats.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── theme.tsx
│   │   └── validation.ts
│   ├── types/
│   │   └── index.ts
│   ├── package.json
│   └── Dockerfile
├── .github/workflows/          # CI/CD pipelines
├── docker-compose.yml
├── SETUP.md                    # Detailed setup guide
├── FEATURES.md                 # Feature list and roadmap
└── README.md
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup and deployment guide
- **[FEATURES.md](FEATURES.md)** - Feature list and roadmap
- **[API Docs](http://localhost:8000/docs)** - Interactive Swagger UI (when running locally)

## 🎨 Mood-Food Mapping

### Happy 😊

- Nasi Lemak, Cendol, Satay
- Fresh fruits, smoothies, colorful salads

### Sad 😢

- Bubur Lambuk, Teh Tarik, Kuih Lapis
- Warm soups, comfort foods, chocolate

### Stressed 😫

- Air Bandung, Cucur Udang, Ais Kacang
- Green tea, nuts, dark chocolate

### Anxious 😰

- Teh O Ais, Pisang Goreng, Bubur Cha Cha
- Chamomile tea, oatmeal, yogurt

### Tired 😴

- Coffee, Banana, Eggs
- Energy-boosting foods, protein-rich meals

### Angry 😠

- Cooling drinks, mint, calming foods
- Refreshing beverages, soothing foods

## 🔌 API Endpoints

### Core Endpoints

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| POST   | `/analyze-mood` | Analyze mood and get recommendations |
| GET    | `/moods`        | Get supported mood list              |
| GET    | `/health`       | Health check                         |

### User History

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/history/{user_id}` | Get mood history |
| DELETE | `/history/{user_id}` | Clear history    |

### Favorites

| Method | Endpoint                           | Description      |
| ------ | ---------------------------------- | ---------------- |
| POST   | `/favorites/{user_id}`             | Add to favorites |
| GET    | `/favorites/{user_id}`             | Get favorites    |
| DELETE | `/favorites/{user_id}/{food_name}` | Remove favorite  |

### Preferences

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| POST   | `/preferences/{user_id}` | Update preferences |
| GET    | `/preferences/{user_id}` | Get preferences    |

### Analytics

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/stats/{user_id}` | Get mood statistics |

## 🌍 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/moodbite
ENVIRONMENT=development
DEBUG=true
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

See [.env.example files](backend/.env.example) and [frontend/.env.example](frontend/.env.example) for complete options.

## 🧪 Testing

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
pip install pytest pytest-cov
pytest -v
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
git push origin main
# Auto-deploys to Vercel/Netlify
```

### Backend (Render/Railway)

```bash
git push origin main
# Auto-deploys with environment variables set in dashboard
```

### Using Docker Registry

```bash
docker build -t myregistry/moodbite-backend:latest -f backend/Dockerfile .
docker push myregistry/moodbite-backend:latest
```

See [SETUP.md](SETUP.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📋 Roadmap

See [FEATURES.md](FEATURES.md) for:

- ✅ Implemented features
- 🚀 Recently added features
- 📋 Planned features
- 🔧 Technical improvements

## 🐛 Known Issues & Limitations

- ML model requires ~2GB disk space
- First mood analysis may take 5-10 seconds (model loading)
- MongoDB Atlas free tier has document limit (512MB)
- Mobile experience not yet fully optimized

## 📝 License

MIT License - see LICENSE file for details

## 💡 Future Enhancements

- User authentication system
- Recipe generation with recommendations
- Social sharing features
- Mobile app (React Native)
- Multi-language support
- Dietary restriction filtering
- Gamification and achievements

## 📧 Support & Contact

For issues, questions, or suggestions:

- Open a GitHub issue
- Check existing discussions
- Review API documentation at `/docs`

## 🙏 Acknowledgments

- **Hugging Face** for transformer models
- **Next.js** and **FastAPI** communities
- **shadcn/ui** for component inspiration

---

Made with ❤️ for better mood-based eating habits
