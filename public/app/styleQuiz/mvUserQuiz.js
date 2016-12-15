angular.module('app').factory('mvUserQuiz', function($http, mvIdentity, $q, quizResult,mvUser){
	return{

		saveUserData: function(userSelectionData,userQuizResult){
			console.log('In mvUserQuiz, userQuizResult, aka result is: '+userQuizResult);
			
			var dfd = $q.defer();
		 	$http.post('/createUserQuiz',{customerId: mvIdentity.currentUser.id , status:-1, quizId:1}).then(function(userQuizDtl){
	  			if(userQuizDtl){
	  				// var user = new mvUser();
	  				// angular.extend(user, response.data.user);
		  			console.log('After saving/ refreshing user data');
					console.log(userQuizDtl);
					console.log(userQuizDtl.data.customerId);
					console.log(userQuizDtl.data.quizId);
	  				// mvIdentity.currentUser = user;

	  				//Save selected rooms and nums, images and result.


	  				//Result : cust_quiz_result
	  				var quizId = userQuizDtl.data.quizId;
	  				$http.post('/saveUserQuizDtls',
	  					 {customerId: mvIdentity.currentUser.id, quizId:quizId, quizInfo:userQuizResult,userSelection:userSelectionData, status:userQuizDtl.data.status })
	  					 .then(function(quizInfo){
	  						dfd.resolve(true);
	  					});
	  				}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		}


		
			
	}
});