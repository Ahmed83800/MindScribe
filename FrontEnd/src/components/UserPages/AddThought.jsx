// src/UserPages/AddThought.jsx
import React, { useState, useEffect } from 'react';
import './UserPages.css';

const AddThought = ({
  userId,
  editingThoughtId = null,
  existingThought = null,
  onSuccess
}) => {
  const [thought, setThought] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState('');  // ✅ Added error state

  useEffect(() => {
    if (editingThoughtId && existingThought) {
      setThought(existingThought.text);
      setMood(existingThought.mood);
    }
  }, [editingThoughtId, existingThought]);

  const handleThoughtSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError('User ID not found');
      return;
    }

    const baseUrl = 'http://localhost:5000';
    const url = editingThoughtId
      ? `${baseUrl}/api/thoughts/${editingThoughtId}`
      : `${baseUrl}/api/thoughts`;
    const method = editingThoughtId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text: thought, mood })
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Server responded with:', res.status, data);
        throw new Error(data.error || 'Something went wrong');
      }

      setThought('');
      setMood('');
      setError('');
      //alert(data.message || 'Thought saved!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to submit thought:', err);
      setError('Failed to submit thought');
    }
  };

  return (
    <form className="thought-form" onSubmit={handleThoughtSubmit}>
      <h2>{editingThoughtId ? 'Edit Thought' : 'Add New Thought'}</h2>
      {error && <p className="error-message">{error}</p>}  {/* ✅ Display error */}
      <textarea
        placeholder="What's on your mind?"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        required
      />
      <div className="mood-selector">
        <label>
          <input
            type="radio"
            name="mood"
            value="Happy"
            checked={mood === 'Happy'}
            onChange={(e) => setMood(e.target.value)}
          />{' '}
          Happy
        </label>
        <label>
          <input
            type="radio"
            name="mood"
            value="Sad"
            checked={mood === 'Sad'}
            onChange={(e) => setMood(e.target.value)}
          />{' '}
          Sad
        </label>
        <label>
          <input
            type="radio"
            name="mood"
            value="Neutral"
            checked={mood === 'Neutral'}
            onChange={(e) => setMood(e.target.value)}
          />{' '}
          Neutral
        </label>
      </div>
      <button type="submit">
        {editingThoughtId ? 'Update Thought' : 'Submit Thought'}
      </button>
    </form>
  );
};

export default AddThought;
