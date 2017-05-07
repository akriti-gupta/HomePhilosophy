
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
						addOnAmtPaid:addOnAmtPaid,
						created_at:new Date(),
						updated_at: new Date()

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
		if(err){console.log('Error in getting mysql conn in payment.js: '+err);return next(err);}
        if(conn){
        	var qry;
        	conn.query('select * from cust_pkg_info where quizId ='+quizId, function(err,results,fields){
        		if(err){
					console.log('Error in getting existing payment data: ' +err);
					conn.release();
					res.send({success:false,reason:err.toString()});
				}
				if(results!=null && results.length>0){
					for(var i =0; i<pkgForRoom.length;i++){
						conn.query('update cust_pkg_info set pkgId=?, status=? where quizId=? and roomId=?',
							[pkgForRoom[i].pkgId,status,quizId,pkgForRoom[i].roomId], function(err, results, fields){
								if(err){
									console.log('Error in updating pkg data: ' +err);
									conn.release();
									res.send({success:false,reason:err.toString()});
								}
						});
					}
					conn.query('update cust_payment_txn set updated_at=now(), totalPrice='+totalPrice+
							   ' , addOnAmtPaid = '+addOnAmtPaid+' where quizId='+quizId, function(err, results, fields){
								if(err){
									console.log('Error in updating pkg data: ' +err);
									conn.release();
									res.send({success:false,reason:err.toString()});
								}
						});

					conn.release();
					res.send({success:true});

				}
				else{
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
							conn.release();
							res.send({success:true});
						});

					
					});
				}
        	});
			
		}
	});	
}

exports.getPaymentInfo = function(req,res,next){
	var quizId = req.body.quizId;
	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in paymnet.js: '+err);return next(err);}
        
        if(conn){
        	conn.query('select totalPrice from cust_payment_txn where '+
							'quizId='+conn.escape(quizId), function(err, results, fields){
				if(err){
					console.log('Eror in getting existing payment txn for quiz: '+quizId);
					conn.release();
					return res.send({success:false}); 
				}
				else{
					console.log(results);
					return res.send({success:true,results:results});
				}
				
			});
        }
    });
}

// function updateQuiz(conn,quizId,cb){
// 	var updatedDate = new Date();
// 	var qry_qz = 'update cust_quiz set status = 0, updated_at = now() where quizId='+quizId;
// 	console.log('In updateQuiz, quizId is: '+quizId);

// 	conn.query(qry_qz, function(err, quizInfo, fields){
// 		if(err){
// 			console.log('Eror in updating quiz status for quiz: '+quizId);
// 			cb(err,null);
// 		}
// 		else{
// 			console.log('In updateQuiz, before calling cb');
// 			cb(null,true);
// 		}
// 	});
// }

function updateQuiz(quizId,cb){
	var updatedDate = new Date();
	var quizIdArr =[quizId];
	var qry_qz = 'update cust_quiz set status = 0, updated_at = now() where quizId= ?';
	console.log('In updateQuiz, quizId is: '+quizId);
	mysqlConn.getConnection(function(err,conn){
		if(err){
			console.log('Error in getting mysql conn in paymnet.js: '+err);
			cb(err,null);
		}
        
        else if(conn){
			conn.query(qry_qz,quizIdArr, function(err, quizInfo, fields){
				if(err){
					console.log('Eror in updating quiz status for quiz: '+quizId);
					conn.release();
					cb(err,null);
				}
				else{
					console.log('In updateQuiz, before calling cb');
					conn.release();
					cb(null,true);
				}
			});
		}
	});
}

// function updatePkg(conn,quizId,totalPrice,cb){
// 	var qry_qz = 'update cust_pkg_info set status=0 where quizId ='+quizId
// 	console.log('In updatePkg');
// 	conn.query(qry_qz, function(err, quizInfo, fields){
// 		if(err){
// 			console.log('Eror in updating pkg status for quiz: '+quizId);
// 			cb(err,null);
// 		}
// 		else{
// 			console.log('totalPrice is: '+totalPrice);
// 			updatePkgTxn(conn,quizId,totalPrice,function(err,result){
// 				if(err){
// 					console.log('Eror in updating pkg txn status for quiz: '+quizId);
// 					cb(err,null);
// 				}
// 				else{
// 					cb(null, true);
// 				}
// 			});
// 		}
// 	});
// }

function updatePkg(quizId,totalPrice,cb){
	var quizIdArr = [quizId];
	var qry_qz = 'update cust_pkg_info set status=0 where quizId =?';
	console.log('In updatePkg');
	mysqlConn.getConnection(function(err,conn){
		if(err){
			console.log('Error in getting mysql conn in updatePkg: '+err);
			cb(err,null);
		}
        
        else if(conn){
			conn.query(qry_qz,quizIdArr, function(err, quizInfo, fields){
				conn.release();
				if(err){
					console.log('Eror in updating pkg status for quiz: '+quizId);
					cb(err,null);
				}
				else{
					console.log('totalPrice is: '+totalPrice);
					updatePkgTxn(quizId,totalPrice,function(err,result){
						if(err){
							console.log('Eror in updating pkg txn status for quiz: '+quizId);
							cb(err,null);
						}
						else{
							cb(null, true);
						}
					});
				}
			});
		}
	});
}

