angular.module('app').controller('UserListCtrl', function($scope,mvUser){
	$scope.users = mvUser.query();
});