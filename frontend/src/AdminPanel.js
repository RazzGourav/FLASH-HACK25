import React, { useState } from 'react';
import './AdminPanel.css';

const designations = ["HOD", "Principal", "Director", "Teacher", "Lead", "Other"];

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [designation, setDesignation] = useState(designations[0]);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      message,
      postedBy: "", // Will be set in backend based on designation
      role: "admin",
      designation
    };
    
    try {
      const res = await fetch("http://localhost:3000/api/announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("Announcement posted:", data);
      setTitle('');
      setMessage('');
      setDesignation(designations[0]);
    } catch (err) {
      setError('Failed to post announcement.');
      console.error(err);
    }
  };
  
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
          {designations.map((desig) => (
            <option key={desig} value={desig}>{desig}</option>
          ))}
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Post Announcement</button>
      </form>
    </div>
  );
};

export default AdminPanel;
