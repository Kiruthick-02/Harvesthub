const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// CORRECTED: A single, consolidated import statement.
const {
  getUserProfile,
  updateUserProfile,
  getBuyers
} = require('../controllers/userController');

// FULL PATH: GET /api/users/profile
// FULL PATH: PUT /api/users/profile
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// FULL PATH: GET /api/users/buyers
// This route is protected and only accessible by users with the 'farmer' role.
router.route('/buyers')
  .get(protect, authorize('farmer'), getBuyers);

module.exports = router;