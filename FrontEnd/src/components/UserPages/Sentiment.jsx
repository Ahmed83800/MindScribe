import React, { useState } from 'react';
import './UserPages.css';

const Sentiment = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Fetch sentiment data for date range
    alert(`Fetching sentiment from ${fromDate} to ${toDate}`);
  };

  return (
    <form className="sentiment-form" onSubmit={handleSubmit}>
      <h2>Sentiment Analysis</h2>
      <label>
        From:
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
      </label>
      <label>
        To:
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
      </label>
      <button type="submit">Analyze</button>
    </form>
  );
};

export default Sentiment;
