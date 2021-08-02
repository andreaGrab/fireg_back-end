const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// connecting to .env file
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// routes
const mainData = require('./api/routes/main-data');
const expenses = require('./api/routes/expenses');
const abort = require('./api/routes/abort');
const signUp = require('./api/routes/signup');
const logIn = require('./api/routes/login');

// db connection
mongoose.connect(process.env.MONGODB_USER + 
	process.env.MONGO_PSWD + process.env.CONNECTION_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

// prevent deprecating error of mongoose in console
mongoose.Promise = global.Promise;

// middleware
app.use(cookieParser());
app.use(morgan('dev'));// error handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));// parsing raw json body


// CORS errors prevention///////////////
app.use(cors({
	credentials: true,
	methods: ['GET', 'POST', 'DELETE'],
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));


// routes handling
app.use('/', router.get('/', (req, res)=>{res.send('FIN_AG API V1 - Author: Andrea Grabovac')}));
app.use('/api/main-data', mainData);
app.use('/api/expenses', expenses);
app.use('/api/abort', abort);
app.use('/api/signup', signUp);
app.use('/api/login', logIn);

////////////////////////////////////////
//- error 404 handling
app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

//- general error handling
app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});
////////////////////////////////////////

process.on('uncaughtException', function (err) {
    console.log(err);
});
module.exports = app;
