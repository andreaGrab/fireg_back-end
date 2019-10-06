const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = function(req, res, next){
	const uName = req.body.name;
	const uPass = req.body.password;
	User.find({name:uName})
	.then(function(userDb){
		bcrypt.compare(uPass, userDb[0].password, function(err, response){
			if(response){
				jwt.sign({name:userDb[0].name},process.env.JWT_SECRET, {expiresIn: 30},(err, token)=>{
					res.status(200).json(
						{
							userStatus: "Logged in",
							token: token
						}
					);
				});
			}else{
				res.status(400).send('Credentials incorrect!');
			}
		});
	})
	.catch(err=>{
		res.status(500).send(err);
	});
};