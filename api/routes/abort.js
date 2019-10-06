const express = require('express');
const router = express.Router();
const abortController = require('../controllers/abort');
const verifyToken = require('../middleware/verify_token');

router.delete('/', verifyToken, abortController.abort);


module.exports = router;