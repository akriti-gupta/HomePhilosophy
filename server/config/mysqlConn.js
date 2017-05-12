var mysql = require('mysql');
 
var pool = mysql.createPool({
				host     : '127.0.0.1',
				user     : 'root',
				password : 'Schmooz@14',
				database : 'HomePhilosophy',
				charset  : 'utf8',
				timezone : '-08:00'
			});

//var pool = mysql.createPool('mysql://b20378526fd3ee:a50a903c@us-cdbr-iron-east-03.cleardb.net/heroku_8dae569721f1b75?reconnect=true');	
//var pool = mysql.createPool(config.db);	
	
exports.getConnection = function(cb){
	pool.getConnection(function(err,conn){
		if(err){
			return cb(err)
		}
		cb(err,conn);
	});
}

