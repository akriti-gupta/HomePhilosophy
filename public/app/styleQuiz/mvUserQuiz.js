angular.module('app').factory('mvUserQuiz', function($http, mvIdentity, $q, quizResult,mvUser){
	return{

		saveUserData: function(userSelectionData,userQuizResult){
			console.log('In mvUserQuiz, userQuizResult, aka result is: ');
			console.log(userQuizResult);
			
			var dfd = $q.defer();
		 	$http.post('/createUserQuiz',{customerId: mvIdentity.currentUser.id , status:-1})
		 	.then(function(userQuizDtl){
		 			var quizId = userQuizDtl.data.quizId;
		 			console.log('quizId is: '+quizId);
	  				console.log('userQuizDtl is: ');
	  				console.log(userQuizDtl);
	  				
	  				//Store this quizId in some service.

	  				$http.post('/saveUserQuizDtls',
	  					 {
	  					  customerId: mvIdentity.currentUser.id, 
	  					  quizId:quizId, 
	  					  quizInfo:userQuizResult,
	  					  userSelection:userSelectionData, 
	  					  status:userQuizDtl.data.status 
	  					}).then(function(){
	  					 		dfd.resolve(userQuizDtl);
	  						}), 
	  					function(response){
	  						console.log('Error in saveUserQuizDtls : '+response.data.reason);
							dfd.reject(response.data.reason);
						}
	  		}), 
	  		function(response){
	  			console.log('Error in createUserQuiz :'+response.data.reason);
				dfd.reject(response.data.reason);
			}
	  		return dfd.promise;
		}


		
			
	}
});