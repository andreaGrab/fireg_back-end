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
					// setting cookies
					res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000});
					res.status(200).redirect('/reg');
				});
			}else{
				// to make redirect page 400
				res.status(400).send('Credentials incorrect!');
			}
		});
	})
	.catch(err=>{
		res.status(400).send(err);
		console.log(err);
	});
};