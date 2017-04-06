var mysqlConn = require('../config/mysqlConn'),
	async = require('async');
	userProject = {};

exports.createUserQuiz = function(req,res,next){
	var customerId = req.body.customerId;
	var status = req.body.status;
	
	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
			/*conn.query('Select * from cust_quiz where customerId = '+conn.escape(customerId)+
						' order by quizId desc', function(err, results, fields){
				if(err){
					console.log('Error while creating a new user quiz record: '+err);
					conn.release();
					res.send({reason:err.toString()});
				}
				if(results.length>0){
					var lastStatus = results[0].status;
					if(lastStatus===-1){
						console.log('Overwriting: Updating Timestamp');
						conn.release();
						res.send(results[0]);
						//TODO: refresh updated_at timestamp in cust_quiz table.
					}
				}

				if(results.length===0 || (results.length > 0 && results[0].status!=-1)) {*/
					//Create new record with highest quizId+1
					var userQuizData = {customerId: customerId, status:status,created_at:new Date(),updated_at:new Date()};
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
				//}
			//});				
		}
	});
}


function updQzResult(conn,quizId,data,cb){

	/*conn.query('delete from cust_quiz_result where quizId = '+conn.escape(quizId), 
	function(err, results, fields){
		if(err){
			console.log('Error while deleting existing quiz result: '+err);
			cb(err,null);
		}
		console.log('Deleted old unpaid quiz selected data');*/
		conn.query('insert into cust_quiz_result (quizId, stylePercent, styleId) values ?',[data],
		function(err, results, fields){
			if(err){
				console.log('Error in saving result data'+err);
				cb(err,null);
			}
			console.log('Result saved');
			cb(null,results);
		});
	//});
}

function updQzRoom(conn,quizId,data,cb){

	/*conn.query('delete from cust_room_selection where quizId = '+conn.escape(quizId), function(err, results, fields){
		if(err){
			console.log('Error while deleting prev room selection info '+err);
			cb(err,null);
		}
		console.log('Deleted prev room selections');*/
		conn.query('insert into cust_room_selection(quizId,roomId,roomName,numRoom) values ?',[data], function(err, results, fields){
			if(err){
				console.log('Error in saving room selection data'+err);
				cb(err,null);
			}
			console.log('Room Info saved');
			conn.query('select * from cust_room_selection where quizId='+conn.escape(quizId), function(err, results, fields){
				if(err){
					cb(err,null);
				}
				cb(null,results);
			});
			
		});
	//});

}

function updQzImg(conn,quizId,data,cb){

	/*conn.query('delete from cust_img_selection where quizId = '+conn.escape(quizId), function(err, results, fields){
		if(err){
			console.log('Error while deleting prev img selection info '+err);
			cb(err,null);
		}
		console.log('Deleted prev img selections');*/
		conn.query('insert into cust_img_selection(quizId,questionId,selectedImgId) values ? ',[data], function(err, results, fields){
			if(err){
				console.log('Error in saving img selection data'+err);
				cb(err,null);
			}
			console.log('Img Info saved');
			cb(null,results);
		});
	//});
}

function updQzPinImgs(conn,quizId,data,cb){

	if(!isEmpty(data)){
		conn.query('insert into pin_images set ?',data, function(err, results, fields){
			if(err){
				console.log('Error in saving pin images selection data'+err);
				cb(err,null);
			}
		});	
	}
	cb(null,true);
}

