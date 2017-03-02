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
	$scope.showApptDetails = false;
	$scope.showConceptDetails = false;
	$scope.showFinalLook = false;
	$scope.showShoppingDetails = false;

	$scope.projects = [];

	$scope.fileArr = [];
$scope.pendingFilesArr = [];

$scope.styles=['','Classic','Contemporary','Transitional','Modern','Scandinavian','Asian Inspired Minimalist'];
$scope.packageName=[' ','Simple','Classic','Premium','Custom'];
$scope.quizStatus=['Active','Launched'];
$scope.apptStatus=['Scheduled/Uploaded. Awaiting Admin Action','Approved','','Rejected'];

function chkFinalLookStatus(conceptBoard){
	
	for(var i =0;i<conceptBoard.length;i++){
		var currConceptData = conceptBoard[i];
		var status = currConceptData.status;
		var finalStatus = {};


//Admin actions: Upload first look, upload Final Look(2), mark final + shopping as ready(3), 
//upload Final + shopping
		
			if(currConceptData.feedbackData.length>0){
				finalStatus.statusText='Received Feedback. Awaiting Final Look + Shopping List';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=3;
				break;
			}
			else{
				finalStatus.statusText='Awaiting Feedback on Final Look';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=-1;
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
			

		/*else if(isFinalLook===1){
			
			if('feedbackData' in currConceptData){
				finalStatus.statusText='Received Feedback. Your Final Look and Shopping List will be ready soon.';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=3;
				break;
			}
			else{
				finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='';
				finalStatus.modal=' ';
			}



			// if(status===0){
			// 	finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
			// 	finalStatus.linkPage='';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===1){
			// 	finalStatus.statusText='Feedback Received. Your Final Look and Shopping List will be ready soon.';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===2){
			// 	finalStatus.statusText='Final Look/ Shopping List is ready. Payment Pending';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===3){
			// 	finalStatus.statusText='Total Payment Received. View Final Look + Shopping List';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// } 
		}*/
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


//Admin actions: Upload first look, upload Final Look(2), mark final + shopping as ready(3), 
//upload Final + shopping
		
			if(currConceptData.feedbackData.length>0){
				finalStatus.statusText='Received Feedback. Awaiting Final Look';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=2;
				break;
			}
			else{
				finalStatus.statusText='Awaiting Feedback on First Look';
				finalStatus.linkPage='getFirstLook($index)';
				finalStatus.modal=' ';
				finalStatus.stage=-1;
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
			

		/*else if(isFinalLook===1){
			
			if('feedbackData' in currConceptData){
				finalStatus.statusText='Received Feedback. Your Final Look and Shopping List will be ready soon.';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=3;
				break;
			}
			else{
				finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
				finalStatus.linkPage='';
				finalStatus.modal=' ';
			}



			// if(status===0){
			// 	finalStatus.statusText='Final Look Uploaded. Awaiting Feedback';
			// 	finalStatus.linkPage='';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===1){
			// 	finalStatus.statusText='Feedback Received. Your Final Look and Shopping List will be ready soon.';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===2){
			// 	finalStatus.statusText='Final Look/ Shopping List is ready. Payment Pending';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// }
			// else if(status===3){
			// 	finalStatus.statusText='Total Payment Received. View Final Look + Shopping List';
			// 	finalStatus.linkPage=' ';
			// 	finalStatus.modal=' ';
			// } 
		}*/
	}
	return finalStatus;
}

function chkApptStatus(apptData){
	//Appt made and/or Floor Plan fileUploadedStatus.
	var status = {};
	if(apptData.apptStatus===0){
		//Appt Scheduled. Check if in future>=24 hrs ahead 
		var apptDate = moment(apptData.apptDate);
		var msDiff = apptDate.diff(moment(new Date(),"DD/MM/YYYY HH:mm:ss"));
		var dayDiff = moment.duration(msDiff);
		var hourDiff = Math.floor(dayDiff.asHours());

		if(hourDiff >=24){
			status.statusText = "Meeting Scheduled.";
			status.linkPage = " ";
			status.modal = " ";
			status.stage=-1;
		}
		else if(hourDiff < 0){
			status.statusText = "Meeting done. Pending First Look";
			status.linkPage = " ";
			status.modal = " ";
			status.stage=1;
		}
	}
	else if(apptData.floorPlanStatus>=0){
		if(apptData.floorPlanStatus==0){
			status.statusText = "Floor Plan uploaded. Pending Approval";
			status.linkPage = " ";
			status.modal = " ";
			status.stage=-1;
		}
		else if(apptData.floorPlanStatus==1){
			status.statusText = "Floor Plan Approved. Pending First Look";
			status.linkPage = " ";
			status.modal = " ";
			status.stage=1;
		}
	}
	else{
		status.statusText = "Pending Meet and Measure";
		status.linkPage = " ";
		status.modal = " ";
		status.stage=-1;
	}
	return status;
}

function populateStatus(projectData){
 
 	for(var i = 0;i<projectData.length;i++){
 		// var currRowData = projectData[i];
 		// var currQzData = currRowData.quizData[0];
 		 var currApptData = projectData[i].apptData;
 		 var currConceptBoard = projectData[i].conceptData;
 		 var currFinalLook = projectData[i].finalLookData;
 		// var currQzId = currQzData.quizId;
 		// var status = {};

 		//Array of quizes belong to a user
 		var quizData = projectData[i].quizData;

 		for(var j=0;j<quizData.length;j++){
 			var status={};

 			if(quizData[j].status===1){
 				status.statusText = "Project Completed.";
				status.linkPage = " ";
				status.modal = " ";
				status.action=-1;
 			}
 			else if(quizData[j].status===-1){
 				status.statusText = "Payment Pending";
				status.linkPage = " ";
				status.modal = " ";
				status.action=-1;
 			}
 			else if(quizData[j].status===0){

 				if(currFinalLook && currFinalLook.length>0){
	 				status = chkFinalLookStatus(currFinalLook);
	 			}

 				else if(currConceptBoard && currConceptBoard.length>0){
	 				status = chkCncptStatus(currConceptBoard);
	 			}
	 			else if(currApptData && currApptData.length>0){
	 				var apptFound = false;
	 				for(var k=0;k<currApptData.length;k++){
	 					if(currApptData[k].quizId===quizData[j].quizId){
	 						apptFound=true;
	 						status = chkApptStatus(currApptData[k]);
	 						break;
	 					}
	 				}
	 				if(!apptFound){
	 					status.statusText = "Pending Meet and Measure";
						status.linkPage = " ";
						status.modal = " ";
						status.action=-1;
	 				}
	 				
	 			}
	 			else{
	 				status.statusText = "Pending Meet and Measure";
					status.linkPage = " ";
					status.modal = " ";
					status.action=-1;
	 			}
 			} 
			quizData[j].displayStatus = status;
 		}


 	}
 }
 	/*for(var j = i+1; j<projectData.length;j++){
 		if(projectData[j].quizData.quizId === currQzId){
 			projectData[j].status = projectData[i].status;
 		}
 	}
 }

/*
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
	populateStatus(projectData);
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
			var floorPlans = floorPlanLoc.split(',');
			console.log('florrplans is');
			console.log(floorPlans);
			for(var j=0;j<floorPlans.length;j++){
				floorPlans[j] = './uploads/'+floorPlans[j];
				//apptData[i].floorPlanFiles = './uploads/'+apptData[i].floorPlanLoc;	
			}
			apptData[i].floorPlanFiles =floorPlans;
			
		}
	}
	
	for(var i =0;i<$scope.prjDetails.conceptData.length;i++){
		$scope.prjDetails.conceptData[i].files = './uploads/'+$scope.prjDetails.conceptData[i].files;
	}

	for(var i =0;i<$scope.prjDetails.finalLookData.length;i++){
		$scope.prjDetails.finalLookData[i].files = './uploads/'+$scope.prjDetails.finalLookData[i].files;
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
	else if(tab===5){
		$scope.showApptDetails = true;
	}
	else if(tab===6){
		$scope.showConceptDetails = true;
	}
	else if(tab===7){
		$scope.showFinalLook = true;
	}
	else if(tab===8){
		$scope.showShoppingDetails = true;
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
	$scope.showApptDetails = false;
	$scope.showConceptDetails = false;
	$scope.showProgressDetails = false;
	$scope.showFinalLook  = false;
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

$scope.submitData = function(quizId, filetype, roomName){

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
			mvAdminView.saveUploadedData(quizId,filetype,files).then(function(success){
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




