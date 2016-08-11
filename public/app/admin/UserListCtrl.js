angular.module('app').controller('UserListCtrl', function($scope,mvUser){
	console.log('In UserListCtrl');
	$scope.users = mvUser.query();
});