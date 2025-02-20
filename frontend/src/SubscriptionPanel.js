import React, { useState } from 'react';
import './SubscriptionPanel.css';

const categories = ["academic", "department", "club", "placements", "global"];

const SubscriptionPanel = ({ onSubscriptionsUpdate }) => {
  const [subscriptions, setSubscriptions] = useState({
    academic: false,
    department: false,
    club: false,
    placements: false,
    global: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedSubscriptions = { ...subscriptions, [name]: checked };
    setSubscriptions(updatedSubscriptions);
    if (onSubscriptionsUpdate) {
      const selected = Object.keys(updatedSubscriptions).filter(key => updatedSubscriptions[key]);
      onSubscriptionsUpdate(selected);
    }
  };

  return (
    <div className="subscription-panel">
      <h3>Subscribe to Categories</h3>
      <div className="checkbox-group">
        {categories.map((cat) => (
          <div key={cat}>
            <label>
              <input 
                type="checkbox"
                name={cat}
                checked={subscriptions[cat]}
                onChange={handleCheckboxChange}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPanel;
