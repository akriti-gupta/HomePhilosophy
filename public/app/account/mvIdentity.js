//File to capture the fact that user is actually logged in and store the current user.

angular.module('app').factory('mvIdentity', function(){
	return {
		currentUser: undefined,
		isAuthenticated: function(){
			return !!this.currentUser;
		}
	}

});

