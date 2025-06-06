// server/routes/admin.js
const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const Thought   = require('../models/Thought');
const Complaint = require('../models/Complaint');
const bcrypt    = require('bcryptjs');

/* ----------------------------------------------------------- */
/*  Admin Login  (fixed creds: admin / admin)                  */
/* ----------------------------------------------------------- */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Only allow the single hard-coded admin credentials
  if (username !== 'admin' || password !== 'admin') {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  res.json({ message: 'Admin login successful' });
});

/* ----------------------------------------------------------- */
/*  Get all non-admin users                                    */
/* ----------------------------------------------------------- */
router.get('/users', async (_req, res) => {
  const users = await User.find({ isAdmin: { $ne: true } })
                          .select('-password -__v'); // hide password hash
  res.json(users);
});

/* ----------------------------------------------------------- */
/*  Delete a user + their thoughts + complaints                */
/* ----------------------------------------------------------- */
router.delete('/users/:id', async (req, res) => {
  try {
    // find user first for username reference
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Thought.deleteMany({ userId: user._id });
    await Complaint.deleteMany({ username: user.username });
    await user.deleteOne();

    res.json({ message: 'User and related data deleted' });
  } catch {
    res.status(500).json({ message: 'Delete failed' });
  }
});

/* ----------------------------------------------------------- */
/*  Get all complaints                                         */
/* ----------------------------------------------------------- */
router.get('/complaints', async (_req, res) => {
  const complaints = await Complaint.find().sort({ date: -1 });
  res.json(complaints);
});

module.exports = router;
