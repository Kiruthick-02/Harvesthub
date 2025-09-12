const express = require('express');
const cors = require('cors');
const path = require('path'); // IMPORTANT: Add this line to import the 'path' module
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize app
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// --- FIX STARTS HERE ---

// Step 1: Tell Express to serve static files (like manifest.json, css, js)
// from your React app's 'build' folder.
// The '__dirname' gets the current directory (server), '..' goes up one level,
// and then it goes into 'client/build'.
app.use(express.static(path.join(__dirname, '../client/build')));

// --- END OF STEP 1 ---


// API Routes (These must come AFTER the static file setup)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);


// --- FIX STEP 2 STARTS HERE ---

// The "catchall" handler: for any request that doesn't match an API route,
// send back the main 'index.html' file from the React app.
// This allows React Router to take over and handle the routing on the frontend.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// --- END OF STEP 2 ---


// Error Handler (This should be the last piece of middleware)
app.use(errorHandler);

module.exports = app;