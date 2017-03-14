
var mysqlConn = require('../config/mysqlConn');

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
						amountPaid:totalPrice,
						addOnAmtPaid:addOnAmtPaid

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

				conn.query('update cust_quiz set status = 0 where quizId='+quizId, function(err, results, fields){
					if(err){
						conn.release();
						console.log('Eror in updating cust quiz status'+err);
						res.send({success:false, reason: err.toString()});
					}
					console.log('Cust Quiz status updated');
					// conn.release();
					// res.send({success:true});
				});

				//Check if any other active quiz exists for the same customer with a future appointment.
				conn.query('select * from cust_quiz q,cust_appointment a where '+
							'q.quizId = a.quizId and q.customerId='+conn.escape(customerId)+
							' and q.status=0 and q.quizId='+quizId, function(err, results, fields){
					if(err){
						console.log('Eror in getting existing cust quizes');
					}
					console.log(results);
					if(results && results.length>0){
						var oldQzId = results[0].quizId;
						var oldAptDate = results[0].apptDate;
						if(oldAptDate > new Date()){
							var apptData = {
										quizId:quizId,
									   	roomName:'',
									   	apptDate:results[0].apptDate,
									   	apptTime: results[0].apptTime,
									   	contactPerson: results[0].person,
									   	contact: results[0].contact,
									   	address:results[0].address,
									   	floorPlanStatus: results[0].floorPlanStatus,
									   	floorPlanLoc: results[0].floorPlanLoc,
									   	apptStatus: results[0].apptStatus
										};
							conn.query('insert into cust_appointment set ?', apptData, function(err, results, fields){
								if(err){
									console.log('Error in inserting new apptInfo '+err);
									// conn.release();
									// res.send({success: false, reason:err.toString()});
								}
									//res.send({success:true});	
							});
						}
					}
				});	
				conn.release();
				res.send({success:true});
			});
		}
	});	
}



