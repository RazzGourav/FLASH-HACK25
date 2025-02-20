import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import AnnouncementList from './AnnouncementList';
import SubscriptionPanel from './SubscriptionPanel';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3-second splash screen
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <h1>Centralized Digital Notice Board</h1>
      <SubscriptionPanel onSubscriptionsUpdate={(subs) => setSubscriptions(subs)} />
      <AnnouncementList subscriptions={subscriptions} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/admin">Admin Login</Link>
      </div>
    </div>
  );
}

export default App;
