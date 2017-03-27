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
		},

		getPaymentInfo: function(quizId, status){
			var dfd = $q.defer();
		    $http.post('/getPaymentInfo',{quizId:quizId,status:status}).then(function(response){
		 		if(response.data.success){
	  				dfd.resolve(response.data.results);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
	  		});
	  		return dfd.promise;
		},

		updatePackage: function(quizId, status,totalPrice){
			var dfd = $q.defer();
		    $http.post('/updatePackage',{quizId:quizId,status:status,totalPrice:totalPrice ,customerId:mvIdentity.currentUser.id }).then(function(response){
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