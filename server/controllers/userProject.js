var mysqlConn = require('../config/mysqlConn');
var async = require('async');
var userProjects = {};

function getResult(conn,quizIds,cb){
	var resultData = [];
	var qry_qz_result = 'select r.* from cust_quiz q, cust_quiz_result r '+
									 'where q.quizId = r.quizId and q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz_result,nestTables: true};

	conn.query(options, function(err, resultInfo, fields){
		if(err){
			console.log('Error in fetching result for quiz '+err);
			conn.release();
			cb(err,null)
		}
		else if(resultInfo.length>0){
			for(var i =0; i<resultInfo.length;i++){
				resultData.push(resultInfo[i].r);
			}
		}
		cb(null,resultData);
	});
}

function getRooms(conn,quizIds,cb){
	var roomData = [];
	var qry_qz_room = 'select r.* from cust_quiz q, cust_room_selection r '+
									 'where q.quizId = r.quizId and q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz_room,nestTables: true};

	conn.query(options, function(err, roomInfo, fields){
		if(err){
			console.log('Error in fetching rooms for quiz '+err);
			conn.release();
			cb(err,null)
		}
		else if(roomInfo.length>0){
			for(var i =0; i<roomInfo.length;i++){
				roomData.push(roomInfo[i].r);
			}
		}
		cb(null,roomData);
	});
}


function getPackage(conn,quizIds,cb){
	var pkgData = [];
	var qry_qz_pkg = 'select * from cust_quiz q left outer join cust_pkg_info p on q.quizId = p.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_qz_pkg,nestTables: true};

	conn.query(options, function(err, pkgInfo, fields){
		if(err){
			console.log('Error in fetching pkgs for quiz '+err);
			conn.release();
			cb(err,null);
		}
		else if(pkgInfo.length>0){
			for(var i =0; i<pkgInfo.length;i++){
				if(pkgInfo[i].p.id!=null){
					pkgData.push(pkgInfo[i].p);
				}
			}
		}
		cb(null,pkgData);
	});
}

function getAppt(conn,quizIds,cb){
	var apptData = [];
	var qry_qz_appt = 'select a.* from cust_quiz q left outer join cust_appointment a on q.quizId = a.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz_appt,nestTables: true};

	conn.query(options, function(err, apptInfo, fields){
		if(err){
			console.log('Error in fetching pkgs for quiz '+err);
			conn.release();
			cb(err,null);
		}
		else if(apptInfo.length>0){
			for(var i =0; i<apptInfo.length;i++){
				if(apptInfo[i].a.id!=null){
					apptData.push(apptInfo[i].a);
				}
			}
		}
		cb(null,apptData);
	});
}


function getFirstLook(conn,quizIds,cb){
	var flookData = [];
	var qry_qz_flook = 'select f.* from cust_quiz q left outer join first_look f on q.quizId = f.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_qz_flook,nestTables: true};
        			
	conn.query(options, function(err, flookInfo, fields){
		if(err){
			console.log('Error in fetching first look for quiz '+err);
			conn.release();
			cb(err,null);
		}
		// console.log(flookInfo);
		else if(flookInfo.length>0){
			for(var i =0; i<flookInfo.length;i++){
				if(flookInfo[i].f.id!=null){
					flookData.push(flookInfo[i].f);
				}
			}
		}
		cb(null,flookData);
	});
}        		

