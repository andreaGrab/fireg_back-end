// form data
const capitale = 1239.27;
const riserva = 200;

// expense data
const speseData = [
	{
		name: "ricarica",
		expense: 10,
		tag: "ordinaria",
		date: "01/01/2019"
	},
	{
		name: "meccanico",
		expense: 300,
		tag: "straordinaria",
		date: "03/08/2019"
	},
	{
		name: "canone/rata",
		expense: 50.99,
		tag: "imperativa",
		date: "13/11/2019"
	}
];

// logic
const spese = [];
console.log("------- spese -------");
speseData.forEach((spesa)=>{
	spese.push(spesa.expense);
});

console.table(speseData);

const bilancio = spese.reduce((a,c)=>a+c);
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

// testing console
console.log("--------------");
/*console.log(`${capitale} capitale iniziale`);
console.log(`${cCorrente} capitale corrente`);
console.log(`${bilancio} bilancio spese`);
console.log(`${cRiserva.toFixed(2)} riserva`);
console.log(`${media} media del mese`);*/
console.table(resoconto);

// version display
console.log('__________________________________');
console.log('Finanziario AG. Ver 1.0')