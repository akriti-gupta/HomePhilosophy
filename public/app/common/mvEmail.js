angular.module('app').factory('mvEmail', function($http, mvIdentity, $q, mvUser){
	return{
		sendEmail: function(mailData){
			var dfd = $q.defer();
		 	$http.post('/sendEmail',{data:mailData}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.error);
	  			}
	  		});
	  		return dfd.promise;
		},
		postContactDtls: function(){
			var dfd = $q.defer();
		 	$http.post('/postContactDtls').then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		}
	}
});