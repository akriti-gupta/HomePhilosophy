angular.module("app")
		  .controller("CustViewController",function($scope,$location,$http,$filter,quizResult,payment,mvIdentity,mvNotifier,mvUpload, mvCustView,custViewSvc){
		  		
		  	

$scope.firstName = mvIdentity.currentUser.firstname;
$scope.projects = [];
$scope.fileArr = [];
$scope.pendingFilesArr = [];
$scope.pkgNames = payment.getPackages();
$scope.address=' ';
$scope.person=' ';
$scope.contact;
$scope.projectArr =[];
$scope.feedbackArr = [];
$scope.feedbackComment;
$scope.showFeedback = false;
$scope.showMain = true;
$scope.hasActiveProject = false;
$scope.hasAllLaunched = true;
$scope.lookText='First Look'; 
//$scope.cncptObj = [];

// $scope.packages = [
//   						{'id':1,'name':"Simple",'pkgValue':350,value:1},
//   					    {'id':2,'name':"Classic",'pkgValue':600,value:2},
//   					    {'id':3,'name':"Premium",'pkgValue':1000,value:3},
//   					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
//   				  ];

$scope.packageName=[' ','Simple','Classic','Premium','Custom'];

$scope.roomImage ={};

$scope.roomImage["Bedroom"] = "images/rooms/bedroom.png";
$scope.roomImage["Dining"] = "images/rooms/dining.png";
$scope.roomImage["Master"] = "images/rooms/master.png";
$scope.roomImage["Living"] = "images/rooms/living.png";
$scope.roomImage["Home"] = "images/rooms/homeOffice.png";
$scope.roomImage["Kids"] = "images/rooms/kids.png";

/*function checkFeedbackStatus(feedbackData){
	for(var i =0;i<feedbackData.length;i++){
		var currFeedbackData = feedbackData[i];
		var status = {'statusText': 'Final Look in Progress'
	 				status.linkPage = " ";
	 				status.modal = "#calendarModal";
	}
}*/


//This function sets the existing active projects quiz info thru svcQuizResult.storeStyle
//Add a room takes all the existing style info of latest existing active project.
//Mapping Style info ensures that payment will be accepted when a new room is added.
//Without style info, pricing reverts to style quiz.

function storeQuizInfo(quizData){

	var resultData = quizData.resultData;
	var styleObj = [];
	if(resultData!=null && resultData.length>0){
		for(var i =0;i<resultData.length;i++){
			var styleId= resultData[i].styleId;
			var styleValue= resultData[i].stylePercent;
			styleObj.push({'id':styleId,'value':styleValue});
		}
		quizResult.storeStyle(styleObj,-1);
		quizResult.setUserCurrQuiz(quizData.quizData.quizId);
	}
}
function validateFormData(){
	if($scope.apptDate!=null){
		if($scope.contact===' ' || $scope.address === ' ' || $scope.person === ' ' || $scope.apptTime===null)
			return false;
	}
	return true;
}

function chkFinalLookStatus(finalLook){
	
	for(var i =0;i<finalLook.length;i++){
		var currFinalLook = finalLook[i];
		var status = currFinalLook.status;
		// var isFirstLook = currConceptData.isFirstLook;
		// var isFinalLook = currConceptData.isFinalLook;
		var finalStatus = {};

		//if(isFirstLook===1){
			if(currFinalLook.feedbackData.length>0 ){
				finalStatus.statusText='Received Feedback. Your Shopping List and Final Look will be uploaded soon';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				break;
			}
			else{
				finalStatus.statusText='Final Look Uploaded. Awaiting Feedbackss';
				finalStatus.linkPage='getFinalLook($index)';
				finalStatus.modal=' ';
			}
			/*if(status===0){
				finalStatus.statusText='First Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='getFirstLook($index)';
					finalStatus.modal=' ';
			}
			else if(status===1){
				finalStatus.statusText='Received Feedback. Final Look in Progress';
				finalStatus.linkPage=' ';
					finalStatus.modal=' ';
			}*/
			
//		}

		// else if(isFinalLook===1){
			
		// 	if('feedbackData' in currConceptData){
		// 		finalStatus.statusText='Received Feedback. Your Final Look and Shopping List will be ready soon.';
		// 		finalStatus.linkPage=' ';
		// 		finalStatus.modal=' ';
		// 		break;
		// 	}
		// 	else{
		// 		finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
		// 		finalStatus.linkPage='';
		// 		finalStatus.modal=' ';
		// 	}

/*

			if(status===0){
				finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='';
				finalStatus.modal=' ';
			}
			else if(status===1){
				finalStatus.statusText='Feedback Received. Your Final Look and Shopping List will be ready soon.';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			}
			else if(status===2){
				finalStatus.statusText='Final Look/ Shopping List is ready. Payment Pending';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			}
			else if(status===3){
				finalStatus.statusText='Total Payment Received. View Final Look + Shopping List';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			} */
		//}
	}
		return finalStatus;
}

function chkCncptStatus(conceptBoard){
	
	for(var i =0;i<conceptBoard.length;i++){
		var currConceptData = conceptBoard[i];
		var status = currConceptData.status;
		// var isFirstLook = currConceptData.isFirstLook;
		// var isFinalLook = currConceptData.isFinalLook;
		var finalStatus = {};

		//if(isFirstLook===1){
			if(currConceptData.feedbackData.length>0){
				finalStatus.statusText='Received Feedback. Final Look in Progress';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				break;
			}
			else{
				finalStatus.statusText='First Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='getFirstLook($index)';
				finalStatus.modal=' ';
			}
			/*if(status===0){
				finalStatus.statusText='First Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='getFirstLook($index)';
					finalStatus.modal=' ';
			}
			else if(status===1){
				finalStatus.statusText='Received Feedback. Final Look in Progress';
				finalStatus.linkPage=' ';
					finalStatus.modal=' ';
			}*/
			
//		}

		// else if(isFinalLook===1){
			
		// 	if('feedbackData' in currConceptData){
		// 		finalStatus.statusText='Received Feedback. Your Final Look and Shopping List will be ready soon.';
		// 		finalStatus.linkPage=' ';
		// 		finalStatus.modal=' ';
		// 		break;
		// 	}
		// 	else{
		// 		finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
		// 		finalStatus.linkPage='';
		// 		finalStatus.modal=' ';
		// 	}

/*

			if(status===0){
				finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='';
				finalStatus.modal=' ';
			}
			else if(status===1){
				finalStatus.statusText='Feedback Received. Your Final Look and Shopping List will be ready soon.';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			}
			else if(status===2){
				finalStatus.statusText='Final Look/ Shopping List is ready. Payment Pending';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			}
			else if(status===3){
				finalStatus.statusText='Total Payment Received. View Final Look + Shopping List';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			} */
		//}
	}
		return finalStatus;
}

function chkApptStatus(apptData){
	//Appt made and/or Floor Plan fileUploadedStatus.
	var status = {};
	if(apptData.apptStatus!= null && apptData.apptStatus>=0){
		if(apptData.apptStatus===0){
			//Appt Scheduled. Check if in future>=24 hrs ahead 
			var apptDate = moment(apptData.apptDate);
			var msDiff = apptDate.diff(moment(new Date(),"DD/MM/YYYY HH:mm:ss"));
			var dayDiff = moment.duration(msDiff);
			var hourDiff = Math.floor(dayDiff.asHours());

			if(hourDiff >=24){
				status.statusText = "Meeting Scheduled. View/ Edit";
				status.linkPage = " ";
				status.modal = "#calendarModal";
			}
			else{
				status.statusText = "Meeting Scheduled.";
				status.linkPage = " ";
				status.modal = " ";
			}
		}
		else if(apptData.apptStatus===1){
			status.statusText = "Meet & Measure done.First Look in Progress";
			status.linkPage = " ";
			status.modal = " ";
		}
		else if(apptData.apptStatus===3){
			status.statusText = "Rejected. An email has been sent with details. Reschedule.";
			status.linkPage = " ";
			status.modal = "#calendarModal";
		}
	}
	else if(apptData.floorPlanStatus!=null && apptData.floorPlanStatus>=0){
		if(apptData.floorPlanStatus==0){
			status.statusText = "Floor Plan uploaded. Pending Approval";
			status.linkPage = " ";
			status.modal = " ";
		}
		else if(apptData.floorPlanStatus==1){
			status.statusText = "Floor Plan Approved.First Look in Progress";
			status.linkPage = " ";
			status.modal = " ";
		}

		else if(apptData.floorPlanStatus===3){
			status.statusText = "Rejected. An email has been sent with details, Upload again.";
			status.linkPage = " ";
			status.modal = "#calendarModal";
		}
	}
	else{
		status.statusText = "Schedule Meet and Measure";
		status.linkPage = " ";
		status.modal = "#calendarModal";
	}
	return status;
}

function populateStatus(projectData){
 
 	for(var i = 0;i<projectData.length;i++){
 		var currRowData = projectData[i];
 		var currQzData = currRowData.quizData;
 		var currApptData = currRowData.apptData;
 		var currConceptBoard = currRowData.firstLookData;
 		var currFeedbackData = currRowData.feedbackData;
 		var currFinalLook = currRowData.finalLookData;
 		var currQzId = currQzData.quizId;
 		var status = {};

 		if(!("status" in currRowData)){
	 		if(currQzData.status>=0){
	 			//Payment Made. Check in decreasing order from feedback to FirstLook to  appt etc

	 			if(currFinalLook && currFinalLook.length>0){
	 				projectData[i].status = chkFinalLookStatus(currFinalLook);
	 			}

	 			else if(currConceptBoard && currConceptBoard.length>0){
	 				projectData[i].status = chkCncptStatus(currConceptBoard);
	 			}
	 			else if(currApptData && currApptData.length>0){
	 				projectData[i].status = chkApptStatus(currApptData[0]);
	 			}
	 			else{
	 				status.statusText = "Schedule Meet and Measure";
		 			status.linkPage = " ";
		 			status.modal = "#calendarModal";
		 			projectData[i].status = status;
	 			}
	 		} //quizStatus<0
	 		else{
	 			status.statusText = "Pending Payment";
	 			status.linkPage = " ";
	 			status.modal = " ";
	 			projectData[i].status = status;
	 		}
	 	}
 	}
 	for(var j = i+1; j<projectData.length;j++){
 		if(projectData[j].quizData.quizId === currQzId){
 			projectData[j].status = projectData[i].status;
 		}
 	}
 }

 function populateQuizArray(projectData){
 	var prjArr = [];
	var userData = projectData.userData[0];
 	
	if(projectData.quizData!=null && projectData.quizData.length>0){
		for(var i = 0; i<projectData.quizData.length ; i++){
			var currQzObj = projectData.quizData[i];
			var currQzId = currQzObj.quizId;
			var relPkgArr = [];
			var relRoomArr = [];
			var relResultArr = [];
			var relApptArr = [];
			var relFLArr = [];
			var relFinalLookArr = [];
			var relFeedbackArr = [];
			var statusArr = [];

			if(!($scope.hasActiveProject)){
				if(currQzObj.status===0){
					$scope.hasActiveProject = true;
				}
			}
			if(currQzObj.status<=0){
				$scope.hasAllLaunched = false;
			}
			
			if(projectData.pkgData && projectData.pkgData.length>0){
				for(var j= 0;j<projectData.pkgData.length; j++){
					if(projectData.pkgData[j].quizId === currQzId){
						relPkgArr.push(projectData.pkgData[j]);
					}
				}
			}

			if(projectData.roomData && projectData.roomData.length>0){
				for(var j= 0;j<projectData.roomData.length; j++){
					if(projectData.roomData[j].quizId === currQzId){
						relRoomArr.push(projectData.roomData[j]);
					}
				}
			}

			if(projectData.resultData && projectData.resultData.length>0){
				for(var j= 0;j<projectData.resultData.length; j++){
					if(projectData.resultData[j].quizId === currQzId){
						relResultArr.push(projectData.resultData[j]);
					}
				}
			}

			if(projectData.apptData && projectData.apptData.length>0){
				for(var j= 0;j<projectData.apptData.length; j++){
					if(projectData.apptData[j].quizId === currQzId){
						relApptArr.push(projectData.apptData[j]);
					//	console.log(projectData.apptData[j].apptTime);
					//	console.log(moment(projectData.apptData[j].apptTime));

					}
				}
			}

			if(projectData.firstLookData && projectData.firstLookData.length>0){
				for(var j= 0;j<projectData.firstLookData.length; j++){
					if(projectData.firstLookData[j].quizId === currQzId){
						relFLArr.push(projectData.firstLookData[j]);

						/*if(projectData.feedbackData && projectData.feedbackData.length>0){
							for(var k= 0;k<projectData.feedbackData.length; k++){
								if(projectData.feedbackData[k].firstlook_id === projectData.firstLookData[j].id){
									relFeedbackArr.push(projectData.feedbackData[k]);
								}
							}
						}*/
					}
				}
			} //First Look ends

			if(projectData.finalLookData && projectData.finalLookData.length>0){
				for(var j= 0;j<projectData.finalLookData.length; j++){
					if(projectData.finalLookData[j].quizId === currQzId){
						relFinalLookArr.push(projectData.finalLookData[j]);
					}
				}
			} //Final Look ends

			//

			/*for(var j = 0;j<relRoomArr.length; j++){
				var currRoomName = relRoomArr[j].roomName;
				var statusText;
				var statusLink;
				var statusModal;
				var status = {};
				
				if(relPkgArr && relPkgArr.length>0){
					for(var k = 0; k< relPkgArr.length ; k++){
						if(relPkgArr[k].roomName===currRoomName){
							currPkg = relPkgArr[k];
							isPkgSelected = true;
							prjArr.push({'userData':userData,'quizData':currQzObj,'roomData':relRoomArr[j],
								'pkgData':relPkgArr[k],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,
								'feedbackData':relFeedbackArr});
						}
					}
				}
				else{
					prjArr.push({'userData':userData,'quizData':currQzObj,'roomData':relRoomArr[j],
								'pkgData':relPkgArr,'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,
								'feedbackData':relFeedbackArr});
				}
			}*/

			for(var j = 0;j<relPkgArr.length; j++){
				var roomDispName = relPkgArr[j].roomName;
				var currRoomName;
				if(roomDispName.indexOf(' ')!=-1){
					currRoomName = roomDispName.substr(0,roomDispName.indexOf(' '));
				}
				else{
					currRoomName = roomDispName
				}
				
				
				// prjArr.push({'userData':userData,'quizData':currQzObj,'roomData':currRoomName,
				// 	'pkgData':relPkgArr[j],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,
				// 	'feedbackData':relFeedbackArr});

				prjArr.push({'userData':userData,'quizData':currQzObj,'roomData':currRoomName,
					'pkgData':relPkgArr[j],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,'finalLookData':relFinalLookArr});
		
			}

			
		}// Outermost For loop iterating over unique cust quiz

		//prjArr now contain room wise data.
		populateStatus(prjArr);
		$scope.projectArr = prjArr;

	}
 }

//Get customer projects from DB.
$scope.getProjectData = function(){
mvCustView.getCustProjectInfo().then(function(projectData){
	console.log('Result got back is: ');
	console.log(projectData);
	populateQuizArray(projectData);
	console.log('Formatted Result :');
	console.log($scope.projectArr);
}, function(reason){
		console.log('Cant find user Data');
		mvNotifier.notify('Please try again later/ contact the site administrator. '+reason);
		$location.path="/";
	});
}

$scope.addRoom=function(){
	custViewSvc.setRequester('dashboard');
	console.log('Route saved is: '+custViewSvc.getRequester());
	quizResult.clearStyle();
	payment.clearPayPkg();
	payment.clearPkgPerRoom();
	quizResult.clearCustSelections();

	//Call function to store style.
	var oldQzData = $scope.projectArr[0];
	storeQuizInfo(oldQzData);
	
	$location.path('/style-quiz');
}

$scope.loadMtngData=function(row_id){
	if($scope.projectArr[row_id].apptData.length >0 && $scope.projectArr[row_id].apptData[0].person!=' '){
		$scope.person = $scope.projectArr[row_id].apptData[0].contactPerson;
		$scope.contact = $scope.projectArr[row_id].apptData[0].contact;
		$scope.address = $scope.projectArr[row_id].apptData[0].address;
		$scope.apptDate = $scope.projectArr[row_id].apptData[0].apptDate;
		$scope.apptTime = $scope.projectArr[row_id].apptData[0].apptTime;
	}	
	//console.log(projectArr[row_id].apptData)
}

$scope.formatBytes = function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1000; // or 1024 for binary
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }
$scope.addFileToUploadQ = function(element) { 
        $scope.$apply(function($scope) {
          // $scope.fileArr.push(element.files);
          for(var i=0; i< element.files.length; i++){
            $scope.fileArr.push(element.files[i]);
            $scope.pendingFilesArr.push({"name":element.files[i].name,"size":$scope.formatBytes(element.files[i].size,0),"mainArrIndex":$scope.fileArr.length-1});
          }
        });
      }

$scope.removeFileFromQ = function(index,fileArrType){
        
        //TODO: Remove from fileArr also
        if(fileArrType && fileArrType===2){
          var mstrFileArrIdx = $scope.pendingDropFiles[index].mainArrIndex;
          // console.log(mstrFileArrIdx);
          $scope.pendingDropFiles.splice(index,1);
          $scope.fileArr.splice(mstrFileArrIdx,1);
        }
        else{
          var mstrFileArrIdx = $scope.pendingFilesArr[index].mainArrIndex;
          console.log(mstrFileArrIdx);
          $scope.pendingFilesArr.splice(index,1);
          $scope.fileArr.splice(mstrFileArrIdx,1);
        }
      }
  

$scope.selectPkg = function(index){
	var projectRow = $scope.projectArr[index];
	console.log(projectRow);
	var quizId = projectRow.quizData.quizId;
	var relatedStyle = projectRow.resultData;
	

	//quizResult.storeStyle(relatedStyle);

}
//Called on submit of Calendar Popup
$scope.saveAppointment = function(item){

	var isValidForm = validateFormData();
	console.log('apptDate is: '+$scope.apptDate);
	console.log('apptTime is: '+$scope.apptTime)
	if(!isValidForm){
		alert('Please enter contact and time details');
	}
	else if(isValidForm){
		var row_id = item.currentTarget.getAttribute("data-row-id");
		var quizId = $scope.projectArr[row_id].quizData.quizId;
		var customerId = $scope.projectArr[row_id].userData.id;

		if($scope.fileArr.length===0 &&	$scope.apptDate===null){
			alert('Please schedule a meeting and/or upload Floor Plan');	
		}

		else{
			var uploadLocation;
			var fileUploadedStatus = -1;
			var isApptMade = -1;
			var apptData ={};

			var date = moment($scope.apptDate);
			var time = moment($scope.apptTime);
			console.log($scope.apptTime);
			console.log(time);
			var dateComponent = date.utc().format('YYYY-MM-DD');
			var timeComponent = time.utc().format('HH:mm:ss');
			// console.log(dateComponent);
			 console.log(timeComponent);


			if($scope.fileArr && $scope.fileArr.length>0){
				var fileType = "floorPlan";
				if($scope.apptDate!=null){
					isApptMade = 1;
				}
				// mvUpload.uploadFiles($scope.fileArr,fileType,quizId).then(function(success){
				mvUpload.uploadFiles($scope.fileArr).then(function(uploadedFiles){
					
						// console.log('Floor plan uploaded');
						//uploadLocation = './customer_uploads/floorPlan/'+quizId;
					if(uploadedFiles.length>0){
						var files;
						fileUploadedStatus = 1;
						files = uploadedFiles.toString();
					}
					else {
						files = uploadedFiles;
					}

					if(isApptMade===1){
						apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
							 "person":$scope.person,"contact":$scope.contact,
							 "apptDate":dateComponent,"apptTime":timeComponent,
							 "floorPlanLoc":files,"floorPlanStatus":0,
							 "apptStatus":0};
					}
					else{
						apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
							 "person":$scope.person,"contact":$scope.contact,
							 "apptDate":null,"apptTime":null,
							 "floorPlanLoc":files,"floorPlanStatus":0,
							 "apptStatus":-1};
					}
					mvCustView.saveAppointment(apptData).then(function(success){
						if(success){
							//$scope.$emit('apptSaved',response );
							angular.element('#calendarModal').modal('hide');
							// window.location.reload(true);
							//TODO: Send email
						}
					}, function(reason){
						alert('Appointment could not be scheduled. Please contact the site admin '+reason);
					});
				},function(reason){
						alert('Files could not be upoladed. Please contact the site admin '+reason);
				});
			}

			else if ($scope.apptDate!=null){
				apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
								 "person":$scope.person,"contact":$scope.contact,
								 "apptDate":dateComponent,"apptTime":timeComponent,
								 "floorPlanLoc":'',"floorPlanStatus":-1,
								 "apptStatus":0};

				
				mvCustView.saveAppointment(apptData).then(function(success){
					if(success){
						//$scope.$emit('apptSaved',response );
						angular.element('#calendarModal').modal('hide');
					//	window.location.reload(true);
						//TODO: Send email
					}
				}, function(reason){
					alert('Appointment could not be scheduled. Please contact the site admin '+reason);
				});


			}
		}
	}
	
	// var apptDate = $scope.apptDate.toISOString().slice(0, 19).replace('T', ' ');
	// var apptTime = moment($scope.apptTime).format().toString();
}

