// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const thoughtRoutes = require('./routes/thought');


app.use('/api/auth', authRoutes);
app.use('/api/thoughts', thoughtRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err));
