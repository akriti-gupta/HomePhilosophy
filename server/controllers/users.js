var db = require('../config/db.js');

// var connObj= new db.getConnection();
// var connection=connObj.connection; 

exports.getUsers = function(req,res){
		var data={query:"select * from user"};
		db.query_runner(data,function(collection){
			res.send(collection);
		});
	}

exports.createUser = function(req,res,next){
	var userData = req.body;
	/* TO DO: create salt and hash */

	var post ={firstname:req.body.firstname,username:req.body.username,password:req.body.password};
	var data={query:"insert into user set ?",insert_data:post};
	db.query_runner(data,function(user){
		if(!user){
			console.log("Error is:" +err);
			res.status(400);
			return res.send({reason:err.toString()});
		}
		console.log(user);
		req.login(user,function(err){
			if(err){console.log("Error is logging, :"+err);return next(err);}
			res.send(user);
		})
	});

console.log(req.body);


}