$scope.$on('apptSaved', function(event,data){
	console.log('Event caught, data is: ');
	console.log(data);
});

// $('#calendarModal').on('hidden.bs.modal', function () {
// 	console.log('Refreshing now');
//     window.location.reload(true);
// });



//Calendar
$scope.today = function() {
    $scope.apptDate = new Date();
};
$scope.today();

$scope.clear = function() {
    $scope.apptDate = null;
    $scope.apptTime = null;
};

$scope.dateOptions = {
    minDate: new Date(),
    showWeeks: false
  };

// Time


var minTime = new Date();
minTime.setHours( 9 );
minTime.setMinutes( 0 );
$scope.min = minTime;

var maxTime = new Date();
maxTime.setHours( 18 );
maxTime.setMinutes( 0 );
$scope.max = maxTime;

$scope.apptTime = minTime;


$scope.hstep = 1;
$scope.mstep = 15;
// $scope.min = new Date();
// $scope.min.setHours(15);
// $scope.min.setMinutes(15);

$scope.timeOptions = {
    hstep: [1, 2, 3],
    mstep: [5]
};

$scope.ismeridian = true;


$scope.getFirstLook = function(index){
	
	$scope.currentFirstLook = 0;
	$scope.rowId = index;
	// var firstLookArr = $scope.projectArr[index].firstLookData;
	$scope.images = [];
	$scope.cncptObj = [];
	var concept_img;
	var concept_type;
	

	if($scope.projectArr[index].finalLookData.length>0){
		firstLookArr = $scope.projectArr[index].finalLookData;
		concept_type =2;
		$scope.lookText = "Final Look";
	}

	else if($scope.projectArr[index].firstLookData.length>0){
		firstLookArr = $scope.projectArr[index].firstLookData;
		concept_type =1;
		$scope.lookText = "First Look";
	}

	if(firstLookArr!=null && firstLookArr.length>0){
		for(var i=0;i<firstLookArr.length;i++){
			if(firstLookArr[i].files.indexOf(',')===-1){
				$scope.images.push('./uploads/'+firstLookArr[i].files);
				concept_img='./uploads/'+firstLookArr[i].files;
				$scope.cncptObj.push({concept_id:firstLookArr[i].id, concept_img:firstLookArr[i].files,concept_type:concept_type});
			}
			else{
				var tmpFileArr = firstLookArr[i].files.split(',');
				for(var j=0;j<tmpFileArr.length;j++){
					tmpFileArr[j]='./uploads/'+tmpFileArr[j];
					$scope.cncptObj.push({concept_id:firstLookArr[i].id, concept_img:tmpFileArr[j],concept_type:concept_type});
				}

				$scope.images = $scope.images.concat(tmpFileArr);

			}
		}
		//console.log($scope.cncptObj);
	}
	//console.log($scope.images);
	$scope.zoomImgSrc = $scope.images[0];
	$scope.showFeedback = true;
	$scope.showMain = false;
	console.log($scope.lookText);
}



