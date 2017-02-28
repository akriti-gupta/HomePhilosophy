angular.module('app').controller('UserListCtrl', function($scope,$http,$routeParams,mvIdentity,mvUser, mvAdminView,payment,mvUpload,mvNotifier){
	$scope.users = mvUser.query();
	$scope.packages = payment.getPackages();
	$scope.showListing = true;
	$scope.showDetail = false;

	$scope.showCustDetails = false;
	$scope.showQuizDetails = false;
	$scope.showRoomDetails = false;
	$scope.showPkgDetails = false;
	$scope.showProgressDetails = false;

	$scope.doUploadFirst = false;
	$scope.doUploadFinal = true;
	$scope.doUploadShopping = true;

	$scope.projects = [];

	$scope.fileArr = [];
$scope.pendingFilesArr = [];

$scope.styles=['','Classic','Contemporary','Transitional','Modern','Scandinavian','Asian Inspired Minimalist'];
$scope.packageName=[' ','Simple','Classic','Premium','Custom'];
$scope.quizStatus=['Active','Launched'];
$scope.apptStatus=['Scheduled/Uploaded. Awaiting Admin Action','Approved','','Rejected'];
/*function chkCncptStatus(conceptBoard){
	
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

function formatProjectList(projectData){
 	var prjArr = [];
	for(var i = 0; i<projectData.quizData.length ; i++){
			var currQzObj = projectData.quizData[i];
			var currQzId = currQzObj.quizId;
			var currQzUser = currQzObj.customerId;
			var relPkgArr = [];
			var relRoomArr = [];
			var relResultArr = [];
			var relImgArr = [];
			var relApptArr = [];
			var relFLArr = [];
			var relFeedbackArr = [];
			var statusArr = [];
			
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

			if(projectData.imgData && projectData.imgData.length>0){
				for(var j= 0;j<projectData.imgData.length; j++){
					if(projectData.imgData[j].quizId === currQzId){
						relImgArr.push(projectData.imgData[j]);
					}
				}
			}

			if(projectData.apptData && projectData.apptData.length>0){
				for(var j= 0;j<projectData.apptData.length; j++){
					if(projectData.apptData[j].quizId === currQzId){
						relApptArr.push(projectData.apptData[j]);
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

			for(var j = 0;j<relPkgArr.length; j++){
				var roomDispName = relPkgArr[j].roomName;
				var currRoomName;
				if(roomDispName.indexOf(' ')!=-1){
					currRoomName = roomDispName.substr(0,roomDispName.indexOf(' '));
				}
				else{
					currRoomName = roomDispName
				}
				
				
				prjArr.push({'quizData':currQzObj,'roomData':currRoomName,
					'pkgData':relPkgArr[j],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,
					'feedbackData':relFeedbackArr});
		
			}
		}

		console.log('prjArr is:' );
		console.log(prjArr);
		
		//populateStatus(userPrjList);
//		populateStatus(prjArr);

		var userPrjList = [];
		if(prjArr!=null && prjArr.length>0){
			for(var i = 0; i<projectData.userData.length ; i++){
				var tmpList = [];
				var customerId = projectData.userData[i].id;
				for(var j = 0; j<prjArr.length;j++){
					if(prjArr[j].quizData.customerId===customerId){
						tmpList.push(prjArr[i]);
					}
				}
				userPrjList.push({userData:projectData.userData[i], projectData:tmpList});
			}
		}

		$scope.projects = userPrjList;

		
} */
//Get customer projects from DB.
$scope.getProjectListing = function(){
	mvAdminView.getProjectListing().then(function(projectData){
	console.log('Result got back is: ');
	console.log(projectData);

	$scope.projects = projectData;

	// if(projectData!=null){
	// 	formatProjectList(projectData);
	// }
	// console.log('Formatted Result :');
	// console.log($scope.projects);

	

	}, function(reason){
		alert('Error in fetching user data' +reason);
		$location.path="/";
	});
}



$scope.details = function(index,tabIdx){

	
	$scope.toggleMainView();
	$scope.toggleTab(tabIdx);
	
	//Customer name clicked. 
	$scope.prjDetails = $scope.projects[index];
	
	
	console.log('$scope.prjDetails is:');
	console.log($scope.prjDetails);
	
	var apptData = $scope.prjDetails.apptData;
	for(var i =0;i<apptData.length;i++){
		var floorPlanLoc = apptData[i].floorPlanLoc;
		if(floorPlanLoc!=null){
			var data = {folder:floorPlanLoc};
			mvAdminView.fetchImages(data).then(function(response){
				console.log(response);
			},function(reason){
				console.log('Could not fetch floor plan for '+reason);
			});
		}
	}

	
}

$scope.toggleTab = function(tab){
	resetTabs();
	if(tab===1){
		$scope.showCustDetails = true;
	}
	else if(tab===2){
		$scope.showQuizDetails = true;
	}
	else if(tab===3){
		$scope.showRoomPkgDetails = true;
	}
	// else if(tab===4){
	// 	$scope.showPkgDetails = true;
	// }
	else if(tab===4){
		$scope.showProgressDetails = true;
	}
}

$scope.toggleMainView = function(){
	$scope.showDetail = !$scope.showDetail;
	$scope.showListing = !$scope.showListing
}

function resetTabs(){
	$scope.showCustDetails = false;
	$scope.showQuizDetails = false;
	$scope.showRoomPkgDetails = false;
	//$scope.showPkgDetails = false;
	$scope.showProgressDetails = false;
}

$scope.actionUsrData = function(quizId,action){
	console.log('actionUsrData, quizId is: '+quizId);
	console.log('actionUsrData, action is: '+action);
	var data ={'quizId':quizId};
	var action;
	if(action===1){
		data.status = 1;
		data.action = 1;
	}
	else if (action===2){
		data.status = 3;
		data.action = 1;
	}
	else if (action===3){
		data.status = 1;
		data.action = 2;
	}
	else if (action===4){
		data.status = 3;
		data.action = 2;
	}
	console.log(data);
	mvAdminView.modifyUsrAppt(data).then(function(success){
		if(success){
			mvNotifier.notify('Data modified successfully');
		}
	},function(reason){
		console.log('Error in modifying appointment data: ');
		console.log(reason);
	});
}

function setCurrentStatus(quizStatus,pkgStatus,apptStatus,floorPlanStatus, apptDate){
	var status="";
	console.log('In setCurrentStatus, quizStatus: '+quizStatus);
	console.log('In setCurrentStatus, pkgStatus: '+pkgStatus);
	console.log('In setCurrentStatus, apptStatus: '+apptStatus);
	console.log(moment(apptDate).format('MM/DD/YYYY') >= moment().format('MM/DD/YYYY'));
	console.log(moment(apptDate).format('MM/DD/YYYY') < moment().format('MM/DD/YYYY'));

	if(quizStatus===0 && pkgStatus === 1){
		if(apptStatus!=0){
			status = "Waiting for Customer to schedule an appointment.";
		}

		else if(apptStatus===0  && (moment(apptDate).format('MM/DD/YYYY') >= moment().format('MM/DD/YYYY'))){ 
			if(floorPlanStatus===-1){
				status = "Appointment scheduled on apptDate";
			}
			else{
				status = "Floor Plan Uploaded and appointment scheduled on apptDate."
			}
		}
		else if(apptStatus===0  && (moment(apptDate).format('MM/DD/YYYY') < moment().format('MM/DD/YYYY'))) { 
			console.log('In here');
			status = "First Look Pending";

		}
	}
	return status;
}

$scope.isApptDue = function(apptDate){
	if(moment(apptDate).format('MM/DD/YYYY') >= moment().format('MM/DD/YYYY')){
		
		return 1;
	}
	else{ 
		
		return 0;

	}
}
$scope.addFileToUploadQ = function(element) { 
        $scope.$apply(function($scope) {
          // $scope.fileArr.push(element.files);
          for(var i=0; i< element.files.length; i++){
            $scope.fileArr.push(element.files[i]);
            //$scope.pendingFilesArr.push({"name":element.files[i].name,"size":$scope.formatBytes(element.files[i].size,0),"mainArrIndex":$scope.fileArr.length-1});
          }
        });
      }

$scope.submitData = function(quizId, roomName){
	var stage;
	if(! $scope.doUploadFirst)
	 	stage = 1;

	else if(! $scope.doUploadFinal)
	 	stage = 2;

	else if(! $scope.doUploadShopping)
	 	stage = 3;


	if($scope.fileArr.length>0){
		mvUpload.uploadFiles($scope.fileArr).then(function(response){
			console.log('In ctrl, response is: ');
			console.log(response);
			var files;
			if(response.length>0){
				files = response.toString();
			}	
			else {
				files = response;
			}
		
		
		/*var firstLookData = {'customerId', 'quizId':quizId,'folderLocation':location,'roomName':roomName,'status':1,'feedback_id':null}
			//Save in DB.
			mvAdminView.saveFirstLook(firstLookData).then(function(response){
				console.log(response);
				if(response){
					mvNotifier.notify('First Look saved');
				}
				else{
					mvNotifier.notify('First Look could not be saved. Please contact the site administrator');	
				}

			}, function(resaon){
				console.log('Cant save appointment');
				mvNotifier.notify('Appointment could not be scheduled. Please contact the site administrator');
				//Close popup
			});*/
			mvAdminView.saveConceptBoard(quizId,stage,files).then(function(success){
				mvNotifier.notify('Data saved');
			}, function(reason){
				alert('Data not saved: '+reason);
				mvNotifier.notify('Data not saved: '+reason);
			});
		
		}, function(reason){
				alert('Data not saved. Error in File Upload: '+reason);
				mvNotifier.notify('Data not saved. Error in File Upload: '+reason);
			});
	}
}
 

});




