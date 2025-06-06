// components/UserPages/ComplaintForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './UserPages.css';

const ComplaintForm = ({ userId }) => {
  const [complaint, setComplaint] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/complaints', {
        userId,  // This matches what your backend expects
        complaint
      });
      setMessage(res.data.message);
      setComplaint('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error submitting complaint.');
    }
  };

  return (
    <div className="page-container">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={complaint}
          onChange={e => setComplaint(e.target.value)}
          placeholder="Write your complaint here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ComplaintForm;