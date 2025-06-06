const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username:  { type: String, required: true },     // keep for convenience
  complaint: { type: String, required: true },
  date:      { type: Date,   default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
