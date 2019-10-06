const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.add_new = (req, res, next)=>{
	// check if there are more than one user registered on db
	User.find()
	.exec()
	.then(docs=>{
		if(docs.length > 0){
			res.status(400).send('Limit user reached!');
		}else{
			// if no users on db, run this block
			const salts = 10;
			const password = req.body.password;

			// encrypting password from client form
			bcrypt.hash(password, salts, (err, criptedPass)=>{
				if(err){
					res.status(500).send(err);
					console.log(err);
				}else{
					// create new user & save user name & encrypted pswd on db
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
		}
	})
	.catch(err=>{
		res.status(500).send(err);
		console.log(err);
	});
};