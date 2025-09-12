const User = require('../models/User');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      const updatedUser = await user.save();
      
      // Return only non-sensitive data
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users with the role 'buyer'
 * @route   GET /api/users/buyers
 * @access  Private (for Farmers)
 */
const getBuyers = async (req, res, next) => {
  try {
    // Find all users where the role is 'buyer' and select only their ID and name
    const buyers = await User.find({ role: 'buyer' }).select('_id name');
    res.json(buyers);
  } catch (error) {
    next(error);
  }
};

// Export all functions
module.exports = {
  getUserProfile,
  updateUserProfile,
  getBuyers,
};