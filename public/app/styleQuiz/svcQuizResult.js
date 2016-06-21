	angular.module('app').service("quizResult", function($http, $q) {
        var result = [];
        var scores="";
        var styleText = [];
        var styleImages = [];
        

        //Called from quizController to store calculated style before control is passed to login page.
		var storeStyle = function(newObj) {
		    for(i=0;i<newObj.length;i++){
		    	result.push({"title": newObj[i].title, "style":newObj[i].style, "value":newObj[i].value});
			}
		};

		var getStyle = function(){
			return result;
		 };

		 var clearStyle = function(){
		 	result.length = 0;
		 }

		 var fetchStyleText = function(){
		 	$http.get('resources/styleText.properties').then(function (response) {
	         //   console.log("resp is: "+response);
	            styleText[0] = response.data.MajorStyle;
	            styleText[1] = response.data.SubStyle;
	            styleText[2] =  response.data.MinorStyle;
	            });
		 }

		 var getStyleText = function(){
		 	return styleText;
		 }


		 // var fetchStyleImage = function(){
		 // 	// var dfd = $q.defer();
			// 	// console.log('In style factory, getting images');
			//  	$http.get('/getStyleImage').then(function(response){
			 		
		 //  			 if(true){
		 //  			 	styleImages = response.data.results;
		 //  			 	console.log("In svc" +response.data.results);
		 //  				//dfd.resolve(true);
		 //  			}
		 //  			else{
		 //  			//	dfd.resolve(false);
		 //  			}
		 //  		});
		 //  		return styleImages;
		 // }

		 // var getStyleImage  = function(){
		 // 	return styleImages;
		 // }


		return {
			    storeStyle: storeStyle,
			    getStyle: getStyle,
			    clearStyle: clearStyle,
			    fetchStyleText: fetchStyleText,
			    getStyleText: getStyleText
			   // fetchStyleImage: fetchStyleImage,
			   // getStyleImage: getStyleImage

			  };
        });

	// angular.module('app').factory('styleFactory', function($http, $q){
	// 	var styleImages = [];

	// 	return{
	// 		fetchStyleImage: function(){
	// 			var dfd = $q.defer();
	// 			console.log('In style factory, getting images');
	// 		 	$http.get('/getStyleImage').then(function(response){
	// 		 		// console.log('In styleFac: '+response);
	// 		 		// console.log('Hello' +response.data.results);
	// 		 		// console.log('Hello' +response.data.results[0]);
	// 	  			 if(true){
	// 	  			 	styleImages = response.data.results;
	// 	  				dfd.resolve(true);
	// 	  			}
	// 	  			else{
	// 	  				dfd.resolve(false);
	// 	  			}
	// 	  		});
	// 	  		return dfd.promise;
	// 		},

	// 		isImageFetched: function(){
	// 			return styleImages.length;
	// 		},
	// 		getStyleImage: function(){
	// 			return styleImages;
	// 		}

			
	// 	}
	// });






