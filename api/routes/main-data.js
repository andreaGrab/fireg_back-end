const express = require('express');
const router = express.Router();
const mainDataController = require('../controllers/main-data');

// add new data
router.post('/', mainDataController.add_data);


module.exports = router;