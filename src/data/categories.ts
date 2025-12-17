import { SubCategory, GradientTemplate } from '@/types';

// Sub-categories for each content type
export const SUBCATEGORIES: Record<string, SubCategory[]> = {
  joke: [
    { id: 'general', label: 'General', description: 'Classic and versatile jokes' },
    { id: 'african', label: 'African', description: 'Cultural and regional humor' },
    { id: 'tech', label: 'Tech', description: 'Technology and programming jokes' },
    { id: 'work', label: 'Work/School', description: 'Office and academic humor' },
    { id: 'dad', label: 'Dad Jokes', description: 'Cheesy and wholesome humor' },
  ],
  riddle: [
    { id: 'easy', label: 'Easy', description: 'Simple and accessible riddles' },
    { id: 'hard', label: 'Hard', description: 'Challenging brain teasers' },
    { id: 'logic', label: 'Logic', description: 'Logical reasoning puzzles' },
    { id: 'wordplay', label: 'Wordplay', description: 'Language and word riddles' },
    { id: 'math', label: 'Math', description: 'Mathematical puzzles' },
  ],
  story: [
    { id: 'moral', label: 'Moral', description: 'Stories with meaningful lessons' },
    { id: 'funny', label: 'Funny', description: 'Humorous and entertaining tales' },
    { id: 'african', label: 'African Folktales', description: 'Traditional African stories' },
    { id: 'adventure', label: 'Adventure', description: 'Exciting adventure narratives' },
    { id: 'fantasy', label: 'Fantasy', description: 'Magical and imaginative stories' },
  ],
  fact: [
    { id: 'general', label: 'General', description: 'Interesting general knowledge facts' },
    { id: 'tech', label: 'Tech', description: 'Technology and science facts' },
    { id: 'body', label: 'Human Body', description: 'Amazing facts about the human body' },
    { id: 'african', label: 'African', description: 'Facts about Africa and its culture' },
    { id: 'mindblowing', label: 'Mind-Blowing', description: 'Truly surprising and incredible facts' },
  ],
  pickup: [
    { id: 'cute', label: 'Cute', description: 'Sweet and endearing pickup lines' },
    { id: 'funny', label: 'Funny', description: 'Humorous and lighthearted lines' },
    { id: 'romantic', label: 'Romantic', description: 'Love and romance focused' },
    { id: 'bold', label: 'Bold/Confident', description: 'Direct and confident approaches' },
    { id: 'tech', label: 'Tech', description: 'Technology-themed pickup lines' },
  ],
  meme: [
    { id: 'relatable', label: 'Relatable', description: 'Universally relatable content' },
    { id: 'work', label: 'Work/School', description: 'Professional and academic humor' },
    { id: 'tech', label: 'Tech', description: 'Technology and internet culture' },
    { id: 'african', label: 'African', description: 'African culture and lifestyle' },
    { id: 'random', label: 'Random', description: 'Surprising and unexpected content' },
  ],
};

// Background templates for each content type
export const JOKES_TEMPLATES: GradientTemplate[] = [
  { colors: ['#9B5FFF', '#3D8DFF'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FF60A8', '#9B5FFF'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FEF3C7', '#FDE68A'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#10B981', '#6EE7B7'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#F97316', '#FDBA74'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

export const RIDDLES_TEMPLATES: GradientTemplate[] = [
  { colors: ['#1E3A8A', '#3B82F6'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#6366F1', '#8B5FFF'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#F3F4F6', '#E5E7EB'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#0891B2', '#06B6D4'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#7C3AED', '#A855F7'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

export const STORIES_TEMPLATES: GradientTemplate[] = [
  { colors: ['#EA580C', '#DC2626'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#DBEAFE', '#93C5FD'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FECACA', '#F87171'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FEF3C7', '#FDE68A'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#06B6D4', '#22D3EE'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

export const FACTS_TEMPLATES: GradientTemplate[] = [
  { colors: ['#0891B2', '#0EA5E9'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#059669', '#10B981'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#EA580C', '#F97316'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FEF3C7', '#FDE68A'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#8B5FFF', '#A78BFA'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

export const PICKUP_TEMPLATES: GradientTemplate[] = [
  { colors: ['#FF60A8', '#F43F5E'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#A855F7', '#C084FC'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#9B5FFF', '#A855F7'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FF60A8', '#F472B6'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#06B6D4', '#22D3EE'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

export const MEMES_TEMPLATES: GradientTemplate[] = [
  { colors: ['#9B5FFF', '#3D8DFF'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FF60A8', '#9B5FFF'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#111827', '#1F2937'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#F3F4F6', '#E5E7EB'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  { colors: ['#FECACA', '#F87171'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
];

// Helper functions
export const getSubCategories = (contentType: string): SubCategory[] => {
  return SUBCATEGORIES[contentType] || [];
};

export const getRandomTemplate = (contentType: string): GradientTemplate => {
  const templatesMap: Record<string, GradientTemplate[]> = {
    joke: JOKES_TEMPLATES,
    riddle: RIDDLES_TEMPLATES,
    story: STORIES_TEMPLATES,
    fact: FACTS_TEMPLATES,
    pickup: PICKUP_TEMPLATES,
    meme: MEMES_TEMPLATES,
  };
  
  const templates = templatesMap[contentType];
  if (!templates) return JOKES_TEMPLATES[0];
  
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

export const getTemplateByIndex = (contentType: string, index: number): GradientTemplate => {
  const templatesMap: Record<string, GradientTemplate[]> = {
    joke: JOKES_TEMPLATES,
    riddle: RIDDLES_TEMPLATES,
    story: STORIES_TEMPLATES,
    fact: FACTS_TEMPLATES,
    pickup: PICKUP_TEMPLATES,
    meme: MEMES_TEMPLATES,
  };
  
  const templates = templatesMap[contentType];
  if (!templates) return JOKES_TEMPLATES[0];
  
  const validIndex = Math.max(0, Math.min(templates.length - 1, index));
  return templates[validIndex];
};