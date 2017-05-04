angular.module("app")
		  .controller("CustViewController",function($scope,$location,$http,$filter,$routeParams,quizResult,payment,mvIdentity,mvNotifier,mvUpload, mvCustView,mvEmail,custViewSvc){
		  		
		  	

$scope.firstName = mvIdentity.currentUser.firstname;
$scope.projects = [];
$scope.fileArr = [];

$scope.pendingFilesArr= [];
$scope.pendingDropFiles = [];
$scope.pkgNames = payment.getPackages();
$scope.address=' ';
$scope.person=' ';
$scope.email=' ';
$scope.contact;
$scope.projectArr =[];
$scope.feedbackArr = [];
$scope.feedbackComment;
$scope.showFeedback = false;
$scope.showMain = true;
$scope.hasActiveProject = false;
$scope.hasAllLaunched = true;
$scope.lookText='First Looks'; 
$scope.isFinalPage = false;

$scope.packageName=[' ','Simple','Classic','Premium','Custom'];

$scope.styleName=[' ','Classic','Contemporary','Transitional','Modern','Scandinavian','Asian Inspired Minimalist'];

// $scope.apptDate = new Date();
// $scope.apptTime = new Date();

$scope.roomImage ={};


$scope.roomImage["Bedroom"] = "images/rooms/bedroom.png";
$scope.roomImage["Dining"] = "images/rooms/dining.png";
$scope.roomImage["Master"] = "images/rooms/master.png";
$scope.roomImage["Living"] = "images/rooms/living.png";
$scope.roomImage["Home"] = "images/rooms/homeOffice.png";
$scope.roomImage["Kids"] = "images/rooms/kids.png";

var roomObj = ['','master','living','kids','home','dining','bedroom'];

$scope.hstep = 1;
$scope.mstep = 15;
$scope.timeOptions = {
    hstep: [1, 2, 3],
    mstep: [5]
};
$scope.ismeridian = true;

$scope.clear = function() {
    $scope.apptDate = null;
    $scope.apptTime = null;
};

$scope.dateOptions = {
    minDate: new Date(),
    showWeeks: false
};


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
		if($scope.contact===' ' || $scope.address === ' ' || $scope.person === ' ' || $scope.apptTime===null ||
			$scope.email===' ')
			return false;
	}
	return true;
}

function chkFinalPrjStatus(shoppingList, paymentInfo, roomData){
	var finalStatus = {};
	if(shoppingList.length>0){
		for(var i =0; i < shoppingList.length; i++){
			if(shoppingList[i].concept.roomId === roomData.id){
				finalStatus.statusText='Your amazing new space is ready! ';
				finalStatus.linkPage='getFinalLook($index)';
				finalStatus.modal=' ';
				break;
			}
		}
	}
	return finalStatus;
}


function chkFinalLookStatus(finalLook,pkgData,roomData){
	
	for(var i =0;i<finalLook.length;i++){
		if(finalLook[i].concept.roomId === roomData.id){
			var currFinalLook = finalLook[i];
			var finalStatus = {};
			var pkgId = pkgData.pkgId;
			if(pkgId>2){
				if(currFinalLook.feedbackData.length>0 && currFinalLook.feedbackData[0].status===0){
					finalStatus.statusText='Hang tight! We are working on your awesome new room';
					finalStatus.linkPage=' ';
					finalStatus.modal=' ';
					break;
				}
				else{
					finalStatus.statusText='Final Look ready! Let us know your feedback';
					finalStatus.linkPage='getFinalLook($index)';
					finalStatus.modal=' ';
				}
			}
			else{
				finalStatus.statusText='Your amazing new space is ready!';
				finalStatus.linkPage='getFinalLook($index)';
				finalStatus.modal=' ';
			}
		}
	}
		return finalStatus;
}

function chkCncptStatus(conceptBoard,roomData){
	var finalStatus = {};
	for(var i =0;i<conceptBoard.length;i++){
		if(conceptBoard[i].concept.roomId === roomData.id){
			var currConceptData = conceptBoard[i];
			var status = currConceptData.concept.status;
			
			if(currConceptData.feedbackData.length>0 && currConceptData.feedbackData[0].status===0){
				finalStatus.statusText='Almost there! We are working on your Final Look';
				finalStatus.linkPage=' ';
				finalStatus.modal=' ';
			}
			else{
				finalStatus.statusText='First Looks ready! Let us know your feedback';
				finalStatus.linkPage='getFirstLook($index)';
				finalStatus.modal=' ';
			}
			break;
		}
	}
	return finalStatus;
}

