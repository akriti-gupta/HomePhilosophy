/*  var User = require('mongoose').model('User'),
	var ModelBase = require('../config/bookshelf'),
  	 var User = ModelBase.extend({tableName: 'user'}); */

var User = require('../models/User'),
	// Users = require('../collections/Users'),
	// CustQuiz = require('../models/CustQuiz'),
	// CustQuizzes = require('../collections/CustQuizzes'),
	encryption = require('../utilities/encryption');
	

exports.getUsers = function(req,res){
		User.find({}).exec(function(err,collection){
			res.send(collection);
		});
		
		// User.findAll().asCallback(function(err,collection){
	// Users.forge().fetch().then(function(collection) { 
	// 	res.send(collection);
	// });
}


// exports.createUser = function(req,res,next){
// 	var userData = req.body;
// 	userData.salt = encryption.createSalt();
// 	userData.password = encryption.hashPswd(req.body.password,userData.salt);
// 	User.forge(userData).save().then (function(user){
// 	//User.create(userData).then(function(user){
// 		//res.send(user);
// 		req.login(user,function(err){
// 			if(err){return next(err);}
// 			res.send(user);
// 		})
// 	}).catch(function(err){
// 		if(err.toString().indexOf('ER_DUP_ENTRY')>-1){
// 			err = new Error('Username exists');
// 		}
// 		res.status(400);
// 		return res.send({reason:err.toString()});
// 	});
// } 


//MONGO Method
exports.createUser = function(req,res,next){
	var userData = req.body;
	userData.salt = encryption.createSalt();
	userData.password = encryption.hashPswd(req.body.password,userData.salt);
	User.create(userData, function(err,user){
		if(err){
			if(err.toString().indexOf('E11000')>-1){
				err = new Error('Username exists');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		req.login(user,function(err){
			if(err){return next(err);}
			res.send(user);
		})
	})
} 
