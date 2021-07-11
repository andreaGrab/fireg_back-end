const mongoose = require('mongoose');
const Expenses = require('../models/expenses');
const Spese = require('../../scripts/spese');
const path = require('path');
const speseFile = path.resolve('coding/capitale', '../../spese.js');
const jwt= require('jsonwebtoken');

// get all
exports.get_all = (req, res, next)=>{
	Expenses.find()
	.select('name expenses tag exp')
	.exec()
	.then(docs=>{
		const response = {
			expenses: docs.map(doc=>{
				return {
					_id: doc._id,
					name: doc.name,
					expenses: doc.expenses,
					tag: doc.tag,
					exp: doc.exp
				}
			})
		}
		res.status(200).send(response);
	})
	.catch(err=>{
		res.status(500).send(err);
	});
};

// get all(report)
exports.get_all_report = (req, res, next)=>{
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
		console.table(response.expenses);
		res.status(200).json(response.expenses);
	})
	.catch(err=>{
		res.status(500).send(err);
	});
};


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
			res.status(201).redirect('/reg');
			Spese();
			delete require.cache[speseFile];
		})
		.catch(err=>{
			console.log(err);
			res.status(500).send(err);
		});
};

// delete by id
exports.delete = (req, res, next)=>{
	jwt.verify(req.token, process.env.JWT_SECRET, (err, obj)=>{
		if(err){
			res.status(400).send(err);
			console.log(err);
		}else{
			Expenses.deleteOne({_id:req.params.expId})
			.exec()
			.then(result=>{
				res.status(200).send('Expenses deleted!');
				Spese();
				delete require.cache[speseFile];
			})
			.catch(err=>{
				res.status(500).send(err);
				console.log(err);
			});
		}
	});
};