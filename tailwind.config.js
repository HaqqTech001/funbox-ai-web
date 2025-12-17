/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: '#9B5FFF',
        'primary-light': '#B388FF',
        'primary-dark': '#7C3AED',
        accent: '#3D8DFF',
        'accent-light': '#60A5FA',
        highlight: '#FF60A8',
        'highlight-light': '#FF8ECB',
        
        // Dark Mode (Default)
        'page-dark': '#0F0F0F',
        'surface-dark': 'rgba(22, 22, 22, 0.5)',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
        'text-primary-dark': '#EAEAEA',
        'text-secondary-dark': '#888888',
        
        // Light Mode
        'page-light': '#F8F9FA',
        'surface-light': '#FFFFFF',
        'border-light': '#E9ECEF',
        'text-primary-light': '#18181B',
        'text-secondary-light': '#71717A',
        
        // Semantic
        success: '#2ECC71',
        warning: '#F39C12',
        error: '#E74C3C',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(155, 95, 255, 0.2)',
        'glow-lg': '0 0 60px rgba(155, 95, 255, 0.3)',
        'button-hover': '0 0 20px rgba(61, 141, 255, 0.5)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(155, 95, 255, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(155, 95, 255, 0.6)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}