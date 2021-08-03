const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

exports.login = function(req, res, next){
	const uName = req.body.name;
	const uPass = req.body.password;
	User.find({name:uName})
	.then(function(userDb){
		bcrypt.compare(uPass, userDb[0].password, function(err, response){
			if(response){
				jwt.sign({name:userDb[0].name},process.env.JWT_SECRET, {expiresIn: 30},(err, token)=>{
					// setting cookies
					/*res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false, sameSite: "None", secure: true});*/
					res.json({token: token});
				});
			}else{
				res.status(400).redirect('/ercred');
			}
		});
	})
	.catch(err=>{
		res.cookie('badReq', err.message);
		res.status(400).redirect('/badreq');
	});
};