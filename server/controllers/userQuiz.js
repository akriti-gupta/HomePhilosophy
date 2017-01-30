// var CustQuiz = require('../models/CustQuiz'),
// 	CustQuizResult = require('../models/CustQuizResult');
// 	CustQuizResults = require('../collections/CustQuizResults');
// 	CustRoom = require('../models/CustRoom');
// 	CustRooms = require('../collections/CustRooms'),
// 	CustImage = require('../models/CustImage');
// 	CustImages = require('../collections/CustImages');
// 	var Promise = require('bookshelf/node_modules/bluebird');

// exports.createUserQuiz = function(req,res,next){
// 	var userId = req.body.customerId;
// 	var status = req.body.status;
// 	// var quizId = req.body.quizId;
	
// 	CustQuiz.where({customerId:userId})
// 			.orderBy('quizId','DESC')
// 			.fetchAll()
// 			.then(function(usrQuizCol)
// 	{ 

// 		//1. Check if there is an active Quiz in cust_quiz. 
// 		//2. If active, create another entry with status -1. If inactive, replace. If no entry, create with status -1
			
// 		if(usrQuizCol.models.length>0){
// 			var lastStatus = usrQuizCol.models[0].attributes.status;
// 			if(lastStatus===-1){
// 				console.log('Overwriting: Updating Timestamp');
// 				res.send(usrQuizCol.models[0]);
// 				//TODO: refresh updated_at timestamp in cust_quiz table.
				
