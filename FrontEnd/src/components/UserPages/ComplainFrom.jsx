import React, { useState } from 'react';
import './UserPages.css';

const ComplaintForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send complaint to backend
    alert('Complaint submitted!');
    console.log(message);
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <h2>Submit a Complaint</h2>
      <textarea
        placeholder="Describe your issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
