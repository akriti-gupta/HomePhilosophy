angular.module("app")
		  .controller("PaymentController",function($scope,$location,$http,$routeParams,quizResult,payment,mvPayment,mvIdentity,mvNotifier,mvUserQuiz,custViewSvc){

  	$scope.payPkg;
  	$scope.pkgValue
  	$scope.selectedRooms = [];
  	$scope.totalPrice = 1;
  	$scope.roomSelectionArr = [];
  	$scope.roomPkg = [];
  	$scope.showTitle = false;
  	var totalRooms = 0;
  	var roomObj = [];

  	$scope.buyForMe = false;

  	//TODO: Save package info in DB and retrive this array from there. This is to
  	//accomodate any future changes to the payment packages and put it in service.
  	$scope.packages = [
  						{'id':1,'name':"Simple",'pkgValue':350.00,value:1},
  					    {'id':2,'name':"Classic",'pkgValue':600.00,value:2},
  					    {'id':3,'name':"Premium",'pkgValue':1000.00,value:3},
  					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
  	];	
  	$scope.roomImage ={};

  	$scope.roomImage["Bedroom"] = "images/rooms/bedroom.png";
	$scope.roomImage["Dining"] = "images/rooms/dining.png";
	$scope.roomImage["Master"] = "images/rooms/master.png";
	$scope.roomImage["Living"] = "images/rooms/living.png";
	$scope.roomImage["Home"] = "images/rooms/homeOffice.png";
	$scope.roomImage["Kids"] = "images/rooms/kids.png";


//

  	//merchant=guptaakriti83@gmail.com&ref_id=75&reference_code=Test173R37737&response_code=1&currency=SGD&total_amount=700.00&signature=2e95174da579b5254dedba212745d06774c77beb&signature_algorithm=sha1

  	$scope.selectedRooms = quizResult.getInsertedRooms();	
  	if($scope.selectedRooms.length > 0){
  		$scope.showTitle = true;
  	}
  	else{
  		$scope.showTitle = false;	
  	}
  	
	for (var i=0;i<$scope.selectedRooms.length;i++){
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
var paymentMade = $routeParams.response_code;
  	var merchant=$routeParams.merchant;
  	var ref_id = $routeParams.ref_id;
  	var reference_code = $routeParams.reference_code;
  	var currency = $routeParams.currency;
  	var total_amount = $routeParams.total_amount;
  	var signature_algorithm = $routeParams.signature_algorithm;

  	console.log(paymentMade);

  	// if(paymentMade==="1"){
  	// 	savePaymentInfo();
  	// }

  	$scope.savePayPkg = function(pkg){
  		payment.storePayPkg(pkg);

  		payment.storePkgPerRoom(roomObj,$scope.roomPkg);
  		$scope.pkgPerRoom = payment.getPkgPerRoom();
  		console.log($scope.pkgPerRoom)
		 	if(quizResult.getStyle().length>=1){
		 	// 	var roomsObj =  payment.getPkgPerRoom();
				// var room = [];
				// for(var i = 0;i<roomsObj.length;i++){
				// 	room.push(roomsObj[i].roomId);
				// }

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
		if($scope.buyForMe){
			$scope.totalPrice = parseFloat($scope.totalPrice + 100).toFixed(2);
		}
	}

$scope.initPayment = function(){
	$scope.quizId = quizResult.getUserCurrQuiz();
	console.log($scope.quizId);
	//var secret='d389a5777e014f23896d5ab245634ab2';
	var secret='b899e1ed97ea4f58b8146f1b8c90b40a';
  	//var merchant = 'guptaakriti83@gmail.com';
	var merchant = 'rashi@homephilosophy.com.sg';
  	var action = 'pay';
  	var ref_id = $scope.quizId;
  	$scope.total_amount = parseFloat($scope.totalPrice).toFixed(2);
  	// var total_amount=600.00;
  	var currency = 'SGD';
  	var sig = secret+merchant+action+ref_id+$scope.total_amount+currency;
  	console.log(sig);
	
	$scope.signature = CryptoJS.SHA1(sig).toString();
 	$scope.price = $scope.totalPrice.toString();
 	console.log($scope.signature);



}
	$scope.savePaymentInfo = function(){
		//TODO: Integrate Payment Stripe
		//Store Package Info in DB and set quiz status to 0(Paid)
		

		
		var quizId = quizResult.getUserCurrQuiz();
		var status = 1;
		var status = 0;
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
		$scope.smoovPayForm.commit();
		/*if(isAddRoomErr===0){
	  		mvPayment.storePackage(quizId, roomPkg, $scope.totalPrice, status,isAddOn,addOnAmtPaid).then(function(response){
	  			console.log('Thanks for the payment');
	  			//$location.path('/dashboard');
	  			$scope.smoovPayForm.commit();
	  		}, function(reason){
	  			alert('Payment unsuccessful, please contact the site admin. '+reason);
	  			
	  		});
	  	}*/
	};	

	// $scope.$on('$locationChangeStart', function( event ) {
	// 	quizResult.clearInsertedRooms();
	// });	  	
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
	
})

.directive("ngFormCommit", [function(){
    return {
        require:"form",
        link: function($scope, $el, $attr, $form) {
            $form.commit = function() {
                $el[0].submit();
            };
        }
    };
}])
;



