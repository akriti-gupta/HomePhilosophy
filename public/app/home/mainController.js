angular.module("app").controller("MainController",function($scope,$location,quizResult,payment,custViewSvc,$http){
		  		quizResult.clearStyle();		  		
		  		payment.clearPayPkg();
		  		custViewSvc.clearRequester();

		  		if($location.path()!='/style-quiz')
		  			$scope.isActive = true;
		  		else
		  			$scope.isActive = false;
});