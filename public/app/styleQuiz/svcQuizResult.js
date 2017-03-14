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
        var currentQuizId;
        var insRoomArr = [];

        var setUserCurrQuiz = function (quizId){
        	currentQuizId = quizId;
        }
        var getUserCurrQuiz = function(){
        	return currentQuizId;
        }

        var setInsertedRooms = function(roomArr){
        	insRoomArr = roomArr;
        }

        var getInsertedRooms = function(){
        	return insRoomArr;
        }

        var storeUserQuizInfo = function(infoObj){
        	if(infoObj){
        		roomArr = infoObj.roomSelected;	
        		imgArr = infoObj.quizImgSelected;
        		if(imgArr!=null && imgArr.length===6){
        			console.log('Style Quiz taken. Info stored in index 0 to 5');
        		}
        		else{
					console.log('Already know style, style is stored in index 0');        			
        		}
				custSelections = infoObj;
			}
        	
        }
        //Called from quizController to store calculated style before control is passed to login page.
		var storeStyle = function(newObj,boardVal) {
			
		    for(i=0;i<newObj.length;i++){
		    	result.push({"id": newObj[i].id, "title": newObj[i].title, "style":newObj[i].style, "desc": newObj[i].desc, "image": newObj[i].image, "value":newObj[i].value});
		    	board = boardVal;
			}
		};

		var getStyle = function(){
			return result;
		 };

		var getCustSelections = function(){
			return custSelections;
		 };
		 var clearCustSelections = function(){
		 	custSelections.length=0;
		 }
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
			   	storeUserQuizInfo: storeUserQuizInfo,
			   	setUserCurrQuiz: setUserCurrQuiz,
			   	getUserCurrQuiz: getUserCurrQuiz,
			   	clearCustSelections: clearCustSelections,
			   	setInsertedRooms: setInsertedRooms,
			   	getInsertedRooms: getInsertedRooms

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






