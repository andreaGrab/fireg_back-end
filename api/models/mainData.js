const mongoose = require('mongoose');

const mainDataSchema = new mongoose.Schema({
	capital: {type: Number, required: true},
	reserve: {type: Number, required: true}
});

module.exports = mongoose.model('Main-Data', mainDataSchema);