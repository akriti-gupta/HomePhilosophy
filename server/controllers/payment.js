
var mysqlConn = require('../config/mysqlConn');
var async = require('async');

exports.storePackage = function(req,res,next){


	var customerId = req.body.customerId;
	var quizId = req.body.quizId;
	var totalPrice = req.body.totalPrice;
	var pkgForRoom = req.body.roomPkg;
	var status = req.body.status;
	var isAddOn = req.body.isAddOn;
	var addOnAmtPaid = req.body.addOnAmtPaid;
	
	var userPkgData=[];

	var pkgTxnInfo = {	quizId:quizId,
						totalPrice:totalPrice,
						amountPaid:0,
						addOnAmtPaid:0

	};
	console.log('In storePackage, pkgForRoom is:');
	console.log(pkgForRoom);
	
	if(pkgForRoom!=null){
		for(var i =0; i<pkgForRoom.length;i++){
			var currPkgData = [quizId,pkgForRoom[i].roomId,pkgForRoom[i].roomName,pkgForRoom[i].pkgId,status,isAddOn];
			userPkgData.push(currPkgData);
			console.log('userPkgData is: ');
			console.log(userPkgData);
		} 
	}


	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in paymnet.js: '+err);return next(err);}
        if(conn){
			conn.query('insert into cust_pkg_info'+
						'(quizId,roomId,roomName,pkgId,status,isAddOn) values ?',[userPkgData], 
			function(err, results, fields){
				if(err){
					console.log('Error in saving payment data: ' +err);
					conn.release();
					res.send({success:false,reason:err.toString()});
				}
				console.log('Pkg Info saved');

				conn.query('insert into cust_payment_txn set ?',pkgTxnInfo, function(err, results, fields){
					if(err){
						console.log('Error in saving pkg txn data: '+err);
						conn.release();
						res.send({success:false,reason:err.toString()});
					}
					console.log('Pkg Txn Info saved');
				});

				// conn.query('update cust_quiz set status = 0 where quizId='+quizId, function(err, results, fields){
				// 	if(err){
				// 		conn.release();
				// 		console.log('Eror in updating cust quiz status'+err);
				// 		res.send({success:false, reason: err.toString()});
				// 	}
				// 	console.log('Cust Quiz status updated');
				// 	// conn.release();
				// 	// res.send({success:true});
				// });

				// //Check if any other active quiz exists for the same customer with a future appointment.
				// conn.query('select * from cust_quiz q,cust_appointment a where '+
				// 			'q.quizId = a.quizId and q.customerId='+conn.escape(customerId)+
				// 			' and q.status=0 and q.quizId='+quizId, function(err, results, fields){
				// 	if(err){
				// 		console.log('Eror in getting existing cust quizes');
				// 	}
				// 	console.log(results);
				// 	if(results && results.length>0){
				// 		var oldQzId = results[0].quizId;
				// 		var oldAptDate = results[0].apptDate;
				// 		if(oldAptDate > new Date()){
				// 			var apptData = {
				// 						quizId:quizId,
				// 					   	roomName:'',
				// 					   	apptDate:results[0].apptDate,
				// 					   	apptTime: results[0].apptTime,
				// 					   	contactPerson: results[0].person,
				// 					   	contact: results[0].contact,
				// 					   	address:results[0].address,
				// 					   	floorPlanStatus: results[0].floorPlanStatus,
				// 					   	floorPlanLoc: results[0].floorPlanLoc,
				// 					   	apptStatus: results[0].apptStatus
				// 						};
				// 			conn.query('insert into cust_appointment set ?', apptData, function(err, results, fields){
				// 				if(err){
				// 					console.log('Error in inserting new apptInfo '+err);
				// 					// conn.release();
				// 					// res.send({success: false, reason:err.toString()});
				// 				}
				// 					//res.send({success:true});	
				// 			});
				// 		}
				// 	}
				// });	
				conn.release();
				res.send({success:true});
			});
		}
	});	
}

exports.getPaymentInfo = function(req,res,next){
	var quizId = req.body.quizId;
	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in paymnet.js: '+err);return next(err);}
        
        if(conn){
        	conn.query('select * from cust_payment_txn where '+
							'quizId='+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Eror in getting existing payment txn for quiz: '+quizId);
					}
					console.log(results);
					if(results && results.length>0){
						res.send({success:true,results:results[0].totalPrice});
					}
					else{
						res.send({success:false}); 
					}
				});
        }
    });
}

