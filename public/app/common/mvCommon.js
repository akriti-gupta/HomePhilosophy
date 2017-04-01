angular.module('app').factory('mvCommon', function($http, mvIdentity, $q, mvUser){
	return{
		postContactDtls: function(data){
			var dfd = $q.defer();
		 	$http.post('/postContactDtls',{data:data}).then(function(response){
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