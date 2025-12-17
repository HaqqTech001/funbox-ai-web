import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Brain, 
  BookOpen, 
  Lightbulb, 
  Heart, 
  Image as ImageIcon,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getSubCategories } from '@/data/categories';

const Features: React.FC = () => {
  const contentTypes = [
    {
      id: 'joke',
      title: 'Jokes',
      description: 'Laugh until your sides hurt with AI-generated humor',
      icon: Smile,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/20',
      subCategories: getSubCategories('joke'),
    },
    {
      id: 'riddle',
      title: 'Riddles',
      description: 'Challenge your mind with brain-teasing puzzles',
      icon: Brain,
      color: 'from-blue-400 to-purple-500',
      bgColor: 'from-blue-500/10 to-purple-500/10',
      borderColor: 'border-blue-500/20',
      subCategories: getSubCategories('riddle'),
    },
    {
      id: 'story',
      title: 'Stories',
      description: 'Immerse yourself in captivating narratives',
      icon: BookOpen,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      subCategories: getSubCategories('story'),
    },
    {
      id: 'fact',
      title: 'Fun Facts',
      description: 'Discover amazing knowledge and interesting trivia',
      icon: Lightbulb,
      color: 'from-green-400 to-cyan-500',
      bgColor: 'from-green-500/10 to-cyan-500/10',
      borderColor: 'border-green-500/20',
      subCategories: getSubCategories('fact'),
    },
    {
      id: 'pickup',
      title: 'Pickup Lines',
      description: 'Charming lines to brighten someone\'s day',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      bgColor: 'from-pink-500/10 to-red-500/10',
      borderColor: 'border-pink-500/20',
      subCategories: getSubCategories('pickup'),
    },
    {
      id: 'meme',
      title: 'Memes',
      description: 'Create hilarious memes with AI-powered captions',
      icon: ImageIcon,
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10',
      borderColor: 'border-indigo-500/20',
      subCategories: getSubCategories('meme'),
    },
  ];

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Explore Our Features</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            Six Amazing <span className="text-gradient">Content Types</span>
          </h1>
          
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto leading-relaxed">
            Each content type offers multiple sub-categories to match your mood and preferences. 
            Discover new possibilities every day!
          </p>
        </motion.div>

        {/* Content Types Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {contentTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl border ${type.borderColor} bg-gradient-to-br ${type.bgColor} p-8 hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${type.color} rounded-full blur-2xl`}></div>
                </div>
                
                <div className="relative">
                  {/* Icon and Title */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold text-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-text-secondary-dark">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* Sub-categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-secondary-dark uppercase tracking-wider mb-3">
                      Sub-Categories
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {type.subCategories.map((subCategory) => (
                        <div
                          key={subCategory.id}
                          className="bg-surface-dark/50 backdrop-blur-sm border border-border-dark rounded-lg p-3 hover:border-primary/30 transition-colors"
                        >
                          <div className="font-medium text-text-primary-dark text-sm mb-1">
                            {subCategory.label}
                          </div>
                          <div className="text-text-secondary-dark text-xs">
                            {subCategory.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/app?type=${type.id}`}
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors group/btn"
                  >
                    <span className="font-medium">Try {type.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-8">
            How It <span className="text-gradient">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Choose Content Type',
                description: 'Select from jokes, riddles, stories, facts, pickup lines, or memes',
              },
              {
                step: '02',
                title: 'Pick a Sub-Category',
                description: 'Fine-tune your selection with specific categories that match your mood',
              },
              {
                step: '03',
                title: 'Generate & Enjoy',
                description: 'Let AI create amazing content tailored just for you',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary-dark">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              to="/app"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;