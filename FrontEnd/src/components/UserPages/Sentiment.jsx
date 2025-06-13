// src/UserPages/Sentiment.jsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './UserPages.css';

const Sentiment = ({ userId }) => {
  const [data, setData] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [insight, setInsight] = useState('');

  const COLORS = {
    positive: '#4CAF50',
    negative: '#F44336',
    neutral: '#FFC107',
  };

  const EMOJIS = {
    positive: '😊',
    negative: '😔',
    neutral: '😐',
  };

  const fetchInsight = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/insight/${userId}`);
      const json = await res.json();
      if (res.ok) setInsight(json.insight);
    } catch (err) {
      console.error('Gemini insight fetch failed:', err);
      setInsight('Could not generate insight this time.');
    }
  };

  const fetchSentiment = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/thoughts/sentiment/${userId}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error fetching data');

      setData([
        { name: 'Positive', value: result.summary.positive, category: 'positive' },
        { name: 'Negative', value: result.summary.negative, category: 'negative' },
        { name: 'Neutral', value: result.summary.neutral, category: 'neutral' },
      ]);
      setBreakdown(result.breakdown);
      fetchInsight();
    } catch (err) {
      alert('Failed to fetch sentiment');
      console.error(err);
    }
  };

  return (
    <div className="sentiment-wrapper">
      <div className="sentiment-container">
        <h2>Sentiment Analysis</h2>
        <button className="analyze-btn" onClick={fetchSentiment}>
          Analyze Now
        </button>

        {data && (
          <>
            {/* Pie Chart */}
            <div className="chart-wrapper">
              <PieChart width={400} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name }) => name}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[entry.category]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Emoji Summary */}
            <h3>Mood Summary</h3>
            <ul className="emoji-summary">
              {data.map((item) => (
                <li key={item.name}>
                  {EMOJIS[item.category]} {item.name}: {item.value}
                </li>
              ))}
            </ul>

            {/* Gemini Insight */}
            {insight && (
              <div className="insight-box">
                <h3>Genuine Insight</h3>
                <p>{insight}</p>
              </div>
            )}

            {/* Breakdown List */}
            <h3>Detailed Breakdown</h3>
            <ul className="breakdown-list">
              {breakdown.map((b, i) => (
                <li key={i}>
                  <strong>{EMOJIS[b.category]}</strong> ({b.score}) — {b.text}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sentiment;
