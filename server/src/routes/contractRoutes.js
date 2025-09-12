const express = require('express');
const router = express.Router();
const {
  createContract,
  getMyContracts,
  getContractById,
  updateContract
} = require('../controllers/contractController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @route   /api/contracts

// Get all contracts for the current user (farmer or buyer)
router.route('/')
  .get(protect, getMyContracts);

// Create a new contract (only farmers can create)
router.route('/')
  .post(protect, authorize('farmer'), createContract);

// Get a specific contract by its ID and update it
router.route('/:id')
  .get(protect, getContractById)
  .put(protect, updateContract);

module.exports = router;