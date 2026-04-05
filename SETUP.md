# 🚀 Moodbite Setup & Deployment Guide

## Prerequisites

- **Node.js**: 18.x or higher
- **Python**: 3.11 or higher
- **MongoDB**: 5.0 or higher
- **Docker**: Optional (for containerized setup)
- **Docker Compose**: Optional (for multi-container deployment)

## Local Development Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env

# Start MongoDB (ensure it's running)
# mongod --dbpath /path/to/your/data

# Run FastAPI server
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp ../.env.example .env.local

# Update .env.local if needed:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Docker Setup

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

This starts:

- **Frontend** on `http://localhost:3000`
- **Backend** on `http://localhost:8000`
- **MongoDB** on `localhost:27017`

### Building Individual Docker Images

**Backend:**

```bash
docker build -t moodbite-backend:latest -f backend/Dockerfile .
docker run -p 8000:8000 -e MONGODB_URI=mongodb://host.docker.internal:27017/moodbite moodbite-backend:latest
```

**Frontend:**

```bash
docker build -t moodbite-frontend:latest -f frontend/Dockerfile .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 moodbite-frontend:latest
```

## Environment Variables

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

## Database Setup

### MongoDB Local Installation

**macOS (with Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu:**

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

**Using Docker:**

```bash
docker run -d -p 27017:27017 --name moodbite-mongo mongo:7.0
```

## Available API Endpoints

### Mood Analysis

- `POST /analyze-mood` - Analyze mood and get food recommendations
- `GET /moods` - Get list of supported moods
- `GET /health` - Health check

### User History

- `GET /history/{user_id}` - Get user's mood analysis history
- `DELETE /history/{user_id}` - Clear user's history

### Favorites

- `POST /favorites/{user_id}` - Add food to favorites
- `GET /favorites/{user_id}` - Get user's favorite foods
- `DELETE /favorites/{user_id}/{food_name}` - Remove food from favorites

### Preferences

- `POST /preferences/{user_id}` - Update user preferences
- `GET /preferences/{user_id}` - Get user preferences

### Analytics

- `GET /stats/{user_id}` - Get mood statistics for user

See API documentation at `http://localhost:8000/docs` (Swagger UI)

## Running Tests

### Frontend

```bash
cd frontend
npm run lint
```

### Backend

```bash
cd backend
pip install pytest pytest-cov
pytest -v
```

## Building for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Deployment Options

### Vercel (Frontend)

```bash
# Push to GitHub and connect repository
# Frontend will auto-deploy on push to main
```

### Render (Backend)

```bash
# Push to GitHub and connect repository
# Set environment variables on Render dashboard
# Auto-deploys on push to main
```

### Netlify (Frontend Alternative)

```bash
# Connect GitHub repository
# Set build command: npm run build
# Set publish directory: .next
```

### AWS / GCP / Azure

Use Docker images for containerized deployment:

```bash
docker-compose build
docker push <image-registry>/<username>/moodbite-frontend:latest
docker push <image-registry>/<username>/moodbite-backend:latest
```

## Troubleshooting

### Backend Connection Issues

- Ensure MongoDB is running: `mongosh` or `mongo`
- Check MONGODB_URI is correct
- Verify FastAPI is accessible: `curl http://localhost:8000/health`

### Frontend API Errors

- Verify NEXT_PUBLIC_API_URL is set correctly
- Check CORS configuration in backend
- Ensure backend is running and accessible

### Docker Issues

- Clear Docker cache: `docker system prune`
- Rebuild images: `docker-compose build --no-cache`
- Check Docker logs: `docker-compose logs`

## Development Tips

- Use `npm run dev` for frontend hot reload
- Use `--reload` flag with uvicorn for backend hot reload
- Monitor logs: `tail -f logs/*.log`
- Use MongoDB Compass for database visualization

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit pull request

## Support

For issues and questions:

- Check existing GitHub issues
- Review API documentation at `/docs`
- Check logs for detailed error messages
