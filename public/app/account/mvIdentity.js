//File to capture the fact that user is actually logged in and store the current user.

angular.module('app').factory('mvIdentity', function($window){
	var currentUser;
	
	console.log($window.bootstrappedUserObject);
	if(!!$window.bootstrappedUserObject){
	
		currentUser = $window.bootstrappedUserObject;
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function(){
			return !!this.currentUser;
		}
	}


});

