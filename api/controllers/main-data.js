const MainData = require('../models/mainData');
const Main_data = require('../../scripts/main_dat');
const path = require('path');

// get all
exports.get_all = (req, res, next)=>{
	MainData.find()
	.select('capital reserve mData')
	.exec()
	.then(data=>{
		const response = {
			data: data.map(dat=>{
				return {
					capital: dat.capital,
					reserve: dat.reserve,
					mData: dat.mData
				}
			})
		};
		res.status(200).send(response);
	})
	.catch(err=>{
		res.status(500).send(err);
		console.log(err);
	});
};

// insert
exports.add_data = (req, res, next)=>{
	const mainData = new MainData({
		capital: req.body.capital,
		reserve: req.body.reserve
	});

	mainData.save()
	.then(result=>{
		res.status(201).redirect('/reg');
		console.log('Main data registered!');
		Main_data();
		const main_datFile = path.resolve('coding/capitale', '../../main_dat.js');
		delete require.cache[main_datFile];
	})
	.catch(err=>{
		res.cookie('badReq', err.message);
		res.status(400).redirect('/badreq');
	});
};