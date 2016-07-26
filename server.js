var express = require('express'),
	mysql = require('mysql'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE = process.env.NODE || 'development';
var app = express();
//var port = 8006;


var config = require('./server/config/config')[env];
require('./server/config/express')(app,config);


// var db = require("./server/config/db.js");
// var connection_object= new db();
// var connection=connection_object.connection; 


passport.use(new LocalStrategy(
	function(username, password, done){

		//Authentication code.
		var data={query:"select * from user where password='"+password+"' and username='"+username+"' ",
		  		  connection:connection
		  		 };
		  		 var data={query:"select * from user where password='"+password+"' and username='"+username+"' "
		  		  // connection:connection
		  		 };

		query_runner(data,function(result){
			if(result.length>0) {
				//console.log("In auth code in server, result >0");
				return done(null,result);
		    }
		    else {
		    	return done(null,false);
		    }
		});
	}
));
	

// app.use(function(req,res,next){
// 	console.log('In middlware: ' +req.user);  //Returns true here.
// 	next();
// });

passport.serializeUser(function(user,done){
	if(user){
		//console.log('In serialise, :'+user[0].id);
		done(null,user[0].id);
	}
});

passport.deserializeUser(function(id,done){
	//console.log('deserializeUser called, id='+id);
	var data={
			   query:"select * from user where id="+id,
		       connection:connection
		     };
	query_runner(data,function(result){
		if(result.length>0) {
			//console.log("Result len >0, it is: "+result[0].username);
			return done(null,result[0]);
	    }
	    else {
	    	return done(null,false);
	    }
	});
	//return done(null, res);
});
require('./server/config/routes')(app);


// app.use(function(req,res,next){
// 	console.log('New middlware: ' +req.user.username);   // Returns user object.
// 	next();
// });

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
		      console.log("Query failed: "+err);  
		    }        
		  });
		}
	});
}

app.listen(config.port)
console.log('Server is listening on port' + config.port);



