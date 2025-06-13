// src/components/AdminPages/ComplaintsList.jsx
import React, { useEffect, useState } from 'react';
import './AdminPages.css';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadComplaints = async () => {
    const res = await fetch('http://localhost:5000/api/admin/complaints');
    setComplaints(await res.json());
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/complaint/${selectedId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setComplaints(prev => prev.filter(c => c._id !== selectedId));
      } else {
        console.error('Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting:', err);
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div className="admin-section">
      <h2>All Complaints</h2>
      <div className="admin-grid">
        {complaints.map(c => (
          <fieldset key={c._id} className="admin-card">
            <legend>{c.username}</legend>
            <p>{c.complaint}</p>
            <div className="admin-date">{new Date(c.date).toLocaleString()}</div>
            <button
              className="delete-complaint-btn"
              onClick={() => confirmDelete(c._id)}
            >
              Delete
            </button>
          </fieldset>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>Are you sure you want to delete this complaint?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
