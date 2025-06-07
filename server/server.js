const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Models
const User = require('./models/User');

// Routes
const authRoutes      = require('./routes/auth');
const thoughtRoutes   = require('./routes/thought');
const complaintRoutes = require('./routes/complaint');
const adminRoutes     = require('./routes/admin');
const blogRoutes = require('./routes/blog');/////del

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);////////del
// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Ensure admin user exists
    const adminExists = await User.findOne({ username: 'admin', isAdmin: true });
    if (!adminExists) {
      await new User({
        username:  'admin',
        fullName:  'Super Admin',
        email:     'admin@example.com',
        password:  await require('bcryptjs').hash('admin', 10),
        isAdmin:   true
      }).save();
      console.log('Default admin created (admin/admin)');
    }

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log('MongoDB connection error:', err));
