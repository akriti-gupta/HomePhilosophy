angular.module("app")
		  .controller("PaymentController",function($scope,$location,$http,$routeParams,quizResult,payment,mvPayment,mvIdentity,mvNotifier,mvUserQuiz,mvEmail,custViewSvc,PAYMENT_KEYS){

  	$scope.payPkg;
  	$scope.pkgName;
  	$scope.pkgValue;
  	$scope.selectedRooms = [];
  	
  	$scope.roomSelectionArr = [];
  	$scope.roomPkg = [];
  	$scope.showTitle = false;
  	$scope.roomPackageArr = [];
  	var totalRooms = 0;
  	var roomObj = [];
  	$scope.signature;

  	$scope.buyForMe = false;

  	//TODO: Save package info in DB and retrive this array from there. This is to
  	//accomodate any future changes to the payment packages and put it in service.
  	$scope.packages = [
  						{'id':1,'name':"Simple",'pkgValue':350.00,value:1},
  					    {'id':2,'name':"Classic",'pkgValue':600.00,value:2},
  					    {'id':3,'name':"Premium",'pkgValue':1000.00,value:3}
  	];	
  	$scope.roomImage ={};

  	$scope.roomImage["Bedroom"] = "images/rooms/bedroom.png";
	$scope.roomImage["Dining"] = "images/rooms/dining.png";
	$scope.roomImage["Master"] = "images/rooms/master.png";
	$scope.roomImage["Living"] = "images/rooms/living.png";
	$scope.roomImage["Home"] = "images/rooms/homeOffice.png";
	$scope.roomImage["Kids"] = "images/rooms/kids.png";

  	function setSmoovFields(totalPrice){
  			//var totalRooms = $scope.roomPerPkg.length;
			// var defaultPkgVal = $scope.roomPerPkg[0].pkgValue;
			// var totalPrice = 0;
			// for(var i =0;i<$scope.roomPkg.length;i++){
			// 	totalPrice = totalPrice + $scope.roomPkg[i].pkgValue;
			// }
			// var totalPrice = totalRooms*defaultPkgVal;

			var keys = PAYMENT_KEYS;
	    	var secret=keys.MERCHANT_SECRET_KEY;
			var merchant = keys.MERCHANT_EMAIL;
		  	var action = 'pay';
		  	var ref_id = $scope.quizId;
		  	$scope.total_amount = parseFloat(totalPrice).toFixed(2);
		  	var currency = 'SGD';
		  	var sig = secret+merchant+action+ref_id+$scope.total_amount+currency;
		  	
			
			$scope.signature = CryptoJS.SHA1(sig).toString();
		 	$scope.price = $scope.total_amount.toString();
  	}

  	$scope.initPayment = function(){

  		if(!mvIdentity.isAuthenticated() || payment.getPkgPerRoom1().length===0){
  			$location.path('/dashboard');
  		}
  		else{
			$scope.quizId = quizResult.getUserCurrQuiz();
			$scope.roomPerPkg = payment.getPkgPerRoom1();

			if($scope.roomPkg.length===0){
				//Initialize roomPkg with the default value chosen.
				for(var i=0;i<$scope.roomPerPkg.length;i++){
					$scope.roomPkg[i]=$scope.packages[$scope.roomPerPkg[i].pkgId-1];
				}
			}
			console.log($scope.roomPerPkg);
			console.log($scope.roomPkg);
			var totalRooms = $scope.roomPerPkg.length;
			var defaultPkgVal = $scope.roomPerPkg[0].pkgValue;
			var totalPrice = totalRooms*defaultPkgVal;

			/*var keys = PAYMENT_KEYS;
	    	var secret=keys.MERCHANT_SECRET_KEY;
			var merchant = keys.MERCHANT_EMAIL;
		  	var action = 'pay';
		  	var ref_id = $scope.quizId;
		  	$scope.total_amount = parseFloat(totalPrice).toFixed(2);
		  	var currency = 'SGD';
		  	var sig = secret+merchant+action+ref_id+$scope.total_amount+currency;
		  	
			
			$scope.signature = CryptoJS.SHA1(sig).toString();
		 	$scope.price = $scope.total_amount.toString();*/
		 	setSmoovFields(totalPrice);
		 }
	}

  	
	$scope.updateTotal = function(){

		$scope.total_amount = 0;
		for(var i=0;i<$scope.roomPkg.length;i++){
			$scope.total_amount = $scope.total_amount +$scope.roomPkg[i].pkgValue;
		}
		if($scope.buyForMe){
			$scope.total_amount = parseFloat($scope.total_amount + 100).toFixed(2);
		}
		setSmoovFields($scope.total_amount);
	}


	$scope.savePaymentInfo = function(){
		//TODO: Integrate Payment Stripe
		//Store Package Info in DB and set quiz status to 0(Paid)
		
		var quizId = quizResult.getUserCurrQuiz();
		var status = -1;
		var isAddOn = 0;
		var addOnAmtPaid = 0;
		var isAddRoomErr = 0;


		var roomPkgArr = payment.getPkgPerRoom1();

		if($scope.buyForMe){
			addOnAmtPaid  = 100;
		}
		
		for(var i =0;i<roomPkgArr.length;i++){
			roomPkgArr[i].pkgId = $scope.roomPkg[i].id;
			roomPkgArr[i].pkgName = $scope.packages[$scope.roomPkg[i].id -1 ].name;
			roomPkgArr[i].pkgValue = $scope.packages[$scope.roomPkg[i].id -1 ].pkgValue;
		}


		console.log('Before storing package in ctrl, roomPkg is:');
		console.log(roomPkgArr);

		mvPayment.storePackage(quizId, roomPkgArr, $scope.total_amount, status,isAddOn,addOnAmtPaid).then(function(response){
	  			$scope.smoovPayForm.commit();
	  		}, function(reason){
	  			alert('Payment unsuccessful, please contact the site admin. '+reason);
	  			
	  		});
	};

	$scope.$on('$locationChangeStart', function( event ) {
		payment.clearPkgPerRoom();
	});
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
}]);



