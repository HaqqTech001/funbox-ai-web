// Type definitions for FunBox AI Web App

export type ContentType = 'joke' | 'riddle' | 'story' | 'fact' | 'pickup' | 'meme';

export interface SubCategory {
  id: string;
  label: string;
  description: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  subCategory?: string;
  content: string;
  templateIndex: number;
  createdAt: string;
  imageUrl?: string; // For memes
}

export interface AIResponse {
  caption: string;
  templateIndex: number;
}

export interface AppSettings {
  darkMode: boolean;
  history: ContentItem[];
}

export interface GradientTemplate {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export interface BackgroundTemplate {
  type: 'gradient' | 'image';
  template: GradientTemplate;
  name: string;
}