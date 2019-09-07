const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	name: {type: String, required: true},
	expenses: {type: Number, required: true},
	tag: {type: String, required: true}
});

module.exports = mongoose.model('Expenses', expensesSchema);