angular.module('app').factory('mvUserQuiz', function($http, mvIdentity, $q, quizResult,mvUser,mvCustView){
	return{

		saveUserData: function(userSelectionData,userQuizResult, quizRetaken, quizId){
			var dfd = $q.defer();

			$http.post('/createUserQuiz',{customerId: mvIdentity.currentUser.id , status:-1,retake:quizRetaken, quizId:quizId })
		 	.then(function(response){
	 			if(response.data.success){
	 				var quizData = response.data.quizData;
	 				var quizId = quizData.quizId;
  					$http.post('/saveUserQuizDtls',
  					 {customerId: mvIdentity.currentUser.id, 
  					  quizId:quizId, 
  					  quizInfo:userQuizResult,
  					  userSelection:userSelectionData, 
  					  status:response.data.quizData.status 
  					}).then(function(response){
	  						if(response.data.success){
	  							var quizDtls = [quizData,response]
	  					 		//dfd.resolve(userQuizDtl);
	  					 		dfd.resolve(quizDtls)
	  						}
	  						else{
								dfd.reject(response.data.reason);
							}
						});
	 			}
	 			else{
	 				console.log('Error in createUserQuiz :'+response.data.reason);
					dfd.reject(response.data.reason);
	 			}
		 			
	  		});
	  		return dfd.promise;
		},

		getExistingPrjs: function(){
			var dfd = $q.defer();
			var hasActivePrj = false;
			if(mvIdentity.isAuthenticated()){
				mvCustView.getCustProjectInfo().then(function(projectData){
					if(projectData.quizData!=null && projectData.quizData.length>0){
						for(var i = 0; i<projectData.quizData.length ; i++){
							var currQzObj = projectData.quizData[i];
							if(currQzObj.status===0){
								hasActivePrj=true;
								break;
							}
						}
						if(hasActivePrj){
							dfd.resolve(true);
						}
						else{
							dfd.resolve(false);
						}
					}
				});
			}
			return dfd.promise;
		},

		addRoomToQuiz: function(quizId,roomInfo){
			var dfd = $q.defer();

			$http.post('/addRoomToQuiz',{quizId: quizId , roomInfo:roomInfo})
		 	.then(function(response){
		 		if(response.data.success){
		 			dfd.resolve(true);
		 		}
		 		else{
		 			dfd.reject(response.data.reason);
		 		}
	  		});
	  		return dfd.promise;
			
		},
		saveQuizMiscData:function(data){
			var dfd = $q.defer();

			$http.post('/saveQuizMiscData',{data:data})
		 	.then(function(response){
		 		if(response.data.success){
		 			dfd.resolve(true);
		 		}
		 		else{
		 			dfd.reject(response.data.reason);
		 		}
	  		});
	  		return dfd.promise;
			
		},
		getQuizDetails: function(quizId){
			var dfd = $q.defer();
			$http.post('/getQuizDetails',{quizId:quizId})
		 	.then(function(response){
		 		if(response.data.exists){
		 			dfd.resolve(true);
		 		}
		 		else{
		 			dfd.resolve(false);
		 		}
	  		});
	  		return dfd.promise;
		}
	}
});