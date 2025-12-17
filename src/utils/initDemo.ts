// Initialize demo user account
const initializeDemoAccount = () => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('funboxai_users') || '[]');
    
    const demoUser = existingUsers.find((u: any) => u.email === 'demo@funboxai.com');
    
    if (!demoUser) {
      // Create demo user
      const demoUserData = {
        id: 'demo_user_' + Date.now(),
        email: 'demo@funboxai.com',
        name: 'Demo User',
        password: btoa('demo123'), // Simple encoding for demo
        createdAt: new Date().toISOString(),
      };
      
      existingUsers.push(demoUserData);
      localStorage.setItem('funboxai_users', JSON.stringify(existingUsers));
      console.log('Demo account initialized');
    }
  } catch (error) {
    console.error('Error initializing demo account:', error);
  }
};

// Initialize when module loads
initializeDemoAccount();