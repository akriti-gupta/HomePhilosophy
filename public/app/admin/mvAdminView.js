angular.module('app').factory('mvAdminView', function($http, $q){
	return{

		saveFirstLook: function(data){
			var dfd = $q.defer();
		 	$http.post('/saveFirstLook',{data:data}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		}
		/*,
		getCustProjectInfo: function(){
			var dfd = $q.defer();
			$http.get('/getCustProjectInfo').then(function(response){
				if(response.data.success){
					dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
			});
			return dfd.promise;
		}*/
	}
});