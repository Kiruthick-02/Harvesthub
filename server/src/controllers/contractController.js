const Contract = require('../models/Contract');

/**
 * @desc    Create a new contract
 * @route   POST /api/contracts
 * @access  Private (Farmer)
 */
const createContract = async (req, res, next) => {
  const { buyer, produce, quantity, price, terms } = req.body;
  
  try {
    const contract = new Contract({
      farmer: req.user._id,
      buyer,
      produce,
      quantity,
      price,
      terms,
      versionHistory: [{ terms }],
    });

    const createdContract = await contract.save();
    res.status(201).json(createdContract);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contracts for the logged-in user
 * @route   GET /api/contracts
 * @access  Private
 */
const getMyContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find({
      $or: [{ farmer: req.user._id }, { buyer: req.user._id }],
    })
    .populate('farmer', 'name email')
    .populate('buyer', 'name email')
    .sort({ createdAt: -1 });
    
    res.json(contracts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single contract by ID
 * @route   GET /api/contracts/:id
 * @access  Private
 */
const getContractById = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('farmer', 'name email')
      .populate('buyer', 'name email');

    if (contract) {
      // Ensure the user is a party to the contract
      if (contract.farmer._id.toString() !== req.user._id.toString() && contract.buyer._id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to view this contract');
      }
      res.json(contract);
    } else {
      res.status(404);
      throw new Error('Contract not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contract status or terms
 * @route   PUT /api/contracts/:id
 * @access  Private
 */
const updateContract = async (req, res, next) => {
  try {
    const { status, terms, digitalSignature } = req.body;
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404);
      throw new Error('Contract not found');
    }

    // Authorization check
    const isFarmer = contract.farmer.toString() === req.user._id.toString();
    const isBuyer = contract.buyer.toString() === req.user._id.toString();

    if (!isFarmer && !isBuyer) {
      res.status(403);
      throw new Error('Not authorized to update this contract');
    }

    if (status) contract.status = status;

    if (terms && contract.terms !== terms) {
      contract.terms = terms;
      contract.versionHistory.push({ terms });
    }

    if (digitalSignature) {
        if (isFarmer) contract.digitalSignatureFarmer = digitalSignature;
        if (isBuyer) contract.digitalSignatureBuyer = digitalSignature;
    }
    
    // Auto-activate contract when both parties have signed
    if (contract.digitalSignatureFarmer && contract.digitalSignatureBuyer) {
        contract.status = 'active';
    }

    const updatedContract = await contract.save();
    res.json(updatedContract);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContract,
  getMyContracts,
  getContractById,
  updateContract,
};