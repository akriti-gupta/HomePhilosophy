var mongoose = require('mongoose'),
	userModel = require('../models/User');

module.exports = function(config){
	console.log('In mongoose file, config.db is: ');
	console.log(config.db)
	console.log('Before connecting to DB');
	mongoose.connect(config.db);
	console.log('after connecting to DB');
	var db = mongoose.connection;
	console.log('db is: '+db);
	// db.on('error',console.error.bind(console,'connection error'));
	db.on('error',console.log('connection error'));
	db.once('open',function(callback){
		console.log("HP DB opened");
	});

	userModel.createDefaultUsers();
}