function chkApptStatus(apptData, roomData, projectData, currIndex){
	//Appt made and/or Floor Plan fileUploadedStatus.
	var status = {};
	for(var i =0;i<apptData.length;i++){
		var found = false;
		
			if(apptData[i].apptStatus!= null && apptData[i].apptStatus>=0){
				found=true;
				if(apptData[i].apptStatus===0){
						
					//Appt Scheduled. Check if in future>=24 hrs ahead 
					var apptDate = moment(apptData[i].apptDate);
					var msDiff = apptDate.diff(moment(new Date(),"DD/MM/YYYY HH:mm:ss"));
					var dayDiff = moment.duration(msDiff);
					var hourDiff = Math.floor(dayDiff.asHours());

					if(hourDiff >=24){
						status.statusText = "Meeting has been scheduled [View/Edit]";
						status.linkPage = " ";
						status.modal = "#calendarModal";
					}
					else{
						status.statusText = "Meeting has been scheduled";
						status.linkPage = " ";
						status.modal = " ";
					}
				}
				else if(apptData[i].apptStatus===1){
					status.statusText = "Hang tight! We are working on your First Looks";
					status.linkPage = " ";
					status.modal = " ";
				}
				else if(apptData[i].apptStatus===3){
					status.statusText = "Oops, we are unable to schedule on your preferred date! We will contact you soon";
					status.linkPage = " ";
					status.modal = "#calendarModal";
				}

				projectData[currIndex].status = status;
				// for(var j = currIndex+1; j<projectData.length;j++){
			 // 		if(projectData[j].quizData.quizId === projectData[currIndex].quizData.quizId){
			 // 			projectData[j].status = status;
			 // 		}
			 // 	}

			 	break;


			}
			else if(apptData[i].floorPlanStatus!=null && apptData[i].floorPlanStatus>=0){
				if(apptData[i].roomId === roomData.id){
					found=true;
					if(apptData[i].floorPlanStatus==0){
						status.statusText = "Floor Plan uploaded. Pending Approval";
						status.linkPage = " ";
						status.modal = " ";
					}
					else if(apptData[i].floorPlanStatus==1){
						status.statusText = "Hang tight! We are working on your First Looks";
						status.linkPage = " ";
						status.modal = " ";
					}

					else if(apptData[i].floorPlanStatus===3){
						status.statusText = "Oops, we need more information! We will contact you soon";
						status.linkPage = " ";
						status.modal = "#calendarModal";
					}
					break;
				}
			}
			
		}
	if(!found){
		status.statusText = "Schedule your Meet and Measure";
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
 		var currShoppingList = currRowData.shoppingListData;
 		var currPaymentData = currRowData.paymentData;
 		var currPkgData = currRowData.pkgData;
 		var currRoomData = currRowData.roomObj;
 		var currQzDetail = currRowData.quizDetailData;
 		var currQzId = currQzData.quizId;
 		var status = {};

 		if(!("status" in currRowData)){
	 		if(currQzData.status>=0){
	 			//Payment Made. Check in decreasing order from feedback to FirstLook to  appt etc

	 			if(currShoppingList && currShoppingList.length>0){
	 				projectData[i].status = chkFinalPrjStatus(currShoppingList,currPaymentData,currRoomData);
	 			}

	 			if(isEmpty(projectData[i].status) && currFinalLook && currFinalLook.length>0){
	 				projectData[i].status = chkFinalLookStatus(currFinalLook,currPkgData,currRoomData);
	 			}

	 			if(isEmpty(projectData[i].status) && currConceptBoard && currConceptBoard.length>0){
	 				projectData[i].status = chkCncptStatus(currConceptBoard,currRoomData);
	 			}
	 			if(isEmpty(projectData[i].status) && currApptData && currApptData.length>0){
	 				 projectData[i].status = chkApptStatus(currApptData,currRoomData,projectData,i);
	 			}
	 			
	 			if(isEmpty(projectData[i].status)  && currQzDetail.length===0){
					status.statusText = "Complete Tell Us More details";
		 			status.linkPage = "quizDetails";
		 			status.modal = " ";
		 			status.stage='quizDetails';
		 			projectData[i].status = status;
	 			}
	 			if(isEmpty(projectData[i].status)){
	 				status.statusText = "Schedule your Meet and Measure";
		 			status.linkPage = " ";
		 			status.modal = "#calendarModal";
		 			projectData[i].status = status;
	 			}
	 		} //quizStatus<0
	 		else{
	 			status.statusText = "Please complete your payment";
	 			status.linkPage = "pricing";
	 			status.modal = " ";
	 			status.stage='payment';
	 			projectData[i].status = status;
	 			
	 		}
	 	}

 	}
 	// for(var j = i+1; j<projectData.length;j++){
 	// 	if(projectData[j].quizData.quizId === currQzId){
 	// 		projectData[j].status = projectData[i].status;
 	// 	}
 	// }
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
			var relPaymentArr = [];
			var relShoppingList = [];
			var relQuizDetail = [];
			var statusArr = [];

			if(!($scope.hasActiveProject)){
				if(currQzObj.status===-1 || currQzObj.status===0){
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

			if(projectData.quizDetailData && projectData.quizDetailData.length>0){
				for(var j= 0;j<projectData.quizDetailData.length; j++){
					if(projectData.quizDetailData[j].quizId === currQzId){
						relQuizDetail.push(projectData.quizDetailData[j]);
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
					}
				}
			}

			if(projectData.firstLookData && projectData.firstLookData.length>0){
				for(var j= 0;j<projectData.firstLookData.length; j++){
					if(projectData.firstLookData[j].concept.quizId === currQzId){
						relFLArr.push(projectData.firstLookData[j]);
					}
				}
			} //First Look ends

			if(projectData.finalLookData && projectData.finalLookData.length>0){
				for(var j= 0;j<projectData.finalLookData.length; j++){
					if(projectData.finalLookData[j].concept.quizId === currQzId){
						relFinalLookArr.push(projectData.finalLookData[j]);
					}
				}
			} //Final Look ends

			if(projectData.shoppingListData && projectData.shoppingListData.length>0){
				for(var j= 0;j<projectData.shoppingListData.length; j++){
					if(projectData.shoppingListData[j].concept.quizId === currQzId){
						relShoppingList.push(projectData.shoppingListData[j]);
					}
				}
			}

			if(projectData.paymentData && projectData.paymentData.length>0){
				for(var j= 0;j<projectData.paymentData.length; j++){
					if(projectData.paymentData[j].quizId === currQzId){
						relPaymentArr.push(projectData.paymentData[j]);
					}
				}
			}

			if(relPkgArr.length > 0 ){
				for(var j = 0;j<relPkgArr.length; j++){
					var roomDispName = relPkgArr[j].roomName;
					var currRoomName;
					if(roomDispName.indexOf(' ')!=-1){
						currRoomName = roomDispName.substr(0,roomDispName.indexOf(' '));
					}
					else{
						currRoomName = roomDispName
					}

					var pkgRoomId = relPkgArr[j].roomId;
					for(var k = 0;k<relRoomArr.length;k++){
						if(relRoomArr[k].id === pkgRoomId){
							prjArr.push({'userData':userData,'quizData':currQzObj,'roomObj':relRoomArr[k],'roomData':currRoomName, 'quizDetailData': relQuizDetail,
						'pkgData':relPkgArr[j],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,'finalLookData':relFinalLookArr,'shoppingListData':relShoppingList,'paymentData':relPaymentArr});
					
							break;
						}
					}
				}
			}
			else{
				
				for(var j = 0;j<relRoomArr.length; j++){
					var roomDispName = relRoomArr[j].roomName;
					var currRoomName;
					if(roomDispName.indexOf(' ')!=-1){
						currRoomName = roomDispName.substr(0,roomDispName.indexOf(' '));
					}
					else{
						currRoomName = roomDispName
					}
					prjArr.push({'userData':userData,'quizData':currQzObj,'roomObj':relRoomArr[j],'roomData':currRoomName,'quizDetailData': relQuizDetail,
						'pkgData':relPkgArr[j],'resultData':relResultArr,'apptData':relApptArr,'firstLookData':relFLArr,'finalLookData':relFinalLookArr,'shoppingListData':relShoppingList,'paymentData':relPaymentArr});
				}
			}

			
		}// Outermost For loop iterating over unique cust quiz

		//prjArr now contain room wise data.
		populateStatus(prjArr);
		$scope.projectArr = prjArr;

	}
 }

