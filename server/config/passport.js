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
        // callbackURL     : 'http://homephilosophy.com.sg/auth/facebook/callback'
        callbackURL     : 'https://homephilosophysg.herokuapp.com/auth/facebook/callback'
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
                    conn.query('Select * from user where fbId = '+conn.escape(profile.id), function(err, results, fields){
                        if(err){
                           conn.release();
                            return done(null, false); 
                        }
                        if(results && results.length > 0){
                            conn.release();
                            console.log('Found');
                            return done(null,results[0]);
                        }
                         else {
                            console.log('Create a new user for: ');
                            console.log(profile);
                            var userData = {fbId:profile.id, firstname: profile.displayName}
                           
                            conn.query('insert into user set ?',userData, function(err, results, fields){
                                if(err){
                                    console.log('Error in inserting user data from fb '+err);
                                    conn.release();
                                    return done(err,profile);
                                }
                                else{
                                    console.log(results);
                                    console.log(fields);
                                    return done(null,false)
                                }
                            });
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

