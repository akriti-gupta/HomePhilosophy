var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	db = require('./db.js');

module.exports = function(){
	
	passport.use(new LocalStrategy(
		function(username, password, done){
	

			//Authentication code.
			var data={query:"select * from user where password='"+password+"' and username='"+username+"' "
			  		 };
			  	db.query_runner(data,function(user){
				if(user.length>0) {
					return done(null,user);
			    }
			    else {
			    	return done(null,false);
			    }
			});
		}
	));

	passport.serializeUser(function(user,done){
		if(user){
			done(null,user[0].id);
		}
	});

	passport.deserializeUser(function(id,done){
		var data={
				   query:"select * from user where id="+id
			     };
		db.query_runner(data,function(result){
			if(result.length>0) {
				return done(null,result[0]);
		    }
		    else {
		    	return done(null,false);
		    }
		});

	});
}

