import React from 'react';
import './UserPages.css';

const UserNavbar = ({ setActivePage }) => {
  return (
    <nav className="user-navbar">
      <button onClick={() => setActivePage('addThought')}>Add New Thought</button>
      <button onClick={() => setActivePage('allThoughts')}>See All Thoughts</button>
      <button onClick={() => setActivePage('sentiment')}>Sentiment</button>
      <button onClick={() => setActivePage('complaint')}>Complaint</button>
    </nav>
  );
};

export default UserNavbar;
