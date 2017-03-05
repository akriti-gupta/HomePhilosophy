var mysql = require('mysql');
var env = process.env.NODE = process.env.NODE || 'development';
var config = require('./config')[env];

// var pool = mysql.createPool({
// 				host     : '127.0.0.1',
// 				user     : 'root',
// 				password : 'Schmooz@14',
// 				database : 'testSchema',
// 				charset  : 'utf8'
// 			});

//var pool = mysql.createPool('mysql://root:Schmooz@14@127.0.0.1/testSchema');	
var pool = mysql.createPool(config.db);	
	
exports.getConnection = function(cb){
	pool.getConnection(function(err,conn){
		if(err){
			return cb(err)
		}
		cb(err,conn);
	});
}