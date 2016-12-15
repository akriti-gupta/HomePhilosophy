angular.module('app').factory('mvUser', function($resource){
	var UserResource = $resource('/api/users/:id',{id: "@id"});

	UserResource.prototype.isAdmin = function() {
		return this.role && this.role==='admin';
	};
	return UserResource;
})	