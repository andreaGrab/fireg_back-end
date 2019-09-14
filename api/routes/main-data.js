const express = require('express');
const router = express.Router();
const mainDataController = require('../controllers/main-data');


// get all
router.get('/', mainDataController.get_all);

// add new data
router.post('/', mainDataController.add_data);


module.exports = router;