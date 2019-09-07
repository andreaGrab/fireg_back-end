const mongoose = require('mongoose');
const Expenses = require('../models/expenses');

// get all
exports.get_all = (req, res, next)=>{
	Expenses.find()
	.select('name expenses tag')
	.exec()
	.then(docs=>{
		const response = {
			expenses: docs.map(doc=>{
				return {
					_id: doc._id,
					name: doc.name,
					expenses: doc.expenses,
					tag: doc.tag
				}
			})
		}
		res.status(200).send(response);
	})
	.catch(err=>{
		res.status(500).send(err);
	});
}

// add new
exports.add_new = (req, res, next)=>{
	const expenses = new Expenses({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		expenses: req.body.expenses,
		tag: req.body.tag
	});

	expenses.save()
		.then(result=>{
			console.log(result);
			res.status(201).send('Expense created!');
		})
		.catch(err=>{
			console.log(err);
			res.status(500).send(err);
		});
};