import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import SentimentLib from 'sentiment'; // new import
import './UserPages.css';

const Sentiment = ({ userId }) => {
  const [data, setData] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [insight, setInsight] = useState(null); // new state

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

      // -------- NEW: Generate Insight from text using 'sentiment' --------
      const sentiment = new SentimentLib();
      const allText = result.breakdown.map(b => b.text).join('. ');
      const analysis = sentiment.analyze(allText);
      const score = analysis.score;

      let insightMsg = '';
      if (score > 5) {
        insightMsg = "You've generally been feeling positive. Keep it up and reflect on these good days.";
      } else if (score < -5) {
        insightMsg = "Your recent entries suggest you've been struggling emotionally. It's okay to ask for support.";
      } else {
        insightMsg = "Your mood has been quite balanced. Maybe try exploring your feelings more deeply.";
      }

      setInsight(insightMsg);
    } catch (err) {
      alert('Failed to fetch sentiment');
      console.error(err);
    }
  };

  return (
    <div className="sentiment-container">
      <h2>Sentiment Analysis</h2>
      <button className="analyze-btn" onClick={fetchSentiment}>Analyze Now</button>

      {data && (
        <>
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

          <h3>Mood Summary</h3>
          <ul className="emoji-summary">
            {data.map((item) => (
              <li key={item.name}>
                {EMOJIS[item.category]} {item.name}: {item.value}
              </li>
            ))}
          </ul>

          {insight && (
            <div className="insight-box">
              <h3>AI Insight</h3>
              <p>{insight}</p>
            </div>
          )}

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
  );
};

export default Sentiment;