function updateQuiz(conn,quizId,cb){
	var qry_qz = 'update cust_quiz set status = 0 where quizId='+quizId;

	conn.query(qry_qz, function(err, quizInfo, fields){
		if(err){
			console.log('Eror in updating quiz status for quiz: '+quizId);
			cb(err,null);
		}
		cb(null,true);
	});
}

function updatePkg(conn,quizId,cb){
	var qry_qz = 'update cust_pkg_info set status=0 where quizId ='+quizId

	conn.query(qry_qz, function(err, quizInfo, fields){
		if(err){
			console.log('Eror in updating pkg status for quiz: '+quizId);
			cb(err,null);
		}
		updatePkgTxn(conn,quizId,function(err,result){
			if(err){
				console.log('Eror in updating pkg txn status for quiz: '+quizId);
				cb(err,null);
			}
			cb(null, true);
		});
	});
}

function updatePkgTxn(conn,quizId,cb){
	var qry_qz = 'update cust_payment_txn set amountPaid=0 where quizId ='+quizId

	conn.query(qry_qz, function(err, quizInfo, fields){
		if(err){
			console.log('Eror in updating pkg txn for quiz: '+quizId);
			cb(err,null);
		}
		cb(null,true);
	});
}

function updateAppt(conn,quizId,customerId,cb){
	//Check if any other active quiz exists for the same customer with a future appointment.
	var currDate = new Date();
	conn.query('select * from cust_quiz q,cust_appointment a where '+
				'q.quizId = a.quizId and q.customerId='+conn.escape(customerId)+
				' and q.status=0 and a .apptStatus=0 and q.quizId!='+quizId, function(err, results, fields){
		if(err){
			console.log('Eror in getting existing cust quizes');
			conn.release();	
			cb(err,null);
		}
		console.log(results);
		if(results && results.length>0){
			var index;
			for(var i=0;i<results.length;i++){
				if(results[i].apptDate > new Date()){
					index = i;
					break;
				}
			}
			if(index>=0){
				conn.query('select * from cust_pkg_info where status=1 and quizId= '+quizId,function(err,result,fields){
					if(err){
						console.log('Eror in getting rooms from pkgs');
						conn.release();	
						cb(err,null);
					}
					if(result && result.length > 0){
						
						for(var i = 0;i<result.length;i++){
							var apptData = {
								quizId:quizId,
							   	roomId:result[i].roomId,
							   	roomName:'',
							   	apptDate:results[index].apptDate,
							   	apptTime: results[index].apptTime,
							   	contactPerson: results[index].person,
							   	contact: results[index].contact,
							   	address:results[index].address,
							   	floorPlanStatus: results[index].floorPlanStatus,
							   	floorPlanLoc: results[index].floorPlanLoc,
							   	apptStatus: results[index].apptStatus
							};
							conn.query('insert into cust_appointment set ?', apptData, function(err, results, fields){
								if(err){
									console.log('Error in inserting new apptInfo '+err);
									conn.release();
									cb(err,null);
								}
								
							});
						}
						cb(null,true);


					}
				});
					
				
			}

		}
		cb(null,true);
	});	
}
exports.updatePackage = function(req,res,next){
	var quizId = req.body.quizId;
	var status = req.body.status;
	var customerId = req.body.customerId;

	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in paymnet.js: '+err);return next(err);}
        
        if(conn){

        	async.parallel([
        					async.apply(updateQuiz,conn,quizId),
							async.apply(updatePkg,conn,quizId)
						], function (err, result) {
						    if(err){
						    	conn.release();
						     	console.log(err);
						     	res.send({success: false, reason:err.toString()});
						    }
						    updateAppt(conn,quizId, customerId, function(err,result){
						    	if(err){
							    	conn.release();
							     	console.log(err);
							     	res.send({success: false, reason:err.toString()});
							    }	
							    
							     res.send({'success':true});
						    });
			               
						});



        	/*conn.query('update cust_pkg_info set status=0 where quizId ='+quizId, function(err, results, fields){
					if(err){
						console.log('Eror in getting existing pkg status for quiz: '+quizId);
						res.send({success:false}); 
					}
			});

        	conn.query('update cust_payment_txn set amountPaid=0 where quizId ='+quizId,
				function(err, results, fields){
					if(err){
						console.log('Eror in getting updating payment txn amount for quiz: '+quizId);
						res.send({success:false}); 
					}
			});

			conn.query('update cust_quiz set status = 0 where quizId='+quizId, function(err, results, fields){
					if(err){
						res.send({success:false}); 
					}
					console.log('Cust Quiz status updated');
			});*/


			


        }
    });
}



