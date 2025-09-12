const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

// FULL PATH: GET /api/weather?city=yourcity
router.route('/').get(protect, getWeatherByCity);

module.exports = router;