angular.module('app').controller('UserListCtrl', function($scope,$http,$routeParams,mvIdentity,mvUser, mvAdminView,mvNotifier,payment,mvUpload){
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

	$scope.fileArr = [];
$scope.pendingFilesArr = [];

	

	$http.get('/getProjectListing').then(function(response){
		
		if(response.data.success){
			console.log(response);
			if(response.data.result.length > 0){
				//$scope.customers = [];
				$scope.custProjects = [];
				for(var i =0;i<response.data.result.length;i++){
					var custInfo = response.data.result[i].custInfo;
					var quizInfo = response.data.result[i].quizInfo;
					var resultInfo = response.data.result[i].resultInfo;
					var pkgInfo = response.data.result[i].pkgInfo;
					var apptInfo =  response.data.result[i].apptInfo;
					var quizImageInfo = response.data.result[i].quizImageInfo;
					


					for(var j = 0; j< quizInfo.length;j++){
						var imgArr = [];
						var resultArr =[];
						var pkgArr = [];
						var apptArr = [];
						var statusArr = [];
						var quizDate = quizInfo[j].created_at;
						quizDate = quizDate.substr(0,10);
						quizInfo[j].created_at = quizDate;

						var quizStatus = quizInfo[j].status;
						var pkgStatus;
						var apptStatus;
						var apptDate;
						var floorPlanStatus;
						var currentStatus;

						for(var g =0; g<quizImageInfo.length;g++){
							if(quizImageInfo[g].quizId===quizInfo[j].quizId){
								imgArr.push({'questionId': quizImageInfo[g].questionId,'selectedImgId':quizImageInfo[g].selectedImgId});
							}
						}

						for(var r =0; r<resultInfo.length;r++){	
							if(resultInfo[r].quizId===quizInfo[j].quizId){
								resultArr.push({'styleId': resultInfo[r].styleId,'stylePercent':resultInfo[r].stylePercent});
							}

						}

						for(var k = 0; k<pkgInfo.length;k++){
							
							apptStatus = -2;
							floorPlanStatus = -2;
							currentStatus ="";
							apptDate = new Date();


							if(quizInfo[j].quizId === pkgInfo[k].quizId){
								pkgStatus = pkgInfo[k].status;
								pkgArr.push({'quizId':pkgInfo[k].quizId,'roomName':pkgInfo[k].roomName, 'pkgId':pkgInfo[k].pkgId,'status': pkgInfo[k].status});
							}
							for(var a=0;a<apptInfo.length;a++){
								
								if(apptInfo[a].quizId===quizInfo[j].quizId && apptInfo[a].roomName===pkgInfo[k].roomName){
									var mtngdate = apptInfo[a].apptDate;
									mtngdate = mtngdate.substr(0,10);
									apptStatus = apptInfo[a].apptStatus;
									
									floorPlanStatus = apptInfo[a].floorPlanStatus;
									apptDate = apptInfo[a].apptDate;
									

									apptArr.push({'roomName':apptInfo[a].roomName,'apptDate':mtngdate,'address':apptInfo[a].address,'phone':apptInfo[a].contact,'contactName':apptInfo[a].contactPerson,'floorPlanStatus':floorPlanStatus,'status':apptStatus});
								}
								currentStatus = setCurrentStatus(quizStatus,pkgStatus,apptStatus,floorPlanStatus,apptDate);
								statusArr.push(currentStatus);
							}
						}

						

						$scope.custProjects.push({custInfo:custInfo,
												  quizInfo:quizInfo[j], 
												  pkgInfo:pkgArr, 
												  apptInfo: apptArr,
												  imgInfo: imgArr,
												  resultInfo: resultArr});	
					}

					
						
				}
					
				
				console.log($scope.custProjects);
				}
				
			
			else{
			mvNotifier.notify('No active projects');
			}
		}
		else{
			mvNotifier.notify('Error in retrieving records');
		}

}).catch(function(err){
	console.log('Error in fetching customer projects: ');
	console.log(err);
	mvNotifier.notify('Error in fetching customer projects');
});


$scope.details = function(index,tabIdx){
	console.log('index is: '+index);
	
	$scope.toggleMainView();
	$scope.toggleTab(tabIdx);
	
	console.log($scope.custProjects[index]);
	$scope.prjDetails = $scope.custProjects[index];
	$scope.pkgDtls = $scope.custProjects[index].pkgInfo[index];
	console.log($scope.pkgDtls);


	
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

$scope.uploadFile = function(quizId, roomName){
	var fileType;
	if(! $scope.doUploadFirst)
	 	fileType = 'firstLook';

	else if(! $scope.doUploadFinal)
	 	fileType = 'finalLook';

	else if(! $scope.doUploadShopping)
	 	fileType = 'shoppingList';

console.log($scope.prjDetails);
	mvUpload.uploadFiles($scope.fileArr,fileType,quizId).then(function(success){
		if(success){
			console.log('Floor plan uploaded');
			var location=" ";
			for(var i=0;i<$scope.fileArr.length;i++){
				var firstLookFile = './public/customer_uploads/firstLook/'+quizId+'/'+$scope.fileArr[i].name;
				if(location!=" "){
					location = location + "," +firstLookFile;
				}
				else
					location = firstLookFile;
			}
			//var location = './custmer_uploads/firstLook/'+quizId+'/'+$scope.fileArr[0].name;
			console.log(location);
			console.log($scope.prjDetails);
			var firstLookData = {'customerId':$scope.prjDetails.custInfo.customerId, 'quizId':quizId,'folderLocation':location,'roomName':roomName,'status':1,'feedback_id':null}
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
			});

		}
		else{
			console.log('Error in uploading floor plan')
		}
	});
}
 

});




