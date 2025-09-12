const express = require('express');
const router = express.Router();

// --- FIX ---
// Import the correct controller functions for register and login
const { registerUser, authUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// --- FIX ---
// Define the public routes for register and login
router.post('/register', registerUser);
router.post('/login', authUser);

// This route was from a different file in the original code. 
// It should likely be in userRoutes.js, but for now, this will work.
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;