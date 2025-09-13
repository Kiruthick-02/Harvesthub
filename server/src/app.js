const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // 1. IMPORT THE NEW ROUTE FILE
const paymentRoutes = require('./routes/paymentRoutes'); // 1. Import

// Initialize app
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/dashboard', dashboardRoutes); // 2. REGISTER THE NEW ROUTE
app.use('/api/payments', paymentRoutes);
app.use(express.json());
// Error Handler
app.use(errorHandler);

module.exports = app;