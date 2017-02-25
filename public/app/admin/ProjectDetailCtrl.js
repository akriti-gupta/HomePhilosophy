angular.module('app').controller('ProjectDetailCtrl', function($scope,$http,$routeParams,mvUser, mvNotifier,payment){

$http.get('/projectDetail/'+$routeParams.idx +'/detail/'+ $routeParams.detail)
.success(function (response) {
     console.log($routeParams.idx );
     console.log($routeParams.detail);
	$scope.idx = $routeParams.idx;
	$scope.details = JSON.stringify($routeParams.detail);

	console.log($scope.details);

	
 });
});