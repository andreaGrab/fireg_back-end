const fetch = require('node-fetch');
const fs = require('fs');

const main_data_init = fetch('http://localhost:3000/main-data')
.then(response=> response.json())
.then(json=>{
	let main_data = JSON.stringify(json);
		try{
			if(fs.existsSync('main_dat.js')){
				fs.unlink('main_dat.js', (err)=>{

					if(err) throw err;
					console.log('(main-data) Deleting...');

					fs.appendFile('main_dat.js', `let main_dat = ${main_data}; module.exports = main_dat;`, (err)=>{
						if(err) throw err;
						console.log(`(main-data) Updated`);
					})

				});
			}else{

				fs.appendFile('main_dat.js', `let main_dat = ${main_data}; module.exports = main_dat;`, (err)=>{
					if(err) throw err;
					console.log(`(main-data) Saved`);
				});

			}
		}catch(err){
			console.log(err);
		}
	})
.catch(err=>console.log(err));

module.exports = main_data_init;