function getFeedback(conn, flookData,cb){
	
	var flookFeedData = [];
	if(flookData!=null && flookData.length>0){
		console.log('flookData is: ');
		console.log(flookData);
		var flookIdArr = [];
		for(var i =0;i<flookData.length;i++){
			flookIdArr.push(flookData[i].id);
		}

		var qry_fl_feed = 'select * from first_look f left outer join first_look_feedback ff on f.id = ff.firstLook_id '+ 
									 'where f.id in ('+flookIdArr.join()+')';
		var options = {sql:qry_fl_feed,nestTables: true};
		conn.query(options, function(err, flookFeedInfo, fields){
			if(err){
				console.log('Error in fetching first look feedback for quiz '+err);
				conn.release();
				cb(err,null);
			}
			// console.log(flookFeedInfo);
			else if(flookFeedInfo.length>0){
				for(var i =0; i<flookFeedInfo.length;i++){
					if(flookFeedInfo[i].ff.id!=null){
						flookFeedData.push(flookFeedInfo[i].ff);
					}
				}
			}
			cb(null,flookFeedData)
		});
	}
	else{
		cb(null,flookFeedData);
	}
}



exports.getCustProjectInfo = function(req,res,next){	
	var customerId = req.user.id;
	var quizId;
	var status;
	var userData = [];
	var quizData = [];
	var styleData = [];
	var pkgData = [];
	var roomData = [];
	var apptData = [];
	var flookData = [];
	var flookFeedData = [];

	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
        	var qry_usr_qz = 'Select * from user, cust_quiz where user.id = cust_quiz.customerId and user.id='+conn.escape(customerId)+' order by cust_quiz.quizId desc';
        	var options = {sql:qry_usr_qz,nestTables: true};

    		conn.query(options, function(err, userQuiz, fields){
				if(err){
					console.log('Error in fetching user projects '+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				else{
					if(userQuiz.length>0){
						userData.push(userQuiz[0].user);
						userProjects.userData = userData;
						
						for(var i =0; i<userQuiz.length;i++){
							quizData.push(userQuiz[i].cust_quiz);
						}
						// console.log('quizData is: ');
						// console.log(quizData);
					}

					if(quizData.length>0){
						userProjects.quizData = quizData;
						var quizIdArr = [];
						var quizIds;
						for(var i =0; i<quizData.length;i++){
							quizIdArr.push(quizData[i].quizId);
						}
						quizIds = quizIdArr.join();

						
						// async.apply(getRooms,conn,quizIds);

						async.parallel([
							async.apply(getResult,conn,quizIds),
						    async.apply(getRooms,conn,quizIds),
							async.apply(getPackage,conn,quizIds),
							async.apply(getAppt,conn,quizIds)
						], function (err, result) {
						     //This code will be executed after all previous queries are done (the order doesn't matter).
						     //For example you can do another query that depends of the result of all the previous queries.
						     if(err){
						     	conn.release();
						     	console.log(err);
						     	res.send({success: false, reason:err.toString()});
						     }
						     // console.log('Final Prll');
						     // console.log(result);
						     
				                userProjects.resultData = result[0];
				                userProjects.roomData = result[1];
				                userProjects.pkgData = result[2];
				                userProjects.apptData = result[3];
				            

						});

						async.waterfall([
	    					async.apply(getFirstLook,conn,quizIds),
							async.apply(getFeedback,conn)
						], function (err, result) {
						   // result now equals 'done' 
						   if(err){
						   	conn.release();
						   	console.log(err);
						   	res.send({success: false, reason:err.toString()});
						   }
						   
						   // console.log('Final series');
						   // console.log(result);
						   if(result.length>=0)
				           	userProjects.firstLookData = result[0];
				           else
				           	userProjects.firstLookData = [];
				           if(result.length>0){
				           	userProjects.feedbackData = result[1];
				           }
				           else{
				           	userProjects.feedbackData = [];
				           }
				           // console.log(userProjects);
				            conn.release();
				            res.send({'success':true,'results':userProjects});
						});

					} // if quizData.length >0 ends.
				}

			});
	
		} //if(conn) ends
	}); 
}