//Get customer projects from DB.
$scope.getProjectData = function(){
	$scope.showFeedback = false;
	$scope.showMain = true;
	
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
	// $location.url($location.path());
	// if($routeParams.launched){
	if(quizResult.getLaunchKey()){
		angular.element('#launchedModal').modal('show');
	}
	console.log($location.path());
}

function setQuizData(index){
	var quizData = $scope.projectArr[index];
	var currRoomObj = $scope.projectArr[index].roomObj;
	var quizId = currRoomObj.quizId;
	var objRoomArr = [];
	var room_name;
	var roomData = [];

	for(var i=0;i<$scope.projectArr.length;i++){
		if($scope.projectArr[i].quizData.quizId === quizId){
			roomData.push($scope.projectArr[i].roomObj);
		}
	}

	for(var i = 0; i< roomData.length;i++){
		
		if(roomData[i].roomName.toLowerCase().indexOf('office')!=-1){
			room_name = 'office';
		}
		else{
			room_name = (roomData[i].roomName.substr(0,roomData[i].roomName.indexOf(' '))).toLowerCase();
		}
		var id = roomObj.indexOf(room_name);

		var room_num ={};
		var numRoom = roomData[i].numRoom;
		room_num.id=numRoom;
		room_num.label=numRoom.toString();
		room_num.value = numRoom;

		objRoomArr.push({'room_disp_name':roomData[i].roomName,'room_id':id,'room_name':room_name,'room_num':room_num});
	}
	storeQuizInfo(quizData);
	quizResult.setCustSelections({"roomSelected":objRoomArr,"quizImgSelected":null});
	quizResult.setInsertedRooms(roomData);
}
$scope.pricing = function(index){
	payment.clearPayPkg();
	setQuizData(index);
	$location.path('/pricing');
}

