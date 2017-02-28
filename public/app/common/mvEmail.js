angular.module('app').factory('mvEmail', function($http, mvIdentity, $q, mvUser){
	return{
		sendEmail: function(){
			var dfd = $q.defer();
		 	$http.post('/sendEmail').then(function(response){
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