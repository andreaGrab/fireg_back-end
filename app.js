const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// routes
const mainData = require('./api/routes/main-data');
const expenses = require('./api/routes/expenses');
const report = require('./api/routes/report');
const abort = require('./api/routes/abort');
const signUp = require('./api/routes/signup');
const logIn = require('./api/routes/login');

// save/update local files from db (spese & main_dat)
const Spese = require('./scripts/spese');
Spese();
const Main_data = require('./scripts/main_dat');
Main_data();

// db connection
mongoose.connect("mongodb+srv://Andrea:" + 
	process.env.MONGO_PSWD +
	"@tutorial-9hkwc.mongodb.net/fin_ag?retryWrites=true&w=majority",
	{
		useNewUrlParser: true
	}
);

// prevent deprecating error of mongoose in console
mongoose.Promise = global.Promise;

// midleware
app.use(morgan('dev'));// error handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());// parsing raw json body


// CORS errors prevention///////////////
app.use((req, res, next)=>{
	// Allowing access origin to all domains
	res.header('Access-Control-Allow-Origin', '*');
	// Types of header allowed
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	// if request method is options allow all http methods
	if(req.method === 'OPTIONS'){
		res.header('Access-Constrol-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();// go to next middleware
});
/////////////////////////////////////////

// routes handling
app.use('/main-data', mainData);
app.use('/expenses', expenses);
app.use('/report', report);
app.use('/abort', abort);
app.use('/signup', signUp);
app.use('/login', logIn);

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
module.exports = app;
