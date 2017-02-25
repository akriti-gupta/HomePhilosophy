angular.module("app")
		  .controller("CustViewController",function($scope,$location,$http,$filter,quizResult,payment,mvIdentity,mvNotifier,mvUpload, mvCustView,custView){
		  		
		  	

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

// $scope.packages = [
//   						{'id':1,'name':"Simple",'pkgValue':350,value:1},
//   					    {'id':2,'name':"Classic",'pkgValue':600,value:2},
//   					    {'id':3,'name':"Premium",'pkgValue':1000,value:3},
//   					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
//   				  ];

$scope.packageName=[' ','Simple','Classic','Premium','Custom'];

$scope.roomImage ={};

$scope.roomImage["Bedroom"] = "images/rooms/bedroom.png";
$scope.roomImage["Dining Room"] = "images/rooms/dining.png";
$scope.roomImage["Master Room"] = "images/rooms/master.png";
$scope.roomImage["Living Room"] = "images/rooms/living.png";
$scope.roomImage["Home Office"] = "images/rooms/homeOffice.png";
$scope.roomImage["Kids Room"] = "images/rooms/kids.png";

/*function checkFeedbackStatus(feedbackData){
	for(var i =0;i<feedbackData.length;i++){
		var currFeedbackData = feedbackData[i];
		var status = {'statusText': 'Final Look in Progress'
	 				status.linkPage = " ";
	 				status.modal = "#calendarModal";
	}
}*/

function validateFormData(){
	if($scope.apptDate!=null){
		if($scope.contact===' ' || $scope.address === ' ' || $scope.person === ' ' || $scope.apptTime===null)
			return false;
	}
	return true;
}

function chkCncptStatus(conceptBoard){
	
	var currConceptData = conceptBoard[0];
	var status = currConceptData.status;
	var isFirstLook = currConceptData.isFirstLook;
	var isFinalLook = currConceptData.isFinalLook;
	var finalStatus = {};

	if(isFirstLook===1){
		//Check if this is the Final Look as well, in case user liked the first images.
		if(isFinalLook===1){
			if(status===2){
				finalStatus.statusText='Final Look/ Shopping List is ready. Payment Pending';
				finalStatus.linkPage=' ';
 				finalStatus.modal=' ';
			}
			else if(status===3){
				finalStatus.statusText='Total Payment Received. View Final Look + Shopping List';
				finalStatus.linkPage=' ';
 				finalStatus.modal=' ';
			}
		}
		else{
			if(status===0){
				finalStatus.statusText='First Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage=' ';
 				finalStatus.modal=' ';
			}
			else if(status===1){
				finalStatus.statusText='Received Feedback. Final Look in Progress';
				finalStatus.linkPage=' ';
 				finalStatus.modal=' ';
			}
		}
	}

	else if(isFinalLook===1){
		if(status===0){
			finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
			finalStatus.linkPage=' ';
			finalStatus.modal=' ';
		}
		else if(status===1){
			finalStatus.statusText='Your Final Look and Shopping List will be ready soon.';
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
		}
	}
	return finalStatus;
}

function chkApptStatus(apptData){
	//Appt made and/or Floor Plan fileUploadedStatus.
	var status = {};
	if(apptData.apptStatus==0){
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
	else if(apptData.floorPlanStatus>=0){
		if(apptData.floorPlanStatus==0){
			status.statusText = "Floor Plan uploaded. Pending Approval";
			status.linkPage = " ";
			status.modal = " ";
		}
		else if(apptData.floorPlanStatus==1){
			status.statusText = "Floor Plan Approved. Pending First Look";
			status.linkPage = " ";
			status.modal = " ";
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
 		var currQzId = currQzData.quizId;
 		var status = {};

 		if(!("status" in currRowData)){
	 		if(currQzData.status>=0){
	 			//Payment Made. Check in decreasing order from feedback to FirstLook to  appt etc

	 			if(currConceptBoard && currConceptBoard.length>0){
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
 	var tmpPrjArr = [];
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
			var relFeedbackArr = [];
			var statusArr = [];

			if(!($scope.hasActiveProject)){
				if(currQzObj.status===0){
					$scope.hasActiveProject = true;
				}
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

						if(projectData.feedbackData && projectData.feedbackData.length>0){
							for(var k= 0;k<projectData.feedbackData.length; k++){
								if(projectData.feedbackData[k].firstlook_id === projectData.firstLookData[j].id){
									relFeedbackArr.push(projectData.feedbackData[k]);
								}
							}
						}
					}
				}
			} //First Look ends

			//

			for(var j = 0;j<relRoomArr.length; j++){
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
			}
			tmpPrjArr.push({'userData':userData,'quizData':currQzObj,'roomData':relRoomArr,'pkgData':relPkgArr,
				'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,
				'feedbackData':relFeedbackArr});

		}// Outermost For loop iterating over unique cust quiz

		//prjArr now contain room wise data.
		populateStatus(prjArr);
		$scope.projectArr = prjArr;

	}
 }

//Get customer projects from DB.
mvCustView.getCustProjectInfo().then(function(projectData){
	console.log('Result got back is: ');
	console.log(projectData);

	//$scope.projectArr=[];
	populateQuizArray(projectData);
	console.log('Formatted Result :');
	console.log($scope.projectArr);

	

	}, function(reason){
		console.log('Cant find user Data');
		mvNotifier.notify('Please try again later/ contact the site administrator. '+reason);
		$location.path="/";
	});


$scope.loadMtngData=function(row_id){
	if($scope.projectArr[row_id].apptData && $scope.projectArr[row_id].apptData[0].person!=' '){
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
				mvUpload.uploadFiles($scope.fileArr,fileType,quizId).then(function(success){
					if(success){
						// console.log('Floor plan uploaded');
						uploadLocation = './customer_uploads/floorPlan/'+quizId;
						fileUploadedStatus = 1;

						if(isApptMade===1){
							apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
								 "person":$scope.person,"contact":$scope.contact,
								 "apptDate":dateComponent,"apptTime":timeComponent,
								 "floorPlanLoc":uploadLocation,"floorPlanStatus":0,
								 "apptStatus":0};
						}
						else{
							apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
								 "person":$scope.person,"contact":$scope.contact,
								 "apptDate":null,"apptTime":null,
								 "floorPlanLoc":uploadLocation,"floorPlanStatus":0,
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
					}
					else{
						console.log('Error in uploading floor plan. Please try again');
					}
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
	console.log('In getFirstLook');
	console.log($scope.projects[index].firstLookStatus);
	console.log($scope.projects[index].folderLocation);
	var folderLocation = $scope.projects[index].folderLocation;
	$scope.images = [];
	if(folderLocation.indexOf(',')!=-1){
		$scope.images = folderLocation.split(",");

	}
	for(var i =0;i<$scope.images.length;i++){
		$scope.images[i] = $scope.images[i].substr(9);
		console.log($scope.images[i]);
	}
	console.log($scope.images);
	console.log($scope.images[0]);
	$scope.zoomImgSrc = $scope.images[0];
	$scope.showFeedback = true;
$scope.showMain = false;

}



$scope.zoomImg = function(index){
	$scope.zoomImgSrc = $scope.images[index];
	$scope.currentFirstLook = index;
	$scope.feedbackComment = $scope.feedbackArr[index];
	console.log($scope.zoomImgSrc);
}

$scope.saveFeedback = function(){
	
	$scope.feedbackArr[$scope.currentFirstLook] = $scope.feedbackComment;
	console.log($scope.feedbackArr);
	mvNotifier.notify('Feedback saved');
}

$scope.submitFeedback = function(){
	var comments = $scope.feedbackArr[0];
	for(var i=1;i<$scope.feedbackArr.length;i++){
		comments = comments+"UserFeedback"+$scope.feedbackArr[i];
	}
	console.log($scope.projects[$scope.rowId].firstLookId);

	var feedBackData={'status':1,'comments':comments}
	mvCustView.submitFeedack(feedBackData,$scope.projects[$scope.rowId].firstLookId).then(function(response){
		
		if(response){
			mvNotifier.notify('Feedback saved');
			$location.path('/dashboard');
		}
		else{
			mvNotifier.notify('Error in saving feedback. Please try again');	
		}

	}, function(resaon){
		console.log('Cant save feedback');
		mvNotifier.notify('Error in saving feedback. Please try again');
		//Close popup
	});
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



