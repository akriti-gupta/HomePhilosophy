
angular.module('app')
    .service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
        
    }]);


angular.module("app")
		  .controller("QuizController",function($scope,$location,$window,quizResult,$http,mvIdentity,imageService,angularGridInstance){




// $http.get('/getScores', function(request, response){
// 						console.log("Inside cb of scores");
// 						console.log("Response is: "+response);
// 						console.log("Response is: "+response.data);
// 						console.log(response.data.success);
// 					});

	
				
    $scope.progressRate=16.6; 
	$scope.pagenum = 1;
	$scope.selectedImages = [];
	$scope.selectedRoom = [];
	$scope.identity = mvIdentity;
	$scope.progress = false;
	$scope.progress_result=true;
	var prefStyle = [];
	$scope.userStyle = [];
	$scope.board=1;	
	$scope.disable = true;
	$scope.arrImgLiked = [];
	$scope.room_comments = "";
	var last_active_room_id = 0;
	var arrComments = [];
	var roomCommentArr = [];
	$scope.imgCmtsArr = [];
	$scope.image_id=-1;
	$scope.roomSelectionArr = [];

	 $scope.units = [
	 	 {'id': 0, 'label': '',value:0},
         {'id': 1, 'label': '1',value:1},
         {'id': 2, 'label': '2',value:2},
         {'id': 3, 'label': '3',value:3},
         {'id': 4, 'label': '4',value:4},
         {'id': 5, 'label': '5',value:5}
      ];

    
   $scope.master= $scope.units[0];
   $scope.living= $scope.units[0];
   $scope.kids= $scope.units[0];
   $scope.office= $scope.units[0];
   $scope.dining= $scope.units[0];
   $scope.bedroom= $scope.units[0];

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
	        		 image_name: "Classic",
	        		 image_desc:"Timeless, elegant aesthetics with neutral colours, distinct shapes and a large focal point."
	    		}, 
	    		{
	    			 image_style: "images/styles/contemporary.png",
	    			 image_id: 2,
	    			 image_name: "Contemporary",
	    			 image_desc:"Staying true to what is on trend now, this fresh style features blended textures of fabrics, leathers and wood."
	    		},
	    		{
	  				 image_style: "images/styles/modern.png",
	  				 image_id: 3,
	  				 image_name: "Modern",
	  				 image_desc:"Celebrated for its simple and stylish pieces that focus on geometry and clean lines, often with distinct colour palettes. "
	    		}]
	    		,
	    		[{
	    			image_style: "../images/styles/transitional.png",
	        		image_id: 4,
	        		image_name: "Transitional",
	        		image_desc: "A style that speaks to the unique merging of classic and contemporary, it combines masculine and feminine elements."
	    		}, 
	    		{
					image_style: "images/styles/minimalist.png",
					image_id: 5,
					image_name: "Asian Minimalist",
					image_desc: "A minimalistic style that incorporates natural elements; this style is all about contemporary sophistication with subtle print and texture."
	    		},
	    		{
	  				image_style: "images/styles/scandi.png",
	  				image_id: 6,
	  				image_name: "Scandinavian",
	  				image_desc: "Renowned for its understated colour palette, simplicity and utility; Scandinavian influence embraces functionality and clean lines."
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

	    	//$scope.roomNames = ["Test","Master room","Living room","Kids room","Home office","Dining room","Bedroom"];

	$scope.roomArr = [
				[{
	        		room_image: "images/master.png",
	        		room_id: 1,
	        		room_name: "Master Bedroom"
	    		}, 
	    		{
	    			room_image: "images/living.png",
					room_id: 2,
					room_name: "Living room"
	    		},
	    		{
	  				room_image: "images/kids.png",
	  				room_id: 3,
	  				room_name: "Kids Room"
	    		}],
	    		[{
	    			room_image: "images/homeOffice.png",
	        		room_id: 4,
	        		room_name: "Home Office"
	    		}, 
	    		{
					room_image: "images/dining.png",
					room_id: 5,
					room_name: "Dining Room"
	    		},
	    		{
	  				room_image: "images/bedroom.png",
	  				room_id: 6,
	  				room_name: "Bedroom"
	    		}]];


	 

	if(quizResult.getStyleTitle().length==0){
	    quizResult.fetchStyleInfo();
	}

	// To maintain the quiz result and style quiz pages state when redirected here after login.
	// console.log("quizResult.getStyle() is :"+quizResult.getStyle());
	// console.log("Stored result len is:"+quizResult.getStyle().length)
	if(quizResult.getStyle().length>=1){
		$scope.userStyle = quizResult.getStyle();
		$scope.pagenum=11;
		$scope.progress_result = false;
		$scope.board = quizResult.getBoard();


	}
	if($scope.pagenum===11){
		$scope.disable=false;
	}

	// if(mvIdentity.isAuthenticated()){
	// 	//console.log('user is isAuthenticated');
	// 	$scope.gotoLink = "styleQuiz";
	// }
	// else{
	// 	//console.log('User not authenticated. going to login page');
	// 	$scope.gotoLink = "login";
	// }
	
	$scope.nextPage = function(){
		
		var currentPage = $scope.pagenum;
		$scope.pagenum++;

		switch(currentPage){

			case 1: //quizResult.clearStyle();
					
					// alert($scope.selectedRoom);

					saveRoomInfo();
					scrollTop();
					break; 

			 case 2: //$location.path('/op-process');
			 		 scrollTop();
					 break;

			case 3: 
					
			case 4:
			case 5: 		
			case 6:	
			case 7:	  $scope.progressRate+=16.5
					  scrollTop();	
					  break;

			case 8: 
					$scope.computeStyle();
					$scope.progressRate+=16.5;
					scrollTop();
					break;


			case 9: $scope.progress=false;
					$scope.refresh(); 
					scrollTop();
					break;


			case 10: //Pinboard
					
					$scope.disable = false;

					if(mvIdentity.isAuthenticated()){
						$scope.progress = false;
						$scope.progress_result = true;
					}
					else{
					 	$location.path('/login');
					}
					scrollTop();
					break;


			case 11:// $scope.progress_result=true;

					 $location.path('/tell-us-more');
					 break;

			// default:

			// 		//Show up login page, transfer control with scope. Return. Once logged in
			// 		 //show the page.
			// 		if(mvIdentity.isAuthenticated()){
			// 			$scope.progress = false;	
			// 		}
			// 		else{
			// 		 	console.log("Going to Login page");
			// 		}
			// 		break;

												 
		}
	}

	$scope.quiz = function(option){
		// alert($scope.pagenum);
		$scope.selectedImages[$scope.pagenum] = -1;
		scrollTop();
		if(option===1){
			$scope.progress = true;
			$scope.pagenum=4;			
		}

		else
			$scope.pagenum++;
		//$scope.disable = true;

		
	}

	
	

	$scope.refresh = function(){
		// console.log("refreshing gallery now");
        
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

		// console.log($scope.selectedImages);
		var sel1 = $scope.selectedImages[4];
		var sel2 = $scope.selectedImages[5];
		var sel3 = $scope.selectedImages[6];
		var sel4 = $scope.selectedImages[7];
		var sel5 = $scope.selectedImages[8];


		// alert(sel1 + " " +sel2 + " " + sel3 + " " +sel4 + " "+sel5);

		// LivingRoom  
		if(sel1 == 1){totC+= 1.75; totF+=3.25;} 	
		if(sel1 == 2){totA+= 6.25; totC+= 0.75;}
		if(sel1 == 3){totB+= 1.00; totE+= 4.00;}
		if(sel1 == 4){totB+= 0.75; totD+= 4.5;}
		if(sel1 == 5){totB+= 0.75; totC+= 4.00;}
		if(sel1 == 6){totB+= 4.5; totC+=1.75;}

		// Bedroom
		if(sel2 == 1){totA+= 6.55; totB+=0.15;totC+=0.30;}
		if(sel2 == 2){totB+= 0.5; totD+= 3.85; totE+=1.65;}
		if(sel2 == 3){totA+= 0.75;totB+=1.65;totC+=3.95;}
		if(sel2 == 4){totB+= 1.15;totF+=4.00;}
		if(sel2 == 5){totB+= 4.65;totE+=3.35;} 
		if(sel2 == 6){totA+= 2.25; totC+= 3.65;}


		// Dining Room 
		if(sel3 == 1){totB+= 1.25;totD+=3.75;}
		if(sel3 == 2){totA+= 6.00;totB+=0.5;totC+=0.5;}
		if(sel3 == 3){totB+= 3.25;totF+=2.95;}
		if(sel3 == 4){totB+= 4.25;totD+=2.75;}
		if(sel3 == 5){totE+= 4.45;}
		if(sel3 == 6){totA+= 0.5;totB+=1.25;totC+=4.25;}
		
		// Kitchen
		if(sel4 == 1){totA+= 6.35; totB+=0.65;}
		if(sel4 == 2){totB+= 3.00; totE+= 2.00; totF+=2.25;} //Changed on 24042016
		if(sel4 == 3){totB+= 1.35;totD+=3.65;}
		if(sel4 == 4){totC+= 3.25;totD+=2.25;totF+=1.5;}
		if(sel4 == 5){totD+= 0.5;totE+=4.5;}
		if(sel4 == 6){totC+= 0.5; totD+= 4.5;}

		// Textures
		if(sel5 == 1){totC+= 1.00; totC+=1.00;totE+= 1.00; totF+=1.00;}
		if(sel5 == 2){totA+= 4.00; totB+= 2.00; totC+=2.00;} 
		if(sel5 == 3){totD+= 1.00;totF+=1.00;}
		if(sel5 == 4){totA+= 4.00;totC+=1.5;totD+=0.5;}
		if(sel5 == 5){totB+= 2.00;totD+=1.00;totF+=2.00;}
		if(sel5 == 6){totA+=3.5;totB+=1.5;totC+= 1.00; totD+= 2;}



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
		// console.log(prefStyle);


		

		for(var j =0;j<prefStyle.length; j++){
			
			var test= quizResult.getStyleDesc();
			var imageObj = quizResult.getStyleImage()[0];
			// image:quizResult.getStyleImage()[0][prefStyle[j].style]
			var style_name = prefStyle[j].style;
			// console.log(style_name);
			// console.log(quizResult.getStyleDesc());
			
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
			// console.log('Storing style in svc before going to login, to store: '+$scope.userStyle);
			quizResult.storeStyle($scope.userStyle,$scope.board);
		}
	}

	$scope.setBoard = function(styleResult){
		var res_style = styleResult.style;
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
				
// 	$scope.loadBoard= function(boardVal){
		
// 		switch(boardVal){
	
// 		 case 1:	$scope.board = $scope.pics;
// 		 			break;
// 		 case 2:	$scope.board = $scope.pics4;
// 		 			break;
// 		 case 3:	$scope.board = $scope.pics5;
// 		 			break;
// 		 case 4:	$scope.board = $scope.pics3;
// 		 			break;
// 		 default: 	$scope.board = $scope.pics;
// 		 			break; 
// }
		 
// 	}
	
	function sortValues(a, b) {
		if (a.value === b.value) {
			return 0;
		}
		else {
			return (a.value > b.value) ? -1 : 1;
		}
	}

	$scope.saveSelection = function (imageId,roomName,roomDispName) {
		console.log('Save selections called');
		if($scope.pagenum==1){ // Allow multiple room selections
			
			//If room already exists, user clicked a room icon twice to deselect, remove image ID from array
			//var index = $scope.selectedRoom.indexOf(imageId);
			var index = -1;
			for(var i in $scope.selectedRoom){
				if($scope.selectedRoom[i].room_id===imageId){
					index = i;
					break;
				}
			}
			// console.log("index is: "+index);
			if(index>-1){
				$scope.selectedRoom.splice(index, 1);
				// console.log("After splicing, room arr is: "+$scope.selectedRoom);
			}
			
				//$scope.selectedRoom.push(imageId);
				else $scope.selectedRoom.push({"room_id":imageId,"room_name":roomName,"room_num":1,"room_disp_name":roomDispName});
				// console.log("After new image, room arr is: "+$scope.selectedRoom);
			
			if($scope.selectedRoom.length>=1){
				$scope.disable=false
			}
			else{
				$scope.disable=true;
			}
			// console.log("Final, room arr is: "+$scope.selectedRoom);
		}
		else{
			$scope.selectedImages[$scope.pagenum] =  imageId;
			// console.log($scope.selectedImages);
			//$scope.disable=false;
			if($scope.pagenum!=9)
				$scope.nextPage();
		}
	}

	$scope.prev = function(){
		if($scope.pagenum==11){
			$scope.refresh();
		}
		if($scope.pagenum>3 && $scope.pagenum<10){
			$scope.progressRate-=16.5;
		}

		if($scope.pagenum<=3){
			$scope.progress=false;
		}

		if($scope.pagenum>1){
			$scope.pagenum--;
		}

		else{
			$location.path('/');
		}

		
   		 scrollTop();  
		

		

	}

	function scrollTop(){

		console.log($scope.pagenum);
		if($scope.pagenum>=3 && $scope.pagenum<=8){
			setTimeout(function() {
	   		 $(window).scrollTop(350);  
			}, 0);
		}
		else{
			setTimeout(function() {
	   		 $(window).scrollTop(10);  
			}, 0);
		}	
	}

	function saveRoomInfo(){
		var roomDsgArr =[];
		var room = 'numMaster';
		console.log("Rooms Selected are: ");
		// console.log($scope[room]);
		for(var i in $scope.selectedRoom){
			$scope.selectedRoom[i].room_num = $scope[$scope.selectedRoom[i].room_name];
		}
		
		console.log($scope.selectedRoom);

		for (var i in $scope.selectedRoom){
			if($scope.selectedRoom[i].room_num.id > 1){
				for(var j=1; j<= $scope.selectedRoom[i].room_num.id; j++){
					$scope.roomSelectionArr.push($scope.selectedRoom[i].room_disp_name+' '+j);
				}
			}
			else{
				$scope.roomSelectionArr.push($scope.selectedRoom[i].room_disp_name);
			}
		}
	}

	$scope.isActive = function(index){
		
		if(index===0)
			return 'active';
	}
	$scope.imageLiked = function(image_id){
		var index = $scope.arrImgLiked.indexOf(image_id);
		if(index>-1){
			$scope.arrImgLiked.splice(index, 1);
		}
		else if($scope.arrImgLiked.length<3){
			$scope.arrImgLiked.push(image_id);
		}
	}


	
	// $scope.loadComments = function(img_id,room_id,roomTabClicked){
	// 	$scope.img_id = img_id;
	// 	console.log('roomTabClicked is '+roomTabClicked + ' room_id = '+room_id);
	// 	var comment = "";
	// 	if(roomTabClicked){
	// 		comment = getRoomComments(room_id);
	// 		if(comment===""){
	// 			//Check in master array, if commented earlier and launched comment box again
	// 			comment = getImgCmtForRoom(img_id,room_id);
	// 		}
	// 	}
	// 	else{

	// 		// roomCommentArr=[];
	// 		console.log('Comment Icon Clicked, fetching cmt for img_id: '+img_id+' and room_id: '+room_id);
	// 		comment = getImgFirstCmt($scope.img_id);
	// 	}
		
	// 	$scope.room_comments = comment;
	// }


	$scope.loadComments = function(img_id,room_id){
		$scope.img_id = img_id;
		console.log('Img Id is: '+$scope.img_id);
		console.log('Room Id is: '+room_id);
		var comments = "";
		console.log('arrComments.length is: '+arrComments.length);
		if(arrComments.length > 0){
			for(var i = 0; i< arrComments.length ; i++){
				console.log('arrComments[i].image_id is :'+arrComments[i].image_id);
				if(arrComments[i].image_id ===img_id){
					console.log('img MAtcheeeeessss');
					for(var j =0; j< arrComments[i].comments.length;j++){
						console.log('arrComments[i].comments[j].room_id is :'+arrComments[i].comments[j].room_id);
						if(arrComments[i].comments[j].room_id === room_id){
							console.log('Room matcchhhess');
							console.log('comment fetched iss: '+arrComments[i].comments[j].room_comments);
							comments = arrComments[i].comments[j].room_comments;
							break;
						}
					}
					break;
				}
			}
		}
		$scope.room_comments = comments;
	}

	$scope.saveCmtsOnTabClick = function(room_id){
		
		var idx_exitsingObj = -1;
		var idx_image_obj = -1;
		var idx_cmt_obj = -1;
		if($scope.selectedRoom.length==1){
			var hasCmt = false;
			arrCommentsTmp =[];
			arrCommentsTmp.push({"room_id":0,"room_comments":$scope.room_comments});
			for(var i =0; i< arrComments.length; i++){
				if(arrComments[i].image_id===$scope.img_id){
					hasCmt = true;
					arrComments[i].comments[0] = arrCommentsTmp;
					break;
				}
			}
			if(!hasCmt)
				arrComments.push({"image_id":$scope.img_id,"comments":arrCommentsTmp});
		}
		else{
		for(var i =0; i< arrComments.length; i++){
			if(arrComments[i].image_id===$scope.img_id){
				idx_image_obj = i;
				var arr_comment = arrComments[i].comments;
				for(var j =0; j<arr_comment.length; j++){
					if(arr_comment[j].room_id===last_active_room_id){
						idx_cmt_obj = j;
						break;
					}
				}
				break;
			}
		}
		if(idx_image_obj===-1 && idx_cmt_obj==-1){
			if($scope.room_comments!=""){
				var arrCommentsTmp=[];
				arrCommentsTmp.push({"room_id":last_active_room_id,"room_comments":$scope.room_comments})
				arrComments.push({"image_id":$scope.img_id,"comments":arrCommentsTmp});
			}	
		}
		else if(idx_image_obj>=0 && idx_cmt_obj>=0){ //Cmt exits
			console.log('Both exits');
			console.log(arrComments[idx_image_obj].comments[idx_cmt_obj].room_comments);
			if((arrComments[idx_image_obj].comments[idx_cmt_obj].room_comments).localeCompare($scope.room_comments) != 0)
				arrComments[idx_image_obj].comments[idx_cmt_obj].room_comments = $scope.room_comments;
		}
		else if(idx_image_obj>=0 && idx_cmt_obj===-1){ //Only image exists, no comment for the room
			if($scope.room_comments!=""){
				console.log('idx_image_obj is '+idx_image_obj+ ' and idx_cmt_obj = '+idx_cmt_obj);			
				console.log('arrComments[idx_image_obj].comments is: ');
				var arrCommentsTmp=arrComments[idx_image_obj].comments;
				console.log(arrCommentsTmp);
				arrCommentsTmp.push({"room_id":last_active_room_id,"room_comments":$scope.room_comments});
				console.log('after push');
				console.log(arrCommentsTmp);
				arrComments[idx_image_obj].comments=arrCommentsTmp;
			}
		}
		// console.log(arrComments);
		last_active_room_id = room_id;
		$scope.loadComments($scope.img_id,room_id);
		}
		console.log(arrComments);
	}

	$scope.submitComments = function(item){
		var room_id = item.currentTarget.getAttribute("data-room-id");
		console.log('In submit, room_id is: '+room_id);
		$scope.saveCmtsOnTabClick(room_id);
		console.log('After submit, final arr is: ');
		console.log(arrComments);
		last_active_room_id = 0;
	}

	// $scope.saveCmtsOnImage = function(room_id,arrTemp){
	// 	var idx_exitsingObj = -1;


	// 	if(idx_exitsingObj===-1){
	// 		arrComments.push({"image_id":$scope.img_id, "comments":arrTemp});
	// 	}
	// }



	// //on li click, submitFlag=0, 1 on Submit hit
	// $scope.saveImgRoomCmts = function(room_id,submitFlag){

	// 	console.log('In saveImgRoomCmts: '+submitFlag);
	// 	console.log(typeof(submitFlag));
	// 	if(submitFlag===1) console.log('Submitted');
	// 	else console.log('Tab Clicked');
		
	// 	saveRoomComment($scope.img_id,room_id);
		
	// 	if(submitFlag===0){
	// 		// showExistingComment(img_id,room_id);
	// 		console.log('Now loading latest active room cmts');
	// 		$scope.loadComments($scope.img_id,room_id,true);
	// 	}
	// 	if(submitFlag===1){
	// 		saveImgCmts($scope.img_id);
	// 	}
	// }

	// $scope.submitImgCmts = function(item){
	// 	var img_id = item.currentTarget.getAttribute("data-img-id");
 //        var last_active_rid = item.currentTarget.getAttribute("data-room-id");
	// 	$scope.saveImgRoomCmts(active_room_tab,1);
	// 	active_room_tab = 0;
	// }

	

	// function saveRoomComment(img_id,room_id){
	// 	console.log('Saving cmts for room_id :' +active_room_tab +' of image: '+img_id);
	// 	var commentArr;
	// 	// console.log(active_room_tab + " and " +room_id );
	// 	if($scope.selectedRoom.length>1){
	// 		var cmt_index = indexOfRoomCmt(roomCommentArr,active_room_tab,$scope.room_comments);
	// 		console.log('exists cmt index = '+cmt_index);
	// 		if(cmt_index==-1){
	// 			if($scope.room_comments!=""){
	// 				roomCommentArr.push({"room_id":active_room_tab, "room_comments":$scope.room_comments});
	// 			}
	// 		}
	// 		else if(cmt_index >= 0){				
	// 			roomCommentArr.splice(cmt_index,1);
	// 			roomCommentArr.push({"room_id":active_room_tab, "room_comments":$scope.room_comments});
	// 		}
			
			
	// 		active_room_tab = room_id;
	// 		console.log('After saving room cmts, roomCommentArr = ');
	// 		console.log(roomCommentArr);
			
	// 	}
	// 	//Only 1 room selected on page 1
	// 	else{
	// 		// roomCommentArr
	// 	}

	// }

	// function saveImgCmts(img_id){

	// 	//Check if cmt exits and splice and save, else
	// 	console.log('In save of image Comment');
	// 	var imgComments = isExistsImgCmt(img_id);
	// 	console.log('existing cmt obj for img: '+imgComments);
	// 	if(imgComments!=-1){
	// 		$scope.imgCmtsArr.splice(imgComments,1);
	// 	}
	// 	$scope.imgCmtsArr.push({"image_id":img_id, "comments":roomCommentArr});	
		
		
	// 	roomCommentArr=[];
	// 	console.log('After saving img cmts, arr is:');
	// 	console.log($scope.imgCmtsArr);

	// }

	// // $scope.showExistingComment = function(img_id, room_id){
	// // 	var current_comment = roomCommentExists(room_id);
	// // 	$scope.room_comments = current_comment;
	// // }
	// //submitFlag = true when comments submitted per image. false when room tabs clicked and cmts per room have to be saved.
	

	

	// function getRoomComments(room_id){
	// 	var comment = "";
	// 	console.log('In getting room cmts, rommcmtsarr is:');
	// 	console.log(roomCommentArr);
	// 	for(var i =0;i<roomCommentArr.length;i++){
	// 		if(roomCommentArr[i].room_id===room_id){
	// 			comment = roomCommentArr[i].room_comments;
	// 			break;
	// 		}
	// 	}
	// 	console.log('Returning Comment: '+comment);
	// 	return comment;
	// }

	// function getImgFirstCmt(img_id){
	// 	var comments ="";
	// 	console.log('In getImgFirstCmt, imgCmtArr len is: '+$scope.imgCmtsArr.length+ ' and arr is: ');
	// 	console.log($scope.imgCmtsArr);
	// 	console.log('Img_id passed is: '+img_id);
	// 	for(var i =0;i<$scope.imgCmtsArr.length;i++){
	// 		console.log('$scope.imgCmtsArr[i].image_id = '+$scope.imgCmtsArr[i].image_id);
	// 		console.log(typeof($scope.imgCmtsArr[i].image_id));
	// 		console.log(typeof(img_id));
	// 		if(parseInt($scope.imgCmtsArr[i].image_id)===img_id){
	// 			console.log('Matches..');
	// 			console.log($scope.imgCmtsArr[i].comments[0]);
	// 			console.log($scope.imgCmtsArr[i].comments[0].room_comments);
	// 			comments =  $scope.imgCmtsArr[i].comments[0].room_comments;
	// 			break;
	// 		}
	// 	}	
	// 	console.log('In getImgFirstCmt, comments is: '+comments);
	// 	return comments;
	// }

	// function getImgCmtForRoom(img_id, room_id){
	// 	var comments ="";
	// 	console.log('In getImgFirstCmt, imgCmtArr len is: '+$scope.imgCmtsArr.length+ ' and arr is: ');
	// 	console.log($scope.imgCmtsArr);
	// 	console.log('Img_id passed is: '+img_id);
	// 	for(var i =0;i<$scope.imgCmtsArr.length;i++){
	// 		console.log('$scope.imgCmtsArr[i].image_id = '+$scope.imgCmtsArr[i].image_id);
	// 		console.log(typeof($scope.imgCmtsArr[i].image_id));
	// 		console.log(typeof(img_id));
	// 		if(parseInt($scope.imgCmtsArr[i].image_id)===img_id){
	// 			console.log('Matches..');
	// 			for(var j=0;j<$scope.imgCmtsArr[i].comments.length; j++){
	// 				if($scope.imgCmtsArr[i].comments[j].room_id===room_id){
	// 					comments = $scope.imgCmtsArr[i].comments[j].room_comments;
	// 				}
	// 			}
	// 			break;
	// 		}
	// 	}	
	// 	console.log('In getImgFirstCmt, comments is: '+comments);
	// 	return comments;
	// }

	// function isExistsImgCmt(img_id){
	// 	var cmt_index = -1;
	// 	for(var i =0;i<$scope.imgCmtsArr.length;i++){
	// 		if($scope.imgCmtsArr[i].image_id===img_id){
	// 			cmt_index = i;
	// 			break;
	// 		}
	// 	}	
	// 	return cmt_index;
	// }

	

	// //Return -1 if room has no comment or no change in comment
	// function indexOfRoomCmt(roomCommentArr,room_id,commentsEntered){
	// 	for(var i =0 ; i< roomCommentArr.length; i++){
	// 		if(roomCommentArr[i].room_id===room_id){
	// 			if(roomCommentArr[i].room_comments === commentsEntered){
	// 				return -2;
	// 			}
	// 		return i;
	// 		}
	// 	}
	// 	return -1;
	// }


});





    

