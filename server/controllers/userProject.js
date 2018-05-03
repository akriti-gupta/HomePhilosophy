var mysqlConn = require('../config/mysqlConn');
var async = require('async');
var userProjects = {};
var projectList = [];

// API to find a username. Input: User ID.
function getUser(conn,userId,cb){
	var userData = [];
	var qry_user = 'select u.username,u.firstname from user u where u.id='+userId;
	var options = {sql:qry_user,nestTables: true};

	conn.query(options, function(err, userInfo, fields){
		if(err){
			console.log('Error in fetching userInfo in getQuiz'+err);
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
//API to return quiz information. Input: Array of quizIDs. 
// Usage: Example - To find quiz information of all quizzes related to a user.
function getQuiz(conn,quizIds,cb){
	var quizData = [];
	var qry_qz = 'select q.* from cust_quiz q where q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz,nestTables: true};

	conn.query(options, function(err, quizInfo, fields){
		if(err){
			cb(err,null);
		}
		else if(quizInfo.length>0){
			for(var i =0; i<quizInfo.length;i++){
				quizData.push(quizInfo[i].q);
			}
		}
		cb(null,quizData);
	});
}

// API to get the detailed survey result for each project. 
// Input : array of quiz Ids.
function getCustQuizDtls(conn,quizIds,cb){
	var quizData = [];
	var qry_qz = 'select q.* from cust_quiz_detail q where q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz,nestTables: true};

	conn.query(options, function(err, quizInfo, fields){
		if(err){
			console.log('Error in fetching quiz info in getQuiz'+err);
			cb(err,null);
		}
		else if(quizInfo.length>0){
			for(var i =0; i<quizInfo.length;i++){
				quizData.push(quizInfo[i].q);
			}
		}
		cb(null,quizData);
	});
}

//API to get the style quiz result of given quiz Ids.
function getResult(conn,quizIds,cb){
	var resultData = [];
	var qry_qz_result = 'select r.* from cust_quiz q, cust_quiz_result r '+
									 'where q.quizId = r.quizId and q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz_result,nestTables: true};

	conn.query(options, function(err, resultInfo, fields){
		if(err){
			console.log('Error in fetching result for quiz '+err);
			cb(err,null);
		}
		else if(resultInfo.length>0){
			for(var i =0; i<resultInfo.length;i++){
				resultData.push(resultInfo[i].r);
			}
		}
		cb(null,resultData);
	});
}

//API to get all the images preferred by the user in the survey.
function getImages(conn,quizIds,cb){
	var imgData = [];
	var qry_qz_img = 'select i.*,qi.imageLocation from cust_quiz q, cust_img_selection i, quiz_images qi '+
    ' where q.quizId = i.quizId and i.selectedImgId = qi.imageId and i.questionId = qi.questionId '+
    ' and q.quizId in ('+quizIds+') order by quizId desc, questionId asc';


	var options = {sql:qry_qz_img,nestTables: true};

	conn.query(options, function(err, imgInfo, fields){
		if(err){
			console.log('Error in fetching images for quiz '+err);
			cb(err,null);
		}
		else if(imgInfo.length>0){
			for(var i =0; i<imgInfo.length;i++){
				imgData.push(imgInfo[i]);
			}
		}
		cb(null,imgData);
	});
}

// API to get the images selected by user from the Image board.
function getPinImages(conn,quizIds,cb){
	var pinImgData = [];
	var qry_qz_img = 'select i.* from cust_quiz q, pin_images i  where q.quizId = i.quizId '+
    ' and q.quizId in ('+quizIds+') order by quizId desc';

	var options = {sql:qry_qz_img,nestTables: true};

	conn.query(options, function(err, imgInfo, fields){
		if(err){
			console.log('Error in fetching pin images for quiz '+err);
			cb(err,null);
		}
		else if(imgInfo.length>0){
			for(var i =0; i<imgInfo.length;i++){
				pinImgData.push(imgInfo[i]);
			}

			// Get comments, if any, for the selected images.
			getPinComments(conn,pinImgData,function(err,result){
				cb(null, result);
			});
		}
		else{
			cb(null,pinImgData);
		}
	});
}

// API to fetch comments for images.
function getPinComments(conn,pinImgData,cb){
	var pinCommentData = [];

	if(pinImgData!=null && pinImgData.length>0){
		var pinImgIdArr = [];
		for(var i =0;i<pinImgData.length;i++){
			pinImgIdArr.push(pinImgData[i].i.id);
		}
		var qry_pin_cmnt = 'select c.* from pin_comments c left outer join pin_images i on c.pin_img_id = i.id '+ 
									 'where c.pin_img_id in ('+pinImgIdArr.join()+')';
		var options = {sql:qry_pin_cmnt,nestTables: true};
		conn.query(options, function(err, commentInfo, fields){
			if(err){
				console.log('Error in fetching comments for pin images '+err);
				conn.release();
				cb(err,null);
			}
			
			else if(commentInfo.length>0){
				for(var i =0; i<commentInfo.length;i++){
					if(commentInfo[i].c.id!=null){
						pinCommentData.push(commentInfo[i].c);
					}
				}
				for(var i=0;i<pinImgData.length;i++){
					var commentArr = [];
					for(var j =0; j<pinCommentData.length;j++){
						if(pinCommentData[j].pin_img_id===pinImgData[i].i.id){
							commentArr.push(pinCommentData[j]); 
						}
					}
					pinImgData[i].commentData = commentArr;
				}
				cb(null,pinImgData);	
			}
			else{
				cb(null,pinImgData);
			}
		});
	}
	else{
		cb(null,pinCommentData);
	}

}

function getRooms(conn,quizIds,cb){
	var roomData = [];
	var qry_qz_room = 'select r.* from cust_quiz q, cust_room_selection r '+
									 'where q.quizId = r.quizId and q.quizId in ('+quizIds+')';
	var options = {sql:qry_qz_room,nestTables: true};

	conn.query(options, function(err, roomInfo, fields){
		if(err){
			console.log('Error in fetching rooms for quiz '+err);
			cb(err,null);
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
    var qry_shopping_list = 'select f.*, r.roomName,r.numRoom from cust_quiz q, shopping_list f,cust_room_selection r'+
					   ' where q.quizId = f.quizId and f.roomId = r.id and q.quizId in('+quizIds+')';
   
    var options = {sql:qry_shopping_list,nestTables: true};
        			
	conn.query(options, function(err, shoppingListInfo, fields){
		if(err){
			console.log('Error in fetching shopping list for quiz '+err);
			cb(err,null);
		}
		else if(shoppingListInfo.length>0){
			for(var i =0; i<shoppingListInfo.length;i++){
				if(shoppingListInfo[i].f.id!=null){
					shoppingList.push({'concept':shoppingListInfo[i].f,'room':shoppingListInfo[i].r});
				}
			}
		}
		cb(null,shoppingList);
	});
}  
function getFinalLook(conn,quizIds,cb){
	var finalLookData = [];
	var qry_final_look = 'select f.*, r.roomName,r.numRoom from cust_quiz q, final_look f,cust_room_selection r'+
					   ' where q.quizId = f.quizId and f.roomId = r.id and q.quizId in('+quizIds+')';
   
    var options = {sql:qry_final_look,nestTables: true};
        			
	conn.query(options, function(err, finalLook, fields){
		if(err){
			console.log('Error in fetching final look for quiz '+err);
			cb(err,null);
		}
		else if(finalLook.length>0){
			for(var i =0; i<finalLook.length;i++){
				if(finalLook[i].f.id!=null){
					finalLookData.push({'concept':finalLook[i].f,'room':finalLook[i].r});
				}
			}
		}
		getFnlLookFdbk(conn,finalLookData,function(err,result){
			cb(null, result);
		});
	});
}  

function getFnlLookFdbk(conn, finalLookData,cb){
	
	var flookFeedData = [];
	if(finalLookData!=null && finalLookData.length>0){
		var flookIdArr = [];
		for(var i =0;i<finalLookData.length;i++){
			flookIdArr.push(finalLookData[i].concept.id);
		}

		var qry_fl_feed = 'select ff.* from final_look f left outer join final_look_feedback ff on f.id = ff.concept_id '+ 
									 'where f.id in ('+flookIdArr.join()+')';
		var options = {sql:qry_fl_feed,nestTables: true};
		conn.query(options, function(err, flookFeedInfo, fields){
			if(err){
				console.log('Error in fetching first look feedback for quiz '+err);
				conn.release();
				cb(err,null);
			}
			else if(flookFeedInfo.length>0){
				for(var i =0; i<flookFeedInfo.length;i++){
					if(flookFeedInfo[i].ff.id!=null){
						flookFeedData.push(flookFeedInfo[i].ff);
					}
				}
				for(var i=0;i<finalLookData.length;i++){
					var feedbackArr = [];
					for(var j =0; j<flookFeedData.length;j++){
						if(flookFeedData[j].concept_id===finalLookData[i].concept.id){
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
	//var qry_qz_cncpt= 'select f.* from cust_quiz q left outer join concept_board f on q.quizId = f.quizId '+ 
	//								 'where q.quizId in ('+quizIds+')';

	var qry_qz_cncpt = 'select f.*, r.roomName,r.numRoom from cust_quiz q, concept_board f,cust_room_selection r'+
					   ' where q.quizId = f.quizId and f.roomId = r.id and q.quizId in('+quizIds+')';
    var options = {sql:qry_qz_cncpt,nestTables: true};
        			
	conn.query(options, function(err, cncptInfo, fields){
		if(err){
			console.log('Error in fetching first look for quiz '+err);
			conn.release();
			cb(err,null);
		}
		
		else if(cncptInfo.length>0){
			for(var i =0; i<cncptInfo.length;i++){
				if(cncptInfo[i].f.id!=null){
					cncptBrdData.push({'concept':cncptInfo[i].f,'room':cncptInfo[i].r});
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
		var flookIdArr = [];
		for(var i =0;i<cncptBrdData.length;i++){
			flookIdArr.push(cncptBrdData[i].concept.id);
		}
		var qry_fl_feed = 'select ff.* from concept_board f left outer join concept_board_feedback ff on f.id = ff.concept_id '+ 
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
				for(var i=0;i<cncptBrdData.length;i++){
					var feedbackArr = [];
					for(var j =0; j<flookFeedData.length;j++){
						if(flookFeedData[j].concept_id===cncptBrdData[i].concept.id){
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
					}

					if(quizData.length>0){
						userProjects.quizData = quizData;
						var quizIdArr = [];
						var quizIds;
						for(var i =0; i<quizData.length;i++){
							quizIdArr.push(quizData[i].quizId);
						}
						quizIds = quizIdArr.join();
						
						async.parallel([
							async.apply(getResult,conn,quizIds),
						    async.apply(getRooms,conn,quizIds),
							async.apply(getPackage,conn,quizIds),
							async.apply(getAppt,conn,quizIds),
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
						  
							userProjects.resultData = result[0];
			                userProjects.roomData = result[1];
			                userProjects.pkgData = result[2];
			                userProjects.apptData = result[3];
			                userProjects.firstLookData = result[4];
			                userProjects.finalLookData = result[5];
			                userProjects.shoppingListData = result[6];
			                userProjects.paymentData = result[7];
			                userProjects.quizDetailData = result[8];
			                conn.release();
			                res.send({'success':true,'results':userProjects});
						});
					} // if quizData.length >0 ends.
				}

			});
	
		} //if(conn) ends
	}); 
}

exports.getProjectListing = function(req,res,next){
	
	var status = req.params.status;

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	var qry_usr_qz = 'SELECT u.id, u.username,u.email, u.firstname,u.address, u.phone,q.* FROM user u, cust_quiz q WHERE u.id=q.customerId and q.status='+status+ ' order by quizId desc';
        	var options = {sql:qry_usr_qz,nestTables: true};

    		conn.query(options, function(err, projects, fields){
				if(err){
					console.log('Error in fetching projects for admin view'+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				else{
					conn.release();
					res.send({success: true, results:projects});
				}
			});
    	}
   	}); 
}



exports.getUserQuizCount = function(req,res,next){
	
	if(projectList.length>0){projectList.length=0;}
	//var quizStatus = req.data.status;
	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
        	
        	var qry_usr_qz = 'SELECT * FROM cust_quiz WHERE status=0 order by quizId desc';

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
						    var quizId = project.quizId;

						    async.parallel([
								async.apply(getResult,conn,quizId),
							    async.apply(getRooms,conn,quizId),
								async.apply(getPackage,conn,quizId),
								async.apply(getAppt,conn,quizId),
								async.apply(getImages,conn,quizId),
								async.apply(getQuiz,conn,quizId),
								async.apply(getUser,conn,project.customerId),
								async.apply(getConceptBoard,conn,quizId),
								async.apply(getFinalLook,conn,quizId),
								async.apply(getShoppingList,conn,quizId),
								async.apply(getPackageTxn,conn,quizId),
								async.apply(getCustQuizDtls,conn,quizId),
								async.apply(getPinImages,conn,quizId)

							], function (err, result) {
							    if(err){
							     	conn.release();
							     	console.log(err);
							     	res.send({success: false, reason:err.toString()});
							    }
							    console.log('Final Admin Prll: ');
							    console.log(project);

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
				            	'quizDtls':result[11],
				            	'pinImages':result[12]});
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
	var prevFP = false;
	var prevAppt = false;
	var updFPID = -1;
	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	var qry_usr_appt;
			
			qry_usr_appt = 'Select * from cust_appointment where quizId='+conn.escape(apptData.quizId);
        	var options = {sql:qry_usr_appt,nestTables: true};

    		conn.query(options, function(err, userAppt, fields){
				if(err){
					console.log('Error in fetching user apptInfo '+err);
					conn.release();
					res.send({success: false, reason:err.toString()});
				}
				if(userAppt.length>0){
					var apptId;
					if(apptData.roomId!=null){
						//Floor plan is uploaded now
						for(var i=0;i<userAppt.length;i++){
							//Check if Appt is scheduled previously or Floor plan is uploaded
							if(userAppt[i].cust_appointment.roomId!=null && userAppt[i].cust_appointment.roomId === apptData.roomId){
								updFPID = userAppt[i].cust_appointment.id;
								prevFP = true;
								break;
							}
						}
						//FloorPlan not found, i.e., appt scheduled previously
						if(!prevFP){
							updFPID = userAppt[0].cust_appointment.id;	
						}
					}
					else{
						updFPID = userAppt[0].cust_appointment.id;	
					}
					if(updFPID === -1){
						//Making an appointment now
						var qry_del_exst_recs = 'delete from cust_appointment where quizId=?';

						conn.query(qry_del_exst_recs,apptData.quizId, function(err, result, rows, fields) {
							if(err){
								console.log('Error in deleting user apptInfo '+err);
								conn.release();
								return res.send({success: false, reason:err.toString()});
							}
							else{
		    					var usrApptData = {
									quizId:apptData.quizId,
									roomId:apptData.roomId,
								   	roomName:'',
								   	apptDate:apptData.apptDate,
								   	apptTime: apptData.apptTime,
								   	contactPerson: apptData.person,
								   	contact: apptData.contact,
								   	address:apptData.address,
								   	email:apptData.email,
								   	floorPlanStatus: apptData.floorPlanStatus,
								   	floorPlanLoc: apptData.floorPlanLoc,
								   	apptStatus: apptData.apptStatus,
								   	created_at: userAppt[0].cust_appointment.created_at,
								   	updated_at: new Date()
									};

								conn.query('insert into cust_appointment set ?', usrApptData, function(err, results, fields){
									if(err){
										console.log('Error in inserting user apptInfo '+err);
										conn.release();
										return res.send({success: false, reason:err.toString()});
									}
									else{
										return res.send({success:true});	
									}
								});

								console.log(req.user.username);

								if(apptData.email.toLowerCase() != req.user.username.toLowerCase()){
									var updUserData = [apptData.email, req.user.id];
									conn.query('update user set email = ? where id= ?', updUserData, function(err, results, fields){
								});

								}

	    					}
						});
					}
					else{
						//Uploading floor plan now
						var usrApptUpdData =[
									apptData.roomId,
									apptData.apptDate,
								   	apptData.apptTime,
								   	apptData.person,
								   	apptData.contact,
								   	apptData.address,
								   	apptData.email,
								   	apptData.floorPlanStatus,
								   	apptData.floorPlanLoc,
								   	apptData.apptStatus,
								   	new Date(),
								   	updFPID
									];

						var qry_upd_appt = 'update cust_appointment set roomId=?, apptDate = ?, apptTime=?,'+
									 'contactPerson=?, contact=?, address=?,email=?,floorPlanStatus=?,'+
									 'floorPlanLoc=?, apptStatus=?,updated_at=? where id=?';

						conn.query(qry_upd_appt,usrApptUpdData, function(err, result, rows, fields) {
							if(err){
								console.log('Error in updating user apptInfo '+err);
								conn.release();
								return res.send({success: false, reason:err.toString()});
							}
							else{
		    					return res.send({success: true});
	    					}
						});

						if(apptData.email.toLowerCase() != req.user.username.toLowerCase()){
							var updUserData = [apptData.email, req.user.id];
							conn.query('update user set email = ? where id= ?', updUserData, function(err, results, fields){
						});

					}
				}
				}
				else{
					//Add data
					var usrApptData = {
									quizId:apptData.quizId,
									roomId:apptData.roomId,
								   	roomName:'',
								   	apptDate:apptData.apptDate,
								   	apptTime: apptData.apptTime,
								   	contactPerson: apptData.person,
								   	contact: apptData.contact,
								   	address:apptData.address,
								   	email:apptData.email,
								   	floorPlanStatus: apptData.floorPlanStatus,
								   	floorPlanLoc: apptData.floorPlanLoc,
								   	apptStatus: apptData.apptStatus,
								   	created_at: new Date(),
								   	updated_at: new Date()
									};
					conn.query('insert into cust_appointment set ?', usrApptData, function(err, results, fields){
						if(err){
							console.log('Error in inserting user apptInfo '+err);
							conn.release();
							return res.send({success: false, reason:err.toString()});
						}
						else{
							return res.send({success:true});	
						}
					
					});
					console.log(req.user.username);

								if(apptData.email.toLowerCase() != req.user.username.toLowerCase()){
									var updUserData = [apptData.email, req.user.id];
									conn.query('update user set email = ? where id= ?', updUserData, function(err, results, fields){
									if(err){
										console.log('Error in updating user email info '+err);
										//conn.release();
										//return res.send({success: false, reason:err.toString()});
									}
									// else{
									// 	return res.send({success:true});	
									// }
								});

								}
				}
			});
    	}
    });
}

exports.modifyUsrAppt = function(req,res,next){
	var data = req.body.data;
	var action = data.action;
	var updData =[data.status,new Date(),data.quizId,data.roomId];
	
	var qry_upd_apt;

	if(action===1){

		qry_upd_apt='update cust_appointment set apptStatus = ?, updated_at=? where quizId=?';
	}
	else if(action===2){
		qry_upd_apt='update cust_appointment set floorPlanStatus = ?,updated_at=? where quizId=? and roomId=?';
	}
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

	for(var i = 0;i<data.length;i++){
		data[i].created_at = new Date();
		data[i].updated_at = new Date();
	}
	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
        if(conn){
	        conn.query('insert into concept_board(quizId,roomId,files,status,created_at,updated_at,notes) values ?', [data], function(err, results, fields){
				if(err){
					console.log('Error in inserting concept board data '+err);
					conn.release();
					return res.send({success: false, reason:err.toString()});
				}
				conn.release();
				return res.send({success: true});
			});
	    }
    });
}	

exports.saveFinalLook = function(req,res,next){
	var data = req.body.data;

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	// conn.query('insert into final_look set ?', data[i], function(err, results, fields){
        	conn.query('insert into final_look(quizId,roomId,files,status,created_at,updated_at,notes) values ?', [data], function(err, results, fields){
				if(err){
					console.log('Error in inserting final_look '+err);
					conn.release();
					return res.send({success: false, reason:err.toString()});
				}
				conn.release();
				return res.send({success: true});
			});
    	}
    });
}

exports.saveShoppingList = function(req,res,next){
	var data = req.body.data;
	var errorArr = [];
	
	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        else if(conn){
	        conn.query('insert into shopping_list(quizId,roomId,files,status,created_at,updated_at,notes) values ?', [data], function(err, results, fields){
				if(err){
					conn.release();
					return res.send({success: false, reason:err.toString()});
				}
				else{
					conn.release();
					return res.send({success: true});
				}
			});
    	}
    });
}

exports.submitFeedback = function(req,res,next){
	var data = req.body.data;
	var concept_type = req.body.concept_type;
	var ins_qry;

	if(concept_type===1){
		qry = 'INSERT INTO concept_board_feedback(status,comments,created_at,updated_at,concept_id,file1) VALUES ? ON DUPLICATE KEY UPDATE status = VALUES(status), comments=VALUES(comments), updated_at=VALUES(updated_at)';
	}
	else if(concept_type===2){
		qry = 'INSERT INTO final_look_feedback(status,comments,created_at,updated_at,concept_id,file1) VALUES ? ON DUPLICATE KEY UPDATE status = VALUES(status), comments=VALUES(comments), updated_at=VALUES(updated_at)';
		
	}

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
		
        if(conn){
        	conn.query(qry, [data], function(err, results, fields){
				if(err){
					res.status(400);
					return res.send({success: false, reason:'Error in inserting concept board feedback for filetype: '+concept_type});
				}
				return res.send({success: true});
			});
        }

        
    });
}

exports.getQuizDetail = function(req,res,next){
	var quizId = req.body.quizId;

	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		var quizDetails = [];
        if(conn){
        	async.parallel([
				async.apply(getResult,conn,quizId),
			    async.apply(getRooms,conn,quizId),
				async.apply(getPackage,conn,quizId),
				async.apply(getAppt,conn,quizId),
				async.apply(getImages,conn,quizId),
				async.apply(getQuiz,conn,quizId),
				async.apply(getConceptBoard,conn,quizId),
				async.apply(getFinalLook,conn,quizId),
				async.apply(getShoppingList,conn,quizId),
				async.apply(getPackageTxn,conn,quizId),
				async.apply(getCustQuizDtls,conn,quizId),
				async.apply(getPinImages,conn,quizId)

			], function (err, result) {
			    if(err){
			     	conn.release();
			     	res.send({success: false, reason:err.toString()});
			    }
			     
                quizDetails.push({'resultData':result[0],
                'roomData': result[1],
                'pkgData': result[2],
                'apptData': result[3],
                'imgData': result[4],
                'quizData': result[5],
                'conceptData': result[6],
            	'finalLookData': result[7],
            	'shoppingList':result[8],
            	'paymentData': result[9],
            	'quizDtls':result[10],
            	'pinImages':result[11]});
                 
                 conn.release();
			     res.send({'success':true,'results':quizDetails});
			});

		}
	});
}
	
exports.deleteProject = function(req,res,next){
	var quizId =  req.body.quizId;
	var roomId = req.body.roomId;

	mysqlConn.getConnection(function(err,conn){
		if(err){return next(err);}
	    if(conn){
	    	conn.query('select count(*) as count from cust_room_selection where quizId='+quizId, function(err, results, fields){
				if(err){
					conn.release();
					return res.send({success: false, reason:err.toString()});
				}
				if(results[0].count >1){
					conn.query('delete from cust_room_selection where quizId='+quizId+' and id='+roomId, function(err, results, fields){

						if(err){
							conn.release();
							return res.send({success: false, reason:err.toString()});
						}
						return res.send({success: true});
					});
				}
				else{
					conn.query('delete from cust_quiz where quizId='+quizId, function(err, results, fields){
						if(err){
							conn.release();
							return res.send({success: false, reason:err.toString()});
						}
						return res.send({success: true});
					});

				}
	    	});
	    }
	});
}