const mongoose = require('mongoose');

const mainDataSchema = new mongoose.Schema({
	capital: {type: Number, required: true},
	reserve: {type: Number, required: true},
	mData:{type:String, default:"main-data"},
	date:{type:String, default:Date()}
});

module.exports = mongoose.model('Main-Data', mainDataSchema);