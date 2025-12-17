import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Sparkles, Play, Image, History, Info, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/features', label: 'Features', icon: Sparkles },
    { path: '/app', label: 'Try FunBox', icon: Play },
    { path: '/memes', label: 'Meme Generator', icon: Image },
    { path: '/history', label: 'History', icon: History },
    { path: '/about', label: 'About', icon: Info },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <div className="min-h-screen bg-page-dark text-text-primary-dark transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface-dark/50 backdrop-blur-lg border-b border-border-dark sticky top-0 z-50">
        <div className=" mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group justify-center">
              <div className="w-12 h-8 group-hover:scale-105 transition-transform duration-300">
                {/* <img 
                  src="/logo-modern.svg" 
                  alt="FunBoxAi Logo" 
                  className="w-full h-full object-contain"
                /> */}
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-heading font-bold text-gradient">
                  FunBox AI
                </h1>
                <p className="text-sm text-text-secondary-dark">
                  Where Fun Meets AI
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-text-secondary-dark hover:text-text-primary-dark hover:bg-surface-dark'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {/* User Menu (Desktop) */}
              {user ? (
                <div className="relative hidden lg:block" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface-dark transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-text-primary-dark">
                      {user.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-surface-dark border border-border-dark rounded-lg shadow-lg py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-border-dark">
                          <p className="text-sm font-medium text-text-primary-dark">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-secondary-dark">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/settings');
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-text-secondary-dark hover:bg-surface-dark hover:text-text-primary-dark transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-text-secondary-dark hover:text-text-primary-dark px-3 py-2 rounded-lg hover:bg-surface-dark transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-surface-dark transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-surface-dark/90 backdrop-blur-lg border-t border-border-dark"
            >
              <nav className="max-w-7xl mx-auto px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-text-secondary-dark hover:text-text-primary-dark hover:bg-surface-dark'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-border-dark">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary-dark">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-secondary-dark">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/settings');
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-surface-dark transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-surface-dark transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dark/50 backdrop-blur-lg border-t border-border-dark py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
           <Link to="/" className="flex items-center space-x-3 group justify-center">
              <div className="w-12 h-8 group-hover:scale-105 transition-transform duration-300">
                {/* <img 
                  src="/logo-modern.svg" 
                  alt="FunBoxAi Logo" 
                  className="w-full h-full object-contain"
                /> */}
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-heading font-bold text-gradient">
                  FunBox AI
                </h1>
                <p className="text-sm text-text-secondary-dark">
                  Where Fun Meets AI
                </p>
              </div>
            </Link>
            <div className="text-center md:text-right">
              <p className="text-text-secondary-dark text-sm">
                © 2025 FunBox AI. Made with ❤️ for entertainment.
              </p>
              <p className="text-text-secondary-dark text-xs mt-1">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;