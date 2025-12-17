import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Smartphone, 
  Globe, 
  Code, 
  Heart,
  Star,
  Zap,
  Users,
  Target
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Powered by Google\'s Gemini AI for creative and engaging content generation',
    },
    {
      icon: Sparkles,
      title: 'Multiple Content Types',
      description: 'Six different content categories with 30+ sub-categories to explore',
    },
    {
      icon: Heart,
      title: 'User-Centric Design',
      description: 'Built with React and Tailwind CSS for a smooth, responsive experience',
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Works seamlessly on desktop, tablet, and mobile devices',
    },
  ];

  const techStack = [
    { name: 'React 18', description: 'Modern UI library' },
    { name: 'TypeScript', description: 'Type-safe development' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
    { name: 'Framer Motion', description: 'Smooth animations' },
    { name: 'Google Gemini AI', description: 'AI content generation' },
    { name: 'React Router', description: 'Client-side routing' },
    { name: 'Vite', description: 'Fast build tool' },
    { name: 'LocalStorage', description: 'Data persistence' },
  ];

  const stats = [
    { icon: Users, number: '1000+', label: 'Happy Users' },
    { icon: Zap, number: '50K+', label: 'Content Generated' },
    { icon: Star, number: '6', label: 'Content Types' },
    { icon: Target, number: '30+', label: 'Sub-Categories' },
  ];

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">About FunBox AI</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            The Future of <span className="text-gradient">AI Entertainment</span>
          </h1>
          
          <p className="text-xl text-text-secondary-dark max-w-4xl mx-auto leading-relaxed">
            FunBox AI is a revolutionary web application that brings the power of artificial intelligence 
            to entertainment. Generate unlimited jokes, riddles, stories, facts, pickup lines, and memes 
            with just a few clicks.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-primary/10 via-accent/10 to-highlight/10 border-primary/20 mb-16"
        >
          <div className="text-center max-w-3xl mx-auto">
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-text-secondary-dark leading-relaxed">
              To make AI-powered entertainment accessible, fun, and personalized for everyone. 
              We believe that technology should bring joy and creativity into people's lives, 
              not just productivity. FunBox AI transforms the way you consume and create entertainment content.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white text-center mb-12">
            What Makes Us <span className="text-gradient">Special</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary-dark">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-heading font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary-dark font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white text-center mb-12">
            Built With <span className="text-gradient">Modern Technology</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-surface-dark border border-border-dark rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <Code className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-text-secondary-dark text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="card">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">
              The Problem
            </h3>
            <ul className="space-y-3 text-text-secondary-dark">
              <li className="flex items-start space-x-3">
                <span className="text-error">•</span>
                <span>Finding fresh, entertaining content can be challenging</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-error">•</span>
                <span>Existing entertainment apps lack personalization</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-error">•</span>
                <span>Content variety is often limited and repetitive</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-error">•</span>
                <span>No way to customize content to specific moods or interests</span>
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">
              Our Solution
            </h3>
            <ul className="space-y-3 text-text-secondary-dark">
              <li className="flex items-start space-x-3">
                <span className="text-success">•</span>
                <span>AI generates unlimited unique content on demand</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-success">•</span>
                <span>Sub-categories allow precise mood and interest targeting</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-success">•</span>
                <span>Multiple content types ensure endless variety</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-success">•</span>
                <span>Personal history and preferences tracking</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <Globe className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-white mb-6">
              Join the FunBox AI Community
            </h2>
            <p className="text-lg text-text-secondary-dark mb-8 max-w-2xl mx-auto">
              Experience the future of AI-powered entertainment. Start creating amazing content today 
              and be part of the revolution in personalized digital entertainment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/app"
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Sparkles className="w-5 h-5" />
                <span>Try FunBox Now</span>
              </a>
              <a
                href="/features"
                className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Star className="w-5 h-5" />
                <span>Explore Features</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;