function updatePkgTxn(quizId,totalPrice,cb){
	var txnData = [totalPrice,new Date(),quizId];
	var qry_qz = 'update cust_payment_txn set amountPaid =?, updated_at=? where quizId=?';
	console.log('In updatePkgTxn');
	mysqlConn.getConnection(function(err,conn){
		if(err){
			console.log('Error in getting mysql conn in updatePkgTxn: '+err);
			cb(err,null);
		}
		else if(conn){
			conn.query(qry_qz, txnData, function(err, quizInfo, fields){
				console.log('After executing updatePkgTxn query');
				if(err){
					console.log('Error in updating pkg txn for quiz: '+quizId);
					cb(err,null);
				}
				else{
					cb(null,true);
				}
			});
		}	
	});
}

function updateAppt(quizId,customerId,cb){
	//Check if any other active quiz exists for the same customer with a future appointment.
	console.log('In updateAppt');
	var currDate = new Date();
	mysqlConn.getConnection(function(err,conn){
		if(err){
			console.log('Error in getting mysql conn in updateAppt: '+err);
			cb(err,null);
		}

		else if(conn){
			conn.query('select * from cust_quiz q,cust_appointment a where '+
						'q.quizId = a.quizId and q.customerId='+conn.escape(customerId)+
						' and q.status=0 and a.apptStatus=0 and q.quizId!='+quizId, function(err, results, fields){
				if(err){
					console.log('Eror in getting existing cust quizes in updateAppt');
					conn.release();	
					cb(err,null);
				}
				
				else if(results!=null && results.length>0){
					console.log('existing appt results:');
					console.log(results);
					var index;
					for(var i=0;i<results.length;i++){
						if(results[i].apptDate > new Date()){
							index = i;
							break;
						}
					}
					if(index>=0){
						conn.query('select * from cust_pkg_info where status=1 and quizId=?',[quizId],function(err,result,fields){
							if(err){
								console.log('Eror in getting rooms from pkgs');
								conn.release();	
								cb(err,null);
							}
							else if(result && result.length > 0){
								var apptArr = [];
								for(var i = 0;i<result.length;i++){
									var apptData = [
										quizId,
									   	result[i].roomId,
									   	// roomName:'',
									   	results[index].apptDate,
									   	results[index].apptTime,
									   	results[index].person,
									   	results[index].contact,
									   	results[index].address,
									   	results[index].floorPlanStatus,
									   	results[index].floorPlanLoc,
									   	results[index].apptStatus
									];
									apptArr.push(apptData);
								}
								conn.query('insert into cust_appointment(quizId,roomId,apptDate,apptTime,contactPerson,contact,address,floorPlanStatus,floorPlanLoc,apptStatus) values ?', apptArr, function(err, results, fields){
									if(err){
										console.log('Error in inserting new apptInfo '+err);
										conn.release();
										cb(err,null);
									}
									else{
										conn.release();
										cb(null,true);
									}
									
								});
							}
							else cb(null,true);


							
						});
							
						
					}
					else{
						cb(null,true);
					}

				}
				else{
					cb(null,true);
				}
			});
		}
	});	
}

/*function updateAppt(conn,quizId,customerId,cb){
	//Check if any other active quiz exists for the same customer with a future appointment.
	console.log('In updateAppt');
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
					else{
						cb(null,true);
					}
				});
					
				
			}

		}
		else{
			cb(null,true);
		}
	});	
}*/
/*exports.updatePackage = function(req,res,next){
	var quizId = req.body.quizId;
	var status = req.body.status;
	var totalPrice = req.body.totalPrice;
	var customerId = req.body.customerId;

	mysqlConn.getConnection(function(err,conn){
		if(err){console.log('Error in getting mysql conn in paymnet.js: '+err);return next(err);}
        
        if(conn){

        	async.parallel([
        					async.apply(updateQuiz,conn,quizId),
							async.apply(updatePkg,conn,quizId,totalPrice)
						], function (err, result) {
						    if(err){
						    	conn.release();
						     	console.log(err);
						     	return res.send({success: false, reason:err.toString()});
						    }
						    else
						    	{	console.log('In updatePkg, quiz and pkg updated');
						    		updateAppt(conn,quizId, customerId, function(err,result){
								    	if(err){
									    	conn.release();
									     	console.log(err);
									     	res.send({success: false, reason:err.toString()});
									    }	

									     res.send({'success':true});
								    });
						    	}
			               
			});
        }
    });
}*/

exports.updatePackage = function(req,res,next){
	var quizId = req.body.quizId;
	var status = req.body.status;
	var totalPrice = req.body.totalPrice;
	var customerId = req.body.customerId;

	async.parallel([
					async.apply(updateQuiz,quizId),
					async.apply(updatePkg,quizId,totalPrice)
				], function (err, result) {
				    if(err){
				     	console.log(err);
				     	return res.send({success: false, reason:err.toString()});
				    }
				    else
				    	{	console.log('In updatePkg, quiz and pkg updated');
				    		updateAppt(quizId, customerId, function(err,result){
						    	if(err){
							     	console.log(err);
							     	return res.send({success: false, reason:err.toString()});
							    }	

							     else return res.send({'success':true});
						    });
				    	}
	               
	});
}