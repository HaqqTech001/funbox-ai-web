# FunBox AI Backend Setup

## Quick Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3001
   ```

3. **Start Backend**
   ```bash
   npm run start
   # or for development with auto-restart:
   npm run dev
   ```

## Features

- **Rate Limiting**: 10 requests per minute per IP
- **CORS Enabled**: Configured for localhost:5173 (Vite dev server)
- **Error Handling**: Graceful fallbacks for API failures
- **Health Check**: `/api/health` endpoint for monitoring

## API Endpoints

- `POST /api/generate` - Generate AI content
- `GET /api/health` - Health check

## Environment Variables

- `GEMINI_API_KEY` (required): Your Gemini API key
- `PORT` (optional): Server port (default: 3001)