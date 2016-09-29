var numImgLiked = 0;
$(document).ready(function(){
	// alert('Doc ready');

var touch = window.ontouchstart
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);
// alert(touch);
if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                	// alert('got hover: '+styleSheet);
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}
});


//Image/ Heart Click on Pinterest Board

			$(document).on('click','.thumbnail',function(e){
				//alert('Clicked');
				e.preventDefault();
				var isSelected=false;
				if($(this).hasClass('style-img-selected')){
					isSelected=true;
				}
				if(isSelected){
					$(this).removeClass('style-img-selected');
				}
				else{
					$(this).addClass('style-img-selected');
				}
			});

$(document).on('click','.num-rooms',function(e){
				//alert('Clicked on select box');
				e.stopPropagation();
				
			});
			$(document).on('click','.qz-row a img',function(e){
				e.preventDefault();
						// $(".qz-row a img").removeClass('style-img-selected');siblings
				$(".qz-row a img").removeClass('style-img-selected');
				$(this).addClass('style-img-selected');
			});
			$(document).on('click','.qz-row-dsg a figure',function(e){
				e.preventDefault();
				$(".qz-row-dsg a figure").removeClass('style-img-selected');
				$(this).addClass('style-img-selected');
			});


	      	$(document).on('click', '.image-like', function(e) {
        		e.preventDefault();
        		//Deselecting a selected image
        		if($(".glyphicon", this).hasClass('glyphicon-heart')){
        			$(this).toggleClass('image-like-selected');
        			$(".glyphicon", this).toggleClass('glyphicon-heart-empty').toggleClass('glyphicon-heart');	
        			numImgLiked-=1;
        			return;
        		}
    			if(numImgLiked<3){
	        		$(this).toggleClass('image-like-selected');
	        		numImgLiked+=1;
	        		$(".glyphicon", this).toggleClass('glyphicon-heart-empty').toggleClass('glyphicon-heart');	
	        	}
	            // $(".glyphicon", this).toggleClass('glyphicon-heart-empty').toggleClass('glyphicon-heart');
            	
        	});


			$(document).on('click', '.comment', function(e) {
                
                e.preventDefault();
                var imgLiked = true;
                if(imgLiked){
                	 $("#commentModal").modal('show');
                }
	           
	            // if($(document).width() > 736) {
	            //     $(this).closest('.image-container').toggleClass('image-container-selected animated pulse');
	            // }
	            var current = $(this).find(':first-child').attr("src");
	           	var swap = $(this).find(':first-child').attr("data-swap");     
				$(this).find(':first-child').attr("src", swap).attr("data-swap",current);   
				
				var current_img=$(this).attr('data-image');
				$(".img-comment-box1").attr('src', current_img);
				
				// var current_img_id=$(this).attr('data-image-id');
				$(".btn-comment").attr('data-img-id', $(this).attr('data-image-id'));
				$(".btn-comment").attr('data-room-id', 0);
				// $(".pinboard-comment-litem").attr('data-img-id', $(this).attr('data-image-id'));

	            //selectedImages = $('.image-like-selected').length;
			});	      
     
                 
			//Close button on popup - Pinterest Board.                
			$(document).on('click', '.close', function(e) {
				// var current = $("#icon_comment").attr("src");
			 //    var swap = $("#icon_comment").attr("data-swap");   
				// $("#icon_comment").attr('src', swap).attr("data-swap",current);   
				var pinRoomArr = $('.pinboard-comment-litem');
				$(pinRoomArr[0]).siblings(".active").removeClass('active');
			    $(pinRoomArr[0]).addClass('active');

			});


			$(document).on('click', '.zoom img', function(e) {
				var current_img = $(this).attr("src");
				$(".img-zoom-box").attr('src',current_img);
				var img_credit = $(this).attr("data-img-credit");
				$("#img-credit").html(img_credit);
				
				
			});

			$(document).on('click', '.pinboard-comment-litem', function(e) {
				
				    $(this).siblings(".active").removeClass('active');
			        $(this).addClass('active');
				});
			$(document).on('click','.btn-comment',function(e){
				var pinRoomArr = $('.pinboard-comment-litem');
				for(var i = 0; i<pinRoomArr.length;i++){
				 	var curr_room_tab = pinRoomArr[i];
				 	//var attr_class = $(curr_room_tab).attr('class');
				 	if($(curr_room_tab).hasClass('active')){
				 		// alert($(curr_room_tab).attr('data-room-id'));
				 		$(this).attr('data-room-id', $(curr_room_tab).attr('data-room-id'));
				 		// alert($(this).attr('data-room-id'));
				 	}
				}

				//After comment is submitted, active to be attached to room id 0.
				$(pinRoomArr[0]).siblings(".active").removeClass('active');
			    $(pinRoomArr[0]).addClass('active');

			});

			$(document).on('click','.square',function(e){
				e.preventDefault();
				var isSelected=false;
				if($(this).hasClass('style-img-selected')){
					isSelected=true;
				}
				if(isSelected){
					$(this).removeClass('style-img-selected');
				}
				else{
					$(this).addClass('style-img-selected');
				}
			});