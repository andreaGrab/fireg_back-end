const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');
const regL = require('../middleware/finLogic');

// get all expenses
router.get('/', expensesController.get_all, regL);

// add new expenses
router.post('/', expensesController.add_new);

module.exports = router;