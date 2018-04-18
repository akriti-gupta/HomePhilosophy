var mysqlConn = require('../config/mysqlConn'),
	encryption = require('../utilities/encryption');
	

exports.getUsers = function(req,res){
	mysqlConn.getConnection(function(err,conn){
		if(conn){
			conn.query('select * from user', function(err, results, fields){
				conn.release();
				res.send(results);
			});
		}
	});
}


exports.createUser = function(req,res,next){
	var userData = req.body;
	userData.salt = encryption.createSalt();
	userData.password = encryption.hashPswd(req.body.password,userData.salt);
	mysqlConn.getConnection(function(err,conn){
		if(conn){
			conn.query('insert into user set ?', userData, function(err, results, fields){
				if(err){
					if(err.toString().indexOf('ER_DUP_ENTRY')>-1){
						err = new Error('Username exists');
					}
					res.status(400);
					return res.send({reason:err.toString()});
				}
				conn.query('select * from user where id='+conn.escape(results.insertId), 
						function(err, users, fields){
							if(err){return next(err);}
							req.login(users[0],function(err){
								if(err){return next(err);}
								res.send(users[0]);
							});
							conn.release();
						});
			});
		}
	});
} 