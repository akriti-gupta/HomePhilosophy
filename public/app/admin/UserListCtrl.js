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

function chkFinalPrjStatus(shoppingList, roomId){
	
	// var totalPrice=0;
	// var amountPaid = 0;
	var finalStatus = {};
	// for(var i =0;i<paymentInfo.length;i++){
	// 	totalPrice = totalPrice + paymentInfo[i].totalPrice;
	// 	amountPaid = amountPaid + paymentInfo[i].amountPaid;
	// }
	for(var i =0;i<shoppingList.length;i++){
		if(shoppingList[i].roomId === roomId){
			finalStatus.statusText='Project Completed.';
			finalStatus.linkPage='getFirstLook()';
			finalStatus.modal=' ';
			break;
		}
	}
	/*if(shoppingList.length>0){
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
	}*/
	return finalStatus;
}

function chkFinalLookStatus(conceptBoard, pkgId,roomId){
	
	for(var i =0;i<conceptBoard.length;i++){
		if(conceptBoard[i].roomId === roomId){
			var currConceptData = conceptBoard[i];
			var status = currConceptData.status;
			var finalStatus = {};
			//Admin actions: Upload first look, upload Final Look(2), mark final + shopping as ready(3), 
			//upload Final + shopping
			if(pkgId>2){
				if(currConceptData.feedbackData.length>0){
					finalStatus.statusText='Received Feedback. Awaiting Final Look + Shopping List';
					finalStatus.linkPage=' ';
					finalStatus.modal=' ';
					finalStatus.stage=4;
					break;
				}
				else{
					finalStatus.statusText='Awaiting Feedback on Final Look';
					finalStatus.linkPage=' ';
					finalStatus.modal=' ';
					finalStatus.stage=-1;
				}
			}
			else{
				finalStatus.statusText='Final Look and Shopping List Uplaoded. Project Completed.';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				finalStatus.stage=-1;
			}
			break;
		}
	}
	return finalStatus;
}

function chkCncptStatus(conceptBoard,roomId,pkgId){
	
	for(var i =0;i<conceptBoard.length;i++){
		var finalStatus = {};
		if(conceptBoard[i].roomId === roomId){
			var currConceptData = conceptBoard[i];
			var status = currConceptData.status;

			if(currConceptData.feedbackData.length>0){
				if(pkgId <= 2){
					finalStatus.statusText='Received Feedback. Awaiting Final Look and Shopping List';	
					finalStatus.stage=4;
				}
				else{
					finalStatus.statusText='Received Feedback. Awaiting Final Look';	
					finalStatus.stage=2;
				}
				
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
				
				break;
			}
			else{
				finalStatus.statusText='Awaiting Feedback on First Look';
				finalStatus.linkPage='getFirstLook($index)';
				finalStatus.modal=' ';
				finalStatus.stage=-1;
			}
			break;
		}
	}
	return finalStatus;
}

