

angular.module("app")	

		  .controller("MainController",function($scope,$location,quizResult,$http){
            
		  		quizResult.clearStyle();
		  		
        //     $http.get('app/styleQuiz/scores.json').success(function (data) {
        //     $scope.scores = data; // response data 
        //      //console.log(data[1].matrix[1].scores[1]);

           
        // }).
        // error(function (data) {
        //      console.log("Error in reading scores.json : "+data);
        // });

        //console.log('in mainctrl before getting images');
      // console.log("Img len is: "+styleFactory.isImageFetched());
      // if(styleFactory.isImageFetched()===0){

      //       styleFactory.fetchStyleImage().then(function(success){
      //          // console.log('styleFac called in mainctrl, success is:'+success);
      //           if(success){
      //               console.log("In MainController: "+success);
                    
      //               console.log(styleFactory.getStyleImage());
      //           }
      //           else{}
      //       });
      //   }
      //   console.log(styleFactory.getStyleImage());
        
        // var images = quizResult.fetchStyleImage();
        // console.log(images);



});