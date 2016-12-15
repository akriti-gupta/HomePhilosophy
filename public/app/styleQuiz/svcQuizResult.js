	angular.module('app').service("quizResult", function($http, $q, $location) {
        var result = [];
        var scores="";
        var styleTitle = [];
        var styleImages = [];
        var styleDesc =[];
        var styleImage = [];
        var roomArr = [];
        var imgArr = [];
        var custSelections = [];
        var showNavBar = true;
        var board;

        var storeUserQuizInfo = function(infoObj){
        	if(infoObj){
        		roomArr = infoObj.roomSelected;	
        		imgArr = infoObj.quizImgSelected;
        		console.log('In storeUserQuizInfo,roomArr is: ');
        		console.log(roomArr);
        		console.log('In storeUserQuizInfo,imgArr is: ');
        		console.log(imgArr);

        		if(imgArr["2"] && imgArr["2"]===-1){
        			console.log('Already know style, style is stored in index 3:'+imgArr["3"]);

        		}
        		else if(imgArr["3"] && imgArr["3"]===-1){
        			console.log('Style Quiz taken. Info stored in index 4 to 8');
        		}
				custSelections = infoObj;
			}
        	
        }
        //Called from quizController to store calculated style before control is passed to login page.
		var storeStyle = function(newObj,boardVal) {
			console.log('In storestyle result is: ');
		    for(i=0;i<newObj.length;i++){
		    	result.push({"id": newObj[i].id, "title": newObj[i].title, "style":newObj[i].style, "desc": newObj[i].desc, "image": newObj[i].image, "value":newObj[i].value});
		    	board = boardVal;
			}
			console.log(result);
			// console.log("In storeStyle, stored res  is: "+result);
		};

		var getStyle = function(){
			return result;
		 };

		var getCustSelections = function(){
			return custSelections;
		 };
		 var getBoard = function(){
		 	return board;
		 }
		 var clearStyle = function(){
		 	result.length = 0;
		 }

		 var fetchStyleInfo = function(){
		 	$http.get('resources/styleText.properties').then(function (response) {
	            styleTitle[0] = response.data.MajorStyle;
	            styleTitle[1] = response.data.SubStyle;
	            styleTitle[2] =  response.data.MinorStyle;

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


		return {
			    storeStyle: storeStyle,
			    getStyle: getStyle,
			    getCustSelections: getCustSelections,
			    clearStyle: clearStyle,
			    fetchStyleInfo: fetchStyleInfo,
			    getStyleTitle: getStyleTitle,
			    getStyleDesc: getStyleDesc,
			    showNavBar: showNavBar,
			   	getStyleImage: getStyleImage,
			   	getBoard: getBoard,
			   	storeUserQuizInfo: storeUserQuizInfo

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






