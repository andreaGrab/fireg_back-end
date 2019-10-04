const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = function(req, res, next){
	const uName = req.body.name;
	const uPass = req.body.password;
	User.find({name:uName})
	.then(function(userDb){
		bcrypt.compare(uPass, userDb[0].password, function(err, response){
			if(response){
				res.status(200).send('User logged in');
			}else{
				res.status(400).send('Credentials incorrect!');
			}
		});
	})
	.catch(err=>{
		res.status(500).send(err);
	});
};