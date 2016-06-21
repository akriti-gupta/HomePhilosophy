angular.module("app").controller("LoginController",function($scope,$location, $http, mvIdentity, mvNotifier, mvAuth, quizResult){
			
			$scope.identity =mvIdentity;
						
		  	$scope.signin= function(username, password){
		  		mvAuth.authenticateUser(username,password).then(function(success){
		  			if(success){
		  				//mvNotifier.notify('You have successfully signed in!');
		  				//$scope.go("/styleQuiz");
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

		 //  	$scope.go = function(path){
		 //  	  	$location.path( path );
			// };
});