require('dotenv').config();
var mysql = require('mysql');
 
var pool = mysql.createPool({
				host     : '127.0.0.1',
				user     : process.env.DBUSER,
				password : process.env.DBKEY,
				database : process.env.DB,
				charset  : 'utf8',
				timezone : '+08:00'
			});

exports.getConnection = function(cb){
	pool.getConnection(function(err,conn){
		if(err){
			return cb(err)
		}
		cb(err,conn);
	});
}

