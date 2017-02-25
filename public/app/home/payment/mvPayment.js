angular.module('app').factory('mvPayment', function($http, mvIdentity, $q){
	return{

		storePackage: function(quizId, roomPkg, totalPrice,status,isAddOn,addOnAmtPaid){
			var dfd = $q.defer();
			console.log('Before Posting /storePackage');
		    $http.post('/storePackage',{customerId:mvIdentity.currentUser.id,quizId:quizId,roomPkg:roomPkg,totalPrice:totalPrice,status:status,isAddOn:isAddOn, addOnAmtPaid:addOnAmtPaid}).then(function(response){
		 		console.log('Response got in storePackage: '+response);
	  			if(response.data.success){
	  				//Check if active quiz exists for same customer with future appts. If so, copy the same appt info for this quiz
	  				$http.post('/checkExistingAppt',{customerId:mvIdentity.currentUser.id,quizId:quizId}).then(function(response){
	  					if(response.data.success){
	  						
	  					}
	  				});
	  				dfd.resolve(true);
	  			}
	  			else{
	  				// dfd.resolve(false);
	  				dfd.reject(response.data.reason);
	  			}
	  		});
	  		return dfd.promise;
		}
	}
});