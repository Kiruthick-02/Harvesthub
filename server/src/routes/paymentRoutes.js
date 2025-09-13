const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createCheckoutSession, stripeWebhook } = require('../controllers/paymentController');

// FULL PATH: POST /api/payments/create-checkout-session
router.post('/create-checkout-session', protect, createCheckoutSession);

// FULL PATH: POST /api/payments/webhook
// IMPORTANT: This route needs to receive the raw request body, not JSON.
// We add the express.raw middleware here specifically for this route.
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;