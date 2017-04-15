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
        var prevSelectedRoom = [];
        var knownStyle = false;
        var launchKey = false;

        var setIsKnownStyle = function(isKnown){
        	knownStyle = isKnown;
        }
        var getIsKnownStyle = function(){
        	return knownStyle;
        }

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
         var clearInsertedRooms = function(){
        	return insRoomArr.length=0;
        }

        var setCustSelections = function(infoObj){
        	if(infoObj){
        		roomArr = infoObj.roomSelected;	
        		imgArr = infoObj.quizImgSelected;
        		custSelections = infoObj;
			}
        	
        }

        var setSelectedRooms = function(roomArr){
        	prevSelectedRoom = roomArr;
        }

        var getSelectedRooms = function(){
        	return prevSelectedRoom;
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

		 var setLaunchKey = function(key){
		 	launchKey = key;
		 }

		 var getLaunchKey = function(){
		 	return launchKey;
		 }

		return {
			    storeStyle: storeStyle,
			    getStyle: getStyle,
			    clearStyle: clearStyle,
			    setCustSelections: setCustSelections,
			    getCustSelections: getCustSelections,
			    clearCustSelections: clearCustSelections,
			    fetchStyleInfo: fetchStyleInfo,
			    getStyleTitle: getStyleTitle,
			    getStyleDesc: getStyleDesc,
			    showNavBar: showNavBar,
			   	getStyleImage: getStyleImage,
			   	getBoard: getBoard,
			   	setUserCurrQuiz: setUserCurrQuiz,
			   	getUserCurrQuiz: getUserCurrQuiz,
			   	setInsertedRooms: setInsertedRooms,
			   	getInsertedRooms: getInsertedRooms,
			   	clearInsertedRooms:clearInsertedRooms,
			   	setIsKnownStyle: setIsKnownStyle,
			   	getIsKnownStyle: getIsKnownStyle,
			   	setSelectedRooms: setSelectedRooms,
			   	getSelectedRooms: getSelectedRooms,
			   	setLaunchKey: setLaunchKey,
			   	getLaunchKey: getLaunchKey

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






