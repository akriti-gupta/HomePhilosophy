var mysqlConn = require('../config/mysqlConn');


exports.createUserQuiz = function(req,res,next){
	var customerId = req.body.customerId;
	var status = req.body.status;
	
	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
			conn.query('Select * from cust_quiz where customerId = '+conn.escape(customerId)+
						' order by quizId desc', function(err, results, fields){
				if(err){
					console.log('Error while creating a new user quiz record: '+err);
					conn.release();
					res.send({reason:err.toString()});
				}
				console.log('results len is: '+results.length);
				if(results.length>0){
					var lastStatus = results[0].status;
					if(lastStatus===-1){
						console.log('Overwriting: Updating Timestamp');
						conn.release();
						res.send(results[0]);
						//TODO: refresh updated_at timestamp in cust_quiz table.
						
						// usrQuizCol.models[0].where(customerId:userId).save({}, { method: 'update' });
						//1: update
						//saveQuizData(req.body.quizInfo,1)
					}
				}

				if(results.length===0 || (results.length > 0 && results[0].status!=-1)) {
					//Create new record with highest quizId+1
					var userQuizData = {customerId: customerId, status:status};
					conn.query('insert into cust_quiz set ?', userQuizData, function(err, results, fields){
						if(err){
							console.log('Error in creating new record in cust_quiz: '+err);
							conn.release();
							res.send({reason:err.toString()});
						}
						conn.query('select * from cust_quiz where quizId='+conn.escape(results.insertId), 
									function(err, quiz, fields){
										if(err){conn.release();return next(err);}
										conn.release();
										res.send(quiz[0]);
									});
					});
				}
			});				
		}
	});
}



exports.saveUserQuizDtls = function(req,res,next){
	var userId = req.body.customerId;
	var quizId = req.body.quizId;
	var quizDtls = req.body.quizInfo;
	var status = req.body.status;
	var userSelectionData = req.body.userSelection;
	var userQuizResult = [];
	var userRoomData = [];
	var userImgData = [];
	var startIndex = 0;

	if(quizDtls.length>0){
		for(var i =0; i<quizDtls.length;i++){
			var currResultArr = [quizId,quizDtls[i].value,quizDtls[i].id];
			userQuizResult.push(currResultArr);
		} 
	}
	if(userSelectionData!=null && userSelectionData.roomSelected!=null
								 && userSelectionData.roomSelected.length>0){
		for(var i =0; i<userSelectionData.roomSelected.length;i++){

			var currRoomData = [quizId,userSelectionData.roomSelected[i].room_disp_name,userSelectionData.roomSelected[i].room_num.value];
			userRoomData.push(currRoomData);
		} 
	}
	if(userSelectionData!=null && userSelectionData.quizImgSelected!=null
								 && userSelectionData.quizImgSelected.length>0){
		var qid = 1;

		//TODO: Save Pinterest Images in Another Array.
		for(var i=startIndex;i<userSelectionData.quizImgSelected.length;i++,qid++){
			var currImgData = [quizId, qid,userSelectionData.quizImgSelected[i]];
			userImgData.push(currImgData);
		}
	}

	if(status===-1){
		mysqlConn.getConnection(function(err,conn){
			if(err){return next(err);}
	        if(conn){
				conn.query('delete from cust_quiz_result where quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting existing quiz result: '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted old unpaid quiz selected data');
					conn.query('insert into cust_quiz_result (quizId, stylePercent, styleId) values ?',[userQuizResult], function(err, results, fields){
						if(err){
							console.log('Error in saving result data'+err);
							res.send({response:err.toString()});
						}
						console.log('Result saved');
					});
				});

				conn.query('delete from cust_room_selection where quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting prev room selection info '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted prev room selections');
					conn.query('insert into cust_room_selection(quizId,roomName,numRoom) values ?',[userRoomData], function(err, results, fields){
						if(err){
							console.log('Error in saving room selection data'+err);
							res.send({response:err.toString()});
						}
						console.log('Room Info saved');
					});
				});

				conn.query('delete from cust_img_selection where quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting prev img selection info '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted prev img selections');
					conn.query('insert into cust_img_selection(quizId,questionId,selectedImgId) values ? ',[userImgData], function(err, results, fields){
						if(err){
							console.log('Error in saving img selection data'+err);
							res.send({response:err.toString()});
						}
						console.log('Img Info saved');
						res.send(true);
						res.end();
					});
				});
			}
		});
	}
}

exports.addRoomToQuiz = function(req,res,next){
	var roomInfo = req.body.roomInfo;
	var quizId = req.body.quizId;
	
	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
			conn.query('Select * from cust_room_selection where quizId = '+conn.escape(quizId)+
						' order by id desc', function(err, results, fields){
				if(err){
					console.log('Error while getting room records: '+err);
					conn.release();
					res.send({reason:err.toString()});
				}
				console.log('Results for room are:');
				console.log(results);
				if(results!=null && results.length>0){
					var newNumRoom=1;
					console.log('TO be added room is:');
					console.log(roomInfo);
					for(var i =0;i<roomInfo.length;i++){
						var currRoomName = roomInfo[i].room_disp_name;
						var currRoomNum = roomInfo[i].room_num.value;

						var isUpdate = false;

						for(var j =0 ;j<results.length;j++){
							console.log('In loop, new roomName is: '+currRoomName+'abc');
							console.log('In loop, existing roomName is: '+results[j].roomName+'abc');
							console.log('Is equal: '+(currRoomName===results[j].roomName));
							if(results[j].roomName===currRoomName){
								console.log('Room name found, adding num room');
								console.log('Existing numroom='+results[j].numRoom);
								console.log('New numroom='+currRoomNum);
								console.log('Add res is: '+(results[j].numRoom + currRoomNum));
								newNumRoom = results[j].numRoom + currRoomNum;
								console.log('New num room');
								console.log(newNumRoom);
								isUpdate = true;
								break;
							}
						}
						if(isUpdate){
							console.log('Updating now');
							var roomData = [newNumRoom,quizId,currRoomName];
							var qry_upd_room = 'update cust_room_selection set numRoom=? where quizId=? and roomName=?';
        			
							conn.query(qry_upd_room,roomData, function(err, result, rows, fields) {
								if(err){
									console.log('Error in updating room num while adding new room '+err);
									conn.release();
									res.send({success: false, reason:err.toString()});
								}
							});
						}
						else{
							console.log('Inserting now');
							var roomData={quizId:quizId,roomName:currRoomName,numRoom:currRoomNum};
							conn.query('insert into cust_room_selection set ?', roomData, function(err, results, fields){
								if(err){
									console.log('Error in adding new room in cust_room_selection: '+err);
									conn.release();
									res.send({success:false,reason:err.toString()});
								}
							});
						}
						
					}//Outer For Loop
				}
			});
		}
		conn.release();
		res.send({success:true});
	});
}


