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

$(document).on('click','#start-quiz',function(e){
	numImgLiked = 0;
});

$(document).on('click','.thumbnail',function(e){
	e.preventDefault();
	var isSelected=false;

	// alert($(this));
	if($(this).hasClass('style-img-selected')){
		isSelected=true;
	}
	if(isSelected){
		$(this).removeClass('style-img-selected');
		$(this).find(".num-rooms option").each(function() { 
			this.selected = (this.value == 0); 
		});
	}
	else{
		$(this).addClass('style-img-selected');
		if($(this).find(".num-rooms").val()==0){
			$(this).find(".num-rooms option").each(function() { 
	   			this.selected = (this.text == 1); 

			});
		}
	}
});


$(document).on('click','.num-rooms',function(e){
	 e.stopPropagation();
});

$(document).on('change','.num-rooms',function(e){
	e.stopPropagation();
	var target = e.target;
	var parent = target.closest('.thumbnail');

	if(target.options[target.selectedIndex].value!=0){
		$(parent).addClass('style-img-selected');
	}
	else{
		$(parent).removeClass('style-img-selected');
	}


	
});

$(document).on('click','.qz-row a img',function(e){
	e.preventDefault();
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
});


$(document).on('click', '.comment', function(e) {
    
    e.preventDefault();
    var img_id = $(this).attr('data-image-id');
    var imgLiked = $('a.image-like[data-image-id="'+img_id +'"]').hasClass('image-like-selected');
    if(imgLiked){
    	 $("#commentModal").modal('show');
    	 var current = $(this).find(':first-child').attr("src");
	   	var swap = $(this).find(':first-child').attr("data-swap");     
		$(this).find(':first-child').attr("src", swap).attr("data-swap",current);   
		
		var current_img=$(this).attr('data-image');
		$(".img-comment-box1").attr('src', current_img);
		}
	
});	      
     
                 
//Close button on popup - Pinterest Board.                
$(document).on('click', '.close', function(e) {
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
	$(pinRoomArr[0]).siblings(".active").removeClass('active');
    $(pinRoomArr[0]).addClass('active');
});

$(document).on('click','.pin-submit',function(e){
	numImgLiked=0;
});

$(document).on('click','.square',function(e){
	e.preventDefault();
	var isSelected=false;
	if($(this).hasClass('color-selected')){
		isSelected=true;
	}
	if(isSelected){
		$(this).removeClass('color-selected');
	}
	else{
		$(this).addClass('color-selected');
	}
});

