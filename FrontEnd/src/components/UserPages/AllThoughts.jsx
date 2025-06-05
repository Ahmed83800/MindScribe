// src/UserPages/AllThoughts.jsx
import React, { useEffect, useState } from 'react';
import './UserPages.css';

const AllThoughts = ({ userId }) => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all thoughts for this user
  const fetchThoughts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setThoughts(data);
    } catch (err) {
      console.error(err);
      setThoughts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, [userId]);

  // Delete a thought by its ID
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this thought?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
      // Remove from state without re‐fetching everything
      setThoughts((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  // Update a thought: prompt for new text & mood, then PUT
  const handleUpdate = async (id, currentText, currentMood) => {
    const newText = window.prompt('Enter new thought text:', currentText);
    if (newText === null) return; // user cancelled

    const newMood = window.prompt(
      'Enter new mood (Happy / Sad / Neutral):',
      currentMood
    );
    if (newMood === null) return; // user cancelled

    // Validate mood exactly matches one of the enum values
    const validMoods = ['Happy', 'Sad', 'Neutral'];
    if (!validMoods.includes(newMood)) {
      alert(`Mood must be one of: ${validMoods.join(', ')}`);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText, mood: newMood })
      });
      if (!res.ok) throw new Error('Update failed');
      // After a successful update, refresh the list
      fetchThoughts();
    } catch (err) {
      console.error(err);
      alert('Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="all-thoughts">
        <h2>Your Thoughts</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (thoughts.length === 0) {
    return (
      <div className="all-thoughts">
        <h2>Your Thoughts</h2>
        <p>You have no thoughts yet.</p>
      </div>
    );
  }

  return (
    <div className="all-thoughts">
      <h2>Your Thoughts</h2>
      <div className="all-thoughts-grid">
        {thoughts.map((t) => (
          <fieldset key={t._id} className="thought-card">
            <legend className="thought-legend">{t.mood}</legend>
            <div className="thought-date">
              {new Date(t.date).toLocaleString()}
            </div>
            <p className="thought-text">{t.text}</p>
            <div className="thought-actions">
              <button
                className="thought-btn delete-btn"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
              <button
                className="thought-btn update-btn"
                onClick={() => handleUpdate(t._id, t.text, t.mood)}
              >
                Update
              </button>
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default AllThoughts;
