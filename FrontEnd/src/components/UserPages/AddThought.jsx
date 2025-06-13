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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingThoughtId && existingThought) {
      setThought(existingThought.text);
      setMood(existingThought.mood);
    }
  }, [editingThoughtId, existingThought]);

  const handleThoughtSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (!userId) {
      setError('User ID not found');
      setLoading(false);
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
        throw new Error(data.error || 'Something went wrong');
      }

      setThought('');
      setMood('');
      setSuccessMessage(data.message || 'Thought saved!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to submit thought:', err);
      setError('Failed to submit thought');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="custom-thought-form" onSubmit={handleThoughtSubmit}>
      <h2>{editingThoughtId ? 'Edit Thought' : 'Add New Thought'}</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

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
          /> 😊 Happy
        </label>
        <label>
          <input
            type="radio"
            name="mood"
            value="Sad"
            checked={mood === 'Sad'}
            onChange={(e) => setMood(e.target.value)}
          /> 😢 Sad
        </label>
        <label>
          <input
            type="radio"
            name="mood"
            value="Neutral"
            checked={mood === 'Neutral'}
            onChange={(e) => setMood(e.target.value)}
          /> 😐 Neutral
        </label>
      </div>

      <div className="button-wrapper">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingThoughtId ? 'Update Thought' : 'Submit Thought'}
          </button>
</div>

    </form>
  );
};

export default AddThought;
