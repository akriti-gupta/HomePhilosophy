var mysql = require('mysql');

// module.exports = function(){
	
	// var pool = mysql.createPool({
	// 					host     : '127.0.0.1',
	// 					user     : 'root',
	// 					password : 'Schmooz@14',
	// 					database : 'testSchema',
	// 					charset  : 'utf8'
	// 				});

	
	// var pool = mysql.createPool('127.0.0.1@root/Schmooz@14?reconnect=true');
	 var pool = mysql.createPool('mysql://be86c3a02b9721:629adc5a@us-cdbr-iron-east-04.cleardb.net/heroku_41653343a548b2a?reconnect=true');

	// var pool = mysql.createPool(config);
	// pool.getConnection(function(err,conn){
	// 	if(err){
	// 		return cb(err)
	// 	}
	// 	cb(err,conn);
	// });
	
//}

// mysql://be86c3a02b9721:629adc5a@us-cdbr-iron-east-04.cleardb.net/heroku_41653343a548b2a?reconnect=true

exports.getConnection = function(cb){
		pool.getConnection(function(err,conn){
			if(err){
				return cb(err)
			}
			cb(err,conn);
		});
	}