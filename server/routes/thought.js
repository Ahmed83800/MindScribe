// routes/thought.js
const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

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
/* Update Thought by ID                                               */
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

/* ------------------------------------------------------------------ */
/* Delete Thought by ID                                               */
/* ------------------------------------------------------------------ */
router.delete('/:id', async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to delete thought' });
  }
});

/* ------------------------------------------------------------------ */
/* Sentiment Analysis for a User                                      */
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
      const result = sentiment.analyze(t.text);
      const category = result.score > 0 ? 'positive'
                      : result.score < 0 ? 'negative'
                      : 'neutral';

      if (category === 'positive') positive++;
      else if (category === 'negative') negative++;
      else neutral++;

      breakdown.push({
        text: t.text,
        score: result.score,
        comparative: result.comparative,
        category,
        date: t.date
      });
    });

    res.json({
      summary: {
        total: thoughts.length,
        positive,
        negative,
        neutral
      },
      breakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sentiment analysis failed.' });
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
