angular.module("app")
	.controller("LoginController",function($scope,$location, $http, mvIdentity, mvNotifier, mvAuth, quizResult){
			
			$scope.identity =mvIdentity;
			$scope.showName = true;			
		  	$scope.signin= function(username, password){
		  		mvAuth.authenticateUser(username,password).then(function(success){
		  			if(success){
		  				console.log("In login, quizResult.getStyle() is:"+quizResult.getStyle());
		  				console.log("Len is: "+quizResult.getStyle().length);
		  				if(quizResult.getStyle().length>=1){
		  					$location.path('/styleQuiz');
		  				}
		  				else{
		  					$location.path('/');
		  				}
		  			}
		  			else{
		  				mvNotifier.notify('Username/Password combination incorrect');
		  			}
		  		})
		  	}

		  	$scope.signout = function(){
		  		//console.log('In signout');
		  		mvAuth.logoutUser().then(function(success){
		  			//console.log('going back to index');
		  			$scope.username="";
		  			$scope.password="";
		  			$location.path('/');
		  			//console.log('Call notify');
		  			mvNotifier.notify('You have successfully signed out');
		  		});	
		  	}

		  	$scope.showLogin = function(){
		  		$scope.showName = false;
		  	}
		  	$scope.showRegister = function(){
		  		$scope.showName = true;
		  	}
});