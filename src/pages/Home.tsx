import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, Heart, ArrowRight, Star, Sparkle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Jokes',
      description: 'Humor that adapts to your taste',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Brain,
      title: 'Mind-Bending Riddles',
      description: 'Challenge your intellect',
      color: 'from-blue-400 to-purple-500',
    },
    {
      icon: Heart,
      title: 'Engaging Stories',
      description: 'Tales that captivate and inspire',
      color: 'from-pink-400 to-red-500',
    },
    {
      icon: Zap,
      title: 'Fun Facts',
      description: 'Discover amazing knowledge',
      color: 'from-green-400 to-cyan-500',
    },
  ];

  const stats = [
    { number: '6+', label: 'Content Types' },
    { number: '30+', label: 'Sub-Categories' },
    { number: '∞', label: 'Possibilities' },
    { number: '1', label: 'Fun Experience' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-highlight/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
                <Sparkle className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">Welcome to the Future of Fun</span>
              </div>
              
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex justify-center mb-8"
              >
                {/* <div className="w-48 lg:w-64 h-auto">
                  <img 
                    src="/logo-modern.svg" 
                    alt="FunBoxAi Logo" 
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div> */}
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
                <span className="text-gradient">FunBox AI</span>
                <br />
                <span className="text-white">Where Fun Meets AI</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-secondary-dark max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the magic of AI-powered entertainment. Generate jokes, riddles, stories, facts, 
                pickup lines, and memes that will light up your day! 🚀
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <Link
                to="/app"
                className="btn-primary group inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Zap className="w-5 h-5" />
                <span>Try FunBox Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/features"
                className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Star className="w-5 h-5" />
                <span>Explore Features</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-heading font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary-dark font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              What Makes Us <span className="text-gradient">Special</span>?
            </h2>
            <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
              Powered by advanced AI technology, FunBox AI brings you personalized entertainment 
              that adapts to your preferences and never gets old.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="card hover:shadow-glow-lg transition-all duration-300 group-hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary-dark">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-primary/10 via-accent/10 to-highlight/10 border-primary/20"
          >
            <div className="max-w-2xl mx-auto">
              {/* <div className="w-24 h-8 mx-auto mb-8">
                <img 
                  src="/logo-modern.svg" 
                  alt="FunBoxAi Logo" 
                  className="w-full h-full object-contain opacity-90"
                />
              </div> */}
              
              {user ? (
                <>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
                    Welcome back, {user.name}!
                  </h2>
                  
                  <p className="text-lg text-text-secondary-dark mb-8">
                    Ready to create more amazing content? Your AI-powered fun experience awaits!
                  </p>
                  
                  <Link
                    to="/app"
                    className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Start Creating</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
                    Ready to Experience the Magic?
                  </h2>
                  
                  <p className="text-lg text-text-secondary-dark mb-8">
                    Join thousands of users who have discovered the joy of AI-powered entertainment. 
                    Start your fun journey today!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      to="/register"
                      className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Sign Up Free</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    
                    <Link
                      to="/login"
                      className="inline-flex items-center space-x-2 text-lg px-8 py-4 border border-border-dark hover:bg-surface-dark text-text-primary-dark rounded-lg transition-all duration-200"
                    >
                      <span>Sign In</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;