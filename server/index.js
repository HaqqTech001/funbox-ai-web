const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Rate limiting - 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: {
    error: 'Too many requests, please try again later.'
  }
});

app.use('/api/', limiter);

// Your Gemini API Key (set in .env file)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in environment variables');
  process.exit(1);
}

// Generate content endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { contentType, prompt = '', subCategory, imageBase64 } = req.body;

    // Validate required fields
    if (!contentType) {
      return res.status(400).json({ error: 'Content type is required' });
    }

    // Enhanced system prompt
    const systemPrompt = `You are FunBox AI, a fun entertainment assistant specializing in jokes, riddles, stories, fun facts, pickup lines, and memes. Respond concisely, clearly, and with appropriate emojis. Always focus on the requested category and sub-category. Never ask unnecessary questions. Keep content safe, entertaining, and culturally respectful. Everything should feel lively, friendly, and fun.`;

    // Enhanced user prompt with sub-category context
    let userPrompt = '';
    
    if (subCategory) {
      userPrompt = `${prompt} Generate a ${subCategory} ${contentType}.`;
    } else {
      switch (contentType) {
        case 'joke':
          userPrompt = `${prompt} Generate a funny joke.`;
          break;
        case 'riddle':
          userPrompt = `${prompt} Generate an interesting riddle.`;
          break;
        case 'story':
          userPrompt = `${prompt} Generate an engaging short story.`;
          break;
        case 'fact':
          userPrompt = `${prompt} Generate an interesting fun fact.`;
          break;
        case 'pickup':
          userPrompt = `${prompt} Generate a smooth pickup line.`;
          break;
        case 'meme':
          userPrompt = `${prompt} Generate a funny meme caption.`;
          break;
        default:
          userPrompt = `${prompt} Generate interesting content.`;
      }
    }

    // Prepare request body
    const requestBody = {
      contents: [{
        parts: [
          { text: `${systemPrompt}\n\n${userPrompt}` }
        ]
      }],
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: getTokenLimit(contentType),
      }
    };

    // Add image if provided (for memes)
    if (imageBase64) {
      requestBody.contents[0].parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: imageBase64
        }
      });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API key configuration error');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const caption = data.candidates[0].content.parts[0].text.trim();
      const templateIndex = Math.floor(Math.random() * 5); // Random template selection
      
      res.json({
        caption,
        templateIndex,
      });
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error generating content:', error);
    
    // Return fallback response
    const fallbackContent = generateFallbackContent(req.body.contentType, req.body.subCategory);
    res.json({
      caption: fallbackContent,
      templateIndex: Math.floor(Math.random() * 5),
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'FunBox AI Backend'
  });
});

// Helper functions
function getTokenLimit(contentType) {
  switch (contentType) {
    case 'joke':
    case 'pickup':
      return 200;
    case 'riddle':
    case 'fact':
      return 300;
    case 'meme':
      return 250;
    case 'story':
      return 500;
    default:
      return 256;
  }
}

function generateFallbackContent(contentType, subCategory) {
  const fallbackContent = {
    joke: "😅 Oops! I'm having trouble generating a joke right now. Try again in a moment!",
    riddle: "🤔 My brain is taking a quick break from riddles. Give me another shot!",
    story: "📚 I'm currently crafting your story. Please try again shortly!",
    fact: "💡 I'm researching an amazing fact for you. Try again in a moment!",
    pickup: "💕 My charm circuits are warming up. Give me another try!",
    meme: "🎭 I'm working on your meme magic. Try again shortly!",
  };

  return fallbackContent[contentType] || "I'm having a small hiccup. Please try again!";
}

app.listen(PORT, () => {
  console.log(`🚀 FunBox AI Backend server running on port ${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}/api`);
});