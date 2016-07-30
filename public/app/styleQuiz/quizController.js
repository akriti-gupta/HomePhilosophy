
angular.module('app')
    .service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
        //console.log("Loaded imafes");
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
	$scope.pagenum = 1;
	// $scope.rowCount = 2;
	$scope.selectedImages = [];
	$scope.selectedRoom = [];
	$scope.identity = mvIdentity;
	$scope.progress = false;
	$scope.progress_result=false;
	var prefStyle = [];
	$scope.userStyle = [];
	$scope.board=1;	
	$scope.disable = true;

// alert('start of ctrl: disable is'+$scope.disable);
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
				actualHeight: "480px",
				imgCredit: "Kimberly Demmy design.Photo by Daniel O’Connor"
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
				actualHeight: "350px",
				imgCredit: "Design by Nottdesign. Photo by A. Avdeenko"
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
				actualHeight: "480px",
				imgCredit: "Design by Kababie Arquitectos. Photo by Jaime Navarro"
			  },

			  {
				isrc: "images/styles/styleBoards/contemporary/5.png",
				actualWidth: "300px",
				actualHeight: "490px",
				imgCredit: "Designer: Lucas Y Hernandez Gil arquitectos. Photo by Adriana Merlo"
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
				actualHeight: "350px",
				imgCredit: "Design by Joel Dessaules Design"
			  },
			  {
				isrc: "images/styles/styleBoards/contemporary/12.png",
				actualWidth: "300px",
				actualHeight: "300px",
				imgCredit: "Design by Nottdesign. Photo by A. Avdeenko"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/contemporary/14.png",
				actualWidth: "300px",
				actualHeight: "470px",
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
				actualHeight: "300px",
				imgCredit: "Kimberly Demmy design.Photo by Daniel O’Connor"
			  },
			  {
				isrc: "images/styles/styleBoards/scandi/3.png",
				actualWidth: "300px",
				actualHeight: "480px",
				imgCredit: "Design by Regan Baker Design. Photo by Sarah Hebenstreit."
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
				actualHeight: "400px",
				imgCredit: "Design by Nest-architects"

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
				actualHeight: "480px",
				imgCredit: "Design by Casa and Margherita Serboli architecture.<br/>Photo by Roberto Ruiz"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/scandi/11.png",
				actualWidth: "300px",
				actualHeight: "350px",
				imgCredit: "Design by Nottdesign. Photo by A. Avdeenko"

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
				actualHeight: "300px",
				imgCredit: "Designer: Kimberly Demmy Design. Photo by Daniel O’Connor"
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
				actualHeight: "300px",
				imgCredit: "By Yodezeen Designs"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/6.png",
				actualWidth: "300px",
				actualHeight: "400px",
				imgCredit: "By Diego Grand"
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
				actualHeight: "430px",
				imgCredit: "B House by Tal Goldsmith Fish Design Studio"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/10.png",
				actualWidth: "300px",
				actualHeight: "480px"
			  },
			  
			  
			  
			  {
				isrc: "images/styles/styleBoards/modern/11.png",
				actualWidth: "300px",
				actualHeight: "350px",
				imgCredit: "Design by nottdesign. Photo by A. Avdeenko"
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
				actualHeight: "300px",
				imgCredit: "Design by Nottdesign. Photo by A. Avdeenko"
			  },
			   
			  {
				isrc: "images/styles/styleBoards/classic/14.png",
				actualWidth: "300px",
				actualHeight: "470px"
			  },
			  {
				isrc: "images/styles/styleBoards/classic/13.png",
				actualWidth: "300px",
				actualHeight: "370px",
				imgCredit: "Designer kimberly Demmy Design. Photo by Daniel O’Connor"
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
				actualHeight: "300px",
				imgCredit: "Designer kimberly Demmy Design. Photo by Daniel O’Connor"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/3.png",
				actualWidth: "300px",
				actualHeight: "480px",
				imgCredit: "Design Studio Oj. Photo By Bass Lu"
			  },

			  {
				isrc: "images/styles/styleBoards/transitional/5.png",
				actualWidth: "300px",
				actualHeight: "490px"
			  },

			  {
				isrc: "images/styles/styleBoards/transitional/4.png",
				actualWidth: "300px",
				actualHeight: "300px",
				imgCredit: "Joel Dessaules Design"
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
				actualHeight: "350px",
				imgCredit: "Design by Studio Oj. Photo by Bass Lu"
			  },
			  {
				isrc: "images/styles/styleBoards/transitional/12.png",
				actualWidth: "300px",
				actualHeight: "300px",
				imgCredit: "Design by Nottdesign. Photo by A. Avdeenko"
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
	        		image_style: "images/styles/colour/neutral.png",
	        		image_id: 1,
	        		image_name: "Neutral"
	    		}, 
	    		{
	    			image_style: "images/styles/colour/balanced.png",
					image_id: 2,
					image_name: "Balanced"
	    		},
	    		{
	  				image_style: "images/styles/colour/bold.png",
	  				image_id: 3,
	  				image_name: "Bold"
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

	    $scope.picp="pics2";	

	if(quizResult.getStyleTitle().length==0){
	    // alert("Fetching");
	    quizResult.fetchStyleInfo();

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
	
	$scope.nextPage = function(){
		
		var currentPage = $scope.pagenum;
		$scope.pagenum++
		$scope.disable=true;
		// alert(currentPage);
		
		switch(currentPage){

			case 1: //quizResult.clearStyle();
					
					$scope.backgroundCol = "#00a99d";
					break; 

			 case 2: 
					
						//TODO: Save selected image id in a service so that it can flow from how it works page to the db
						$location.path('/op-process');

					
					break;

			case 3: 
					$scope.backgroundCol2 = "#00a99d";
					$scope.progressRate+=16.5;
					break;

			case 4: 
					$scope.backgroundCol3 = "#00a99d";
					$scope.progressRate+=16.5;
					break; 

			case 5: 
					$scope.backgroundCol4 = "#00a99d";
					$scope.progressRate+=16.5;
					break;

			case 6: $scope.backgroundCol5 = "#00a99d";
					$scope.progressRate+=16.5;
					break;

			case 7: 
					$scope.computeStyle();
					$scope.backgroundCol6 = "#00a99d";
					$scope.progressRate+=16.5;
					break;


			case 8: $scope.progress=false;
					$scope.refresh(); 
					break;


			case 9: $scope.backgroundCol6 = "#00a99d";
					$scope.progress_result=true;
					break;


			case 10: 
					
					 break;

			default:

					//Show up login page, transfer control with scope. Return. Once logged in
					 //show the page.
					if(mvIdentity.isAuthenticated()){
						$scope.progress = false;	
					}
					else{
					 	console.log("Going to Login page");
					}								 
		}
	}

	$scope.quiz = function(){
		// alert($scope.pagenum);
		$scope.selectedImages[$scope.pagenum] = -1;
		$scope.pagenum++;
		$scope.disable = true;
		$scope.progress = true;
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

		//user selections
		// var sel1 = $scope.selectedImages[2].image_id;
		// var sel2 = $scope.selectedImages[3].image_id;
		// var sel3 = $scope.selectedImages[4].image_id;
		// var sel4 = $scope.selectedImages[5].image_id;
		// var sel5 = $scope.selectedImages[6].image_id;

		console.log($scope.selectedImages);
		var sel1 = $scope.selectedImages[3];
		var sel2 = $scope.selectedImages[4];
		var sel3 = $scope.selectedImages[5];
		var sel4 = $scope.selectedImages[6];
		var sel5 = $scope.selectedImages[7];


		alert(sel1 + " " +sel2 + " " + sel3 + " " +sel4 + " "+sel5);

		// LivingRoom  
		if(sel1 == 1){totC+= 1.75; totF+=3.25;} 	
		if(sel1 == 2){totA+= 4.25; totC+= 0.75;}
		if(sel1 == 3){totB+= 1.00; totE+= 4.00;}
		if(sel1 == 4){totB+= 0.75; totD+= 4.5;}
		if(sel1 == 5){totB+= 0.75; totC+= 4.00;}
		if(sel1 == 6){totB+= 4.5; totC+=1.75;}

		// Bedroom
		if(sel2 == 1){totA+= 4.55; totB+=0.15;totC+=0.30;}
		if(sel2 == 2){totB+= 0.5; totD+= 3.85; totE+=1.65;}
		if(sel2 == 3){totA+= 0.75;totB+=1.65;totC+=3.95;}
		if(sel2 == 4){totB+= 1.15;totF+=4.00;}
		if(sel2 == 5){totB+= 4.65;totE+=3.35;} 
		if(sel2 == 6){totA+= 2.25; totC+= 3.65;}


		// Dining Room 
		if(sel3 == 1){totB+= 1.25;totD+=3.75;}
		if(sel3 == 2){totA+= 4.00;totB+=0.5;totC+=0.5;}
		if(sel3 == 3){totB+= 3.25;totF+=2.95;}
		if(sel3 == 4){totB+= 4.25;totD+=2.75;}
		if(sel3 == 5){totE+= 4.45;}
		if(sel3 == 6){totA+= 0.5;totB+=1.25;totC+=4.25;}
		
		// Kitchen
		if(sel4 == 1){totA+= 4.35; totB+=0.65;}
		if(sel4 == 2){totB+= 3.00; totE+= 2.00; totF+=2.25;} //Changed on 24042016
		if(sel4 == 3){totB+= 1.35;totD+=3.65;}
		if(sel4 == 4){totC+= 3.25;totD+=2.25;totF+=1.5;}
		if(sel4 == 5){totD+= 0.5;totE+=4.5;}
		if(sel4 == 6){totC+= 0.5; totD+= 4.5;}

		// Textures
		if(sel5 == 1){totC+= 1.00; totC+=1.00;totE+= 1.00; totF+=1.00;}
		if(sel5 == 2){totA+= 2.00; totB+= 2.00; totC+=2.00;} 
		if(sel5 == 3){totD+= 1.00;totF+=1.00;}
		if(sel5 == 4){totA+= 2.00;totC+=1.5;totD+=0.5;}
		if(sel5 == 5){totB+= 2.00;totD+=1.00;totF+=2.00;}
		if(sel5 == 6){totA+=1.5;totB+=1.5;totC+= 1.00; totD+= 2;}



		//alert("Modern:" +totMod + " contemporary:" +totCntmpry + " Eclectic:" + totEcltc + " Trad:" +totTrad + " Industrial:" +totIndstrl+ " Transitional:" +totTrnsnl);

		var totAll = totA + totB + totC + totD + totE + totF;

		if(totA > 0)
			prefStyle.push({id: 0, style: 'Classic', value: (Math.round(totA/totAll * 100))});
		if(totB > 0)
			prefStyle.push({id:1, style: 'Contemporary', value: (Math.round(totB/totAll * 100))});
		if(totC > 0)
			prefStyle.push({id:2, style: 'Transitional', value: (Math.round(totC/totAll * 100))});
		if(totD > 0)
			prefStyle.push({id:3, style: 'Modern', value: (Math.round(totD/totAll * 100))});
		if(totE > 0)
			prefStyle.push({id:4, style: 'Scandinavian', value: (Math.round(totE/totAll * 100))});
		if(totF > 0)
			prefStyle.push({id:5, style: 'Asian Inspired', value:(Math.round(totF/totAll * 100))});

		prefStyle.sort(sortValues);
		console.log(prefStyle);


		

		for(var j =0;j<prefStyle.length; j++){
			
			var test= quizResult.getStyleDesc();
			var imageObj = quizResult.getStyleImage()[0];
			// image:quizResult.getStyleImage()[0][prefStyle[j].style]
			var style_name = prefStyle[j].style;
			console.log(style_name);
			console.log(quizResult.getStyleDesc());
			
			if(prefStyle[j].value >= 70){
				$scope.userStyle.push({title: quizResult.getStyleTitle()[0] , style: (prefStyle[j].style), desc:quizResult.getStyleDesc()[0][prefStyle[j].style].text,image: imageObj[style_name].image,value: (prefStyle[j].value)});
				break;
			}
			else if(prefStyle[j].value < 70 && prefStyle[j].value >= 50){
				$scope.userStyle.push({title: quizResult.getStyleTitle()[0] , style: (prefStyle[j].style), desc:quizResult.getStyleDesc()[0][prefStyle[j].style].text,image: imageObj[style_name].image,value: (prefStyle[j].value)});
				if(j+1 < prefStyle.length){
					$scope.userStyle.push({title: quizResult.getStyleTitle()[1] ,style: (prefStyle[j+1].style),desc:quizResult.getStyleDesc()[0][prefStyle[j+1].style].text, image: imageObj[prefStyle[j+1].style].image,value: (prefStyle[j+1].value)});
				}
				break;
			}
			else if(prefStyle[j].value < 50 && prefStyle[j].value >= 10){
				$scope.userStyle.push({title: quizResult.getStyleTitle()[0] , style: (prefStyle[j].style), desc:quizResult.getStyleDesc()[0][prefStyle[j].style].text,image: imageObj[style_name].image,value: (prefStyle[j].value)});
				if(j+1 < prefStyle.length){
					$scope.userStyle.push({title: quizResult.getStyleTitle()[1], style:(prefStyle[j+1].style),desc:quizResult.getStyleDesc()[0][prefStyle[j+1].style].text,image: imageObj[prefStyle[j+1].style].image, value: (prefStyle[j+1].value)});
				}
				if(j+2 < prefStyle.length){
					$scope.userStyle.push({title: quizResult.getStyleTitle()[2], style: (prefStyle[j+2].style), desc:quizResult.getStyleDesc()[0][prefStyle[j+2].style].text,image: imageObj[prefStyle[j+2].style].image,value: (prefStyle[j+2].value)});
				}
				break;
			}
		}

		$scope.setBoard(prefStyle[0]);
		if(!mvIdentity.isAuthenticated()){
			console.log('Stoing style in svc before going to login');
			quizResult.storeStyle($scope.userStyle);
		}
	}

	$scope.setBoard = function(styleResult){
		var res_style = styleResult.style;
		console.log(res_style);
		if(res_style==="Classic")
			$scope.board = $scope.pics4;

		else if(res_style==="Modern")
			$scope.board = $scope.pics3;
		
		else if(res_style==="Transitional")
			$scope.board = $scope.pics5;
		
		else if(res_style==="Contemporary")
			$scope.board = $scope.pics1;
		
		else if(res_style==="Asian Inspired")
			$scope.board = $scope.pics;
		
		else if(res_style==="Scandinavian")
			$scope.board = $scope.pics2;


		}
	

	$scope.retakeQuiz = function(){
		$scope.progressRate=16.6;
		$scope.backgroundCol = "#00a99d";
		$scope.backgroundCol2 = "#cccccc";
		$scope.backgroundCol3 = "#cccccc";
		$scope.backgroundCol4 = "#cccccc";
		$scope.backgroundCol5 = "#cccccc";
		$scope.backgroundCol6 = "#cccccc";
		$scope.pagenum=2;
		$scope.selectedImages = [];
		// $scope.identity = mvIdentity;
		$scope.progress = false;
		prefStyle = [];
		$scope.userStyle = [];
		$scope.board=1;
	}
				
	$scope.loadBoard= function(boardVal){
		
		switch(boardVal){
	
		 case 1:	$scope.board = $scope.pics;
		 			break;
		 case 2:	$scope.board = $scope.pics4;
		 			break;
		 case 3:	$scope.board = $scope.pics5;
		 			break;
		 case 4:	$scope.board = $scope.pics3;
		 			break;
		 default: 	$scope.board = $scope.pics;
		 			break; 
}
		 //$scope.refresh();
	}
	
	function sortValues(a, b) {
		if (a.value === b.value) {
			return 0;
		}
		else {
			return (a.value > b.value) ? -1 : 1;
		}
	}

	$scope.saveSelection = function (imageId) {
		// $scope.selectedImages.push({page: $scope.pageCount, image_id: imageId});
		if($scope.pagenum==1){ // Allow multiple room selections
			
			//If room already exists, user clicked a room icon twice to deselect, remove image ID from array
			var index = $scope.selectedRoom.indexOf(imageId);
			if(index>-1){
				$scope.selectedRoom.splice(index, 1);
			}
			else{
				$scope.selectedRoom.push(imageId);
			}
			if($scope.selectedRoom.length>=1){
				$scope.disable=false;
			}
			else{
				$scope.disable=true;
			}
		}
		else{
			$scope.selectedImages[$scope.pagenum] =  imageId;
			// console.log($scope.selectedImages);
			$scope.disable=false;
		}
	}

	$scope.prev = function(){
		if($scope.pagenum>1){
			$scope.pagenum--;
		}
		else{
			$location.path('/');
		}

	}
});





    

