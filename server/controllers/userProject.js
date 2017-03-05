var mysqlConn = require('../config/mysqlConn');
var async = require('async');
var userProjects = {};
var projectList = [];

function getUser(conn,userId,cb){
	var userData = [];
	var qry_user = 'select u.username,u.firstname from user u where u.id='+userId;
	var options = {sql:qry_user,nestTables: true};

	conn.query(options, function(err, userInfo, fields){
		if(err){
			console.log('Error in fetching userInfo in getQuiz'+err);
			conn.release();
			cb(err,null)
		}
		else if(userInfo.length>0){
			for(var i =0; i<userInfo.length;i++){
				userData.push(userInfo[i].u);
			}
		}
		cb(null,userData);
	});
}

function getQuiz(conn,quizIds,cb){
	var quizData = [];
	var qry_qz = 'select q.* from cust_quiz q where q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz,nestTables: true};

	conn.query(options, function(err, quizInfo, fields){
		if(err){
			console.log('Error in fetching quiz info in getQuiz'+err);
			conn.release();
			cb(err,null)
		}
		else if(quizInfo.length>0){
			for(var i =0; i<quizInfo.length;i++){
				quizData.push(quizInfo[i].q);
			}
		}
		cb(null,quizData);
	});
}


function getCustQuizDtls(conn,quizIds,cb){
	var quizData = [];
	var qry_qz = 'select q.* from cust_quiz_detail q where q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz,nestTables: true};

	conn.query(options, function(err, quizInfo, fields){
		if(err){
			console.log('Error in fetching quiz info in getQuiz'+err);
			conn.release();
			cb(err,null)
		}
		else if(quizInfo.length>0){
			for(var i =0; i<quizInfo.length;i++){
				quizData.push(quizInfo[i].q);
			}
		}
		cb(null,quizData);
	});
}

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

