angular.module("app")
		  .controller("PaymentController",function($scope,$location,$http,quizResult,payment,mvPayment,mvIdentity,mvNotifier,mvUserQuiz,custViewSvc){

  	$scope.payPkg;
  	$scope.pkgValue
  	$scope.selectedRooms = [];
  	$scope.totalPrice = 1;
  	$scope.roomSelectionArr = [];
  	$scope.roomPkg = [];
  	$scope.showTitle = false;
  	var totalRooms = 0;
  	var roomObj = [];

  	//TODO: Save package info in DB and retrive this array from there. This is to
  	//accomodate any future changes to the payment packages and put it in service.
  	$scope.packages = [
  						{'id':1,'name':"Simple",'pkgValue':350,value:1},
  					    {'id':2,'name':"Classic",'pkgValue':600,value:2},
  					    {'id':3,'name':"Premium",'pkgValue':1000,value:3},
  					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
  	];	

  	//$scope.selectedRooms = quizResult.getCustSelections().roomSelected;	
  	$scope.selectedRooms = quizResult.getInsertedRooms();	
  	if($scope.selectedRooms.length > 0){
  		$scope.showTitle = true;
  	}
  	else{
  		$scope.showTitle = false;	
  	}
  	
	for (var i=0;i<$scope.selectedRooms.length;i++){
		// if($scope.selectedRooms[i].room_num.id > 1){
		// 	for(var j=1; j<= $scope.selectedRooms[i].room_num.id; j++){
		// 		$scope.roomSelectionArr.push($scope.selectedRooms[i].room_disp_name+' '+j);
		// 	    roomObj.push({'roomId':$scope.selectedRooms[i].room_id,'roomName':$scope.selectedRooms[i].room_disp_name+' '+j});

		// 	}
		// }
		// else{
		// 	$scope.roomSelectionArr.push($scope.selectedRooms[i].room_disp_name);
		// 	roomObj.push({'roomId':$scope.selectedRooms[i].room_id,'roomName':$scope.selectedRooms[i].room_disp_name});
		// }

			var roomDispName;
			if($scope.selectedRooms[i].numRoom===0){
				roomDispName = $scope.selectedRooms[i].roomName;
			}
			else{
				roomDispName = $scope.selectedRooms[i].roomName +' '+$scope.selectedRooms[i].numRoom;	
			}
			$scope.roomSelectionArr.push(roomDispName);
			roomObj.push({'roomId':$scope.selectedRooms[i].id,'roomName':roomDispName});
		
	}

  	if(payment.getPayPkg()!=-1){
  		var pkg = payment.getPayPkg();
  		$scope.payPkg = $scope.packages[pkg-1].name;
  		$scope.pkgValue = $scope.packages[pkg-1].pkgValue;
  	
	  	// if(quizResult.getCustSelections()!=null){
	  		if($scope.selectedRooms.length>0){
	  			// for(var i =0;i<$scope.selectedRooms.length;i++){
	  			// 	totalRooms+=$scope.selectedRooms[i].room_num.value;
	  			// }

	  			console.log('Tot rooms are: '+$scope.selectedRooms.length);
	  			var totalRooms = $scope.selectedRooms.length;
	  			$scope.totalPrice = $scope.pkgValue * totalRooms;

	  		}
	  	// }
	  	if($scope.roomPkg.length===0){
			//Initialize roomPkg with the default value chosen.
			for(var i=0;i<$scope.roomSelectionArr.length;i++){
				//$scope.roomPkg[i]=pkg;
				$scope.roomPkg[i]=$scope.packages[pkg-1];
			}
		}
	}

  	$scope.savePayPkg = function(pkg){
  		payment.storePayPkg(pkg);
		 	if(quizResult.getStyle().length>=1){
				$location.path("/reviewPayment");	
		 	}
		 	else{
		 		$location.path("/style-quiz");	
		 	}
	}	
	
	$scope.updateTotal = function(){
		$scope.totalPrice = 0;
		for(var i=0;i<$scope.roomPkg.length;i++){
			$scope.totalPrice = $scope.totalPrice +$scope.roomPkg[i].pkgValue;
		}
	}

	$scope.savePaymentInfo = function(){
		//TODO: Integrate Payment Stripe
		//Store Package Info in DB and set quiz status to 0(Paid)
		
		var quizId = quizResult.getUserCurrQuiz();
		var status = 1;
		var isAddOn = 0;
		var addOnAmtPaid = 0;
		var isAddRoomErr = 0;

		console.log($scope.selectedRooms);

		//Check if redirect from add new room, In that case add room in cust_room_selection	
		// if(custViewSvc.getRequester()!=' '){
		// 	mvUserQuiz.addRoomToQuiz(quizId,$scope.selectedRooms).then(function(success){
		// 		console.log('Room Added');
  // 			}, function(reason){
  // 				isAddRoomErr = 1;
  // 				alert('Error in adding new room'+reason);
  // 			});
		// }

		// payment.storePkgPerRoom($scope.roomSelectionArr,$scope.roomPkg);
		payment.storePkgPerRoom(roomObj,$scope.roomPkg);

		var roomPkg = payment.getPkgPerRoom();

		console.log('Before storing package in ctrl, roomPkg is:');
		console.log(roomPkg);
		if(isAddRoomErr===0){
	  		mvPayment.storePackage(quizId, roomPkg, $scope.totalPrice, status,isAddOn,addOnAmtPaid).then(function(response){
	  			console.log('Thanks for the payment');
	  			$location.path('/dashboard');
	  		}, function(reason){
	  			alert('Payment unsuccessful, please contact the site admin. '+reason);
	  		});
	  	}
	}		  	
});