$scope.getQuizDetail = function(index){
	var quizData = $scope.projectArr[index];
	quizResult.setUserCurrQuiz(quizData.quizData.quizId);
	setQuizData(index);
	$location.path('/tell-us-more').search({'dashboard':'true'}); 
}

$scope.addRoom=function(){
	custViewSvc.setRequester('dashboard');
	quizResult.clearStyle();
	payment.clearPayPkg();
	payment.clearPkgPerRoom();
	quizResult.clearCustSelections();
	$location.path('/style-quiz');
}

$scope.loadMtngData=function(row_id){
	if($scope.projectArr[row_id].apptData.length >0 && $scope.projectArr[row_id].apptData[0].person!=' '){
		

		$scope.person = $scope.projectArr[row_id].apptData[0].contactPerson;
		$scope.contact = $scope.projectArr[row_id].apptData[0].contact;
		$scope.address = $scope.projectArr[row_id].apptData[0].address;
		$scope.email = $scope.projectArr[row_id].apptData[0].email;
		$scope.apptDate = moment($scope.projectArr[row_id].apptData[0].apptDate).format('YYYY-MM-DD hh:mm:ss A');
		$scope.apptTime = $scope.apptDate;
	}	
	
}

$scope.formatBytes = function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1000; // or 1024 for binary
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }

$scope.removeFileFromQ = function(index){
    var mstrFileArrIdx = $scope.pendingDropFiles[index].mainArrIndex;
    $scope.pendingDropFiles.splice(index,1);
    $scope.fileArr.splice(mstrFileArrIdx,1);
  }
  

$scope.selectPkg = function(index){
	var projectRow = $scope.projectArr[index];
	console.log(projectRow);
	var quizId = projectRow.quizData.quizId;
	var relatedStyle = projectRow.resultData;
}

