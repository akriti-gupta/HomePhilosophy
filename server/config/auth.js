var passport = require('passport');
var uuidV4 = require('uuid/v4');

//Local User
exports.authenticate = function(req, res, next){
	var auth = passport.authenticate('local',function(err, user){
		if(err){return next(err);}
		
		if(!user){res.send({success: false});}
		
		req.logIn(user,function(err){
			if(err){return next(err);}
			res.send({success:true, user:user});
		})
	});
	auth(req,res,next);
};

//To enable authorization - check if a user is logged in.
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

exports.generateRandomUID = function(req, res, next){
	var uuid = uuidV4();
	req.session.uuid = uuid;
	next();
}