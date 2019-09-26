const mongoose = require('mongoose');
const Expenses = require('../models/expenses');
const MainData = require('../models/mainData');

exports.abort = (req, res, next)=>{
	Expenses.deleteMany({exp: "spesa"}, err=>{
		if(err){
			res.send(err);
			console.log(err);
		}
		console.log('expenses deleted');
	});
	MainData.deleteMany({mData: "main-data"}, err=>{
		if(err){
			res.send(err);
			console.log(err);
		}
		console.log('main data deleted')
	});
	res.status(200).send('ABORT COMPLETED!')
	console.log('REGISTER ABORTED!');
};