function validateTime(date,time){
	var today = new Date();
	if(date<=today){
		alert('Please select a future date/time');
		return false;
	}
	var hours = time[0];
	var mins = time[1];
	if(hours>=9 && hours<18){
		return true;
	}
	if(hours===18){
		if(mins==='00'){
			return true;
		}
	}
	alert('Please enter a time between 9:00AM-6:00PM');
	return false;
}
//Called on submit of Calendar Popup
$scope.saveAppointment = function(item){

	var isValidForm = validateFormData();
	if(!isValidForm){
		alert('Please enter contact/ appointment/ floor plan details');
	}
	else if(isValidForm){
		var row_id = item.currentTarget.getAttribute("data-row-id");
		var quizId = $scope.projectArr[row_id].quizData.quizId;
		var roomId = $scope.projectArr[row_id].roomObj.id;
		var customerId = $scope.projectArr[row_id].userData.id;

		if($scope.fileArr.length===0 &&	($scope.apptDate===null || typeof $scope.apptDate=== 'undefined')){
			alert('Please schedule a meeting and/or upload Floor Plan');	
		}

		else{
			var uploadLocation;
			var fileUploadedStatus = -1;
			var isApptMade = -1;
			var apptData ={};

			if(typeof $scope.apptDate!= 'undefined' && $scope.apptDate!= null && $scope.fileArr.length===0){
				var date = new Date($scope.apptDate);
				var time = (moment(new Date($scope.apptTime)).format("HH:mm:ss")).split(':');
				if(validateTime(date,time)){
					date.setHours(time[0]);
					date.setMinutes(time[1]);
					var apptDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
					isApptMade = 1;
					apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
							 "person":$scope.person,"contact":$scope.contact,"email":$scope.email,
							 "apptDate":apptDateTime,"apptTime":apptDateTime,
							 "floorPlanLoc":'',"floorPlanStatus":-1,
							 "apptStatus":0};

					mvCustView.saveAppointment(apptData).then(function(success){
						if(success){
							 angular.element('#calendarModal').modal('hide');
							//window.location.reload(true);
							var mailData = {'template':'appt','to':mvIdentity.currentUser.username,'name':mvIdentity.currentUser.firstname,'address':$scope.address,'apptDate':apptDateTime};
							mvEmail.sendEmail(mailData).then(function(success){
				  				if(success)
					  				mvNotifier.notify('Mail sent');
					  			else
					  				mvNotifier.notify('Mail not sent');
					  			//angular.element('#calendarModal').modal('hide');
						  	}, function(reason){
					  			alert(reason);
					  			mvNotifier.error(reason);
					  		});
						}
					}, function(reason){
						alert('Appointment could not be scheduled. Please contact the site admin '+reason);
					});
				}
				else{
					return false; //alert promoted from function, invalid date. 
				}
			}

			else if($scope.fileArr && $scope.fileArr.length>0 && (typeof $scope.apptDate=== 'undefined' || $scope.apptDate=== null)){
				mvUpload.uploadFiles($scope.fileArr).then(function(uploadedFiles){
					if(uploadedFiles.length>0){
						var files;
						fileUploadedStatus = 1;
						files = uploadedFiles.toString();
					}
					else {
						files = uploadedFiles;
					}
					
					apptData = {"customerId":customerId,"quizId":quizId,"roomId":roomId,"address":$scope.address,
							 "person":$scope.person,"contact":$scope.contact,"email":$scope.email,
							 "apptDate":null,"apptTime":null,
							 "floorPlanLoc":files,"floorPlanStatus":0,
							 "apptStatus":-1};

					mvCustView.saveAppointment(apptData).then(function(success){
						if(success){
							angular.element('#calendarModal').modal('hide');
							window.location.reload(true);
							//TODO: Send email
						}
					}, function(reason){
						alert('Floor plans could not be uploaded. Please contact the site admin '+reason);
					});

				});
			}

			else if($scope.fileArr.length>0 && $scope.apptDate!=null){
				var date = new Date($scope.apptDate);
				var time = (moment(new Date($scope.apptTime)).format("HH:mm:ss")).split(':');
				
				if(validateTime(date,time)){
					date.setHours(time[0]);
					date.setMinutes(time[1]);
					var apptDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
					mvUpload.uploadFiles($scope.fileArr).then(function(uploadedFiles){
						if(uploadedFiles.length>0){
							var files;
							fileUploadedStatus = 1;
							files = uploadedFiles.toString();
						}
						else {
							files = uploadedFiles;
						}
						apptData = {"customerId":customerId,"quizId":quizId,"address":$scope.address,
									 "person":$scope.person,"contact":$scope.contact,"email":$scope.email,
									 "apptDate":apptDateTime,"apptTime":apptDateTime,
									 "floorPlanLoc":files,"floorPlanStatus":0,
									 "apptStatus":0};

						mvCustView.saveAppointment(apptData).then(function(success){
							if(success){
								angular.element('#calendarModal').modal('hide');
								//window.location.reload(true);
								
								var mailData = {'template':'appt','to':mvIdentity.currentUser.username,'name':mvIdentity.currentUser.firstname,'address':$scope.address,'apptDate':apptDateTime};
					  			mvEmail.sendEmail(mailData).then(function(success){
						  				if(success)
							  				mvNotifier.notify('Mail sent');
							  			else
							  				mvNotifier.notify('Mail not sent');

						  		}, function(reason){
						  			alert(reason);
						  			mvNotifier.error(reason);
						  		});
							}
						}, function(reason){
							alert('Meeting could not be scheduled. Please contact the site admin '+reason);
						});
					});

				}
				else{
					return false; //alert promoted from function, invalid date. 
				}
			}
		}
	}
}

