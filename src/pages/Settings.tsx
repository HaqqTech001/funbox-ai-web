import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Key, 
  Moon, 
  Sun, 
  Trash2, 
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  User,
  Edit3,
  Calendar
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { settings, updateApiKey, updateDarkMode, clearHistory, setError } = useApp();
  const { user, updateProfile } = useAuth();
  const [tempApiKey, setTempApiKey] = useState(settings.apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileUpdateStatus, setProfileUpdateStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    settings.apiKey = "AIzaSyD4HctnmJarBhSJPrpZHC5yTCxM45mU2lw"
    setTempApiKey(settings.apiKey);
    setHasChanges(false);
  }, [settings.apiKey]);

  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
    }
  }, [user]);

  const handleProfileSave = async () => {
    if (!profileName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setProfileUpdateStatus('saving');
    
    try {
      const success = await updateProfile({
        name: profileName.trim(),
        email: profileEmail.toLowerCase().trim()
      });

      if (success) {
        setProfileUpdateStatus('saved');
        setIsEditingProfile(false);
        setTimeout(() => setProfileUpdateStatus('idle'), 3000);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      setProfileUpdateStatus('error');
      setError('Failed to update profile');
      setTimeout(() => setProfileUpdateStatus('idle'), 3000);
    }
  };

  const handleProfileCancel = () => {
    setProfileName(user?.name || '');
    setProfileEmail(user?.email || '');
    setIsEditingProfile(false);
    setProfileUpdateStatus('idle');
  };

  const handleApiKeyChange = (value: string) => {
    setTempApiKey(value);
    settings.apiKey="AIzaSyD4HctnmJarBhSJPrpZHC5yTCxM45mU2lw"
    setHasChanges(value !== settings.apiKey);
    setSaveStatus('idle');
  };

  const handleSaveApiKey = async () => {
    if (!tempApiKey.trim()) {
      setError('API key cannot be empty');
      return;
    }

    setSaveStatus('saving');
    
    try {
      // Test the API key with a simple request
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${tempApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Hello' }]
          }],
          generationConfig: {
            maxOutputTokens: 10,
          }
        }),
      });

      if (response.ok) {
        updateApiKey(tempApiKey);
        setSaveStatus('saved');
        setHasChanges(false);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        throw new Error('Invalid API key');
      }
    } catch (error) {
      setSaveStatus('error');
      setError('Invalid API key. Please check your Gemini API key and try again.');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all your history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Testing...';
      case 'saved':
        return 'Saved!';
      case 'error':
        return 'Error';
      default:
        return 'Save API Key';
    }
  };

  const getSaveButtonIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'saved':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Save className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Configure your FunBox AI experience and personalize your preferences
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* User Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white">
                  Profile Information
                </h2>
                <p className="text-text-secondary-dark">
                  Manage your account details and preferences
                </p>
              </div>
            </div>

            {user && (
              <div className="space-y-6">
                {/* Profile Display */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                      Full Name
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="input w-full"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-surface-dark rounded-lg">
                        <User className="w-5 h-5 text-text-secondary-dark" />
                        <span className="text-text-primary-dark">{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                      Email Address
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="input w-full"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-surface-dark rounded-lg">
                        <span className="text-text-secondary-dark">@</span>
                        <span className="text-text-primary-dark">{user.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-surface-dark rounded-lg">
                      <Calendar className="w-5 h-5 text-text-secondary-dark" />
                      <span className="text-text-primary-dark">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                      Account Status
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-surface-dark rounded-lg">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-text-primary-dark">Active</span>
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border-dark">
                  <div className="text-sm text-text-secondary-dark">
                    {profileUpdateStatus === 'saved' && (
                      <span className="text-success flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Profile updated successfully!</span>
                      </span>
                    )}
                    {profileUpdateStatus === 'error' && (
                      <span className="text-error flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Failed to update profile</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {isEditingProfile ? (
                      <>
                        <button
                          onClick={handleProfileCancel}
                          className="px-4 py-2 text-text-secondary-dark hover:text-text-primary-dark transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProfileSave}
                          disabled={profileUpdateStatus === 'saving'}
                          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                        >
                          {profileUpdateStatus === 'saving' ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : profileUpdateStatus === 'saved' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          <span>
                            {profileUpdateStatus === 'saving' 
                              ? 'Saving...' 
                              : profileUpdateStatus === 'saved' 
                                ? 'Saved!' 
                                : 'Save Changes'
                            }
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-surface-dark border border-border-dark hover:bg-surface-light text-text-primary-dark rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* API Key Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card hidden "
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white">
                  Gemini API Key
                </h2>
                <p className="text-text-secondary-dark">
                  Required for AI content generation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={tempApiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    placeholder="Enter your Gemini API key..."
                    className="input pr-12 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary-dark hover:text-text-primary-dark transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-surface-dark border border-border-dark rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-2">How to get your API key:</h4>
                    <ol className="text-sm text-text-secondary-dark space-y-1">
                      <li>1. Visit the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">Google AI Studio <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                      <li>2. Sign in with your Google account</li>
                      <li>3. Click "Create API Key" and copy it</li>
                      <li>4. Paste it above and save</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary-dark">
                  {settings.apiKey ? (
                    <span className="text-success">✓ API key configured</span>
                  ) : (
                    <span className="text-warning">⚠ No API key configured</span>
                  )}
                </div>
                
                <button
                  onClick={handleSaveApiKey}
                  disabled={!hasChanges || saveStatus === 'saving'}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    hasChanges && saveStatus !== 'saving'
                      ? 'btn-primary'
                      : 'bg-surface-dark border border-border-dark text-text-secondary-dark cursor-not-allowed'
                  }`}
                >
                  {getSaveButtonIcon()}
                  <span>{getSaveButtonText()}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                {settings.darkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white">
                  Appearance
                </h2>
                <p className="text-text-secondary-dark">
                  Customize your viewing experience
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">Dark Mode</h3>
                <p className="text-sm text-text-secondary-dark">
                  Switch between dark and light themes
                </p>
              </div>
              
              <button
                onClick={() => updateDarkMode(!settings.darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  settings.darkMode ? 'bg-primary' : 'bg-surface-dark'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div> */}

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white">
                  Data Management
                </h2>
                <p className="text-text-secondary-dark">
                  Manage your stored data and preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-dark rounded-lg">
                <div>
                  <h3 className="font-medium text-white mb-1">History</h3>
                  <p className="text-sm text-text-secondary-dark">
                    Clear all your generated content history ({settings.history.length} items)
                  </p>
                </div>
                
                <button
                  onClick={handleClearHistory}
                  disabled={settings.history.length === 0}
                  className="btn-secondary text-error hover:bg-error/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear History
                </button>
              </div>

              <div className="p-4 bg-surface-dark rounded-lg">
                <h3 className="font-medium text-white mb-2">Storage Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary-dark">History Items:</span>
                    <span className="text-text-primary-dark">{settings.history.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary-dark">API Key:</span>
                    <span className="text-text-primary-dark">
                      {settings.apiKey ? 'Configured' : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary-dark">Theme:</span>
                    <span className="text-text-primary-dark capitalize">{settings.darkMode ? 'Dark' : 'Light'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* App Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white">
                  App Information
                </h2>
                <p className="text-text-secondary-dark">
                  Version and system details
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary-dark">Version:</span>
                <span className="text-text-primary-dark ml-2">1.0.0</span>
              </div>
              <div>
                <span className="text-text-secondary-dark">Built with:</span>
                <span className="text-text-primary-dark ml-2">React + TypeScript</span>
              </div>
              <div>
                <span className="text-text-secondary-dark">AI Model:</span>
                <span className="text-text-primary-dark ml-2">Google Gemini 2.0 Flash</span>
              </div>
              <div>
                <span className="text-text-secondary-dark">Storage:</span>
                <span className="text-text-primary-dark ml-2">LocalStorage</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;