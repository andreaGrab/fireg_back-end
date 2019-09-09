module.exports = ()=>{
	const spese = [];
	console.log("------- spese -------");
	response.expenses.forEach((spesa)=>{
		spese.push(spesa.expenses);
	});

	console.table(response.expenses);

	/*const bilancio = spese.reduce((a,c)=>a+c);
	const cCorrente = capitale - bilancio;
	const cRiserva = cCorrente - riserva;
	const media = Math.round(bilancio / spese.length * 100)/100;

	const resoconto = [];
	resoconto["resoconto"] = {
			capitale: capitale,
			corrente: cCorrente,
			bilancio: bilancio,
			riserva: cRiserva,
			media: media	
		};
	console.table(resoconto);*/
};