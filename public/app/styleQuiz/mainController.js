

angular.module("app")	

		  .controller("MainController",function($scope,$location,quizResult,$http){
		  		quizResult.clearStyle();
		  		
            $http.get('resources/scores.json').success(function (data) {
            console.log('hello');
            $scope.scores = data; // response data 
             //console.log(data[1].matrix[1].scores[1]);

           
        }).
        error(function (data) {
             console.log("Error in reading scores.json : "+data);
        });
    });