/*


exports.getFirstLook = function(req,res,next){
	FirstLook.where({quizId:quizId,roomName:roomName}).fetchAll().then(function(firstLooks){
  					if(firstLooks.models.length>0){
  						for(var f = 0;f<firstLooks.models.length;f++){
  							firstLookArr.push(firstLooks.models[f].attributes);
  						}
  					}
  					res.send({success:true,result:firstLookArr});
  				}).catch(function(err){
  					console.log('Error in fetching first look');
  					console.log(err);
  					res.send({success:false});
  				});
}
*/
exports.saveAppointment = function(req,res,next){
	var apptData = req.body.data;

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	var qry_usr_appt = 'Select * from cust_appointment where quizId='+conn.escape(apptData.quizId);
        	var options = {sql:qry_usr_appt,nestTables: true};

    		conn.query(options, function(err, userAppt, fields){
				if(err){
					console.log('Error in fetching user apptInfo '+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				if(userAppt.length>0){
					console.log('userAppt is: ');
					console.log(userAppt);
					var apptId = userAppt[0].cust_appointment.id;
					var usrApptUpdData =[
									apptData.apptDate,
								   	apptData.apptTime,
								   	apptData.person,
								   	apptData.contact,
								   	apptData.address,
								   	apptData.floorPlanStatus,
								   	apptData.floorPlanLoc,
								   	apptData.apptStatus,
								   	apptData.quizId
									];

					var qry_upd_appt = 'update cust_appointment set apptDate = ?, apptTime=?,'+
									 'contactPerson=?, contact=?, address=?,floorPlanStatus=?,'+
									 'floorPlanLoc=?, apptStatus=? where quizId=?';
        			
					conn.query(qry_upd_appt,usrApptUpdData, function(err, result, rows, fields) {
						if(err){
							console.log('Error in updating user apptInfo '+err);
							conn.release();
							res.send({success: false, reason:err.toString()});
						}
						else{
	    					console.log("Record Updated!!");
	    					console.log(result);
	    					res.send({success: true});
    					}
					});
				}
				else{
					console.log("No data in user Appt");
					
					//Add data
					var usrApptData = {
									quizId:apptData.quizId,
								   	roomName:'',
								   	apptDate:apptData.apptDate,
								   	apptTime: apptData.apptTime,
								   	contactPerson: apptData.person,
								   	contact: apptData.contact,
								   	address:apptData.address,
								   	floorPlanStatus: apptData.floorPlanStatus,
								   	floorPlanLoc: apptData.floorPlanLoc,
								   	apptStatus: apptData.apptStatus
									};
					conn.query('insert into cust_appointment set ?', usrApptData, function(err, results, fields){
						if(err){
							console.log('Error in inserting user apptInfo '+err);
							conn.release();
							res.send({success: false, reason:err.toString()});
						}
						else{
							res.send({success:true});	
						}
					
					});
				}
			});
    	}
    });
}
/*
exports.getProjectListing = function(req,res,next){

var pendingProjects = [];

User.fetchAll({ withRelated: 
					[{'quiz': function(qb) {
            					qb.where('status','>=',0);
        						}
    				},
    				{'package': function(qb){
    								qb.where('status','>=',0);
    							}
    				},
    				'result','image','appt','firstLook'

    			]
    		}).then(function(usrProjects){
					// console.log('In getProjectListing, usrProjects is: ');
 				// 	console.log(usrProjects);
 					if(usrProjects.models.length>0){
 						for(var i =0; i<usrProjects.models.length; i++){
 							var userData = usrProjects.models[i].attributes;
 							var relatedQuiz = usrProjects.models[i].related('quiz');
 							var relatedPackage = usrProjects.models[i].related('package');
 							var relatedResult = usrProjects.models[i].related('result');
 							var relatedImages = usrProjects.models[i].related('image');
 							var relatedAppt = usrProjects.models[i].related('appt');
 							var relatedFirstLook = usrProjects.models[i].related('firstLook');

 							var custQuizInfo = [];
 							var custPkgInfo = [];
 							var quizResultInfo = [];
 							var quizImageInfo = [];
 							var apptInfo = [];
 							var firstLookInfo = [];

 							console.log('Printing relatedFirstLook model: '+i);
 							console.log(relatedFirstLook.models.length);
 							// console.log(relatedFirstLook.models[0].attributes);
 							// console.log(relatedFirstLook.models.attributes);
 							
 							// console.log(relatedQuiz.models.length);
 							// console.log(relatedQuiz.models.attributes);

 							// console.log('relatedPackage is: ');
 							// console.log(relatedPackage.models.length);
 							// console.log(relatedPackage.models.attributes);
							
							var custInfoObj = { customerId: userData.id,
												name: userData.firstname,
												email: userData.username,
												address: userData.address,
												phone: userData.phone
											  };


 							if(relatedQuiz.models.length>0){
 								for(var j = 0;j<relatedQuiz.models.length;j++){
					 				var custQuizData = relatedQuiz.models[j].attributes;					
 									custQuizInfo.push(custQuizData);
 								}
 							}

 							if(relatedPackage.models.length>0){
 								for(var j = 0;j<relatedPackage.models.length;j++){
					 				var custPkgData = relatedPackage.models[j].attributes;					
 									custPkgInfo.push(custPkgData);
 								}
 							}

							if(relatedResult.models.length>0){
 								for(var j = 0;j<relatedResult.models.length;j++){
					 				var quizResultData = relatedResult.models[j].attributes;					
 									quizResultInfo.push(quizResultData);
 								}
 							}
 							if(relatedImages.models.length>0){
 								for(var j = 0;j<relatedImages.models.length;j++){
					 				var quizImageData = relatedImages.models[j].attributes;					
 									quizImageInfo.push(quizImageData);
 								}
 							}
 							if(relatedAppt.models.length>0){
 								for(var j = 0;j<relatedAppt.models.length;j++){
					 				var apptData = relatedAppt.models[j].attributes;					
 									apptInfo.push(apptData);
 								}
 							}

 							if(relatedFirstLook.models.length>0){
 								for(var j = 0;j<relatedFirstLook.models.length;j++){
					 				var firstLookData = relatedFirstLook.models[j].attributes;					
 									firstLookInfo.push(firstLookData);
 								}
 							}

 							

 							pendingProjects.push({'custInfo':custInfoObj,'quizInfo':custQuizInfo, 'quizImageInfo': quizImageInfo, 'resultInfo': quizResultInfo, 'pkgInfo': custPkgInfo, 'apptInfo':apptInfo,'firstLookInfo':firstLookInfo});
 							// console.log('Printing user model: '+i);
 							// console.log(usrProjects.models[i]);
 							// console.log('userData is: ');
 							// console.log(userData);

 							

 							

 							// console.log('At iteration : '+i+' pendingProjects is:');
 							// console.log(pendingProjects);
 						}
 						res.send({success:true,result:pendingProjects});		
 					}
 					else{
 						res.send({success:false,reason:'No pending Projects exist'});		
 					}
 					
			}).catch(function(err){
				console.log('Error in fetching all customer projects.')
				console.log(err);
				res.send({success:false,reason:err.toString()});
			});


}

exports.saveFirstLook = function(req,res,next){
	var data = req.body.data;
	FirstLook.forge(data).save().then(function(response){
						res.send({success:true, result: response});

					}).catch(function(err){
						console.log('Error in creating new record in first_look: '+err);
						res.send({success:false,reason:err.toString()});
					});
}	


exports.submitFeedack = function(req,res,next){
	var data = req.body.data;
	var id = req.body.id;
	FirstLookFeedback.forge(data).save().then(function(response){
		console.log(response);
		console.log(response.attributes.id);
		FirstLook.where({id:id}).save({'feedback_id':response.attributes.id},{patch:true}).then(function(firstLookData){
						console.log('First Look Data edited successfully');
						res.send({success:true, result: response});
					});


						// res.send({success:true, result: response});

					}).catch(function(err){
						console.log('Error in creating new record in first_look: '+err);
						res.send({success:false,reason:err.toString()});
					});
}


*/

