module.exports = (req, res, next)=>{
		if(typeof req.headers.authorization !== 'string'){
			res.status(400);
			console.log(req.headers.authorization);
		}else{
			let headerAuth = req.headers.authorization;
			let cookieVal = req.headers.cookie.split("token=");
			console.log(cookieVal);
			headerAuth="Bearer " + cookieVal[1];
		}
		if(headerAuth != null){
			// take from header authorization the token, splitting space between bearer & the token
			const token = headerAuth.split(" ")[1];
			console.log(token);
			// set a token property of req obj to the token it self
			req.token = token;
			// go to next middleware
			next();
		}else{
			res.status(401).send('Not authorized!');
		}
};