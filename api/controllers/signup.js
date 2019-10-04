const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.add_new = (req, res, next)=>{
	const salts = 10;
	const password = req.body.password;

	bcrypt.hash(password, salts, (err, criptedPass)=>{
		if(err){
			res.status(500).send(err);
			console.log(err);
		}else{
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				password: criptedPass
			});
			user.save()
			.then(result=>{
				res.status(201).send('User created!');
			})
			.catch(err=>{
				res.status(500).send(err);
				console.log(err);
			});
		}
	});
};