var mongoose = require('mongoose'),
	userModel = require('../models/User');
	// styleModel = require('../models/Style'),
	// roomModel = require('../models/Room'),
	// imageModel = require('../models/QuizImage');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error'));
	db.once('open',function(callback){
		console.log("HP DB opened");
	});

	userModel.createDefaultUsers();
	// styleModel.createStyles();
	// roomModel.createRooms();
	// imageModel.createQuizImages();
}

