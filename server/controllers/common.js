
var mysqlConn = require('../config/mysqlConn'),
	http

exports.postContactDtls = function(req,res,next){
	var data = req.body.data;
	console.log(data);
	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in common.js: '+err);return next(err);}
        if(conn){
        	conn.query('insert into contact_us set ?',data, function(err, results, fields){
				if(err){
					console.log('Error in saving pkg txn data: '+err);
					conn.release();
					return res.send({success:false,reason:err.toString()});
				}
				return res.send({success: true});
			});
        }
    });
}
