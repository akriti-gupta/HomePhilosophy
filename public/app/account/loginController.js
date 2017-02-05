angular.module("app")
	.controller("LoginController",function($scope,$location, $http, mvIdentity, mvNotifier, mvAuth, mvUserQuiz, quizResult){
			
			$scope.identity =mvIdentity;
			$scope.showName = true;			
		  	$scope.signin= function(username, password){
		  		mvAuth.authenticateUser(username,password).then(function(success){
		  			if(success){
		  				if(quizResult.getStyle().length>=1){
		  					// saveQuizInfo();
		  					var result = quizResult.getStyle();
		  					var userSelectionInfo = quizResult.getCustSelections();
		  					console.log('In LoginController, userSelectionInfo is:');
		  					console.log(userSelectionInfo);
		  					mvUserQuiz.saveUserData(userSelectionInfo, result).then(function(userQuiz){
		  						console.log('In login ctrl after saving user data, userQuiz is:');
		  						console.log(userQuiz);
		  						quizResult.setUserCurrQuiz(userQuiz.data.quizId);
		  						mvNotifier.notify('Login success!');
		  					}, function(reason){
		  							mvNotifier.error(reason);
		  					});
		  					
		  					$location.path('/style-quiz');
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

		  	$scope.signup = function(){
		  		alert('Sign up called');
		  		var newUserData = {
		  			firstName: $scope.firstname,
		  			username: $scope.email,
		  			password: $scope.password
		  		};

		  		mvAuth.createUser(newUserData).then(function(){
		  			console.log('In login ctrl after saving user');
		  			mvNotifier.notify('User account created!');
		  			if(quizResult.getStyle().length>=1){
		  				//saveQuizInfo();
		  				var userSelectionInfo = quizResult.getCustSelections();
		  				var result = quizResult.getStyle();
		  				mvUserQuiz.saveUserData(userSelectionInfo,result).then(function(userQuiz){
		  					console.log('In login ctrl after saving user data');
		  					quizResult.setUserCurrQuiz(userQuiz.data.quizId);
		  					mvNotifier.notify('User account created!');
		  				}, function(reason){
		  					mvNotifier.error(reason);
		  				});
		  					
		  				$location.path('/style-quiz');
		  			}
		  			else{
		  				$location.path('/');
		  			}
		  		}, function(reason){
		  			mvNotifier.error(reason);
		  		});
		  	}

		  	$scope.fbLogin = function(){
		  		$http.get('/auth/facebook').then(function(response){
		  			console.log("Hello response is: "+response);
		  		});
		  	}

		  	$scope.showLogin = function(){
		  		$scope.showName = false;
		  	}
		  	$scope.showRegister = function(){
		  		$scope.showName = true;
		  	}

		  	function saveQuizInfo(){
		  		//Save Quiz info in the DB
				var result = quizResult.getStyle();
				var cust_selections = quizResult.getCustSelections();
				console.log('In login controller, cust_selections is: '+cust_selections);

				var roomArr = cust_selections.roomSelected;	
        		var imgArr = cust_selections.quizImgSelected;

        		console.log(roomArr);
        		console.log(imgArr);
				
				mvUserQuiz.saveUserData(result).then(function(){
		  			console.log('In login ctrl after saving user data');
		  			mvNotifier.notify('User account created!');
		  		}, function(reason){
		  			mvNotifier.error(reason);
		  		});

		  	}
});