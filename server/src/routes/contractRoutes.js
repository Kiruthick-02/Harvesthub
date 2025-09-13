const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMyContracts, getContractById, updateContractStatus } = require('../controllers/contractController');

// Get all contracts for logged-in user
router.route('/').get(protect, getMyContracts);

// Get a single contract by ID
router.route('/:id').get(protect, getContractById);

// Update contract status
router.route('/:id/status').put(protect, updateContractStatus);

module.exports = router;