function getImages(conn,quizIds,cb){
	var imgData = [];
	var qry_qz_img = 'select i.*,qi.imageLocation from cust_quiz q, cust_img_selection i, quiz_images qi '+
    ' where q.quizId = i.quizId and i.selectedImgId = qi.imageId and i.questionId = qi.questionId '+
    ' and q.quizId in ('+quizIds+') order by quizId desc, questionId asc';


	var options = {sql:qry_qz_img,nestTables: true};

	conn.query(options, function(err, imgInfo, fields){
		if(err){
			console.log('Error in fetching images for quiz '+err);
			conn.release();
			cb(err,null)
		}
		else if(imgInfo.length>0){
			console.log(imgInfo);
			for(var i =0; i<imgInfo.length;i++){
				imgData.push(imgInfo[i]);
			}
		}
		cb(null,imgData);
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

function getPackageTxn(conn,quizIds,cb){
	var paymentData = [];
	var qry_qz_payment = 'select * from cust_quiz q left outer join cust_payment_txn p on q.quizId = p.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_qz_payment,nestTables: true};

	conn.query(options, function(err, txnInfo, fields){
		if(err){
			console.log('Error in fetching paymentData for quiz '+err);
			conn.release();
			cb(err,null);
		}
		else if(txnInfo.length>0){
			for(var i =0; i<txnInfo.length;i++){
				if(txnInfo[i].p.id!=null){
					paymentData.push(txnInfo[i].p);
				}
			}
		}
		cb(null,paymentData);
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
function getShoppingList(conn,quizIds,cb){
	var shoppingList = [];
	var qry_shopping_list= 'select f.* from cust_quiz q left outer join shopping_list f on q.quizId = f.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_shopping_list,nestTables: true};
        			
	conn.query(options, function(err, shoppingListInfo, fields){
		if(err){
			console.log('Error in fetching shopping list for quiz '+err);
			conn.release();
			cb(err,null);
		}
		// console.log(flookInfo);
		else if(shoppingListInfo.length>0){
			for(var i =0; i<shoppingListInfo.length;i++){
				if(shoppingListInfo[i].f.id!=null){
					shoppingList.push(shoppingListInfo[i].f);
				}
			}
		}
		cb(null,shoppingList);
	});
}  
function getFinalLook(conn,quizIds,cb){
	var finalLookData = [];
	var qry_final_look= 'select f.* from cust_quiz q left outer join final_look f on q.quizId = f.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_final_look,nestTables: true};
        			
	conn.query(options, function(err, finalLook, fields){
		if(err){
			console.log('Error in fetching final look for quiz '+err);
			conn.release();
			cb(err,null);
		}
		// console.log(flookInfo);
		else if(finalLook.length>0){
			for(var i =0; i<finalLook.length;i++){
				if(finalLook[i].f.id!=null){
					finalLookData.push(finalLook[i].f);
				}
			}
		}
		getFnlLookFdbk(conn,finalLookData,function(err,result){
			cb(null, result);
		});
		//cb(null,finalLookData);
	});
}  

function getFnlLookFdbk(conn, finalLookData,cb){
	
	var flookFeedData = [];
	if(finalLookData!=null && finalLookData.length>0){
		console.log('finalLookData is: ');
		console.log(finalLookData);
		var flookIdArr = [];
		for(var i =0;i<finalLookData.length;i++){
			flookIdArr.push(finalLookData[i].id);
		}

		var qry_fl_feed = 'select ff.* from final_look f left outer join final_look_feedback ff on f.id = ff.concept_id '+ 
									 'where f.id in ('+flookIdArr.join()+')';
		var options = {sql:qry_fl_feed,nestTables: true};
		conn.query(options, function(err, flookFeedInfo, fields){
			console.log('flookFeedInfo is: ');
			console.log(flookFeedInfo);
			console.log(flookFeedInfo.length);
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
				for(var i=0;i<finalLookData.length;i++){
					var feedbackArr = [];
					for(var j =0; j<flookFeedData.length;j++){
						if(flookFeedData[j].concept_id===finalLookData[i].id){
							feedbackArr.push(flookFeedData[j]); 
						}
					}
					finalLookData[i].feedbackData = feedbackArr;
				}
				cb(null,finalLookData);	
			}
			else{
				cb(null,finalLookData);
			}
		});
	}
	else{
		cb(null,flookFeedData);
	}
}


function getConceptBoard(conn,quizIds,cb){
	var cncptBrdData = [];
	var qry_qz_cncpt= 'select f.* from cust_quiz q left outer join concept_board f on q.quizId = f.quizId '+ 
									 'where q.quizId in ('+quizIds+')';
    var options = {sql:qry_qz_cncpt,nestTables: true};
        			
	conn.query(options, function(err, cncptInfo, fields){
		if(err){
			console.log('Error in fetching first look for quiz '+err);
			conn.release();
			cb(err,null);
		}
		// console.log(flookInfo);
		else if(cncptInfo.length>0){
			for(var i =0; i<cncptInfo.length;i++){
				if(cncptInfo[i].f.id!=null){
					cncptBrdData.push(cncptInfo[i].f);
				}
			}
		}
		getFeedback(conn,cncptBrdData,function(err,result){
			cb(null, result);
		});
		//cb(null,cncptBrdData);
	});
}        		

function getFeedback(conn, cncptBrdData,cb){
	
	var flookFeedData = [];
	if(cncptBrdData!=null && cncptBrdData.length>0){
		console.log('cncptBrdData is: ');
		console.log(cncptBrdData);
		var flookIdArr = [];
		for(var i =0;i<cncptBrdData.length;i++){
			flookIdArr.push(cncptBrdData[i].id);
		}

		var qry_fl_feed = 'select ff.* from concept_board f left outer join concept_board_feedback ff on f.id = ff.concept_id '+ 
									 'where f.id in ('+flookIdArr.join()+')';
		var options = {sql:qry_fl_feed,nestTables: true};
		conn.query(options, function(err, flookFeedInfo, fields){
			console.log('flookFeedInfo is: ');
			console.log(flookFeedInfo);
			console.log(flookFeedInfo.length);
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
				for(var i=0;i<cncptBrdData.length;i++){
					var feedbackArr = [];
					for(var j =0; j<flookFeedData.length;j++){
						if(flookFeedData[j].concept_id===cncptBrdData[i].id){
							feedbackArr.push(flookFeedData[j]); 
						}
					}
					cncptBrdData[i].feedbackData = feedbackArr;
				}
				cb(null,cncptBrdData);	
			}
			else{
				cb(null,cncptBrdData);
			}
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
        	var qry_usr_qz = 'Select  user.id, user.username, user.firstname, cust_quiz.* from user, cust_quiz where user.id = cust_quiz.customerId and user.id='+conn.escape(customerId)+' order by cust_quiz.quizId desc';
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
							async.apply(getAppt,conn,quizIds),
							async.apply(getConceptBoard,conn,quizIds),
							async.apply(getFinalLook,conn,quizIds),
							async.apply(getShoppingList,conn,quizIds),
							async.apply(getPackageTxn,conn,quizIds)
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
			                userProjects.firstLookData = result[4];
			                userProjects.finalLookData = result[5];
			                userProjects.shoppingListData = result[6];
			                userProjects.paymentData = result[7];
			                conn.release();
			                res.send({'success':true,'results':userProjects});
						});

						/*async.waterfall([
	    					async.apply(getConceptBoard,conn,quizIds),
							async.apply(getFeedback,conn)
						], function (err, result) {
						   
						   	if(err){
						   		conn.release();
						   		console.log(err);
						   		res.send({success: false, reason:err.toString()});
							}
						   
						    console.log('Final series');
						    console.log(result);
							if(result.length>=0)
				        		userProjects.firstLookData = result;
				           	else
				           		userProjects.firstLookData = [];
				           	// if(result.length>0){
				           	// 	userProjects.feedbackData = result[1];
				           	// }
				           	// else{
				           	// 	userProjects.feedbackData = [];
				           	// }
				            console.log(userProjects);
				            conn.release();
				            res.send({'success':true,'results':userProjects});
						});*/

					} // if quizData.length >0 ends.
				}

			});
	
		} //if(conn) ends
	}); 
}

