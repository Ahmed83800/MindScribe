// src/components/AdminPages/ComplaintsList.jsx
import React, { useEffect, useState } from 'react';
import './AdminPages.css';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    const res = await fetch('http://localhost:5000/api/admin/complaints');
    setComplaints(await res.json());
  };

  useEffect(() => { loadComplaints(); }, []);

  return (
    <div className="admin-section">
      <h2>All Complaints</h2>
      <div className="admin-grid">
        {complaints.map(c => (
          <fieldset key={c._id} className="admin-card">
            <legend>{c.username}</legend>
            <p>{c.complaint}</p>
            <div className="admin-date">
              {new Date(c.date).toLocaleString()}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsList;
