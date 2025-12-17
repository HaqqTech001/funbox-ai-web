import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('funboxai_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('funboxai_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const generateUserId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }
      if (!name.trim()) {
        throw new Error('Name is required');
      }

      const existingUsers = JSON.parse(localStorage.getItem('funboxai_users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: generateUserId(),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
      };

      const userData = {
        ...newUser,
        password: btoa(password), // Simple encoding (not secure, for demo only)
      };

      // Save to storage
      existingUsers.push(userData);
      localStorage.setItem('funboxai_users', JSON.stringify(existingUsers));
      localStorage.setItem('funboxai_user', JSON.stringify(newUser));
      
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Validation
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }

      // Find user
      const existingUsers = JSON.parse(localStorage.getItem('funboxai_users') || '[]');
      const foundUser = existingUsers.find((u: any) => 
        u.email === email.toLowerCase().trim() && 
        u.password === btoa(password)
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const user: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
      };

      localStorage.setItem('funboxai_user', JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('funboxai_user');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const updatedUser = { ...user, ...updates };
      
      // Update in localStorage
      localStorage.setItem('funboxai_user', JSON.stringify(updatedUser));
      
      // Update in users array
      const existingUsers = JSON.parse(localStorage.getItem('funboxai_users') || '[]');
      const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem('funboxai_users', JSON.stringify(existingUsers));
      }
      
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};