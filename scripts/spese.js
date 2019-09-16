const fetch = require('node-fetch');
const fs = require('fs');

const spese_init = ()=>{
	fetch('http://localhost:3000/expenses')
	.then(response=> response.json())
	.then(json=>{
		let spese = JSON.stringify(json.expenses);
			try{
				if(fs.existsSync('spese.js')){
					fs.unlink('spese.js', (err)=>{

						if(err) throw err;
						console.log('(expenses) Deleting...');

						fs.appendFile('spese.js', `let spese = ${spese}; module.exports = spese;`, (err)=>{
							if(err) throw err;
							console.log(`(expenses) Updated`);
						})

					});
				}else{

					fs.appendFile('spese.js', `let spese = ${spese}; module.exports = spese;`, (err)=>{
						if(err) throw err;
						console.log(`(expenses) Saved`);
					});

				}
			}catch(err){
				console.log(err);
			}
		})
	.catch(err=>console.log(err));
}

module.exports = spese_init;