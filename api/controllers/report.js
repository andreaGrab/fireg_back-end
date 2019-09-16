exports.get_report = (req, res, next)=>{
	const spese = require('../../spese');
	const main_dat = require('../../main_dat');
	let speseCifre = [];
	spese.forEach((spesa)=>{
		speseCifre.push(spesa.expenses);
	});
	if(speseCifre.length == 0){
		res.status(200).send("Nothing to report");
	}else{
		const bilancio = speseCifre.reduce((a,c)=>a+c);
		const cCorrente = main_dat['data'][0].capital - bilancio;
		const cRiserva = cCorrente - main_dat['data'][0].reserve;
		const media = Math.round(bilancio / speseCifre.length * 100)/100;

		const resoconto = [];
		resoconto["resoconto"] = {
				capitale: main_dat['data'][0].capital,
				corrente: cCorrente,
				bilancio: bilancio,
				riserva: cRiserva,
				media: media	
			};
		console.table(resoconto);
		res.status(200).send("Report requested, result logged!");
	}
};