exports.getProjectListing = function(req,res,next){
	
	if(projectList.length>0){projectList.length=0;}
	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
        	
        	var qry_usr_qz = 'SELECT user.id,GROUP_CONCAT(cust_quiz.quizId) as quizId'+
        					 ' FROM user, cust_quiz WHERE user.id = cust_quiz.customerId '+
							 ' GROUP BY user.id order by user.id desc';

    		conn.query(qry_usr_qz, function(err, projects, fields){
				if(err){
					console.log('Error in fetching projects for admin view'+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				else{

					if(projects.length>0){
						

						async.each(projects,function(project, callback){
							
						    // Call an asynchronous function, often a save() to DB
						    var quizIds = project.quizId;
						    //item.someAsyncCall(function (){

						    async.parallel([
								async.apply(getResult,conn,quizIds),
							    async.apply(getRooms,conn,quizIds),
								async.apply(getPackage,conn,quizIds),
								async.apply(getAppt,conn,quizIds),
								async.apply(getImages,conn,quizIds),
								async.apply(getQuiz,conn,quizIds),
								async.apply(getUser,conn,project.id),
								async.apply(getConceptBoard,conn,quizIds),
								async.apply(getFinalLook,conn,quizIds),
								async.apply(getShoppingList,conn,quizIds),
								async.apply(getPackageTxn,conn,quizIds),
								async.apply(getCustQuizDtls,conn,quizIds)

							], function (err, result) {
							    if(err){
							     	conn.release();
							     	console.log(err);
							     	res.send({success: false, reason:err.toString()});
							    }
							    console.log('Final Admin Prll: ');
							    console.log(project);
							    //console.log(result);
							     
				                projectList.push({'resultData':result[0],
				                'roomData': result[1],
				                'pkgData': result[2],
				                'apptData': result[3],
				                'imgData': result[4],
				                'quizData': result[5],
				                'userData': result[6],
				                'conceptData': result[7],
				            	'finalLookData': result[8],
				            	'shoppingList':result[9],
				            	'paymentData': result[10],
				            	'quizDtls':result[11]});
				                 callback();
							});
						},
						function(err){
						    // All tasks are done now
						   console.log(projectList);
				           res.send({'success':true,'results':projectList});
						}); //async.each

					}
				}
			});
    	}
   	}); //getConnection
}

