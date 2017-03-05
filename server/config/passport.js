var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/User'),
    encrypt = require('../utilities/encryption'),
    mysqlConn = require('../config/mysqlConn');


module.exports = function(){
    passport.use(new LocalStrategy(
        function(username, password, done){
            mysqlConn.getConnection(function(err,conn){
                if(err){
                    console.log('Err in getting mysql conn: '+err);
                    return(err, false);
                }
                if(conn){
                    conn.query('Select * from user where username = '+conn.escape(username), function(err, results, fields){
                        if(results && results.length > 0){
                            if(User.authenticate(password,results[0].salt,results[0].password)){
                                conn.release();
                                return done(null,results[0]);
                            }
                            else{
                                conn.release();
                                return done(null, false);
                            }
                        }
                        else{
                            conn.release();
                            return done(null,false);
                        }

                    });
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


            // find the user in the database based on their facebook id
            
               mysqlConn.getConnection(function(err,conn){
                if(err){
                    console.log('Err in getting mysql conn: '+err);
                    return(err, false);
                }
                if(conn){
                    conn.query('Select * from user where id = '+conn.escape(profile.id), function(err, results, fields){
                        if(err){
                           conn.release();
                            return done(null, false); 
                        }
                        if(results && results.length > 0){
                            conn.release();
                            return done(null,results[0]);
                        }
                         else {
                            // if there is no user found with that facebook id, create them
                            /*var newUser = new User();
                 
                            // set all of the facebook information in our user model
                            newUser.fb.id    = profile.id; // set the users facebook id                 
                            newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user                    
                            newUser.fb.firstName  = profile.name.givenName;
                            newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
                            newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                 
                            // save our user to the database
                            newUser.save(function(err) {
                              if (err)
                                throw err;
                 
                              // if successful, return the new user
                              return done(null, newUser);
                            });*/
                         } 
                       
                    });
                }

              

            });
        });
        console.log('In FB auth end');

    }));

	passport.serializeUser(function(user,done){
		if(user){
            done(null,user.id);
		}
	});

    passport.deserializeUser(function(id,done){
        mysqlConn.getConnection(function(err,conn){
            if(conn){
                conn.query('Select * from user where id = '+conn.escape(id), function(err, results, fields){
                    if(err){
                        console.log('Err in deserializeUser: '+err);
                        conn.release();
                        return done(null, false);
                    }
                    if(results && results.length > 0){
                        conn.release();
                        return done(null,results[0]);
                    }
                    else{
                        conn.release();
                        return done(null, false);
                    }
                });
            }
        });
    });
}