$('#calendarModal').on('hidden.bs.modal', function () {
	//refresh
	window.location.reload(true);
});

$('#launchedModal').on('hidden.bs.modal', function () {
	$location.search({});
	quizResult.setLaunchKey(false);
});


$scope.getFirstLook = function(index, roomId){
	
	$scope.feedbackSaved = false;
	$scope.currentFirstLook = 0;
	$scope.rowId = index;
	$scope.firstLookArr = [];
	$scope.images = [];
	$scope.cncptObj = [];
	var concept_img;
	var concept_type;
	var hasShoppingList = false;
	var hasFinalLook = false;

	if($scope.projectArr[index].shoppingListData.length>0){
		for(var i =0;i<$scope.projectArr[index].shoppingListData.length; i++){
			if($scope.projectArr[index].shoppingListData[i].concept.roomId === roomId){
				hasShoppingList = true;
				if($scope.projectArr[index].shoppingListData[i].concept.files.indexOf('.pdf')===-1){
					$scope.firstLookArr.push($scope.projectArr[index].shoppingListData[i]);
				}
				else{
					$scope.shoppingList = $scope.projectArr[index].shoppingListData[i].concept.files;
				}
			}
		}
		if(hasShoppingList){
			concept_type =3;
			$scope.lookText = "Your final room design";
			$scope.isFinalPage = true;
		}
	}

	if(!hasShoppingList && $scope.projectArr[index].finalLookData.length>0){
		for(var i =0;i<$scope.projectArr[index].finalLookData.length; i++){
			if($scope.projectArr[index].finalLookData[i].concept.roomId === roomId){
				$scope.firstLookArr.push($scope.projectArr[index].finalLookData[i]);
				hasFinalLook = true;
			}
		}
		if(hasFinalLook){	
			concept_type =2;
			$scope.lookText = "Final Look";
		}
	}

	if(!hasShoppingList && !hasFinalLook && $scope.projectArr[index].firstLookData.length>0){
		for(var i =0;i<$scope.projectArr[index].firstLookData.length; i++){
			if($scope.projectArr[index].firstLookData[i].concept.roomId === roomId){
				$scope.firstLookArr.push($scope.projectArr[index].firstLookData[i]);		
			}
		}
		
		concept_type =1;
		$scope.lookText = "First Looks";
	}

	if($scope.firstLookArr!=null && $scope.firstLookArr.length>0){
		for(var i=0;i<$scope.firstLookArr.length;i++){

			//Populate existing feedback in array
			if(concept_type < 3){
				if($scope.firstLookArr[i].feedbackData.length > 0){
					$scope.feedbackArr[i] = $scope.firstLookArr[i].feedbackData[0].comments;
				}
			}
			if($scope.firstLookArr[i].concept.files.indexOf(',')===-1){
				if($scope.firstLookArr[i].concept.files.indexOf('.pdf')!=-1)
					$scope.images.push($scope.firstLookArr[i].concept.files);
				else
					$scope.images.push('./uploads/'+$scope.firstLookArr[i].concept.files);

				concept_img='./uploads/'+$scope.firstLookArr[i].concept.files;
				$scope.cncptObj.push({concept_id:$scope.firstLookArr[i].concept.id, concept_img:$scope.firstLookArr[i].concept.files,concept_type:concept_type});
			}
			else{
				var tmpFileArr = $scope.firstLookArr[i].concept.files.split(',');
				for(var j=0;j<tmpFileArr.length;j++){
					if(tmpFileArr[j].indexOf('.pdf')!=-1)
						tmpFileArr[j]=tmpFileArr[j];
					else
						tmpFileArr[j]='./uploads/'+tmpFileArr[j];
					$scope.cncptObj.push({concept_id:$scope.firstLookArr[i].concept.id, concept_img:tmpFileArr[j],concept_type:concept_type});
				}

				$scope.images = $scope.images.concat(tmpFileArr);

			}
		}
	}
	//console.log($scope.images);
	$scope.zoomImgSrc = $scope.images[0];
	$scope.designerNotes = $scope.firstLookArr[0].concept.notes;
	$scope.zoomImgIndex = 0;
	$scope.showMain = false;
	if(concept_type < 3){
		$scope.feedbackComment = $scope.feedbackArr[0];
	}
	$scope.showFeedback = true;
}

