// server/routes/complaint.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User'); // Make sure this is imported

// Submit a complaint
router.post('/', async (req, res) => {
  const { userId, complaint } = req.body;

  if (!userId || !complaint) {
    return res.status(400).json({ error: 'User ID and complaint are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComplaint = new Complaint({
      username: user.username,
      complaint,
      userId: user._id
    });

    await newComplaint.save();
    res.json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error('Complaint submission error:', err);
    res.status(500).json({ error: 'Server error submitting complaint' });
  }
});

// Delete a complaint by ID
router.delete('/:id', async (req, res) => {
  const complaintId = req.params.id;

  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

    if (!deletedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error('Error deleting complaint:', err);
    res.status(500).json({ error: 'Server error deleting complaint' });
  }
});

module.exports = router;
