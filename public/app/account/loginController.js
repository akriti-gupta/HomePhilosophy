angular.module("app")
	.controller("LoginController",function($scope,$location, $http,$routeParams, mvIdentity, mvNotifier, mvAuth, mvUserQuiz, mvEmail, quizResult){
			
			$scope.identity =mvIdentity;
			$scope.showName = true;		

			$scope.initLogin = function(){

				var isFBLoggedIn = $routeParams.fb;
				if($scope.identity.isAuthenticated() && !isFBLoggedIn){
					$location.path('/');
				}
				// else if(quizResult.getStyle().length>1){

				// }
				if(isFBLoggedIn){
					var result = JSON.parse(window.localStorage.getItem('result'));
					var userSelectionInfo = JSON.parse(window.localStorage.getItem('userSelectionInfo'));
					quizResult.storeStyle(result);
					quizResult.setCustSelections(userSelectionInfo);
					window.localStorage.removeItem('result');
					window.localStorage.removeItem('userSelectionInfo');

					if(result!=null && result.length>0 ){
						// mvUserQuiz.saveUserData(userSelectionInfo, result).then(function(userQuiz){
						mvUserQuiz.saveUserData(userSelectionInfo, result, false,quizResult.getUserCurrQuiz()).then(function(userQuiz){
							quizResult.setUserCurrQuiz(userQuiz[0].quizId);
		  					quizResult.setInsertedRooms(userQuiz[1].data.results.roomData);
		  					mvNotifier.notify('Login success!');
	  						if(userSelectionInfo!=null && userSelectionInfo.quizImgSelected!=null && userSelectionInfo.quizImgSelected.length===1){
	  							$location.search({});
	  							$location.path('/pricing');
	  						}
	  						else{
	  							$location.search({});
	  							$location.path('/style-quiz');
	  						}
		  					}, function(reason){
		  							mvNotifier.error(reason);
		  							alert(reason);
		  				});
					}
					else{
						$location.search({});
						$location.path('/dashboard');
					}
				}
			}

		  	$scope.signin= function(username, password){
		  		mvAuth.authenticateUser(username,password).then(function(success){
		  			if(success){
		  				if(mvIdentity.currentUser.role==="admin"){
		  					$location.path('/admin/users');
		  				}
		  				else{
			  		// 		mvUserQuiz.getExistingPrjs().then(function(projects){
							// 	if(projects){
							// 		$location.path('/dashboard');
							// 	}
							// });

			  				if(quizResult.getStyle().length>=1){
			  					var result = quizResult.getStyle();
			  					var userSelectionInfo = quizResult.getCustSelections();
			  					// mvUserQuiz.saveUserData(userSelectionInfo, result).then(function(userQuiz){
			  					mvUserQuiz.saveUserData(userSelectionInfo, result, false,quizResult.getUserCurrQuiz()).then(function(userQuiz){
			  						quizResult.setUserCurrQuiz(userQuiz[0].quizId);
			  						quizResult.setInsertedRooms(userQuiz[1].data.results.roomData);
			  						mvNotifier.notify('Login success!');
			  						if(userSelectionInfo.quizImgSelected.length===1){
			  							// $location.path('/tell-us-more');
			  							$location.path('/pricing');
			  						}
			  						$location.path('/style-quiz');
			  					}, function(reason){
			  							mvNotifier.error(reason);
			  							//alert(reason);
			  					});
			  				}
			  				else{
			  					$location.path('/dashboard');
			  				}
			  			}
		  			}
		  			else{
		  				alert('Username/Password combination incorrect');
		  				//mvNotifier.notify('Username/Password combination incorrect');
		  			}
		  		})
		  	}

	  		$scope.fbLogin = function(){
				var result = quizResult.getStyle();
		  		var userSelectionInfo = quizResult.getCustSelections();
				window.localStorage.setItem('result',JSON.stringify(result));
				window.localStorage.setItem('userSelectionInfo',JSON.stringify(userSelectionInfo));
		  	}


		  	$scope.signout = function(){
		  		mvAuth.logoutUser().then(function(success){
		  			$scope.username="";
		  			$scope.password="";
		  			$location.path('/');
		  			mvNotifier.notify('You have successfully signed out');
		  		});	
		  	}

		  	$scope.signup = function(){
		  		if(typeof $scope.firstname=='undefined' || $scope.firstname===''){
		  			alert('Please enter your name');
		  			return false;
		  		}
		  		if(typeof $scope.email=='undefined'){
		  			alert('Please enter your username');
		  			return false;
		  		}
		  		if(typeof $scope.password=='undefined'){
		  			alert('Please enter your password');
		  			return false;
		  		}
		  		var newUserData = {
		  			firstName: $scope.firstname,
		  			username: $scope.email,
		  			password: $scope.password
		  		};

		  		mvAuth.createUser(newUserData).then(function(){
		  			mvNotifier.notify('User account created!');
		  			if(quizResult.getStyle().length>=1){
		  				var userSelectionInfo = quizResult.getCustSelections();
		  				var result = quizResult.getStyle();
		  				// mvUserQuiz.saveUserData(userSelectionInfo,result).then(function(userQuiz){
		  				mvUserQuiz.saveUserData(userSelectionInfo, result, false,quizResult.getUserCurrQuiz()).then(function(userQuiz){
		  					quizResult.setUserCurrQuiz(userQuiz[0].quizId);
		  					quizResult.setInsertedRooms(userQuiz[1].data.results.roomData);
		  					mvNotifier.notify('User account created!');
		  					$location.path('/style-quiz');
		  				}, function(reason){
		  					mvNotifier.error(reason);
		  					alert(reason);
		  				});
		  			}
		  			else{
		  				$location.path('/');
		  			}
		  			var mailData = {'template':'login','to':mvIdentity.currentUser.username,'name':mvIdentity.currentUser.firstname}
		  			mvEmail.sendEmail(mailData).then(function(success){
			  				if(success)
				  				mvNotifier.notify('Mail sent');
				  			else
				  				mvNotifier.notify('Mail not sent');

			  		}, function(reason){
			  			alert(reason);
			  			mvNotifier.error(reason);
			  		});

		  		}, function(reason){
		  			alert(reason);
		  			mvNotifier.error(reason);
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
				var roomArr = cust_selections.roomSelected;	
        		var imgArr = cust_selections.quizImgSelected;

				// mvUserQuiz.saveUserData(result).then(function(){
				mvUserQuiz.saveUserData(userSelectionInfo,result,false,quizResult.getUserCurrQuiz()).then(function(userQuiz){
		  			mvNotifier.notify('User account created!');
		  		}, function(reason){
		  			mvNotifier.error(reason);
		  			alert(reason);
		  		});

		  	}
});