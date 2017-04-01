angular.module("app")
		  .controller("PricingController",function($scope,$location,$http,$routeParams,quizResult,payment,mvPayment,mvIdentity,mvNotifier,mvUserQuiz,mvEmail,custViewSvc,PAYMENT_KEYS){

  	$scope.selectedRooms = [];
  	$scope.showTitle = false;
  	$scope.roomPackageArr = [];
  	
  	$scope.name;
  	$scope.email;
  	$scope.phone;
  	//TODO: Save package info in DB and retrive this array from there. This is to
  	//accomodate any future changes to the payment packages and put it in service.
  	$scope.packages = [
  						{'id':1,'name':"Simple",'pkgValue':350.00,value:1},
  					    {'id':2,'name':"Classic",'pkgValue':600.00,value:2},
  					    {'id':3,'name':"Premium",'pkgValue':1000.00,value:3},
  					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
  	];	

  	$scope.initPayment = function(){

		$scope.selectedRooms = quizResult.getInsertedRooms();	

		console.log($scope.selectedRooms);

		if($scope.selectedRooms.length > 0){
	  		$scope.showTitle = true;
	  		var pkgId,pkgName,pkgValue;
	  		var goToPath = ' ';

		  	if(payment.getPayPkg()!=-1){
		  		pkgId = payment.getPayPkg();
		  		pkgName = $scope.packages[pkgId-1].name;
		  		pkgValue = $scope.packages[pkgId-1].pkgValue;
		  		goToPath = '/review-payment';
			}

			for (var i=0;i<$scope.selectedRooms.length;i++){
				var roomDispName;
				if($scope.selectedRooms[i].numRoom===0){
					roomDispName = $scope.selectedRooms[i].roomName;
				}
				else{
					roomDispName = $scope.selectedRooms[i].roomName +' '+$scope.selectedRooms[i].numRoom;	
				}

				$scope.roomPackageArr.push({'roomId':$scope.selectedRooms[i].id,'roomName':roomDispName,'pkgId':pkgId,'pkgName':pkgName,'pkgValue':pkgValue});			
			}

			if(goToPath!=' '){
				$location.path(goToPath);
			}
		  	
	  	}
	  	else{
	  		$scope.showTitle = false;	
	  	}
	}

  	$scope.savePayPkg = function(pkg){
  		payment.storePayPkg(pkg);

  		for(var i=0;i<$scope.roomPackageArr.length;i++){
  			$scope.roomPackageArr[i].pkgId = pkg;
  			$scope.roomPackageArr[i].pkgName = $scope.packages[pkg-1].name;
  			$scope.roomPackageArr[i].pkgValue = $scope.packages[pkg-1].pkgValue;
  		}
  		payment.setPkgPerRoom1($scope.roomPackageArr);

  		if(pkg===4){
  			$location.path("/custom");
  		}
  		else if(quizResult.getStyle().length>=1){
	 		$location.path("/review-payment");	
	 	}
	 	else{
	 		$location.path("/style-quiz");	
	 	}
	}	
	
$scope.submitReqCustom = function(){
	//IF form is valid
	if($scope.name===' '|| $scope.email===' '){
		alert('Please enter your name and email address');
	}
	else if($scope.customForm.$valid){
		$scope.sendMail();
	}
	
}

$scope.gotoPricing = function(){
	payment.clearPayPkg();
	$location.path('/pricing');
}
	
$scope.sendMail = function(){
	if($scope.customForm.$valid){
		mvEmail.sendEmail().then(function(success){
			if(success){
				alert('Thank you for submitting you request. We will contact you soon.');
				$location.path('/dashboard');				
			}
			else{
				mvNotifier.notify('Your request could not be sent. Please submit again');
			}
		});
	}
	else{
		alert('Please enter all the details');
	}
};

})

.directive('bgImage', function(){
	return function(scope,element, attrs){
			if(!scope.showTitle){
				element.css({
            		'background-image': "url('/images/pricing_bg.png')",
            		'background-size' : 'cover'
        		});
			}
		}
	
});


