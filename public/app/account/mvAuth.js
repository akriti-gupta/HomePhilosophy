angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
	return{

		authenticateUser: function(username,password){
			var dfd = $q.defer();
		 	$http.post('/signin',{username: username , password :password}).then(function(response){
	  			if(response.data.success){
	  				var user = new mvUser();
	  				angular.extend(user, response.data.user[0]);
	  				// mvIdentity.currentUser = response.data.user[0];
	  				mvIdentity.currentUser = user;
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		}
		// dfd.resolve(true);
		// return dfd.promise;
	
		,
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout',{logout:true}).then(function(){
				mvIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		},

		authorizeUserForRoute: function(role){
			if(mvIdentity.isAuthorized(role)){
				return true;
			}
			else{
				return $q.reject('Unauthorized');
			}
		}
	}
});