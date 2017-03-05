angular.module('app').controller('UserListCtrl', function($scope,$http,$routeParams,mvIdentity,mvUser, mvAdminView,payment,mvUpload,mvNotifier){
	$scope.users = mvUser.query();
	$scope.packages = payment.getPackages();
	$scope.showListing = true;
	$scope.showDetail = false;

	$scope.showCustDetails = false;
	$scope.showQuizDetails = false;
	$scope.showPkgDetails = false;
	$scope.showProgressDetails = false;
	$scope.showApptDetails = false;
	$scope.showConceptDetails = false;
	$scope.showFinalLook = false;
	$scope.showShoppingList = false;
	$scope.projects = [];
	$scope.fileArr = [];
	$scope.pendingFilesArr = [];

	$scope.styles=['','Classic','Contemporary','Transitional','Modern','Scandinavian','Asian Inspired Minimalist'];
	$scope.packageName=[' ','Simple','Classic','Premium','Custom'];
	$scope.quizStatus=['Active','Launched'];
	$scope.apptStatus=['Scheduled/Uploaded. Awaiting Admin Action','Approved','','Rejected'];

function resetTabs() {
	$scope.showCustDetails = false;
	$scope.showQuizDetails = false;
	$scope.showApptDetails = false;
	$scope.showConceptDetails = false;
	$scope.showProgressDetails = false;
	$scope.showFinalLook  = false;
	$scope.showShoppingList = false;
}

function chkFinalPrjStatus(shoppingList, paymentInfo){
	
	var totalPrice=0;
	var amountPaid = 0;
	var finalStatus = {};
	for(var i =0;i<paymentInfo.length;i++){
		totalPrice = totalPrice + paymentInfo[i].totalPrice;
		amountPaid = amountPaid + paymentInfo[i].amountPaid;
	}

	if(shoppingList.length>0){
		if(totalPrice === amountPaid){
			finalStatus.statusText='Total Payment Received. Project Completed';
			finalStatus.linkPage='getFirstLook()';
			finalStatus.modal=' ';
		}
		else{
			finalStatus.statusText='Final Look/ Shopping List is ready. Final Payment Pending';
			finalStatus.linkPage=' ';
			finalStatus.modal=' ';
		}
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
	
	return finalStatus;
}

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
	}
	return finalStatus;
}

function chkCncptStatus(conceptBoard){
	
	for(var i =0;i<conceptBoard.length;i++){
		var currConceptData = conceptBoard[i];
		var status = currConceptData.status;
		var finalStatus = {};
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
 		 var currApptData = projectData[i].apptData;
 		 var currConceptBoard = projectData[i].conceptData;
 		 var currFinalLook = projectData[i].finalLookData;
 		 var currShoppingList = projectData[i].shoppingList;
 		 var currPaymentList = projectData[i].paymentData;

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

 				if(currShoppingList && currShoppingList.length>0){
	 				status = chkFinalPrjStatus(currShoppingList,currPaymentList);
	 			}

 				else if(currFinalLook && currFinalLook.length>0){
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
 	
//Get customer projects from DB.
$scope.getProjectListing = function(){
	mvAdminView.getProjectListing().then(function(projectData){
	console.log('Result got back is: ');
	console.log(projectData);
	populateStatus(projectData);
	$scope.projects = projectData;
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
			for(var j=0;j<floorPlans.length;j++){
				floorPlans[j] = './uploads/'+floorPlans[j];
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

	for(var i =0;i<$scope.prjDetails.shoppingList.length;i++){
		$scope.prjDetails.shoppingList[i].files = './uploads/'+$scope.prjDetails.shoppingList[i].files;
	}


	var quizDtls = $scope.prjDetails.quizDtls;
	for(var i =0;i<quizDtls.length;i++){
		var files = quizDtls[i].file1;
		if(files!=null){
			var uploadedFiles = files.split(',');
			for(var j=0;j<uploadedFiles.length;j++){
				uploadedFiles[j] = './uploads/'+uploadedFiles[j];
			}
			quizDtls[i].file1 =uploadedFiles;
			
		}
	}
	var colours = [];
	for(var i =0;i<$scope.prjDetails.quizDtls.length;i++){

		colours = $scope.prjDetails.quizDtls[i].colours.split(',');
		$scope.prjDetails.quizDtls[i].colours = colours;
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
		$scope.showShoppingList = true;
	}
	return;
}

$scope.toggleMainView = function(){
	$scope.showDetail = !$scope.showDetail;
	$scope.showListing = !$scope.showListing
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
		mvNotifier.notify('Error in modifying appointment data: ');
		mvNotifier.notify(reason);
	});
}

function formatBytes(bytes,decimals) {
	if(bytes == 0) return '0 Byte';
	var k = 1000; // or 1024 for binary
	var dm = decimals + 1 || 3;
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	var i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

$scope.addFileToUploadQ = function(element) { 
	$scope.$apply(function($scope) {
	  for(var i=0; i< element.files.length; i++){
	    $scope.fileArr.push(element.files[i]);
	    $scope.pendingFilesArr.push({"name":element.files[i].name,"size":formatBytes(element.files[i].size,0),"mainArrIndex":$scope.fileArr.length-1});
	  }
	});
}

$scope.removeFileFromQ = function(index){
      var mstrFileArrIdx = $scope.pendingDropFiles[index].mainArrIndex;
      $scope.pendingDropFiles.splice(index,1);
      $scope.fileArr.splice(mstrFileArrIdx,1);
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
				resetTabs();
				$scope.showListing = true;

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




