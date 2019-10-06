const mongoose = require('mongoose');
const Expenses = require('../models/expenses');
const MainData = require('../models/mainData');
const jwt = require('jsonwebtoken');

exports.abort = (req, res, next)=>{
	jwt.verify(req.token, process.env.JWT_SECRET, (err, obj)=>{
		if(err){
			res.status(400).send(err);
			console.log(err);
		}else{
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
		}
	});
};