var express = require('express'),
	mysql = require('mysql'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE = process.env.NODE || 'development';
var app = express();
//var port = 8006;


var config = require('./server/config/config')[env];
require('./server/config/express')(app,config);

/* requiring config db.js file starts*/
var db = require("./server/config/db.js");
var connection_object= new db();
var connection=connection_object.connection; // getting conncetion object here 
/* requiring config db.js file ends*/



passport.use(new LocalStrategy(
	function(username, password, done){

		//Authentication code.
		var data={query:"select * from user where password='"+password+"' and username='"+username+"' ",
		  		  connection:connection
		  		 };

		query_runner(data,function(result){
			if(result.length>0) {
				console.log("Im server, result >0");
				return done(null,result);
		    }
		    else {
		    	return done(null,false);
		    }
		});
	}
));
	

passport.serializeUser(function(user,done){
	if(user){
		console.log('In serialise');
		done(null,user[0].id);
	}
});

passport.deserializeUser(function(id,done){
	var data={
			   query:"select * from user where id="+id+" ",
		       connection:connection
		     };
	query_runner(data,function(result){
		if(result.length>0) {
			return done(null,result[0]);
	    }
	    else {
	    	return done(null,false);
	    }
	});
	return done(null, true);
});
require('./server/config/routes')(app);


var query_runner=function(data,callback){
	var db_connection=data.connection;
	var query=data.query;
	var insert_data=data.insert_data;
	db_connection.getConnection(function(err,con){
		if(err){
		  con.release();
		}else{
			db_connection.query(String(query),insert_data,function(err,rows){
		    con.release();
		    if(!err) {
		    	callback(rows);
		    } else {
		      console.log(err);  
		      console.log("Query failed");  
		    }        
		  });
		}
	});
}


app.listen(config.port)
console.log('Server is listening on port' + config.port);



