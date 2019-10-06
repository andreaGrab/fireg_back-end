const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');
const verifyToken = require('../middleware/verify_token');

// get all expenses
router.get('/', expensesController.get_all);

// report expenses
router.get('/report', expensesController.get_all_report);

// add new expenses
router.post('/', expensesController.add_new);

// delete expenses by id
router.delete('/:expId', verifyToken, expensesController.delete);

module.exports = router;