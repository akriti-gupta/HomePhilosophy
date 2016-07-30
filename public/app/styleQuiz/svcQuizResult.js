	angular.module('app').service("quizResult", function($http, $q, $location) {
        var result = [];
        var scores="";
        var styleTitle = [];
        var styleImages = [];
        var styleDesc =[];
        var styleImage = [];
        var showNavBar = true;
        

        //Called from quizController to store calculated style before control is passed to login page.
		var storeStyle = function(newObj) {
		    for(i=0;i<newObj.length;i++){
		    	result.push({"title": newObj[i].title, "style":newObj[i].style, "desc": newObj[i].desc,"value":newObj[i].value});
			}
		};

		var getStyle = function(){
			return result;
		 };

		 var clearStyle = function(){
		 	result.length = 0;
		 }

		 var fetchStyleInfo = function(){
		 	$http.get('resources/styleText.properties').then(function (response) {
	         //   console.log("resp is: "+response);
	            styleTitle[0] = response.data.MajorStyle;
	            styleTitle[1] = response.data.SubStyle;
	            styleTitle[2] =  response.data.MinorStyle;

	           // result.push({"title": newObj[i].title, "style":newObj[i].style, "desc": newObj[i].desc,"value":newObj[i].value});
	            styleDesc.push({"Classic":response.data.Classic,
	            				"Asian Inspired":response.data["Asian Inspired"],
	            				"Contemporary":response.data.Contemporary,
	            				"Transitional":response.data.Transitional,
	            				"Modern":response.data.Modern,
	            				"Scandinavian":response.data.Scandinavian});

	            styleImage.push({"Classic":response.data.Classic,
	            				"Asian Inspired":response.data["Asian Inspired"],
	            				"Contemporary":response.data.Contemporary,
	            				"Transitional":response.data.Transitional,
	            				"Modern":response.data.Modern,
	            				"Scandinavian":response.data.Scandinavian});
	            });

		 	console.log("styleDesc is: "+styleDesc);
		 }

		 var getStyleTitle = function(){
		 	return styleTitle;
		 }

		 var getStyleDesc = function(){
		 	return styleDesc;
		 }

		 var getStyleImage = function(){
		 	return styleImage;
		 }

		 var showNavBar = function(){
		 	if($location.path==='/styleQuiz'){
		 		showNavBar = false;
		 	}
		 	else{
		 		showNavBar = true;
		 	}
		 	return showNavBar;
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
			    fetchStyleInfo: fetchStyleInfo,
			    getStyleTitle: getStyleTitle,
			    getStyleDesc: getStyleDesc,
			    showNavBar: showNavBar,
			   	getStyleImage: getStyleImage

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






