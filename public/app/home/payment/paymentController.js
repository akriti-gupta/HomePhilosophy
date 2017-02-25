angular.module("app")
		  .controller("PaymentController",function($scope,$location,$http,quizResult,payment,mvPayment,mvIdentity,mvNotifier){

  	$scope.payPkg;
  	$scope.pkgValue
  	$scope.selectedRooms = [];
  	$scope.totalPrice = 1;
  	$scope.roomSelectionArr = [];
  	$scope.roomPkg = [];
  	var totalRooms = 0;

  	//TODO: Save package info in DB and retrive this array from there. This is to
  	//accomodate any future changes to the payment packages and put it in service.
  	$scope.packages = [
  						{'id':1,'name':"Simple",'pkgValue':350,value:1},
  					    {'id':2,'name':"Classic",'pkgValue':600,value:2},
  					    {'id':3,'name':"Premium",'pkgValue':1000,value:3},
  					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
  	];

  	$scope.selectedRooms = quizResult.getCustSelections().roomSelected;	
	for (var i in $scope.selectedRooms){
		if($scope.selectedRooms[i].room_num.id > 1){
			for(var j=1; j<= $scope.selectedRooms[i].room_num.id; j++){
				$scope.roomSelectionArr.push($scope.selectedRooms[i].room_disp_name+' '+j);
			}
		}
		else{
			$scope.roomSelectionArr.push($scope.selectedRooms[i].room_disp_name);
		}
	}

  	if(payment.getPayPkg()!=-1){
  		var pkg = payment.getPayPkg();
  		$scope.payPkg = $scope.packages[pkg-1].name;
  		$scope.pkgValue = $scope.packages[pkg-1].pkgValue;
  	
	  	if(quizResult.getCustSelections()!=null){
	  		if($scope.selectedRooms.length>0){
	  			for(var i =0;i<$scope.selectedRooms.length;i++){
	  				totalRooms+=$scope.selectedRooms[i].room_num.value;
	  			}
	  			$scope.totalPrice = $scope.pkgValue * totalRooms;

	  		}
	  	}
	  	if($scope.roomPkg.length===0){
			//Initialize roomPkg with the default value chosen.
			for(var i=0;i<$scope.roomSelectionArr.length;i++){
				$scope.roomPkg[i]=pkg;
				$scope.roomPkg[i]=$scope.packages[pkg-1];
			}
		}
	}

  	$scope.savePayPkg = function(pkg){
  		payment.storePayPkg(pkg);
  // 		if(!mvIdentity.isAuthenticated()){
		// 	$location.path('/login');
		// }
		// else if(payment.getPayPkg()!=-1){
		 	if(quizResult.getStyle().length>=1){
				$location.path("/reviewPayment");	
		 	}
		 	else{
		 		$location.path("/style-quiz");	
		 	}
		//}
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

		payment.storePkgPerRoom($scope.roomSelectionArr,$scope.roomPkg);

		var roomPkg = payment.getPkgPerRoom();

  		mvPayment.storePackage(quizId, roomPkg, $scope.totalPrice, status,isAddOn,addOnAmtPaid).then(function(response){
  			console.log('Thanks for the payment');
  			$location.path('/dashboard');
  		}, function(reason){
  			alert('Payment unsuccessful, please contact the site admin. '+reason);
  		});
	}		  	
});

