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
                return(err, false);
            }
            if(conn){
                conn.query('Select * from user where username = '+ 
                  conn.escape(username), 
                  function(err, results, fields){
                    if(results && results.length > 0){
                        if(User.authenticate(password,results[0].salt,
                        results[0].password)){
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
        

        clientID        : '1123799114413407',
        clientSecret    : 'bd3dea47fe556f93f9a8895acd34763c',   
        callbackURL     : 'http://homephilosophy.com.sg/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email'],
        enableProof: true,
        session: false,

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // Find the user in the database based on their facebook id
               mysqlConn.getConnection(function(err,conn){
                if(err){
                    console.log('Err in getting mysql conn: '+err);
                    return done(err, false);
                }
                //User exists.
                else if(conn && typeof profile !='undefined'){
                    conn.query('Select * from user where fbId = '+
                      conn.escape(profile.id),
                      function(err, results, fields){
                        if(err){
                            conn.release();
                            return done(err, false); 
                        }
                        if(results && results.length > 0){
                            conn.release();
                            return done(null,results[0]);
                        }
                        else {
                            // New user login through FB. Save in DB.
                            var userData = {fbId:profile.id, 
                                            firstname: profile.displayName,
                                            username:profile.emails[0].value}
                           
                            conn.query('insert into user set ?',userData, 
                              function(err, results, fields){
                                if(err){
                                    conn.release();
                                    return done(err,false);
                                }
                                else{
                                    conn.query('Select * from user where id='
                                      +results.insertId, 
                                      function(err,res,fields){
                                        if(err){
                                            return done(err,false);
                                        }
                                        else{
                                            return done(null,res[0]);        
                                        }
                                    });
                                }
                            });
                         } 
                    });
                }
                else{
                    var err = new Error('Facebook Profile not found');
                    return done(err,false);
                }
            });
        });
    }));

	passport.serializeUser(function(user,done){
		if(user){
            done(null,user.id);
		}
	});

    passport.deserializeUser(function(id,done){
        mysqlConn.getConnection(function(err,conn){
            if(conn){
                conn.query('Select * from user where id = '
                  +conn.escape(id), 
                  function(err, results, fields){
                    if(err){
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

