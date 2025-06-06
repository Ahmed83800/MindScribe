// server/routes/complaint.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User'); // Make sure this is imported

router.post('/', async (req, res) => {
  const { userId, complaint } = req.body;

  if (!userId || !complaint) {
    return res.status(400).json({ error: 'User ID and complaint are required' });
  }

  try {
    // Find user to get their username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComplaint = new Complaint({
      username: user.username, // Store username in complaint
      complaint,
      userId: user._id // Optionally store userId too
    });

    await newComplaint.save();
    res.json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error('Complaint submission error:', err);
    res.status(500).json({ error: 'Server error submitting complaint' });
  }
});

module.exports = router;