var mysql = require("mysql");

// var method = db.prototype;

// function db() {
// 	var con = mysql.createPool({
// 		host : 'localhost',
// 	  	user : 'root',
// 	  	password : 'Schmooz@14',
// 	  	database : 'testSchema'
// 	});
// 	this.connection=con;
// }
// method.getcon = function() {
// 	return this;
// };

// module.exports = db;




// exports.getConnection = function(){
// 	var con = mysql.createPool({
// 		host : 'localhost',
// 	  	user : 'root',
// 	  	password : 'Schmooz@14',
// 	  	database : 'testSchema'
// 	});
// 	this.connection=con;
// }


var pool = mysql.createPool({
		host : 'localhost',
	  	user : 'root',
	  	password : 'Schmooz@14',
	  	database : 'testSchema'
	});

exports.connection = function(){
	pool.getConnection(function(err,connection){
	    if (err){
	    	console.log('Error');
	        con.release();
	    } 
	    else{  
	    	console.log('connected as id ' + connection);
	    	return connection;
	    }
	})
}
exports.query_runner=function(data,callback){
	console.log("In query runner");
	// var db_connection=data.connection;

	// console.log('db-conn is: '+db_connection);
	var query=data.query;
	var insert_data=data.insert_data;
	pool.getConnection(function(err,con){
		if(err){
		  con.release();
		}else{
			con.query(String(query),insert_data,function(err,rows){
		    con.release();
		    if(!err) {
		    	callback(rows);
		    } else {
		     	console.log("Query failed: "+err);  
		    }        
		  });
		}
	});
}