$scope.zoomImg = function(index){
	var oldImgIdx = $scope.zoomImgIndex;
	$scope.feedbackArr[oldImgIdx] = $scope.feedbackComment;
	$scope.zoomImgSrc = $scope.images[index];
	$scope.designerNotes = $scope.firstLookArr[index].concept.notes;
	$scope.zoomImgIndex = index;
	$scope.currentFirstLook = index;
	$scope.feedbackComment = $scope.feedbackArr[index];
}

/*$scope.saveFeedback = function(){
	
	if($scope.feedbackComment===' '){
		alert('No Feedback entered');
	}
	else{
		$scope.feedbackArr[$scope.currentFirstLook] = $scope.feedbackComment;
		console.log($scope.feedbackArr);
		mvNotifier.notify('Feedback saved');
	}
}*/

function submitFeedback(cncptObj,concept_type,uploadedFiles,status){
	var cncptFeedArr = [];

	for(var i =0;i<cncptObj.length;i++){
			if('feedback' in cncptObj[i]){
				if(uploadedFiles!=null){
					cncptFeedArr.push([status, cncptObj[i].feedback, (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')), (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),cncptObj[i].concept_id,uploadedFiles]);
				}
				//cncptFeedArr.push({status:status, comments: $scope.cncptObj[i].feedback, created_at:null, updated_at:null,concept_id:$scope.cncptObj[i].concept_id});
				else
					cncptFeedArr.push([status, cncptObj[i].feedback, (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')), (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),cncptObj[i].concept_id,null]);
			}
	}
	mvCustView.submitFeedback(cncptFeedArr,concept_type).then(function(response){
		if(response){
			mvNotifier.notify('Feedback submitted');
			if(status===0){
				$scope.feedbackSaved = true;
				window.location.reload(true);
			}
		}
		else{
			mvNotifier.notify('Error in saving feedback. Please try again');	
			alert('Error in saving feedback. Please try again');
		}

	}, function(reason){
		mvNotifier.notify('Error in saving feedback. Please try again: '+reason);
		alert('Error in saving feedback. Please try again: '+reason);
	});
}

$scope.submitFeedback = function(status){

	var comments='';
	var concept_type;
	
	if(typeof $scope.feedbackComment!='undefined')
		$scope.feedbackArr[$scope.currentFirstLook] = $scope.feedbackComment;
	
	if($scope.feedbackArr.length===0){
		alert('No feedback entered');
	}
	else{
		concept_type = $scope.cncptObj[0].concept_type;
		for(var i=0;i<$scope.feedbackArr.length;i++){
			if(typeof $scope.feedbackArr[i] != 'undefined'){
				$scope.cncptObj[i].feedback=$scope.feedbackArr[i];
			}
		}
		/*var cncptFeedArr = [];
		for(var i =0;i<$scope.cncptObj.length;i++){
			if('feedback' in $scope.cncptObj[i]){
				//cncptFeedArr.push({status:status, comments: $scope.cncptObj[i].feedback, created_at:null, updated_at:null,concept_id:$scope.cncptObj[i].concept_id});
				cncptFeedArr.push([status, $scope.cncptObj[i].feedback, null, null,$scope.cncptObj[i].concept_id]);
			}
		}*/

		if(status===0){
			//Upload Files durind Final submission only
			/*mvUpload.uploadFiles($scope.fileArr).then(function(uploadedFiles){
				var files;
				if(uploadedFiles.length>0){
					files = uploadedFiles.toString();
				}
				else {
					files = uploadedFiles;
				}
			}, function(reason){
				mvNotifier.notify('Error in uploading files during feedback. Please try again: '+reason);
				alert('Error in uploading files during feedback. Please try again: '+reason);
			});*/
			if($scope.fileArr.length>0){
				mvUpload.uploadFiles($scope.fileArr).then(function(uploadedFiles){
					var files;
					if(uploadedFiles.length>0){
						files = uploadedFiles.toString();
					}
					else {
						files = uploadedFiles;
					}
					submitFeedback($scope.cncptObj,concept_type,files,status);
				},
				function(reason){
					mvNotifier.notify('Error in uploading files during feedback. Please try again: '+reason);
					alert('Error in uploading files during feedback. Please try again: '+reason);
				});
			}
			else{
				submitFeedback($scope.cncptObj,concept_type,null,status);
			}
		}
		else{
			submitFeedback($scope.cncptObj,concept_type,null,status);
			/*mvCustView.submitFeedback(cncptFeedArr,concept_type).then(function(response){
				if(response){
					mvNotifier.notify('Feedback submitted');
					// $location.path('/dashboard');
					
					if(status===0){
						$scope.feedbackSaved = true;
						window.location.reload(true);
					}
				}
				else{
					mvNotifier.notify('Error in saving feedback. Please try again');	
				}

			}, function(reason){
				mvNotifier.notify('Error in saving feedback. Please try again: '+reason);
				//Close popup
			});*/
		}
	}
}

$scope.removeRoom = function(index){
	var answer = confirm("Are you sure you want to delete this project?")
    if (!answer) {
        event.preventDefault();
    }
    else{
		var row = $scope.projectArr[index];
		var quizId = row.quizData.quizId;
		var roomId = row.roomObj.id;
		mvCustView.deleteProject(quizId, roomId).then(function(response){
			window.location.reload(true);
		},function(reason){
			mvNotifier.notify('Project could not be deleted: '+reason);
		});
	}
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

$scope.$on('$locationChangeStart', function( event ) {
	if(typeof $scope.feedbackSaved != 'undefined' && !$scope.feedbackSaved && !$scope.isFinalPage){
	    var answer = confirm("Your feedback has not been submitted. Any files uploaded will not be sent to us. Are you sure you want to leave this page?")
	    if (!answer) {
	        event.preventDefault();
	    }
	    else{
	    	$route.reload();
	    }
	}
});



function isEmpty(obj) {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
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
})
.directive("dropzone1", function() {
    return {
        restrict : "A",
        link: function (scope, element,attrs) {
          var checkSize, isTypeValid, validMimeTypes;
		  var size = 0;

          element.on('dragover', function(event) {
            event.preventDefault();
            event.stopPropagation();
          });
          
          element.on('dragenter', function(event) {
            event.preventDefault();
            event.stopPropagation();
          });
          validMimeTypes = attrs.fileDropzone;

	      checkSize = function(size) {
	          var _ref;
	          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
	            return true;
	          } else {
	            alert("Total File size must be smaller than " + attrs.maxFileSize + " MB");
	            return false;
	          }
	        };
	        isTypeValid = function(type) {
	          if (validMimeTypes.indexOf(type) > -1) {
	            return true;
	          } else {
	            alert("Invalid file type.  File must be one of following types " + validMimeTypes);
	            return false;
	          }
	        };

          element.bind('drop', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.originalEvent.dataTransfer){
              if (event.originalEvent.dataTransfer.files.length > 0) {
                for(var i=0; i< event.originalEvent.dataTransfer.files.length; i++){
                	var type = event.originalEvent.dataTransfer.files[i].type;
              		size = size + event.originalEvent.dataTransfer.files[i].size;
              		if (checkSize(size) && isTypeValid(type)) {
	                  scope.$apply(function(scope) {
	                    scope.fileArr.push(event.originalEvent.dataTransfer.files[i]);
	                    scope.pendingDropFiles.push({"name":event.originalEvent.dataTransfer.files[i].name,"size":scope.formatBytes(event.originalEvent.dataTransfer.files[i].size,0),"mainArrIndex":scope.fileArr.length-1});                    
	                    
	                  });                 
	              }
                }
              }
            }
            return false;
          });
        }
      }
  })


;



