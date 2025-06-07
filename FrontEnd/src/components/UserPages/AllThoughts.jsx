// src/UserPages/AllThoughts.jsx
import React, { useEffect, useState } from 'react';
import AddThought from './AddThought';           
import './UserPages.css';

const AllThoughts = ({ userId }) => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // { _id, text, mood } or null
  const [deleteCandidate, setDeleteCandidate] = useState(null); // For custom delete popup
  const [error, setError] = useState('');

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
  /* Delete handlers                                                   */
  /* ------------------------------------------------------------------ */
  const handleDeleteClick = (thought) => {
    setDeleteCandidate(thought);
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/${deleteCandidate._id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error();
      setThoughts(prev => prev.filter(t => t._id !== deleteCandidate._id));
      setDeleteCandidate(null);
      setError('');
    } catch {
      setError('Failed to delete thought.');
      setDeleteCandidate(null);
    }
  };

  const cancelDelete = () => setDeleteCandidate(null);

  /* ------------------------------------------------------------------ */
  /* Start editing                                                      */
  /* ------------------------------------------------------------------ */
  const startEdit = (thought) => setEditing(thought);

  /* ------------------------------------------------------------------ */
  /* After edit succeeds                                                */
  /* ------------------------------------------------------------------ */
  const handleEditSuccess = () => {
    setEditing(null);
    fetchThoughts();
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

      {/* Custom Delete Confirmation Popup */}
      {deleteCandidate && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>Delete this thought?</p>
            <p><em>"{deleteCandidate.text}"</em></p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      {/* Grid of thought cards */}
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
                onClick={() => handleDeleteClick(t)}
              >
                Delete
              </button>
            </div>
          </fieldset>
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default AllThoughts;
