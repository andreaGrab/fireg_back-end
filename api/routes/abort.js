const express = require('express');
const router = express.Router();
const abortController = require('../controllers/abort');

router.delete('/', abortController.abort);


module.exports = router;