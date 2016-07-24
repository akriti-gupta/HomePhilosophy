//Image/ Heart Click on Pinterest Board
	      	$(document).on('click', '.image-selection', function(e) {
        		e.preventDefault();
        		$(this).toggleClass('image-selection-selected');
            	// if($(document).width() > 736) {
            	//     $(this).closest('.image-container').toggleClass('image-container-selected animated pulse');
            	// }
            	$(".glyphicon", this).toggleClass('glyphicon-heart-empty').toggleClass('glyphicon-heart');
        	});


			$(document).on('click', '.comment', function(e) {
                
                e.preventDefault();
	           
	            // if($(document).width() > 736) {
	            //     $(this).closest('.image-container').toggleClass('image-container-selected animated pulse');
	            // }
	            var current = $(this).find(':first-child').attr("src");
	            
				var swap = $(this).find(':first-child').attr("data-swap");     

				$(this).find(':first-child').attr("src", swap).attr("data-swap",current);   
				var current_img=$(this).attr('data-image');
				$(".img-comment-box1").attr('src', current_img);
	            
	            //selectedImages = $('.image-selection-selected').length;
			});	      
     
                 
			//Close button on popup - Pinterest Board.                
			$(document).on('click', '.close', function(e) {
				// var current = $("#icon_comment").attr("src");
			 //    var swap = $("#icon_comment").attr("data-swap");   
				// $("#icon_comment").attr('src', swap).attr("data-swap",current);   
			});


			$(document).on('click', '.zoom img', function(e) {
				var current_img = $(this).attr("src");

				$(".img-zoom-box").attr('src',current_img)
				
				
			});

			$(document).on('click', '.pinboard-list-item', function(e) {
				
				    $(this).siblings(".active").removeClass('active');
			        $(this).addClass('active');
				});