function isEmpty(obj) {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
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
	var usrPinImgData = {};
	

console.log(quizDtls);

	if(quizDtls.length>0){
		for(var i =0; i<quizDtls.length;i++){
			var currResultArr = [quizId,quizDtls[i].value,quizDtls[i].id];
			userQuizResult.push(currResultArr);
		} 
	}
	if(userSelectionData!=null && userSelectionData.roomSelected!=null
								 && userSelectionData.roomSelected.length>0){
		for(var i =0; i<userSelectionData.roomSelected.length;i++){

			var numRoom = userSelectionData.roomSelected[i].room_num.value;
			if(numRoom>1){
				for(var j=1;j<=numRoom;j++){
					var currRoomData = [quizId,userSelectionData.roomSelected[i].room_id,userSelectionData.roomSelected[i].room_disp_name,j];	
					userRoomData.push(currRoomData);
				}
			}
			else{
				var currRoomData = [quizId,userSelectionData.roomSelected[i].room_id,userSelectionData.roomSelected[i].room_disp_name,0];
				userRoomData.push(currRoomData);
			}
			
		} 
	}
	if(userSelectionData!=null && userSelectionData.quizImgSelected!=null
								 && userSelectionData.quizImgSelected.length>0){
		var qid;
		if(userSelectionData.quizImgSelected.length===1){
			qid=0;
		}
		else{
			qid = 1;
		}
		//TODO: Save Pinterest Images in Another Array.
		for(var i=0;i<userSelectionData.quizImgSelected.length;i++,qid++){
			var currImgData = [quizId, qid,userSelectionData.quizImgSelected[i]];
			userImgData.push(currImgData);
		}
	}

	if(userSelectionData!=null && userSelectionData.pinImages!=null
								 && userSelectionData.pinImages.length>0){
		var imgs;
		if(userSelectionData.pinImages.length>1){
			imgs = userSelectionData.pinImages.join(',');
		}
		else{
			imgs = userSelectionData.pinImages[0];
		}
		usrPinImgData = {quizId: quizId, imagesLiked: imgs};
	}
	console.log(usrPinImgData);

	if(status===-1){
		mysqlConn.getConnection(function(err,conn){
			if(err){return next(err);}
	        if(conn){
	        	async.parallel([
							async.apply(updQzResult,conn,quizId,userQuizResult),
							async.apply(updQzRoom,conn,quizId,userRoomData),
							async.apply(updQzImg,conn,quizId,userImgData),
							async.apply(updQzPinImgs,conn,quizId,usrPinImgData)
						], function (err, result) {
						     if(err){
						     	conn.release();
						     	console.log(err);
						     	res.send({success: false, reason:err.toString()});
						     }
						    userProject.resultData = result[0];
			                userProject.roomData = result[1];
			                userProject.imgData = result[2];
			                conn.release();
			                res.send({'success':true,'results':userProject});
						});


				/*conn.query('delete from cust_quiz_result where quizId = '+conn.escape(quizId), function(err, results, fields){
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
					conn.query('insert into cust_room_selection(quizId,roomId,roomName,numRoom) values ?',[userRoomData], function(err, results, fields){
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
				});*/
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
				if(results!=null && results.length>0){
					var newNumRoom=1;
					for(var i =0;i<roomInfo.length;i++){
						var currRoomName = roomInfo[i].room_disp_name;
						var currRoomNum = roomInfo[i].room_num.value;

						var isUpdate = false;

						for(var j =0 ;j<results.length;j++){
							if(results[j].roomName===currRoomName){
								newNumRoom = results[j].numRoom + currRoomNum;
								isUpdate = true;
								break;
							}
						}
						if(isUpdate){
							var roomData = [newNumRoom,quizId,currRoomName];
							var qry_upd_room = 'update cust_room_selection set numRoom=? where quizId=? and roomName=?';
        			
							conn.query(qry_upd_room,roomData, function(err, result, rows, fields) {
								if(err){
									console.log('Error in updating room num while adding new room '+err);
									conn.release();
									return res.send({success: false, reason:err.toString()});
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
		return res.send({success:true});
	});
}


exports.saveQuizMiscData = function(req,res,next){
	var data = req.body.data;

	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
        	conn.query('delete from cust_quiz_detail where quizId = '+conn.escape(data.quizId), function(err, results, fields){
				if(err){
					console.log('Error while deleting existing quiz detail: '+err);
					return res.send({reason:err.toString()});
				}
				console.log('Deleted old unpaid quiz detail');
					
				conn.query('insert into cust_quiz_detail set ?', data, function(err, results, fields){
					if(err){
						console.log('Error in creating new record in cust_quiz_detail: '+err);
						conn.release();
						return res.send({reason:err.toString()});
					}
					conn.release();
					return res.send({success:true});
    			});
    		});
		}
	});
}

exports.getQuizDetails = function(req,res,next){
	var quizId = req.body.quizId;

	mysqlConn.getConnection(function(err,conn){
		
		if(err){return next(err);}
		
        if(conn){
        	conn.query('select count(*) as count from cust_quiz_detail where quizId='+quizId, function(err,results , fields){
				if(err){
					console.log('Error in gettimg data from cust_quiz_detail: '+err);
					conn.release();
					return res.send({reason:err.toString()});
				}
				console.log(results);
				if(results[0].count >0){
					conn.release();
					return res.send({exists:true});	
				}
				else{
					conn.release();
					return res.send({exists:false});	
				}
				
			});
		}
	});
}