// 				// usrQuizCol.models[0].where(customerId:userId).save({}, { method: 'update' });
// 				//1: update
// 				//saveQuizData(req.body.quizInfo,1)
// 			}
// 			else{
// 				//Create new record with highest quizId+1
// 				//var lastQuizId = usrQuizCol.models[0].attributes.quizId;
// 				//userQuizData = {customerId: userId,quizId: lastQuizId+1, status:status};
// 				userQuizData = {customerId: userId, status:status};
// 				CustQuiz.forge(userQuizData).save().then(function(userQuiz){
// 					res.send(userQuiz);
// 				}).catch(function(err){
// 					console.log('Error in creating new record in cust_quiz: '+err);
// 					res.send({reason:err.toString()});
// 				});	
// 			}
// 		}
// 		//User's first Quiz.
// 		else{
// 			//Create new entry
// 			// var userQuizData = {quizId:quizId, customerId:userId,status:status};
// 			var userQuizData = {customerId:userId,status:status};
// 			CustQuiz.forge(userQuizData).save().then(function(userQuiz){
// 					res.send(userQuiz);
// 			}).catch(function(err){
// 				console.log('Error in creating first record in cust_quiz: '+err);
// 				res.send({reason:err.toString()});
// 			});	
// 		}
// 	}).catch(function(err){
// 		console.log('Error while saving user quiz: '+err);
// 		res.send({reason:err.toString()});
// 	});
// }
var mysqlConn = require('../config/mysqlConn');
exports.createUserQuiz = function(req,res,next){
	var customerId = req.body.customerId;
	var status = req.body.status;
	// var quizId = req.body.quizId;
	
	mysqlConn.getConnection(function(err,conn){
        if(conn){
			conn.query('Select * from cust_quiz where customerId = '+conn.escape(customerId)+
						' order by quizId desc', function(err, results, fields){
				if(err){
					console.log('Error while creating a new user quiz record: '+err);
					res.send({reason:err.toString()});
				}
				if(results.length>0){
					var lastStatus = results[0].status;
					if(lastStatus===-1){
						console.log('Overwriting: Updating Timestamp');
						res.send(results[0]);
						//TODO: refresh updated_at timestamp in cust_quiz table.
						
						// usrQuizCol.models[0].where(customerId:userId).save({}, { method: 'update' });
						//1: update
						//saveQuizData(req.body.quizInfo,1)
					}
					else{
						//Create new record with highest quizId+1
						var userQuizData = {customerId: customerId, status:status};
						conn.query('insert into cust_quiz set ?', userQuizData, function(err, results, fields){
							if(err){
								console.log('Error in creating new record in cust_quiz: '+err);
								res.send({reason:err.toString()});
							}
							conn.query('select * from cust_quiz where quizId='+conn.escape(results.insertId), 
										function(err, quiz, fields){
											if(err){return next(err);}
											res.send(quiz[0]);
										});
						});
					}
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

	console.log('In saveUserQuizDtls');
	if(quizDtls.length>0){
		for(var i =0; i<quizDtls.length;i++){
			var currResultArr = [userId,quizId,quizDtls[i].value,quizDtls[i].id];
			userQuizResult.push(currResultArr);
		} 
	}
	if(userSelectionData!=null && userSelectionData.roomSelected!=null
								 && userSelectionData.roomSelected.length>0){
		for(var i =0; i<userSelectionData.roomSelected.length;i++){

			var currRoomData = [userId,quizId,userSelectionData.roomSelected[i].room_disp_name,userSelectionData.roomSelected[i].room_num.value];
			userRoomData.push(currRoomData);
		} 
	}
	console.log('userSelectionData is: ');
	console.log(userSelectionData);
	if(userSelectionData!=null && userSelectionData.quizImgSelected!=null
								 && userSelectionData.quizImgSelected.length>0){

		var qid = 1;
		// if(userSelectionData.quizImgSelected[3]===-1){
		// 	//Style Quiz was taken. Save values from index 4 to 9
		// 	startIndex = 4;
		// 	endIndex = 10;
		// }
		// else{
		// 	startIndex = 3;
		// 	endIndex = 4;
		// 	qid=0;
		// }

		//TODO: Save Pinterest Images in Another Array.
		for(var i=startIndex;i<userSelectionData.quizImgSelected.length;i++,qid++){
			var currImgData = [userId, quizId, qid,userSelectionData.quizImgSelected[i]];
			userImgData.push(currImgData);
		}
	}

	if(status===-1){
		mysqlConn.getConnection(function(err,conn){
	        if(conn){
				conn.query('delete from cust_quiz_result where customerId = '+conn.escape(userId)+
							' and quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting existing quiz result: '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted old unpaid quiz selected data');
					conn.query('insert into cust_quiz_result (customerId, quizId, stylePercent, styleId) values ?',[userQuizResult], function(err, results, fields){
						if(err){
							console.log('Error in saving result data'+err);
							res.send({response:err.toString()});
						}
						console.log('Result saved');
					});
				});

				conn.query('delete from cust_room_selection where customerId = '+conn.escape(userId)+
							' and quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting prev room selection info '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted prev room selections');
					conn.query('insert into cust_room_selection(customerId,quizId,roomName,numRoom) values ?',[userRoomData], function(err, results, fields){
						if(err){
							console.log('Error in saving room selection data'+err);
							res.send({response:err.toString()});
						}
						console.log('Room Info saved');
					});
				});

				conn.query('delete from cust_img_selection where customerId = '+conn.escape(userId)+
							' and quizId = '+conn.escape(quizId), function(err, results, fields){
					if(err){
						console.log('Error while deleting prev img selection info '+err);
						res.send({reason:err.toString()});
					}
					console.log('Deleted prev room selections');
					conn.query('insert into cust_img_selection(customerId,quizId,questionId,selectedImgId) values ? ',[userImgData], function(err, results, fields){
						if(err){
							console.log('Error in saving img selection data'+err);
							res.send({response:err.toString()});
						}
						console.log('Img Info saved');
						res.send(true);
					});
				});
			}
		});
	}
}



// exports.saveUserQuizDtls = function(req,res,next){
// 	var userId = req.body.customerId;
// 	var quizId = req.body.quizId;
// 	var quizDtls = req.body.quizInfo;
// 	var status = req.body.status;
// 	var userSelectionData = req.body.userSelection;
// 	var userQuizResult = [];
// 	var userRoomData = [];
// 	var userImgData = [];
// 	var startIndex = 0;

// 	//If status = -1, delete existing records in results and insert new ones.
	
// 	// console.log('In saveUserDtls userSelectionData is: ');
// 	// console.log(userSelectionData);

// 	console.log('userId is: '+userId);
// 	console.log('quizId is: '+quizId);
// 	// console.log('Img selected');
// 	// console.log(userSelectionData.quizImgSelected);
// 	if(quizDtls.length>0){
// 		for(var i =0; i<quizDtls.length;i++){
// 			userQuizResult.push({customerId:userId,quizId:quizId,stylePercent:quizDtls[i].value,styleId:quizDtls[i].id});
// 		} 
// 	}

// 	if(userSelectionData!=null && userSelectionData.quizImgSelected!=null
// 								 && userSelectionData.quizImgSelected.length>0){

// 		var qid = 1;
// 		if(userSelectionData.quizImgSelected[3]===-1){
// 			//Style Quiz was taken. Save values from index 4 to 9
// 			startIndex = 4;
// 			endIndex = 10;
// 		}
// 		else{
// 			startIndex = 3;
// 			endIndex = 4;
// 			qid=0;
// 		}
// 		for(var i=startIndex;i<endIndex;i++,qid++){
// 			userImgData.push({customerId:userId,
// 							   quizId:quizId,
// 							   questionId:qid,
// 							   selectedImgId:userSelectionData.quizImgSelected[i]});
// 		}
// 	}

// 	if(status===-1){
// 		CustQuizResult.query().where({customerId:userId, quizId: quizId}).del().then(function(){
// 			console.log('Deleted');
// 			CustQuizResults.forge(userQuizResult).invokeThen('save', null, null).then(function() {
// 				//Promise.all(quizResults.invoke('save')).then(function(model) {
// 				console.log('Result saved');
// 				res.send(true);
// 			}).catch(function(err){
// 					console.log('Error in saving result data'+err);
// 					res.send({response:err.toString()});
// 			});	

// 		}).catch(function(err){
// 					console.log('Error in deleting result data'+err);
// 					res.send({response:err.toString()});
// 		});	

// 		CustRoom.query().where({customerId:userId, quizId: quizId}).del().then(function(){
// 			console.log('Deleted Previous Room Selection');

// 			CustRooms.forge(userRoomData).invokeThen('save', null, null).then(function() {
// 			//Promise.all(quizResults.invoke('save')).then(function(model) {
// 				console.log('Room Info saved');
// 			}).catch(function(err){
// 					console.log('Error in saving room data'+err);
// 					res.send({response:err.toString()});
// 				});	
// 		});

// 		CustImage.query().where({customerId:userId, quizId: quizId}).del().then(function(){
// 			console.log('Deleted Previous Image Selection');
// 			CustImages.forge(userImgData).invokeThen('save', null, null).then(function() {
// 				console.log('Result saved');
// 			}).catch(function(err){
// 					console.log('Error in saving image data'+err);
// 					res.send({response:err.toString()});
// 				});	
// 		});
// 	}

// 	if(userSelectionData!=null && userSelectionData.roomSelected!=null
// 								 && userSelectionData.roomSelected.length>0){
// 		for(var i =0; i<userSelectionData.roomSelected.length;i++){

// 			userRoomData.push({customerId:userId,
// 							   quizId:quizId,
// 							   roomName:userSelectionData.roomSelected[i].room_disp_name,
// 							   numRoom:userSelectionData.roomSelected[i].room_num.value});
// 		} 
// 	}

// 	// if(userSelectionData!=null && userSelectionData.quizImgSelected!=null
// 	// 							 && userSelectionData.quizImgSelected.length>0){

// 	// 	var qid = 1;
// 	// 	if(userSelectionData.quizImgSelected[3]===-1){
// 	// 		//Style Quiz was taken. Save values from index 4 to 9
// 	// 		startIndex = 4;
// 	// 		endIndex = 10;
// 	// 	}
// 	// 	else{
// 	// 		startIndex = 3;
// 	// 		endIndex = 4;
// 	// 		qid=0;
// 	// 	}
// 	// 	for(var i=startIndex;i<endIndex;i++,qid++){
// 	// 		userImgData.push({customerId:userId,
// 	// 						   quizId:quizId,
// 	// 						   questionId:qid,
// 	// 						   selectedImgId:userSelectionData.quizImgSelected[i]});
// 	// 	}
// 		// CustImages.forge(userImgData).invokeThen('save', null, null).then(function() {
// 		// 	console.log('Result saved');
// 		// }).catch(function(err){
// 		// 		console.log('Error in saving image data'+err);
// 		// 		res.send({response:err.toString()});
// 		// 	});	
// 	//}

// 	// CustRooms.forge(userRoomData).invokeThen('save', null, null).then(function() {
// 	// 	//Promise.all(quizResults.invoke('save')).then(function(model) {
// 	// 		console.log('Room Info saved');
// 	// }).catch(function(err){
// 	// 			console.log('Error in saving room data'+err);
// 	// 			res.send({response:err.toString()});
// 	// 		});	

// 	// if(quizDtls.length>0){
// 	// 	for(var i =0; i<quizDtls.length;i++){
// 	// 		userQuizResult.push({customerId:userId,quizId:quizId,stylePercent:quizDtls[i].value,styleId:quizDtls[i].id});
// 	// 	} 
// 	// }
	
// 	// CustQuizResults.forge(userQuizResult).invokeThen('save', null, null).then(function() {
// 	// 	//Promise.all(quizResults.invoke('save')).then(function(model) {
// 	// 		console.log('Result saved');
// 	// 		res.send(true);
// 	// }).catch(function(err){
// 	// 			console.log('Error in saving result data'+err);
// 	// 			res.send({response:err.toString()});
// 	// 		});	
	
	
// }
