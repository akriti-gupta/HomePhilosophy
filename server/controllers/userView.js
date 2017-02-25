var CustAppt = require('../models/CustAppt');

exports.saveAppointment = function(req,res,next){
	var apptData = req.body.data;
	"customerId":customerId,"quizId":quizId,"address":$scope.address,
							 "person":$scope.person,"contact":$scope.contact,"room_name":roomName
							 "apptDate":$scope.dt,"apptTime":$scope.time,
							 "floorPlanLoc":"test","floorPlanStatus":-1};

	CustAppt.where({customerId:apptData.customerId,quizId:apptData.quizId,roomName:apptData.roomName})
			.fetch()
			.then(function(usrApptRec){
				console.log('usrApptRec is: ');
				console.log(usrApptRec);

				if(usrApptRec!=null){
				}
				else{
					console.log("No data in user rec null");
					var usrApptData = {customerId:apptData.customerId,
									   quizId:apptData.quizId,
									   roomName:apptData.roomName,
									   apptDate:apptData.apptDate,
									   apptTime: apptData.apptTime,
									   contactPerson: apptData.person,
									   contact: apptData.contact,
									   address:apptData.address	}
					 //Add data
					 CustAppt.forge(usrApptData)
				}
			}.catch(function(err){
				console.log('Error in fetching cust records');
				res.send({success:false,reason:err.toString()});
			});
	



}