import { ContentItem, AppSettings } from '@/types';

const STORAGE_KEYS = {
  HISTORY: 'funbox-ai-history',
  DARK_MODE: 'funbox-ai-dark-mode',
} as const;

// Dark Mode Management
export const getDarkMode = (): boolean => {
  const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
  return saved ? JSON.parse(saved) : true; // Default to dark mode
};

export const setDarkMode = (isDark: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark));
};

// History Management
export const getHistory = (): ContentItem[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const saveToHistory = (item: Omit<ContentItem, 'id' | 'createdAt'>): ContentItem => {
  const history = getHistory();
  const newItem: ContentItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  // Add to beginning of array (newest first)
  history.unshift(newItem);
  
  // Keep only the last 100 items to prevent storage bloat
  const trimmedHistory = history.slice(0, 100);
  
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmedHistory));
    return newItem;
  } catch (error) {
    console.error('Error saving to history:', error);
    // If storage is full, remove oldest items and try again
    const smallerHistory = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(smallerHistory));
    return newItem;
  }
};

export const deleteFromHistory = (id: string): void => {
  const history = getHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
};

export const clearHistory = (): void => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
};

export const getHistoryByType = (type: string): ContentItem[] => {
  const history = getHistory();
  return history.filter(item => item.type === type);
};

export const getHistoryBySubCategory = (type: string, subCategory: string): ContentItem[] => {
  const history = getHistory();
  return history.filter(item => item.type === type && item.subCategory === subCategory);
};

// Settings Management
export const getSettings = (): AppSettings => {
  return {
    darkMode: getDarkMode(),
    history: getHistory(),
  };
};

export const updateSettings = (settings: Partial<AppSettings>): AppSettings => {
  const currentSettings = getSettings();
  const updatedSettings = { ...currentSettings, ...settings };
  
  // Update individual storage items
  if (settings.darkMode !== undefined) {
    setDarkMode(settings.darkMode);
  }
  
  return updatedSettings;
};

// Helper function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Utility to check if app is properly configured
export const isAppConfigured = (): boolean => {
  return true; // App is always configured since we use backend API
};

// Export storage keys for use in components
export { STORAGE_KEYS };