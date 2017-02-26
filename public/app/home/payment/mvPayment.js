angular.module('app').factory('mvPayment', function($http, mvIdentity, $q){
	return{

		storePackage: function(quizId, roomPkg, totalPrice,status,isAddOn,addOnAmtPaid){
			var dfd = $q.defer();
			console.log('Before Posting /storePackage');
			console.log('roomPkg is:');
			console.log(roomPkg);
		    $http.post('/storePackage',{customerId:mvIdentity.currentUser.id,quizId:quizId,roomPkg:roomPkg,totalPrice:totalPrice,status:status,isAddOn:isAddOn, addOnAmtPaid:addOnAmtPaid}).then(function(response){
		 		console.log('Response got in storePackage: '+response);
	  			if(response.data.success){
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