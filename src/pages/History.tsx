import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History as HistoryIcon, 
  Trash2, 
  Copy, 
  Filter,
  Calendar,
  Tag,
  Search,
  X
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { getTemplateByIndex } from '@/data/categories';

const History: React.FC = () => {
  const { settings, deleteFromHistory, clearHistory } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const contentTypes = [
    { id: 'all', label: 'All Content', icon: HistoryIcon },
    { id: 'joke', label: 'Jokes', icon: '😂' },
    { id: 'riddle', label: 'Riddles', icon: '🤔' },
    { id: 'story', label: 'Stories', icon: '📚' },
    { id: 'fact', label: 'Facts', icon: '💡' },
    { id: 'pickup', label: 'Pickup Lines', icon: '💕' },
    { id: 'meme', label: 'Memes', icon: '🎭' },
  ];

  const filteredHistory = settings.history.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            Your <span className="text-gradient">History</span>
          </h1>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Revisit your favorite AI-generated content and never lose a great joke or story!
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary-dark" />
              <input
                type="text"
                placeholder="Search your content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary-dark hover:text-text-primary-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                const isActive = selectedFilter === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedFilter(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-text-secondary-dark hover:text-text-primary-dark hover:bg-surface-dark'
                    }`}
                  >
                    {typeof Icon === 'string' ? (
                      <span>{Icon}</span>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Clear History */}
            {settings.history.length > 0 && (
              <button
                onClick={clearHistory}
                className="btn-secondary flex items-center space-x-2 text-error hover:bg-error/10"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16">
              <HistoryIcon className="w-16 h-16 mx-auto mb-4 text-text-secondary-dark opacity-50" />
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                {searchTerm || selectedFilter !== 'all' ? 'No matches found' : 'No history yet'}
              </h3>
              <p className="text-text-secondary-dark">
                {searchTerm || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filter' 
                  : 'Start generating content to see it here!'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredHistory.map((item, index) => {
                  const template = getTemplateByIndex(item.type, item.templateIndex);
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      <div 
                        className="relative overflow-hidden rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl">
                                  {contentTypes.find(t => t.id === item.type)?.icon}
                                </span>
                                <div>
                                  <h3 className="font-heading font-semibold text-white capitalize">
                                    {item.type}
                                  </h3>
                                  {item.subCategory && (
                                    <div className="flex items-center space-x-1 text-white/80 text-sm">
                                      <Tag className="w-3 h-3" />
                                      <span className="capitalize">{item.subCategory}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-white/80 text-sm">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(item.createdAt)}</span>
                              </div>
                              
                              <button
                                onClick={() => handleCopy(item.content)}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                title="Copy content"
                              >
                                <Copy className="w-4 h-4 text-white" />
                              </button>
                              
                              <button
                                onClick={() => deleteFromHistory(item.id)}
                                className="p-2 bg-white/20 hover:bg-red-500/30 rounded-lg transition-colors"
                                title="Delete from history"
                              >
                                <Trash2 className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                            {item.content}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        {settings.history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-6 bg-surface-dark border border-border-dark rounded-xl px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-gradient">
                  {settings.history.length}
                </div>
                <div className="text-sm text-text-secondary-dark">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-gradient">
                  {new Set(settings.history.map(item => item.type)).size}
                </div>
                <div className="text-sm text-text-secondary-dark">Content Types</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;