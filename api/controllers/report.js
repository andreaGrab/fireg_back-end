exports.get_report = (req, res, next)=>{
	const spese = require('../../spese');
	const main_dat = require('../../main_dat');
	let speseCifre = [];
	spese.forEach((spesa)=>{
		speseCifre.push(spesa.expenses);
	});

	const bilancio = speseCifre.length ? Math.round((speseCifre.reduce((a,c)=>a+c))*100)/100 : 0;
	const cCorrente = Math.round((main_dat['data'][0].capital - bilancio)*100)/100;
	const cRiserva = Math.round((cCorrente - main_dat['data'][0].reserve)*100)/100;
	const media = speseCifre.length ? Math.round(bilancio / speseCifre.length * 100)/100 : 0;

	const resoconto = [];
	resoconto["resoconto"] = {
			capitale: main_dat['data'][0].capital,
			corrente: cCorrente,
			bilancio: bilancio,
			riserva: cRiserva,
			media: media	
		};
	console.table(resoconto);
	//res.status(200).send("Report requested, result logged!");
	res.status(200).json(resoconto['resoconto']);
};