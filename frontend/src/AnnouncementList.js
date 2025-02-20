import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './AnnouncementList.css';

// Connect to the backend Socket.IO server
const socket = io("http://localhost:3000");

// Dummy announcements for initial state
const initialAnnouncements = [
  {
    title: "Welcome to the Digital Notice Board",
    message: "This is a dummy announcement. Stay tuned for updates.",
    category: "global",
    postedBy: "System",
    role: "admin",
    priority: "normal",
    timestamp: new Date().toISOString()
  },
  {
    title: "Important Exam Schedule Update",
    message: "Final exam schedule has been released. Check details now.",
    category: "academic",
    postedBy: "HOD",
    role: "admin",
    priority: "high",
    timestamp: new Date().toISOString()
  }
];

const AnnouncementList = ({ subscriptions }) => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  useEffect(() => {
    socket.on('announcement', (announcement) => {
      setAnnouncements(prev => [announcement, ...prev]);
    });

    return () => socket.off('announcement');
  }, []);

  // Separate pinned (high priority) announcements and the rest
  const pinnedAnnouncements = announcements.filter(ann => ann.priority === "high");
  const otherAnnouncements = announcements.filter(ann => ann.priority !== "high");

  // Filter announcements based on student subscriptions (if set)
  const filterBySubscriptions = (anns) =>
    subscriptions && subscriptions.length > 0
      ? anns.filter(ann => subscriptions.includes(ann.category))
      : anns;

  return (
    <div className="announcement-list">
      <h2>Pinned High Priority Announcements</h2>
      {filterBySubscriptions(pinnedAnnouncements).length === 0 ? (
        <p>No high priority announcements.</p>
      ) : (
        filterBySubscriptions(pinnedAnnouncements).map((ann, index) => (
          <div 
            key={index} 
            className={`announcement ${ann.category} ${ann.priority === 'high' ? 'high-priority' : ann.priority === 'medium' ? 'medium-priority' : 'low-priority'}`}
          >
            <h3>{ann.title}</h3>
            <p>{ann.message}</p>
            <small>
              Posted by {ann.postedBy} | Category: {ann.category} | {new Date(ann.timestamp).toLocaleString()}
            </small>
          </div>
        ))
      )}
      <h2>All Announcements</h2>
      {filterBySubscriptions(otherAnnouncements).length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        filterBySubscriptions(otherAnnouncements).map((ann, index) => (
          <div 
            key={index} 
            className={`announcement ${ann.category} ${ann.priority === 'high' ? 'high-priority' : ann.priority === 'medium' ? 'medium-priority' : 'low-priority'}`}
          >
            <h3>{ann.title}</h3>
            <p>{ann.message}</p>
            <small>
              Posted by {ann.postedBy} | Category: {ann.category} | {new Date(ann.timestamp).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementList;
