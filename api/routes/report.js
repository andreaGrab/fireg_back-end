const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report');

// get the final report
router.get('/', reportController);

module.exports = router;