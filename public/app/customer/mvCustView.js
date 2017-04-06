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
		submitFeedback: function(feedbackArr,concept_type){
			var dfd = $q.defer();
		 	$http.post('/submitFeedback',{data:feedbackArr,concept_type:concept_type}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
	  		});
	  		return dfd.promise;
		},
		getCustProjectInfo: function(){
			var dfd = $q.defer();
			$http.get('/getCustProjectInfo', {cache: false}).then(function(response){
				if(response.data.success){
					dfd.resolve(response.data.results);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		},

		deleteProject: function(quizId, roomId){
			var dfd = $q.defer();
			$http.post('/deleteProject', {quizId: quizId, roomId: roomId}).then(function(response){
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