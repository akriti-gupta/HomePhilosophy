angular.module('app').factory('mvCustView', function($http, $q, $cacheFactory,$window,$rootScope){
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
		}
		,
		getCustProjectInfo: function(){
			// var cache = $cacheFactory('homePhilCache');
			// var data = cache.get('userProjects');
			var dfd = $q.defer();
			// if(!data){
				$http.get('/getCustProjectInfo', {cache: false}).then(function(response){
					if(response.data.success){
						data = response.data.results;
      					// cache.put('userProjects', data);
						dfd.resolve(response.data.results);
		  			}
		  			else{
		  				dfd.reject(response.data.reason);
		  			}
				});
				return dfd.promise;
			// }
			// else{
			// 	return dfd.resolve(data);
			// }	
		}
		// ,
		// setUserProjects: function(userProjects){
		// 	console.log('While setting, userProjects is: ');
		// 	console.log(userProjects);
		// 	$window.localStorage && $window.localStorage.setItem('userProjects', JSON.stringify(userProjects));
  //     		//return this;
		// },
		//  getUserProjects: function() {
		 	
		//  		var prj =  $window.localStorage.getItem('userProjects');
		//  		console.log('While getting, userProjects is: ');
		// 	console.log(prj);
		//  		return prj;
  //   	}
	}
});