const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// @route   /api/users

// Get and update the profile of the currently logged-in user
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;