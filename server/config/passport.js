/*  mongoose = require('mongoose'),
    ModelBase = require('../config/bookshelf'),
    User = mongoose.model('User'); */

var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'); 
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    //bookshelf = require('../config/bookshelf'),
    //User = require('../models/User'),
    encrypt = require('../utilities/encryption');



/*	var User = ModelBase.extend({
                tableName: 'user',
                authenticate: function(pswd){
                    console.log('In authenticate: pswd is : '+pswd+' and salt is: '+this.get('salt'));
                    return encrypt.hashPswd(pswd,this.get('salt'))===this.get('password');
                }});*/


module.exports = function(){

    // passport.use(new LocalStrategy(
    //     function(username, password, done){

    //         //User.findOne({username: username}).then(function(user) {
    //         User.forge({username: username}).fetch().asCallback(function(err,user) {     
    //             if(user && user.authenticate(password)) {
    //                 return done(null,user);
    //             }
    //             else {
    //                 return done(null,false);
    //             }
    //         })
    //     }
    // ));

    //MONGO method
    var User = mongoose.model('User');
	passport.use(new LocalStrategy(
		function(username, password, done){
			User.findOne({username: username}).exec(function(err,user) {
     		 if(user && user.authenticate(password)) {
					return done(null,user);
			    }
			    else {
			    	return done(null,false);
			    }
			});
		}
	));

	 passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : '118647685254312',
        clientSecret    : '00b53f5364ad582f67c1ba5d7e269acd',
        callbackURL     : 'http://localhost:8006/auth/facebook/callback'

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

console.log('In FB auth');
            // find the user in the database based on their facebook id
            
            User.findOne({ '_id' : profile.id }).exec( function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    _id    = profile.id; // set the users facebook id                   
                    token = token; // we will save the token that facebook provides to the user                    
                    firstName  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    username = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });
        console.log('In FB auth end');

    }));

	passport.serializeUser(function(user,done){
		if(user){
			done(null,user._id);
           // done(null,user.get('id'));
		}
	});

    // passport.deserializeUser(function(id,done){
    //     //User.findOne({id: id}).asCallback(function(err,user) {
    //     User.forge({id: id}).fetch().asCallback(function(err,user) {     
    //         if(user) {
    //             return done(null,user);
    //         }
    //         else {
    //             return done(null,false);
    //         }
    //     });

    // });

	passport.deserializeUser(function(id,done){
			User.findOne({_id: id}).exec(function(err,user) {
				if(user) {
					return done(null,user);
			    }
			    else {
			    	return done(null,false);
			    }
		});

	});
}

