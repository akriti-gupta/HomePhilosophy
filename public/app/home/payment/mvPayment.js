angular.module('app').factory('mvPayment', function($http, mvIdentity, $q){
	return{

		storePackage: function(quizId, roomPkg, totalPrice,status,isAddOn,addOnAmtPaid){
			var dfd = $q.defer();
		    $http.post('/storePackage',{customerId:mvIdentity.currentUser.id,quizId:quizId,roomPkg:roomPkg,totalPrice:totalPrice,status:status,isAddOn:isAddOn, addOnAmtPaid:addOnAmtPaid}).then(function(response){
		 		if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
	  		});
	  		return dfd.promise;
		}
	}
});