module.exports = (req, res, next)=>{
		let headerAuth = req.headers.authorization;
		/*if(typeof headerAuth !== 'string'){
			res.status(400);
			console.log(headerAuth + "from authorization header");
		}else{
			let cookieVal = req.headers.cookie.split("token=");
			console.log(cookieVal + "from cookie header");
			headerAuth="Bearer " + cookieVal[1];
		}*/
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