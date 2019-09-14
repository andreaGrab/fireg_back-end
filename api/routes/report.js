const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report');

const exp = require('../../spese');
const mDat = require('../../main_dat');

// get the final report
router.get('/', reportController.get_report);

module.exports = router;