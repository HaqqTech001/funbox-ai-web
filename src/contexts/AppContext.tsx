import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ContentItem, AppSettings } from '@/types';
import { getSettings, updateSettings, getDarkMode, setDarkMode, STORAGE_KEYS } from '@/utils/storage';

interface AppState {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

interface AppContextType extends AppState {
  updateDarkMode: (darkMode: boolean) => void;
  addToHistory: (item: Omit<ContentItem, 'id' | 'createdAt'>) => ContentItem;
  clearHistory: () => void;
  deleteFromHistory: (id: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'UPDATE_DARK_MODE'; payload: boolean }
  | { type: 'ADD_TO_HISTORY'; payload: ContentItem }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'DELETE_FROM_HISTORY'; payload: string };

const initialState: AppState = {
  settings: {
    darkMode: true,
    history: [],
  },
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    

    
    case 'UPDATE_DARK_MODE':
      return {
        ...state,
        settings: { ...state.settings, darkMode: action.payload },
      };
    
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        settings: {
          ...state.settings,
          history: [action.payload, ...state.settings.history],
        },
      };
    
    case 'CLEAR_HISTORY':
      return {
        ...state,
        settings: {
          ...state.settings,
          history: [],
        },
      };
    
    case 'DELETE_FROM_HISTORY':
      return {
        ...state,
        settings: {
          ...state.settings,
          history: state.settings.history.filter(item => item.id !== action.payload),
        },
      };
    
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        // First, check localStorage directly and parse it
        const directHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        console.log('Direct localStorage check - raw:', directHistory);
        
        let historyFromStorage = [];
        if (directHistory) {
          try {
            historyFromStorage = JSON.parse(directHistory);
            console.log('Parsed history from localStorage:', historyFromStorage.length, 'items');
          } catch (parseError) {
            console.error('Error parsing history from localStorage:', parseError);
          }
        }
        
        const settings = getSettings();
        console.log('Loaded settings via getSettings():', settings);
        console.log('History length from getSettings():', settings.history.length);
        
        // Force use the history from localStorage if we have it
        if (historyFromStorage.length > 0) {
          settings.history = historyFromStorage;
          console.log('Using history from direct localStorage load:', historyFromStorage.length, 'items');
        }
        
        dispatch({ type: 'SET_SETTINGS', payload: settings });
        
        // Apply dark mode to document
        if (settings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Mark as initialized after loading
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading settings:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load settings' });
        setIsInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Save history to localStorage only after initialization and when history actually changes
  useEffect(() => {
    if (isInitialized && state.settings.history.length >= 0) {
      console.log('Saving history to localStorage:', state.settings.history.length, 'items');
      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.settings.history));
        console.log('History saved successfully');
        
        // Verify the save worked
        const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
        console.log('Verification - saved data length:', saved ? JSON.parse(saved).length : 0);
      } catch (error) {
        console.error('Error saving history to localStorage:', error);
      }
    }
  }, [state.settings.history, isInitialized]);

  // Save history on page unload to ensure it's saved before closing
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Page unloading, saving history:', state.settings.history.length, 'items');
      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.settings.history));
        console.log('History saved on page unload');
      } catch (error) {
        console.error('Error saving history on unload:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state.settings.history]);

  const updateDarkMode = (darkMode: boolean) => {
    dispatch({ type: 'UPDATE_DARK_MODE', payload: darkMode });
    setDarkMode(darkMode);
    
    // Apply to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addToHistory = (item: Omit<ContentItem, 'id' | 'createdAt'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: new Date().toISOString(),
    };
    
    console.log('Adding to history:', newItem);
    
    // Calculate the new history array BEFORE dispatching
    const currentHistory = state.settings.history;
    const newHistory = [newItem, ...currentHistory].slice(0, 100); // Keep last 100 items
    
    console.log('Current history length:', currentHistory.length);
    console.log('New history length:', newHistory.length);
    
    // Manually save to localStorage immediately with the correct data
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
      console.log('Manual save to localStorage completed:', newHistory.length, 'items');
      
      // Verify the save
      const verify = localStorage.getItem(STORAGE_KEYS.HISTORY);
      console.log('Verification after manual save:', verify ? JSON.parse(verify).length : 0, 'items');
    } catch (error) {
      console.error('Error in manual save:', error);
    }
    
    // Now dispatch the update to React state
    dispatch({ type: 'ADD_TO_HISTORY', payload: newItem });
    
    return newItem;
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  const deleteFromHistory = (id: string) => {
    dispatch({ type: 'DELETE_FROM_HISTORY', payload: id });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const contextValue: AppContextType = {
    ...state,
    updateDarkMode,
    addToHistory,
    clearHistory,
    deleteFromHistory,
    setError,
    clearError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};