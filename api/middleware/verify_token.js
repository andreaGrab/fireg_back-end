const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
		const headerOuth = req.headers.authorization;
		if(headerOuth != null){
			// take from header authorization the token, splitting space between bearer & the token
			const token = headerOuth.split(" ")[1];
			// set a token property of req obj to the token it self
			req.token = token;
			// go to next middleware
			next();
		}else{
			res.status(400).send('Not authorized!');
		}
};