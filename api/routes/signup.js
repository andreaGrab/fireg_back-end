const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signup');

router.post('/', signUpController.add_new);

module.exports = router;