// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup
router.post('/signup', async (req, res) => {
  const { username, fullName, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      isAdmin
    });
    await newUser.save();

    res.status(201).json({ 
      message: 'Signup successful',
      userId: newUser._id.toString(),
      username: newUser.username
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const user = await User.findOne({ username, isAdmin: !!isAdmin });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or role' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Send userId at top level so frontend can read data.userId
    res.status(200).json({
      message: 'Login successful',
      userId: user._id.toString(),
      username: user.username
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