$scope.zoomImg = function(index){
	$scope.zoomImgSrc = $scope.images[index];
	$scope.currentFirstLook = index;
	$scope.feedbackComment = $scope.feedbackArr[index];
	//console.log($scope.zoomImgSrc);
}

$scope.saveFeedback = function(){
	
	if($scope.feedbackComment===' '){
		alert('No Feedback entered');
	}
	else{
		$scope.feedbackArr[$scope.currentFirstLook] = $scope.feedbackComment;
		console.log($scope.feedbackArr);
		mvNotifier.notify('Feedback saved');
	}
}

$scope.submitFeedback = function(){

	var comments='';
	var concept_type;

	if($scope.feedbackArr.length===0){
		alert('Please save your feedback before submitting');
	}
	else{
		concept_type = $scope.cncptObj[0].concept_type;
		for(var i=0;i<$scope.feedbackArr.length;i++){
			if(typeof $scope.feedbackArr[i] != 'undefined'){
				$scope.cncptObj[i].feedback=$scope.feedbackArr[i];
			}
		}
		var cncptFeedArr = [];
		console.log($scope.cncptObj)
		for(var i =0;i<$scope.cncptObj.length;i++){
			if('feedback' in $scope.cncptObj[i]){
				cncptFeedArr.push({status:0, comments: $scope.cncptObj[i].feedback, created_at:null, updated_at:null,concept_id:$scope.cncptObj[i].concept_id});
			}
		}
		console.log('cncptFeedArr is: ');
		console.log(cncptFeedArr);

		mvCustView.submitFeedback(cncptFeedArr,concept_type).then(function(response){
			if(response){
				mvNotifier.notify('Feedback submitted');
				// $location.path('/dashboard');
				window.location.reload(true);
			}
			else{
				mvNotifier.notify('Error in saving feedback. Please try again');	
			}

		}, function(reason){
			console.log('Cant save feedback: '+reason);
			mvNotifier.notify('Error in saving feedback. Please try again: '+reason);
			//Close popup
		});
	}
}

})

.directive('datepickerPopup', function (){
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, element, attr, controller) {
      //remove the default formatter from the input directive to prevent conflict
      //controller.$formatters.shift();
      ngModel.$parsers.push(function toModel(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
 	 });
	}
	}
});

// angular.module('myApp')
//     .directive('uibDatepickerPopup', function (){
//         return {
//             restrict: 'EAC',
//             require: 'ngModel',
//             link: function(scope, elem, attrs, ngModel) {
//                 ngModel.$parsers.push(function toModel(date) {
//                     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
//                 });
//             }
//         }
//     });



