	angular.module('app').service("quizResult", function($http) {
        var result = [];
        var scores="";
        var styleText = [];
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
	            console.log("resp is: "+response);
	            styleText[0] = response.data.MajorStyle;
	            styleText[1] = response.data.SubStyle;
	            styleText[2] =  response.data.MinorStyle;
	            console.log('TestString is ', response.data.MajorStyle);
	            console.log('BooleanValue is ', response.data.SubStyle);    
	            console.log('BooleanValue is ', response.data.MinorStyle);  
	             
	    		});
		 }

		 var getStyleText = function(){
		 	return styleText;
		 }

		return {
			    storeStyle: storeStyle,
			    getStyle: getStyle,
			    clearStyle: clearStyle,
			    fetchStyleText: fetchStyleText,
			    getStyleText: getStyleText
			  };
        });

	// angular.module('app').factory('mvScore', function($http, $q){
	// 	return{
			
	// 		getStyleScore: function(){
	// 			var dfd = $q.defer();
	// 		 	$http.get('/getScores').then(function(response){
	// 		 	//	console.log('Hello' +response.data.content);
	// 	  			 if(true){
	// 	  				dfd.resolve(true);
	// 	  			}
	// 	  			else{
	// 	  				dfd.resolve(false);
	// 	  			}
	// 	  		});
	// 	  		return dfd.promise;
	// 		},

		
	// 	}
	// });






