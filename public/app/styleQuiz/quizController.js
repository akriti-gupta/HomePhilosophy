
angular.module('app')
    .service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
        console.log("Loaded imafes");
    }]);


angular.module("app")
		  .controller("QuizController",function($scope,$location,quizResult,$http,mvIdentity,imageService,angularGridInstance){

// $http.get('/getScores', function(request, response){
// 						console.log("Inside cb of scores");
// 						console.log("Response is: "+response);
// 						console.log("Response is: "+response.data);
// 						console.log(response.data.success);
// 					});

	
				
    $scope.progressRate=16.6; 
	$scope.pageCount=0;
	// $scope.rowCount = 2;
	$scope.selectedImages = [];
	$scope.identity = mvIdentity;
	$scope.progress = false;
	var prefStyle = [];
	$scope.userStyle = [];
	$scope.board=1;				
 // imageService.loadImages().then(function(data){
 //            data.data.items.forEach(function(obj){
 //                var desc = obj.description,
 //                    width = desc.match(/width="(.*?)"/)[1],
 //                    height = desc.match(/height="(.*?)"/)[1];
 
 //                obj.actualHeight  = height;
 //                obj.actualWidth = width;
 //            });
 //           $scope.pics = data.data.items;
 //        });
 //        $scope.refresh = function(){
 //            angularGridInstance.gallery.refresh();
 //        }

// TODO: Create a JSON file and read in the service. No hardcoding to be done.
	$scope.pics =[{
				isrc: "images/styles/styleBoards/master/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/master/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/master/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/master/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/master/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/master/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/master/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/master/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/master/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 

			  $scope.pics1 =[{
				isrc: "images/styles/styleBoards/contemporary/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/contemporary/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/contemporary/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/contemporary/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/contemporary/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/contemporary/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/contemporary/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/contemporary/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/contemporary/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 

			  $scope.pics2 =[{
				isrc: "images/styles/styleBoards/scandi/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/scandi/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/scandi/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/scandi/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/scandi/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/scandi/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/scandi/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/scandi/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 

			  $scope.pics3 =[{
				isrc: "images/styles/styleBoards/modern/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/modern/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/modern/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/modern/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/modern/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/modern/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/modern/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/modern/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 

			  $scope.pics4 =[{
				isrc: "images/styles/styleBoards/classic/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/classic/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/classic/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/classic/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/classic/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/classic/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/classic/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/classic/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/classic/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 

			  $scope.pics5 =[{
				isrc: "images/styles/styleBoards/transitional/1.png",
				actualWidth: "300px",
				actualHeight: "390px"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/2.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/3.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },

			  {
				isrc: "images/styles/styleBoards/transitional/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/transitional/4.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/6.png",
				actualWidth: "300px",
				actualHeight: "400px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/7.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/8.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/9.png",
				actualWidth: "300px",
				actualHeight: "430px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/transitional/11.png",
				actualWidth: "300px",
				actualHeight: "350px"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/12.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/transitional/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/13.png",
				actualWidth: "300px",
				actualHeight: "370px"
			  },
			  
			  {
				isrc: "images/styles/styleBoards/transitional/15.png",
				actualWidth: "300px",
				actualHeight: "300px"
			  }

			  ]; 


	$scope.stylePref = [
				[{
	        		 image_style: "images/styles/classic.png",
	        		 image_id: 1,
	        		 image_name: "Classic"
	    		}, 
	    		{
	    			 image_style: "images/styles/contemporary.png",
	    			 image_id: 2,
	    			 image_name: "Contemporary"
	    		},
	    		{
	  				 image_style: "images/styles/modern.png",
	  				 image_id: 3,
	  				 image_name: "Modern"
	    		}]
	    		,
	    		[{
	    			image_style: "../images/styles/transitional.png",
	        		image_id: 4,
	        		image_name: "Transitional"
	    		}, 
	    		{
					image_style: "images/styles/minimalist.png",
					image_id: 5,
					image_name: "Asian Minimalist"
	    		},
	    		{
	  				image_style: "images/styles/scandi.png",
	  				image_id: 6,
	  				image_name: "Scandinavian"
	    		}]];

	$scope.styleQuest1 = [
				[{
	        		 image_style: "images/styles/living/1.png",
	        		 image_id: 1
	    		}, 
	    		{
	    			 image_style: "images/styles/living/2.png",
	    			 image_id: 2
	    		},
	    		{
	  				 image_style: "images/styles/living/3.png",
	  				 image_id: 3
	    		}]
	    		,
	    		[{
	    			image_style: "../images/styles/living/4.png",
	        		image_id: 4
	    		}, 
	    		{
					image_style: "images/styles/living/5.png",
					image_id: 5
	    		},
	    		{
	  				image_style: "images/styles/living/6.png",
	  				image_id: 6
	    		}]];
	  			
	$scope.styleQuest2 = [
				[{
	        		image_style: "images/styles/bedroom/1.png",
	        		image_id: 1
	    		}, 
	    		{
	    			image_style: "images/styles/bedroom/2.png",
					image_id: 2
	    		},
	    		{
	  				image_style: "images/styles/bedroom/3.png",
	  				image_id: 3
	    		}],
	    		[{
	    			image_style: "images/styles/bedroom/4.png",
	        		image_id: 4
	    		}, 
	    		{
					image_style: "images/styles/bedroom/5.png",
					image_id: 5
	    		},
	    		{
	  				image_style: "images/styles/bedroom/6.png",
	  				image_id: 6
	    		}]];
	   
	$scope.styleQuest3 = [
				[{
	        		image_style: "images/styles/dining/1.png",
	        		image_id: 1
	    		}, 
	    		{
	    			image_style: "images/styles/dining/2.png",
					image_id: 2
	    		},
	    		{
	  				image_style: "images/styles/dining/3.png",
	  				image_id: 3
	    		}],
	    		[{
	    			image_style: "images/styles/dining/4.png",
	        		image_id: 4
	    		}, 
	    		{
					image_style: "images/styles/dining/5.png",
					image_id: 5
	    		},
	    		{
	    			image_style: "images/styles/dining/6.png",
	  				image_id: 6
	    		}]];

	$scope.styleQuest4 = [
				[{
	        		image_style: "images/styles/kitchen/1.png",
	        		image_id: 1
	    		}, 
	    		{
	    			image_style: "images/styles/kitchen/2.png",
					image_id: 2
	    		},
	    		{
	  				image_style: "images/styles/kitchen/3.png",
	  				image_id: 3
	    		}],
	    		[{
	    			image_style: "images/styles/kitchen/4.png",
	        		image_id: 4
	    		}, 
	    		{
					image_style: "images/styles/kitchen/5.png",
					image_id: 5
	    		},
	    		{
	  				image_style: "images/styles/kitchen/6.png",
	  				image_id: 6
	    		}]];

	    		

	$scope.styleQuest5 = [
				[{
	        		image_style: "images/styles/Textures/1.png",
	        		image_id: 1
	    		}, 
	    		{
	    			image_style: "images/styles/Textures/2.png",
					image_id: 2
	    		},
	    		{
	  				image_style: "images/styles/Textures/3.png",
	  				image_id: 3
	    		}],
	    		[{
	    			image_style: "images/styles/Textures/4.png",
	        		image_id: 4
	    		}, 
	    		{
					image_style: "images/styles/Textures/5.png",
					image_id: 5
	    		},
	    		{
	  				image_style: "images/styles/Textures/6.png",
	  				image_id: 6
	    		}]];

	$scope.styleColor = [
				[{
	        		image_style: "images/styles/colour/balanced.png",
	        		image_id: 1
	    		}, 
	    		{
	    			image_style: "images/styles/colour/bold.png",
					image_id: 2
	    		},
	    		{
	  				image_style: "images/styles/colour/neutral.png",
	  				image_id: 3
	    		}]];

	    		

	$scope.roomArr = [
				[{
	        		room_image: "images/master.png",
	        		room_id: 1
	    		}, 
	    		{
	    			room_image: "images/living.png",
					room_id: 2
	    		},
	    		{
	  				room_image: "images/kids.png",
	  				room_id: 3
	    		}],
	    		[{
	    			room_image: "images/homeOffice.png",
	        		room_id: 4
	    		}, 
	    		{
					room_image: "images/dining.png",
					room_id: 5
	    		},
	    		{
	  				room_image: "images/bedroom.png",
	  				room_id: 6
	    		}]];

	    // 	if(!$scope.majorStyleText){
	    			
			 	// console.log("fetching text now.");
			 	
		   //  	$http.get('resources/styleText.properties').then(function (response) {
	    //         console.log("resp is: "+response);
	    //         $scope.majorStyleText = response.data.MajorStyle;
	    //         $scope.subStyleText = response.data.SubStyle;
	    //         $scope.minorStyleText = response.data.MinorStyle;
	    //         console.log('TestString is ', response.data.MajorStyle);
	    //         console.log('BooleanValue is ', response.data.SubStyle);    
	    //         console.log('BooleanValue is ', response.data.MinorStyle);  
	             
	    // 		});
	    // 	}

	if(quizResult.getStyleText().length==0){
	    quizResult.fetchStyleText();
	}

	// To maintain the quiz result and style quiz pages state when redirected here after login.
	if(quizResult.getStyle().length>=1){
		$scope.userStyle = quizResult.getStyle();
		$scope.progress = false;
	}

	if(mvIdentity.isAuthenticated()){
		//console.log('user is isAuthenticated');
		$scope.gotoLink = "styleQuiz";
	}
	else{
		//console.log('User not authenticated. going to login page');
		$scope.gotoLink = "login";
	}
	
	$scope.nextPage = function(selectedImage){
		$scope.selectedImages.push({page: $scope.pageCount, image_id: selectedImage});
		var currentPage = $scope.pageCount;
		$scope.pageCount++;
		// alert($scope.pageCount);

		switch(currentPage){

			case 0: //quizResult.clearStyle();
					
					$scope.backgroundCol = "#00a99d";
					break; 

			case 1: $scope.progress = true;
					break;

			case 2: 
					$scope.backgroundCol2 = "#00a99d";
					
					$scope.progressRate+=16.5;
					
					break;

			case 3: 
					$scope.backgroundCol3 = "#00a99d";
					
					$scope.progressRate+=16.5;

					break; 

			case 4: 
					$scope.backgroundCol4 = "#00a99d";
					
					$scope.progressRate+=16.5;
					break;

			case 5: $scope.backgroundCol5 = "#00a99d";
					$scope.progressRate+=16.5;
					break;

			case 6: $scope.computeStyle();
					$scope.backgroundCol6 = "#00a99d";
					$scope.progressRate+=16.5;
					break;


			case 7: $scope.progress=false;
					console.log("Called refresh");
					$scope.refresh(); 
					break;


			case 8: $scope.backgroundCol6 = "#00a99d";
					break;


			default: //Show up login page, transfer control with scope. Return. Once logged in
					 //show the page.
					if(mvIdentity.isAuthenticated()){
						$scope.progress = false;	
					}
					else{
					 	console.log("Going to Login page");
					}								 
		}
	}

	$scope.refresh = function(){
		console.log("refreshing gallery now");
        angularGridInstance.gallerypin.refresh();
    }

	$scope.computeStyle = function(){
		//initialising scorecards of each style to 0
		var totA = 0;
		var totB = 0;
		var totC = 0;
		var totD = 0;
		var totE = 0;
		var totF = 0;
		var totG = 0;


		//user selections
		var sel1 = $scope.selectedImages[0].image_id;
		var sel2 = $scope.selectedImages[1].image_id;
		var sel3 = $scope.selectedImages[2].image_id;
		var sel4 = $scope.selectedImages[3].image_id;

		//alert(sel1 + " " +sel2 + " " + sel3 + " " +sel4);

		// LivingRoom  
		if(sel1 == 1){totB+= 1.00; totE+=4.00;} 	
		if(sel1 == 2){totB+= 2.25; totD+= 2.75;}
		if(sel1 == 3){totA+= 4.25; totC+= 0.75;}
		if(sel1 == 4){totC+= 1.75; totF+= 3.25;}
		if(sel1 == 5){totB+= 1.25; totD+= 3.75;}
		if(sel1 == 6){totB+= 3.75; totD+= 0.70; totF+=0.55;}

		// DiningRoom 
		if(sel2 == 1){totB+= 1.25;totD+=3.75;}
		if(sel2 == 2){totA+= 0.5;totB+=0.75;totC+=3.25;totD+=0.5;}
		if(sel2 == 3){totB+= 0.55;totE+=4.45;}
		if(sel2 == 4){totB+= 3.25;totF+=2.95;} //Changed on 23042016
		if(sel2 == 5){totE+= 2.25;totF+=2.75;}
		if(sel2 == 6){totA+= 4.00;totB+=0.50;totC+=0.5;}
		
		// Kitchen
		if(sel3 == 1){totD+= 0.5; totE+= 4.50;}
		if(sel3 == 2){totB+= 4.00; totE+= 2.00; totF+=2.25;} //Changed on 24042016
		if(sel3 == 3){totB+= 1.35;totD+=3.65;}
		if(sel3 == 4){totC+= 0.5;totD+=4.50;}
		if(sel3 == 5){totA+= 4.35;totB+=0.65;}
		if(sel3 == 6){totB+= 0.25; totD+= 3.25; totF+=1.50;}

		// Bedroom
		if(sel4 == 1){totA+= 4.55; totB+=0.15;totC+=0.30;}
		if(sel4 == 2){totB+= 3.95; totC+= 1.05;}
		if(sel4 == 3){totA+= 2.25;totC+=2.25;totF+=0.50;}
		if(sel4 == 4){totB+= 0.5;totD+=3.85;totE+=0.65;}
		if(sel4 == 5){totB+= 2.75;totE+=4.00;totF+=1.25;} //Changed on 24042016
		if(sel4 == 6){totB+= 1.15; totF+= 3.85;}


		//alert("Modern:" +totMod + " contemporary:" +totCntmpry + " Eclectic:" + totEcltc + " Trad:" +totTrad + " Industrial:" +totIndstrl+ " Transitional:" +totTrnsnl);

		var totAll = totA + totB + totC + totD + totE + totF;

		if(totA > 0)
			prefStyle.push({style: 'Classic', value: (Math.round(totA/totAll * 100))});
		if(totB > 0)
			prefStyle.push({style: 'Contemporary', value: (Math.round(totB/totAll * 100))});
		if(totC > 0)
			prefStyle.push({style: 'Transitional', value: (Math.round(totC/totAll * 100))});
		if(totD > 0)
			prefStyle.push({style: 'Modern', value: (Math.round(totD/totAll * 100))});
		if(totE > 0)
			prefStyle.push({style: 'Scandinavian', value: (Math.round(totE/totAll * 100))});
		if(totF > 0)
			prefStyle.push({style: 'Asian Inspired Minimalist', value:(Math.round(totF/totAll * 100))});

		prefStyle.sort(sortValues);

		for(var j =0;j<prefStyle.length; j++){
			
			if(prefStyle[j].value >= 70){
				$scope.userStyle.push({title: quizResult.getStyleText()[0] , style: (prefStyle[j].style), value: (prefStyle[j].value)});
				break;
			}
			else if(prefStyle[j].value < 70 && prefStyle[j].value >= 50){
				$scope.userStyle.push({title: quizResult.getStyleText()[0] , style: (prefStyle[j].style), value: (prefStyle[j].value)});
				if(j+1 < prefStyle.length)
					$scope.userStyle.push({title: quizResult.getStyleText()[1] ,style: (prefStyle[j+1].style), value: (prefStyle[j+1].value)});
				break;

			}
			else if(prefStyle[j].value < 50 && prefStyle[j].value >= 10){
				$scope.userStyle.push({title: quizResult.getStyleText()[0] , style: (prefStyle[j].style), value: (prefStyle[j].value)});
				if(j+1 < prefStyle.length)
					$scope.userStyle.push({title: quizResult.getStyleText()[1], style:(prefStyle[j+1].style), value: (prefStyle[j+1].value)});
				if(j+2 < prefStyle.length)
					$scope.userStyle.push({title: quizResult.getStyleText()[2], style: (prefStyle[j+2].style), value: (prefStyle[j+2].value)});
				break;

			}
		}
		if(!mvIdentity.isAuthenticated()){
			console.log('Stoing style in svc before going to login');
			quizResult.storeStyle($scope.userStyle);
		}
	}

	$scope.retakeQuiz = function(){
		$scope.progressRate=16.6;
		$scope.backgroundCol = "#00a99d";
		$scope.backgroundCol2 = "#cccccc";
		$scope.backgroundCol3 = "#cccccc";
		$scope.backgroundCol4 = "#cccccc";
		$scope.backgroundCol5 = "#cccccc";
		$scope.backgroundCol6 = "#cccccc";
		$scope.pageCount=0;
		// $scope.rowCount = 2;
		$scope.selectedImages = [];
		// $scope.identity = mvIdentity;
		$scope.progress = false;
		prefStyle = [];
		$scope.userStyle = [];
		$scope.board=1;
	}
				
	function sortValues(a, b) {
		if (a.value === b.value) {
			return 0;
		}
		else {
			return (a.value > b.value) ? -1 : 1;
		}
	}
});





    

