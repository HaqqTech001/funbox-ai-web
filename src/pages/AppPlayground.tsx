import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  BookOpen, 
  Lightbulb, 
  Heart, 
  Shuffle,
  Save,
  Copy,
  Loader2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { ContentType } from '@/types';
import { getSubCategories } from '@/data/categories';
import { generateContent } from '@/utils/geminiAPI';
import { useApp } from '@/contexts/AppContext';
import { getTemplateByIndex } from '@/data/categories';

const AppPlayground: React.FC = () => {
  const { settings, addToHistory, setError, clearError } = useApp();
  const [selectedType, setSelectedType] = useState<ContentType>('joke');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const contentTypes = [
    {
      id: 'joke' as ContentType,
      title: 'Jokes',
      icon: Sparkles,
      color: 'from-yellow-400 to-orange-500',
      description: 'Get ready to laugh! 😂',
    },
    {
      id: 'riddle' as ContentType,
      title: 'Riddles',
      icon: Brain,
      color: 'from-blue-400 to-purple-500',
      description: 'Challenge your mind! 🤔',
    },
    {
      id: 'story' as ContentType,
      title: 'Stories',
      icon: BookOpen,
      color: 'from-purple-400 to-pink-500',
      description: 'Dive into tales! 📚',
    },
    {
      id: 'fact' as ContentType,
      title: 'Fun Facts',
      icon: Lightbulb,
      color: 'from-green-400 to-cyan-500',
      description: 'Learn something new! 💡',
    },
    {
      id: 'pickup' as ContentType,
      title: 'Pickup Lines',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      description: 'Charm someone! 💕',
    },
    {
      id: 'meme' as ContentType,
      title: 'Memes',
      icon: Zap,
      color: 'from-indigo-400 to-purple-500',
      description: 'Create laughs! 🎭',
    },
  ];

  const subCategories = getSubCategories(selectedType);

  useEffect(() => {
    // Clear previous content when type changes
    setGeneratedContent(null);
    setShowResult(false);
    setSelectedSubCategory('');
    clearError();
  }, [selectedType]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowResult(false);
    clearError();

    try {
      const subCategoryLabel = selectedSubCategory 
        ? subCategories.find(sc => sc.id === selectedSubCategory)?.label.toLowerCase()
        : '';

      const response = await generateContent(selectedType, '', subCategoryLabel);
      setGeneratedContent(response);
      
      // Save to history
      addToHistory({
        type: selectedType,
        subCategory: selectedSubCategory,
        content: response.caption,
        templateIndex: response.templateIndex,
      });

      setShowResult(true);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (generatedContent?.caption) {
      try {
        await navigator.clipboard.writeText(generatedContent.caption);
        // You could add a toast notification here
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const currentType = contentTypes.find(type => type.id === selectedType);
  const template = generatedContent ? getTemplateByIndex(selectedType, generatedContent.templateIndex) : null;

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            AI Content <span className="text-gradient">Generator</span>
          </h1>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Choose your content type, pick a sub-category, and let AI create something amazing for you!
          </p>
        </motion.div>

        {/* Content Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading font-semibold text-white mb-6 text-center">
            Choose Content Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                    isSelected
                      ? 'border-primary/50 bg-primary/10 shadow-glow'
                      : 'border-border-dark bg-surface-dark hover:border-primary/30'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-white mb-1">
                      {type.title}
                    </h3>
                    <p className="text-xs text-text-secondary-dark">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sub-Category Selection */}
        {subCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-heading font-semibold text-white mb-6 text-center">
              Select Sub-Category (Optional)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedSubCategory('')}
                className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedSubCategory === ''
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border-dark bg-surface-dark text-text-primary-dark hover:border-primary/30'
                }`}
              >
                <div className="font-medium mb-1">Random/General</div>
                <div className="text-sm text-text-secondary-dark">Let AI surprise you!</div>
              </button>
              {subCategories.map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => setSelectedSubCategory(subCategory.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedSubCategory === subCategory.id
                      ? 'border-primary/50 bg-primary/10 text-primary'
                      : 'border-border-dark bg-surface-dark text-text-primary-dark hover:border-primary/30'
                  }`}
                >
                  <div className="font-medium mb-1">{subCategory.label}</div>
                  <div className="text-sm text-text-secondary-dark">{subCategory.description}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary inline-flex items-center space-x-3 text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Shuffle className="w-5 h-5" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Content'}</span>
          </button>
        </motion.div>

        {/* Error Message */}
        {settings.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-error/10 border border-error/20 rounded-xl flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
            <span className="text-error">{settings.error}</span>
          </motion.div>
        )}

        {/* Generated Content */}
        <AnimatePresence>
          {generatedContent && showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="relative overflow-hidden rounded-3xl p-8 text-center"
                style={{
                  background: template 
                    ? `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`
                    : undefined
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                      <span className="text-sm font-medium">
                        {currentType?.title}
                        {selectedSubCategory && ` • ${subCategories.find(sc => sc.id === selectedSubCategory)?.label}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-white text-lg lg:text-xl leading-relaxed font-medium mb-8 whitespace-pre-wrap">
                    {generatedContent.caption}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg px-4 py-2 text-white"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    
                    <button className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg px-4 py-2 text-white">
                      <Save className="w-4 h-4" />
                      <span>Saved</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppPlayground;