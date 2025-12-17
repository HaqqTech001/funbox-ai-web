import { AIResponse } from '@/types';

const BACKEND_API_URL = 'http://localhost:3001/api';

export const generateContent = async (
  contentType: string,
  prompt: string = '',
  subCategory?: string,
  imageBase64?: string
): Promise<AIResponse> => {
  try {
    console.log('Calling backend API for content generation...');
    
    const response = await fetch(`${BACKEND_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType,
        prompt,
        subCategory,
        imageBase64,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.caption && data.templateIndex !== undefined) {
      console.log('Content generated successfully from backend');
      return {
        caption: data.caption,
        templateIndex: data.templateIndex,
      };
    } else {
      throw new Error('Invalid response format from backend');
    }
  } catch (error) {
    console.error('Error generating content:', error);
    
    // Return fallback response
    return {
      caption: generateFallbackContent(contentType, subCategory),
      templateIndex: Math.floor(Math.random() * 5),
    };
  }
};

const generateFallbackContent = (contentType: string, subCategory?: string): string => {
  const fallbackContent: Record<string, string> = {
    joke: "😅 Oops! I'm having trouble generating a joke right now. Try again in a moment!",
    riddle: "🤔 My brain is taking a quick break from riddles. Give me another shot!",
    story: "📚 I'm currently crafting your story. Please try again shortly!",
    fact: "💡 I'm researching an amazing fact for you. Try again in a moment!",
    pickup: "💕 My charm circuits are warming up. Give me another try!",
    meme: "🎭 I'm working on your meme magic. Try again shortly!",
  };

  return fallbackContent[contentType] || "I'm having a small hiccup. Please try again!";
};