const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');

// get all expenses
router.get('/', expensesController.get_all);

// report expenses
router.get('/report', expensesController.get_all_report);

// add new expenses
router.post('/', expensesController.add_new);

module.exports = router;