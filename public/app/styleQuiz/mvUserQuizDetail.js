angular.module('app').factory('mvUserQuizDetail', function($resource){
	var UserQuizResource = $resource('/api/users/quiz/:customerId',{customerId: "@customerId"});

	// UserResource.prototype.isAdmin = function() {
	// 	return this.role && this.role==='admin';
	// };
	return UserQuizResource;
})	