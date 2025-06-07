const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs (for users & admin)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// Admin: Create a new blog
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });

  try {
    const newBlog = new Blog({ title, body });
    await newBlog.save();
    res.json({ message: 'Blog created', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: 'Error creating blog' });
  }
});

// Admin: Delete a blog by id
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
});

module.exports = router;
///delete