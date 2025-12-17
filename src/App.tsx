import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import AppPlayground from '@/pages/AppPlayground';
import MemeGenerator from '@/pages/MemeGenerator';
import History from '@/pages/History';
import About from '@/pages/About';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import '@/utils/initDemo'; 
import '@/index.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main App Routes (with layout) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/app" element={
                    <ProtectedRoute>
                      <AppPlayground />
                    </ProtectedRoute>
                  } />
                  <Route path="/memes" element={
                    <ProtectedRoute>
                      <MemeGenerator />
                    </ProtectedRoute>
                  } />
                  <Route path="/history" element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  } />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;