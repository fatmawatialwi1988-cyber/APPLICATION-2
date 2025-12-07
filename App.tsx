import React, { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const sessionUser = localStorage.getItem('aps_current_session');
    if (sessionUser) {
      setCurrentUser(sessionUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('aps_current_session', username);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('aps_current_session');
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        // Adding a key here ensures the Dashboard remounts when the user changes, 
        // resetting all hooks with the new user's data
        <Dashboard key={currentUser} username={currentUser} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;