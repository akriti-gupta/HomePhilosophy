var passport = require('passport');
	

exports.authenticate = function(req, res, next){
		console.log('In auth.js 1');
		var auth = passport.authenticate('local',function(err, user){
			console.log('In auth.js 2');
			if(err){return next(err);console.log('In auth.js err');}
			if(!user){res.send({success: false});console.log('In auth.js err 1');}
			console.log('In auth.js bef login');
		 	req.logIn(user,function(err){
		 		if(err){return next(err);}
		 		res.send({success:true, user:user});
		 	})
		 });
		auth(req,res,next);
	};

exports.requiresApiLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		res.status(403);
		res.end();
	}
	else{
		next();
	}
};

exports.requiresRole = function(role){
	return function(req,res,next){
		if(!req.isAuthenticated() || req.user.role!=role){
			res.status(403);
			res.end();
		}
		else{
			next();
		}
	}
}