exports.getCncptFeedback = function(req,res,next){
	var projectData = req.data.projectData;

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
			
        if(conn){
        	
        	for(var i =0; i<projectData.length;i++){
        		if(projectData[i].conceptData.length>0){
        			var conceptIdArr = [];
        			for(var j =0;j<projectData[i].conceptData.length;j++){
        				conceptIdArr.push(projectData[i].conceptData.id);
        			}
        			var feedResults = getFeedback(conceptIdArr.join());

        		}
        	}
        }
    });
}
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

exports.modifyUsrAppt = function(req,res,next){
	var data = req.body.data;
	console.log(data);
	var action = data.action;
	var updData =[data.status,new Date(),data.quizId];
	//var updData =[data.status,data.quizId];
	
	var qry_upd_apt;

	if(action===1){

		qry_upd_apt='update cust_appointment set apptStatus = ?, updated_at=? where quizId=?';
	}
	else if(action===2){
		qry_upd_apt='update cust_appointment set floorPlanStatus = ?,updated_at=? where quizId=?';
	}
	console.log(updData);
	console.log(qry_upd_apt);
	mysqlConn.getConnection(function(err,conn){
		if(err){
			console.log('Err in fetching mysql conn');
			res.send({success: false, reason:err.toString()});
		}
		
        if(conn){
        	conn.query(qry_upd_apt,updData, function(err, result, rows, fields) {
				if(err){
					console.log('Error in updating user apptInfo Status'+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				else{
					console.log('apptInfo Status updated successfully');
					conn.release();
					res.send({success: true});
				}
			});
        }
    });
}


exports.saveConceptBoard = function(req,res,next){
	var data = req.body.data; //array of objs
	 
	data.created_at = new Date();
	data.updated_at = new Date();

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	for(var i = 0;i<data.length;i++){
	        	conn.query('insert into concept_board set ?', data[i], function(err, results, fields){
					if(err){
						console.log('Error in inserting concept board data '+err);
						conn.release();
						res.send({success: false, reason:err.toString()});
					}
				});
	        }
	        conn.release();
			res.send({success: true});
    	}
    });
}	

exports.saveFinalLook = function(req,res,next){
	var data = req.body.data;
	
	data.created_at = new Date();
	data.updated_at = new Date();

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	for(var i = 0;i<data.length;i++){
	        	conn.query('insert into final_look set ?', data[i], function(err, results, fields){
					if(err){
						console.log('Error in inserting final_look '+err);
						conn.release();
						res.send({success: false, reason:err.toString()});
					}
					
				});
	        }
	        conn.release();
			res.send({success: true});
    	}
    });
}

exports.saveShoppingList = function(req,res,next){
	var data = req.body.data;
	
	data.created_at = new Date();
	data.updated_at = new Date();

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	for(var i = 0;i<data.length;i++){
	        	conn.query('insert into shopping_list set ?', data[i], function(err, results, fields){
					if(err){
						console.log('Error in inserting final_look '+err);
						conn.release();
						res.send({success: false, reason:err.toString()});
					}
					
				});
	        }
	        conn.release();
			res.send({success: true});
    	}
    });
}

exports.submitFeedback = function(req,res,next){
	var data = req.body.data;
	var concept_type = req.body.concept_type;
	var qry;

	if(concept_type===1){
		qry='insert into concept_board_feedback set ?';
	}
	else if(concept_type===2){
		qry='insert into final_look_feedback set ?';
	}

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	for(var i =0;i<data.length;i++){
        		conn.query(qry, data[i], function(err, results, fields){
					if(err){
						console.log('Error in inserting concept board feedback for filetype: '+concept_type+' Err: '+err);
						conn.release();
						res.send({success: false, reason:err.toString()});
					}
				});
        	}
        }
        conn.release();
		res.send({success: true});
    });
}
	