function chkApptStatus(apptData, roomId){
	//Appt made and/or Floor Plan fileUploadedStatus.
	var status = {};
	
		if(apptData.apptStatus>=0){
			if(apptData.apptStatus===0){
				//Appt Scheduled. Check if in future>=24 hrs ahead 
				var apptDate = moment(new Date(apptData.apptDate));

				var msDiff = apptDate.diff(moment(new Date(),"DD/MM/YYYY HH:mm:ss"));
				var dayDiff = moment.duration(msDiff);
				var hourDiff = Math.floor(dayDiff.asHours());

				if(hourDiff >=0){
					status.statusText = "Meeting Scheduled.";
					status.linkPage = " ";
					status.modal = " ";
					status.stage=-1;
				}
				else if(hourDiff < 0 || apptData.apptStatus===1){
					status.statusText = "Meeting done. Pending First Look";
					status.linkPage = " ";
					status.modal = " ";
					status.stage=1;
				}
			}
			else if(apptData.apptStatus===3){
					status.statusText = "Rejected. Awaiting Reschedule.";
					status.linkPage = " ";
					status.modal = " ";
					status.stage=-1;
				}
		}
		else if(apptData.floorPlanStatus>=0){
			if(apptData.roomId === roomId){
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

				else if(apptData.floorPlanStatus==3){
					status.statusText = "Floor Plan Rejected.";
					status.linkPage = " ";
					status.modal = " ";
					status.stage=-1;
				}
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
 		 var currRoomData = projectData[i].roomData;
 		 var currPkgData = projectData[i].pkgData; 

 		//Array of quizes belong to a user
 		var quizData = projectData[i].quizData;

 		for(var j=0;j<quizData.length;j++){
 			var status={};

 			if(quizData[j].status===1){
 				status.statusText = "Project Completed.";
				status.linkPage = " ";
				status.modal = " ";
				status.action=-1;
				status.stage=-1;
				for(var k =0; k < currRoomData.length;k++){
					if(currRoomData[k].quizId === quizData[j].quizId){
						projectData[i].roomData[k].displayStatus = status;
					}
				}

				quizData[j].displayStatus = status;
 			}
 			else if(quizData[j].status===-1){
 				status.statusText = "Payment Pending";
				status.linkPage = " ";
				status.modal = " ";
				status.action=-1;
				quizData[j].displayStatus = status;
				for(var k =0; k < currRoomData.length;k++){
					if(currRoomData[k].quizId === quizData[j].quizId){
						projectData[i].roomData[k].displayStatus = status;
					}
				}
 			}
 			else if(quizData[j].status===0){

 				//populateRoomStatus(currRoomData,currApptData);

 				for(var k =0; k < currRoomData.length;k++){
 					if(currRoomData[k].quizId === quizData[j].quizId){
	 					var roomStatus ={};
	 					var pkgId = 1;
	 					var apptFound = false;
						for(var l=0;l<currPkgData.length;l++){
							if(currPkgData[l].roomId === projectData[i].roomData[k].id){
								pkgId = currPkgData[l].pkgId;
								break;
							}
						}
						
						if(currShoppingList && currShoppingList.length>0){
		 					roomStatus = chkFinalPrjStatus(currShoppingList,projectData[i].roomData[k].id);
		 					projectData[i].roomData[k].displayStatus = roomStatus;
		 				}

						if(isEmpty(projectData[i].roomData[k].displayStatus)){
		 					if(currFinalLook.length>0){
			 					roomStatus = chkFinalLookStatus(currFinalLook,pkgId,projectData[i].roomData[k].id);
			 					if(!isEmpty(roomStatus)){
										projectData[i].roomData[k].displayStatus = roomStatus;
								}
			 				}
			 			}

	 					if(isEmpty(projectData[i].roomData[k].displayStatus)){
		 					if(currConceptBoard && currConceptBoard.length>0){
		 						roomStatus = chkCncptStatus(currConceptBoard,projectData[i].roomData[k].id,pkgId);
		 						if(!isEmpty(roomStatus)){
									projectData[i].roomData[k].displayStatus = roomStatus;
								}
		 					}
		 				}


		 				if(isEmpty(projectData[i].roomData[k].displayStatus)){
		 					for(var l=0;l<currApptData.length;l++){
			 					if(currApptData[l].quizId===quizData[j].quizId){	
			 						apptFound=true;
			 						roomStatus = chkApptStatus(currApptData[l],projectData[i].roomData[k].id);
			 						var date = new Date(currApptData[l].apptDate);
			 						currApptData[l].apptDate = moment(date).format('YYYY-MM-DD hh:mm:00 A');
			 						if(!isEmpty(roomStatus)){
										projectData[i].roomData[k].displayStatus = roomStatus;
										break;
									}
			 						
			 					}
			 				}
			 				// if(!apptFound){
			 				// 	roomStatus.statusText = "Pending Meet and Measure";
								// roomStatus.linkPage = " ";
								// roomStatus.modal = " ";
								// roomStatus.action=-1;
								// projectData[i].roomData[k].displayStatus = roomStatus;
			 				// }
			 			}

			 			if(isEmpty(projectData[i].roomData[k].displayStatus)){
		 					roomStatus.statusText = "Pending Meet and Measure";
							roomStatus.linkPage = " ";
							roomStatus.modal = " ";
							roomStatus.action=-1;
							projectData[i].roomData[k].displayStatus = roomStatus;
		 				}
	 				//projectData[i].roomData[k].displayStatus = roomStatus;	
	 				}

				}


 				// if(currShoppingList && currShoppingList.length>0){
	 			// 	status = chkFinalPrjStatus(currShoppingList,currPaymentList);
	 			// }

 				// else if(currShoppingList && currFinalLook.length>0){
	 			// 	status = chkFinalLookStatus(currFinalLook);
	 			// }

 				// else if(currConceptBoard && currConceptBoard.length>0){
	 			// 	status = chkCncptStatus(currConceptBoard);
	 			// }
	 			// else if(currApptData && currApptData.length>0){
	 			// 	var apptFound = false;
	 			// 	for(var k=0;k<currApptData.length;k++){
	 			// 		if(currApptData[k].quizId===quizData[j].quizId){
	 			// 			apptFound=true;
	 			// 			status = chkApptStatus(currApptData[k],projectData[i].roomData);
	 			// 			break;
	 			// 		}
	 			// 	}
	 			// 	if(!apptFound){
	 			// 		status.statusText = "Pending Meet and Measure";
					// 	status.linkPage = " ";
					// 	status.modal = " ";
					// 	status.action=-1;
	 			// 	}
	 				
	 			// }
	 			// else{
	 			// 	status.statusText = "Pending Meet and Measure";
					// status.linkPage = " ";
					// status.modal = " ";
					// status.action=-1;
	 			// }
 			} 
			// quizData[j].displayStatus = status;
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


$scope.details = function(projectIndex,roomIndex, tabIdx){

	
	$scope.toggleMainView();
	$scope.toggleTab(tabIdx);
	console.log(projectIndex);
	console.log(roomIndex);
	
	//Customer name clicked. 
	$scope.prjDetails = $scope.projects[projectIndex];

	var quizId =  $scope.prjDetails.roomData[roomIndex].quizId;
	var quizData;

	for(var i=0;i<$scope.prjDetails.quizData.length;i++){
		if($scope.prjDetails.quizData[i].quizId===quizId){
			quizData =$scope.prjDetails.quizData[i];
			break;
		}
	}
	//var quizData = $scope.prjDetails.quizData[quizIndex];
	var quizDataArr = [];
	quizDataArr.push(quizData);

	
	console.log('$scope.prjDetails is:');
	console.log($scope.prjDetails);
	
	$scope.prjDetailsOrg = {};


	var apptData = $scope.prjDetails.apptData;

	var relApptData = [];
	for(var i =0;i<apptData.length;i++){
		if(apptData[i].quizId === quizData.quizId){
			var floorPlanLoc = apptData[i].floorPlanLoc;
			if(floorPlanLoc!=null && floorPlanLoc!=""){
				var floorPlans = floorPlanLoc.split(',');
				for(var j=0;j<floorPlans.length;j++){
					floorPlans[j] = './uploads/'+floorPlans[j];
				}
				apptData[i].floorPlanFiles =floorPlans;
			}
			relApptData.push(apptData[i]);
		}
	}
	
	var relCncptData = [];
	for(var i =0;i<$scope.prjDetails.conceptData.length;i++){
		if($scope.prjDetails.conceptData[i].quizId === quizData.quizId){
			$scope.prjDetails.conceptData[i].files = './uploads/'+$scope.prjDetails.conceptData[i].files;
			relCncptData.push($scope.prjDetails.conceptData[i]);
		}
	}

	var relFinalLook = [];
	for(var i =0;i<$scope.prjDetails.finalLookData.length;i++){
		if($scope.prjDetails.finalLookData[i].quizId === quizData.quizId){
			$scope.prjDetails.finalLookData[i].files = './uploads/'+$scope.prjDetails.finalLookData[i].files;
			relFinalLook.push($scope.prjDetails.finalLookData[i]);
		}
	}

	var relShoppingList = [];
	for(var i =0;i<$scope.prjDetails.shoppingList.length;i++){
		if($scope.prjDetails.shoppingList[i].quizId === quizData.quizId){
			$scope.prjDetails.shoppingList[i].files = './uploads/'+$scope.prjDetails.shoppingList[i].files;
			relShoppingList.push($scope.prjDetails.shoppingList[i]);
		}
	}


	var quizDtls = $scope.prjDetails.quizDtls;
	var colours = [];
	var relQzDtls = [];

	for(var i =0;i<quizDtls.length;i++){
		if(quizDtls[i].quizId === quizData.quizId){
			var files = quizDtls[i].file1;
			if(files!=null){
				var uploadedFiles = files.split(',');
				for(var j=0;j<uploadedFiles.length;j++){
					uploadedFiles[j] = './uploads/'+uploadedFiles[j];
				}
				quizDtls[i].file1 =uploadedFiles;
				
			}
			
			colours = $scope.prjDetails.quizDtls[i].colours.split(',');
			$scope.prjDetails.quizDtls[i].colours = colours;
			relQzDtls.push($scope.prjDetails.quizDtls[i]);

		}
	}

	var relResultData = [];
	for(var i =0;i<$scope.prjDetails.resultData.length;i++){
		if($scope.prjDetails.resultData[i].quizId === quizData.quizId){			
			relResultData.push($scope.prjDetails.resultData[i]);
		}
	}


	$scope.prjDetailsOrg.quizData=quizDataArr;
	$scope.prjDetailsOrg.apptData=relApptData;
	$scope.prjDetailsOrg.conceptData=relCncptData;
	$scope.prjDetailsOrg.finalLookData=relFinalLook;
	$scope.prjDetailsOrg.shoppingList=relShoppingList;
	$scope.prjDetailsOrg.quizDtls=relQzDtls;
	$scope.prjDetailsOrg.userData=$scope.prjDetails.userData;
	$scope.prjDetailsOrg.resultData = relResultData;
	$scope.prjDetailsOrg.imgData=$scope.prjDetails.imgData;
	$scope.prjDetailsOrg.roomData=$scope.prjDetails.roomData;
	$scope.prjDetailsOrg.pkgData=$scope.prjDetails.pkgData;
	
	
	console.log('New list is:');
	console.log($scope.prjDetailsOrg);
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

$scope.actionUsrData = function(quizId,roomId,action){
	var data ={'quizId':quizId,'roomId':roomId};
	var action;
	if(action===1){
		data.status = 1; //Approve
		data.action = 1; //M&M
	}
	else if (action===2){
		data.status = 3; //Reject
		data.action = 1;
	}
	else if (action===3){
		data.status = 1;
		data.action = 2; //FloorPlan
	}
	else if (action===4){
		data.status = 3;
		data.action = 2;
	}
	console.log(data);
	mvAdminView.modifyUsrAppt(data).then(function(success){
		if(success){
			mvNotifier.notify('Data modified successfully');
			window.location.reload(true);
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
      var mstrFileArrIdx = $scope.pendingFilesArr[index].mainArrIndex;
      $scope.pendingFilesArr.splice(index,1);
      $scope.fileArr.splice(mstrFileArrIdx,1);
}



$scope.submitData = function(quizId, filetype, roomName, roomId){

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
			mvAdminView.saveUploadedData(quizId,roomId,filetype,files).then(function(success){
				mvNotifier.notify('Data saved');
				resetTabs();
				$scope.showListing = true;
				$scope.showDetail = false;

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
 

 function isEmpty(obj) {

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

});




