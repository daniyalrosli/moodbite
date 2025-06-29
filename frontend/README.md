# Moodbite Frontend

The frontend application for Moodbite - an AI-powered mood analysis and food recommendation system.

## Features

- 🎨 Modern, responsive UI built with Next.js 14 and Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🧠 Real-time mood analysis via AI
- 🍽️ Personalized food recommendations
- 📱 Mobile-friendly design
- 🎯 Beautiful shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── MoodAnalyzer.tsx   # Mood input form
│   └── FoodRecommendations.tsx # Results display
├── lib/                   # Utilities
│   └── api.ts            # API client
├── types/                 # TypeScript types
└── public/               # Static assets
```

## API Integration

The frontend communicates with the FastAPI backend for:
- Mood analysis
- Food recommendations
- Health checks

Make sure the backend is running on `http://localhost:8000` before using the frontend.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The frontend can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

For Vercel deployment:
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push 