const mongoose = require('mongoose');
const MainData = require('../models/mainData');

// insert
exports.add_data = (req, res, next)=>{
	const mainData = new MainData({
		capital: req.body.capital,
		reserve: req.body.reserve
	});

	mainData.save()
	.then(result=>{
		res.status(201).send("Data registered!");
	})
	.catch(err=>{
		console.log(err);
		res.status(500).send(err);
	});
};