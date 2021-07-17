module.exports = (req, res, next)=>{
		let headerOuth = req.headers.authorization;
		let cookieVal = req.headers.cookie.split("=");
		headerOuth="Bearer " + cookieVal[1];
		if(headerOuth != null){
			// take from header authorization the token, splitting space between bearer & the token
			const token = headerOuth.split(" ")[1];
			console.log(token);
			// set a token property of req obj to the token it self
			req.token = token;
			// go to next middleware
			next();
		}else{
			res.status(401).send('Not authorized!');
		}
};