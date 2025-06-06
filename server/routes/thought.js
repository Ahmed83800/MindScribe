// routes/thought.js
const express   = require('express');
const router    = express.Router();
const Thought   = require('../models/Thought');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// 👉  NEW: import Gemini helper
const { generateInsight } = require('../utils/geminiHelper');

/* ------------------------------------------------------------------ */
/* Add Thought                                                        */
/* ------------------------------------------------------------------ */
router.post('/', async (req, res) => {
  const { userId, mood, text } = req.body;
  if (!userId || !mood || !text) {
    return res.status(400).json({ error: 'userId, mood, and text are required' });
  }

  try {
    await new Thought({ userId, mood, text }).save();
    res.json({ message: 'Thought saved successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to save thought' });
  }
});

/* ------------------------------------------------------------------ */
/* Update & Delete                                                    */
/* ------------------------------------------------------------------ */
router.put('/:id', async (req, res) => {
  const { mood, text } = req.body;
  try {
    await Thought.findByIdAndUpdate(req.params.id, { mood, text });
    res.json({ message: 'Thought updated successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to update thought' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to delete thought' });
  }
});

/* ------------------------------------------------------------------ */
/* Sentiment Stats (existing)                                         */
/* ------------------------------------------------------------------ */
router.get('/sentiment/:userId', async (req, res) => {
  try {
    const thoughts = await Thought.find({ userId: req.params.userId });

    if (!thoughts.length) {
      return res.status(404).json({ error: 'No thoughts found.' });
    }

    let positive = 0, negative = 0, neutral = 0;
    const breakdown = [];

    thoughts.forEach(t => {
      const r   = sentiment.analyze(t.text);
      const cat = r.score > 0 ? 'positive' : r.score < 0 ? 'negative' : 'neutral';

      if (cat === 'positive') positive++;
      else if (cat === 'negative') negative++;
      else neutral++;

      breakdown.push({ text: t.text, score: r.score, category: cat, date: t.date });
    });

    res.json({
      summary: { total: thoughts.length, positive, negative, neutral },
      breakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sentiment analysis failed.' });
  }
});

/* ------------------------------------------------------------------ */
/* Gemini Insight  (NEW ENDPOINT)                                     */
/* ------------------------------------------------------------------ */
router.get('/insight/:userId', async (req, res) => {
  try {
    const thoughts = await Thought.find({ userId: req.params.userId })
                                  .sort({ date: -1 })
                                  .limit(10);          // last 10 thoughts

    if (!thoughts.length) {
      return res.status(404).json({ error: 'No thoughts found' });
    }

    const texts   = thoughts.map(t => t.text);
    const insight = await generateInsight(texts);
    res.json({ insight });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gemini insight failed' });
  }
});

/* ------------------------------------------------------------------ */
/* Get All Thoughts for a User                                        */
/* ------------------------------------------------------------------ */
router.get('/:userId', async (req, res) => {
  try {
    const thoughts = await Thought.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(thoughts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
});

module.exports = router;
