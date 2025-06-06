// src/UserPages/AllThoughts.jsx
import React, { useEffect, useState } from 'react';
import AddThought from './AddThought';           // ← import the form you already have
import './UserPages.css';

const AllThoughts = ({ userId }) => {
  const [thoughts, setThoughts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editing, setEditing]     = useState(null); // { _id, text, mood } or null

  /* ------------------------------------------------------------------ */
  /* Fetch thoughts                                                     */
  /* ------------------------------------------------------------------ */
  const fetchThoughts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${userId}`);
      if (!res.ok) throw new Error('Fetch failed');
      setThoughts(await res.json());
    } catch (err) {
      console.error(err);
      setThoughts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchThoughts(); }, [userId]);

  /* ------------------------------------------------------------------ */
  /* Delete                                                             */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this thought?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error();
      setThoughts(prev => prev.filter(t => t._id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  /* ------------------------------------------------------------------ */
  /* Start editing                                                      */
  /* ------------------------------------------------------------------ */
  const startEdit = (thought) => setEditing(thought);

  /* ------------------------------------------------------------------ */
  /* After edit succeeds                                                */
  /* ------------------------------------------------------------------ */
  const handleEditSuccess = () => {
    setEditing(null);   // hide form
    fetchThoughts();    // refresh list
  };

  /* ------------------------------------------------------------------ */
  /* Loading / empty states                                             */
  /* ------------------------------------------------------------------ */
  if (loading) return <p className="status-text">Loading…</p>;
  if (!thoughts.length) return <p className="status-text">No thoughts yet.</p>;

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="all-thoughts">
      <h2>Your Thoughts</h2>

      {/* Inline edit form (appears only when editing !== null) */}
      {editing && (
        <div className="edit-thought-wrapper">
          <AddThought
            userId={userId}
            editingThoughtId={editing._id}
            existingThought={editing}
            onSuccess={handleEditSuccess}
          />
          <button className="cancel-edit" onClick={() => setEditing(null)}>
            ✖ Cancel
          </button>
        </div>
      )}

      {/* Grid of cards */}
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
                className="thought-btn update-btn"
                onClick={() => startEdit(t)}
              >
                Update
              </button>
              <button
                className="thought-btn delete-btn"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default AllThoughts;
