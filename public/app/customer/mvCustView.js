angular.module('app').factory('mvCustView', function($http, $q,$rootScope){
	return{

		saveAppointment: function(data){
			var dfd = $q.defer();
		 	$http.post('/saveAppointment',{data:data}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
	  		});
	  		return dfd.promise;
		},
		submitFeedack: function(feedbackArr,firstLookId){
			var dfd = $q.defer();
			console.log('firstLookId is: '+firstLookId);
		 	$http.post('/submitFeedack',{data:feedbackArr,id:firstLookId}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		},
		getCustProjectInfo: function(){
			var dfd = $q.defer();
			$http.get('/getCustProjectInfo', {cache: false}).then(function(response){
				if(response.data.success){
					data = response.data.results;
					dfd.resolve(response.data.results);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		}
	}
});